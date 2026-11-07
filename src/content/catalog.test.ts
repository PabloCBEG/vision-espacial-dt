import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { CATALOG, findTopic, topicsByBlock } from './catalog.ts';
import { parseLessons } from './lessons.ts';
import { LAYER_PATTERN } from './schema.ts';

const LESSONS_DIR = join(import.meta.dirname, 'lessons');
const lessons = parseLessons(
  Object.fromEntries(
    readdirSync(LESSONS_DIR)
      .filter((f) => f.endsWith('.json'))
      .map((f) => [f, JSON.parse(readFileSync(join(LESSONS_DIR, f), 'utf8')) as unknown]),
  ),
).lessons;

describe('catálogo del temario', () => {
  it('tiene 30 temas: E-00, 16 de DT I y 13 de DT II, sin códigos repetidos', () => {
    const codes = CATALOG.map((t) => t.code);
    expect(new Set(codes).size).toBe(30);
    expect(codes.filter((c) => c.startsWith('I-'))).toHaveLength(16);
    expect(codes.filter((c) => c.startsWith('II-'))).toHaveLength(13);
    expect(codes).toContain('E-00');
  });

  it('los ejercicios PAU son del 1 al 4', () => {
    for (const t of CATALOG) {
      if (t.pauExercise !== null) expect([1, 2, 3, 4]).toContain(t.pauExercise);
    }
  });

  it('un tema disponible tiene al menos una lección, y uno con lecciones está disponible', () => {
    for (const t of CATALOG) {
      const count = lessons.filter((l) => l.topic === t.code).length + (t.route ? 1 : 0);
      expect(count > 0, `${t.code}: ${count} lecciones, estado ${t.status}`).toBe(
        t.status === 'disponible',
      );
    }
  });

  it('cada lección es de un tema de su misma etapa', () => {
    for (const lesson of lessons) {
      expect(findTopic(lesson.topic)?.stages).toContain(lesson.stage);
    }
  });

  it('agrupa los temas de DT II por bloque, sin el entrenador', () => {
    const groups = topicsByBlock('DT II');
    expect([...groups.keys()]).toEqual(['A', 'B', 'C', 'D']);
    expect(groups.get('A')?.map((t) => t.code)).toEqual(['II-01', 'II-02', 'II-03', 'II-04']);
    expect([...groups.values()].flat().some((t) => t.code === 'E-00')).toBe(false);
  });
});

describe('capas de los motores', () => {
  it('acepta las capas del diédrico y rechaza las desconocidas', () => {
    expect(LAYER_PATTERN.test('proyecciones:P')).toBe(true);
    expect(LAYER_PATTERN.test('planos')).toBe(true);
    expect(LAYER_PATTERN.test('inventada:P')).toBe(false);
  });
});
