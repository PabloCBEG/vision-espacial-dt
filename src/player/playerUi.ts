// Interfaz del reproductor: anterior, siguiente, reproducir, barra de progreso, flechas del
// teclado, narración, niveles de ayuda y ejercicios.
import {
  getPoint,
  patchState,
  type AppState,
  type AppStore,
  type HelpLevel,
} from '../state/index.ts';
import { checkPlacement } from './checkPlacement.ts';
import { checkCondition } from './checkCondition.ts';
import { checkValue } from './checkValue.ts';
import type { Player, PlayerPage } from './player.ts';
import { markLessonSeen } from './progress.ts';
import { loadResults, saveAttempt } from './results.ts';

const DIFFICULTY_NAMES = ['', 'fácil', 'media', 'tipo PAU'];

export interface PlayerElements {
  title: HTMLElement;
  progress: HTMLElement;
  progressFill: HTMLElement;
  progressText: HTMLElement;
  narration: HTMLElement;
  previous: HTMLButtonElement;
  play: HTMLButtonElement;
  next: HTMLButtonElement;
  exercisePanel: HTMLElement;
  check: HTMLButtonElement;
  feedback: HTMLElement;
  helpLevel: HTMLElement;
  hintButton: HTMLButtonElement;
  /** Respuesta numérica de los ejercicios de medida. */
  answerWrapper: HTMLElement;
  answer: HTMLInputElement;
  unit: HTMLElement;
  /** Pistas escalonadas, solución paso a paso y variantes. */
  hint: HTMLButtonElement;
  hints: HTMLElement;
  solutionButton: HTMLButtonElement;
  solutionControls: HTMLElement;
  solutionPrev: HTMLButtonElement;
  solutionNext: HTMLButtonElement;
  solutionClose: HTMLButtonElement;
  variantButton: HTMLButtonElement;
}

/** Fallos que se aceptan antes de ofrecer la solución desarrollada. */
export const FAILS_BEFORE_SOLUTION = 2;

/** Segundos que se ve el 3D al pulsar el botón de pista. */
const HINT_SECONDS = 5;

/** Conecta el reproductor con la página. Devuelve una función para desconectarlo. */
/** Corrección de los ejercicios de un motor (kind "engine"). */
export type EngineChecker = (state: AppState) => { correct: boolean; message: string } | null;

export function bindPlayer(
  player: Player,
  store: AppStore,
  el: PlayerElements,
  checkEngine: EngineChecker = () => null,
): () => void {
  const lessonId = player.lesson.id;
  let hintTimer: number | null = null;
  // Pistas vistas y fallos, por ejercicio y solo en esta visita (no se guardan).
  const hintsShown = new Map<number, number>();
  const fails = new Map<number, number>();

  el.title.textContent = player.lesson.title;

  const render = (page: PlayerPage): void => {
    const total = player.pageCount;
    const current = player.index + 1;
    el.progress.setAttribute('aria-valuemax', String(total));
    el.progress.setAttribute('aria-valuenow', String(current));
    el.progressFill.style.width = `${(current / total) * 100}%`;

    if (page.kind === 'exercise' && player.solutionStepIndex !== null) {
      renderSolution(page);
    } else if (page.kind === 'step') {
      const steps = player.lesson.steps.length;
      const text = `Paso ${page.index + 1} de ${steps}`;
      el.progressText.textContent = text;
      el.progress.setAttribute('aria-valuetext', text);
      el.narration.textContent = page.step.narration;
      el.exercisePanel.hidden = true;
      if (page.index === steps - 1) markLessonSeen(lessonId);
    } else {
      const results = loadResults(lessonId);
      const solved = results[page.index]?.solved ? ' · resuelto ✓' : '';
      const difficulty = DIFFICULTY_NAMES[page.exercise.difficulty] ?? '';
      const text = `Ejercicio ${page.index + 1} de ${player.lesson.exercises.length} · dificultad ${difficulty}${solved}`;
      el.progressText.textContent = text;
      el.progress.setAttribute('aria-valuetext', text);
      el.narration.textContent = page.exercise.prompt;
      el.exercisePanel.hidden = false;
      el.feedback.textContent = '';
      el.feedback.className = 'exercise-feedback';
      const isValue = page.exercise.kind === 'value';
      el.answerWrapper.hidden = !isValue;
      el.answer.value = '';
      el.unit.textContent = page.exercise.kind === 'value' ? page.exercise.unit : '';
      renderHelpers(page);
    }
    el.previous.disabled = player.index === 0;
    el.next.disabled = player.index === total - 1;
    el.play.textContent = player.isPlaying ? 'Pausa' : 'Reproducir';
    el.play.setAttribute('aria-pressed', String(player.isPlaying));
  };

  type ExercisePage = Extract<PlayerPage, { kind: 'exercise' }>;

  /** Botones y lista de ayudas del ejercicio actual. */
  const renderHelpers = (page: ExercisePage): void => {
    const { exercise, index } = page;
    el.solutionControls.hidden = true;
    el.answerWrapper.hidden = exercise.kind !== 'value';
    el.check.hidden = false;
    el.feedback.hidden = false;

    const hints = exercise.hints ?? [];
    const shown = hintsShown.get(index) ?? 0;
    el.hint.hidden = hints.length === 0;
    el.hint.disabled = shown >= hints.length;
    el.hint.textContent =
      shown >= hints.length
        ? `Pistas vistas (${shown} de ${hints.length})`
        : `Pista ${shown + 1} de ${hints.length}`;
    el.hints.hidden = shown === 0;
    el.hints.replaceChildren(
      ...hints.slice(0, shown).map((text) => {
        const li = document.createElement('li');
        li.textContent = text;
        return li;
      }),
    );

    const failed = (fails.get(index) ?? 0) >= FAILS_BEFORE_SOLUTION;
    el.solutionButton.hidden = player.solutionLength === 0;
    el.solutionButton.textContent = failed
      ? 'Ver la solución paso a paso'
      : 'Me rindo: ver la solución';
    el.variantButton.hidden = !(exercise.kind === 'value' && exercise.variant);
  };

  /** Pantalla de la solución desarrollada: narración del paso y sus botones. */
  const renderSolution = (page: ExercisePage): void => {
    const i = player.solutionStepIndex ?? 0;
    const n = player.solutionLength;
    const text = `Solución del ejercicio ${page.index + 1} · paso ${i + 1} de ${n}`;
    el.progressText.textContent = text;
    el.progress.setAttribute('aria-valuetext', text);
    el.narration.textContent = page.exercise.solution?.[i]?.narration ?? '';
    el.exercisePanel.hidden = false;
    el.answerWrapper.hidden = true;
    el.check.hidden = true;
    el.feedback.hidden = true;
    el.hint.hidden = true;
    el.hints.hidden = true;
    el.solutionButton.hidden = true;
    el.variantButton.hidden = true;
    el.solutionControls.hidden = false;
    el.solutionPrev.disabled = i === 0;
    el.solutionNext.disabled = i === n - 1;
  };

  player.onChange = render;

  const onPrevious = (): void => {
    player.pause();
    player.previous();
  };
  const onNext = (): void => {
    player.pause();
    player.next();
  };
  const onPlay = (): void => (player.isPlaying ? player.pause() : player.play());
  el.previous.addEventListener('click', onPrevious);
  el.next.addEventListener('click', onNext);
  el.play.addEventListener('click', onPlay);

  // Comprobar el ejercicio: acierto o qué dato se ha confundido.
  const onCheck = (): void => {
    const page = player.page();
    if (page.kind !== 'exercise') return;
    const state = store.get();
    const exercise = page.exercise;
    const result =
      exercise.kind === 'placePoint'
        ? checkPlacement(getPoint(state, exercise.point), {
            x: exercise.target[0],
            a: exercise.target[1],
            c: exercise.target[2],
          })
        : exercise.kind === 'value'
          ? checkValue(
              Number(el.answer.value.replace(',', '.')),
              exercise.answer,
              exercise.unit,
              exercise.tolerance,
            )
          : exercise.kind === 'engine'
            ? (checkEngine(state) ?? {
                correct: false,
                message: 'Este ejercicio no se puede corregir.',
              })
            : checkCondition(exercise.condition, exercise.objects, state);
    saveAttempt(lessonId, page.index, result.correct);
    if (!result.correct) fails.set(page.index, (fails.get(page.index) ?? 0) + 1);
    if (result.correct) render(player.page()); // marca el ejercicio como resuelto
    el.feedback.textContent = result.message;
    el.feedback.className = `exercise-feedback ${result.correct ? 'is-correct' : 'is-wrong'}`;
    // Tras dos fallos, «Me rindo» pasa a ser «Ver la solución paso a paso».
    if (!result.correct) renderHelpers(page);
  };

  const onHintStep = (): void => {
    const page = player.page();
    if (page.kind !== 'exercise') return;
    hintsShown.set(page.index, (hintsShown.get(page.index) ?? 0) + 1);
    renderHelpers(page);
  };
  const onSolution = (): void => player.showSolutionStep(0);
  const onSolutionPrev = (): void => player.showSolutionStep((player.solutionStepIndex ?? 0) - 1);
  const onSolutionNext = (): void => player.showSolutionStep((player.solutionStepIndex ?? 0) + 1);
  const onSolutionClose = (): void => player.hideSolution();
  const onVariant = (): void => {
    const page = player.page();
    if (page.kind !== 'exercise') return;
    fails.delete(page.index);
    hintsShown.delete(page.index);
    player.setVariant(Math.floor(Math.random() * 2 ** 31));
  };
  el.hint.addEventListener('click', onHintStep);
  el.solutionButton.addEventListener('click', onSolution);
  el.solutionPrev.addEventListener('click', onSolutionPrev);
  el.solutionNext.addEventListener('click', onSolutionNext);
  el.solutionClose.addEventListener('click', onSolutionClose);
  el.variantButton.addEventListener('click', onVariant);
  el.check.addEventListener('click', onCheck);
  const onAnswerKey = (event: KeyboardEvent): void => {
    if (event.key === 'Enter') onCheck();
  };
  el.answer.addEventListener('keydown', onAnswerKey);

  // Flechas del teclado: paso anterior y siguiente (salvo dentro de un deslizador o campo).
  const onKey = (event: KeyboardEvent): void => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    const target = event.target as HTMLElement | null;
    if (target?.closest('input, select, textarea, [role="slider"], .sheet-handle')) return;
    event.preventDefault();
    if (event.key === 'ArrowLeft') onPrevious();
    else onNext();
  };
  document.addEventListener('keydown', onKey);

  // Niveles de ayuda.
  const radios = [...el.helpLevel.querySelectorAll<HTMLInputElement>('input[name="help-level"]')];
  const onHelp = (event: Event): void => {
    const value = (event.target as HTMLInputElement).value as HelpLevel;
    patchState(store, { helpLevel: value });
  };
  for (const radio of radios) radio.addEventListener('change', onHelp);

  const onHint = (): void => {
    document.body.dataset.peek3d = 'true';
    el.hintButton.disabled = true;
    if (hintTimer !== null) window.clearTimeout(hintTimer);
    hintTimer = window.setTimeout(() => {
      delete document.body.dataset.peek3d;
      el.hintButton.disabled = false;
      hintTimer = null;
    }, HINT_SECONDS * 1000);
  };
  el.hintButton.addEventListener('click', onHint);

  const syncHelp = (): void => {
    const level = store.get().helpLevel;
    document.body.dataset.help = level;
    for (const radio of radios) radio.checked = radio.value === level;
    el.hintButton.hidden = level !== 'hint';
  };
  const unsubscribe = store.subscribe(syncHelp);
  syncHelp();

  return () => {
    player.dispose();
    unsubscribe();
    el.previous.removeEventListener('click', onPrevious);
    el.next.removeEventListener('click', onNext);
    el.play.removeEventListener('click', onPlay);
    el.check.removeEventListener('click', onCheck);
    el.answer.removeEventListener('keydown', onAnswerKey);
    el.hintButton.removeEventListener('click', onHint);
    el.hint.removeEventListener('click', onHintStep);
    el.solutionButton.removeEventListener('click', onSolution);
    el.solutionPrev.removeEventListener('click', onSolutionPrev);
    el.solutionNext.removeEventListener('click', onSolutionNext);
    el.solutionClose.removeEventListener('click', onSolutionClose);
    el.variantButton.removeEventListener('click', onVariant);
    for (const radio of radios) radio.removeEventListener('change', onHelp);
    document.removeEventListener('keydown', onKey);
    if (hintTimer !== null) window.clearTimeout(hintTimer);
    delete document.body.dataset.peek3d;
    delete document.body.dataset.help;
  };
}
