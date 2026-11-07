// Construcción del motor de axonometría: el sólido, su triedro, las aristas vistas y ocultas
// desde la dirección de la axonometría, el cuadro con los rayos de proyección, las vistas en
// las caras del triedro, la caja que envuelve al sólido y las circunferencias. Sin DOM.
import { createPoint, type Point } from '../../geometry/index.ts';
import { buildSolid, vertexNames, type NamedVertex } from '../solidos/construction.ts';
import {
  edges,
  edgesToward,
  faceNormal,
  vertices,
  type Polyhedron,
  type ViewEdge,
} from '../solidos/polyhedron.ts';
import type { AxonStep } from './definition.ts';
import { axisVectors, towardObserver, type AxonSpec } from './projection.ts';

export interface Circle3 {
  readonly center: Point;
  readonly radius: number;
  readonly normal: Point;
  /** Dos direcciones del plano: los lados del cuadrado circunscrito. */
  readonly e1: Point;
  readonly e2: Point;
}

export interface AxonScene {
  readonly spec: AxonSpec;
  readonly solid: Polyhedron;
  readonly names: readonly NamedVertex[];
  readonly edges: readonly ViewEdge[];
  readonly origin: Point;
  readonly axes: { readonly X: Point; readonly Y: Point; readonly Z: Point };
  readonly box: { readonly min: Point; readonly max: Point };
  /** Vistas del sólido en las tres caras del triedro (segmentos en 3D). */
  readonly views: readonly (readonly [Point, Point])[];
  /** Aristas de la caja que envuelve al sólido. */
  readonly boxEdges: readonly (readonly [Point, Point])[];
  readonly circles: readonly Circle3[];
  /** Cuadro: proyecta un punto sobre el plano de la axonometría (para los rayos en 3D). */
  readonly toCuadro: (p: Point) => Point;
  readonly cuadroCorners: readonly Point[];
  readonly notice: string | null;
}

export function specOf(data: AxonStep): AxonSpec {
  return { system: data.sistema, angleY: data.caballera.angulo, coefY: data.caballera.coeficiente };
}

export function buildAxon(data: AxonStep): AxonScene | null {
  if (!data.solido) return null;
  const spec = specOf(data);
  const solid = buildSolid(data.solido);
  const vs = vertices(solid);
  const min = createPoint(
    Math.min(...vs.map((p) => p.x)),
    Math.min(...vs.map((p) => p.a)),
    Math.min(...vs.map((p) => p.c)),
  );
  const max = createPoint(
    Math.max(...vs.map((p) => p.x)),
    Math.max(...vs.map((p) => p.a)),
    Math.max(...vs.map((p) => p.c)),
  );
  const axes = axisVectors(spec);
  // Origen del triedro en la esquina de la caja de la que salen los tres ejes.
  const origin = createPoint(axes.X.x < 0 ? max.x : min.x, axes.Y.a > 0 ? min.a : max.a, min.c);
  const o = towardObserver(spec);
  const viewEdgesList = edgesToward(solid, o);

  // Vistas en las caras del triedro: planta en el plano XY, alzado en XZ y perfil en YZ.
  const views: [Point, Point][] = [];
  for (const e of edges(solid)) {
    const a = solid.faces[e.faces[0]];
    const b = solid.faces[e.faces[1]];
    if (a?.smooth && b?.smooth) continue;
    views.push(
      [createPoint(e.p.x, e.p.a, origin.c), createPoint(e.q.x, e.q.a, origin.c)],
      [createPoint(e.p.x, origin.a, e.p.c), createPoint(e.q.x, origin.a, e.q.c)],
      [createPoint(origin.x, e.p.a, e.p.c), createPoint(origin.x, e.q.a, e.q.c)],
    );
  }

  const corners = [0, 1].flatMap((i) =>
    [0, 1].flatMap((j) =>
      [0, 1].map((k) => createPoint(i ? max.x : min.x, j ? max.a : min.a, k ? max.c : min.c)),
    ),
  );
  const boxEdges: [Point, Point][] = [];
  for (let i = 0; i < corners.length; i++) {
    for (let j = i + 1; j < corners.length; j++) {
      const p = corners[i] as Point;
      const q = corners[j] as Point;
      const diff = [p.x !== q.x, p.a !== q.a, p.c !== q.c].filter(Boolean).length;
      if (diff === 1) boxEdges.push([p, q]);
    }
  }

  // Circunferencias de las bases de conos y cilindros.
  const circles: Circle3[] = [];
  let notice: string | null = null;
  const smooth = data.solido.tipo === 'cono' || data.solido.tipo === 'cilindro';
  if (smooth && solid.axis) {
    const n = solid.axis.direction;
    const helper = Math.abs(n.c) < 0.9 ? createPoint(0, 0, 1) : createPoint(1, 0, 0);
    const e1 = norm(cross(n, helper));
    const e2 = norm(cross(n, e1));
    const r = data.solido.radio;
    const bases = data.solido.tipo === 'cilindro' ? [0, data.solido.altura] : [0];
    for (const h of bases) {
      const c = solid.axis.base;
      circles.push({
        center: createPoint(c.x + n.x * h, c.a + n.a * h, c.c + n.c * h),
        radius: r,
        normal: n,
        e1,
        e2,
      });
    }
    if (spec.system === 'caballera' && Math.abs(n.a) < 0.99) {
      notice =
        'En caballera, las circunferencias deben estar en planos frontales: apoya el sólido en el PV.';
    }
  }

  // Cuadro: plano de la axonometría detrás del sólido, y la proyección de cada punto sobre él.
  const center = createPoint((min.x + max.x) / 2, (min.a + max.a) / 2, (min.c + max.c) / 2);
  const back = 60;
  let toCuadro: (p: Point) => Point;
  let cuadroCorners: Point[];
  if (spec.system === 'caballera') {
    const planeA = min.a - back / 2;
    toCuadro = (p) => {
      const t = (p.a - planeA) / o.a;
      return createPoint(p.x - o.x * t, planeA, p.c - o.c * t);
    };
    cuadroCorners = [
      createPoint(min.x - 30, planeA, min.c - 10),
      createPoint(max.x + 40, planeA, min.c - 10),
      createPoint(max.x + 40, planeA, max.c + 40),
      createPoint(min.x - 30, planeA, max.c + 40),
    ];
  } else {
    const q0 = createPoint(center.x - o.x * back, center.a - o.a * back, center.c - o.c * back);
    toCuadro = (p) => {
      const d = (p.x - q0.x) * o.x + (p.a - q0.a) * o.a + (p.c - q0.c) * o.c;
      return createPoint(p.x - o.x * d, p.a - o.a * d, p.c - o.c * d);
    };
    // Dos direcciones del cuadro.
    const right = norm(cross(createPoint(0, 0, 1), o));
    const up = norm(cross(o, right));
    const s = 55;
    cuadroCorners = [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, 1],
    ].map(([i, j]) =>
      createPoint(
        q0.x + (right.x * (i as number) + up.x * (j as number)) * s,
        q0.a + (right.a * (i as number) + up.a * (j as number)) * s,
        q0.c + (right.c * (i as number) + up.c * (j as number)) * s,
      ),
    );
  }

  return {
    spec,
    solid,
    names: vertexNames(solid, data.solido.tipo),
    edges: viewEdgesList,
    origin,
    axes,
    box: { min, max },
    views,
    boxEdges,
    circles,
    toCuadro,
    cuadroCorners,
    notice,
  };
}

function cross(u: Point, v: Point): Point {
  return createPoint(u.a * v.c - u.c * v.a, u.c * v.x - u.x * v.c, u.x * v.a - u.a * v.x);
}

function norm(u: Point): Point {
  const l = Math.hypot(u.x, u.a, u.c) || 1;
  return createPoint(u.x / l, u.a / l, u.c / l);
}

export { faceNormal };
