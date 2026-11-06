// Etiquetas HTML ancladas a puntos de la escena (nítidas en móvil y proyector).
import type { Object3D } from 'three';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import type { Point } from '../geometry/index.ts';
import { toThree } from './coords.ts';

/** Hacia dónde se desplaza el texto respecto al punto anclado. */
export type LabelPlacement = 'ne' | 'nw' | 'se' | 'sw' | 'e' | 'w' | 'center';

const PLACEMENTS: readonly LabelPlacement[] = ['ne', 'nw', 'se', 'sw', 'e', 'w', 'center'];

/**
 * Crea una etiqueta. El elemento exterior mide 0×0 y queda justo sobre el punto;
 * el texto se desplaza con CSS según `placement` para no tapar el punto.
 */
export function createLabel(
  text: string,
  placement: LabelPlacement,
  className = '',
  name = '',
): CSS2DObject {
  const element = document.createElement('div');
  element.className = `scene-label label-${placement} ${className}`.trim();
  if (name) element.dataset.label = name;
  const span = document.createElement('span');
  span.textContent = text;
  element.append(span);
  return new CSS2DObject(element);
}

export function setLabelText(label: CSS2DObject, text: string): void {
  const span = label.element.firstElementChild;
  if (span && span.textContent !== text) span.textContent = text;
}

/**
 * Quita del documento los rótulos de un grupo. CSS2DRenderer no lo hace solo cuando se
 * retira un grupo entero de la escena, y quedarían rótulos sueltos.
 */
export function removeLabels(root: Object3D): void {
  root.traverse((object) => {
    if (object instanceof CSS2DObject) object.element.remove();
  });
}

/** Cambia hacia dónde se desplaza el texto de una etiqueta. */
export function setLabelPlacement(label: CSS2DObject, placement: LabelPlacement): void {
  const classes = label.element.classList;
  if (classes.contains(`label-${placement}`)) return;
  classes.remove(...PLACEMENTS.map((p) => `label-${p}`));
  classes.add(`label-${placement}`);
}

export function placeLabel(label: CSS2DObject, p: Point): void {
  label.position.copy(toThree(p));
}
