// Vista 3D del motor de sólidos: el sólido con sus aristas vistas y ocultas según la cámara,
// el plano que lo corta, la sección, la parte que se retira, la recta que lo atraviesa,
// los puntos de su superficie y el desarrollo que se pliega y despliega.
import { Group, type Camera } from 'three';
import {
  createPoint,
  foldHorizontalProjection,
  planePolygon,
  type Point,
} from '../../geometry/index.ts';
import { fromThree } from '../../render3d/coords.ts';
import type { SceneColors } from '../../render3d/sceneColors.ts';
import type { SceneModule } from '../../render3d/sceneModule.ts';
import { Sketch3D } from '../../render3d/sketch3d.ts';
import type { AppState } from '../../state/index.ts';
import type { SolidScene } from './construction.ts';
import type { SolidsController } from './controller.ts';
import { centroid, dot, edges, faceNormal, sub, type Polyhedron } from './polyhedron.ts';

const LAYERS = [
  'solido',
  'vertices',
  'corte',
  'seccion',
  'seccion-vm',
  'recta-solido',
  'superficie',
  'desarrollo',
] as const;
type LayerName = (typeof LAYERS)[number];

export class SolidsScene implements SceneModule {
  readonly id = 'solidos';
  readonly root = new Group();
  private readonly sketches = new Map<LayerName, Sketch3D>();
  private readonly controller: SolidsController;
  private foldAngle = 0;
  private eye: Point = createPoint(200, 150, 250);

  constructor(controller: SolidsController) {
    this.controller = controller;
    for (const name of LAYERS) {
      const sketch = new Sketch3D();
      this.sketches.set(name, sketch);
      this.root.add(sketch.layer.group);
    }
  }

  layers(): Iterable<readonly [string, Sketch3D['layer']]> {
    return [...this.sketches].map(([name, sketch]) => [name, sketch.layer] as const);
  }

  sync(state: AppState): void {
    this.foldAngle = state.foldAngle;
    this.draw();
  }

  setColors(colors: SceneColors): void {
    for (const sketch of this.sketches.values()) sketch.setColors(colors);
  }

  setLineScale(scale: number): void {
    for (const sketch of this.sketches.values()) sketch.setLineScale(scale);
  }

  /** Las aristas ocultas dependen de desde dónde se mire: se recalculan al girar la cámara. */
  updateForCamera(camera: Camera): void {
    const eye = fromThree(camera.position);
    if (Math.hypot(eye.x - this.eye.x, eye.a - this.eye.a, eye.c - this.eye.c) < 0.5) return;
    this.eye = eye;
    this.drawSolidOnly();
  }

  draw(): void {
    for (const sketch of this.sketches.values()) sketch.begin();
    const scene = this.controller.scene;
    if (scene) this.drawScene(scene);
    for (const sketch of this.sketches.values()) sketch.end();
  }

  private drawSolidOnly(): void {
    const scene = this.controller.scene;
    const sketch = this.sketch('solido');
    sketch.begin();
    if (scene) this.drawSolid(scene);
    sketch.end();
  }

  private sketch(name: LayerName): Sketch3D {
    const sketch = this.sketches.get(name);
    if (!sketch) throw new Error(`Capa ${name} desconocida`);
    return sketch;
  }

  private onPH = (p: Point): Point => foldHorizontalProjection(p, this.foldAngle);

  private drawScene(scene: SolidScene): void {
    this.drawSolid(scene);
    const labels = this.sketch('vertices');
    for (const v of scene.names) labels.label(v.name, v.p, 'ne');

    const cut = scene.cut;
    if (cut) {
      const plane = this.sketch('corte');
      const polygon = planePolygon(cut.geometric, 70);
      plane.fill(polygon, 'plane', 0.18);
      plane.line([...polygon, polygon[0] ?? createPoint(0, 0, 0)], 'aux', { color: 'plane' });
      if (cut.section) {
        const s = this.sketch('seccion');
        const poly = cut.section.polygon;
        s.fill(poly, 'result', 0.45);
        s.line(closed(poly), 'result');
        if (!scene.smooth) poly.forEach((p, i) => s.label(String(i + 1), p, 'sw', 'label-measure'));
      }
      if (cut.section && cut.hinge && this.controller.tweens.values.abatir > 0) {
        const vm = this.sketch('seccion-vm');
        const done = this.controller.tweens.values.abatir >= 0.999;
        const onPH = cut.onto === 'PH';
        const place = (p: Point): Point => (done && onPH ? this.onPH(p) : p);
        const folded = cut.folded.map(place);
        vm.fill(folded, 'result', 0.3);
        vm.line(closed(folded), done ? 'result' : 'process');
        const d = cut.hinge.direction;
        const o = cut.hinge.origin;
        const h0 = createPoint(o.x - d.x * 80, o.a - d.a * 80, o.c - d.c * 80);
        const h1 = createPoint(o.x + d.x * 80, o.a + d.a * 80, o.c + d.c * 80);
        vm.line(onPH ? [this.onPH(h0), this.onPH(h1)] : [h0, h1], 'process', { color: 'plane' });
        if (done && !scene.smooth) {
          folded.forEach((p, i) => vm.label(`(${i + 1})`, p, 'se', 'label-measure'));
        }
      }
    }

    const line = scene.line;
    if (line) {
      const r = this.sketch('recta-solido');
      if (line.hits) {
        const [E, S] = line.hits;
        r.line([line.A, E], 'data', { color: 'line' });
        r.line([S, line.B], 'data', { color: 'line' });
        r.line([E, S], 'aux', { dashed: true, color: 'line' });
        r.dot(E, 'result');
        r.dot(S, 'result');
        r.label('E', E, 'nw');
        r.label('S', S, 'ne');
      } else {
        r.line([line.A, line.B], 'data', { color: 'line' });
      }
      r.label(line.name, line.B, 'e');
    }

    const point = scene.point;
    if (point) {
      const s = this.sketch('superficie');
      if (point.generatrix) s.line([...point.generatrix], 'process');
      if (point.parallel) s.line(closed(point.parallel), 'process');
      s.dot(point.p, 'result', 1.8);
      s.label(point.name, point.p, 'ne');
    }

    const dev = scene.development;
    if (dev) {
      const s = this.sketch('desarrollo');
      const flat = this.controller.tweens.values.desarrollo >= 0.999;
      const place = (p: Point): Point => (flat && Math.abs(p.c) < 1e-6 ? this.onPH(p) : p);
      const smoothEdges = smoothEdgeKeys(dev.poly);
      dev.faces.forEach((face, i) => {
        const pts = face.map(place);
        const original = dev.poly.faces[i];
        if (!original) return;
        s.fill(
          pts,
          original.kind === 'cap' ? 'result' : 'solid',
          original.kind === 'cap' ? 0.4 : 0.32,
        );
        // Aristas de cada cara, menos las que unen dos caras lisas (cono, cilindro).
        original.points.forEach((p, j) => {
          const q = original.points[(j + 1) % original.points.length] as Point;
          if (smoothEdges.has(edgeKey(p, q))) return;
          const a = pts[j];
          const b = pts[(j + 1) % pts.length];
          if (a && b) s.line([a, b], 'data');
        });
      });
    }
  }

  /** Sólido (entero o cortado) con caras translúcidas y aristas vistas u ocultas. */
  private drawSolid(scene: SolidScene): void {
    const s = this.sketch('solido');
    const quitar = this.controller.tweens.values.quitar;
    const cut = scene.cut;
    if (cut && cut.kept && quitar > 0) {
      this.drawPolyhedron(s, cut.kept, 0.38);
      if (cut.removed && quitar < 0.999) this.drawPolyhedron(s, cut.removed, 0.38 * (1 - quitar));
    } else {
      this.drawPolyhedron(s, scene.solid, 0.38);
    }
  }

  private drawPolyhedron(s: Sketch3D, poly: Polyhedron, opacity: number): void {
    const facing = poly.faces.map((f) => dot(faceNormal(f), sub(this.eye, centroid(f.points))) > 0);
    for (const f of poly.faces) s.fill(f.points, f.kind === 'cap' ? 'result' : 'solid', opacity);
    for (const e of edges(poly)) {
      const [f0, f1] = e.faces;
      const a = poly.faces[f0];
      const b = poly.faces[f1];
      if (!a || !b) continue;
      const contour = facing[f0] !== facing[f1];
      if (a.smooth && b.smooth && !contour) continue;
      const visible = Boolean(facing[f0] || facing[f1]);
      s.line([e.p, e.q], visible ? 'data' : 'aux', { dashed: !visible, color: 'data' });
    }
  }
}

function closed(points: readonly Point[]): Point[] {
  const first = points[0];
  return points.length >= 3 && first ? [...points, first] : [...points];
}

const pointKey = (p: Point): string =>
  `${Math.round(p.x * 1e4)},${Math.round(p.a * 1e4)},${Math.round(p.c * 1e4)}`;

export function edgeKey(p: Point, q: Point): string {
  const a = pointKey(p);
  const b = pointKey(q);
  return a < b ? `${a}|${b}` : `${b}|${a}`;
}

/** Aristas entre dos caras lisas: no se dibujan (no son aristas de verdad). */
export function smoothEdgeKeys(poly: Polyhedron): Set<string> {
  const out = new Set<string>();
  for (const e of edges(poly)) {
    const a = poly.faces[e.faces[0]];
    const b = poly.faces[e.faces[1]];
    if (a?.smooth && b?.smooth) out.add(edgeKey(e.p, e.q));
  }
  return out;
}
