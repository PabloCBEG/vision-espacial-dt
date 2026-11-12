// Respuestas de los ejercicios de medida del motor de perspectiva cónica, calculadas con su
// proyección (sin DOM): altura del horizonte, puntos de distancia y puntos de fuga de un cubo.
import { createPoint } from '../../geometry/index.ts';
import type { ConicStep } from './definition.ts';
import { distancePoints, principalPoint, vanishingPoint } from './projection.ts';

export const CONIC_MAGNITUDES = [
  'horizonte',
  'puntoDistancia',
  'fugaCercana',
  'fugaLejana',
] as const;
export type ConicMagnitude = (typeof CONIC_MAGNITUDES)[number];

/** Distancias del punto principal a los puntos de fuga de las dos direcciones horizontales del cubo. */
export function vanishingDistances(data: ConicStep): number[] {
  const turn = ((data.solido?.giro ?? 0) * Math.PI) / 180;
  const o = data.observador;
  const p = principalPoint(o);
  const dirs = [
    createPoint(Math.cos(turn), Math.sin(turn), 0),
    createPoint(-Math.sin(turn), Math.cos(turn), 0),
  ];
  return dirs.flatMap((dir) => {
    const f = vanishingPoint(o, dir);
    return f ? [Math.abs(f.x - p.x)] : [];
  });
}

/** Medida en el cuadro, en mm, de la magnitud pedida. */
export function conicValue(data: ConicStep, magnitud: string | undefined): number | null {
  const o = data.observador;
  switch (magnitud) {
    case 'horizonte':
      return o.h;
    case 'puntoDistancia': {
      const [left] = distancePoints(o);
      return Math.abs(left.x - principalPoint(o).x);
    }
    case 'fugaCercana': {
      const d = vanishingDistances(data);
      return d.length > 0 ? Math.min(...d) : null;
    }
    case 'fugaLejana': {
      const d = vanishingDistances(data);
      return d.length > 0 ? Math.max(...d) : null;
    }
    default:
      return null;
  }
}
