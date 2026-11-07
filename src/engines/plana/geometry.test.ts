import { describe, expect, it } from 'vitest';
import {
  angleAt,
  arcPoint,
  capableArc,
  dist,
  intersectCircles,
  intersectLineCircle,
  intersectLines,
  linesBisector,
  lineThrough,
  mediatrix,
  power,
  pt,
  radicalAxis,
  radicalCenter,
  tangentPoints,
  type Line2,
} from './geometry.ts';
import {
  evaluate,
  firstProblem,
  intersections,
  nearestParam,
  pointOn,
  type ObjectDef,
} from './graph.ts';

const L = (ax: number, ay: number, bx: number, by: number): Line2 =>
  lineThrough(pt(ax, ay), pt(bx, by)) as Line2;

describe('intersecciones con casos límite', () => {
  it('rectas que se cortan y rectas paralelas', () => {
    expect(intersectLines(L(0, 0, 10, 0), L(5, -5, 5, 5))).toEqual(pt(5, 0));
    expect(intersectLines(L(0, 0, 10, 0), L(0, 5, 10, 5))).toBeNull();
  });

  it('recta y circunferencia: secante, tangente y exterior', () => {
    const c = { c: pt(0, 0), r: 10 };
    expect(intersectLineCircle(L(-20, 0, 20, 0), c)).toHaveLength(2);
    expect(intersectLineCircle(L(-20, 10, 20, 10), c)).toEqual([pt(0, 10)]);
    expect(intersectLineCircle(L(-20, 11, 20, 11), c)).toEqual([]);
  });

  it('circunferencias: secantes, tangentes exteriores e interiores, separadas y concéntricas', () => {
    const a = { c: pt(0, 0), r: 10 };
    expect(intersectCircles(a, { c: pt(15, 0), r: 10 })).toHaveLength(2);
    const ext = intersectCircles(a, { c: pt(20, 0), r: 10 });
    expect(ext).toHaveLength(1);
    expect(ext[0]?.x).toBeCloseTo(10, 9);
    const int = intersectCircles(a, { c: pt(5, 0), r: 5 });
    expect(int).toHaveLength(1);
    expect(int[0]?.x).toBeCloseTo(10, 9);
    expect(intersectCircles(a, { c: pt(30, 0), r: 10 })).toEqual([]);
    expect(intersectCircles(a, { c: pt(0, 0), r: 5 })).toEqual([]);
  });

  it('los puntos de corte están en las dos circunferencias', () => {
    const a = { c: pt(-3, 2), r: 12 };
    const b = { c: pt(9, -4), r: 8 };
    for (const p of intersectCircles(a, b)) {
      expect(dist(p, a.c)).toBeCloseTo(12, 9);
      expect(dist(p, b.c)).toBeCloseTo(8, 9);
    }
  });
});

describe('construcciones', () => {
  it('mediatriz: sus puntos equidistan de A y B', () => {
    const m = mediatrix(pt(-10, 3), pt(20, -7)) as Line2;
    const q = { x: m.p.x + m.d.x * 17, y: m.p.y + m.d.y * 17 };
    expect(dist(q, pt(-10, 3))).toBeCloseTo(dist(q, pt(20, -7)), 9);
    expect(mediatrix(pt(1, 1), pt(1, 1))).toBeNull();
  });

  it('bisectrices de dos rectas y de dos paralelas', () => {
    const b0 = linesBisector(L(0, 0, 10, 0), L(0, 0, 0, 10), 0) as Line2;
    expect(Math.abs(b0.d.x)).toBeCloseTo(Math.abs(b0.d.y), 9);
    const parallel = linesBisector(L(0, 0, 10, 0), L(0, 6, 10, 6), 0) as Line2;
    expect(parallel.p.y).toBeCloseTo(3, 9);
    expect(linesBisector(L(0, 0, 10, 0), L(0, 6, 10, 6), 1)).toBeNull();
  });

  it('tangentes desde un punto: exterior, sobre la circunferencia e interior', () => {
    const c = { c: pt(0, 0), r: 10 };
    const t = tangentPoints(pt(20, 0), c);
    expect(t).toHaveLength(2);
    for (const q of t) {
      // El radio es perpendicular a la tangente en el punto de tangencia.
      const rx = q.x - c.c.x;
      const ry = q.y - c.c.y;
      expect(rx * (q.x - 20) + ry * (q.y - 0)).toBeCloseTo(0, 9);
    }
    expect(tangentPoints(pt(10, 0), c)).toHaveLength(1);
    expect(tangentPoints(pt(3, 0), c)).toEqual([]);
  });

  it('eje radical: misma potencia respecto a las dos circunferencias', () => {
    const a = { c: pt(0, 0), r: 10 };
    const b = { c: pt(30, 5), r: 6 };
    const e = radicalAxis(a, b) as Line2;
    for (const s of [-20, 0, 35]) {
      const q = { x: e.p.x + e.d.x * s, y: e.p.y + e.d.y * s };
      expect(power(q, a)).toBeCloseTo(power(q, b), 6);
    }
    expect(radicalAxis(a, { c: pt(0, 0), r: 4 })).toBeNull();
  });

  it('centro radical de tres circunferencias, y sin él si los centros están alineados', () => {
    const a = { c: pt(0, 0), r: 10 };
    const b = { c: pt(30, 5), r: 6 };
    const c = { c: pt(10, 30), r: 8 };
    const o = radicalCenter(a, b, c);
    expect(o).not.toBeNull();
    if (o) {
      expect(power(o, a)).toBeCloseTo(power(o, b), 6);
      expect(power(o, b)).toBeCloseTo(power(o, c), 6);
    }
    expect(radicalCenter(a, { c: pt(20, 0), r: 3 }, { c: pt(40, 0), r: 5 })).toBeNull();
  });

  it('arco capaz: desde cualquier punto del arco se ve AB con el ángulo pedido', () => {
    const A = pt(-20, 0);
    const B = pt(20, 0);
    for (const phi of [30, 60, 90, 120]) {
      const arc = capableArc(A, B, phi, 1);
      if (!arc) throw new Error('sin arco');
      for (const t of [0.1, 0.5, 0.9]) {
        const p = arcPoint(arc, t);
        expect(p.y).toBeGreaterThan(0); // del lado pedido
        expect(angleAt(A, p, B)).toBeCloseTo(phi, 6);
      }
    }
    const below = capableArc(A, B, 45, -1);
    if (!below) throw new Error('sin arco');
    expect(arcPoint(below, 0.5).y).toBeLessThan(0);
  });
});

describe('grafo de dependencias', () => {
  const defs: ObjectDef[] = [
    { id: 'A', tipo: 'punto', en: [-20, 0] },
    { id: 'B', tipo: 'punto', en: [20, 0] },
    { id: 'R', tipo: 'punto', en: [0, -30] },
    { id: 'cA', tipo: 'circunferencia', centro: 'A', radioDe: ['A', 'R'] },
    { id: 'cB', tipo: 'circunferencia', centro: 'B', radioDe: ['A', 'R'] },
    { id: 'P', tipo: 'interseccion', de: ['cA', 'cB'] },
    { id: 'm', tipo: 'mediatriz', de: ['A', 'B'] },
  ];

  it('las circunferencias de igual radio se cortan en la mediatriz', () => {
    const e = evaluate(defs);
    const P = e.get('P')?.value;
    expect(P?.kind).toBe('point');
    if (P?.kind === 'point') expect(P.p.x).toBeCloseTo(0, 9);
  });

  it('al mover un dato se recalcula lo que depende de él', () => {
    const e = evaluate(defs, { B: [30, 0] });
    const P = e.get('P')?.value;
    if (P?.kind === 'point') expect(P.p.x).toBeCloseTo(5, 9);
  });

  it('sin solución: aviso breve, sin fallar, y lo que depende tampoco se dibuja', () => {
    const more: ObjectDef[] = [...defs, { id: 'Q', tipo: 'puntoMedio', de: ['P', 'A'] }];
    const e = evaluate(more, { R: [-20, -5] }); // radio 5: no se cortan
    expect(e.get('P')?.value).toBeNull();
    expect(firstProblem(e)).toMatch(/no se cortan/);
    expect(e.get('Q')?.value).toBeNull();
    expect(e.get('Q')?.problem).toBeNull();
  });

  it('un objeto que cita otro posterior avisa', () => {
    const e = evaluate([{ id: 'm', tipo: 'mediatriz', de: ['A', 'B'] }]);
    expect(e.get('m')?.problem).toMatch(/no está definido/);
  });

  it('segmentos y arcos: solo cuentan los cortes dentro del trozo', () => {
    const seg = evaluate([
      { id: 'A', tipo: 'punto', en: [0, 0] },
      { id: 'B', tipo: 'punto', en: [5, 0] },
      { id: 'C', tipo: 'punto', en: [10, -5] },
      { id: 'D', tipo: 'punto', en: [10, 5] },
      { id: 's', tipo: 'segmento', por: ['A', 'B'] },
      { id: 't', tipo: 'segmento', por: ['C', 'D'] },
    ]);
    const s = seg.get('s')?.value;
    const t = seg.get('t')?.value;
    if (!s || !t) throw new Error('sin valores');
    expect(intersections(s, t)).toEqual([]);
  });

  it('punto sobre objeto: parámetro y punto más cercano', () => {
    const e = evaluate([
      { id: 'O', tipo: 'punto', en: [0, 0] },
      { id: 'c', tipo: 'circunferencia', centro: 'O', radio: 10 },
      { id: 'X', tipo: 'puntoSobre', sobre: 'c', t: 0.25 },
    ]);
    const X = e.get('X')?.value;
    if (X?.kind === 'point') {
      expect(X.p.x).toBeCloseTo(0, 9);
      expect(X.p.y).toBeCloseTo(10, 9);
    }
    const c = e.get('c')?.value;
    if (!c) throw new Error('sin c');
    expect(nearestParam(c, pt(-5, 0))).toBeCloseTo(0.5, 9);
    expect(pointOn(c, 0.5).x).toBeCloseTo(-10, 9);
  });

  it('tangente desde un punto interior: aviso', () => {
    const e = evaluate([
      { id: 'O', tipo: 'punto', en: [0, 0] },
      { id: 'c', tipo: 'circunferencia', centro: 'O', radio: 10 },
      { id: 'P', tipo: 'punto', en: [2, 0] },
      { id: 't', tipo: 'tangente', desde: 'P', a: 'c' },
    ]);
    expect(firstProblem(e)).toMatch(/dentro de la circunferencia/);
  });
});
