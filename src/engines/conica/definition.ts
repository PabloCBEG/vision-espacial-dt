// Motor de perspectiva cónica: datos de cada paso (sin DOM). Reutiliza los sólidos.
//
// Ejemplo:
//   "engines": { "conica": { "solido": { "tipo": "cubo", "arista": 30, "centro": [0, -30] },
//     "observador": { "x": 0, "d": 120, "h": 45 }, "fugas": true } }
import { z } from 'zod';
import { SolidSchema } from '../solidos/definition.ts';
import type { EngineDefinition } from '../types.ts';

export const ConicStepSchema = z.object({
  /** El sólido, apoyado en el geometral y detrás del cuadro (centro con alejamiento negativo). */
  solido: SolidSchema.optional(),
  /** Observador: posición a lo ancho, distancia al cuadro y altura (mm). */
  observador: z
    .object({
      x: z.number().default(0),
      d: z.number().positive().default(120),
      h: z.number().default(45),
    })
    .default({ x: 0, d: 120, h: 45 }),
  /** Rayos visuales del ojo a cada vértice, atravesando el cuadro. */
  rayos: z.boolean().default(true),
  /** Puntos de fuga y las rectas que van a ellos. */
  fugas: z.boolean().default(false),
  /** Puntos métricos (o de distancia en la frontal). */
  metricos: z.boolean().default(false),
  /** Aristas ocultas (en cónica son obligatorias). */
  ocultas: z.boolean().default(true),
  /** Geometral abatido con la planta y la construcción por directrices (0 a 1, se anima). */
  construccion: z.number().min(0).max(1).optional(),
  /** Paralelas sobre el geometral que se alejan (para ver cómo se juntan). */
  paralelas: z
    .object({
      /** Ángulo con la LT, en grados (90: perpendiculares al cuadro). */
      angulo: z.number().default(90),
      cuantas: z.number().int().min(2).max(6).default(3),
      separacion: z.number().positive().default(15),
      largo: z.number().positive().default(400),
    })
    .optional(),
  /** El alumno puede mover al observador y girar el sólido con deslizadores. */
  controles: z.boolean().default(false),
});

export type ConicStep = z.infer<typeof ConicStepSchema>;

export const CONIC_DEFINITION: EngineDefinition = {
  id: 'conica',
  title: 'Perspectiva cónica',
  layerPrefixes: [],
  /**
   * Capas: geometral, cuadro (con LT, horizonte y P), observador, rayos, perspectiva (la
   * imagen), fugas, métricos, construcción (geometral abatido) y paralelas.
   */
  layerNames: [
    'geometral',
    'cuadro',
    'observador',
    'rayos',
    'perspectiva',
    'fugas',
    'metricos',
    'construccion',
    'paralelas',
  ],
  stepSchema: ConicStepSchema,
};
