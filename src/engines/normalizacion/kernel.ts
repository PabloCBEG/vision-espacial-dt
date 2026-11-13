// Construcción de las piezas con manifold-3d (operaciones booleanas exactas, en WebAssembly).
//
// Por qué manifold-3d: sus booleanas son exactas y su resultado es siempre una malla cerrada
// sin uniones en T, así que las aristas reales de la pieza salen limpias para dibujar las
// vistas (con otras librerías de CSG aparecen aristas falsas en las caras planas). Es la
// librería que usa OpenSCAD, funciona igual en el navegador y en los tests, y solo se carga
// en las lecciones de normalización.
import type { ManifoldToplevel, Manifold, CrossSection } from 'manifold-3d';
import { axisIndex, others, type AxisName, type Operation, type Piece } from './piece.ts';

/** Malla de triángulos en coordenadas del dominio (x, a, c). */
export interface TriMesh {
  readonly positions: Float64Array;
  readonly triangles: Uint32Array;
}

const SEGMENTS = 48;

/** Prisma: polígono (en las otras dos coordenadas del eje) extruido de `from` a `to`. */
function prism(
  wasm: ManifoldToplevel,
  axis: AxisName,
  section: CrossSection,
  from: number,
  to: number,
): Manifold {
  const low = Math.min(from, to);
  const solid = wasm.Manifold.extrude(section, Math.abs(to - from)).translate([0, 0, low]);
  switch (axis) {
    case 'c':
      return solid; // (u, v) = (x, a), extrusión en c
    case 'x':
      // (u, v) = (a, c), extrusión en x: permutación cíclica (X, Y, Z) → (Z, X, Y).
      return solid.warp((v) => {
        const [X, Y, Z] = [v[0], v[1], v[2]];
        v[0] = Z;
        v[1] = X;
        v[2] = Y;
      });
    case 'a':
      // (u, v) = (x, c), extrusión en a: simetría que cambia Y por Z.
      return solid.mirror([0, 1, -1]);
  }
}

function polygonSection(
  wasm: ManifoldToplevel,
  points: readonly (readonly [number, number])[],
): CrossSection {
  // Orden antihorario (área positiva), como lo pide la regla de relleno «Positive».
  let area = 0;
  points.forEach((p, i) => {
    const q = points[(i + 1) % points.length] as readonly [number, number];
    area += p[0] * q[1] - q[0] * p[1];
  });
  const ordered = area >= 0 ? points : [...points].reverse();
  return new wasm.CrossSection([ordered.map((p) => [p[0], p[1]] as [number, number])]);
}

/**
 * Poliedro cerrado a partir de caras planas y convexas. Cada cara se triangula en abanico desde un
 * vértice que no deje triángulos degenerados, y el sentido de las caras se ordena para que cada
 * arista se recorra una vez en cada sentido (así sale una malla cerrada y orientada).
 */
function polyhedron(
  wasm: ManifoldToplevel,
  points: readonly (readonly [number, number, number])[],
  faces: readonly (readonly number[])[],
): Manifold {
  const at = (i: number): readonly [number, number, number] => points[i] ?? [0, 0, 0];
  const area = (a: number, b: number, c: number): number => {
    const [px, py, pz] = at(a);
    const [qx, qy, qz] = at(b);
    const [rx, ry, rz] = at(c);
    const [ux, uy, uz] = [qx - px, qy - py, qz - pz];
    const [vx, vy, vz] = [rx - px, ry - py, rz - pz];
    return Math.hypot(uy * vz - uz * vy, uz * vx - ux * vz, ux * vy - uy * vx);
  };
  // Triangulación: abanico desde un vértice sin triángulos de área nula.
  const tris: [number, number, number][][] = faces.map((f) => {
    for (let k = 0; k < f.length; k++) {
      const apex = f[k] as number;
      const ring = [...f.slice(k + 1), ...f.slice(0, k)];
      const out: [number, number, number][] = [];
      ring.forEach((v, i) => {
        const next = ring[i + 1];
        if (next !== undefined) out.push([apex, v, next]);
      });
      if (out.every(([a, b, c]) => area(a, b, c) > 1e-6)) return out;
    }
    throw new Error('Una cara del poliedro es degenerada.');
  });
  // Orientación coherente: se recorre la adyacencia y se da la vuelta a las caras al revés.
  const flipped = new Array<boolean>(faces.length).fill(false);
  const seen = new Array<boolean>(faces.length).fill(false);
  const directed = (fi: number): [number, number][] => {
    const f = faces[fi] as readonly number[];
    const pairs = f.map((v, i) => [v, f[(i + 1) % f.length] as number] as [number, number]);
    return flipped[fi] ? pairs.map(([a, b]) => [b, a]) : pairs;
  };
  const queue = [0];
  seen[0] = true;
  while (queue.length > 0) {
    const fi = queue.shift() as number;
    const mine = directed(fi);
    for (let gj = 0; gj < faces.length; gj++) {
      if (seen[gj]) continue;
      const theirs = directed(gj);
      const shared = theirs.some(([a, b]) =>
        mine.some(([c, d]) => (a === c && b === d) || (a === d && b === c)),
      );
      if (!shared) continue;
      // Si recorren una arista común en el mismo sentido, una de las dos está al revés.
      const same = theirs.some(([a, b]) => mine.some(([c, d]) => a === c && b === d));
      flipped[gj] = same ? !flipped[gj] : (flipped[gj] ?? false);
      seen[gj] = true;
      queue.push(gj);
    }
  }
  const verts = new Float32Array(points.length * 3);
  points.forEach((p, i) => verts.set(p, i * 3));
  const build = (invert: boolean): number[] =>
    tris.flatMap((list, fi) =>
      list.flatMap(([a, b, c]) => (flipped[fi] !== invert ? [a, c, b] : [a, b, c])),
    );
  const tryBuild = (invert: boolean): Manifold => {
    const mesh = new wasm.Mesh({
      numProp: 3,
      vertProperties: verts,
      triVerts: new Uint32Array(build(invert)),
    });
    return new wasm.Manifold(mesh);
  };
  const solid = tryBuild(false);
  // Si salió «del revés» (volumen negativo), se invierte todo.
  return solid.volume() < 0 ? tryBuild(true) : solid;
}

function operationSolid(wasm: ManifoldToplevel, op: Operation, extent: number): Manifold | null {
  switch (op.tipo) {
    case 'bloque':
    case 'ranura': {
      const min = [0, 1, 2].map((i) => Math.min(op.desde[i] as number, op.hasta[i] as number));
      const max = [0, 1, 2].map((i) => Math.max(op.desde[i] as number, op.hasta[i] as number));
      const size = [0, 1, 2].map((i) => (max[i] as number) - (min[i] as number)) as [
        number,
        number,
        number,
      ];
      return wasm.Manifold.cube(size).translate(min as [number, number, number]);
    }
    case 'cilindro': {
      const i = axisIndex(op.eje);
      const [j, k] = others(i);
      const circle = wasm.CrossSection.circle(op.radio, SEGMENTS).translate([
        op.centro[j],
        op.centro[k],
      ]);
      return prism(wasm, op.eje, circle, op.centro[i], op.centro[i] + op.largo);
    }
    case 'taladro': {
      const i = axisIndex(op.eje);
      const [j, k] = others(i);
      const circle = wasm.CrossSection.circle(op.diametro / 2, SEGMENTS).translate([
        op.centro[j],
        op.centro[k],
      ]);
      const start = op.centro[i] - op.sentido * 1; // un poco por fuera de la cara de entrada
      const depth = op.profundidad ?? extent * 3;
      return prism(wasm, op.eje, circle, start, op.centro[i] + op.sentido * depth);
    }
    case 'chaflan':
    case 'redondeo': {
      const [eu, ev] = op.en;
      const [hu, hv] = op.hacia;
      const t = op.tamano;
      const e = 0.5; // se alarga un poco hacia fuera para cortar limpio
      let points: [number, number][];
      if (op.tipo === 'chaflan') {
        points = [
          [eu - hu * e, ev - hv * e],
          [eu + hu * t, ev - hv * e],
          [eu + hu * t, ev],
          [eu, ev + hv * t],
          [eu - hu * e, ev + hv * t],
        ];
      } else {
        // Esquina menos un cuarto de círculo de radio t con centro hacia dentro del material.
        const cu = eu + hu * t;
        const cv = ev + hv * t;
        const arc: [number, number][] = [];
        const n = 12;
        for (let s = 0; s <= n; s++) {
          const ang = (Math.PI / 2) * (s / n);
          // De la dirección (0, −hv) a la (−hu, 0), pasando cerca de la esquina.
          arc.push([cu - hu * t * Math.sin(ang), cv - hv * t * Math.cos(ang)]);
        }
        points = [[eu - hu * e, ev - hv * e], [cu, ev - hv * e], ...arc, [eu - hu * e, cv]];
      }
      const i = axisIndex(op.eje);
      const lo = Math.min(op.desde, op.hasta) - 1;
      const hi = Math.max(op.desde, op.hasta) + 1;
      void i;
      return prism(wasm, op.eje, polygonSection(wasm, points), lo, hi);
    }
    case 'perfil':
      return prism(wasm, op.eje, polygonSection(wasm, op.puntos), op.desde, op.hasta);
    case 'poliedro':
      return polyhedron(wasm, op.puntos, op.caras);
    case 'convexo':
      return wasm.Manifold.hull(
        op.puntos.map((p) => [p[0], p[1], p[2]] as [number, number, number]),
      );
  }
}

const subtracts = (op: Operation): boolean =>
  op.tipo === 'ranura' ||
  op.tipo === 'taladro' ||
  op.tipo === 'chaflan' ||
  op.tipo === 'redondeo' ||
  (op.tipo === 'perfil' && op.quitar) ||
  (op.tipo === 'convexo' && op.quitar) ||
  (op.tipo === 'poliedro' && op.quitar);

/** Sólido de la pieza: las operaciones en orden, sumando o restando. */
export function buildSolid(wasm: ManifoldToplevel, piece: Piece): Manifold {
  let solid: Manifold | null = null;
  const extent = 200;
  for (const op of piece.operaciones) {
    const part = operationSolid(wasm, op, extent);
    if (!part) continue;
    if (!solid) {
      solid = subtracts(op) ? null : part;
      continue;
    }
    solid = subtracts(op) ? solid.subtract(part) : solid.add(part);
  }
  if (!solid) throw new Error(`La pieza ${piece.id} no tiene material.`);
  return solid;
}

/** Quita material con cajas (cortes): devuelve la parte que queda. */
export function cutWithBoxes(
  wasm: ManifoldToplevel,
  solid: Manifold,
  boxes: readonly { min: readonly number[]; max: readonly number[] }[],
): Manifold {
  let out = solid;
  for (const b of boxes) {
    const size = [0, 1, 2].map((i) => (b.max[i] as number) - (b.min[i] as number)) as [
      number,
      number,
      number,
    ];
    out = out.subtract(
      wasm.Manifold.cube(size).translate([b.min[0], b.min[1], b.min[2]] as [
        number,
        number,
        number,
      ]),
    );
  }
  return out;
}

export function toMesh(solid: Manifold): TriMesh {
  const mesh = solid.getMesh();
  const n = mesh.vertProperties.length / mesh.numProp;
  const positions = new Float64Array(n * 3);
  for (let v = 0; v < n; v++) {
    for (let k = 0; k < 3; k++)
      positions[v * 3 + k] = mesh.vertProperties[v * mesh.numProp + k] as number;
  }
  return { positions, triangles: new Uint32Array(mesh.triVerts) };
}

export function volume(solid: Manifold): number {
  return solid.volume();
}

// ---------- Carga del módulo WebAssembly ----------

let loading: Promise<ManifoldToplevel> | null = null;

/** Carga manifold-3d una sola vez. En el navegador, `wasmUrl` dice dónde está el .wasm. */
export function loadKernel(wasmUrl?: string): Promise<ManifoldToplevel> {
  loading ??= import('manifold-3d').then(async ({ default: Module }) => {
    const wasm = await Module(wasmUrl ? { locateFile: () => wasmUrl } : undefined);
    wasm.setup();
    return wasm;
  });
  return loading;
}
