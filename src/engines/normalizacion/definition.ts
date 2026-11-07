// Motor de normalización: datos de cada paso (sin DOM).
//
// Ejemplo:
//   "engines": { "normalizacion": { "pieza": "escalon", "vistas": ["alzado", "planta"],
//     "caja": { "desplegar": 1 } } }
import { z } from 'zod';
import type { EngineDefinition } from '../types.ts';

const View = z.enum(['alzado', 'planta', 'perfil']);
const Vec3 = z.tuple([z.number(), z.number(), z.number()]);

/**
 * Cota según UNE-EN ISO 129-1, en una vista. Los puntos se dan en el espacio (x, a, c) y el
 * motor los proyecta en la vista.
 */
export const DimensionSchema = z.discriminatedUnion('tipo', [
  z.object({
    tipo: z.literal('lineal'),
    vista: View,
    de: z.tuple([Vec3, Vec3]),
    /** Horizontal o vertical en la vista. */
    direccion: z.enum(['h', 'v']),
    /** Separación de la línea de cota (mm, con signo: + arriba o a la derecha). */
    desplazamiento: z.number().default(8),
    /** Cifra (si no, la medida). */
    valor: z.string().optional(),
  }),
  z.object({
    tipo: z.enum(['diametro', 'radio']),
    vista: View,
    centro: Vec3,
    radio: z.number().positive(),
    /** Dirección de la línea de cota, en grados. */
    angulo: z.number().default(45),
  }),
]);

export type Dimension = z.infer<typeof DimensionSchema>;

const CutSchema = z.object({
  /** Total, al medio (un cuarto) o quebrado (dos planos paralelos). */
  tipo: z.enum(['total', 'medio', 'quebrado']),
  /** Vista que se dibuja en corte. */
  vista: View,
  /** Posición del plano de corte en la dirección de la vista (a, c o x). */
  en: z.number(),
  /** Corte quebrado: segundo plano y dónde cambia (coordenada a lo ancho de la vista). */
  en2: z.number().optional(),
  cambio: z.number().optional(),
  /** Corte al medio: hasta dónde llega el cuarto que se quita (por defecto, el centro). */
  medio: z.number().optional(),
  /** Retirada de la parte de delante en 3D (0 a 1). Se anima. */
  quitar: z.number().min(0).max(1).default(1),
});

export type Cut = z.infer<typeof CutSchema>;

export const NormStepSchema = z.object({
  /**
   * Pieza de la biblioteca (src/content/piezas). Suele ir en la escena inicial de la lección,
   * para no repetirla en cada paso.
   */
  pieza: z.string().min(1).optional(),
  /** Vistas que se dibujan en la lámina (sistema europeo). */
  vistas: z.array(View).default(['alzado', 'planta', 'perfil']),
  /** Aristas ocultas (discontinua fina). Nunca en los cortes. */
  ocultas: z.boolean().default(true),
  /** Ejes de simetría de taladros y cilindros (trazo y punto fino). */
  ejes: z.boolean().default(true),
  /** Caja de proyección en 3D: qué vistas se proyectan en sus caras y cuánto se despliega. */
  caja: z
    .object({
      proyectar: z.array(View).default(['alzado', 'planta', 'perfil']),
      desplegar: z.number().min(0).max(1).default(0),
    })
    .optional(),
  corte: CutSchema.optional(),
  /** Sección abatida (girada 90° sobre la vista): plano perpendicular al eje dado. */
  seccionAbatida: z
    .object({ vista: View, eje: z.enum(['x', 'a', 'c']), en: z.number() })
    .optional(),
  cotas: z.array(DimensionSchema).default([]),
  /**
   * Ejercicios que corrige el motor:
   * - vistaQueFalta: se ven dos vistas; el alumno elige la que falta entre varias piezas.
   * - vistasNecesarias: el alumno marca las vistas imprescindibles.
   * - cotas: el alumno elige qué cotas hacen falta (ni faltan ni sobran).
   * - corte: el alumno elige el dibujo correcto del corte indicado.
   */
  ejercicio: z
    .discriminatedUnion('tipo', [
      z.object({
        tipo: z.literal('vistaQueFalta'),
        falta: View,
        /** Piezas cuyas vistas se ofrecen (una es la de la pieza). */
        opciones: z.array(z.string()).min(2).max(4),
      }),
      z.object({ tipo: z.literal('vistasNecesarias') }),
      z.object({
        tipo: z.literal('cotas'),
        candidatas: z.array(DimensionSchema).min(2),
        necesarias: z.array(z.number().int().min(0)).min(1),
      }),
      z.object({
        tipo: z.literal('corte'),
        /** Cortes que se ofrecen; el correcto es el primero que coincide con «corte». */
        opciones: z.array(CutSchema).min(2).max(4),
        correcta: z.number().int().min(0),
      }),
    ])
    .optional(),
  /** Lo que ha elegido el alumno (lo escribe el propio motor). */
  eleccion: z.array(z.number().int()).optional(),
});

export type NormStep = z.infer<typeof NormStepSchema>;

export const NORM_DEFINITION: EngineDefinition = {
  id: 'normalizacion',
  title: 'Normalización',
  layerPrefixes: [],
  /**
   * Capas: pieza (3D), caja de proyección, vistas, ocultas, ejes, corte (plano y rayado),
   * sección abatida y cotas.
   */
  layerNames: ['pieza', 'caja', 'vistas', 'ocultas', 'ejes', 'corte', 'seccion-abatida', 'cotas'],
  stepSchema: NormStepSchema,
};
