// Ejecución del motor de normalización: vista 3D, lámina y controles (desplegar la caja,
// retirar la parte cortada y las opciones de los ejercicios, con miniaturas de cada dibujo).
import { svgElement } from '../../render2d/svg.ts';
import type { EngineHost, EngineRuntime } from '../types.ts';
import { NormController, VIEW_LABELS } from './controller.ts';
import { NORM_DEFINITION } from './definition.ts';
import { placeInSheet, type PieceDrawing } from './drawing.ts';
import { NormScene } from './scene3d.ts';
import { NormSheet } from './sheet2d.ts';
import type { ViewName } from './views.ts';

let active: NormController | null = null;

export const NORM_RUNTIME: EngineRuntime = {
  definition: NORM_DEFINITION,
  mount(host: EngineHost): () => void {
    const controller = new NormController(host.store);
    active = controller;
    const scene = new NormScene(controller);
    const sheet = new NormSheet(controller);
    const unmountScene = host.spatial?.use(scene);
    const unmountSheet = host.sheet.use(sheet);
    const panel = buildControls(controller);
    host.controls.append(panel.element);
    controller.listeners.add(() => {
      scene.draw();
      host.spatial?.redraw();
      host.sheet.redraw();
      panel.update();
      if (controller.data) document.body.dataset.layout = 'norm';
      else if (document.body.dataset.layout === 'norm') delete document.body.dataset.layout;
    });
    const unsubscribe = host.store.subscribe((state) => controller.sync(state));
    controller.sync(host.store.get());
    return () => {
      unsubscribe();
      controller.dispose();
      unmountScene?.();
      unmountSheet();
      panel.element.remove();
      if (active === controller) active = null;
    };
  },
  check: () => active?.check() ?? null,
};

function buildControls(controller: NormController): { element: HTMLElement; update(): void } {
  const element = document.createElement('div');
  element.className = 'methods-controls norm-controls';
  element.setAttribute('role', 'group');
  element.setAttribute('aria-label', 'Pieza');
  element.hidden = true;

  const slider = (id: string, label: string, key: 'desplegar' | 'quitar') => {
    const wrapper = document.createElement('div');
    wrapper.className = 'slider methods-slider';
    wrapper.innerHTML = `
      <label for="${id}">${label}</label>
      <output for="${id}">0 %</output>
      <input id="${id}" type="range" min="0" max="100" step="1" value="0" />`;
    const input = wrapper.querySelector('input') as HTMLInputElement;
    const output = wrapper.querySelector('output') as HTMLOutputElement;
    input.addEventListener('input', () => {
      controller.tweens.stop();
      controller.tweens.set(key, Number(input.value) / 100);
    });
    return { wrapper, input, output, key };
  };
  const sliders = [
    slider('slider-norm-unfold', 'Desplegar la caja', 'desplegar'),
    slider('slider-norm-cut', 'Retirar la parte cortada', 'quitar'),
  ];

  const choices = document.createElement('div');
  choices.className = 'norm-choices';
  choices.setAttribute('role', 'group');
  choices.setAttribute('aria-label', 'Opciones del ejercicio');

  const notice = document.createElement('p');
  notice.className = 'methods-notice';
  notice.setAttribute('role', 'status');

  element.append(...sliders.map((s) => s.wrapper), choices, notice);
  let choiceKey = '';

  return {
    element,
    update(): void {
      const data = controller.data;
      element.hidden = !data;
      if (!data) return;
      for (const s of sliders) {
        const present = s.key === 'desplegar' ? Boolean(data.caja) : Boolean(data.corte);
        s.wrapper.hidden = !present;
        const percent = Math.round(controller.tweens.values[s.key] * 100);
        if (document.activeElement !== s.input) s.input.value = String(percent);
        s.output.textContent = `${percent} %`;
      }
      notice.textContent = controller.problem ?? (controller.loading ? 'Preparando la pieza…' : '');
      notice.hidden = !notice.textContent;

      // Opciones del ejercicio: se vuelven a crear solo si cambian.
      const ex = data.ejercicio;
      const key = JSON.stringify([ex, controller.options.length, data.pieza]);
      if (key !== choiceKey) {
        choiceKey = key;
        choices.replaceChildren(...buildChoices(controller));
      }
      const chosen = new Set(data.eleccion ?? []);
      for (const button of choices.querySelectorAll<HTMLButtonElement>('button[data-index]')) {
        button.setAttribute('aria-pressed', String(chosen.has(Number(button.dataset.index))));
      }
      choices.hidden = !ex;
      // Sin nada que mostrar, el panel no ocupa sitio.
      element.hidden = !ex && !notice.textContent && sliders.every((sl) => sl.wrapper.hidden);
    },
  };
}

function buildChoices(controller: NormController): HTMLElement[] {
  const data = controller.data;
  const ex = data?.ejercicio;
  if (!data || !ex) return [];
  const button = (
    index: number,
    label: string,
    single: boolean,
    content?: Element,
  ): HTMLButtonElement => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'action-button norm-choice';
    b.dataset.index = String(index);
    b.setAttribute('aria-label', label);
    if (content) b.append(content);
    const caption = document.createElement('span');
    caption.textContent = label;
    b.append(caption);
    b.addEventListener('click', () => controller.toggle(index, single));
    return b;
  };
  switch (ex.tipo) {
    case 'vistaQueFalta':
      return controller.options.map((d, i) =>
        button(i, `Opción ${i + 1}`, true, thumbnail(d, ex.falta)),
      );
    case 'corte':
      return controller.options.map((d, i) =>
        button(i, `Opción ${i + 1}`, true, thumbnail(d, ex.opciones[i]?.vista ?? 'alzado')),
      );
    case 'vistasNecesarias':
      return (['alzado', 'planta', 'perfil'] as const).map((v, i) =>
        button(i, VIEW_LABELS[v], false),
      );
    case 'cotas':
      return ex.candidatas.map((c, i) =>
        button(i, `Cota ${i + 1} (${VIEW_LABELS[c.vista].toLowerCase()})`, false),
      );
  }
}

/** Miniatura SVG de una vista de una pieza (para las opciones de los ejercicios). */
function thumbnail(d: PieceDrawing, view: ViewName): SVGSVGElement {
  const r = d.views[view];
  const segs = [...r.visible, ...r.hidden, ...r.hatch].map((s) => [
    placeInSheet(view, d.bounds, s.x1, s.y1),
    placeInSheet(view, d.bounds, s.x2, s.y2),
  ]);
  const xs = segs.flat().map((p) => p.x);
  const ys = segs.flat().map((p) => -p.y);
  const pad = 4;
  const x = Math.min(...xs) - pad;
  const y = Math.min(...ys) - pad;
  const w = Math.max(...xs) - x + pad;
  const h = Math.max(...ys) - y + pad;
  const svg = svgElement(
    'svg',
    { viewBox: `${x} ${y} ${w} ${h}`, width: 120, height: 90 },
    'norm-thumb',
  );
  svg.setAttribute('aria-hidden', 'true');
  const add = (list: typeof r.visible, cls: string): void => {
    for (const s of list) {
      const p = placeInSheet(view, d.bounds, s.x1, s.y1);
      const q = placeInSheet(view, d.bounds, s.x2, s.y2);
      svg.append(svgElement('line', { x1: p.x, y1: -p.y, x2: q.x, y2: -q.y }, cls));
    }
  };
  add(r.hatch, 'norm-hatch');
  add(r.hidden, 'norm-hidden');
  add(r.visible, 'norm-visible');
  return svg;
}
