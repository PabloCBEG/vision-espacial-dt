// Banco de ejercicios PAU: lista con filtros y modo examen (22 minutos, solo la lámina y sin
// pistas). Al terminar, la solución animada con la escena 3D de apoyo y la autoevaluación con
// la rúbrica oficial. Las notas se guardan solo en este navegador.
import { CATALOG } from '../content/catalog.ts';
import {
  EXAM_MINUTES,
  rubricScore,
  solutionLesson,
  type PauExercise,
} from '../content/pauSchema.ts';
import type { EngineChecker, PlayerElements } from '../player/playerUi.ts';
import { bindPlayer, Player, type PlayerCamera } from '../player/index.ts';
import { mergeEngines } from '../player/player.ts';
import type { AppStore, SceneObject } from '../state/index.ts';
import { createPoint } from '../geometry/index.ts';
import { formatDecimal } from './format.ts';

/** Nota con dos decimales y coma: «1,85». */
function formatScore(value: number): string {
  return (Math.round(value * 100) / 100)
    .toFixed(2)
    .replace(/\.?0+$/, '')
    .replace('.', ',');
}

const RESULTS_KEY = 'pau:resultados';

interface PauResult {
  nota: number;
}

function loadResults(): Record<string, PauResult> {
  try {
    const data: unknown = JSON.parse(localStorage.getItem(RESULTS_KEY) ?? '{}');
    return typeof data === 'object' && data !== null ? (data as Record<string, PauResult>) : {};
  } catch {
    return {};
  }
}

function saveResult(id: string, nota: number): void {
  const all = loadResults();
  all[id] = { nota };
  try {
    localStorage.setItem(RESULTS_KEY, JSON.stringify(all));
  } catch {
    // Sin acceso a localStorage: vale solo para esta visita.
  }
}

// ---------- Lista con filtros ----------

export function renderPauBank(root: HTMLElement, exercises: readonly PauExercise[]): void {
  const filters = { ejercicio: '', tema: '', convocatoria: '' };
  const select = (id: string, label: string, options: [string, string][]): HTMLLabelElement => {
    const wrapper = document.createElement('label');
    wrapper.className = 'pau-filter';
    wrapper.textContent = label;
    const s = document.createElement('select');
    s.id = id;
    for (const [value, text] of [['', 'Todos'] as [string, string], ...options]) {
      const o = document.createElement('option');
      o.value = value;
      o.textContent = text;
      s.append(o);
    }
    wrapper.append(s);
    return wrapper;
  };
  const temas = [...new Set(exercises.flatMap((e) => e.temas))].sort();
  const convocatorias = [...new Set(exercises.map((e) => e.convocatoria))].sort();
  const form = document.createElement('div');
  form.className = 'pau-filters';
  form.setAttribute('role', 'group');
  form.setAttribute('aria-label', 'Filtros');
  form.append(
    select(
      'pau-filter-ejercicio',
      'Ejercicio',
      [1, 2, 3, 4].map((n) => [String(n), `Ejercicio ${n}`]),
    ),
    select(
      'pau-filter-tema',
      'Tema',
      temas.map((t) => [t, `${t} · ${CATALOG.find((c) => c.code === t)?.title ?? ''}`]),
    ),
    select(
      'pau-filter-convocatoria',
      'Convocatoria',
      convocatorias.map((c) => [c, c]),
    ),
  );
  const list = document.createElement('ul');
  list.className = 'lesson-list pau-list';
  list.id = 'pau-list';

  const draw = (): void => {
    const results = loadResults();
    list.replaceChildren(
      ...exercises
        .filter(
          (e) =>
            (!filters.ejercicio || String(e.ejercicio) === filters.ejercicio) &&
            (!filters.tema || e.temas.includes(filters.tema)) &&
            (!filters.convocatoria || e.convocatoria === filters.convocatoria),
        )
        .map((e) => {
          const li = document.createElement('li');
          li.className = 'topic-card';
          const note = results[e.id];
          li.innerHTML = `
            <a class="lesson-card-link" href="#/pau/${e.id}">
              <span class="lesson-card-meta">
                <span class="badge">Ejercicio ${e.ejercicio}${e.opcion ? e.opcion : ''}</span>
                <span class="badge badge-muted">${escapeHtml(e.convocatoria)}</span>
              </span>
              <span class="lesson-card-title">${escapeHtml(e.titulo)}</span>
              <span class="lesson-card-text">${e.temas.map(escapeHtml).join(' · ')}</span>
              <span class="lesson-card-footer">${
                note ? `Tu nota: ${formatScore(note.nota)} de 2,5` : `${EXAM_MINUTES} minutos`
              }</span>
            </a>`;
          return li;
        }),
    );
    if (list.children.length === 0) {
      const empty = document.createElement('li');
      empty.className = 'pau-empty';
      empty.textContent = 'No hay ejercicios con esos filtros.';
      list.append(empty);
    }
  };
  for (const [key, id] of [
    ['ejercicio', 'pau-filter-ejercicio'],
    ['tema', 'pau-filter-tema'],
    ['convocatoria', 'pau-filter-convocatoria'],
  ] as const) {
    form.querySelector<HTMLSelectElement>(`#${id}`)?.addEventListener('change', (ev) => {
      filters[key] = (ev.target as HTMLSelectElement).value;
      draw();
    });
  }
  root.replaceChildren(form, list);
  draw();
}

// ---------- Modo examen ----------

export interface ExamElements {
  panel: HTMLElement;
  statement: HTMLElement;
  data: HTMLElement;
  timer: HTMLElement;
  pause: HTMLButtonElement;
  finish: HTMLButtonElement;
  rubric: HTMLElement;
  rubricItems: HTMLElement;
  rubricTotal: HTMLElement;
}

/** Empieza un ejercicio PAU en modo examen. Devuelve la función que lo cierra. */
export function startExam(
  pau: PauExercise,
  store: AppStore,
  camera: PlayerCamera | null,
  el: ExamElements,
  player: PlayerElements,
  checkEngine: EngineChecker,
): () => void {
  let stopPlayer: (() => void) | null = null;
  let remaining = EXAM_MINUTES * 60;
  let running = true;
  document.body.dataset.exam = 'examen';
  document.body.dataset.help = 'only2d';
  // «Volver» lleva al banco PAU, no al temario.
  const back = document.querySelector<HTMLAnchorElement>('.lesson-head .back-link');
  const backHref = back?.getAttribute('href') ?? '#/';
  const backText = back?.textContent ?? '';
  if (back) {
    back.setAttribute('href', '#/pau');
    back.textContent = '← Banco PAU';
  }
  player.title.textContent = pau.titulo;
  el.panel.hidden = false;
  el.rubric.hidden = true;
  el.statement.textContent = pau.enunciado;
  el.data.replaceChildren(
    ...pau.datos.map((d) => {
      const li = document.createElement('li');
      li.textContent = d;
      return li;
    }),
  );

  // La escena del examen: solo los datos, en la lámina.
  const scene = pau.initialScene;
  const points: Record<string, ReturnType<typeof createPoint>> = {};
  for (const [id, [x, a, c]] of Object.entries(scene.points)) points[id] = createPoint(x, a, c);
  store.set({
    ...store.get(),
    points,
    objects: scene.objects as readonly SceneObject[],
    activePoint: scene.activePoint,
    foldAngle: pau.examen.foldAngle,
    layers3d: [],
    layersSheet: pau.examen.sheet,
    highlight: [],
    exercise: null,
    engines: mergeEngines(scene.engines, pau.examen.engines),
    locked: true,
    helpLevel: 'only2d',
  });
  camera?.setView(pau.examen.camera);

  const show = (): void => {
    const m = Math.floor(Math.max(0, remaining) / 60);
    const s = Math.max(0, remaining) % 60;
    el.timer.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    el.timer.classList.toggle('is-over', remaining <= 0);
    el.pause.textContent = running ? 'Pausa' : 'Seguir';
    el.pause.setAttribute('aria-pressed', String(!running));
  };
  const tick = window.setInterval(() => {
    if (!running || remaining <= 0) return;
    remaining -= 1;
    if (remaining === 0) el.timer.setAttribute('aria-label', 'Se ha acabado el tiempo');
    show();
  }, 1000);
  show();

  const onPause = (): void => {
    running = !running;
    show();
  };
  const onFinish = (): void => {
    // Fin del examen: la solución paso a paso, con el 3D, y la autoevaluación.
    running = false;
    window.clearInterval(tick);
    document.body.dataset.exam = 'solucion';
    el.panel.hidden = true;
    const p = new Player(solutionLesson(pau), store, camera);
    stopPlayer = bindPlayer(p, store, player, checkEngine);
    store.set({ ...store.get(), helpLevel: 'with3d', locked: false });
    p.start();
    renderRubric(pau, el);
  };
  el.pause.addEventListener('click', onPause);
  el.finish.addEventListener('click', onFinish);

  return () => {
    window.clearInterval(tick);
    el.pause.removeEventListener('click', onPause);
    el.finish.removeEventListener('click', onFinish);
    stopPlayer?.();
    el.panel.hidden = true;
    el.rubric.hidden = true;
    delete document.body.dataset.exam;
    delete document.body.dataset.help;
    if (back) {
      back.setAttribute('href', backHref);
      back.textContent = backText;
    }
    store.set({ ...store.get(), locked: false, helpLevel: 'with3d' });
  };
}

function renderRubric(pau: PauExercise, el: ExamElements): void {
  el.rubric.hidden = false;
  const checked = new Set<number>();
  let precision = false;
  let presentation = false;
  const box = (label: string, points: number, onChange: (v: boolean) => void): HTMLLabelElement => {
    const l = document.createElement('label');
    l.className = 'rubric-item';
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.addEventListener('change', () => {
      onChange(input.checked);
      update(true);
    });
    const text = document.createElement('span');
    text.textContent = `${label} (${formatDecimal(points)})`;
    l.append(input, text);
    return l;
  };
  const items = pau.rubrica.criterios.map((c, i) =>
    box(c.texto, c.puntos, (v) => (v ? checked.add(i) : checked.delete(i))),
  );
  const extraTitle = document.createElement('p');
  extraTitle.className = 'rubric-extra-title';
  extraTitle.textContent = 'Solo si la solución llega al 70 % (1,4 puntos):';
  const prec = box('Precisión', pau.rubrica.precision, (v) => (precision = v));
  const pres = box('Presentación', pau.rubrica.presentacion, (v) => (presentation = v));
  el.rubricItems.replaceChildren(...items, extraTitle, prec, pres);
  const update = (save: boolean): void => {
    const score = rubricScore(pau, checked, precision, presentation);
    for (const l of [prec, pres]) {
      const input = l.querySelector('input');
      if (input) input.disabled = !score.extrasAllowed;
    }
    el.rubricTotal.textContent = `Tu nota: ${formatScore(score.total)} de 2,5`;
    const summary = el.rubric.querySelector('summary');
    if (summary) summary.textContent = `Autoevaluación · ${formatScore(score.total)} de 2,5`;
    if (save) saveResult(pau.id, score.total);
  };
  update(false);
}

function escapeHtml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}
