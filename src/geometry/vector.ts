// Operaciones con vectores (x, a, c). Uso interno de src/geometry.
import type { Point } from './types.ts';

export function createPoint(x: number, a: number, c: number): Point {
  return { x, a, c };
}

export function add(u: Point, v: Point): Point {
  return createPoint(u.x + v.x, u.a + v.a, u.c + v.c);
}

export function sub(u: Point, v: Point): Point {
  return createPoint(u.x - v.x, u.a - v.a, u.c - v.c);
}

export function scale(u: Point, k: number): Point {
  return createPoint(u.x * k, u.a * k, u.c * k);
}

export function dot(u: Point, v: Point): number {
  return u.x * v.x + u.a * v.a + u.c * v.c;
}

/** Producto vectorial: un vector perpendicular a u y a v. */
export function cross(u: Point, v: Point): Point {
  return createPoint(u.a * v.c - u.c * v.a, u.c * v.x - u.x * v.c, u.x * v.a - u.a * v.x);
}

export function length(u: Point): number {
  return Math.sqrt(dot(u, u));
}

export function distance(p: Point, q: Point): number {
  return length(sub(p, q));
}

export function normalize(u: Point): Point {
  return scale(u, 1 / length(u));
}
