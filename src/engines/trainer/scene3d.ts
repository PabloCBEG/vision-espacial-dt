// Vista 3D del entrenador: las figuras de cada ítem y, al fallar o al pedirla, la solución
// animada (el giro aplicado, el plano que corta, la red que se pliega o la figura y sus vistas).
import { Group } from 'three';
import { createPoint, planePolygon, type Point } from '../../geometry/index.ts';
import type { SceneColors } from '../../render3d/sceneColors.ts';
import type { SceneModule } from '../../render3d/sceneModule.ts';
import { Sketch3D } from '../../render3d/sketch3d.ts';
import { rotateAboutAxis } from '../metodos/geometry.ts';
import { buildSolid } from '../solidos/construction.ts';
import { section } from '../solidos/polyhedron.ts';
import type { Item } from './items.ts';
import { foldNet } from './nets.ts';
import type { Polycube } from './polycube.ts';

const SIZE = 10; // mm por cubo

export class TrainerScene implements SceneModule {
  readonly id = 'entrenador';
  readonly root = new Group();
  private readonly sketch = new Sketch3D();
  item: Item | null = null;
  /** Progreso de la solución animada (0: sin mostrar). */
  solution = 0;

  constructor() {
    this.root.add(this.sketch.layer.group);
  }

  layers(): Iterable<readonly [string, Sketch3D['layer']]> {
    return [['entrenador', this.sketch.layer]];
  }

  sync(): void {
    this.draw();
  }

  setColors(colors: SceneColors): void {
    this.sketch.setColors(colors);
  }

  setLineScale(scale: number): void {
    this.sketch.setLineScale(scale);
  }

  draw(): void {
    const s = this.sketch;
    s.begin();
    const item = this.item;
    if (item) {
      switch (item.kind) {
        case 'rotacion': {
          // Modelo, flecha y modelo girado; debajo, la figura a la que hay que aplicar el giro.
          this.cubes(item.model, createPoint(-55, 0, 25), 'solid');
          this.cubes(item.turned, createPoint(15, 0, 25), 'solid');
          s.line([createPoint(-12, 0, 40), createPoint(8, 0, 40)], 'result');
          s.label('gira así', createPoint(-2, 0, 46), 'center', 'label-measure');
          s.label('A', createPoint(-55, 0, 70), 'ne', 'label-plane');
          s.label('A girada', createPoint(15, 0, 70), 'ne', 'label-plane');
          const angle = this.solution;
          const turned = rotateCells(item.target, item.turns, angle);
          this.cubesFree(turned, createPoint(-20, 30, -35), angle > 0 ? 'result' : 'solid');
          s.label('B', createPoint(-20, 30, -5), 'ne', 'label-plane');
          break;
        }
        case 'seccion': {
          const poly = buildSolid(item.solid);
          for (const f of poly.faces) s.fill(f.points, 'solid', 0.35);
          s.segments(
            poly.faces.flatMap((f) =>
              f.smooth
                ? []
                : f.points.map(
                    (p, i) => [p, f.points[(i + 1) % f.points.length] as Point] as [Point, Point],
                  ),
            ),
            'data',
          );
          // Plano de corte; con la solución, la sección resaltada.
          const p0 = item.plane.normal;
          const onPlane = createPoint(
            p0.x * item.plane.d,
            p0.a * item.plane.d,
            p0.c * item.plane.d,
          );
          const helper = { p1: onPlane, p2: onPlane, p3: onPlane, normal: p0 };
          s.fill(planePolygon(helper as never, 50), 'plane', 0.18);
          if (this.solution > 0) {
            const sec = section(poly, item.plane);
            if (sec) {
              s.fill(sec.polygon, 'result', 0.6 * this.solution);
              s.line([...sec.polygon, sec.polygon[0] as Point], 'result');
            }
          }
          break;
        }
        case 'desarrollo': {
          if (this.solution > 0) {
            const net = item.options[item.correct];
            if (net) {
              const faces = foldNet(net, this.solution);
              for (const f of faces) {
                const pts = f.map(([x, y, z]) =>
                  createPoint((x - 1.5) * 15, (y - 1.5) * 15, z * 15),
                );
                s.fill(pts, 'solid', 0.6);
                s.line([...pts, pts[0] as Point], 'data');
              }
            }
          } else {
            this.cubes([[0, 0, 0]], createPoint(-15, 15, 0), 'solid', 30);
          }
          break;
        }
        case 'vistas':
          this.cubes(item.model, createPoint(-20, 10, 0), this.solution > 0 ? 'result' : 'solid');
          break;
      }
    }
    s.end();
  }

  /** Figura de cubos con su esquina en `at` (cubos de `size` mm). */
  private cubes(p: Polycube, at: Point, color: 'solid' | 'result', size = SIZE): void {
    const positions: number[] = [];
    const triangles: number[] = [];
    const edges: [Point, Point][] = [];
    for (const [x, a, c] of p) {
      const o = createPoint(at.x + x * size, at.a + a * size, at.c + c * size);
      addCube(positions, triangles, edges, o, size);
    }
    this.sketch.solid(positions, triangles, color, 1);
    this.sketch.segments(edges, 'data');
  }

  /** Cubos ya colocados en el espacio (en giro), con su centro en `at`. */
  private cubesFree(corners: readonly Point[][], at: Point, color: 'solid' | 'result'): void {
    const positions: number[] = [];
    const triangles: number[] = [];
    const edges: [Point, Point][] = [];
    for (const cube of corners) {
      const pts = cube.map((p) => createPoint(at.x + p.x, at.a + p.a, at.c + p.c));
      const base = positions.length / 3;
      for (const p of pts) positions.push(p.x, p.a, p.c);
      for (const [i, j, k] of CUBE_TRIS) triangles.push(base + i, base + j, base + k);
      for (const [i, j] of CUBE_EDGES) edges.push([pts[i] as Point, pts[j] as Point]);
    }
    this.sketch.solid(positions, triangles, color, 1);
    this.sketch.segments(edges, 'data');
  }
}

// Cubo unidad: esquinas 0..7 (bit 0: x, bit 1: a, bit 2: c), triángulos hacia fuera.
const CUBE_TRIS: readonly [number, number, number][] = [
  [0, 2, 1],
  [1, 2, 3], // c = 0
  [4, 5, 6],
  [5, 7, 6], // c = 1
  [0, 1, 4],
  [1, 5, 4], // a = 0
  [2, 6, 3],
  [3, 6, 7], // a = 1
  [0, 4, 2],
  [2, 4, 6], // x = 0
  [1, 3, 5],
  [3, 7, 5], // x = 1
];
const CUBE_EDGES: readonly [number, number][] = [
  [0, 1],
  [2, 3],
  [4, 5],
  [6, 7],
  [0, 2],
  [1, 3],
  [4, 6],
  [5, 7],
  [0, 4],
  [1, 5],
  [2, 6],
  [3, 7],
];

function corners(o: Point, size: number): Point[] {
  return Array.from({ length: 8 }, (_, i) =>
    createPoint(o.x + (i & 1 ? size : 0), o.a + (i & 2 ? size : 0), o.c + (i & 4 ? size : 0)),
  );
}

function addCube(
  positions: number[],
  triangles: number[],
  edges: [Point, Point][],
  o: Point,
  size: number,
): void {
  const pts = corners(o, size);
  const base = positions.length / 3;
  for (const p of pts) positions.push(p.x, p.a, p.c);
  for (const [i, j, k] of CUBE_TRIS) triangles.push(base + i, base + j, base + k);
  for (const [i, j] of CUBE_EDGES) edges.push([pts[i] as Point, pts[j] as Point]);
}

/** Esquinas de cada cubo de la figura girada una fracción t de los cuartos de vuelta. */
function rotateCells(
  p: Polycube,
  turns: readonly { axis: 0 | 1 | 2; times: number }[],
  t: number,
): Point[][] {
  const n = p.length;
  const center = [0, 1, 2].map(
    (i) => (p.reduce((s, c) => s + (c[i] as number), 0) / n + 0.5) * SIZE,
  );
  const o = createPoint(center[0] as number, center[1] as number, center[2] as number);
  // Los giros se aplican uno tras otro; t recorre el total.
  const total = turns.length;
  return p.map(([x, a, c]) =>
    corners(createPoint(x * SIZE, a * SIZE, c * SIZE), SIZE).map((q) => {
      let r = q;
      turns.forEach((turn, i) => {
        const local = Math.max(0, Math.min(1, t * total - i));
        const axis =
          turn.axis === 0
            ? createPoint(1, 0, 0)
            : turn.axis === 1
              ? createPoint(0, 1, 0)
              : createPoint(0, 0, 1);
        r = rotateAboutAxis(r, o, axis, (Math.PI / 2) * turn.times * local);
      });
      return createPoint(r.x - o.x, r.a - o.a, r.c - o.c);
    }),
  );
}
