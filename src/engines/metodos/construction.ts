// Construcción de un método a partir de los datos del paso: qué se mueve, alrededor de qué,
// dónde queda y qué se mide. La usan la vista 3D y la lámina. Sin Three.js ni DOM.
import {
  createPlane,
  planeTraces,
  type Line,
  type Plane,
  type Point,
  type SheetPoint,
} from '../../geometry/index.ts';
import { distance } from '../../geometry/vector.ts';
import { formatDecimal } from '../../ui/format.ts';
import type { MethodName, MethodsStep } from './definition.ts';
import {
  angleAt,
  angleWithPH,
  angleWithPV,
  changedProjection,
  changeFoot,
  coneOfLines,
  conePoint,
  footOnLine,
  footOnPlane,
  foldPoint,
  hingeFoot,
  hingeFor,
  linePlaneIntersection,
  newProjectionSide,
  parallelGroundLine,
  projectingPlane,
  projectOntoNewPlane,
  rotateAboutAxisKind,
  sheetH,
  sheetV,
  straighteningAngle,
  tangentPlane,
  type AxisKind,
  type Cone,
  type FoldTarget,
  type Hinge,
  type NewGroundLine,
} from './geometry.ts';

export interface NamedPoint {
  readonly name: string;
  readonly p: Point;
  /** true si lo calcula el motor (pie F, intersección I): la lámina lo rotula. */
  readonly computed: boolean;
}

/** Lo que el motor necesita de la escena: puntos con nombre, rectas y planos. */
export interface SceneLookup {
  point(name: string): Point | null;
  line(id: string): Line | null;
  plane(id: string): Plane | null;
}

export interface AngleMark {
  readonly vertex: SheetPoint;
  readonly from: SheetPoint;
  readonly to: SheetPoint;
}

export interface Measure {
  readonly text: string;
  readonly value: number;
  readonly unit: 'mm' | '°' | '';
  /** Dónde rotularla en la lámina. */
  readonly at: SheetPoint;
  readonly angle: AngleMark | null;
}

interface Base {
  readonly figure: readonly NamedPoint[];
  readonly target: MethodsStep['objetivo'];
  readonly notice: string | null;
  readonly perpendicular: readonly [NamedPoint, NamedPoint] | null;
  readonly cone: ConeConstruction | null;
}

export interface FoldConstruction extends Base {
  readonly method: 'abatimiento';
  readonly onto: FoldTarget;
  readonly hinge: Hinge;
}

export interface TurnConstruction extends Base {
  readonly method: 'giro';
  readonly axis: AxisKind;
  readonly through: Point;
  readonly angle: number;
}

export interface ChangeConstruction extends Base {
  readonly method: 'cambio';
  readonly lt: NewGroundLine;
  readonly side: SheetPoint;
}

export interface StillConstruction extends Base {
  readonly method: null;
}

export type Construction =
  FoldConstruction | TurnConstruction | ChangeConstruction | StillConstruction;

export interface ConeConstruction {
  readonly cone: Cone;
  readonly base: Point;
  readonly tangent: Plane | null;
}

/** Nombre de un punto tras el método: (A) abatido, A₁ girado o en el plano nuevo. */
export function movedName(method: MethodName, name: string): string {
  return method === 'abatimiento' ? `(${name})` : `${name}₁`;
}

/** Resuelve la construcción. Devuelve null si faltan datos (puntos inexistentes…). */
export function buildConstruction(data: MethodsStep, scene: SceneLookup): Construction | null {
  const target = data.objetivo;
  let figure: NamedPoint[] = [];
  let perpendicular: readonly [NamedPoint, NamedPoint] | null = null;

  if (data.figura) {
    for (const name of data.figura) {
      const p = scene.point(name);
      if (!p) return null;
      figure.push({ name, p, computed: false });
    }
  }
  if (data.distancia) {
    const P = scene.point(data.distancia.desde);
    if (!P) return null;
    const plane = scene.plane(data.distancia.hasta);
    const line = scene.line(data.distancia.hasta);
    const F = plane ? footOnPlane(P, plane) : line ? footOnLine(P, line.p1, line.p2) : null;
    if (!F) return null;
    const from = { name: data.distancia.desde, p: P, computed: false };
    const foot = { name: 'F', p: F, computed: true };
    perpendicular = [from, foot];
    figure = [from, foot];
  }
  if (data.anguloRectaPlano) {
    const [na, nb] = data.anguloRectaPlano.recta;
    const A = scene.point(na);
    const B = scene.point(nb);
    const plane = scene.plane(data.anguloRectaPlano.plano);
    if (!A || !B || !plane) return null;
    const I = linePlaneIntersection(A, B, plane);
    if (!I) {
      return still(figure, target, 'La recta es paralela al plano: forma un ángulo de 0°.', null);
    }
    const F = footOnPlane(A, plane);
    const a = { name: na, p: A, computed: false };
    perpendicular = [a, { name: 'F', p: F, computed: true }];
    figure = [a, { name: 'I', p: I, computed: true }, { name: 'F', p: F, computed: true }];
  }

  let coneData: ConeConstruction | null = null;
  if (data.cono) {
    const V = scene.point(data.cono.vertice);
    if (!V) return null;
    const cone = coneOfLines(V, data.cono.angulo, data.cono.con);
    if (cone) {
      const base = conePoint(cone, data.cono.generatriz);
      coneData = { cone, base, tangent: data.cono.plano ? tangentPlane(cone, base) : null };
    } else {
      return still(figure, target, 'El vértice está en el plano de proyección: no hay cono.', null);
    }
  }

  const common = { figure, target, perpendicular, cone: coneData, notice: null };
  if (figure.length < 2) return { ...common, method: null };

  const ptsA = figure[0]?.p;
  const ptsB = figure[1]?.p;
  if (!ptsA || !ptsB) return null;
  const towardPV = target === 'angulo-PV';
  const isSegment = figure.length === 2;
  // Ángulo en un vértice: la figura son tres puntos (A, V, B) y se abate su plano.
  const flat = !isSegment;

  if (data.metodo === 'abatimiento') {
    const onto: FoldTarget = data.sobre ?? (towardPV ? 'PV' : 'PH');
    const plane = isSegment ? projectingPlane(ptsA, ptsB, onto) : planeOf(figure);
    if (!plane)
      return still(
        figure,
        target,
        'Los puntos están alineados: no definen un plano.',
        coneData,
        perpendicular,
      );
    const hinge = hingeFor(plane, onto);
    if (!hinge) {
      return still(
        figure,
        target,
        `La figura ya es paralela al ${onto}: se ve en verdadera magnitud sin abatir.`,
        coneData,
        perpendicular,
      );
    }
    return { ...common, method: 'abatimiento', onto, hinge };
  }

  if (flat) {
    return still(
      figure,
      target,
      'Para una figura plana, usa el abatimiento: con giro o cambio de plano harían falta dos movimientos.',
      coneData,
      perpendicular,
    );
  }

  if (data.metodo === 'giro') {
    const axis: AxisKind = data.eje ?? (towardPV ? 'punta' : 'vertical');
    const through = (data.ejePor ? scene.point(data.ejePor) : null) ?? ptsA;
    const angle = straighteningAngle(axis, ptsA, ptsB);
    return { ...common, method: 'giro', axis, through, angle };
  }

  const kind = data.cambio ?? (towardPV ? 'horizontal' : 'vertical');
  const lt = parallelGroundLine(kind, ptsA, ptsB);
  const kept = kind === 'vertical' ? sheetH(ptsA) : sheetV(ptsA);
  const side = newProjectionSide(lt, kept);
  return { ...common, method: 'cambio', lt, side };
}

function planeOf(figure: readonly NamedPoint[]): Plane | null {
  const [a, b, c] = figure;
  if (!a || !b || !c) return null;
  try {
    return createPlane(a.p, b.p, c.p);
  } catch {
    return null; // puntos alineados
  }
}

function still(
  figure: NamedPoint[],
  target: MethodsStep['objetivo'],
  notice: string,
  cone: ConeConstruction | null,
  perpendicular: readonly [NamedPoint, NamedPoint] | null = null,
): StillConstruction {
  return { method: null, figure, target, notice, perpendicular, cone };
}

// ---------- Posiciones a lo largo del movimiento ----------

/** Posición en el espacio de cada punto de la figura cuando el movimiento va por t (0 a 1). */
export function movedFigure(k: Construction, t: number): Point[] {
  switch (k.method) {
    case 'abatimiento':
      return k.figure.map((f) => foldPoint(f.p, k.hinge, t));
    case 'giro':
      return k.figure.map((f) => rotateAboutAxisKind(f.p, k.axis, k.through, k.angle * t));
    case 'cambio':
    case null:
      return k.figure.map((f) => f.p);
  }
}

/** Proyecciones nuevas en el plano nuevo, en el espacio (cambio de plano). */
export function changeProjections(k: ChangeConstruction): Point[] {
  return k.figure.map((f) => projectOntoNewPlane(f.p, k.lt));
}

/**
 * Resultado en la lámina (t = 1):
 * - abatimiento: (A) en la planta (sobre PH) o en el alzado (sobre PV);
 * - giro vertical: A″₁ (en verdadera magnitud) y A′₁; giro de punta: A′₁ y A″₁;
 * - cambio: la proyección nueva.
 * `main` es la proyección en verdadera magnitud; `other`, la que la acompaña (si hay).
 */
export function sheetResult(k: Construction): { main: SheetPoint[]; other: SheetPoint[] } {
  switch (k.method) {
    case 'abatimiento': {
      const final = movedFigure(k, 1);
      return { main: final.map(k.onto === 'PH' ? sheetH : sheetV), other: [] };
    }
    case 'giro': {
      const final = movedFigure(k, 1);
      return k.axis === 'vertical'
        ? { main: final.map(sheetV), other: final.map(sheetH) }
        : { main: final.map(sheetH), other: final.map(sheetV) };
    }
    case 'cambio':
      return { main: k.figure.map((f) => changedProjection(f.p, k.lt, k.side)), other: [] };
    case null:
      return { main: [], other: [] };
  }
}

/** Pie del arco de abatimiento de cada punto (centro del arco, sobre la charnela). */
export function foldFeet(k: FoldConstruction): Point[] {
  return k.figure.map((f) => hingeFoot(f.p, k.hinge));
}

export { changeFoot };

// ---------- Medida ----------

/** Valor buscado, calculado en el espacio (para comprobar la lámina y los ejercicios). */
export function exactValue(k: Construction): { value: number; unit: 'mm' | '°' } | null {
  const [a, b, c] = k.figure;
  if (k.cone) return { value: angleWithPH(k.cone.cone.apex, k.cone.base), unit: '°' };
  if (!a || !b) return null;
  switch (k.target) {
    case 'vm':
      return k.figure.length === 2 ? { value: distance(a.p, b.p), unit: 'mm' } : null;
    case 'angulo-PH':
      return { value: angleWithPH(a.p, b.p), unit: '°' };
    case 'angulo-PV':
      return { value: angleWithPV(a.p, b.p), unit: '°' };
    case 'angulo':
      return c ? { value: angleAt(b.p, a.p, c.p), unit: '°' } : null;
  }
}

/** Medida rotulada en la lámina, a partir del resultado dibujado. */
export function measureOf(k: Construction): Measure | null {
  if (k.method === null) {
    if (!k.cone) return null;
    const { cone, base } = k.cone;
    const onPH = cone.target === 'PH';
    // El contorno del cono forma el ángulo φ con la LT en el alzado (con el PH) o en la planta.
    const apex = onPH ? sheetV(cone.apex) : sheetH(cone.apex);
    const foot = { x: cone.apex.x + cone.radius, y: 0 };
    const value = onPH ? angleWithPH(cone.apex, base) : angleWithPV(cone.apex, base);
    return {
      text: `φ = ${formatDecimal(value)}°`,
      value,
      unit: '°',
      at: { x: foot.x + 3, y: onPH ? 4 : -4 },
      angle: { vertex: foot, from: { x: foot.x + 10, y: 0 }, to: apex },
    };
  }
  const { main } = sheetResult(k);
  const [a, b, c] = main;
  const exact = exactValue(k);
  if (!a || !b) return null;
  const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  if (k.target === 'vm') {
    if (k.figure.length !== 2) {
      return { text: 'Verdadera magnitud', value: 0, unit: '', at: centroid(main), angle: null };
    }
    const value = Math.hypot(b.x - a.x, b.y - a.y);
    return {
      text: `VM = ${formatDecimal(value)} mm`,
      value,
      unit: 'mm',
      at: mid,
      angle: null,
    };
  }
  if (k.target === 'angulo') {
    if (!c) return null;
    const value = angle2d(b, a, c);
    return {
      text: `${formatDecimal(value)}°`,
      value,
      unit: '°',
      at: b,
      angle: { vertex: b, from: a, to: c },
    };
  }
  // Ángulo con un plano de proyección: entre la verdadera magnitud y la LT (giro), la LT₁
  // (cambio) o la charnela (abatimiento del plano proyectante).
  const value = exact?.value ?? 0;
  const ref = referenceDirection(k);
  if (!ref) return null;
  let vertex: SheetPoint = a;
  let far: SheetPoint = b;
  if (k.method === 'abatimiento') {
    const o = k.onto === 'PH' ? sheetH(k.hinge.origin) : sheetV(k.hinge.origin);
    const hit = intersect2d(a, b, o, { x: o.x + ref.x, y: o.y + ref.y });
    if (hit) {
      vertex = hit;
      far = dist2(hit, a) > dist2(hit, b) ? a : b;
    }
  }
  const sign = (far.x - vertex.x) * ref.x + (far.y - vertex.y) * ref.y >= 0 ? 1 : -1;
  const along = { x: vertex.x + ref.x * 10 * sign, y: vertex.y + ref.y * 10 * sign };
  return {
    text: `${formatDecimal(value)}°`,
    value,
    unit: '°',
    at: vertex,
    angle: { vertex, from: along, to: far },
  };
}

/** Dirección unitaria (en la lámina) respecto a la que se mide el ángulo. */
function referenceDirection(k: Construction): SheetPoint | null {
  switch (k.method) {
    case 'giro':
      return { x: 1, y: 0 };
    case 'cambio': {
      const dx = k.lt.p2.x - k.lt.p1.x;
      const dy = k.lt.p2.y - k.lt.p1.y;
      const len = Math.hypot(dx, dy);
      return { x: dx / len, y: dy / len };
    }
    case 'abatimiento': {
      const d = k.hinge.direction;
      const v = k.onto === 'PH' ? { x: d.x, y: -d.a } : { x: d.x, y: d.c };
      const len = Math.hypot(v.x, v.y);
      return len < 1e-9 ? null : { x: v.x / len, y: v.y / len };
    }
    case null:
      return null;
  }
}

function centroid(points: readonly SheetPoint[]): SheetPoint {
  const n = points.length || 1;
  return {
    x: points.reduce((s, p) => s + p.x, 0) / n,
    y: points.reduce((s, p) => s + p.y, 0) / n,
  };
}

function angle2d(v: SheetPoint, a: SheetPoint, b: SheetPoint): number {
  const ux = a.x - v.x;
  const uy = a.y - v.y;
  const wx = b.x - v.x;
  const wy = b.y - v.y;
  const cos = (ux * wx + uy * wy) / (Math.hypot(ux, uy) * Math.hypot(wx, wy));
  return (Math.acos(Math.max(-1, Math.min(1, cos))) * 180) / Math.PI;
}

function intersect2d(
  p1: SheetPoint,
  p2: SheetPoint,
  q1: SheetPoint,
  q2: SheetPoint,
): SheetPoint | null {
  const d1x = p2.x - p1.x;
  const d1y = p2.y - p1.y;
  const d2x = q2.x - q1.x;
  const d2y = q2.y - q1.y;
  const den = d1x * d2y - d1y * d2x;
  if (Math.abs(den) < 1e-9) return null;
  const t = ((q1.x - p1.x) * d2y - (q1.y - p1.y) * d2x) / den;
  return { x: p1.x + d1x * t, y: p1.y + d1y * t };
}

const dist2 = (p: SheetPoint, q: SheetPoint): number => (p.x - q.x) ** 2 + (p.y - q.y) ** 2;

/** Trazas del plano tangente al cono (plano con el ángulo dado). */
export function tangentTraces(k: ConeConstruction): ReturnType<typeof planeTraces> | null {
  return k.tangent ? planeTraces(k.tangent) : null;
}
