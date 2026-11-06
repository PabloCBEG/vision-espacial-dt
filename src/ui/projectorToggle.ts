// Botón "Modo proyector": trazos más gruesos, más contraste y letra más grande en los dos paneles.
import { patchState, type AppStore } from '../state/index.ts';

const PROJECTOR_KEY = 'projector';

export function bindProjectorToggle(button: HTMLButtonElement, store: AppStore): void {
  // Preferencia guardada solo en este navegador.
  try {
    if (localStorage.getItem(PROJECTOR_KEY) === 'on') patchState(store, { projector: true });
  } catch {
    // Sin acceso a localStorage: empieza desactivado.
  }

  const sync = (): void => {
    const on = store.get().projector;
    button.setAttribute('aria-pressed', String(on));
    if (on) document.documentElement.dataset.projector = 'on';
    else delete document.documentElement.dataset.projector;
  };

  button.addEventListener('click', () => {
    const on = !store.get().projector;
    patchState(store, { projector: on });
    try {
      localStorage.setItem(PROJECTOR_KEY, on ? 'on' : 'off');
    } catch {
      // Sin acceso a localStorage: solo para esta visita.
    }
  });

  store.subscribe(sync);
  sync();
}
