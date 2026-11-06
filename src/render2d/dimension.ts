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
