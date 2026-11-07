// Motores que se montan en las vistas al arrancar la aplicación.
import { METHODS_RUNTIME } from './metodos/runtime.ts';
import { NORM_RUNTIME } from './normalizacion/runtime.ts';
import { PLANE_RUNTIME } from './plana/runtime.ts';
import { SOLIDS_RUNTIME } from './solidos/runtime.ts';
import type { AppState } from '../state/index.ts';
import type { EngineHost, EngineRuntime } from './types.ts';

export const ENGINE_RUNTIMES: readonly EngineRuntime[] = [
  METHODS_RUNTIME,
  SOLIDS_RUNTIME,
  PLANE_RUNTIME,
  NORM_RUNTIME,
];

/** Monta todos los motores. Devuelve la función que los desmonta. */
export function mountEngines(host: EngineHost): () => void {
  const unmounts = ENGINE_RUNTIMES.map((engine) => engine.mount(host));
  return () => {
    for (const unmount of unmounts) unmount();
  };
}

/** Corrige un ejercicio de motor: responde el primer motor que sabe corregirlo. */
export function checkEngines(state: AppState): { correct: boolean; message: string } | null {
  for (const engine of ENGINE_RUNTIMES) {
    const result = engine.check?.(state);
    if (result) return result;
  }
  return null;
}
