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
    const { createLine, createPlane, createPoint } = await import('../geometry/index.ts');
    const { MethodsStepSchema } = await import('../engines/metodos/definition.ts');
    const { lessons } = parseLessons(readAll());
    let checked = 0;
    for (const lesson of lessons) {
      for (const exercise of lesson.exercises) {
        if (exercise.kind !== 'value' || !exercise.engines?.metodos) continue;
        const coords = { ...lesson.initialScene.points, ...exercise.points };
        const data = MethodsStepSchema.parse(exercise.engines.metodos);
        const point = (n: string) => {
          const c = coords[n];
          return c ? createPoint(c[0], c[1], c[2]) : null;
        };
        const objects = lesson.initialScene.objects;
        const k = buildConstruction(data, {
          point,
          // Rectas y planos de la escena, por sus puntos (para distancias y ángulos).
          line: (id) => {
            const o = objects.find((x) => x.kind === 'line' && x.id === id);
            if (o?.kind !== 'line') return null;
            const [p, q] = o.through.map(point);
            return p && q ? createLine(p, q) : null;
          },
          plane: (id) => {
            const o = objects.find((x) => x.kind === 'plane' && x.id === id);
            if (o?.kind !== 'plane') return null;
            const [p, q, r] = o.through.map(point);
            return p && q && r ? createPlane(p, q, r) : null;
          },
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

describe('ejercicios de medida con el motor de sólidos', () => {
  it('la respuesta es un lado de la sección en verdadera magnitud (o su eje mayor, si es curva)', async () => {
    const { buildScene } = await import('../engines/solidos/construction.ts');
    const { SolidsStepSchema } = await import('../engines/solidos/definition.ts');
    const { lessons } = parseLessons(readAll());
    let checked = 0;
    for (const lesson of lessons) {
      for (const exercise of lesson.exercises) {
        if (exercise.kind !== 'value' || !exercise.engines?.solidos) continue;
        const data = SolidsStepSchema.parse(exercise.engines.solidos);
        const scene = buildScene(data, { quitar: 1, abatir: 1, desarrollo: 0, punto: 1 });
        const poly = scene.cut?.folded ?? [];
        const sides = poly.map((p, i) => {
          const q = poly[(i + 1) % poly.length] ?? p;
          return Math.hypot(p.x - q.x, p.a - q.a, p.c - q.c);
        });
        // En el cono y el cilindro la sección es una curva: se mide su eje mayor.
        const curved = data.solido.tipo === 'cono' || data.solido.tipo === 'cilindro';
        let diameter = 0;
        for (const p of poly) {
          for (const q of poly)
            diameter = Math.max(diameter, Math.hypot(p.x - q.x, p.a - q.a, p.c - q.c));
        }
        const candidates = curved ? [diameter] : sides;
        const best = Math.min(...candidates.map((s) => Math.abs(s - exercise.answer)));
        expect(best, lesson.id).toBeLessThan(0.1);
        checked++;
      }
    }
    expect(checked).toBeGreaterThan(0);
  });
});

describe('lecciones de geometría plana', () => {
  it('la construcción no tiene problemas y los objetivos de los ejercicios existen', async () => {
    const { evaluate, firstProblem } = await import('../engines/plana/graph.ts');
    const { PlaneStepSchema } = await import('../engines/plana/definition.ts');
    const { lessons } = parseLessons(readAll());
    let checked = 0;
    for (const lesson of lessons) {
      const base = lesson.initialScene.engines?.plana;
      if (!base) continue;
      const data = PlaneStepSchema.parse(base);
      const defs = data.objetos ?? [];
      const all = evaluate(defs);
      expect(firstProblem(all), lesson.id).toBeNull();
      for (const exercise of lesson.exercises) {
        if (exercise.kind !== 'engine') continue;
        const step = PlaneStepSchema.parse(exercise.engines?.plana ?? {});
        const targets = step.respuesta?.objetivo ?? [];
        for (const id of Array.isArray(targets) ? targets : [targets]) {
          expect(all.get(id)?.value?.kind, `${lesson.id}: ${id}`).toBe('point');
        }
        checked++;
      }
      // Los ids citados en visibles, trazar y destacar existen.
      const ids = new Set(defs.map((d) => d.id));
      for (const step of lesson.steps) {
        const s = PlaneStepSchema.parse(step.engines?.plana ?? {});
        for (const id of [...(s.visibles ?? []), ...(s.trazar ?? []), ...(s.destacar ?? [])]) {
          expect(ids.has(id), `${lesson.id}: ${id}`).toBe(true);
        }
      }
    }
    expect(checked).toBeGreaterThan(0);
  });
});
