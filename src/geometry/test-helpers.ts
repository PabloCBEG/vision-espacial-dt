// Ayudas para los tests de src/geometry.
import { expect } from 'vitest';
import type { Point } from './types.ts';

/** Comprueba que dos puntos coinciden con precisión de 1e-6 mm. */
export function expectPointClose(actual: Point | null, expected: Point): void {
  expect(actual).not.toBeNull();
  if (!actual) return;
  expect(actual.x).toBeCloseTo(expected.x, 6);
  expect(actual.a).toBeCloseTo(expected.a, 6);
  expect(actual.c).toBeCloseTo(expected.c, 6);
}
