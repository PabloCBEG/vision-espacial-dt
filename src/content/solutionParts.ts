// Las seis partes de una solución desarrollada (plan_contenidos.md, apartado 4).
// Sin importaciones: lo usan el esquema, los tests y el script de textos para revisión.

export const SOLUTION_PARTS = [
  'mira',
  'idea',
  'movimiento',
  'trazado',
  'comprobacion',
  'error',
] as const;
export type SolutionPart = (typeof SOLUTION_PARTS)[number];

/** Nombre de cada parte, como se rotula en los textos para revisión. */
export const SOLUTION_PART_NAMES: Record<SolutionPart, string> = {
  mira: '1. Mira el espacio',
  idea: '2. La idea clave',
  movimiento: '3. El movimiento',
  trazado: '4. El trazado',
  comprobacion: '5. Comprobación',
  error: '6. Error típico',
};

/** Pasos que lleva cada parte: [mínimo, máximo]. */
export const SOLUTION_PART_COUNTS: Record<SolutionPart, readonly [number, number]> = {
  mira: [1, 2],
  idea: [1, 1],
  movimiento: [1, 3],
  trazado: [2, 6],
  comprobacion: [1, 1],
  error: [1, 1],
};

/** Número de pasos de una solución completa: de la suma de mínimos a la de máximos. */
export const SOLUTION_LENGTH_RANGE: readonly [number, number] = [
  SOLUTION_PARTS.reduce((n, p) => n + SOLUTION_PART_COUNTS[p][0], 0),
  SOLUTION_PARTS.reduce((n, p) => n + SOLUTION_PART_COUNTS[p][1], 0),
];

/**
 * Problemas de orden y de número de pasos de una lista de partes (vacía si está bien).
 * Las partes van en el orden de SOLUTION_PARTS y cada una con su número de pasos.
 */
export function solutionPartProblems(parts: readonly SolutionPart[]): string[] {
  const problems: string[] = [];
  let last = -1;
  parts.forEach((part, i) => {
    const order = SOLUTION_PARTS.indexOf(part);
    if (order < last) {
      problems.push(
        `El paso ${i + 1} es de «${SOLUTION_PART_NAMES[part]}», que debe ir antes de las anteriores`,
      );
    }
    last = Math.max(last, order);
  });
  for (const part of SOLUTION_PARTS) {
    const n = parts.filter((p) => p === part).length;
    const [min, max] = SOLUTION_PART_COUNTS[part];
    if (n < min || n > max) {
      const range = min === max ? String(min) : `${min} a ${max}`;
      problems.push(`«${SOLUTION_PART_NAMES[part]}» lleva ${range} paso(s) y tiene ${n}`);
    }
  }
  return problems;
}
