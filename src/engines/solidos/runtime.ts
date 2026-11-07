// Ejecución del motor de sólidos: vista 3D, lámina y controles (deslizadores de los
// movimientos y aviso con el tipo de cónica).
import type { EngineHost, EngineRuntime } from '../types.ts';
import type { Animated } from './construction.ts';
import { SolidsController } from './controller.ts';
import { SOLIDS_DEFINITION } from './definition.ts';
import { SolidsScene } from './scene3d.ts';
import { SolidsSheet } from './sheet2d.ts';

const SLIDERS: readonly { key: keyof Animated; label: string }[] = [
  { key: 'quitar', label: 'Retirar la parte cortada' },
  { key: 'abatir', label: 'Abatir la sección' },
  { key: 'desarrollo', label: 'Desarrollo' },
];

export const SOLIDS_RUNTIME: EngineRuntime = {
  definition: SOLIDS_DEFINITION,
  mount(host: EngineHost): () => void {
    const controller = new SolidsController(host.store);
    const scene = new SolidsScene(controller);
    const sheet = new SolidsSheet(controller);
    const unmountScene = host.spatial?.use(scene);
    const unmountSheet = host.sheet.use(sheet);
    const panel = buildControls(controller);
    host.controls.append(panel.element);
    controller.listeners.add(() => {
      scene.draw();
      host.spatial?.redraw();
      host.sheet.redraw();
      panel.update();
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

function buildControls(controller: SolidsController): { element: HTMLElement; update(): void } {
  const element = document.createElement('div');
  element.className = 'methods-controls solids-controls';
  element.setAttribute('role', 'group');
  element.setAttribute('aria-label', 'Sólido');
  element.hidden = true;

  const sliders = SLIDERS.map(({ key, label }) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'slider methods-slider';
    const id = `slider-solid-${key}`;
    wrapper.innerHTML = `
      <label for="${id}">${label}</label>
      <output for="${id}">0 %</output>
      <input id="${id}" type="range" min="0" max="100" step="1" value="0" />`;
    const input = wrapper.querySelector('input') as HTMLInputElement;
    const output = wrapper.querySelector('output') as HTMLOutputElement;
    input.addEventListener('input', () => controller.scrub(key, Number(input.value) / 100));
    element.append(wrapper);
    return { key, wrapper, input, output };
  });

  const notice = document.createElement('p');
  notice.className = 'methods-notice';
  notice.setAttribute('role', 'status');
  element.append(notice);

  return {
    element,
    update(): void {
      const data = controller.data;
      const scene = controller.scene;
      element.hidden = !data;
      if (!data) return;
      const present: Record<keyof Animated, boolean> = {
        quitar: Boolean(data.seccion && data.seccion.quitar > 0),
        abatir: Boolean(data.seccion && data.seccion.abatir > 0),
        desarrollo: data.desarrollo !== undefined,
        punto: false,
      };
      for (const s of sliders) {
        s.wrapper.hidden = !present[s.key];
        const percent = Math.round(controller.tweens.values[s.key] * 100);
        if (document.activeElement !== s.input) s.input.value = String(percent);
        s.output.textContent = `${percent} %`;
      }
      const conic = scene?.cut?.conic;
      const text = scene?.notice ?? (conic ? `Sección: ${conic.kind}. ${conic.why}` : '');
      notice.textContent = text;
      notice.hidden = !text;
      // Sin nada que mostrar, el panel no ocupa sitio.
      element.hidden = !text && sliders.every((sl) => sl.wrapper.hidden);
    },
  };
}
