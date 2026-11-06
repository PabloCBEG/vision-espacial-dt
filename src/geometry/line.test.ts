import { describe, expect, it } from 'vitest';
import { createLine, lineTraces, pointOnLine } from './line.ts';
import { createPoint } from './point.ts';
import { expectPointClose } from './test-helpers.ts';

describe('createLine', () => {
  it('rechaza dos puntos iguales', () => {
    const p = createPoint(1, 2, 3);
    expect(() => createLine(p, p)).toThrow();
  });
});

describe('lineTraces', () => {
  it('recta oblicua: H con cota 0 y V con alejamiento 0, ambas en la recta', () => {
    const r = createLine(createPoint(10, 20, 30), createPoint(40, 50, 10));
    const { h, v } = lineTraces(r);
    expectPointClose(h, createPoint(55, 65, 0));
    expectPointClose(v, createPoint(-10, 0, 130 / 3));
    if (h && v) {
      expect(pointOnLine(h, r)).toBe(true);
      expect(pointOnLine(v, r)).toBe(true);
    }
  });

  it('recta paralela a la LT: no tiene trazas', () => {
    const r = createLine(createPoint(0, 20, 30), createPoint(50, 20, 30));
    expect(lineTraces(r)).toEqual({ h: null, v: null });
  });

  it('recta de perfil: tiene las dos trazas, con la misma x', () => {
    const r = createLine(createPoint(10, 10, 40), createPoint(10, 40, 10));
    const { h, v } = lineTraces(r);
    expectPointClose(h, createPoint(10, 50, 0));
    expectPointClose(v, createPoint(10, 0, 50));
  });

  it('recta paralela al PH (horizontal): sin traza H', () => {
    const r = createLine(createPoint(0, 10, 30), createPoint(40, 50, 30));
    const { h, v } = lineTraces(r);
    expect(h).toBeNull();
    expectPointClose(v, createPoint(-10, 0, 30));
  });

  it('recta paralela al PV (frontal): sin traza V', () => {
    const r = createLine(createPoint(0, 15, 10), createPoint(30, 15, 40));
    const { h, v } = lineTraces(r);
    expect(v).toBeNull();
    expectPointClose(h, createPoint(-10, 15, 0));
  });

  it('recta contenida en el PH: sin traza H', () => {
    const r = createLine(createPoint(0, 10, 0), createPoint(10, 30, 0));
    const { h, v } = lineTraces(r);
    expect(h).toBeNull();
    expectPointClose(v, createPoint(-5, 0, 0));
  });

  it('recta que corta a la LT: H y V coinciden en la LT', () => {
    const r = createLine(createPoint(20, 0, 0), createPoint(40, 30, 20));
    const { h, v } = lineTraces(r);
    expectPointClose(h, createPoint(20, 0, 0));
    expectPointClose(v, createPoint(20, 0, 0));
  });
});

describe('pointOnLine', () => {
  const r = createLine(createPoint(0, 10, 10), createPoint(50, 10, 10));

  it('acepta puntos de la recta, también fuera del segmento', () => {
    expect(pointOnLine(createPoint(25, 10, 10), r)).toBe(true);
    expect(pointOnLine(createPoint(-200, 10, 10), r)).toBe(true);
  });

  it('aplica la tolerancia de 0,01 mm', () => {
    expect(pointOnLine(createPoint(5, 10.009, 10), r)).toBe(true);
    expect(pointOnLine(createPoint(5, 10.011, 10), r)).toBe(false);
  });
});
