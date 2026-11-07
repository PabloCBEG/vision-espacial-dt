// Motor de perspectiva cónica: estado vivo, vista 3D (geometral, cuadro, observador, rayos
// visuales y la imagen que se forma en el cuadro), lámina (perspectiva con puntos de fuga y
// métricos, y la construcción por directrices con el geometral abatido) y controles.
import { Group } from 'three';
import { createPoint, type Point } from '../../geometry/index.ts';
import type { SheetDrawContext, SheetModule } from '../../render2d/sheetModule.ts';
import { dot as drawDot, polyline } from '../../render2d/sketch2d.ts';
import type { ViewBox } from '../../render2d/viewport.ts';
import type { SceneColors } from '../../render3d/sceneColors.ts';
import type { SceneModule } from '../../render3d/sceneModule.ts';
import { Sketch3D } from '../../render3d/sketch3d.ts';
import { getEngineData, setEngineData, type AppState, type AppStore } from '../../state/index.ts';
import { Tweens } from '../shared/tween.ts';
import { buildSolid, vertexNames, type NamedVertex } from '../solidos/construction.ts';
import {
  centroid,
  dot,
  edges,
  faceNormal,
  sub,
  vertices,
  type Polyhedron,
} from '../solidos/polyhedron.ts';
import type { EngineHost, EngineRuntime } from '../types.ts';
import { CONIC_DEFINITION, ConicStepSchema, type ConicStep } from './definition.ts';
import {
  distancePoints,
  eye,
  measuringPoint,
  perspective,
  principalPoint,
  vanishingPoint,
  type Observer,
  type Uv,
} from './projection.ts';

interface Edge3 {
  readonly p: Point;
  readonly q: Point;
  readonly visible: boolean;
}

interface ConicScene {
  readonly observer: Observer;
  readonly solid: Polyhedron | null;
  readonly names: readonly NamedVertex[];
  readonly edges: readonly Edge3[];
  /** Fugas de las direcciones horizontales de las aristas (sin repetir). */
  readonly vanishing: readonly { f: Uv; m: Uv; dir: Point }[];
  readonly frontal: boolean;
  readonly parallels: readonly (readonly [Point, Point])[];
}

export class ConicController {
  readonly store: AppStore;
  data: ConicStep | null = null;
  scene: ConicScene | null = null;
  readonly tweens: Tweens<'construccion'>;
  readonly listeners = new Set<() => void>();
  private raw: unknown = undefined;

  constructor(store: AppStore) {
    this.store = store;
    this.tweens = new Tweens({ construccion: 0 }, () => this.notify());
  }

  sync(state: AppState): void {
    const raw = getEngineData(state, 'conica');
    if (raw === this.raw) return;
    this.raw = raw;
    const parsed = raw === undefined ? null : ConicStepSchema.safeParse(raw);
    this.data = parsed?.success ? parsed.data : null;
    this.scene = this.data ? build(this.data) : null;
    this.tweens.setTargets({ construccion: this.data?.construccion ?? 0 });
    this.notify();
  }

  /** Cambia el observador o el giro del sólido (deslizadores). */
  patch(fields: Record<string, unknown>): void {
    const raw = (this.raw ?? {}) as Record<string, unknown>;
    setEngineData(this.store, 'conica', { ...raw, ...fields });
  }

  notify(): void {
    for (const l of this.listeners) l();
  }
}

function build(data: ConicStep): ConicScene {
  const o = data.observador;
  const V = eye(o);
  let solid: Polyhedron | null = null;
  let list: Edge3[] = [];
  let names: NamedVertex[] = [];
  const dirs: Point[] = [];
  if (data.solido) {
    solid = buildSolid(data.solido);
    names = vertexNames(solid, data.solido.tipo);
    // Visibilidad desde el ojo: una cara se ve si el ojo está del lado de fuera de su plano.
    const facing = solid.faces.map((f) => dot(faceNormal(f), sub(V, centroid(f.points))) > 1e-9);
    for (const e of edges(solid)) {
      const [f0, f1] = e.faces;
      const a = solid.faces[f0];
      const b = solid.faces[f1];
      if (!a || !b) continue;
      const contour = facing[f0] !== facing[f1];
      if (a.smooth && b.smooth && !contour) continue;
      list.push({ p: e.p, q: e.q, visible: Boolean(facing[f0] || facing[f1]) });
      // Direcciones horizontales que se alejan (tienen punto de fuga).
      const d = sub(e.q, e.p);
      const len = Math.hypot(d.x, d.a, d.c);
      if (len > 1e-6 && Math.abs(d.c) < 1e-6 && Math.abs(d.a) > 1e-6 && !a.smooth) {
        const u = createPoint(d.x / len, d.a / len, 0);
        const n = u.a > 0 ? createPoint(-u.x, -u.a, 0) : u;
        if (!dirs.some((w) => Math.abs(w.x - n.x) < 1e-4 && Math.abs(w.a - n.a) < 1e-4))
          dirs.push(n);
      }
    }
  }
  const vanishing = dirs
    .map((dir) => {
      const f = vanishingPoint(o, dir);
      return f ? { f, m: measuringPoint(o, f), dir } : null;
    })
    .filter((v): v is { f: Uv; m: Uv; dir: Point } => v !== null)
    .sort((p, q) => p.f.x - q.f.x);
  const frontal = vanishing.length === 1 && Math.abs((vanishing[0]?.f.x ?? 0) - o.x) < 1e-6;

  const parallels: [Point, Point][] = [];
  if (data.paralelas) {
    const t = (data.paralelas.angulo * Math.PI) / 180;
    const dir = createPoint(Math.cos(t), -Math.sin(t), 0);
    const n = data.paralelas.cuantas;
    for (let i = 0; i < n; i++) {
      const off = (i - (n - 1) / 2) * data.paralelas.separacion;
      // Separadas en perpendicular a su dirección, empezando junto al cuadro.
      const start = createPoint(o.x + off * Math.sin(t), -2 + off * Math.cos(t), 0);
      parallels.push([
        start,
        createPoint(
          start.x + dir.x * data.paralelas.largo,
          start.a + dir.a * data.paralelas.largo,
          0,
        ),
      ]);
    }
  }
  if (!data.ocultas) list = list.filter((e) => e.visible);
  return { observer: o, solid, names, edges: list, vanishing, frontal, parallels };
}

// ---------- 3D ----------

class ConicScene3D implements SceneModule {
  readonly id = 'conica';
  readonly root = new Group();
  private readonly sketches = new Map<string, Sketch3D>();
  private readonly c: ConicController;

  constructor(c: ConicController) {
    this.c = c;
    for (const name of ['geometral', 'cuadro', 'observador', 'rayos', 'perspectiva', 'paralelas']) {
      const s = new Sketch3D();
      this.sketches.set(name, s);
      this.root.add(s.layer.group);
    }
  }

  layers(): Iterable<readonly [string, Sketch3D['layer']]> {
    return [...this.sketches].map(([n, s]) => [n, s.layer] as const);
  }

  sync(): void {
    this.draw();
  }

  setColors(colors: SceneColors): void {
    for (const s of this.sketches.values()) s.setColors(colors);
  }

  setLineScale(scale: number): void {
    for (const s of this.sketches.values()) s.setLineScale(scale);
  }

  private s(n: string): Sketch3D {
    return this.sketches.get(n) as Sketch3D;
  }

  draw(): void {
    for (const s of this.sketches.values()) s.begin();
    const sc = this.c.scene;
    if (sc) {
      const o = sc.observer;
      const V = eye(o);
      const W = 90;
      // Geometral (suelo) y cuadro (de pie sobre la LT).
      const g = this.s('geometral');
      const ground = [
        createPoint(-W, o.d + 20, 0),
        createPoint(W, o.d + 20, 0),
        createPoint(W, -110, 0),
        createPoint(-W, -110, 0),
      ];
      g.fill(ground, 'ph', 0.14);
      g.label('Geometral', createPoint(-W + 8, o.d + 12, 0), 'ne', 'label-plane');
      const cq = this.s('cuadro');
      const frame = [
        createPoint(-W, 0, 0),
        createPoint(W, 0, 0),
        createPoint(W, 0, 100),
        createPoint(-W, 0, 100),
      ];
      cq.fill(frame, 'pv', 0.14);
      cq.line([...frame, frame[0] as Point], 'aux', { color: 'pv' });
      cq.line([createPoint(-W, 0, o.h), createPoint(W, 0, o.h)], 'process', { color: 'process' });
      cq.label('LH', createPoint(W, 0, o.h), 'e', 'label-measure');
      cq.label('LT', createPoint(W, 0, 0), 'e', 'label-measure');
      cq.label('Cuadro', createPoint(-W + 6, 0, 96), 'se', 'label-plane');
      const P = createPoint(o.x, 0, o.h);
      cq.dot(P, 'process', 1.4);
      cq.label('P', P, 'ne');
      // Observador: el ojo, su pie en el geometral y la perpendicular al cuadro.
      const ob = this.s('observador');
      ob.dot(V, 'result', 2.2);
      ob.label('V', V, 'ne');
      ob.line([V, createPoint(o.x, o.d, 0)], 'aux', { dashed: true });
      ob.line([V, P], 'aux', { dashed: true, color: 'process' });
      // El sólido y su imagen en el cuadro.
      const per = this.s('perspectiva');
      if (sc.solid) {
        for (const f of sc.solid.faces) per.fill(f.points, 'solid', 0.4);
        per.segments(
          sc.edges.filter((e) => e.visible).map((e) => [e.p, e.q] as [Point, Point]),
          'data',
        );
        const onCuadro = (q: Point): Point | null => {
          const im = perspective(o, q);
          return im ? createPoint(im.x, 0, im.y) : null;
        };
        const image: [Point, Point][] = [];
        for (const e of sc.edges) {
          const a = onCuadro(e.p);
          const b = onCuadro(e.q);
          if (a && b && e.visible) image.push([a, b]);
        }
        per.segments(image, 'result');
        // Rayos visuales del ojo a cada vértice (sin repetir), atravesando el cuadro.
        const ray = this.s('rayos');
        const pts = vertices(sc.solid).slice(0, 24);
        ray.segments(
          pts.map((q) => [V, q] as [Point, Point]),
          'aux',
          { dashed: true, color: 'result' },
        );
        for (const q of pts) {
          const at = onCuadro(q);
          if (at) ray.dot(at, 'result', 0.9);
        }
      }
      // Paralelas que se alejan.
      if (sc.parallels.length) {
        const pa = this.s('paralelas');
        pa.segments(sc.parallels, 'data', { color: 'line' });
        const img: [Point, Point][] = [];
        for (const [p, q] of sc.parallels) {
          const a = perspective(o, p);
          const b = perspective(o, q);
          if (a && b) img.push([createPoint(a.x, 0, a.y), createPoint(b.x, 0, b.y)]);
        }
        pa.segments(img, 'result', { color: 'line' });
      }
    }
    for (const s of this.sketches.values()) s.end();
  }
}

// ---------- Lámina ----------

class ConicSheet implements SheetModule {
  readonly id = 'conica';
  private readonly c: ConicController;

  constructor(c: ConicController) {
    this.c = c;
  }

  hasContent(): boolean {
    return this.c.scene !== null;
  }

  /**
   * Planta (geometral abatido) colocada debajo del dibujo: el observador a 22 mm bajo la LT
   * y, más abajo, la traza del cuadro y el sólido (detrás del cuadro).
   */
  private plan(p: Point): Uv {
    const d = this.c.scene?.observer.d ?? 0;
    return { x: p.x, y: p.a - d - 22 };
  }

  fitBox(): ViewBox | null {
    const sc = this.c.scene;
    if (!sc) return null;
    const o = sc.observer;
    const pts: Uv[] = [
      { x: o.x - 60, y: -6 },
      { x: o.x + 60, y: o.h + 14 },
    ];
    for (const e of sc.edges) {
      const a = perspective(o, e.p);
      const b = perspective(o, e.q);
      if (a) pts.push(a);
      if (b) pts.push(b);
    }
    if (this.c.data?.fugas) for (const v of sc.vanishing) pts.push(v.f);
    if (this.c.data?.metricos) for (const v of sc.vanishing) pts.push(v.m);
    if (this.c.data?.construccion !== undefined && sc.solid) {
      for (const p of vertices(sc.solid)) pts.push(this.plan(p));
      pts.push(this.plan(eye(o)));
    }
    const xs = pts.map((p) => p.x);
    const ys = pts.map((p) => -p.y);
    const m = 12;
    const x = Math.min(...xs) - m;
    const y = Math.min(...ys) - m;
    return { x, y, width: Math.max(...xs) + m - x, height: Math.max(...ys) + m - y };
  }

  draw(ctx: SheetDrawContext): void {
    const sc = this.c.scene;
    const data = this.c.data;
    if (!sc || !data) return;
    const o = sc.observer;
    const u = ctx.mmPerPx;
    const box = this.fitBox();
    const left = box ? box.x : -100;
    const right = box ? box.x + box.width : 100;

    // Cuadro: LT, línea del horizonte y punto principal.
    const cq = ctx.layer('cuadro');
    polyline(
      cq,
      [
        { x: left, y: 0 },
        { x: right, y: 0 },
      ],
      'data',
    );
    polyline(
      cq,
      [
        { x: left, y: o.h },
        { x: right, y: o.h },
      ],
      'process',
      { className: 'conic-horizon' },
    );
    cq.append(
      ctx.label('LT', right - 3 * u, 12 * u, 'end'),
      ctx.label('LH', right - 3 * u, -o.h - 5 * u, 'end'),
    );
    const P = principalPoint(o);
    drawDot(cq, P, u, 'sheet-dot sheet-dot-data');
    cq.append(ctx.label('P', P.x + 4 * u, -P.y - 6 * u, 'start'));

    // Paralelas que se juntan.
    if (sc.parallels.length) {
      const g = ctx.layer('paralelas');
      for (const [p, q] of sc.parallels) {
        const a = perspective(o, p);
        const b = perspective(o, q);
        if (a && b) polyline(g, [a, b], 'result', { className: 'conic-rail' });
      }
    }

    // Perspectiva del sólido: vistas con línea gruesa y ocultas con discontinua fina.
    if (sc.solid) {
      const g = ctx.layer('perspectiva');
      const list = [...sc.edges].sort((a, b) => Number(a.visible) - Number(b.visible));
      for (const e of list) {
        const a = perspective(o, e.p);
        const b = perspective(o, e.q);
        if (a && b) polyline(g, [a, b], 'result', { hidden: !e.visible, className: 'conic-edge' });
      }
    }

    // Puntos de fuga y rectas que van a ellos.
    if (data.fugas) {
      const g = ctx.layer('fugas');
      if (sc.frontal) {
        g.append(ctx.label('P ≡ F', P.x + 4 * u, -P.y + 14 * u, 'start'));
      }
      sc.vanishing.forEach((v, i) => {
        drawDot(g, v.f, u);
        if (!sc.frontal)
          g.append(ctx.label(`F${['₁', '₂', '₃', '₄'][i] ?? ''}`, v.f.x, -v.f.y - 7 * u, 'middle'));
        for (const e of sc.edges) {
          const d = sub(e.q, e.p);
          const len = Math.hypot(d.x, d.a, d.c);
          if (len < 1e-6 || Math.abs(d.c) > 1e-6) continue;
          const parallel = Math.abs(Math.abs((d.x * v.dir.x + d.a * v.dir.a) / len) - 1) < 1e-4;
          if (!parallel) continue;
          const a = perspective(o, e.p);
          if (a) polyline(g, [a, v.f], 'aux', { className: 'conic-to-vanishing' });
        }
      });
    }
    if (data.metricos) {
      const g = ctx.layer('metricos');
      const points = sc.frontal ? distancePoints(o) : sc.vanishing.map((v) => v.m);
      points.forEach((m, i) => {
        drawDot(g, m, u, 'sheet-dot sheet-dot-data');
        const name = sc.frontal ? `D${i ? '₂' : '₁'}` : `M${['₁', '₂', '₃'][i] ?? ''}`;
        g.append(ctx.label(name, m.x, -m.y + 14 * u, 'middle'));
      });
    }

    // Construcción por directrices con el geometral abatido debajo.
    const t = this.c.tweens.values.construccion;
    if (data.construccion !== undefined && t > 0 && sc.solid) {
      const g = ctx.layer('construccion');
      const yCuadro = this.plan(createPoint(0, 0, 0)).y;
      polyline(
        g,
        [
          { x: left, y: yCuadro },
          { x: right, y: yCuadro },
        ],
        'data',
        { className: 'conic-plan-lt' },
      );
      g.append(ctx.label('cuadro (abatido)', left + 3 * u, -yCuadro - 5 * u, 'start'));
      const V0 = this.plan(eye(o));
      drawDot(g, V0, u, 'sheet-dot');
      g.append(ctx.label('V₀', V0.x + 4 * u, -V0.y + 12 * u, 'start'));
      // Planta del sólido.
      for (const e of edges(sc.solid))
        polyline(g, [this.plan(e.p), this.plan(e.q)], 'data', { className: 'conic-plan' });
      // Vértices de la base (en el geometral), uno tras otro según avanza la construcción.
      const base = vertices(sc.solid).filter((p) => Math.abs(p.c) < 1e-6);
      const shown = Math.max(1, Math.ceil(t * base.length));
      for (const q of base.slice(0, shown)) {
        const qp = this.plan(q);
        // Visual en planta: de V₀ al punto, hasta el cuadro; y de ahí, vertical hasta la imagen.
        const k = (yCuadro - V0.y) / (qp.y - V0.y);
        const hit = { x: V0.x + (qp.x - V0.x) * k, y: yCuadro };
        polyline(g, [V0, qp], 'aux');
        const img = perspective(o, q);
        if (!img) continue;
        polyline(g, [hit, img], 'aux', { className: 'conic-vertical' });
        // Directriz: perpendicular al cuadro por el punto; su traza en la LT fuga a P.
        polyline(
          g,
          [
            { x: q.x, y: yCuadro },
            { x: q.x, y: 0 },
          ],
          'aux',
        );
        polyline(g, [{ x: q.x, y: 0 }, P], 'process', { className: 'conic-directriz' });
        drawDot(g, img, u);
      }
    }
  }
}

// ---------- Ejecución ----------

export const CONIC_RUNTIME: EngineRuntime = {
  definition: CONIC_DEFINITION,
  mount(host: EngineHost): () => void {
    const c = new ConicController(host.store);
    const scene = new ConicScene3D(c);
    const sheet = new ConicSheet(c);
    const unmountScene = host.spatial?.use(scene);
    const unmountSheet = host.sheet.use(sheet);
    const panel = buildControls(c);
    host.controls.append(panel.element);
    c.listeners.add(() => {
      scene.draw();
      host.spatial?.redraw();
      host.sheet.redraw();
      panel.update();
      if (c.data) document.body.dataset.layout = 'conic';
      else if (document.body.dataset.layout === 'conic') delete document.body.dataset.layout;
    });
    const unsubscribe = host.store.subscribe((state) => c.sync(state));
    c.sync(host.store.get());
    return () => {
      unsubscribe();
      c.tweens.stop();
      unmountScene?.();
      unmountSheet();
      panel.element.remove();
    };
  },
};

function buildControls(c: ConicController): { element: HTMLElement; update(): void } {
  const element = document.createElement('div');
  element.className = 'methods-controls conic-controls';
  element.setAttribute('role', 'group');
  element.setAttribute('aria-label', 'Observador');
  element.hidden = true;
  const make = (id: string, label: string, min: number, max: number, unit: string) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'slider methods-slider';
    wrapper.innerHTML = `
      <label for="${id}">${label}</label>
      <output for="${id}"></output>
      <input id="${id}" type="range" min="${min}" max="${max}" step="1" />`;
    const input = wrapper.querySelector('input') as HTMLInputElement;
    const output = wrapper.querySelector('output') as HTMLOutputElement;
    element.append(wrapper);
    return { input, output, unit };
  };
  const height = make('slider-conic-h', 'Altura del observador', 5, 95, 'mm');
  const distance = make('slider-conic-d', 'Distancia al cuadro', 40, 200, 'mm');
  const turn = make('slider-conic-turn', 'Giro del sólido', 0, 90, '°');
  const observer = (): ConicStep['observador'] => c.data?.observador ?? { x: 0, d: 120, h: 45 };
  height.input.addEventListener('input', () =>
    c.patch({ observador: { ...observer(), h: Number(height.input.value) } }),
  );
  distance.input.addEventListener('input', () =>
    c.patch({ observador: { ...observer(), d: Number(distance.input.value) } }),
  );
  turn.input.addEventListener('input', () => {
    const solid = c.data?.solido;
    if (solid) c.patch({ solido: { ...solid, giro: Number(turn.input.value) } });
  });
  return {
    element,
    update(): void {
      const data = c.data;
      element.hidden = !data?.controles;
      if (!data) return;
      const o = data.observador;
      for (const [s, v] of [
        [height, o.h],
        [distance, o.d],
        [turn, data.solido?.giro ?? 0],
      ] as const) {
        if (document.activeElement !== s.input) s.input.value = String(v);
        s.output.textContent = `${Math.round(v)} ${s.unit}`.replace(' °', '°');
      }
    },
  };
}
