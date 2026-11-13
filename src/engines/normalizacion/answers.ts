// Corrección de los ejercicios del motor de normalización, sin DOM ni WebAssembly: la usan el
// controlador y los tests de las lecciones.
import type { NormStep } from './definition.ts';
import type { Piece } from './piece.ts';
import type { ViewName } from './views.ts';

export const VIEW_LABELS: Record<ViewName, string> = {
  alzado: 'Alzado',
  planta: 'Planta',
  perfil: 'Perfil izquierdo',
  isometrica: 'Perspectiva isométrica',
  caballera: 'Perspectiva caballera',
};

export interface ChoiceResult {
  correct: boolean;
  message: string;
}

/**
 * Corrige lo que ha elegido el alumno (`data.eleccion`) en el ejercicio del paso. Devuelve null
 * si el paso no tiene ejercicio (o falta la pieza).
 */
export function evaluateChoice(
  data: NormStep,
  findPiece: (id: string) => Piece | undefined,
): ChoiceResult | null {
  const ex = data.ejercicio;
  if (!ex) return null;
  const chosen = data.eleccion ?? [];
  switch (ex.tipo) {
    case 'vistaQueFalta': {
      if (chosen.length === 0) return { correct: false, message: 'Elige una de las opciones.' };
      const ok = ex.opciones[chosen[0] ?? -1] === data.pieza;
      return ok
        ? {
            correct: true,
            message: `¡Correcto! Esa es la ${VIEW_LABELS[ex.falta].toLowerCase()} de la pieza.`,
          }
        : {
            correct: false,
            message:
              'No es esa. Sigue cada arista con las líneas de referencia entre las dos vistas que ves.',
          };
    }
    case 'vistasNecesarias': {
      const piece = findPiece(data.pieza ?? '');
      if (!piece) return null;
      const names = ['alzado', 'planta', 'perfil'] as const;
      const picked = new Set(chosen.map((i) => names[i]));
      const need = new Set(piece.vistasNecesarias);
      const missing = [...need].filter((v) => !picked.has(v));
      const extra = [...picked].filter(
        (v): v is (typeof names)[number] => v !== undefined && !need.has(v),
      );
      if (missing.length === 0 && extra.length === 0) {
        return {
          correct: true,
          message: '¡Correcto! Con esas vistas la pieza queda definida, sin repetir nada.',
        };
      }
      const parts: string[] = [];
      if (missing.length)
        parts.push(`falta: ${missing.map((v) => VIEW_LABELS[v].toLowerCase()).join(', ')}`);
      if (extra.length)
        parts.push(`sobra: ${extra.map((v) => VIEW_LABELS[v].toLowerCase()).join(', ')}`);
      return { correct: false, message: `Todavía no (${parts.join('; ')}).` };
    }
    case 'cotas': {
      const need = new Set(ex.necesarias);
      const missing = ex.necesarias.filter((i) => !chosen.includes(i)).length;
      const extra = chosen.filter((i) => !need.has(i)).length;
      if (missing === 0 && extra === 0) {
        return { correct: true, message: '¡Correcto! Ninguna cota falta y ninguna se repite.' };
      }
      const parts: string[] = [];
      if (missing) parts.push(`faltan ${missing}`);
      if (extra) parts.push(`sobran ${extra}`);
      return {
        correct: false,
        message: `Revisa las cotas: ${parts.join(' y ')}. Cada medida, una sola vez.`,
      };
    }
    case 'corte': {
      if (chosen.length === 0) return { correct: false, message: 'Elige uno de los dibujos.' };
      return chosen[0] === ex.correcta
        ? {
            correct: true,
            message: '¡Correcto! Las caras cortadas van rayadas a 45° y no hay aristas ocultas.',
          }
        : {
            correct: false,
            message: 'No es ese. Fíjate en dónde pasa el plano de corte y qué parte se quita.',
          };
    }
  }
}
