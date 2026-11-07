// Miniaturas SVG de las opciones del entrenador: figuras de cubos en isométrica (por capas,
// de atrás hacia delante), sus tres vistas, redes de cuadrados y secciones en verdadera magnitud.
import { svgElement } from '../../render2d/svg.ts';
import type { Net } from './nets.ts';
import { normalize, viewGrid, type Polycube } from './polycube.ts';

const S = 10; // lado de un cubo en la miniatura

function svg(minX: number, minY: number, w: number, h: number, label: string): SVGSVGElement {
  const el = svgElement(
    'svg',
    { viewBox: `${minX} ${minY} ${w} ${h}`, width: 120, height: 96 },
    'trainer-thumb',
  );
  el.setAttribute('role', 'img');
  el.setAttribute('aria-label', label);
  return el;
}

/** Proyección isométrica (x a la derecha y abajo, a a la izquierda y abajo, c arriba). */
function iso(x: number, a: number, c: number): [number, number] {
  const k = Math.cos(Math.PI / 6);
  return [(x - a) * k * S, ((x + a) * 0.5 - c) * S];
}

/** Figura de cubos en isométrica: se pintan las caras de arriba, delante e izquierda. */
export function polycubeThumb(p: Polycube, label: string): SVGSVGElement {
  const cells = normalize(p);
  const set = new Set(cells.map((c) => c.join()));
  // Pintor: de atrás (a pequeño, x pequeño, c pequeño) hacia delante.
  const order = [...cells].sort((u, v) => u[0] + u[1] + u[2] - (v[0] + v[1] + v[2]) || u[2] - v[2]);
  const polys: { pts: [number, number][]; cls: string }[] = [];
  for (const [x, a, c] of order) {
    const top = !set.has([x, a, c + 1].join());
    const front = !set.has([x, a + 1, c].join());
    const right = !set.has([x + 1, a, c].join());
    if (top)
      polys.push({
        pts: [
          iso(x, a, c + 1),
          iso(x + 1, a, c + 1),
          iso(x + 1, a + 1, c + 1),
          iso(x, a + 1, c + 1),
        ],
        cls: 'face-top',
      });
    if (front)
      polys.push({
        pts: [
          iso(x, a + 1, c),
          iso(x + 1, a + 1, c),
          iso(x + 1, a + 1, c + 1),
          iso(x, a + 1, c + 1),
        ],
        cls: 'face-front',
      });
    if (right)
      polys.push({
        pts: [
          iso(x + 1, a, c),
          iso(x + 1, a + 1, c),
          iso(x + 1, a + 1, c + 1),
          iso(x + 1, a, c + 1),
        ],
        cls: 'face-side',
      });
  }
  const all = polys.flatMap((p2) => p2.pts);
  const xs = all.map((q) => q[0]);
  const ys = all.map((q) => q[1]);
  const el = svg(
    Math.min(...xs) - 3,
    Math.min(...ys) - 3,
    Math.max(...xs) - Math.min(...xs) + 6,
    Math.max(...ys) - Math.min(...ys) + 6,
    label,
  );
  for (const { pts, cls } of polys) {
    el.append(
      svgElement(
        'polygon',
        { points: pts.map((q) => q.join(',')).join(' ') },
        `trainer-face ${cls}`,
      ),
    );
  }
  return el;
}

/** Las tres vistas de una figura de cubos (alzado, planta debajo y perfil izquierdo a la derecha). */
export function viewsThumb(p: Polycube, label: string): SVGSVGElement {
  const q = normalize(p);
  const max = [0, 1, 2].map((i) => Math.max(...q.map((c) => c[i] as number)) + 1) as [
    number,
    number,
    number,
  ];
  const [w, d, h] = max;
  const gap = 1;
  const el = svg(-1, -1, (w + gap + d) * S + 2, (h + gap + d) * S + 2, label);
  const cell = (u: number, v: number): void => {
    el.append(svgElement('rect', { x: u * S, y: v * S, width: S, height: S }, 'trainer-cell'));
  };
  for (const k of viewGrid(q, 'alzado')) {
    const [x, c] = k.split(',').map(Number) as [number, number];
    cell(x, h - 1 - c);
  }
  for (const k of viewGrid(q, 'planta')) {
    const [x, na] = k.split(',').map(Number) as [number, number];
    // Planta debajo del alzado; lo de delante (a mayor) abajo.
    cell(x, h + gap + -na);
  }
  for (const k of viewGrid(q, 'perfil')) {
    const [a, c] = k.split(',').map(Number) as [number, number];
    // Perfil izquierdo a la derecha del alzado; lo de delante a la derecha.
    cell(w + gap + a, h - 1 - c);
  }
  return el;
}

export function netThumb(net: Net, label: string): SVGSVGElement {
  const xs = net.map((s) => s[0]);
  const ys = net.map((s) => s[1]);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const el = svg(
    -1,
    -1,
    (Math.max(...xs) - minX + 1) * S + 2,
    (Math.max(...ys) - minY + 1) * S + 2,
    label,
  );
  for (const [x, y] of net) {
    el.append(
      svgElement(
        'rect',
        { x: (x - minX) * S, y: (y - minY) * S, width: S, height: S },
        'trainer-cell',
      ),
    );
  }
  return el;
}

export function sectionThumb(poly: readonly [number, number][], label: string): SVGSVGElement {
  const xs = poly.map((p) => p[0]);
  const ys = poly.map((p) => -p[1]);
  const w = Math.max(...xs) - Math.min(...xs);
  const h = Math.max(...ys) - Math.min(...ys);
  const pad = Math.max(w, h) * 0.12 + 1;
  const el = svg(Math.min(...xs) - pad, Math.min(...ys) - pad, w + 2 * pad, h + 2 * pad, label);
  el.append(
    svgElement(
      'polygon',
      { points: poly.map(([x, y]) => `${x},${-y}`).join(' ') },
      'trainer-section',
    ),
  );
  return el;
}
