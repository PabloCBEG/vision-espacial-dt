import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { ManifoldToplevel } from 'manifold-3d';
import { beforeAll, describe, expect, it } from 'vitest';
import { buildSolid, loadKernel, toMesh, volume } from '../engines/normalizacion/kernel.ts';
import { boundsOf } from '../engines/normalizacion/piece.ts';
import { drawView } from '../engines/normalizacion/views.ts';
import { parsePieces } from './pieces.ts';

const DIR = join(import.meta.dirname, 'piezas');
const { pieces, errors } = parsePieces(
  Object.fromEntries(
    readdirSync(DIR)
      .filter((f) => f.endsWith('.json'))
      .map((f) => [f, JSON.parse(readFileSync(join(DIR, f), 'utf8')) as unknown]),
  ),
);

let wasm: ManifoldToplevel;
beforeAll(async () => {
  wasm = await loadKernel();
}, 30_000);

describe('biblioteca de piezas', () => {
  it('diez piezas válidas, de dificultad creciente, sin ids repetidos', () => {
    expect(errors).toEqual([]);
    expect(pieces).toHaveLength(10);
    expect(new Set(pieces.map((p) => p.id)).size).toBe(10);
    expect(pieces.map((p) => p.dificultad)).toEqual([...pieces.map((p) => p.dificultad)].sort());
  });

  for (const piece of pieces) {
    it(`${piece.id}: se construye, cabe en el primer cuadrante y sus vistas tienen líneas`, () => {
      const solid = buildSolid(wasm, piece);
      expect(volume(solid)).toBeGreaterThan(1000);
      expect(solid.status()).toBe('NoError');
      const b = boundsOf(piece);
      expect(b.min[1]).toBeGreaterThanOrEqual(0);
      expect(b.min[2]).toBeGreaterThanOrEqual(0);
      const mesh = toMesh(solid);
      for (const view of ['alzado', 'planta', 'perfil'] as const) {
        const d = drawView(mesh, view);
        expect(d.visible.length, `${piece.id} ${view}`).toBeGreaterThanOrEqual(4);
      }
    });
  }

  it('brida: en planta se ven el buje, su taladro y los dos taladros de la base', () => {
    const brida = pieces.find((p) => p.id === 'brida');
    if (!brida) throw new Error('falta la brida');
    const top = drawView(toMesh(buildSolid(wasm, brida)), 'planta');
    // Circunferencias (polígonos de 48 lados): radios 11, 6, 3 y 3.
    const circles = [11, 6, 3, 3].reduce((s, r) => s + 48 * 2 * r * Math.sin(Math.PI / 48), 0);
    const rect = 2 * (56 + 30);
    const total = top.visible.reduce((s, g) => s + Math.hypot(g.x2 - g.x1, g.y2 - g.y1), 0);
    expect(total).toBeCloseTo(rect + circles, 0);
  });
});
