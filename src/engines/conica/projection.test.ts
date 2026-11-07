import { describe, expect, it } from 'vitest';
import { createPoint } from '../../geometry/index.ts';
import {
  distancePoints,
  measuringPoint,
  perspective,
  principalPoint,
  vanishingPoint,
  type Observer,
} from './projection.ts';

const o: Observer = { x: 0, d: 100, h: 50 };

describe('perspectiva cónica', () => {
  it('los puntos del cuadro se ven en verdadera magnitud', () => {
    expect(perspective(o, createPoint(20, 0, 30))).toEqual({ x: 20, y: 30 });
  });

  it('las perpendiculares al cuadro fugan al punto principal', () => {
    expect(vanishingPoint(o, createPoint(0, -1, 0))).toEqual(principalPoint(o));
    // Un punto muy lejos en esa dirección se acerca a P.
    const far = perspective(o, createPoint(30, -1e7, 0));
    expect(far?.x).toBeCloseTo(0, 3);
    expect(far?.y).toBeCloseTo(50, 3);
  });

  it('las horizontales a 45° fugan a los puntos de distancia', () => {
    const [d1, d2] = distancePoints(o);
    expect(vanishingPoint(o, createPoint(1, -1, 0))).toEqual(d2);
    expect(vanishingPoint(o, createPoint(-1, -1, 0))).toEqual(d1);
  });

  it('las paralelas se juntan en su punto de fuga', () => {
    const dir = createPoint(0.6, -0.8, 0);
    const f = vanishingPoint(o, dir);
    if (!f) throw new Error('sin fuga');
    for (const start of [
      createPoint(-20, -10, 0),
      createPoint(15, -30, 0),
      createPoint(0, -5, 20),
    ]) {
      const p = perspective(o, start);
      const q = perspective(o, createPoint(start.x + dir.x * 50, start.a + dir.a * 50, start.c));
      if (!p || !q) throw new Error('sin imagen');
      // F, p y q alineados.
      const cross = (q.x - p.x) * (f.y - p.y) - (q.y - p.y) * (f.x - p.x);
      expect(Math.abs(cross)).toBeLessThan(1e-6);
    }
    // Las horizontales fugan a la línea del horizonte.
    expect(f.y).toBeCloseTo(50, 9);
  });

  it('las frontales no tienen punto de fuga: siguen paralelas', () => {
    expect(vanishingPoint(o, createPoint(1, 0, 1))).toBeNull();
  });

  it('punto métrico a la distancia del ojo al punto de fuga', () => {
    const f = vanishingPoint(o, createPoint(1, -1, 0));
    if (!f) throw new Error('sin fuga');
    const m = measuringPoint(o, f);
    expect(Math.abs(m.x - f.x)).toBeCloseTo(Math.hypot(100, 100), 9);
    expect(m.y).toBe(50);
  });

  it('lo más lejano se ve más pequeño', () => {
    const near = perspective(o, createPoint(10, -10, 0));
    const far = perspective(o, createPoint(10, -100, 0));
    expect(Math.abs((near?.x ?? 0) - 0)).toBeGreaterThan(Math.abs((far?.x ?? 0) - 0));
  });
});

describe('respuesta de la lección I-14', () => {
  it('cubo girado 30° y observador a 70 mm: la fuga más cercana a P está a 70·tan 30°', () => {
    const near: Observer = { x: 0, d: 70, h: 45 };
    const t = Math.PI / 6;
    const f1 = vanishingPoint(near, createPoint(Math.sin(t), -Math.cos(t), 0));
    const f2 = vanishingPoint(near, createPoint(-Math.cos(t), -Math.sin(t), 0));
    const distances = [f1, f2].map((f) => Math.abs((f?.x ?? 0) - 0)).sort((a, b) => a - b);
    expect(distances[0]).toBeCloseTo(40.4, 1);
  });
});
