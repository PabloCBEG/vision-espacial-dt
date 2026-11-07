// Progreso del alumno, guardado SOLO en su navegador (localStorage): lecciones vistas
// hasta el final. Los ejercicios acertados están en results.ts. No identifica a nadie.

const SEEN_KEY = 'progreso:lecciones-vistas';

export function loadSeenLessons(): Set<string> {
  try {
    const raw = localStorage.getItem(SEEN_KEY);
    const data: unknown = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(data) ? data.filter((v) => typeof v === 'string') : []);
  } catch {
    return new Set(); // sin acceso a localStorage o datos dañados: se empieza de cero
  }
}

/** Marca una lección como vista (el alumno ha llegado a su último paso). */
export function markLessonSeen(lessonId: string): void {
  const seen = loadSeenLessons();
  if (seen.has(lessonId)) return;
  seen.add(lessonId);
  try {
    localStorage.setItem(SEEN_KEY, JSON.stringify([...seen]));
  } catch {
    // Sin acceso a localStorage: vale solo para esta visita.
  }
}

export interface TopicProgress {
  lessonsSeen: number;
  lessons: number;
  exercisesSolved: number;
  exercises: number;
}

/** Suma el progreso de las lecciones de un tema. */
export function topicProgress(
  lessons: readonly { id: string; exercises: readonly unknown[] }[],
  seen: ReadonlySet<string>,
  solvedIn: (lessonId: string) => number,
): TopicProgress {
  return {
    lessons: lessons.length,
    lessonsSeen: lessons.filter((l) => seen.has(l.id)).length,
    exercises: lessons.reduce((sum, l) => sum + l.exercises.length, 0),
    exercisesSolved: lessons.reduce((sum, l) => sum + solvedIn(l.id), 0),
  };
}
