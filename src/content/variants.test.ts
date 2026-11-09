import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { parseLessons } from './lessons.ts';
import { generateVariant, metodosAnswer, seededRandom, solidosSection } from './variants.ts';

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
          const section = solidosSection(variant);
          expect(Math.abs(Math.max(...(section?.sides ?? [NaN])) - variant.answer)).toBeLessThan(
            0.06,
          );
        }
        expect(variant.answer).toBeGreaterThan(5);
      }
    }
  });

  it('es reproducible, cambia con la semilla y no arrastra la solución del original', () => {
    const { lesson, exercise } = withVariant[0] ?? {};
    if (!lesson || !exercise) throw new Error('Sin ejercicios con variante');
    const a = generateVariant(lesson, exercise, 3);
    const b = generateVariant(lesson, exercise, 3);
    expect(a).toEqual(b);
    const answers = new Set(
      Array.from({ length: 10 }, (_, i) => generateVariant(lesson, exercise, i + 1)?.answer),
    );
    expect(answers.size).toBeGreaterThan(1);
    expect(a?.solution).toBeUndefined();
  });

  it('un ejercicio sin variante no genera nada', () => {
    const lesson = lessons[0];
    const exercise = lesson?.exercises[0];
    if (!lesson || !exercise) throw new Error('Sin ejercicios');
    expect(generateVariant(lesson, exercise, 1)).toBeNull();
  });
});

describe('pistas y soluciones', () => {
  it('las pistas son 3 como máximo y las soluciones cumplen el formato de los pasos', () => {
    let withSolution = 0;
    for (const lesson of lessons) {
      for (const exercise of lesson.exercises) {
        expect((exercise.hints ?? []).length).toBeLessThanOrEqual(3);
        if (exercise.solution) withSolution++;
      }
    }
    expect(withSolution).toBeGreaterThan(0);
  });

  it('el esquema rechaza más de tres pistas y narraciones de más de dos frases en la solución', () => {
    const original = files['04-tres-metodos.json'];
    const tooManyHints = structuredClone(original) as { exercises: { hints?: string[] }[] };
    const first = tooManyHints.exercises[0];
    if (first) first.hints = ['a', 'b', 'c', 'd'];
    expect(parseLessons({ 'x.json': tooManyHints }).errors).toHaveLength(1);

    const longNarration = structuredClone(original) as {
      exercises: { solution: { narration: string }[] }[];
    };
    const step = longNarration.exercises[0]?.solution[0];
    if (step) step.narration = 'Una. Dos. Tres.';
    expect(parseLessons({ 'x.json': longNarration }).errors).toHaveLength(1);
  });
});
