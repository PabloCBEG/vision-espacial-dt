// Vista 3D del motor de métodos: cada método se ve como un movimiento físico.
// - Abatimiento: el plano gira como una bisagra alrededor de la charnela, con sus puntos.
// - Giro: la figura gira alrededor de un eje vertical o de punta; se ven los arcos.
// - Cambio de plano: aparece un plano de proyección nuevo y las proyectantes llegan a él.
import { Group } from 'three';
import {
  createPoint,
  foldHorizontalProjection,
  planePolygon,
  type Point,
} from '../../geometry/index.ts';
import { add, scale } from '../../geometry/vector.ts';
import type { SceneColors } from '../../render3d/sceneColors.ts';
import type { SceneModule } from '../../render3d/sceneModule.ts';
import { arcPoints, Sketch3D } from '../../render3d/sketch3d.ts';
import type { AppState } from '../../state/index.ts';
import {
  changeProjections,
  measureOf,
  movedFigure,
  movedName,
  type Construction,
} from './construction.ts';
import type { MethodsController } from './controller.ts';
import { foldPoint, newPlaneFrame, rotateAboutAxisKind, conePoint } from './geometry.ts';

const LAYERS = [
  'figura',
  'charnela',
  'eje',
  'nueva-lt',
  'movimiento',
  'resultado',
  'medida',
  'perpendicular',
  'cono',
] as const;
type LayerName = (typeof LAYERS)[number];

export class MethodsScene implements SceneModule {
  readonly id = 'metodos';
  readonly root = new Group();
  private readonly sketches = new Map<LayerName, Sketch3D>();
  private readonly controller: MethodsController;
  private foldAngle = 0;

  constructor(controller: MethodsController) {
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

  /** Vuelve a dibujar con el progreso actual del movimiento. */
  draw(): void {
    for (const sketch of this.sketches.values()) sketch.begin();
    const k = this.controller.construction;
    if (k) this.drawConstruction(k, this.controller.progress);
    for (const sketch of this.sketches.values()) sketch.end();
  }

  private sketch(name: LayerName): Sketch3D {
    const sketch = this.sketches.get(name);
    if (!sketch) throw new Error(`Capa ${name} desconocida`);
    return sketch;
  }

  /** Lo que está sobre el PH gira con él al abatirlo sobre el PV. */
  private onPH = (p: Point): Point => foldHorizontalProjection(p, this.foldAngle);

  private drawConstruction(k: Construction, t: number): void {
    const figure = this.sketch('figura');
    const pts = k.figure.map((f) => f.p);
    figure.line(closed(pts), 'data');
    if (pts.length >= 3) figure.fill(pts, 'plane', 0.16);
    for (const f of k.figure) {
      if (!f.computed) continue;
      figure.dot(f.p, 'data');
      figure.label(f.name, f.p, 'ne');
    }

    if (k.perpendicular) {
      const [from, foot] = k.perpendicular;
      this.sketch('perpendicular').line([from.p, foot.p], 'process');
    }

    if (k.cone) this.drawCone(k);

    switch (k.method) {
      case 'abatimiento':
        this.drawFold(k, t);
        break;
      case 'giro':
        this.drawTurn(k, t);
        break;
      case 'cambio':
        this.drawChange(k, t);
        break;
      case null:
        break;
    }

    // Medida en el espacio, sobre el resultado, al acabar el movimiento.
    const m = measureOf(k);
    if (m && t >= 0.999 && k.method !== null) {
      const moved = k.method === 'cambio' ? changeProjections(k) : movedFigure(k, 1);
      const at = centroid(moved);
      this.sketch('medida').label(
        m.text,
        k.method === 'abatimiento' && k.onto === 'PH' ? this.onPH(at) : at,
        'e',
        'label-measure',
      );
    }
  }

  private drawFold(k: Extract<Construction, { method: 'abatimiento' }>, t: number): void {
    const { hinge, onto } = k;
    const place = (p: Point): Point => (onto === 'PH' && t >= 0.999 ? this.onPH(p) : p);
    // Charnela: la traza alrededor de la que gira el plano.
    const center = hingeCenter(k);
    const a = add(center, scale(hinge.direction, -75));
    const b = add(center, scale(hinge.direction, 75));
    const fold = onto === 'PH' ? this.onPH : (p: Point) => p;
    const charnela = this.sketch('charnela');
    charnela.line([fold(a), fold(b)], 'data', { color: 'process' });
    charnela.label(
      'charnela',
      fold(add(center, scale(hinge.direction, -60))),
      'nw',
      'label-measure',
    );

    // Arcos de cada punto, de su posición en el espacio a la de ahora.
    const movement = this.sketch('movimiento');
    const moved = movedFigure(k, t);
    k.figure.forEach((f, i) => {
      const arc = arcPoints((s) => foldPoint(f.p, hinge, s), t);
      movement.line(arc.map(place), 'process', { dashed: true });
      const end = moved[i];
      if (end) movement.line([place(foot(f.p, k)), place(end)], 'aux');
    });

    const result = this.sketch('resultado');
    const final = moved.map(place);
    result.line(closed(final), t >= 0.999 ? 'result' : 'process');
    if (final.length >= 3) result.fill(final, 'result', 0.14);
    k.figure.forEach((f, i) => {
      const p = final[i];
      if (!p) return;
      result.dot(p, 'result');
      if (t >= 0.999) result.label(movedName('abatimiento', f.name), p, 'sw');
    });
  }

  private drawTurn(k: Extract<Construction, { method: 'giro' }>, t: number): void {
    // Eje: vertical o de punta, por el punto elegido.
    const dir = k.axis === 'vertical' ? createPoint(0, 0, 1) : createPoint(0, 1, 0);
    const eje = this.sketch('eje');
    const base =
      k.axis === 'vertical'
        ? createPoint(k.through.x, k.through.a, 0)
        : createPoint(k.through.x, 0, k.through.c);
    eje.line([base, add(base, scale(dir, 70))], 'data', { color: 'process' });
    eje.label('e', add(base, scale(dir, 64)), 'e', 'label-measure');

    const movement = this.sketch('movimiento');
    for (const f of k.figure) {
      const arc = arcPoints((s) => rotateAboutAxisKind(f.p, k.axis, k.through, k.angle * s), t);
      movement.line(arc, 'process', { dashed: true });
    }

    // Figura girada y sus proyecciones (A′₁B′₁ en el PH y A″₁B″₁ en el PV).
    const result = this.sketch('resultado');
    const moved = movedFigure(k, t);
    const done = t >= 0.999;
    result.line(moved, done ? 'result' : 'process');
    const onPV = moved.map((p) => createPoint(p.x, 0, p.c));
    const onPHs = moved.map((p) => this.onPH(createPoint(p.x, p.a, 0)));
    const vm = k.axis === 'vertical' ? onPV : onPHs;
    const other = k.axis === 'vertical' ? onPHs : onPV;
    result.line(vm, done ? 'result' : 'process');
    result.line(other, 'aux');
    moved.forEach((p, i) => {
      const v = onPV[i];
      const h = onPHs[i];
      if (v) movement.line([p, v], 'aux', { dashed: true });
      if (h && this.foldAngle === 0) movement.line([p, h], 'aux', { dashed: true });
      result.dot(p, 'result');
      const f = k.figure[i];
      // El punto del eje no se mueve: no se rotula dos veces.
      const still = f ? Math.hypot(p.x - f.p.x, p.a - f.p.a, p.c - f.p.c) < 0.5 : true;
      if (done && f && !still) result.label(`${f.name}₁`, p, 'ne');
    });
  }

  private drawChange(k: Extract<Construction, { method: 'cambio' }>, t: number): void {
    // Plano de proyección nuevo: rectángulo translúcido sobre la LT₁.
    const { origin, along } = newPlaneFrame(k.lt);
    const up = k.lt.kind === 'vertical' ? createPoint(0, 0, 1) : createPoint(0, 1, 0);
    const length = Math.hypot(k.lt.p2.x - k.lt.p1.x, k.lt.p2.y - k.lt.p1.y);
    const end = add(origin, scale(along, length));
    const height = 70;
    const corners = [origin, end, add(end, scale(up, height)), add(origin, scale(up, height))];
    const plane = this.sketch('nueva-lt');
    plane.fill(corners, 'newPlane', 0.16);
    plane.line(closed(corners), 'aux', { color: 'newPlane' });
    plane.line([origin, end], 'data', { color: 'newPlane' });
    plane.label(
      k.lt.kind === 'vertical' ? 'PV₁' : 'PH₁',
      add(corners[3] ?? origin, scale(along, 6)),
      'se',
      'label-plane',
    );
    plane.label('LT₁', add(origin, scale(along, 4)), 'sw', 'label-measure');

    // Proyectantes nuevas: de cada punto al plano nuevo, perpendiculares a él.
    const targets = changeProjections(k);
    const movement = this.sketch('movimiento');
    const result = this.sketch('resultado');
    k.figure.forEach((f, i) => {
      const q = targets[i];
      if (!q) return;
      const tip = add(f.p, scale(add(q, scale(f.p, -1)), t));
      movement.line([f.p, tip], 'process', { dashed: true });
      if (t >= 0.999) {
        result.dot(q, 'result');
        const mark = k.lt.kind === 'vertical' ? '″' : '′';
        result.label(`${f.name}${mark}₁`, q, 'ne');
      }
    });
    if (t >= 0.999) result.line(closed(targets), 'result');
  }

  private drawCone(k: Construction): void {
    const c = k.cone;
    if (!c) return;
    const sketch = this.sketch('cono');
    const { cone } = c;
    const ring: Point[] = [];
    for (let i = 0; i <= 48; i++) ring.push(conePoint(cone, (i * 360) / 48));
    const tri: Point[] = [];
    for (let i = 0; i < 48; i++) {
      const p = ring[i];
      const q = ring[i + 1];
      if (p && q) tri.push(cone.apex, p, q);
    }
    const onBase = cone.target === 'PH' ? this.onPH : (p: Point) => p;
    sketch.triangles(tri, 'plane', 0.14);
    sketch.line(ring.map(onBase), 'aux');
    sketch.dot(cone.apex, 'data');
    // Generatriz elegida: la recta con el ángulo pedido.
    sketch.line([cone.apex, c.base], 'result');
    sketch.label('r', c.base, 'se');
    if (c.tangent) {
      const polygon = planePolygon(c.tangent);
      sketch.fill(polygon, 'result', 0.1);
    }
  }
}

function closed(points: readonly Point[]): Point[] {
  const first = points[0];
  return points.length >= 3 && first ? [...points, first] : [...points];
}

function centroid(points: readonly Point[]): Point {
  const n = points.length || 1;
  return createPoint(
    points.reduce((s, p) => s + p.x, 0) / n,
    points.reduce((s, p) => s + p.a, 0) / n,
    points.reduce((s, p) => s + p.c, 0) / n,
  );
}

/** Pie de un punto sobre la charnela. */
function foot(p: Point, k: Extract<Construction, { method: 'abatimiento' }>): Point {
  const d = k.hinge.direction;
  const o = k.hinge.origin;
  const s = (p.x - o.x) * d.x + (p.a - o.a) * d.a + (p.c - o.c) * d.c;
  return add(o, scale(d, s));
}

/** Punto de la charnela frente al centro de la figura (para dibujarla centrada). */
function hingeCenter(k: Extract<Construction, { method: 'abatimiento' }>): Point {
  return foot(centroid(k.figure.map((f) => f.p)), k);
}
