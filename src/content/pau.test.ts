import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { evaluate, firstProblem } from '../engines/plana/graph.ts';
import { PlaneStepSchema } from '../engines/plana/definition.ts';
import { findTopic } from './catalog.ts';
import { parsePau, rubricScore, solutionLesson } from './pauSchema.ts';
import { LessonSchema } from './schema.ts';

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
      expect(LessonSchema.safeParse(solutionLesson(e)).success, e.id).toBe(true);
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
