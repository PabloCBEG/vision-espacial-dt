// Tercera proyección: plano de perfil (PP), perpendicular a la LT, situado en x = PROFILE_X.
//
// Convenio (vista lateral izquierda del sistema europeo): el PP se abate sobre el PV girando
// alrededor de su traza vertical, de modo que lo que está delante (alejamiento positivo)
// queda a la derecha. En la lámina, P‴ está en (PROFILE_X + a, c).
import { lineDirection } from './line.ts';
import { planeTraces } from './plane.ts';
import { PARALLEL_EPSILON, type Line, type Plane, type Point, type SheetPoint } from './types.ts';
import { createPoint } from './vector.ts';

/** Posición del plano de perfil, a la derecha de la zona de trabajo (los puntos llegan a ±60). */
export const PROFILE_X = 70;

/** Proyección de perfil P‴ en el espacio, sobre el PP. */
export function profilePoint(p: Point, profileX = PROFILE_X): Point {
  return createPoint(profileX, p.a, p.c);
}

/** P‴ en la lámina, tras abatir el PP sobre el PV. */
export function profileSheetCoords(p: Point, profileX = PROFILE_X): SheetPoint {
  return { x: profileX + p.a, y: p.c };
}

/**
 * Traza de perfil α3 de un plano: su recta de corte con el PP (x = profileX).
 * Devuelve null si el plano es paralelo al PP.
 */
export function profileTrace(alpha: Plane, profileX = PROFILE_X): Line | null {
  const n = alpha.normal;
  // Dirección de la recta de corte: perpendicular a la normal del plano y al eje x.
  const len = Math.hypot(n.a, n.c);
  if (len <= PARALLEL_EPSILON) return null;
  // Puntos del PP que cumplen n·(profileX, a, c) = n·p1, es decir, n.a·a + n.c·c = d.
  const d = n.x * alpha.p1.x + n.a * alpha.p1.a + n.c * alpha.p1.c - n.x * profileX;
  const base =
    Math.abs(n.c) > Math.abs(n.a)
      ? createPoint(profileX, 0, d / n.c)
      : createPoint(profileX, d / n.a, 0);
  const dir = { a: n.c / len, c: -n.a / len };
  return {
    p1: base,
    p2: createPoint(profileX, base.a + dir.a * 100, base.c + dir.c * 100),
  };
}

/** Recta de perfil: sus dos proyecciones no bastan; hace falta la tercera. */
export function lineNeedsProfile(r: Line): boolean {
  const d = lineDirection(r);
  const n = Math.hypot(d.x, d.a, d.c);
  return Math.abs(d.x) <= 1e-6 * n && Math.hypot(d.a, d.c) > 1e-6 * n;
}

/** Plano que contiene la LT: sus trazas no bastan; hace falta la tercera proyección. */
export function planeNeedsProfile(alpha: Plane): boolean {
  return planeTraces(alpha).containsLT;
}
