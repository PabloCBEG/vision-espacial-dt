// Contrato de un motor enchufable.
//
// Un motor tiene dos partes:
// - Definición (sin Three.js ni DOM): sus nombres de capa y el esquema zod de sus datos de paso.
//   La usa el validador de lecciones.
// - Ejecución: monta sus módulos en la vista 3D y en la lámina. La usa la aplicación.
import type { ZodType } from 'zod';
import type { SheetView } from '../render2d/index.ts';
import type { SpatialView } from '../render3d/index.ts';
import type { AppState, AppStore } from '../state/index.ts';

export interface EngineDefinition {
  /** Nombre del motor; es también la clave de sus datos en cada paso: "metodos": {…}. */
  readonly id: string;
  readonly title: string;
  /** Prefijos de capa con nombre de objeto: "abatimiento" → "abatimiento:α". */
  readonly layerPrefixes: readonly string[];
  /** Capas sin nombre de objeto: "triedro". */
  readonly layerNames: readonly string[];
  /** Esquema de sus datos en cada paso (y en cada ejercicio). */
  readonly stepSchema?: ZodType;
}

export interface EngineHost {
  readonly store: AppStore;
  /** null si el navegador no tiene WebGL. */
  readonly spatial: SpatialView | null;
  readonly sheet: SheetView;
  /** Hueco en la barra de controles para los controles propios del motor. */
  readonly controls: HTMLElement;
}

export interface EngineRuntime {
  readonly definition: EngineDefinition;
  /** Registra sus módulos en las vistas. Devuelve la función que los quita. */
  mount(host: EngineHost): () => void;
  /** Corrige un ejercicio de tipo "engine" de este motor (null si no le toca). */
  check?(state: AppState): { correct: boolean; message: string } | null;
}
