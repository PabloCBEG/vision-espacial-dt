// Puente 3D de la homología y la afinidad: una figura plana y su sombra sobre otro plano.
// - Homología: la luz sale de un foco puntual V. Afinidad: luz paralela (el sol).
// - El plano de la sombra gira alrededor del eje (la recta común a los dos planos) hasta caer
//   sobre el de la figura: la sombra abatida es la figura homóloga en la lámina.
// La lámina (x, y) se coloca en 3D como un plano horizontal: P(x, a = −y, c = 0), así la
// vista superior coincide con la lámina. Sin Three.js ni DOM.
import { createPoint, type Point } from '../../geometry/index.ts';
import { add, cross, dot, normalize, scale, sub } from '../../geometry/vector.ts';
import { rotateAboutAxis } from '../metodos/geometry.ts';
import { intersectLines, lineThrough, pt, type Pt } from './geometry.ts';

export const toSpace = (p: Pt): Point => createPoint(p.x, -p.y, 0);
export const toSheet = (p: Point): Pt => pt(p.x, -p.a);

export interface BridgeInput {
  readonly kind: 'homologia' | 'afinidad';
  readonly figure: readonly Pt[];
  readonly axis: readonly [Pt, Pt];
  readonly angleDeg: number;
  /** Foco (homología) o dirección de la luz (afinidad), como (x, y, altura). */
  readonly light: readonly [number, number, number];
}

export interface BridgeScene {
  /** Figura en 3D (sobre el plano de la figura). */
  readonly figure: readonly Point[];
  /** Sombra sobre el plano de la sombra, girado `t` de su posición (0: en su sitio; 1: abatido). */
  readonly shadow: readonly Point[];
  /** Foco en 3D (solo homología). */
  readonly focus: Point | null;
  /** Dirección de la luz (afinidad). */
  readonly direction: Point | null;
  readonly axis: readonly [Point, Point];
  /** Ángulo de giro del plano de la sombra para caer sobre el de la figura. */
  readonly angle: number;
  /** Normal del plano de la sombra en su sitio. */
  readonly shadowNormal: Point;
}

/** Sombra en su sitio y la función que la abate. Devuelve null si la luz no da sombra. */
export function buildBridge(input: BridgeInput, t: number): BridgeScene | null {
  const [e1, e2] = input.axis.map(toSpace) as [Point, Point];
  const axisDir = normalize(sub(e2, e1));
  // Plano de la figura: c = 0, normal hacia arriba. Plano de la sombra: el de la figura
  // girado `angleDeg` alrededor del eje.
  const up = createPoint(0, 0, 1);
  const theta = (input.angleDeg * Math.PI) / 180;
  const shadowNormal = rotateAboutAxis(up, createPoint(0, 0, 0), axisDir, theta);
  const [lx, ly, lh] = input.light;
  const focus = input.kind === 'homologia' ? createPoint(lx, -ly, lh) : null;
  const direction = input.kind === 'afinidad' ? normalize(createPoint(lx, -ly, lh)) : null;

  const shadow: Point[] = [];
  for (const q of input.figure) {
    const P = toSpace(q);
    // Rayo de luz por P: desde el foco, o con la dirección del sol.
    const d = focus ? sub(P, focus) : (direction as Point);
    const den = dot(shadowNormal, d);
    if (Math.abs(den) < 1e-9) return null; // el rayo es paralelo al plano de la sombra
    const s = dot(shadowNormal, sub(e1, P)) / den;
    shadow.push(add(P, scale(d, s)));
  }
  // Para abatir el plano de la sombra sobre el de la figura se gira −θ alrededor del eje.
  const angle = -theta;
  const rotated = shadow.map((p) => rotateAboutAxis(p, e1, axisDir, angle * t));
  return {
    figure: input.figure.map(toSpace),
    shadow: rotated,
    focus,
    direction,
    axis: [e1, e2],
    angle,
    shadowNormal,
  };
}

/** Figura homóloga en la lámina: la sombra abatida del todo. */
export function homologous(input: BridgeInput): Pt[] | null {
  const scene = buildBridge(input, 1);
  return scene ? scene.shadow.map(toSheet) : null;
}

/**
 * Centro de la homología en la lámina: donde concurren las rectas que unen cada punto con su
 * homólogo. En la afinidad no hay centro (es impropio): devuelve null.
 */
export function homologyCenter(figure: readonly Pt[], image: readonly Pt[]): Pt | null {
  const [p1, p2] = figure;
  const [q1, q2] = image;
  if (!p1 || !p2 || !q1 || !q2) return null;
  const l1 = lineThrough(p1, q1);
  const l2 = lineThrough(p2, q2);
  return l1 && l2 ? intersectLines(l1, l2) : null;
}

export { cross };
