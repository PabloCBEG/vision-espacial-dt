// Corrige un ejercicio de "colocar el punto": dice si acierta y, si no, qué dato ha confundido.
import type { Point } from '../geometry/index.ts';

/** Margen de acierto, en mm (los deslizadores van de 1 en 1 mm). */
const TOLERANCE_MM = 1;

export type PlacementMistake =
  | 'swapped' // ha intercambiado cota y alejamiento
  | 'cotaSign' // cota con el signo cambiado
  | 'alejamientoSign' // alejamiento con el signo cambiado
  | 'cota'
  | 'alejamiento'
  | 'x';

export interface PlacementResult {
  correct: boolean;
  mistakes: PlacementMistake[];
  /** Explicación breve para el alumno. */
  message: string;
}

const near = (a: number, b: number): boolean => Math.abs(a - b) <= TOLERANCE_MM;

const MESSAGES: Record<PlacementMistake, string> = {
  swapped:
    'Has intercambiado la cota y el alejamiento. La cota se lee en P″ (sobre la LT) y el alejamiento en P′.',
  cotaSign:
    'La cota tiene el signo cambiado: si P″ está por encima de la LT, P está por encima del PH.',
  alejamientoSign:
    'El alejamiento tiene el signo cambiado: si P′ está por debajo de la LT, P está delante del PV.',
  cota: 'Revisa la cota: es la distancia de P″ a la LT.',
  alejamiento: 'Revisa el alejamiento: es la distancia de P′ a la LT.',
  x: 'Revisa la posición a lo largo de la LT: P′ y P″ están en la misma línea de referencia.',
};

export function checkPlacement(student: Point, target: Point): PlacementResult {
  const mistakes: PlacementMistake[] = [];
  const xOk = near(student.x, target.x);
  const cOk = near(student.c, target.c);
  const aOk = near(student.a, target.a);

  if (!xOk) mistakes.push('x');
  if (!cOk || !aOk) {
    const swapped = near(student.c, target.a) && near(student.a, target.c);
    if (swapped && !near(target.a, target.c)) {
      mistakes.push('swapped');
    } else {
      if (!cOk) mistakes.push(near(student.c, -target.c) ? 'cotaSign' : 'cota');
      if (!aOk) mistakes.push(near(student.a, -target.a) ? 'alejamientoSign' : 'alejamiento');
    }
  }

  if (mistakes.length === 0) {
    return {
      correct: true,
      mistakes,
      message: '¡Correcto! Las proyecciones de P coinciden con la lámina.',
    };
  }
  // Primero el error más importante: confundir cota y alejamiento, después los signos.
  const order: PlacementMistake[] = [
    'swapped',
    'cotaSign',
    'alejamientoSign',
    'cota',
    'alejamiento',
    'x',
  ];
  const main = order.find((m) => mistakes.includes(m)) ?? 'x';
  return { correct: false, mistakes, message: MESSAGES[main] };
}
