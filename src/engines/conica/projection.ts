// Perspectiva cónica. El cuadro es el plano a = 0 (el PV), el geometral es el PH (c = 0) y
// la línea de tierra es la LT. El observador V está delante del cuadro: V = (x₀, d, h), con
// d la distancia al cuadro y h la altura. El punto principal P = (x₀, 0, h) y la línea del
// horizonte es c = h en el cuadro. Los objetos están detrás del cuadro (a < 0).
// Sin Three.js ni DOM.
import { createPoint, type Point } from '../../geometry/index.ts';

export interface Observer {
  /** Posición a lo ancho (x₀), distancia al cuadro (d > 0) y altura (h). */
  readonly x: number;
  readonly d: number;
  readonly h: number;
}

export interface Uv {
  readonly x: number;
  readonly y: number;
}

export const eye = (o: Observer): Point => createPoint(o.x, o.d, o.h);

/** Imagen de Q en el cuadro (x′, c′), o null si Q está a la altura del ojo o detrás de él. */
export function perspective(o: Observer, q: Point): Uv | null {
  const den = o.d - q.a;
  if (den <= 1e-9) return null; // en el plano del observador o por detrás
  const t = o.d / den;
  return { x: o.x + t * (q.x - o.x), y: o.h + t * (q.c - o.h) };
}

/**
 * Punto de fuga de una dirección: donde se ve en el cuadro una recta infinitamente lejana con
 * esa dirección. Las paralelas comparten punto de fuga. Las frontales (sin componente a) no
 * tienen: siguen paralelas en el dibujo.
 */
export function vanishingPoint(o: Observer, dir: Point): Uv | null {
  if (dir.a > -1e-9) {
    if (dir.a > 1e-9) return vanishingPoint(o, createPoint(-dir.x, -dir.a, -dir.c));
    return null;
  }
  const s = o.d / -dir.a;
  return { x: o.x + dir.x * s, y: o.h + dir.c * s };
}

/** Punto principal (fuga de las perpendiculares al cuadro). */
export const principalPoint = (o: Observer): Uv => ({ x: o.x, y: o.h });

/**
 * Punto métrico de una dirección horizontal con punto de fuga F: en la línea del horizonte, a
 * una distancia de F igual a la distancia del ojo a F (del lado del punto principal).
 */
export function measuringPoint(o: Observer, f: Uv): Uv {
  const dist = Math.hypot(f.x - o.x, o.d);
  const side = f.x >= o.x ? -1 : 1;
  return { x: f.x + side * dist, y: o.h };
}

/** Puntos de distancia (fugas de las horizontales a 45° en la perspectiva frontal). */
export function distancePoints(o: Observer): [Uv, Uv] {
  return [
    { x: o.x - o.d, y: o.h },
    { x: o.x + o.d, y: o.h },
  ];
}
