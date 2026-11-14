import { describe, expect, it } from 'vitest';
import {
  createLine,
  createPlane,
  createPoint,
  lineParallelToPlane,
  linePerpendicularToPlane,
  linesParallel,
  planesParallel,
  planesPerpendicular,
} from './index.ts';

const P = createPoint;
// Plano x − 2a − 2c = −30, de normal (1, −2, −2).
const alpha = createPlane(P(-30, 0, 0), P(30, 30, 0), P(30, 0, 30));

describe('paralelismo y perpendicularidad', () => {
  it('rectas paralelas, y una que no lo es', () => {
    const r = createLine(P(0, 0, 0), P(20, 10, -10));
    expect(linesParallel(r, createLine(P(5, 5, 5), P(25, 15, -5)))).toBe(true);
    expect(linesParallel(r, createLine(P(5, 5, 5), P(25, 15, 5)))).toBe(false);
  });

  it('planos paralelos: el desplazado lo es y el inclinado no', () => {
    const moved = createPlane(P(-30, 15, 0), P(30, 45, 0), P(30, 15, 30));
    expect(planesParallel(alpha, moved)).toBe(true);
    expect(planesParallel(alpha, createPlane(P(0, 0, 10), P(40, 0, 10), P(0, 40, 10)))).toBe(false);
  });

  it('recta paralela a un plano: una recta de α lo es, la normal no', () => {
    expect(lineParallelToPlane(createLine(P(0, 0, 0), P(20, 0, 10)), alpha)).toBe(true);
    expect(lineParallelToPlane(createLine(P(0, 0, 0), P(10, -20, -20)), alpha)).toBe(false);
  });

  it('recta perpendicular a un plano: la de dirección (1, −2, −2)', () => {
    expect(linePerpendicularToPlane(createLine(P(0, 0, 0), P(10, -20, -20)), alpha)).toBe(true);
    expect(linePerpendicularToPlane(createLine(P(0, 0, 0), P(20, 0, 10)), alpha)).toBe(false);
  });

  it('planos perpendiculares: el que contiene a la normal lo es', () => {
    const beta = createPlane(P(-10, 25, 25), P(10, 35, 25), P(0, 5, 5));
    expect(planesPerpendicular(alpha, beta)).toBe(true);
    expect(planesPerpendicular(alpha, moved())).toBe(false);
  });
});

function moved() {
  return createPlane(P(-30, 15, 0), P(30, 45, 0), P(30, 15, 30));
}
