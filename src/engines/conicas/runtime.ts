// Laboratorio de cónicas: cono doble translúcido, plano secante que se gira y se sube con
// TransformControls (o con deslizadores, desde el teclado), la cónica resaltada en 3D, su
// verdadera magnitud en la lámina y sus ecuaciones en el desplegable analítico.
// La matemática está en math.ts; aquí solo se dibuja.
import {
  BufferGeometry,
  DoubleSide,
  Float32BufferAttribute,
  Group,
  Mesh,
  MeshLambertMaterial,
  Object3D,
  Plane,
  Vector3,
  type Material,
} from 'three';
import { createPoint, type Point } from '../../geometry/index.ts';
import type { SheetDrawContext, SheetModule } from '../../render2d/sheetModule.ts';
import { dot as drawDot, polyline } from '../../render2d/sketch2d.ts';
import type { ViewBox } from '../../render2d/viewport.ts';
import { toThree } from '../../render3d/coords.ts';
import { FadeLayer } from '../../render3d/fadeLayer.ts';
import type { SceneColors } from '../../render3d/sceneColors.ts';
import type { SceneModule } from '../../render3d/sceneModule.ts';
import { Sketch3D } from '../../render3d/sketch3d.ts';
import { getEngineData, setEngineData, type AppState, type AppStore } from '../../state/index.ts';
import { analytic } from '../../ui/analytic.ts';
import { formatDecimal } from '../../ui/format.ts';
import type { EngineHost, EngineRuntime } from '../types.ts';
import { LAB_DEFINITION, LabStepSchema, type LabStep } from './definition.ts';
import {
  classify,
  fromPlane,
  intersectionCurve,
  planeNormal,
  toPlane,
  type Canonical,
  type ConicInput,
} from './math.ts';

/** Altura de cada hoja del cono (mm). */
const HEIGHT = 55;
const PLANE_SIZE = 70;

class LabController {
  readonly store: AppStore;
  data: LabStep | null = null;
  canonical: Canonical | null = null;
  curve: Point[][] = [];
  readonly listeners = new Set<() => void>();
  private raw: unknown = undefined;

  constructor(store: AppStore) {
    this.store = store;
  }

  get input(): ConicInput | null {
    return this.data ? { alpha: this.data.alfa, theta: this.data.theta, h: this.data.h } : null;
  }

  sync(state: AppState): void {
    const raw = getEngineData(state, 'conicas');
    if (raw === this.raw) return;
    this.raw = raw;
    const parsed = raw === undefined ? null : LabStepSchema.safeParse(raw);
    this.data = parsed?.success ? parsed.data : null;
    const input = this.input;
    this.canonical = input ? classify(input) : null;
    this.curve = input ? intersectionCurve(input, HEIGHT) : [];
    for (const l of this.listeners) l();
  }

  patch(fields: Partial<LabStep>): void {
    const current = (this.raw ?? {}) as Record<string, unknown>;
    setEngineData(this.store, 'conicas', { ...current, ...fields });
  }
}

// ---------- 3D ----------

class LabScene implements SceneModule {
  readonly id = 'conicas';
  readonly root = new Group();
  /** Pivote del plano secante: lo mueven los TransformControls. */
  readonly pivot = new Object3D();
  private readonly coneLayer = new FadeLayer();
  private readonly planeLayer = new FadeLayer();
  private readonly curve = new Sketch3D();
  private readonly coneMaterial = new MeshLambertMaterial({ side: DoubleSide, depthWrite: false });
  /** Parte del cono por debajo del plano, más opaca (plano de recorte de Three.js). */
  private readonly clippedMaterial = new MeshLambertMaterial({
    side: DoubleSide,
    depthWrite: false,
  });
  private readonly clip = new Plane();
  private readonly planeMaterial = new MeshLambertMaterial({ side: DoubleSide, depthWrite: false });
  private readonly cone = new Mesh(new BufferGeometry(), this.coneMaterial);
  private readonly coneInside = new Mesh(new BufferGeometry(), this.clippedMaterial);
  private readonly c: LabController;
  private alpha = -1;
  dragging = false;

  constructor(c: LabController) {
    this.c = c;
    this.clippedMaterial.clippingPlanes = [this.clip];
    this.coneLayer.addMaterial(this.coneMaterial as Material, 0.14);
    this.coneLayer.addMaterial(this.clippedMaterial as Material, 0.42);
    this.coneLayer.group.add(this.cone, this.coneInside);
    // Plano secante: un cuadrado en el plano horizontal del pivote (se gira con él).
    const g = new BufferGeometry();
    const s = PLANE_SIZE;
    g.setAttribute(
      'position',
      new Float32BufferAttribute([-s, 0, -s, s, 0, -s, s, 0, s, -s, 0, -s, s, 0, s, -s, 0, s], 3),
    );
    g.computeVertexNormals();
    this.pivot.add(new Mesh(g, this.planeMaterial));
    this.planeLayer.addMaterial(this.planeMaterial as Material, 0.25);
    this.planeLayer.group.add(this.pivot);
    this.root.add(this.coneLayer.group, this.planeLayer.group, this.curve.layer.group);
  }

  layers(): Iterable<readonly [string, FadeLayer]> {
    return [
      ['cono', this.coneLayer],
      ['plano-secante', this.planeLayer],
      ['conica', this.curve.layer],
    ];
  }

  sync(): void {
    this.draw();
  }

  setColors(colors: SceneColors): void {
    this.coneMaterial.color.copy(colors.solid);
    this.clippedMaterial.color.copy(colors.solid);
    this.planeMaterial.color.copy(colors.plane);
    this.curve.setColors(colors);
  }

  setLineScale(scale: number): void {
    this.curve.setLineScale(scale);
  }

  draw(): void {
    const data = this.c.data;
    const input = this.c.input;
    if (!data || !input) return;
    if (data.alfa !== this.alpha) {
      this.alpha = data.alfa;
      const geometry = coneGeometry(data.alfa);
      this.cone.geometry.dispose();
      this.cone.geometry = geometry;
      this.coneInside.geometry = geometry;
    }
    // Plano (salvo mientras se arrastra: entonces manda el ratón).
    if (!this.dragging) {
      this.pivot.position.copy(toThree(createPoint(0, 0, data.h)));
      this.pivot.rotation.set(0, 0, (-data.theta * Math.PI) / 180);
    }
    // Recorte: se ve más opaca la parte del cono por debajo del plano.
    const n = toThree(planeNormal(data.theta));
    this.clip.set(new Vector3(-n.x, -n.y, -n.z), n.y * data.h * 1);
    // Curva de intersección.
    const s = this.curve;
    s.begin();
    for (const piece of this.c.curve) s.line(piece, 'result');
    const k = this.c.canonical;
    if (k) for (const f of k.foci) s.dot(fromPlane(input, f[0], f[1]), 'result', 1.6);
    s.dot(createPoint(0, 0, 0), 'data', 1.4);
    s.label('V', createPoint(0, 0, 0), 'e');
    s.end();
  }
}

/** Cono doble (dos hojas unidas por el vértice), abierto por arriba y por abajo. */
function coneGeometry(alphaDeg: number): BufferGeometry {
  const r = HEIGHT * Math.tan((alphaDeg * Math.PI) / 180);
  const seg = 64;
  const pos: number[] = [];
  const push = (p: Point): void => {
    const v = toThree(p);
    pos.push(v.x, v.y, v.z);
  };
  for (const sign of [1, -1]) {
    for (let i = 0; i < seg; i++) {
      const a0 = (2 * Math.PI * i) / seg;
      const a1 = (2 * Math.PI * (i + 1)) / seg;
      const apex = createPoint(0, 0, 0);
      const p0 = createPoint(r * Math.cos(a0), r * Math.sin(a0), sign * HEIGHT);
      const p1 = createPoint(r * Math.cos(a1), r * Math.sin(a1), sign * HEIGHT);
      push(apex);
      push(p0);
      push(p1);
    }
  }
  const g = new BufferGeometry();
  g.setAttribute('position', new Float32BufferAttribute(pos, 3));
  g.computeVertexNormals();
  return g;
}

// ---------- Lámina: verdadera magnitud ----------

const TYPE_TITLE: Record<Canonical['type'], string> = {
  circunferencia: 'Circunferencia',
  elipse: 'Elipse',
  parábola: 'Parábola',
  hipérbola: 'Hipérbola',
  degenerada: 'Cónica degenerada',
};

class LabSheet implements SheetModule {
  readonly id = 'conicas';
  private readonly c: LabController;

  constructor(c: LabController) {
    this.c = c;
  }

  hasContent(): boolean {
    return this.c.data !== null;
  }

  isAlwaysVisible(tag: string): boolean {
    return this.c.data !== null && tag === 'conica-vm';
  }

  private points(): [number, number][][] {
    const input = this.c.input;
    if (!input) return [];
    return this.c.curve.map((piece) => piece.map((p) => toPlane(input, p)));
  }

  fitBox(): ViewBox | null {
    const pts = this.points().flat();
    const k = this.c.canonical;
    if (k)
      pts.push(...k.foci.map((f) => [f[0], f[1]] as [number, number]), [k.center[0], k.center[1]]);
    if (pts.length === 0) return { x: -60, y: -40, width: 120, height: 80 };
    const xs = pts.map((p) => p[0]);
    const ys = pts.map((p) => -p[1]);
    const m = 14;
    const x = Math.min(...xs) - m;
    const y = Math.min(...ys) - m;
    return { x, y, width: Math.max(...xs) + m - x, height: Math.max(...ys) + m - y };
  }

  draw(ctx: SheetDrawContext): void {
    const k = this.c.canonical;
    if (!k) return;
    const g = ctx.layer('conica-vm');
    const u = ctx.mmPerPx;
    const box = this.fitBox() ?? { x: -60, y: -40, width: 120, height: 80 };
    const left = box.x;
    const right = box.x + box.width;
    const top = -box.y;
    const bottom = -(box.y + box.height);
    const [cx, cy] = k.center;
    // Ejes de la cónica (auxiliares).
    polyline(
      g,
      [
        { x: left, y: cy },
        { x: right, y: cy },
      ],
      'aux',
      { className: 'conic-axis' },
    );
    if (k.type !== 'parábola')
      polyline(
        g,
        [
          { x: cx, y: bottom },
          { x: cx, y: top },
        ],
        'aux',
        { className: 'conic-axis' },
      );
    // Asíntotas de la hipérbola.
    if (k.type === 'hipérbola') {
      const m = k.b / k.a;
      for (const sign of [1, -1]) {
        polyline(
          g,
          [
            { x: left, y: cy + sign * m * (left - cx) },
            { x: right, y: cy + sign * m * (right - cx) },
          ],
          'aux',
          {
            className: 'conic-asymptote',
          },
        );
      }
    }
    // Directrices: a distancia a/e del centro (en la parábola, a p/2 del vértice, al otro lado del foco).
    const directrices: number[] = [];
    if ((k.type === 'elipse' && k.a >= k.b) || k.type === 'hipérbola')
      directrices.push(cx - k.a / k.e, cx + k.a / k.e);
    if (k.type === 'parábola' && k.foci[0]) directrices.push(cx - (k.foci[0][0] - cx));
    for (const d of directrices) {
      polyline(
        g,
        [
          { x: d, y: bottom },
          { x: d, y: top },
        ],
        'process',
        { className: 'conic-directrix' },
      );
      g.append(ctx.label('d', d + 3 * u, -top + 14 * u, 'start'));
    }
    // La curva en verdadera magnitud.
    for (const piece of this.points()) {
      polyline(
        g,
        piece.map(([x, y]) => ({ x, y })),
        'result',
        { className: 'conic-curve' },
      );
    }
    k.foci.forEach(([fx, fy], i) => {
      drawDot(g, { x: fx, y: fy }, u);
      const name =
        k.foci.length > 1 ? `F${i ? '₂' : '₁'}` : k.type === 'circunferencia' ? 'O' : 'F';
      g.append(ctx.label(name, fx + 4 * u, -fy - 6 * u, 'start'));
    });
    g.append(
      ctx.label(
        `${TYPE_TITLE[k.type]} en verdadera magnitud`,
        left + 4 * u,
        -top + 34 * u,
        'start',
      ),
    );
  }
}

// ---------- Desplegable analítico ----------

const tex = (v: number, digits = 2): string => {
  const r = Math.round(v * 10 ** digits) / 10 ** digits;
  return String(r).replace('-', '-').replace('.', '{,}');
};

function publishAnalytic(c: LabController): void {
  const k = c.canonical;
  const data = c.data;
  if (!k || !data) {
    analytic.clear('conicas');
    return;
  }
  const relation =
    k.type === 'circunferencia'
      ? '\\beta = 90^\\circ'
      : k.type === 'parábola'
        ? `\\beta = \\alpha = ${tex(k.alpha, 1)}^\\circ`
        : `\\beta = ${tex(k.beta, 1)}^\\circ ${k.beta > k.alpha ? '>' : '<'} \\alpha = ${tex(k.alpha, 1)}^\\circ`;
  const t = (data.theta * Math.PI) / 180;
  analytic.set('conicas', [
    {
      id: 'conicas-tipo',
      title: `Cónica: ${TYPE_TITLE[k.type].toLowerCase()}`,
      rows: [
        { label: 'Tipo', text: `${TYPE_TITLE[k.type]}. ${k.why}` },
        { label: 'Plano y generatriz', tex: relation },
        {
          label: 'Excentricidad',
          tex: `e = \\frac{\\cos\\beta}{\\cos\\alpha} = ${k.type === 'circunferencia' ? '0' : tex(k.e)}`,
        },
        { label: 'Ecuación canónica', tex: k.latex },
      ],
    },
    {
      id: 'conicas-superficies',
      title: 'Cono y plano secante',
      rows: [
        { label: 'Cono', tex: `x^2 + y^2 = \\tan^2(${tex(data.alfa, 1)}^\\circ)\\, z^2` },
        {
          label: 'Plano',
          tex: `${tex(Math.sin(t))}\\,x + ${tex(Math.cos(t))}\\,z = ${tex(Math.cos(t) * data.h, 1)}`,
        },
        { label: 'Ángulo con el eje', text: `β = 90° − θ = ${formatDecimal(k.beta)}°` },
      ],
    },
  ]);
}

// ---------- Ejecución ----------

export const LAB_RUNTIME: EngineRuntime = {
  definition: LAB_DEFINITION,
  mount(host: EngineHost): () => void {
    const c = new LabController(host.store);
    const scene = new LabScene(c);
    const sheet = new LabSheet(c);
    host.spatial?.enableLocalClipping();
    const unmountScene = host.spatial?.use(scene);
    const unmountSheet = host.sheet.use(sheet);
    let transform: ReturnType<
      NonNullable<EngineHost['spatial']>['createTransformControls']
    > | null = null;
    const panel = buildControls(c, (mode) => {
      if (!transform) return;
      transform.controls.setMode(mode);
      transform.controls.showX = false;
      transform.controls.showY = mode === 'translate';
      transform.controls.showZ = mode === 'rotate';
    });
    host.controls.append(panel.element);

    const attach = (): void => {
      if (transform || !host.spatial) return;
      transform = host.spatial.createTransformControls();
      const t = transform.controls;
      t.attach(scene.pivot);
      t.setMode('rotate');
      t.showX = false;
      t.showY = false;
      t.setSpace('world');
      t.addEventListener('dragging-changed', (e) => {
        scene.dragging = Boolean(e.value);
      });
      t.addEventListener('objectChange', () => {
        // Solo inclinación (giro alrededor del eje a) y altura (traslación en la cota).
        const theta = Math.max(0, Math.min(89.5, (-scene.pivot.rotation.z * 180) / Math.PI));
        const h = Math.max(-45, Math.min(45, scene.pivot.position.y));
        scene.pivot.position.set(0, h, 0);
        scene.pivot.rotation.set(0, 0, (-theta * Math.PI) / 180);
        c.patch({ theta: Math.round(theta * 2) / 2, h: Math.round(h) });
      });
    };
    const detach = (): void => {
      transform?.dispose();
      transform = null;
    };

    c.listeners.add(() => {
      if (c.data) attach();
      else detach();
      scene.draw();
      host.spatial?.redraw();
      host.sheet.redraw();
      panel.update();
      publishAnalytic(c);
      if (c.data) document.body.dataset.layout = 'conicas';
      else if (document.body.dataset.layout === 'conicas') delete document.body.dataset.layout;
    });
    const unsubscribe = host.store.subscribe((state) => c.sync(state));
    c.sync(host.store.get());
    let revealed = false;
    c.listeners.add(() => {
      if (c.data && !revealed && window.matchMedia('(min-width: 1024px)').matches) {
        revealed = true;
        analytic.reveal();
      }
      if (!c.data) revealed = false;
    });
    return () => {
      unsubscribe();
      detach();
      unmountScene?.();
      unmountSheet();
      panel.element.remove();
      analytic.clear('conicas');
    };
  },
};

function buildControls(
  c: LabController,
  setMode: (mode: 'rotate' | 'translate') => void,
): { element: HTMLElement; update(): void } {
  const element = document.createElement('div');
  element.className = 'methods-controls lab-controls';
  element.setAttribute('role', 'group');
  element.setAttribute('aria-label', 'Plano secante');
  element.hidden = true;
  const modes = document.createElement('div');
  modes.className = 'view-buttons';
  modes.setAttribute('role', 'group');
  modes.setAttribute('aria-label', 'Qué hace el ratón en el 3D');
  const modeButtons = (
    [
      ['rotate', 'Inclinar el plano'],
      ['translate', 'Subir o bajar el plano'],
    ] as const
  ).map(([mode, label]) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = label;
    b.setAttribute('aria-pressed', String(mode === 'rotate'));
    b.addEventListener('click', () => {
      setMode(mode);
      for (const other of modeButtons) other.setAttribute('aria-pressed', String(other === b));
    });
    modes.append(b);
    return b;
  });
  element.append(modes);
  const slider = (
    id: string,
    label: string,
    key: keyof LabStep,
    min: number,
    max: number,
    step: number,
    unit: string,
  ) => {
    const w = document.createElement('div');
    w.className = 'slider methods-slider';
    w.innerHTML = `
      <label for="${id}">${label}</label>
      <output for="${id}"></output>
      <input id="${id}" type="range" min="${min}" max="${max}" step="${step}" />`;
    const input = w.querySelector('input') as HTMLInputElement;
    const output = w.querySelector('output') as HTMLOutputElement;
    input.addEventListener('input', () => c.patch({ [key]: Number(input.value) }));
    element.append(w);
    return { input, output, key, unit };
  };
  const sliders = [
    slider('slider-lab-theta', 'Inclinación del plano (θ)', 'theta', 0, 89.5, 0.5, '°'),
    slider('slider-lab-h', 'Altura del plano (h)', 'h', -45, 45, 1, ' mm'),
    slider('slider-lab-alpha', 'Semiángulo del cono (α)', 'alfa', 10, 60, 1, '°'),
  ];
  return {
    element,
    update(): void {
      const data = c.data;
      element.hidden = !data;
      if (!data) return;
      for (const s of sliders) {
        const v = data[s.key];
        if (document.activeElement !== s.input) s.input.value = String(v);
        s.output.textContent = `${formatDecimal(v)}${s.unit}`;
      }
    },
  };
}
