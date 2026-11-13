// Lámina del motor de geometría plana: la construcción con sus cuatro grosores, la regla y el
// compás animados mientras se traza, el rastro del lugar geométrico y los puntos que se arrastran.
import type { SheetPoint } from '../../geometry/index.ts';
import type { SheetDrawContext, SheetModule } from '../../render2d/sheetModule.ts';
import {
  angleMark,
  arc,
  circle,
  dot,
  longLine,
  polyline,
  type StrokeRole,
} from '../../render2d/sketch2d.ts';
import { svgElement } from '../../render2d/svg.ts';
import type { SheetView } from '../../render2d/index.ts';
import type { ViewBox } from '../../render2d/viewport.ts';
import { formatDecimal } from '../../ui/format.ts';
import { homologous, homologyCenter } from './bridge.ts';
import type { PlaneController } from './controller.ts';
import { bridgeInput } from './runtimeHelpers.ts';
import { add, dist, mul, perp, pt, sub, unit, type Pt } from './geometry.ts';
import type { ObjectDef, Role, Value } from './graph.ts';

const EXTENT = 100;

const ROLE_CLASS: Record<Role, StrokeRole> = {
  dato: 'data',
  auxiliar: 'aux',
  proceso: 'process',
  resultado: 'result',
};

/** Papel por defecto de cada tipo de objeto (la lección puede cambiarlo con «rol»). */
export function defaultRole(def: ObjectDef): Role {
  if (def.rol) return def.rol;
  switch (def.tipo) {
    case 'punto':
    case 'recta':
    case 'segmento':
    case 'semirrecta':
      return 'dato';
    case 'circunferencia':
    case 'arco':
    case 'perpendicular':
    case 'paralela':
      return 'auxiliar';
    case 'puntoSobre':
    case 'interseccion':
    case 'puntoMedio':
    case 'traslacion':
    case 'giro':
    case 'simetria':
    case 'homotecia':
    case 'puntoTangencia':
    case 'medidaAngulo':
    case 'medidaDistancia':
      return 'proceso';
    case 'mediatriz':
    case 'bisectriz':
    case 'tangente':
    case 'ejeRadical':
    case 'centroRadical':
    case 'arcoCapaz':
    case 'conica':
    case 'tangenteConica':
      return 'resultado';
  }
}

export class PlaneSheet implements SheetModule {
  readonly id = 'plana';
  private readonly controller: PlaneController;
  private overlay: SVGGElement | null = null;
  private view: SheetView | null = null;
  private readonly handles = new Map<string, SVGGElement>();
  /** Giro del plano de la sombra en el puente 3D (1: abatido, la figura homóloga en la lámina). */
  bridgeFold = 0;

  constructor(controller: PlaneController) {
    this.controller = controller;
  }

  /** Conecta los puntos que se arrastran (necesita la lámina para convertir coordenadas). */
  attach(view: SheetView): void {
    this.view = view;
    this.overlay = view.createOverlay('plane-handles');
  }

  detach(): void {
    this.overlay?.remove();
    this.overlay = null;
    this.handles.clear();
  }

  private isVisible(id: string): boolean {
    const def = this.controller.defs.find((d) => d.id === id);
    if (!def || def.oculto) return false;
    const list = this.controller.data?.visibles;
    return (!list || list.includes(id)) && this.controller.isDrawn(id);
  }

  hasContent(): boolean {
    return this.controller.data !== null;
  }

  /** Visible en el paso, aunque aún no se haya trazado (para encuadrar desde el principio). */
  private isVisibleSoon(id: string): boolean {
    const def = this.controller.defs.find((d) => d.id === id);
    if (!def || def.oculto) return false;
    const list = this.controller.data?.visibles;
    return !list || list.includes(id);
  }

  isAlwaysVisible(tag: string): boolean {
    if (tag === 'herramienta') return true;
    if (tag === 'lugar') return Boolean(this.controller.data?.lugar);
    if (tag === 'puente')
      return Boolean(this.controller.data?.puente3d) && this.bridgeFold >= 0.999;
    return tag.startsWith('plana:') && this.isVisible(tag.slice(6));
  }

  isHighlighted(tag: string): boolean {
    return (
      tag.startsWith('plana:') && (this.controller.data?.destacar ?? []).includes(tag.slice(6))
    );
  }

  fitBox(): ViewBox | null {
    if (!this.controller.data) return null;
    const pts: Pt[] = [];
    for (const e of this.controller.evaluated.values()) {
      const v = e.value;
      // Solo lo que se ve en este paso: cada paso encuadra su parte de la construcción.
      if (!v || !this.isVisibleSoon(e.def.id)) continue;
      if (v.kind === 'point') pts.push(v.p);
      // Rectas: sus dos puntos de definición (y un poco más allá, para que se vean).
      if (v.kind === 'line') {
        if (v.a) pts.push(v.a);
        if (v.b) pts.push(v.b);
        if (!v.a) pts.push(v.line.p);
      }
      if (v.kind === 'circle') {
        pts.push(
          add(v.circle.c, pt(v.circle.r, v.circle.r)),
          sub(v.circle.c, pt(v.circle.r, v.circle.r)),
        );
      }
      if (v.kind === 'arc')
        pts.push(add(v.arc.c, pt(v.arc.r, v.arc.r)), sub(v.arc.c, pt(v.arc.r, v.arc.r)));
      if (v.kind === 'conic') for (const b of v.conic.branches) pts.push(...b);
    }
    // La figura homóloga, cuando ya está en la lámina.
    const input = bridgeInput(this.controller);
    if (input && this.bridgeFold >= 0.999) pts.push(...(homologous(input) ?? []));
    if (pts.length === 0) return null;
    const margin = 16;
    const xs = pts.map((p) => p.x);
    const ys = pts.map((p) => -p.y);
    const x = Math.min(...xs) - margin;
    const y = Math.min(...ys) - margin;
    return { x, y, width: Math.max(...xs) + margin - x, height: Math.max(...ys) + margin - y };
  }

  draw(ctx: SheetDrawContext): void {
    const c = this.controller;
    if (!c.data) {
      this.syncHandles(ctx.mmPerPx);
      return;
    }
    const drawing = c.drawing();
    for (const e of c.evaluated.values()) {
      if (!e.value || e.def.oculto) continue;
      const fraction = drawing.current === e.def.id ? drawing.fraction : 1;
      this.drawObject(ctx, e.def, e.value, fraction);
    }
    // Rastro del lugar geométrico.
    if (c.data.lugar && c.trail.length > 1) {
      polyline(ctx.layer('lugar'), c.trail, 'process', { className: 'locus-trail' });
    }
    this.drawBridge(ctx);
    // Regla o compás sobre el objeto que se está trazando.
    if (drawing.current && c.isDrawing) {
      const e = c.evaluated.get(drawing.current);
      if (e?.value) this.drawTool(ctx, e.def, e.value, drawing.fraction);
    }
    this.syncHandles(ctx.mmPerPx);
  }

  private drawObject(ctx: SheetDrawContext, def: ObjectDef, v: Value, f: number): void {
    const g = ctx.layer(`plana:${def.id}`);
    const role = ROLE_CLASS[defaultRole(def)];
    const u = ctx.mmPerPx;
    switch (v.kind) {
      case 'point': {
        if (f < 1) return;
        dot(g, v.p, u, `plane-point plane-point-${role}`);
        const text = def.etiqueta ?? def.id;
        if (text) g.append(ctx.label(text, v.p.x + 5 * u, -v.p.y - 6 * u, 'start'));
        return;
      }
      case 'line': {
        const [a, b] = lineEnds(v);
        const end = { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
        polyline(g, [a, end], role, { className: 'plane-line' });
        if (def.etiqueta && f >= 1) {
          const tip = { x: a.x + (b.x - a.x) * 0.92, y: a.y + (b.y - a.y) * 0.92 };
          g.append(ctx.label(def.etiqueta, tip.x + 4 * u, -tip.y - 6 * u, 'start'));
        }
        return;
      }
      case 'circle': {
        const start = circleStart(def, v, (id) => this.controller.pointOf(id));
        if (f >= 1) circle(g, v.circle.c, v.circle.r, role, { className: 'plane-circle' });
        else arc(g, v.circle.c, v.circle.r, start, start + 2 * Math.PI * f, role);
        if (def.etiqueta && f >= 1) {
          const q = add(v.circle.c, mul(pt(Math.cos(0.8), Math.sin(0.8)), v.circle.r));
          g.append(ctx.label(def.etiqueta, q.x + 4 * u, -q.y - 4 * u, 'start'));
        }
        return;
      }
      case 'arc': {
        const { c, r, a0, a1 } = v.arc;
        arc(g, c, r, a0, a0 + (a1 - a0) * f, role, { className: 'plane-arc' });
        if (def.etiqueta && f >= 1) {
          const m = (a0 + a1) / 2;
          const q = add(c, mul(pt(Math.cos(m), Math.sin(m)), r + 5));
          g.append(ctx.label(def.etiqueta, q.x, -q.y, 'middle'));
        }
        return;
      }
      case 'angle': {
        if (f < 1) return;
        angleMark(g, v.v, v.a, v.b, 8);
        const bis =
          unit(add(unit(sub(v.a, v.v)) ?? pt(1, 0), unit(sub(v.b, v.v)) ?? pt(0, 1))) ?? pt(1, 0);
        const q = add(v.v, mul(bis, 8 + 12 * u));
        const text = svgElement(
          'text',
          { x: q.x, y: -q.y + 4 * u, 'text-anchor': 'middle' },
          'sheet-label sheet-measure',
        );
        text.textContent = `${formatDecimal(v.degrees)}°`;
        text.dataset.label = text.textContent;
        g.append(text);
        return;
      }
      case 'conic': {
        // Se traza «por puntos»: la curva crece de un extremo al otro.
        for (const branch of v.conic.branches) {
          const all = v.conic.closed ? [...branch, branch[0] ?? pt(0, 0)] : [...branch];
          const n = Math.max(2, Math.round(all.length * f));
          polyline(g, all.slice(0, n), role, { className: 'plane-conic' });
        }
        if (def.etiqueta && f >= 1) {
          const q = v.conic.branches[0]?.[Math.floor((v.conic.branches[0]?.length ?? 0) * 0.15)];
          if (q) g.append(ctx.label(def.etiqueta, q.x + 4 * u, -q.y - 4 * u, 'start'));
        }
        return;
      }
      case 'distance': {
        if (f < 1) return;
        const m = pt((v.a.x + v.b.x) / 2, (v.a.y + v.b.y) / 2);
        const n = unit(perp(sub(v.b, v.a))) ?? pt(0, 1);
        const q = add(m, mul(n, 6));
        const text = svgElement(
          'text',
          { x: q.x, y: -q.y, 'text-anchor': 'middle' },
          'sheet-label sheet-measure',
        );
        text.textContent = `${formatDecimal(v.mm)} mm`;
        text.dataset.label = text.textContent;
        g.append(text);
        return;
      }
    }
  }

  /** Figura homóloga (o afín) en la lámina, con su centro y las rectas que unen homólogos. */
  private drawBridge(ctx: SheetDrawContext): void {
    const input = bridgeInput(this.controller);
    const bridge = this.controller.data?.puente3d;
    if (!input || !bridge) return;
    const image = homologous(input);
    if (!image) return;
    const g = ctx.layer('puente');
    const u = ctx.mmPerPx;
    const center = input.kind === 'homologia' ? homologyCenter(input.figure, image) : null;
    input.figure.forEach((p, i) => {
      const q = image[i];
      if (!q) return;
      // Cada punto y su homólogo, alineados con el centro (o paralelos en la afinidad).
      polyline(g, center ? [center, p, q] : [p, q], 'aux');
      dot(g, q, u);
      const name = bridge.figura[i] ?? '';
      g.append(ctx.label(`${name}′`, q.x + 5 * u, -q.y - 6 * u, 'start'));
    });
    const first = image[0];
    if (first) polyline(g, [...image, first], 'result', { className: 'homologous' });
    if (center) {
      dot(g, center, u, 'sheet-dot sheet-dot-data');
      g.append(ctx.label('O', center.x + 5 * u, -center.y - 6 * u, 'start'));
    }
  }

  /** Compás (circunferencias y arcos) o regla (rectas) en la posición del trazado. */
  private drawTool(ctx: SheetDrawContext, def: ObjectDef, v: Value, f: number): void {
    const g = ctx.layer('herramienta');
    if (v.kind === 'circle' || v.kind === 'arc') {
      const c = v.kind === 'circle' ? v.circle.c : v.arc.c;
      const r = v.kind === 'circle' ? v.circle.r : v.arc.r;
      const a =
        v.kind === 'circle'
          ? circleStart(def, v, (id) => this.controller.pointOf(id)) + 2 * Math.PI * f
          : v.arc.a0 + (v.arc.a1 - v.arc.a0) * f;
      const pencil = add(c, mul(pt(Math.cos(a), Math.sin(a)), r));
      // Bisagra del compás, por encima del punto medio entre la punta y el lápiz.
      const m = pt((c.x + pencil.x) / 2, (c.y + pencil.y) / 2);
      let n = unit(perp(sub(pencil, c))) ?? pt(0, 1);
      if (n.y < 0) n = mul(n, -1);
      const hinge = add(m, mul(n, Math.max(12, r * 0.6)));
      polyline(g, [c, hinge, pencil], 'data', { className: 'tool-compass' });
      dot(g, hinge, ctx.mmPerPx * 1.6, 'tool-knob');
      dot(g, pencil, ctx.mmPerPx, 'tool-pencil');
      return;
    }
    if (v.kind === 'line') {
      const [a, b] = lineEnds(v);
      const d = unit(sub(b, a)) ?? pt(1, 0);
      const n = perp(d);
      const width = 7;
      const p0 = sub(a, mul(d, 3));
      const p1 = add(b, mul(d, 3));
      const corners = [p0, p1, add(p1, mul(n, width)), add(p0, mul(n, width))];
      const shape = svgElement(
        'polygon',
        { points: corners.map((p) => `${p.x},${-p.y}`).join(' ') },
        'tool-ruler',
      );
      g.append(shape);
      const pencil = { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
      dot(g, pencil, ctx.mmPerPx, 'tool-pencil');
    }
  }

  // ---------- Puntos que se arrastran ----------

  private syncHandles(mmPerPx: number): void {
    const overlay = this.overlay;
    if (!overlay) return;
    const c = this.controller;
    const wanted = new Set<string>();
    for (const def of c.defs) {
      if (!c.isDraggable(def.id) || !this.isVisible(def.id)) continue;
      const p = c.pointOf(def.id);
      if (!p) continue;
      wanted.add(def.id);
      let handle = this.handles.get(def.id);
      if (!handle) {
        handle = this.createHandle(def.id, def.etiqueta ?? def.id);
        this.handles.set(def.id, handle);
        overlay.append(handle);
      }
      handle.setAttribute('transform', `translate(${p.x} ${-p.y})`);
      const [hit, ring] = handle.children;
      hit?.setAttribute('r', String(14 * mmPerPx));
      ring?.setAttribute('r', String(7 * mmPerPx));
    }
    for (const [id, handle] of this.handles) {
      if (!wanted.has(id)) {
        handle.remove();
        this.handles.delete(id);
      }
    }
  }

  private createHandle(id: string, name: string): SVGGElement {
    const g = svgElement('g', {}, 'sheet-handle plane-handle');
    g.setAttribute('tabindex', '0');
    g.setAttribute('role', 'button');
    g.setAttribute('aria-label', `Punto ${name}: arrástralo o muévelo con las flechas`);
    g.dataset.point = id;
    g.append(
      svgElement('circle', { r: 14 }, 'sheet-handle-hit'),
      svgElement('circle', { r: 7 }, 'sheet-handle-ring'),
    );

    g.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      event.stopPropagation();
      g.setPointerCapture(event.pointerId);
      g.classList.add('is-dragging');
      g.focus({ preventScroll: true });
    });
    g.addEventListener('pointermove', (event) => {
      if (!g.hasPointerCapture(event.pointerId)) return;
      const q = this.view?.clientToSheet(event.clientX, event.clientY);
      if (q) this.controller.moveTo(id, q);
    });
    const end = (event: PointerEvent): void => {
      if (g.hasPointerCapture(event.pointerId)) g.releasePointerCapture(event.pointerId);
      g.classList.remove('is-dragging');
    };
    g.addEventListener('pointerup', end);
    g.addEventListener('pointercancel', end);
    g.addEventListener('keydown', (event) => {
      const step = event.shiftKey ? 5 : 1;
      const delta: Record<string, Pt> = {
        ArrowLeft: pt(-step, 0),
        ArrowRight: pt(step, 0),
        ArrowUp: pt(0, step),
        ArrowDown: pt(0, -step),
      };
      const d = delta[event.key];
      const p = this.controller.pointOf(id);
      if (!d || !p) return;
      event.preventDefault();
      this.controller.moveTo(id, add(p, d));
    });
    return g;
  }
}

/** Extremos dibujados de una recta, segmento o semirrecta. */
function lineEnds(v: Extract<Value, { kind: 'line' }>): [SheetPoint, SheetPoint] {
  if (v.extent === 'segmento' && v.a && v.b) return [v.a, v.b];
  if (v.extent === 'semirrecta' && v.a) {
    const far = longLine(v.a, add(v.a, v.line.d), EXTENT);
    // De los dos extremos, el que está en el sentido de la semirrecta.
    const [p, q] = far;
    const end = (q.x - v.a.x) * v.line.d.x + (q.y - v.a.y) * v.line.d.y > 0 ? q : p;
    return [v.a, end];
  }
  return longLine(v.line.p, add(v.line.p, v.line.d), EXTENT);
}

/** Ángulo donde empieza a trazarse una circunferencia: en el punto por el que pasa, si lo hay. */
function circleStart(
  def: ObjectDef,
  v: Extract<Value, { kind: 'circle' }>,
  pointOf: (id: string) => Pt | null,
): number {
  const through = def.tipo === 'circunferencia' && def.pasaPor ? pointOf(def.pasaPor) : null;
  if (!through || dist(through, v.circle.c) < 1e-6) return 0;
  return Math.atan2(through.y - v.circle.c.y, through.x - v.circle.c.x);
}
