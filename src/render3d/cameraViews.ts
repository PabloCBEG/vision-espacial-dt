// Vistas rápidas de la cámara y transición suave entre ellas.
import { Vector3, type PerspectiveCamera } from 'three';

export type ViewName = 'perspective' | 'front' | 'top' | 'profile';

export const VIEW_NAMES: readonly ViewName[] = ['perspective', 'front', 'top', 'profile'];

export function isViewName(value: unknown): value is ViewName {
  return typeof value === 'string' && (VIEW_NAMES as readonly string[]).includes(value);
}

/** Distancia de la cámara al origen en las vistas rápidas, en mm. */
export const VIEW_DISTANCE_MM = 330;
export const MIN_DISTANCE_MM = 140;
export const MAX_DISTANCE_MM = 650;

/** Dirección desde el origen hasta la cámara, en coordenadas de Three.js (X = x, Y = c, Z = a). */
const DIRECTIONS: Record<ViewName, Vector3> = {
  // Delante, a la derecha y por encima: se ven el PH, el PV y el primer cuadrante.
  perspective: new Vector3(0.55, 0.42, 0.72).normalize(),
  // Desde delante, mirando al PV: como el alzado.
  front: new Vector3(0, 0, 1),
  // Desde arriba, con un desvío mínimo hacia delante para que el alejamiento positivo
  // quede hacia abajo de la pantalla, como en la planta.
  top: new Vector3(0, 1, 0.001).normalize(),
  // Desde la izquierda (x negativa): vista lateral izquierda del sistema europeo.
  profile: new Vector3(-1, 0, 0),
};

const TRANSITION_MS = 600;

interface Transition {
  start: number;
  fromDirection: Vector3;
  fromDistance: number;
  toDirection: Vector3;
}

/** Mueve la cámara hasta una vista rápida, de golpe o con una transición suave. */
export class CameraAnimator {
  private readonly camera: PerspectiveCamera;
  private transition: Transition | null = null;

  constructor(camera: PerspectiveCamera) {
    this.camera = camera;
  }

  get isAnimating(): boolean {
    return this.transition !== null;
  }

  goTo(view: ViewName, instant: boolean): void {
    const toDirection = DIRECTIONS[view].clone();
    if (instant) {
      this.transition = null;
      this.place(toDirection, VIEW_DISTANCE_MM);
      return;
    }
    this.transition = {
      start: performance.now(),
      fromDirection: this.camera.position.clone().normalize(),
      fromDistance: this.camera.position.length(),
      toDirection,
    };
  }

  cancel(): void {
    this.transition = null;
  }

  /** Avanza la transición. Devuelve true si aún no ha terminado. */
  step(now: number): boolean {
    const t = this.transition;
    if (!t) return false;
    const progress = Math.min(1, Math.max(0, (now - t.start) / TRANSITION_MS));
    const eased = easeInOutCubic(progress);
    const direction = t.fromDirection.clone().lerp(t.toDirection, eased).normalize();
    const distance = t.fromDistance + (VIEW_DISTANCE_MM - t.fromDistance) * eased;
    this.place(direction, distance);
    if (progress >= 1) {
      this.transition = null;
      return false;
    }
    return true;
  }

  private place(direction: Vector3, distance: number): void {
    this.camera.position.copy(direction.multiplyScalar(distance));
    this.camera.lookAt(0, 0, 0);
  }
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}
