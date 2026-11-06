import { describe, expect, it } from 'vitest';
import { createPoint, sheetCoords } from './point.ts';
import { rotateAboutLT } from './rotation.ts';
import { expectPointClose } from './test-helpers.ts';

describe('rotateAboutLT (abatimiento del PH)', () => {
  const p = createPoint(30, 40, 0); // punto del PH

  it('a 0° el punto no se mueve', () => {
    expectPointClose(rotateAboutLT(p, 0), p);
  });

  it('a 45° queda en (x, a·cos 45°, −a·sin 45°)', () => {
    const k = Math.SQRT1_2;
    expectPointClose(rotateAboutLT(p, 45), createPoint(30, 40 * k, -40 * k));
  });

  it('a 90° queda en el PV, en la posición de P′ en la lámina', () => {
    const r = rotateAboutLT(p, 90);
    expectPointClose(r, createPoint(30, 0, -40));
    expect(r.c).toBeCloseTo(sheetCoords(p).h.y, 9);
  });

  it('conserva la distancia a la LT de cualquier punto', () => {
    const q = createPoint(-10, 25, 35);
    const r = rotateAboutLT(q, 60);
    expect(Math.hypot(r.a, r.c)).toBeCloseTo(Math.hypot(q.a, q.c), 9);
    expect(r.x).toBe(q.x);
  });
});
