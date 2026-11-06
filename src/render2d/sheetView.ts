// Lámina 2D en SVG: LT, proyecciones, líneas de referencia y cotas. 1 unidad = 1 mm.
import { createPoint, sheetCoords, type Point } from '../geometry/index.ts';
import { getPoint, setPoint, type AppState, type AppStore } from '../state/index.ts';
import { formatNumber } from '../ui/format.ts';
import { verticalDimension, type DimensionDrawing } from './dimension.ts';
import { setAttributes, svgElement } from './svg.ts';
import { FIT_VIEWBOX, mmPerPixel, viewBoxCenter, zoomViewBox, type ViewBox } from './viewport.ts';

/** Extremos de la LT y sus dos trazos cortos (en mm). */
const LT_HALF_LENGTH = 86;
const LT_MARK_LENGTH = 8;
const LT_MARK_OFFSET = 2.5;

type Projection = 'horizontal' | 'vertical';

interface Handle {
  group: SVGGElement;
  dot: SVGCircleElement;
  ring: SVGCircleElement;
  hit: SVGCircleElement;
}

export class SheetView {
  private readonly container: HTMLElement;
  private readonly store: AppStore;
  private readonly svg: SVGSVGElement;
  private readonly drawing: SVGGElement;
  private readonly handlesLayer: SVGGElement;
  private readonly handles = new Map<string, Handle>();
  private viewBox: ViewBox = FIT_VIEWBOX;
  private mmPerPx = 1;
  private frameRequested = false;

  constructor(container: HTMLElement, store: AppStore) {
    this.container = container;
    this.store = store;

    this.svg = svgElement('svg', { preserveAspectRatio: 'xMidYMid meet' }, 'sheet');
    this.svg.setAttribute('role', 'group');
    this.svg.setAttribute('aria-label', 'Lámina en sistema diédrico');
    this.drawing = svgElement('g', {}, 'sheet-drawing');
    this.handlesLayer = svgElement('g', {}, 'sheet-handles');
    this.svg.append(this.drawing, this.handlesLayer);
    container.replaceChildren(this.svg);

    store.subscribe(() => this.requestRender());
    new ResizeObserver(() => this.requestRender()).observe(container);
    this.svg.addEventListener('wheel', this.onWheel, { passive: false });
    this.render();
  }

  zoomIn(): void {
    const c = viewBoxCenter(this.viewBox);
    this.setViewBox(zoomViewBox(this.viewBox, 1.25, c.x, c.y));
  }

  zoomOut(): void {
    const c = viewBoxCenter(this.viewBox);
    this.setViewBox(zoomViewBox(this.viewBox, 1 / 1.25, c.x, c.y));
  }

  /** Encuadre automático: vuelve a ver toda la lámina. */
  fit(): void {
    this.setViewBox(FIT_VIEWBOX);
  }

  // ---------- Dibujo ----------

  private setViewBox(vb: ViewBox): void {
    this.viewBox = vb;
    this.requestRender();
  }

  private requestRender(): void {
    if (this.frameRequested) return;
    this.frameRequested = true;
    requestAnimationFrame(() => {
      this.frameRequested = false;
      this.render();
    });
  }

  private render(): void {
    const state = this.store.get();
    const vb = this.viewBox;
    setAttributes(this.svg, { viewBox: `${vb.x} ${vb.y} ${vb.width} ${vb.height}` });
    this.mmPerPx = mmPerPixel(vb, this.container.clientWidth, this.container.clientHeight);
    // Los textos y las flechas se dimensionan en píxeles de pantalla a partir de --u.
    this.svg.style.setProperty('--u', String(this.mmPerPx));

    this.drawing.replaceChildren();
    this.drawLT();
    const pointIds = state.objects.filter((o) => o.kind === 'point').map((o) => o.id);
    for (const id of pointIds) this.drawPoint(id, getPoint(state, id));
    this.syncHandles(state, pointIds);
  }

  /** LT horizontal con los dos trazos cortos bajo sus extremos. */
  private drawLT(): void {
    const L = LT_HALF_LENGTH;
    const y = LT_MARK_OFFSET;
    this.drawing.append(
      svgElement('line', { x1: -L, y1: 0, x2: L, y2: 0 }, 'sheet-thick'),
      svgElement('line', { x1: -L, y1: y, x2: -L + LT_MARK_LENGTH, y2: y }, 'sheet-thick'),
      svgElement('line', { x1: L - LT_MARK_LENGTH, y1: y, x2: L, y2: y }, 'sheet-thick'),
    );
  }

  /** Línea de referencia, cota y alejamiento acotados y rótulos de un punto. */
  private drawPoint(id: string, p: Point): void {
    const { h, v } = sheetCoords(p);
    const k = this.mmPerPx;
    // En SVG la y crece hacia abajo: se cambia el signo.
    const hy = -h.y;
    const vy = -v.y;

    if (hy !== vy) {
      this.drawing.append(
        svgElement('line', { x1: p.x, y1: vy, x2: p.x, y2: hy }, 'sheet-thin sheet-reference'),
      );
    }

    // Cota a la izquierda (de la LT a P″) y alejamiento a la derecha (de la LT a P′).
    if (p.c !== 0) {
      this.drawDimension(
        verticalDimension({
          featureX: p.x,
          fromY: 0,
          toY: vy,
          side: 'left',
          mmPerPx: k,
          fromHasLine: true,
          value: formatNumber(Math.abs(p.c)),
        }),
        `cota-${id}`,
      );
    }
    if (p.a !== 0) {
      this.drawDimension(
        verticalDimension({
          featureX: p.x,
          fromY: 0,
          toY: hy,
          side: 'right',
          mmPerPx: k,
          fromHasLine: true,
          value: formatNumber(Math.abs(p.a)),
        }),
        `alejamiento-${id}`,
      );
    }

    // Rótulos: P″ arriba a la derecha y P′ abajo a la izquierda, lejos de las cotas.
    this.drawing.append(
      this.label(`${id}″`, p.x + 6 * k, vy - 6 * k, 'start'),
      this.label(`${id}′`, p.x - 6 * k, hy + 18 * k, 'end'),
    );
  }

  private label(text: string, x: number, y: number, anchor: 'start' | 'end'): SVGTextElement {
    const element = svgElement('text', { x, y, 'text-anchor': anchor }, 'sheet-label');
    element.textContent = text;
    element.dataset.label = text;
    return element;
  }

  private drawDimension(d: DimensionDrawing, name: string): void {
    const group = svgElement('g', {}, 'sheet-dimension');
    group.dataset.dimension = name;
    for (const s of d.extensionLines) group.append(svgElement('line', { ...s }, 'sheet-thin'));
    group.append(svgElement('line', { ...d.dimensionLine }, 'sheet-thin'));
    for (const a of d.arrowheads) {
      group.append(svgElement('polygon', { points: a.join(' ') }, 'sheet-arrow'));
    }
    const text = svgElement(
      'text',
      {
        x: d.text.x,
        y: d.text.y,
        transform: `rotate(${d.text.rotation} ${d.text.x} ${d.text.y})`,
        'text-anchor': 'middle',
      },
      'sheet-dimension-text',
    );
    text.textContent = d.text.value;
    group.append(text);
    this.drawing.append(group);
  }

  // ---------- Puntos arrastrables ----------

  private syncHandles(state: AppState, pointIds: string[]): void {
    const wanted = new Set<string>();
    for (const id of pointIds) {
      const p = getPoint(state, id);
      const { h, v } = sheetCoords(p);
      for (const [projection, x, y] of [
        ['horizontal', h.x, -h.y],
        ['vertical', v.x, -v.y],
      ] as const) {
        const key = `${id}${projection === 'horizontal' ? '′' : '″'}`;
        wanted.add(key);
        const handle = this.handles.get(key) ?? this.createHandle(id, projection, key);
        this.placeHandle(handle, x, y, key, p, projection);
      }
    }
    for (const [key, handle] of this.handles) {
      if (!wanted.has(key)) {
        handle.group.remove();
        this.handles.delete(key);
      }
    }
  }

  private placeHandle(
    handle: Handle,
    x: number,
    y: number,
    key: string,
    p: Point,
    projection: Projection,
  ): void {
    const k = this.mmPerPx;
    const dotPx = this.store.get().projector ? 5 : 3.2;
    setAttributes(handle.dot, { cx: x, cy: y, r: dotPx * k });
    setAttributes(handle.ring, { cx: x, cy: y, r: (dotPx + 5) * k });
    setAttributes(handle.hit, { cx: x, cy: y, r: 16 * k });
    const second =
      projection === 'horizontal'
        ? `alejamiento ${formatNumber(p.a)} mm`
        : `cota ${formatNumber(p.c)} mm`;
    handle.group.setAttribute(
      'aria-label',
      `${key}: x ${formatNumber(p.x)} mm, ${second}. Usa las flechas para moverlo.`,
    );
  }

  private createHandle(id: string, projection: Projection, key: string): Handle {
    const group = svgElement('g', { tabindex: 0, role: 'button' }, 'sheet-handle');
    group.dataset.handle = key;
    const hit = svgElement('circle', {}, 'sheet-handle-hit');
    const ring = svgElement('circle', {}, 'sheet-handle-ring');
    const dot = svgElement('circle', {}, 'sheet-handle-dot');
    group.append(hit, ring, dot);
    this.handlesLayer.append(group);

    const move = (x: number, y: number): void => {
      const p = getPoint(this.store.get(), id);
      // P′: x y alejamiento (y de la lámina hacia abajo). P″: x y cota (hacia arriba).
      const next = projection === 'horizontal' ? createPoint(x, y, p.c) : createPoint(x, p.a, -y);
      setPoint(this.store, id, next);
    };

    group.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      event.preventDefault();
      group.setPointerCapture(event.pointerId);
      group.classList.add('is-dragging');
    });
    group.addEventListener('pointermove', (event) => {
      if (!group.hasPointerCapture(event.pointerId)) return;
      const q = this.toSheet(event.clientX, event.clientY);
      if (q) move(q.x, q.y);
    });
    const end = (event: PointerEvent): void => {
      if (group.hasPointerCapture(event.pointerId)) group.releasePointerCapture(event.pointerId);
      group.classList.remove('is-dragging');
    };
    group.addEventListener('pointerup', end);
    group.addEventListener('pointercancel', end);

    // Teclado: flechas, 1 mm; con Mayúsculas, 10 mm. Arriba sube en la lámina.
    group.addEventListener('keydown', (event) => {
      const step = event.shiftKey ? 10 : 1;
      const delta: Record<string, [number, number]> = {
        ArrowLeft: [-step, 0],
        ArrowRight: [step, 0],
        ArrowUp: [0, -step],
        ArrowDown: [0, step],
      };
      const d = delta[event.key];
      if (!d) return;
      event.preventDefault();
      const p = getPoint(this.store.get(), id);
      const { h, v } = sheetCoords(p);
      const current = projection === 'horizontal' ? h : v;
      move(current.x + d[0], -current.y + d[1]);
    });

    const handle = { group, dot, ring, hit };
    this.handles.set(key, handle);
    return handle;
  }

  /** De coordenadas de pantalla a mm de la lámina (y hacia abajo). */
  private toSheet(clientX: number, clientY: number): { x: number; y: number } | null {
    const ctm = this.svg.getScreenCTM();
    if (!ctm) return null;
    const q = new DOMPoint(clientX, clientY).matrixTransform(ctm.inverse());
    return { x: q.x, y: q.y };
  }

  private readonly onWheel = (event: WheelEvent): void => {
    event.preventDefault();
    const q = this.toSheet(event.clientX, event.clientY);
    if (!q) return;
    const factor = event.deltaY < 0 ? 1.15 : 1 / 1.15;
    this.setViewBox(zoomViewBox(this.viewBox, factor, q.x, q.y));
  };
}
