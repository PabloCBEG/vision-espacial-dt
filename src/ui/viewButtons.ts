// Botones de vista rápida: perspectiva, frontal, superior y perfil.
import { isViewName, type SpatialView, type ViewName } from '../render3d/index.ts';

export function bindViewButtons(group: HTMLElement, view: SpatialView): void {
  const buttons = [...group.querySelectorAll<HTMLButtonElement>('button[data-view]')];

  // Marca la vista activa; ninguna si el usuario ha girado la cámara a mano.
  const markActive = (active: ViewName | null): void => {
    for (const button of buttons) {
      button.setAttribute('aria-pressed', String(button.dataset.view === active));
    }
  };

  for (const button of buttons) {
    const name = button.dataset.view;
    if (!isViewName(name)) continue;
    button.addEventListener('click', () => view.setView(name));
  }

  view.onViewChange = markActive;
  markActive('perspective');
}
