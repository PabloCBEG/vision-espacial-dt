import { describe, expect, it } from 'vitest';
import { conicValue } from './answers.ts';
import { ConicStepSchema } from './definition.ts';

const data = (giro: number, d = 70, h = 45) =>
  ConicStepSchema.parse({
    solido: { tipo: 'cubo', arista: 30, centro: [0, -40], giro },
    observador: { x: 0, d, h },
  });

describe('respuestas de perspectiva cónica', () => {
  it('el horizonte está a la altura del ojo y los puntos de distancia, a su distancia al cuadro', () => {
    expect(conicValue(data(0, 70, 45), 'horizonte')).toBe(45);
    expect(conicValue(data(0, 70, 45), 'puntoDistancia')).toBe(70);
  });

  it('cubo girado 30° con el observador a 70 mm: fugas a 40,4 y 121,2 mm de P', () => {
    expect(conicValue(data(30), 'fugaCercana')).toBeCloseTo(70 * Math.tan(Math.PI / 6), 6);
    expect(conicValue(data(30), 'fugaCercana')).toBeCloseTo(40.4, 1);
    expect(conicValue(data(30), 'fugaLejana')).toBeCloseTo(70 * Math.tan(Math.PI / 3), 6);
  });

  it('girado 45° las dos fugas equidistan de P', () => {
    expect(conicValue(data(45, 60), 'fugaCercana')).toBeCloseTo(60, 6);
    expect(conicValue(data(45, 60), 'fugaLejana')).toBeCloseTo(60, 6);
  });

  it('ignora lo que no es una magnitud de cónica', () => {
    expect(conicValue(data(30), 'ejeX')).toBeNull();
    expect(conicValue(data(30), undefined)).toBeNull();
  });
});
