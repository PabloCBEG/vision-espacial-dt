import { describe, expect, it } from 'vitest';
import { createPoint } from '../geometry/index.ts';
import { createAppStore, objectsNeedingProfile, type SceneObject } from '../state/index.ts';
import { sceneNotices } from './notices.ts';

const P = createPoint;

function lineState(A: ReturnType<typeof P>, B: ReturnType<typeof P>) {
  return createAppStore({
    points: { A, B },
    objects: [
      { kind: 'point', id: 'A' },
      { kind: 'point', id: 'B' },
      { kind: 'line', id: 'r', through: ['A', 'B'] },
    ] as SceneObject[],
    activePoint: 'A',
  }).get();
}

function planeState(points: Record<string, ReturnType<typeof P>>) {
  return createAppStore({
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
}

const texts = (state: ReturnType<typeof lineState>) => sceneNotices(state).map((n) => n.text);

describe('avisos pedagógicos', () => {
  it('recta oblicua: cuadrantes que atraviesa', () => {
    expect(texts(lineState(P(-30, 15, 40), P(30, 45, 10)))).toContain(
      'r atraviesa los cuadrantes II, I y IV.',
    );
  });

  it('recta paralela a la LT', () => {
    expect(texts(lineState(P(-30, 20, 30), P(30, 20, 30))).join(' ')).toContain('paralela a la LT');
  });

  it('recta de perfil: pide la tercera proyección', () => {
    const state = lineState(P(10, 10, 45), P(10, 45, 10));
    expect(texts(state).join(' ')).toContain('tercera proyección');
    expect(objectsNeedingProfile(state)).toEqual(['r']);
  });

  it('plano que contiene la LT: pide la tercera proyección', () => {
    const state = planeState({
      A: P(-40, 10, 10),
      B: P(40, 30, 30),
      C: P(0, 50, 50),
      Q: P(10, 20, 20),
    });
    expect(texts(state).join(' ')).toContain('contiene la LT');
    expect(objectsNeedingProfile(state)).toEqual(['α']);
  });

  it('plano paralelo a la LT', () => {
    const state = planeState({
      A: P(-40, 0, 35),
      B: P(40, 40, 0),
      C: P(40, 0, 35),
      Q: P(10, 16, 21),
    });
    expect(texts(state).join(' ')).toContain('paralelo a la LT');
  });

  it('pertenencia de un punto al plano: dentro y fuera', () => {
    const base = { A: P(-40, 0, 35), B: P(40, 45, 0), C: P(10, 0, 0) };
    const inside = sceneNotices(planeState({ ...base, Q: P(10, 15, 7) }));
    expect(inside).toContainEqual({ kind: 'ok', text: 'Q está en el plano α.' });
    const outside = sceneNotices(planeState({ ...base, Q: P(10, 30, 30) }));
    expect(outside.find((n) => n.kind === 'error')?.text).toMatch(/^Q no está en el plano α/);
  });

  it('no da la distancia de un punto cuya distancia al plano es el ejercicio', () => {
    const base = { A: P(-40, 0, 35), B: P(40, 45, 0), C: P(10, 0, 0), Q: P(10, 30, 30) };
    const state = planeState(base);
    const measuring = { ...state, engines: { metodos: { distancia: { desde: 'Q', hasta: 'α' } } } };
    expect(sceneNotices(measuring).some((n) => n.text.startsWith('Q no está'))).toBe(false);
  });
});
