// Plano: creación, trazas y pertenencia.
import { createLine } from './line.ts';
import { PARALLEL_EPSILON, TOLERANCE_MM, type Line, type Plane, type Point } from './types.ts';
import { add, createPoint, cross, dot, length, normalize, scale, sub } from './vector.ts';

/** Normales de los planos de proyección (ambos pasan por el origen). */
const PH_NORMAL = createPoint(0, 0, 1);
const PV_NORMAL = createPoint(0, 1, 0);

/** Crea el plano que pasa por tres puntos no alineados y calcula su normal unitaria. */
export function createPlane(p1: Point, p2: Point, p3: Point): Plane {
  const u = sub(p2, p1);
  const v = sub(p3, p1);
  const n = cross(u, v);
  // También cubre puntos repetidos: entonces u o v son nulos y n también.
  if (length(n) <= PARALLEL_EPSILON * length(u) * length(v)) {
    throw new Error('Un plano necesita tres puntos no alineados.');
  }
  return { p1, p2, p3, normal: normalize(n) };
}

/** Distancia de un punto a un plano. */
export function distancePointToPlane(p: Point, alpha: Plane): number {
  return Math.abs(dot(alpha.normal, sub(p, alpha.p1)));
}

/** ¿Está el punto en el plano? Tolerancia de 0,01 mm. */
export function pointOnPlane(p: Point, alpha: Plane): boolean {
  return distancePointToPlane(p, alpha) <= TOLERANCE_MM;
}

/** ¿Está la recta en el plano? Lo están los dos puntos que la definen (tolerancia 0,01 mm). */
export function lineOnPlane(r: Line, alpha: Plane): boolean {
  return pointOnPlane(r.p1, alpha) && pointOnPlane(r.p2, alpha);
}

/**
 * Trazas de un plano.
 * - alpha1: traza horizontal, recta de corte con el PH.
 * - alpha2: traza vertical, recta de corte con el PV.
 * - containsLT: el plano pasa por la LT.
 *
 * Casos especiales:
 * - Plano paralelo al PH (horizontal) o el propio PH: alpha1 es null.
 * - Plano paralelo al PV (frontal) o el propio PV: alpha2 es null.
 * - Plano que contiene la LT: alpha1 y alpha2 coinciden con la LT y containsLT es true.
 *   Las trazas no bastan entonces para definir el plano: hace falta otro dato (un punto o la
 *   tercera proyección).
 */
export function planeTraces(alpha: Plane): {
  alpha1: Line | null;
  alpha2: Line | null;
  containsLT: boolean;
} {
  const origin = createPoint(0, 0, 0);
  const containsLT = Math.abs(alpha.normal.x) <= PARALLEL_EPSILON && pointOnPlane(origin, alpha);
  return {
    alpha1: intersectWithPlaneThroughOrigin(alpha, PH_NORMAL),
    alpha2: intersectWithPlaneThroughOrigin(alpha, PV_NORMAL),
    containsLT,
  };
}

/**
 * Recta de corte entre alpha y un plano que pasa por el origen con normal m.
 * Devuelve null si los planos son paralelos (o el mismo).
 */
function intersectWithPlaneThroughOrigin(alpha: Plane, m: Point): Line | null {
  const n = alpha.normal;
  const u = cross(n, m);
  const uLength = length(u);
  if (uLength <= PARALLEL_EPSILON) {
    return null;
  }
  // Punto de la recta de corte más cercano al origen: cumple n·P = d y m·P = 0.
  const d = dot(n, alpha.p1);
  const p = scale(cross(m, u), d / (uLength * uLength));
  // Segundo punto a 100 mm en la dirección de la recta.
  return createLine(p, add(p, scale(u, 100 / uLength)));
}
