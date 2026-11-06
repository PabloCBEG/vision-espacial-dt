import { describe, expect, it } from 'vitest';
import { createPoint, foldHorizontalProjection, sheetCoords } from '../geometry/index.ts';
import { fromThree, sheetToThree, toThree, toThreeArray } from './coords.ts';

describe('conversión de coordenadas a Three.js', () => {
  it('X = x, Y = cota, Z = alejamiento', () => {
    const v = toThree(createPoint(10, 20, 30));
    expect(v.toArray()).toEqual([10, 30, 20]);
  });

  it('ida y vuelta devuelve el mismo punto', () => {
    const p = createPoint(-15, 42, -7);
    expect(fromThree(toThree(p))).toEqual(p);
  });

  it("a 90° la posición 3D de P' es exactamente la de la lámina (sheetCoords)", () => {
    for (const p of [createPoint(20, 30, 40), createPoint(-35, -15, 10), createPoint(0, 60, -60)]) {
      const in3d = toThree(foldHorizontalProjection(p, 90));
      const onSheet = sheetToThree(sheetCoords(p).h);
      expect(in3d.distanceTo(onSheet)).toBeLessThan(1e-9);
    }
  });

  it("a 45° P' todavía no está en la lámina", () => {
    const p = createPoint(20, 30, 40);
    const in3d = toThree(foldHorizontalProjection(p, 45));
    expect(in3d.distanceTo(sheetToThree(sheetCoords(p).h))).toBeGreaterThan(1);
  });

  it('toThreeArray encadena las coordenadas', () => {
    expect(toThreeArray([createPoint(1, 2, 3), createPoint(4, 5, 6)])).toEqual([1, 3, 2, 4, 6, 5]);
  });
});
