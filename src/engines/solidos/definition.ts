// Motor de sólidos: datos de cada paso (sin Three.js ni DOM).
//
// Ejemplo:
//   "engines": { "solidos": {
//     "solido": { "tipo": "piramide", "lados": 5, "radio": 22, "altura": 50, "centro": [0, 30] },
//     "seccion": { "tipo": "proyectante-vertical", "puntos": [[-30, 10], [30, 40]] }
//   } }
import { z } from 'zod';
import type { EngineDefinition } from '../types.ts';

const Pair = z.tuple([z.number(), z.number()]);
const Triple = z.tuple([z.number(), z.number(), z.number()]);

export const SOLID_TYPES = [
  'tetraedro',
  'cubo',
  'octaedro',
  'prisma',
  'piramide',
  'tronco',
  'cono',
  'cilindro',
] as const;
export type SolidType = (typeof SOLID_TYPES)[number];

const SolidSchema = z.object({
  tipo: z.enum(SOLID_TYPES),
  /** Lados de la base (prisma, pirámide y tronco). */
  lados: z.number().int().min(3).max(8).default(4),
  /** Arista (poliedros regulares). */
  arista: z.number().positive().default(30),
  /** Radio de la circunferencia en que se inscribe la base (o radio de cono y cilindro). */
  radio: z.number().positive().default(20),
  /** Radio de la base de arriba del tronco. */
  radioSuperior: z.number().positive().default(10),
  altura: z.number().positive().default(40),
  /** Centro de la base: (x, a) si se apoya en el PH; (x, c) si se apoya en el PV. */
  centro: Pair.default([0, 30]),
  /** Giro de la base alrededor del eje, en grados. */
  giro: z.number().default(0),
  /** Plano en que se apoya (PAU: tetraedro y cubo sobre una cara; octaedro con una diagonal ⟂). */
  apoyo: z.enum(['PH', 'PV']).default('PH'),
  /** Distancia de la base al plano de apoyo (0: apoyado). */
  elevacion: z.number().min(0).default(0),
});

/**
 * Plano de corte:
 * - proyectante-vertical: perpendicular al PV (de canto). Su traza α₂ pasa por dos puntos (x, c).
 * - proyectante-horizontal: perpendicular al PH (vertical). Su traza α₁ pasa por dos puntos (x, a).
 * - horizontal: a la cota dada. frontal: al alejamiento dado.
 * - tres-puntos: plano cualquiera por tres puntos (x, a, c).
 */
const CutSchema = z.object({
  tipo: z.enum([
    'proyectante-vertical',
    'proyectante-horizontal',
    'horizontal',
    'frontal',
    'tres-puntos',
  ]),
  puntos: z.array(Pair).length(2).optional(),
  tresPuntos: z.array(Triple).length(3).optional(),
  valor: z.number().optional(),
  nombre: z.string().default('α'),
  /** Cuánto se retira la parte de arriba (0: entera; 1: retirada). Se anima. */
  quitar: z.number().min(0).max(1).default(0),
  /** Verdadera magnitud de la sección por abatimiento (0 a 1, se anima). */
  abatir: z.number().min(0).max(1).default(0),
  /**
   * Sobre qué plano se abate. Por defecto: el PV alrededor de α₂ si el plano es proyectante
   * vertical (cada punto cae a una distancia igual a su alejamiento) y el PH alrededor de α₁
   * en los demás casos.
   */
  sobre: z.enum(['PH', 'PV']).optional(),
});

export const SolidsStepSchema = z.object({
  solido: SolidSchema,
  seccion: CutSchema.optional(),
  /** Recta que atraviesa el sólido, por dos puntos (x, a, c): entrada E y salida S. */
  recta: z
    .object({ puntos: z.tuple([Triple, Triple]), nombre: z.string().default('r') })
    .optional(),
  /** Punto sobre la superficie dado por una proyección: se halla la otra. */
  punto: z
    .object({
      dado: z.enum(['horizontal', 'vertical']),
      /** (x, a) si es la horizontal; (x, c) si es la vertical. */
      en: Pair,
      lado: z.enum(['visto', 'oculto']).default('visto'),
      metodo: z.enum(['generatriz', 'paralelo']).default('generatriz'),
      nombre: z.string().default('M'),
      /** Construcción hecha (0 a 1, se anima). */
      progreso: z.number().min(0).max(1).default(1),
    })
    .optional(),
  /** Desarrollo: 0 plegado, 1 desplegado del todo. Se anima. Con sección, el del tronco. */
  desarrollo: z.number().min(0).max(1).optional(),
  /** Rotular los vértices (A, B, C… y V). */
  rotulos: z.boolean().default(true),
});

export type SolidsStep = z.infer<typeof SolidsStepSchema>;

export const SOLIDS_DEFINITION: EngineDefinition = {
  id: 'solidos',
  title: 'Sólidos',
  layerPrefixes: [],
  /**
   * Capas: sólido (y sus vértices), plano de corte, sección, su verdadera magnitud,
   * recta y sus puntos de entrada y salida, punto sobre la superficie y desarrollo.
   */
  layerNames: [
    'solido',
    'vertices',
    'corte',
    'seccion',
    'seccion-vm',
    'recta-solido',
    'superficie',
    'desarrollo',
  ],
  stepSchema: SolidsStepSchema,
};
