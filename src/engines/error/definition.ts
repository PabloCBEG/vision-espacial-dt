// Motor «error»: dibuja en la lámina un trazado erróneo (el «error típico» de las soluciones),
// con su propio token de trazo (--stroke-error). No depende solo del color: va punteado y
// rotulado con «✗ Error».
//
// Ejemplo, en el paso de error típico de una solución:
//   "sheet": [..., "error"],
//   "engines": { "error": { "trazos": [ { "puntos": [[-25, 0], [20, 35]] } ] } }
// Cada punto es una coordenada de la lámina en mm (x a lo largo de la LT, y hacia arriba: la
// cota es positiva y el alejamiento va por debajo de la LT) o una referencia a la proyección
// de un punto de la escena: "A″" (proyección vertical) o "A′" (horizontal). Con referencias,
// el error sigue a los puntos y vale también para las variantes con semilla.
import { z } from 'zod';
import type { EngineDefinition } from '../types.ts';

const Pair = z.tuple([z.number(), z.number()]);
/** «A′» o «A″»: proyección horizontal o vertical de un punto de la escena. */
export const PROJECTION_REF = /^([A-Z][0-9]?)([′″])$/;
const Place = z.union([Pair, z.string().regex(PROJECTION_REF, 'Usa «A′» o «A″»')]);

export const ErrorStepSchema = z.object({
  trazos: z
    .array(
      z.object({
        puntos: z.array(Place).min(2),
        /** Rótulo junto al trazo. Por defecto, «Error». */
        rotulo: z.string().min(1).max(40).default('Error'),
        /**
         * Desplazamiento del trazo en la lámina, en mm (x, y hacia arriba). Sirve para que el
         * error no quede tapado por el dato que mide mal, como una cota paralela.
         */
        desplaza: Pair.default([0, 0]),
        /** Dónde va el rótulo (si no, sobre el punto medio del primer segmento). */
        rotuloEn: Pair.optional(),
      }),
    )
    .min(1),
});

export type ErrorStep = z.infer<typeof ErrorStepSchema>;

export const ERROR_DEFINITION: EngineDefinition = {
  id: 'error',
  title: 'Error dibujado',
  layerPrefixes: [],
  layerNames: ['error'],
  stepSchema: ErrorStepSchema,
};
