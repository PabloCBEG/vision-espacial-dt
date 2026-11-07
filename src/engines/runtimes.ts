// Motores que se montan en las vistas al arrancar la aplicación.
import { METHODS_RUNTIME } from './metodos/runtime.ts';
import { SOLIDS_RUNTIME } from './solidos/runtime.ts';
import type { EngineHost, EngineRuntime } from './types.ts';

export const ENGINE_RUNTIMES: readonly EngineRuntime[] = [METHODS_RUNTIME, SOLIDS_RUNTIME];

/** Monta todos los motores. Devuelve la función que los desmonta. */
export function mountEngines(host: EngineHost): () => void {
  const unmounts = ENGINE_RUNTIMES.map((engine) => engine.mount(host));
  return () => {
    for (const unmount of unmounts) unmount();
  };
}
