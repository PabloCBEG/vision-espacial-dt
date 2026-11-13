// Piezas de normalización como datos: operaciones sencillas (bloques, cilindros, taladros,
// ranuras, chaflanes, redondeos y perfiles extruidos) que se combinan con operaciones
// booleanas exactas (manifold-3d). Coordenadas del dominio en mm: x a lo ancho, a (alejamiento)
// hacia delante y c (cota) hacia arriba, con la pieza en el primer cuadrante.
import { z } from 'zod';

const Vec3 = z.tuple([z.number(), z.number(), z.number()]);
const Vec2 = z.tuple([z.number(), z.number()]);
const Axis = z.enum(['x', 'a', 'c']);

export const OperationSchema = z.discriminatedUnion('tipo', [
  /** Bloque entre dos esquinas opuestas (x, a, c). */
  z.object({ tipo: z.literal('bloque'), desde: Vec3, hasta: Vec3 }),
  /** Ranura o rebaje: un bloque que se quita. */
  z.object({ tipo: z.literal('ranura'), desde: Vec3, hasta: Vec3 }),
  /** Cilindro macizo: centro de una base, eje, radio y largo (en el sentido positivo del eje). */
  z.object({
    tipo: z.literal('cilindro'),
    centro: Vec3,
    eje: Axis,
    radio: z.number().positive(),
    largo: z.number().positive(),
  }),
  /**
   * Taladro: centro en la cara de entrada, eje y sentido hacia dentro de la pieza.
   * Sin profundidad, es pasante.
   */
  z.object({
    tipo: z.literal('taladro'),
    centro: Vec3,
    eje: Axis,
    sentido: z.union([z.literal(1), z.literal(-1)]).default(-1),
    diametro: z.number().positive(),
    profundidad: z.number().positive().optional(),
  }),
  /**
   * Chaflán o redondeo de una arista paralela a un eje: la arista está en `en` (las otras dos
   * coordenadas), va de `desde` a `hasta` a lo largo del eje, y `hacia` dice hacia dónde queda
   * el material (+1 o −1 en cada una de las otras dos coordenadas).
   */
  z.object({
    tipo: z.enum(['chaflan', 'redondeo']),
    eje: Axis,
    en: Vec2,
    desde: z.number(),
    hasta: z.number(),
    hacia: z.tuple([
      z.union([z.literal(1), z.literal(-1)]),
      z.union([z.literal(1), z.literal(-1)]),
    ]),
    tamano: z.number().positive(),
  }),
  /**
   * Perfil poligonal extruido a lo largo de un eje (de `desde` a `hasta`). Los puntos son las
   * otras dos coordenadas en orden (x→(a, c), a→(x, c), c→(x, a)). `quitar` lo resta.
   */
  z.object({
    tipo: z.literal('perfil'),
    eje: Axis,
    puntos: z.array(Vec2).min(3),
    desde: z.number(),
    hasta: z.number(),
    quitar: z.boolean().default(false),
  }),
  /**
   * Sólido convexo: la envolvente de unos puntos (x, a, c). Con 4 puntos es un tetraedro; con 5,
   * una pirámide o una cuña; con 6, un prisma triangular inclinado… `quitar` lo resta.
   */
  z.object({
    tipo: z.literal('convexo'),
    puntos: z.array(Vec3).min(4),
    quitar: z.boolean().default(false),
  }),
]);

export type Operation = z.infer<typeof OperationSchema>;
export type AxisName = z.infer<typeof Axis>;

export const PieceSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  nombre: z.string().min(1),
  /** Dificultad de 1 a 3 (para ordenar la biblioteca). */
  dificultad: z.number().int().min(1).max(3),
  /** Vistas necesarias según el profesor (para el ejercicio de elegir vistas). */
  vistasNecesarias: z.array(z.enum(['alzado', 'planta', 'perfil'])).min(1),
  operaciones: z.array(OperationSchema).min(1),
});

export type Piece = z.infer<typeof PieceSchema>;

/** Cilindros y taladros de la pieza: sus ejes de simetría se dibujan en las vistas. */
export interface Revolution {
  readonly axis: AxisName;
  /** Centro de la base y largo a lo largo del eje (siempre hacia el sentido positivo). */
  readonly base: readonly [number, number, number];
  readonly length: number;
  readonly radius: number;
}

/** Ejes de simetría de cilindros y taladros. */
export function revolutions(piece: Piece, bounds: Bounds): Revolution[] {
  const out: Revolution[] = [];
  for (const op of piece.operaciones) {
    if (op.tipo === 'cilindro') {
      out.push({ axis: op.eje, base: op.centro, length: op.largo, radius: op.radio });
    } else if (op.tipo === 'taladro') {
      const i = axisIndex(op.eje);
      const depth = op.profundidad ?? bounds.max[i] - bounds.min[i] + 2;
      const start = [...op.centro] as [number, number, number];
      const end = [...op.centro] as [number, number, number];
      end[i] = op.profundidad
        ? start[i] + op.sentido * depth
        : op.sentido < 0
          ? bounds.min[i]
          : bounds.max[i];
      if (!op.profundidad) start[i] = op.sentido < 0 ? bounds.max[i] : bounds.min[i];
      const low = start[i] < end[i] ? start : end;
      out.push({
        axis: op.eje,
        base: low,
        length: Math.abs(end[i] - start[i]),
        radius: op.diametro / 2,
      });
    }
  }
  return out;
}

export interface Bounds {
  readonly min: readonly [number, number, number];
  readonly max: readonly [number, number, number];
}

export function axisIndex(axis: AxisName): 0 | 1 | 2 {
  return axis === 'x' ? 0 : axis === 'a' ? 1 : 2;
}

/** Caja que envuelve los bloques, cilindros y perfiles que añaden material. */
export function boundsOf(piece: Piece): Bounds {
  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];
  const grow = (p: readonly number[]): void => {
    for (let i = 0; i < 3; i++) {
      min[i] = Math.min(min[i] as number, p[i] as number);
      max[i] = Math.max(max[i] as number, p[i] as number);
    }
  };
  for (const op of piece.operaciones) {
    if (op.tipo === 'bloque') {
      grow(op.desde);
      grow(op.hasta);
    } else if (op.tipo === 'cilindro') {
      const i = axisIndex(op.eje);
      for (const s of [-1, 1]) {
        for (const t of [-1, 1]) {
          const p = [...op.centro];
          const [j, k] = others(i);
          p[j] = (p[j] as number) + s * op.radio;
          p[k] = (p[k] as number) + t * op.radio;
          grow(p);
          p[i] = (p[i] as number) + op.largo;
          grow(p);
        }
      }
    } else if (op.tipo === 'convexo' && !op.quitar) {
      for (const p of op.puntos) grow(p);
    } else if (op.tipo === 'perfil' && !op.quitar) {
      const i = axisIndex(op.eje);
      const [j, k] = others(i);
      for (const [u, v] of op.puntos) {
        for (const w of [op.desde, op.hasta]) {
          const p = [0, 0, 0];
          p[i] = w;
          p[j] = u;
          p[k] = v;
          grow(p);
        }
      }
    }
  }
  return {
    min: min as [number, number, number],
    max: max as [number, number, number],
  };
}

/** Las otras dos coordenadas de un eje, en el orden de los perfiles. */
export function others(i: 0 | 1 | 2): [0 | 1 | 2, 0 | 1 | 2] {
  return i === 0 ? [1, 2] : i === 1 ? [0, 2] : [0, 1];
}
