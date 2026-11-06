// Deslizadores de x, alejamiento y cota del punto P, enlazados al estado en los dos sentidos.
import { quadrant, type Point } from '../geometry/index.ts';
import { setPointCoordinate, type AppStore } from '../state/index.ts';
import { describePoint, formatMm } from './format.ts';

const AXES: readonly (keyof Point)[] = ['x', 'a', 'c'];

export function bindPointControls(form: HTMLElement, store: AppStore): void {
  for (const axis of AXES) {
    const input = form.querySelector<HTMLInputElement>(`input[name="${axis}"]`);
    const output = form.querySelector<HTMLOutputElement>(`output[data-axis="${axis}"]`);
    if (!input || !output) {
      throw new Error(`Falta el deslizador de la coordenada ${axis}.`);
    }

    input.addEventListener('input', () => {
      setPointCoordinate(store, axis, Number(input.value));
    });

    // Al mover el punto desde otro sitio (arrastre en 3D), el deslizador lo refleja.
    const sync = (): void => {
      const value = store.get().point[axis];
      if (input.value !== String(value)) input.value = String(value);
      output.textContent = formatMm(value);
      input.setAttribute('aria-valuetext', formatMm(value));
    };
    store.subscribe(sync);
    sync();
  }
}

/** Mantiene al día un texto para lectores de pantalla, sin repetirlo en cada paso del deslizador. */
export function bindPointDescription(element: HTMLElement, store: AppStore): void {
  let timer: number | undefined;
  const update = (): void => {
    const p = store.get().point;
    element.textContent = describePoint(p, quadrant(p));
  };
  store.subscribe(() => {
    window.clearTimeout(timer);
    timer = window.setTimeout(update, 400);
  });
  update();
}
