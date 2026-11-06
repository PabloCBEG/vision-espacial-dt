// Tipos básicos del sistema diédrico. Todas las medidas en mm.

/**
 * Punto del espacio P(x, a, c).
 * - x: a lo largo de la LT, positiva hacia la derecha.
 * - a: alejamiento (distancia al PV), positivo delante.
 * - c: cota (distancia al PH), positiva arriba.
 * También se usa como vector (dirección o normal) con las mismas componentes.
 */
export interface Point {
  readonly x: number;
  readonly a: number;
  readonly c: number;
}

/** Recta definida por dos puntos distintos. */
export interface Line {
  readonly p1: Point;
  readonly p2: Point;
}

/** Plano definido por tres puntos no alineados, con su vector normal unitario. */
export interface Plane {
  readonly p1: Point;
  readonly p2: Point;
  readonly p3: Point;
  readonly normal: Point;
}

/**
 * Punto de la lámina, con la LT sobre el eje x.
 * y positiva hacia arriba (por encima de la LT), como en el papel.
 */
export interface SheetPoint {
  readonly x: number;
  readonly y: number;
}

/** Tolerancia de pertenencia (punto en recta, recta en plano, punto en PH...). */
export const TOLERANCE_MM = 0.01;

/** Umbral numérico para decidir que dos direcciones son paralelas. */
export const PARALLEL_EPSILON = 1e-9;
