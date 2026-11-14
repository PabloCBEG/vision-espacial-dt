import { describe, expect, it } from 'vitest';
import { checkCondition } from '../player/checkCondition.ts';
import { createPoint, distancePointToPlane, createPlane } from '../geometry/index.ts';
import { createAppStore, setPoint, type SceneObject } from './index.ts';

const P = createPoint;
const objects: SceneObject[] = [
  { kind: 'plane', id: 'α', through: ['A', 'B', 'C'] },
  { kind: 'line', id: 'r', through: ['D', 'E'] },
  { kind: 'meet', id: 'm', of: ['r', 'α'], points: ['I'] },
  { kind: 'point', id: 'I' },
  { kind: 'point', id: 'Q' },
];
const points = {
  A: P(0, 0, 30),
  B: P(50, 0, 30),
  C: P(0, 50, 30),
  D: P(-30, 10, 10),
  E: P(30, 40, 50),
  Q: P(0, 0, 0),
};

describe('puntos derivados de una intersección', () => {
  it('la recta atraviesa el plano en I, y I sigue a los puntos al moverlos', () => {
    const store = createAppStore({ points, objects, activePoint: 'Q' });
    const i = store.get().points.I;
    expect(i).toEqual(P(0, 25, 30));
    setPoint(store, 'E', P(30, 40, 30 + 20));
    const alpha = createPlane(points.A, points.B, points.C);
    const moved = store.get().points.I;
    expect(moved).toBeDefined();
    expect(distancePointToPlane(moved ?? P(0, 0, 0), alpha)).toBeLessThan(1e-9);
  });

  it('si no hay intersección, el punto se queda donde estaba', () => {
    const store = createAppStore({ points, objects, activePoint: 'Q' });
    const before = store.get().points.I;
    setPoint(store, 'E', P(30, 40, 10)); // la recta pasa a ser paralela al plano
    expect(store.get().points.I).toEqual(before);
  });

  it('la condición «punto en la intersección» se cumple en I y no fuera', () => {
    const store = createAppStore({ points, objects, activePoint: 'Q' });
    expect(checkCondition('pointOnIntersection', ['Q', 'r', 'α'], store.get()).correct).toBe(false);
    setPoint(store, 'Q', P(0, 25, 30));
    expect(checkCondition('pointOnIntersection', ['Q', 'r', 'α'], store.get()).correct).toBe(true);
    setPoint(store, 'Q', P(0, 25, 36));
    expect(checkCondition('pointOnIntersection', ['Q', 'r', 'α'], store.get()).correct).toBe(false);
  });
});
