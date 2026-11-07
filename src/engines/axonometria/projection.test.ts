import { describe, expect, it } from 'vitest';
import { createPoint } from '../../geometry/index.ts';
import {
  axisVectors,
  axon,
  circlePoints,
  coefficients,
  ISO_COEF,
  isoReductionScale,
  towardObserver,
  type AxonSpec,
} from './projection.ts';

const iso: AxonSpec = { system: 'isometrica', angleY: 45, coefY: 0.5 };
const isoDrawing: AxonSpec = { ...iso, system: 'dibujo-isometrico' };
const cav: AxonSpec = { system: 'caballera', angleY: 45, coefY: 0.5 };

describe('coeficientes de reducción', () => {
  it('isométrica: los tres ejes con 0,816', () => {
    const k = coefficients(iso);
    expect(ISO_COEF).toBeCloseTo(0.816, 3);
    expect(k.X).toBeCloseTo(ISO_COEF, 9);
    expect(k.Y).toBeCloseTo(ISO_COEF, 9);
    expect(k.Z).toBeCloseTo(ISO_COEF, 9);
  });

  it('dibujo isométrico: sin reducir (coeficiente 1)', () => {
    const k = coefficients(isoDrawing);
    expect(k.X).toBeCloseTo(1, 9);
    expect(k.Y).toBeCloseTo(1, 9);
    expect(k.Z).toBeCloseTo(1, 9);
  });

  it('caballera: 1, 0,5 y 1', () => {
    const k = coefficients(cav);
    expect(k.X).toBeCloseTo(1, 9);
    expect(k.Y).toBeCloseTo(0.5, 9);
    expect(k.Z).toBeCloseTo(1, 9);
  });
});

describe('proyección', () => {
  it('isométrica: los ejes dibujados forman 120° y Z es vertical', () => {
    const { X, Y, Z } = axisVectors(iso);
    const d = (p: typeof X) => {
      const q = axon(iso, p);
      return Math.atan2(q.v, q.u);
    };
    const angles = [d(X), d(Y), d(Z)].map((a) => (a * 180) / Math.PI);
    expect(angles[2]).toBeCloseTo(90, 9);
    expect(angles[0]).toBeCloseTo(-150, 9); // X hacia la izquierda y abajo
    expect(angles[1]).toBeCloseTo(-30, 9); // Y hacia la derecha y abajo
  });

  it('caballera: el plano frontal en verdadera magnitud y el eje Y con el ángulo pedido', () => {
    const p = axon(cav, createPoint(30, 0, 20));
    expect(p.u).toBeCloseTo(30, 9);
    expect(p.v).toBeCloseTo(20, 9);
    const y = axon(cav, createPoint(0, -10, 0)); // 10 mm hacia el fondo
    expect(Math.atan2(y.v, y.u)).toBeCloseTo(Math.PI / 4, 9);
    expect(Math.hypot(y.u, y.v)).toBeCloseTo(5, 9);
  });

  it('la dirección del observador no se mueve en el dibujo (es la de los rayos)', () => {
    for (const spec of [iso, cav, { ...cav, angleY: 30 }]) {
      const o = towardObserver(spec);
      const a = axon(spec, createPoint(3, 4, 5));
      const b = axon(spec, createPoint(3 + o.x * 10, 4 + o.a * 10, 5 + o.c * 10));
      expect(Math.hypot(a.u - b.u, a.v - b.v)).toBeLessThan(1e-9);
    }
  });

  it('escala gráfica: la reducida mide 0,816 de la real', () => {
    const { real, reduced } = isoReductionScale(50, 10);
    const last = real.length - 1;
    const r = real[last] ?? { u: 0, v: 0 };
    const q = reduced[last] ?? { u: 0, v: 0 };
    expect(Math.hypot(r.u, r.v)).toBeCloseTo(50, 9);
    expect(Math.hypot(q.u, q.v)).toBeCloseTo(50 * ISO_COEF, 9);
  });

  it('una circunferencia horizontal en isométrica: elipse de ejes d y d·0,577', () => {
    const pts = circlePoints(iso, createPoint(0, 0, 0), 10, createPoint(0, 0, 1), 360);
    const r = pts.map((p) => Math.hypot(p.u, p.v));
    expect(Math.max(...r)).toBeCloseTo(10, 3);
    expect(Math.min(...r)).toBeCloseTo(10 / Math.sqrt(3), 2);
  });
});

describe('respuestas de la lección II-10', () => {
  it('arista de 30 mm en isométrica, en caballera (eje Y) y diagonal del octaedro', () => {
    expect(30 * coefficients(iso).X).toBeCloseTo(24.5, 1);
    expect(30 * coefficients(cav).Y).toBeCloseTo(15, 9);
    expect(30 * Math.SQRT2 * coefficients(iso).Z).toBeCloseTo(34.6, 1);
  });
});
