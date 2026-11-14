import { describe, expect, it } from 'vitest';
import { ErrorStepSchema, PROJECTION_REF } from './definition.ts';

describe('motor «error»', () => {
  it('acepta coordenadas de la lámina y referencias a proyecciones', () => {
    const data = ErrorStepSchema.parse({
      trazos: [{ puntos: [[0, 0], 'A″', 'B′'.replace("'", '′')] }],
    });
    expect(data.trazos[0]?.rotulo).toBe('Error');
  });

  it('un trazo puede ir sin rótulo (la punta de una flecha) y por defecto lo lleva', () => {
    const data = ErrorStepSchema.parse({
      trazos: [
        {
          puntos: [
            [0, 0],
            [5, 5],
          ],
        },
        {
          puntos: [
            [5, 5],
            [3, 6],
          ],
          sinRotulo: true,
        },
      ],
    });
    expect(data.trazos.map((t) => t.sinRotulo)).toEqual([false, true]);
  });

  it('rechaza trazos sin dos puntos o referencias mal escritas', () => {
    expect(ErrorStepSchema.safeParse({ trazos: [{ puntos: [[0, 0]] }] }).success).toBe(false);
    expect(ErrorStepSchema.safeParse({ trazos: [{ puntos: ['A', 'B″'] }] }).success).toBe(false);
    expect(ErrorStepSchema.safeParse({ trazos: [] }).success).toBe(false);
  });

  it('reconoce A′ y A″', () => {
    expect(PROJECTION_REF.exec('P″')?.[2]).toBe('″');
    expect(PROJECTION_REF.exec('P1′')?.[1]).toBe('P1');
  });
});
