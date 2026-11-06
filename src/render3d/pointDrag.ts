// Arrastre directo en 3D de P, P′ y P″.
import { Plane, Raycaster, Vector2, Vector3, type Camera, type Object3D } from 'three';
import type { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createPoint, projectH, projectV, type Point } from '../geometry/index.ts';
import { fromThree, toThree } from './coords.ts';
import type { DragHandle } from './pointModel.ts';

export interface PointDragOptions {
  /** Elemento que contiene el lienzo: escucha antes que los controles de órbita. */
  container: HTMLElement;
  canvas: HTMLCanvasElement;
  camera: Camera;
  controls: OrbitControls;
  targets: Object3D[];
  getPoint: () => Point;
  setPoint: (p: Point) => void;
}

interface ActiveDrag {
  handle: DragHandle;
  pointerId: number;
  plane: Plane;
  /** Diferencia entre donde se tocó y el centro del objeto, para que no salte. */
  offset: Vector3;
}

/** Activa el arrastre. Devuelve una función que lo desactiva. */
export function attachPointDrag(options: PointDragOptions): () => void {
  const { container, canvas, camera, controls, targets } = options;
  const raycaster = new Raycaster();
  const ndc = new Vector2();
  let drag: ActiveDrag | null = null;

  function setRay(event: PointerEvent): void {
    const rect = canvas.getBoundingClientRect();
    ndc.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1,
    );
    raycaster.setFromCamera(ndc, camera);
  }

  function pick(event: PointerEvent): DragHandle | null {
    setRay(event);
    const hit = raycaster.intersectObjects(targets, false)[0];
    const handle: unknown = hit?.object.userData.handle;
    return handle === 'point' || handle === 'horizontal' || handle === 'vertical' ? handle : null;
  }

  /** Plano por el que se mueve cada objeto, en coordenadas de Three.js. */
  function dragPlane(handle: DragHandle, p: Point): Plane {
    switch (handle) {
      case 'horizontal': // PH: Y = 0
        return new Plane(new Vector3(0, 1, 0), 0);
      case 'vertical': // PV: Z = 0
        return new Plane(new Vector3(0, 0, 1), 0);
      case 'point': // paralelo al PV por P: Z = a
        return new Plane(new Vector3(0, 0, 1), -p.a);
    }
  }

  function handlePosition(handle: DragHandle, p: Point): Point {
    if (handle === 'horizontal') return projectH(p);
    if (handle === 'vertical') return projectV(p);
    return p;
  }

  function onPointerDown(event: PointerEvent): void {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    const handle = pick(event);
    if (!handle) return; // no se ha tocado el punto: la cámara gira con normalidad

    const p = options.getPoint();
    const plane = dragPlane(handle, p);
    const hitPoint = raycaster.ray.intersectPlane(plane, new Vector3());
    if (!hitPoint) return;

    event.stopPropagation(); // los controles de órbita no se enteran
    event.preventDefault();
    controls.enabled = false;
    canvas.setPointerCapture(event.pointerId);
    canvas.style.cursor = 'grabbing';
    drag = {
      handle,
      pointerId: event.pointerId,
      plane,
      offset: hitPoint.sub(toThree(handlePosition(handle, p))),
    };
  }

  function onPointerMove(event: PointerEvent): void {
    if (!drag) {
      if (event.pointerType === 'mouse') {
        canvas.style.cursor = pick(event) ? 'grab' : '';
      }
      return;
    }
    if (event.pointerId !== drag.pointerId) return;
    setRay(event);
    const hitPoint = raycaster.ray.intersectPlane(drag.plane, new Vector3());
    if (!hitPoint) return; // el plano se ve de canto: se ignora el movimiento
    const q = fromThree(hitPoint.sub(drag.offset));
    const p = options.getPoint();
    if (drag.handle === 'horizontal') {
      options.setPoint(createPoint(q.x, q.a, p.c));
    } else {
      options.setPoint(createPoint(q.x, p.a, q.c));
    }
  }

  function onPointerUp(event: PointerEvent): void {
    if (!drag || event.pointerId !== drag.pointerId) return;
    if (canvas.hasPointerCapture(event.pointerId)) {
      canvas.releasePointerCapture(event.pointerId);
    }
    drag = null;
    controls.enabled = true;
    canvas.style.cursor = '';
  }

  // En fase de captura sobre el contenedor: llega antes que a los controles de órbita.
  container.addEventListener('pointerdown', onPointerDown, { capture: true });
  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerup', onPointerUp);
  canvas.addEventListener('pointercancel', onPointerUp);

  return () => {
    container.removeEventListener('pointerdown', onPointerDown, { capture: true });
    canvas.removeEventListener('pointermove', onPointerMove);
    canvas.removeEventListener('pointerup', onPointerUp);
    canvas.removeEventListener('pointercancel', onPointerUp);
  };
}
