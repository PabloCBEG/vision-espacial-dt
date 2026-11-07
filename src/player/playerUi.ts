// Interfaz del reproductor: anterior, siguiente, reproducir, barra de progreso, flechas del
// teclado, narración, niveles de ayuda y ejercicios.
import { getPoint, patchState, type AppStore, type HelpLevel } from '../state/index.ts';
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
}

/** Segundos que se ve el 3D al pulsar el botón de pista. */
const HINT_SECONDS = 5;

/** Conecta el reproductor con la página. Devuelve una función para desconectarlo. */
export function bindPlayer(player: Player, store: AppStore, el: PlayerElements): () => void {
  const lessonId = player.lesson.id;
  let hintTimer: number | null = null;

  el.title.textContent = player.lesson.title;

  const render = (page: PlayerPage): void => {
    const total = player.pageCount;
    const current = player.index + 1;
    el.progress.setAttribute('aria-valuemax', String(total));
    el.progress.setAttribute('aria-valuenow', String(current));
    el.progressFill.style.width = `${(current / total) * 100}%`;

    if (page.kind === 'step') {
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
    }
    el.previous.disabled = player.index === 0;
    el.next.disabled = player.index === total - 1;
    el.play.textContent = player.isPlaying ? 'Pausa' : 'Reproducir';
    el.play.setAttribute('aria-pressed', String(player.isPlaying));
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
          : checkCondition(exercise.condition, exercise.objects, state);
    saveAttempt(lessonId, page.index, result.correct);
    if (result.correct) render(player.page()); // marca el ejercicio como resuelto
    el.feedback.textContent = result.message;
    el.feedback.className = `exercise-feedback ${result.correct ? 'is-correct' : 'is-wrong'}`;
  };
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
    for (const radio of radios) radio.removeEventListener('change', onHelp);
    document.removeEventListener('keydown', onKey);
    if (hintTimer !== null) window.clearTimeout(hintTimer);
    delete document.body.dataset.peek3d;
    delete document.body.dataset.help;
  };
}
