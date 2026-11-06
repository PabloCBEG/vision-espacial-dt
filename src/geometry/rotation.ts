// Giro alrededor de la LT: sirve para animar el abatimiento del PH sobre el PV.
import type { Point } from './types.ts';
import { createPoint } from './vector.ts';

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
