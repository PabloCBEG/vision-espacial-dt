// Colores de la escena, leídos de las variables CSS (cambian con el tema).
import { Color } from 'three';

export interface SceneColors {
  ph: Color;
  pv: Color;
  lt: Color;
  point: Color;
  cota: Color;
  alejamiento: Color;
}

const VARIABLES: Record<keyof SceneColors, string> = {
  ph: '--scene-ph',
  pv: '--scene-pv',
  lt: '--scene-lt',
  point: '--scene-point',
  cota: '--scene-cota',
  alejamiento: '--scene-alejamiento',
};

export function readSceneColors(element: Element): SceneColors {
  const style = getComputedStyle(element);
  const read = (name: string): Color => new Color(style.getPropertyValue(name).trim() || '#888888');
  return {
    ph: read(VARIABLES.ph),
    pv: read(VARIABLES.pv),
    lt: read(VARIABLES.lt),
    point: read(VARIABLES.point),
    cota: read(VARIABLES.cota),
    alejamiento: read(VARIABLES.alejamiento),
  };
}
