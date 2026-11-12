// Respuestas de los ejercicios de medida del motor de axonometría, calculadas con su proyección
// (sin DOM): longitud en el dibujo de una arista paralela a un eje o de la diagonal vertical.
import type { AxonStep } from './definition.ts';
import { specOf } from './construction.ts';
import { coefficients } from './projection.ts';

export const AXON_MAGNITUDES = ['ejeX', 'ejeY', 'ejeZ', 'diagonalVertical'] as const;
export type AxonMagnitude = (typeof AXON_MAGNITUDES)[number];

/** Coeficiente de reducción del eje (o de la diagonal vertical, que va paralela a OZ). */
export function axonCoefficient(data: AxonStep, magnitud: AxonMagnitude): number {
  const c = coefficients(specOf(data));
  return magnitud === 'ejeX' ? c.X : magnitud === 'ejeY' ? c.Y : c.Z;
}

/** Medida real de lo que se dibuja: la arista o la diagonal del octaedro (arista por √2). */
export function axonRealLength(data: AxonStep, magnitud: AxonMagnitude): number | null {
  const edge = data.solido?.arista;
  if (edge === undefined) return null;
  if (magnitud !== 'diagonalVertical') return edge;
  return data.solido?.tipo === 'octaedro' ? edge * Math.SQRT2 : null;
}

/** Longitud en el dibujo, en mm, de la magnitud pedida. */
export function axonValue(data: AxonStep, magnitud: string | undefined): number | null {
  if (!magnitud || !(AXON_MAGNITUDES as readonly string[]).includes(magnitud)) return null;
  const m = magnitud as AxonMagnitude;
  const real = axonRealLength(data, m);
  return real === null ? null : real * axonCoefficient(data, m);
}
