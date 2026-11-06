// Formato de las lecciones. Una lección nueva es un fichero JSON en src/content/lessons/
// que cumple este esquema; no hace falta programar.
import { z } from 'zod';

/** Coordenadas de un punto: [x, alejamiento, cota], en mm, entre −60 y 60. */
const Coords = z.tuple([
  z.number().min(-60).max(60),
  z.number().min(-60).max(60),
  z.number().min(-60).max(60),
]);

const PointName = z
  .string()
  .regex(/^[A-Z][0-9]?$/, 'Un punto se llama con una mayúscula: P, A, B1…');

const SceneObjectSchema = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('point'), id: PointName }),
  z.object({
    kind: z.literal('line'),
    id: z.string().min(1),
    through: z.tuple([PointName, PointName]),
  }),
  z.object({
    kind: z.literal('plane'),
    id: z.string().min(1),
    through: z.tuple([PointName, PointName, PointName]),
  }),
]);

/**
 * Capas que se pueden mostrar o destacar:
 * - 3D: "planos", "cuadrantes", "punto:P", "proyecciones:P", "proyectantes:P", "medidas:P",
 *   "recta:r", "trazas:r", "plano:α", "perfil".
 * - Lámina: "lt", "proyecciones:P", "referencia:P", "medidas:P", "recta:r", "trazas:r",
 *   "plano:α", "perfil".
 */
const Layer = z
  .string()
  .regex(
    /^(planos|cuadrantes|lt|perfil|(punto|proyecciones|proyectantes|medidas|referencia|recta|trazas|plano):[A-Za-zα-ω0-9]+)$/,
    'Capa desconocida',
  );

const ViewSchema = z.enum(['perspective', 'front', 'top', 'profile']);

/** Una narración tiene como máximo dos frases. */
const Narration = z
  .string()
  .min(1)
  .max(240)
  .refine((text) => countSentences(text) <= 2, 'La narración tiene como máximo 2 frases');

export function countSentences(text: string): number {
  return text.split(/[.!?…]+(?:\s|$)/).filter((s) => s.trim().length > 0).length;
}

const StepSchema = z.object({
  /** Lo que se lee en el paso (máximo 2 frases). */
  narration: Narration,
  /** Capas visibles en el 3D. */
  show3d: z.array(Layer),
  /** Capas visibles en la lámina (vacío: lámina sin dibujo). */
  sheet: z.array(Layer),
  /** Capas que se destacan. */
  highlight: z.array(Layer).default([]),
  camera: ViewSchema,
  /** Ángulo de abatimiento del PH: 0° en el espacio, 90° en la lámina. */
  foldAngle: z.number().min(0).max(90),
  /** Puntos que se mueven en este paso (se animan desde su posición anterior). */
  points: z.record(PointName, Coords).optional(),
});

/** Ejercicio: la lámina muestra las proyecciones; el alumno coloca el punto en el espacio. */
const PlacePointExercise = z.object({
  kind: z.literal('placePoint'),
  prompt: Narration,
  point: PointName,
  target: Coords,
  /** Dónde empiezan los puntos en este ejercicio (si no, donde están en la escena inicial). */
  points: z.record(PointName, Coords).optional(),
});

/** Ejercicio: mover los puntos de una recta o de un plano hasta cumplir una condición. */
const ConditionExercise = z.object({
  kind: z.literal('condition'),
  prompt: Narration,
  condition: z.enum([
    'lineParallelToPH',
    'lineParallelToPV',
    'lineParallelToLT',
    'lineProfile',
    'lineCrossesLT',
    'pointOnPlane',
    'planeContainsLT',
    'planeParallelToLT',
  ]),
  /** Objetos que intervienen: la recta, o el punto y el plano. */
  objects: z.array(z.string()).min(1),
  /** Dónde empiezan los puntos en este ejercicio (si no, donde están en la escena inicial). */
  points: z.record(PointName, Coords).optional(),
  /** Punto que manejan los deslizadores al empezar. */
  activePoint: PointName.optional(),
  /** Capas visibles en el ejercicio (si no, las del último paso, sin el perfil). */
  show3d: z.array(Layer).optional(),
  sheet: z.array(Layer).optional(),
});

const ExerciseSchema = z.discriminatedUnion('kind', [PlacePointExercise, ConditionExercise]);

export const LessonSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, 'El id va en minúsculas, sin espacios: "el-punto"'),
  /** Orden en la pantalla de inicio. */
  order: z.number().int().min(1),
  title: z.string().min(1),
  course: z.enum(['DT I', 'DT II']),
  /** Saber básico del currículo LOMLOE al que corresponde. */
  saberBasico: z.string().min(1),
  level: z.enum(['Inicial', 'Intermedio', 'Avanzado']),
  initialScene: z.object({
    points: z.record(PointName, Coords),
    objects: z.array(SceneObjectSchema).min(1),
    activePoint: PointName,
  }),
  steps: z.array(StepSchema).min(1),
  exercises: z.array(ExerciseSchema).default([]),
});

export type Lesson = z.infer<typeof LessonSchema>;
export type Step = Lesson['steps'][number];
export type Exercise = Lesson['exercises'][number];
export type ViewName = z.infer<typeof ViewSchema>;
