// Laboratorio de cónicas: matemática pura (sin Three.js ni DOM).
//
// Cono doble de vértice V = (0, 0, 0), eje vertical (la cota c) y semiángulo α: x² + a² = (c·tan α)².
// Plano secante por el punto (0, 0, h) del eje, inclinado θ alrededor del eje a:
// normal n = (sen θ, 0, cos θ). Con θ = 0 es horizontal.
// - β, ángulo entre el plano y el eje: β = 90° − θ.
// - Tipo (como en la lección de sólidos): β = 90° circunferencia; β > α elipse; β = α parábola;
//   β < α hipérbola. Si el plano pasa por el vértice (h = 0), la cónica degenera.
// - Excentricidad (esferas de Dandelin): e = cos β / cos α.
// En el plano se usan coordenadas (s, t): s a lo largo de la línea de máxima pendiente
// u = (cos θ, 0, −sen θ) y t a lo largo del eje a. Así se obtiene la verdadera magnitud.
import { createPoint, type Point } from '../../geometry/index.ts';

export type ConicType = 'circunferencia' | 'elipse' | 'parábola' | 'hipérbola' | 'degenerada';

export interface ConicInput {
  /** Semiángulo del cono, en grados (ángulo de la generatriz con el eje). */
  readonly alpha: number;
  /** Inclinación del plano respecto a la horizontal, en grados (0 a 90). */
  readonly theta: number;
  /** Altura del plano sobre el vértice, en el eje (mm). */
  readonly h: number;
}

export interface Canonical {
  readonly type: ConicType;
  /** Ángulo entre el plano y el eje (β) y semiángulo (α), en grados. */
  readonly beta: number;
  readonly alpha: number;
  readonly e: number;
  /** Centro (o vértice, en la parábola) en coordenadas del plano (s, t). */
  readonly center: readonly [number, number];
  /** Semiejes: a a lo largo de s y b a lo largo de t (en la parábola, a = parámetro p). */
  readonly a: number;
  readonly b: number;
  /** Focos en el plano (s, t). */
  readonly foci: readonly (readonly [number, number])[];
  /** Ecuación canónica en LaTeX (ejes x, y centrados en la cónica). */
  readonly latex: string;
  /** Por qué es de ese tipo, en una frase. */
  readonly why: string;
}

const DEG = Math.PI / 180;
const TOL_DEG = 0.25;

export function planeNormal(theta: number): Point {
  return createPoint(Math.sin(theta * DEG), 0, Math.cos(theta * DEG));
}

/** Base del plano: origen en el eje, u (máxima pendiente) y w (eje a). */
export function planeFrame(input: ConicInput): {
  origin: Point;
  u: Point;
  w: Point;
  normal: Point;
} {
  const t = input.theta * DEG;
  return {
    origin: createPoint(0, 0, input.h),
    u: createPoint(Math.cos(t), 0, -Math.sin(t)),
    w: createPoint(0, 1, 0),
    normal: planeNormal(input.theta),
  };
}

export function toPlane(input: ConicInput, p: Point): [number, number] {
  const { origin, u, w } = planeFrame(input);
  const d = createPoint(p.x - origin.x, p.a - origin.a, p.c - origin.c);
  return [d.x * u.x + d.a * u.a + d.c * u.c, d.x * w.x + d.a * w.a + d.c * w.c];
}

export function fromPlane(input: ConicInput, s: number, t: number): Point {
  const { origin, u, w } = planeFrame(input);
  return createPoint(
    origin.x + s * u.x + t * w.x,
    origin.a + s * u.a + t * w.a,
    origin.c + s * u.c + t * w.c,
  );
}

const fmt = (v: number): string => {
  const r = Math.round(v * 10) / 10;
  return String(Math.abs(r) < 0.05 ? 0 : r).replace('.', '{,}');
};

/** Tipo, excentricidad y ecuación canónica de la sección. */
export function classify(input: ConicInput): Canonical {
  const beta = 90 - input.theta;
  const alpha = input.alpha;
  const e = Math.cos(beta * DEG) / Math.cos(alpha * DEG);
  const k = Math.tan(alpha * DEG);
  const t = input.theta * DEG;
  // En el plano: A·s² + 2B·s + t² = k²h², con A = cos²θ − k² sen²θ y B = k² h sen θ.
  const A = Math.cos(t) ** 2 - k * k * Math.sin(t) ** 2;
  const B = k * k * input.h * Math.sin(t);
  const base = { beta, alpha, e };

  if (Math.abs(input.h) < 1e-6) {
    return {
      ...base,
      type: 'degenerada',
      center: [0, 0],
      a: 0,
      b: 0,
      foci: [],
      latex:
        beta > alpha + TOL_DEG
          ? 'x^2 + y^2 = 0'
          : beta < alpha - TOL_DEG
            ? 'y^2 - m^2x^2 = 0'
            : 'y^2 = 0',
      why:
        beta > alpha + TOL_DEG
          ? 'El plano pasa por el vértice sin cortar otras generatrices: la sección es un punto.'
          : beta < alpha - TOL_DEG
            ? 'El plano pasa por el vértice y corta al cono en dos generatrices.'
            : 'El plano pasa por el vértice y es tangente al cono: una sola generatriz.',
    };
  }

  if (Math.abs(beta - 90) <= TOL_DEG) {
    const r = Math.abs(k * input.h);
    return {
      ...base,
      e: 0,
      type: 'circunferencia',
      center: [0, 0],
      a: r,
      b: r,
      foci: [[0, 0]],
      latex: `x^2 + y^2 = ${fmt(r)}^2`,
      why: 'El plano es perpendicular al eje: corta a todas las generatrices a la misma distancia del vértice.',
    };
  }

  if (Math.abs(beta - alpha) <= TOL_DEG || Math.abs(A) < 1e-9) {
    // A ≈ 0: 2B·s + t² = k²h² → s = s₀ − t²/(2B), vértice en s₀ = k²h²/(2B).
    const s0 = (k * k * input.h * input.h) / (2 * B);
    const p = Math.abs(B); // t² = 2p·(distancia al vértice)
    const dir = B > 0 ? -1 : 1; // hacia dónde se abre (en s)
    return {
      ...base,
      e: 1,
      type: 'parábola',
      center: [s0, 0],
      a: p,
      b: 0,
      foci: [[s0 + (dir * p) / 2, 0]],
      latex: `y^2 = 2 \\cdot ${fmt(p)}\\, x`,
      why: 'El plano es paralelo a una generatriz: corta a una sola hoja y la curva no se cierra.',
    };
  }

  const s0 = -B / A;
  const R = k * k * input.h * input.h + (B * B) / A;
  const as2 = R / A; // semieje² a lo largo de s
  const bt2 = R; // semieje² a lo largo de t
  if (beta > alpha) {
    const a = Math.sqrt(Math.abs(as2));
    const b = Math.sqrt(Math.abs(bt2));
    const big = Math.max(a, b);
    const small = Math.min(a, b);
    const c = Math.sqrt(big * big - small * small);
    const foci: [number, number][] =
      a >= b
        ? [
            [s0 - c, 0],
            [s0 + c, 0],
          ]
        : [
            [s0, -c],
            [s0, c],
          ];
    return {
      ...base,
      type: 'elipse',
      center: [s0, 0],
      a,
      b,
      foci,
      latex: `\\frac{x^2}{${fmt(a)}^2} + \\frac{y^2}{${fmt(b)}^2} = 1`,
      why: 'El plano forma con el eje un ángulo mayor que la generatriz: corta a todas las generatrices de una hoja.',
    };
  }
  // Hipérbola: el eje real va a lo largo de s.
  const a = Math.sqrt(Math.abs(as2));
  const b = Math.sqrt(Math.abs(bt2));
  const c = Math.sqrt(a * a + b * b);
  return {
    ...base,
    type: 'hipérbola',
    center: [s0, 0],
    a,
    b,
    foci: [
      [s0 - c, 0],
      [s0 + c, 0],
    ],
    latex: `\\frac{x^2}{${fmt(a)}^2} - \\frac{y^2}{${fmt(b)}^2} = 1`,
    why: 'El plano forma con el eje un ángulo menor que la generatriz: corta a las dos hojas del cono.',
  };
}

/**
 * Puntos de la curva de intersección: donde el plano corta a cada generatriz del cono doble,
 * hasta la altura `height` de cada hoja. Devuelve tramos continuos (la hipérbola, dos).
 */
export function intersectionCurve(input: ConicInput, height: number, samples = 360): Point[][] {
  const al = input.alpha * DEG;
  const n = planeNormal(input.theta);
  const d = n.c * input.h; // n·P₀ con P₀ = (0, 0, h)
  const pieces: Point[][] = [];
  let current: Point[] = [];
  for (let i = 0; i <= samples; i++) {
    const phi = (2 * Math.PI * i) / samples;
    // Generatriz: dirección g; la recta V + λ·g recorre las dos hojas (λ < 0, la de abajo).
    const g = createPoint(Math.sin(al) * Math.cos(phi), Math.sin(al) * Math.sin(phi), Math.cos(al));
    const den = n.x * g.x + n.a * g.a + n.c * g.c;
    const lambda = Math.abs(den) < 1e-12 ? Infinity : d / den;
    const p = createPoint(g.x * lambda, g.a * lambda, g.c * lambda);
    const inside = Number.isFinite(lambda) && Math.abs(p.c) <= height;
    const last = current[current.length - 1];
    // Un salto de hoja (λ cambia de signo) también parte la curva.
    const jump = last !== undefined && Math.sign(last.c) !== Math.sign(p.c);
    if (!inside || jump) {
      if (current.length > 1) pieces.push(current);
      current = inside ? [p] : [];
    } else {
      current.push(p);
    }
  }
  if (current.length > 1) pieces.push(current);
  // Si la curva es cerrada (elipse), se une el último tramo con el primero.
  if (pieces.length > 1) {
    const first = pieces[0] as Point[];
    const lastPiece = pieces[pieces.length - 1] as Point[];
    const a = first[0] as Point;
    const b = lastPiece[lastPiece.length - 1] as Point;
    if (Math.hypot(a.x - b.x, a.a - b.a, a.c - b.c) < 3) {
      pieces[0] = [...lastPiece, ...first];
      pieces.pop();
    }
  }
  return pieces;
}
