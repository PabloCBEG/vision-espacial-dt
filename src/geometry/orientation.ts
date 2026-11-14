// Paralelismo y perpendicularidad entre rectas y planos. Todas las comprobaciones comparan
// direcciones con una tolerancia angular (seno del ángulo): por defecto 0,03, unos 1,7°, que es
// lo que se desvía una recta de 60 mm cuando uno de sus extremos se mueve 1 mm.
import { lineDirection } from './line.ts';
import type { Line, Plane } from './types.ts';
import { cross, dot, length, normalize } from './vector.ts';

export const ANGLE_TOLERANCE = 0.03;

/** ¿Son paralelas las dos rectas (o coinciden)? */
export function linesParallel(r: Line, s: Line, tol = ANGLE_TOLERANCE): boolean {
  const u = normalize(lineDirection(r));
  const v = normalize(lineDirection(s));
  return length(cross(u, v)) <= tol;
}

/** ¿Son paralelos los dos planos (o coinciden)? */
export function planesParallel(a: Plane, b: Plane, tol = ANGLE_TOLERANCE): boolean {
  return length(cross(a.normal, b.normal)) <= tol;
}

/** ¿Es la recta paralela al plano (o está en él)? Su dirección es perpendicular a la normal. */
export function lineParallelToPlane(r: Line, alpha: Plane, tol = ANGLE_TOLERANCE): boolean {
  return Math.abs(dot(alpha.normal, normalize(lineDirection(r)))) <= tol;
}

/** ¿Es la recta perpendicular al plano? Su dirección es la de la normal. */
export function linePerpendicularToPlane(r: Line, alpha: Plane, tol = ANGLE_TOLERANCE): boolean {
  return length(cross(alpha.normal, normalize(lineDirection(r)))) <= tol;
}

/** ¿Son perpendiculares los dos planos? Lo son sus normales. */
export function planesPerpendicular(a: Plane, b: Plane, tol = ANGLE_TOLERANCE): boolean {
  return Math.abs(dot(a.normal, b.normal)) <= tol;
}
