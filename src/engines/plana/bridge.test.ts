import { describe, expect, it } from 'vitest';
import { cross, intersectLines, lineThrough, pt, sub, type Line2, type Pt } from './geometry.ts';
import { buildBridge, homologous, homologyCenter, type BridgeInput } from './bridge.ts';

const figure = [pt(-10, 20), pt(15, 30), pt(5, 45)];
const axis: [Pt, Pt] = [pt(-60, 0), pt(60, 0)];

describe('puente 3D de la homología', () => {
  const input: BridgeInput = { kind: 'homologia', figure, axis, angleDeg: 60, light: [5, -25, 70] };

  it('la sombra abatida queda en el plano de la figura', () => {
    const scene = buildBridge(input, 1);
    for (const p of scene?.shadow ?? []) expect(p.c).toBeCloseTo(0, 9);
  });

  it('las rectas que unen puntos homólogos concurren en el centro', () => {
    const image = homologous(input);
    if (!image) throw new Error('sin sombra');
    const center = homologyCenter(figure, image);
    if (!center) throw new Error('sin centro');
    // La tercera recta también pasa por el centro.
    const p3 = figure[2] as Pt;
    const q3 = image[2] as Pt;
    expect(Math.abs(cross(sub(q3, p3), sub(center, p3)))).toBeLessThan(1e-6);
  });

  it('rectas homólogas se cortan en el eje', () => {
    const image = homologous(input);
    if (!image) throw new Error('sin sombra');
    const r = lineThrough(figure[0] as Pt, figure[1] as Pt) as Line2;
    const s = lineThrough(image[0] as Pt, image[1] as Pt) as Line2;
    const x = intersectLines(r, s);
    expect(x?.y).toBeCloseTo(0, 6); // el eje es y = 0
  });

  it('los puntos del eje son dobles (coinciden con su homólogo)', () => {
    const onAxis = homologous({ ...input, figure: [pt(10, 0), pt(-20, 0), pt(0, 10)] });
    expect(onAxis?.[0]?.x).toBeCloseTo(10, 9);
    expect(onAxis?.[0]?.y).toBeCloseTo(0, 9);
  });
});

describe('afinidad: luz paralela', () => {
  const input: BridgeInput = { kind: 'afinidad', figure, axis, angleDeg: 60, light: [10, -20, 60] };

  it('las rectas que unen puntos afines son paralelas (dirección de afinidad)', () => {
    const image = homologous(input);
    if (!image) throw new Error('sin sombra');
    const d1 = sub(image[0] as Pt, figure[0] as Pt);
    const d2 = sub(image[1] as Pt, figure[1] as Pt);
    expect(Math.abs(cross(d1, d2))).toBeLessThan(1e-6);
    const center = homologyCenter(figure, image);
    // Rectas paralelas: sin centro propio (o muy lejano).
    if (center) expect(Math.hypot(center.x, center.y)).toBeGreaterThan(1e6);
  });
});
