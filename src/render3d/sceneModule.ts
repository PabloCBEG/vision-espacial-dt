// Módulo enchufable de la escena 3D: un motor (métodos, sólidos…) añade sus propios objetos
// y capas sin tocar el resto. Se registra con SpatialView.use(módulo).
import type { Camera, Object3D } from 'three';
import type { AppState } from '../state/index.ts';
import type { FadeLayer } from './fadeLayer.ts';
import type { SceneColors } from './sceneColors.ts';

export interface SceneModule {
  readonly id: string;
  /** Raíz de todo lo que añade el módulo (se cuelga de la escena al registrarlo). */
  readonly root: Object3D;
  /** Estado → escena. Se llama cada vez que cambia el estado. */
  sync(state: AppState): void;
  /** Capas con su nombre ("abatimiento:α"…), para mostrarlas, ocultarlas o destacarlas. */
  layers(): Iterable<readonly [string, FadeLayer]>;
  setColors(colors: SceneColors): void;
  setLineScale(scale: number): void;
  /** Avanza sus animaciones propias. Devuelve true si necesita otro fotograma. */
  step?(dtMs: number): boolean;
  /** Ajustes que dependen de la cámara (rótulos que se esconden de canto…). */
  updateForCamera?(camera: Camera): void;
  /** Al quitar el módulo. */
  dispose?(): void;
}
