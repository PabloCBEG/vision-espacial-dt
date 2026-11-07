// Ayudas para que los motores dibujen en la lámina con los cuatro grosores con significado.
// Reciben puntos de la lámina con y hacia arriba (como en el papel) y los pasan a SVG.
import type { SheetPoint } from '../geometry/index.ts';
import { svgElement } from './svg.ts';

export type StrokeRole = 'aux' | 'process' | 'data' | 'result';

const flip = (p: SheetPoint): string => `${p.x},${-p.y}`;

export interface StrokeOptions {
  /** Parte oculta: discontinua fina. */
  hidden?: boolean;
  /** Clase extra (para buscarla en los tests o darle color). */
  className?: string;
}

function strokeClass(role: StrokeRole, options: StrokeOptions): string {
  return [`stroke-${role}`, options.hidden ? 'is-hidden-edge' : '', options.className ?? '']
    .filter(Boolean)
    .join(' ');
}

export function polyline(
  parent: SVGElement,
  points: readonly SheetPoint[],
  role: StrokeRole,
  options: StrokeOptions = {},
): SVGPolylineElement | null {
  if (points.length < 2) return null;
  const element = svgElement(
    'polyline',
    { points: points.map(flip).join(' ') },
    strokeClass(role, options),
  );
  parent.append(element);
  return element;
}

export function polygon(
  parent: SVGElement,
  points: readonly SheetPoint[],
  role: StrokeRole,
  options: StrokeOptions = {},
): SVGPolylineElement | null {
  const first = points[0];
  return first ? polyline(parent, [...points, first], role, options) : null;
}

export function circle(
  parent: SVGElement,
  center: SheetPoint,
  radius: number,
  role: StrokeRole,
  options: StrokeOptions = {},
): void {
  parent.append(
    svgElement('circle', { cx: center.x, cy: -center.y, r: radius }, strokeClass(role, options)),
  );
}

/** Arco de centro `center` desde el ángulo a0 hasta a1 (radianes, sentido antihorario). */
export function arc(
  parent: SVGElement,
  center: SheetPoint,
  radius: number,
  a0: number,
  a1: number,
  role: StrokeRole,
  options: StrokeOptions = {},
): void {
  const n = Math.max(2, Math.ceil(Math.abs(a1 - a0) / (Math.PI / 48)) + 1);
  const points = Array.from({ length: n }, (_, i) => {
    const a = a0 + ((a1 - a0) * i) / (n - 1);
    return { x: center.x + radius * Math.cos(a), y: center.y + radius * Math.sin(a) };
  });
  polyline(parent, points, role, options);
}

/** Arco entre dos puntos a la misma distancia del centro, por el lado más corto. */
export function arcBetween(
  parent: SVGElement,
  center: SheetPoint,
  from: SheetPoint,
  to: SheetPoint,
  role: StrokeRole,
  options: StrokeOptions = {},
): void {
  const radius = Math.hypot(from.x - center.x, from.y - center.y);
  if (radius < 1e-6) return;
  const a0 = Math.atan2(from.y - center.y, from.x - center.x);
  let a1 = Math.atan2(to.y - center.y, to.x - center.x);
  while (a1 - a0 > Math.PI) a1 -= 2 * Math.PI;
  while (a1 - a0 < -Math.PI) a1 += 2 * Math.PI;
  arc(parent, center, radius, a0, a1, role, options);
}

/** Punto marcado: radio fijo en pantalla (multiplicado por mm por píxel). */
export function dot(
  parent: SVGElement,
  p: SheetPoint,
  mmPerPx: number,
  className = 'sheet-dot',
): void {
  parent.append(svgElement('circle', { cx: p.x, cy: -p.y, r: 3.2 * mmPerPx }, className));
}

/** Marca de ángulo: arco pequeño entre dos direcciones desde el vértice. */
export function angleMark(
  parent: SVGElement,
  vertex: SheetPoint,
  from: SheetPoint,
  to: SheetPoint,
  radius: number,
): void {
  const a0 = Math.atan2(from.y - vertex.y, from.x - vertex.x);
  let a1 = Math.atan2(to.y - vertex.y, to.x - vertex.x);
  while (a1 - a0 > Math.PI) a1 -= 2 * Math.PI;
  while (a1 - a0 < -Math.PI) a1 += 2 * Math.PI;
  arc(parent, vertex, radius, a0, a1, 'process', { className: 'sheet-angle' });
}

/** Línea larga que pasa por dos puntos, recortada a ±extent en x y en y. */
export function longLine(p: SheetPoint, q: SheetPoint, extent: number): [SheetPoint, SheetPoint] {
  const dx = q.x - p.x;
  const dy = q.y - p.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  // Parámetros donde la recta sale del cuadrado [−extent, extent]².
  let t0 = -Infinity;
  let t1 = Infinity;
  for (const [o, u] of [
    [p.x, ux],
    [p.y, uy],
  ] as const) {
    if (Math.abs(u) < 1e-12) continue;
    const a = (-extent - o) / u;
    const b = (extent - o) / u;
    t0 = Math.max(t0, Math.min(a, b));
    t1 = Math.min(t1, Math.max(a, b));
  }
  if (!Number.isFinite(t0) || !Number.isFinite(t1)) {
    t0 = -extent;
    t1 = extent;
  }
  return [
    { x: p.x + ux * t0, y: p.y + uy * t0 },
    { x: p.x + ux * t1, y: p.y + uy * t1 },
  ];
}
