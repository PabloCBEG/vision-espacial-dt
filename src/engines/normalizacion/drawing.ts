// Dibujo normalizado de una pieza: vistas con ocultas, ejes de simetría, cortes con rayado,
// sección abatida y colocación de las vistas en la lámina (sistema europeo: planta debajo del
// alzado y perfil izquierdo a su derecha). Sin DOM.
import type { Manifold, ManifoldToplevel } from 'manifold-3d';
import type { Cut, NormStep } from './definition.ts';
import { buildSolid, cutWithBoxes, toMesh, type TriMesh } from './kernel.ts';
import { axisIndex, boundsOf, revolutions, type Bounds, type Piece } from './piece.ts';
import { drawView, hatch, project, type Seg2, type ViewName } from './views.ts';

export interface ViewResult {
  readonly visible: Seg2[];
  readonly hidden: Seg2[];
  readonly hatch: Seg2[];
  readonly axes: Seg2[];
  /** Contorno de la sección abatida (trazo fino continuo) y su rayado. */
  readonly revolved: Seg2[];
  readonly revolvedHatch: Seg2[];
  /** La vista está en corte. */
  readonly sectioned: boolean;
}

export interface PieceDrawing {
  readonly piece: Piece;
  readonly bounds: Bounds;
  /** Malla entera, y si hay corte, la parte que queda y la que se retira. */
  readonly mesh: TriMesh;
  readonly kept: TriMesh | null;
  readonly removed: TriMesh | null;
  readonly views: Record<ViewName, ViewResult>;
}

/** Separación entre vistas en la lámina (mm). */
export const VIEW_GAP = 14;
const BIG = 400;

const solidCache = new Map<string, Manifold>();

function solidOf(wasm: ManifoldToplevel, piece: Piece): Manifold {
  const key = JSON.stringify(piece.operaciones);
  let solid = solidCache.get(key);
  if (!solid) {
    solid = buildSolid(wasm, piece);
    solidCache.set(key, solid);
  }
  return solid;
}

interface Box {
  min: [number, number, number];
  max: [number, number, number];
}

/** Cajas que se quitan para un corte y planos de corte (para reconocer sus caras). */
export function cutters(
  cut: Cut,
  bounds: Bounds,
): { boxes: Box[]; planes: [0 | 1 | 2, number][]; silent: [0 | 1 | 2, number][] } {
  // Eje de profundidad de la vista y eje a lo ancho (u).
  const depth: 0 | 1 | 2 = cut.vista === 'alzado' ? 1 : cut.vista === 'planta' ? 2 : 0;
  const across: 0 | 1 | 2 = cut.vista === 'perfil' ? 1 : 0;
  // Lo que se quita está del lado del observador: delante (a mayor), arriba (c mayor) o a la
  // izquierda (x menor).
  const towardObserver = cut.vista === 'perfil' ? -1 : 1;
  const box = (plane: number, from: number, to: number): Box => {
    const min: [number, number, number] = [-BIG, -BIG, -BIG];
    const max: [number, number, number] = [BIG, BIG, BIG];
    if (towardObserver > 0) min[depth] = plane;
    else max[depth] = plane;
    min[across] = from;
    max[across] = to;
    return { min, max };
  };
  const mid = cut.medio ?? (bounds.min[across] + bounds.max[across]) / 2;
  switch (cut.tipo) {
    case 'total':
      return { boxes: [box(cut.en, -BIG, BIG)], planes: [[depth, cut.en]], silent: [] };
    case 'medio':
      return {
        boxes: [box(cut.en, mid, BIG)],
        planes: [[depth, cut.en]],
        silent: [[across, mid]],
      };
    case 'quebrado': {
      const change = cut.cambio ?? mid;
      const en2 = cut.en2 ?? cut.en;
      return {
        boxes: [box(cut.en, -BIG, change), box(en2, change, BIG)],
        planes: [
          [depth, cut.en],
          [depth, en2],
          [across, change],
        ],
        silent: [],
      };
    }
  }
}

function onPlanes(mesh: TriMesh, planes: readonly [0 | 1 | 2, number][]): (t: number) => boolean {
  return (t) =>
    planes.some(([axis, value]) =>
      [0, 1, 2].every((k) => {
        const v = mesh.triangles[t * 3 + k] as number;
        return Math.abs((mesh.positions[v * 3 + axis] as number) - value) < 1e-3;
      }),
    );
}

/** Ejes de simetría de cilindros y taladros en una vista. */
function axesIn(view: ViewName, piece: Piece, bounds: Bounds): Seg2[] {
  const out: Seg2[] = [];
  const over = 3;
  const viewDepth = view === 'alzado' ? 1 : view === 'planta' || view === 'plantaInversa' ? 2 : 0;
  for (const r of revolutions(piece, bounds)) {
    const i = axisIndex(r.axis);
    const [u, v] = project(view, r.base);
    if (i === viewDepth) {
      // El eje se ve de punta: dos ejes perpendiculares que se cruzan en el centro.
      const e = r.radius + over;
      out.push({ x1: u - e, y1: v, x2: u + e, y2: v }, { x1: u, y1: v - e, x2: u, y2: v + e });
    } else {
      const end = [...r.base] as [number, number, number];
      end[i] += r.length;
      const [u2, v2] = project(view, end);
      const len = Math.hypot(u2 - u, v2 - v) || 1;
      const du = ((u2 - u) / len) * over;
      const dv = ((v2 - v) / len) * over;
      out.push({ x1: u - du, y1: v - dv, x2: u2 + du, y2: v2 + dv });
    }
  }
  return out;
}

/** Sección abatida: corte por un plano ⟂ al eje, girado 90° sobre la vista (ISO 128-3). */
function revolvedSection(
  solid: Manifold,
  spec: NonNullable<NormStep['seccionAbatida']>,
): { outline: Seg2[]; hatch: Seg2[] } {
  const i = axisIndex(spec.eje);
  // Se permuta la pieza (permutación par, sin reflejo) para que el eje pedido sea el tercero
  // y se corta a esa altura: la sección sale en las otras dos coordenadas.
  const order: [number, number, number] = i === 0 ? [1, 2, 0] : i === 1 ? [2, 0, 1] : [0, 1, 2];
  const moved =
    i === 2
      ? solid
      : solid.warp((v) => {
          const p = [v[0], v[1], v[2]];
          v[0] = p[order[0]] as number;
          v[1] = p[order[1]] as number;
          v[2] = p[order[2]] as number;
        });
  const polygons = moved.slice(spec.en).toPolygons();
  const toSpace = (s: number, t: number): [number, number, number] => {
    const p: [number, number, number] = [0, 0, 0];
    p[order[0]] = s;
    p[order[1]] = t;
    p[order[2]] = spec.en;
    return p;
  };
  // ¿Cómo se ve el plano en la vista? Como recta vertical (el eje va a lo ancho), horizontal
  // (el eje va a lo alto) o de frente (el eje es la profundidad: sección sin girar).
  const step = [0, 0, 0];
  step[i] = 1;
  const [u0, v0] = project(spec.vista, [0, 0, 0]);
  const [u1, v1] = project(spec.vista, step);
  const acrossU = Math.abs(u1 - u0) > 0.5;
  const acrossV = Math.abs(v1 - v0) > 0.5;
  const all = polygons.flat().map(([s, t]) => project(spec.vista, toSpace(s, t)));
  const depths = all.map((q) => q[2]);
  const dc = (Math.min(...depths) + Math.max(...depths)) / 2;
  const place = (q: [number, number, number]): [number, number] =>
    acrossU ? [q[0] + (q[2] - dc), q[1]] : acrossV ? [q[0], q[1] + (q[2] - dc)] : [q[0], q[1]];
  const outline: Seg2[] = [];
  const tris: [number, number][][] = [];
  for (const poly of polygons) {
    const pts = poly.map(([s, t]) => place(project(spec.vista, toSpace(s, t))));
    pts.forEach((p, k) => {
      const q = pts[(k + 1) % pts.length] as [number, number];
      outline.push({ x1: p[0], y1: p[1], x2: q[0], y2: q[1] });
    });
    // Triangulación en abanico (las secciones de estas piezas son polígonos convexos sencillos).
    for (let k = 1; k < pts.length - 1; k++) {
      tris.push([
        pts[0] as [number, number],
        pts[k] as [number, number],
        pts[k + 1] as [number, number],
      ]);
    }
  }
  return { outline, hatch: hatch(tris, 2) };
}

export function buildDrawing(wasm: ManifoldToplevel, piece: Piece, step: NormStep): PieceDrawing {
  const bounds = boundsOf(piece);
  const solid = solidOf(wasm, piece);
  const mesh = toMesh(solid);
  let kept: TriMesh | null = null;
  let removed: TriMesh | null = null;
  const views = {} as Record<ViewName, ViewResult>;
  const cut = step.corte;
  let cutInfo: ReturnType<typeof cutters> | null = null;
  if (cut) {
    cutInfo = cutters(cut, bounds);
    kept = toMesh(cutWithBoxes(wasm, solid, cutInfo.boxes));
    // Lo que se quita: la pieza menos lo que queda.
    let rest: Manifold | null = null;
    for (const b of cutInfo.boxes) {
      const size = [0, 1, 2].map((i) => (b.max[i] as number) - (b.min[i] as number)) as [
        number,
        number,
        number,
      ];
      const part = solid.intersect(wasm.Manifold.cube(size).translate(b.min));
      rest = rest ? rest.add(part) : part;
    }
    removed = rest ? toMesh(rest) : null;
  }
  for (const view of [
    'alzado',
    'planta',
    'plantaInversa',
    'perfil',
    'perfilDerecho',
    'isometrica',
    'caballera',
  ] as const) {
    // La caballera y la planta invertida solo se calculan si el paso las pide (cada vista con
    // ocultas cuesta tiempo).
    if (
      (view === 'caballera' || view === 'plantaInversa' || view === 'perfilDerecho') &&
      !step.vistas.includes(view)
    ) {
      views[view] = {
        visible: [],
        hidden: [],
        hatch: [],
        axes: [],
        revolved: [],
        revolvedHatch: [],
        sectioned: false,
      };
      continue;
    }
    const axes = step.ejes ? axesIn(view, piece, bounds) : [];
    if (cut && cutInfo && kept && cut.vista === view) {
      const isCut = onPlanes(kept, cutInfo.planes);
      const isSilent = onPlanes(kept, cutInfo.silent);
      const d = drawView(kept, view, {
        hidden: false,
        isCutTriangle: (t) => isCut(t) || isSilent(t),
      });
      // En el corte al medio, la separación entre la mitad cortada y la vista es un eje.
      const extraAxes: Seg2[] = [];
      if (cut.tipo === 'medio') {
        const across = view === 'perfil' ? 1 : 0;
        const m = cut.medio ?? (bounds.min[across] + bounds.max[across]) / 2;
        const lo = [...bounds.min] as [number, number, number];
        const hi = [...bounds.max] as [number, number, number];
        lo[across] = m;
        hi[across] = m;
        const [u1, v1] = project(view, lo);
        const [u2, v2] = project(view, hi);
        extraAxes.push({ x1: u1, y1: v1, x2: u2, y2: v2 });
      }
      views[view] = {
        visible: d.visible,
        hidden: [],
        hatch: hatch(d.cutTriangles, 2.5),
        axes: [...axes, ...extraAxes],
        revolved: [],
        revolvedHatch: [],
        sectioned: true,
      };
    } else {
      const d = drawView(mesh, view, { hidden: step.ocultas });
      views[view] = {
        visible: d.visible,
        hidden: d.hidden,
        hatch: [],
        axes,
        revolved: [],
        revolvedHatch: [],
        sectioned: false,
      };
    }
  }
  if (step.seccionAbatida) {
    const r = revolvedSection(solid, step.seccionAbatida);
    const v = views[step.seccionAbatida.vista];
    views[step.seccionAbatida.vista] = { ...v, revolved: r.outline, revolvedHatch: r.hatch };
  }
  return { piece, bounds, mesh, kept, removed, views };
}

/** Coloca un punto de una vista en la lámina (sistema europeo). */
export function placeInSheet(
  view: ViewName,
  bounds: Bounds,
  u: number,
  v: number,
): { x: number; y: number } {
  const [, amin, cmin] = bounds.min;
  const xmax = bounds.max[0];
  const half = VIEW_GAP / 2;
  switch (view) {
    case 'alzado':
      return { x: u, y: v - cmin + half };
    case 'planta':
      return { x: u, y: v + amin - half };
    case 'plantaInversa':
      return { x: u, y: v - bounds.max[1] - half };
    case 'perfilDerecho':
      // A la izquierda del alzado (sistema europeo): lo de delante, junto a él.
      return { x: u + amin + bounds.min[0] - VIEW_GAP, y: v - cmin + half };
    case 'perfil':
      return { x: u - amin + xmax + VIEW_GAP, y: v - cmin + half };
    case 'isometrica':
    case 'caballera':
      return { x: u, y: v };
  }
}
