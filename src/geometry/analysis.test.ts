import { describe, expect, it } from 'vitest';
import { createLine } from './line.ts';
import { classifyLine, clipToBox, lineSegments, quadrantsCrossed } from './lineAnalysis.ts';
import { createPlane, pointOnPlane } from './plane.ts';
import { classifyPlane, planePolygon } from './planeAnalysis.ts';
import { createPoint } from './point.ts';
import {
  lineNeedsProfile,
  planeNeedsProfile,
  profileSheetCoords,
  profileTrace,
  PROFILE_X,
} from './profile.ts';

const P = createPoint;

describe('tramos vistos y ocultos de una recta', () => {
  it('una recta oblicua se parte en sus trazas; solo es vista la parte del primer cuadrante', () => {
    // De (−40, −20, 50) a (40, 40, −10): cruza el PV y después el PH.
    const r = createLine(P(-40, -20, 50), P(40, 40, -10));
    const segments = lineSegments(r);
    expect(segments.map((s) => s.quadrant)).toEqual([2, 1, 4]);
    expect(segments.map((s) => s.visible)).toEqual([false, true, false]);
    expect(quadrantsCrossed(r)).toEqual([2, 1, 4]);
  });

  it('los tramos quedan dentro de la caja de dibujo', () => {
    const r = createLine(P(0, 10, 10), P(10, 20, 30));
    const range = clipToBox(r, 80);
    expect(range).not.toBeNull();
    for (const s of lineSegments(r, 80)) {
      for (const p of [s.from, s.to]) {
        expect(Math.max(Math.abs(p.x), Math.abs(p.a), Math.abs(p.c))).toBeLessThanOrEqual(
          80 + 1e-9,
        );
      }
    }
  });

  it('recta paralela a la LT: un solo tramo, sin trazas', () => {
    const r = createLine(P(-30, 20, 30), P(30, 20, 30));
    const segments = lineSegments(r);
    expect(segments).toHaveLength(1);
    expect(segments[0]?.visible).toBe(true);
    expect(classifyLine(r)).toContain('parallelToLT');
  });

  it('recta paralela a la LT en el tercer cuadrante: oculta', () => {
    const r = createLine(P(-30, -20, -30), P(30, -20, -30));
    expect(lineSegments(r)[0]?.visible).toBe(false);
    expect(quadrantsCrossed(r)).toEqual([3]);
  });
});

describe('casos especiales de recta', () => {
  it('recta de perfil: necesita la tercera proyección', () => {
    const r = createLine(P(10, 10, 45), P(10, 45, 10));
    expect(classifyLine(r)).toContain('profile');
    expect(lineNeedsProfile(r)).toBe(true);
  });

  it('recta paralela al PH (horizontal) y al PV (frontal)', () => {
    expect(classifyLine(createLine(P(0, 10, 30), P(40, 50, 30)))).toEqual(['horizontal']);
    expect(classifyLine(createLine(P(0, 15, 10), P(30, 15, 40)))).toEqual(['frontal']);
  });

  it('vertical y de punta', () => {
    expect(classifyLine(createLine(P(5, 20, 10), P(5, 20, 50)))).toContain('vertical');
    expect(classifyLine(createLine(P(5, 10, 20), P(5, 50, 20)))).toContain('endOn');
  });

  it('recta que corta a la LT', () => {
    expect(classifyLine(createLine(P(20, 0, 0), P(40, 30, 20)))).toContain('crossesLT');
    expect(classifyLine(createLine(P(-40, 10, 10), P(40, 30, 30)))).toContain('crossesLT');
  });

  it('recta oblicua cualquiera', () => {
    expect(classifyLine(createLine(P(-30, 15, 40), P(30, 45, 10)))).toEqual(['oblique']);
  });
});

describe('casos especiales de plano', () => {
  it('plano que contiene la LT: necesita la tercera proyección', () => {
    const alpha = createPlane(P(-40, 10, 10), P(40, 30, 30), P(0, 50, 50));
    expect(classifyPlane(alpha)).toEqual(['containsLT']);
    expect(planeNeedsProfile(alpha)).toBe(true);
  });

  it('plano paralelo a la LT', () => {
    const alpha = createPlane(P(-40, 0, 35), P(40, 0, 35), P(0, 40, 0));
    expect(classifyPlane(alpha)).toEqual(['parallelToLT']);
    expect(planeNeedsProfile(alpha)).toBe(false);
  });

  it('planos horizontal, frontal y de perfil', () => {
    expect(classifyPlane(createPlane(P(0, 0, 25), P(10, 0, 25), P(0, 10, 25)))).toEqual([
      'horizontal',
    ]);
    expect(classifyPlane(createPlane(P(0, 15, 0), P(10, 15, 0), P(0, 15, 10)))).toEqual([
      'frontal',
    ]);
    expect(classifyPlane(createPlane(P(20, 0, 0), P(20, 10, 0), P(20, 0, 10)))).toEqual([
      'profile',
    ]);
  });

  it('plano oblicuo', () => {
    expect(classifyPlane(createPlane(P(-40, 0, 35), P(40, 45, 0), P(10, 0, 0)))).toEqual([
      'oblique',
    ]);
  });

  it('el polígono del plano está en el plano y dentro de la caja', () => {
    const alpha = createPlane(P(-40, 0, 35), P(40, 45, 0), P(10, 0, 0));
    const polygon = planePolygon(alpha, 80);
    expect(polygon.length).toBeGreaterThanOrEqual(3);
    for (const p of polygon) {
      expect(pointOnPlane(p, alpha)).toBe(true);
      expect(Math.max(Math.abs(p.x), Math.abs(p.a), Math.abs(p.c))).toBeLessThanOrEqual(80 + 1e-6);
    }
  });
});

describe('tercera proyección', () => {
  it('P‴ queda a la derecha del PP si el alejamiento es positivo, a la altura de su cota', () => {
    expect(profileSheetCoords(P(10, 25, 40))).toEqual({ x: PROFILE_X + 25, y: 40 });
    expect(profileSheetCoords(P(10, -15, 40))).toEqual({ x: PROFILE_X - 15, y: 40 });
  });

  it('la traza de perfil de un plano que contiene la LT pasa por la LT', () => {
    const alpha = createPlane(P(-40, 10, 10), P(40, 30, 30), P(0, 50, 50));
    const trace = profileTrace(alpha);
    expect(trace).not.toBeNull();
    if (!trace) return;
    // α3 está en el plano y en el PP, y pasa por (PROFILE_X, 0, 0).
    expect(pointOnPlane(trace.p1, alpha)).toBe(true);
    expect(pointOnPlane(trace.p2, alpha)).toBe(true);
    expect(trace.p1.x).toBe(PROFILE_X);
    expect(Math.hypot(trace.p1.a, trace.p1.c)).toBeLessThan(1e-9);
  });

  it('un plano de perfil no tiene traza de perfil (es paralelo al PP)', () => {
    expect(profileTrace(createPlane(P(20, 0, 0), P(20, 10, 0), P(20, 0, 10)))).toBeNull();
  });
});
