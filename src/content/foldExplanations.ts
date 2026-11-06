// Modo "explicar" del abatimiento: tres frases cortas que aparecen en 0°, 45° y 90°.
// PENDIENTE DE REVISIÓN POR EL PROFESOR.

export interface FoldExplanation {
  /** Ángulo a partir del cual se muestra la frase. */
  fromAngle: number;
  text: string;
}

export const FOLD_EXPLANATIONS: readonly FoldExplanation[] = [
  {
    fromAngle: 0,
    text: 'El PH y el PV son perpendiculares. P′ está en el PH y P″ en el PV.',
  },
  {
    fromAngle: 45,
    text: 'El PH gira alrededor de la LT como una puerta. P′ viaja con él; P″ no se mueve.',
  },
  {
    fromAngle: 90,
    text: 'El PH ya está sobre el PV: esto es la lámina. P′ y P″ quedan en la misma línea de referencia.',
  },
];

/** Frase que corresponde a un ángulo: la última cuyo ángulo de inicio se ha alcanzado. */
export function explanationFor(angleDeg: number): string {
  let text = FOLD_EXPLANATIONS[0]?.text ?? '';
  for (const e of FOLD_EXPLANATIONS) {
    if (angleDeg >= e.fromAngle) text = e.text;
  }
  return text;
}
