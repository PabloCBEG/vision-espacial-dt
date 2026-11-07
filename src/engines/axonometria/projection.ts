// Axonometría: proyección del mismo sólido desde otra dirección (CLAUDE.md, UNE-EN ISO 5456-3).
// - Perspectiva isométrica: proyección ortogonal en la dirección (−1, 1, 1); cada eje se
//   reduce con el coeficiente √(2/3) ≈ 0,816 y los ejes forman 120°.
// - Dibujo isométrico: lo mismo sin reducir (coeficiente 1), más grande pero igual de forma.
// - Caballera: proyección oblicua sobre un plano frontal. El plano XZ en verdadera magnitud y
//   el eje Y (hacia el fondo) a un ángulo dado y reducido con un coeficiente (0,5).
// Ejes: Z = cota (arriba). En isométrica, X va hacia la izquierda y abajo (x decreciente) e
// Y hacia la derecha y abajo (alejamiento creciente). En caballera, X a la derecha (x) e
// Y hacia el fondo (alejamiento decreciente). Sin Three.js ni DOM.
import { createPoint, type Point } from '../../geometry/index.ts';

export type AxonSystem = 'isometrica' | 'dibujo-isometrico' | 'caballera';

export interface AxonSpec {
  readonly system: AxonSystem;
  /** Caballera: ángulo del eje Y con la horizontal (grados) y su coeficiente de reducción. */
  readonly angleY: number;
  readonly coefY: number;
}

/** Coeficiente de reducción isométrico: √(2/3) ≈ 0,816. */
export const ISO_COEF = Math.sqrt(2 / 3);

const R2 = Math.SQRT2;
const R6 = Math.sqrt(6);
/** Vectores de la pantalla en la isométrica, en coordenadas del dominio (x, a, c). */
export const ISO_RIGHT = createPoint(1 / R2, 1 / R2, 0);
export const ISO_UP = createPoint(1 / R6, -1 / R6, 2 / R6);
/** Dirección hacia el observador en la isométrica (la misma que la cámara «isometric»). */
export const ISO_TOWARD = createPoint(-1 / Math.sqrt(3), 1 / Math.sqrt(3), 1 / Math.sqrt(3));

const dot = (p: Point, q: Point): number => p.x * q.x + p.a * q.a + p.c * q.c;

/** Proyección axonométrica de un punto: (u, v) en el dibujo, en mm. */
export function axon(spec: AxonSpec, p: Point): { u: number; v: number } {
  switch (spec.system) {
    case 'isometrica':
      return { u: dot(p, ISO_RIGHT), v: dot(p, ISO_UP) };
    case 'dibujo-isometrico':
      return { u: dot(p, ISO_RIGHT) / ISO_COEF, v: dot(p, ISO_UP) / ISO_COEF };
    case 'caballera': {
      const t = (spec.angleY * Math.PI) / 180;
      const depth = -p.a; // hacia el fondo
      return {
        u: p.x + spec.coefY * depth * Math.cos(t),
        v: p.c + spec.coefY * depth * Math.sin(t),
      };
    }
  }
}

/** Dirección hacia el observador (para decidir qué caras se ven). */
export function towardObserver(spec: AxonSpec): Point {
  if (spec.system !== 'caballera') return ISO_TOWARD;
  // Rayos de la caballera: un desplazamiento Δ = (k·cos t, 1, k·sin t)·Δa no se mueve en el
  // dibujo. El observador está del lado del alejamiento positivo.
  const t = (spec.angleY * Math.PI) / 180;
  const v = createPoint(spec.coefY * Math.cos(t), 1, spec.coefY * Math.sin(t));
  const l = Math.hypot(v.x, v.a, v.c);
  return createPoint(v.x / l, v.a / l, v.c / l);
}

/** Direcciones de los ejes X, Y y Z del triedro en el dominio. */
export function axisVectors(spec: AxonSpec): { X: Point; Y: Point; Z: Point } {
  return spec.system === 'caballera'
    ? { X: createPoint(1, 0, 0), Y: createPoint(0, -1, 0), Z: createPoint(0, 0, 1) }
    : { X: createPoint(-1, 0, 0), Y: createPoint(0, 1, 0), Z: createPoint(0, 0, 1) };
}

/** Coeficientes de reducción de los tres ejes (longitud dibujada de 1 mm real). */
export function coefficients(spec: AxonSpec): { X: number; Y: number; Z: number } {
  const { X, Y, Z } = axisVectors(spec);
  const o = axon(spec, createPoint(0, 0, 0));
  const len = (p: Point): number => {
    const q = axon(spec, p);
    return Math.hypot(q.u - o.u, q.v - o.v);
  };
  return { X: len(X), Y: len(Y), Z: len(Z) };
}

/**
 * Escala gráfica de reducción isométrica: medidas reales sobre una recta a 45° y su
 * proyección vertical sobre otra a 30° (el eje isométrico), cada `step` mm.
 * cos 45° / cos 30° = √(2/3) ≈ 0,816.
 */
export function isoReductionScale(
  length: number,
  step: number,
): {
  real: { u: number; v: number }[];
  reduced: { u: number; v: number }[];
} {
  const real: { u: number; v: number }[] = [];
  const reduced: { u: number; v: number }[] = [];
  const c45 = Math.cos(Math.PI / 4);
  const s45 = Math.sin(Math.PI / 4);
  const t30 = Math.tan(Math.PI / 6);
  for (let d = 0; d <= length + 1e-9; d += step) {
    const p = { u: d * c45, v: d * s45 };
    real.push(p);
    // Misma u, sobre la recta a 30°.
    reduced.push({ u: p.u, v: p.u * t30 });
  }
  return { real, reduced };
}

/** Puntos de una elipse que es la proyección de la circunferencia (centro, radio, normal). */
export function circlePoints(
  spec: AxonSpec,
  center: Point,
  radius: number,
  normal: Point,
  count = 12,
): { u: number; v: number }[] {
  // Dos direcciones del plano de la circunferencia.
  const helper = Math.abs(normal.c) < 0.9 ? createPoint(0, 0, 1) : createPoint(1, 0, 0);
  const e1 = normalize(cross(normal, helper));
  const e2 = normalize(cross(normal, e1));
  return Array.from({ length: count }, (_, i) => {
    const t = (2 * Math.PI * i) / count;
    return axon(
      spec,
      createPoint(
        center.x + radius * (Math.cos(t) * e1.x + Math.sin(t) * e2.x),
        center.a + radius * (Math.cos(t) * e1.a + Math.sin(t) * e2.a),
        center.c + radius * (Math.cos(t) * e1.c + Math.sin(t) * e2.c),
      ),
    );
  });
}

function cross(u: Point, v: Point): Point {
  return createPoint(u.a * v.c - u.c * v.a, u.c * v.x - u.x * v.c, u.x * v.a - u.a * v.x);
}

function normalize(u: Point): Point {
  const l = Math.hypot(u.x, u.a, u.c) || 1;
  return createPoint(u.x / l, u.a / l, u.c / l);
}
