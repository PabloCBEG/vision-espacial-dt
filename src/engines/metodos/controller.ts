// Estado vivo del motor de métodos: lee los datos del paso, resuelve la construcción y anima
// el movimiento (progreso de 0 a 1). Lo comparten la vista 3D, la lámina y los controles.
import { createLine, createPlane, type Line, type Plane } from '../../geometry/index.ts';
import { getEngineData, setEngineData, type AppState, type AppStore } from '../../state/index.ts';
import { buildConstruction, type Construction, type SceneLookup } from './construction.ts';
import { MethodsStepSchema, type MethodName, type MethodsStep } from './definition.ts';

/** Un movimiento completo (de 0 a 1) dura esto. */
const FULL_MOVE_MS = 2600;

export class MethodsController {
  readonly store: AppStore;
  data: MethodsStep | null = null;
  construction: Construction | null = null;
  /** Progreso del movimiento que se ve ahora (0 a 1). */
  progress = 0;
  /** Se llama en cada cambio (estado o fotograma de la animación). */
  readonly listeners = new Set<() => void>();

  private raw: unknown = undefined;
  private signature = '';
  private animation: number | null = null;

  constructor(store: AppStore) {
    this.store = store;
  }

  /** Lee el estado: datos del paso, construcción y, si cambian, el movimiento. */
  sync(state: AppState): void {
    const raw = getEngineData(state, 'metodos');
    const previous = this.data;
    if (raw !== this.raw) {
      this.raw = raw;
      const parsed = raw === undefined ? null : MethodsStepSchema.safeParse(raw);
      this.data = parsed?.success ? parsed.data : null;
    }
    this.construction = this.data ? buildConstruction(this.data, lookup(state)) : null;

    // Cambio de método o de figura: el movimiento empieza desde el principio.
    const signature = this.data
      ? JSON.stringify([
          this.data.metodo,
          this.data.figura,
          this.data.objetivo,
          this.data.sobre,
          this.data.eje,
          this.data.cambio,
          this.data.distancia,
          this.data.anguloRectaPlano,
        ])
      : '';
    if (signature !== this.signature) {
      this.signature = signature;
      this.stop();
      this.progress = 0;
    }
    if (this.data && this.data !== previous) this.animateTo(this.data.progreso);
    if (!this.data) this.stop();
    this.notify();
  }

  /** El alumno cambia de método (selector): se repite el movimiento con el nuevo. */
  setMethod(method: MethodName): void {
    if (!this.data || this.data.metodo === method) return;
    setEngineData(this.store, 'metodos', { ...this.data, metodo: method, progreso: 1 });
  }

  /** Repite el movimiento desde el principio. */
  replay(): void {
    if (!this.data) return;
    this.stop();
    this.progress = 0;
    this.notify();
    this.animateTo(1);
  }

  /** Mueve a mano (deslizador). */
  scrub(progress: number): void {
    this.stop();
    this.progress = Math.max(0, Math.min(1, progress));
    this.notify();
  }

  private animateTo(target: number): void {
    this.stop();
    const from = this.progress;
    const instant = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (instant || from === target) {
      this.progress = target;
      return;
    }
    const duration = Math.max(400, Math.abs(target - from) * FULL_MOVE_MS);
    const start = performance.now();
    const frame = (now: number): void => {
      const t = Math.min(1, (now - start) / duration);
      const e = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
      this.progress = from + (target - from) * e;
      this.animation = t < 1 ? requestAnimationFrame(frame) : null;
      this.notify();
    };
    this.animation = requestAnimationFrame(frame);
  }

  private stop(): void {
    if (this.animation !== null) cancelAnimationFrame(this.animation);
    this.animation = null;
  }

  get isAnimating(): boolean {
    return this.animation !== null;
  }

  private notify(): void {
    for (const listener of this.listeners) listener();
  }

  dispose(): void {
    this.stop();
    this.listeners.clear();
  }
}

/** Puntos, rectas y planos con nombre de la escena. */
export function lookup(state: AppState): SceneLookup {
  return {
    point: (name) => state.points[name] ?? null,
    line: (id): Line | null => {
      const o = state.objects.find((obj) => obj.id === id);
      if (o?.kind !== 'line') return null;
      const [p, q] = o.through.map((n) => state.points[n]);
      if (!p || !q) return null;
      try {
        return createLine(p, q);
      } catch {
        return null; // puntos repetidos
      }
    },
    plane: (id): Plane | null => {
      const o = state.objects.find((obj) => obj.id === id);
      if (o?.kind !== 'plane') return null;
      const [p, q, r] = o.through.map((n) => state.points[n]);
      if (!p || !q || !r) return null;
      try {
        return createPlane(p, q, r);
      } catch {
        return null; // puntos alineados
      }
    },
  };
}
