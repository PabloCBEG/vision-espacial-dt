// Deslizadores de x, alejamiento y cota del punto activo, enlazados al estado en los dos sentidos.
import { quadrant, type Point } from '../geometry/index.ts';
import { getPoint, setActiveCoordinate, type AppStore } from '../state/index.ts';
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
      setActiveCoordinate(store, axis, Number(input.value));
    });

    // Al mover el punto desde otro sitio (3D o lámina), el deslizador lo refleja.
    const sync = (): void => {
      const state = store.get();
      const value = getPoint(state, state.activePoint)[axis];
      if (input.value !== String(value)) input.value = String(value);
      input.disabled = state.locked;
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
    const state = store.get();
    const p = getPoint(state, state.activePoint);
    element.textContent = describePoint(p, quadrant(p), state.activePoint);
  };
  store.subscribe(() => {
    window.clearTimeout(timer);
    timer = window.setTimeout(update, 400);
  });
  update();
}
