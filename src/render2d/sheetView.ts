// Lámina 2D en SVG: LT, proyecciones, líneas de referencia y cotas. 1 unidad = 1 mm.
//
// Cada elemento va en una capa con nombre ("lt", "proyecciones:P", "referencia:P",
// "medidas:P"...) que las lecciones muestran, ocultan o destacan. Las capas son grupos
// SVG persistentes: al mostrarlas u ocultarlas, el CSS hace un fundido.
import {
  clipToBox,
  createPoint,
  FOLDED_ANGLE_DEG,
  labelAnchor,
  lineSegments,
  lineTraces,
  planeTraces,
  pointAt,
  PROFILE_X,
  profileSheetCoords,
  profileTrace,
  sheetCoords,
  type Line,
  type Point,
} from '../geometry/index.ts';
import {
  getPoint,
  isLayerVisible,
  isProfileVisible,
  lineOf,
  objectsNeedingProfile,
  planeOf,
  setPoint,
  type AppState,
  type AppStore,
} from '../state/index.ts';
import { formatNumber } from '../ui/format.ts';
import { verticalDimension, type DimensionDrawing } from './dimension.ts';
import type { LabelAnchor, SheetDrawContext, SheetModule } from './sheetModule.ts';
import { setAttributes, svgElement } from './svg.ts';
import {
  FIT_VIEWBOX,
  FIT_WITH_PROFILE_VIEWBOX,
  mmPerPixel,
  unionViewBox,
  viewBoxCenter,
  zoomViewBox,
  type ViewBox,
} from './viewport.ts';

/** Extremos de la LT y sus dos trazos cortos (en mm). */
const LT_HALF_LENGTH = 86;
const LT_MARK_LENGTH = 8;
const LT_MARK_OFFSET = 2.5;
/** Lo que se dibuja en la lámina se recorta a este tamaño para que quepa en el encuadre. */
const SHEET_EXTENT_MM = 68;

/** Punto para rotular una traza: cerca de su extremo derecho, algo hacia dentro. */
function labelPoint(p: Point, q: Point, leftEnd = false): Point {
  const [near, far] = p.x > q.x !== leftEnd ? [p, q] : [q, p];
  return createPoint(
    near.x + (far.x - near.x) * 0.1,
    near.a + (far.a - near.a) * 0.1,
    near.c + (far.c - near.c) * 0.1,
  );
}

/** Cuadrícula de los ejercicios, para medir en la lámina. */
const GRID_STEP_MM = 10;
const GRID_EXTENT_MM = 80;

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
  private readonly layers = new Map<string, SVGGElement>();
  private readonly modules: SheetModule[] = [];
  private usedLayers = new Set<string>();
  private viewBox: ViewBox = FIT_VIEWBOX;
  /** Mientras no se haga zoom, el encuadre se ajusta solo (por ejemplo, al aparecer el perfil). */
  private autoFit = true;
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

  /** Añade un módulo de un motor. Devuelve la función que lo quita. */
  use(module: SheetModule): () => void {
    this.modules.push(module);
    this.requestRender();
    return () => {
      const index = this.modules.indexOf(module);
      if (index >= 0) this.modules.splice(index, 1);
      this.requestRender();
    };
  }

  zoomIn(): void {
    const c = viewBoxCenter(this.viewBox);
    this.autoFit = false;
    this.setViewBox(zoomViewBox(this.viewBox, 1.25, c.x, c.y));
  }

  zoomOut(): void {
    const c = viewBoxCenter(this.viewBox);
    this.autoFit = false;
    this.setViewBox(zoomViewBox(this.viewBox, 1 / 1.25, c.x, c.y));
  }

  /** Encuadre automático: vuelve a ver toda la lámina, con el perfil si se muestra. */
  fit(): void {
    this.autoFit = true;
    this.setViewBox(this.fitFor(this.store.get()));
  }

  private fitFor(state: AppState): ViewBox {
    let box = isProfileVisible(state, state.layersSheet) ? FIT_WITH_PROFILE_VIEWBOX : FIT_VIEWBOX;
    for (const module of this.modules) {
      const extra = module.fitBox?.(state);
      if (extra) box = unionViewBox(box, extra);
    }
    return box;
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
    if (this.autoFit) this.viewBox = this.fitFor(state);
    const vb = this.viewBox;
    setAttributes(this.svg, { viewBox: `${vb.x} ${vb.y} ${vb.width} ${vb.height}` });
    this.mmPerPx = mmPerPixel(vb, this.container.clientWidth, this.container.clientHeight);
    // Los textos y las flechas se dimensionan en píxeles de pantalla a partir de --u.
    this.svg.style.setProperty('--u', String(this.mmPerPx));

    this.usedLayers = new Set();
    const exercise = state.exercise;
    if (exercise) this.drawGrid();
    this.drawLT();

    // Mientras el PH no esté abatido del todo, P′ aún no ha llegado a la lámina:
    // se dibuja en gris translúcido en su posición final, para que se vea hacia dónde va.
    const pending = state.foldAngle < FOLDED_ANGLE_DEG;
    const pointIds = state.objects.filter((o) => o.kind === 'point').map((o) => o.id);
    if (exercise) {
      // En un ejercicio la lámina muestra el punto buscado, no el del alumno.
      this.drawPoint('objetivo', 'P', exercise.target, false, false);
    } else {
      for (const o of state.objects) {
        if (o.kind === 'plane') this.drawPlane(o.id, state, o.through, pending);
      }
      for (const o of state.objects) {
        if (o.kind === 'line') this.drawLine(o.id, lineOf(state, o.through), pending);
      }
      for (const id of pointIds) this.drawPoint(id, id, getPoint(state, id), pending, true);
      if (isProfileVisible(state, state.layersSheet)) this.drawProfile(state);
    }

    // Capas de los motores enchufados (métodos, sólidos…).
    const context: SheetDrawContext = {
      state,
      mmPerPx: this.mmPerPx,
      layer: (tag) => this.layer(tag),
      label: (text, x, y, anchor, pending) => this.label(text, x, y, anchor, pending),
    };
    for (const module of this.modules) module.draw(context);

    // Paso sin nada en la lámina: se explica por qué está vacía.
    if (!exercise && state.layersSheet !== null && state.layersSheet.length === 0) {
      const note = svgElement('text', { x: 0, y: 0, 'text-anchor': 'middle' }, 'sheet-empty-note');
      note.textContent = 'La lámina aparecerá al abatir el PH.';
      this.layer('aviso').append(note);
    }

    this.finishLayers(state);
    this.syncHandles(state, exercise ? [] : pointIds);
  }

  /**
   * Grupo de una capa. La primera vez en cada dibujo se vacía; los grupos que no se usan
   * se quitan al final.
   */
  private layer(tag: string): SVGGElement {
    let group = this.layers.get(tag);
    if (!group) {
      group = svgElement('g', {}, 'sheet-layer');
      group.dataset.layer = tag;
      this.layers.set(tag, group);
    }
    if (!this.usedLayers.has(tag)) {
      this.usedLayers.add(tag);
      group.replaceChildren();
      this.drawing.append(group); // en el orden en que se dibujan
    }
    return group;
  }

  private finishLayers(state: AppState): void {
    for (const [tag, group] of this.layers) {
      if (!this.usedLayers.has(tag)) {
        group.remove();
        this.layers.delete(tag);
        continue;
      }
      const always =
        tag === 'cuadricula' ||
        tag.startsWith('objetivo') ||
        tag === 'perfil' ||
        tag === 'aviso' ||
        this.modules.some((m) => m.isAlwaysVisible?.(tag));
      const visible = always || isLayerVisible(state.layersSheet, tag);
      group.classList.toggle('is-hidden', !visible);
      group.classList.toggle('is-highlighted', state.highlight.includes(tag));
    }
  }

  /** LT horizontal con los dos trazos cortos bajo sus extremos. */
  private drawLT(): void {
    const L = LT_HALF_LENGTH;
    const y = LT_MARK_OFFSET;
    this.layer('lt').append(
      svgElement('line', { x1: -L, y1: 0, x2: L, y2: 0 }, 'sheet-thick'),
      svgElement('line', { x1: -L, y1: y, x2: -L + LT_MARK_LENGTH, y2: y }, 'sheet-thick'),
      svgElement('line', { x1: L - LT_MARK_LENGTH, y1: y, x2: L, y2: y }, 'sheet-thick'),
    );
  }

  /** Cuadrícula de 10 mm para medir en los ejercicios. */
  private drawGrid(): void {
    const group = this.layer('cuadricula');
    const E = GRID_EXTENT_MM;
    for (let k = -E; k <= E; k += GRID_STEP_MM) {
      group.append(
        svgElement('line', { x1: k, y1: -E, x2: k, y2: E }, 'sheet-grid'),
        svgElement('line', { x1: -E, y1: k, x2: E, y2: k }, 'sheet-grid'),
      );
    }
  }

  /**
   * Línea de referencia, cotas y rótulos de un punto.
   * - layerId: nombre de las capas ("P" → "proyecciones:P"; "objetivo" para un ejercicio).
   * - name: nombre que se rotula (P, A...).
   * - withMeasures: si se acotan cota y alejamiento.
   */
  private drawPoint(
    layerId: string,
    name: string,
    p: Point,
    pending: boolean,
    withMeasures: boolean,
  ): void {
    const { h, v } = sheetCoords(p);
    const k = this.mmPerPx;
    // En SVG la y crece hacia abajo: se cambia el signo.
    const hy = -h.y;
    const vy = -v.y;

    const reference = this.layer(`referencia:${layerId}`);
    if (!pending && hy !== vy) {
      reference.append(
        svgElement('line', { x1: p.x, y1: vy, x2: p.x, y2: hy }, 'sheet-thin sheet-reference'),
      );
    } else if (pending) {
      // De P″ a la LT, normal; de la LT a P′, pendiente.
      if (vy !== 0) {
        reference.append(
          svgElement('line', { x1: p.x, y1: vy, x2: p.x, y2: 0 }, 'sheet-thin sheet-reference'),
        );
      }
      if (hy !== 0) {
        reference.append(
          svgElement(
            'line',
            { x1: p.x, y1: 0, x2: p.x, y2: hy },
            'sheet-thin sheet-reference is-pending',
          ),
        );
      }
    }

    // Cota a la izquierda (de la LT a P″) y alejamiento a la derecha (de la LT a P′).
    if (withMeasures) {
      const measures = this.layer(`medidas:${layerId}`);
      if (p.c !== 0) {
        this.drawDimension(
          measures,
          verticalDimension({
            featureX: p.x,
            fromY: 0,
            toY: vy,
            side: 'left',
            mmPerPx: k,
            fromHasLine: true,
            value: formatNumber(Math.abs(p.c)),
          }),
          `cota-${name}`,
        );
      }
      if (p.a !== 0) {
        this.drawDimension(
          measures,
          verticalDimension({
            featureX: p.x,
            fromY: 0,
            toY: hy,
            side: 'right',
            mmPerPx: k,
            fromHasLine: true,
            value: formatNumber(Math.abs(p.a)),
          }),
          `alejamiento-${name}`,
          pending,
        );
      }
    }

    // Rótulos: P″ arriba a la derecha y P′ abajo a la izquierda, lejos de las cotas.
    const projections = this.layer(`proyecciones:${layerId}`);
    projections.append(
      this.label(`${name}″`, p.x + 6 * k, vy - 6 * k, 'start'),
      this.label(`${name}′`, p.x - 6 * k, hy + 18 * k, 'end', pending),
    );
    // Sin asa que arrastrar (ejercicio), el punto se dibuja aquí mismo.
    if (layerId === 'objetivo') {
      const r = (this.store.get().projector ? 5 : 3.2) * k;
      projections.append(
        svgElement('circle', { cx: p.x, cy: vy, r }, 'sheet-target-dot'),
        svgElement('circle', { cx: p.x, cy: hy, r }, 'sheet-target-dot'),
      );
    }
  }

  /**
   * Recta: r′ y r″ con sus partes vistas (continuas, gruesas) y ocultas (discontinuas, finas),
   * y las trazas H (H′ en r′, H″ en la LT) y V (V″ en r″, V′ en la LT).
   */
  private drawLine(id: string, r: Line | null, pending: boolean): void {
    const group = this.layer(`recta:${id}`);
    if (!r) return;
    const k = this.mmPerPx;
    for (const s of lineSegments(r, SHEET_EXTENT_MM)) {
      const style = s.visible ? 'sheet-line-visible' : 'sheet-line-hidden';
      group.append(
        // r″: (x, cota). En SVG la y va hacia abajo.
        svgElement('line', { x1: s.from.x, y1: -s.from.c, x2: s.to.x, y2: -s.to.c }, style),
        // r′: (x, −alejamiento) en la lámina → y = alejamiento en SVG.
        svgElement(
          'line',
          { x1: s.from.x, y1: s.from.a, x2: s.to.x, y2: s.to.a },
          pending ? `${style} is-pending` : style,
        ),
      );
    }
    const anchor = labelAnchor(r, SHEET_EXTENT_MM);
    if (anchor) {
      group.append(
        this.label(`${id}″`, anchor.x + 5 * k, -anchor.c - 5 * k, 'start'),
        this.label(`${id}′`, anchor.x + 5 * k, anchor.a + 16 * k, 'start', pending),
      );
    }

    const traces = this.layer(`trazas:${id}`);
    const { h, v } = lineTraces(r);
    const inside = (p: Point | null): p is Point =>
      p !== null && Math.max(Math.abs(p.x), Math.abs(p.a), Math.abs(p.c)) <= 80;
    const dot = (x: number, y: number, extra = ''): SVGCircleElement =>
      svgElement('circle', { cx: x, cy: y, r: 3 * k }, `sheet-trace-dot ${extra}`.trim());
    if (inside(h)) {
      // H está en el PH: H′ = H en (x, a); H″ en la LT.
      traces.append(
        svgElement(
          'line',
          { x1: h.x, y1: 0, x2: h.x, y2: h.a },
          `sheet-thin sheet-reference${pending ? ' is-pending' : ''}`,
        ),
        dot(h.x, h.a, pending ? 'is-pending' : ''),
        dot(h.x, 0),
        this.label('H′', h.x - 5 * k, h.a + 16 * k, 'end', pending),
        this.label('H″', h.x - 5 * k, -5 * k, 'end'),
      );
    }
    if (inside(v)) {
      // V está en el PV: V″ = V en (x, c); V′ en la LT.
      traces.append(
        svgElement('line', { x1: v.x, y1: 0, x2: v.x, y2: -v.c }, 'sheet-thin sheet-reference'),
        dot(v.x, -v.c),
        dot(v.x, 0),
        this.label('V″', v.x + 5 * k, -v.c - 5 * k, 'start'),
        this.label('V′', v.x + 5 * k, 16 * k, 'start'),
      );
    }
  }

  /** Plano: trazas α₁ (bajo la LT si está delante) y α₂, recortadas a la lámina. */
  private drawPlane(
    id: string,
    state: AppState,
    through: readonly [string, string, string],
    pending: boolean,
  ): void {
    const group = this.layer(`trazas:${id}`);
    this.layer(`plano:${id}`); // la superficie solo existe en 3D; la capa queda vacía
    const alpha = planeOf(state, through);
    if (!alpha) return;
    const k = this.mmPerPx;
    const { alpha1, alpha2, containsLT } = planeTraces(alpha);
    const clipped = (t: Line | null): [Point, Point] | null => {
      if (!t) return null;
      const range = clipToBox(t, SHEET_EXTENT_MM);
      return range ? [pointAt(t, range[0]), pointAt(t, range[1])] : null;
    };
    const t1 = clipped(alpha1);
    const t2 = clipped(alpha2);
    if (t1) {
      const [p, q] = t1;
      group.append(
        svgElement(
          'line',
          { x1: p.x, y1: p.a, x2: q.x, y2: q.a },
          pending ? 'sheet-plane-trace is-pending' : 'sheet-plane-trace',
        ),
      );
      // Si contiene la LT, el rótulo va al extremo izquierdo, lejos del plano de perfil.
      const end = containsLT
        ? labelPoint(p.x < q.x ? q : p, p.x < q.x ? p : q, true)
        : labelPoint(p, q);
      const text = containsLT ? `${id}₁ ≡ ${id}₂` : `${id}₁`;
      group.append(this.label(text, end.x + 6 * k, end.a + 18 * k, 'start', pending));
    }
    if (t2 && !containsLT) {
      const [p, q] = t2;
      group.append(
        svgElement('line', { x1: p.x, y1: -p.c, x2: q.x, y2: -q.c }, 'sheet-plane-trace'),
      );
      const end = labelPoint(p, q);
      group.append(this.label(`${id}₂`, end.x + 6 * k, -end.c - 6 * k, 'start'));
    }
  }

  /**
   * Tercera proyección. El PP se ve como una recta perpendicular a la LT en x = PROFILE_X.
   * P‴ se construye con una horizontal desde P″ y, desde P′, una horizontal hasta el PP,
   * un arco con centro en la LT y una vertical (el alejamiento se lleva a la derecha).
   */
  private drawProfile(state: AppState): void {
    const group = this.layer('perfil');
    const k = this.mmPerPx;
    const X = PROFILE_X;
    group.append(
      svgElement('line', { x1: X, y1: -80, x2: X, y2: 80 }, 'sheet-thin sheet-profile-plane'),
      svgElement('line', { x1: X, y1: 0, x2: X + 75, y2: 0 }, 'sheet-thin'),
      this.label('PP', X + 4 * k, -74, 'start'),
    );

    for (const id of objectsNeedingProfile(state)) {
      const object = state.objects.find((o) => o.id === id);
      if (object?.kind === 'line') {
        const ends: Point[] = [];
        for (const name of object.through) {
          const p = getPoint(state, name);
          const q = profileSheetCoords(p);
          ends.push(p);
          // Construcción: horizontal desde P″; desde P′, horizontal hasta el PP, arco y vertical.
          const radius = Math.abs(p.a);
          const sweep = 0; // el arco gira siempre hacia la LT, en sentido antihorario
          group.append(
            svgElement('line', { x1: p.x, y1: -p.c, x2: q.x, y2: -q.y }, 'sheet-construction'),
            svgElement('line', { x1: p.x, y1: p.a, x2: X, y2: p.a }, 'sheet-construction'),
            svgElement(
              'path',
              { d: `M ${X} ${p.a} A ${radius} ${radius} 0 0 ${sweep} ${X + p.a} 0` },
              'sheet-construction',
            ),
            svgElement('line', { x1: q.x, y1: 0, x2: q.x, y2: -q.y }, 'sheet-construction'),
            svgElement('circle', { cx: q.x, cy: -q.y, r: 3 * k }, 'sheet-trace-dot'),
            this.label(`${name}‴`, q.x + 5 * k, -q.y - 5 * k, 'start'),
          );
        }
        const [A, B] = ends;
        if (A && B) {
          const a = profileSheetCoords(A);
          const b = profileSheetCoords(B);
          group.append(
            svgElement('line', { x1: a.x, y1: -a.y, x2: b.x, y2: -b.y }, 'sheet-line-visible'),
          );
          // r‴ en el punto medio, a la derecha, para no chocar con A‴ y B‴.
          const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
          group.append(this.label(`${id}‴`, mid.x + 8 * k, -mid.y + 5 * k, 'start'));
        }
      } else if (object?.kind === 'plane') {
        const alpha = planeOf(state, object.through);
        const trace = alpha ? profileTrace(alpha) : null;
        // Se recorta en el propio PP (alejamiento y cota), sin mirar la x del plano de perfil.
        const range = trace
          ? clipToBox({ p1: { ...trace.p1, x: 0 }, p2: { ...trace.p2, x: 0 } }, SHEET_EXTENT_MM)
          : null;
        if (trace && range) {
          const p = profileSheetCoords(pointAt(trace, range[0]));
          const q = profileSheetCoords(pointAt(trace, range[1]));
          group.append(
            svgElement('line', { x1: p.x, y1: -p.y, x2: q.x, y2: -q.y }, 'sheet-plane-trace'),
          );
          const top = p.y > q.y ? p : q;
          const at = {
            x: top.x + (q.x + p.x - 2 * top.x) * 0.1,
            y: top.y + (q.y + p.y - 2 * top.y) * 0.1,
          };
          group.append(this.label(`${id}₃`, at.x + 6 * k, -at.y, 'start'));
        }
      }
    }
  }

  private label(
    text: string,
    x: number,
    y: number,
    anchor: LabelAnchor,
    pending = false,
  ): SVGTextElement {
    const className = pending ? 'sheet-label is-pending' : 'sheet-label';
    const element = svgElement('text', { x, y, 'text-anchor': anchor }, className);
    element.textContent = text;
    element.dataset.label = text;
    return element;
  }

  private drawDimension(
    parent: SVGGElement,
    d: DimensionDrawing,
    name: string,
    pending = false,
  ): void {
    const group = svgElement('g', {}, pending ? 'sheet-dimension is-pending' : 'sheet-dimension');
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
    parent.append(group);
  }

  // ---------- Puntos arrastrables ----------

  private syncHandles(state: AppState, pointIds: string[]): void {
    const wanted = new Set<string>();
    for (const id of pointIds) {
      const p = getPoint(state, id);
      const { h, v } = sheetCoords(p);
      const visible = isLayerVisible(state.layersSheet, `proyecciones:${id}`);
      for (const [projection, x, y] of [
        ['horizontal', h.x, -h.y],
        ['vertical', v.x, -v.y],
      ] as const) {
        const key = `${id}${projection === 'horizontal' ? '′' : '″'}`;
        wanted.add(key);
        const handle = this.handles.get(key) ?? this.createHandle(id, projection, key);
        this.placeHandle(handle, x, y, key, p, projection);
        const pending = projection === 'horizontal' && state.foldAngle < FOLDED_ANGLE_DEG;
        handle.group.classList.toggle('is-pending', pending);
        handle.group.classList.toggle('is-hidden', !visible);
        handle.group.setAttribute('tabindex', visible ? '0' : '-1');
        handle.group.setAttribute('aria-hidden', String(!visible));
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
      event.stopPropagation(); // las flechas no cambian de paso en la lección
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
