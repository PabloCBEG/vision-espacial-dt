// Respuestas de los ejercicios de medida del motor de perspectiva cónica, calculadas con su
// proyección (sin DOM): altura del horizonte, puntos de distancia y puntos de fuga de un cubo.
import { createPoint } from '../../geometry/index.ts';
import { buildSolid } from '../solidos/construction.ts';
import { vertices } from '../solidos/polyhedron.ts';
import type { ConicStep } from './definition.ts';
import {
  distancePoints,
  measuringPoint,
  perspective,
  principalPoint,
  vanishingPoint,
} from './projection.ts';

export const CONIC_MAGNITUDES = [
  'horizonte',
  'puntoDistancia',
  'fugaCercana',
  'fugaLejana',
  // Distancia de P al punto métrico de la fuga más cercana o más lejana.
  'metricoCercano',
  'metricoLejano',
  // Altura en el dibujo de la arista vertical más cercana al cuadro.
  'alturaArista',
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

/** Distancias de P a los puntos métricos de las fugas, ordenadas como las de las fugas. */
export function measuringDistances(
  data: ConicStep,
): { fuga: number; metrico: number; ojo: number }[] {
  const turn = ((data.solido?.giro ?? 0) * Math.PI) / 180;
  const o = data.observador;
  const p = principalPoint(o);
  const dirs = [
    createPoint(Math.cos(turn), Math.sin(turn), 0),
    createPoint(-Math.sin(turn), Math.cos(turn), 0),
  ];
  return dirs
    .flatMap((dir) => {
      const f = vanishingPoint(o, dir);
      if (!f) return [];
      const m = measuringPoint(o, f);
      return [
        {
          fuga: Math.abs(f.x - p.x),
          metrico: Math.abs(m.x - p.x),
          ojo: Math.hypot(f.x - p.x, o.d),
        },
      ];
    })
    .sort((a, b) => a.fuga - b.fuga);
}

/** La arista vertical más cercana al cuadro: su profundidad, su altura real y la del dibujo. */
export function nearestVerticalEdge(
  data: ConicStep,
): { profundidad: number; real: number; dibujo: number } | null {
  if (!data.solido) return null;
  const vs = vertices(buildSolid(data.solido));
  const base = vs.filter((v) => Math.abs(v.c) < 1e-6);
  if (base.length === 0) return null;
  const foot = base.reduce((best, v) => (v.a > best.a ? v : best));
  const top = Math.max(
    ...vs
      .filter((v) => Math.abs(v.x - foot.x) < 1e-6 && Math.abs(v.a - foot.a) < 1e-6)
      .map((v) => v.c),
  );
  if (!(top > 1e-6)) return null;
  const o = data.observador;
  const lo = perspective(o, createPoint(foot.x, foot.a, 0));
  const hi = perspective(o, createPoint(foot.x, foot.a, top));
  if (!lo || !hi) return null;
  return { profundidad: -foot.a, real: top, dibujo: Math.abs(hi.y - lo.y) };
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
    case 'metricoCercano': {
      const m = measuringDistances(data)[0];
      return m ? m.metrico : null;
    }
    case 'metricoLejano': {
      const list = measuringDistances(data);
      const m = list[list.length - 1];
      return m ? m.metrico : null;
    }
    case 'alturaArista':
      return nearestVerticalEdge(data)?.dibujo ?? null;
    default:
      return null;
  }
}
