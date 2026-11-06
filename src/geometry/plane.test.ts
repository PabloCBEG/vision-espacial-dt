import { describe, expect, it } from 'vitest';
import { createLine, pointOnLine } from './line.ts';
import { createPlane, lineOnPlane, planeTraces, pointOnPlane } from './plane.ts';
import { createPoint } from './point.ts';
import { add, dot, length, scale } from './vector.ts';
import type { Line, Point } from './types.ts';

function expectLineThrough(line: Line | null, points: Point[]): void {
  expect(line).not.toBeNull();
  if (!line) return;
  for (const p of points) {
    expect(pointOnLine(p, line)).toBe(true);
  }
}

describe('createPlane', () => {
  it('calcula una normal unitaria perpendicular al plano', () => {
    const alpha = createPlane(createPoint(0, 30, 0), createPoint(60, 0, 0), createPoint(0, 0, 40));
    expect(length(alpha.normal)).toBeCloseTo(1, 9);
    const u = createPoint(60, -30, 0);
    const v = createPoint(0, -30, 40);
    expect(dot(alpha.normal, u)).toBeCloseTo(0, 9);
    expect(dot(alpha.normal, v)).toBeCloseTo(0, 9);
  });

  it('rechaza tres puntos alineados', () => {
    expect(() =>
      createPlane(createPoint(0, 0, 0), createPoint(10, 10, 10), createPoint(20, 20, 20)),
    ).toThrow();
  });
});

describe('planeTraces', () => {
  it('plano oblicuo: α1 y α2 se cortan en la LT', () => {
    const a = createPoint(0, 30, 0);
    const b = createPoint(60, 0, 0);
    const c = createPoint(0, 0, 40);
    const { alpha1, alpha2, containsLT } = planeTraces(createPlane(a, b, c));
    expectLineThrough(alpha1, [a, b]);
    expectLineThrough(alpha2, [b, c]);
    expect(containsLT).toBe(false);
  });

  it('plano que contiene la LT: α1 y α2 coinciden con la LT', () => {
    const alpha = createPlane(createPoint(0, 0, 0), createPoint(50, 0, 0), createPoint(20, 30, 40));
    const { alpha1, alpha2, containsLT } = planeTraces(alpha);
    const lt = [createPoint(-100, 0, 0), createPoint(0, 0, 0), createPoint(100, 0, 0)];
    expectLineThrough(alpha1, lt);
    expectLineThrough(alpha2, lt);
    expect(containsLT).toBe(true);
  });

  it('plano horizontal (paralelo al PH): sin α1, α2 paralela a la LT', () => {
    const alpha = createPlane(
      createPoint(0, 0, 25),
      createPoint(10, 0, 25),
      createPoint(0, 10, 25),
    );
    const { alpha1, alpha2, containsLT } = planeTraces(alpha);
    expect(alpha1).toBeNull();
    expectLineThrough(alpha2, [createPoint(-50, 0, 25), createPoint(100, 0, 25)]);
    expect(containsLT).toBe(false);
  });

  it('plano frontal (paralelo al PV): sin α2, α1 paralela a la LT', () => {
    const alpha = createPlane(
      createPoint(0, 15, 0),
      createPoint(10, 15, 0),
      createPoint(0, 15, 10),
    );
    const { alpha1, alpha2 } = planeTraces(alpha);
    expect(alpha2).toBeNull();
    expectLineThrough(alpha1, [createPoint(0, 15, 0), createPoint(50, 15, 0)]);
  });

  it('plano de perfil: α1 y α2 perpendiculares a la LT con la misma x', () => {
    const alpha = createPlane(
      createPoint(20, 0, 0),
      createPoint(20, 10, 0),
      createPoint(20, 0, 10),
    );
    const { alpha1, alpha2 } = planeTraces(alpha);
    expectLineThrough(alpha1, [createPoint(20, 0, 0), createPoint(20, 50, 0)]);
    expectLineThrough(alpha2, [createPoint(20, 0, 0), createPoint(20, 0, 50)]);
  });
});

describe('pointOnPlane y lineOnPlane', () => {
  const a = createPoint(0, 30, 0);
  const b = createPoint(60, 0, 0);
  const c = createPoint(0, 0, 40);
  const alpha = createPlane(a, b, c);

  it('reconoce puntos y rectas del plano', () => {
    expect(pointOnPlane(add(scale(a, 0.5), scale(c, 0.5)), alpha)).toBe(true);
    expect(lineOnPlane(createLine(a, c), alpha)).toBe(true);
  });

  it('aplica la tolerancia de 0,01 mm', () => {
    const near = add(c, scale(alpha.normal, 0.009));
    const far = add(c, scale(alpha.normal, 0.011));
    expect(lineOnPlane(createLine(a, near), alpha)).toBe(true);
    expect(lineOnPlane(createLine(a, far), alpha)).toBe(false);
  });

  it('una recta que corta al plano no está en él', () => {
    expect(lineOnPlane(createLine(a, createPoint(0, 0, 0)), alpha)).toBe(false);
  });
});
