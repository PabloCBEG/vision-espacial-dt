import { describe, expect, it } from 'vitest';
import {
  conicPoint,
  conicResidual,
  conicTangent,
  eccentricity,
  ellipse,
  hyperbola,
  nearestConicParam,
  parabola,
  type Conic,
} from './conics.ts';
import { dist, dot, perp, pt, sub } from './geometry.ts';
import { evaluate, type ObjectDef } from './graph.ts';

const F1 = pt(-20, 5);
const F2 = pt(20, 5);

/** Todos los puntos dibujados cumplen la definición de la cónica. */
function allOnCurve(k: Conic): void {
  for (const branch of k.branches)
    for (const p of branch) expect(conicResidual(k, p)).toBeLessThan(1e-6);
}

/** La tangente deja toda la rama a un mismo lado. */
function tangentLeavesCurveOnOneSide(k: Conic, t: number): void {
  const p = conicPoint(k, t);
  const l = conicTangent(k, p);
  expect(l).not.toBeNull();
  if (!l) return;
  const n = perp(l.d);
  const branch = k.kind === 'hiperbola' && t >= 0.5 ? k.branches[1] : k.branches[0];
  const sides = (branch ?? []).map((q) => dot(sub(q, l.p), n)).filter((s) => Math.abs(s) > 1e-6);
  const positive = sides.filter((s) => s > 0).length;
  expect(positive === 0 || positive === sides.length).toBe(true);
}

describe('cónicas como lugares geométricos', () => {
  it('elipse: suma de distancias a los focos igual al eje mayor', () => {
    const k = ellipse(F1, F2, 30);
    expect(k).not.toBeNull();
    if (!k) return;
    allOnCurve(k);
    expect(k.b).toBeCloseTo(Math.sqrt(30 * 30 - 20 * 20));
    expect(eccentricity(k)).toBeCloseTo(20 / 30);
    for (const t of [0.1, 0.33, 0.6, 0.85]) tangentLeavesCurveOnOneSide(k, t);
  });

  it('elipse imposible si el eje mayor no supera la distancia focal', () => {
    expect(ellipse(F1, F2, 20)).toBeNull();
  });

  it('hipérbola: diferencia de distancias igual al eje real, con dos ramas', () => {
    const k = hyperbola(F1, F2, 12);
    expect(k).not.toBeNull();
    if (!k) return;
    expect(k.branches).toHaveLength(2);
    allOnCurve(k);
    expect(eccentricity(k)).toBeCloseTo(20 / 12);
    // La primera rama es la del foco F1.
    const p = conicPoint(k, 0.25);
    expect(dist(p, F1)).toBeLessThan(dist(p, F2));
    for (const t of [0.1, 0.3, 0.7, 0.9]) tangentLeavesCurveOnOneSide(k, t);
  });

  it('parábola: misma distancia al foco que a la directriz', () => {
    const d = { p: pt(0, -10), d: pt(1, 0) };
    const k = parabola(pt(0, 10), d);
    expect(k).not.toBeNull();
    if (!k) return;
    allOnCurve(k);
    expect(eccentricity(k)).toBe(1);
    // El vértice está en el punto medio entre el foco y la directriz.
    expect(conicPoint(k, 0.5).y).toBeCloseTo(0);
    for (const t of [0.1, 0.4, 0.8]) tangentLeavesCurveOnOneSide(k, t);
  });

  it('el parámetro más cercano devuelve el mismo punto', () => {
    const k = ellipse(F1, F2, 30);
    if (!k) throw new Error('sin elipse');
    const p = conicPoint(k, 0.3);
    expect(dist(conicPoint(k, nearestConicParam(k, p)), p)).toBeLessThan(0.5);
  });

  it('en la construcción: elipse por un punto, punto sobre ella y su tangente', () => {
    const defs: ObjectDef[] = [
      { id: 'F1', tipo: 'punto', en: [-20, 0] },
      { id: 'F2', tipo: 'punto', en: [20, 0] },
      { id: 'A1', tipo: 'punto', en: [-30, 0] },
      { id: 'k', tipo: 'conica', clase: 'elipse', focos: ['F1', 'F2'], pasaPor: 'A1' },
      { id: 'P', tipo: 'puntoSobre', sobre: 'k', t: 0.2 },
      { id: 't', tipo: 'tangenteConica', a: 'k', en: 'P' },
      { id: 'Q', tipo: 'punto', en: [0, 0] },
      { id: 'mal', tipo: 'tangenteConica', a: 'k', en: 'Q' },
    ];
    const e = evaluate(defs);
    const k = e.get('k')?.value;
    expect(k?.kind).toBe('conic');
    if (k?.kind === 'conic') expect(k.conic.a).toBeCloseTo(30);
    expect(e.get('t')?.value?.kind).toBe('line');
    expect(e.get('mal')?.problem).toMatch(/no está en la cónica/);
  });
});
