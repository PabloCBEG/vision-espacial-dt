import { describe, expect, it } from 'vitest';
import { createLine, createPlane, createPoint, type Point } from '../../geometry/index.ts';
import {
  buildConstruction,
  exactValue,
  measureOf,
  sheetResult,
  type SceneLookup,
} from './construction.ts';
import { MethodsStepSchema, METHOD_NAMES, type MethodsStep } from './definition.ts';

const points: Record<string, Point> = {
  A: createPoint(-20, 10, 10),
  B: createPoint(20, 30, 40),
  C: createPoint(10, 40, 5),
  P: createPoint(5, 30, 25),
  V: createPoint(0, 20, 30),
};
const scene: SceneLookup = {
  point: (n) => points[n] ?? null,
  line: (id) => (id === 'r' ? createLine(createPoint(-30, 0, 0), createPoint(30, 20, 10)) : null),
  plane: (id) =>
    id === 'α'
      ? createPlane(createPoint(-30, 0, 0), createPoint(30, 0, 0), createPoint(0, 30, 20))
      : null,
};
const step = (data: Record<string, unknown>): MethodsStep => MethodsStepSchema.parse(data);
const build = (data: Record<string, unknown>) => {
  const k = buildConstruction(step(data), scene);
  if (!k) throw new Error('sin construcción');
  return k;
};

describe('los tres métodos dan el mismo resultado', () => {
  for (const objetivo of ['vm', 'angulo-PH', 'angulo-PV'] as const) {
    it(`segmento AB, objetivo ${objetivo}`, () => {
      const values = METHOD_NAMES.map((metodo) => {
        const k = build({ metodo, figura: ['A', 'B'], objetivo });
        expect(k.method).toBe(metodo);
        const m = measureOf(k);
        if (!m) throw new Error('sin medida');
        return m.value;
      });
      const exact = exactValue(build({ metodo: 'giro', figura: ['A', 'B'], objetivo }));
      for (const v of values) expect(v).toBeCloseTo(exact?.value ?? NaN, 6);
    });
  }

  it('la verdadera magnitud dibujada en la lámina mide lo mismo que en el espacio', () => {
    for (const metodo of METHOD_NAMES) {
      const { main } = sheetResult(build({ metodo, figura: ['A', 'B'] }));
      const [a, b] = main;
      if (!a || !b) throw new Error('sin resultado');
      expect(Math.hypot(b.x - a.x, b.y - a.y)).toBeCloseTo(Math.sqrt(2900), 6);
    }
  });

  it('figura plana: el abatimiento conserva sus lados y su ángulo', () => {
    const k = build({ metodo: 'abatimiento', figura: ['A', 'B', 'C'], objetivo: 'angulo' });
    const m = measureOf(k);
    expect(m?.value).toBeCloseTo(exactValue(k)?.value ?? NaN, 6);
  });

  it('figura plana con giro o cambio: avisa y no mueve nada', () => {
    const k = build({ metodo: 'giro', figura: ['A', 'B', 'C'] });
    expect(k.method).toBeNull();
    expect(k.notice).toMatch(/abatimiento/);
  });
});

describe('aplicaciones', () => {
  it('distancia de punto a plano: se mueve el segmento P–F', () => {
    const k = build({ metodo: 'giro', distancia: { desde: 'P', hasta: 'α' } });
    expect(k.figure.map((f) => f.name)).toEqual(['P', 'F']);
    expect(k.perpendicular).not.toBeNull();
  });

  it('distancia de punto a recta', () => {
    const k = build({ metodo: 'cambio', distancia: { desde: 'P', hasta: 'r' } });
    const m = measureOf(k);
    expect(m?.unit).toBe('mm');
  });

  it('ángulo de recta y plano por abatimiento del triángulo A, I, F', () => {
    const k = build({
      metodo: 'abatimiento',
      anguloRectaPlano: { recta: ['A', 'B'], plano: 'α' },
      objetivo: 'angulo',
    });
    expect(k.figure.map((f) => f.name)).toEqual(['A', 'I', 'F']);
    expect(measureOf(k)?.value).toBeCloseTo(exactValue(k)?.value ?? NaN, 6);
  });

  it('cono de rectas con ángulo dado: φ rotulado igual al pedido', () => {
    const k = build({ metodo: 'giro', cono: { vertice: 'V', angulo: 40 } });
    expect(measureOf(k)?.value).toBeCloseTo(40, 6);
  });

  it('rechaza un paso sin figura ni aplicación', () => {
    expect(MethodsStepSchema.safeParse({ metodo: 'giro' }).success).toBe(false);
  });
});
