// Motor de axonometría: datos de cada paso (sin DOM). Reutiliza los sólidos del motor de sólidos.
//
// Ejemplo:
//   "engines": { "axonometria": { "solido": { "tipo": "octaedro", "arista": 30 },
//     "sistema": "isometrica" } }
import { z } from 'zod';
import { SolidSchema } from '../solidos/definition.ts';
import type { EngineDefinition } from '../types.ts';

export const AxonStepSchema = z.object({
  /** El sólido (como en el motor de sólidos). Suele ir en la escena inicial de la lección. */
  solido: SolidSchema.optional(),
  /** Perspectiva isométrica (0,816), dibujo isométrico (sin reducir) o caballera. */
  sistema: z.enum(['isometrica', 'dibujo-isometrico', 'caballera']).default('isometrica'),
  /** Caballera: ángulo del eje Y y coeficiente de reducción (PAU: 0,5). */
  caballera: z
    .object({
      angulo: z.number().min(0).max(360).default(45),
      coeficiente: z.number().gt(0).max(1).default(0.5),
    })
    .default({ angulo: 45, coeficiente: 0.5 }),
  /** Aristas ocultas: solo si el enunciado las pide. */
  ocultas: z.boolean().default(false),
  /** Escala gráfica de reducción isométrica, construida paso a paso (0 a 1, se anima). */
  escala: z.number().min(0).max(1).optional(),
  /** Elipses por puntos: el rombo circunscrito y los puntos de cada circunferencia. */
  elipses: z.boolean().default(false),
  /** De las vistas a la perspectiva: vistas en el triedro, caja y sólido (0 a 1, se anima). */
  desdeVistas: z.number().min(0).max(1).optional(),
  /** Rótulos de los vértices. */
  rotulos: z.boolean().default(false),
});

export type AxonStep = z.infer<typeof AxonStepSchema>;

export const AXON_DEFINITION: EngineDefinition = {
  id: 'axonometria',
  title: 'Axonometría',
  layerPrefixes: [],
  /**
   * Capas: triedro (ejes X, Y, Z), axonometria (el dibujo), cuadro (plano de proyección y
   * rayos en 3D), escala (escala gráfica), elipses y vistas-triedro (de las vistas a la
   * perspectiva).
   */
  layerNames: ['triedro', 'axonometria', 'cuadro', 'escala', 'elipses', 'vistas-triedro'],
  stepSchema: AxonStepSchema,
};
