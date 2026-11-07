// Figuras de cubos (policubos) para el entrenador espacial: generación con semilla, los 24
// giros del cubo, comparación salvo traslación y vistas normalizadas. Sin Three.js ni DOM.
// Cada cubo es una celda [x, a, c] de coordenadas enteras (x a lo ancho, a hacia delante,
// c hacia arriba), como el dominio del resto de la herramienta.

export type Cell = readonly [number, number, number];
export type Polycube = readonly Cell[];
/** Matriz de giro 3×3 con entradas −1, 0 y 1, por filas. */
export type Rotation = readonly [Cell, Cell, Cell];

/** Generador pseudoaleatorio con semilla (mulberry32): los tests y el diagnóstico se repiten. */
export function rng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const pick = <T>(random: () => number, list: readonly T[]): T =>
  list[Math.floor(random() * list.length)] as T;

const key = (c: Cell): string => c.join(',');

/** Figura conexa de `n` cubos, creciendo cara con cara. */
export function randomPolycube(random: () => number, n: number): Polycube {
  const cells: Cell[] = [[0, 0, 0]];
  const used = new Set([key([0, 0, 0])]);
  const steps: Cell[] = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1],
  ];
  while (cells.length < n) {
    const base = pick(random, cells);
    const d = pick(random, steps);
    const next: Cell = [base[0] + d[0], base[1] + d[1], base[2] + d[2]];
    if (used.has(key(next))) continue;
    used.add(key(next));
    cells.push(next);
  }
  return normalize(cells);
}

/** Lleva la figura a coordenadas no negativas y ordena sus celdas (forma canónica salvo traslación). */
export function normalize(p: Polycube): Polycube {
  const min = [0, 1, 2].map((i) => Math.min(...p.map((c) => c[i] as number)));
  return p
    .map(
      (c) =>
        [c[0] - (min[0] as number), c[1] - (min[1] as number), c[2] - (min[2] as number)] as Cell,
    )
    .sort((u, v) => u[0] - v[0] || u[1] - v[1] || u[2] - v[2]);
}

export const sameShape = (p: Polycube, q: Polycube): boolean =>
  normalize(p).map(key).join(';') === normalize(q).map(key).join(';');

function multiply(m: Rotation, c: Cell): Cell {
  return [
    m[0][0] * c[0] + m[0][1] * c[1] + m[0][2] * c[2],
    m[1][0] * c[0] + m[1][1] * c[1] + m[1][2] * c[2],
    m[2][0] * c[0] + m[2][1] * c[1] + m[2][2] * c[2],
  ];
}

export function rotate(p: Polycube, m: Rotation): Polycube {
  return normalize(p.map((c) => multiply(m, c)));
}

/** Simetría (espejo): la figura «zurda». No se puede conseguir girando si la figura es quiral. */
export function mirror(p: Polycube): Polycube {
  return normalize(p.map((c) => [-c[0], c[1], c[2]] as Cell));
}

/** Los 24 giros del cubo (matrices de permutación con signo y determinante 1). */
export const ROTATIONS: readonly Rotation[] = (() => {
  const out: Rotation[] = [];
  const perms = [
    [0, 1, 2],
    [0, 2, 1],
    [1, 0, 2],
    [1, 2, 0],
    [2, 0, 1],
    [2, 1, 0],
  ];
  for (const perm of perms) {
    for (let signs = 0; signs < 8; signs++) {
      const m = [0, 1, 2].map((row) => {
        const r = [0, 0, 0];
        r[perm[row] as number] = signs & (1 << row) ? -1 : 1;
        return r as unknown as Cell;
      }) as unknown as Rotation;
      if (det(m) === 1) out.push(m);
    }
  }
  return out;
})();

function det(m: Rotation): number {
  const [a, b, c] = m;
  return (
    a[0] * (b[1] * c[2] - b[2] * c[1]) -
    a[1] * (b[0] * c[2] - b[2] * c[0]) +
    a[2] * (b[0] * c[1] - b[1] * c[0])
  );
}

/** Giro de 90° alrededor de un eje (0: x, 1: a, 2: c), las veces que se indique. */
export function quarterTurn(axis: 0 | 1 | 2, times = 1): Rotation {
  let m: Rotation = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];
  const one: Rotation =
    axis === 0
      ? [
          [1, 0, 0],
          [0, 0, -1],
          [0, 1, 0],
        ]
      : axis === 1
        ? [
            [0, 0, 1],
            [0, 1, 0],
            [-1, 0, 0],
          ]
        : [
            [0, -1, 0],
            [1, 0, 0],
            [0, 0, 1],
          ];
  for (let i = 0; i < ((times % 4) + 4) % 4; i++) m = compose(one, m);
  return m;
}

export function compose(a: Rotation, b: Rotation): Rotation {
  const at = (m: Rotation, i: number, j: number): number => (m[i] as Cell)[j] as number;
  return [0, 1, 2].map((i) =>
    [0, 1, 2].map(
      (j) => at(a, i, 0) * at(b, 0, j) + at(a, i, 1) * at(b, 1, j) + at(a, i, 2) * at(b, 2, j),
    ),
  ) as unknown as Rotation;
}

/** ¿Hay algún giro que lleve p en q? */
export function congruent(p: Polycube, q: Polycube): boolean {
  return ROTATIONS.some((m) => sameShape(rotate(p, m), q));
}

export type ViewName = 'alzado' | 'planta' | 'perfil';

/** Vista normalizada como cuadrícula de celdas ocupadas: [u, v] en la vista. */
export function viewGrid(p: Polycube, view: ViewName): Set<string> {
  const out = new Set<string>();
  for (const [x, a, c] of p) {
    // Alzado: desde delante (x, c). Planta: desde arriba (x, −a). Perfil izquierdo: (a, c).
    if (view === 'alzado') out.add(`${x},${c}`);
    else if (view === 'planta') out.add(`${x},${-a}`);
    else out.add(`${a},${c}`);
  }
  return out;
}

/** Las tres vistas como texto, para comparar figuras por sus vistas. */
export function viewsKey(p: Polycube): string {
  const q = normalize(p);
  return (['alzado', 'planta', 'perfil'] as const)
    .map((v) => [...viewGrid(q, v)].sort().join(' '))
    .join(' | ');
}
