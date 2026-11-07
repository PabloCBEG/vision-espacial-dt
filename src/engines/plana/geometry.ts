// Geometría plana con regla y compás: puntos, rectas, circunferencias y arcos en la lámina
// (x a la derecha, y hacia arriba, en mm). Sin Three.js ni DOM.

export interface Pt {
  readonly x: number;
  readonly y: number;
}

/** Recta infinita: punto y dirección unitaria. */
export interface Line2 {
  readonly p: Pt;
  readonly d: Pt;
}

export interface Circle {
  readonly c: Pt;
  readonly r: number;
}

/** Arco de circunferencia en sentido antihorario de a0 a a1 (radianes, a1 > a0). */
export interface Arc extends Circle {
  readonly a0: number;
  readonly a1: number;
}

export const EPS = 1e-9;
/** Tolerancia para decidir tangencia (mm). */
export const TANGENCY_MM = 1e-6;

export const pt = (x: number, y: number): Pt => ({ x, y });
export const add = (u: Pt, v: Pt): Pt => pt(u.x + v.x, u.y + v.y);
export const sub = (u: Pt, v: Pt): Pt => pt(u.x - v.x, u.y - v.y);
export const mul = (u: Pt, k: number): Pt => pt(u.x * k, u.y * k);
export const dot = (u: Pt, v: Pt): number => u.x * v.x + u.y * v.y;
export const cross = (u: Pt, v: Pt): number => u.x * v.y - u.y * v.x;
export const len = (u: Pt): number => Math.hypot(u.x, u.y);
export const dist = (u: Pt, v: Pt): number => len(sub(u, v));
export const perp = (u: Pt): Pt => pt(-u.y, u.x);
export const mid = (u: Pt, v: Pt): Pt => pt((u.x + v.x) / 2, (u.y + v.y) / 2);

export function unit(u: Pt): Pt | null {
  const l = len(u);
  return l < EPS ? null : mul(u, 1 / l);
}

export function lineThrough(a: Pt, b: Pt): Line2 | null {
  const d = unit(sub(b, a));
  return d ? { p: a, d } : null;
}

/** Parámetro de la proyección de q sobre la recta (en mm desde l.p). */
export const along = (l: Line2, q: Pt): number => dot(sub(q, l.p), l.d);
export const at = (l: Line2, t: number): Pt => add(l.p, mul(l.d, t));
export const foot = (l: Line2, q: Pt): Pt => at(l, along(l, q));
export const distToLine = (l: Line2, q: Pt): number => Math.abs(cross(l.d, sub(q, l.p)));

// ---------- Construcciones ----------

export function perpendicular(l: Line2, through: Pt): Line2 {
  return { p: through, d: perp(l.d) };
}

export function parallel(l: Line2, through: Pt): Line2 {
  return { p: through, d: l.d };
}

/** Mediatriz del segmento AB (null si A y B coinciden). */
export function mediatrix(a: Pt, b: Pt): Line2 | null {
  const d = unit(sub(b, a));
  return d ? { p: mid(a, b), d: perp(d) } : null;
}

/** Bisectriz del ángulo AVB (la interior). */
export function angleBisector(a: Pt, v: Pt, b: Pt): Line2 | null {
  const u = unit(sub(a, v));
  const w = unit(sub(b, v));
  if (!u || !w) return null;
  const s = add(u, w);
  const d = unit(s) ?? perp(u); // ángulo llano: la bisectriz es la perpendicular
  return { p: v, d };
}

/**
 * Bisectrices de dos rectas: índice 0 y 1 (perpendiculares entre sí). Si son paralelas, la
 * «bisectriz» es la paralela media (índice 0) y no hay índice 1.
 */
export function linesBisector(r: Line2, s: Line2, index: 0 | 1): Line2 | null {
  const x = intersectLines(r, s);
  if (!x) {
    if (index === 1) return null;
    const m = mid(r.p, foot(s, r.p));
    return { p: m, d: r.d };
  }
  const sd = dot(r.d, s.d) < 0 ? mul(s.d, -1) : s.d;
  const d0 = unit(add(r.d, sd)) ?? perp(r.d);
  return { p: x, d: index === 0 ? d0 : perp(d0) };
}

// ---------- Intersecciones ----------

export function intersectLines(r: Line2, s: Line2): Pt | null {
  const den = cross(r.d, s.d);
  if (Math.abs(den) < EPS) return null; // paralelas (o la misma recta)
  const t = cross(sub(s.p, r.p), s.d) / den;
  return at(r, t);
}

/** Puntos de corte de recta y circunferencia (0, 1 si es tangente, o 2), ordenados a lo largo de la recta. */
export function intersectLineCircle(l: Line2, c: Circle): Pt[] {
  const f = foot(l, c.c);
  const h = dist(f, c.c);
  if (h > c.r + TANGENCY_MM) return [];
  if (Math.abs(h - c.r) <= TANGENCY_MM) return [f];
  const k = Math.sqrt(c.r * c.r - h * h);
  return [add(f, mul(l.d, -k)), add(f, mul(l.d, k))];
}

/** Puntos de corte de dos circunferencias (0, 1 si son tangentes, o 2). */
export function intersectCircles(a: Circle, b: Circle): Pt[] {
  const d = dist(a.c, b.c);
  if (d < EPS) return []; // concéntricas
  if (d > a.r + b.r + TANGENCY_MM || d < Math.abs(a.r - b.r) - TANGENCY_MM) return [];
  const u = mul(sub(b.c, a.c), 1 / d);
  const x = (d * d + a.r * a.r - b.r * b.r) / (2 * d);
  const base = add(a.c, mul(u, x));
  const h2 = a.r * a.r - x * x;
  if (h2 <= TANGENCY_MM * Math.max(1, a.r)) return [base];
  const h = Math.sqrt(h2);
  // Primero el que queda a la izquierda de a→b.
  return [add(base, mul(perp(u), h)), add(base, mul(perp(u), -h))];
}

// ---------- Tangentes, potencia y eje radical ----------

/** Puntos de tangencia de las tangentes desde P a la circunferencia (0, 1 o 2). */
export function tangentPoints(p: Pt, c: Circle): Pt[] {
  const d = dist(p, c.c);
  if (d < c.r - TANGENCY_MM) return []; // P dentro
  if (Math.abs(d - c.r) <= TANGENCY_MM) return [p]; // P en la circunferencia
  // Arco capaz de 90°: circunferencia de diámetro P–centro.
  return intersectCircles(c, { c: mid(p, c.c), r: d / 2 });
}

/** Potencia de P respecto a la circunferencia: d² − r². */
export function power(p: Pt, c: Circle): number {
  const d = dist(p, c.c);
  return d * d - c.r * c.r;
}

/** Eje radical de dos circunferencias (null si son concéntricas). */
export function radicalAxis(a: Circle, b: Circle): Line2 | null {
  const d = dist(a.c, b.c);
  if (d < EPS) return null;
  const u = mul(sub(b.c, a.c), 1 / d);
  const x = (d * d + a.r * a.r - b.r * b.r) / (2 * d);
  return { p: add(a.c, mul(u, x)), d: perp(u) };
}

/** Centro radical de tres circunferencias (null si los centros están alineados). */
export function radicalCenter(a: Circle, b: Circle, c: Circle): Pt | null {
  const e1 = radicalAxis(a, b);
  const e2 = radicalAxis(b, c);
  return e1 && e2 ? intersectLines(e1, e2) : null;
}

// ---------- Arco capaz ----------

/**
 * Arco capaz del segmento AB para el ángulo φ (0° < φ < 180°): puntos P con ∠APB = φ,
 * del lado indicado (1: a la izquierda de A→B; −1: a la derecha).
 */
export function capableArc(a: Pt, b: Pt, angleDeg: number, side: 1 | -1 = 1): Arc | null {
  const ab = dist(a, b);
  if (ab < EPS || angleDeg <= 0 || angleDeg >= 180) return null;
  const phi = (angleDeg * Math.PI) / 180;
  const r = ab / (2 * Math.sin(phi));
  const u = mul(sub(b, a), 1 / ab);
  // El centro está en la mediatriz, del mismo lado que el arco si φ < 90°.
  const offset = ab / 2 / Math.tan(phi);
  const c = add(mid(a, b), mul(perp(u), offset * side));
  const angA = Math.atan2(a.y - c.y, a.x - c.x);
  const angB = Math.atan2(b.y - c.y, b.x - c.x);
  // De los dos arcos entre A y B, el que queda del lado pedido.
  let a0 = angB;
  let a1 = angA;
  while (a1 <= a0) a1 += 2 * Math.PI;
  const probe = (a0 + a1) / 2;
  const q = pt(c.x + r * Math.cos(probe), c.y + r * Math.sin(probe));
  if (Math.sign(cross(sub(b, a), sub(q, a))) !== side) {
    a0 = angA;
    a1 = angB;
    while (a1 <= a0) a1 += 2 * Math.PI;
  }
  return { c, r, a0, a1 };
}

export function arcPoint(arc: Arc, t: number): Pt {
  const a = arc.a0 + (arc.a1 - arc.a0) * t;
  return pt(arc.c.x + arc.r * Math.cos(a), arc.c.y + arc.r * Math.sin(a));
}

/** ¿Está el ángulo `angle` dentro del arco? */
export function onArc(arc: Arc, angle: number): boolean {
  let a = angle;
  while (a < arc.a0 - 1e-9) a += 2 * Math.PI;
  while (a > arc.a0 + 2 * Math.PI) a -= 2 * Math.PI;
  return a <= arc.a1 + 1e-9;
}

/** Ángulo AVB en grados (0 a 180). */
export function angleAt(a: Pt, v: Pt, b: Pt): number {
  const u = sub(a, v);
  const w = sub(b, v);
  const c = dot(u, w) / (len(u) * len(w));
  return (Math.acos(Math.max(-1, Math.min(1, c))) * 180) / Math.PI;
}
