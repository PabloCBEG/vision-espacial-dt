// Estado de una solución desarrollada, sin DOM: lo usan el reproductor y los tests.
import { createPoint, type Point } from '../geometry/index.ts';
import type { Exercise, Lesson } from './schema.ts';

type EngineData = Readonly<Record<string, unknown>> | undefined;

/** Datos de cada motor: los comunes de la lección con los del paso encima (campo a campo). */
export function mergeEngines(common: EngineData, step: EngineData): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const key of new Set([...Object.keys(common ?? {}), ...Object.keys(step ?? {})])) {
    const a = common?.[key];
    const b = step?.[key];
    out[key] = a && b && typeof a === 'object' && typeof b === 'object' ? { ...a, ...b } : (b ?? a);
  }
  return out;
}

export const toPoint = ([x, a, c]: readonly [number, number, number]): Point =>
  createPoint(x, a, c);

/**
 * Puntos tal como se ven en el paso `index` de la solución (−1: el ejercicio sin resolver):
 * los de la escena inicial, con los del ejercicio y los cambios de los pasos hasta ese.
 */
export function solutionPoints(
  lesson: Lesson,
  exercise: Exercise,
  index: number,
): Record<string, Point> {
  const points: Record<string, Point> = {};
  for (const [id, c] of Object.entries(lesson.initialScene.points)) points[id] = toPoint(c);
  if ('points' in exercise) {
    for (const [id, c] of Object.entries(exercise.points ?? {})) points[id] = toPoint(c);
  }
  for (const step of (exercise.solution ?? []).slice(0, index + 1)) {
    for (const [id, c] of Object.entries(step.points ?? {})) points[id] = toPoint(c);
  }
  return points;
}

/** Datos de motores en el paso `index` de la solución: escena, ejercicio y paso, en ese orden. */
export function solutionEngines(
  lesson: Lesson,
  exercise: Exercise,
  index: number,
): Record<string, unknown> {
  const step = exercise.solution?.[index];
  return mergeEngines(mergeEngines(lesson.initialScene.engines, exercise.engines), step?.engines);
}
