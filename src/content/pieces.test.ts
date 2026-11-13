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
  it('veintitrés piezas válidas, de dificultad creciente, sin ids repetidos', () => {
    expect(errors).toEqual([]);
    expect(pieces).toHaveLength(23);
    expect(new Set(pieces.map((p) => p.id)).size).toBe(23);
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

  it('cuña escalonada con canal: sus tres vistas son exactamente las de la lámina de la PAU 2025 ord. 3', () => {
    type Seg = [number, number, number, number];
    const alzado: Seg[] = [
      [0, 0, 20, 0],
      [40, 0, 60, 0],
      [20, 0, 20, 20],
      [20, 20, 40, 20],
      [40, 20, 40, 0],
      [0, 0, 0, 40],
      [0, 40, 60, 40],
      [60, 0, 60, 60],
      [30, 40, 30, 60],
      [30, 60, 60, 60],
      [30, 60, 0, 60],
      [0, 40, 0, 100],
      [60, 60, 0, 100],
    ];
    const perfilDerecho: Seg[] = [
      [0, 0, 0, 40],
      [0, 40, 40, 40],
      [40, 40, 40, 60],
      [40, 60, 60, 60],
      [60, 60, 60, 0],
      [60, 0, 0, 0],
      [40, 60, 60, 100],
      [60, 100, 60, 60],
      [20, 40, 20, 60],
      [20, 60, 40, 60],
      [0, 20, 60, 20],
    ];
    const planta: Seg[] = [
      [0, 0, 60, 0],
      [60, 0, 60, 60],
      [60, 60, 0, 60],
      [0, 60, 0, 0],
      [0, 40, 60, 40],
      [0, 60, 60, 40],
      [0, 40, 30, 20],
      [30, 20, 60, 40],
      [20, 0, 20, 60],
      [40, 0, 40, 60],
    ];
    const key = (s: Seg): string => {
      const [a, b, c, d] = s.map((n) => Math.round(n * 2) / 2) as Seg;
      return a < c || (a === c && b <= d) ? `${a},${b},${c},${d}` : `${c},${d},${a},${b}`;
    };
    const unit = (segs: Seg[]): Set<string> => {
      const out = new Set<string>();
      for (const [x1, y1, x2, y2] of segs) {
        const n = Math.max(1, Math.round(Math.hypot(x2 - x1, y2 - y1) / 5));
        for (let k = 0; k < n; k++) {
          out.add(
            key([
              x1 + ((x2 - x1) * k) / n,
              y1 + ((y2 - y1) * k) / n,
              x1 + ((x2 - x1) * (k + 1)) / n,
              y1 + ((y2 - y1) * (k + 1)) / n,
            ]),
          );
        }
      }
      return out;
    };
    const piece = pieces.find((p) => p.id === 'cuna-escalonada-con-canal');
    if (!piece) throw new Error('falta la pieza');
    const solid = buildSolid(wasm, piece);
    expect(solid.status()).toBe('NoError');
    expect(volume(solid)).toBeCloseTo(172000, -1);
    const mesh = toMesh(solid);
    for (const [view, target] of [
      ['alzado', alzado],
      ['perfilDerecho', perfilDerecho],
      ['planta', planta],
    ] as const) {
      const d = drawView(mesh, view, { hidden: true });
      const all = [...d.visible, ...d.hidden];
      const us = all.flatMap((g) => [g.x1, g.x2]);
      const vs = all.flatMap((g) => [g.y1, g.y2]);
      const u0 = Math.min(...us);
      const v0 = Math.min(...vs);
      const got = unit(all.map((g) => [g.x1 - u0, g.y1 - v0, g.x2 - u0, g.y2 - v0] as Seg));
      const want = unit([...target]);
      expect(
        [...got].filter((k) => !want.has(k)),
        `${view}: sobran`,
      ).toEqual([]);
      expect(
        [...want].filter((k) => !got.has(k)),
        `${view}: faltan`,
      ).toEqual([]);
    }
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
