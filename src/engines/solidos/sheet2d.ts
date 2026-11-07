// Lámina del motor de sólidos: planta y alzado con aristas vistas (continua gruesa) y ocultas
// (discontinua fina), trazas del plano de corte, sección, su verdadera magnitud, recta con
// sus puntos de entrada y salida, puntos de la superficie y desarrollo.
import { clipToBox, pointAt, type Point, type SheetPoint } from '../../geometry/index.ts';
import type { SheetDrawContext, SheetModule } from '../../render2d/sheetModule.ts';
import {
  arcBetween,
  dot as drawDot,
  longLine,
  polygon,
  polyline,
} from '../../render2d/sketch2d.ts';
import type { ViewBox } from '../../render2d/viewport.ts';
import { foldPoint, hingeFoot } from '../metodos/geometry.ts';
import type { SolidScene } from './construction.ts';
import type { SolidsController } from './controller.ts';
import {
  dot,
  faceNormal,
  towardObserver,
  viewEdges,
  type Polyhedron,
  type ViewDirection,
} from './polyhedron.ts';
import { edgeKey, smoothEdgeKeys } from './scene3d.ts';

const plan = (p: Point): SheetPoint => ({ x: p.x, y: -p.a });
const elevation = (p: Point): SheetPoint => ({ x: p.x, y: p.c });
const VIEWS: readonly [ViewDirection, (p: Point) => SheetPoint][] = [
  ['plan', plan],
  ['elevation', elevation],
];

export class SolidsSheet implements SheetModule {
  readonly id = 'solidos';
  private readonly controller: SolidsController;

  constructor(controller: SolidsController) {
    this.controller = controller;
  }

  fitBox(): ViewBox | null {
    const scene = this.controller.scene;
    if (!scene) return null;
    const pts: SheetPoint[] = [];
    for (const f of scene.solid.faces) for (const p of f.points) pts.push(plan(p), elevation(p));
    if (scene.cut?.section && scene.cut.hinge) {
      for (const p of scene.cut.section.polygon) pts.push(foldFull(scene, p));
    }
    const dev = scene.development ? developmentLayout(scene) : null;
    if (dev) for (const face of dev.faces) pts.push(...face);
    if (scene.line)
      pts.push(
        plan(scene.line.A),
        plan(scene.line.B),
        elevation(scene.line.A),
        elevation(scene.line.B),
      );
    return box(pts, 14);
  }

  draw(ctx: SheetDrawContext): void {
    const scene = this.controller.scene;
    if (!scene) return;
    const values = this.controller.tweens.values;
    const truncated = scene.cut?.kept && values.quitar >= 0.999 ? scene.cut.kept : null;
    this.drawSolid(ctx, truncated ?? scene.solid);
    this.drawVertexLabels(ctx, scene, truncated);
    if (scene.cut) this.drawCut(ctx, scene, values.abatir);
    if (scene.line) this.drawLine(ctx, scene);
    if (scene.point) this.drawPoint(ctx, scene, values.punto);
    if (scene.development && values.desarrollo >= 0.999) this.drawDevelopment(ctx, scene);
  }

  private drawSolid(ctx: SheetDrawContext, poly: Polyhedron): void {
    const g = ctx.layer('solido');
    for (const [view, to] of VIEWS) {
      // Primero las ocultas, para que las vistas queden encima.
      const list = viewEdges(poly, view).sort((a, b) => Number(a.visible) - Number(b.visible));
      for (const e of list) {
        polyline(g, [to(e.p), to(e.q)], 'data', { hidden: !e.visible, className: 'solid-edge' });
      }
    }
  }

  private drawVertexLabels(
    ctx: SheetDrawContext,
    scene: SolidScene,
    truncated: Polyhedron | null,
  ): void {
    const g = ctx.layer('vertices');
    const u = ctx.mmPerPx;
    const all = (truncated ?? scene.solid).faces.flatMap((f) => f.points);
    for (const [view, to] of VIEWS) {
      const center = mean(all.map(to));
      for (const v of scene.names) {
        if (truncated && !all.some((p) => same(p, v.p))) continue;
        const s = to(v.p);
        const mark = view === 'plan' ? '′' : '″';
        const at = outward(s, center, 11 * u);
        g.append(ctx.label(`${v.name}${mark}`, at.x, -at.y + 5 * u, 'middle'));
      }
    }
  }

  private drawCut(ctx: SheetDrawContext, scene: SolidScene, abatir: number): void {
    const cut = scene.cut;
    if (!cut) return;
    const u = ctx.mmPerPx;
    // Trazas del plano de corte.
    const traces = ctx.layer('corte');
    const { alpha1, alpha2 } = cut.traces;
    for (const [trace, name, to, half] of [
      [alpha1, `${cut.name}₁`, plan, -1],
      [alpha2, `${cut.name}₂`, elevation, 1],
    ] as const) {
      if (!trace) continue;
      const range = clipToBox(trace, 400);
      if (!range) continue;
      const [a, b] = longLine(to(pointAt(trace, range[0])), to(pointAt(trace, range[1])), 92);
      // Cada traza, en su mitad de la lámina: α₁ bajo la LT y α₂ sobre ella.
      const piece = halfPlane(a, b, half);
      if (!piece) continue;
      polyline(traces, piece, 'data', { className: 'cut-trace' });
      // Rótulo dentro del encuadre: a 38 mm de la LT (o en el extremo derecho si es paralela).
      const [p0, p1] = piece;
      const dy = p1.y - p0.y;
      let at = p0.x > p1.x ? p0 : p1;
      if (Math.abs(dy) > 1e-6) {
        const target = half * Math.min(38, Math.max(Math.abs(p0.y), Math.abs(p1.y)));
        const t = Math.max(0, Math.min(1, (target - p0.y) / dy));
        at = { x: p0.x + (p1.x - p0.x) * t, y: p0.y + dy * t };
      }
      traces.append(ctx.label(name, at.x + 5 * u, -at.y + 5 * u, 'start'));
    }

    // Sección: cada lado visto si su cara se ve en esa vista.
    const s = cut.section;
    if (!s) return;
    const g = ctx.layer('seccion');
    // Líneas de referencia: cada punto de la sección, del alzado a la planta. En una sección
    // curva (cono, cilindro) basta con unas pocas y no se numeran los puntos.
    const curved = scene.smooth;
    const step = curved ? Math.max(1, Math.round(s.polygon.length / 8)) : 1;
    s.polygon.forEach((p, i) => {
      if (i % step === 0) polyline(g, [elevation(p), plan(p)], 'aux');
    });
    for (const [view, to] of VIEWS) {
      const o = towardObserver(view);
      for (const side of s.sides) {
        const face = scene.solid.faces[side.face];
        const visible = face ? dot(faceNormal(face), o) > -1e-9 : true;
        polyline(g, [to(side.p), to(side.q)], 'result', { hidden: !visible });
      }
      const mark = view === 'plan' ? '′' : '″';
      const places = labelPlaces(s.polygon.map(to), 10 * u);
      if (curved) continue;
      s.polygon.forEach((p, i) => {
        const at = places[i] ?? to(p);
        drawDot(g, to(p), u);
        g.append(ctx.label(`${i + 1}${mark}`, at.x, -at.y + 5 * u, 'middle'));
      });
    }

    // Verdadera magnitud: la sección abatida alrededor de α₁ (sobre el PH) o de α₂ (sobre el PV).
    if (!cut.hinge || abatir <= 0) return;
    const vm = ctx.layer('seccion-vm');
    const done = abatir >= 0.999;
    const onPV = cut.onto === 'PV';
    const view = onPV ? elevation : plan;
    const moved = cut.folded.map(view);
    s.polygon.forEach((p, i) => {
      const start = view(p);
      const now = moved[i];
      if (!now || !cut.hinge) return;
      polyline(vm, [start, now], 'process');
      if (!done) return;
      // Perpendicular a la charnela, triángulo con la cota (o el alejamiento) y arco.
      const foot = view(hingeFoot(p, cut.hinge));
      if (Math.hypot(start.x - foot.x, start.y - foot.y) < 0.2) return; // de canto: basta la perpendicular
      const d = cut.hinge.direction;
      const dir = onPV ? { x: d.x, y: d.c } : { x: d.x, y: -d.a };
      const len = Math.hypot(dir.x, dir.y) || 1;
      const height = onPV ? p.a : p.c;
      const tri = { x: start.x + (dir.x / len) * height, y: start.y + (dir.y / len) * height };
      polyline(vm, [start, tri], 'aux');
      polyline(vm, [foot, tri], 'aux');
      arcBetween(vm, foot, tri, now, 'aux');
    });
    polygon(vm, moved, done ? 'result' : 'process');
    if (done && !scene.smooth) {
      const center = mean(moved);
      moved.forEach((p, i) => {
        const at = outward(p, center, 12 * u);
        vm.append(ctx.label(`(${i + 1})`, at.x, -at.y + 5 * u, 'middle'));
      });
    }
  }

  private drawLine(ctx: SheetDrawContext, scene: SolidScene): void {
    const line = scene.line;
    if (!line) return;
    const g = ctx.layer('recta-solido');
    const u = ctx.mmPerPx;
    for (const [pieces, to, mark] of [
      [line.plan, plan, '′'],
      [line.elevation, elevation, '″'],
    ] as const) {
      for (const piece of pieces) {
        polyline(g, [to(piece.p), to(piece.q)], 'data', {
          hidden: !piece.visible,
          className: 'solid-line',
        });
      }
      const end = to(line.B);
      g.append(ctx.label(`${line.name}${mark}`, end.x + 4 * u, -end.y - 5 * u, 'start'));
      if (line.hits) {
        const [E, S] = line.hits;
        for (const [p, name, anchor] of [
          [E, 'E', 'end'],
          [S, 'S', 'start'],
        ] as const) {
          const s = to(p);
          drawDot(g, s, u);
          const dx = anchor === 'end' ? -5 : 5;
          g.append(ctx.label(`${name}${mark}`, s.x + dx * u, -s.y - 6 * u, anchor));
        }
      }
    }
    if (line.hits) {
      for (const p of line.hits) polyline(g, [plan(p), elevation(p)], 'aux');
    }
  }

  private drawPoint(ctx: SheetDrawContext, scene: SolidScene, progress: number): void {
    const point = scene.point;
    if (!point) return;
    const g = ctx.layer('superficie');
    const u = ctx.mmPerPx;
    const givenView = point.given === 'horizontal' ? plan : elevation;
    const otherView = point.given === 'horizontal' ? elevation : plan;
    const givenMark = point.given === 'horizontal' ? '′' : '″';
    const otherMark = point.given === 'horizontal' ? '″' : '′';
    const given = givenView(point.p);
    drawDot(g, given, u, 'sheet-dot sheet-dot-data');
    g.append(ctx.label(`${point.name}${givenMark}`, given.x + 5 * u, -given.y - 5 * u, 'start'));
    if (progress <= 0) return;
    // La generatriz (o el paralelo) por el punto, en las dos vistas.
    if (point.generatrix) {
      const [a, b] = point.generatrix;
      for (const to of [plan, elevation]) polyline(g, [to(a), to(b)], 'process');
      polyline(g, [plan(b), elevation(b)], 'aux');
    }
    if (point.parallel) {
      polygon(g, point.parallel.map(plan), 'process');
      polygon(g, point.parallel.map(elevation), 'process');
    }
    if (progress < 0.999) return;
    // Línea de referencia hasta la otra proyección.
    const other = otherView(point.p);
    polyline(g, [given, other], 'aux');
    drawDot(g, other, u);
    g.append(ctx.label(`${point.name}${otherMark}`, other.x + 5 * u, -other.y - 5 * u, 'start'));
  }

  private drawDevelopment(ctx: SheetDrawContext, scene: SolidScene): void {
    const layout = developmentLayout(scene);
    if (!layout) return;
    const g = ctx.layer('desarrollo');
    const dev = scene.development;
    if (!dev) return;
    const smoothEdges = smoothEdgeKeys(dev.poly);
    layout.faces.forEach((face, i) => {
      const original = dev.poly.faces[i];
      if (!original) return;
      original.points.forEach((p, j) => {
        const q = original.points[(j + 1) % original.points.length] as Point;
        if (smoothEdges.has(edgeKey(p, q))) return;
        const a = face[j];
        const b = face[(j + 1) % face.length];
        if (!a || !b) return;
        // Las aristas de la sección (tapa del tronco) son el resultado.
        const onCap = original.kind === 'cap';
        polyline(g, [a, b], onCap ? 'result' : 'data');
      });
    });
    const top = Math.max(...layout.faces.flat().map((p) => p.y));
    const left = Math.min(...layout.faces.flat().map((p) => p.x));
    g.append(ctx.label('Desarrollo', left, -top - 6 * ctx.mmPerPx, 'start'));
  }
}

/** Sección abatida del todo (para el encuadre). */
function foldFull(scene: SolidScene, p: Point): SheetPoint {
  const q = scene.cut?.hinge ? foldPoint(p, scene.cut.hinge, 1) : p;
  return scene.cut?.onto === 'PV' ? elevation(q) : plan(q);
}

/** Tramo de la recta ab en la mitad de la lámina indicada (−1: bajo la LT; 1: sobre ella). */
function halfPlane(a: SheetPoint, b: SheetPoint, half: 1 | -1): [SheetPoint, SheetPoint] | null {
  const sa = a.y * half;
  const sb = b.y * half;
  if (sa < 0 && sb < 0) return null;
  if (sa >= 0 && sb >= 0) return [a, b];
  const t = a.y / (a.y - b.y);
  const cut = { x: a.x + (b.x - a.x) * t, y: 0 };
  return sa >= 0 ? [a, cut] : [cut, b];
}

/**
 * Dónde rotular los puntos de un polígono: hacia fuera desde su centro; si el polígono se ve
 * de canto (todos alineados), alternando a un lado y otro de la recta.
 */
function labelPlaces(points: readonly SheetPoint[], distance: number): SheetPoint[] {
  const center = mean(points);
  let area = 0;
  points.forEach((p, i) => {
    const q = points[(i + 1) % points.length] ?? p;
    area += p.x * q.y - q.x * p.y;
  });
  if (Math.abs(area) > 4) return points.map((p) => outward(p, center, distance));
  const far = points.reduce((best, p) =>
    Math.hypot(p.x - center.x, p.y - center.y) > Math.hypot(best.x - center.x, best.y - center.y)
      ? p
      : best,
  );
  const len = Math.hypot(far.x - center.x, far.y - center.y) || 1;
  const ux = (far.x - center.x) / len;
  const uy = (far.y - center.y) / len;
  const order = points
    .map((p, i) => ({ i, t: (p.x - center.x) * ux + (p.y - center.y) * uy }))
    .sort((p, q) => p.t - q.t);
  const out: SheetPoint[] = [...points];
  order.forEach(({ i }, k) => {
    const p = points[i] as SheetPoint;
    const side = k % 2 === 0 ? 1 : -1;
    out[i] = { x: p.x - uy * distance * side, y: p.y + ux * distance * side };
  });
  return out;
}

/**
 * Desarrollo colocado en la lámina debajo de la planta, centrado con el sólido, para que no
 * se monte sobre las proyecciones.
 */
function developmentLayout(scene: SolidScene): { faces: SheetPoint[][] } | null {
  const dev = scene.development;
  if (!dev) return null;
  const flat = dev.flat;
  const all = flat.flat();
  const c0 = all[0]?.c ?? 0;
  const onPH = all.every((p) => Math.abs(p.c - c0) < 1e-4);
  const to = (p: Point): SheetPoint => (onPH ? { x: p.x, y: -p.a } : { x: p.x, y: p.c });
  const faces = flat.map((f) => f.map(to));
  const pts = faces.flat();
  const solidPlan = scene.solid.faces.flatMap((f) => f.points.map(plan));
  const solidBottom = Math.min(...solidPlan.map((p) => p.y));
  const solidCenter = mean(solidPlan).x;
  const devTop = Math.max(...pts.map((p) => p.y));
  const devCenter = (Math.min(...pts.map((p) => p.x)) + Math.max(...pts.map((p) => p.x))) / 2;
  const dx = solidCenter - devCenter;
  const dy = solidBottom - 18 - devTop;
  return { faces: faces.map((f) => f.map((p) => ({ x: p.x + dx, y: p.y + dy }))) };
}

function mean(points: readonly SheetPoint[]): SheetPoint {
  const n = points.length || 1;
  return {
    x: points.reduce((s, p) => s + p.x, 0) / n,
    y: points.reduce((s, p) => s + p.y, 0) / n,
  };
}

function outward(p: SheetPoint, center: SheetPoint, distance: number): SheetPoint {
  const dx = p.x - center.x;
  const dy = p.y - center.y;
  const len = Math.hypot(dx, dy);
  if (len < 1e-6) return { x: p.x + distance, y: p.y + distance };
  return { x: p.x + (dx / len) * distance, y: p.y + (dy / len) * distance };
}

function box(points: readonly SheetPoint[], margin: number): ViewBox | null {
  if (points.length === 0) return null;
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => -p.y);
  const x = Math.min(...xs) - margin;
  const y = Math.min(...ys) - margin;
  return { x, y, width: Math.max(...xs) + margin - x, height: Math.max(...ys) + margin - y };
}

const same = (p: Point, q: Point): boolean =>
  Math.abs(p.x - q.x) < 1e-5 && Math.abs(p.a - q.a) < 1e-5 && Math.abs(p.c - q.c) < 1e-5;
