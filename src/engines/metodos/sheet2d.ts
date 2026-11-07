// Lámina del motor de métodos: la consecuencia del movimiento en las proyecciones.
// Mientras el movimiento avanza se ve el camino de las proyecciones; al terminar, el trazado
// clásico (triángulo y arco de abatimiento, arcos de giro, línea de referencia del cambio).
import { clipToBox, planeTraces, pointAt, type Point } from '../../geometry/index.ts';
import type { SheetDrawContext, SheetModule } from '../../render2d/sheetModule.ts';
import {
  angleMark,
  arcBetween,
  circle,
  dot,
  longLine,
  polygon,
  polyline,
} from '../../render2d/sketch2d.ts';
import type { ViewBox } from '../../render2d/viewport.ts';
import { svgElement } from '../../render2d/svg.ts';
import {
  changeFoot,
  foldFeet,
  measureOf,
  movedFigure,
  movedName,
  sheetResult,
  type Construction,
} from './construction.ts';
import type { MethodsController } from './controller.ts';
import { changedProjection, sheetH, sheetV } from './geometry.ts';

const LINE_EXTENT = 88;

export class MethodsSheet implements SheetModule {
  readonly id = 'metodos';
  private readonly controller: MethodsController;

  constructor(controller: MethodsController) {
    this.controller = controller;
  }

  fitBox(): ViewBox | null {
    const k = this.controller.construction;
    if (!k) return null;
    const pts = [...sheetResult(k).main, ...sheetResult(k).other];
    for (const f of k.figure) pts.push(sheetH(f.p), sheetV(f.p));
    if (k.method === 'cambio') pts.push(k.lt.p1, k.lt.p2);
    if (k.cone) {
      const { center, radius } = k.cone.cone;
      const c = k.cone.cone.target === 'PH' ? sheetH(center) : sheetV(center);
      pts.push({ x: c.x - radius, y: c.y - radius }, { x: c.x + radius, y: c.y + radius });
    }
    if (pts.length === 0) return null;
    const margin = 14;
    const xs = pts.map((p) => p.x);
    const ys = pts.map((p) => -p.y);
    const x = Math.min(...xs) - margin;
    const y = Math.min(...ys) - margin;
    return { x, y, width: Math.max(...xs) + margin - x, height: Math.max(...ys) + margin - y };
  }

  draw(ctx: SheetDrawContext): void {
    const k = this.controller.construction;
    if (!k) return;
    const t = this.controller.progress;
    const done = t >= 0.999;
    this.drawFigure(ctx, k);
    if (k.perpendicular) {
      const [from, foot] = k.perpendicular;
      const g = ctx.layer('perpendicular');
      polyline(g, [sheetH(from.p), sheetH(foot.p)], 'process');
      polyline(g, [sheetV(from.p), sheetV(foot.p)], 'process');
    }
    if (k.cone) this.drawCone(ctx, k);
    switch (k.method) {
      case 'abatimiento':
        this.drawFold(ctx, k, t);
        break;
      case 'giro':
        this.drawTurn(ctx, k, t);
        break;
      case 'cambio':
        this.drawChange(ctx, k, t);
        break;
      case null:
        break;
    }
    if (done || k.method === null) this.drawMeasure(ctx, k);
  }

  /** Proyecciones de la figura (datos) y de los puntos calculados (F, I). */
  private drawFigure(ctx: SheetDrawContext, k: Construction): void {
    const g = ctx.layer('figura');
    const plan = k.figure.map((f) => sheetH(f.p));
    const elevation = k.figure.map((f) => sheetV(f.p));
    const draw = k.figure.length >= 3 ? polygon : polyline;
    draw(g, plan, 'data');
    draw(g, elevation, 'data');
    const u = ctx.mmPerPx;
    for (const f of k.figure) {
      if (!f.computed) continue;
      const h = sheetH(f.p);
      const v = sheetV(f.p);
      polyline(g, [h, v], 'aux');
      dot(g, h, u, 'sheet-dot sheet-dot-data');
      dot(g, v, u, 'sheet-dot sheet-dot-data');
      g.append(
        ctx.label(`${f.name}′`, h.x - 5 * u, -h.y + 16 * u, 'end'),
        ctx.label(`${f.name}″`, v.x + 5 * u, -v.y - 5 * u, 'start'),
      );
    }
  }

  private drawFold(
    ctx: SheetDrawContext,
    k: Extract<Construction, { method: 'abatimiento' }>,
    t: number,
  ): void {
    const u = ctx.mmPerPx;
    const toSheet = k.onto === 'PH' ? sheetH : sheetV;
    const height = (p: Point): number => (k.onto === 'PH' ? p.c : p.a);
    const o = k.hinge.origin;
    const d = k.hinge.direction;
    const h0 = toSheet(o);
    const h1 = toSheet({ x: o.x + d.x, a: o.a + d.a, c: o.c + d.c });
    const [e0, e1] = longLine(h0, h1, LINE_EXTENT);
    const hinge = ctx.layer('charnela');
    polyline(hinge, [e0, e1], 'data', { className: 'sheet-hinge' });
    const labelAt = e0.x < e1.x ? e0 : e1;
    hinge.append(ctx.label('charnela', labelAt.x + 4 * u, -labelAt.y - 6 * u, 'start'));

    const movement = ctx.layer('movimiento');
    const moved = movedFigure(k, t).map(toSheet);
    const feet = foldFeet(k).map(toSheet);
    const final = sheetResult(k).main;
    const unit = { x: h1.x - h0.x, y: h1.y - h0.y };
    const unitLen = Math.hypot(unit.x, unit.y) || 1;
    k.figure.forEach((f, i) => {
      const start = toSheet(f.p);
      const now = moved[i];
      const foot = feet[i];
      const end = final[i];
      if (!now || !foot || !end) return;
      // Camino de la proyección mientras el plano gira: recto, perpendicular a la charnela.
      polyline(movement, [start, now], 'process');
      if (t < 0.999) {
        dot(movement, now, u, 'sheet-dot');
        return;
      }
      // Trazado clásico: perpendicular a la charnela, triángulo con la cota y arco.
      const beyond = { x: end.x + (end.x - foot.x) * 0.15, y: end.y + (end.y - foot.y) * 0.15 };
      polyline(movement, [foot, beyond], 'aux');
      const tri = {
        x: start.x + (unit.x / unitLen) * height(f.p),
        y: start.y + (unit.y / unitLen) * height(f.p),
      };
      polyline(movement, [start, tri], 'aux');
      polyline(movement, [foot, tri], 'aux');
      arcBetween(movement, foot, tri, end, 'process');
    });

    const result = ctx.layer('resultado');
    const shape = t >= 0.999 ? final : moved;
    const draw = shape.length >= 3 ? polygon : polyline;
    draw(result, shape, t >= 0.999 ? 'result' : 'process');
    if (t >= 0.999) {
      k.figure.forEach((f, i) => {
        const p = final[i];
        if (!p) return;
        dot(result, p, u);
        // Rótulo por fuera, en la dirección del abatimiento (de la charnela hacia el punto).
        const foot = feet[i] ?? p;
        const len = Math.hypot(p.x - foot.x, p.y - foot.y) || 1;
        const at = {
          x: p.x + ((p.x - foot.x) / len) * 13 * u,
          y: p.y + ((p.y - foot.y) / len) * 13 * u,
        };
        result.append(ctx.label(movedName('abatimiento', f.name), at.x, -at.y + 5 * u, 'middle'));
      });
    }
  }

  private drawTurn(
    ctx: SheetDrawContext,
    k: Extract<Construction, { method: 'giro' }>,
    t: number,
  ): void {
    const u = ctx.mmPerPx;
    const vertical = k.axis === 'vertical';
    // Eje: de punta en la vista donde se ve como punto, perpendicular a la LT en la otra.
    const eje = ctx.layer('eje');
    const pointView = vertical ? sheetH(k.through) : sheetV(k.through);
    circle(eje, pointView, 1.6, 'data');
    eje.append(ctx.label(vertical ? 'e′' : 'e″', pointView.x - 4 * u, -pointView.y - 6 * u, 'end'));
    const lineEnd = vertical ? 72 : -72;
    polyline(
      eje,
      [
        { x: k.through.x, y: 0 },
        { x: k.through.x, y: lineEnd },
      ],
      'data',
    );
    eje.append(
      ctx.label(
        vertical ? 'e″' : 'e′',
        k.through.x - 4 * u,
        -lineEnd + (vertical ? 12 : -4) * u,
        'end',
      ),
    );

    const movement = ctx.layer('movimiento');
    const rotatedView = vertical ? sheetH : sheetV;
    const slidingView = vertical ? sheetV : sheetH;
    const moved = movedFigure(k, t);
    k.figure.forEach((f, i) => {
      const p = moved[i];
      if (!p) return;
      // Arco alrededor del eje en la vista donde el eje es un punto.
      arcBetween(movement, rotatedView(k.through), rotatedView(f.p), rotatedView(p), 'process');
      // En la otra vista, el punto se desliza paralelo a la LT (la cota o el alejamiento no cambian).
      polyline(movement, [slidingView(f.p), slidingView(p)], 'aux');
      if (t >= 0.999) polyline(movement, [rotatedView(p), slidingView(p)], 'aux');
      else {
        dot(movement, rotatedView(p), u, 'sheet-dot');
        dot(movement, slidingView(p), u, 'sheet-dot');
      }
    });

    const result = ctx.layer('resultado');
    const done = t >= 0.999;
    polyline(result, moved.map(slidingView), done ? 'result' : 'process');
    polyline(result, moved.map(rotatedView), 'process');
    if (done) {
      k.figure.forEach((f, i) => {
        const p = moved[i];
        if (!p) return;
        const main = slidingView(p);
        const other = rotatedView(p);
        dot(result, main, u);
        // El punto del eje no se mueve: A₁ ≡ A, y no se rotula dos veces.
        if (Math.hypot(p.x - f.p.x, p.a - f.p.a, p.c - f.p.c) < 0.5) return;
        const mainMark = vertical ? '″' : '′';
        const otherMark = vertical ? '′' : '″';
        result.append(
          ctx.label(`${f.name}${mainMark}₁`, main.x + 6 * u, -main.y + 16 * u, 'start'),
          ctx.label(`${f.name}${otherMark}₁`, other.x + 6 * u, -other.y + 16 * u, 'start'),
        );
      });
    }
  }

  private drawChange(
    ctx: SheetDrawContext,
    k: Extract<Construction, { method: 'cambio' }>,
    t: number,
  ): void {
    const u = ctx.mmPerPx;
    // Nueva LT con sus dos trazos cortos del lado de la proyección que se conserva.
    const lt = ctx.layer('nueva-lt');
    polyline(lt, [k.lt.p1, k.lt.p2], 'data', { className: 'sheet-new-lt' });
    const dx = k.lt.p2.x - k.lt.p1.x;
    const dy = k.lt.p2.y - k.lt.p1.y;
    const len = Math.hypot(dx, dy);
    const ux = dx / len;
    const uy = dy / len;
    const mark = { x: -k.side.x * 2.5, y: -k.side.y * 2.5 };
    for (const [from, sign] of [
      [k.lt.p1, 1],
      [k.lt.p2, -1],
    ] as const) {
      const a = { x: from.x + mark.x, y: from.y + mark.y };
      polyline(lt, [a, { x: a.x + ux * 8 * sign, y: a.y + uy * 8 * sign }], 'data');
    }
    const tag = { x: k.lt.p2.x + k.side.x * 4, y: k.lt.p2.y + k.side.y * 4 };
    lt.append(ctx.label('LT₁', tag.x, -tag.y, 'middle'));

    const movement = ctx.layer('movimiento');
    const kept = k.lt.kind === 'vertical' ? sheetH : sheetV;
    const original = k.lt.kind === 'vertical' ? sheetV : sheetH;
    const result = ctx.layer('resultado');
    const finals = k.figure.map((f) => changedProjection(f.p, k.lt, k.side));
    k.figure.forEach((f, i) => {
      const foot = changeFoot(f.p, k.lt);
      const end = finals[i];
      if (!end) return;
      // Línea de referencia nueva: perpendicular a la LT₁ desde la proyección que se conserva.
      polyline(movement, [kept(f.p), foot], 'aux');
      const now = { x: foot.x + (end.x - foot.x) * t, y: foot.y + (end.y - foot.y) * t };
      polyline(movement, [foot, now], 'process');
      // La medida que se lleva: la cota (o el alejamiento) desde la LT original.
      if (t >= 0.999) {
        const o = original(f.p);
        polyline(movement, [{ x: o.x, y: 0 }, o], 'aux', { className: 'sheet-transfer' });
        dot(result, end, u);
        const m = k.lt.kind === 'vertical' ? '″' : '′';
        // Rótulo por fuera, en la dirección de la línea de referencia nueva.
        const at = { x: end.x + k.side.x * 12 * u, y: end.y + k.side.y * 12 * u };
        result.append(ctx.label(`${f.name}${m}₁`, at.x, -at.y + 5 * u, 'middle'));
      } else {
        dot(movement, now, u, 'sheet-dot');
      }
    });
    if (t >= 0.999) {
      const draw = finals.length >= 3 ? polygon : polyline;
      draw(result, finals, 'result');
    }
  }

  private drawCone(ctx: SheetDrawContext, k: Construction): void {
    const c = k.cone;
    if (!c) return;
    const u = ctx.mmPerPx;
    const g = ctx.layer('cono');
    const { cone, base } = c;
    const onPH = cone.target === 'PH';
    // Vista donde la base es una circunferencia, y vista donde el cono se ve de canto.
    const round = onPH ? sheetH : sheetV;
    const edge = onPH ? sheetV : sheetH;
    circle(g, round(cone.center), cone.radius, 'aux');
    dot(g, round(cone.apex), u, 'sheet-dot sheet-dot-data');
    dot(g, edge(cone.apex), u, 'sheet-dot sheet-dot-data');
    const apexName = 'V';
    g.append(
      ctx.label(
        `${apexName}${onPH ? '′' : '″'}`,
        round(cone.apex).x - 5 * u,
        -round(cone.apex).y - 5 * u,
        'end',
      ),
      ctx.label(
        `${apexName}${onPH ? '″' : '′'}`,
        edge(cone.apex).x - 5 * u,
        -edge(cone.apex).y - 5 * u,
        'end',
      ),
    );
    // Contorno: las dos generatrices extremas forman el ángulo φ con la LT.
    const left = { x: cone.center.x - cone.radius, y: 0 };
    const right = { x: cone.center.x + cone.radius, y: 0 };
    polyline(g, [left, edge(cone.apex), right], 'process');
    polyline(g, [left, right], 'aux');
    // Generatriz elegida: r′ y r″.
    const r1 = round(base);
    const r2 = edge(base);
    polyline(g, [round(cone.apex), r1], 'result');
    polyline(g, [edge(cone.apex), r2], 'result');
    polyline(g, [r1, r2], 'aux');
    g.append(
      ctx.label(onPH ? 'r′' : 'r″', r1.x + 5 * u, -r1.y + 14 * u, 'start'),
      ctx.label(
        onPH ? 'r″' : 'r′',
        (r2.x + edge(cone.apex).x) / 2 + 5 * u,
        -(r2.y + edge(cone.apex).y) / 2,
        'start',
      ),
    );
    if (c.tangent) {
      const { alpha1, alpha2 } = planeTraces(c.tangent);
      for (const [trace, name, view] of [
        [alpha1, 'β₁', sheetH],
        [alpha2, 'β₂', sheetV],
      ] as const) {
        if (!trace) continue;
        const range = clipToBox(trace, 120);
        if (!range) continue;
        const [a, b] = longLine(
          view(pointAt(trace, range[0])),
          view(pointAt(trace, range[1])),
          LINE_EXTENT,
        );
        polyline(g, [a, b], 'result', { className: 'sheet-tangent-plane' });
        // Rótulo en el extremo de su lado de la LT (β₂ arriba, β₁ abajo): así no se pisan
        // cuando las dos trazas se cortan en la LT con direcciones parecidas.
        const above = name === 'β₂';
        const end = above === a.y > b.y ? a : b;
        const anchor = end.x > (a.x + b.x) / 2 ? 'end' : 'start';
        const dx = anchor === 'end' ? -4 * u : 4 * u;
        g.append(ctx.label(name, end.x + dx, -end.y + (above ? 14 : -6) * u, anchor));
      }
    }
  }

  private drawMeasure(ctx: SheetDrawContext, k: Construction): void {
    const m = measureOf(k);
    if (!m || !m.text) return;
    const g = ctx.layer('medida');
    const u = ctx.mmPerPx;
    let x = m.at.x;
    let y = -m.at.y;
    const anchor = 'middle';
    if (m.angle) {
      angleMark(g, m.angle.vertex, m.angle.from, m.angle.to, 9);
      // Texto en la bisectriz del ángulo, por fuera del arco.
      const a = Math.atan2(m.angle.from.y - m.angle.vertex.y, m.angle.from.x - m.angle.vertex.x);
      const b = Math.atan2(m.angle.to.y - m.angle.vertex.y, m.angle.to.x - m.angle.vertex.x);
      let mid = (a + b) / 2;
      if (Math.abs(a - b) > Math.PI) mid += Math.PI;
      // Lo bastante lejos para no pisar el rótulo del punto del vértice (el texto mide unos
      // 40 px de ancho), también en el móvil, donde 9 mm son pocos píxeles.
      const r = 9 + 28 * u;
      x = m.angle.vertex.x + Math.cos(mid) * r;
      y = -(m.angle.vertex.y + Math.sin(mid) * r) + 5 * u;
    } else {
      // Verdadera magnitud: junto al centro del segmento, desplazada en perpendicular hacia
      // fuera (lejos de la LT, o de la LT₁ en el cambio de plano).
      const [a, b] = sheetResult(k).main;
      if (a && b) {
        const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
        let nx = -(b.y - a.y) / len;
        let ny = (b.x - a.x) / len;
        const out =
          k.method === 'cambio'
            ? k.side
            : k.method === 'abatimiento'
              ? foldDirection(k)
              : { x: 0, y: m.at.y >= 0 ? 1 : -1 };
        if (nx * out.x + ny * out.y < 0) {
          nx = -nx;
          ny = -ny;
        }
        // Más separación si la normal es horizontal: el texto es más ancho que alto.
        const d = (14 + 48 * Math.abs(nx) + 4 * Math.abs(ny)) * u;
        x = m.at.x + nx * d;
        y = -(m.at.y + ny * d) + 5 * u;
      }
    }
    const text = svgElement('text', { x, y, 'text-anchor': anchor }, 'sheet-label sheet-measure');
    text.textContent = m.text;
    text.dataset.label = m.text;
    g.append(text);
  }
}

/** Hacia dónde caen los puntos abatidos en la lámina (de la charnela hacia fuera). */
function foldDirection(k: Extract<Construction, { method: 'abatimiento' }>): {
  x: number;
  y: number;
} {
  const toSheet = k.onto === 'PH' ? sheetH : sheetV;
  const final = sheetResult(k).main;
  const feet = foldFeet(k).map(toSheet);
  let x = 0;
  let y = 0;
  final.forEach((p, i) => {
    const f = feet[i];
    if (f) {
      x += p.x - f.x;
      y += p.y - f.y;
    }
  });
  return { x, y };
}
