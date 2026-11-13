// Respuestas de los ejercicios de medida del motor de axonometría, calculadas con su proyección
// (sin DOM): longitud en el dibujo de una arista paralela a un eje o de la diagonal vertical.
import type { AxonStep } from './definition.ts';
import { specOf } from './construction.ts';
import { createPoint } from '../../geometry/index.ts';
import { axisVectors, axon, coefficients } from './projection.ts';

/**
 * - ejeX, ejeY, ejeZ: arista (o altura, en el eje Z de un sólido con altura) paralela a un eje.
 * - diagonalVertical: diagonal del octaedro paralela a OZ.
 * - diagonalCara: diagonal de la cara frontal (plano XZ) del cubo, desde el origen de los ejes.
 *   No es paralela a ningún eje: no se reduce con un coeficiente, se mide en el dibujo.
 */
export const AXON_MAGNITUDES = [
  'ejeX',
  'ejeY',
  'ejeZ',
  'diagonalVertical',
  'diagonalCara',
] as const;
export type AxonMagnitude = (typeof AXON_MAGNITUDES)[number];

/** Coeficiente de reducción del eje (o de la diagonal vertical, que va paralela a OZ). */
export function axonCoefficient(data: AxonStep, magnitud: AxonMagnitude): number {
  if (magnitud === 'diagonalCara') {
    const real = axonRealLength(data, magnitud);
    const drawn = axonValue(data, magnitud);
    return real && drawn !== null ? drawn / real : 0;
  }
  const c = coefficients(specOf(data));
  return magnitud === 'ejeX' ? c.X : magnitud === 'ejeY' ? c.Y : c.Z;
}

/** Medida real de lo que se dibuja: la arista o la diagonal del octaedro (arista por √2). */
export function axonRealLength(data: AxonStep, magnitud: AxonMagnitude): number | null {
  const edge = data.solido?.arista;
  if (edge === undefined) return null;
  const type = data.solido?.tipo;
  if (magnitud === 'diagonalCara') return type === 'cubo' ? edge * Math.SQRT2 : null;
  if (magnitud === 'diagonalVertical') return type === 'octaedro' ? edge * Math.SQRT2 : null;
  // Un sólido con altura (prisma, cilindro…) tiene su eje Z en la altura, no en la arista.
  if (type === 'cubo' || type === 'octaedro' || type === 'tetraedro') return edge;
  if (magnitud === 'ejeZ' && data.solido) return data.solido.altura;
  return null;
}

/** Longitud en el dibujo, en mm, de la magnitud pedida. */
export function axonValue(data: AxonStep, magnitud: string | undefined): number | null {
  if (!magnitud || !(AXON_MAGNITUDES as readonly string[]).includes(magnitud)) return null;
  const m = magnitud as AxonMagnitude;
  if (m === 'diagonalCara') {
    const real = axonRealLength(data, m);
    if (real === null) return null;
    const spec = specOf(data);
    const { X, Z } = axisVectors(spec);
    const edge = real / Math.SQRT2;
    const end = createPoint(edge * (X.x + Z.x), edge * (X.a + Z.a), edge * (X.c + Z.c));
    const o = axon(spec, createPoint(0, 0, 0));
    const q = axon(spec, end);
    return Math.hypot(q.u - o.u, q.v - o.v);
  }
  const real = axonRealLength(data, m);
  return real === null ? null : real * axonCoefficient(data, m);
}
