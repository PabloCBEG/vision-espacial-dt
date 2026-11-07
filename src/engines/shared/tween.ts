// Varios valores animados (de 0 a 1) que van de donde están a su destino con una transición
// suave. Lo usan los motores para sus movimientos (abatir, desplegar, retirar…).

/** Una transición completa (de 0 a 1) dura esto. */
export const FULL_TWEEN_MS = 2400;

export class Tweens<K extends string> {
  /** Valores que se ven ahora. */
  readonly values: Record<K, number>;
  private readonly targets: Record<K, number>;
  private animation: number | null = null;
  private readonly onFrame: () => void;

  constructor(initial: Record<K, number>, onFrame: () => void) {
    this.values = { ...initial };
    this.targets = { ...initial };
    this.onFrame = onFrame;
  }

  /** Fija los destinos. Si `instant`, salta sin animar. */
  setTargets(targets: Partial<Record<K, number>>, instant = false): void {
    let changed = false;
    for (const [k, v] of Object.entries(targets) as [K, number][]) {
      if (this.targets[k] !== v) changed = true;
      this.targets[k] = v;
    }
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (instant || reduced) {
      this.stop();
      const moved = (Object.keys(this.targets) as K[]).some(
        (k) => this.values[k] !== this.targets[k],
      );
      Object.assign(this.values, this.targets);
      if (moved) this.onFrame();
      return;
    }
    if (changed) this.start();
  }

  /** Pone un valor al momento (deslizador), sin animar. */
  set(key: K, value: number): void {
    this.targets[key] = value;
    this.values[key] = value;
    this.onFrame();
  }

  /** Vuelve a empezar un valor desde `from` hasta su destino. */
  replay(key: K, from: number): void {
    this.values[key] = from;
    this.start();
  }

  get isAnimating(): boolean {
    return this.animation !== null;
  }

  stop(): void {
    if (this.animation !== null) cancelAnimationFrame(this.animation);
    this.animation = null;
  }

  private start(): void {
    this.stop();
    const from = { ...this.values };
    const keys = Object.keys(this.targets) as K[];
    const span = Math.max(...keys.map((k) => Math.abs(this.targets[k] - from[k])));
    if (span === 0) return;
    const duration = Math.max(400, span * FULL_TWEEN_MS);
    const begin = performance.now();
    const frame = (now: number): void => {
      const t = Math.min(1, (now - begin) / duration);
      const e = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
      for (const k of keys) this.values[k] = from[k] + (this.targets[k] - from[k]) * e;
      this.animation = t < 1 ? requestAnimationFrame(frame) : null;
      this.onFrame();
    };
    this.animation = requestAnimationFrame(frame);
  }
}
