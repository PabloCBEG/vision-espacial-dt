// Formato de las lecciones. Una lección nueva es un fichero JSON en src/content/lessons/
// que cumple este esquema; no hace falta programar.
import { z } from 'zod';
import { ENGINE_DEFINITIONS } from '../engines/definitions.ts';
import { TOPIC_CODES } from './catalog.ts';
import { SOLUTION_LENGTH_RANGE, SOLUTION_PARTS, solutionPartProblems } from './solutionParts.ts';

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
 * Capas que se pueden mostrar o destacar. Las del diédrico básico:
 * - 3D: "planos", "cuadrantes", "punto:P", "proyecciones:P", "proyectantes:P", "medidas:P",
 *   "recta:r", "trazas:r", "plano:α", "perfil".
 * - Lámina: "lt", "proyecciones:P", "referencia:P", "medidas:P", "recta:r", "trazas:r",
 *   "plano:α", "perfil".
 * Cada motor añade las suyas (ver src/engines/definitions.ts).
 */
const layerNames = ENGINE_DEFINITIONS.flatMap((e) => e.layerNames);
const layerPrefixes = ENGINE_DEFINITIONS.flatMap((e) => e.layerPrefixes);
export const LAYER_PATTERN = new RegExp(
  `^(${layerNames.join('|')}|(${layerPrefixes.join('|')}):[A-Za-zα-ω0-9]+)$`,
);
export const Layer = z.string().regex(LAYER_PATTERN, 'Capa desconocida');

/**
 * Datos propios de cada motor en un paso o ejercicio:
 * "engines": { "metodos": {…}, "solidos": {…} }. Cada motor valida los suyos.
 */
export const EngineData = z
  .object(
    Object.fromEntries(
      ENGINE_DEFINITIONS.flatMap((e) => (e.stepSchema ? [[e.id, e.stepSchema.optional()]] : [])),
    ) as Record<string, z.ZodOptional<z.ZodType>>,
  )
  .strict()
  .optional();

export const ViewSchema = z.enum(['perspective', 'front', 'top', 'profile', 'isometric']);

/** Una narración tiene como máximo dos frases. */
const Narration = z
  .string()
  .min(1)
  .max(240)
  .refine((text) => countSentences(text) <= 2, 'La narración tiene como máximo 2 frases');

export function countSentences(text: string): number {
  return text.split(/[.!?…]+(?:\s|$)/).filter((s) => s.trim().length > 0).length;
}

export const StepSchema = z.object({
  /** Datos de los motores (métodos, sólidos…) en este paso. */
  engines: EngineData,
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

/** Dificultad de un ejercicio, de 1 (fácil) a 3 (tipo PAU). */
const Difficulty = z.number().int().min(1).max(3).default(1);

/**
 * Paso de una solución desarrollada: un paso normal con la parte de la solución a la que
 * pertenece (ver src/content/solutionParts.ts). Si lleva la capa «error» en la lámina, debe
 * traer los datos del trazado erróneo en `engines.error`, y al revés.
 */
export const SolutionStepSchema = StepSchema.extend({
  part: z.enum(SOLUTION_PARTS),
}).superRefine((step, ctx) => {
  const drawsError = step.sheet.includes('error');
  const hasError = step.engines?.error !== undefined;
  if (drawsError !== hasError) {
    ctx.addIssue({
      code: 'custom',
      message: 'La capa «error» de la lámina y los datos de engines.error van juntos',
    });
  }
  if (hasError && step.part !== 'error') {
    ctx.addIssue({ code: 'custom', message: 'El trazado erróneo solo va en el paso de «error»' });
  }
});

/** Las seis partes, en orden y con el número de pasos de cada una. */
const SolutionSchema = z
  .array(SolutionStepSchema)
  .min(SOLUTION_LENGTH_RANGE[0])
  .max(SOLUTION_LENGTH_RANGE[1])
  .superRefine((steps, ctx) => {
    for (const message of solutionPartProblems(steps.map((s) => s.part))) {
      ctx.addIssue({ code: 'custom', message });
    }
  });

/**
 * Ayuda común a todos los ejercicios.
 * - hints: tres pistas escalonadas. 1: la idea clave; 2: el método; 3: el primer trazado.
 * - solution: las seis partes de la solución desarrollada (mismo formato que los pasos de la
 *   teoría, con el campo `part`). Se ofrece tras dos fallos o al rendirse. Puntos y motores
 *   se parten de los del propio ejercicio.
 * Pistas y solución no llevan cifras escritas a mano: usan marcadores como {respuesta}
 * (ver src/content/markers.ts), que rellena el motor del ejercicio.
 */
const ExerciseHelp = {
  hints: z.array(Narration).length(3).optional(),
  solution: SolutionSchema.optional(),
};

/** Ejercicio: la lámina muestra las proyecciones; el alumno coloca el punto en el espacio. */
const PlacePointExercise = z.object({
  kind: z.literal('placePoint'),
  difficulty: Difficulty,
  ...ExerciseHelp,
  engines: EngineData,
  prompt: Narration,
  point: PointName,
  target: Coords,
  /** Dónde empiezan los puntos en este ejercicio (si no, donde están en la escena inicial). */
  points: z.record(PointName, Coords).optional(),
});

/** Ejercicio: mover los puntos de una recta o de un plano hasta cumplir una condición. */
const ConditionExercise = z.object({
  kind: z.literal('condition'),
  difficulty: Difficulty,
  ...ExerciseHelp,
  engines: EngineData,
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

/**
 * Ejercicio: escribir una medida (verdadera magnitud, distancia o ángulo) leída en la lámina.
 * La cuadrícula de la lámina ayuda a medir.
 */
/** Magnitudes de la sección de un sólido que se pueden pedir. */
export const SECTION_MAGNITUDES = ['ladoMayor', 'ladoMenor', 'perimetro'] as const;
export type SectionMagnitude = (typeof SECTION_MAGNITUDES)[number];

/** Intervalo [mínimo, máximo] en mm. */
const Range = z.tuple([z.number(), z.number()]).refine(([a, b]) => a <= b, 'mínimo ≤ máximo');

/**
 * Cómo se generan variantes de un ejercicio de medida (ver src/content/variants.ts).
 * - points (motor de métodos): intervalo de [x, a, c] de cada punto que cambia.
 * - solid (motor de sólidos): intervalos del radio y la altura, y de los dos puntos
 *   (x, a) de la traza del plano de corte.
 * - ask (sólidos): magnitudes de la sección entre las que elige la variante; si falta, el
 *   lado más largo (o el eje mayor, si es curva).
 * - step: los valores se redondean a múltiplos de este paso (mm).
 */
const VariantSchema = z.object({
  step: z.number().positive().default(5),
  points: z.record(PointName, z.tuple([Range, Range, Range])).optional(),
  solid: z
    .object({
      radio: Range.optional(),
      altura: Range.optional(),
      corte: z.tuple([z.tuple([Range, Range]), z.tuple([Range, Range])]).optional(),
    })
    .optional(),
  ask: z.array(z.enum(SECTION_MAGNITUDES)).min(1).optional(),
  /** Enunciado de la variante, si el del ejercicio no sirve con otros datos. */
  prompt: Narration.optional(),
});

const ValueExercise = z.object({
  kind: z.literal('value'),
  difficulty: Difficulty,
  ...ExerciseHelp,
  engines: EngineData,
  prompt: Narration,
  /** Respuesta correcta y su unidad; se acepta con la tolerancia indicada. */
  answer: z.number(),
  /**
   * Qué magnitud de la sección de un sólido es la respuesta (ver SECTION_MAGNITUDES). Si falta,
   * vale cualquier lado de la sección (o su eje mayor, si es curva).
   */
  magnitud: z.enum(SECTION_MAGNITUDES).optional(),
  unit: z.enum(['mm', '°']),
  tolerance: z.number().positive().default(2),
  variant: VariantSchema.optional(),
  points: z.record(PointName, Coords).optional(),
  activePoint: PointName.optional(),
  show3d: z.array(Layer).optional(),
  sheet: z.array(Layer).optional(),
});

/** Ejercicio que corrige el propio motor (por ejemplo, colocar un centro en la lámina). */
const EngineExercise = z.object({
  kind: z.literal('engine'),
  difficulty: Difficulty,
  ...ExerciseHelp,
  engines: EngineData,
  prompt: Narration,
  points: z.record(PointName, Coords).optional(),
  activePoint: PointName.optional(),
  show3d: z.array(Layer).optional(),
  sheet: z.array(Layer).optional(),
});

const ExerciseSchema = z.discriminatedUnion('kind', [
  PlacePointExercise,
  ConditionExercise,
  ValueExercise,
  EngineExercise,
]);

/** Escena inicial: puntos, objetos y datos comunes de los motores. */
export const InitialSceneSchema = z.object({
  points: z.record(PointName, Coords),
  objects: z.array(SceneObjectSchema),
  activePoint: PointName,
  /** Datos de los motores comunes a todos los pasos (por ejemplo, la construcción plana). */
  engines: EngineData,
});

export const LessonSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, 'El id va en minúsculas, sin espacios: "el-punto"'),
  /** Orden en la pantalla de inicio. */
  order: z.number().int().min(1),
  title: z.string().min(1),
  /** Código del tema del catálogo (src/content/catalog.ts): "I-08", "II-05"… */
  topic: z.enum(TOPIC_CODES as [string, ...string[]], 'Código de tema desconocido'),
  stage: z.enum(['ESO', 'DT I', 'DT II']),
  /** Saber básico del currículo LOMLOE al que corresponde. */
  saberBasico: z.string().min(1),
  level: z.enum(['Inicial', 'Intermedio', 'Avanzado']),
  initialScene: InitialSceneSchema,
  steps: z.array(StepSchema).min(1),
  exercises: z.array(ExerciseSchema).default([]),
});

export type Lesson = z.infer<typeof LessonSchema>;
export type Step = Lesson['steps'][number];
export type Exercise = Lesson['exercises'][number];
export type Variant = z.infer<typeof VariantSchema>;
export type SolutionStep = z.infer<typeof SolutionStepSchema>;
export type ViewName = z.infer<typeof ViewSchema>;
