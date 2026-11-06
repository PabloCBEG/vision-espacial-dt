// Botones de zoom de la lámina: acercar, alejar y encuadrar.
import type { SheetView } from '../render2d/index.ts';

export function bindSheetZoom(group: HTMLElement, sheet: SheetView): void {
  const actions: Record<string, () => void> = {
    in: () => sheet.zoomIn(),
    out: () => sheet.zoomOut(),
    fit: () => sheet.fit(),
  };
  for (const button of group.querySelectorAll<HTMLButtonElement>('button[data-zoom]')) {
    const action = actions[button.dataset.zoom ?? ''];
    if (action) button.addEventListener('click', action);
  }
}
