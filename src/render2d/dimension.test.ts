import { describe, expect, it } from 'vitest';
import { DIMENSION_PX, verticalDimension } from './dimension.ts';

const base = { featureX: 20, mmPerPx: 0.5, fromHasLine: true, value: '40' } as const;

describe('verticalDimension (UNE-EN ISO 129-1)', () => {
  it('cota a la izquierda: línea de cota paralela, separada del elemento', () => {
    const d = verticalDimension({ ...base, fromY: 0, toY: -40, side: 'left' });
    const lineX = 20 - DIMENSION_PX.offset * 0.5;
    expect(d.dimensionLine).toEqual({ x1: lineX, y1: -40, x2: lineX, y2: 0 });
  });

  it('la auxiliar sobrepasa la línea de cota y no toca el punto', () => {
    const d = verticalDimension({ ...base, fromY: 0, toY: -40, side: 'left' });
    expect(d.extensionLines).toHaveLength(1); // la LT hace de auxiliar en el otro extremo
    const [aux] = d.extensionLines;
    expect(aux?.y1).toBe(-40);
    expect(aux?.x1).toBeLessThan(20);
    expect(aux?.x2).toBeLessThan(d.dimensionLine.x1);
  });

  it('las flechas tocan los extremos medidos desde dentro', () => {
    const d = verticalDimension({ ...base, fromY: 0, toY: 30, side: 'right' });
    const [first, second] = d.arrowheads;
    expect(first[1]).toBe(0); // vértice en la LT
    expect(first[3]).toBeGreaterThan(0); // base hacia dentro
    expect(second[1]).toBe(30); // vértice en el punto
    expect(second[3]).toBeLessThan(30);
  });

  it('si no cabe, las flechas van por fuera y la línea se prolonga', () => {
    const d = verticalDimension({ ...base, fromY: 0, toY: 3, side: 'right' });
    const [first, second] = d.arrowheads;
    expect(first[3]).toBeLessThan(0); // base por fuera, encima de la LT
    expect(second[3]).toBeGreaterThan(3);
    expect(d.dimensionLine.y1).toBeLessThan(0);
    expect(d.dimensionLine.y2).toBeGreaterThan(3);
  });

  it('la cifra va centrada, encima de la línea (a su izquierda) y girada para leerse desde la derecha', () => {
    const d = verticalDimension({ ...base, fromY: 0, toY: -40, side: 'left' });
    expect(d.text.y).toBe(-20);
    expect(d.text.x).toBeLessThan(d.dimensionLine.x1);
    expect(d.text.rotation).toBe(-90);
    expect(d.text.value).toBe('40');
  });

  it('dibuja auxiliar en los dos extremos si ninguno tiene línea propia', () => {
    const d = verticalDimension({ ...base, fromHasLine: false, fromY: 10, toY: 50, side: 'left' });
    expect(d.extensionLines).toHaveLength(2);
  });
});
