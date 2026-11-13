// Vistas normalizadas (sistema europeo, UNE-EN ISO 5456-2) de una malla de triángulos, con
// eliminación de líneas ocultas para piezas que no son convexas.
//
// Método:
// 1. Aristas que se dibujan: las «vivas» (el ángulo entre sus dos caras supera 20°) y las de
//    contorno aparente en esa vista (una cara mira al observador y la otra no). Las aristas
//    entre caras casi coplanarias (las facetas de un cilindro) no se dibujan.
// 2. Cada arista se recorre en pasos de 0,25 mm. Desde cada punto se lanza un rayo hacia el
//    observador: si atraviesa algún triángulo de la pieza, ese tramo es oculto. Para que sea
//    rápido, los triángulos se reparten en una rejilla 2D de la vista y solo se prueban los de
//    la casilla del punto.
// 3. Los tramos se unen en segmentos vistos (continua gruesa) y ocultos (discontinua fina).
// Sin Three.js ni DOM.
import { ISO_RIGHT, ISO_TOWARD, ISO_UP } from '../axonometria/projection.ts';
import type { TriMesh } from './kernel.ts';

export type ViewName = 'alzado' | 'planta' | 'perfil' | 'isometrica' | 'caballera';

/** Perspectiva caballera de la PAU: eje Y a 45° y coeficiente de reducción 1/2. */
export const CABALLERA = { angle: 45, coef: 0.5 } as const;

export interface Seg2 {
  readonly x1: number;
  readonly y1: number;
  readonly x2: number;
  readonly y2: number;
}

export interface ViewDrawing {
  readonly visible: Seg2[];
  readonly hidden: Seg2[];
  /** Caras cortadas (para el rayado), como triángulos en coordenadas de la vista. */
  readonly cutTriangles: [number, number][][];
}

type V3 = [number, number, number];

/**
 * Proyección de cada vista: coordenadas (u, v) en la vista y profundidad (mayor = más cerca
 * del observador).
 * - Alzado: desde delante. u = x, v = c, profundidad = a.
 * - Planta: desde arriba. u = x, v = −a (lo de delante queda abajo), profundidad = c.
 * - Perfil izquierdo: desde la izquierda. u = a (lo de delante queda a la derecha),
 *   v = c, profundidad = −x.
 */
export function project(view: ViewName, p: readonly number[]): V3 {
  const [x, a, c] = p as V3;
  switch (view) {
    case 'alzado':
      return [x, c, a];
    case 'planta':
      return [x, -a, c];
    case 'perfil':
      return [a, c, -x];
    case 'isometrica':
      // Perspectiva isométrica (coeficiente 0,816), la misma que la cámara «isometric».
      return [
        x * ISO_RIGHT.x + a * ISO_RIGHT.a + c * ISO_RIGHT.c,
        x * ISO_UP.x + a * ISO_UP.a + c * ISO_UP.c,
        x * ISO_TOWARD.x + a * ISO_TOWARD.a + c * ISO_TOWARD.c,
      ];
    case 'caballera': {
      // Plano frontal XZ en verdadera magnitud; el alejamiento (hacia el fondo, −a) se dibuja
      // reducido y a 45°. La profundidad es el alejamiento: mayor = más cerca del observador.
      const t = (CABALLERA.angle * Math.PI) / 180;
      return [x - CABALLERA.coef * a * Math.cos(t), c - CABALLERA.coef * a * Math.sin(t), a];
    }
  }
}

/** Dirección hacia el observador de cada vista (x, a, c). */
export function toward(view: ViewName): V3 {
  if (view === 'isometrica') return [ISO_TOWARD.x, ISO_TOWARD.a, ISO_TOWARD.c];
  if (view === 'caballera') {
    // Los rayos oblicuos: un desplazamiento (k·cos t, 1, k·sin t) no se mueve en el dibujo.
    const t = (CABALLERA.angle * Math.PI) / 180;
    const v: V3 = [CABALLERA.coef * Math.cos(t), 1, CABALLERA.coef * Math.sin(t)];
    const l = Math.hypot(...v);
    return [v[0] / l, v[1] / l, v[2] / l];
  }
  return view === 'alzado' ? [0, 1, 0] : view === 'planta' ? [0, 0, 1] : [-1, 0, 0];
}

const SHARP_DEG = 20;
const STEP_MM = 0.25;
const CELL_MM = 4;

interface Prepared {
  readonly tri2d: Float64Array; // por triángulo: u0 v0 d0 u1 v1 d1 u2 v2 d2
  readonly normals: Float64Array;
  readonly grid: Map<string, number[]>;
}

function vertex(mesh: TriMesh, i: number): V3 {
  return [
    mesh.positions[i * 3] as number,
    mesh.positions[i * 3 + 1] as number,
    mesh.positions[i * 3 + 2] as number,
  ];
}

function normalOf(a: V3, b: V3, c: V3): V3 {
  const u = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
  const w = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
  const n: V3 = [
    (u[1] as number) * (w[2] as number) - (u[2] as number) * (w[1] as number),
    (u[2] as number) * (w[0] as number) - (u[0] as number) * (w[2] as number),
    (u[0] as number) * (w[1] as number) - (u[1] as number) * (w[0] as number),
  ];
  const l = Math.hypot(...n) || 1;
  return [n[0] / l, n[1] / l, n[2] / l];
}

function prepare(mesh: TriMesh, view: ViewName): Prepared {
  const count = mesh.triangles.length / 3;
  const tri2d = new Float64Array(count * 9);
  const normals = new Float64Array(count * 3);
  const grid = new Map<string, number[]>();
  for (let t = 0; t < count; t++) {
    const ia = mesh.triangles[t * 3] as number;
    const ib = mesh.triangles[t * 3 + 1] as number;
    const ic = mesh.triangles[t * 3 + 2] as number;
    const a = vertex(mesh, ia);
    const b = vertex(mesh, ib);
    const c = vertex(mesh, ic);
    const n = normalOf(a, b, c);
    normals.set(n, t * 3);
    const pa = project(view, a);
    const pb = project(view, b);
    const pc = project(view, c);
    tri2d.set([...pa, ...pb, ...pc], t * 9);
    const minU = Math.min(pa[0], pb[0], pc[0]);
    const maxU = Math.max(pa[0], pb[0], pc[0]);
    const minV = Math.min(pa[1], pb[1], pc[1]);
    const maxV = Math.max(pa[1], pb[1], pc[1]);
    for (let i = Math.floor(minU / CELL_MM); i <= Math.floor(maxU / CELL_MM); i++) {
      for (let j = Math.floor(minV / CELL_MM); j <= Math.floor(maxV / CELL_MM); j++) {
        const key = `${i},${j}`;
        const list = grid.get(key);
        if (list) list.push(t);
        else grid.set(key, [t]);
      }
    }
  }
  return { tri2d, normals, grid };
}

/** ¿Tapa algún triángulo al punto (u, v, d) visto desde el observador? */
function occluded(prep: Prepared, u: number, v: number, d: number): boolean {
  const list = prep.grid.get(`${Math.floor(u / CELL_MM)},${Math.floor(v / CELL_MM)}`);
  if (!list) return false;
  const T = prep.tri2d;
  for (const t of list) {
    const o = t * 9;
    const u0 = T[o] as number;
    const v0 = T[o + 1] as number;
    const u1 = T[o + 3] as number;
    const v1 = T[o + 4] as number;
    const u2 = T[o + 6] as number;
    const v2 = T[o + 7] as number;
    const den = (v1 - v2) * (u0 - u2) + (u2 - u1) * (v0 - v2);
    if (Math.abs(den) < 1e-9) continue; // triángulo de canto
    const l0 = ((v1 - v2) * (u - u2) + (u2 - u1) * (v - v2)) / den;
    const l1 = ((v2 - v0) * (u - u2) + (u0 - u2) * (v - v2)) / den;
    const l2 = 1 - l0 - l1;
    const e = -1e-6;
    if (l0 < e || l1 < e || l2 < e) continue;
    const depth = l0 * (T[o + 2] as number) + l1 * (T[o + 5] as number) + l2 * (T[o + 8] as number);
    if (depth > d + 1e-3) return true;
  }
  return false;
}

interface MeshEdge {
  a: number;
  b: number;
  tris: number[];
}

/** Aristas de la malla (por posición, para no depender de cómo se repiten los vértices). */
export function meshEdges(mesh: TriMesh): { edges: MeshEdge[]; points: V3[] } {
  const ids = new Map<string, number>();
  const points: V3[] = [];
  const idOf = (i: number): number => {
    const p = vertex(mesh, i);
    const key = p.map((x) => Math.round(x * 1000)).join(',');
    let id = ids.get(key);
    if (id === undefined) {
      id = points.length;
      points.push(p);
      ids.set(key, id);
    }
    return id;
  };
  const map = new Map<string, MeshEdge>();
  const count = mesh.triangles.length / 3;
  for (let t = 0; t < count; t++) {
    const v = [0, 1, 2].map((k) => idOf(mesh.triangles[t * 3 + k] as number));
    for (let k = 0; k < 3; k++) {
      const a = v[k] as number;
      const b = v[(k + 1) % 3] as number;
      if (a === b) continue;
      const key = a < b ? `${a}|${b}` : `${b}|${a}`;
      const e = map.get(key);
      if (e) e.tris.push(t);
      else map.set(key, { a: Math.min(a, b), b: Math.max(a, b), tris: [t] });
    }
  }
  return { edges: [...map.values()], points };
}

export interface ViewOptions {
  /** Dibujar las aristas ocultas (no en los cortes). */
  readonly hidden?: boolean;
  /** Triángulos que son cara de corte: sus aristas comunes no se dibujan (cortes quebrados). */
  readonly isCutTriangle?: (t: number) => boolean;
}

export function drawView(mesh: TriMesh, view: ViewName, options: ViewOptions = {}): ViewDrawing {
  const prep = prepare(mesh, view);
  const { edges, points } = meshEdges(mesh);
  const o = toward(view);
  const cosSharp = Math.cos((SHARP_DEG * Math.PI) / 180);
  const facing = (t: number): number =>
    (prep.normals[t * 3] as number) * o[0] +
    (prep.normals[t * 3 + 1] as number) * o[1] +
    (prep.normals[t * 3 + 2] as number) * o[2];
  const visible: Seg2[] = [];
  const hidden: Seg2[] = [];

  for (const e of edges) {
    const [t0, t1] = e.tris;
    if (t0 === undefined) continue;
    const other = t1 ?? t0;
    const n0 = [prep.normals[t0 * 3], prep.normals[t0 * 3 + 1], prep.normals[t0 * 3 + 2]] as V3;
    const n1 = [
      prep.normals[other * 3],
      prep.normals[other * 3 + 1],
      prep.normals[other * 3 + 2],
    ] as V3;
    const cos = n0[0] * n1[0] + n0[1] * n1[1] + n0[2] * n1[2];
    const sharp = cos < cosSharp;
    const f0 = facing(t0);
    const f1 = facing(other);
    const contour = f0 > 1e-6 !== f1 > 1e-6 && !(Math.abs(f0) <= 1e-6 && Math.abs(f1) <= 1e-6);
    if (!sharp && !contour) continue;
    if (options.isCutTriangle?.(t0) && options.isCutTriangle(other)) continue;
    // Aristas entre dos caras de canto: se ven como un punto o coinciden con otras.
    if (Math.abs(f0) <= 1e-6 && Math.abs(f1) <= 1e-6) continue;

    const pa = project(view, points[e.a] as V3);
    const pb = project(view, points[e.b] as V3);
    const len = Math.hypot(pb[0] - pa[0], pb[1] - pa[1]);
    if (len < 1e-4) continue; // arista que se ve de punta
    const steps = Math.max(1, Math.ceil(len / STEP_MM));
    let runStart = 0;
    let runState: boolean | null = null;
    const push = (from: number, to: number, isVisible: boolean): void => {
      const seg = {
        x1: pa[0] + (pb[0] - pa[0]) * from,
        y1: pa[1] + (pb[1] - pa[1]) * from,
        x2: pa[0] + (pb[0] - pa[0]) * to,
        y2: pa[1] + (pb[1] - pa[1]) * to,
      };
      (isVisible ? visible : hidden).push(seg);
    };
    const visibleAt = (t: number): boolean =>
      !occluded(
        prep,
        pa[0] + (pb[0] - pa[0]) * t,
        pa[1] + (pb[1] - pa[1]) * t,
        pa[2] + (pb[2] - pa[2]) * t,
      );
    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      const vis = visibleAt(t);
      if (runState === null) {
        runState = vis;
        continue;
      }
      if (vis !== runState) {
        // El cambio está entre dos muestras: se busca por bisección.
        let lo = (s - 1) / steps;
        let hi = t;
        for (let k = 0; k < 14; k++) {
          const m = (lo + hi) / 2;
          if (visibleAt(m) === runState) lo = m;
          else hi = m;
        }
        const at = (lo + hi) / 2;
        push(runStart, at, runState);
        runStart = at;
        runState = vis;
      }
    }
    if (runState !== null) push(runStart, 1, runState);
  }

  // Caras de corte que miran al observador (para el rayado).
  const cutTriangles: [number, number][][] = [];
  if (options.isCutTriangle) {
    const count = mesh.triangles.length / 3;
    for (let t = 0; t < count; t++) {
      if (!options.isCutTriangle(t) || facing(t) < 0.99) continue;
      const T = prep.tri2d;
      cutTriangles.push([
        [T[t * 9] as number, T[t * 9 + 1] as number],
        [T[t * 9 + 3] as number, T[t * 9 + 4] as number],
        [T[t * 9 + 6] as number, T[t * 9 + 7] as number],
      ]);
    }
  }
  const shown = mergeCollinear(visible);
  return {
    visible: shown,
    // Una oculta que coincide con una vista no se dibuja: manda la vista.
    hidden: options.hidden === false ? [] : subtractCovered(mergeCollinear(hidden), shown),
    cutTriangles,
  };
}

/** Quita de cada segmento los tramos que tapan otros segmentos alineados. */
export function subtractCovered(segs: readonly Seg2[], covers: readonly Seg2[]): Seg2[] {
  const out: Seg2[] = [];
  for (const s of segs) {
    const dx = s.x2 - s.x1;
    const dy = s.y2 - s.y1;
    const len = Math.hypot(dx, dy);
    if (len < 1e-9) continue;
    const ux = dx / len;
    const uy = dy / len;
    const off = (x: number, y: number): number => Math.abs((x - s.x1) * uy - (y - s.y1) * ux);
    const along = (x: number, y: number): number => (x - s.x1) * ux + (y - s.y1) * uy;
    const blocked: [number, number][] = [];
    for (const c of covers) {
      if (off(c.x1, c.y1) > 0.02 || off(c.x2, c.y2) > 0.02) continue;
      const a = along(c.x1, c.y1);
      const b = along(c.x2, c.y2);
      blocked.push([Math.min(a, b), Math.max(a, b)]);
    }
    blocked.sort((p, q) => p[0] - q[0]);
    let t = 0;
    for (const [a, b] of blocked) {
      if (b <= t) continue;
      if (a > t + 0.2) {
        out.push({
          x1: s.x1 + ux * t,
          y1: s.y1 + uy * t,
          x2: s.x1 + ux * Math.min(a, len),
          y2: s.y1 + uy * Math.min(a, len),
        });
      }
      t = Math.max(t, b);
      if (t >= len) break;
    }
    if (t < len - 0.2) out.push({ x1: s.x1 + ux * t, y1: s.y1 + uy * t, x2: s.x2, y2: s.y2 });
  }
  return out;
}

/** Une segmentos alineados que se tocan (las aristas largas salen de varios tramos). */
function mergeCollinear(segs: Seg2[]): Seg2[] {
  const out: Seg2[] = [];
  const used = new Array<boolean>(segs.length).fill(false);
  for (let i = 0; i < segs.length; i++) {
    if (used[i]) continue;
    let s = segs[i] as Seg2;
    used[i] = true;
    let merged = true;
    while (merged) {
      merged = false;
      for (let j = 0; j < segs.length; j++) {
        if (used[j]) continue;
        const m = join(s, segs[j] as Seg2);
        if (m) {
          s = m;
          used[j] = true;
          merged = true;
        }
      }
    }
    // Se descartan las migas de menos de 0,2 mm que dejan los cambios en los vértices.
    if (Math.hypot(s.x2 - s.x1, s.y2 - s.y1) > 0.2) out.push(s);
  }
  return out;
}

function join(a: Seg2, b: Seg2): Seg2 | null {
  const dx = a.x2 - a.x1;
  const dy = a.y2 - a.y1;
  const len = Math.hypot(dx, dy);
  if (len < 1e-9) return null;
  const ux = dx / len;
  const uy = dy / len;
  const off = (x: number, y: number): number => Math.abs((x - a.x1) * uy - (y - a.y1) * ux);
  if (off(b.x1, b.y1) > 1e-3 || off(b.x2, b.y2) > 1e-3) return null;
  const t = (x: number, y: number): number => (x - a.x1) * ux + (y - a.y1) * uy;
  const ts = [0, len, t(b.x1, b.y1), t(b.x2, b.y2)];
  const bMin = Math.min(ts[2] as number, ts[3] as number);
  const bMax = Math.max(ts[2] as number, ts[3] as number);
  if (bMin > len + 1e-3 || bMax < -1e-3) return null; // no se tocan
  const lo = Math.min(...ts);
  const hi = Math.max(...ts);
  return { x1: a.x1 + ux * lo, y1: a.y1 + uy * lo, x2: a.x1 + ux * hi, y2: a.y1 + uy * hi };
}

/**
 * Rayado a 45° (ISO 128-3) de las caras de corte: segmentos paralelos separados `spacing` mm,
 * recortados a los triángulos de corte.
 */
export function hatch(triangles: readonly [number, number][][], spacing = 2.5): Seg2[] {
  if (triangles.length === 0) return [];
  // Coordenada s = u − v (constante a lo largo de cada línea de 45°) y t = u + v a lo largo.
  const intervals = new Map<number, [number, number][]>();
  for (const tri of triangles) {
    const s = tri.map(([u, v]) => u - v);
    const lo = Math.ceil(Math.min(...s) / spacing);
    const hi = Math.floor(Math.max(...s) / spacing);
    for (let k = lo; k <= hi; k++) {
      const sk = k * spacing;
      // Corte de la recta s = sk con los lados del triángulo.
      const ts: number[] = [];
      for (let i = 0; i < 3; i++) {
        const p = tri[i] as [number, number];
        const q = tri[(i + 1) % 3] as [number, number];
        const sp = p[0] - p[1];
        const sq = q[0] - q[1];
        if ((sp - sk) * (sq - sk) > 0 || sp === sq) continue;
        const f = (sk - sp) / (sq - sp);
        ts.push(p[0] + p[1] + f * (q[0] + q[1] - p[0] - p[1]));
      }
      if (ts.length < 2) continue;
      const list = intervals.get(k) ?? [];
      list.push([Math.min(...ts), Math.max(...ts)]);
      intervals.set(k, list);
    }
  }
  const out: Seg2[] = [];
  for (const [k, list] of intervals) {
    const sk = k * spacing;
    list.sort((p, q) => p[0] - q[0]);
    let [a, b] = list[0] as [number, number];
    const flush = (): void => {
      if (b - a > 0.05) {
        // u = (t + s)/2, v = (t − s)/2
        out.push({ x1: (a + sk) / 2, y1: (a - sk) / 2, x2: (b + sk) / 2, y2: (b - sk) / 2 });
      }
    };
    for (const [c, d] of list.slice(1)) {
      if (c <= b + 1e-6) b = Math.max(b, d);
      else {
        flush();
        a = c;
        b = d;
      }
    }
    flush();
  }
  return out;
}
