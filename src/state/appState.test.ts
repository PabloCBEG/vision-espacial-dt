import { describe, expect, it, vi } from 'vitest';
import { createPoint } from '../geometry/index.ts';
import { clampCoordinate, createAppStore, setPoint, setPointCoordinate } from './appState.ts';

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

describe('estado del punto', () => {
  it('setPointCoordinate cambia solo esa coordenada y avisa', () => {
    const store = createAppStore({ point: createPoint(10, 20, 30) });
    const listener = vi.fn();
    store.subscribe(listener);
    setPointCoordinate(store, 'c', -15);
    expect(store.get().point).toEqual(createPoint(10, 20, -15));
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('no avisa si el punto no cambia tras redondear', () => {
    const store = createAppStore({ point: createPoint(10, 20, 30) });
    const listener = vi.fn();
    store.subscribe(listener);
    setPoint(store, createPoint(10.2, 19.8, 30.4));
    expect(listener).not.toHaveBeenCalled();
  });

  it('cancelar la suscripción deja de avisar', () => {
    const store = createAppStore();
    const listener = vi.fn();
    const unsubscribe = store.subscribe(listener);
    unsubscribe();
    setPointCoordinate(store, 'x', -40);
    expect(listener).not.toHaveBeenCalled();
  });
});
