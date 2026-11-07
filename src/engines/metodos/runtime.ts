// Ejecución del motor de métodos: monta la vista 3D, la lámina y sus controles
// (selector de método, repetir el movimiento y deslizador del movimiento).
import { createPoint } from '../../geometry/index.ts';
import type { EngineHost, EngineRuntime } from '../types.ts';
import { MethodsController } from './controller.ts';
import { METHODS_DEFINITION, METHOD_NAMES, type MethodName } from './definition.ts';
import { newPlaneFrame } from './geometry.ts';
import { MethodsScene } from './scene3d.ts';
import { MethodsSheet } from './sheet2d.ts';

const METHOD_TITLES: Record<MethodName, string> = {
  abatimiento: 'Abatimiento',
  giro: 'Giro',
  cambio: 'Cambio de plano',
};

export const METHODS_RUNTIME: EngineRuntime = {
  definition: METHODS_DEFINITION,
  mount(host: EngineHost): () => void {
    const controller = new MethodsController(host.store);
    const scene = new MethodsScene(controller);
    const sheet = new MethodsSheet(controller);
    const unmountScene = host.spatial?.use(scene);
    const unmountSheet = host.sheet.use(sheet);
    const panel = buildControls(controller);
    host.controls.append(panel.element);

    let lookedAt = '';
    controller.listeners.add(() => {
      scene.draw();
      host.spatial?.redraw();
      host.sheet.redraw();
      panel.update();
      // Cambio de plano: al terminar, la cámara mira de frente al plano nuevo.
      const k = controller.construction;
      const data = controller.data;
      if (k?.method === 'cambio' && data?.mirarPlanoNuevo && controller.progress >= 0.999) {
        const key = JSON.stringify(k.lt);
        if (key !== lookedAt) {
          lookedAt = key;
          const { origin, normal } = newPlaneFrame(k.lt);
          // Desde el lado de la figura, perpendicular al plano nuevo.
          const first = k.figure[0]?.p ?? origin;
          const side =
            (first.x - origin.x) * normal.x +
            (first.a - origin.a) * normal.a +
            (first.c - origin.c) * normal.c;
          const s = side >= 0 ? 1 : -1;
          // Después de que el paso coloque su cámara (va justo detrás, en el mismo cambio).
          const direction = createPoint(normal.x * s, normal.a * s, normal.c * s);
          window.setTimeout(() => host.spatial?.lookFrom(direction), 0);
        }
      } else if (controller.progress < 0.999) {
        lookedAt = '';
      }
    });
    const unsubscribe = host.store.subscribe((state) => controller.sync(state));
    controller.sync(host.store.get());

    return () => {
      unsubscribe();
      controller.dispose();
      unmountScene?.();
      unmountSheet();
      panel.element.remove();
    };
  },
};

interface Panel {
  element: HTMLElement;
  update(): void;
}

function buildControls(controller: MethodsController): Panel {
  const element = document.createElement('div');
  element.className = 'methods-controls';
  element.setAttribute('role', 'group');
  element.setAttribute('aria-label', 'Método');
  element.hidden = true;

  const selector = document.createElement('div');
  selector.className = 'view-buttons';
  selector.setAttribute('role', 'group');
  selector.setAttribute('aria-label', 'Elige el método');
  const buttons = METHOD_NAMES.map((method) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = METHOD_TITLES[method];
    button.dataset.method = method;
    button.addEventListener('click', () => controller.setMethod(method));
    selector.append(button);
    return button;
  });

  const replay = document.createElement('button');
  replay.type = 'button';
  replay.className = 'action-button';
  replay.textContent = 'Repetir el movimiento';
  replay.addEventListener('click', () => controller.replay());

  const slider = document.createElement('div');
  slider.className = 'slider methods-slider';
  slider.innerHTML = `
    <label for="slider-method">Movimiento</label>
    <output id="output-method" for="slider-method">0 %</output>
    <input id="slider-method" type="range" min="0" max="100" step="1" value="0" />`;
  const input = slider.querySelector('input') as HTMLInputElement;
  const output = slider.querySelector('output') as HTMLOutputElement;
  input.addEventListener('input', () => controller.scrub(Number(input.value) / 100));

  const notice = document.createElement('p');
  notice.className = 'methods-notice';
  notice.setAttribute('role', 'status');

  element.append(selector, replay, slider, notice);

  return {
    element,
    update(): void {
      const data = controller.data;
      const k = controller.construction;
      element.hidden = !data;
      if (!data) return;
      selector.hidden = !data.selector;
      for (const button of buttons) {
        button.setAttribute('aria-pressed', String(button.dataset.method === data.metodo));
      }
      const movable = k !== null && k.method !== null;
      replay.hidden = !movable;
      slider.hidden = !movable;
      const percent = Math.round(controller.progress * 100);
      if (document.activeElement !== input) input.value = String(percent);
      output.textContent = `${percent} %`;
      notice.textContent = k?.notice ?? '';
      notice.hidden = !k?.notice;
    },
  };
}
