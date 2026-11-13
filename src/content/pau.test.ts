import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { evaluate, firstProblem } from '../engines/plana/graph.ts';
import { PlaneStepSchema } from '../engines/plana/definition.ts';
import { findTopic } from './catalog.ts';
import { parsePau, rubricScore, solutionLesson } from './pauSchema.ts';
import { createPlane, createPoint, distancePointToPlane } from '../geometry/index.ts';
import { distance } from '../geometry/vector.ts';
import { buildScene } from '../engines/solidos/construction.ts';
import { SolidsStepSchema } from '../engines/solidos/definition.ts';
import { LessonSchema, WideInitialSceneSchema } from './schema.ts';
import { solutionPartProblems, type SolutionPart } from './solutionParts.ts';
import { NormStepSchema } from '../engines/normalizacion/definition.ts';
import { findPiece } from './pieces.ts';

const DIR = join(import.meta.dirname, 'pau');
const { exercises, errors } = parsePau(
  Object.fromEntries(
    readdirSync(DIR)
      .filter((f) => f.endsWith('.json'))
      .map((f) => [f, JSON.parse(readFileSync(join(DIR, f), 'utf8')) as unknown]),
  ),
);

describe('banco PAU', () => {
  it('los ejercicios cumplen el formato', () => {
    expect(errors).toEqual([]);
    expect(exercises.length).toBeGreaterThanOrEqual(4);
  });

  it('hay un ejemplo de cada ejercicio (1 a 4)', () => {
    expect(new Set(exercises.map((e) => e.ejercicio))).toEqual(new Set([1, 2, 3, 4]));
  });

  it('los temas existen y la solución es una lección válida', () => {
    for (const e of exercises) {
      for (const t of e.temas) expect(findTopic(t), `${e.id}: ${t}`).toBeDefined();
      // Los ejercicios PAU ocupan toda la hoja: sus puntos pueden pasar de ±60 mm.
      const wide = LessonSchema.extend({ initialScene: WideInitialSceneSchema });
      expect(wide.safeParse(solutionLesson(e)).success, e.id).toBe(true);
    }
  });

  it('las construcciones planas tienen solución', () => {
    for (const e of exercises) {
      const plana = e.initialScene.engines?.plana;
      if (!plana) continue;
      const objetos = PlaneStepSchema.parse(plana).objetos ?? [];
      expect(firstProblem(evaluate(objetos)), e.id).toBeNull();
    }
  });

  it('rúbrica: precisión y presentación solo con el 70 % de la solución', () => {
    const e = exercises[0];
    if (!e) throw new Error('sin ejercicios');
    const all = new Set(e.rubrica.criterios.map((_, i) => i));
    expect(rubricScore(e, all, true, true).total).toBeCloseTo(2.5, 9);
    // Con menos de 1,4 puntos de solución, precisión y presentación no cuentan.
    const few = new Set([0]);
    const low = rubricScore(e, few, true, true);
    expect(low.extrasAllowed).toBe(false);
    expect(low.total).toBeCloseTo(low.solution, 9);
  });
});

describe('ejemplo 1A: comprobación numérica', () => {
  it('las dos circunferencias solución pasan por A y B y son tangentes a c', () => {
    const e = exercises.find((x) => x.id === 'ejemplo-1a-tangencias');
    if (!e) throw new Error('falta el ejemplo');
    const all = evaluate(PlaneStepSchema.parse(e.initialScene.engines?.plana).objetos ?? []);
    const point = (id: string) => {
      const v = all.get(id)?.value;
      if (v?.kind !== 'point') throw new Error(id);
      return v.p;
    };
    const A = point('A');
    const B = point('B');
    const C = point('C');
    for (const id of ['O1', 'O2']) {
      const O = point(id);
      const r = Math.hypot(O.x - A.x, O.y - A.y);
      expect(Math.hypot(O.x - B.x, O.y - B.y)).toBeCloseTo(r, 6);
      const d = Math.hypot(O.x - C.x, O.y - C.y);
      // Tangente exterior (d = r + 12) o interior (d = |r − 12|).
      expect(Math.min(Math.abs(d - (r + 12)), Math.abs(d - Math.abs(r - 12)))).toBeLessThan(1e-6);
    }
  });
});

/** Ejercicios reales de exámenes (no los de muestra). */
const real = exercises.filter((e) => !e.convocatoria.startsWith('Ejemplo'));
const byId = (id: string) => {
  const e = real.find((x) => x.id === id);
  if (!e) throw new Error(`Falta el ejercicio ${id}`);
  return e;
};
type Pt2 = { x: number; y: number };
const planaPoints = (id: string) => {
  const e = byId(id);
  const all = evaluate(PlaneStepSchema.parse(e.initialScene.engines?.plana).objetos ?? []);
  return (name: string): Pt2 => {
    const v = all.get(name)?.value;
    if (v?.kind !== 'point') throw new Error(`${id}: ${name}`);
    return v.p;
  };
};
const d2 = (a: Pt2, b: Pt2): number => Math.hypot(a.x - b.x, a.y - b.y);

describe('ejercicios PAU reales (Andalucía 2025 y 2026)', () => {
  it('hay tres del ejercicio 1 y tres del ejercicio 2', () => {
    expect(real.filter((e) => e.ejercicio === 1)).toHaveLength(3);
    expect(real.filter((e) => e.ejercicio === 2)).toHaveLength(3);
    expect(real.filter((e) => e.ejercicio === 4)).toHaveLength(1);
  });

  it('normalización 2026 ord. 4: la pieza y las cotas del corte cuadran con lo medido', () => {
    const e = real.find((x) => x.id === 'pau-2026-ord-4-eje-corte');
    const piece = findPiece('eje-escalonado-con-placa');
    if (!e || !piece) throw new Error('Falta el ejercicio o su pieza');
    const cylinders = piece.operaciones.flatMap((o) => (o.tipo === 'cilindro' ? [o] : []));
    expect(cylinders.map((c) => 2 * c.radio)).toEqual([60, 100, 60]);
    expect(cylinders.map((c) => c.largo)).toEqual([60, 60, 40]);
    const plate = piece.operaciones.find((o) => o.tipo === 'bloque');
    if (plate?.tipo !== 'bloque') throw new Error('Falta la placa');
    expect(plate.hasta[0] - plate.desde[0]).toBe(40);
    // Longitud total: los tres cilindros y la placa, uno detrás de otro.
    expect(cylinders.reduce((s, c) => s + c.largo, 0) + 40).toBe(200);
    const cuts = e.solucion.flatMap(
      (s) => NormStepSchema.parse(s.engines?.normalizacion ?? {}).cotas,
    );
    const totals = cuts.filter(
      (c) => c.tipo === 'lineal' && c.direccion === 'h' && c.de[1][0] - c.de[0][0] === 200,
    );
    expect(totals.length).toBeGreaterThan(0);
  });

  it('la solución sigue las seis partes y la rúbrica está marcada como derivada', () => {
    for (const e of real) {
      expect(
        e.solucion.every((s) => s.part !== undefined),
        e.id,
      ).toBe(true);
      expect(solutionPartProblems(e.solucion.map((s) => s.part as SolutionPart)), e.id).toEqual([]);
      // Sin criterios oficiales publicados, la rúbrica está derivada y a la espera de revisión.
      expect(e.rubrica.origen, e.id).toBe('derivada');
      expect(e.enunciado.length, e.id).toBeGreaterThan(100);
    }
  });

  it('tangencias 2026 ord. 1A: las dos circunferencias tocan a C₂ en T y a C₁', () => {
    const p = planaPoints('pau-2026-ord-1a-tangencias');
    const [O1, O2, T] = [p('O1'), p('O2'), p('T')];
    expect(d2(O2, T)).toBeCloseTo(20, 0);
    for (const id of ['X1', 'X2']) {
      const X = p(id);
      const r = d2(X, T);
      // Centro en O₂T: O₂, T y el centro están alineados.
      const cross = (T.x - O2.x) * (X.y - O2.y) - (T.y - O2.y) * (X.x - O2.x);
      expect(Math.abs(cross) / d2(O2, T)).toBeLessThan(1e-6);
      // Tangente a C₁ (radio 32,5), por fuera o por dentro.
      const dist = d2(X, O1);
      expect(
        Math.min(Math.abs(dist - (r + 32.5)), Math.abs(dist - Math.abs(r - 32.5))),
      ).toBeLessThan(1e-3);
    }
  });

  it('parábola 2026 ext. 1A: P equidista de F y de D, y T es la mediatriz de QF', () => {
    const p = planaPoints('pau-2026-ext-1a-parabola');
    const [P, Q, F, M, V] = [p('P'), p('Q'), p('F'), p('M'), p('V')];
    expect(d2(P, F)).toBeCloseTo(Math.abs(P.y - Q.y), 6);
    // M es el punto medio de QF (T la corta en su mitad y perpendicularmente).
    expect(M.x).toBeCloseTo((Q.x + F.x) / 2, 6);
    expect(M.y).toBeCloseTo((Q.y + F.y) / 2, 6);
    // El vértice está a mitad de camino entre F y la directriz.
    expect(V.y).toBeCloseTo((F.y + Q.y) / 2, 6);
  });

  it('afinidad 2025 ord. 1: los segmentos PP′ son perpendiculares al eje y la razón es constante', () => {
    const p = planaPoints('pau-2025-ord-1-afinidad');
    const C = p('C');
    const k = (p('A1').y - C.y) / (p('A').y - C.y);
    expect(k).toBeCloseTo(-2, 1);
    for (const [P, P1] of [
      ['B', 'B1'],
      ['D', 'D1'],
      ['E', 'E1'],
      ['F', 'F1'],
    ] as const) {
      const a = p(P);
      const b = p(P1);
      expect(b.x).toBeCloseTo(a.x, 6);
      expect((b.y - C.y) / (a.y - C.y)).toBeCloseTo(k, 6);
    }
  });

  it('cuadrado 2026 ord. 2: ABCD es un cuadrado de diagonal 80,9 mm contenido en el plano α', () => {
    const e = byId('pau-2026-ord-2-cuadrado-en-plano');
    const q = (n: string) => {
      const c = e.initialScene.points[n];
      if (!c) throw new Error(n);
      return createPoint(c[0], c[1], c[2]);
    };
    const [A, B, C, D] = [q('A'), q('B'), q('C'), q('D')];
    const side = distance(A, B);
    for (const [u, v] of [
      [B, C],
      [C, D],
      [D, A],
    ] as const) {
      expect(distance(u, v)).toBeCloseTo(side, 0);
    }
    expect(distance(A, C)).toBeCloseTo(80.9, 0);
    expect(distance(A, C)).toBeCloseTo(side * Math.SQRT2, 0);
    // D está en el plano ABC (cuatro puntos coplanarios).
    expect(distancePointToPlane(D, createPlane(A, B, C))).toBeLessThan(0.3);
    // B tiene cota cero y A alejamiento cero; todo el cuadrado está en el primer diedro.
    expect(B.c).toBe(0);
    expect(A.a).toBe(0);
    for (const v of [A, B, C, D]) {
      expect(v.a).toBeGreaterThanOrEqual(0);
      expect(v.c).toBeGreaterThanOrEqual(0);
    }
  });

  it('octaedro 2025 ord. 2: ABCD a media diagonal y S paralela a R por el centro', () => {
    const e = byId('pau-2025-ord-2-octaedro');
    const solid = SolidsStepSchema.parse(e.initialScene.engines?.solidos).solido;
    const get = (n: string): [number, number, number] => {
      const c = e.initialScene.points[n];
      if (!c) throw new Error(n);
      return c;
    };
    const [H, Q, M, N] = [get('H'), get('Q'), get('M'), get('N')];
    // La cota del centro es el lado dividido por √2 (la diagonal EF es vertical con E en el PH).
    expect(M[2]).toBeCloseTo(solid.arista / Math.SQRT2, 0);
    expect(H[2]).toBe(0);
    // R forma 30° con el PH y S es paralela a R.
    const dir = (a: number[], b: number[]): [number, number, number] => [
      (b[0] ?? 0) - (a[0] ?? 0),
      (b[1] ?? 0) - (a[1] ?? 0),
      (b[2] ?? 0) - (a[2] ?? 0),
    ];
    const r = dir(H, Q);
    const s = dir(M, N);
    expect(Math.atan2(r[2], Math.hypot(r[0], r[1])) * (180 / Math.PI)).toBeCloseTo(30, 0);
    const [lr, ls] = [Math.hypot(...r), Math.hypot(...s)];
    for (let i = 0; i < 3; i++) expect((s[i] ?? 0) / ls).toBeCloseTo((r[i] ?? 0) / lr, 1);
  });

  it('hexaedro 2026 ext. 2: el plano P es perpendicular al primer bisector y corta al cubo', () => {
    const e = byId('pau-2026-ext-2-hexaedro-seccion');
    const data = SolidsStepSchema.parse(
      e.solucion.find((s) => s.engines?.solidos)?.engines?.solidos,
    );
    const [p1, p2, p3] = (data.seccion?.tresPuntos ?? []).map(([x, a, c]) => createPoint(x, a, c));
    if (!p1 || !p2 || !p3) throw new Error('faltan los puntos del plano');
    const n = createPlane(p1, p2, p3).normal;
    // Perpendicular al primer bisector (a = c): su normal tiene las componentes a y c iguales.
    expect(n.a).toBeCloseTo(n.c, 6);
    const scene = buildScene(data, { quitar: 1, abatir: 1, desarrollo: 0, punto: 1 });
    expect(scene.cut?.section?.polygon.length ?? 0).toBeGreaterThanOrEqual(3);
  });
});
