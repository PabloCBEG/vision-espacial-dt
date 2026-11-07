import './style.css';
import { loadLessons } from './content/lessons.ts';
import { checkEngines, mountEngines } from './engines/runtimes.ts';
import { FOLDED_ANGLE_DEG } from './geometry/index.ts';
import { bindPlayer, Player, type PlayerElements } from './player/index.ts';
import { SheetView } from './render2d/index.ts';
import { SpatialView } from './render3d/index.ts';
import { createAppStore } from './state/index.ts';
import {
  bindActivePoint,
  bindFreeScenes,
  bindSceneNotices,
  bindFoldControls,
  bindPointControls,
  bindPointDescription,
  bindProjectorToggle,
  bindSheetZoom,
  bindThemeToggle,
  bindViewButtons,
} from './ui/index.ts';
import { renderHome } from './ui/home.ts';
import { loadPau } from './content/pauSchema.ts';
import { renderPauBank, startExam } from './ui/pau.ts';
import { startTrainer } from './ui/trainer.ts';

function required<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`Falta el elemento ${selector} en index.html.`);
  return element;
}

const store = createAppStore();

bindThemeToggle(required<HTMLButtonElement>('#theme-toggle'));
bindProjectorToggle(required<HTMLButtonElement>('#projector-toggle'), store);
bindPointControls(required<HTMLFormElement>('#point-controls'), store);
bindPointDescription(required<HTMLElement>('#point-description'), store);
bindActivePoint(
  {
    wrapper: required('#active-point-wrapper'),
    select: required('#active-point'),
    form: required('#point-controls'),
    hint: required('#point-hint'),
  },
  store,
);
bindSceneNotices(required('#scene-notices'), store);
const loadFreeScene = bindFreeScenes(required('#free-scenes'), store);
bindFoldControls(
  {
    slider: required<HTMLInputElement>('#slider-fold'),
    output: required<HTMLOutputElement>('#output-fold'),
    playButton: required<HTMLButtonElement>('#fold-play'),
    explainButton: required<HTMLButtonElement>('#explain-toggle'),
    caption: required<HTMLElement>('#explain-caption'),
  },
  store,
);

const sheet = new SheetView(required<HTMLElement>('#view-2d'), store);
bindSheetZoom(required<HTMLElement>('#sheet-zoom'), sheet);

const view3dElement = required<HTMLElement>('#view-3d');
let spatialView: SpatialView | null = null;
try {
  spatialView = new SpatialView(view3dElement, store);
  bindViewButtons(required<HTMLElement>('#view-buttons'), spatialView);
} catch (error) {
  console.error(error);
  view3dElement.innerHTML =
    '<p class="placeholder">Este navegador no puede mostrar el modelo 3D (necesita WebGL).</p>';
}

// Motores enchufables (métodos, sólidos…): añaden sus capas a las dos vistas.
mountEngines({
  store,
  spatial: spatialView,
  sheet,
  controls: required<HTMLElement>('#engine-controls'),
});

// ---------- Lecciones y navegación ----------

const { lessons, errors } = loadLessons();
const home = required<HTMLElement>('#home');
const pauBank = required<HTMLElement>('#pau-bank');
const trainerPanel = required<HTMLElement>('#trainer-panel');
const { exercises: pauExercises } = loadPau();
const workspace = required<HTMLElement>('#workspace');
const lessonBar = required<HTMLElement>('#lesson-bar');
const freeTitle = required<HTMLElement>('#free-title');
let stopLesson: (() => void) | null = null;

// En modo libre, al completar el abatimiento la cámara pasa a vista frontal:
// el 3D coincide con la lámina. En una lección, la cámara la decide cada paso.
store.subscribe((state, previous) => {
  if (
    !stopLesson &&
    state.foldAngle === FOLDED_ANGLE_DEG &&
    previous.foldAngle < FOLDED_ANGLE_DEG
  ) {
    spatialView?.setView('front');
  }
});

function show(screen: 'home' | 'free' | 'lesson' | 'pau' | 'trainer'): void {
  trainerPanel.hidden = screen !== 'trainer';
  home.hidden = screen !== 'home';
  pauBank.hidden = screen !== 'pau';
  workspace.hidden = screen === 'home' || screen === 'pau';
  lessonBar.hidden = screen !== 'lesson';
  freeTitle.hidden = screen !== 'free';
  document.body.dataset.screen = screen;
}

function playerElements(): PlayerElements {
  return {
    title: required('#lesson-title'),
    progress: required('#lesson-progress'),
    progressFill: required('#lesson-progress-fill'),
    progressText: required('#lesson-progress-text'),
    narration: required('#lesson-narration'),
    previous: required('#lesson-prev'),
    play: required('#lesson-play'),
    next: required('#lesson-next'),
    exercisePanel: required('#exercise-panel'),
    check: required('#exercise-check'),
    feedback: required('#exercise-feedback'),
    helpLevel: required('#help-level'),
    hintButton: required('#hint-button'),
    answerWrapper: required('#exercise-answer-wrapper'),
    answer: required('#exercise-answer'),
    unit: required('#exercise-unit'),
  };
}

function route(): void {
  stopLesson?.();
  stopLesson = null;
  const hash = window.location.hash;
  const lessonMatch = /^#\/leccion\/([a-z0-9-]+)$/.exec(hash);
  const lesson = lessonMatch ? lessons.find((l) => l.id === lessonMatch[1]) : undefined;
  const pauMatch = /^#\/pau\/([a-z0-9-]+)$/.exec(hash);
  const pau = pauMatch ? pauExercises.find((e) => e.id === pauMatch[1]) : undefined;

  if (lesson) {
    show('lesson');
    const player = new Player(lesson, store, spatialView);
    stopLesson = bindPlayer(player, store, playerElements(), checkEngines);
    player.start();
    document.title = `${lesson.title} · Visión espacial`;
  } else if (pauMatch && pau) {
    show('lesson');
    stopLesson = startExam(
      pau,
      store,
      spatialView,
      {
        panel: required('#exam-panel'),
        statement: required('#exam-statement'),
        data: required('#exam-data'),
        timer: required('#exam-timer'),
        pause: required('#exam-pause'),
        finish: required('#exam-finish'),
        rubric: required('#rubric-panel'),
        rubricItems: required('#rubric-items'),
        rubricTotal: required('#rubric-total'),
      },
      playerElements(),
      checkEngines,
    );
    document.title = `PAU: ${pau.titulo} · Visión espacial`;
  } else if (hash === '#/entrenador') {
    show('trainer');
    stopLesson = startTrainer(trainerPanel, spatialView, store);
    document.title = 'Entrenador espacial · Visión espacial';
  } else if (hash === '#/pau') {
    show('pau');
    renderPauBank(required('#pau-content'), pauExercises);
    document.title = 'Banco PAU · Visión espacial';
  } else if (hash === '#/libre') {
    show('free');
    loadFreeScene('punto');
    spatialView?.setView('perspective');
    document.title = 'Explorar · Visión espacial';
  } else {
    show('home');
    renderHome(required('#lesson-list'), required('#lesson-errors'), lessons, errors);
    document.title = 'Visión espacial · Dibujo Técnico';
  }
}

window.addEventListener('hashchange', route);
route();

// Funcionamiento sin conexión (solo en la versión publicada, no al desarrollar).
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((error: unknown) => {
      console.warn('No se ha podido activar el modo sin conexión.', error);
    });
  });
}
