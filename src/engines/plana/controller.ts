// Estado vivo del motor de geometría plana: la construcción evaluada, lo que el alumno
// arrastra (se guarda en el estado común), la animación de trazado y el rastro del lugar.
import { getEngineData, setEngineData, type AppState, type AppStore } from '../../state/index.ts';
import { dist, pt, type Pt } from './geometry.ts';
import { evaluate, firstProblem, nearestParam, type Evaluated, type ObjectDef } from './graph.ts';
import { PlaneStepSchema, type PlaneStep } from './definition.ts';

/** Segundos que tarda en trazarse cada objeto a velocidad normal. */
const SECONDS_PER_OBJECT = 1.6;
const SPEED_KEY = 'plana:velocidad';

export interface DrawingState {
  /** Objeto que se está trazando ahora, y cuánto (0 a 1). */
  readonly current: string | null;
  readonly fraction: number;
}

export class PlaneController {
  readonly store: AppStore;
  data: PlaneStep | null = null;
  evaluated: Map<string, Evaluated> = new Map();
  problem: string | null = null;
  /** Rastro del lugar geométrico (puntos por los que ha pasado). */
  trail: Pt[] = [];
  readonly listeners = new Set<() => void>();
  /** Velocidad de la animación de trazado (0,5 a 2). */
  speed = loadSpeed();

  private raw: unknown = undefined;
  private timeline = 0;
  private animation: number | null = null;
  private sweep: number | null = null;
  private lastFrame = 0;

  constructor(store: AppStore) {
    this.store = store;
  }

  get defs(): readonly ObjectDef[] {
    return (this.data?.objetos ?? []) as readonly ObjectDef[];
  }

  sync(state: AppState): void {
    const raw = getEngineData(state, 'plana');
    if (raw === this.raw) return;
    const before = this.raw as Partial<Record<string, unknown>> | undefined;
    this.raw = raw;
    const parsed = raw === undefined ? null : PlaneStepSchema.safeParse(raw);
    this.data = parsed?.success ? parsed.data : null;
    this.recompute();
    // Paso nuevo (no un arrastre, que solo cambia posiciones): se reinician trazado y rastro.
    const now = raw as Partial<Record<string, unknown>> | undefined;
    const sameStep =
      before !== undefined &&
      now !== undefined &&
      before.objetos === now.objetos &&
      before.trazar === now.trazar &&
      before.lugar === now.lugar &&
      before.visibles === now.visibles;
    if (!sameStep) {
      this.trail = [];
      this.startDrawing();
    }
    this.recordTrail();
    this.notify();
  }

  private recompute(): void {
    const positions: Record<string, [number, number]> = {};
    for (const [id, p] of Object.entries(this.data?.posiciones ?? {})) positions[id] = [...p];
    const params: Record<string, number> = {};
    for (const [id, p] of Object.entries(this.paramsOf())) params[id] = p;
    this.evaluated = evaluate(this.defs, positions, params);
    this.problem = firstProblem(this.evaluated);
  }

  private paramsOf(): Record<string, number> {
    return { ...this.data?.parametros };
  }

  // ---------- Arrastrar ----------

  /** Objetos que el alumno puede mover: puntos libres no fijos y puntos sobre un objeto. */
  isDraggable(id: string): boolean {
    const def = this.defs.find((d) => d.id === id);
    if (!def || this.store.get().locked) return false;
    return (def.tipo === 'punto' && !def.fijo) || def.tipo === 'puntoSobre';
  }

  /** Mueve un punto libre (o lo desliza por su objeto) hasta el punto q de la lámina. */
  moveTo(id: string, q: Pt): void {
    const def = this.defs.find((d) => d.id === id);
    const data = this.data;
    if (!def || !data || !this.isDraggable(id)) return;
    const round = (v: number): number => Math.round(v * 2) / 2; // medio milímetro
    if (def.tipo === 'punto') {
      const posiciones = { ...data.posiciones, [id]: [round(q.x), round(q.y)] as [number, number] };
      this.patch({ posiciones });
    } else if (def.tipo === 'puntoSobre') {
      const host = this.evaluated.get(def.sobre)?.value;
      if (!host) return;
      const t = nearestParam(host, q);
      const parametros = { ...this.paramsOf(), [id]: t };
      this.patch({ parametros });
    }
  }

  /**
   * Cambia campos de los datos del motor en el estado común. Parte de los datos tal cual
   * llegaron (no de los validados), para conservar la identidad de la construcción.
   */
  private patch(fields: Record<string, unknown>): void {
    const raw = (this.raw ?? {}) as Record<string, unknown>;
    setEngineData(this.store, 'plana', { ...raw, ...fields });
  }

  /** Punto calculado de un objeto (null si no es un punto o no tiene solución). */
  pointOf(id: string): Pt | null {
    const v = this.evaluated.get(id)?.value;
    return v?.kind === 'point' ? v.p : null;
  }

  // ---------- Lugar geométrico ----------

  private recordTrail(): void {
    const id = this.data?.lugar?.punto;
    if (!id) return;
    const p = this.pointOf(id);
    if (!p) return;
    const last = this.trail[this.trail.length - 1];
    if (!last || dist(last, p) > 0.4) this.trail.push(pt(p.x, p.y));
  }

  /** Barrido automático: el punto que mueve recorre su objeto entero y el rastro aparece. */
  sweepLocus(): void {
    const mover = this.data?.lugar?.mueve;
    const def = this.defs.find((d) => d.id === mover);
    if (!mover || def?.tipo !== 'puntoSobre' || !this.data) return;
    this.stopSweep();
    this.trail = [];
    const duration = 4000 / this.speed;
    const start = performance.now();
    const frame = (now: number): void => {
      const t = Math.min(1, (now - start) / duration);
      if (!this.data) return;
      this.patch({ parametros: { ...this.paramsOf(), [mover]: t } });
      this.sweep = t < 1 ? requestAnimationFrame(frame) : null;
    };
    this.sweep = requestAnimationFrame(frame);
  }

  private stopSweep(): void {
    if (this.sweep !== null) cancelAnimationFrame(this.sweep);
    this.sweep = null;
  }

  // ---------- Trazado con regla y compás ----------

  /** Qué se está trazando ahora. Los objetos de «trazar» posteriores aún no se ven. */
  drawing(): DrawingState {
    const list = this.data?.trazar ?? [];
    const index = Math.floor(this.timeline);
    const current = list[index] ?? null;
    return { current, fraction: current ? this.timeline - index : 1 };
  }

  /** ¿Se ve ya este objeto (no está pendiente de trazar)? */
  isDrawn(id: string): boolean {
    const list = this.data?.trazar ?? [];
    const i = list.indexOf(id);
    return i < 0 || i < this.timeline;
  }

  startDrawing(): void {
    this.stopDrawing();
    const list = this.data?.trazar ?? [];
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (list.length === 0 || reduced) {
      this.timeline = list.length;
      return;
    }
    this.timeline = 0;
    this.lastFrame = performance.now();
    const frame = (now: number): void => {
      const dt = (now - this.lastFrame) / 1000;
      this.lastFrame = now;
      this.timeline = Math.min(list.length, this.timeline + (dt * this.speed) / SECONDS_PER_OBJECT);
      this.animation = this.timeline < list.length ? requestAnimationFrame(frame) : null;
      this.notify();
    };
    this.animation = requestAnimationFrame(frame);
  }

  get isDrawing(): boolean {
    return this.animation !== null;
  }

  private stopDrawing(): void {
    if (this.animation !== null) cancelAnimationFrame(this.animation);
    this.animation = null;
  }

  setSpeed(speed: number): void {
    this.speed = Math.max(0.25, Math.min(3, speed));
    try {
      localStorage.setItem(SPEED_KEY, String(this.speed));
    } catch {
      // Sin acceso a localStorage: vale solo para esta visita.
    }
    this.notify();
  }

  // ---------- Ejercicios ----------

  /** Corrige el ejercicio: ¿está el punto movido sobre (uno de) los objetivos? */
  check(): { correct: boolean; message: string } | null {
    const answer = this.data?.respuesta;
    if (!answer) return null;
    const moved = this.pointOf(answer.mover);
    const targets = (Array.isArray(answer.objetivo) ? answer.objetivo : [answer.objetivo])
      .map((id) => this.pointOf(id))
      .filter((p): p is Pt => p !== null);
    if (!moved || targets.length === 0) {
      return { correct: false, message: 'Aún no se puede comprobar: falta algún dato.' };
    }
    const best = Math.min(...targets.map((t) => dist(t, moved)));
    if (best <= answer.tolerancia) {
      return { correct: true, message: answer.acierto ?? '¡Correcto! El punto está en su sitio.' };
    }
    const hint = answer.pista ?? 'Todavía no. Piensa qué condición tiene que cumplir el punto.';
    return { correct: false, message: `${hint} Estás a ${Math.round(best)} mm.` };
  }

  notify(): void {
    for (const listener of this.listeners) listener();
  }

  dispose(): void {
    this.stopDrawing();
    this.stopSweep();
    this.listeners.clear();
  }
}

function loadSpeed(): number {
  try {
    const v = Number(localStorage.getItem(SPEED_KEY));
    return Number.isFinite(v) && v >= 0.25 && v <= 3 ? v : 1;
  } catch {
    return 1;
  }
}
