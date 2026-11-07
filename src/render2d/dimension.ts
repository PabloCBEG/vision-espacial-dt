// Cota vertical según UNE-EN ISO 129-1, calculada sin tocar el DOM (se puede probar).
//
// Coordenadas de la lámina en SVG: x hacia la derecha, y hacia ABAJO, en mm.
// - Línea de cota: fina, paralela a lo que se mide, con un extremo de flecha en cada lado.
// - Líneas auxiliares (de referencia): finas, perpendiculares, sobrepasan la línea de cota.
// - Cifra de cota: paralela a la línea de cota y encima de ella; en cotas verticales se lee
//   desde la derecha (texto girado −90°), así que queda a la izquierda de la línea.
// - Si no caben las flechas dentro, se dibujan por fuera apuntando hacia dentro.

export interface Segment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

/** Triángulo relleno de la punta de flecha: vértice y dos esquinas. */
export type Arrowhead = [number, number, number, number, number, number];

export interface DimensionDrawing {
  extensionLines: Segment[];
  dimensionLine: Segment;
  arrowheads: [Arrowhead, Arrowhead];
  text: { x: number; y: number; rotation: number; value: string };
}

export interface VerticalDimensionInput {
  /** x del elemento acotado (la línea de referencia). */
  featureX: number;
  /** y en SVG de los dos extremos medidos (por ejemplo la LT, y = 0, y el punto). */
  fromY: number;
  toY: number;
  /** Lado donde va la línea de cota respecto al elemento. */
  side: 'left' | 'right';
  /** mm de lámina por píxel de pantalla: mantiene constantes en pantalla flechas y separaciones. */
  mmPerPx: number;
  /** Si el extremo fromY ya tiene línea propia (la LT), no se dibuja auxiliar en ese lado. */
  fromHasLine: boolean;
  value: string;
}

/** Medidas en píxeles de pantalla (se convierten a mm con mmPerPx). */
export const DIMENSION_PX = {
  offset: 26, // separación entre el elemento y la línea de cota
  overshoot: 6, // cuánto sobrepasa la línea auxiliar a la línea de cota
  gap: 4, // hueco entre el elemento y el comienzo de la línea auxiliar
  arrowLength: 9,
  arrowHalfWidth: 2.6, // ángulo de unos 15°, como en ISO 129-1
  textGap: 4, // separación entre la cifra y la línea de cota
  outsideTail: 10, // prolongación de la línea cuando las flechas van por fuera
};

export function verticalDimension(input: VerticalDimensionInput): DimensionDrawing {
  const k = input.mmPerPx;
  const sign = input.side === 'left' ? -1 : 1;
  const lineX = input.featureX + sign * DIMENSION_PX.offset * k;

  const extensionLines: Segment[] = [];
  const auxiliary = (y: number): Segment => ({
    x1: input.featureX + sign * DIMENSION_PX.gap * k,
    y1: y,
    x2: lineX + sign * DIMENSION_PX.overshoot * k,
    y2: y,
  });
  if (!input.fromHasLine) extensionLines.push(auxiliary(input.fromY));
  extensionLines.push(auxiliary(input.toY));

  const top = Math.min(input.fromY, input.toY);
  const bottom = Math.max(input.fromY, input.toY);
  const length = bottom - top;
  const arrowLength = DIMENSION_PX.arrowLength * k;
  const halfWidth = DIMENSION_PX.arrowHalfWidth * k;
  const fitsInside = length >= 2 * arrowLength + 2 * k;

  // Dentro: las puntas tocan las auxiliares desde dentro. Fuera: apuntan hacia dentro desde fuera.
  const arrow = (tipY: number, direction: 1 | -1): Arrowhead => {
    const baseY = tipY + direction * arrowLength;
    return [lineX, tipY, lineX - halfWidth, baseY, lineX + halfWidth, baseY];
  };
  const arrowheads: [Arrowhead, Arrowhead] = fitsInside
    ? [arrow(top, 1), arrow(bottom, -1)]
    : [arrow(top, -1), arrow(bottom, 1)];

  const tail = fitsInside ? 0 : (DIMENSION_PX.outsideTail + DIMENSION_PX.arrowLength) * k;
  const dimensionLine: Segment = { x1: lineX, y1: top - tail, x2: lineX, y2: bottom + tail };

  return {
    extensionLines,
    dimensionLine,
    arrowheads,
    text: {
      x: lineX - DIMENSION_PX.textGap * k,
      y: (top + bottom) / 2,
      rotation: -90,
      value: input.value,
    },
  };
}

export interface LinearDimensionInput {
  /** Puntos medidos, en coordenadas SVG (y hacia abajo), en mm. */
  from: { x: number; y: number };
  to: { x: number; y: number };
  /** Horizontal, vertical o alineada con los dos puntos. */
  direction: 'h' | 'v' | 'aligned';
  /** Separación de la línea de cota, en mm, desde el punto más exterior (con signo). */
  offset: number;
  mmPerPx: number;
  value: string;
}

/**
 * Cota lineal cualquiera según UNE-EN ISO 129-1: líneas auxiliares perpendiculares que
 * sobrepasan un poco la línea de cota, flechas cerradas de unos 15° y cifra encima de la línea,
 * legible desde abajo o desde la derecha.
 */
export function linearDimension(input: LinearDimensionInput): DimensionDrawing {
  const k = input.mmPerPx;
  const { from, to } = input;
  let ux = 1;
  let uy = 0;
  if (input.direction === 'v') {
    ux = 0;
    uy = 1;
  } else if (input.direction === 'aligned') {
    const len = Math.hypot(to.x - from.x, to.y - from.y) || 1;
    ux = (to.x - from.x) / len;
    uy = (to.y - from.y) / len;
  }
  // Normal (en SVG): para una cota horizontal, hacia arriba es −y.
  const nx = uy;
  const ny = -ux;
  const sign = input.offset >= 0 ? 1 : -1;
  const n1 = from.x * nx + from.y * ny;
  const n2 = to.x * nx + to.y * ny;
  const level = (sign > 0 ? Math.max(n1, n2) : Math.min(n1, n2)) + input.offset;
  const onLine = (p: { x: number; y: number }, np: number) => ({
    x: p.x + nx * (level - np),
    y: p.y + ny * (level - np),
  });
  const d1 = onLine(from, n1);
  const d2 = onLine(to, n2);
  const extensionLines: Segment[] = [
    [from, n1, d1],
    [to, n2, d2],
  ].map(([p, np, d]) => {
    const q = p as { x: number; y: number };
    const e = d as { x: number; y: number };
    const gap =
      Math.abs(level - (np as number)) > DIMENSION_PX.gap * k ? DIMENSION_PX.gap * k * sign : 0;
    return {
      x1: q.x + nx * gap,
      y1: q.y + ny * gap,
      x2: e.x + nx * DIMENSION_PX.overshoot * k * sign,
      y2: e.y + ny * DIMENSION_PX.overshoot * k * sign,
    };
  });
  const length = Math.hypot(d2.x - d1.x, d2.y - d1.y);
  const ax = length > 0 ? (d2.x - d1.x) / length : ux;
  const ay = length > 0 ? (d2.y - d1.y) / length : uy;
  const arrowLength = DIMENSION_PX.arrowLength * k;
  const half = DIMENSION_PX.arrowHalfWidth * k;
  const inside = length >= 2 * arrowLength + 2 * k;
  const arrow = (tip: { x: number; y: number }, dir: 1 | -1): Arrowhead => {
    const bx = tip.x + ax * arrowLength * dir;
    const by = tip.y + ay * arrowLength * dir;
    return [tip.x, tip.y, bx - ay * half, by + ax * half, bx + ay * half, by - ax * half];
  };
  const arrowheads: [Arrowhead, Arrowhead] = inside
    ? [arrow(d1, 1), arrow(d2, -1)]
    : [arrow(d1, -1), arrow(d2, 1)];
  const tail = inside ? 0 : (DIMENSION_PX.outsideTail + DIMENSION_PX.arrowLength) * k;
  const dimensionLine: Segment = {
    x1: d1.x - ax * tail,
    y1: d1.y - ay * tail,
    x2: d2.x + ax * tail,
    y2: d2.y + ay * tail,
  };
  // Cifra: legible desde abajo o desde la derecha (giro entre −90° y 90°), encima de la línea.
  let rotation = (Math.atan2(ay, ax) * 180) / Math.PI;
  if (rotation > 90) rotation -= 180;
  if (rotation <= -90) rotation += 180;
  const r = (rotation * Math.PI) / 180;
  const up = { x: Math.sin(r), y: -Math.cos(r) };
  return {
    extensionLines,
    dimensionLine,
    arrowheads,
    text: {
      x: (d1.x + d2.x) / 2 + up.x * DIMENSION_PX.textGap * k,
      y: (d1.y + d2.y) / 2 + up.y * DIMENSION_PX.textGap * k,
      rotation,
      value: input.value,
    },
  };
}
