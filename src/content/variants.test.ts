import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { SolidsStepSchema } from '../engines/solidos/definition.ts';
import { parseLessons } from './lessons.ts';
import { generateVariant, metodosAnswer, seededRandom, solidosValue } from './variants.ts';

const LESSONS_DIR = join(import.meta.dirname, 'lessons');
const files: Record<string, unknown> = {};
for (const name of readdirSync(LESSONS_DIR).filter((f) => f.endsWith('.json'))) {
  files[name] = JSON.parse(readFileSync(join(LESSONS_DIR, name), 'utf8'));
}
const { lessons } = parseLessons(files);

describe('generador con semilla', () => {
  it('la misma semilla da la misma secuencia', () => {
    const a = seededRandom(7);
    const b = seededRandom(7);
    expect([a(), a(), a()]).toEqual([b(), b(), b()]);
    expect(seededRandom(8)()).not.toBe(seededRandom(7)());
  });
});

describe('variantes de ejercicios de medida', () => {
  const withVariant = lessons.flatMap((lesson) =>
    lesson.exercises.flatMap((exercise) =>
      exercise.kind === 'value' && exercise.variant ? [{ lesson, exercise }] : [],
    ),
  );

  it('hay ejercicios con variante en métodos y en sólidos', () => {
    expect(withVariant.some(({ exercise }) => exercise.engines?.metodos)).toBe(true);
    expect(withVariant.some(({ exercise }) => exercise.engines?.solidos)).toBe(true);
  });

  it('la respuesta de cada variante la calcula el motor, para muchas semillas', () => {
    for (const { lesson, exercise } of withVariant) {
      for (let seed = 1; seed <= 25; seed++) {
        const variant = generateVariant(lesson, exercise, seed);
        expect(variant, `${lesson.id} semilla ${seed}`).not.toBeNull();
        if (!variant) continue;
        if (variant.engines?.metodos) {
          const result = metodosAnswer(lesson, variant);
          expect(result?.unit).toBe(variant.unit);
          expect(Math.abs((result?.value ?? NaN) - variant.answer)).toBeLessThan(0.06);
        } else {
          const value = solidosValue({ ...variant, magnitud: variant.magnitud ?? 'ladoMayor' });
          expect(Math.abs((value ?? NaN) - variant.answer)).toBeLessThan(0.06);
        }
        expect(variant.answer).toBeGreaterThan(5);
      }
    }
  });

  it('es reproducible, cambia con la semilla y conserva pistas y solución del original', () => {
    const { lesson, exercise } = withVariant[0] ?? {};
    if (!lesson || !exercise) throw new Error('Sin ejercicios con variante');
    const a = generateVariant(lesson, exercise, 3);
    const b = generateVariant(lesson, exercise, 3);
    expect(a).toEqual(b);
    const answers = new Set(
      Array.from({ length: 10 }, (_, i) => generateVariant(lesson, exercise, i + 1)?.answer),
    );
    expect(answers.size).toBeGreaterThan(1);
    expect(a?.solution).toEqual(exercise.solution);
    expect(a?.hints).toEqual(exercise.hints);
  });

  it('en sólidos la variante pide al menos tres magnitudes distintas, con su enunciado', () => {
    const found = withVariant.find(({ exercise }) => exercise.variant?.ask);
    if (!found) throw new Error('Sin ejercicio de sólidos con ask');
    const asked = new Map<string, string>();
    for (let seed = 1; seed <= 25; seed++) {
      const variant = generateVariant(found.lesson, found.exercise, seed);
      if (variant?.magnitud) asked.set(variant.magnitud, variant.prompt);
    }
    expect([...asked.keys()].sort()).toEqual(['ladoMayor', 'ladoMenor', 'perimetro']);
    expect(new Set(asked.values()).size).toBe(3);
  });

  it('los pasos de la solución de una variante llevan los datos del sólido de la variante', () => {
    const found = withVariant.find(({ exercise }) => exercise.variant?.ask);
    if (!found) throw new Error('Sin ejercicio de sólidos con ask');
    const variant = generateVariant(found.lesson, found.exercise, 4);
    const own = SolidsStepSchema.parse(variant?.engines?.solidos);
    for (const step of variant?.solution ?? []) {
      const inStep = SolidsStepSchema.parse(step.engines?.solidos);
      expect(inStep.solido).toEqual(own.solido);
      expect(inStep.seccion?.puntos).toEqual(own.seccion?.puntos);
    }
  });

  it('un ejercicio sin variante no genera nada', () => {
    const lesson = lessons[0];
    const exercise = lesson?.exercises[0];
    if (!lesson || !exercise) throw new Error('Sin ejercicios');
    expect(generateVariant(lesson, exercise, 1)).toBeNull();
  });
});

describe('pistas y soluciones', () => {
  it('las pistas son 3 (o ninguna) y las soluciones cumplen el formato de los pasos', () => {
    let withSolution = 0;
    for (const lesson of lessons) {
      for (const exercise of lesson.exercises) {
        expect([0, 3]).toContain((exercise.hints ?? []).length);
        if (exercise.solution) withSolution++;
      }
    }
    expect(withSolution).toBeGreaterThan(0);
  });

  /** Lección con el ejercicio 1 de tres-metodos cambiado por `edit`; devuelve los errores del esquema. */
  const problemsAfter = (edit: (exercise: { hints?: string[]; solution: Solution }) => void) => {
    const copy = structuredClone(files['04-tres-metodos.json']) as {
      exercises: { hints?: string[]; solution: Solution }[];
    };
    const first = copy.exercises[0];
    if (first) edit(first);
    return parseLessons({ 'x.json': copy })
      .errors.flatMap((e) => e.problems)
      .join(' | ');
  };
  type Solution = { part: string; narration: string; sheet: string[]; engines?: object }[];

  it('el esquema rechaza pistas que no son tres y narraciones de más de dos frases', () => {
    expect(problemsAfter((e) => (e.hints = ['a', 'b', 'c', 'd']))).not.toBe('');
    expect(problemsAfter((e) => (e.hints = ['a', 'b']))).not.toBe('');
    const long = problemsAfter((e) => {
      const step = e.solution[0];
      if (step) step.narration = 'Una. Dos. Tres.';
    });
    expect(long).toContain('2 frases');
  });

  it('el esquema exige el campo de parte, su orden y el número de pasos de cada una', () => {
    expect(
      problemsAfter((e) => e.solution.forEach((s) => Reflect.deleteProperty(s, 'part'))),
    ).not.toBe('');
    const order = problemsAfter((e) => {
      const [first, second] = e.solution;
      if (first && second) [first.part, second.part] = [second.part, first.part];
    });
    expect(order).toContain('debe ir antes');
    const missing = problemsAfter(
      (e) => (e.solution = e.solution.filter((s) => s.part !== 'idea')),
    );
    expect(missing).toContain('«2. La idea clave» lleva 1 paso(s) y tiene 0');
    const extra = problemsAfter((e) => {
      const error = e.solution.find((s) => s.part === 'error');
      if (error) e.solution.push(structuredClone(error));
    });
    expect(extra).toContain('«6. Error típico» lleva 1 paso(s) y tiene 2');
  });

  it('la capa «error» y los datos del error van juntos y solo en el paso de error', () => {
    const noData = problemsAfter((e) => {
      const mira = e.solution.find((s) => s.part === 'mira');
      mira?.sheet.push('error');
    });
    expect(noData).toContain('engines.error');
    const wrongPart = problemsAfter((e) => {
      const mira = e.solution.find((s) => s.part === 'mira');
      if (!mira) return;
      mira.sheet.push('error');
      mira.engines = {
        error: {
          trazos: [
            {
              puntos: [
                [0, 0],
                [10, 10],
              ],
            },
          ],
        },
      };
    });
    expect(wrongPart).toContain('solo va en el paso de «error»');
  });
});
