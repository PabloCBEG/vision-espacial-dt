// Ítems del entrenador espacial, todos originales y generados por la aplicación con una semilla
// (siguen el estilo de los tests de visión espacial, no su contenido):
// - rotación: una figura gira de una forma; hay que aplicar el mismo giro a otra.
// - sección: un sólido y un plano; hay que elegir la sección correcta.
// - desarrollo: hay que elegir la red que forma un cubo.
// - vistas: hay que emparejar una figura con sus vistas.
// Cada uno tiene tres niveles de dificultad. Sin DOM.
import { createPoint, type Point } from '../../geometry/index.ts';
import { buildSolid } from '../solidos/construction.ts';
import { SolidSchema } from '../solidos/definition.ts';
import { section, type CutPlane } from '../solidos/polyhedron.ts';
import { foldsToCube, randomNet, canonicalNet, type Net } from './nets.ts';
import {
  compose,
  mirror,
  normalize,
  pick,
  quarterTurn,
  randomPolycube,
  rng,
  rotate,
  sameShape,
  viewsKey,
  type Cell,
  type Polycube,
  type Rotation,
} from './polycube.ts';

export type Level = 1 | 2 | 3;
export type ItemKind = 'rotacion' | 'seccion' | 'desarrollo' | 'vistas';

export interface RotationItem {
  readonly kind: 'rotacion';
  readonly level: Level;
  readonly model: Polycube;
  readonly turned: Polycube;
  readonly rotation: Rotation;
  /** Eje y número de cuartos de vuelta, para animar la solución. */
  readonly turns: readonly { axis: 0 | 1 | 2; times: number }[];
  readonly target: Polycube;
  readonly options: readonly Polycube[];
  readonly correct: number;
}

export interface SectionItem {
  readonly kind: 'seccion';
  readonly level: Level;
  readonly solid: ReturnType<typeof SolidSchema.parse>;
  readonly plane: CutPlane;
  /** Secciones en verdadera magnitud (coordenadas en el plano, mm). */
  readonly options: readonly (readonly [number, number][])[];
  readonly correct: number;
}

export interface NetItem {
  readonly kind: 'desarrollo';
  readonly level: Level;
  readonly options: readonly Net[];
  readonly correct: number;
}

export interface ViewsItem {
  readonly kind: 'vistas';
  readonly level: Level;
  readonly model: Polycube;
  /** Figuras cuyas vistas se ofrecen; la correcta es la del modelo. */
  readonly options: readonly Polycube[];
  readonly correct: number;
}

export type Item = RotationItem | SectionItem | NetItem | ViewsItem;

function shuffle<T>(random: () => number, list: T[]): T[] {
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [list[i], list[j]] = [list[j] as T, list[i] as T];
  }
  return list;
}

/** Coloca la respuesta correcta entre las demás, en un orden al azar. */
function arrange<T>(
  random: () => number,
  correct: T,
  others: T[],
): { options: T[]; correct: number } {
  const options = shuffle(random, [correct, ...others]);
  return { options, correct: options.indexOf(correct) };
}

// ---------- Rotación ----------

export function rotationItem(random: () => number, level: Level): RotationItem {
  const n = level === 1 ? 4 : level === 2 ? 5 : 6;
  for (;;) {
    const turns =
      level === 1
        ? [{ axis: 2 as const, times: pick(random, [1, 3]) }]
        : level === 2
          ? [{ axis: pick(random, [0, 1, 2] as const), times: pick(random, [1, 3]) }]
          : [
              { axis: 2 as const, times: pick(random, [1, 3]) },
              { axis: pick(random, [0, 1] as const), times: 1 },
            ];
    const rotation = turns.reduce<Rotation>(
      (m, t) => compose(quarterTurn(t.axis, t.times), m),
      quarterTurn(0, 0),
    );
    const model = randomPolycube(random, n);
    const turned = rotate(model, rotation);
    if (sameShape(model, turned)) continue; // el giro no se notaría
    const target = randomPolycube(random, n);
    const right = rotate(target, rotation);
    if (sameShape(target, right) || sameShape(mirror(right), right)) continue;
    // Distractores: la figura reflejada y otros giros distintos.
    const others: Polycube[] = [mirror(right)];
    for (let tries = 0; others.length < 3 && tries < 60; tries++) {
      const wrong = rotate(
        target,
        compose(quarterTurn(pick(random, [0, 1, 2] as const), pick(random, [1, 2, 3])), rotation),
      );
      if ([right, ...others].some((o) => sameShape(o, wrong))) continue;
      others.push(wrong);
    }
    if (others.length < 3) continue;
    const { options, correct } = arrange(random, right, others);
    return { kind: 'rotacion', level, model, turned, rotation, turns, target, options, correct };
  }
}

// ---------- Sección ----------

/** Firma de una sección: número de lados y proporciones, para no repetir opciones iguales. */
export function sectionSignature(poly: readonly [number, number][]): string {
  if (poly.length > 12) {
    const xs = poly.map((p) => p[0]);
    const ys = poly.map((p) => p[1]);
    const w = Math.max(...xs) - Math.min(...xs);
    const h = Math.max(...ys) - Math.min(...ys);
    return `curva ${(Math.max(w, h) / Math.min(w, h)).toFixed(1)}`;
  }
  const sides = poly.map((p, i) => {
    const q = poly[(i + 1) % poly.length] as [number, number];
    return Math.hypot(q[0] - p[0], q[1] - p[1]);
  });
  const max = Math.max(...sides);
  return `${poly.length}: ${sides
    .map((s) => (s / max).toFixed(1))
    .sort()
    .join(' ')}`;
}

/** Sección en verdadera magnitud: el polígono en coordenadas del propio plano. */
function trueShape(points: readonly Point[], plane: CutPlane): [number, number][] {
  const n = plane.normal;
  const helper = Math.abs(n.c) < 0.9 ? createPoint(0, 0, 1) : createPoint(1, 0, 0);
  const e1 = norm(cross(helper, n));
  const e2 = cross(n, e1);
  return points.map((p) => [dot(p, e1), dot(p, e2)]);
}

const SOLIDS: Record<Level, { solid: unknown; planes: [Point, Point][] }[]> = {
  1: [
    {
      solid: { tipo: 'cubo', arista: 30, centro: [0, 30] },
      planes: [
        [createPoint(0, 30, 15), createPoint(0, 0, 1)],
        [createPoint(0, 30, 15), createPoint(1, 1, 0)],
        [createPoint(0, 30, 15), createPoint(1, 0, 0)],
        [createPoint(6, 36, 21), createPoint(1, 1, 1)],
      ],
    },
  ],
  2: [
    {
      solid: { tipo: 'cubo', arista: 30, centro: [0, 30] },
      planes: [
        [createPoint(0, 30, 15), createPoint(1, 1, 1)],
        [createPoint(8, 38, 23), createPoint(1, 1, 1)],
        [createPoint(4, 30, 15), createPoint(2, 1, 1)],
        [createPoint(0, 30, 15), createPoint(1, 0, 1)],
        [createPoint(0, 30, 15), createPoint(1, 1, 0)],
      ],
    },
    {
      solid: { tipo: 'piramide', lados: 4, radio: 22, altura: 40, centro: [0, 30] },
      planes: [
        [createPoint(0, 30, 15), createPoint(0, 0, 1)],
        [createPoint(0, 30, 15), createPoint(1, 0, 0)],
        [createPoint(0, 30, 15), createPoint(1, 0, 1.5)],
        [createPoint(0, 30, 10), createPoint(1, 1, 3)],
      ],
    },
  ],
  3: [
    {
      solid: { tipo: 'cilindro', radio: 15, altura: 40, centro: [0, 30] },
      planes: [
        [createPoint(0, 30, 20), createPoint(0, 0, 1)],
        [createPoint(0, 30, 20), createPoint(1, 0, 1.6)],
        [createPoint(0, 30, 20), createPoint(1, 0, 0)],
      ],
    },
    {
      solid: { tipo: 'cono', radio: 18, altura: 45, centro: [0, 30] },
      planes: [
        [createPoint(0, 30, 15), createPoint(0, 0, 1)],
        [createPoint(0, 30, 15), createPoint(1, 0, 2.5)],
        [createPoint(6, 30, 15), createPoint(1, 0, 0)],
        [createPoint(4, 30, 10), createPoint(1, 0, 0.4)],
      ],
    },
  ],
};

export function sectionItem(random: () => number, level: Level): SectionItem {
  for (;;) {
    const entry = pick(random, SOLIDS[level]);
    const solid = SolidSchema.parse(entry.solid);
    const poly = buildSolid(solid);
    const sections = entry.planes.flatMap(([p, n]) => {
      const normal = norm(n);
      const plane = { normal, d: dot(normal, p) };
      const s = section(poly, plane);
      return s ? [{ plane, shape: trueShape(s.polygon, plane) }] : [];
    });
    const correctOne = pick(random, sections);
    const seen = new Set([sectionSignature(correctOne.shape)]);
    const others: [number, number][][] = [];
    for (const s of shuffle(random, [...sections])) {
      const sig = sectionSignature(s.shape);
      if (seen.has(sig)) continue;
      seen.add(sig);
      others.push(s.shape);
    }
    if (others.length < 2) continue;
    const { options, correct } = arrange(random, correctOne.shape, others.slice(0, 3));
    return { kind: 'seccion', level, solid, plane: correctOne.plane, options, correct };
  }
}

// ---------- Desarrollo ----------

export function netItem(random: () => number, level: Level): NetItem {
  const right = randomNet(random, true);
  const others: Net[] = [];
  const seen = new Set([canonicalNet(right)]);
  while (others.length < 3) {
    // En los niveles altos, las redes falsas se parecen más: también tienen una fila de cuatro.
    const wrong = randomNet(random, false);
    const hasRow = rowOf(wrong) >= 4;
    if (level >= 2 && !hasRow && random() < 0.7) continue;
    const key = canonicalNet(wrong);
    if (seen.has(key)) continue;
    seen.add(key);
    others.push(wrong);
  }
  const { options, correct } = arrange(random, right, others);
  return { kind: 'desarrollo', level, options, correct };
}

function rowOf(net: Net): number {
  const rows = new Map<number, number>();
  for (const [, y] of net) rows.set(y, (rows.get(y) ?? 0) + 1);
  return Math.max(...rows.values());
}

// ---------- Vistas ----------

/** Otra figura parecida: un cubo cambia de sitio (sigue conexa). */
function nudge(random: () => number, p: Polycube): Polycube {
  for (;;) {
    const cells = [...p];
    cells.splice(Math.floor(random() * cells.length), 1);
    if (!connected(cells)) continue;
    const base = pick(random, cells);
    const d = pick(random, [
      [1, 0, 0],
      [-1, 0, 0],
      [0, 1, 0],
      [0, -1, 0],
      [0, 0, 1],
    ] as Cell[]);
    const next: Cell = [base[0] + d[0], base[1] + d[1], base[2] + d[2]];
    if (cells.some((c) => c.join() === next.join())) continue;
    return normalize([...cells, next]);
  }
}

function connected(cells: readonly Cell[]): boolean {
  if (cells.length === 0) return false;
  const keys = new Set(cells.map((c) => c.join()));
  const seen = new Set([cells[0]?.join()]);
  const stack = [cells[0] as Cell];
  while (stack.length) {
    const c = stack.pop() as Cell;
    for (const d of [
      [1, 0, 0],
      [-1, 0, 0],
      [0, 1, 0],
      [0, -1, 0],
      [0, 0, 1],
      [0, 0, -1],
    ]) {
      const k = [c[0] + (d[0] as number), c[1] + (d[1] as number), c[2] + (d[2] as number)].join();
      if (keys.has(k) && !seen.has(k)) {
        seen.add(k);
        stack.push(k.split(',').map(Number) as unknown as Cell);
      }
    }
  }
  return seen.size === cells.length;
}

export function viewsItem(random: () => number, level: Level): ViewsItem {
  const n = level === 1 ? 4 : level === 2 ? 5 : 7;
  for (;;) {
    const model = randomPolycube(random, n);
    const seen = new Set([viewsKey(model)]);
    const others: Polycube[] = [];
    for (let tries = 0; others.length < 3 && tries < 80; tries++) {
      const wrong = nudge(random, model);
      const key = viewsKey(wrong);
      if (seen.has(key)) continue;
      seen.add(key);
      others.push(wrong);
    }
    if (others.length < 3) continue;
    const { options, correct } = arrange(random, model, others);
    return { kind: 'vistas', level, model, options, correct };
  }
}

export function makeItem(random: () => number, kind: ItemKind, level: Level): Item {
  switch (kind) {
    case 'rotacion':
      return rotationItem(random, level);
    case 'seccion':
      return sectionItem(random, level);
    case 'desarrollo':
      return netItem(random, level);
    case 'vistas':
      return viewsItem(random, level);
  }
}

// ---------- Test diagnóstico ----------

export const DIAGNOSTIC_LENGTH = 20;
const KINDS: readonly ItemKind[] = ['rotacion', 'seccion', 'desarrollo', 'vistas'];
const LEVELS: readonly Level[] = [1, 1, 2, 2, 3];

/**
 * Test diagnóstico de 20 ítems fijos: cinco de cada tipo con la misma escala de dificultad.
 * Las versiones inicial y final son equivalentes (misma estructura) con ítems distintos.
 */
export function diagnostic(version: 'inicial' | 'final'): Item[] {
  const random = rng(version === 'inicial' ? 20261 : 20262);
  const items: Item[] = [];
  for (const level of LEVELS) for (const kind of KINDS) items.push(makeItem(random, kind, level));
  return items;
}

// ---------- Dificultad adaptativa ----------

/** Sube de nivel tras dos aciertos seguidos y baja tras un fallo. */
export function nextLevel(
  level: Level,
  streak: number,
  correct: boolean,
): { level: Level; streak: number } {
  if (!correct) return { level: Math.max(1, level - 1) as Level, streak: 0 };
  const s = streak + 1;
  return s >= 2 ? { level: Math.min(3, level + 1) as Level, streak: 0 } : { level, streak: s };
}

function cross(u: Point, v: Point): Point {
  return createPoint(u.a * v.c - u.c * v.a, u.c * v.x - u.x * v.c, u.x * v.a - u.a * v.x);
}
const dot = (u: Point, v: Point): number => u.x * v.x + u.a * v.a + u.c * v.c;
function norm(u: Point): Point {
  const l = Math.hypot(u.x, u.a, u.c) || 1;
  return createPoint(u.x / l, u.a / l, u.c / l);
}

export { foldsToCube };
