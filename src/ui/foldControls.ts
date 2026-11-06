// Deslizador "Abatir PH", botón de reproducir (unos 3 s) y modo "explicar".
import { explanationFor } from '../content/foldExplanations.ts';
import { FOLDED_ANGLE_DEG } from '../geometry/index.ts';
import { patchState, setFoldAngle, type AppStore } from '../state/index.ts';

/** Duración de un abatimiento completo, de 0° a 90°. */
const FULL_FOLD_MS = 3000;

export interface FoldControlsElements {
  slider: HTMLInputElement;
  output: HTMLOutputElement;
  playButton: HTMLButtonElement;
  explainButton: HTMLButtonElement;
  caption: HTMLElement;
}

export function bindFoldControls(elements: FoldControlsElements, store: AppStore): void {
  const { slider, output, playButton, explainButton, caption } = elements;
  let animation: number | null = null;

  const stop = (): void => {
    if (animation !== null) cancelAnimationFrame(animation);
    animation = null;
  };

  slider.addEventListener('input', () => {
    stop();
    setFoldAngle(store, Number(slider.value));
  });

  // Reproducir: abate hasta 90°, o vuelve a 0° si ya está abatido.
  playButton.addEventListener('click', () => {
    if (animation !== null) {
      stop();
      sync();
      return;
    }
    const from = store.get().foldAngle;
    const to = from >= FOLDED_ANGLE_DEG ? 0 : FOLDED_ANGLE_DEG;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setFoldAngle(store, to);
      return;
    }
    const duration = (Math.abs(to - from) / FOLDED_ANGLE_DEG) * FULL_FOLD_MS;
    const start = performance.now();
    const step = (now: number): void => {
      const t = Math.min(1, (now - start) / duration);
      const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
      setFoldAngle(store, Math.round((from + (to - from) * eased) * 10) / 10);
      if (t < 1) {
        animation = requestAnimationFrame(step);
      } else {
        animation = null;
        setFoldAngle(store, to);
        sync();
      }
    };
    animation = requestAnimationFrame(step);
    sync();
  });

  explainButton.addEventListener('click', () => {
    patchState(store, { explain: !store.get().explain });
  });

  const sync = (): void => {
    const { foldAngle, explain } = store.get();
    const shown = Math.round(foldAngle);
    if (slider.value !== String(shown)) slider.value = String(shown);
    output.textContent = `${shown}°`;
    slider.setAttribute('aria-valuetext', `${shown} grados`);

    if (animation !== null) playButton.textContent = 'Detener';
    else if (foldAngle >= FOLDED_ANGLE_DEG) playButton.textContent = 'Deshacer abatimiento';
    else playButton.textContent = 'Reproducir abatimiento';

    explainButton.setAttribute('aria-pressed', String(explain));
    caption.hidden = !explain;
    const text = explanationFor(foldAngle);
    if (explain && caption.textContent !== text) caption.textContent = text;
  };

  store.subscribe(sync);
  sync();
}
