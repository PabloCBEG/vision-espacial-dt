// Botones del modo libre para elegir qué explorar: un punto, una recta o un plano.
import { FREE_SCENES, type FreeSceneName } from '../content/freeScenes.ts';
import { INITIAL_STATE, type AppStore } from '../state/index.ts';

const isSceneName = (value: unknown): value is FreeSceneName =>
  value === 'punto' || value === 'recta' || value === 'plano';

/** Devuelve la función que carga una escena (también la usa la navegación). */
export function bindFreeScenes(group: HTMLElement, store: AppStore): (name: FreeSceneName) => void {
  const buttons = [...group.querySelectorAll<HTMLButtonElement>('button[data-scene]')];

  const load = (name: FreeSceneName): void => {
    const current = store.get();
    store.set({
      ...INITIAL_STATE,
      ...FREE_SCENES[name],
      projector: current.projector,
      explain: current.explain,
    });
    for (const button of buttons) {
      button.setAttribute('aria-pressed', String(button.dataset.scene === name));
    }
  };

  for (const button of buttons) {
    button.addEventListener('click', () => {
      const name = button.dataset.scene;
      if (isSceneName(name)) load(name);
    });
  }
  return load;
}
