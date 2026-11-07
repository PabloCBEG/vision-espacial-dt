// Matemática de los métodos diédricos: abatimiento, giro y cambio de plano, y sus
// aplicaciones (verdaderas magnitudes, distancias y ángulos). Sin Three.js ni DOM.
//
// Convenciones de CLAUDE.md: P(x, a, c) en mm. En la lámina, la proyección horizontal de P
// está en (x, −a) y la vertical en (x, c), con la LT sobre el eje x.
import {
  createLine,
  createPlane,
  type Plane,
  type Point,
  type SheetPoint,
} from '../../geometry/index.ts';
import {
  add,
  createPoint,
  cross,
  distance,
  dot,
  length,
  normalize,
  scale,
  sub,
} from '../../geometry/vector.ts';

const EPS = 1e-9;
const DEG = Math.PI / 180;

export const toDeg = (rad: number): number => rad / DEG;
export const toRad = (deg: number): number => deg * DEG;

// ---------- Giro alrededor de un eje cualquiera ----------

/** Gira p un ángulo (radianes) alrededor del eje que pasa por `origin` con dirección `axis`. */
export function rotateAboutAxis(p: Point, origin: Point, axis: Point, angle: number): Point {
  const k = normalize(axis);
  const v = sub(p, origin);
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  // Fórmula de Rodrigues.
  const rotated = add(add(scale(v, cos), scale(cross(k, v), sin)), scale(k, dot(k, v) * (1 - cos)));
  return add(origin, rotated);
}

// ---------- Giro: eje vertical o de punta ----------

export type AxisKind = 'vertical' | 'punta';

/** Dirección del eje: vertical (perpendicular al PH) o de punta (perpendicular al PV). */
export function axisDirection(kind: AxisKind): Point {
  return kind === 'vertical' ? createPoint(0, 0, 1) : createPoint(0, 1, 0);
}

/** Entre θ y θ ± π, el de menor valor absoluto (el giro más corto). */
function shortest(theta: number): number {
  let t = theta;
  while (t > Math.PI / 2) t -= Math.PI;
  while (t < -Math.PI / 2) t += Math.PI;
  return t;
}

/**
 * Ángulo de giro que deja el segmento AB:
 * - eje vertical → paralelo al PV (frontal): A″₁B″₁ en verdadera magnitud.
 * - eje de punta → paralelo al PH (horizontal): A′₁B′₁ en verdadera magnitud.
 */
export function straighteningAngle(kind: AxisKind, A: Point, B: Point): number {
  const d = sub(B, A);
  // Giro alrededor de c: (dx, da) gira; se quiere da = 0. Alrededor de a: (dc, dx); se quiere dc = 0.
  return kind === 'vertical' ? shortest(Math.atan2(-d.a, d.x)) : shortest(Math.atan2(d.c, d.x));
}

export function rotateAboutAxisKind(
  p: Point,
  kind: AxisKind,
  through: Point,
  angle: number,
): Point {
  return rotateAboutAxis(p, through, axisDirection(kind), angle);
}

// ---------- Cambio de plano ----------

export type ChangeKind = 'vertical' | 'horizontal';

/**
 * Nueva LT en la lámina, dada por dos puntos.
 * - Cambio vertical (nuevo PV₁ ⟂ PH): la LT₁ se dibuja sobre la planta; P′ no cambia.
 * - Cambio horizontal (nuevo PH₁ ⟂ PV): la LT₁ se dibuja sobre el alzado; P″ no cambia.
 */
export interface NewGroundLine {
  readonly kind: ChangeKind;
  readonly p1: SheetPoint;
  readonly p2: SheetPoint;
}

export function sheetH(p: Point): SheetPoint {
  return { x: p.x, y: -p.a };
}

export function sheetV(p: Point): SheetPoint {
  return { x: p.x, y: p.c };
}

function footOnSheetLine(q: SheetPoint, p1: SheetPoint, p2: SheetPoint): SheetPoint {
  const ux = p2.x - p1.x;
  const uy = p2.y - p1.y;
  const t = ((q.x - p1.x) * ux + (q.y - p1.y) * uy) / (ux * ux + uy * uy);
  return { x: p1.x + ux * t, y: p1.y + uy * t };
}

/**
 * Lado de la LT₁ hacia el que va la nueva proyección: el contrario al de la proyección que
 * se conserva. Devuelve la normal unitaria (en la lámina) que apunta hacia ese lado.
 */
export function newProjectionSide(lt: NewGroundLine, kept: SheetPoint): SheetPoint {
  const ux = lt.p2.x - lt.p1.x;
  const uy = lt.p2.y - lt.p1.y;
  const len = Math.hypot(ux, uy);
  let nx = -uy / len;
  let ny = ux / len;
  const side = (kept.x - lt.p1.x) * nx + (kept.y - lt.p1.y) * ny;
  if (side > 0) {
    nx = -nx;
    ny = -ny;
  }
  return { x: nx, y: ny };
}

/**
 * Proyección nueva de P tras el cambio de plano, en la lámina:
 * - vertical: P″₁ a distancia c (la cota se conserva) de la LT₁, al otro lado de P′.
 * - horizontal: P′₁ a distancia a (el alejamiento se conserva) de la LT₁, al otro lado de P″.
 * `side` es la normal de newProjectionSide calculada con la figura entera (igual para todos sus
 * puntos, para que un punto con cota negativa caiga al otro lado).
 */
export function changedProjection(p: Point, lt: NewGroundLine, side: SheetPoint): SheetPoint {
  const kept = lt.kind === 'vertical' ? sheetH(p) : sheetV(p);
  const foot = footOnSheetLine(kept, lt.p1, lt.p2);
  const d = lt.kind === 'vertical' ? p.c : p.a;
  return { x: foot.x + side.x * d, y: foot.y + side.y * d };
}

/** Pie de la proyección conservada sobre la LT₁ (donde corta la línea de referencia). */
export function changeFoot(p: Point, lt: NewGroundLine): SheetPoint {
  const kept = lt.kind === 'vertical' ? sheetH(p) : sheetV(p);
  return footOnSheetLine(kept, lt.p1, lt.p2);
}

/**
 * LT₁ paralela al segmento A′B′ (cambio vertical) o A″B″ (cambio horizontal), a `offset` mm,
 * del lado contrario a la LT original si es posible, para que no se crucen los trazados.
 */
export function parallelGroundLine(
  kind: ChangeKind,
  A: Point,
  B: Point,
  offset = 14,
): NewGroundLine {
  const pa = kind === 'vertical' ? sheetH(A) : sheetV(A);
  const pb = kind === 'vertical' ? sheetH(B) : sheetV(B);
  let ux = pb.x - pa.x;
  let uy = pb.y - pa.y;
  const len = Math.hypot(ux, uy);
  if (len < EPS) {
    ux = 1;
    uy = 0;
  } else {
    ux /= len;
    uy /= len;
  }
  // Normal hacia fuera de la LT original (y = 0): planta hacia abajo, alzado hacia arriba.
  let nx = -uy;
  let ny = ux;
  const outward = kind === 'vertical' ? -1 : 1;
  if (ny * outward < 0 || (Math.abs(ny) < EPS && nx < 0)) {
    nx = -nx;
    ny = -ny;
  }
  const mid = { x: (pa.x + pb.x) / 2 + nx * offset, y: (pa.y + pb.y) / 2 + ny * offset };
  const half = Math.max(len / 2 + 18, 30);
  return {
    kind,
    p1: { x: mid.x - ux * half, y: mid.y - uy * half },
    p2: { x: mid.x + ux * half, y: mid.y + uy * half },
  };
}

/**
 * Plano de proyección nuevo en el espacio (para la vista 3D): pasa por la LT₁ y es
 * perpendicular al PH (cambio vertical) o al PV (cambio horizontal).
 * Devuelve el origen en la LT₁, la dirección de la LT₁ y la normal hacia la figura.
 */
export function newPlaneFrame(lt: NewGroundLine): { origin: Point; along: Point; normal: Point } {
  const toSpace = (s: SheetPoint): Point =>
    lt.kind === 'vertical' ? createPoint(s.x, -s.y, 0) : createPoint(s.x, 0, s.y);
  const o = toSpace(lt.p1);
  const along = normalize(sub(toSpace(lt.p2), o));
  const up = lt.kind === 'vertical' ? createPoint(0, 0, 1) : createPoint(0, 1, 0);
  return { origin: o, along, normal: normalize(cross(up, along)) };
}

/** Pie de P sobre el plano nuevo, en el espacio (proyección P″₁ o P′₁ antes de abatirlo). */
export function projectOntoNewPlane(p: Point, lt: NewGroundLine): Point {
  const { origin, normal } = newPlaneFrame(lt);
  return sub(p, scale(normal, dot(sub(p, origin), normal)));
}

// ---------- Abatimiento de un plano sobre el PH o el PV ----------

export type FoldTarget = 'PH' | 'PV';

export interface Hinge {
  /** Punto de la charnela (traza del plano sobre el PH o el PV). */
  readonly origin: Point;
  /** Dirección unitaria de la charnela. */
  readonly direction: Point;
  /** Ángulo de giro (radianes, con signo) que deja el plano sobre el plano de proyección. */
  readonly angle: number;
}

/**
 * Charnela y ángulo para abatir el plano α sobre el PH (alrededor de α₁) o sobre el PV
 * (alrededor de α₂). Se elige el giro más corto, el habitual en la lámina: el punto abatido
 * queda en la perpendicular a la charnela por su proyección, más allá de ella.
 * Devuelve null si el plano ya es paralelo a ese plano de proyección (no hay charnela).
 */
export function hingeFor(alpha: Plane, target: FoldTarget): Hinge | null {
  const n = alpha.normal;
  // Dirección de la charnela: común al plano α y al plano de proyección.
  const projNormal = target === 'PH' ? createPoint(0, 0, 1) : createPoint(0, 1, 0);
  const dirRaw = cross(n, projNormal);
  if (length(dirRaw) < 1e-9) return null;
  const direction = normalize(dirRaw);
  // Un punto de la charnela: en α con c = 0 (PH) o a = 0 (PV).
  const origin = pointOnPlaneAndProjection(alpha, target, direction);
  // v: dirección dentro de α perpendicular a la charnela. w: dirección en el plano de
  // proyección perpendicular a la charnela, la más cercana a v (giro más corto).
  const v = normalize(cross(direction, n));
  const inProj = target === 'PH' ? createPoint(v.x, v.a, 0) : createPoint(v.x, 0, v.c);
  let w: Point;
  if (length(inProj) > 1e-9) {
    w = normalize(inProj);
  } else {
    // Plano perpendicular al de proyección: se abate hacia delante (PH) o hacia arriba (PV).
    w = normalize(cross(projNormal, direction));
    const preferred = target === 'PH' ? w.a : w.c;
    if (preferred < 0 || (Math.abs(preferred) < EPS && w.x < 0)) w = scale(w, -1);
  }
  // Ángulo con signo que lleva v hasta w girando alrededor de la charnela.
  const angle = Math.atan2(dot(cross(v, w), direction), dot(v, w));
  return { origin, direction, angle };
}

function pointOnPlaneAndProjection(alpha: Plane, target: FoldTarget, direction: Point): Point {
  // Resolver n·X = n·p1 con X en el plano de proyección y X ⟂ direction (el más cercano al origen).
  const n = alpha.normal;
  const d = dot(n, alpha.p1);
  // En el plano de proyección, la dirección perpendicular a la charnela.
  const projNormal = target === 'PH' ? createPoint(0, 0, 1) : createPoint(0, 1, 0);
  const across = cross(projNormal, direction);
  // X = s·across ⇒ s = d / (n·across).
  const s = d / dot(n, across);
  return scale(across, s);
}

/** Posición de p mientras el plano gira alrededor de la charnela (t de 0 a 1). */
export function foldPoint(p: Point, hinge: Hinge, t: number): Point {
  return rotateAboutAxis(p, hinge.origin, hinge.direction, hinge.angle * t);
}

/** Pie de p sobre la charnela: centro del arco de abatimiento. */
export function hingeFoot(p: Point, hinge: Hinge): Point {
  const v = sub(p, hinge.origin);
  return add(hinge.origin, scale(hinge.direction, dot(v, hinge.direction)));
}

/** Plano proyectante que contiene el segmento AB: vertical (sobre PH) o de canto (sobre PV). */
export function projectingPlane(A: Point, B: Point, target: FoldTarget): Plane | null {
  const extra = add(A, target === 'PH' ? createPoint(0, 0, 10) : createPoint(0, 10, 0));
  const n = cross(sub(B, A), sub(extra, A));
  if (length(n) < EPS) return null;
  return createPlane(A, B, extra);
}

// ---------- Aplicaciones: distancias y ángulos ----------

/** Pie de la perpendicular desde p al plano α. */
export function footOnPlane(p: Point, alpha: Plane): Point {
  const n = alpha.normal;
  return sub(p, scale(n, dot(sub(p, alpha.p1), n)));
}

/** Pie de la perpendicular desde p a la recta AB. */
export function footOnLine(p: Point, A: Point, B: Point): Point {
  const u = normalize(sub(B, A));
  return add(A, scale(u, dot(sub(p, A), u)));
}

/** Intersección de la recta AB con el plano α, o null si son paralelos. */
export function linePlaneIntersection(A: Point, B: Point, alpha: Plane): Point | null {
  const d = sub(B, A);
  const den = dot(alpha.normal, d);
  if (Math.abs(den) < EPS) return null;
  const t = dot(alpha.normal, sub(alpha.p1, A)) / den;
  return add(A, scale(d, t));
}

/** Ángulo (grados) de la recta AB con el PH. */
export function angleWithPH(A: Point, B: Point): number {
  const d = sub(B, A);
  return toDeg(Math.asin(Math.min(1, Math.abs(d.c) / length(d))));
}

/** Ángulo (grados) de la recta AB con el PV. */
export function angleWithPV(A: Point, B: Point): number {
  const d = sub(B, A);
  return toDeg(Math.asin(Math.min(1, Math.abs(d.a) / length(d))));
}

/** Ángulo (grados) en el vértice V entre VA y VB (de 0° a 180°). */
export function angleAt(V: Point, A: Point, B: Point): number {
  const u = sub(A, V);
  const w = sub(B, V);
  const cos = dot(u, w) / (length(u) * length(w));
  return toDeg(Math.acos(Math.max(-1, Math.min(1, cos))));
}

/** Ángulo (grados) de la recta AB con el plano α (de 0° a 90°). */
export function angleLinePlane(A: Point, B: Point, alpha: Plane): number {
  const d = normalize(sub(B, A));
  return toDeg(Math.asin(Math.min(1, Math.abs(dot(d, alpha.normal)))));
}

export { distance };

// ---------- Recta con un ángulo dado: el cono ----------

/**
 * Cono de rectas que pasan por V y forman el ángulo φ con el PH (o con el PV).
 * La base es la circunferencia donde las generatrices cortan el plano de proyección.
 */
export interface Cone {
  readonly apex: Point;
  readonly center: Point;
  readonly radius: number;
  readonly target: FoldTarget;
}

export function coneOfLines(V: Point, angleDeg: number, target: FoldTarget): Cone | null {
  const height = target === 'PH' ? V.c : V.a;
  if (Math.abs(height) < EPS || angleDeg <= 0 || angleDeg >= 90) return null;
  const radius = Math.abs(height) / Math.tan(toRad(angleDeg));
  const center = target === 'PH' ? createPoint(V.x, V.a, 0) : createPoint(V.x, 0, V.c);
  return { apex: V, center, radius, target };
}

/** Punto de la base del cono en la dirección `azimuthDeg` (0° hacia x positiva). */
export function conePoint(cone: Cone, azimuthDeg: number): Point {
  const t = toRad(azimuthDeg);
  const { center: o, radius: r } = cone;
  return cone.target === 'PH'
    ? createPoint(o.x + r * Math.cos(t), o.a + r * Math.sin(t), 0)
    : createPoint(o.x + r * Math.cos(t), 0, o.c + r * Math.sin(t));
}

/** Plano tangente al cono por la generatriz que acaba en `base`: forma el ángulo φ dado. */
export function tangentPlane(cone: Cone, base: Point): Plane {
  const radial = sub(base, cone.center);
  const normalProj = cone.target === 'PH' ? createPoint(0, 0, 1) : createPoint(0, 1, 0);
  const tangent = cross(normalProj, radial);
  return createPlane(cone.apex, base, add(base, tangent));
}

export { createLine };
