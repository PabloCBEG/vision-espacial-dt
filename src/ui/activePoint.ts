// Selector del punto que mueven los deslizadores, cuando la escena tiene varios.
import { patchState, type AppStore } from '../state/index.ts';

export interface ActivePointElements {
  wrapper: HTMLElement;
  select: HTMLSelectElement;
  form: HTMLElement;
  hint: HTMLElement;
}

export function bindActivePoint(el: ActivePointElements, store: AppStore): void {
  el.select.addEventListener('change', () => {
    patchState(store, { activePoint: el.select.value });
  });

  let lastIds = '';
  const sync = (): void => {
    const state = store.get();
    const ids = state.objects.filter((o) => o.kind === 'point').map((o) => o.id);
    if (ids.join() !== lastIds) {
      lastIds = ids.join();
      el.select.replaceChildren(
        ...ids.map((id) => {
          const option = document.createElement('option');
          option.value = id;
          option.textContent = id;
          return option;
        }),
      );
    }
    el.wrapper.hidden = ids.length <= 1;
    // Sin puntos en la escena (por ejemplo, una lección de sólidos), no hay deslizadores.
    el.form.hidden = ids.length === 0;
    el.select.value = state.activePoint;
    const p = state.activePoint;
    el.form.setAttribute('aria-label', `Coordenadas del punto ${p}`);
    el.hint.textContent = `Mueve ${p} con los deslizadores o arrastra ${p}, ${p}′ o ${p}″ en el modelo o en la lámina.`;
  };
  store.subscribe(sync);
  sync();
}
