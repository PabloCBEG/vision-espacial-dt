// Construcción del motor de sólidos a partir de los datos del paso y de los valores animados.
// La usan la vista 3D y la lámina. Sin Three.js ni DOM.
import {
  createPlane,
  createPoint,
  planeTraces,
  type Plane,
  type Point,
} from '../../geometry/index.ts';
import { foldPoint, hingeFor, hingeFoot, type Hinge } from '../metodos/geometry.ts';
import type { SolidsStep } from './definition.ts';
import {
  add,
  clip,
  conicKind,
  cube,
  dot,
  flipPlane,
  frustum,
  lineHits,
  linePieces,
  octahedron,
  planeThrough,
  prism,
  pyramid,
  scale,
  section,
  SMOOTH_SEGMENTS,
  supportFrame,
  surfacePoint,
  tetrahedron,
  unfold,
  unfoldTree,
  vertices,
  type ConicKind,
  type CutPlane,
  type LinePiece,
  type Polyhedron,
  type Section,
} from './polyhedron.ts';

export interface Animated {
  quitar: number;
  abatir: number;
  desarrollo: number;
  punto: number;
}

export interface NamedVertex {
  readonly name: string;
  readonly p: Point;
}

export interface CutInfo {
  readonly plane: CutPlane;
  readonly geometric: Plane;
  readonly name: string;
  readonly traces: ReturnType<typeof planeTraces>;
  readonly section: Section | null;
  /** Parte que se queda (debajo del plano) y parte retirada, ya desplazada. */
  readonly kept: Polyhedron | null;
  readonly removed: Polyhedron | null;
  /** Sección abatida sobre el PH (alrededor de α₁) o el PV (alrededor de α₂): verdadera magnitud. */
  readonly hinge: Hinge | null;
  readonly onto: 'PH' | 'PV';
  readonly folded: readonly Point[];
  readonly conic: { kind: ConicKind; why: string } | null;
}

export interface SurfacePointInfo {
  readonly name: string;
  readonly p: Point;
  readonly given: 'horizontal' | 'vertical';
  readonly method: 'generatriz' | 'paralelo';
  /** Generatriz: de V (o de la base de arriba) a la base, pasando por el punto. */
  readonly generatrix: readonly [Point, Point] | null;
  /** Paralelo: sección horizontal por el punto. */
  readonly parallel: readonly Point[] | null;
}

export interface SolidScene {
  readonly solid: Polyhedron;
  readonly type: SolidsStep['solido']['tipo'];
  readonly names: readonly NamedVertex[];
  readonly smooth: boolean;
  readonly cut: CutInfo | null;
  readonly line: {
    readonly name: string;
    readonly A: Point;
    readonly B: Point;
    readonly hits: readonly [Point, Point] | null;
    readonly plan: readonly LinePiece[];
    readonly elevation: readonly LinePiece[];
  } | null;
  readonly point: SurfacePointInfo | null;
  /** Caras desplegadas (con la fracción animada) y si son del tronco. */
  readonly development: {
    readonly faces: readonly (readonly Point[])[];
    readonly flat: readonly (readonly Point[])[];
    readonly poly: Polyhedron;
  } | null;
  readonly notice: string | null;
}

/** Desplazamiento de la parte retirada al quitarla del todo (mm). */
const REMOVE_DISTANCE = 45;

export function buildSolid(data: SolidsStep['solido']): Polyhedron {
  const frame = supportFrame(data.apoyo, data.centro, data.giro, data.elevacion);
  switch (data.tipo) {
    case 'tetraedro':
      return tetrahedron(frame, data.arista);
    case 'cubo':
      return cube(frame, data.arista);
    case 'octaedro':
      return octahedron(frame, data.arista);
    case 'prisma':
      return prism(frame, data.lados, data.radio, data.altura);
    case 'piramide':
      return pyramid(frame, data.lados, data.radio, data.altura);
    case 'tronco':
      return frustum(frame, data.lados, data.radio, data.radioSuperior, data.altura);
    case 'cono':
      return pyramid(frame, SMOOTH_SEGMENTS, data.radio, data.altura, true);
    case 'cilindro':
      return prism(frame, SMOOTH_SEGMENTS, data.radio, data.altura, true);
  }
}

/** Nombres de los vértices: A, B, C… en la base (y siguientes arriba) y V en el vértice. */
export function vertexNames(poly: Polyhedron, type: SolidsStep['solido']['tipo']): NamedVertex[] {
  if (type === 'cono' || type === 'cilindro') {
    return poly.apex ? [{ name: 'V', p: poly.apex }] : [];
  }
  const base = poly.faces.find((f) => f.kind === 'base');
  const top = poly.faces.find((f) => f.kind === 'top');
  const letters = 'ABCDEFGHIJKLMNOPQRSTU';
  const out: NamedVertex[] = [];
  const add1 = (p: Point): void => {
    if (out.some((v) => same(v.p, p))) return;
    if (poly.apex && same(p, poly.apex)) return;
    out.push({ name: letters[out.length] ?? '?', p });
  };
  if (base) {
    // La base en orden antihorario visto desde arriba.
    [...base.points].reverse().forEach(add1);
    if (top) top.points.forEach((p) => add1(p));
  }
  for (const p of vertices(poly)) add1(p);
  if (poly.apex) out.push({ name: 'V', p: poly.apex });
  return out;
}

const same = (p: Point, q: Point): boolean =>
  Math.abs(p.x - q.x) < 1e-5 && Math.abs(p.a - q.a) < 1e-5 && Math.abs(p.c - q.c) < 1e-5;

/** Plano de corte a partir de los datos. La normal apunta «hacia arriba» (la parte que se quita). */
export function cutPlaneOf(data: NonNullable<SolidsStep['seccion']>): CutPlane | null {
  let plane: CutPlane | null = null;
  const [p, q] = data.puntos ?? [];
  switch (data.tipo) {
    case 'proyectante-vertical':
      if (p && q) {
        // Perpendicular al PV: contiene la dirección del alejamiento.
        plane = planeThrough(
          createPoint(p[0], 0, p[1]),
          createPoint(q[0], 0, q[1]),
          createPoint(p[0], 10, p[1]),
        );
      }
      break;
    case 'proyectante-horizontal':
      if (p && q) {
        plane = planeThrough(
          createPoint(p[0], p[1], 0),
          createPoint(q[0], q[1], 0),
          createPoint(p[0], p[1], 10),
        );
      }
      break;
    case 'horizontal':
      plane = { normal: createPoint(0, 0, 1), d: data.valor ?? 20 };
      break;
    case 'frontal':
      plane = { normal: createPoint(0, 1, 0), d: data.valor ?? 20 };
      break;
    case 'tres-puntos': {
      const [a, b, c] = data.tresPuntos ?? [];
      if (a && b && c) {
        plane = planeThrough(
          createPoint(a[0], a[1], a[2]),
          createPoint(b[0], b[1], b[2]),
          createPoint(c[0], c[1], c[2]),
        );
      }
      break;
    }
  }
  if (!plane) return null;
  const n = plane.normal;
  const up =
    n.c > 1e-9 || (Math.abs(n.c) <= 1e-9 && (n.a > 1e-9 || (Math.abs(n.a) <= 1e-9 && n.x > 0)));
  return up ? plane : flipPlane(plane);
}

/** Tres puntos del plano de corte (para las trazas y el abatimiento). */
function planeOfCut(plane: CutPlane): Plane {
  const n = plane.normal;
  const origin = scale(n, plane.d);
  // Dos direcciones del plano.
  const helper = Math.abs(n.c) < 0.9 ? createPoint(0, 0, 1) : createPoint(1, 0, 0);
  const u = cross3(n, helper);
  const v = cross3(n, u);
  return createPlane(origin, add(origin, scale(u, 20)), add(origin, scale(v, 20)));
}

function cross3(u: Point, v: Point): Point {
  const p = createPoint(u.a * v.c - u.c * v.a, u.c * v.x - u.x * v.c, u.x * v.a - u.a * v.x);
  const len = Math.hypot(p.x, p.a, p.c) || 1;
  return createPoint(p.x / len, p.a / len, p.c / len);
}

export function buildScene(data: SolidsStep, anim: Animated): SolidScene {
  const solid = buildSolid(data.solido);
  const type = data.solido.tipo;
  const smooth = type === 'cono' || type === 'cilindro';
  const names = vertexNames(solid, type);
  let notice: string | null = null;

  let cut: CutInfo | null = null;
  if (data.seccion) {
    const plane = cutPlaneOf(data.seccion);
    if (plane) {
      const geometric = planeOfCut(plane);
      const s = section(solid, plane);
      if (!s) notice = 'El plano no corta al sólido.';
      const kept = s ? clip(solid, plane) : null;
      const top = s ? clip(solid, flipPlane(plane)) : null;
      const shift = scale(plane.normal, REMOVE_DISTANCE * anim.quitar);
      const removed = top ? moveSolid(top, shift) : null;
      const onto =
        data.seccion.sobre ?? (data.seccion.tipo === 'proyectante-vertical' ? 'PV' : 'PH');
      const hinge = hingeFor(geometric, onto);
      const folded = s && hinge ? s.polygon.map((p) => foldPoint(p, hinge, anim.abatir)) : [];
      let conic: CutInfo['conic'] = null;
      if (smooth && solid.axis && s) {
        const half =
          type === 'cono' ? (Math.atan(data.solido.radio / data.solido.altura) * 180) / Math.PI : 0;
        const apex = solid.apex;
        const throughApex = apex !== null && Math.abs(dot(plane.normal, apex) - plane.d) < 1e-6;
        conic = conicKind(solid.axis.direction, plane.normal, half, throughApex);
      }
      cut = {
        plane,
        geometric,
        name: data.seccion.nombre,
        traces: planeTraces(geometric),
        section: s,
        kept,
        removed,
        hinge,
        onto,
        folded,
        conic,
      };
    }
  }

  let line: SolidScene['line'] = null;
  if (data.recta) {
    const [p, q] = data.recta.puntos;
    const A = createPoint(p[0], p[1], p[2]);
    const B = createPoint(q[0], q[1], q[2]);
    const hits = lineHits(solid, A, B);
    if (!hits) notice = `La recta ${data.recta.nombre} no corta al sólido.`;
    line = {
      name: data.recta.nombre,
      A,
      B,
      hits,
      plan: linePieces(solid, A, B, 'plan'),
      elevation: linePieces(solid, A, B, 'elevation'),
    };
  }

  let point: SurfacePointInfo | null = null;
  if (data.punto) {
    const [u, v] = data.punto.en;
    const p = surfacePoint(solid, data.punto.dado, u, v, data.punto.lado);
    if (!p) {
      notice = 'Esa proyección no corresponde a ningún punto de la superficie.';
    } else {
      point = surfaceConstruction(solid, data, p);
    }
  }

  let development: SolidScene['development'] = null;
  if (data.desarrollo !== undefined) {
    const poly = cut?.kept ?? solid;
    const tree = unfoldTree(poly);
    if (tree) {
      development = {
        faces: unfold(poly, tree, anim.desarrollo),
        flat: unfold(poly, tree, 1),
        poly,
      };
    }
  }

  return { solid, type, names, smooth, cut, line, point, development, notice };
}

function moveSolid(poly: Polyhedron, shift: Point): Polyhedron {
  return {
    faces: poly.faces.map((f) => ({ ...f, points: f.points.map((p) => add(p, shift)) })),
    apex: poly.apex ? add(poly.apex, shift) : null,
    axis: poly.axis,
  };
}

/** Construcción de un punto sobre la superficie: generatriz o paralelo que pasa por él. */
function surfaceConstruction(solid: Polyhedron, data: SolidsStep, p: Point): SurfacePointInfo {
  const info = data.punto;
  if (!info) throw new Error('sin punto');
  const axis = solid.axis;
  let generatrix: [Point, Point] | null = null;
  let parallel: Point[] | null = null;
  if (info.metodo === 'generatriz' && axis) {
    if (solid.apex) {
      // Por el vértice: V, el punto y el pie en la base.
      const V = solid.apex;
      const dir = createPoint(p.x - V.x, p.a - V.a, p.c - V.c);
      const h = dot(
        createPoint(V.x - axis.base.x, V.a - axis.base.a, V.c - axis.base.c),
        axis.direction,
      );
      const along = -dot(dir, axis.direction);
      const t = along > 1e-9 ? h / along : 1;
      generatrix = [V, add(V, scale(dir, t))];
    } else {
      // Prisma o cilindro: paralela al eje por el punto, de base a base.
      const h = data.solido.altura;
      const k = dot(
        createPoint(p.x - axis.base.x, p.a - axis.base.a, p.c - axis.base.c),
        axis.direction,
      );
      const foot = add(p, scale(axis.direction, -k));
      generatrix = [foot, add(foot, scale(axis.direction, h))];
    }
  } else if (axis) {
    // Paralelo: sección por el plano perpendicular al eje que pasa por el punto.
    const s = section(solid, { normal: axis.direction, d: dot(axis.direction, p) });
    parallel = s ? [...s.polygon] : null;
  }
  return { name: info.nombre, p, given: info.dado, method: info.metodo, generatrix, parallel };
}

export { hingeFoot };
