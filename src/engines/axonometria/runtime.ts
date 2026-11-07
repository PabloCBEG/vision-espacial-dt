// Motor de axonometría: estado vivo, vista 3D (triedro, sólido, cuadro y rayos, vistas que se
// elevan), lámina (el dibujo axonométrico, la escala gráfica y las elipses por puntos) y
// controles.
import { Group } from 'three';
import { createPoint, type Point } from '../../geometry/index.ts';
import type { SheetDrawContext, SheetModule } from '../../render2d/sheetModule.ts';
import { dot as drawDot, polygon, polyline } from '../../render2d/sketch2d.ts';
import type { ViewBox } from '../../render2d/viewport.ts';
import type { SceneColors } from '../../render3d/sceneColors.ts';
import type { SceneModule } from '../../render3d/sceneModule.ts';
import { Sketch3D } from '../../render3d/sketch3d.ts';
import { getEngineData, type AppState, type AppStore } from '../../state/index.ts';
import { Tweens } from '../shared/tween.ts';
import type { EngineHost, EngineRuntime } from '../types.ts';
import { buildAxon, type AxonScene } from './construction.ts';
import { AXON_DEFINITION, AxonStepSchema, type AxonStep } from './definition.ts';
import { axon, circlePoints, ISO_COEF, isoReductionScale } from './projection.ts';

type Uv = { x: number; y: number };

export class AxonController {
  readonly store: AppStore;
  data: AxonStep | null = null;
  scene: AxonScene | null = null;
  readonly tweens: Tweens<'escala' | 'vistas'>;
  readonly listeners = new Set<() => void>();
  private raw: unknown = undefined;

  constructor(store: AppStore) {
    this.store = store;
    this.tweens = new Tweens({ escala: 0, vistas: 1 }, () => this.notify());
  }

  sync(state: AppState): void {
    const raw = getEngineData(state, 'axonometria');
    if (raw === this.raw) return;
    const before = this.raw as Record<string, unknown> | undefined;
    this.raw = raw;
    const parsed = raw === undefined ? null : AxonStepSchema.safeParse(raw);
    this.data = parsed?.success && parsed.data.solido ? parsed.data : null;
    this.scene = this.data ? buildAxon(this.data) : null;
    if (this.data) {
      const now = raw as Record<string, unknown>;
      const fresh = JSON.stringify(before?.solido) !== JSON.stringify(now.solido);
      if (fresh) this.tweens.setTargets({ escala: 0, vistas: 0 }, true);
      this.tweens.setTargets({ escala: this.data.escala ?? 0, vistas: this.data.desdeVistas ?? 1 });
    }
    this.notify();
  }

  /** Punto del dibujo (en mm de la lámina). */
  uv(p: Point): Uv {
    const spec = this.scene?.spec;
    if (!spec) return { x: 0, y: 0 };
    const q = axon(spec, p);
    return { x: q.u, y: q.v };
  }

  notify(): void {
    for (const l of this.listeners) l();
  }
}

// ---------- 3D ----------

class AxonScene3D implements SceneModule {
  readonly id = 'axonometria';
  readonly root = new Group();
  private readonly sketches = new Map<string, Sketch3D>();
  private readonly c: AxonController;

  constructor(c: AxonController) {
    this.c = c;
    for (const name of ['triedro', 'axonometria', 'cuadro', 'vistas-triedro']) {
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

  private s(name: string): Sketch3D {
    return this.sketches.get(name) as Sketch3D;
  }

  draw(): void {
    for (const s of this.sketches.values()) s.begin();
    const sc = this.c.scene;
    if (sc) {
      const t = this.c.tweens.values.vistas;
      // Triedro: los tres ejes desde el origen, más allá de la caja.
      const tri = this.s('triedro');
      const span =
        25 +
        Math.max(
          sc.box.max.x - sc.box.min.x,
          sc.box.max.a - sc.box.min.a,
          sc.box.max.c - sc.box.min.c,
        );
      for (const [name, dir] of Object.entries(sc.axes)) {
        const end = createPoint(
          sc.origin.x + dir.x * span,
          sc.origin.a + dir.a * span,
          sc.origin.c + dir.c * span,
        );
        tri.line([sc.origin, end], 'process', { color: 'data' });
        tri.label(name, end, 'ne', 'label-plane');
      }
      tri.label('O', sc.origin, 'sw', 'label-measure');

      // Vistas en las caras del triedro, y la caja que crece desde ellas.
      if (t < 1 || this.c.data?.desdeVistas !== undefined) {
        const v = this.s('vistas-triedro');
        v.segments(sc.views, 'process');
        const grow = Math.max(0, Math.min(1, (t - 1 / 3) * 3));
        if (grow > 0) {
          v.segments(
            sc.boxEdges.map(([p, q]) => [p, mix(p, q, grow)] as [Point, Point]),
            'aux',
            { dashed: true, color: 'data' },
          );
        }
      }
      // El sólido (aparece al final si se construye desde las vistas).
      const solidOpacity =
        this.c.data?.desdeVistas !== undefined ? Math.max(0, Math.min(1, (t - 2 / 3) * 3)) : 1;
      if (solidOpacity > 0) {
        const s = this.s('axonometria');
        for (const f of sc.solid.faces) s.fill(f.points, 'solid', 0.4 * solidOpacity);
        s.segments(
          sc.edges.map((e) => [e.p, e.q] as [Point, Point]),
          'data',
        );
      }
      // Cuadro con el dibujo y los rayos de proyección.
      const cq = this.s('cuadro');
      const corners = sc.cuadroCorners;
      cq.fill(corners, 'newPlane', 0.12);
      cq.line([...corners, corners[0] as Point], 'aux', { color: 'newPlane' });
      const visible = sc.edges.filter((e) => e.visible);
      cq.segments(
        visible.map((e) => [sc.toCuadro(e.p), sc.toCuadro(e.q)] as [Point, Point]),
        'result',
      );
      const vs = new Map<string, Point>();
      for (const e of visible)
        for (const p of [e.p, e.q])
          vs.set(`${p.x.toFixed(2)},${p.a.toFixed(2)},${p.c.toFixed(2)}`, p);
      cq.segments(
        [...vs.values()].slice(0, 40).map((p) => [p, sc.toCuadro(p)] as [Point, Point]),
        'aux',
        { dashed: true, color: 'result' },
      );
    }
    for (const s of this.sketches.values()) s.end();
  }
}

function mix(p: Point, q: Point, t: number): Point {
  return createPoint(p.x + (q.x - p.x) * t, p.a + (q.a - p.a) * t, p.c + (q.c - p.c) * t);
}

// ---------- Lámina ----------

class AxonSheet implements SheetModule {
  readonly id = 'axonometria';
  private readonly c: AxonController;

  constructor(c: AxonController) {
    this.c = c;
  }

  hasContent(): boolean {
    return this.c.scene !== null;
  }

  fitBox(): ViewBox | null {
    const sc = this.c.scene;
    if (!sc) return null;
    const span =
      25 +
      Math.max(
        sc.box.max.x - sc.box.min.x,
        sc.box.max.a - sc.box.min.a,
        sc.box.max.c - sc.box.min.c,
      );
    const pts: Uv[] = [
      sc.origin,
      ...Object.values(sc.axes).map((d) =>
        createPoint(sc.origin.x + d.x * span, sc.origin.a + d.a * span, sc.origin.c + d.c * span),
      ),
    ].map((p) => this.c.uv(p));
    for (const e of sc.edges) pts.push(this.c.uv(e.p), this.c.uv(e.q));
    if (this.c.data?.escala !== undefined) {
      const left = Math.min(...pts.map((p) => p.x));
      const bottom = Math.min(...pts.map((p) => p.y));
      pts.push({ x: left - 95, y: bottom - 5 }, { x: left - 95 + 45, y: bottom + 40 });
    }
    const xs = pts.map((p) => p.x);
    const ys = pts.map((p) => -p.y);
    const m = 14;
    const x = Math.min(...xs) - m;
    const y = Math.min(...ys) - m;
    return { x, y, width: Math.max(...xs) + m - x, height: Math.max(...ys) + m - y };
  }

  draw(ctx: SheetDrawContext): void {
    const sc = this.c.scene;
    const data = this.c.data;
    if (!sc || !data) return;
    const u = ctx.mmPerPx;
    const t = this.c.tweens.values.vistas;
    const P = (p: Point): Uv => this.c.uv(p);

    // Triedro.
    const tri = ctx.layer('triedro');
    const span =
      25 +
      Math.max(
        sc.box.max.x - sc.box.min.x,
        sc.box.max.a - sc.box.min.a,
        sc.box.max.c - sc.box.min.c,
      );
    for (const [name, dir] of Object.entries(sc.axes)) {
      const end = P(
        createPoint(
          sc.origin.x + dir.x * span,
          sc.origin.a + dir.a * span,
          sc.origin.c + dir.c * span,
        ),
      );
      const o = P(sc.origin);
      polyline(tri, [o, end], 'aux', { className: 'axon-axis' });
      tri.append(ctx.label(name, end.x + 4 * u, -end.y - 4 * u, 'start'));
    }

    // De las vistas a la perspectiva: vistas en las caras, caja y sólido.
    if (data.desdeVistas !== undefined) {
      const v = ctx.layer('vistas-triedro');
      for (const [p, q] of sc.views) polyline(v, [P(p), P(q)], 'process');
      const grow = Math.max(0, Math.min(1, (t - 1 / 3) * 3));
      if (grow > 0)
        for (const [p, q] of sc.boxEdges) polyline(v, [P(p), P(mix(p, q, grow))], 'aux');
    }
    const showSolid = data.desdeVistas === undefined || t >= 2 / 3;
    if (showSolid) {
      const g = ctx.layer('axonometria');
      // Ocultas primero, vistas encima. Ocultas solo si el enunciado las pide.
      const list = [...sc.edges].sort((a, b) => Number(a.visible) - Number(b.visible));
      for (const e of list) {
        if (!e.visible && !data.ocultas) continue;
        polyline(g, [P(e.p), P(e.q)], e.visible ? 'result' : 'data', {
          hidden: !e.visible,
          className: 'axon-edge',
        });
      }
      if (data.rotulos) {
        for (const v of sc.names) {
          const q = P(v.p);
          g.append(ctx.label(v.name, q.x + 4 * u, -q.y - 5 * u, 'start'));
        }
      }
    }

    // Elipses por puntos: rombo (el cuadrado circunscrito en perspectiva) y sus puntos.
    if (data.elipses) {
      const g = ctx.layer('elipses');
      for (const c of sc.circles) {
        const corner = (i: number, j: number): Point =>
          createPoint(
            c.center.x + c.radius * (i * c.e1.x + j * c.e2.x),
            c.center.a + c.radius * (i * c.e1.a + j * c.e2.a),
            c.center.c + c.radius * (i * c.e1.c + j * c.e2.c),
          );
        polygon(g, [corner(-1, -1), corner(1, -1), corner(1, 1), corner(-1, 1)].map(P), 'aux');
        for (const q of circlePoints(sc.spec, c.center, c.radius, c.normal, 12)) {
          drawDot(g, { x: q.u, y: q.v }, u, 'sheet-dot');
        }
      }
    }

    // Escala gráfica de reducción isométrica, paso a paso.
    const e = this.c.tweens.values.escala;
    if (data.escala !== undefined && e > 0) {
      const g = ctx.layer('escala');
      const pts = sc.edges.flatMap((ed) => [P(ed.p), P(ed.q)]);
      const ox = Math.min(...pts.map((p) => p.x)) - 95;
      const oy = Math.min(...pts.map((p) => p.y));
      const at = (p: { u: number; v: number }): Uv => ({ x: ox + p.u, y: oy + p.v });
      const { real, reduced } = isoReductionScale(50, 10);
      const n = Math.max(1, Math.ceil(e * real.length));
      const lastReal = real[real.length - 1] ?? { u: 0, v: 0 };
      const lastRed = reduced[reduced.length - 1] ?? { u: 0, v: 0 };
      polyline(g, [at({ u: 0, v: 0 }), at(lastReal)], 'data');
      polyline(g, [at({ u: 0, v: 0 }), at(lastRed)], 'result');
      real.slice(0, n).forEach((p, i) => {
        const q = reduced[i];
        if (!q) return;
        polyline(g, [at(p), at(q)], 'aux');
        drawDot(g, at(p), u, 'sheet-dot sheet-dot-data');
        drawDot(g, at(q), u);
      });
      g.append(
        ctx.label('Real', at(lastReal).x + 3 * u, -at(lastReal).y - 4 * u, 'start'),
        ctx.label(
          `× ${String(Math.round(ISO_COEF * 1000) / 1000).replace('.', ',')}`,
          at(lastRed).x + 3 * u,
          -at(lastRed).y + 14 * u,
          'start',
        ),
      );
    }
  }
}

// ---------- Ejecución ----------

export const AXON_RUNTIME: EngineRuntime = {
  definition: AXON_DEFINITION,
  mount(host: EngineHost): () => void {
    const c = new AxonController(host.store);
    const scene = new AxonScene3D(c);
    const sheet = new AxonSheet(c);
    const unmountScene = host.spatial?.use(scene);
    const unmountSheet = host.sheet.use(sheet);
    const notice = document.createElement('p');
    notice.className = 'methods-notice axon-notice';
    notice.setAttribute('role', 'status');
    notice.hidden = true;
    const panel = document.createElement('div');
    panel.className = 'methods-controls';
    panel.hidden = true;
    panel.append(notice);
    host.controls.append(panel);
    c.listeners.add(() => {
      scene.draw();
      host.spatial?.redraw();
      host.sheet.redraw();
      notice.textContent = c.scene?.notice ?? '';
      notice.hidden = !notice.textContent;
      panel.hidden = notice.hidden;
      if (c.data) document.body.dataset.layout = 'axon';
      else if (document.body.dataset.layout === 'axon') delete document.body.dataset.layout;
    });
    const unsubscribe = host.store.subscribe((state) => c.sync(state));
    c.sync(host.store.get());
    return () => {
      unsubscribe();
      c.tweens.stop();
      unmountScene?.();
      unmountSheet();
      panel.remove();
    };
  },
};
