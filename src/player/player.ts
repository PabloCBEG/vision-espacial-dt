// Reproductor de una lección: pasos con narración y ejercicios al final.
// Cada cambio se anima (puntos, abatimiento, cámara y fundido de capas): nunca hay saltos.
import type { Exercise, Lesson, Step, ViewName } from '../content/schema.ts';
import { createPoint, type Point } from '../geometry/index.ts';
import type { AppState, AppStore, SceneObject } from '../state/index.ts';

/** Lo que el reproductor necesita de la vista 3D. */
export interface PlayerCamera {
  setView(view: ViewName): void;
}

export type PlayerPage =
  | { kind: 'step'; index: number; step: Step }
  | { kind: 'exercise'; index: number; exercise: Exercise };

/** Duración mínima de una transición entre pasos. */
const TRANSITION_MS = 900;
/** Un abatimiento completo dura unos 3 s, como con el botón de reproducir. */
const FULL_FOLD_MS = 3000;
/** Donde empieza P en los ejercicios de colocar el punto. */
const EXERCISE_START = createPoint(-30, 15, 20);

const toPoint = ([x, a, c]: readonly [number, number, number]): Point => createPoint(x, a, c);

export class Player {
  readonly lesson: Lesson;
  /** Se llama cada vez que cambia la página o el estado de reproducción. */
  onChange: (page: PlayerPage) => void = () => {};

  private readonly store: AppStore;
  private camera: PlayerCamera | null;
  private position = 0;
  private animation: number | null = null;
  private autoplay: number | null = null;
  private playing = false;

  constructor(lesson: Lesson, store: AppStore, camera: PlayerCamera | null) {
    this.lesson = lesson;
    this.store = store;
    this.camera = camera;
  }

  get pageCount(): number {
    return this.lesson.steps.length + this.lesson.exercises.length;
  }

  get index(): number {
    return this.position;
  }

  get isPlaying(): boolean {
    return this.playing;
  }

  page(index = this.position): PlayerPage {
    const steps = this.lesson.steps;
    if (index < steps.length) {
      const step = steps[index];
      if (!step) throw new Error(`No existe el paso ${index}`);
      return { kind: 'step', index, step };
    }
    const exercise = this.lesson.exercises[index - steps.length];
    if (!exercise) throw new Error(`No existe el ejercicio ${index - steps.length}`);
    return { kind: 'exercise', index: index - steps.length, exercise };
  }

  /** Empieza la lección: escena inicial sin animar y primer paso. */
  start(): void {
    const scene = this.lesson.initialScene;
    const points: Record<string, Point> = {};
    for (const [id, coords] of Object.entries(scene.points)) points[id] = toPoint(coords);
    const state = this.store.get();
    this.store.set({
      ...state,
      points,
      objects: scene.objects as readonly SceneObject[],
      activePoint: scene.activePoint,
      foldAngle: 0,
      layers3d: [],
      layersSheet: [],
      highlight: [],
      exercise: null,
    });
    this.goTo(0);
  }

  next(): void {
    if (this.position < this.pageCount - 1) this.goTo(this.position + 1);
    else this.pause();
  }

  previous(): void {
    if (this.position > 0) this.goTo(this.position - 1);
  }

  /** Avanza solo por los pasos (no por los ejercicios), dejando tiempo para leer. */
  play(): void {
    if (this.position >= this.lesson.steps.length - 1) this.goTo(0);
    this.playing = true;
    this.scheduleNext();
    this.onChange(this.page());
  }

  pause(): void {
    this.playing = false;
    if (this.autoplay !== null) window.clearTimeout(this.autoplay);
    this.autoplay = null;
    this.onChange(this.page());
  }

  dispose(): void {
    this.pause();
    if (this.animation !== null) cancelAnimationFrame(this.animation);
    this.animation = null;
    this.camera = null;
  }

  goTo(index: number): void {
    this.position = Math.max(0, Math.min(this.pageCount - 1, index));
    const page = this.page();
    if (page.kind === 'step') this.applyStep(page.index);
    else this.applyExercise(page.exercise);
    if (this.playing) {
      if (page.kind === 'step' && page.index < this.lesson.steps.length - 1) this.scheduleNext();
      else this.pause();
    }
    this.onChange(page);
  }

  // ---------- Aplicar páginas ----------

  /** Puntos de un paso: los iniciales con los cambios de este paso y de los anteriores. */
  private pointsAtStep(index: number): Record<string, Point> {
    const points: Record<string, Point> = {};
    for (const [id, coords] of Object.entries(this.lesson.initialScene.points)) {
      points[id] = toPoint(coords);
    }
    for (const step of this.lesson.steps.slice(0, index + 1)) {
      for (const [id, coords] of Object.entries(step.points ?? {})) points[id] = toPoint(coords);
    }
    return points;
  }

  private applyStep(index: number): void {
    const step = this.lesson.steps[index];
    if (!step) return;
    const state = this.store.get();
    this.store.set({
      ...state,
      objects: this.lesson.initialScene.objects as readonly SceneObject[],
      activePoint: this.lesson.initialScene.activePoint,
      layers3d: step.show3d,
      layersSheet: step.sheet,
      highlight: step.highlight,
      exercise: null,
    });
    this.camera?.setView(step.camera);
    this.animateTo(this.pointsAtStep(index), step.foldAngle);
  }

  private applyExercise(exercise: Exercise): void {
    const state = this.store.get();
    const base: AppState = {
      ...state,
      objects: this.lesson.initialScene.objects as readonly SceneObject[],
      activePoint: this.lesson.initialScene.activePoint,
      layers3d: null,
      layersSheet: null,
      highlight: [],
      exercise: null,
    };
    // Puntos de partida: los de la escena inicial con los cambios del propio ejercicio.
    const points = this.pointsAtStep(-1);
    for (const [id, coords] of Object.entries(exercise.points ?? {})) points[id] = toPoint(coords);

    if (exercise.kind === 'placePoint') {
      this.store.set({
        ...base,
        activePoint: exercise.point,
        exercise: { pointId: exercise.point, target: toPoint(exercise.target) },
      });
      if (!exercise.points?.[exercise.point]) points[exercise.point] = EXERCISE_START;
    } else {
      // Capas del ejercicio o, si no las indica, las del último paso sin el perfil
      // (el perfil aparece solo si el caso lo necesita).
      const last = this.lesson.steps[this.lesson.steps.length - 1];
      const withoutProfile = (layers: readonly string[] | undefined) =>
        layers ? layers.filter((l) => l !== 'perfil') : null;
      this.store.set({
        ...base,
        activePoint: exercise.activePoint ?? base.activePoint,
        layers3d: exercise.show3d ?? withoutProfile(last?.show3d),
        layersSheet: exercise.sheet ?? withoutProfile(last?.sheet),
      });
    }
    this.camera?.setView('perspective');
    this.animateTo(points, 0);
  }

  /** Lleva puntos y abatimiento hasta su destino con una transición suave. */
  private animateTo(targetPoints: Record<string, Point>, targetFold: number): void {
    if (this.animation !== null) cancelAnimationFrame(this.animation);
    const from = this.store.get();
    const fromPoints = from.points;
    const fromFold = from.foldAngle;
    const instant = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = Math.max(TRANSITION_MS, (Math.abs(targetFold - fromFold) / 90) * FULL_FOLD_MS);

    const frame = (t: number): void => {
      const e = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
      const points: Record<string, Point> = {};
      for (const [id, target] of Object.entries(targetPoints)) {
        const start = fromPoints[id] ?? target;
        points[id] =
          t >= 1
            ? target
            : createPoint(
                start.x + (target.x - start.x) * e,
                start.a + (target.a - start.a) * e,
                start.c + (target.c - start.c) * e,
              );
      }
      const foldAngle = t >= 1 ? targetFold : fromFold + (targetFold - fromFold) * e;
      this.store.set({ ...this.store.get(), points, foldAngle });
    };

    if (instant) {
      frame(1);
      return;
    }
    const start = performance.now();
    const step = (now: number): void => {
      const t = Math.min(1, (now - start) / duration);
      frame(t);
      this.animation = t < 1 ? requestAnimationFrame(step) : null;
    };
    this.animation = requestAnimationFrame(step);
  }

  private scheduleNext(): void {
    if (this.autoplay !== null) window.clearTimeout(this.autoplay);
    const page = this.page();
    const text = page.kind === 'step' ? page.step.narration : '';
    // Tiempo para leer: unos 5 s más 50 ms por letra, y lo que dure el abatimiento.
    const delay = 5000 + text.length * 50 + FULL_FOLD_MS;
    this.autoplay = window.setTimeout(() => this.next(), delay);
  }
}
