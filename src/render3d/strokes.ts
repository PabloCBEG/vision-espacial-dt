// Cuatro grosores de línea con significado (CLAUDE.md), en píxeles, para la vista 3D.
// En la lámina son los tokens CSS --stroke-aux, --stroke-process, --stroke-data y --stroke-result.
export const STROKE_PX = {
  /** Construcción auxiliar: la más fina. */
  aux: 1.5,
  /** Proceso: lo que se mueve o se construye en el paso. */
  process: 2.25,
  /** Datos del enunciado. */
  data: 3,
  /** Resultado: el más grueso. */
  result: 4.5,
} as const;

export type StrokeRole = keyof typeof STROKE_PX;
