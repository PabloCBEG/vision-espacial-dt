// Cónicas definidas como lugares geométricos, como se trazan en Dibujo Técnico:
// - elipse: suma de distancias a los focos igual al eje mayor (2a);
// - hipérbola: diferencia de distancias a los focos igual al eje real (2a);
// - parábola: misma distancia al foco que a la directriz.
// Las curvas se muestrean para dibujarlas; la tangente en un punto es la bisectriz de sus
// radios vectores (la construcción del temario). Sin Three.js ni DOM.
import { add, dist, dot, len, mul, perp, pt, sub, unit, type Line2, type Pt } from './geometry.ts';

export type ConicKind = 'elipse' | 'hiperbola' | 'parabola';

export interface Conic {
  readonly kind: ConicKind;
  /** Foco (el único de la parábola) y segundo foco (elipse e hipérbola). */
  readonly f1: Pt;
  readonly f2: Pt | null;
  /** Semieje mayor (elipse) o semieje real (hipérbola); en la parábola, el parámetro p. */
  readonly a: number;
  /** Semieje menor (elipse) o imaginario (hipérbola); 0 en la parábola. */
  readonly b: number;
  /** Centro (elipse e hipérbola) o vértice (parábola). */
  readonly center: Pt;
  /** Dirección del eje focal (unitaria; en la parábola, del vértice hacia el foco). */
  readonly axis: Pt;
  /** Directriz de la parábola. */
  readonly directrix: Line2 | null;
  /** Ramas dibujadas: una (elipse, parábola) o dos (hipérbola). */
  readonly branches: readonly (readonly Pt[])[];
  readonly closed: boolean;
}

/** Alcance de las ramas abiertas (hipérbola y parábola), en mm desde el centro o vértice. */
const OPEN_EXTENT = 70;
const SAMPLES = 96;

/** Elipse de focos f1 y f2 y semieje mayor a (a > semidistancia focal). */
export function ellipse(f1: Pt, f2: Pt, a: number): Conic | null {
  const c = dist(f1, f2) / 2;
  if (a <= c + 1e-9) return null;
  const axis = unit(sub(f2, f1)) ?? pt(1, 0);
  const center = mul(add(f1, f2), 0.5);
  const b = Math.sqrt(a * a - c * c);
  const conic = { kind: 'elipse' as const, f1, f2, a, b, center, axis, directrix: null };
  const points: Pt[] = [];
  for (let i = 0; i < SAMPLES; i++) points.push(conicPoint(conic, i / SAMPLES));
  return { ...conic, branches: [points], closed: true };
}

/** Hipérbola de focos f1 y f2 y semieje real a (0 < a < semidistancia focal). */
export function hyperbola(f1: Pt, f2: Pt, a: number): Conic | null {
  const c = dist(f1, f2) / 2;
  if (a <= 1e-9 || a >= c - 1e-9) return null;
  const axis = unit(sub(f2, f1)) ?? pt(1, 0);
  const center = mul(add(f1, f2), 0.5);
  const b = Math.sqrt(c * c - a * a);
  const conic = { kind: 'hiperbola' as const, f1, f2, a, b, center, axis, directrix: null };
  const half = SAMPLES / 2;
  const branch = (from: number): Pt[] => {
    const out: Pt[] = [];
    for (let i = 0; i <= half; i++) out.push(conicPoint(conic, from + (i / half) * 0.4999));
    return out;
  };
  return { ...conic, branches: [branch(0), branch(0.5)], closed: false };
}

/** Parábola de foco f y directriz d (f fuera de d). */
export function parabola(f: Pt, d: Line2): Conic | null {
  const foot = add(d.p, mul(d.d, dot(sub(f, d.p), d.d)));
  const p = dist(f, foot);
  if (p < 1e-6) return null;
  const axis = unit(sub(f, foot)) ?? pt(0, 1);
  const center = mul(add(f, foot), 0.5);
  const conic = {
    kind: 'parabola' as const,
    f1: f,
    f2: null,
    a: p,
    b: 0,
    center,
    axis,
    directrix: d,
  };
  const points: Pt[] = [];
  for (let i = 0; i <= SAMPLES; i++) points.push(conicPoint(conic, i / SAMPLES));
  return { ...conic, branches: [points], closed: false };
}

type ConicShape = Pick<Conic, 'kind' | 'a' | 'b' | 'center' | 'axis'>;

/**
 * Punto de la cónica para un parámetro t de 0 a 1: en la elipse, una vuelta; en la hipérbola,
 * la primera rama (la del foco f1) de 0 a 0,5 y la segunda de 0,5 a 1; en la parábola, de un
 * extremo al otro de lo dibujado.
 */
export function conicPoint(k: ConicShape, t: number): Pt {
  const u = k.axis;
  const v = perp(u);
  const at = (x: number, y: number): Pt => add(k.center, add(mul(u, x), mul(v, y)));
  if (k.kind === 'elipse') {
    const th = t * 2 * Math.PI;
    return at(k.a * Math.cos(th), k.b * Math.sin(th));
  }
  if (k.kind === 'hiperbola') {
    const sMax = Math.asinh(OPEN_EXTENT / Math.max(k.b, 1e-6));
    const first = t < 0.5;
    const s = ((first ? t : t - 0.5) / 0.5 - 0.5) * 2 * sMax;
    const x = k.a * Math.cosh(s) * (first ? -1 : 1);
    return at(x, k.b * Math.sinh(s));
  }
  // Parábola: y² = 2·p·x desde el vértice (p = distancia del foco a la directriz).
  const p = k.a;
  const yMax = Math.min(OPEN_EXTENT, Math.sqrt(2 * p * OPEN_EXTENT));
  const y = (t - 0.5) * 2 * yMax;
  return at((y * y) / (2 * p), y);
}

/** Parámetro del punto de la cónica más cercano a q (para arrastrar un punto sobre ella). */
export function nearestConicParam(k: Conic, q: Pt): number {
  let best = 0;
  let bestDistance = Infinity;
  const steps = 720;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const d = dist(conicPoint(k, t), q);
    if (d < bestDistance) {
      bestDistance = d;
      best = t;
    }
  }
  return best;
}

/** Cuánto se aleja q de cumplir la definición de la cónica (0 si está en ella), en mm. */
export function conicResidual(k: Conic, q: Pt): number {
  const d1 = dist(q, k.f1);
  if (k.kind === 'parabola' && k.directrix) {
    const d = k.directrix;
    const toLine = Math.abs(dot(sub(q, d.p), perp(d.d)));
    return Math.abs(d1 - toLine);
  }
  const d2 = k.f2 ? dist(q, k.f2) : 0;
  return k.kind === 'elipse' ? Math.abs(d1 + d2 - 2 * k.a) : Math.abs(Math.abs(d1 - d2) - 2 * k.a);
}

/**
 * Tangente en un punto P de la cónica, como se construye en el temario:
 * - elipse: bisectriz exterior del ángulo de los radios vectores PF₁ y PF₂;
 * - hipérbola: bisectriz interior de ese ángulo;
 * - parábola: bisectriz del ángulo entre PF y la perpendicular desde P a la directriz.
 */
export function conicTangent(k: Conic, p: Pt): Line2 | null {
  const u1 = unit(sub(k.f1, p));
  let u2: Pt | null;
  if (k.kind === 'parabola' && k.directrix) {
    const d = k.directrix;
    const foot = add(d.p, mul(d.d, dot(sub(p, d.p), d.d)));
    u2 = unit(sub(foot, p));
  } else {
    u2 = k.f2 ? unit(sub(k.f2, p)) : null;
  }
  if (!u1 || !u2) return null;
  const direction = k.kind === 'elipse' ? sub(u1, u2) : add(u1, u2);
  const d = unit(direction);
  return d && len(direction) > 1e-9 ? { p, d } : null;
}

/** Excentricidad: c/a en elipse e hipérbola, 1 en la parábola. */
export function eccentricity(k: Conic): number {
  if (k.kind === 'parabola') return 1;
  const c = k.f2 ? dist(k.f1, k.f2) / 2 : 0;
  return c / k.a;
}
