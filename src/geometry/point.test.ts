import { describe, expect, it } from 'vitest';
import { createPoint, projectH, projectProfile, projectV, quadrant, sheetCoords } from './point.ts';

describe('proyecciones', () => {
  const p = createPoint(10, 20, 30);

  it("P' conserva x y alejamiento, con cota 0", () => {
    expect(projectH(p)).toEqual(createPoint(10, 20, 0));
  });

  it("P'' conserva x y cota, con alejamiento 0", () => {
    expect(projectV(p)).toEqual(createPoint(10, 0, 30));
  });

  it("P''' conserva alejamiento y cota sobre el plano de perfil", () => {
    expect(projectProfile(p)).toEqual(createPoint(0, 20, 30));
    expect(projectProfile(p, -50)).toEqual(createPoint(-50, 20, 30));
  });
});

describe('sheetCoords', () => {
  it("P' queda bajo la LT y P'' sobre ella (primer cuadrante)", () => {
    expect(sheetCoords(createPoint(10, 20, 30))).toEqual({
      h: { x: 10, y: -20 },
      v: { x: 10, y: 30 },
    });
  });

  it("en el tercer cuadrante P' queda sobre la LT y P'' bajo ella", () => {
    expect(sheetCoords(createPoint(-15, -20, -30))).toEqual({
      h: { x: -15, y: 20 },
      v: { x: -15, y: -30 },
    });
  });
});

describe('quadrant', () => {
  it.each([
    { p: createPoint(10, 20, 30), expected: 1 },
    { p: createPoint(10, -20, 30), expected: 2 },
    { p: createPoint(10, -20, -30), expected: 3 },
    { p: createPoint(10, 20, -30), expected: 4 },
  ])('$p está en el cuadrante $expected', ({ p, expected }) => {
    expect(quadrant(p)).toBe(expected);
  });

  it('puntos del PH, delante y detrás del PV', () => {
    expect(quadrant(createPoint(10, 20, 0))).toBe('en PH');
    expect(quadrant(createPoint(10, -20, 0))).toBe('en PH');
  });

  it('puntos del PV, encima y debajo del PH', () => {
    expect(quadrant(createPoint(10, 0, 30))).toBe('en PV');
    expect(quadrant(createPoint(10, 0, -30))).toBe('en PV');
  });

  it('punto de la LT', () => {
    expect(quadrant(createPoint(10, 0, 0))).toBe('en LT');
  });

  it('aplica la tolerancia de 0,01 mm', () => {
    expect(quadrant(createPoint(10, 20, 0.009))).toBe('en PH');
    expect(quadrant(createPoint(10, 20, 0.011))).toBe(1);
    expect(quadrant(createPoint(10, -0.005, 0.005))).toBe('en LT');
  });
});
