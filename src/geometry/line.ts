// Recta: creación, trazas y pertenencia de un punto.
import { PARALLEL_EPSILON, TOLERANCE_MM, type Line, type Point } from './types.ts';
import { add, createPoint, cross, distance, length, scale, sub } from './vector.ts';

/** Crea la recta que pasa por p1 y p2. Los puntos deben ser distintos. */
export function createLine(p1: Point, p2: Point): Line {
  if (distance(p1, p2) <= TOLERANCE_MM) {
    throw new Error('Una recta necesita dos puntos distintos.');
  }
  return { p1, p2 };
}

/** Vector director de la recta (de p1 a p2). */
export function lineDirection(r: Line): Point {
  return sub(r.p2, r.p1);
}

/**
 * Trazas de una recta.
 * - h: traza horizontal H, punto de corte con el PH (cota 0).
 * - v: traza vertical V, punto de corte con el PV (alejamiento 0).
 * Es null si la recta es paralela a ese plano o está contenida en él.
 */
export function lineTraces(r: Line): { h: Point | null; v: Point | null } {
  return {
    h: intersectWithProjectionPlane(r, 'c'),
    v: intersectWithProjectionPlane(r, 'a'),
  };
}

/** Corte de la recta con el PH (coordenada 'c' = 0) o con el PV (coordenada 'a' = 0). */
function intersectWithProjectionPlane(r: Line, coordinate: 'a' | 'c'): Point | null {
  const d = lineDirection(r);
  if (Math.abs(d[coordinate]) <= PARALLEL_EPSILON * length(d)) {
    return null;
  }
  const t = -r.p1[coordinate] / d[coordinate];
  const p = add(r.p1, scale(d, t));
  // La coordenada del plano es exactamente 0 por definición.
  return coordinate === 'c' ? createPoint(p.x, p.a, 0) : createPoint(p.x, 0, p.c);
}

/** Distancia de un punto a una recta. */
export function distancePointToLine(p: Point, r: Line): number {
  const d = lineDirection(r);
  return length(cross(sub(p, r.p1), d)) / length(d);
}

/** ¿Está el punto en la recta? Tolerancia de 0,01 mm. */
export function pointOnLine(p: Point, r: Line): boolean {
  return distancePointToLine(p, r) <= TOLERANCE_MM;
}
