// Avisos pedagógicos breves sobre la escena: casos especiales de recta y plano,
// cuadrantes que atraviesa una recta y pertenencia de puntos y rectas a un plano.
// PENDIENTE DE REVISIÓN POR EL PROFESOR.
import {
  classifyLine,
  classifyPlane,
  distancePointToPlane,
  lineOnPlane,
  quadrantsCrossed,
  type Plane,
  type Quadrant,
} from '../geometry/index.ts';
import { getPoint, isLayerVisible, lineOf, planeOf, type AppState } from '../state/index.ts';

export type NoticeKind = 'info' | 'warning' | 'ok' | 'error';

export interface Notice {
  kind: NoticeKind;
  text: string;
}

const ROMAN: Record<string, string> = { '1': 'I', '2': 'II', '3': 'III', '4': 'IV' };

function quadrantName(q: Quadrant): string {
  if (typeof q === 'number') return ROMAN[String(q)] ?? String(q);
  return q.replace('en ', '');
}

function listNames(names: string[]): string {
  if (names.length <= 1) return names.join('');
  return `${names.slice(0, -1).join(', ')} y ${names[names.length - 1]}`;
}

/** ¿Se ve el objeto en el 3D o en la lámina en este paso? */
function isVisible(state: AppState, tags: string[]): boolean {
  return tags.some(
    (tag) => isLayerVisible(state.layers3d, tag) || isLayerVisible(state.layersSheet, tag),
  );
}

/** Puntos con los que el motor de métodos mide una distancia o el ángulo de una recta y un plano. */
function measuredPoints(state: AppState): Set<string> {
  const data = state.engines.metodos;
  const names = new Set<string>();
  if (typeof data !== 'object' || data === null) return names;
  const { distancia, anguloRectaPlano } = data as {
    distancia?: { desde?: unknown };
    anguloRectaPlano?: { recta?: unknown };
  };
  if (typeof distancia?.desde === 'string') names.add(distancia.desde);
  if (Array.isArray(anguloRectaPlano?.recta)) {
    for (const n of anguloRectaPlano.recta as unknown[]) if (typeof n === 'string') names.add(n);
  }
  return names;
}

export function sceneNotices(state: AppState): Notice[] {
  const notices: Notice[] = [];
  const planes: { id: string; alpha: Plane; through: readonly string[] }[] = [];

  for (const o of state.objects) {
    if (o.kind === 'line') {
      if (!isVisible(state, [`recta:${o.id}`, `trazas:${o.id}`])) continue;
      const r = lineOf(state, o.through);
      if (!r) {
        notices.push({ kind: 'warning', text: `${o.id}: sus dos puntos coinciden; no hay recta.` });
        continue;
      }
      const cases = classifyLine(r);
      if (cases.includes('parallelToLT')) {
        notices.push({
          kind: 'warning',
          text: `${o.id} es paralela a la LT: no tiene trazas y sus dos proyecciones son paralelas a la LT.`,
        });
      } else if (cases.includes('profile')) {
        notices.push({
          kind: 'warning',
          text: `${o.id} es de perfil: sus proyecciones no bastan para definirla. Hace falta la tercera proyección.`,
        });
      } else if (cases.includes('crossesLT')) {
        notices.push({
          kind: 'info',
          text: `${o.id} corta a la LT: sus trazas H y V coinciden en un punto de la LT.`,
        });
      } else if (cases.includes('horizontal')) {
        notices.push({
          kind: 'info',
          text: `${o.id} es horizontal (paralela al PH): no tiene traza H.`,
        });
      } else if (cases.includes('frontal')) {
        notices.push({
          kind: 'info',
          text: `${o.id} es frontal (paralela al PV): no tiene traza V.`,
        });
      }
      const crossed = quadrantsCrossed(r).map(quadrantName);
      if (crossed.length > 0) {
        const word = crossed.length === 1 ? 'el cuadrante' : 'los cuadrantes';
        notices.push({ kind: 'info', text: `${o.id} atraviesa ${word} ${listNames(crossed)}.` });
      }
    } else if (o.kind === 'plane') {
      if (!isVisible(state, [`plano:${o.id}`, `trazas:${o.id}`])) continue;
      const alpha = planeOf(state, o.through);
      if (!alpha) {
        notices.push({
          kind: 'warning',
          text: `${o.id}: sus tres puntos están alineados; no hay plano.`,
        });
        continue;
      }
      planes.push({ id: o.id, alpha, through: o.through });
      const cases = classifyPlane(alpha);
      if (cases.includes('containsLT')) {
        notices.push({
          kind: 'warning',
          text: `${o.id} contiene la LT: sus trazas coinciden con ella y no bastan para definirlo. Hace falta la tercera proyección.`,
        });
      } else if (cases.includes('parallelToLT')) {
        notices.push({
          kind: 'info',
          text: `${o.id} es paralelo a la LT: sus trazas α₁ y α₂ son paralelas a la LT.`.replaceAll(
            'α',
            o.id,
          ),
        });
      }
    }
  }

  // Pertenencia: puntos y rectas que no definen el plano. Se omite para los puntos con los que
  // el motor de métodos mide una distancia o un ángulo: el aviso daría la respuesta.
  const measured = measuredPoints(state);
  for (const { id, alpha, through } of planes) {
    for (const o of state.objects) {
      if (o.kind === 'point' && !through.includes(o.id)) {
        if (measured.has(o.id)) continue;
        if (!isVisible(state, [`punto:${o.id}`, `proyecciones:${o.id}`])) continue;
        const distance = distancePointToPlane(getPoint(state, o.id), alpha);
        notices.push(
          distance <= 1
            ? { kind: 'ok', text: `${o.id} está en el plano ${id}.` }
            : {
                kind: 'error',
                text: `${o.id} no está en el plano ${id}: está a ${Math.round(distance)} mm.`,
              },
        );
      } else if (o.kind === 'line' && !o.through.every((p) => through.includes(p))) {
        if (!isVisible(state, [`recta:${o.id}`])) continue;
        const r = lineOf(state, o.through);
        if (!r) continue;
        notices.push(
          lineOnPlane(r, alpha)
            ? { kind: 'ok', text: `La recta ${o.id} está en el plano ${id}.` }
            : { kind: 'error', text: `La recta ${o.id} no está en el plano ${id}.` },
        );
      }
    }
  }
  return notices;
}
