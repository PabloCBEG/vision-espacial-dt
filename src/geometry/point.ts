// Punto: proyecciones, coordenadas en la lámina y cuadrante.
import { TOLERANCE_MM, type Point, type SheetPoint } from './types.ts';
import { createPoint } from './vector.ts';

export { createPoint };

/** Proyección horizontal P' (sobre el PH): conserva x y a, cota 0. */
export function projectH(p: Point): Point {
  return createPoint(p.x, p.a, 0);
}

/** Proyección vertical P'' (sobre el PV): conserva x y c, alejamiento 0. */
export function projectV(p: Point): Point {
  return createPoint(p.x, 0, p.c);
}

/**
 * Proyección de perfil P''' sobre un plano de perfil (perpendicular a la LT)
 * situado en x = profileX. Conserva a y c.
 */
export function projectProfile(p: Point, profileX = 0): Point {
  return createPoint(profileX, p.a, p.c);
}

/**
 * Coordenadas de P' y P'' en la lámina, tras abatir el PH sobre el PV alrededor de la LT.
 * El alejamiento positivo queda bajo la LT y la cota positiva sobre ella.
 */
export function sheetCoords(p: Point): { h: SheetPoint; v: SheetPoint } {
  return {
    h: { x: p.x, y: -p.a },
    v: { x: p.x, y: p.c },
  };
}

/**
 * Cuadrante del punto:
 * 1: cota + y alejamiento +   2: cota + y alejamiento −
 * 3: cota − y alejamiento −   4: cota − y alejamiento +
 * Si está en un plano de proyección (con tolerancia de 0,01 mm) se indica el plano.
 */
export type Quadrant = 1 | 2 | 3 | 4 | 'en PH' | 'en PV' | 'en LT';

export function quadrant(p: Point): Quadrant {
  const onPH = Math.abs(p.c) <= TOLERANCE_MM;
  const onPV = Math.abs(p.a) <= TOLERANCE_MM;
  if (onPH && onPV) return 'en LT';
  if (onPH) return 'en PH';
  if (onPV) return 'en PV';
  if (p.c > 0) return p.a > 0 ? 1 : 2;
  return p.a > 0 ? 4 : 3;
}
