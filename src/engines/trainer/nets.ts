// Desarrollos del cubo: redes de seis cuadrados. Se sabe si una red forma un cubo «haciendo
// rodar» un cubo sobre ella: cada cuadrado recibe la cara que toca el suelo; si las seis son
// distintas, la red cierra. También se calcula su plegado en 3D para animarlo. Sin DOM.
import { pick } from './polycube.ts';

export type Square = readonly [number, number];
export type Net = readonly Square[];
type V3 = [number, number, number];

const DIRS: readonly [Square, 'e' | 'w' | 'n' | 's'][] = [
  [[1, 0], 'e'],
  [[-1, 0], 'w'],
  [[0, 1], 'n'],
  [[0, -1], 's'],
];

const neg = (v: V3): V3 => [-v[0], -v[1], -v[2]];
const k2 = (s: Square): string => `${s[0]},${s[1]}`;

/** Normal (en 3D) de la cara que ocupa cada cuadrado al plegar, o null si la red no es conexa. */
export function faceNormals(net: Net): Map<string, V3> | null {
  const cells = new Set(net.map(k2));
  const first = net[0];
  if (!first) return null;
  const frames = new Map<string, { n: V3; e: V3; s: V3 }>([
    [k2(first), { n: [0, 0, -1], e: [1, 0, 0], s: [0, 1, 0] }],
  ]);
  const queue: Square[] = [first];
  while (queue.length) {
    const sq = queue.shift() as Square;
    const f = frames.get(k2(sq));
    if (!f) continue;
    for (const [[dx, dy], dir] of DIRS) {
      const next: Square = [sq[0] + dx, sq[1] + dy];
      if (!cells.has(k2(next)) || frames.has(k2(next))) continue;
      const g =
        dir === 'e'
          ? { n: f.e, e: neg(f.n), s: f.s }
          : dir === 'w'
            ? { n: neg(f.e), e: f.n, s: f.s }
            : dir === 'n'
              ? { n: f.s, e: f.e, s: neg(f.n) }
              : { n: neg(f.s), e: f.e, s: f.n };
      frames.set(k2(next), g);
      queue.push(next);
    }
  }
  if (frames.size !== net.length) return null;
  return new Map([...frames].map(([k, f]) => [k, f.n]));
}

/** ¿Forma un cubo? Seis cuadrados, conexos y con las seis caras distintas. */
export function foldsToCube(net: Net): boolean {
  if (net.length !== 6) return false;
  const normals = faceNormals(net);
  if (!normals) return false;
  return new Set([...normals.values()].map((n) => n.join(','))).size === 6;
}

/** Forma canónica de una red salvo giros y simetrías en el plano. */
export function canonicalNet(net: Net): string {
  const variants: string[] = [];
  for (let r = 0; r < 4; r++) {
    for (const flip of [false, true]) {
      const pts = net.map(([x, y]) => {
        let [u, v] = flip ? [-x, y] : [x, y];
        for (let i = 0; i < r; i++) [u, v] = [-v, u];
        return [u, v] as Square;
      });
      const mx = Math.min(...pts.map((p) => p[0]));
      const my = Math.min(...pts.map((p) => p[1]));
      variants.push(
        pts
          .map(([x, y]) => [x - mx, y - my])
          .sort(
            (p, q) => (p[0] as number) - (q[0] as number) || (p[1] as number) - (q[1] as number),
          )
          .map((p) => p.join(','))
          .join(';'),
      );
    }
  }
  return variants.sort()[0] as string;
}

/** Red aleatoria de seis cuadrados (puede formar cubo o no). */
export function randomHexomino(random: () => number): Net {
  const cells: Square[] = [[0, 0]];
  const used = new Set(['0,0']);
  while (cells.length < 6) {
    const base = pick(random, cells);
    const [[dx, dy]] = pick(random, DIRS);
    const next: Square = [base[0] + dx, base[1] + dy];
    if (used.has(k2(next))) continue;
    used.add(k2(next));
    cells.push(next);
  }
  return cells;
}

/** Red aleatoria que sí, o que no, forma un cubo. */
export function randomNet(random: () => number, valid: boolean): Net {
  for (;;) {
    const net = randomHexomino(random);
    if (foldsToCube(net) === valid) return net;
  }
}

// ---------- Plegado en 3D ----------

function rotateAbout(p: V3, o: V3, k: V3, angle: number): V3 {
  const v: V3 = [p[0] - o[0], p[1] - o[1], p[2] - o[2]];
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  const d = k[0] * v[0] + k[1] * v[1] + k[2] * v[2];
  const x: V3 = [k[1] * v[2] - k[2] * v[1], k[2] * v[0] - k[0] * v[2], k[0] * v[1] - k[1] * v[0]];
  return [
    o[0] + v[0] * c + x[0] * s + k[0] * d * (1 - c),
    o[1] + v[1] * c + x[1] * s + k[1] * d * (1 - c),
    o[2] + v[2] * c + x[2] * s + k[2] * d * (1 - c),
  ];
}

/**
 * Esquinas en 3D de cada cuadrado de la red (lado 1) plegada una fracción t: 0 plana, 1 cerrada.
 * Las caras suben (z positiva) girando 90° alrededor de la arista con su cuadrado padre.
 */
export function foldNet(net: Net, t: number): V3[][] {
  const cells = new Set(net.map(k2));
  const first = net[0];
  if (!first) return [];
  const parent = new Map<string, { sq: Square; hinge: [V3, V3] } | null>([[k2(first), null]]);
  const queue: Square[] = [first];
  while (queue.length) {
    const sq = queue.shift() as Square;
    for (const [[dx, dy]] of DIRS) {
      const next: Square = [sq[0] + dx, sq[1] + dy];
      if (!cells.has(k2(next)) || parent.has(k2(next))) continue;
      // Arista común entre los dos cuadrados.
      const hinge: [V3, V3] =
        dx !== 0
          ? [
              [Math.max(sq[0], next[0]), sq[1], 0],
              [Math.max(sq[0], next[0]), sq[1] + 1, 0],
            ]
          : [
              [sq[0], Math.max(sq[1], next[1]), 0],
              [sq[0] + 1, Math.max(sq[1], next[1]), 0],
            ];
      parent.set(k2(next), { sq, hinge });
      queue.push(next);
    }
  }
  const angle = (Math.PI / 2) * t;
  return net.map((sq) => {
    let pts: V3[] = [
      [sq[0], sq[1], 0],
      [sq[0] + 1, sq[1], 0],
      [sq[0] + 1, sq[1] + 1, 0],
      [sq[0], sq[1] + 1, 0],
    ];
    let node = parent.get(k2(sq));
    let current = sq;
    while (node) {
      const [h0, h1] = node.hinge;
      const k: V3 = [h1[0] - h0[0], h1[1] - h0[1], 0];
      // Sentido del giro: el cuadrado hijo tiene que subir.
      const center: V3 = [current[0] + 0.5, current[1] + 0.5, 0];
      const probe = rotateAbout(center, h0, k, 0.1);
      const sign = probe[2] > 0 ? 1 : -1;
      pts = pts.map((p) => rotateAbout(p, h0, k, sign * angle));
      current = node.sq;
      node = parent.get(k2(current));
    }
    return pts;
  });
}
