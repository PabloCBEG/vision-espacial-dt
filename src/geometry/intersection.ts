// Intersecciones: de dos planos (una recta) y de una recta con un plano (un punto).
import { lineDirection, lineTraces } from './line.ts';
import { PARALLEL_EPSILON, type Line, type Plane, type Point } from './types.ts';
import { add, cross, dot, length, scale, sub } from './vector.ts';

/** Punto donde la recta atraviesa el plano; null si es paralela a él o está contenida en él. */
export function intersectLinePlane(r: Line, alpha: Plane): Point | null {
  const d = lineDirection(r);
  const along = dot(alpha.normal, d);
  if (Math.abs(along) <= PARALLEL_EPSILON * length(d)) return null;
  const t = dot(alpha.normal, sub(alpha.p1, r.p1)) / along;
  return add(r.p1, scale(d, t));
}

/**
 * Dos puntos de la recta común a dos planos. Si la recta tiene las dos trazas, son H y V; si no,
 * dos puntos cualesquiera de ella. Null si los planos son paralelos (o el mismo).
 */
export function commonLinePoints(a: Plane, b: Plane): [Point, Point] | null {
  const d = cross(a.normal, b.normal);
  const size = length(d);
  if (size <= PARALLEL_EPSILON) return null;
  const ha = dot(a.normal, a.p1);
  const hb = dot(b.normal, b.p1);
  // Un punto de la recta: x = (ha·(n2 × d) + hb·(d × n1)) / |d|²
  const p = scale(
    add(scale(cross(b.normal, d), ha), scale(cross(d, a.normal), hb)),
    1 / (size * size),
  );
  const traces = lineTraces({ p1: p, p2: add(p, d) });
  if (traces.h && traces.v) return [traces.h, traces.v];
  return [p, add(p, scale(d, 40 / size))];
}
