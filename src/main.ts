import './style.css';
import { loadLessons } from './content/lessons.ts';
import { FOLDED_ANGLE_DEG } from './geometry/index.ts';
import { bindPlayer, Player } from './player/index.ts';
import { SheetView } from './render2d/index.ts';
import { SpatialView } from './render3d/index.ts';
import { createAppStore, INITIAL_STATE } from './state/index.ts';
import {
  bindFoldControls,
  bindPointControls,
  bindPointDescription,
  bindProjectorToggle,
  bindSheetZoom,
  bindThemeToggle,
  bindViewButtons,
} from './ui/index.ts';
import { renderHome } from './ui/home.ts';

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

// ---------- Lecciones y navegación ----------

const { lessons, errors } = loadLessons();
const home = required<HTMLElement>('#home');
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

function show(screen: 'home' | 'free' | 'lesson'): void {
  home.hidden = screen !== 'home';
  workspace.hidden = screen === 'home';
  lessonBar.hidden = screen !== 'lesson';
  freeTitle.hidden = screen !== 'free';
  document.body.dataset.screen = screen;
}

function route(): void {
  stopLesson?.();
  stopLesson = null;
  const hash = window.location.hash;
  const lessonMatch = /^#\/leccion\/([a-z0-9-]+)$/.exec(hash);
  const lesson = lessonMatch ? lessons.find((l) => l.id === lessonMatch[1]) : undefined;

  if (lesson) {
    show('lesson');
    const player = new Player(lesson, store, spatialView);
    stopLesson = bindPlayer(player, store, {
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
    });
    player.start();
    document.title = `${lesson.title} · Visión espacial`;
  } else if (hash === '#/libre') {
    show('free');
    store.set({ ...INITIAL_STATE, projector: store.get().projector });
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
