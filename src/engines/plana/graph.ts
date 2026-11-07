// Grafo de construcciones: cada objeto se calcula a partir de los anteriores. Al mover un
// dato, todo lo que depende de él se recalcula. Si una construcción deja de tener solución,
// el objeto queda sin valor con un aviso breve y lo que depende de él tampoco se dibuja.
import {
  angleAt,
  angleBisector,
  arcPoint,
  capableArc,
  dist,
  intersectCircles,
  intersectLineCircle,
  intersectLines,
  linesBisector,
  lineThrough,
  mediatrix,
  mid,
  onArc,
  parallel,
  perpendicular,
  pt,
  radicalAxis,
  radicalCenter,
  sub,
  tangentPoints,
  type Arc,
  type Circle,
  type Line2,
  type Pt,
} from './geometry.ts';
import {
  conicPoint,
  conicResidual,
  conicTangent,
  ellipse,
  hyperbola,
  nearestConicParam,
  parabola,
  type Conic,
} from './conics.ts';

export type Role = 'dato' | 'auxiliar' | 'proceso' | 'resultado';

/** Definición de un objeto, tal como se escribe en la lección. */
export type ObjectDef = { id: string; rol?: Role; etiqueta?: string; oculto?: boolean } & (
  | { tipo: 'punto'; en: [number, number]; fijo?: boolean }
  | { tipo: 'puntoSobre'; sobre: string; t: number }
  | { tipo: 'recta' | 'segmento' | 'semirrecta'; por: [string, string] }
  | {
      tipo: 'circunferencia';
      centro: string;
      pasaPor?: string;
      radio?: number;
      radioDe?: [string, string];
    }
  | { tipo: 'arco'; centro: string; desde: string; hasta: string }
  | { tipo: 'interseccion'; de: [string, string]; indice?: 0 | 1 }
  | { tipo: 'puntoMedio'; de: [string, string] }
  | { tipo: 'perpendicular' | 'paralela'; a: string; por: string }
  | { tipo: 'mediatriz'; de: [string, string] }
  | {
      tipo: 'bisectriz';
      angulo?: [string, string, string];
      rectas?: [string, string];
      indice?: 0 | 1;
    }
  | { tipo: 'tangente'; desde: string; a: string; indice?: 0 | 1 }
  | { tipo: 'puntoTangencia'; desde: string; a: string; indice?: 0 | 1 }
  | { tipo: 'ejeRadical'; de: [string, string] }
  | { tipo: 'centroRadical'; de: [string, string, string] }
  | { tipo: 'arcoCapaz'; de: [string, string]; angulo: number; lado?: 1 | -1 }
  | { tipo: 'medidaAngulo'; de: [string, string, string] }
  | { tipo: 'medidaDistancia'; de: [string, string] }
  | {
      tipo: 'conica';
      clase: 'elipse' | 'hiperbola' | 'parabola';
      /** Elipse e hipérbola: sus dos focos. */
      focos?: [string, string];
      /** Parábola: foco y directriz. */
      foco?: string;
      directriz?: string;
      /** Eje mayor (elipse) o eje real (hipérbola), 2a, en mm. */
      eje?: number;
      /** Un punto de la curva (en vez del eje). */
      pasaPor?: string;
    }
  | { tipo: 'tangenteConica'; a: string; en: string }
);

export type ObjectType = ObjectDef['tipo'];

/** Valor calculado de un objeto. */
export type Value =
  | { kind: 'point'; p: Pt }
  | { kind: 'line'; line: Line2; extent: 'recta' | 'segmento' | 'semirrecta'; a?: Pt; b?: Pt }
  | { kind: 'circle'; circle: Circle }
  | { kind: 'arc'; arc: Arc }
  | { kind: 'angle'; a: Pt; v: Pt; b: Pt; degrees: number }
  | { kind: 'distance'; a: Pt; b: Pt; mm: number }
  | { kind: 'conic'; conic: Conic };

export interface Evaluated {
  readonly def: ObjectDef;
  readonly value: Value | null;
  /** Por qué no tiene valor (solo en el primero que falla; los que dependen lo heredan). */
  readonly problem: string | null;
}

export type Positions = Readonly<Record<string, readonly [number, number]>>;
export type Params = Readonly<Record<string, number>>;

/** Calcula todos los objetos en orden. `positions` y `params` vienen de lo que el alumno arrastra. */
export function evaluate(
  defs: readonly ObjectDef[],
  positions: Positions = {},
  params: Params = {},
): Map<string, Evaluated> {
  const out = new Map<string, Evaluated>();
  for (const def of defs) {
    out.set(def.id, evaluateOne(def, out, positions, params));
  }
  return out;
}

class Missing extends Error {}

function evaluateOne(
  def: ObjectDef,
  done: Map<string, Evaluated>,
  positions: Positions,
  params: Params,
): Evaluated {
  const get = (id: string): Value => {
    const e = done.get(id);
    if (!e) throw new Missing(`«${id}» no está definido antes que «${def.id}».`);
    if (!e.value) throw new Missing('');
    return e.value;
  };
  const point = (id: string): Pt => {
    const v = get(id);
    if (v.kind !== 'point') throw new Missing(`«${id}» no es un punto.`);
    return v.p;
  };
  const line = (id: string): Line2 => {
    const v = get(id);
    if (v.kind !== 'line') throw new Missing(`«${id}» no es una recta.`);
    return v.line;
  };
  const circle = (id: string): Circle => {
    const v = get(id);
    if (v.kind === 'circle') return v.circle;
    if (v.kind === 'arc') return { c: v.arc.c, r: v.arc.r };
    throw new Missing(`«${id}» no es una circunferencia.`);
  };
  const fail = (problem: string): Evaluated => ({ def, value: null, problem });
  const ok = (value: Value): Evaluated => ({ def, value, problem: null });

  try {
    switch (def.tipo) {
      case 'punto': {
        const [x, y] = positions[def.id] ?? def.en;
        return ok({ kind: 'point', p: pt(x, y) });
      }
      case 'puntoSobre': {
        const t = params[def.id] ?? def.t;
        const v = get(def.sobre);
        return ok({ kind: 'point', p: pointOn(v, t) });
      }
      case 'recta':
      case 'segmento':
      case 'semirrecta': {
        const a = point(def.por[0]);
        const b = point(def.por[1]);
        const l = lineThrough(a, b);
        if (!l)
          return fail(`Los puntos ${def.por[0]} y ${def.por[1]} coinciden: no definen una recta.`);
        return ok({ kind: 'line', line: l, extent: def.tipo, a, b });
      }
      case 'circunferencia': {
        const c = point(def.centro);
        let r: number;
        if (def.pasaPor) r = dist(c, point(def.pasaPor));
        else if (def.radioDe) r = dist(point(def.radioDe[0]), point(def.radioDe[1]));
        else r = def.radio ?? 10;
        if (r < 1e-6) return fail(`La circunferencia de centro ${def.centro} tiene radio nulo.`);
        return ok({ kind: 'circle', circle: { c, r } });
      }
      case 'arco': {
        const c = point(def.centro);
        const a = point(def.desde);
        const b = point(def.hasta);
        const r = dist(c, a);
        if (r < 1e-6) return fail('El arco tiene radio nulo.');
        const a0 = Math.atan2(a.y - c.y, a.x - c.x);
        let a1 = Math.atan2(b.y - c.y, b.x - c.x);
        while (a1 <= a0) a1 += 2 * Math.PI;
        return ok({ kind: 'arc', arc: { c, r, a0, a1 } });
      }
      case 'interseccion': {
        const [i, j] = def.de;
        const points = intersections(get(i), get(j));
        const p = points[def.indice ?? 0] ?? (def.indice === 1 ? points[0] : undefined);
        if (!p) {
          return fail(
            points.length === 0
              ? `${describe(i, done)} y ${describe(j, done)} no se cortan: no hay solución.`
              : `Solo hay un punto de corte (son tangentes).`,
          );
        }
        return ok({ kind: 'point', p });
      }
      case 'puntoMedio':
        return ok({ kind: 'point', p: mid(point(def.de[0]), point(def.de[1])) });
      case 'perpendicular':
        return ok({
          kind: 'line',
          line: perpendicular(line(def.a), point(def.por)),
          extent: 'recta',
        });
      case 'paralela':
        return ok({ kind: 'line', line: parallel(line(def.a), point(def.por)), extent: 'recta' });
      case 'mediatriz': {
        const m = mediatrix(point(def.de[0]), point(def.de[1]));
        return m
          ? ok({ kind: 'line', line: m, extent: 'recta' })
          : fail('A y B coinciden: no hay mediatriz.');
      }
      case 'bisectriz': {
        let b: Line2 | null = null;
        if (def.angulo) {
          b = angleBisector(point(def.angulo[0]), point(def.angulo[1]), point(def.angulo[2]));
        } else if (def.rectas) {
          b = linesBisector(line(def.rectas[0]), line(def.rectas[1]), def.indice ?? 0);
        }
        return b
          ? ok({ kind: 'line', line: b, extent: def.angulo ? 'semirrecta' : 'recta', a: b.p })
          : fail('Las rectas son paralelas: solo tienen una bisectriz, la paralela media.');
      }
      case 'tangente':
      case 'puntoTangencia': {
        const p = point(def.desde);
        const c = circle(def.a);
        const touch = tangentPoints(p, c);
        const q = touch[def.indice ?? 0] ?? (touch.length === 1 ? touch[0] : undefined);
        if (!q) {
          return fail(
            touch.length === 0
              ? `El punto ${def.desde} está dentro de la circunferencia: no hay tangentes.`
              : `El punto ${def.desde} está en la circunferencia: solo hay una tangente.`,
          );
        }
        if (def.tipo === 'puntoTangencia') return ok({ kind: 'point', p: q });
        // En la circunferencia, la tangente es perpendicular al radio.
        const l =
          dist(p, q) < 1e-6 ? perpendicular(lineThrough(c.c, q) as Line2, q) : lineThrough(p, q);
        return l ? ok({ kind: 'line', line: l, extent: 'recta' }) : fail('Tangente no definida.');
      }
      case 'ejeRadical': {
        const e = radicalAxis(circle(def.de[0]), circle(def.de[1]));
        return e
          ? ok({ kind: 'line', line: e, extent: 'recta' })
          : fail('Las circunferencias son concéntricas: no tienen eje radical.');
      }
      case 'centroRadical': {
        const c = radicalCenter(circle(def.de[0]), circle(def.de[1]), circle(def.de[2]));
        return c
          ? ok({ kind: 'point', p: c })
          : fail(
              'Los centros están alineados: los ejes radicales son paralelos y no hay centro radical.',
            );
      }
      case 'arcoCapaz': {
        const arc = capableArc(point(def.de[0]), point(def.de[1]), def.angulo, def.lado ?? 1);
        return arc
          ? ok({ kind: 'arc', arc })
          : fail('El arco capaz necesita dos puntos distintos.');
      }
      case 'medidaAngulo': {
        const [a, v, b] = def.de.map(point) as [Pt, Pt, Pt];
        return ok({ kind: 'angle', a, v, b, degrees: angleAt(a, v, b) });
      }
      case 'medidaDistancia': {
        const a = point(def.de[0]);
        const b = point(def.de[1]);
        return ok({ kind: 'distance', a, b, mm: dist(a, b) });
      }
      case 'conica': {
        let k: Conic | null = null;
        if (def.clase === 'parabola') {
          if (!def.foco || !def.directriz) return fail('La parábola necesita foco y directriz.');
          k = parabola(point(def.foco), line(def.directriz));
          if (!k) return fail('El foco está en la directriz: no hay parábola.');
        } else {
          if (!def.focos) return fail(`La ${def.clase} necesita sus dos focos.`);
          const f1 = point(def.focos[0]);
          const f2 = point(def.focos[1]);
          let a = (def.eje ?? 0) / 2;
          if (def.pasaPor) {
            const q = point(def.pasaPor);
            const d1 = dist(q, f1);
            const d2 = dist(q, f2);
            a = def.clase === 'elipse' ? (d1 + d2) / 2 : Math.abs(d1 - d2) / 2;
          }
          k = def.clase === 'elipse' ? ellipse(f1, f2, a) : hyperbola(f1, f2, a);
          if (!k) {
            return fail(
              def.clase === 'elipse'
                ? 'El eje mayor tiene que ser más largo que la distancia entre los focos.'
                : 'El eje real tiene que ser más corto que la distancia entre los focos.',
            );
          }
        }
        return ok({ kind: 'conic', conic: k });
      }
      case 'tangenteConica': {
        const v = get(def.a);
        if (v.kind !== 'conic') throw new Missing(`«${def.a}» no es una cónica.`);
        const p = point(def.en);
        if (conicResidual(v.conic, p) > 0.5) {
          return fail(`El punto ${def.en} no está en la cónica: no se puede trazar su tangente.`);
        }
        const l = conicTangent(v.conic, p);
        return l
          ? ok({ kind: 'line', line: l, extent: 'recta', a: p })
          : fail('En el vértice de la parábola o en un foco no se define así la tangente.');
      }
    }
  } catch (error) {
    if (error instanceof Missing) return { def, value: null, problem: error.message || null };
    throw error;
  }
}

function describe(id: string, done: Map<string, Evaluated>): string {
  const kind = done.get(id)?.value?.kind;
  if (kind === 'circle' || kind === 'arc') return `la circunferencia ${id}`;
  if (kind === 'line') return `la recta ${id}`;
  return id;
}

/** Punto de un objeto según un parámetro t de 0 a 1 (recta: en mm desde su punto). */
export function pointOn(v: Value, t: number): Pt {
  switch (v.kind) {
    case 'point':
      return v.p;
    case 'line': {
      if (v.a && v.b && v.extent === 'segmento') {
        return pt(v.a.x + (v.b.x - v.a.x) * t, v.a.y + (v.b.y - v.a.y) * t);
      }
      if (v.a && v.extent === 'semirrecta') {
        // Semirrecta: t de 0 a 1 recorre 100 mm desde su origen.
        return pt(v.a.x + v.line.d.x * t * 100, v.a.y + v.line.d.y * t * 100);
      }
      // Recta: t de 0 a 1 recorre ±80 mm alrededor de su punto.
      const s = (t - 0.5) * 160;
      return pt(v.line.p.x + v.line.d.x * s, v.line.p.y + v.line.d.y * s);
    }
    case 'circle': {
      const a = t * 2 * Math.PI;
      return pt(v.circle.c.x + v.circle.r * Math.cos(a), v.circle.c.y + v.circle.r * Math.sin(a));
    }
    case 'arc':
      return arcPoint(v.arc, t);
    case 'angle':
      return v.v;
    case 'distance':
      return v.a;
    case 'conic':
      return conicPoint(v.conic, t);
  }
}

/** Parámetro t del punto del objeto más cercano a q (para arrastrar un punto sobre un objeto). */
export function nearestParam(v: Value, q: Pt): number {
  switch (v.kind) {
    case 'line': {
      if (v.a && v.extent === 'semirrecta') {
        const s = (q.x - v.a.x) * v.line.d.x + (q.y - v.a.y) * v.line.d.y;
        return Math.max(0, Math.min(1, s / 100));
      }
      if (v.a && v.b && v.extent === 'segmento') {
        const ab = sub(v.b, v.a);
        const t = ((q.x - v.a.x) * ab.x + (q.y - v.a.y) * ab.y) / (ab.x * ab.x + ab.y * ab.y);
        return Math.max(0, Math.min(1, t));
      }
      const s = (q.x - v.line.p.x) * v.line.d.x + (q.y - v.line.p.y) * v.line.d.y;
      return Math.max(0, Math.min(1, s / 160 + 0.5));
    }
    case 'circle': {
      let a = Math.atan2(q.y - v.circle.c.y, q.x - v.circle.c.x);
      if (a < 0) a += 2 * Math.PI;
      return a / (2 * Math.PI);
    }
    case 'arc': {
      let a = Math.atan2(q.y - v.arc.c.y, q.x - v.arc.c.x);
      while (a < v.arc.a0) a += 2 * Math.PI;
      const t = (a - v.arc.a0) / (v.arc.a1 - v.arc.a0);
      if (t <= 1) return t;
      // Fuera del arco: el extremo más cercano.
      const back = (v.arc.a0 + 2 * Math.PI - a) / (v.arc.a1 - v.arc.a0);
      return back < t - 1 ? 0 : 1;
    }
    case 'conic':
      return nearestConicParam(v.conic, q);
    default:
      return 0;
  }
}

/** Puntos de corte de dos objetos, respetando segmentos, semirrectas y arcos. */
export function intersections(u: Value, v: Value): Pt[] {
  const asLine = (w: Value): Line2 | null => (w.kind === 'line' ? w.line : null);
  const asCircle = (w: Value): Circle | null =>
    w.kind === 'circle' ? w.circle : w.kind === 'arc' ? { c: w.arc.c, r: w.arc.r } : null;
  let points: Pt[] = [];
  const lu = asLine(u);
  const lv = asLine(v);
  const cu = asCircle(u);
  const cv = asCircle(v);
  if (lu && lv) {
    const x = intersectLines(lu, lv);
    points = x ? [x] : [];
  } else if (lu && cv) points = intersectLineCircle(lu, cv);
  else if (cu && lv) points = intersectLineCircle(lv, cu);
  else if (cu && cv) points = intersectCircles(cu, cv);
  return points.filter((p) => contains(u, p) && contains(v, p));
}

/** ¿Está p en el trozo dibujado del objeto (segmento, semirrecta, arco)? */
function contains(v: Value, p: Pt): boolean {
  if (v.kind === 'line' && v.a && v.extent !== 'recta') {
    const t = (p.x - v.a.x) * v.line.d.x + (p.y - v.a.y) * v.line.d.y;
    if (t < -1e-6) return false;
    if (v.extent === 'segmento' && v.b) {
      return t <= dist(v.a, v.b) + 1e-6;
    }
    return true;
  }
  if (v.kind === 'arc') return onArc(v.arc, Math.atan2(p.y - v.arc.c.y, p.x - v.arc.c.x));
  return true;
}

/** Primer aviso de la construcción (lo que no tiene solución), si lo hay. */
export function firstProblem(evaluated: Map<string, Evaluated>): string | null {
  for (const e of evaluated.values()) if (e.problem) return e.problem;
  return null;
}
