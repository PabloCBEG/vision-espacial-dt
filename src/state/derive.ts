// Puntos derivados de las intersecciones («meet»): se calculan a partir de los planos y las
// rectas de la escena y se guardan como puntos con nombre, de modo que el 3D y la lámina los
// dibujan igual que a los demás. Si la intersección no existe (planos paralelos, por ejemplo),
// el punto se queda donde estaba.
import {
  commonLinePoints,
  createLine,
  createPlane,
  createPoint,
  intersectLinePlane,
  type Line,
  type Plane,
  type Point,
} from '../geometry/index.ts';
import type { AppState, SceneObject } from './appState.ts';

function planeIn(state: AppState, id: string): Plane | null {
  const o = state.objects.find((x) => x.id === id);
  if (o?.kind !== 'plane') return null;
  const [a, b, c] = o.through.map((p) => state.points[p]);
  if (!a || !b || !c) return null;
  try {
    return createPlane(a, b, c);
  } catch {
    return null;
  }
}

function lineIn(state: AppState, id: string): Line | null {
  const o = state.objects.find((x) => x.id === id);
  if (o?.kind !== 'line') return null;
  const [a, b] = o.through.map((p) => state.points[p]);
  if (!a || !b) return null;
  try {
    return createLine(a, b);
  } catch {
    return null;
  }
}

/** Puntos que define una intersección, o null si no existe. */
function meetPoints(state: AppState, o: Extract<SceneObject, { kind: 'meet' }>): Point[] | null {
  const [first, second] = o.of;
  const a = planeIn(state, first);
  const b = planeIn(state, second);
  if (a && b) return commonLinePoints(a, b);
  const r = lineIn(state, first) ?? lineIn(state, second);
  const plane = a ?? b;
  if (!r || !plane) return null;
  const p = intersectLinePlane(r, plane);
  return p ? [p] : null;
}

const same = (p: Point, q: Point): boolean =>
  Math.abs(p.x - q.x) < 1e-9 && Math.abs(p.a - q.a) < 1e-9 && Math.abs(p.c - q.c) < 1e-9;

/** El estado con los puntos derivados al día (el mismo objeto si no hay nada que cambiar). */
export function deriveMeets(state: AppState): AppState {
  if (!state.objects.some((o) => o.kind === 'meet')) return state;
  let points = state.points;
  for (const o of state.objects) {
    if (o.kind !== 'meet') continue;
    const found = meetPoints({ ...state, points }, o);
    o.points.forEach((id, i) => {
      const next = found?.[i] ?? points[id] ?? createPoint(0, 0, 0);
      const current = points[id];
      if (!current || !same(current, next)) points = { ...points, [id]: next };
    });
  }
  return points === state.points ? state : { ...state, points };
}
