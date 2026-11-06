// Carga y valida todas las lecciones de src/content/lessons/*.json.
// Para añadir una lección basta con añadir un fichero JSON en esa carpeta.
import { LessonSchema, type Lesson } from './schema.ts';

export interface LessonLoadError {
  file: string;
  problems: string[];
}

export interface LoadedLessons {
  lessons: Lesson[];
  errors: LessonLoadError[];
}

/** Valida un conjunto de ficheros ya leídos (separado para poder probarlo). */
export function parseLessons(files: Record<string, unknown>): LoadedLessons {
  const lessons: Lesson[] = [];
  const errors: LessonLoadError[] = [];
  for (const [file, data] of Object.entries(files)) {
    const result = LessonSchema.safeParse(data);
    if (result.success) {
      lessons.push(result.data);
    } else {
      errors.push({
        file: file.split('/').pop() ?? file,
        problems: result.error.issues.map((i) => `${i.path.join(' › ') || '(raíz)'}: ${i.message}`),
      });
    }
  }
  const ids = new Set<string>();
  for (const lesson of lessons) {
    if (ids.has(lesson.id)) {
      errors.push({ file: lesson.id, problems: [`Hay dos lecciones con el id "${lesson.id}"`] });
    }
    ids.add(lesson.id);
  }
  lessons.sort((a, b) => a.order - b.order);
  return { lessons, errors };
}

export function loadLessons(): LoadedLessons {
  const modules = import.meta.glob<{ default: unknown }>('./lessons/*.json', { eager: true });
  const files: Record<string, unknown> = {};
  for (const [path, module] of Object.entries(modules)) files[path] = module.default;
  return parseLessons(files);
}
