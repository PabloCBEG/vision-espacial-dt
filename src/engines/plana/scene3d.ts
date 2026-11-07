// Vista 3D del motor plano (puente 3D): la figura en su plano, la luz (foco o sol), los rayos,
// la sombra sobre el otro plano y el giro de ese plano hasta caer sobre el de la figura.
import { Group } from 'three';
import { createPoint, type Point } from '../../geometry/index.ts';
import { add, scale, sub } from '../../geometry/vector.ts';
import type { SceneColors } from '../../render3d/sceneColors.ts';
import type { SceneModule } from '../../render3d/sceneModule.ts';
import { Sketch3D } from '../../render3d/sketch3d.ts';
import { rotateAboutAxis } from '../metodos/geometry.ts';
import { buildBridge } from './bridge.ts';
import type { PlaneController } from './controller.ts';
import { bridgeInput } from './runtimeHelpers.ts';

export class PlaneScene implements SceneModule {
  readonly id = 'plana';
  readonly root = new Group();
  private readonly sketch = new Sketch3D();
  private readonly controller: PlaneController;
  /** Giro del plano de la sombra (0 en su sitio, 1 abatido). Lo anima el motor. */
  fold = 0;

  constructor(controller: PlaneController) {
    this.controller = controller;
    this.root.add(this.sketch.layer.group);
  }

  layers(): Iterable<readonly [string, Sketch3D['layer']]> {
    return [['puente', this.sketch.layer]];
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
    const input = bridgeInput(this.controller);
    const scene = input ? buildBridge(input, this.fold) : null;
    if (input && scene) {
      const [e1, e2] = scene.axis;
      const dir = scale(sub(e2, e1), 1 / Math.hypot(e2.x - e1.x, e2.a - e1.a, e2.c - e1.c));
      const mid = scale(add(e1, e2), 0.5);
      const across = createPoint(-dir.a, dir.x, 0); // en el plano de la figura, ⟂ al eje
      const side = scene.figure.reduce(
        (sum, p) => sum + (p.x - mid.x) * across.x + (p.a - mid.a) * across.a,
        0,
      );
      const toward = side >= 0 ? across : scale(across, -1);
      const half = 70;
      const span = 70;
      // Plano de la figura (rectángulo apoyado en el eje, del lado de la figura).
      const a0 = add(mid, scale(dir, -half));
      const a1 = add(mid, scale(dir, half));
      const figurePlane = [a0, a1, add(a1, scale(toward, span)), add(a0, scale(toward, span))];
      s.fill(figurePlane, 'ph', 0.16);
      s.line([...figurePlane, a0], 'aux', { color: 'ph' });
      // Plano de la sombra: gira θ alrededor del eje respecto al de la figura; el rectángulo
      // se pone del lado donde cae la sombra. Al abatirlo, el giro baja de θ a 0.
      const theta = -scene.angle;
      const still = buildBridge(input, 0);
      const target = still ? centroid(still.shadow) : mid;
      const sideOf = (sign: number): Point =>
        rotateAboutAxis(add(mid, scale(toward, (sign * span) / 2)), a0, dir, theta);
      const sign = dist3(sideOf(1), target) < dist3(sideOf(-1), target) ? 1 : -1;
      const raw = [
        a0,
        a1,
        add(a1, scale(toward, sign * span)),
        add(a0, scale(toward, sign * span)),
      ];
      const shadowPlane = raw.map((p) => rotateAboutAxis(p, a0, dir, theta * (1 - this.fold)));
      s.fill(shadowPlane, 'pv', 0.16);
      s.line([...shadowPlane, shadowPlane[0] ?? a0], 'aux', { color: 'pv' });
      s.line([e1, e2], 'data', { color: 'process' });
      s.label('eje', add(a1, scale(dir, -6)), 'ne', 'label-measure');

      // Figura, luz, rayos y sombra.
      s.line(closed(scene.figure), 'data');
      s.fill(scene.figure, 'solid', 0.35);
      s.line(closed(scene.shadow), 'result');
      s.fill(scene.shadow, 'result', 0.25);
      if (scene.focus) {
        s.dot(scene.focus, 'result', 2);
        s.label('V', scene.focus, 'ne');
      }
      if (this.fold < 0.05) {
        scene.figure.forEach((p, i) => {
          const q = scene.shadow[i];
          if (!q) return;
          const from = scene.focus ?? add(p, scale(sub(p, q), 0.6));
          s.line([from, q], 'aux', { dashed: true, color: 'result' });
        });
      }
    }
    s.end();
  }
}

function closed(points: readonly Point[]): Point[] {
  const first = points[0];
  return first ? [...points, first] : [];
}

function centroid(points: readonly Point[]): Point {
  const n = points.length || 1;
  return createPoint(
    points.reduce((t, p) => t + p.x, 0) / n,
    points.reduce((t, p) => t + p.a, 0) / n,
    points.reduce((t, p) => t + p.c, 0) / n,
  );
}

const dist3 = (p: Point, q: Point): number => Math.hypot(p.x - q.x, p.a - q.a, p.c - q.c);
