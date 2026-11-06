// Geometría de los objetos de la escena a partir del estado (rectas y planos por sus puntos).
import {
  classifyLine,
  classifyPlane,
  createLine,
  createPlane,
  type Line,
  type Plane,
} from '../geometry/index.ts';
import { getPoint, isLayerVisible, type AppState } from './appState.ts';

/** Recta de la escena a partir de sus puntos; null si los dos coinciden. */
export function lineOf(state: AppState, through: readonly [string, string]): Line | null {
  try {
    return createLine(getPoint(state, through[0]), getPoint(state, through[1]));
  } catch {
    return null;
  }
}

/** Plano de la escena a partir de sus puntos; null si están alineados. */
export function planeOf(state: AppState, through: readonly [string, string, string]): Plane | null {
  try {
    return createPlane(
      getPoint(state, through[0]),
      getPoint(state, through[1]),
      getPoint(state, through[2]),
    );
  } catch {
    return null;
  }
}

/** Objetos que necesitan la tercera proyección (recta de perfil, plano que contiene la LT). */
export function objectsNeedingProfile(state: AppState): string[] {
  const ids: string[] = [];
  for (const o of state.objects) {
    if (o.kind === 'line') {
      const r = lineOf(state, o.through);
      if (r && classifyLine(r).includes('profile')) ids.push(o.id);
    } else if (o.kind === 'plane') {
      const alpha = planeOf(state, o.through);
      if (alpha && classifyPlane(alpha).includes('containsLT')) ids.push(o.id);
    }
  }
  return ids;
}

/**
 * ¿Se muestra la tercera proyección? Si alguna recta o plano visible la necesita,
 * o si el paso la pide expresamente con la capa "perfil".
 */
export function isProfileVisible(state: AppState, layers: readonly string[] | null): boolean {
  if (layers !== null && layers.includes('perfil')) return true;
  return objectsNeedingProfile(state).some((id) => {
    const object = state.objects.find((o) => o.id === id);
    const tag = object?.kind === 'line' ? `recta:${id}` : `plano:${id}`;
    const traces = `trazas:${id}`;
    return isLayerVisible(layers, tag) || isLayerVisible(layers, traces);
  });
}
