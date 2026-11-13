// Pantalla de inicio: un camino por bloques (A, B, C, D) con el progreso de cada tema, y arriba
// «Continúa donde lo dejaste». El progreso se guarda solo en el navegador del alumno.
import {
  BLOCK_TITLES,
  CATALOG,
  findTopic,
  topicsByBlock,
  type Stage,
  type Topic,
} from '../content/catalog.ts';
import type { LessonLoadError } from '../content/lessons.ts';
import type { Lesson } from '../content/schema.ts';
import {
  loadLastLesson,
  loadResults,
  loadSeenLessons,
  topicProgress,
  type TopicProgress,
} from '../player/index.ts';

const COURSES: readonly Stage[] = ['DT I', 'DT II'];
const COURSE_KEY = 'inicio:curso';

type NodeState = 'done' | 'current' | 'progress' | 'new' | 'soon';

const STATE_LABEL: Record<NodeState, string> = {
  done: 'Completado ✓',
  current: 'Sigue aquí',
  progress: 'En curso',
  new: 'Nuevo',
  soon: 'Próximamente',
};

function loadCourse(): Stage {
  try {
    const saved = localStorage.getItem(COURSE_KEY);
    if (saved === 'DT I' || saved === 'DT II') return saved;
  } catch {
    // Sin acceso a localStorage: se empieza por DT I.
  }
  return 'DT I';
}

function saveCourse(course: Stage): void {
  try {
    localStorage.setItem(COURSE_KEY, course);
  } catch {
    // Sin acceso a localStorage: vale solo para esta visita.
  }
}

const solvedIn = (lessonId: string): number =>
  Object.values(loadResults(lessonId)).filter((r) => r.solved).length;

/** Porcentaje del anillo: mitad lecciones vistas, mitad ejercicios resueltos. */
function percent(p: TopicProgress): number {
  if (p.lessons === 0) return 0;
  const lessonsPart = p.lessonsSeen / p.lessons;
  const exercisesPart = p.exercises > 0 ? p.exercisesSolved / p.exercises : lessonsPart;
  return Math.round(100 * (lessonsPart + exercisesPart) * 0.5);
}

export function renderHome(
  list: HTMLElement,
  errorsBox: HTMLElement,
  lessons: readonly Lesson[],
  errors: readonly LessonLoadError[],
): void {
  let course = loadCourse();
  const seen = loadSeenLessons();
  const lessonsOf = (code: string): Lesson[] => lessons.filter((l) => l.topic === code);

  const draw = (): void => {
    list.replaceChildren();
    const blocks = topicsByBlock(course);

    // Lecciones del curso, en el orden del temario.
    const ordered: Lesson[] = [];
    for (const topics of blocks.values()) {
      for (const t of topics) ordered.push(...lessonsOf(t.code));
    }
    const target = pickResumeLesson(ordered, lessons, seen);

    list.append(resumeCard(target, ordered.length > 0, seen));

    // Curso.
    const tabs = document.createElement('div');
    tabs.className = 'course-tabs view-buttons';
    tabs.setAttribute('role', 'group');
    tabs.setAttribute('aria-label', 'Curso');
    for (const c of COURSES) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = c === 'DT I' ? 'Dibujo Técnico I' : 'Dibujo Técnico II';
      button.setAttribute('aria-pressed', String(c === course));
      button.addEventListener('click', () => {
        course = c;
        saveCourse(c);
        draw();
        list.querySelector<HTMLButtonElement>('.course-tabs [aria-pressed="true"]')?.focus();
      });
      tabs.append(button);
    }
    list.append(tabs);

    // Para los dos cursos: entrenador espacial y modo libre.
    const featured = document.createElement('ul');
    featured.className = 'lesson-list featured-list';
    const trainer = findTopic('E-00');
    if (trainer?.route) featured.append(trainerCard(trainer));
    featured.append(freeCard());
    if (course === 'DT II') featured.append(pauCard(), labCard());
    list.append(featured);

    // Bloques del curso con sus temas: el camino.
    let currentFound = false;
    for (const [block, topics] of blocks) {
      const section = document.createElement('section');
      section.className = 'block-section';
      section.dataset.block = block;

      const states = topics.map((t) => {
        const own = lessonsOf(t.code);
        const available = t.status === 'disponible' && own.length > 0;
        const p = topicProgress(own, seen, solvedIn);
        let state: NodeState = !available
          ? 'soon'
          : p.lessons > 0 && p.lessonsSeen === p.lessons
            ? 'done'
            : p.lessonsSeen > 0 || p.exercisesSolved > 0
              ? 'progress'
              : 'new';
        // «Sigue aquí»: el tema de la lección que toca ahora (o el primero sin terminar).
        const isTarget = target !== undefined && own.some((l) => l.id === target.id);
        if (!currentFound && available && state !== 'done' && (isTarget || target === undefined)) {
          state = 'current';
          currentFound = true;
        }
        return { topic: t, own, available, p, state };
      });

      const done = states.filter((s) => s.state === 'done').length;
      const open = states.filter((s) => s.available).length;
      const heading = document.createElement('header');
      heading.className = 'block-head';
      heading.innerHTML = `
        <span class="block-badge" aria-hidden="true">${block}</span>
        <h2 class="block-title">Bloque ${block}. ${escapeHtml(BLOCK_TITLES[block])}</h2>
        <span class="block-meter" aria-label="${done} de ${open} temas completados">${done}/${open}</span>`;
      const ul = document.createElement('ul');
      ul.className = 'lesson-list topic-list';
      for (const s of states) ul.append(topicCard(s.topic, s.own, seen, s.p, s.state));
      section.append(heading, ul);
      list.append(section);
    }
  };
  draw();

  // Lecciones con un código de tema que no está en el catálogo: se avisa al profesor.
  const orphans = lessons.filter((l) => !CATALOG.some((t) => t.code === l.topic));
  const problems = [
    ...errors,
    ...orphans.map((l) => ({ file: l.id, problems: [`Tema ${l.topic} sin catálogo`] })),
  ];
  // Si una lección tiene errores, se dice cuáles para que el profesor pueda corregirla.
  errorsBox.hidden = problems.length === 0;
  errorsBox.innerHTML = problems
    .map(
      (e) => `<p><strong>No se ha podido cargar ${escapeHtml(e.file)}:</strong></p>
        <ul>${e.problems.map((p) => `<li>${escapeHtml(p)}</li>`).join('')}</ul>`,
    )
    .join('');
}

interface ResumeTarget {
  id: string;
  title: string;
  /** La última lección abierta quedó sin terminar. */
  unfinished: boolean;
  started: boolean;
}

/** Elige a qué lección lleva el botón grande de la portada. */
function pickResumeLesson(
  ordered: readonly Lesson[],
  all: readonly Lesson[],
  seen: ReadonlySet<string>,
): ResumeTarget | undefined {
  const lastId = loadLastLesson();
  const last = lastId ? all.find((l) => l.id === lastId) : undefined;
  if (last && !seen.has(last.id)) {
    return { id: last.id, title: last.title, unfinished: true, started: true };
  }
  const next = ordered.find((l) => !seen.has(l.id));
  if (next) return { id: next.id, title: next.title, unfinished: false, started: seen.size > 0 };
  return undefined;
}

const RESUME_ART = `
  <svg class="resume-art" viewBox="0 0 120 100" aria-hidden="true" focusable="false">
    <polygon points="10,72 80,72 106,52 36,52" fill="#3d8bd9"/>
    <polygon points="36,52 106,52 106,8 36,8" fill="#d9962b"/>
    <line x1="36" y1="52" x2="106" y2="52" stroke="#fff" stroke-width="2.5"/>
    <circle cx="64" cy="30" r="5" fill="#c2185b" stroke="#fff" stroke-width="2"/>
    <text x="14" y="88" font-size="11" font-weight="800" fill="currentColor">PH</text>
    <text x="90" y="20" font-size="11" font-weight="800" fill="#17163a">PV</text>
  </svg>`;

function resumeCard(
  target: ResumeTarget | undefined,
  hasLessons: boolean,
  seen: ReadonlySet<string>,
): HTMLElement {
  const box = document.createElement('section');
  box.className = 'resume';
  box.setAttribute('aria-labelledby', 'resume-title');
  let kicker: string;
  let title: string;
  let meta: string;
  let href: string;
  let cta: string;
  if (target) {
    kicker = target.unfinished
      ? 'Continúa donde lo dejaste'
      : target.started
        ? 'Tu siguiente paso'
        : 'Empieza por aquí';
    title = target.title;
    meta = target.unfinished
      ? 'Esta lección te quedó a medias.'
      : `Llevas ${seen.size} ${seen.size === 1 ? 'lección vista' : 'lecciones vistas'}.`;
    href = `#/leccion/${target.id}`;
    cta = target.unfinished ? 'Continuar →' : target.started ? 'Seguir →' : 'Empezar →';
  } else {
    kicker = hasLessons ? '¡Curso al día!' : 'Empieza por aquí';
    title = hasLessons ? 'Has visto todas las lecciones' : 'Entrenamiento espacial';
    meta = hasLessons
      ? 'Repasa con ejercicios o explora libremente.'
      : 'Calienta la visión espacial.';
    href = hasLessons ? '#/libre' : '#/entrenador';
    cta = hasLessons ? 'Explorar →' : 'Empezar →';
  }
  box.innerHTML = `
    ${RESUME_ART}
    <div class="resume-body">
      <p class="resume-kicker">${escapeHtml(kicker)}</p>
      <h2 id="resume-title" class="resume-title">${escapeHtml(title)}</h2>
      <p class="resume-meta">${escapeHtml(meta)}</p>
      <a class="cta" href="${href}">${escapeHtml(cta)}</a>
    </div>`;
  return box;
}

function topicCard(
  topic: Topic,
  lessons: readonly Lesson[],
  seen: ReadonlySet<string>,
  p: TopicProgress,
  state: NodeState,
): HTMLLIElement {
  const item = document.createElement('li');
  const available = state !== 'soon';
  item.className = `topic-card${available ? '' : ' is-soon'}`;
  item.dataset.topic = topic.code;
  item.dataset.state = state;
  const pau = topic.pauExercise ? `PAU ej. ${topic.pauExercise}` : topic.pauNote;
  const titleId = `topic-${topic.code}`;
  const pct = state === 'done' ? 100 : percent(p);
  const glyph = state === 'done' ? '✓' : (topic.code.split('-')[1] ?? topic.code);
  let body: string;
  if (available) {
    body = `
      <p class="topic-progress">
        Lecciones vistas: ${p.lessonsSeen} de ${p.lessons} · ejercicios resueltos:
        ${p.exercisesSolved} de ${p.exercises}
      </p>
      <ol class="topic-lessons">
        ${lessons
          .map((l) => {
            const solved = solvedIn(l.id);
            const isSeen = seen.has(l.id);
            return `<li data-seen="${isSeen}"><a class="lesson-card-link" href="#/leccion/${l.id}">
              <span class="lesson-card-title">${escapeHtml(l.title)}</span>
              <span class="lesson-card-footer">${l.steps.length} pasos · ${l.exercises.length}
                ejercicios${l.exercises.length > 0 ? ` · resueltos ${solved}` : ''}${isSeen ? ' · vista ✓' : ''}</span>
            </a></li>`;
          })
          .join('')}
      </ol>`;
  } else {
    body = `<p class="topic-soon">Próximamente</p>`;
  }
  item.innerHTML = `
    <article class="topic-card-inner" aria-labelledby="${titleId}">
      <span class="node-ring" style="--p:${pct}" aria-hidden="true"><span>${escapeHtml(glyph)}</span></span>
      <div class="node-head">
        <span class="lesson-card-meta">
          <span class="badge">${escapeHtml(topic.code)}</span>
          <span class="badge badge-muted">${escapeHtml(pau)}</span>
          <span class="state-chip">${STATE_LABEL[state]}</span>
        </span>
        <h3 id="${titleId}" class="topic-title">${escapeHtml(topic.title)}</h3>
      </div>
      <div class="node-body">${body}</div>
    </article>`;
  return item;
}

function specialCard(icon: string, title: string, text: string, href: string): HTMLLIElement {
  const item = document.createElement('li');
  item.className = 'topic-card lesson-card-free';
  item.innerHTML = `
    <a class="lesson-card-link" href="${href}">
      <span class="special-icon" aria-hidden="true">${icon}</span>
      <span class="lesson-card-title">${escapeHtml(title)}</span>
      <span class="lesson-card-text">${escapeHtml(text)}</span>
    </a>`;
  return item;
}

function trainerCard(topic: Topic): HTMLLIElement {
  const item = specialCard(
    '🎯',
    'Entrenador espacial',
    'Rotaciones, secciones, desarrollos y vistas, con test diagnóstico.',
    topic.route ?? '#/entrenador',
  );
  item.dataset.topic = topic.code;
  item
    .querySelector('.lesson-card-link')
    ?.insertAdjacentHTML('beforeend', '<span class="lesson-card-footer">Empezar →</span>');
  return item;
}

const labCard = (): HTMLLIElement =>
  specialCard(
    '🔬',
    'Laboratorio de cónicas',
    'Corta un cono doble con un plano y mira qué cónica sale, con su ecuación y su excentricidad.',
    '#/conicas',
  );

const pauCard = (): HTMLLIElement =>
  specialCard(
    '📝',
    'Banco PAU',
    'Ejercicios tipo PAU en modo examen: 22 minutos, solo la lámina y autoevaluación.',
    '#/pau',
  );

const freeCard = (): HTMLLIElement =>
  specialCard(
    '🧭',
    'Explorar libremente',
    'Mueve un punto, gira el modelo y abate el PH sin seguir una lección.',
    '#/libre',
  );

function escapeHtml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}
