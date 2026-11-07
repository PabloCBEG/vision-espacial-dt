import { describe, expect, it } from 'vitest';
import { topicProgress } from './progress.ts';

describe('progreso por tema', () => {
  it('suma lecciones vistas y ejercicios acertados', () => {
    const lessons = [
      { id: 'a', exercises: [1, 2, 3] },
      { id: 'b', exercises: [1, 2] },
    ];
    const progress = topicProgress(lessons, new Set(['b']), (id) => (id === 'a' ? 2 : 0));
    expect(progress).toEqual({ lessons: 2, lessonsSeen: 1, exercises: 5, exercisesSolved: 2 });
  });
});
