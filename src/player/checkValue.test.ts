import { describe, expect, it } from 'vitest';
import { checkValue } from './checkValue.ts';

describe('ejercicios de medida', () => {
  it('acepta dentro de la tolerancia', () => {
    expect(checkValue(57, 57.7, 'mm', 2).correct).toBe(true);
    expect(checkValue(57, 57.7, 'mm', 2).message).toContain('57,7 mm');
  });

  it('si sale corto, sugiere que se ha medido una proyección', () => {
    const r = checkValue(49, 57.7, 'mm', 2);
    expect(r.correct).toBe(false);
    expect(r.message).toMatch(/proyección/);
  });

  it('ángulos', () => {
    expect(checkValue(31, 31.3, '°', 2).message).toContain('31,3°');
    expect(checkValue(45, 31.3, '°', 2).correct).toBe(false);
  });

  it('pide un número', () => {
    expect(checkValue(Number.NaN, 10, 'mm', 1).message).toBe('Escribe un número.');
  });
});
