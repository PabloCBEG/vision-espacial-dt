// Pantalla del entrenador espacial: entrenamiento con dificultad adaptativa y test diagnóstico
// (versión inicial y final). Los resultados son anónimos y se guardan solo en el navegador; el
// alumno puede exportarlos a un fichero con un código que le da el profesor, nunca con su nombre.
import {
  diagnostic,
  makeItem,
  nextLevel,
  DIAGNOSTIC_LENGTH,
  type Item,
  type ItemKind,
  type Level,
} from '../engines/trainer/items.ts';
import { rng } from '../engines/trainer/polycube.ts';
import { TrainerScene } from '../engines/trainer/scene3d.ts';
import {
  netThumb,
  polycubeThumb,
  sectionThumb,
  viewsThumb,
} from '../engines/trainer/thumbnails.ts';
import type { SpatialView } from '../render3d/index.ts';
import type { AppStore } from '../state/index.ts';

const KEY = 'entrenador:resultados';
const KINDS: readonly ItemKind[] = ['rotacion', 'seccion', 'desarrollo', 'vistas'];
const KIND_TITLES: Record<ItemKind, string> = {
  rotacion: 'Rotaciones',
  seccion: 'Secciones',
  desarrollo: 'Desarrollos',
  vistas: 'Vistas',
};
const PROMPTS: Record<ItemKind, string> = {
  rotacion:
    'La figura A gira como se ve. Aplica el mismo giro a la figura B: ¿cuál es el resultado?',
  seccion: 'El plano corta al sólido. ¿Qué forma tiene la sección en verdadera magnitud?',
  desarrollo: '¿Cuál de estos desarrollos forma un cubo al plegarlo?',
  vistas: '¿Cuáles son el alzado, la planta y el perfil izquierdo de esta figura?',
};

interface Results {
  entrenamiento: Record<ItemKind, { aciertos: number; intentos: number }>;
  diagnostico: Partial<
    Record<
      'inicial' | 'final',
      { aciertos: number; total: number; porTipo: Record<ItemKind, number> }
    >
  >;
}

function emptyResults(): Results {
  return {
    entrenamiento: {
      rotacion: { aciertos: 0, intentos: 0 },
      seccion: { aciertos: 0, intentos: 0 },
      desarrollo: { aciertos: 0, intentos: 0 },
      vistas: { aciertos: 0, intentos: 0 },
    },
    diagnostico: {},
  };
}

function load(): Results {
  try {
    const data = JSON.parse(localStorage.getItem(KEY) ?? 'null') as Results | null;
    return data && data.entrenamiento ? data : emptyResults();
  } catch {
    return emptyResults();
  }
}

function save(r: Results): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(r));
  } catch {
    // Sin acceso a localStorage: vale solo para esta visita.
  }
}

type Mode =
  | { kind: 'train'; type: ItemKind; level: Level; streak: number }
  | {
      kind: 'test';
      version: 'inicial' | 'final';
      index: number;
      correct: number;
      perType: Record<ItemKind, number>;
    };

export function startTrainer(
  root: HTMLElement,
  spatial: SpatialView | null,
  store: AppStore,
): () => void {
  const scene = new TrainerScene();
  // Escena propia: sin planos de proyección ni puntos del diédrico.
  store.set({
    ...store.get(),
    objects: [],
    layers3d: ['entrenador'],
    layersSheet: [],
    highlight: [],
    exercise: null,
    engines: {},
    foldAngle: 0,
  });
  const unmount = spatial?.use(scene);
  document.body.dataset.layout = 'trainer';
  let results = load();
  let mode: Mode = { kind: 'train', type: 'rotacion', level: 1, streak: 0 };
  let item: Item | null = null;
  let answered = false;
  let seed = Date.now() % 100000;
  let animation: number | null = null;
  let testItems: Item[] = [];

  root.innerHTML = `
    <div class="trainer-head">
      <a class="back-link" href="#/">← Temario</a>
      <h1 class="lesson-title">Entrenador espacial</h1>
      <div class="view-buttons trainer-modes" role="group" aria-label="Modo">
        <button type="button" data-mode="train" aria-pressed="true">Entrenar</button>
        <button type="button" data-mode="inicial" aria-pressed="false">Test inicial</button>
        <button type="button" data-mode="final" aria-pressed="false">Test final</button>
      </div>
    </div>
    <div class="view-buttons trainer-types" role="group" aria-label="Tipo de ítem"></div>
    <p class="trainer-status" aria-live="polite"></p>
    <p class="lesson-narration trainer-prompt"></p>
    <div class="trainer-options" role="group" aria-label="Opciones"></div>
    <p class="exercise-feedback trainer-feedback" aria-live="polite"></p>
    <div class="trainer-actions">
      <button type="button" class="action-button trainer-solution">Ver la solución</button>
      <button type="button" class="action-button is-primary trainer-next">Siguiente ítem</button>
    </div>
    <details class="trainer-results">
      <summary>Mis resultados</summary>
      <div class="trainer-results-body"></div>
      <label class="trainer-code">Código del profesor
        <input type="text" maxlength="12" autocomplete="off" spellcheck="false" />
      </label>
      <button type="button" class="action-button trainer-export">Descargar mis resultados</button>
      <p class="trainer-export-note">El fichero solo lleva el código y tus aciertos, nunca tu nombre.</p>
    </details>`;
  const $ = <T extends Element>(s: string): T => root.querySelector(s) as T;
  const types = $<HTMLElement>('.trainer-types');
  for (const k of KINDS) {
    const b = document.createElement('button');
    b.type = 'button';
    b.dataset.type = k;
    b.textContent = KIND_TITLES[k];
    b.addEventListener('click', () => {
      mode = { kind: 'train', type: k, level: 1, streak: 0 };
      nextItem();
    });
    types.append(b);
  }

  const redraw = (): void => {
    scene.draw();
    spatial?.redraw();
  };

  const playSolution = (): void => {
    if (animation !== null) cancelAnimationFrame(animation);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      scene.solution = 1;
      redraw();
      return;
    }
    const start = performance.now();
    const step = (now: number): void => {
      const t = Math.min(1, (now - start) / 2200);
      scene.solution = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
      redraw();
      animation = t < 1 ? requestAnimationFrame(step) : null;
    };
    animation = requestAnimationFrame(step);
    if (item?.kind === 'vistas' && spatial) {
      // La figura vista desde delante, desde arriba y desde la izquierda.
      spatial.setView('front');
      window.setTimeout(() => spatial.setView('top'), 1400);
      window.setTimeout(() => spatial.setView('profile'), 2800);
    }
  };

  const nextItem = (): void => {
    answered = false;
    scene.solution = 0;
    if (mode.kind === 'train') {
      seed += 1;
      item = makeItem(rng(seed), mode.type, mode.level);
    } else {
      item = testItems[mode.index] ?? null;
    }
    scene.item = item;
    spatial?.setView(item?.kind === 'vistas' ? 'isometric' : 'perspective');
    render();
    redraw();
  };

  const answer = (index: number): void => {
    if (!item || answered) return;
    answered = true;
    const ok = index === item.correct;
    const feedback = $<HTMLElement>('.trainer-feedback');
    if (mode.kind === 'train') {
      const r = results.entrenamiento[item.kind];
      r.intentos += 1;
      if (ok) r.aciertos += 1;
      const next = nextLevel(mode.level, mode.streak, ok);
      mode = { ...mode, ...next };
      feedback.textContent = ok ? '¡Correcto!' : 'No es esa. Mira la solución en el modelo 3D.';
    } else {
      if (ok) {
        mode.correct += 1;
        mode.perType[item.kind] += 1;
      }
      feedback.textContent = ok ? '¡Correcto!' : 'Anotado.';
    }
    feedback.className = `exercise-feedback trainer-feedback ${ok ? 'is-correct' : 'is-wrong'}`;
    save(results);
    for (const b of root.querySelectorAll<HTMLButtonElement>('.trainer-options button')) {
      const i = Number(b.dataset.index);
      b.classList.toggle('is-right', mode.kind === 'train' && i === item.correct);
      b.classList.toggle('is-chosen', i === index);
      b.disabled = true;
    }
    // Al fallar en el entrenamiento, la solución en 3D animado (en el test no se dan pistas).
    if (mode.kind === 'train' && (!ok || item.kind === 'desarrollo')) playSolution();
    renderStatus();
  };

  const render = (): void => {
    for (const b of root.querySelectorAll<HTMLButtonElement>('.trainer-modes button')) {
      const m = b.dataset.mode;
      b.setAttribute(
        'aria-pressed',
        String(mode.kind === 'train' ? m === 'train' : m === mode.version),
      );
    }
    types.hidden = mode.kind !== 'train';
    for (const b of types.querySelectorAll<HTMLButtonElement>('button')) {
      b.setAttribute('aria-pressed', String(mode.kind === 'train' && b.dataset.type === mode.type));
    }
    $<HTMLElement>('.trainer-prompt').textContent = item ? PROMPTS[item.kind] : '';
    const feedback = $<HTMLElement>('.trainer-feedback');
    feedback.textContent = '';
    feedback.className = 'exercise-feedback trainer-feedback';
    const options = $<HTMLElement>('.trainer-options');
    options.replaceChildren(
      ...(item ? optionButtons(item) : []).map((thumb, i) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'action-button trainer-option';
        b.dataset.index = String(i);
        b.setAttribute('aria-label', `Opción ${i + 1}`);
        const caption = document.createElement('span');
        caption.textContent = String(i + 1);
        b.append(thumb, caption);
        b.addEventListener('click', () => answer(i));
        return b;
      }),
    );
    $<HTMLButtonElement>('.trainer-solution').hidden = mode.kind !== 'train';
    renderStatus();
  };

  const renderStatus = (): void => {
    const status = $<HTMLElement>('.trainer-status');
    if (mode.kind === 'train') {
      const r = results.entrenamiento[mode.type];
      status.textContent = `Nivel ${mode.level} de 3 · aciertos ${r.aciertos} de ${r.intentos}`;
    } else {
      status.textContent = `Test ${mode.version}: ítem ${Math.min(mode.index + 1, DIAGNOSTIC_LENGTH)} de ${DIAGNOSTIC_LENGTH}`;
    }
    const body = $<HTMLElement>('.trainer-results-body');
    const lines = KINDS.map((k) => {
      const r = results.entrenamiento[k];
      return `<li>${KIND_TITLES[k]}: ${r.aciertos} de ${r.intentos}</li>`;
    });
    for (const v of ['inicial', 'final'] as const) {
      const d = results.diagnostico[v];
      if (d) lines.push(`<li>Test ${v}: ${d.aciertos} de ${d.total}</li>`);
    }
    body.innerHTML = `<ul>${lines.join('')}</ul>`;
  };

  const onNext = (): void => {
    if (mode.kind === 'test') {
      if (!answered) return;
      mode.index += 1;
      if (mode.index >= DIAGNOSTIC_LENGTH) {
        results.diagnostico[mode.version] = {
          aciertos: mode.correct,
          total: DIAGNOSTIC_LENGTH,
          porTipo: mode.perType,
        };
        save(results);
        $<HTMLElement>('.trainer-feedback').textContent =
          `Test terminado: ${mode.correct} de ${DIAGNOSTIC_LENGTH}.`;
        mode = { kind: 'train', type: 'rotacion', level: 1, streak: 0 };
        window.setTimeout(nextItem, 1500);
        renderStatus();
        return;
      }
    }
    nextItem();
  };
  $<HTMLButtonElement>('.trainer-next').addEventListener('click', onNext);
  $<HTMLButtonElement>('.trainer-solution').addEventListener('click', playSolution);
  for (const b of root.querySelectorAll<HTMLButtonElement>('.trainer-modes button')) {
    b.addEventListener('click', () => {
      const m = b.dataset.mode;
      if (m === 'inicial' || m === 'final') {
        testItems = diagnostic(m);
        mode = {
          kind: 'test',
          version: m,
          index: 0,
          correct: 0,
          perType: { rotacion: 0, seccion: 0, desarrollo: 0, vistas: 0 },
        };
      } else {
        mode = { kind: 'train', type: 'rotacion', level: 1, streak: 0 };
      }
      nextItem();
    });
  }
  $<HTMLButtonElement>('.trainer-export').addEventListener('click', () => {
    const code = $<HTMLInputElement>('.trainer-code input')
      .value.trim()
      .replace(/[^A-Za-z0-9-]/g, '');
    if (!code) {
      $<HTMLElement>('.trainer-export-note').textContent =
        'Escribe primero el código que te ha dado tu profesor.';
      return;
    }
    const blob = new Blob([JSON.stringify({ codigo: code, resultados: results }, null, 2)], {
      type: 'application/json',
    });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `entrenador-${code}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  });

  nextItem();

  return () => {
    if (animation !== null) cancelAnimationFrame(animation);
    unmount?.();
    if (document.body.dataset.layout === 'trainer') delete document.body.dataset.layout;
    root.replaceChildren();
    results = emptyResults();
  };
}

function optionButtons(item: Item): SVGSVGElement[] {
  switch (item.kind) {
    case 'rotacion':
      return item.options.map((p, i) => polycubeThumb(p, `Figura ${i + 1}`));
    case 'vistas':
      return item.options.map((p, i) => viewsThumb(p, `Vistas ${i + 1}`));
    case 'desarrollo':
      return item.options.map((n, i) => netThumb(n, `Desarrollo ${i + 1}`));
    case 'seccion':
      return item.options.map((s, i) => sectionThumb(s, `Sección ${i + 1}`));
  }
}
