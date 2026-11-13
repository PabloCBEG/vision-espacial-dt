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

  it('el punto métrico está a la distancia ojo-fuga de su fuga, hacia P', () => {
    // 30° con el ojo a 70 mm: fuga cercana a 40,4 mm; ojo-fuga = 70 / cos 30° = 80,8 mm.
    const near = Math.abs(70 / Math.cos(Math.PI / 6) - 70 * Math.tan(Math.PI / 6));
    expect(conicValue(data(30), 'metricoCercano')).toBeCloseTo(near, 6);
    const far = Math.abs(70 / Math.cos(Math.PI / 3) - 70 * Math.tan(Math.PI / 3));
    expect(conicValue(data(30), 'metricoLejano')).toBeCloseTo(far, 6);
  });

  it('la altura de la arista más cercana se reduce con la distancia al ojo', () => {
    // Cubo de 30 mm con su centro a 40 mm detrás del cuadro, sin girar: la cara de delante
    // está a 40 − 15 = 25 mm del cuadro, y la escala es d / (d + 25).
    const d = 70;
    expect(conicValue(data(0, d), 'alturaArista')).toBeCloseTo((30 * d) / (d + 25), 6);
    // Un cubo girado 45° tiene su vértice más cercano más cerca del cuadro, y se ve mayor.
    expect(conicValue(data(45, d), 'alturaArista')).toBeGreaterThan((30 * d) / (d + 40));
  });

  it('ignora lo que no es una magnitud de cónica', () => {
    expect(conicValue(data(30), 'ejeX')).toBeNull();
    expect(conicValue(data(30), undefined)).toBeNull();
  });
});
