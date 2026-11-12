// Comprobaciones de los ejercicios, sin DOM. Cada función devuelve una lista de problemas
// (vacía si todo está bien) escritos para quien edita el JSON; los tests las aplican a todas
// las lecciones y la publicación se para si alguna falla.
import { ENGINE_DEFINITIONS } from '../engines/definitions.ts';
import { ErrorStepSchema, PROJECTION_REF } from '../engines/error/definition.ts';
import { MethodsStepSchema } from '../engines/metodos/definition.ts';
import { axonValue } from '../engines/axonometria/answers.ts';
import { AxonStepSchema } from '../engines/axonometria/definition.ts';
import { conicValue } from '../engines/conica/answers.ts';
import { ConicStepSchema } from '../engines/conica/definition.ts';
import { evaluateChoice } from '../engines/normalizacion/answers.ts';
import { NormStepSchema } from '../engines/normalizacion/definition.ts';
import { boundsOf } from '../engines/normalizacion/piece.ts';
import { PlaneStepSchema } from '../engines/plana/definition.ts';
import { dist, pt } from '../engines/plana/geometry.ts';
import { evaluate } from '../engines/plana/graph.ts';
import { checkCondition } from '../player/checkCondition.ts';
import { checkPlacement } from '../player/checkPlacement.ts';
import { createAppStore } from '../state/index.ts';
import { findPiece } from './pieces.ts';
import { exerciseMarkers, hasUnresolved, markersIn, resolveMarkers } from './markers.ts';
import { countSentences, type Exercise, type Lesson } from './schema.ts';
import { solutionEngines, solutionPoints } from './solutionState.ts';
import { metodosAnswer, solidosMeasures, solidosValue } from './variants.ts';

type ValueExercise = Extract<Exercise, { kind: 'value' }>;

/** Diferencia máxima entre la respuesta escrita y la que calcula el motor (redondeo a 1 decimal). */
const MARGIN: Record<'mm' | '°', number> = { mm: 0.1, '°': 0.5 };

/** Ángulos que no son datos sino conceptos («90°» de perpendicular): se pueden escribir. */
const CONCEPT_ANGLES = new Set([30, 45, 60, 90, 120, 180, 360]);

// ---------- Textos: marcadores, frases y cifras escritas a mano ----------

/** Todos los números de un valor (coordenadas, radios…), en positivo. */
function numbersIn(value: unknown, into = new Set<number>()): Set<number> {
  if (typeof value === 'number') into.add(Math.abs(value));
  else if (Array.isArray(value)) for (const v of value) numbersIn(v, into);
  else if (value && typeof value === 'object')
    for (const v of Object.values(value)) numbersIn(v, into);
  return into;
}

/** Números que aparecen escritos en un texto, con su unidad si la llevan. */
function numbersWritten(text: string): { value: number; unit: string; text: string }[] {
  const withoutMarkers = text.replace(/\{[^}]*\}/g, ' ');
  return [...withoutMarkers.matchAll(/(\d+(?:[.,]\d+)?)\s*(mm|°)?/g)].map((m) => ({
    value: Number((m[1] ?? '').replace(',', '.')),
    unit: m[2] ?? '',
    text: m[0].trim(),
  }));
}

/**
 * Cifras que se pueden escribir a mano en pistas y solución: las del enunciado. En un ejercicio
 * con variantes solo las del texto del enunciado (los datos cambian con la semilla); en los
 * demás, también los datos del ejercicio (puntos y motores), que son el enunciado de la lámina.
 */
function statementNumbers(lesson: Lesson, exercise: Exercise): Set<number> {
  const allowed = numbersIn(numbersWritten(exercise.prompt).map((n) => n.value));
  if (exercise.kind === 'value' && exercise.variant) return allowed;
  numbersIn(lesson.initialScene.points, allowed);
  numbersIn(lesson.initialScene.engines, allowed);
  numbersIn(exercise.engines, allowed);
  if ('points' in exercise) numbersIn(exercise.points, allowed);
  if (exercise.kind === 'placePoint') numbersIn(exercise.target, allowed);
  return allowed;
}

/** Problemas de las pistas y las narraciones de la solución de un ejercicio. */
export function textProblems(lesson: Lesson, exercise: Exercise): string[] {
  const problems: string[] = [];
  const known = exerciseMarkers(lesson, exercise);
  const allowed = statementNumbers(lesson, exercise);
  const raw = [
    ...(exercise.hints ?? []).map((text, i) => ({ where: `pista ${i + 1}`, text })),
    ...(exercise.solution ?? []).map((s, i) => ({
      where: `solución, paso ${i + 1} (${s.part})`,
      text: s.narration,
    })),
  ];

  for (const { where, text } of raw) {
    for (const name of markersIn(text)) {
      if (!(name in known)) {
        problems.push(`${where}: el marcador {${name}} no existe para este ejercicio`);
      }
    }
    const resolved = resolveMarkers(text, known);
    if (hasUnresolved(resolved)) problems.push(`${where}: queda un marcador sin resolver`);
    if (countSentences(resolved) > 2) problems.push(`${where}: más de 2 frases`);
    for (const n of numbersWritten(text)) {
      const isMeasure = n.unit !== '' || String(n.value).length >= 2;
      if (!isMeasure) continue;
      if (allowed.has(n.value)) continue;
      if (n.unit === '°' && CONCEPT_ANGLES.has(n.value)) continue;
      problems.push(
        `${where}: «${n.text}» está escrito a mano y no es un dato del enunciado; usa un marcador`,
      );
    }
  }

  // Pistas: exactamente 3, distintas entre sí y de la idea clave de la solución.
  const hints = (exercise.hints ?? []).map((h) => resolveMarkers(h, known));
  if (exercise.hints && hints.length !== 3)
    problems.push(`lleva ${hints.length} pistas y deben ser 3`);
  const normal = (text: string): string => text.toLowerCase().replace(/\s+/g, ' ').trim();
  const seen = new Map<string, number>();
  hints.forEach((h, i) => {
    const key = normal(h);
    const before = seen.get(key);
    if (before !== undefined) problems.push(`la pista ${i + 1} repite la pista ${before + 1}`);
    else seen.set(key, i);
  });
  const idea = (exercise.solution ?? []).find((s) => s.part === 'idea');
  if (idea && hints.length > 0) {
    const ideaText = normal(resolveMarkers(idea.narration, known));
    hints.forEach((h, i) => {
      if (normal(h) === ideaText)
        problems.push(`la pista ${i + 1} repite la idea clave de la solución`);
    });
  }
  return problems;
}

// ---------- Respuesta del motor ----------

/** Problemas de la respuesta escrita de un ejercicio de medida frente a la que calcula su motor. */
function valueProblems(lesson: Lesson, exercise: ValueExercise): string[] {
  if (exercise.engines?.metodos) {
    const exact = metodosAnswer(lesson, exercise);
    if (!exact) return ['el motor de métodos no puede calcular la respuesta con estos datos'];
    if (exact.unit !== exercise.unit) {
      return [`la unidad es ${exercise.unit} y el motor da ${exact.unit}`];
    }
    return Math.abs(exact.value - exercise.answer) <= MARGIN[exercise.unit]
      ? []
      : [`la respuesta es ${exercise.answer} y el motor calcula ${exact.value.toFixed(2)}`];
  }
  if (exercise.engines?.solidos) {
    if (exercise.unit !== 'mm') return ['las medidas de los sólidos van en mm'];
    const measures = solidosMeasures(exercise);
    if (exercise.magnitud) {
      if (measures?.curved && ['ladoMenor', 'perimetro'].includes(exercise.magnitud)) {
        return ['una sección curva solo tiene eje mayor (magnitud ladoMayor)'];
      }
      const exact = solidosValue(exercise);
      if (exact === null) {
        return [`el motor no puede calcular «${exercise.magnitud}» con estos datos`];
      }
      return Math.abs(exact - exercise.answer) <= MARGIN.mm
        ? []
        : [`la respuesta es ${exercise.answer} y el motor calcula ${exact.toFixed(2)}`];
    }
    if (!measures) return ['el motor de sólidos no obtiene la sección con estos datos'];
    // Sin magnitud indicada: vale que sea alguno de los lados (o el eje mayor, si es curva).
    return measures.lados.some((side) => Math.abs(side - exercise.answer) <= MARGIN.mm)
      ? []
      : [`la respuesta ${exercise.answer} no coincide con ningún lado de la sección`];
  }
  if (exercise.engines?.axonometria || exercise.engines?.conica) {
    const merged = solutionEngines(lesson, exercise, -1);
    const exact = exercise.engines.axonometria
      ? axonValue(AxonStepSchema.parse(merged.axonometria), exercise.magnitud)
      : conicValue(ConicStepSchema.parse(merged.conica), exercise.magnitud);
    if (exact === null) {
      return [
        `el motor no puede calcular «${exercise.magnitud ?? 'sin magnitud'}» con estos datos`,
      ];
    }
    if (exercise.unit !== 'mm') return ['las medidas del dibujo van en mm'];
    return Math.abs(exact - exercise.answer) <= MARGIN.mm
      ? []
      : [`la respuesta es ${exercise.answer} y el motor calcula ${exact.toFixed(2)}`];
  }
  return [];
}

/** Problemas de un ejercicio de motor (plana): el punto que se mueve debe poder llegar al objetivo. */
function planaProblems(lesson: Lesson, exercise: Extract<Exercise, { kind: 'engine' }>): string[] {
  const common = solutionEngines(lesson, exercise, -1).plana;
  if (!common) return [];
  const data = PlaneStepSchema.parse(common);
  const answer = data.respuesta;
  if (!answer) return [];
  const problems: string[] = [];
  const all = evaluate(data.objetos ?? []);
  const targets = Array.isArray(answer.objetivo) ? answer.objetivo : [answer.objetivo];
  for (const id of targets) {
    if (all.get(id)?.value?.kind !== 'point') problems.push(`el objetivo ${id} no es un punto`);
  }
  if (all.get(answer.mover)?.value?.kind !== 'point') {
    problems.push(`el punto que se mueve (${answer.mover}) no es un punto`);
  }
  if (!exercise.solution || problems.length > 0) return problems;

  // El estado final de la solución debe tener el punto sobre el objetivo.
  const last = exercise.solution.length - 1;
  const end = PlaneStepSchema.parse(solutionEngines(lesson, exercise, last).plana);
  const positions: Record<string, [number, number]> = {};
  for (const [id, p] of Object.entries(end.posiciones ?? {})) positions[id] = [...p];
  const evaluated = evaluate(end.objetos ?? [], positions, { ...end.parametros });
  const at = (id: string) => {
    const v = evaluated.get(id)?.value;
    return v?.kind === 'point' ? v.p : null;
  };
  const moved = at(answer.mover);
  const goals = targets.map(at).filter((p): p is NonNullable<typeof p> => p !== null);
  const best =
    moved && goals.length > 0 ? Math.min(...goals.map((g) => dist(g, pt(moved.x, moved.y)))) : NaN;
  if (!(best <= answer.tolerancia)) {
    problems.push(
      `al final de la solución, ${answer.mover} no está sobre el objetivo (a ${Number.isNaN(best) ? '?' : best.toFixed(1)} mm; tolerancia ${answer.tolerancia} mm)`,
    );
  }
  return problems;
}

/** Ejercicio de normalización: las opciones son coherentes con la pieza y la solución acierta. */
function normProblems(lesson: Lesson, exercise: Extract<Exercise, { kind: 'engine' }>): string[] {
  const raw = solutionEngines(lesson, exercise, -1).normalizacion;
  if (!raw) return [];
  const data = NormStepSchema.parse(raw);
  const ex = data.ejercicio;
  if (!ex) return [];
  const problems: string[] = [];
  const piece = data.pieza ? findPiece(data.pieza) : undefined;
  if (!piece) return [`la pieza «${data.pieza ?? ''}» no existe en la biblioteca`];
  switch (ex.tipo) {
    case 'vistaQueFalta': {
      if (!data.pieza || !ex.opciones.includes(data.pieza)) {
        problems.push('entre las opciones no está la pieza del ejercicio');
      }
      if (new Set(ex.opciones).size !== ex.opciones.length) problems.push('hay opciones repetidas');
      for (const id of ex.opciones) {
        if (!findPiece(id)) problems.push(`la opción «${id}» no existe en la biblioteca`);
      }
      if (data.vistas.includes(ex.falta)) problems.push('la vista que falta ya se está dibujando');
      break;
    }
    case 'cotas': {
      if (ex.necesarias.some((i) => i >= ex.candidatas.length)) {
        problems.push('hay una cota necesaria que no está entre las candidatas');
      }
      break;
    }
    case 'corte': {
      const right = ex.opciones[ex.correcta];
      if (!right) {
        problems.push('la opción correcta del corte no existe');
        break;
      }
      // Si el enunciado habla del plano de simetría, el corte correcto pasa por el centro de la pieza.
      if (/simetr/i.test(exercise.prompt) && right.tipo !== 'quebrado') {
        const b = boundsOf(piece);
        const axis = right.vista === 'alzado' ? 1 : right.vista === 'planta' ? 2 : 0;
        const center = ((b.min[axis] ?? 0) + (b.max[axis] ?? 0)) / 2;
        if (Math.abs(right.en - center) > 0.01) {
          problems.push(
            `el corte correcto está en ${right.en} y el plano de simetría en ${center}`,
          );
        }
      }
      break;
    }
    case 'vistasNecesarias':
      break;
  }
  if (exercise.solution) {
    const last = exercise.solution.length - 1;
    const end = NormStepSchema.parse(solutionEngines(lesson, exercise, last).normalizacion);
    const result = evaluateChoice(end, findPiece);
    if (!result?.correct) problems.push('al final de la solución la elección no es la correcta');
  }
  return problems;
}

function engineProblems(lesson: Lesson, exercise: Extract<Exercise, { kind: 'engine' }>): string[] {
  return [...planaProblems(lesson, exercise), ...normProblems(lesson, exercise)];
}

/** El estado final de la solución de «colocar el punto» y de «condición» pasa la comprobación. */
function finalStateProblems(lesson: Lesson, exercise: Exercise): string[] {
  if (!exercise.solution || (exercise.kind !== 'placePoint' && exercise.kind !== 'condition')) {
    return [];
  }
  const last = exercise.solution.length - 1;
  const points = solutionPoints(lesson, exercise, last);
  if (exercise.kind === 'placePoint') {
    const p = points[exercise.point];
    if (!p) return [`la solución no coloca ${exercise.point}`];
    const result = checkPlacement(p, {
      x: exercise.target[0],
      a: exercise.target[1],
      c: exercise.target[2],
    });
    return result.correct
      ? []
      : [`al final de la solución, ${exercise.point} no está en el objetivo`];
  }
  const store = createAppStore({
    points,
    objects: lesson.initialScene.objects,
    activePoint: exercise.activePoint ?? lesson.initialScene.activePoint,
  });
  const result = checkCondition(exercise.condition, exercise.objects, store.get());
  return result.correct ? [] : ['al final de la solución no se cumple la condición del ejercicio'];
}

// ---------- Capas, objetos y cámaras que existen ----------

const OTHER_ENGINES = ENGINE_DEFINITIONS.filter((e) => e.id !== 'diedrico');
/** Capas de la escena diédrica con nombre de objeto: «proyecciones:P», «recta:r»… */
const OBJECT_PREFIXES = new Set(
  ENGINE_DEFINITIONS.find((e) => e.id === 'diedrico')?.layerPrefixes ?? [],
);

/** Motores que tienen una capa (varios pueden compartir un nombre; vacío: es del diédrico básico). */
function enginesOfLayer(tag: string): string[] {
  const [head] = tag.split(':');
  return OTHER_ENGINES.filter(
    (e) =>
      e.layerNames.includes(tag) || (tag.includes(':') && e.layerPrefixes.includes(head ?? '')),
  ).map((e) => e.id);
}

interface Scope {
  names: Set<string>;
  engines: Record<string, unknown>;
}

function layerProblems(where: string, tags: readonly string[], scope: Scope): string[] {
  const problems: string[] = [];
  for (const tag of tags) {
    const [head, id] = tag.split(':');
    if (
      id !== undefined &&
      OBJECT_PREFIXES.has(head ?? '') &&
      id !== 'objetivo' &&
      !scope.names.has(id)
    ) {
      problems.push(`${where}: la capa «${tag}» nombra «${id}», que no existe en este ejercicio`);
    }
    const owners = enginesOfLayer(tag);
    if (owners.length > 0 && owners.every((engine) => scope.engines[engine] === undefined)) {
      problems.push(
        `${where}: la capa «${tag}» es del motor «${owners.join('» o «')}», que este ejercicio no usa`,
      );
    }
  }
  return problems;
}

/** Nombres de puntos que cita el motor de métodos y que deben existir. */
function methodsNames(data: unknown): string[] {
  const parsed = MethodsStepSchema.safeParse(data);
  if (!parsed.success) return [];
  const d = parsed.data;
  return [
    ...(d.figura ?? []),
    ...(d.ejePor ? [d.ejePor] : []),
    ...(d.distancia ? [d.distancia.desde, d.distancia.hasta] : []),
    ...(d.anguloRectaPlano ? [...d.anguloRectaPlano.recta, d.anguloRectaPlano.plano] : []),
    ...(d.cono ? [d.cono.vertice] : []),
  ];
}

/** Capas, objetos y cámaras que citan el ejercicio y los pasos de su solución. */
export function namesProblems(lesson: Lesson, exercise: Exercise): string[] {
  const problems: string[] = [];
  const base = new Set<string>([
    ...Object.keys(lesson.initialScene.points),
    ...lesson.initialScene.objects.map((o) => o.id),
    ...('points' in exercise ? Object.keys(exercise.points ?? {}) : []),
    ...(exercise.kind === 'placePoint' ? [exercise.point] : []),
  ]);
  const stepsOf = exercise.solution ?? [];
  const solutionNames = new Set(base);
  for (const step of stepsOf)
    for (const id of Object.keys(step.points ?? {})) solutionNames.add(id);

  const exerciseEngines = solutionEngines(lesson, exercise, -1);
  if ('show3d' in exercise || 'sheet' in exercise) {
    problems.push(
      ...layerProblems(
        'ejercicio',
        [
          ...(('show3d' in exercise && exercise.show3d) || []),
          ...(('sheet' in exercise && exercise.sheet) || []),
        ],
        { names: base, engines: exerciseEngines },
      ),
    );
  }
  for (const id of methodsNames(exerciseEngines.metodos)) {
    if (!solutionNames.has(id))
      problems.push(`ejercicio: el motor de métodos cita «${id}», que no existe`);
  }

  stepsOf.forEach((step, i) => {
    const where = `solución, paso ${i + 1}`;
    const engines = solutionEngines(lesson, exercise, i);
    problems.push(
      ...layerProblems(where, [...step.show3d, ...step.sheet, ...step.highlight], {
        names: solutionNames,
        engines,
      }),
    );
    for (const id of methodsNames(engines.metodos)) {
      if (!solutionNames.has(id))
        problems.push(`${where}: el motor de métodos cita «${id}», que no existe`);
    }
    for (const trazo of ErrorStepSchema.safeParse(engines.error).data?.trazos ?? []) {
      for (const place of trazo.puntos) {
        const ref = typeof place === 'string' ? PROJECTION_REF.exec(place)?.[1] : undefined;
        if (ref && !solutionNames.has(ref)) {
          problems.push(`${where}: el error cita «${ref}», que no existe`);
        }
      }
    }
    if (
      step.camera === 'isometric' &&
      engines.axonometria === undefined &&
      engines.normalizacion === undefined
    ) {
      problems.push(
        `${where}: la cámara isométrica solo existe con los motores de axonometría y normalización`,
      );
    }
    if (exercise.kind === 'value' && exercise.variant && step.points) {
      problems.push(`${where}: en un ejercicio con variantes los pasos no pueden fijar puntos`);
    }
  });
  return problems;
}

// ---------- Todo junto ----------

/** Todos los problemas de coherencia de un ejercicio. */
export function exerciseProblems(lesson: Lesson, exercise: Exercise): string[] {
  const problems = [
    ...(exercise.kind === 'value' ? valueProblems(lesson, exercise) : []),
    ...(exercise.kind === 'engine' ? engineProblems(lesson, exercise) : []),
    ...finalStateProblems(lesson, exercise),
    ...namesProblems(lesson, exercise),
    ...textProblems(lesson, exercise),
  ];
  return problems;
}

// ---------- Objetivo por lección ----------

/** Ejercicios que debe tener una lección completa: 3 por nivel. */
export const EXERCISES_PER_LEVEL = 3;

/** Lo que no es dato geométrico: cómo se presenta el paso, o qué se pide. */
const PRESENTATION_KEYS = new Set([
  'metodo',
  'objetivo',
  'respuesta',
  'progreso',
  'selector',
  'mirarPlanoNuevo',
  'quitar',
  'abatir',
  'sobre',
  'desarrollo',
  'rotulos',
  'visibles',
  'trazar',
  'destacar',
  'lugar',
  'ejercicio',
  'puente3d',
  'nombre',
]);

function stripPresentation(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(stripPresentation);
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([key]) => !PRESENTATION_KEYS.has(key))
        .map(([key, v]) => [key, stripPresentation(v)]),
    );
  }
  return value;
}

/**
 * Los datos de un ejercicio: las coordenadas de los puntos que usa su motor o que mueve, y
 * los datos geométricos de sus motores. Dos ejercicios con la misma firma tienen los mismos datos.
 */
function dataSignature(
  points: Record<string, readonly [number, number, number]>,
  engines: Record<string, unknown>,
  extra: unknown = null,
): string {
  // `points` ya trae solo los puntos que cuentan; se ordenan para que la firma sea estable.
  const coords = Object.fromEntries(Object.entries(points).sort(([a], [b]) => a.localeCompare(b)));
  return JSON.stringify({ coords, engines: stripPresentation(engines), extra });
}

function exerciseSignature(lesson: Lesson, exercise: Exercise): string {
  const points = {
    ...lesson.initialScene.points,
    ...('points' in exercise ? exercise.points : {}),
  };
  const own = 'points' in exercise ? exercise.points : undefined;
  // Solo cuentan los puntos que el ejercicio cambia o que usa su motor de métodos.
  const used: Record<string, readonly [number, number, number]> = {};
  for (const id of [...Object.keys(own ?? {}), ...methodsNames(exercise.engines?.metodos)]) {
    const c = points[id];
    if (c) used[id] = c;
  }
  const engines = solutionEngines(lesson, exercise, -1);
  return dataSignature(used, engines, exercise.kind === 'placePoint' ? exercise.target : null);
}

function theorySignatures(lesson: Lesson): Set<string> {
  const out = new Set<string>();
  const points: Record<string, readonly [number, number, number]> = {
    ...lesson.initialScene.points,
  };
  for (const step of lesson.steps) {
    Object.assign(points, step.points);
    const engines = { ...lesson.initialScene.engines, ...step.engines } as Record<string, unknown>;
    const used: Record<string, readonly [number, number, number]> = {};
    for (const id of [...Object.keys(step.points ?? {}), ...methodsNames(engines.metodos)]) {
      const c = points[id];
      if (c) used[id] = c;
    }
    out.add(dataSignature(used, engines));
  }
  return out;
}

/** Lo que falta para que una lección esté completa (vacío si lo está). */
export function completenessProblems(lesson: Lesson): string[] {
  const problems: string[] = [];
  const total = EXERCISES_PER_LEVEL * 3;
  if (lesson.exercises.length !== total) {
    problems.push(`tiene ${lesson.exercises.length} ejercicios y deben ser ${total}`);
  }
  for (const level of [1, 2, 3]) {
    const n = lesson.exercises.filter((e) => e.difficulty === level).length;
    if (n !== EXERCISES_PER_LEVEL) {
      problems.push(`el nivel ${level} tiene ${n} ejercicios y deben ser ${EXERCISES_PER_LEVEL}`);
    }
  }
  const theory = theorySignatures(lesson);
  const seen = new Map<string, number>();
  lesson.exercises.forEach((exercise, i) => {
    const label = `ejercicio ${i + 1}`;
    if ((exercise.hints?.length ?? 0) !== 3) problems.push(`${label}: faltan las 3 pistas`);
    if (!exercise.solution?.length) problems.push(`${label}: falta la solución`);
    const signature = exerciseSignature(lesson, exercise);
    if (theory.has(signature)) problems.push(`${label}: usa los mismos datos que la teoría`);
    const before = seen.get(signature);
    if (before !== undefined) {
      problems.push(`${label}: usa los mismos datos que el ejercicio ${before + 1}`);
    } else seen.set(signature, i);
  });
  return problems;
}
