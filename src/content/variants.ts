// Variantes de un ejercicio de medida: mismos conceptos, datos al azar dentro de unos rangos,
// y la respuesta calculada por el propio motor (nunca escrita a mano).
// Sin DOM: se prueba con Vitest. La semilla hace que una variante se pueda repetir.
import { createLine, createPlane, createPoint, type Point } from '../geometry/index.ts';
import { buildConstruction, exactValue } from '../engines/metodos/construction.ts';
import { MethodsStepSchema } from '../engines/metodos/definition.ts';
import { buildScene } from '../engines/solidos/construction.ts';
import { SolidsStepSchema } from '../engines/solidos/definition.ts';
import {
  SECTION_MAGNITUDES,
  type Exercise,
  type Lesson,
  type SectionMagnitude,
  type SolidMagnitude,
  type SolutionStep,
} from './schema.ts';

export type { SectionMagnitude, SolidMagnitude };

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

/** Medidas de la sección de un sólido en verdadera magnitud. */
export interface SectionMeasures {
  ladoMayor: number;
  ladoMenor: number;
  perimetro: number;
  numLados: number;
  /** Todos los lados, en el orden de la sección (el eje mayor, si es curva). */
  lados: number[];
  /** Cono y cilindro: la sección es curva y solo se mide su eje mayor (en `ladoMayor`). */
  curved: boolean;
}

export function solidosMeasures(exercise: ValueExercise): SectionMeasures | null {
  const section = solidosSection(exercise);
  if (!section) return null;
  const { sides, curved } = section;
  return {
    ladoMayor: Math.max(...sides),
    ladoMenor: Math.min(...sides),
    perimetro: sides.reduce((sum, side) => sum + side, 0),
    numLados: curved ? 0 : sides.length,
    lados: sides,
    curved,
  };
}

/** Escena del motor de sólidos de un ejercicio, con todo construido (sección, punto y recta). */
export function solidosScene(exercise: ValueExercise): ReturnType<typeof buildScene> | null {
  const data = exercise.engines?.solidos;
  if (!data) return null;
  return buildScene(SolidsStepSchema.parse(data), {
    quitar: 1,
    abatir: 1,
    desarrollo: 0,
    punto: 1,
  });
}

/**
 * Respuesta de un ejercicio de sólidos que declara su `magnitud`, calculada por el motor:
 * medidas de la sección, alejamiento o cota del punto de la superficie, o cuerda de la recta.
 */
export function solidosValue(exercise: ValueExercise): number | null {
  const magnitud: SolidMagnitude | undefined = exercise.magnitud;
  if (!magnitud) return null;
  if (magnitud === 'alejamientoPunto' || magnitud === 'cotaPunto') {
    const p = solidosScene(exercise)?.point?.p;
    return p ? (magnitud === 'cotaPunto' ? p.c : p.a) : null;
  }
  if (magnitud === 'cuerda') {
    const hits = solidosScene(exercise)?.line?.hits;
    return hits
      ? Math.hypot(hits[0].x - hits[1].x, hits[0].a - hits[1].a, hits[0].c - hits[1].c)
      : null;
  }
  if (!(SECTION_MAGNITUDES as readonly string[]).includes(magnitud)) return null;
  return solidosMeasures(exercise)?.[magnitud as SectionMagnitude] ?? null;
}

/** Lo que pregunta el enunciado de una variante, según la magnitud pedida. */
const QUESTION: Record<SectionMagnitude, string> = {
  ladoMayor: '¿Cuánto mide el lado más largo de la sección en verdadera magnitud?',
  ladoMenor: '¿Cuánto mide el lado más corto de la sección en verdadera magnitud?',
  perimetro: '¿Cuánto mide el perímetro de la sección en verdadera magnitud?',
};
const QUESTION_CURVED = '¿Cuánto mide el eje mayor de la sección en verdadera magnitud?';

/**
 * Los pasos de la solución llevan los datos del sólido del ejercicio original; en una variante
 * se sustituyen por los suyos (el resto del paso, como lo que se retira o se abate, se queda).
 */
function retargetSolution(
  solution: readonly SolutionStep[] | undefined,
  solidos: ReturnType<typeof SolidsStepSchema.parse>,
): SolutionStep[] | undefined {
  return solution?.map((step) => {
    if (!step.engines?.solidos) return step;
    const own = SolidsStepSchema.parse(step.engines.solidos);
    const next = { ...own, solido: solidos.solido, recta: solidos.recta, punto: solidos.punto };
    if (own.seccion && solidos.seccion) {
      next.seccion = {
        ...solidos.seccion,
        quitar: own.seccion.quitar,
        abatir: own.seccion.abatir,
        sobre: own.seccion.sobre ?? solidos.seccion.sobre,
      };
    }
    return { ...step, engines: { ...step.engines, solidos: next } };
  });
}

/** Un decimal, como las respuestas escritas a mano en las lecciones. */
const round1 = (n: number): number => Math.round(n * 10) / 10;

/** Una sección demasiado pequeña no se puede medir en la lámina. */
const MIN_MEASURE_MM = 8;
/** Intentos de encontrar datos válidos antes de rendirse. */
const MAX_TRIES = 40;

/**
 * Genera una variante del ejercicio con la semilla dada, o null si el ejercicio no
 * tiene `variant` o no se encuentran datos válidos. La variante conserva las pistas y la
 * solución del original: como no llevan cifras escritas a mano sino marcadores (ver
 * markers.ts), valen para los datos nuevos. En sólidos puede pedir varias magnitudes (`ask`).
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
      const curved = solid.tipo === 'cono' || solid.tipo === 'cilindro';
      const ask = variant.ask ?? ['ladoMayor'];
      // En las secciones curvas solo se pide el eje mayor.
      const asked: SectionMagnitude = curved
        ? 'ladoMayor'
        : (ask[Math.floor(random() * ask.length)] ?? 'ladoMayor');
      const next: ValueExercise = {
        ...candidate,
        engines: { ...exercise.engines, solidos },
        solution: retargetSolution(exercise.solution, solidos),
        magnitud: variant.ask ? asked : exercise.magnitud,
        prompt: variant.ask ? (curved ? QUESTION_CURVED : QUESTION[asked]) : candidate.prompt,
      };
      const measures = solidosMeasures(next);
      if (!measures) continue;
      const answer = measures[asked];
      if (answer < MIN_MEASURE_MM) continue;
      return { ...next, answer: round1(answer), unit: 'mm' };
    }
    return null;
  }
  return null;
}
