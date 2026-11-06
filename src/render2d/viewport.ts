// Encuadre y zoom de la lámina. Escala: 1 unidad SVG = 1 mm.

export interface ViewBox {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

/**
 * Encuadre automático: la LT entera y cualquier punto de ±60 mm con sus cotas.
 * Es fijo para que la lámina no salte mientras se arrastra un punto.
 */
export const FIT_VIEWBOX: ViewBox = { x: -95, y: -75, width: 190, height: 150 };

/** Encuadre con la tercera proyección: se amplía a la derecha hasta el perfil. */
export const FIT_WITH_PROFILE_VIEWBOX: ViewBox = { x: -95, y: -85, width: 250, height: 170 };

const MIN_WIDTH_MM = 30; // zoom máximo
const MAX_WIDTH_MM = 380; // zoom mínimo

/**
 * Acerca (factor > 1) o aleja (factor < 1) manteniendo fijo el punto (cx, cy) de la lámina.
 */
export function zoomViewBox(vb: ViewBox, factor: number, cx: number, cy: number): ViewBox {
  const width = Math.min(MAX_WIDTH_MM, Math.max(MIN_WIDTH_MM, vb.width / factor));
  const applied = vb.width / width;
  const height = vb.height / applied;
  return {
    x: cx - (cx - vb.x) / applied,
    y: cy - (cy - vb.y) / applied,
    width,
    height,
  };
}

export function viewBoxCenter(vb: ViewBox): { x: number; y: number } {
  return { x: vb.x + vb.width / 2, y: vb.y + vb.height / 2 };
}

/**
 * mm de lámina por píxel de pantalla con preserveAspectRatio="xMidYMid meet":
 * manda el lado que más se ajusta.
 */
export function mmPerPixel(vb: ViewBox, clientWidth: number, clientHeight: number): number {
  if (clientWidth <= 0 || clientHeight <= 0) return 1;
  return Math.max(vb.width / clientWidth, vb.height / clientHeight);
}
