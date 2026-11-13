import { describe, expect, it } from 'vitest';
import { axonValue } from './answers.ts';
import { AxonStepSchema } from './definition.ts';

const data = (extra: Record<string, unknown>) =>
  AxonStepSchema.parse({ solido: { tipo: 'cubo', arista: 30, centro: [0, 30] }, ...extra });

describe('respuestas de axonometría', () => {
  it('perspectiva isométrica: la arista se reduce con 0,816 en los tres ejes', () => {
    for (const m of ['ejeX', 'ejeY', 'ejeZ']) {
      expect(axonValue(data({}), m)).toBeCloseTo(30 * Math.sqrt(2 / 3), 6);
    }
  });

  it('dibujo isométrico: sin reducir', () => {
    expect(axonValue(data({ sistema: 'dibujo-isometrico' }), 'ejeY')).toBeCloseTo(30, 6);
  });

  it('caballera: solo se reduce el eje Y, con su coeficiente', () => {
    const d = data({ sistema: 'caballera', caballera: { angulo: 45, coeficiente: 0.5 } });
    expect(axonValue(d, 'ejeX')).toBeCloseTo(30, 6);
    expect(axonValue(d, 'ejeZ')).toBeCloseTo(30, 6);
    expect(axonValue(d, 'ejeY')).toBeCloseTo(15, 6);
  });

  it('la diagonal vertical del octaedro es la arista por √2, reducida como OZ', () => {
    const oct = { solido: { tipo: 'octaedro', arista: 30, centro: [0, 30], giro: 45 } };
    expect(axonValue(data(oct), 'diagonalVertical')).toBeCloseTo(34.64, 1);
    expect(axonValue(data({ ...oct, sistema: 'caballera' }), 'diagonalVertical')).toBeCloseTo(
      30 * Math.SQRT2,
      6,
    );
    // El cubo no tiene diagonal vertical que pedir.
    expect(axonValue(data({}), 'diagonalVertical')).toBeNull();
  });

  it('la altura de un prisma es su eje Z; sus aristas de la base no se piden', () => {
    const prisma = { solido: { tipo: 'prisma', lados: 4, radio: 20, altura: 45, centro: [0, 30] } };
    expect(axonValue(data(prisma), 'ejeZ')).toBeCloseTo(45 * Math.sqrt(2 / 3), 6);
    expect(axonValue(data({ ...prisma, sistema: 'caballera' }), 'ejeZ')).toBeCloseTo(45, 6);
    expect(axonValue(data(prisma), 'ejeX')).toBeNull();
  });

  it('la diagonal de la cara frontal no se reduce con el coeficiente del eje', () => {
    // Caballera: el plano XZ está en verdadera magnitud, la diagonal mide arista por √2.
    expect(axonValue(data({ sistema: 'caballera' }), 'diagonalCara')).toBeCloseTo(
      30 * Math.SQRT2,
      6,
    );
    // Isométrica: los ejes X y Z forman 120°, así que X + Z mide lo mismo que una arista reducida.
    expect(axonValue(data({}), 'diagonalCara')).toBeCloseTo(30 * Math.sqrt(2 / 3), 6);
    // Dibujo isométrico: la arista entera.
    expect(axonValue(data({ sistema: 'dibujo-isometrico' }), 'diagonalCara')).toBeCloseTo(30, 6);
    expect(
      axonValue(data({ solido: { tipo: 'octaedro', arista: 30 } }), 'diagonalCara'),
    ).toBeNull();
  });

  it('ignora lo que no es una magnitud de axonometría', () => {
    expect(axonValue(data({}), 'ladoMayor')).toBeNull();
    expect(axonValue(data({}), undefined)).toBeNull();
  });
});
