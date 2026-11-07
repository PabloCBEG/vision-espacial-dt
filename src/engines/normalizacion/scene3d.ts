// Vista 3D del motor de normalización: la pieza, la caja de proyección con las vistas dibujadas
// en sus caras (sistema europeo: la pieza entre el observador y cada cara), el despliegue de
// la caja hasta quedar como en la lámina, y el corte con la parte de delante que se retira.
import { Group } from 'three';
import { createPoint, type Point } from '../../geometry/index.ts';
import type { SceneColors } from '../../render3d/sceneColors.ts';
import type { SceneModule } from '../../render3d/sceneModule.ts';
import { Sketch3D } from '../../render3d/sketch3d.ts';
import { rotateAboutAxis } from '../metodos/geometry.ts';
import type { NormController } from './controller.ts';
import type { TriMesh } from './kernel.ts';
import { meshEdges, type Seg2, type ViewName } from './views.ts';

const LAYERS = ['pieza', 'caja', 'corte'] as const;
type LayerName = (typeof LAYERS)[number];

/** Separación entre la pieza y las caras de la caja (mm). */
const MARGIN = 10;

export class NormScene implements SceneModule {
  readonly id = 'normalizacion';
  readonly root = new Group();
  private readonly sketches = new Map<LayerName, Sketch3D>();
  private readonly controller: NormController;
  private readonly edgeCache = new WeakMap<TriMesh, [Point, Point][]>();

  constructor(controller: NormController) {
    this.controller = controller;
    for (const name of LAYERS) {
      const sketch = new Sketch3D();
      this.sketches.set(name, sketch);
      this.root.add(sketch.layer.group);
    }
  }

  layers(): Iterable<readonly [string, Sketch3D['layer']]> {
    return [...this.sketches].map(([name, s]) => [name, s.layer] as const);
  }

  sync(): void {
    this.draw();
  }

  setColors(colors: SceneColors): void {
    for (const s of this.sketches.values()) s.setColors(colors);
  }

  setLineScale(scale: number): void {
    for (const s of this.sketches.values()) s.setLineScale(scale);
  }

  private sketch(name: LayerName): Sketch3D {
    const s = this.sketches.get(name);
    if (!s) throw new Error(name);
    return s;
  }

  draw(): void {
    for (const s of this.sketches.values()) s.begin();
    const d = this.controller.drawing;
    const data = this.controller.data;
    if (d && data) {
      const { quitar, desplegar } = this.controller.tweens.values;
      const piece = this.sketch('pieza');
      if (d.kept && quitar > 0) {
        this.drawMesh(piece, d.kept, 1);
        if (d.removed && quitar < 0.999) {
          const shift = towardObserver(data.corte?.vista ?? 'alzado', 45 * quitar);
          this.drawMesh(piece, moveMesh(d.removed, shift), 0.45 * (1 - quitar));
        }
      } else {
        this.drawMesh(piece, d.mesh, 1);
      }
      if (data.corte) this.drawCutPlane(data.corte.vista, data.corte.en, d.bounds);
      if (data.caja) this.drawBox(d, data.caja.proyectar, desplegar);
    }
    for (const s of this.sketches.values()) s.end();
  }

  private drawMesh(s: Sketch3D, mesh: TriMesh, opacity: number): void {
    s.solid(mesh.positions, mesh.triangles, 'solid', opacity);
    let edges = this.edgeCache.get(mesh);
    if (!edges) {
      edges = sharpEdges(mesh);
      this.edgeCache.set(mesh, edges);
    }
    if (opacity >= 0.999) s.segments(edges, 'data');
  }

  private drawCutPlane(
    view: ViewName,
    at: number,
    bounds: { min: readonly number[]; max: readonly number[] },
  ): void {
    const s = this.sketch('corte');
    const [x0, a0, c0] = bounds.min.map((v) => v - 8) as [number, number, number];
    const [x1, a1, c1] = bounds.max.map((v) => v + 8) as [number, number, number];
    const quad =
      view === 'alzado'
        ? [
            createPoint(x0, at, c0),
            createPoint(x1, at, c0),
            createPoint(x1, at, c1),
            createPoint(x0, at, c1),
          ]
        : view === 'planta'
          ? [
              createPoint(x0, a0, at),
              createPoint(x1, a0, at),
              createPoint(x1, a1, at),
              createPoint(x0, a1, at),
            ]
          : [
              createPoint(at, a0, c0),
              createPoint(at, a1, c0),
              createPoint(at, a1, c1),
              createPoint(at, a0, c1),
            ];
    s.fill(quad, 'result', 0.15);
    s.line([...quad, quad[0] as Point], 'process', { color: 'result' });
  }

  /**
   * Caja de proyección. Cada vista se dibuja en la cara opuesta al observador: el alzado en
   * la cara de detrás, la planta en la de abajo y el perfil izquierdo en la de la derecha.
   * Al desplegar, las caras de abajo y de la derecha giran hasta el plano de la de detrás.
   */
  private drawBox(
    d: NonNullable<NormController['drawing']>,
    project: readonly ViewName[],
    unfold: number,
  ): void {
    const s = this.sketch('caja');
    const [x0, a0, c0] = d.bounds.min.map((v) => v - MARGIN) as [number, number, number];
    const [x1, a1, c1] = d.bounds.max.map((v) => v + MARGIN) as [number, number, number];
    const angle = (-Math.PI / 2) * unfold;
    // Bisagras: abajo-detrás (a lo largo de x) y derecha-detrás (a lo largo de c).
    const bottom = (p: Point): Point =>
      rotateAboutAxis(p, createPoint(0, a0, c0), createPoint(1, 0, 0), angle);
    const right = (p: Point): Point =>
      rotateAboutAxis(p, createPoint(x1, a0, 0), createPoint(0, 0, 1), angle);
    const back = [
      createPoint(x0, a0, c0),
      createPoint(x1, a0, c0),
      createPoint(x1, a0, c1),
      createPoint(x0, a0, c1),
    ];
    const floor = [
      createPoint(x0, a0, c0),
      createPoint(x1, a0, c0),
      createPoint(x1, a1, c0),
      createPoint(x0, a1, c0),
    ].map(bottom);
    const side = [
      createPoint(x1, a0, c0),
      createPoint(x1, a1, c0),
      createPoint(x1, a1, c1),
      createPoint(x1, a0, c1),
    ].map(right);
    for (const face of [back, floor, side]) {
      s.fill(face, 'pv', 0.12);
      s.line([...face, face[0] as Point], 'aux', { color: 'pv' });
    }
    // Las vistas, dibujadas en su cara.
    const lines = (view: ViewName, map: (u: number, v: number) => Point): void => {
      const r = d.views[view];
      const pairs = (segs: readonly Seg2[]): [Point, Point][] =>
        segs.map((g) => [map(g.x1, g.y1), map(g.x2, g.y2)]);
      s.segments(pairs(r.visible), 'result');
      if (r.hidden.length) s.segments(pairs(r.hidden), 'aux', { dashed: true, color: 'result' });
    };
    if (project.includes('alzado')) lines('alzado', (u, v) => createPoint(u, a0, v));
    if (project.includes('planta')) lines('planta', (u, v) => bottom(createPoint(u, -v, c0)));
    if (project.includes('perfil')) lines('perfil', (u, v) => right(createPoint(x1, u, v)));
  }
}

function towardObserver(view: ViewName, distance: number): Point {
  return view === 'alzado'
    ? createPoint(0, distance, 0)
    : view === 'planta'
      ? createPoint(0, 0, distance)
      : createPoint(-distance, 0, 0);
}

function moveMesh(mesh: TriMesh, shift: Point): TriMesh {
  const positions = new Float64Array(mesh.positions.length);
  for (let i = 0; i < positions.length; i += 3) {
    positions[i] = (mesh.positions[i] as number) + shift.x;
    positions[i + 1] = (mesh.positions[i + 1] as number) + shift.a;
    positions[i + 2] = (mesh.positions[i + 2] as number) + shift.c;
  }
  return { positions, triangles: mesh.triangles };
}

/** Aristas vivas de la malla (más de 20° entre caras), para dibujar la pieza en 3D. */
function sharpEdges(mesh: TriMesh): [Point, Point][] {
  const { edges, points } = meshEdges(mesh);
  const normal = (t: number): [number, number, number] => {
    const p = [0, 1, 2].map((k) => {
      const v = mesh.triangles[t * 3 + k] as number;
      return [
        mesh.positions[v * 3] as number,
        mesh.positions[v * 3 + 1] as number,
        mesh.positions[v * 3 + 2] as number,
      ];
    }) as [number, number, number][];
    const [a, b, c] = p as [
      [number, number, number],
      [number, number, number],
      [number, number, number],
    ];
    const u = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
    const w = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
    const n: [number, number, number] = [
      (u[1] as number) * (w[2] as number) - (u[2] as number) * (w[1] as number),
      (u[2] as number) * (w[0] as number) - (u[0] as number) * (w[2] as number),
      (u[0] as number) * (w[1] as number) - (u[1] as number) * (w[0] as number),
    ];
    const l = Math.hypot(...n) || 1;
    return [n[0] / l, n[1] / l, n[2] / l];
  };
  const cos20 = Math.cos((20 * Math.PI) / 180);
  const out: [Point, Point][] = [];
  for (const e of edges) {
    const [t0, t1] = e.tris;
    if (t0 === undefined || t1 === undefined) continue;
    const n0 = normal(t0);
    const n1 = normal(t1);
    if (n0[0] * n1[0] + n0[1] * n1[1] + n0[2] * n1[2] > cos20) continue;
    const p = points[e.a] as [number, number, number];
    const q = points[e.b] as [number, number, number];
    out.push([createPoint(p[0], p[1], p[2]), createPoint(q[0], q[1], q[2])]);
  }
  return out;
}
