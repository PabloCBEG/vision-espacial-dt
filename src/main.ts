import './style.css';
import { SheetView } from './render2d/index.ts';
import { SpatialView } from './render3d/index.ts';
import { createAppStore } from './state/index.ts';
import {
  bindPointControls,
  bindPointDescription,
  bindProjectorToggle,
  bindSheetZoom,
  bindThemeToggle,
  bindViewButtons,
} from './ui/index.ts';

function required<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`Falta el elemento ${selector} en index.html.`);
  return element;
}

const store = createAppStore();

bindThemeToggle(required<HTMLButtonElement>('#theme-toggle'));
bindProjectorToggle(required<HTMLButtonElement>('#projector-toggle'), store);
bindPointControls(required<HTMLFormElement>('#point-controls'), store);
bindPointDescription(required<HTMLElement>('#point-description'), store);

const sheet = new SheetView(required<HTMLElement>('#view-2d'), store);
bindSheetZoom(required<HTMLElement>('#sheet-zoom'), sheet);

const view3dElement = required<HTMLElement>('#view-3d');
try {
  const spatialView = new SpatialView(view3dElement, store);
  bindViewButtons(required<HTMLElement>('#view-buttons'), spatialView);
} catch (error) {
  console.error(error);
  view3dElement.innerHTML =
    '<p class="placeholder">Este navegador no puede mostrar el modelo 3D (necesita WebGL).</p>';
}
