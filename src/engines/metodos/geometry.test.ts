import { describe, expect, it } from 'vitest';
import { createPlane, createPoint, type Point } from '../../geometry/index.ts';
import { distance } from '../../geometry/vector.ts';
import {
  angleAt,
  angleLinePlane,
  angleWithPH,
  angleWithPV,
  changedProjection,
  coneOfLines,
  conePoint,
  footOnLine,
  footOnPlane,
  foldPoint,
  hingeFor,
  linePlaneIntersection,
  newProjectionSide,
  parallelGroundLine,
  projectingPlane,
  projectOntoNewPlane,
  rotateAboutAxisKind,
  sheetH,
  straighteningAngle,
  tangentPlane,
  toDeg,
  angleLinePlane as lineToPlane,
} from './geometry.ts';

const P = (x: number, a: number, c: number): Point => createPoint(x, a, c);
const close = (p: Point, q: Point, digits = 6): void => {
  expect(p.x).toBeCloseTo(q.x, digits);
  expect(p.a).toBeCloseTo(q.a, digits);
  expect(p.c).toBeCloseTo(q.c, digits);
};

// Segmento oblicuo de referencia: |AB| = √(40² + 20² + 30²) = √2900 ≈ 53,85 mm.
const A = P(-20, 10, 10);
const B = P(20, 30, 40);
const AB = Math.sqrt(2900);

describe('giro', () => {
  it('eje vertical: el segmento queda frontal y conserva su longitud y su cota', () => {
    const theta = straighteningAngle('vertical', A, B);
    const A1 = rotateAboutAxisKind(A, 'vertical', A, theta);
    const B1 = rotateAboutAxisKind(B, 'vertical', A, theta);
    expect(B1.a - A1.a).toBeCloseTo(0, 9); // paralelo al PV
    expect(B1.c).toBeCloseTo(B.c, 9); // la cota no cambia
    expect(distance(A1, B1)).toBeCloseTo(AB, 9);
    // En el alzado, A″₁B″₁ mide la verdadera magnitud y forma con la LT el ángulo con el PH.
    const vm = Math.hypot(B1.x - A1.x, B1.c - A1.c);
    expect(vm).toBeCloseTo(AB, 9);
    expect(toDeg(Math.atan2(Math.abs(B1.c - A1.c), Math.abs(B1.x - A1.x)))).toBeCloseTo(
      angleWithPH(A, B),
      9,
    );
  });

  it('eje de punta: el segmento queda horizontal y conserva el alejamiento', () => {
    const theta = straighteningAngle('punta', A, B);
    const A1 = rotateAboutAxisKind(A, 'punta', A, theta);
    const B1 = rotateAboutAxisKind(B, 'punta', A, theta);
    expect(B1.c - A1.c).toBeCloseTo(0, 9);
    expect(B1.a).toBeCloseTo(B.a, 9);
    expect(Math.hypot(B1.x - A1.x, B1.a - A1.a)).toBeCloseTo(AB, 9);
  });

  it('elige el giro más corto (menos de 90°)', () => {
    expect(Math.abs(straighteningAngle('vertical', A, B))).toBeLessThanOrEqual(Math.PI / 2);
    expect(Math.abs(straighteningAngle('vertical', B, A))).toBeLessThanOrEqual(Math.PI / 2);
  });
});

describe('cambio de plano', () => {
  it('vertical con LT₁ paralela a A′B′: A″₁B″₁ es la verdadera magnitud', () => {
    const lt = parallelGroundLine('vertical', A, B);
    const side = newProjectionSide(lt, sheetH(A));
    const a1 = changedProjection(A, lt, side);
    const b1 = changedProjection(B, lt, side);
    expect(Math.hypot(b1.x - a1.x, b1.y - a1.y)).toBeCloseTo(AB, 9);
  });

  it('horizontal con LT₁ paralela a A″B″: A′₁B′₁ es la verdadera magnitud', () => {
    const lt = parallelGroundLine('horizontal', A, B);
    const side = newProjectionSide(lt, { x: A.x, y: A.c });
    const a1 = changedProjection(A, lt, side);
    const b1 = changedProjection(B, lt, side);
    expect(Math.hypot(b1.x - a1.x, b1.y - a1.y)).toBeCloseTo(AB, 9);
  });

  it('la nueva proyección está a una distancia de la LT₁ igual a la cota', () => {
    const lt = parallelGroundLine('vertical', A, B, 10);
    const side = newProjectionSide(lt, sheetH(A));
    const b1 = changedProjection(B, lt, side);
    // Distancia de b1 a la recta LT₁.
    const ux = lt.p2.x - lt.p1.x;
    const uy = lt.p2.y - lt.p1.y;
    const d = Math.abs((b1.x - lt.p1.x) * uy - (b1.y - lt.p1.y) * ux) / Math.hypot(ux, uy);
    expect(d).toBeCloseTo(B.c, 9);
  });

  it('en el espacio, la proyección sobre el plano nuevo conserva la cota', () => {
    const lt = parallelGroundLine('vertical', A, B);
    const q = projectOntoNewPlane(B, lt);
    expect(q.c).toBeCloseTo(B.c, 9);
  });

  it('la LT₁ queda fuera de la LT original (planta hacia abajo)', () => {
    const lt = parallelGroundLine('vertical', A, B);
    const mid = (lt.p1.y + lt.p2.y) / 2;
    expect(mid).toBeLessThan((sheetH(A).y + sheetH(B).y) / 2);
  });
});

describe('abatimiento', () => {
  const C = P(10, 40, 5);
  const alpha = createPlane(A, B, C);

  it('sobre el PH: los puntos abatidos tienen cota 0 y la figura conserva sus medidas', () => {
    const hinge = hingeFor(alpha, 'PH');
    expect(hinge).not.toBeNull();
    if (!hinge) return;
    const [a, b, c] = [A, B, C].map((p) => foldPoint(p, hinge, 1)) as [Point, Point, Point];
    for (const q of [a, b, c]) expect(q.c).toBeCloseTo(0, 9);
    expect(distance(a, b)).toBeCloseTo(distance(A, B), 9);
    expect(distance(b, c)).toBeCloseTo(distance(B, C), 9);
    expect(angleAt(a, b, c)).toBeCloseTo(angleAt(A, B, C), 9);
  });

  it('sobre el PV: alejamiento 0 y medidas conservadas', () => {
    const hinge = hingeFor(alpha, 'PV');
    if (!hinge) throw new Error('sin charnela');
    const [a, b] = [A, B].map((p) => foldPoint(p, hinge, 1)) as [Point, Point];
    expect(a.a).toBeCloseTo(0, 9);
    expect(b.a).toBeCloseTo(0, 9);
    expect(distance(a, b)).toBeCloseTo(AB, 9);
  });

  it('la charnela es la traza: sus puntos no se mueven', () => {
    const hinge = hingeFor(alpha, 'PH');
    if (!hinge) throw new Error('sin charnela');
    expect(hinge.origin.c).toBeCloseTo(0, 9);
    close(foldPoint(hinge.origin, hinge, 1), hinge.origin);
  });

  it('giro más corto: el abatido queda en la perpendicular por la proyección, más allá', () => {
    const hinge = hingeFor(alpha, 'PH');
    if (!hinge) throw new Error('sin charnela');
    const b = foldPoint(B, hinge, 1);
    expect(Math.abs(hinge.angle)).toBeLessThanOrEqual(Math.PI / 2 + 1e-9);
    // (B), B′ y el pie en la charnela están alineados.
    const foot = footOnLine(
      createPoint(B.x, B.a, 0),
      hinge.origin,
      add3(hinge.origin, hinge.direction),
    );
    const u = { x: b.x - foot.x, a: b.a - foot.a };
    const v = { x: B.x - foot.x, a: B.a - foot.a };
    expect(u.x * v.a - u.a * v.x).toBeCloseTo(0, 6);
    expect(Math.hypot(u.x, u.a)).toBeGreaterThan(Math.hypot(v.x, v.a));
  });

  it('un plano horizontal no tiene charnela sobre el PH', () => {
    expect(hingeFor(createPlane(P(0, 0, 10), P(10, 0, 10), P(0, 10, 10)), 'PH')).toBeNull();
  });

  it('plano proyectante de un segmento: al abatirlo da la verdadera magnitud', () => {
    const plane = projectingPlane(A, B, 'PH');
    if (!plane) throw new Error('sin plano');
    const hinge = hingeFor(plane, 'PH');
    if (!hinge) throw new Error('sin charnela');
    expect(distance(foldPoint(A, hinge, 1), foldPoint(B, hinge, 1))).toBeCloseTo(AB, 9);
  });

  it('a mitad del giro, la distancia a la charnela se conserva', () => {
    const hinge = hingeFor(alpha, 'PH');
    if (!hinge) throw new Error('sin charnela');
    const half = foldPoint(B, hinge, 0.5);
    expect(
      distance(half, footOnLine(half, hinge.origin, add3(hinge.origin, hinge.direction))),
    ).toBeCloseTo(distance(B, footOnLine(B, hinge.origin, add3(hinge.origin, hinge.direction))), 9);
  });
});

describe('distancias y ángulos', () => {
  it('distancia de punto a plano: el pie está en el plano y PF es perpendicular', () => {
    const alpha = createPlane(P(0, 0, 0), P(10, 0, 0), P(0, 10, 10));
    const Q = P(5, 30, 0);
    const F = footOnPlane(Q, alpha);
    const n = alpha.normal;
    const pf = { x: Q.x - F.x, a: Q.a - F.a, c: Q.c - F.c };
    const len = Math.hypot(pf.x, pf.a, pf.c);
    expect(Math.abs(pf.x * n.x + pf.a * n.a + pf.c * n.c)).toBeCloseTo(len, 9);
    expect(len).toBeCloseTo(30 / Math.SQRT2, 9);
  });

  it('distancia de punto a recta', () => {
    const F = footOnLine(P(0, 10, 0), P(-10, 0, 0), P(10, 0, 0));
    close(F, P(0, 0, 0));
  });

  it('ángulos de una recta con el PH y el PV', () => {
    expect(angleWithPH(P(0, 0, 0), P(10, 0, 10))).toBeCloseTo(45, 9);
    expect(angleWithPV(P(0, 0, 0), P(10, 0, 10))).toBeCloseTo(0, 9);
    expect(angleWithPV(P(0, 0, 0), P(0, 10, 0))).toBeCloseTo(90, 9);
  });

  it('ángulo entre recta y plano, y punto de intersección', () => {
    const alpha = createPlane(P(0, 0, 0), P(10, 0, 0), P(0, 10, 0)); // el PH
    expect(lineToPlane(P(0, 0, 0), P(10, 0, 10), alpha)).toBeCloseTo(45, 9);
    close(linePlaneIntersection(P(0, 0, 10), P(10, 0, 20), alpha) ?? P(99, 99, 99), P(-10, 0, 0));
    expect(linePlaneIntersection(P(0, 0, 10), P(10, 0, 10), alpha)).toBeNull();
    expect(angleLinePlane(P(0, 0, 0), P(0, 0, 10), alpha)).toBeCloseTo(90, 9);
  });

  it('ángulo entre recta y plano por el triángulo A, I, F (como en la lámina)', () => {
    const alpha = createPlane(P(-30, 0, 0), P(30, 0, 0), P(0, 30, 20));
    const R1 = P(-10, 30, 40);
    const R2 = P(20, 5, -10);
    const I = linePlaneIntersection(R1, R2, alpha);
    if (!I) throw new Error('paralelos');
    const F = footOnPlane(R1, alpha);
    expect(angleAt(I, R1, F)).toBeCloseTo(angleLinePlane(R1, R2, alpha), 9);
  });
});

describe('recta y plano con ángulo dado', () => {
  it('todas las generatrices del cono forman el ángulo pedido con el PH', () => {
    const V = P(0, 20, 30);
    const cone = coneOfLines(V, 35, 'PH');
    if (!cone) throw new Error('sin cono');
    for (const az of [0, 50, 130, 270]) {
      expect(angleWithPH(V, conePoint(cone, az))).toBeCloseTo(35, 9);
    }
  });

  it('el plano tangente al cono forma el mismo ángulo con el PH', () => {
    const V = P(0, 20, 30);
    const cone = coneOfLines(V, 50, 'PH');
    if (!cone) throw new Error('sin cono');
    const plane = tangentPlane(cone, conePoint(cone, 70));
    // Ángulo entre planos = 90° − ángulo entre la normal y el PH.
    const ph = createPlane(P(0, 0, 0), P(1, 0, 0), P(0, 1, 0));
    const n = plane.normal;
    expect(90 - angleLinePlane(P(0, 0, 0), n, ph)).toBeCloseTo(50, 9);
  });

  it('con el PV, la base está sobre el PV', () => {
    const cone = coneOfLines(P(0, 20, 30), 40, 'PV');
    if (!cone) throw new Error('sin cono');
    expect(conePoint(cone, 10).a).toBe(0);
    expect(angleWithPV(cone.apex, conePoint(cone, 10))).toBeCloseTo(40, 9);
  });

  it('sin cono si el vértice está en el plano de proyección', () => {
    expect(coneOfLines(P(0, 20, 0), 30, 'PH')).toBeNull();
  });
});

function add3(p: Point, q: Point): Point {
  return createPoint(p.x + q.x, p.a + q.a, p.c + q.c);
}
