// Ejecución del motor de geometría plana: lámina con la construcción y los puntos que se
// arrastran, puente 3D opcional y controles (velocidad del trazado, repetir, auxiliares,
// barrer el lugar geométrico y abatir el plano de la sombra).
import type { EngineHost, EngineRuntime } from '../types.ts';
import { Tweens } from '../shared/tween.ts';
import { PlaneController } from './controller.ts';
import { PLANE_DEFINITION } from './definition.ts';
import { PlaneScene } from './scene3d.ts';
import { PlaneSheet } from './sheet2d.ts';

let active: PlaneController | null = null;

export const PLANE_RUNTIME: EngineRuntime = {
  definition: PLANE_DEFINITION,
  mount(host: EngineHost): () => void {
    const controller = new PlaneController(host.store);
    active = controller;
    const sheet = new PlaneSheet(controller);
    const scene = new PlaneScene(controller);
    const unmountSheet = host.sheet.use(sheet);
    sheet.attach(host.sheet);
    const unmountScene = host.spatial?.use(scene);
    const fold = new Tweens({ abatir: 0 }, () => {
      scene.fold = fold.values.abatir;
      sheet.bridgeFold = fold.values.abatir;
      scene.draw();
      host.spatial?.redraw();
      host.sheet.redraw();
      panel.update();
    });
    const panel = buildControls(controller, fold);
    host.controls.append(panel.element);
    const sheetContainer = host.sheet.container;

    controller.listeners.add(() => {
      host.sheet.redraw();
      scene.draw();
      host.spatial?.redraw();
      panel.update();
      // Lecciones de geometría plana sin puente 3D: solo la lámina, a todo lo ancho.
      const data = controller.data;
      // Con puente 3D se ven las dos vistas, pero sin los controles del diédrico.
      if (data) document.body.dataset.layout = data.puente3d ? 'bridge' : 'sheet';
      else delete document.body.dataset.layout;
      fold.setTargets({ abatir: data?.puente3d?.abatir ?? 0 });
    });
    const unsubscribe = host.store.subscribe((state) => controller.sync(state));
    controller.sync(host.store.get());

    return () => {
      unsubscribe();
      fold.stop();
      controller.dispose();
      sheet.detach();
      unmountSheet();
      unmountScene?.();
      panel.element.remove();
      sheetContainer.classList.remove('hide-aux');
      delete document.body.dataset.layout;
      if (active === controller) active = null;
    };
  },
  check: () => active?.check() ?? null,
};

function buildControls(
  controller: PlaneController,
  fold: Tweens<'abatir'>,
): { element: HTMLElement; update(): void } {
  const element = document.createElement('div');
  element.className = 'methods-controls plane-controls';
  element.setAttribute('role', 'group');
  element.setAttribute('aria-label', 'Construcción');
  element.hidden = true;

  const replay = document.createElement('button');
  replay.type = 'button';
  replay.className = 'action-button';
  replay.textContent = 'Repetir el trazado';
  replay.addEventListener('click', () => controller.startDrawing());

  const aux = document.createElement('button');
  aux.type = 'button';
  aux.className = 'action-button';
  aux.setAttribute('aria-pressed', 'false');
  aux.textContent = 'Ocultar auxiliares';
  aux.addEventListener('click', () => {
    const view = document.querySelector('#view-2d');
    const hidden = view?.classList.toggle('hide-aux') ?? false;
    aux.setAttribute('aria-pressed', String(hidden));
    aux.textContent = hidden ? 'Mostrar auxiliares' : 'Ocultar auxiliares';
  });

  const sweep = document.createElement('button');
  sweep.type = 'button';
  sweep.className = 'action-button';
  sweep.textContent = 'Dibujar el lugar';
  sweep.addEventListener('click', () => controller.sweepLocus());

  const speed = document.createElement('div');
  speed.className = 'slider methods-slider';
  speed.innerHTML = `
    <label for="slider-plane-speed">Velocidad del trazado</label>
    <output for="slider-plane-speed"></output>
    <input id="slider-plane-speed" type="range" min="0.25" max="3" step="0.25" />`;
  const speedInput = speed.querySelector('input') as HTMLInputElement;
  const speedOutput = speed.querySelector('output') as HTMLOutputElement;
  speedInput.addEventListener('input', () => controller.setSpeed(Number(speedInput.value)));

  const foldSlider = document.createElement('div');
  foldSlider.className = 'slider methods-slider';
  foldSlider.innerHTML = `
    <label for="slider-plane-fold">Abatir el plano de la sombra</label>
    <output for="slider-plane-fold">0 %</output>
    <input id="slider-plane-fold" type="range" min="0" max="100" step="1" value="0" />`;
  const foldInput = foldSlider.querySelector('input') as HTMLInputElement;
  const foldOutput = foldSlider.querySelector('output') as HTMLOutputElement;
  foldInput.addEventListener('input', () => {
    fold.stop();
    fold.set('abatir', Number(foldInput.value) / 100);
  });

  const notice = document.createElement('p');
  notice.className = 'methods-notice';
  notice.setAttribute('role', 'status');

  element.append(replay, aux, sweep, speed, foldSlider, notice);

  return {
    element,
    update(): void {
      const data = controller.data;
      element.hidden = !data;
      if (!data) return;
      replay.hidden = (data.trazar ?? []).length === 0;
      sweep.hidden = !data.lugar;
      speed.hidden = replay.hidden;
      if (document.activeElement !== speedInput) speedInput.value = String(controller.speed);
      speedOutput.textContent = `× ${String(controller.speed).replace('.', ',')}`;
      foldSlider.hidden = !data.puente3d;
      const percent = Math.round(fold.values.abatir * 100);
      if (document.activeElement !== foldInput) foldInput.value = String(percent);
      foldOutput.textContent = `${percent} %`;
      notice.textContent = controller.problem ?? '';
      notice.hidden = !controller.problem;
    },
  };
}
