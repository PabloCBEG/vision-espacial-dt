// Motor de métodos diédricos: datos de cada paso (sin Three.js ni DOM).
//
// Ejemplo de paso:
//   "engines": { "metodos": { "metodo": "giro", "figura": ["A", "B"], "objetivo": "vm" } }
import { z } from 'zod';
import type { EngineDefinition } from '../types.ts';

const PointName = z.string().regex(/^[A-Z][0-9]?$/);

export const METHOD_NAMES = ['abatimiento', 'giro', 'cambio'] as const;
export type MethodName = (typeof METHOD_NAMES)[number];

export const MethodsStepSchema = z
  .object({
    /** Método con el que se resuelve. */
    metodo: z.enum(METHOD_NAMES),
    /**
     * Figura que se mueve: 2 puntos (segmento) o de 3 a 6 (figura plana), de los de la lección.
     * Se puede omitir si la figura sale de "distancia" o "anguloRectaPlano".
     */
    figura: z.array(PointName).min(2).max(6).optional(),
    /**
     * Qué se busca. Con un segmento: "vm" (verdadera magnitud), "angulo-PH" o "angulo-PV".
     * Con tres puntos A, V, B: "angulo" (en el vértice V). Con una figura: "vm".
     */
    objetivo: z.enum(['vm', 'angulo-PH', 'angulo-PV', 'angulo']).default('vm'),
    /** Cuánto se ha hecho el movimiento: 0 (nada) a 1 (completo). Entre pasos se anima. */
    progreso: z.number().min(0).max(1).default(1),
    /** Abatimiento: sobre qué plano de proyección (charnela α₁ o α₂). */
    sobre: z.enum(['PH', 'PV']).optional(),
    /** Giro: eje vertical o de punta, y punto por el que pasa (por defecto, el primero). */
    eje: z.enum(['vertical', 'punta']).optional(),
    ejePor: PointName.optional(),
    /** Cambio de plano: vertical (nuevo PV₁) u horizontal (nuevo PH₁). */
    cambio: z.enum(['vertical', 'horizontal']).optional(),
    /** Distancia de un punto a un plano o a una recta de la escena (se busca el pie F). */
    distancia: z.object({ desde: PointName, hasta: z.string().min(1) }).optional(),
    /** Ángulo de la recta AB con el plano: la figura es A, I (intersección) y F (pie de A). */
    anguloRectaPlano: z
      .object({ recta: z.tuple([PointName, PointName]), plano: z.string().min(1) })
      .optional(),
    /** Recta con un ángulo dado: cono de vértice V con ese ángulo y una generatriz elegida. */
    cono: z
      .object({
        vertice: PointName,
        angulo: z.number().gt(0).lt(90),
        con: z.enum(['PH', 'PV']).default('PH'),
        /** Dirección de la generatriz elegida, en grados (0°: hacia la derecha). */
        generatriz: z.number().default(-60),
        /** Si se dibuja también el plano tangente (plano con ese ángulo). */
        plano: z.boolean().default(false),
      })
      .optional(),
    /** El alumno puede cambiar de método y repetir el movimiento. */
    selector: z.boolean().default(false),
    /** En el cambio de plano, la cámara se coloca de frente al plano nuevo. */
    mirarPlanoNuevo: z.boolean().default(false),
  })
  .refine((d) => d.figura || d.distancia || d.anguloRectaPlano || d.cono, {
    message: 'Indica la figura, una distancia, un ángulo recta-plano o un cono',
  });

export type MethodsStep = z.infer<typeof MethodsStepSchema>;

export const METHODS_DEFINITION: EngineDefinition = {
  id: 'metodos',
  title: 'Métodos diédricos',
  layerPrefixes: [],
  /**
   * Capas del motor (3D y lámina):
   * - figura: la figura en el espacio y sus proyecciones (datos).
   * - charnela, eje, nueva-lt: el elemento alrededor del que se mueve.
   * - movimiento: arcos y construcciones (proceso y auxiliares).
   * - resultado: la figura abatida, girada o en el plano nuevo.
   * - medida: la verdadera magnitud o el ángulo, rotulados.
   * - perpendicular: la perpendicular de las distancias.
   * - cono: el cono de rectas con el ángulo dado.
   */
  layerNames: [
    'figura',
    'charnela',
    'eje',
    'nueva-lt',
    'movimiento',
    'resultado',
    'medida',
    'perpendicular',
    'cono',
  ],
  stepSchema: MethodsStepSchema,
};
