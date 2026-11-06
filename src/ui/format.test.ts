import { describe, expect, it } from 'vitest';
import { createPoint } from '../geometry/index.ts';
import { describePoint, formatMm, formatNumber } from './format.ts';

describe('formato de valores', () => {
  it('usa el signo menos tipográfico', () => {
    expect(formatNumber(-20)).toBe('−20');
    expect(formatMm(-20)).toBe('−20 mm');
    expect(formatMm(35)).toBe('35 mm');
  });

  it('no muestra −0', () => {
    expect(formatNumber(-0.2)).toBe('0');
  });

  it('describe el punto y su cuadrante', () => {
    expect(describePoint(createPoint(20, -30, 40), 2)).toBe(
      'P(20, −30, 40) mm, en el segundo cuadrante',
    );
    expect(describePoint(createPoint(5, 0, 0), 'en LT')).toBe(
      'P(5, 0, 0) mm, en la línea de tierra',
    );
  });
});
