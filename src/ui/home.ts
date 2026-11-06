// Pantalla de inicio: lista de lecciones y acceso al modo libre.
import type { LessonLoadError } from '../content/lessons.ts';
import type { Lesson } from '../content/schema.ts';
import { loadResults } from '../player/index.ts';

export function renderHome(
  list: HTMLElement,
  errorsBox: HTMLElement,
  lessons: readonly Lesson[],
  errors: readonly LessonLoadError[],
): void {
  list.replaceChildren();
  for (const lesson of lessons) {
    const solved = Object.values(loadResults(lesson.id)).filter((r) => r.solved).length;
    const total = lesson.exercises.length;
    const item = document.createElement('li');
    item.className = 'lesson-card';
    item.innerHTML = `
      <a class="lesson-card-link" href="#/leccion/${lesson.id}">
        <span class="lesson-card-meta">
          <span class="badge">${escapeHtml(lesson.course)}</span>
          <span class="badge badge-muted">${escapeHtml(lesson.level)}</span>
        </span>
        <span class="lesson-card-title">${lesson.order}. ${escapeHtml(lesson.title)}</span>
        <span class="lesson-card-text">${escapeHtml(lesson.saberBasico)}</span>
        <span class="lesson-card-footer">
          ${lesson.steps.length} pasos · ${total} ejercicios${
            total > 0 ? ` · resueltos ${solved} de ${total}` : ''
          }
        </span>
      </a>`;
    list.append(item);
  }

  const free = document.createElement('li');
  free.className = 'lesson-card lesson-card-free';
  free.innerHTML = `
    <a class="lesson-card-link" href="#/libre">
      <span class="lesson-card-title">Explorar libremente</span>
      <span class="lesson-card-text">
        Mueve un punto, gira el modelo y abate el PH sin seguir una lección.
      </span>
    </a>`;
  list.append(free);

  // Si una lección tiene errores, se dice cuáles para que el profesor pueda corregirla.
  errorsBox.hidden = errors.length === 0;
  errorsBox.innerHTML = errors
    .map(
      (e) => `<p><strong>No se ha podido cargar ${escapeHtml(e.file)}:</strong></p>
        <ul>${e.problems.map((p) => `<li>${escapeHtml(p)}</li>`).join('')}</ul>`,
    )
    .join('');
}

function escapeHtml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}
