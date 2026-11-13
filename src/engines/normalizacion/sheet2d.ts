// Lámina del motor de normalización: vistas en el sistema europeo con los tipos de línea de
// UNE-EN ISO 128-2 (vistas: continua gruesa; ocultas: discontinua fina; ejes: trazo y punto
// fino), cortes rayados a 45° (ISO 128-3), indicación del plano de corte y cotas (ISO 129-1).
import { linearDimension, type DimensionDrawing } from '../../render2d/dimension.ts';
import type { SheetDrawContext, SheetModule } from '../../render2d/sheetModule.ts';
import { svgElement } from '../../render2d/svg.ts';
import type { ViewBox } from '../../render2d/viewport.ts';
import { formatDecimal } from '../../ui/format.ts';
import { VIEW_LABELS, type NormController } from './controller.ts';
import type { Dimension } from './definition.ts';
import { placeInSheet, type PieceDrawing } from './drawing.ts';
import { project, type Seg2, type ViewName } from './views.ts';

export class NormSheet implements SheetModule {
  readonly id = 'normalizacion';
  private readonly controller: NormController;

  constructor(controller: NormController) {
    this.controller = controller;
  }

  hasContent(): boolean {
    return this.controller.data !== null;
  }

  isAlwaysVisible(tag: string): boolean {
    return (
      this.controller.data !== null &&
      ['vistas', 'ocultas', 'ejes', 'corte', 'seccion-abatida', 'cotas', 'pieza-aviso'].includes(
        tag,
      )
    );
  }

  fitBox(): ViewBox | null {
    const d = this.controller.drawing;
    const data = this.controller.data;
    if (!d || !data) return null;
    const pts: { x: number; y: number }[] = [];
    for (const view of data.vistas) {
      for (const s of [...d.views[view].visible, ...d.views[view].axes]) {
        pts.push(
          placeInSheet(view, d.bounds, s.x1, s.y1),
          placeInSheet(view, d.bounds, s.x2, s.y2),
        );
      }
    }
    if (pts.length === 0) return null;
    // Las cotas lineales también tienen que caber en el encuadre (sus líneas de cota quedan
    // fuera de la pieza). Se calculan con un tamaño de pantalla de referencia.
    for (const dim of data.cotas) {
      if (dim.tipo !== 'lineal') continue;
      const [p, q] = dim.de.map((x) => {
        const [pu, pv] = project(dim.vista, x);
        const s = placeInSheet(dim.vista, d.bounds, pu, pv);
        return { x: s.x, y: -s.y };
      }) as [{ x: number; y: number }, { x: number; y: number }];
      const drawing = linearDimension({
        from: p,
        to: q,
        direction: dim.direccion,
        offset: dim.desplazamiento,
        mmPerPx: 0.3,
        value: dim.valor ?? '',
      });
      const { x1, y1, x2, y2 } = drawing.dimensionLine;
      pts.push({ x: x1, y: -y1 }, { x: x2, y: -y2 });
    }
    const margin = 18;
    const xs = pts.map((p) => p.x);
    const ys = pts.map((p) => -p.y);
    const x = Math.min(...xs) - margin;
    const y = Math.min(...ys) - margin;
    return { x, y, width: Math.max(...xs) + margin - x, height: Math.max(...ys) + margin - y };
  }

  draw(ctx: SheetDrawContext): void {
    const c = this.controller;
    const data = c.data;
    if (!data) return;
    if (c.loading || !c.drawing) {
      const note = svgElement('text', { x: 0, y: 0, 'text-anchor': 'middle' }, 'sheet-empty-note');
      note.textContent = c.problem ?? 'Preparando la pieza…';
      ctx.layer('pieza-aviso').append(note);
      return;
    }
    const d = c.drawing;
    const u = ctx.mmPerPx;
    if (data.vistas.length === 0) {
      const note = svgElement('text', { x: 0, y: 0, 'text-anchor': 'middle' }, 'sheet-empty-note');
      note.textContent = 'Aquí aparecerán las vistas de la pieza.';
      ctx.layer('pieza-aviso').append(note);
    }
    // Con cotas, los nombres de las vistas estorbarían: no se rotulan.
    const named = data.cotas.length === 0 && data.ejercicio?.tipo !== 'cotas';
    for (const view of data.vistas) this.drawView(ctx, d, view, named);

    // Indicación del plano de corte en una vista vecina (ISO 128-3): trazo y punto fino con
    // los extremos gruesos y la letra A; la vista cortada se titula «A-A».
    const cut = data.corte;
    if (cut) {
      const g = ctx.layer('corte');
      const host: ViewName = cut.vista === 'planta' ? 'alzado' : 'planta';
      if (data.vistas.includes(host)) {
        const [p, q] = cutTrace(cut.vista, cut.en, d, host);
        const P = placeInSheet(host, d.bounds, p[0], p[1]);
        const Q = placeInSheet(host, d.bounds, q[0], q[1]);
        line(g, P, Q, 'norm-axis');
        const ux = (Q.x - P.x) / (Math.hypot(Q.x - P.x, Q.y - P.y) || 1);
        const uy = (Q.y - P.y) / (Math.hypot(Q.x - P.x, Q.y - P.y) || 1);
        for (const [E, s] of [
          [P, 1],
          [Q, -1],
        ] as const) {
          line(g, E, { x: E.x + ux * 5 * s, y: E.y + uy * 5 * s }, 'norm-cut-end');
          g.append(ctx.label('A', E.x - ux * 4 * s, -E.y + uy * 4 * s + 4 * u, 'middle'));
        }
      }
      const title = placeInSheet(cut.vista, d.bounds, 0, 0);
      const box = viewBounds(d, cut.vista);
      g.append(ctx.label('A-A', (box.minX + box.maxX) / 2, -box.minY + 16 * u, 'middle'));
      void title;
    }

    // Cotas.
    const dims = ctx.layer('cotas');
    for (const dim of data.cotas) this.drawDimension(dims, ctx, d, dim, 'norm-dimension');
    // Cotas candidatas del ejercicio: las elegidas, normales; las demás, tenues.
    const ex = data.ejercicio;
    if (ex?.tipo === 'cotas') {
      const chosen = new Set(data.eleccion ?? []);
      ex.candidatas.forEach((dim, i) => {
        this.drawDimension(
          dims,
          ctx,
          d,
          dim,
          chosen.has(i) ? 'norm-dimension is-chosen' : 'norm-dimension is-candidate',
          `${i + 1}`,
        );
      });
    }
  }

  private drawView(ctx: SheetDrawContext, d: PieceDrawing, view: ViewName, named: boolean): void {
    const r = d.views[view];
    const place = (s: Seg2): [{ x: number; y: number }, { x: number; y: number }] => [
      placeInSheet(view, d.bounds, s.x1, s.y1),
      placeInSheet(view, d.bounds, s.x2, s.y2),
    ];
    const hidden = ctx.layer('ocultas');
    for (const s of r.hidden) line(hidden, ...place(s), 'norm-hidden');
    const axes = ctx.layer('ejes');
    for (const s of r.axes) line(axes, ...place(s), 'norm-axis');
    const g = ctx.layer('vistas');
    if (r.hatch.length) {
      const hatchLayer = ctx.layer('corte');
      for (const s of r.hatch) line(hatchLayer, ...place(s), 'norm-hatch');
    }
    if (r.revolved.length) {
      const rev = ctx.layer('seccion-abatida');
      for (const s of r.revolved) line(rev, ...place(s), 'norm-revolved');
      for (const s of r.revolvedHatch) line(rev, ...place(s), 'norm-hatch');
    }
    for (const s of r.visible) line(g, ...place(s), 'norm-visible');
    // Nombre de la vista, pequeño y debajo (ayuda didáctica, no forma parte del plano).
    if (!named) return;
    const box = viewBounds(d, view);
    const u = ctx.mmPerPx;
    const label = ctx.label(VIEW_LABELS[view], box.minX, -box.minY + 16 * u, 'start');
    label.classList.add('norm-view-name');
    g.append(label);
  }

  private drawDimension(
    parent: SVGGElement,
    ctx: SheetDrawContext,
    d: PieceDrawing,
    dim: Dimension,
    className: string,
    tag = '',
  ): void {
    const u = ctx.mmPerPx;
    const group = svgElement('g', {}, className);
    if (tag) group.dataset.candidate = tag;
    parent.append(group);
    if (dim.tipo === 'lineal') {
      const [p, q] = dim.de.map((x) => {
        const [pu, pv] = project(dim.vista, x);
        const s = placeInSheet(dim.vista, d.bounds, pu, pv);
        return { x: s.x, y: -s.y };
      }) as [{ x: number; y: number }, { x: number; y: number }];
      const measured = dim.direccion === 'h' ? Math.abs(q.x - p.x) : Math.abs(q.y - p.y);
      const drawing = linearDimension({
        from: p,
        to: q,
        direction: dim.direccion,
        offset: dim.desplazamiento,
        mmPerPx: u,
        value: dim.valor ?? formatDecimal(measured),
      });
      appendDimension(group, drawing, u);
      return;
    }
    // Diámetro o radio: línea por el centro con flecha(s) en la circunferencia y cifra con ⌀ o R.
    const [cu, cv] = project(dim.vista, dim.centro);
    const center = placeInSheet(dim.vista, d.bounds, cu, cv);
    const t = (dim.angulo * Math.PI) / 180;
    const dx = Math.cos(t);
    const dy = Math.sin(t);
    const r = dim.radio;
    const outer = { x: center.x + dx * (r + 16), y: center.y + dy * (r + 16) };
    const onCircle = { x: center.x + dx * r, y: center.y + dy * r };
    const svg = (p: { x: number; y: number }): { x: number; y: number } => ({ x: p.x, y: -p.y });
    if (dim.tipo === 'diametro') {
      const opposite = { x: center.x - dx * r, y: center.y - dy * r };
      line(group, opposite, outer, 'norm-dim-line');
      group.append(
        arrowHead(svg(onCircle), { x: -dx, y: dy }, u),
        arrowHead(svg(opposite), { x: dx, y: -dy }, u),
      );
    } else {
      line(group, center, outer, 'norm-dim-line');
      group.append(arrowHead(svg(onCircle), { x: -dx, y: dy }, u));
    }
    // Cifra al final de la línea de referencia, sobre un pequeño tramo horizontal.
    const shelf = { x: outer.x + (dx >= 0 ? 8 : -8), y: outer.y };
    line(group, outer, shelf, 'norm-dim-line');
    const text = svgElement(
      'text',
      { x: shelf.x, y: -shelf.y - 3 * u, 'text-anchor': dx >= 0 ? 'end' : 'start' },
      'sheet-dimension-text norm-dim-text',
    );
    text.textContent = `${dim.tipo === 'diametro' ? '⌀' : 'R'}${formatDecimal(dim.tipo === 'diametro' ? 2 * r : r)}`;
    group.append(text);
  }
}

function line(
  parent: SVGElement,
  p: { x: number; y: number },
  q: { x: number; y: number },
  className: string,
): void {
  parent.append(svgElement('line', { x1: p.x, y1: -p.y, x2: q.x, y2: -q.y }, className));
}

/** Punta de flecha cerrada (unos 15°) con el vértice en `tip`, apuntando en `dir` (SVG). */
function arrowHead(
  tip: { x: number; y: number },
  dir: { x: number; y: number },
  u: number,
): SVGPolygonElement {
  const len = 9 * u;
  const half = 2.6 * u;
  const bx = tip.x - dir.x * len;
  const by = tip.y - dir.y * len;
  const points = [
    [tip.x, tip.y],
    [bx - dir.y * half, by + dir.x * half],
    [bx + dir.y * half, by - dir.x * half],
  ];
  return svgElement('polygon', { points: points.map((p) => p.join(',')).join(' ') }, 'sheet-arrow');
}

function appendDimension(group: SVGGElement, d: DimensionDrawing, u: number): void {
  for (const s of d.extensionLines) group.append(svgElement('line', { ...s }, 'norm-dim-line'));
  group.append(svgElement('line', { ...d.dimensionLine }, 'norm-dim-line'));
  for (const a of d.arrowheads) {
    group.append(
      svgElement(
        'polygon',
        { points: `${a[0]},${a[1]} ${a[2]},${a[3]} ${a[4]},${a[5]}` },
        'sheet-arrow',
      ),
    );
  }
  const text = svgElement(
    'text',
    {
      x: d.text.x,
      y: d.text.y,
      'text-anchor': 'middle',
      transform: `rotate(${d.text.rotation} ${d.text.x} ${d.text.y})`,
    },
    'sheet-dimension-text norm-dim-text',
  );
  text.textContent = d.text.value;
  group.append(text);
  void u;
}

/** Caja de una vista en la lámina (para rotularla). */
function viewBounds(
  d: PieceDrawing,
  view: ViewName,
): { minX: number; maxX: number; minY: number; maxY: number } {
  const pts = d.views[view].visible.flatMap((s) => [
    placeInSheet(view, d.bounds, s.x1, s.y1),
    placeInSheet(view, d.bounds, s.x2, s.y2),
  ]);
  const xs = pts.map((p) => p.x);
  const ys = pts.map((p) => p.y);
  return {
    minX: Math.min(...xs),
    maxX: Math.max(...xs),
    minY: Math.min(...ys),
    maxY: Math.max(...ys),
  };
}

/** Traza del plano de corte vista en otra vista (en coordenadas de esa vista). */
function cutTrace(
  cutView: ViewName,
  at: number,
  d: PieceDrawing,
  host: ViewName,
): [[number, number], [number, number]] {
  const lo = d.bounds.min.map((v) => v - 6) as [number, number, number];
  const hi = d.bounds.max.map((v) => v + 6) as [number, number, number];
  const axis = cutView === 'alzado' ? 1 : cutView === 'planta' ? 2 : 0;
  lo[axis] = at;
  hi[axis] = at;
  // A lo largo de la vista anfitriona: el eje que no es su profundidad ni el del corte.
  const hostDepth = host === 'alzado' ? 1 : host === 'planta' ? 2 : 0;
  const a = [...lo] as [number, number, number];
  const b = [...lo] as [number, number, number];
  for (let k = 0; k < 3; k++) {
    if (k !== axis && k !== hostDepth) b[k] = hi[k] as number;
  }
  const [u1, v1] = project(host, a);
  const [u2, v2] = project(host, b);
  return [
    [u1, v1],
    [u2, v2],
  ];
}
