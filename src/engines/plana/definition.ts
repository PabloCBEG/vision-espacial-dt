// Motor de geometría plana: datos de la lección y de cada paso (sin DOM).
//
// La construcción («objetos») se escribe una vez en la escena inicial de la lección:
//   "initialScene": { …, "engines": { "plana": { "objetos": [ … ] } } }
// y cada paso dice qué se ve, qué se destaca y qué se traza con regla y compás:
//   "engines": { "plana": { "visibles": ["A", "B", "m"], "trazar": ["m"] } }
import { z } from 'zod';
import type { EngineDefinition } from '../types.ts';

const Id = z.string().regex(/^[A-Za-zα-ω][A-Za-zα-ω0-9_]*$/, 'Nombre de objeto no válido');
const Pair = z.tuple([z.number(), z.number()]);
const Role = z.enum(['dato', 'auxiliar', 'proceso', 'resultado']);

const common = {
  id: Id,
  /** Papel de la línea: fija su grosor (datos, auxiliar, proceso o resultado). */
  rol: Role.optional(),
  /** Rótulo en la lámina (por defecto, el nombre de los puntos). */
  etiqueta: z.string().optional(),
  /** Objeto de apoyo que no se dibuja nunca. */
  oculto: z.boolean().optional(),
};

const ObjectSchema = z.discriminatedUnion('tipo', [
  z.object({ ...common, tipo: z.literal('punto'), en: Pair, fijo: z.boolean().optional() }),
  z.object({ ...common, tipo: z.literal('puntoSobre'), sobre: Id, t: z.number().min(0).max(1) }),
  z.object({ ...common, tipo: z.literal('recta'), por: z.tuple([Id, Id]) }),
  z.object({ ...common, tipo: z.literal('segmento'), por: z.tuple([Id, Id]) }),
  z.object({ ...common, tipo: z.literal('semirrecta'), por: z.tuple([Id, Id]) }),
  z.object({
    ...common,
    tipo: z.literal('circunferencia'),
    centro: Id,
    pasaPor: Id.optional(),
    radio: z.number().positive().optional(),
    radioDe: z.tuple([Id, Id]).optional(),
  }),
  z.object({ ...common, tipo: z.literal('arco'), centro: Id, desde: Id, hasta: Id }),
  z.object({
    ...common,
    tipo: z.literal('interseccion'),
    de: z.tuple([Id, Id]),
    indice: z.union([z.literal(0), z.literal(1)]).optional(),
  }),
  z.object({ ...common, tipo: z.literal('puntoMedio'), de: z.tuple([Id, Id]) }),
  z.object({ ...common, tipo: z.literal('perpendicular'), a: Id, por: Id }),
  z.object({ ...common, tipo: z.literal('paralela'), a: Id, por: Id }),
  z.object({ ...common, tipo: z.literal('mediatriz'), de: z.tuple([Id, Id]) }),
  z.object({
    ...common,
    tipo: z.literal('bisectriz'),
    angulo: z.tuple([Id, Id, Id]).optional(),
    rectas: z.tuple([Id, Id]).optional(),
    indice: z.union([z.literal(0), z.literal(1)]).optional(),
  }),
  z.object({
    ...common,
    tipo: z.literal('tangente'),
    desde: Id,
    a: Id,
    indice: z.union([z.literal(0), z.literal(1)]).optional(),
  }),
  z.object({
    ...common,
    tipo: z.literal('puntoTangencia'),
    desde: Id,
    a: Id,
    indice: z.union([z.literal(0), z.literal(1)]).optional(),
  }),
  z.object({ ...common, tipo: z.literal('ejeRadical'), de: z.tuple([Id, Id]) }),
  z.object({ ...common, tipo: z.literal('centroRadical'), de: z.tuple([Id, Id, Id]) }),
  z.object({
    ...common,
    tipo: z.literal('arcoCapaz'),
    de: z.tuple([Id, Id]),
    angulo: z.number().gt(0).lt(180),
    lado: z.union([z.literal(1), z.literal(-1)]).optional(),
  }),
  z.object({ ...common, tipo: z.literal('medidaAngulo'), de: z.tuple([Id, Id, Id]) }),
  z.object({ ...common, tipo: z.literal('medidaDistancia'), de: z.tuple([Id, Id]) }),
]);

/** Puente 3D: la figura plana y su transformada como sombra en una escena 3D enlazada. */
const BridgeSchema = z.object({
  tipo: z.enum(['homologia', 'afinidad']),
  /** Polígono de la figura (puntos de la construcción). */
  figura: z.array(Id).min(3),
  /** Eje: dos puntos de la construcción (la recta común a los dos planos). */
  eje: z.tuple([Id, Id]),
  /** Ángulo entre el plano de la figura y el plano de la sombra, en grados. */
  angulo: z.number().gt(10).lt(170).default(60),
  /** Foco (homología: punto de luz) o dirección de la luz (afinidad), en mm sobre la figura. */
  luz: z.tuple([z.number(), z.number(), z.number()]).default([0, -20, 70]),
  /** Giro del plano de la sombra hasta caer sobre el de la figura (0 a 1). Se anima. */
  abatir: z.number().min(0).max(1).default(0),
});

export const PlaneStepSchema = z.object({
  /** La construcción (normalmente en la escena inicial de la lección). */
  objetos: z.array(ObjectSchema).optional(),
  /** Objetos que se ven en este paso (por defecto, todos). */
  visibles: z.array(Id).optional(),
  /** Objetos destacados. */
  destacar: z.array(Id).optional(),
  /** Objetos que se trazan en este paso con la regla y el compás animados, en este orden. */
  trazar: z.array(Id).optional(),
  /** Lugar geométrico: el punto que deja rastro y el que lo mueve (un punto sobre un objeto). */
  lugar: z.object({ punto: Id, mueve: Id }).optional(),
  /** Posición de los puntos libres en este paso (si no, la de la construcción). */
  posiciones: z.record(Id, Pair).optional(),
  /** Posición de los puntos sobre un objeto (0 a 1 a lo largo del objeto). */
  parametros: z.record(Id, z.number().min(0).max(1)).optional(),
  /** Ejercicio: el alumno arrastra «mover» hasta «objetivo» (uno de ellos), con tolerancia en mm. */
  respuesta: z
    .object({
      mover: Id,
      objetivo: z.union([Id, z.array(Id).min(1)]),
      tolerancia: z.number().positive().default(2),
      acierto: z.string().optional(),
      pista: z.string().optional(),
    })
    .optional(),
  puente3d: BridgeSchema.optional(),
});

export type PlaneStep = z.infer<typeof PlaneStepSchema>;
export type PlaneObject = z.infer<typeof ObjectSchema>;
export type Bridge = z.infer<typeof BridgeSchema>;

export const PLANE_DEFINITION: EngineDefinition = {
  id: 'plana',
  title: 'Geometría plana',
  /** Cada objeto se puede destacar desde el paso con "plana:<nombre>". */
  layerPrefixes: ['plana'],
  /** lugar: el rastro del lugar geométrico. puente: la escena 3D de la homología o afinidad. */
  layerNames: ['lugar', 'puente'],
  stepSchema: PlaneStepSchema,
};
