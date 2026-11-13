import { describe, expect, it } from 'vitest';
import { evaluate, type ObjectDef } from './graph.ts';

const point = (defs: ObjectDef[], id: string): { x: number; y: number } => {
  const v = evaluate(defs).get(id)?.value;
  if (v?.kind !== 'point') throw new Error(`«${id}» no es un punto`);
  return v.p;
};

const base: ObjectDef[] = [
  { id: 'P', tipo: 'punto', en: [10, 0] },
  { id: 'O', tipo: 'punto', en: [0, 0] },
  { id: 'A', tipo: 'punto', en: [0, 5] },
  { id: 'B', tipo: 'punto', en: [20, 15] },
];

describe('transformaciones de un punto', () => {
  it('traslación: suma el vector AB', () => {
    const p = point([...base, { id: 'T', tipo: 'traslacion', de: 'P', vector: ['A', 'B'] }], 'T');
    expect(p.x).toBeCloseTo(30, 9);
    expect(p.y).toBeCloseTo(10, 9);
  });

  it('giro de 90° antihorario alrededor de O', () => {
    const p = point([...base, { id: 'G', tipo: 'giro', de: 'P', centro: 'O', angulo: 90 }], 'G');
    expect(p.x).toBeCloseTo(0, 9);
    expect(p.y).toBeCloseTo(10, 9);
  });

  it('simetría axial respecto de una recta: perpendicular y misma distancia', () => {
    const defs: ObjectDef[] = [
      ...base,
      { id: 'e', tipo: 'recta', por: ['O', 'B'] },
      { id: 'S', tipo: 'simetria', de: 'P', eje: 'e' },
    ];
    const s = point(defs, 'S');
    // El eje pasa por O con la dirección (20, 15): P(10, 0) y su simétrico equidistan de O.
    expect(Math.hypot(s.x, s.y)).toBeCloseTo(10, 9);
    expect((s.x - 10) * 20 + s.y * 15).toBeCloseTo(0, 9); // PS ⟂ eje
  });

  it('homotecia: directa e inversa', () => {
    const k2 = point(
      [...base, { id: 'H', tipo: 'homotecia', de: 'P', centro: 'O', razon: 2 }],
      'H',
    );
    expect(k2.x).toBeCloseTo(20, 9);
    const inv = point(
      [...base, { id: 'H', tipo: 'homotecia', de: 'P', centro: 'O', razon: -0.5 }],
      'H',
    );
    expect(inv.x).toBeCloseTo(-5, 9);
    expect(inv.y).toBeCloseTo(0, 9);
  });
});
