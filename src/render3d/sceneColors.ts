// Colores de la escena, leídos de las variables CSS (cambian con el tema).
import { Color } from 'three';

export interface SceneColors {
  ph: Color;
  pv: Color;
  lt: Color;
  point: Color;
  cota: Color;
  alejamiento: Color;
  line: Color;
  trace: Color;
  plane: Color;
  profile: Color;
  /** Cuatro papeles de línea de los motores: auxiliar, proceso, datos y resultado. */
  aux: Color;
  process: Color;
  data: Color;
  result: Color;
  /** Plano de proyección nuevo (cambio de plano). */
  newPlane: Color;
  /** Caras de los sólidos. */
  solid: Color;
}

const VARIABLES: Record<keyof SceneColors, string> = {
  ph: '--scene-ph',
  pv: '--scene-pv',
  lt: '--scene-lt',
  point: '--scene-point',
  cota: '--scene-cota',
  alejamiento: '--scene-alejamiento',
  line: '--scene-line',
  trace: '--scene-trace',
  plane: '--scene-plane',
  profile: '--scene-profile',
  aux: '--scene-aux',
  process: '--scene-process',
  data: '--scene-data',
  result: '--scene-result',
  newPlane: '--scene-new-plane',
  solid: '--scene-solid',
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
    line: read(VARIABLES.line),
    trace: read(VARIABLES.trace),
    plane: read(VARIABLES.plane),
    profile: read(VARIABLES.profile),
    aux: read(VARIABLES.aux),
    process: read(VARIABLES.process),
    data: read(VARIABLES.data),
    result: read(VARIABLES.result),
    newPlane: read(VARIABLES.newPlane),
    solid: read(VARIABLES.solid),
  };
}
