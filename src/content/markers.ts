// Marcadores de las pistas y las soluciones: «{respuesta}», «{ladoMayor}»…
// Las narraciones no llevan cifras escritas a mano: las rellena el motor del ejercicio con el
// formato de src/ui/format.ts, de modo que valen también para las variantes con semilla.
// Sin DOM: se prueba con Vitest.
import { formatMeasure, formatMm } from '../ui/format.ts';
import { axonCoefficient, axonRealLength, axonValue } from '../engines/axonometria/answers.ts';
import { AxonStepSchema } from '../engines/axonometria/definition.ts';
import { conicValue, measuringDistances, nearestVerticalEdge } from '../engines/conica/answers.ts';
import { ConicStepSchema } from '../engines/conica/definition.ts';
import { MethodsStepSchema } from '../engines/metodos/definition.ts';
import { SolidsStepSchema } from '../engines/solidos/definition.ts';
import type { Exercise, Lesson } from './schema.ts';
import { solutionEngines } from './solutionState.ts';
import { metodosAnswer, solidosMeasures, solidosScene, solidosValue } from './variants.ts';

export type MarkerValues = Readonly<Record<string, string>>;

/** Un marcador es «{nombre}», con letras y cifras. */
const MARKER = /\{([A-Za-z][A-Za-z0-9]*)\}/g;
/** Cualquier llave que quede en un texto ya resuelto. */
const LEFTOVER = /[{}]/;

/** Nombres de marcador que aparecen en un texto. */
export function markersIn(text: string): string[] {
  return [...text.matchAll(MARKER)].map((m) => m[1] ?? '');
}

/** Sustituye los marcadores conocidos; los que no se conocen se dejan para que un test los vea. */
export function resolveMarkers(text: string, values: MarkerValues): string {
  return text.replace(MARKER, (whole, name: string) => values[name] ?? whole);
}

/** ¿Queda algún marcador sin resolver (o una llave suelta)? */
export function hasUnresolved(text: string): boolean {
  return LEFTOVER.test(text);
}

/**
 * Marcadores de un ejercicio, calculados por su motor con los datos del propio ejercicio:
 * - todos: «x», «alej» y «cota» de cada punto, por ejemplo {cotaA} → «15 mm».
 * - medida (kind «value»): {respuesta}, con su unidad.
 * - métodos: {proyH}, {proyV} (longitudes de las proyecciones del segmento), {difCota} y
 *   {difAlej} (diferencias entre sus extremos).
 * - sólidos: {ladoMayor}, {ladoMenor}, {perimetro}, {numLados} de la sección; {radio},
 *   {altura} y {lados} del sólido.
 */
export function exerciseMarkers(lesson: Lesson, exercise: Exercise): MarkerValues {
  const out: Record<string, string> = {};
  const coords = {
    ...lesson.initialScene.points,
    ...('points' in exercise ? exercise.points : {}),
  };
  for (const [id, [x, a, c]] of Object.entries(coords)) {
    out[`x${id}`] = formatMm(x);
    out[`alej${id}`] = formatMm(a);
    out[`cota${id}`] = formatMm(c);
  }
  if (exercise.kind === 'placePoint') {
    // Dónde hay que colocar el punto: x con su signo; alejamiento y cota en valor absoluto
    // (el lado de la LT y el cuadrante se dicen con palabras).
    const [x, a, c] = exercise.target;
    out.xObj = formatMm(x);
    out.alejObj = formatMm(Math.abs(a));
    out.cotaObj = formatMm(Math.abs(c));
  }
  if (exercise.kind !== 'value') return out;

  let value = exercise.answer;
  let unit: 'mm' | '°' = exercise.unit;

  if (exercise.engines?.metodos) {
    const exact = metodosAnswer(lesson, exercise);
    if (exact) ({ value, unit } = exact);
    const figure = MethodsStepSchema.parse(exercise.engines.metodos).figura;
    const p = figure?.[0] ? coords[figure[0]] : undefined;
    const q = figure?.[1] ? coords[figure[1]] : undefined;
    if (p && q) {
      out.proyH = formatMeasure(Math.hypot(q[0] - p[0], q[1] - p[1]), 'mm');
      out.proyV = formatMeasure(Math.hypot(q[0] - p[0], q[2] - p[2]), 'mm');
      out.difCota = formatMeasure(Math.abs(q[2] - p[2]), 'mm');
      out.difAlej = formatMeasure(Math.abs(q[1] - p[1]), 'mm');
    }
  }

  if (exercise.engines?.solidos) {
    const measures = solidosMeasures(exercise);
    if (measures) {
      // En el cono y el cilindro la sección es curva: solo se mide su eje mayor.
      out.ladoMayor = formatMeasure(measures.ladoMayor, 'mm');
      if (!measures.curved) {
        out.ladoMenor = formatMeasure(measures.ladoMenor, 'mm');
        out.perimetro = formatMeasure(measures.perimetro, 'mm');
        out.numLados = String(measures.numLados);
      }
    }
    const scene = solidosScene(exercise);
    if (scene?.point) {
      out.alejPunto = formatMeasure(scene.point.p.a, 'mm');
      out.cotaPunto = formatMeasure(scene.point.p.c, 'mm');
    }
    if (scene?.line?.hits) {
      const [e, s] = scene.line.hits;
      out.cuerda = formatMeasure(Math.hypot(e.x - s.x, e.a - s.a, e.c - s.c), 'mm');
    }
    const exact = solidosValue(exercise);
    if (exact !== null) {
      value = exact;
      unit = 'mm';
    }
    const solid = SolidsStepSchema.parse(exercise.engines.solidos).solido;
    out.radio = formatMeasure(solid.radio, 'mm');
    out.altura = formatMeasure(solid.altura, 'mm');
    out.lados = String(solid.lados);
  }

  if (exercise.engines?.axonometria) {
    const data = AxonStepSchema.parse(solutionEngines(lesson, exercise, -1).axonometria);
    const exact = axonValue(data, exercise.magnitud);
    if (exact !== null) {
      value = exact;
      unit = 'mm';
    }
    const magnitude = exercise.magnitud as Parameters<typeof axonCoefficient>[1] | undefined;
    if (magnitude) {
      // Coeficiente con tres decimales («0,816»), como se enseña, y medida real de lo dibujado.
      out.coef = String(Number(axonCoefficient(data, magnitude).toFixed(3))).replace('.', ',');
      const real = axonRealLength(data, magnitude);
      if (real !== null) out.real = formatMeasure(real, 'mm');
    }
  }

  if (exercise.engines?.conica) {
    const data = ConicStepSchema.parse(solutionEngines(lesson, exercise, -1).conica);
    const exact = conicValue(data, exercise.magnitud);
    if (exact !== null) {
      value = exact;
      unit = 'mm';
    }
    out.alturaOjo = formatMeasure(data.observador.h, 'mm');
    out.distanciaOjo = formatMeasure(data.observador.d, 'mm');
    // Fugas y puntos métricos: distancia de P a cada fuga y del ojo abatido a la fuga que se pide.
    const list = measuringDistances(data);
    const near = list[0];
    const far = list[list.length - 1];
    if (near) out.fugaCercana = formatMeasure(near.fuga, 'mm');
    if (far) out.fugaLejana = formatMeasure(far.fuga, 'mm');
    const asked = exercise.magnitud === 'metricoLejano' ? far : near;
    if (asked) out.ojoFuga = formatMeasure(asked.ojo, 'mm');
    // Altura de la arista vertical más cercana: real, profundidad y escala en el cuadro.
    const edge = nearestVerticalEdge(data);
    if (edge) {
      out.alturaReal = formatMeasure(edge.real, 'mm');
      out.profundidad = formatMeasure(edge.profundidad, 'mm');
      out.escala = String(Number((edge.dibujo / edge.real).toFixed(2))).replace('.', ',');
    }
  }

  out.respuesta = formatMeasure(value, unit);
  return out;
}

/** El ejercicio con sus pistas y sus soluciones con los marcadores ya resueltos. */
export function resolveExercise<T extends Exercise>(lesson: Lesson, exercise: T): T {
  const hasMarkers = [
    ...(exercise.hints ?? []),
    ...(exercise.solution ?? []).map((s) => s.narration),
  ].some((text) => markersIn(text).length > 0);
  if (!hasMarkers) return exercise;
  const values = exerciseMarkers(lesson, exercise);
  return {
    ...exercise,
    hints: exercise.hints?.map((h) => resolveMarkers(h, values)),
    solution: exercise.solution?.map((s) => ({
      ...s,
      narration: resolveMarkers(s.narration, values),
    })),
  };
}
