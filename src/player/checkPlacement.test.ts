import { describe, expect, it } from 'vitest';
import { createPoint } from '../geometry/index.ts';
import { checkPlacement } from './checkPlacement.ts';

const target = createPoint(30, 20, 35);

describe('checkPlacement', () => {
  it('acierta (con 1 mm de margen)', () => {
    expect(checkPlacement(createPoint(30, 20, 35), target).correct).toBe(true);
    expect(checkPlacement(createPoint(31, 19, 35), target).correct).toBe(true);
  });

  it('detecta cota y alejamiento intercambiados', () => {
    const r = checkPlacement(createPoint(30, 35, 20), target);
    expect(r.correct).toBe(false);
    expect(r.mistakes).toEqual(['swapped']);
    expect(r.message).toContain('intercambiado');
  });

  it('detecta el signo cambiado del alejamiento', () => {
    const r = checkPlacement(createPoint(30, -20, 35), target);
    expect(r.mistakes).toEqual(['alejamientoSign']);
  });

  it('detecta el signo cambiado de la cota', () => {
    const r = checkPlacement(createPoint(30, 20, -35), target);
    expect(r.mistakes).toEqual(['cotaSign']);
  });

  it('distingue un error solo de cota o solo de alejamiento', () => {
    expect(checkPlacement(createPoint(30, 20, 10), target).mistakes).toEqual(['cota']);
    expect(checkPlacement(createPoint(30, 50, 35), target).mistakes).toEqual(['alejamiento']);
  });

  it('detecta la x equivocada', () => {
    const r = checkPlacement(createPoint(-10, 20, 35), target);
    expect(r.mistakes).toEqual(['x']);
    expect(r.message).toContain('línea de referencia');
  });

  it('si cota y alejamiento son iguales no habla de intercambio', () => {
    const r = checkPlacement(createPoint(0, 10, 10), createPoint(0, 25, 25));
    expect(r.mistakes).toEqual(['cota', 'alejamiento']);
  });
});
