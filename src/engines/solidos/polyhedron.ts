// Sólidos convexos como poliedros: caras planas con sus vértices en coordenadas del dominio
// P(x, a, c). Conos y cilindros se aproximan con muchas caras laterales «lisas»: no se dibujan
// sus aristas, solo el contorno aparente. Sin Three.js ni DOM.
//
// Visibilidad (método exacto para convexos): una cara se ve desde un observador si su normal
// exterior apunta hacia él. Una arista se ve si al menos una de sus dos caras se ve; si no, es
// oculta. Las aristas entre una cara vista y una oculta forman el contorno aparente.
import { createPoint, type Point } from '../../geometry/index.ts';
import { add, cross, dot, length, normalize, scale, sub } from '../../geometry/vector.ts';

const EPS = 1e-7;

export type FaceKind = 'base' | 'top' | 'lateral' | 'cap' | 'face';

export interface Face {
  /** Índice estable de la cara en el sólido original (se conserva al recortar). */
  readonly id: number;
  readonly kind: FaceKind;
  /** Vértices en orden antihorario vistos desde fuera. */
  readonly points: readonly Point[];
  /** Cara lateral de una superficie curva (cono o cilindro). */
  readonly smooth: boolean;
}

export interface Polyhedron {
  readonly faces: readonly Face[];
  /** Vértice del cono o de la pirámide, si lo tiene. */
  readonly apex: Point | null;
  /** Eje: centro de la base y dirección hacia arriba (unitaria). */
  readonly axis: { readonly base: Point; readonly direction: Point } | null;
}

export interface Edge {
  readonly p: Point;
  readonly q: Point;
  /** Las dos caras que comparten la arista (índices en faces). */
  readonly faces: readonly [number, number];
}

// ---------- Utilidades de caras ----------

export function faceNormal(face: Face | readonly Point[]): Point {
  const pts = 'points' in face ? face.points : face;
  // Método de Newell: robusto con polígonos de muchos lados.
  let nx = 0;
  let na = 0;
  let nc = 0;
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i] as Point;
    const q = pts[(i + 1) % pts.length] as Point;
    nx += (p.a - q.a) * (p.c + q.c);
    na += (p.c - q.c) * (p.x + q.x);
    nc += (p.x - q.x) * (p.a + q.a);
  }
  const n = createPoint(nx, na, nc);
  const len = length(n);
  return len < EPS ? createPoint(0, 0, 0) : scale(n, 1 / len);
}

export function centroid(points: readonly Point[]): Point {
  const n = points.length || 1;
  let x = 0;
  let a = 0;
  let c = 0;
  for (const p of points) {
    x += p.x;
    a += p.a;
    c += p.c;
  }
  return createPoint(x / n, a / n, c / n);
}

export function polygonArea(points: readonly Point[]): number {
  let sum = createPoint(0, 0, 0);
  for (let i = 0; i < points.length; i++) {
    const p = points[i] as Point;
    const q = points[(i + 1) % points.length] as Point;
    sum = add(sum, cross(p, q));
  }
  return length(sum) / 2;
}

/** Vértices sin repetir. */
export function vertices(poly: Polyhedron): Point[] {
  const out: Point[] = [];
  for (const face of poly.faces) {
    for (const p of face.points) {
      if (!out.some((q) => near(p, q))) out.push(p);
    }
  }
  return out;
}

export function solidCentroid(poly: Polyhedron): Point {
  return centroid(vertices(poly));
}

const near = (p: Point, q: Point, eps = 1e-5): boolean =>
  Math.abs(p.x - q.x) < eps && Math.abs(p.a - q.a) < eps && Math.abs(p.c - q.c) < eps;

const key = (p: Point): string =>
  `${Math.round(p.x * 1e4)},${Math.round(p.a * 1e4)},${Math.round(p.c * 1e4)}`;

/** Aristas: cada lado de cara compartido por dos caras. */
export function edges(poly: Polyhedron): Edge[] {
  const map = new Map<string, { p: Point; q: Point; faces: number[] }>();
  poly.faces.forEach((face, f) => {
    const pts = face.points;
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i] as Point;
      const q = pts[(i + 1) % pts.length] as Point;
      const kp = key(p);
      const kq = key(q);
      if (kp === kq) continue;
      const k = kp < kq ? `${kp}|${kq}` : `${kq}|${kp}`;
      const entry = map.get(k);
      if (entry) entry.faces.push(f);
      else map.set(k, { p, q, faces: [f] });
    }
  });
  const out: Edge[] = [];
  for (const e of map.values()) {
    const [f0, f1] = e.faces;
    if (f0 !== undefined) out.push({ p: e.p, q: e.q, faces: [f0, f1 ?? f0] });
  }
  return out;
}

/** Orienta cada cara con la normal hacia fuera (lejos del centro del sólido). */
function orient(faces: Face[], inside: Point): Face[] {
  return faces.map((face) => {
    const n = faceNormal(face);
    const outward = dot(n, sub(centroid(face.points), inside)) >= 0;
    return outward ? face : { ...face, points: [...face.points].reverse() };
  });
}

// ---------- Sólidos de la PAU ----------

/** Marco local: u y v en el plano de apoyo, w hacia arriba (fuera del plano de apoyo). */
export interface Frame {
  readonly origin: Point;
  readonly u: Point;
  readonly v: Point;
  readonly w: Point;
}

export function local(frame: Frame, u: number, v: number, w: number): Point {
  return add(frame.origin, add(scale(frame.u, u), add(scale(frame.v, v), scale(frame.w, w))));
}

/**
 * Marco de un sólido apoyado en el PH (o en el PV), centrado en (x, a) (o en (x, c)),
 * con la base girada `turnDeg` alrededor del eje y a la altura `lift` sobre el plano de apoyo.
 */
export function supportFrame(
  support: 'PH' | 'PV',
  center: readonly [number, number],
  turnDeg: number,
  lift = 0,
): Frame {
  const t = (turnDeg * Math.PI) / 180;
  const [cx, cy] = center;
  if (support === 'PH') {
    return {
      origin: createPoint(cx, cy, lift),
      u: createPoint(Math.cos(t), Math.sin(t), 0),
      v: createPoint(-Math.sin(t), Math.cos(t), 0),
      w: createPoint(0, 0, 1),
    };
  }
  return {
    origin: createPoint(cx, lift, cy),
    u: createPoint(Math.cos(t), 0, Math.sin(t)),
    v: createPoint(-Math.sin(t), 0, Math.cos(t)),
    w: createPoint(0, 1, 0),
  };
}

/** Polígono regular de n lados inscrito en una circunferencia de radio r (en el plano u, v). */
function regularPolygon(frame: Frame, n: number, r: number, w: number, phase = 0): Point[] {
  return Array.from({ length: n }, (_, i) => {
    const t = phase + (2 * Math.PI * i) / n;
    return local(frame, r * Math.cos(t), r * Math.sin(t), w);
  });
}

/**
 * Prisma recto regular (o cilindro si `smooth`): base inscrita en radio r, altura h.
 * Las laterales van en orden, la i entre los vértices i e i+1 de la base.
 */
export function prism(frame: Frame, n: number, r: number, h: number, smooth = false): Polyhedron {
  const phase = smooth ? 0 : -Math.PI / 2 + Math.PI / n;
  const bottom = regularPolygon(frame, n, r, 0, phase);
  const top = regularPolygon(frame, n, r, h, phase);
  const faces: Face[] = [
    { id: 0, kind: 'base', points: [...bottom].reverse(), smooth: false },
    { id: 1, kind: 'top', points: top, smooth: false },
  ];
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    faces.push({
      id: 2 + i,
      kind: 'lateral',
      points: [bottom[i] as Point, bottom[j] as Point, top[j] as Point, top[i] as Point],
      smooth,
    });
  }
  return {
    faces: orient(faces, local(frame, 0, 0, h / 2)),
    apex: null,
    axis: { base: frame.origin, direction: frame.w },
  };
}

/** Pirámide recta regular (o cono si `smooth`): base inscrita en radio r, altura h. */
export function pyramid(frame: Frame, n: number, r: number, h: number, smooth = false): Polyhedron {
  const phase = smooth ? 0 : -Math.PI / 2 + Math.PI / n;
  const bottom = regularPolygon(frame, n, r, 0, phase);
  const apex = local(frame, 0, 0, h);
  const faces: Face[] = [{ id: 0, kind: 'base', points: [...bottom].reverse(), smooth: false }];
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    faces.push({
      id: 1 + i,
      kind: 'lateral',
      points: [bottom[i] as Point, bottom[j] as Point, apex],
      smooth,
    });
  }
  return {
    faces: orient(faces, local(frame, 0, 0, h / 4)),
    apex,
    axis: { base: frame.origin, direction: frame.w },
  };
}

/** Tronco de pirámide regular: bases de radios r1 (abajo) y r2 (arriba), altura h. */
export function frustum(frame: Frame, n: number, r1: number, r2: number, h: number): Polyhedron {
  const phase = -Math.PI / 2 + Math.PI / n;
  const bottom = regularPolygon(frame, n, r1, 0, phase);
  const top = regularPolygon(frame, n, r2, h, phase);
  const faces: Face[] = [
    { id: 0, kind: 'base', points: [...bottom].reverse(), smooth: false },
    { id: 1, kind: 'top', points: top, smooth: false },
  ];
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    faces.push({
      id: 2 + i,
      kind: 'lateral',
      points: [bottom[i] as Point, bottom[j] as Point, top[j] as Point, top[i] as Point],
      smooth: false,
    });
  }
  return {
    faces: orient(faces, local(frame, 0, 0, h / 2)),
    apex: null,
    axis: { base: frame.origin, direction: frame.w },
  };
}

/** Tetraedro regular de arista e apoyado en una cara. */
export function tetrahedron(frame: Frame, e: number): Polyhedron {
  const r = e / Math.sqrt(3);
  const h = e * Math.sqrt(2 / 3);
  const poly = pyramid(frame, 3, r, h);
  return { ...poly, faces: poly.faces.map((f) => ({ ...f, kind: 'face' as const })) };
}

/** Cubo (hexaedro) de arista e apoyado en una cara. */
export function cube(frame: Frame, e: number): Polyhedron {
  const poly = prism(frame, 4, e / Math.SQRT2, e);
  return { ...poly, faces: poly.faces.map((f) => ({ ...f, kind: 'face' as const })) };
}

/** Octaedro regular de arista e con una diagonal perpendicular al plano de apoyo. */
export function octahedron(frame: Frame, e: number): Polyhedron {
  const d = e / Math.SQRT2; // media diagonal
  const bottom = local(frame, 0, 0, 0);
  const top = local(frame, 0, 0, 2 * d);
  const ring = regularPolygon(frame, 4, d, d, 0);
  const faces: Face[] = [];
  for (let i = 0; i < 4; i++) {
    const p = ring[i] as Point;
    const q = ring[(i + 1) % 4] as Point;
    faces.push({ id: i, kind: 'face', points: [p, q, top], smooth: false });
    faces.push({ id: 4 + i, kind: 'face', points: [q, p, bottom], smooth: false });
  }
  return {
    faces: orient(faces, local(frame, 0, 0, d)),
    apex: null,
    axis: { base: bottom, direction: frame.w },
  };
}

/** Número de caras laterales con que se aproxima un cono o un cilindro. */
export const SMOOTH_SEGMENTS = 64;

// ---------- Visibilidad ----------

/** Hacia dónde mira el observador de cada vista (vector hacia el observador). */
export type ViewDirection = 'plan' | 'elevation' | 'profile';

export function towardObserver(view: ViewDirection): Point {
  switch (view) {
    case 'plan':
      return createPoint(0, 0, 1); // desde arriba
    case 'elevation':
      return createPoint(0, 1, 0); // desde delante
    case 'profile':
      return createPoint(-1, 0, 0); // desde la izquierda (vista lateral izquierda)
  }
}

export interface ViewEdge {
  readonly p: Point;
  readonly q: Point;
  readonly visible: boolean;
  /** Arista del contorno aparente (entre cara vista y oculta). */
  readonly contour: boolean;
}

/**
 * Aristas que se dibujan en una vista, con su visibilidad. Las de superficies curvas solo
 * aparecen si son contorno aparente. Las caras de canto (normal ⟂ visual) cuentan como vistas.
 */
export function viewEdges(poly: Polyhedron, view: ViewDirection): ViewEdge[] {
  const o = towardObserver(view);
  const facing = poly.faces.map((f) => dot(faceNormal(f), o) > -1e-9);
  const strict = poly.faces.map((f) => dot(faceNormal(f), o) > 1e-9);
  const out: ViewEdge[] = [];
  for (const e of edges(poly)) {
    const [f0, f1] = e.faces;
    const a = poly.faces[f0];
    const b = poly.faces[f1];
    if (!a || !b) continue;
    const contour = strict[f0] !== strict[f1];
    const smooth = a.smooth && b.smooth;
    if (smooth && !contour) continue;
    out.push({ p: e.p, q: e.q, visible: Boolean(facing[f0] || facing[f1]), contour });
  }
  return out;
}

// ---------- Recorte por un plano: secciones y troncos ----------

export interface CutPlane {
  /** Normal unitaria; se conserva el lado n·X ≤ d (el «de abajo»). */
  readonly normal: Point;
  readonly d: number;
}

export function planeThrough(p1: Point, p2: Point, p3: Point): CutPlane | null {
  const n = cross(sub(p2, p1), sub(p3, p1));
  if (length(n) < EPS) return null;
  const normal = normalize(n);
  return { normal, d: dot(normal, p1) };
}

export function flipPlane(plane: CutPlane): CutPlane {
  return { normal: scale(plane.normal, -1), d: -plane.d };
}

const side = (plane: CutPlane, p: Point): number => dot(plane.normal, p) - plane.d;

function clipPolygon(points: readonly Point[], plane: CutPlane): Point[] {
  const out: Point[] = [];
  for (let i = 0; i < points.length; i++) {
    const p = points[i] as Point;
    const q = points[(i + 1) % points.length] as Point;
    const sp = side(plane, p);
    const sq = side(plane, q);
    if (sp <= EPS) out.push(p);
    if ((sp < -EPS && sq > EPS) || (sp > EPS && sq < -EPS)) {
      const t = sp / (sp - sq);
      out.push(add(p, scale(sub(q, p), t)));
    }
  }
  return dedupe(out);
}

function dedupe(points: Point[]): Point[] {
  const out: Point[] = [];
  for (const p of points) {
    const last = out[out.length - 1];
    if (!last || !near(p, last, 1e-6)) out.push(p);
  }
  const first = out[0];
  const last = out[out.length - 1];
  if (out.length > 1 && first && last && near(first, last, 1e-6)) out.pop();
  return out;
}

export interface SectionEdge {
  readonly p: Point;
  readonly q: Point;
  /** Cara del sólido sobre la que está este lado de la sección. */
  readonly face: number;
}

export interface Section {
  /** Polígono de la sección, en orden. */
  readonly polygon: readonly Point[];
  /** Cada lado con la cara del sólido en que está (para su visibilidad). */
  readonly sides: readonly SectionEdge[];
}

/** Sección del sólido por el plano, o null si no lo corta. */
export function section(poly: Polyhedron, plane: CutPlane): Section | null {
  const sides: SectionEdge[] = [];
  poly.faces.forEach((face, f) => {
    const pts: Point[] = [];
    for (let i = 0; i < face.points.length; i++) {
      const p = face.points[i] as Point;
      const q = face.points[(i + 1) % face.points.length] as Point;
      const sp = side(plane, p);
      const sq = side(plane, q);
      if (Math.abs(sp) <= EPS) pts.push(p);
      if ((sp < -EPS && sq > EPS) || (sp > EPS && sq < -EPS)) {
        pts.push(add(p, scale(sub(q, p), sp / (sp - sq))));
      }
    }
    const unique = dedupe(pts);
    if (unique.length === 2) sides.push({ p: unique[0] as Point, q: unique[1] as Point, face: f });
  });
  if (sides.length < 3) return null;
  const polygon = chain(sides);
  if (polygon.length < 3) return null;
  // Orden antihorario visto desde el lado positivo de la normal del plano, empezando por el
  // punto de más a la izquierda (x menor): así la numeración 1, 2, 3… es siempre la misma.
  const n = faceNormal(polygon);
  const ordered = dot(n, plane.normal) >= 0 ? polygon : [...polygon].reverse();
  let first = 0;
  ordered.forEach((p, i) => {
    const q = ordered[first] as Point;
    if (p.x < q.x - 1e-6 || (Math.abs(p.x - q.x) <= 1e-6 && p.a > q.a)) first = i;
  });
  return { polygon: [...ordered.slice(first), ...ordered.slice(0, first)], sides };
}

/** Une los lados sueltos de la sección en un polígono. */
function chain(sides: readonly SectionEdge[]): Point[] {
  const rest = [...sides];
  const first = rest.shift();
  if (!first) return [];
  const out = [first.p, first.q];
  while (rest.length > 0) {
    const tail = out[out.length - 1] as Point;
    const i = rest.findIndex((s) => near(s.p, tail, 1e-5) || near(s.q, tail, 1e-5));
    if (i < 0) break;
    const s = rest.splice(i, 1)[0] as SectionEdge;
    out.push(near(s.p, tail, 1e-5) ? s.q : s.p);
  }
  return dedupe(out);
}

/**
 * Parte del sólido del lado n·X ≤ d (la que se queda), con la sección como cara nueva «cap».
 * Las caras conservan su id; las que quedan fuera desaparecen.
 */
export function clip(poly: Polyhedron, plane: CutPlane): Polyhedron | null {
  const faces: Face[] = [];
  for (const face of poly.faces) {
    const pts = clipPolygon(face.points, plane);
    if (pts.length >= 3 && polygonArea(pts) > 1e-6) faces.push({ ...face, points: pts });
  }
  const s = section(poly, plane);
  if (s) {
    const cap =
      dot(faceNormal(s.polygon), plane.normal) >= 0 ? s.polygon : [...s.polygon].reverse();
    faces.push({ id: 1000, kind: 'cap', points: cap, smooth: false });
  }
  if (faces.length < 4) return null;
  const apex = poly.apex && side(plane, poly.apex) <= EPS ? poly.apex : null;
  return { faces, apex, axis: poly.axis };
}

// ---------- Recta y sólido ----------

/** Intervalo [t0, t1] de la recta p + t·d dentro del sólido (Cyrus–Beck), o null. */
export function lineInterval(poly: Polyhedron, p: Point, d: Point): [number, number] | null {
  let t0 = -Infinity;
  let t1 = Infinity;
  for (const face of poly.faces) {
    const n = faceNormal(face);
    const q = face.points[0] as Point;
    const den = dot(n, d);
    const num = dot(n, sub(q, p));
    if (Math.abs(den) < 1e-12) {
      if (num < -1e-9) return null; // paralela y por fuera
      continue;
    }
    const t = num / den;
    if (den > 0) t1 = Math.min(t1, t);
    else t0 = Math.max(t0, t);
    if (t0 > t1 + 1e-9) return null;
  }
  if (!Number.isFinite(t0) || !Number.isFinite(t1) || t1 - t0 < 1e-9) return null;
  return [t0, t1];
}

/** Puntos de entrada y salida de la recta AB en el sólido. */
export function lineHits(poly: Polyhedron, A: Point, B: Point): [Point, Point] | null {
  const d = sub(B, A);
  const range = lineInterval(poly, A, d);
  if (!range) return null;
  return [add(A, scale(d, range[0])), add(A, scale(d, range[1]))];
}

/** ¿Tapa el sólido al punto p visto desde la vista dada? (rayo de p hacia el observador). */
export function hiddenBySolid(poly: Polyhedron, p: Point, view: ViewDirection): boolean {
  const range = lineInterval(poly, p, towardObserver(view));
  return range !== null && range[1] > 1e-6 && range[0] < range[1];
}

export interface LinePiece {
  readonly p: Point;
  readonly q: Point;
  readonly visible: boolean;
}

/**
 * Tramos de la recta AB en una vista: el tramo dentro del sólido no se dibuja; fuera, cada
 * tramo es visto u oculto según lo tape el sólido. Se muestrea cada 0,5 mm.
 */
export function linePieces(poly: Polyhedron, A: Point, B: Point, view: ViewDirection): LinePiece[] {
  const d = sub(B, A);
  const inside = lineInterval(poly, A, d);
  const steps = Math.max(2, Math.ceil(length(d) / 0.5));
  const at = (t: number): Point => add(A, scale(d, t));
  // Estado de cada muestra: null dentro del sólido; true vista; false oculta.
  const states = Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps;
    if (inside && t >= inside[0] - 1e-9 && t <= inside[1] + 1e-9) return null;
    return !hiddenBySolid(poly, at(t), view);
  });
  const pieces: LinePiece[] = [];
  let runStart = 0;
  for (let i = 1; i <= steps + 1; i++) {
    if (i <= steps && states[i] === states[runStart]) continue;
    const state = states[runStart];
    // Los cambios de estado se sitúan a mitad entre dos muestras (o en la entrada y salida).
    const from = runStart === 0 ? 0 : (runStart - 0.5) / steps;
    const to = i > steps ? 1 : (i - 0.5) / steps;
    const t0 =
      inside && state !== null && Math.abs(from - inside[1]) < 1 / steps ? inside[1] : from;
    const t1 = inside && state !== null && Math.abs(to - inside[0]) < 1 / steps ? inside[0] : to;
    if (state !== null && state !== undefined && t1 > t0) {
      pieces.push({ p: at(t0), q: at(t1), visible: state });
    }
    runStart = i;
  }
  return pieces;
}

// ---------- Puntos sobre la superficie ----------

/**
 * Punto de la superficie que se proyecta en (x, a) en planta (o (x, c) en alzado).
 * `side`: 'visto' devuelve el más cercano al observador; 'oculto', el otro.
 */
export function surfacePoint(
  poly: Polyhedron,
  given: 'horizontal' | 'vertical',
  u: number,
  v: number,
  which: 'visto' | 'oculto',
): Point | null {
  const view: ViewDirection = given === 'horizontal' ? 'plan' : 'elevation';
  const o = towardObserver(view);
  const p = given === 'horizontal' ? createPoint(u, v, 0) : createPoint(u, 0, v);
  const range = lineInterval(poly, p, o);
  if (!range) return null;
  return add(p, scale(o, which === 'visto' ? range[1] : range[0]));
}

// ---------- Desarrollos ----------

export interface UnfoldStep {
  /** Cara (índice en faces) que gira. */
  readonly face: number;
  /** Cara a la que va unida (su «padre»), o −1 si es la que queda fija. */
  readonly parent: number;
  /** Bisagra: arista común con el padre. */
  readonly hinge: readonly [Point, Point];
  /** Ángulo con signo que la deja en el plano del padre. */
  readonly angle: number;
}

/**
 * Árbol de desarrollo. La cara fija es la base (apoyada); las laterales se encadenan
 * una tras otra (la tira del prisma o el abanico de la pirámide) y el resto de caras se
 * cuelga de la primera lateral que las toca. Sin laterales (poliedros regulares), por anchura.
 */
export function unfoldTree(poly: Polyhedron): UnfoldStep[] | null {
  const faces = poly.faces;
  const root = faces.findIndex((f) => f.kind === 'base');
  const start = root >= 0 ? root : lowestFace(poly);
  const adjacency = adjacencyOf(poly);
  const parent = new Map<number, number>([[start, -1]]);
  const order: number[] = [start];

  const laterals = faces
    .map((f, i) => ({ f, i }))
    .filter(({ f }) => f.kind === 'lateral')
    .sort((p, q) => p.f.id - q.f.id)
    .map(({ i }) => i);
  if (laterals.length > 0) {
    // Primera lateral que toca la base, y a partir de ella la cadena en orden.
    const firstIndex = laterals.findIndex((i) => adjacency.get(start)?.has(i));
    const chainOrder = [...laterals.slice(firstIndex), ...laterals.slice(0, firstIndex)];
    let previous = start;
    for (const i of chainOrder) {
      const p = adjacency.get(i)?.has(previous) ? previous : start;
      if (!adjacency.get(i)?.has(p)) continue;
      parent.set(i, p);
      order.push(i);
      previous = i;
    }
    // Lo que falta (tapa, sección) va unido a la primera lateral que lo toca.
    faces.forEach((_, i) => {
      if (parent.has(i)) return;
      const p = order.find((j) => faces[j]?.kind === 'lateral' && adjacency.get(i)?.has(j));
      if (p !== undefined) {
        parent.set(i, p);
        order.push(i);
      }
    });
  } else {
    const queue = [start];
    while (queue.length > 0) {
      const f = queue.shift() as number;
      for (const g of adjacency.get(f) ?? []) {
        if (parent.has(g)) continue;
        parent.set(g, f);
        order.push(g);
        queue.push(g);
      }
    }
  }
  if (order.length !== faces.length) return null;

  return order.map((f) => {
    const p = parent.get(f) ?? -1;
    if (p < 0)
      return {
        face: f,
        parent: -1,
        hinge: [faces[f]?.points[0], faces[f]?.points[1]] as [Point, Point],
        angle: 0,
      };
    const hinge = sharedEdge(faces[f] as Face, faces[p] as Face);
    const nc = faceNormal(faces[f] as Face);
    const np = faceNormal(faces[p] as Face);
    const h = normalize(sub(hinge[1], hinge[0]));
    const angle = Math.atan2(dot(cross(nc, np), h), dot(nc, np));
    return { face: f, parent: p, hinge, angle };
  });
}

function lowestFace(poly: Polyhedron): number {
  let best = 0;
  let bestC = Infinity;
  poly.faces.forEach((f, i) => {
    const c = centroid(f.points).c;
    if (c < bestC) {
      bestC = c;
      best = i;
    }
  });
  return best;
}

function adjacencyOf(poly: Polyhedron): Map<number, Set<number>> {
  const map = new Map<number, Set<number>>();
  poly.faces.forEach((_, i) => map.set(i, new Set()));
  for (const e of edges(poly)) {
    const [a, b] = e.faces;
    if (a === b) continue;
    map.get(a)?.add(b);
    map.get(b)?.add(a);
  }
  return map;
}

function sharedEdge(a: Face, b: Face): [Point, Point] {
  const common = a.points.filter((p) => b.points.some((q) => near(p, q, 1e-5)));
  return [common[0] ?? (a.points[0] as Point), common[1] ?? (a.points[1] as Point)];
}

/** Gira p alrededor del eje que pasa por o con dirección k (unitaria). */
function rotate(p: Point, o: Point, k: Point, angle: number): Point {
  const v = sub(p, o);
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return add(o, add(add(scale(v, cos), scale(cross(k, v), sin)), scale(k, dot(k, v) * (1 - cos))));
}

/** Caras del sólido desplegadas una fracción t (0: plegado; 1: desarrollo plano). */
export function unfold(poly: Polyhedron, tree: readonly UnfoldStep[], t: number): Point[][] {
  const byFace = new Map(tree.map((s) => [s.face, s]));
  return poly.faces.map((face, i) => {
    let pts = [...face.points];
    // Se aplica el giro de la cara y después el de cada antepasado, hasta la raíz.
    let step = byFace.get(i);
    while (step && step.parent >= 0) {
      const [h0, h1] = step.hinge;
      const k = normalize(sub(h1, h0));
      const angle = step.angle * t;
      pts = pts.map((p) => rotate(p, h0, k, angle));
      step = byFace.get(step.parent);
    }
    return pts;
  });
}

// ---------- Conos y cilindros: tipo de sección ----------

export type ConicKind =
  'circunferencia' | 'elipse' | 'parábola' | 'hipérbola' | 'rectas' | 'punto' | 'rectángulo';

/**
 * Qué cónica da un plano al cortar un cono (semiángulo `half`, en grados) o un cilindro
 * (half = 0). Se compara el ángulo β entre el plano y el eje con el semiángulo α.
 */
export function conicKind(
  axis: Point,
  planeNormal: Point,
  halfDeg: number,
  throughApex: boolean,
): { kind: ConicKind; why: string } {
  const beta =
    90 - (Math.acos(Math.min(1, Math.abs(dot(normalize(axis), planeNormal)))) * 180) / Math.PI;
  const tol = 0.25;
  if (halfDeg === 0) {
    if (Math.abs(beta - 90) < tol) {
      return { kind: 'circunferencia', why: 'El plano es perpendicular al eje.' };
    }
    if (beta < tol) {
      return { kind: 'rectángulo', why: 'El plano es paralelo al eje: corta dos generatrices.' };
    }
    return {
      kind: 'elipse',
      why: 'El plano corta a todas las generatrices sin ser perpendicular al eje.',
    };
  }
  if (throughApex) {
    return beta > halfDeg + tol
      ? { kind: 'punto', why: 'El plano pasa por el vértice y no corta otras generatrices.' }
      : { kind: 'rectas', why: 'El plano pasa por el vértice: la sección son generatrices.' };
  }
  if (Math.abs(beta - 90) < tol) {
    return { kind: 'circunferencia', why: 'El plano es perpendicular al eje.' };
  }
  if (beta > halfDeg + tol) {
    return {
      kind: 'elipse',
      why: 'El plano forma con el eje más ángulo que las generatrices: las corta todas.',
    };
  }
  if (Math.abs(beta - halfDeg) <= tol) {
    return { kind: 'parábola', why: 'El plano es paralelo a una generatriz.' };
  }
  return {
    kind: 'hipérbola',
    why: 'El plano es paralelo a dos generatrices: corta las dos hojas del cono.',
  };
}

export { add, scale, sub, dot, cross, normalize, length };
