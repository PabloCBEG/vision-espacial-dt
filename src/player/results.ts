// Resultados de los ejercicios, guardados SOLO en el navegador del alumno (localStorage).
// No se envían a ningún sitio y no identifican a nadie.

export interface ExerciseResult {
  solved: boolean;
  attempts: number;
}

type LessonResults = Record<number, ExerciseResult>;

const key = (lessonId: string): string => `resultados:${lessonId}`;

export function loadResults(lessonId: string): LessonResults {
  try {
    const raw = localStorage.getItem(key(lessonId));
    if (!raw) return {};
    const data: unknown = JSON.parse(raw);
    return typeof data === 'object' && data !== null ? (data as LessonResults) : {};
  } catch {
    return {}; // sin acceso a localStorage o datos dañados: se empieza de cero
  }
}

export function saveAttempt(lessonId: string, index: number, solved: boolean): ExerciseResult {
  const results = loadResults(lessonId);
  const previous = results[index] ?? { solved: false, attempts: 0 };
  const next = { solved: previous.solved || solved, attempts: previous.attempts + 1 };
  results[index] = next;
  try {
    localStorage.setItem(key(lessonId), JSON.stringify(results));
  } catch {
    // Sin acceso a localStorage: el resultado vale solo para esta visita.
  }
  return next;
}
