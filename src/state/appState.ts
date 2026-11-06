// Estado de la aplicación: de momento, el punto P que se ve en el 3D (y luego en la lámina).
import { createPoint, type Point } from '../geometry/index.ts';
import { Store } from './store.ts';

export interface AppState {
  readonly point: Point;
}

/** Límite de cada coordenada del punto, en mm (de −60 a 60). */
export const POINT_LIMIT_MM = 60;

/** Punto inicial: en el primer cuadrante, con valores distintos para no confundirlos. */
export const INITIAL_POINT = createPoint(20, 30, 40);

export type AppStore = Store<AppState>;

export function createAppStore(initial: AppState = { point: INITIAL_POINT }): AppStore {
  return new Store(initial);
}

/** Redondea a 1 mm y limita a ±60 mm. */
export function clampCoordinate(value: number): number {
  const rounded = Math.round(value);
  const clamped = Math.min(POINT_LIMIT_MM, Math.max(-POINT_LIMIT_MM, rounded));
  return clamped + 0; // evita −0
}

/** Cambia el punto P (redondeado y limitado). No avisa si no cambia nada. */
export function setPoint(store: AppStore, p: Point): void {
  const next = createPoint(clampCoordinate(p.x), clampCoordinate(p.a), clampCoordinate(p.c));
  const current = store.get().point;
  if (next.x === current.x && next.a === current.a && next.c === current.c) return;
  store.set({ ...store.get(), point: next });
}

/** Cambia una sola coordenada del punto P. */
export function setPointCoordinate(store: AppStore, axis: keyof Point, value: number): void {
  const current = store.get().point;
  setPoint(store, { ...current, [axis]: value });
}
