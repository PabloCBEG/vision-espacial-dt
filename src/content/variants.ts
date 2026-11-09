// Variantes de un ejercicio de medida: mismos conceptos, datos al azar dentro de unos rangos,
// y la respuesta calculada por el propio motor (nunca escrita a mano).
// Sin DOM: se prueba con Vitest. La semilla hace que una variante se pueda repetir.
import { createLine, createPlane, createPoint, type Point } from '../geometry/index.ts';
import { buildConstruction, exactValue } from '../engines/metodos/construction.ts';
import { MethodsStepSchema } from '../engines/metodos/definition.ts';
import { buildScene } from '../engines/solidos/construction.ts';
import { SolidsStepSchema } from '../engines/solidos/definition.ts';
import type { Exercise, Lesson } from './schema.ts';

type ValueExercise = Extract<Exercise, { kind: 'value' }>;

/** Generador pseudoaleatorio con semilla (mulberry32). */
export function seededRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Número al azar del intervalo, redondeado al paso (números "redondos" en la lámina). */
function pick(random: () => number, [min, max]: readonly [number, number], step: number): number {
  const low = Math.ceil(min / step);
  const high = Math.floor(max / step);
  if (high < low) return Math.round(min);
  return (low + Math.floor(random() * (high - low + 1))) * step;
}

/** Respuesta de un ejercicio de medida de métodos, calculada con su construcción. */
export function metodosAnswer(
  lesson: Lesson,
  exercise: ValueExercise,
): { value: number; unit: 'mm' | '°' } | null {
  const data = exercise.engines?.metodos;
  if (!data) return null;
  const parsed = MethodsStepSchema.parse(data);
  const coords = { ...lesson.initialScene.points, ...exercise.points };
  const point = (n: string): Point | null => {
    const c = coords[n];
    return c ? createPoint(c[0], c[1], c[2]) : null;
  };
  const objects = lesson.initialScene.objects;
  const k = buildConstruction(parsed, {
    point,
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
  return k ? exactValue(k) : null;
}

/** Lados de la sección en verdadera magnitud (o su eje mayor si es curva), de un ejercicio de sólidos. */
export function solidosSection(
  exercise: ValueExercise,
): { sides: number[]; curved: boolean } | null {
  const data = exercise.engines?.solidos;
  if (!data) return null;
  const parsed = SolidsStepSchema.parse(data);
  const scene = buildScene(parsed, { quitar: 1, abatir: 1, desarrollo: 0, punto: 1 });
  const poly = scene.cut?.folded ?? [];
  if (poly.length < 3) return null;
  const sides = poly.map((p, i) => {
    const q = poly[(i + 1) % poly.length] ?? p;
    return Math.hypot(p.x - q.x, p.a - q.a, p.c - q.c);
  });
  const curved = parsed.solido.tipo === 'cono' || parsed.solido.tipo === 'cilindro';
  let diameter = 0;
  for (const p of poly) {
    for (const q of poly)
      diameter = Math.max(diameter, Math.hypot(p.x - q.x, p.a - q.a, p.c - q.c));
  }
  return { sides: curved ? [diameter] : sides, curved };
}

/** Un decimal, como las respuestas escritas a mano en las lecciones. */
const round1 = (n: number): number => Math.round(n * 10) / 10;

/** Una sección demasiado pequeña no se puede medir en la lámina. */
const MIN_MEASURE_MM = 8;
/** Intentos de encontrar datos válidos antes de rendirse. */
const MAX_TRIES = 40;

/**
 * Genera una variante del ejercicio con la semilla dada, o null si el ejercicio no
 * tiene `variant` o no se encuentran datos válidos. La variante no lleva solución
 * desarrollada (la del original es para otros datos).
 */
export function generateVariant(
  lesson: Lesson,
  exercise: Exercise,
  seed: number,
): ValueExercise | null {
  if (exercise.kind !== 'value' || !exercise.variant) return null;
  const { variant } = exercise;
  const random = seededRandom(seed);

  for (let attempt = 0; attempt < MAX_TRIES; attempt++) {
    const candidate: ValueExercise = {
      ...exercise,
      solution: undefined,
      hints: exercise.hints,
      prompt: variant.prompt ?? exercise.prompt,
    };

    if (exercise.engines?.metodos && variant.points) {
      const points: Record<string, [number, number, number]> = { ...exercise.points };
      for (const [id, [rx, ra, rc]] of Object.entries(variant.points)) {
        points[id] = [
          pick(random, rx, variant.step),
          pick(random, ra, variant.step),
          pick(random, rc, variant.step),
        ];
      }
      const next: ValueExercise = { ...candidate, points };
      const result = metodosAnswer(lesson, next);
      if (!result || result.value < (result.unit === 'mm' ? MIN_MEASURE_MM : 5)) continue;
      return { ...next, answer: round1(result.value), unit: result.unit };
    }

    if (exercise.engines?.solidos && variant.solid) {
      const base = SolidsStepSchema.parse(exercise.engines.solidos);
      const { radio, altura, corte } = variant.solid;
      const solid = {
        ...base.solido,
        radio: radio ? pick(random, radio, variant.step) : base.solido.radio,
        altura: altura ? pick(random, altura, variant.step) : base.solido.altura,
      };
      const cut = base.seccion;
      if (cut && corte) {
        cut.puntos = [
          [pick(random, corte[0][0], variant.step), pick(random, corte[0][1], variant.step)],
          [pick(random, corte[1][0], variant.step), pick(random, corte[1][1], variant.step)],
        ];
      }
      const solidos = { ...base, solido: solid, seccion: cut };
      const next: ValueExercise = {
        ...candidate,
        engines: { ...exercise.engines, solidos },
      };
      const section = solidosSection(next);
      if (!section) continue;
      const answer = Math.max(...section.sides);
      if (answer < MIN_MEASURE_MM) continue;
      return { ...next, answer: round1(answer), unit: 'mm' };
    }
    return null;
  }
  return null;
}
