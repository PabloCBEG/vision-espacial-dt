// Formato de un ejercicio PAU: enunciado y datos, lo que se ve durante el examen (solo la
// lámina), la solución paso a paso con el motor que corresponda y la rúbrica oficial
// (2 puntos solución y método, 0,25 precisión y 0,25 presentación).
import { z } from 'zod';
import { TOPIC_CODES } from './catalog.ts';
import {
  EngineData,
  errorLayerIssues,
  Layer,
  StepSchema,
  ViewSchema,
  type Lesson,
  WideInitialSceneSchema,
} from './schema.ts';
import { SOLUTION_PARTS, solutionPartProblems } from './solutionParts.ts';

/**
 * Paso de la solución de un ejercicio PAU. Los ejercicios reales llevan `part` en todos los pasos,
 * con las seis partes del apartado 4 de plan_contenidos.md (los ejemplos de formato, no).
 */
const PauStepSchema = StepSchema.extend({ part: z.enum(SOLUTION_PARTS).optional() }).superRefine(
  (step, ctx) => {
    for (const message of errorLayerIssues(step)) ctx.addIssue({ code: 'custom', message });
  },
);

const Criterion = z.object({ texto: z.string().min(1), puntos: z.number().positive() });

export const PauSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  /** Convocatoria: «2025 Junio», «2024 Julio»… o «Ejemplo» para los de muestra. */
  convocatoria: z.string().min(1),
  /** Ejercicio del examen (1 a 4) y opción (A o B, si la hay). */
  ejercicio: z.number().int().min(1).max(4),
  opcion: z.enum(['A', 'B']).nullable().default(null),
  /** Temas del catálogo relacionados. */
  temas: z.array(z.enum(TOPIC_CODES as [string, ...string[]])).min(1),
  titulo: z.string().min(1),
  enunciado: z.string().min(1).max(800),
  datos: z.array(z.string().min(1)).default([]),
  initialScene: WideInitialSceneSchema,
  /** Lo que se ve durante el examen: solo la lámina, con los datos. */
  examen: z.object({
    sheet: z.array(Layer),
    camera: ViewSchema.default('front'),
    foldAngle: z.number().min(0).max(90).default(90),
    engines: EngineData,
  }),
  /** Solución paso a paso, con la escena 3D de apoyo. */
  solucion: z
    .array(PauStepSchema)
    .min(2)
    .superRefine((steps, ctx) => {
      const parts = steps.map((s) => s.part);
      if (parts.every((p) => p === undefined)) return;
      if (parts.some((p) => p === undefined)) {
        ctx.addIssue({ code: 'custom', message: 'Si un paso lleva `part`, todos la llevan' });
        return;
      }
      for (const message of solutionPartProblems(parts as (typeof SOLUTION_PARTS)[number][])) {
        ctx.addIssue({ code: 'custom', message });
      }
    }),
  rubrica: z
    .object({
      /** Desglose de los 2 puntos de solución y método. */
      criterios: z.array(Criterion).min(1),
      precision: z.number().default(0.25),
      presentacion: z.number().default(0.25),
      /**
       * «oficial»: criterios de corrección publicados. «derivada»: sin criterios oficiales, se
       * reparten los 2 puntos según la puntuación por apartados del enunciado (a revisar).
       */
      origen: z.enum(['oficial', 'derivada']).default('oficial'),
    })
    .refine((r) => Math.abs(r.criterios.reduce((s, c) => s + c.puntos, 0) - 2) < 1e-9, {
      message: 'Los criterios de solución y método suman 2 puntos',
    }),
});

export type PauExercise = z.infer<typeof PauSchema>;

/** Minutos por ejercicio (90 minutos para 4 ejercicios). */
export const EXAM_MINUTES = 22;

export interface PauLoadError {
  file: string;
  problems: string[];
}

export function parsePau(files: Record<string, unknown>): {
  exercises: PauExercise[];
  errors: PauLoadError[];
} {
  const exercises: PauExercise[] = [];
  const errors: PauLoadError[] = [];
  for (const [file, data] of Object.entries(files)) {
    const result = PauSchema.safeParse(data);
    if (result.success) exercises.push(result.data);
    else {
      errors.push({
        file: file.split('/').pop() ?? file,
        problems: result.error.issues.map((i) => `${i.path.join(' › ') || '(raíz)'}: ${i.message}`),
      });
    }
  }
  exercises.sort(
    (a, b) => a.ejercicio - b.ejercicio || a.convocatoria.localeCompare(b.convocatoria),
  );
  return { exercises, errors };
}

export function loadPau(): { exercises: PauExercise[]; errors: PauLoadError[] } {
  const modules = import.meta.glob<{ default: unknown }>('./pau/*.json', { eager: true });
  const files: Record<string, unknown> = {};
  for (const [path, module] of Object.entries(modules)) files[path] = module.default;
  return parsePau(files);
}

/** La solución como lección, para reproducirla con el reproductor de siempre. */
export function solutionLesson(pau: PauExercise): Lesson {
  return {
    id: `pau-${pau.id}`,
    order: 1,
    title: pau.titulo,
    topic: pau.temas[0] ?? 'I-08',
    stage: 'DT II',
    saberBasico: pau.enunciado,
    level: 'Avanzado',
    initialScene: pau.initialScene,
    steps: pau.solucion,
    exercises: [],
  };
}

/**
 * Nota de la autoevaluación: los criterios marcados, y precisión y presentación solo si la
 * solución llega al 70 % de sus 2 puntos.
 */
export function rubricScore(
  pau: PauExercise,
  checked: ReadonlySet<number>,
  precision: boolean,
  presentation: boolean,
): { solution: number; total: number; extrasAllowed: boolean } {
  const solution = pau.rubrica.criterios.reduce(
    (s, c, i) => s + (checked.has(i) ? c.puntos : 0),
    0,
  );
  const extrasAllowed = solution >= 0.7 * 2 - 1e-9;
  const total =
    solution +
    (extrasAllowed && precision ? pau.rubrica.precision : 0) +
    (extrasAllowed && presentation ? pau.rubrica.presentacion : 0);
  return { solution, total, extrasAllowed };
}
