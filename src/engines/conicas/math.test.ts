import { describe, expect, it } from 'vitest';
import { classify, intersectionCurve, toPlane, type ConicInput } from './math.ts';

const cone = (theta: number, h = 20, alpha = 30): ConicInput => ({ alpha, theta, h });

describe('tipo de cónica según el ángulo del plano con el eje', () => {
  it('circunferencia, elipse, parábola, hipérbola y degenerada', () => {
    expect(classify(cone(0)).type).toBe('circunferencia');
    expect(classify(cone(30)).type).toBe('elipse'); // β = 60° > α = 30°
    expect(classify(cone(60)).type).toBe('parábola'); // β = 30° = α
    expect(classify(cone(75)).type).toBe('hipérbola'); // β = 15° < α
    expect(classify(cone(30, 0)).type).toBe('degenerada');
  });

  it('excentricidad e = cos β / cos α', () => {
    expect(classify(cone(0)).e).toBe(0);
    expect(classify(cone(60)).e).toBeCloseTo(1, 9);
    expect(classify(cone(30)).e).toBeCloseTo(
      Math.cos((60 * Math.PI) / 180) / Math.cos((30 * Math.PI) / 180),
      9,
    );
    expect(classify(cone(80)).e).toBeGreaterThan(1);
  });
});

describe('ecuación canónica y curva de intersección coherentes', () => {
  for (const theta of [0, 25, 45, 60, 72, 85]) {
    it(`θ = ${theta}°: los puntos de la curva cumplen la ecuación canónica`, () => {
      const input = cone(theta);
      const k = classify(input);
      const pieces = intersectionCurve(input, 200);
      expect(pieces.length).toBeGreaterThan(0);
      for (const piece of pieces) {
        for (const p of piece.filter((_, i) => i % 20 === 0)) {
          // El punto está en el cono y en el plano.
          expect(Math.hypot(p.x, p.a)).toBeCloseTo(Math.abs(p.c) * Math.tan(Math.PI / 6), 6);
          const [s, t] = toPlane(input, p);
          const x = s - k.center[0];
          const y = t - k.center[1];
          let value: number;
          if (k.type === 'circunferencia') value = (x * x + y * y) / (k.a * k.a);
          else if (k.type === 'elipse') value = (x * x) / (k.a * k.a) + (y * y) / (k.b * k.b);
          else if (k.type === 'hipérbola') value = (x * x) / (k.a * k.a) - (y * y) / (k.b * k.b);
          else value = 1 + (y * y - 2 * k.a * Math.abs(x)) / 1000; // parábola: y² = 2p|x|
          expect(value).toBeCloseTo(1, 4);
        }
      }
    });
  }

  it('la elipse por sus semiejes tiene la misma excentricidad que por los ángulos', () => {
    const k = classify(cone(35));
    const big = Math.max(k.a, k.b);
    const small = Math.min(k.a, k.b);
    expect(Math.sqrt(1 - (small * small) / (big * big))).toBeCloseTo(k.e, 6);
  });

  it('la hipérbola corta a las dos hojas: dos tramos', () => {
    expect(intersectionCurve(cone(80), 60)).toHaveLength(2);
    expect(intersectionCurve(cone(20), 60)).toHaveLength(1);
  });

  it('los focos de la elipse cumplen PF₁ + PF₂ = 2a', () => {
    const input = cone(40);
    const k = classify(input);
    const [f1, f2] = k.foci;
    const p = intersectionCurve(input, 200)[0]?.[37];
    if (!p || !f1 || !f2) throw new Error('sin datos');
    const [s, t] = toPlane(input, p);
    const sum = Math.hypot(s - f1[0], t - f1[1]) + Math.hypot(s - f2[0], t - f2[1]);
    expect(sum).toBeCloseTo(2 * Math.max(k.a, k.b), 6);
  });
});
