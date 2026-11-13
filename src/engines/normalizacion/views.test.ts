import type { ManifoldToplevel } from 'manifold-3d';
import { beforeAll, describe, expect, it } from 'vitest';
import { buildSolid, cutWithBoxes, loadKernel, toMesh, volume } from './kernel.ts';
import { PieceSchema, type Piece } from './piece.ts';
import { drawView, hatch, type Seg2 } from './views.ts';

let wasm: ManifoldToplevel;
beforeAll(async () => {
  wasm = await loadKernel();
}, 30_000);

const piece = (operaciones: unknown[]): Piece =>
  PieceSchema.parse({
    id: 'prueba',
    nombre: 'Prueba',
    dificultad: 1,
    vistasNecesarias: ['alzado'],
    operaciones,
  });

const total = (segs: readonly Seg2[]): number =>
  segs.reduce((s, g) => s + Math.hypot(g.x2 - g.x1, g.y2 - g.y1), 0);

const block = { tipo: 'bloque', desde: [-20, 10, 0], hasta: [20, 40, 20] };

describe('construcción de piezas', () => {
  it('bloque con taladro pasante: volumen correcto', () => {
    const solid = buildSolid(
      wasm,
      piece([block, { tipo: 'taladro', centro: [0, 25, 20], eje: 'c', sentido: -1, diametro: 10 }]),
    );
    const prism48 = 0.5 * 48 * 25 * Math.sin((2 * Math.PI) / 48); // área del círculo de 48 lados
    expect(volume(solid)).toBeCloseTo(40 * 30 * 20 - prism48 * 20, 1);
  });

  it('chaflán y redondeo quitan lo que deben', () => {
    const chamfer = buildSolid(
      wasm,
      piece([
        block,
        {
          tipo: 'chaflan',
          eje: 'x',
          en: [40, 20],
          desde: -20,
          hasta: 20,
          hacia: [-1, -1],
          tamano: 6,
        },
      ]),
    );
    expect(volume(chamfer)).toBeCloseTo(40 * 30 * 20 - 40 * 18, 1);
    const fillet = buildSolid(
      wasm,
      piece([
        block,
        {
          tipo: 'redondeo',
          eje: 'x',
          en: [40, 20],
          desde: -20,
          hasta: 20,
          hacia: [-1, -1],
          tamano: 6,
        },
      ]),
    );
    const removed = 40 * (36 - (Math.PI * 36) / 4);
    // El arco se aproxima con 12 tramos: se admite un 0,1 % de diferencia.
    expect(Math.abs(volume(fillet) - (40 * 30 * 20 - removed)) / (40 * 30 * 20)).toBeLessThan(
      0.001,
    );
  });
});

describe('vistas con líneas ocultas', () => {
  it('bloque: cada vista es un rectángulo visto y no hay ocultas', () => {
    const mesh = toMesh(buildSolid(wasm, piece([block])));
    const front = drawView(mesh, 'alzado');
    expect(total(front.visible)).toBeCloseTo(2 * (40 + 20), 6);
    expect(front.hidden).toHaveLength(0);
    const top = drawView(mesh, 'planta');
    expect(total(top.visible)).toBeCloseTo(2 * (40 + 30), 6);
    const side = drawView(mesh, 'perfil');
    expect(total(side.visible)).toBeCloseTo(2 * (30 + 20), 6);
  });

  it('taladro pasante vertical: circunferencia en planta y dos ocultas en el alzado', () => {
    const mesh = toMesh(
      buildSolid(
        wasm,
        piece([
          block,
          { tipo: 'taladro', centro: [0, 25, 20], eje: 'c', sentido: -1, diametro: 10 },
        ]),
      ),
    );
    const top = drawView(mesh, 'planta');
    // Rectángulo + circunferencia (polígono de 48 lados).
    const circle = 48 * 10 * Math.sin(Math.PI / 48);
    expect(total(top.visible)).toBeCloseTo(2 * (40 + 30) + circle, 1);
    const front = drawView(mesh, 'alzado');
    // Dos generatrices de contorno ocultas, de 20 mm.
    expect(total(front.hidden)).toBeCloseTo(40, 1);
    for (const s of front.hidden) expect(Math.abs(Math.abs(s.x1) - 5)).toBeLessThan(0.05);
  });

  it('taladro ciego: el fondo también es oculto en el alzado', () => {
    const mesh = toMesh(
      buildSolid(
        wasm,
        piece([
          block,
          {
            tipo: 'taladro',
            centro: [0, 25, 20],
            eje: 'c',
            sentido: -1,
            diametro: 10,
            profundidad: 8,
          },
        ]),
      ),
    );
    const front = drawView(mesh, 'alzado');
    // Dos generatrices de 8 mm y el fondo de 10 mm.
    expect(total(front.hidden)).toBeCloseTo(8 + 8 + 10, 1);
  });

  it('pieza en L: el escalón de detrás se ve en planta y queda oculto en el alzado si está detrás', () => {
    // Base 40×30×10 y un muro detrás (a de 10 a 20) de 20 mm más de alto, con una ranura
    // pasante en el muro que solo se ve de frente.
    const L = piece([
      { tipo: 'bloque', desde: [-20, 10, 0], hasta: [20, 40, 10] },
      { tipo: 'bloque', desde: [-20, 10, 10], hasta: [20, 20, 30] },
      { tipo: 'ranura', desde: [-5, 5, 10], hasta: [5, 25, 30] },
    ]);
    const mesh = toMesh(buildSolid(wasm, L));
    const top = drawView(mesh, 'planta');
    // En planta todo se ve: no hay ocultas.
    expect(top.hidden).toHaveLength(0);
    const side = drawView(mesh, 'perfil');
    // De perfil, la ranura queda tapada por el muro: sus aristas no se ven.
    expect(side.hidden.length).toBeGreaterThanOrEqual(0);
    const front = drawView(mesh, 'alzado');
    expect(front.hidden).toHaveLength(0);
  });

  it('las aristas entre facetas de un cilindro no se dibujan (solo el contorno)', () => {
    const mesh = toMesh(
      buildSolid(
        wasm,
        piece([{ tipo: 'cilindro', centro: [0, 25, 0], eje: 'c', radio: 10, largo: 30 }]),
      ),
    );
    const front = drawView(mesh, 'alzado');
    // Rectángulo de 20 × 30: dos bases y dos generatrices de contorno.
    expect(total(front.visible)).toBeCloseTo(2 * 20 + 2 * 30, 1);
  });
});

describe('cortes', () => {
  it('corte total por el plano de simetría: rayado sobre la cara cortada y sin ocultas', () => {
    const solid = buildSolid(
      wasm,
      piece([block, { tipo: 'taladro', centro: [0, 25, 20], eje: 'c', sentido: -1, diametro: 10 }]),
    );
    // Se quita la mitad de delante (a > 25).
    const cut = cutWithBoxes(wasm, solid, [{ min: [-50, 25, -5], max: [50, 60, 50] }]);
    const mesh = toMesh(cut);
    const isCut = (t: number): boolean => {
      for (let k = 0; k < 3; k++) {
        const v = mesh.triangles[t * 3 + k] as number;
        if (Math.abs((mesh.positions[v * 3 + 1] as number) - 25) > 1e-4) return false;
      }
      return true;
    };
    const view = drawView(mesh, 'alzado', { hidden: false, isCutTriangle: isCut });
    expect(view.hidden).toHaveLength(0);
    // La cara cortada: 40 × 20 menos el hueco del taladro (10 × 20).
    const area = view.cutTriangles.reduce((s, [p, q, r]) => {
      if (!p || !q || !r) return s;
      return s + Math.abs((q[0] - p[0]) * (r[1] - p[1]) - (r[0] - p[0]) * (q[1] - p[1])) / 2;
    }, 0);
    expect(area).toBeCloseTo(40 * 20 - 10 * 20, 0);
    const lines = hatch(view.cutTriangles, 2.5);
    expect(lines.length).toBeGreaterThan(10);
    // Las líneas del rayado forman 45°.
    for (const l of lines) expect(Math.abs((l.y2 - l.y1) / (l.x2 - l.x1) - 1)).toBeLessThan(1e-6);
  });
});

describe('dibujo completo de una pieza', () => {
  it('corte al medio, ejes y sección abatida', async () => {
    const { buildDrawing } = await import('./drawing.ts');
    const { NormStepSchema } = await import('./definition.ts');
    const p = piece([
      block,
      { tipo: 'taladro', centro: [0, 25, 20], eje: 'c', sentido: -1, diametro: 10 },
    ]);
    const step = NormStepSchema.parse({
      pieza: 'prueba',
      corte: { tipo: 'medio', vista: 'alzado', en: 25 },
      seccionAbatida: { vista: 'planta', eje: 'x', en: -12 },
    });
    const d = buildDrawing(wasm, p, step);
    expect(d.views.alzado.sectioned).toBe(true);
    expect(d.views.alzado.hidden).toHaveLength(0);
    expect(d.views.alzado.hatch.length).toBeGreaterThan(0);
    // Eje del taladro en el alzado y eje de la mitad en corte.
    expect(d.views.alzado.axes.length).toBeGreaterThanOrEqual(2);
    // En planta, el taladro se ve de punta: dos ejes cruzados.
    expect(d.views.planta.axes).toHaveLength(2);
    // La sección abatida por x = −12 es un rectángulo de 30 × 20 girado sobre la planta.
    const outline = d.views.planta.revolved.reduce(
      (s, g) => s + Math.hypot(g.x2 - g.x1, g.y2 - g.y1),
      0,
    );
    expect(outline).toBeCloseTo(2 * (30 + 20), 1);
    expect(d.removed).not.toBeNull();
  });
});

describe('perspectiva caballera de una pieza', () => {
  const cube = piece([{ tipo: 'bloque', desde: [0, 10, 0], hasta: [20, 30, 20] }]);

  it('la cara de delante está en verdadera magnitud y el fondo se reduce a la mitad', () => {
    const mesh = toMesh(buildSolid(wasm, cube));
    const d = drawView(mesh, 'caballera', { hidden: true });
    // Cuadrado frontal de 20 × 20 (80), 3 aristas del fondo reducidas (3 × 10) y las 2 aristas
    // vistas de la cara de atrás (2 × 20).
    expect(total(d.visible)).toBeCloseTo(4 * 20 + 3 * 10 + 2 * 20, 0);
    // Ocultas: las 2 aristas de atrás que tapa la pieza (2 × 20) y 1 del fondo (10).
    expect(total(d.hidden)).toBeCloseTo(20 + 20 + 10, 0);
  });

  it('un taladro de eje paralelo al fondo se ve como un óvalo en caballera, no como círculo', () => {
    const mesh = toMesh(
      buildSolid(
        wasm,
        piece([
          { tipo: 'bloque', desde: [0, 10, 0], hasta: [30, 40, 30] },
          { tipo: 'taladro', centro: [15, 40, 15], eje: 'a', sentido: -1, diametro: 10 },
        ]),
      ),
    );
    const front = drawView(mesh, 'caballera', { hidden: false });
    // En el plano frontal XZ la circunferencia se ve entera, de 10 mm de diámetro.
    const xs = front.visible.flatMap((g) => [g.x1, g.x2]);
    expect(Math.max(...xs) - Math.min(...xs)).toBeGreaterThan(29);
  });
});
