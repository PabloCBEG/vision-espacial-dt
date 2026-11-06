// Estado único de la aplicación. El 3D, la lámina y los controles leen y escriben solo aquí.
import { createPoint, type Point } from '../geometry/index.ts';
import { Store } from './store.ts';

/** Nombre de un punto movible: P, A, B, Q... */
export type PointId = string;

/** Objetos que se dibujan, definidos a partir de los puntos con nombre. */
export type SceneObject =
  | { readonly kind: 'point'; readonly id: PointId }
  | { readonly kind: 'line'; readonly id: string; readonly through: readonly [PointId, PointId] }
  | {
      readonly kind: 'plane';
      readonly id: string;
      readonly through: readonly [PointId, PointId, PointId];
    };

export interface AppState {
  /** Coordenadas de cada punto con nombre, en mm. */
  readonly points: Readonly<Record<PointId, Point>>;
  /** Qué se dibuja, en orden. */
  readonly objects: readonly SceneObject[];
  /** Punto que controlan los deslizadores. */
  readonly activePoint: PointId;
  /** Modo proyector: trazos más gruesos, más contraste y letra más grande. */
  readonly projector: boolean;
  /** Ángulo de abatimiento del PH sobre el PV, de 0° (PH en su sitio) a 90° (lámina). */
  readonly foldAngle: number;
  /** Modo "explicar": frases cortas según el ángulo de abatimiento. */
  readonly explain: boolean;
}

/** Límite de cada coordenada de un punto, en mm (de −60 a 60). */
export const POINT_LIMIT_MM = 60;

/** Punto inicial: en el primer cuadrante, con valores distintos para no confundirlos. */
export const INITIAL_POINT = createPoint(20, 30, 40);

export const INITIAL_STATE: AppState = {
  points: { P: INITIAL_POINT },
  objects: [{ kind: 'point', id: 'P' }],
  activePoint: 'P',
  projector: false,
  foldAngle: 0,
  explain: false,
};

/** Limita el ángulo de abatimiento a [0°, 90°]. */
export function setFoldAngle(store: AppStore, angleDeg: number): void {
  patchState(store, { foldAngle: Math.min(90, Math.max(0, angleDeg)) });
}

export type AppStore = Store<AppState>;

export function createAppStore(initial: Partial<AppState> = {}): AppStore {
  return new Store<AppState>({ ...INITIAL_STATE, ...initial });
}

/** Redondea a 1 mm y limita a ±60 mm. */
export function clampCoordinate(value: number): number {
  const rounded = Math.round(value);
  const clamped = Math.min(POINT_LIMIT_MM, Math.max(-POINT_LIMIT_MM, rounded));
  return clamped + 0; // evita −0
}

export function clampPoint(p: Point): Point {
  return createPoint(clampCoordinate(p.x), clampCoordinate(p.a), clampCoordinate(p.c));
}

/** Coordenadas de un punto con nombre (lanza un error si no existe). */
export function getPoint(state: AppState, id: PointId): Point {
  const p = state.points[id];
  if (!p) throw new Error(`No existe el punto ${id}.`);
  return p;
}

/** Cambia un punto (redondeado a 1 mm y limitado a ±60 mm). No avisa si no cambia nada. */
export function setPoint(store: AppStore, id: PointId, p: Point): void {
  const state = store.get();
  const next = clampPoint(p);
  const current = state.points[id];
  if (current && next.x === current.x && next.a === current.a && next.c === current.c) return;
  store.set({ ...state, points: { ...state.points, [id]: next } });
}

/** Cambia una sola coordenada del punto activo (el que manejan los deslizadores). */
export function setActiveCoordinate(store: AppStore, axis: keyof Point, value: number): void {
  const state = store.get();
  const current = getPoint(state, state.activePoint);
  setPoint(store, state.activePoint, { ...current, [axis]: value });
}

/** Cambia cualquier campo sencillo del estado, sin avisar si no cambia. */
export function patchState(store: AppStore, patch: Partial<AppState>): void {
  const state = store.get();
  const changed = (Object.keys(patch) as (keyof AppState)[]).some((k) => patch[k] !== state[k]);
  if (changed) store.set({ ...state, ...patch });
}
