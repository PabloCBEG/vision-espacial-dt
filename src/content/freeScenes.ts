// Escenas del modo libre: un punto, una recta o un plano para explorar sin lección.
import { createPoint } from '../geometry/index.ts';
import { INITIAL_STATE, type AppState } from '../state/index.ts';

export type FreeSceneName = 'punto' | 'recta' | 'plano';

type SceneFields = Pick<
  AppState,
  'points' | 'objects' | 'activePoint' | 'layers3d' | 'layersSheet'
>;

const projections = (ids: string[]): string[] =>
  ids.flatMap((id) => [`punto:${id}`, `proyecciones:${id}`]);
const references = (ids: string[]): string[] =>
  ids.flatMap((id) => [`proyecciones:${id}`, `referencia:${id}`]);

export const FREE_SCENES: Record<FreeSceneName, SceneFields> = {
  punto: {
    points: INITIAL_STATE.points,
    objects: INITIAL_STATE.objects,
    activePoint: 'P',
    layers3d: null,
    layersSheet: null,
  },
  recta: {
    points: { A: createPoint(-30, 15, 40), B: createPoint(30, 45, 10) },
    objects: [
      { kind: 'point', id: 'A' },
      { kind: 'point', id: 'B' },
      { kind: 'line', id: 'r', through: ['A', 'B'] },
    ],
    activePoint: 'A',
    layers3d: ['planos', 'cuadrantes', ...projections(['A', 'B']), 'recta:r', 'trazas:r'],
    layersSheet: ['lt', ...references(['A', 'B']), 'recta:r', 'trazas:r'],
  },
  plano: {
    points: {
      A: createPoint(-40, 0, 35),
      B: createPoint(40, 45, 0),
      C: createPoint(10, 0, 0),
      Q: createPoint(10, 15, 7),
    },
    objects: [
      { kind: 'point', id: 'A' },
      { kind: 'point', id: 'B' },
      { kind: 'point', id: 'C' },
      { kind: 'point', id: 'Q' },
      { kind: 'plane', id: 'α', through: ['A', 'B', 'C'] },
    ],
    activePoint: 'Q',
    layers3d: ['planos', ...projections(['A', 'B', 'C', 'Q']), 'plano:α', 'trazas:α', 'medidas:Q'],
    layersSheet: ['lt', ...references(['A', 'B', 'C', 'Q']), 'trazas:α'],
  },
};
