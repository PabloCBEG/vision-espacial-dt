// Estado vivo del motor de sólidos: datos del paso, valores animados y escena resuelta.
import { getEngineData, type AppState, type AppStore } from '../../state/index.ts';
import { Tweens } from '../shared/tween.ts';
import { buildScene, type Animated, type SolidScene } from './construction.ts';
import { SolidsStepSchema, type SolidsStep } from './definition.ts';

export class SolidsController {
  readonly store: AppStore;
  data: SolidsStep | null = null;
  scene: SolidScene | null = null;
  readonly tweens: Tweens<keyof Animated>;
  readonly listeners = new Set<() => void>();
  private raw: unknown = undefined;
  private solidKey = '';

  constructor(store: AppStore) {
    this.store = store;
    this.tweens = new Tweens<keyof Animated>(
      { quitar: 0, abatir: 0, desarrollo: 0, punto: 0 },
      () => this.rebuild(),
    );
  }

  sync(state: AppState): void {
    const raw = getEngineData(state, 'solidos');
    if (raw === this.raw) return;
    this.raw = raw;
    const parsed = raw === undefined ? null : SolidsStepSchema.safeParse(raw);
    this.data = parsed?.success ? parsed.data : null;
    if (!this.data) {
      this.tweens.stop();
      this.scene = null;
      this.notify();
      return;
    }
    // Otro sólido u otro corte: los movimientos empiezan desde cero, sin animar hacia atrás.
    const key = JSON.stringify([
      this.data.solido,
      this.data.seccion?.tipo,
      this.data.seccion?.puntos,
    ]);
    const fresh = key !== this.solidKey;
    this.solidKey = key;
    if (fresh) this.tweens.setTargets({ quitar: 0, abatir: 0, desarrollo: 0, punto: 0 }, true);
    this.tweens.setTargets({
      quitar: this.data.seccion?.quitar ?? 0,
      abatir: this.data.seccion?.abatir ?? 0,
      desarrollo: this.data.desarrollo ?? 0,
      punto: this.data.punto?.progreso ?? 0,
    });
    this.rebuild();
  }

  /** Mueve a mano un valor animado (deslizadores). */
  scrub(key: keyof Animated, value: number): void {
    this.tweens.stop();
    this.tweens.set(key, Math.max(0, Math.min(1, value)));
  }

  private rebuild(): void {
    this.scene = this.data ? buildScene(this.data, this.tweens.values) : null;
    this.notify();
  }

  private notify(): void {
    for (const listener of this.listeners) listener();
  }

  dispose(): void {
    this.tweens.stop();
    this.listeners.clear();
  }
}
