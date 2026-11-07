import { describe, expect, it } from 'vitest';
import { createPoint, type Point } from '../../geometry/index.ts';
import {
  clip,
  conicKind,
  cube,
  edges,
  faceNormal,
  frustum,
  lineHits,
  linePieces,
  octahedron,
  planeThrough,
  polygonArea,
  prism,
  pyramid,
  section,
  SMOOTH_SEGMENTS,
  supportFrame,
  surfacePoint,
  tetrahedron,
  unfold,
  unfoldTree,
  vertices,
  viewEdges,
  type CutPlane,
  type Polyhedron,
} from './polyhedron.ts';

const P = (x: number, a: number, c: number): Point => createPoint(x, a, c);
const onPH = supportFrame('PH', [0, 30], 0);
const horizontal = (c: number): CutPlane => ({ normal: P(0, 0, 1), d: c });

const solids: Record<string, Polyhedron> = {
  tetraedro: tetrahedron(onPH, 40),
  cubo: cube(onPH, 30),
  octaedro: octahedron(onPH, 30),
  'prisma pentagonal': prism(onPH, 5, 20, 40),
  'pirámide hexagonal': pyramid(onPH, 6, 20, 45),
  'tronco cuadrado': frustum(onPH, 4, 25, 12, 30),
  cono: pyramid(onPH, SMOOTH_SEGMENTS, 20, 45, true),
  cilindro: prism(onPH, SMOOTH_SEGMENTS, 20, 40, true),
};

describe('fórmula de Euler: V − A + C = 2', () => {
  for (const [name, poly] of Object.entries(solids)) {
    it(name, () => {
      const V = vertices(poly).length;
      const E = edges(poly).length;
      const F = poly.faces.length;
      expect(V - E + F).toBe(2);
    });
  }

  it('números de caras, aristas y vértices de los poliedros regulares', () => {
    const count = (p: Polyhedron) => [p.faces.length, edges(p).length, vertices(p).length];
    expect(count(solids.tetraedro as Polyhedron)).toEqual([4, 6, 4]);
    expect(count(solids.cubo as Polyhedron)).toEqual([6, 12, 8]);
    expect(count(solids.octaedro as Polyhedron)).toEqual([8, 12, 6]);
  });

  it('todas las aristas de los regulares miden lo mismo', () => {
    for (const name of ['tetraedro', 'cubo', 'octaedro']) {
      const poly = solids[name] as Polyhedron;
      const lengths = edges(poly).map((e) =>
        Math.hypot(e.p.x - e.q.x, e.p.a - e.q.a, e.p.c - e.q.c),
      );
      for (const l of lengths) expect(l).toBeCloseTo(lengths[0] ?? 0, 9);
    }
  });
});

describe('colocación PAU', () => {
  it('tetraedro y cubo apoyados en una cara sobre el PH', () => {
    for (const name of ['tetraedro', 'cubo']) {
      const poly = solids[name] as Polyhedron;
      const low = vertices(poly).filter((p) => Math.abs(p.c) < 1e-9);
      expect(low.length).toBe(name === 'cubo' ? 4 : 3);
    }
  });

  it('octaedro con una diagonal perpendicular al PH', () => {
    const vs = vertices(solids.octaedro as Polyhedron);
    const bottom = vs.filter((p) => Math.abs(p.c) < 1e-9);
    const top = vs.filter((p) => p.c > 40);
    expect(bottom).toHaveLength(1);
    expect(top).toHaveLength(1);
    expect(top[0]?.x).toBeCloseTo(bottom[0]?.x ?? NaN, 9);
    expect(top[0]?.a).toBeCloseTo(bottom[0]?.a ?? NaN, 9);
    // La diagonal mide arista · √2.
    expect((top[0]?.c ?? 0) - (bottom[0]?.c ?? 0)).toBeCloseTo(30 * Math.SQRT2, 9);
  });

  it('normales hacia fuera', () => {
    const poly = solids.cubo as Polyhedron;
    const base = poly.faces.find((f) => f.points.every((p) => Math.abs(p.c) < 1e-9));
    expect(base && faceNormal(base).c).toBeCloseTo(-1, 9);
  });
});

describe('visibilidad', () => {
  it('cubo en planta: se ven las 4 aristas de arriba y se ocultan las de abajo, que coinciden', () => {
    const plan = viewEdges(solids.cubo as Polyhedron, 'plan');
    const top = plan.filter((e) => e.p.c > 1 && e.q.c > 1);
    const bottom = plan.filter((e) => e.p.c < 1 && e.q.c < 1);
    expect(top.every((e) => e.visible)).toBe(true);
    // Las de abajo tocan una cara lateral vertical (de canto): cuentan como vistas.
    expect(bottom).toHaveLength(4);
  });

  it('pirámide en alzado: las aristas de detrás son ocultas', () => {
    const poly = pyramid(supportFrame('PH', [0, 30], 20), 4, 20, 40);
    const elevation = viewEdges(poly, 'elevation');
    expect(elevation.some((e) => !e.visible)).toBe(true);
    expect(elevation.some((e) => e.visible)).toBe(true);
  });

  it('cono: solo se dibujan las dos generatrices de contorno y la base', () => {
    const elevation = viewEdges(solids.cono as Polyhedron, 'elevation');
    const generatrices = elevation.filter((e) => e.p.c > 1 || e.q.c > 1);
    expect(generatrices).toHaveLength(2);
    expect(generatrices.every((e) => e.contour && e.visible)).toBe(true);
  });
});

describe('secciones', () => {
  it('cubo cortado por un plano horizontal: un cuadrado de lado la arista', () => {
    const s = section(solids.cubo as Polyhedron, horizontal(12));
    expect(s?.polygon).toHaveLength(4);
    expect(polygonArea(s?.polygon ?? [])).toBeCloseTo(900, 6);
  });

  it('pirámide cortada a media altura: polígono semejante con razón 1/2', () => {
    const poly = solids['pirámide hexagonal'] as Polyhedron;
    const base = polygonArea(poly.faces.find((f) => f.kind === 'base')?.points ?? []);
    const s = section(poly, horizontal(22.5));
    expect(polygonArea(s?.polygon ?? [])).toBeCloseTo(base / 4, 6);
  });

  it('cubo cortado por un plano diagonal: rectángulo de lados e y e·√2', () => {
    const e = 30;
    const poly = cube(supportFrame('PH', [0, 0], 0), e);
    const vs = vertices(poly);
    const xs = vs.map((p) => p.x);
    const as = vs.map((p) => p.a);
    const [x0, x1, a0, a1] = [Math.min(...xs), Math.max(...xs), Math.min(...as), Math.max(...as)];
    // Plano vertical por la diagonal de la planta.
    const plane = planeThrough(P(x0, a0, 0), P(x1, a1, 0), P(x0, a0, 10));
    if (!plane) throw new Error('sin plano');
    const s = section(poly, plane);
    expect(polygonArea(s?.polygon ?? [])).toBeCloseTo(e * e * Math.SQRT2, 6);
  });

  it('cilindro cortado perpendicular al eje: área del círculo (aproximado)', () => {
    const s = section(solids.cilindro as Polyhedron, horizontal(20));
    const exact = Math.PI * 400;
    const approx = (SMOOTH_SEGMENTS / 2) * 400 * Math.sin((2 * Math.PI) / SMOOTH_SEGMENTS);
    expect(polygonArea(s?.polygon ?? [])).toBeCloseTo(approx, 6);
    expect(Math.abs(approx - exact) / exact).toBeLessThan(0.01);
  });

  it('recortar: el tronco tiene la sección como cara nueva y sigue cumpliendo Euler', () => {
    const poly = solids['pirámide hexagonal'] as Polyhedron;
    const plane = planeThrough(P(-30, 0, 10), P(30, 0, 30), P(-30, 60, 10));
    if (!plane) throw new Error('sin plano');
    const cut = clip(poly, plane);
    expect(cut?.faces.some((f) => f.kind === 'cap')).toBe(true);
    if (!cut) return;
    expect(vertices(cut).length - edges(cut).length + cut.faces.length).toBe(2);
    expect(cut.apex).toBeNull();
  });

  it('tipo de cónica según el ángulo del plano con el eje', () => {
    const up = P(0, 0, 1);
    const half = 30;
    const tilt = (deg: number): Point => {
      // Normal de un plano que forma `deg` grados con el eje vertical.
      const t = (deg * Math.PI) / 180;
      return P(Math.cos(t), 0, -Math.sin(t));
    };
    expect(conicKind(up, P(0, 0, 1), half, false).kind).toBe('circunferencia');
    expect(conicKind(up, tilt(60), half, false).kind).toBe('elipse');
    expect(conicKind(up, tilt(30), half, false).kind).toBe('parábola');
    expect(conicKind(up, tilt(10), half, false).kind).toBe('hipérbola');
    expect(conicKind(up, tilt(10), half, true).kind).toBe('rectas');
    expect(conicKind(up, tilt(50), 0, false).kind).toBe('elipse');
    expect(conicKind(up, tilt(0), 0, false).kind).toBe('rectángulo');
  });
});

describe('recta y sólido', () => {
  it('entrada y salida de una recta horizontal que atraviesa el cubo', () => {
    const poly = cube(supportFrame('PH', [0, 30], 0), 30);
    const hits = lineHits(poly, P(-50, 30, 10), P(50, 30, 10));
    expect(hits?.[0].x).toBeCloseTo(-15, 9);
    expect(hits?.[1].x).toBeCloseTo(15, 9);
  });

  it('sin intersección si pasa por encima', () => {
    expect(lineHits(solids.cubo as Polyhedron, P(-50, 30, 50), P(50, 30, 50))).toBeNull();
  });

  it('en planta, el tramo por debajo del cubo queda oculto y el de dentro no se dibuja', () => {
    const poly = cube(supportFrame('PH', [0, 30], 0), 30);
    const pieces = linePieces(poly, P(-50, 30, 10), P(50, 30, 10), 'plan');
    // Dentro del cubo no se dibuja; fuera, se ve.
    expect(pieces.every((p) => p.visible)).toBe(true);
    const drawn = pieces.reduce((s, p) => s + Math.abs(p.q.x - p.p.x), 0);
    expect(drawn).toBeCloseTo(70, 0);
    // Una recta que pasa por debajo del voladizo... aquí, por detrás en alzado:
    const behind = linePieces(poly, P(-50, 0, 10), P(50, 0, 10), 'elevation');
    expect(behind.some((p) => !p.visible)).toBe(true);
  });
});

describe('puntos sobre la superficie', () => {
  it('desde la planta, el punto visto está en la cara de arriba de la pirámide', () => {
    const poly = pyramid(supportFrame('PH', [0, 30], 0), 4, 20, 40);
    const p = surfacePoint(poly, 'horizontal', 5, 30, 'visto');
    const q = surfacePoint(poly, 'horizontal', 5, 30, 'oculto');
    expect(p?.c).toBeGreaterThan(0);
    expect(q?.c).toBeCloseTo(0, 9); // el oculto, en la base
  });
});

describe('desarrollos', () => {
  for (const name of [
    'cubo',
    'tetraedro',
    'octaedro',
    'prisma pentagonal',
    'pirámide hexagonal',
    'cono',
    'cilindro',
  ]) {
    it(`${name}: el desarrollo es plano, conserva las caras y se pliega de vuelta`, () => {
      const poly = solids[name] as Polyhedron;
      const tree = unfoldTree(poly);
      expect(tree).not.toBeNull();
      if (!tree) return;
      const flat = unfold(poly, tree, 1);
      const base = poly.faces.findIndex((f) => f.kind === 'base');
      const ref = flat[base >= 0 ? base : 0]?.[0];
      const refC = ref?.c ?? 0;
      const allBase = name === 'octaedro' || name === 'tetraedro' || name === 'cubo';
      for (const [i, face] of flat.entries()) {
        // Plano: todos los puntos a la altura del plano de la cara fija.
        if (!allBase || name !== 'octaedro') {
          for (const p of face) expect(p.c).toBeCloseTo(refC, 6);
        }
        // Cada cara conserva su forma (área).
        expect(polygonArea(face)).toBeCloseTo(polygonArea(poly.faces[i]?.points ?? []), 6);
      }
      // Con t = 0, el sólido plegado.
      const folded = unfold(poly, tree, 0);
      for (const [i, face] of folded.entries()) {
        face.forEach((p, j) => {
          const q = poly.faces[i]?.points[j];
          expect(p.x).toBeCloseTo(q?.x ?? NaN, 9);
          expect(p.c).toBeCloseTo(q?.c ?? NaN, 9);
        });
      }
    });
  }

  it('las caras vecinas comparten la bisagra también en el desarrollo (cierra)', () => {
    const poly = solids['prisma pentagonal'] as Polyhedron;
    const tree = unfoldTree(poly);
    if (!tree) throw new Error('sin árbol');
    const flat = unfold(poly, tree, 1);
    for (const step of tree) {
      if (step.parent < 0) continue;
      const child = flat[step.face] ?? [];
      const parent = flat[step.parent] ?? [];
      const shared = child.filter((p) =>
        parent.some((q) => Math.hypot(p.x - q.x, p.a - q.a, p.c - q.c) < 1e-6),
      );
      expect(shared.length).toBeGreaterThanOrEqual(2);
    }
  });

  it('el tronco de una pirámide cortada también se desarrolla', () => {
    const poly = solids['pirámide hexagonal'] as Polyhedron;
    const plane = planeThrough(P(-30, 0, 10), P(30, 0, 30), P(-30, 60, 10));
    if (!plane) throw new Error('sin plano');
    const cut = clip(poly, plane);
    if (!cut) throw new Error('sin tronco');
    const tree = unfoldTree(cut);
    expect(tree).not.toBeNull();
    if (!tree) return;
    const flat = unfold(cut, tree, 1);
    for (const face of flat) for (const p of face) expect(p.c).toBeCloseTo(0, 6);
  });
});
