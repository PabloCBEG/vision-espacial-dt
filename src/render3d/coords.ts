// Única conversión entre el dominio P(x, a, c) y Three.js: X = x, Y = c, Z = a.
// Ningún otro módulo debe hacer esta conversión.
import { Vector3 } from 'three';
import { createPoint, type Point, type SheetPoint } from '../geometry/index.ts';

export function toThree(p: Point): Vector3 {
  return new Vector3(p.x, p.c, p.a);
}

export function fromThree(v: Vector3): Point {
  return createPoint(v.x, v.z, v.y);
}

/**
 * Un punto de la lámina (x, y) visto en 3D sobre el PV, que es donde queda la lámina
 * tras abatir el PH: x = x, cota = y, alejamiento = 0.
 */
export function sheetToThree(s: SheetPoint): Vector3 {
  return toThree(createPoint(s.x, 0, s.y));
}

/** Lista plana de coordenadas Three.js, como la piden las geometrías de líneas. */
export function toThreeArray(points: readonly Point[]): number[] {
  return points.flatMap((p) => toThree(p).toArray());
}
