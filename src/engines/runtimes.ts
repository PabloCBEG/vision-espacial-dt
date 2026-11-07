// Motores que se montan en las vistas al arrancar la aplicación.
import type { EngineHost, EngineRuntime } from './types.ts';

export const ENGINE_RUNTIMES: readonly EngineRuntime[] = [];

/** Monta todos los motores. Devuelve la función que los desmonta. */
export function mountEngines(host: EngineHost): () => void {
  const unmounts = ENGINE_RUNTIMES.map((engine) => engine.mount(host));
  return () => {
    for (const unmount of unmounts) unmount();
  };
}
