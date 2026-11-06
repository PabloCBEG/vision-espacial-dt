import { describe, expect, it } from 'vitest';
import { createPoint } from '../geometry/index.ts';
import { createAppStore, type SceneObject } from '../state/index.ts';
import { checkCondition } from './checkCondition.ts';

const P = createPoint;
const lineScene = (A: ReturnType<typeof P>, B: ReturnType<typeof P>) =>
  createAppStore({
    points: { A, B },
    objects: [
      { kind: 'point', id: 'A' },
      { kind: 'point', id: 'B' },
      { kind: 'line', id: 'r', through: ['A', 'B'] },
    ] as SceneObject[],
    activePoint: 'A',
  }).get();

describe('checkCondition: rectas', () => {
  it('paralela al PH', () => {
    expect(
      checkCondition('lineParallelToPH', ['r'], lineScene(P(0, 10, 30), P(40, 50, 30))).correct,
    ).toBe(true);
    expect(
      checkCondition('lineParallelToPH', ['r'], lineScene(P(0, 10, 30), P(40, 50, 20))).correct,
    ).toBe(false);
  });

  it('paralela a la LT', () => {
    expect(
      checkCondition('lineParallelToLT', ['r'], lineScene(P(-30, 20, 30), P(30, 20, 30))).correct,
    ).toBe(true);
    expect(
      checkCondition('lineParallelToLT', ['r'], lineScene(P(-30, 20, 30), P(30, 25, 30))).correct,
    ).toBe(false);
  });

  it('corta a la LT', () => {
    expect(
      checkCondition('lineCrossesLT', ['r'], lineScene(P(-40, 10, 10), P(40, 30, 30))).correct,
    ).toBe(true);
    expect(
      checkCondition('lineCrossesLT', ['r'], lineScene(P(-30, 15, 40), P(30, 45, 10))).correct,
    ).toBe(false);
  });

  it('de perfil', () => {
    const r = checkCondition('lineProfile', ['r'], lineScene(P(10, 10, 45), P(10, 45, 10)));
    expect(r.correct).toBe(true);
    expect(r.message).toContain('perfil');
  });
});

describe('checkCondition: planos', () => {
  const planeScene = (points: Record<string, ReturnType<typeof P>>) =>
    createAppStore({
      points,
      objects: [
        { kind: 'point', id: 'A' },
        { kind: 'point', id: 'B' },
        { kind: 'point', id: 'C' },
        { kind: 'point', id: 'Q' },
        { kind: 'plane', id: 'α', through: ['A', 'B', 'C'] },
      ] as SceneObject[],
      activePoint: 'Q',
    }).get();
  const base = { A: P(-40, 0, 35), B: P(40, 45, 0), C: P(10, 0, 0) };

  it('punto en el plano (1 mm de margen)', () => {
    expect(
      checkCondition('pointOnPlane', ['Q', 'α'], planeScene({ ...base, Q: P(10, 15, 7) })).correct,
    ).toBe(true);
    expect(
      checkCondition('pointOnPlane', ['Q', 'α'], planeScene({ ...base, Q: P(10, 30, 30) })).correct,
    ).toBe(false);
  });

  it('plano paralelo a la LT y plano que contiene la LT', () => {
    const parallel = { A: P(-40, 0, 35), B: P(40, 40, 0), C: P(40, 0, 35), Q: P(0, 0, 0) };
    expect(checkCondition('planeParallelToLT', ['α'], planeScene(parallel)).correct).toBe(true);
    expect(checkCondition('planeContainsLT', ['α'], planeScene(parallel)).correct).toBe(false);
    const containing = { A: P(-40, 10, 10), B: P(40, 30, 30), C: P(0, 50, 50), Q: P(0, 0, 0) };
    expect(checkCondition('planeContainsLT', ['α'], planeScene(containing)).correct).toBe(true);
  });
});
