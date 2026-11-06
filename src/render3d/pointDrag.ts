// Arrastre directo en 3D de un punto y de sus proyecciones.
import { Plane, Raycaster, Vector2, Vector3, type Camera, type Object3D } from 'three';
import type { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createPoint, projectH, projectV, type Point } from '../geometry/index.ts';
import { fromThree, toThree } from './coords.ts';
import type { DragHandle, DragTarget } from './pointModel.ts';

export interface PointDragOptions {
  /** Elemento que contiene el lienzo: escucha antes que los controles de órbita. */
  container: HTMLElement;
  canvas: HTMLCanvasElement;
  camera: Camera;
  controls: OrbitControls;
  /** Zonas de arrastre actuales (cambian si cambian los objetos de la escena). */
  getTargets: () => Object3D[];
  getPoint: (id: string) => Point;
  setPoint: (id: string, p: Point) => void;
  /** Permite desactivar algunos arrastres (por ejemplo, P′ mientras el PH está abatido). */
  canDrag?: (target: DragTarget) => boolean;
}

interface ActiveDrag {
  target: DragTarget;
  pointerId: number;
  plane: Plane;
  /** Diferencia entre donde se tocó y el centro del objeto, para que no salte. */
  offset: Vector3;
}

function isDragTarget(value: unknown): value is DragTarget {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Partial<DragTarget>;
  return typeof v.pointId === 'string' && typeof v.handle === 'string';
}

/** Plano por el que se mueve cada objeto, en coordenadas de Three.js. */
function dragPlane(handle: DragHandle, p: Point): Plane {
  switch (handle) {
    case 'horizontal': // PH: Y = 0
      return new Plane(new Vector3(0, 1, 0), 0);
    case 'vertical': // PV: Z = 0
      return new Plane(new Vector3(0, 0, 1), 0);
    case 'point': // paralelo al PV por el punto: Z = a
      return new Plane(new Vector3(0, 0, 1), -p.a);
  }
}

function handlePosition(handle: DragHandle, p: Point): Point {
  if (handle === 'horizontal') return projectH(p);
  if (handle === 'vertical') return projectV(p);
  return p;
}

/** Activa el arrastre. Devuelve una función que lo desactiva. */
export function attachPointDrag(options: PointDragOptions): () => void {
  const { container, canvas, camera, controls } = options;
  const canDrag = options.canDrag ?? (() => true);
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

  function pick(event: PointerEvent): DragTarget | null {
    setRay(event);
    const visibleTargets = options.getTargets().filter((t) => isVisible(t));
    for (const hit of raycaster.intersectObjects(visibleTargets, false)) {
      const target: unknown = hit.object.userData.dragTarget;
      if (isDragTarget(target) && canDrag(target)) return target;
    }
    return null;
  }

  function onPointerDown(event: PointerEvent): void {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    const target = pick(event);
    if (!target) return; // no se ha tocado ningún punto: la cámara gira con normalidad

    const p = options.getPoint(target.pointId);
    const plane = dragPlane(target.handle, p);
    const hitPoint = raycaster.ray.intersectPlane(plane, new Vector3());
    if (!hitPoint) return;

    event.stopPropagation(); // los controles de órbita no se enteran
    event.preventDefault();
    controls.enabled = false;
    canvas.setPointerCapture(event.pointerId);
    canvas.style.cursor = 'grabbing';
    drag = {
      target,
      pointerId: event.pointerId,
      plane,
      offset: hitPoint.sub(toThree(handlePosition(target.handle, p))),
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
    const { pointId, handle } = drag.target;
    const p = options.getPoint(pointId);
    if (handle === 'horizontal') {
      options.setPoint(pointId, createPoint(q.x, q.a, p.c));
    } else {
      options.setPoint(pointId, createPoint(q.x, p.a, q.c));
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

/** Un objeto cuenta como visible si él y todos sus padres lo son. */
function isVisible(object: Object3D): boolean {
  let current: Object3D | null = object;
  while (current) {
    if (!current.visible) return false;
    current = current.parent;
  }
  return true;
}
