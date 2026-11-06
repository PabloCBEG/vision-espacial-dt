import { describe, expect, it } from 'vitest';
import { createPoint } from '../geometry/index.ts';
import { fromThree, toThree, toThreeArray } from './coords.ts';

describe('conversión de coordenadas a Three.js', () => {
  it('X = x, Y = cota, Z = alejamiento', () => {
    const v = toThree(createPoint(10, 20, 30));
    expect(v.toArray()).toEqual([10, 30, 20]);
  });

  it('ida y vuelta devuelve el mismo punto', () => {
    const p = createPoint(-15, 42, -7);
    expect(fromThree(toThree(p))).toEqual(p);
  });

  it('toThreeArray encadena las coordenadas', () => {
    expect(toThreeArray([createPoint(1, 2, 3), createPoint(4, 5, 6)])).toEqual([1, 3, 2, 4, 6, 5]);
  });
});
