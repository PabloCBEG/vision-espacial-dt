// Análisis de un plano: casos especiales y polígono visible dentro de la caja de dibujo.
import { DRAWING_EXTENT_MM } from './lineAnalysis.ts';
import { distancePointToPlane } from './plane.ts';
import type { Plane, Point } from './types.ts';
import { add, createPoint, cross, dot, normalize, scale, sub } from './vector.ts';

export type PlaneCase =
  | 'containsLT' // contiene la LT: trazas coincidentes; hace falta la tercera proyección
  | 'parallelToLT' // paralelo a la LT: trazas paralelas a la LT
  | 'horizontal' // paralelo al PH: solo traza α2
  | 'frontal' // paralelo al PV: solo traza α1
  | 'profile' // de perfil: trazas perpendiculares a la LT
  | 'oblique';

const NEAR_ZERO = 1e-3;

export function classifyPlane(alpha: Plane): PlaneCase[] {
  const n = alpha.normal; // unitaria
  const zero = (v: number): boolean => Math.abs(v) <= NEAR_ZERO;
  const cases: PlaneCase[] = [];
  const throughOrigin = distancePointToPlane(createPoint(0, 0, 0), alpha) <= 0.5;
  if (zero(n.x) && throughOrigin && !(zero(n.a) || zero(n.c))) cases.push('containsLT');
  else if (zero(n.x) && !(zero(n.a) || zero(n.c))) cases.push('parallelToLT');
  if (zero(n.x) && zero(n.a)) cases.push('horizontal');
  if (zero(n.x) && zero(n.c)) cases.push('frontal');
  if (zero(n.a) && zero(n.c)) cases.push('profile');
  if (cases.length === 0) cases.push('oblique');
  return cases;
}

/**
 * Polígono del plano dentro de la caja |x|, |a|, |c| ≤ extent, para dibujar su superficie.
 * Se recorta un cuadrado muy grande del plano contra las seis caras de la caja.
 */
export function planePolygon(alpha: Plane, extent = DRAWING_EXTENT_MM): Point[] {
  const n = alpha.normal;
  // Dos direcciones perpendiculares dentro del plano.
  const helper = Math.abs(n.x) < 0.9 ? createPoint(1, 0, 0) : createPoint(0, 1, 0);
  const u = normalize(cross(n, helper));
  const v = cross(n, u);
  // Punto del plano más cercano al origen.
  const center = scale(n, dot(n, alpha.p1));
  const big = extent * 4;
  let polygon: Point[] = [
    add(center, add(scale(u, -big), scale(v, -big))),
    add(center, add(scale(u, big), scale(v, -big))),
    add(center, add(scale(u, big), scale(v, big))),
    add(center, add(scale(u, -big), scale(v, big))),
  ];
  for (const axis of ['x', 'a', 'c'] as const) {
    for (const sign of [1, -1]) {
      polygon = clipPolygon(polygon, (p) => extent - sign * p[axis]);
    }
  }
  return polygon;
}

/** Sutherland–Hodgman: conserva la parte donde inside(p) ≥ 0. */
function clipPolygon(points: Point[], inside: (p: Point) => number): Point[] {
  const result: Point[] = [];
  for (let i = 0; i < points.length; i++) {
    const current = points[i];
    const next = points[(i + 1) % points.length];
    if (!current || !next) continue;
    const ci = inside(current);
    const ni = inside(next);
    if (ci >= 0) result.push(current);
    if (ci >= 0 !== ni >= 0) {
      const t = ci / (ci - ni);
      result.push(add(current, scale(sub(next, current), t)));
    }
  }
  return result;
}
