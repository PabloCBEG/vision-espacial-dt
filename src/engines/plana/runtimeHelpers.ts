// Datos del puente 3D a partir de la construcción (los puntos ya calculados).
import type { BridgeInput } from './bridge.ts';
import type { PlaneController } from './controller.ts';
import type { Pt } from './geometry.ts';

export function bridgeInput(controller: PlaneController): BridgeInput | null {
  const bridge = controller.data?.puente3d;
  if (!bridge) return null;
  const figure = bridge.figura.map((id) => controller.pointOf(id));
  const axis = bridge.eje.map((id) => controller.pointOf(id));
  if (figure.some((p) => !p) || axis.some((p) => !p)) return null;
  return {
    kind: bridge.tipo,
    figure: figure as Pt[],
    axis: axis as [Pt, Pt],
    angleDeg: bridge.angulo,
    light: bridge.luz,
  };
}
