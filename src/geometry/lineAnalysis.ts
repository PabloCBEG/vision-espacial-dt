// Análisis de una recta: tramos vistos y ocultos, cuadrantes que atraviesa y casos especiales.
import { lineDirection } from './line.ts';
import { quadrant, type Quadrant } from './point.ts';
import { PARALLEL_EPSILON, TOLERANCE_MM, type Line, type Point } from './types.ts';
import { add, length, scale } from './vector.ts';

/** Caja de dibujo: |x|, |a|, |c| ≤ extent (mm). */
export const DRAWING_EXTENT_MM = 80;

export interface LineSegment {
  from: Point;
  to: Point;
  /** Cuadrante del tramo (el de su punto medio). */
  quadrant: Quadrant;
  /** Vista (continua) si está en el primer cuadrante, incluidos sus bordes; si no, oculta. */
  visible: boolean;
}

/** Punto de la recta para el parámetro t (t = 0 en p1, t = 1 en p2). */
export function pointAt(r: Line, t: number): Point {
  return add(r.p1, scale(lineDirection(r), t));
}

/**
 * Intervalo de t en el que la recta está dentro de la caja de dibujo.
 * Devuelve null si no la atraviesa.
 */
export function clipToBox(r: Line, extent = DRAWING_EXTENT_MM): [number, number] | null {
  const d = lineDirection(r);
  let t0 = -Infinity;
  let t1 = Infinity;
  for (const axis of ['x', 'a', 'c'] as const) {
    const p = r.p1[axis];
    const v = d[axis];
    if (Math.abs(v) <= PARALLEL_EPSILON * length(d)) {
      if (Math.abs(p) > extent) return null;
      continue;
    }
    const ta = (-extent - p) / v;
    const tb = (extent - p) / v;
    t0 = Math.max(t0, Math.min(ta, tb));
    t1 = Math.min(t1, Math.max(ta, tb));
  }
  return t0 < t1 ? [t0, t1] : null;
}

/**
 * Tramos de la recta dentro de la caja, separados por sus trazas (donde cambia de cuadrante).
 * Convenio del sistema diédrico: solo es vista la parte del primer cuadrante.
 */
export function lineSegments(r: Line, extent = DRAWING_EXTENT_MM): LineSegment[] {
  const range = clipToBox(r, extent);
  if (!range) return [];
  const [t0, t1] = range;
  const d = lineDirection(r);
  const cuts = [t0, t1];
  for (const axis of ['a', 'c'] as const) {
    if (Math.abs(d[axis]) > PARALLEL_EPSILON * length(d)) {
      const t = -r.p1[axis] / d[axis];
      if (t > t0 && t < t1) cuts.push(t);
    }
  }
  cuts.sort((m, n) => m - n);

  const segments: LineSegment[] = [];
  for (let i = 0; i < cuts.length - 1; i++) {
    const ta = cuts[i] ?? 0;
    const tb = cuts[i + 1] ?? 0;
    if (tb - ta < 1e-9) continue;
    const mid = pointAt(r, (ta + tb) / 2);
    segments.push({
      from: pointAt(r, ta),
      to: pointAt(r, tb),
      quadrant: quadrant(mid),
      visible: mid.a >= -TOLERANCE_MM && mid.c >= -TOLERANCE_MM,
    });
  }
  return segments;
}

/** Cuadrantes que atraviesa la recta, en orden y sin repetir los seguidos. */
export function quadrantsCrossed(r: Line, extent = DRAWING_EXTENT_MM): Quadrant[] {
  const result: Quadrant[] = [];
  for (const s of lineSegments(r, extent)) {
    if (result[result.length - 1] !== s.quadrant) result.push(s.quadrant);
  }
  return result;
}

/** Casos de recta que interesan en clase. Una recta puede cumplir varios a la vez. */
export type LineCase =
  | 'parallelToLT' // paralela a la LT: sin trazas
  | 'profile' // de perfil: proyecciones perpendiculares a la LT; hace falta la tercera
  | 'horizontal' // paralela al PH: sin traza H
  | 'frontal' // paralela al PV: sin traza V
  | 'vertical' // perpendicular al PH
  | 'endOn' // de punta: perpendicular al PV
  | 'crossesLT' // corta a la LT: H y V coinciden
  | 'oblique'; // cualquiera

export function classifyLine(r: Line): LineCase[] {
  const d = lineDirection(r);
  const n = length(d);
  const zero = (v: number): boolean => Math.abs(v) <= 1e-6 * n;
  const cases: LineCase[] = [];
  if (zero(d.a) && zero(d.c)) cases.push('parallelToLT');
  if (zero(d.x) && !(zero(d.a) && zero(d.c))) cases.push('profile');
  if (zero(d.c) && !zero(d.x)) cases.push('horizontal');
  if (zero(d.a) && !zero(d.x)) cases.push('frontal');
  if (zero(d.x) && zero(d.a)) cases.push('vertical');
  if (zero(d.x) && zero(d.c)) cases.push('endOn');
  // Corta a la LT si en perfil (a, c) la recta pasa por el origen y no es paralela a ella.
  if (!(zero(d.a) && zero(d.c))) {
    const cross = r.p1.a * d.c - r.p1.c * d.a;
    if (Math.abs(cross) / Math.hypot(d.a, d.c) <= TOLERANCE_MM) cases.push('crossesLT');
  }
  if (cases.length === 0) cases.push('oblique');
  return cases;
}

/**
 * Punto donde rotular una recta: cerca de su extremo derecho dentro de la caja,
 * pero un poco hacia dentro (inset) para que el rótulo no quede en el borde.
 */
export function labelAnchor(r: Line, extent = DRAWING_EXTENT_MM, inset = 0.12): Point | null {
  const range = clipToBox(r, extent);
  if (!range) return null;
  const [t0, t1] = range;
  const a = pointAt(r, t0);
  const b = pointAt(r, t1);
  // Hacia el extremo de mayor x (o, si es de perfil, el de mayor cota).
  const towardB = b.x > a.x || (b.x === a.x && b.c > a.c);
  const t = towardB ? t1 - (t1 - t0) * inset : t0 + (t1 - t0) * inset;
  return pointAt(r, t);
}
