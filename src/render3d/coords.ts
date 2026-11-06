// Única conversión entre el dominio P(x, a, c) y Three.js: X = x, Y = c, Z = a.
// Ningún otro módulo debe hacer esta conversión.
import { Vector3 } from 'three';
import { createPoint, type Point } from '../geometry/index.ts';

export function toThree(p: Point): Vector3 {
  return new Vector3(p.x, p.c, p.a);
}

export function fromThree(v: Vector3): Point {
  return createPoint(v.x, v.z, v.y);
}

/** Lista plana de coordenadas Three.js, como la piden las geometrías de líneas. */
export function toThreeArray(points: readonly Point[]): number[] {
  return points.flatMap((p) => toThree(p).toArray());
}
