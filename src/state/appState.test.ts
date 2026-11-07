import { describe, expect, it, vi } from 'vitest';
import { createPoint } from '../geometry/index.ts';
import {
  clampCoordinate,
  createAppStore,
  getPoint,
  INITIAL_POINT,
  patchState,
  setActiveCoordinate,
  setPoint,
} from './appState.ts';

describe('clampCoordinate', () => {
  it('redondea a 1 mm y limita a ±60 mm', () => {
    expect(clampCoordinate(12.4)).toBe(12);
    expect(clampCoordinate(12.6)).toBe(13);
    expect(clampCoordinate(75)).toBe(60);
    expect(clampCoordinate(-75)).toBe(-60);
  });

  it('no devuelve −0', () => {
    expect(Object.is(clampCoordinate(-0.3), 0)).toBe(true);
  });
});

describe('estado de los puntos', () => {
  it('setActiveCoordinate cambia solo esa coordenada del punto activo y avisa', () => {
    const store = createAppStore({ points: { P: createPoint(10, 20, 30) } });
    const listener = vi.fn();
    store.subscribe(listener);
    setActiveCoordinate(store, 'c', -15);
    expect(getPoint(store.get(), 'P')).toEqual(createPoint(10, 20, -15));
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('setPoint no toca los demás puntos', () => {
    const store = createAppStore({
      points: { A: createPoint(1, 2, 3), B: createPoint(4, 5, 6) },
      activePoint: 'A',
    });
    setPoint(store, 'B', createPoint(-4, -5, -6));
    expect(getPoint(store.get(), 'A')).toEqual(createPoint(1, 2, 3));
    expect(getPoint(store.get(), 'B')).toEqual(createPoint(-4, -5, -6));
  });

  it('no avisa si el punto no cambia tras redondear', () => {
    const store = createAppStore({ points: { P: createPoint(10, 20, 30) } });
    const listener = vi.fn();
    store.subscribe(listener);
    setPoint(store, 'P', createPoint(10.2, 19.8, 30.4));
    expect(listener).not.toHaveBeenCalled();
  });

  it('cancelar la suscripción deja de avisar', () => {
    const store = createAppStore();
    const listener = vi.fn();
    const unsubscribe = store.subscribe(listener);
    unsubscribe();
    setActiveCoordinate(store, 'x', -40);
    expect(listener).not.toHaveBeenCalled();
  });

  it('patchState solo avisa si algo cambia', () => {
    const store = createAppStore();
    const listener = vi.fn();
    store.subscribe(listener);
    patchState(store, { projector: false });
    expect(listener).not.toHaveBeenCalled();
    patchState(store, { projector: true });
    expect(listener).toHaveBeenCalledTimes(1);
  });
});

describe('puntos fijos', () => {
  it('con locked, setPoint no mueve nada', () => {
    const store = createAppStore({ locked: true });
    setPoint(store, 'P', createPoint(0, 0, 0));
    expect(store.get().points.P).toEqual(INITIAL_POINT);
  });
});
