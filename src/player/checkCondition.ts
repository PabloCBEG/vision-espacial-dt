// Corrige los ejercicios de "mover los puntos hasta que se cumpla una condición"
// (rectas y planos). Cada condición tiene su mensaje de acierto y su pista si no se cumple.
import {
  createLine,
  createPlane,
  createPoint,
  distancePointToLine,
  distancePointToPlane,
  type Point,
} from '../geometry/index.ts';
import { getPoint, type AppState } from '../state/index.ts';

export type Condition =
  | 'lineParallelToPH'
  | 'lineParallelToPV'
  | 'lineParallelToLT'
  | 'lineProfile'
  | 'lineCrossesLT'
  | 'pointOnPlane'
  | 'planeContainsLT'
  | 'planeParallelToLT'
  | 'pointOnIntersection';

export interface ConditionResult {
  correct: boolean;
  message: string;
}

/** Los puntos se mueven de 1 en 1 mm: se acepta hasta 1 mm de diferencia. */
const TOLERANCE_MM = 1;

const MESSAGES: Record<Condition, { ok: string; hint: string }> = {
  lineParallelToPH: {
    ok: '¡Correcto! La recta es horizontal: su proyección vertical es paralela a la LT.',
    hint: 'Aún no es paralela al PH: sus dos puntos tienen que tener la misma cota.',
  },
  lineParallelToPV: {
    ok: '¡Correcto! La recta es frontal: su proyección horizontal es paralela a la LT.',
    hint: 'Aún no es paralela al PV: sus dos puntos tienen que tener el mismo alejamiento.',
  },
  lineParallelToLT: {
    ok: '¡Correcto! La recta es paralela a la LT: no tiene trazas.',
    hint: 'Para ser paralela a la LT, sus dos puntos deben tener la misma cota y el mismo alejamiento.',
  },
  lineProfile: {
    ok: '¡Correcto! Es una recta de perfil: sus dos proyecciones son perpendiculares a la LT.',
    hint: 'Una recta de perfil tiene sus dos puntos en la misma x, sobre una misma línea de referencia.',
  },
  lineCrossesLT: {
    ok: '¡Correcto! La recta corta a la LT: sus trazas H y V coinciden en un punto de la LT.',
    hint: 'La recta todavía no corta a la LT: sus trazas H y V deben coincidir sobre la LT.',
  },
  pointOnPlane: {
    ok: '¡Correcto! El punto está en el plano.',
    hint: 'El punto aún está fuera del plano. Un punto está en un plano si está en una recta del plano.',
  },
  planeContainsLT: {
    ok: '¡Correcto! El plano contiene a la LT: sus dos trazas coinciden con ella.',
    hint: 'El plano todavía no pasa por la LT: sus trazas α₁ y α₂ deben coincidir con la LT.',
  },
  pointOnIntersection: {
    ok: '¡Correcto! El punto está a la vez en los dos objetos: es de su intersección.',
    hint: 'El punto aún no está en los dos objetos. Tiene que estar en la recta y en el plano (o en los dos planos) a la vez.',
  },
  planeParallelToLT: {
    ok: '¡Correcto! El plano es paralelo a la LT: sus trazas α₁ y α₂ son paralelas a la LT.',
    hint: 'Las trazas del plano todavía no son paralelas a la LT.',
  },
};

/** Puntos de un objeto (recta o plano) o el propio punto, según su nombre. */
function pointsOf(state: AppState, id: string): Point[] {
  const object = state.objects.find((o) => o.id === id);
  if (!object) return [];
  if (object.kind === 'point') return [getPoint(state, id)];
  if (object.kind === 'meet') return [];
  return object.through.map((p) => getPoint(state, p));
}

function evaluate(condition: Condition, objects: readonly string[], state: AppState): boolean {
  const near = (a: number, b: number): boolean => Math.abs(a - b) <= TOLERANCE_MM;
  const [first, second] = objects;
  const pts = first ? pointsOf(state, first) : [];
  const [A, B] = pts;

  switch (condition) {
    case 'lineParallelToPH':
      return !!A && !!B && near(A.c, B.c);
    case 'lineParallelToPV':
      return !!A && !!B && near(A.a, B.a);
    case 'lineParallelToLT':
      return !!A && !!B && near(A.c, B.c) && near(A.a, B.a) && !near(A.x, B.x);
    case 'lineProfile':
      return !!A && !!B && near(A.x, B.x);
    case 'lineCrossesLT': {
      if (!A || !B) return false;
      // En perfil (a, c) la recta debe pasar por el origen: A y B alineados con la LT.
      const cross = A.a * B.c - A.c * B.a;
      const length = Math.hypot(B.a - A.a, B.c - A.c);
      return length > 0 && Math.abs(cross) / length <= TOLERANCE_MM;
    }
    case 'pointOnPlane': {
      const plane = second ? pointsOf(state, second) : [];
      const [P1, P2, P3] = plane;
      if (!A || !P1 || !P2 || !P3) return false;
      try {
        return distancePointToPlane(A, createPlane(P1, P2, P3)) <= TOLERANCE_MM;
      } catch {
        return false;
      }
    }
    case 'pointOnIntersection': {
      // El punto (primer objeto) está en cada uno de los otros dos, sean rectas o planos.
      if (!A || objects.length < 3) return false;
      return objects.slice(1).every((id) => {
        const part = pointsOf(state, id);
        try {
          if (part.length === 2 && part[0] && part[1]) {
            return distancePointToLine(A, createLine(part[0], part[1])) <= TOLERANCE_MM;
          }
          if (part.length === 3 && part[0] && part[1] && part[2]) {
            return distancePointToPlane(A, createPlane(part[0], part[1], part[2])) <= TOLERANCE_MM;
          }
        } catch {
          return false;
        }
        return false;
      });
    }
    case 'planeContainsLT':
    case 'planeParallelToLT': {
      const [P1, P2, P3] = pts;
      if (!P1 || !P2 || !P3) return false;
      try {
        const alpha = createPlane(P1, P2, P3);
        if (condition === 'planeParallelToLT') return Math.abs(alpha.normal.x) <= 0.02;
        return (
          Math.abs(alpha.normal.x) <= 0.02 &&
          distancePointToPlane(createPoint(0, 0, 0), alpha) <= TOLERANCE_MM
        );
      } catch {
        return false;
      }
    }
  }
}

export function checkCondition(
  condition: Condition,
  objects: readonly string[],
  state: AppState,
): ConditionResult {
  const correct = evaluate(condition, objects, state);
  const message = MESSAGES[condition];
  return { correct, message: correct ? message.ok : message.hint };
}
