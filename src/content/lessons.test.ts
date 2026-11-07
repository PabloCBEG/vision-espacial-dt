import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { parseLessons } from './lessons.ts';
import { countSentences } from './schema.ts';

const LESSONS_DIR = join(import.meta.dirname, 'lessons');

function readAll(): Record<string, unknown> {
  const files: Record<string, unknown> = {};
  for (const name of readdirSync(LESSONS_DIR).filter((f) => f.endsWith('.json'))) {
    files[name] = JSON.parse(readFileSync(join(LESSONS_DIR, name), 'utf8'));
  }
  return files;
}

describe('lecciones', () => {
  it('todas las lecciones cumplen el esquema', () => {
    const { lessons, errors } = parseLessons(readAll());
    expect(errors).toEqual([]);
    expect(lessons.length).toBeGreaterThan(0);
  });

  it('la lección 1 tiene entre 6 y 8 pasos y 3 ejercicios', () => {
    const { lessons } = parseLessons(readAll());
    const first = lessons.find((l) => l.id === 'el-punto');
    expect(first?.steps.length).toBeGreaterThanOrEqual(6);
    expect(first?.steps.length).toBeLessThanOrEqual(8);
    expect(first?.exercises).toHaveLength(3);
  });

  it('las capas citadas son de puntos que existen en la lección', () => {
    const { lessons } = parseLessons(readAll());
    for (const lesson of lessons) {
      const names = new Set([
        ...Object.keys(lesson.initialScene.points),
        ...lesson.initialScene.objects.map((o) => o.id),
      ]);
      for (const step of lesson.steps) {
        for (const tag of [...step.show3d, ...step.sheet, ...step.highlight]) {
          const id = tag.split(':')[1];
          if (id) expect(names, `${lesson.id}: ${tag}`).toContain(id);
        }
      }
    }
  });

  it('rechaza una narración de más de dos frases', () => {
    const { errors } = parseLessons({
      'mala.json': {
        id: 'mala',
        order: 9,
        title: 'Mala',
        topic: 'I-08',
        stage: 'DT I',
        saberBasico: 'x',
        level: 'Inicial',
        initialScene: {
          points: { P: [0, 0, 0] },
          objects: [{ kind: 'point', id: 'P' }],
          activePoint: 'P',
        },
        steps: [
          {
            narration: 'Una. Dos. Tres.',
            show3d: [],
            sheet: [],
            camera: 'front',
            foldAngle: 0,
          },
        ],
      },
    });
    expect(errors).toHaveLength(1);
    expect(errors[0]?.problems.join(' ')).toContain('2 frases');
  });

  it('rechaza coordenadas fuera de ±60 mm y capas desconocidas', () => {
    const { errors } = parseLessons({
      'mala.json': {
        id: 'mala',
        order: 9,
        title: 'Mala',
        topic: 'I-08',
        stage: 'DT I',
        saberBasico: 'x',
        level: 'Inicial',
        initialScene: {
          points: { P: [0, 90, 0] },
          objects: [{ kind: 'point', id: 'P' }],
          activePoint: 'P',
        },
        steps: [
          { narration: 'Bien.', show3d: ['inventada'], sheet: [], camera: 'front', foldAngle: 0 },
        ],
      },
    });
    expect(errors[0]?.problems.length).toBeGreaterThanOrEqual(2);
  });

  it('cuenta frases', () => {
    expect(countSentences('Una frase.')).toBe(1);
    expect(countSentences('Una. Otra: con dos puntos.')).toBe(2);
    expect(countSentences('P′ está a 45° de la LT, ¿no?')).toBe(1);
  });
});

describe('ejercicios de medida con el motor de métodos', () => {
  it('la respuesta escrita coincide con la geometría', async () => {
    const { buildConstruction, exactValue } = await import('../engines/metodos/construction.ts');
    const { MethodsStepSchema } = await import('../engines/metodos/definition.ts');
    const { lessons } = parseLessons(readAll());
    let checked = 0;
    for (const lesson of lessons) {
      for (const exercise of lesson.exercises) {
        if (exercise.kind !== 'value' || !exercise.engines?.metodos) continue;
        const coords = { ...lesson.initialScene.points, ...exercise.points };
        const data = MethodsStepSchema.parse(exercise.engines.metodos);
        const k = buildConstruction(data, {
          point: (n) => {
            const c = coords[n];
            return c ? { x: c[0], a: c[1], c: c[2] } : null;
          },
          line: () => null,
          plane: () => null,
        });
        const value = k ? exactValue(k) : null;
        expect(value?.unit, lesson.id).toBe(exercise.unit);
        expect(Math.abs((value?.value ?? NaN) - exercise.answer), lesson.id).toBeLessThan(0.1);
        checked++;
      }
    }
    expect(checked).toBeGreaterThan(0);
  });
});
