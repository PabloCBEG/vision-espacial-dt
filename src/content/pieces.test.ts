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
  it('veintidós piezas válidas, de dificultad creciente, sin ids repetidos', () => {
    expect(errors).toEqual([]);
    expect(pieces).toHaveLength(22);
    expect(new Set(pieces.map((p) => p.id)).size).toBe(22);
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

  it('una operación convexa suma o resta un sólido por sus vértices (tetraedro y cuña)', () => {
    // Tetraedro de aristas perpendiculares en un vértice: volumen = a·b·c / 6.
    const tetra = buildSolid(wasm, {
      id: 'tetra',
      nombre: 'Tetraedro',
      dificultad: 1,
      vistasNecesarias: ['alzado'],
      operaciones: [
        {
          tipo: 'convexo',
          puntos: [
            [0, 0, 0],
            [30, 0, 0],
            [0, 40, 0],
            [0, 0, 20],
          ],
          quitar: false,
        },
      ],
    });
    expect(volume(tetra)).toBeCloseTo((30 * 40 * 20) / 6, 3);
    expect(tetra.status()).toBe('NoError');
    // Bloque de 30³ con una cuña quitada en una esquina: pierde el volumen de esa cuña.
    const cut = buildSolid(wasm, {
      id: 'cortado',
      nombre: 'Cortado',
      dificultad: 1,
      vistasNecesarias: ['alzado'],
      operaciones: [
        { tipo: 'bloque', desde: [0, 0, 0], hasta: [30, 30, 30] },
        {
          tipo: 'convexo',
          puntos: [
            [-5, -5, -5],
            [30, -5, -5],
            [-5, 30, -5],
            [-5, -5, 30],
          ],
          quitar: true,
        },
      ],
    });
    expect(volume(cut)).toBeLessThan(30 ** 3);
    expect(cut.status()).toBe('NoError');
  });

  it('cubo con vaciado: poliedro cerrado cuyas vistas son las de la lámina de la PAU 2026 ord. 3A', () => {
    const piece = pieces.find((p) => p.id === 'cubo-con-vaciado');
    if (!piece) throw new Error('falta la pieza');
    const solid = buildSolid(wasm, piece);
    expect(solid.status()).toBe('NoError');
    // Cubo de 60 mm menos el vaciado de la esquina.
    expect(volume(solid)).toBeCloseTo(153000, -1);
    const mesh = toMesh(solid);
    const len = (segs: { x1: number; y1: number; x2: number; y2: number }[]) =>
      segs.reduce((n, g) => n + Math.hypot(g.x2 - g.x1, g.y2 - g.y1), 0);
    // Todas las líneas de la lámina son vistas (ninguna oculta) en las tres vistas.
    for (const view of ['alzado', 'planta', 'plantaInversa', 'perfil'] as const) {
      const d = drawView(mesh, view, { hidden: true });
      expect(d.hidden, view).toHaveLength(0);
    }
    // Alzado y perfil: contorno de 240 mm, una diagonal de 60·√2 y el cuadrado de 30 mm (60 mm de línea).
    for (const view of ['alzado', 'perfil'] as const) {
      const d = drawView(mesh, view, { hidden: false });
      expect(len(d.visible), view).toBeCloseTo(240 + 60 * Math.SQRT2 + 60, 0);
    }
    // Planta: contorno, cruz central (120) y dos diagonales de 30·√2.
    const planta = drawView(mesh, 'plantaInversa', { hidden: false });
    expect(len(planta.visible)).toBeCloseTo(240 + 120 + 2 * 30 * Math.SQRT2, 0);
  });

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
