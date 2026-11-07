// Pantalla de inicio: curso, luego bloque, luego tema. Cada tema disponible muestra sus
// lecciones y el progreso del alumno (guardado solo en su navegador); los demás aparecen
// como «Próximamente».
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
import { loadResults, loadSeenLessons, topicProgress } from '../player/index.ts';

const COURSES: readonly Stage[] = ['DT I', 'DT II'];
const COURSE_KEY = 'inicio:curso';

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
    if (trainer) featured.append(topicCard(trainer, lessonsOf(trainer.code), seen));
    featured.append(freeCard());
    if (course === 'DT II') featured.append(pauCard(), labCard());
    list.append(featured);

    // Bloques del curso con sus temas.
    for (const [block, topics] of topicsByBlock(course)) {
      const section = document.createElement('section');
      section.className = 'block-section';
      const heading = document.createElement('h2');
      heading.className = 'block-title';
      heading.textContent = `Bloque ${block}. ${BLOCK_TITLES[block]}`;
      const ul = document.createElement('ul');
      ul.className = 'lesson-list topic-list';
      for (const t of topics) ul.append(topicCard(t, lessonsOf(t.code), seen));
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

function topicCard(
  topic: Topic,
  lessons: readonly Lesson[],
  seen: ReadonlySet<string>,
): HTMLLIElement {
  const item = document.createElement('li');
  const available = topic.status === 'disponible' && (lessons.length > 0 || Boolean(topic.route));
  item.className = `topic-card${available ? '' : ' is-soon'}`;
  item.dataset.topic = topic.code;
  const pau = topic.pauExercise ? `PAU ej. ${topic.pauExercise}` : topic.pauNote;
  const titleId = `topic-${topic.code}`;
  let body: string;
  if (available && topic.route) {
    body = `<a class="lesson-card-link" href="${topic.route}">
      <span class="lesson-card-title">Empezar</span>
      <span class="lesson-card-footer">Entrenamiento adaptativo y test diagnóstico</span>
    </a>`;
  } else if (available) {
    const p = topicProgress(lessons, seen, solvedIn);
    body = `
      <p class="topic-progress">
        Lecciones vistas: ${p.lessonsSeen} de ${p.lessons} · ejercicios resueltos:
        ${p.exercisesSolved} de ${p.exercises}
      </p>
      <ol class="topic-lessons">
        ${lessons
          .map((l) => {
            const solved = solvedIn(l.id);
            const done = seen.has(l.id) ? ' · vista ✓' : '';
            return `<li><a class="lesson-card-link" href="#/leccion/${l.id}">
              <span class="lesson-card-title">${escapeHtml(l.title)}</span>
              <span class="lesson-card-footer">${l.steps.length} pasos · ${l.exercises.length}
                ejercicios${l.exercises.length > 0 ? ` · resueltos ${solved}` : ''}${done}</span>
            </a></li>`;
          })
          .join('')}
      </ol>`;
  } else {
    body = `<p class="topic-soon">Próximamente</p>`;
  }
  item.innerHTML = `
    <article class="topic-card-inner" aria-labelledby="${titleId}">
      <span class="lesson-card-meta">
        <span class="badge">${escapeHtml(topic.code)}</span>
        <span class="badge badge-muted">${escapeHtml(pau)}</span>
      </span>
      <h3 id="${titleId}" class="topic-title">${escapeHtml(topic.title)}</h3>
      ${body}
    </article>`;
  return item;
}

function labCard(): HTMLLIElement {
  const item = document.createElement('li');
  item.className = 'topic-card lesson-card-free';
  item.innerHTML = `
    <a class="lesson-card-link" href="#/conicas">
      <span class="lesson-card-title">Laboratorio de cónicas</span>
      <span class="lesson-card-text">
        Corta un cono doble con un plano y mira qué cónica sale, con su ecuación y su excentricidad.
      </span>
    </a>`;
  return item;
}

function pauCard(): HTMLLIElement {
  const item = document.createElement('li');
  item.className = 'topic-card lesson-card-free';
  item.innerHTML = `
    <a class="lesson-card-link" href="#/pau">
      <span class="lesson-card-title">Banco PAU</span>
      <span class="lesson-card-text">
        Ejercicios tipo PAU en modo examen: 22 minutos, solo la lámina y autoevaluación.
      </span>
    </a>`;
  return item;
}

function freeCard(): HTMLLIElement {
  const free = document.createElement('li');
  free.className = 'topic-card lesson-card-free';
  free.innerHTML = `
    <a class="lesson-card-link" href="#/libre">
      <span class="lesson-card-title">Explorar libremente</span>
      <span class="lesson-card-text">
        Mueve un punto, gira el modelo y abate el PH sin seguir una lección.
      </span>
    </a>`;
  return free;
}

function escapeHtml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}
