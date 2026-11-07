// Módulo enchufable de la lámina: un motor (métodos, sólidos…) dibuja sus propias capas
// sin tocar el resto de la lámina. Se registra con SheetView.use(módulo).
import type { AppState } from '../state/index.ts';
import type { ViewBox } from './viewport.ts';

export type LabelAnchor = 'start' | 'middle' | 'end';

export interface SheetDrawContext {
  readonly state: AppState;
  /** Milímetros por píxel de pantalla: multiplica por él los tamaños que no deben escalar. */
  readonly mmPerPx: number;
  /** Grupo SVG de una capa con nombre ("abatimiento:α"…). Se vacía en cada dibujo. */
  layer(tag: string): SVGGElement;
  /** Rótulo de tamaño constante en pantalla. Coordenadas de la lámina (y hacia abajo). */
  label(text: string, x: number, y: number, anchor: LabelAnchor, pending?: boolean): SVGTextElement;
}

export interface SheetModule {
  readonly id: string;
  /** Dibuja sus capas. Se llama cada vez que cambia el estado. */
  draw(ctx: SheetDrawContext): void;
  /** Encuadre extra que necesita (se une con el encuadre normal), o null. */
  fitBox?(state: AppState): ViewBox | null;
  /** Capas que se ven aunque el paso no las nombre (avisos, cuadrículas…). */
  isAlwaysVisible?(tag: string): boolean;
}
