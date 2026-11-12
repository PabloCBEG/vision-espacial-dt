// Red de seguridad de los ejercicios: recorre todos los ejercicios de todas las lecciones y
// comprueba que lo escrito a mano (respuestas, pistas, soluciones) coincide con lo que calculan
// los motores. Las funciones de comprobación están en exerciseChecks.ts.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { completenessProblems, exerciseProblems, textProblems } from './exerciseChecks.ts';
import { exerciseMarkers, hasUnresolved, markersIn, resolveMarkers } from './markers.ts';
import { parseLessons } from './lessons.ts';
import type { Lesson } from './schema.ts';
import { generateVariant } from './variants.ts';

const LESSONS_DIR = join(import.meta.dirname, 'lessons');
const files: Record<string, unknown> = {};
for (const name of readdirSync(LESSONS_DIR).filter((f) => f.endsWith('.json'))) {
  files[name] = JSON.parse(readFileSync(join(LESSONS_DIR, name), 'utf8'));
}
const { lessons, errors } = parseLessons(files);

/**
 * Lecciones «completas»: a cada una se le exige el objetivo (9 ejercicios, 3 por nivel, con
 * pistas y solución, y datos distintos). Se añade el id cuando se termina la lección
 * (CLAUDE.md, «Contenido de ejercicios»). Empieza vacía para no romper la publicación.
 */
const COMPLETE_LESSONS: string[] = [
  'tres-metodos',
  'angulos-distancias',
  'seccion-piramide',
  'poliedros-regulares',
  'cono-cilindro',
  'potencia-tangencias',
  'homologia-afinidad',
  'conicas-trazado',
  'lugares-geometricos',
  'tangencias-basicas',
  'vistas-isometrica',
  'octaedro-isometrica',
  'paralelas-se-juntan',
];

const lessonNamed = (id: string): Lesson => {
  const lesson = lessons.find((l) => l.id === id);
  if (!lesson) throw new Error(`No existe la lección ${id}`);
  return lesson;
};

describe('todos los ejercicios de todas las lecciones', () => {
  it('las lecciones cumplen el esquema', () => {
    expect(errors).toEqual([]);
  });

  for (const lesson of lessons) {
    for (const [i, exercise] of lesson.exercises.entries()) {
      it(`${lesson.id}, ejercicio ${i + 1} (${exercise.kind}): es coherente con su motor`, () => {
        expect(exerciseProblems(lesson, exercise)).toEqual([]);
      });
    }
  }

  it('hay ejercicios verificados de cada clase que puede verificar el motor', () => {
    const kinds = new Set<string>();
    for (const lesson of lessons) {
      for (const e of lesson.exercises) {
        if (e.kind === 'value' && e.engines?.metodos) kinds.add('metodos');
        if (e.kind === 'value' && e.engines?.solidos) kinds.add('solidos');
        if (e.kind === 'engine' && e.engines?.plana) kinds.add('plana');
        if (e.solution) kinds.add('solucion');
      }
    }
    expect([...kinds].sort()).toEqual(['metodos', 'plana', 'solidos', 'solucion']);
  });

  it('las variantes con semilla son coherentes, con su solución resuelta', () => {
    let checked = 0;
    for (const lesson of lessons) {
      for (const exercise of lesson.exercises) {
        if (exercise.kind !== 'value' || !exercise.variant) continue;
        for (let seed = 1; seed <= 25; seed++) {
          const variant = generateVariant(lesson, exercise, seed);
          expect(variant, `${lesson.id} semilla ${seed}`).not.toBeNull();
          if (!variant) continue;
          expect(exerciseProblems(lesson, variant), `${lesson.id} semilla ${seed}`).toEqual([]);
          checked++;
        }
      }
    }
    expect(checked).toBeGreaterThan(0);
  });
});

describe('objetivo por lección', () => {
  it('las lecciones completas existen y cumplen el objetivo', () => {
    for (const id of COMPLETE_LESSONS) {
      expect(completenessProblems(lessonNamed(id)), id).toEqual([]);
    }
  });

  it('una lección sin terminar incumple el objetivo (el test sabe detectarlo)', () => {
    // Una lección terminada a la que se le quitan ejercicios, pistas y soluciones.
    const unfinished = structuredClone(lessonNamed('tres-metodos'));
    unfinished.exercises = unfinished.exercises.slice(0, 3).map((e) => ({
      ...e,
      hints: undefined,
      solution: undefined,
    }));
    const problems = completenessProblems(unfinished).join('\n');
    expect(problems).toContain('deben ser 9');
    expect(problems).toContain('faltan las 3 pistas');
    expect(problems).toContain('falta la solución');
  });

  /** Una lección sintética completa: 9 ejercicios de tres-metodos con datos distintos. */
  function complete(): Lesson {
    const lesson = structuredClone(lessonNamed('tres-metodos'));
    const model = structuredClone(lesson.exercises[0]);
    if (model?.kind !== 'value') throw new Error('Se esperaba un ejercicio de medida');
    lesson.exercises = Array.from({ length: 9 }, (_, i) => ({
      ...structuredClone(model),
      difficulty: Math.floor(i / 3) + 1,
      points: { A: [-30 + i, 10, 15], B: [25, 30 + i, 35] },
    }));
    return lesson;
  }

  it('una lección con 9 ejercicios, 3 por nivel, con ayudas y datos distintos pasa', () => {
    expect(completenessProblems(complete())).toEqual([]);
  });

  it('detecta datos repetidos entre ejercicios y con la teoría, y niveles descompensados', () => {
    const repeated = complete();
    const second = repeated.exercises[1];
    if (second?.kind === 'value') second.points = { A: [-30, 10, 15], B: [25, 30, 35] };
    expect(completenessProblems(repeated).join('\n')).toContain(
      'los mismos datos que el ejercicio 1',
    );

    const theory = complete();
    const first = theory.exercises[0];
    if (first?.kind === 'value') first.points = { ...theory.initialScene.points };
    expect(completenessProblems(theory).join('\n')).toContain('los mismos datos que la teoría');

    const unbalanced = complete();
    const last = unbalanced.exercises[8];
    if (last) last.difficulty = 1;
    expect(completenessProblems(unbalanced).join('\n')).toContain('el nivel 3 tiene 2');
  });
});

describe('detecta los fallos que debe detectar', () => {
  const lesson = lessonNamed('tres-metodos');
  const exercise = lesson.exercises[0];
  if (exercise?.kind !== 'value') throw new Error('Se esperaba un ejercicio de medida');

  it('el ejercicio de ejemplo está limpio', () => {
    expect(exerciseProblems(lesson, exercise)).toEqual([]);
  });

  it('una respuesta que no es la del motor', () => {
    const bad = { ...exercise, answer: 70 };
    expect(exerciseProblems(lesson, bad).join('\n')).toContain('el motor calcula');
  });

  it('un marcador sin resolver, o que no existe', () => {
    const bad = structuredClone(exercise);
    const step = bad.solution?.[0];
    if (step) step.narration = 'AB mide {inventado}.';
    expect(textProblems(lesson, bad).join('\n')).toContain('{inventado}');
  });

  it('una medida escrita a mano que no es dato del enunciado', () => {
    const bad = structuredClone(exercise);
    const step = bad.solution?.[0];
    if (step) step.narration = 'AB mide 61,8 mm.';
    expect(textProblems(lesson, bad).join('\n')).toContain('escrito a mano');
  });

  it('una pista repetida o igual que la idea clave', () => {
    const bad = structuredClone(exercise);
    bad.hints = ['Una pista.', 'Una pista.', 'Otra.'];
    expect(textProblems(lesson, bad).join('\n')).toContain('repite la pista 1');
    const idea = bad.solution?.find((s) => s.part === 'idea');
    if (idea) bad.hints = ['Una.', 'Dos.', idea.narration];
    expect(textProblems(lesson, bad).join('\n')).toContain('repite la idea clave');
  });

  it('una capa de un motor que el ejercicio no usa, o de un punto que no existe', () => {
    const bad = structuredClone(exercise);
    const step = bad.solution?.[0];
    if (step) step.sheet = [...step.sheet, 'seccion-vm', 'proyecciones:Z'];
    const text = exerciseProblems(lesson, bad).join('\n');
    expect(text).toContain('«seccion-vm» es del motor «solidos»');
    expect(text).toContain('«Z»');
  });

  it('un paso con una cámara isométrica sin axonometría', () => {
    const bad = structuredClone(exercise);
    const step = bad.solution?.[0];
    if (step) step.camera = 'isometric';
    expect(exerciseProblems(lesson, bad).join('\n')).toContain('isométrica');
  });
});

describe('marcadores', () => {
  it('se resuelven con el formato de la aplicación', () => {
    const lesson = lessonNamed('tres-metodos');
    const exercise = lesson.exercises[0];
    if (!exercise) throw new Error('Sin ejercicio');
    const values = exerciseMarkers(lesson, exercise);
    expect(values.respuesta).toBe('61,8 mm');
    expect(values.cotaA).toBe('15 mm');
    expect(resolveMarkers('AB mide {respuesta}; {nada}.', values)).toBe('AB mide 61,8 mm; {nada}.');
    expect(markersIn('{respuesta} y {proyH}')).toEqual(['respuesta', 'proyH']);
    expect(hasUnresolved('AB mide {nada}')).toBe(true);
    expect(hasUnresolved('AB mide 61,8 mm')).toBe(false);
  });
});

describe('magnitudes del cono y el cilindro', () => {
  const lesson = lessonNamed('cono-cilindro');
  const byMagnitud = (m: string) => {
    const found = lesson.exercises.find((e) => e.kind === 'value' && e.magnitud === m);
    if (found?.kind !== 'value') throw new Error(`Sin ejercicio de ${m}`);
    return found;
  };

  it('el punto de la superficie y la cuerda se comprueban con el motor', () => {
    for (const magnitud of ['alejamientoPunto', 'cotaPunto', 'cuerda']) {
      const exercise = byMagnitud(magnitud);
      expect(exerciseProblems(lesson, exercise), magnitud).toEqual([]);
      const wrong = { ...exercise, answer: exercise.answer + 5 };
      expect(exerciseProblems(lesson, wrong).join(' | '), magnitud).toContain('el motor calcula');
    }
  });

  it('los marcadores del punto y de la cuerda se resuelven con el formato de la aplicación', () => {
    const point = exerciseMarkers(lesson, byMagnitud('alejamientoPunto'));
    expect(point.respuesta).toMatch(/ mm$/);
    expect(point.alejPunto).toBe(point.respuesta);
    expect(exerciseMarkers(lesson, byMagnitud('cuerda')).cuerda).toBe('42,7 mm');
  });

  it('una sección curva rechaza el lado menor y el perímetro', () => {
    const exercise = byMagnitud('ladoMayor');
    const bad = { ...exercise, magnitud: 'perimetro' as const };
    expect(exerciseProblems(lesson, bad).join(' | ')).toContain('solo tiene eje mayor');
  });
});
