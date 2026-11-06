// Giro alrededor de la LT: sirve para animar el abatimiento del PH sobre el PV.
import { projectH } from './point.ts';
import type { Point } from './types.ts';
import { createPoint } from './vector.ts';

/** Ángulo del abatimiento completo: el PH queda sobre el PV y se obtiene la lámina. */
export const FOLDED_ANGLE_DEG = 90;

/**
 * Posición de P′ cuando el PH se ha abatido un ángulo (0° = PH en su sitio, 90° = lámina).
 * P′ viaja con el PH; P″ no se mueve.
 */
export function foldHorizontalProjection(p: Point, angleDeg: number): Point {
  return rotateAboutLT(projectH(p), angleDeg);
}

/**
 * Gira un punto un ángulo en grados alrededor de la LT.
 * El sentido es el del abatimiento del PH: la parte delantera del PH baja.
 * Para un punto del PH (x, a, 0) el resultado es (x, a·cos θ, −a·sin θ);
 * con θ = 90° queda en el PV, a una cota igual a −a, como en la lámina.
 */
export function rotateAboutLT(p: Point, angleDeg: number): Point {
  const theta = (angleDeg * Math.PI) / 180;
  const cos = Math.cos(theta);
  const sin = Math.sin(theta);
  return createPoint(p.x, p.a * cos + p.c * sin, -p.a * sin + p.c * cos);
}
