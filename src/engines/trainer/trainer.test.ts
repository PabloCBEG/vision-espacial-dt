import { describe, expect, it } from 'vitest';
import { canonicalNet, foldNet, foldsToCube, type Net } from './nets.ts';
import {
  diagnostic,
  makeItem,
  nextLevel,
  rotationItem,
  sectionItem,
  sectionSignature,
  viewsItem,
  type ItemKind,
} from './items.ts';
import {
  congruent,
  mirror,
  ROTATIONS,
  rng,
  rotate,
  sameShape,
  viewsKey,
  type Polycube,
} from './polycube.ts';

describe('policubos', () => {
  it('24 giros del cubo, todos distintos', () => {
    expect(ROTATIONS).toHaveLength(24);
    expect(new Set(ROTATIONS.map((m) => JSON.stringify(m))).size).toBe(24);
  });

  it('una figura quiral no es congruente con su reflejo', () => {
    const L: Polycube = [
      [0, 0, 0],
      [1, 0, 0],
      [1, 1, 0],
      [1, 1, 1],
    ];
    expect(congruent(L, mirror(L))).toBe(false);
  });
});

describe('desarrollos del cubo', () => {
  /** Todas las redes de seis cuadrados (hexominós libres), por crecimiento. */
  function allHexominoes(): Net[] {
    let level = new Map([['0,0', [[0, 0]] as Net]]);
    for (let n = 1; n < 6; n++) {
      const next = new Map<string, Net>();
      for (const net of level.values()) {
        for (const [x, y] of net) {
          for (const [dx, dy] of [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
          ] as const) {
            const cell: [number, number] = [x + dx, y + dy];
            if (net.some((c) => c[0] === cell[0] && c[1] === cell[1])) continue;
            const grown = [...net, cell];
            next.set(canonicalNet(grown), grown);
          }
        }
      }
      level = next;
    }
    return [...level.values()];
  }

  it('de los 35 hexominós, exactamente 11 forman un cubo', () => {
    const all = allHexominoes();
    expect(all).toHaveLength(35);
    expect(all.filter(foldsToCube)).toHaveLength(11);
  });

  it('plegada del todo, la cruz latina cierra un cubo de lado 1', () => {
    const cross: Net = [
      [1, 0],
      [1, 1],
      [0, 1],
      [2, 1],
      [1, 2],
      [1, 3],
    ];
    expect(foldsToCube(cross)).toBe(true);
    const faces = foldNet(cross, 1);
    const centers = faces.map((f) =>
      [0, 1, 2].map((k) => f.reduce((s, p) => s + (p[k] as number), 0) / 4),
    );
    // Seis centros distintos, todos a 0,5 del centro del cubo.
    const mid = [0, 1, 2].map((k) => centers.reduce((s, c) => s + (c[k] as number), 0) / 6);
    for (const c of centers) {
      expect(Math.hypot(...c.map((v, k) => v - (mid[k] as number)))).toBeCloseTo(0.5, 9);
    }
    expect(new Set(centers.map((c) => c.map((v) => v.toFixed(3)).join())).size).toBe(6);
  });
});

describe('ítems', () => {
  it('rotación: la opción correcta es la otra figura con el mismo giro', () => {
    for (const level of [1, 2, 3] as const) {
      const item = rotationItem(rng(level), level);
      const right = item.options[item.correct];
      expect(right && sameShape(right, rotate(item.target, item.rotation))).toBe(true);
      // Ninguna otra opción es igual a la correcta.
      item.options.forEach((o, i) => {
        if (i !== item.correct) expect(sameShape(o, right ?? [])).toBe(false);
      });
    }
  });

  it('sección: opciones con formas distintas', () => {
    for (const level of [1, 2, 3] as const) {
      const item = sectionItem(rng(10 + level), level);
      expect(new Set(item.options.map(sectionSignature)).size).toBe(item.options.length);
    }
  });

  it('vistas: solo una opción tiene las vistas del modelo', () => {
    const item = viewsItem(rng(7), 2);
    const key = viewsKey(item.model);
    expect(item.options.filter((o) => viewsKey(o) === key)).toHaveLength(1);
  });

  it('desarrollo: solo una red forma un cubo', () => {
    const item = makeItem(rng(5), 'desarrollo', 3);
    if (item.kind !== 'desarrollo') throw new Error('tipo');
    expect(item.options.filter(foldsToCube)).toHaveLength(1);
    expect(foldsToCube(item.options[item.correct] ?? [])).toBe(true);
  });

  it('dificultad adaptativa: sube con dos aciertos y baja con un fallo', () => {
    let s = nextLevel(1, 0, true);
    expect(s.level).toBe(1);
    s = nextLevel(s.level, s.streak, true);
    expect(s.level).toBe(2);
    expect(nextLevel(2, 1, false).level).toBe(1);
    expect(nextLevel(3, 1, true).level).toBe(3);
  });
});

describe('test diagnóstico', () => {
  it('20 ítems fijos y dos versiones equivalentes con ítems distintos', () => {
    const a = diagnostic('inicial');
    const b = diagnostic('final');
    expect(a).toHaveLength(20);
    expect(a.map((i) => [i.kind, i.level])).toEqual(b.map((i) => [i.kind, i.level]));
    // Siempre los mismos (fijos).
    expect(JSON.stringify(diagnostic('inicial'))).toBe(JSON.stringify(a));
    expect(JSON.stringify(a)).not.toBe(JSON.stringify(b));
    const kinds: ItemKind[] = ['rotacion', 'seccion', 'desarrollo', 'vistas'];
    for (const k of kinds) expect(a.filter((i) => i.kind === k)).toHaveLength(5);
  });
});
