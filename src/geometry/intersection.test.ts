import { describe, expect, it } from 'vitest';
import {
  commonLinePoints,
  createLine,
  createPlane,
  createPoint,
  distancePointToPlane,
  intersectLinePlane,
} from './index.ts';

const P = createPoint;

describe('intersección recta-plano', () => {
  it('una recta oblicua atraviesa un plano horizontal a su cota', () => {
    const alpha = createPlane(P(0, 0, 30), P(50, 0, 30), P(0, 50, 30));
    const r = createLine(P(-30, 10, 10), P(30, 40, 50));
    const i = intersectLinePlane(r, alpha);
    expect(i?.x).toBeCloseTo(0, 9);
    expect(i?.a).toBeCloseTo(25, 9);
    expect(i?.c).toBeCloseTo(30, 9);
  });

  it('una recta paralela al plano no lo corta', () => {
    const alpha = createPlane(P(0, 0, 30), P(50, 0, 30), P(0, 50, 30));
    expect(intersectLinePlane(createLine(P(0, 0, 10), P(40, 20, 10)), alpha)).toBeNull();
  });
});

describe('recta común a dos planos', () => {
  it('sus dos puntos están en los dos planos y son las trazas H y V', () => {
    const alpha = createPlane(P(-40, 0, 20), P(30, 0, 40), P(0, 40, 0));
    const beta = createPlane(P(-20, 0, 0), P(40, 0, 30), P(10, 50, 35));
    const pts = commonLinePoints(alpha, beta);
    expect(pts).not.toBeNull();
    const [h, v] = pts ?? [P(0, 0, 0), P(0, 0, 0)];
    expect(h.c).toBeCloseTo(0, 9);
    expect(v.a).toBeCloseTo(0, 9);
    for (const q of [h, v]) {
      expect(distancePointToPlane(q, alpha)).toBeLessThan(1e-9);
      expect(distancePointToPlane(q, beta)).toBeLessThan(1e-9);
    }
  });

  it('dos planos paralelos no se cortan', () => {
    const alpha = createPlane(P(0, 0, 10), P(50, 0, 10), P(0, 50, 10));
    const beta = createPlane(P(0, 0, 30), P(50, 0, 30), P(0, 50, 30));
    expect(commonLinePoints(alpha, beta)).toBeNull();
  });
});
