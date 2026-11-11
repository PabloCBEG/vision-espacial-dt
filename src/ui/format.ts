// Textos en castellano para valores del punto.
import type { Point, Quadrant } from '../geometry/index.ts';

/** Número entero con el signo menos tipográfico (−), como en el papel. */
export function formatNumber(value: number): string {
  const rounded = Math.round(value) + 0;
  return rounded < 0 ? `−${Math.abs(rounded)}` : String(rounded);
}

/** Valor en mm, por ejemplo «−20 mm». */
export function formatMm(value: number): string {
  return `${formatNumber(value)} mm`;
}

const QUADRANT_TEXT: Record<Quadrant, string> = {
  1: 'en el primer cuadrante',
  2: 'en el segundo cuadrante',
  3: 'en el tercer cuadrante',
  4: 'en el cuarto cuadrante',
  'en PH': 'en el plano horizontal',
  'en PV': 'en el plano vertical',
  'en LT': 'en la línea de tierra',
};

export function describeQuadrant(q: Quadrant): string {
  return QUADRANT_TEXT[q];
}

/** Descripción para lectores de pantalla, por ejemplo «P(20, 30, 40) mm, en el primer cuadrante». */
export function describePoint(p: Point, q: Quadrant, name = 'P'): string {
  const coords = [p.x, p.a, p.c].map(formatNumber).join(', ');
  return `${name}(${coords}) mm, ${describeQuadrant(q)}`;
}

/** Número con un decimal y coma decimal, por ejemplo «57,7» o «−3,5» (sin «,0»). */
export function formatDecimal(value: number): string {
  const rounded = Math.round(value * 10) / 10 + 0;
  const text = String(Math.abs(rounded)).replace('.', ',');
  return rounded < 0 ? `−${text}` : text;
}

/** Medida con su unidad, por ejemplo «61,8 mm» o «33°» (el grado va pegado, como en el papel). */
export function formatMeasure(value: number, unit: 'mm' | '°'): string {
  return unit === 'mm' ? `${formatDecimal(value)} mm` : `${formatDecimal(value)}°`;
}
