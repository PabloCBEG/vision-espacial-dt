// Estado vivo del motor de normalización: carga el núcleo geométrico (WebAssembly) solo
// cuando hace falta, calcula los dibujos de la pieza (con caché), anima la caja de proyección
// y el corte, y corrige los ejercicios.
import type { ManifoldToplevel } from 'manifold-3d';
import wasmUrl from 'manifold-3d/manifold.wasm?url';
import { findPiece } from '../../content/pieces.ts';
import { getEngineData, setEngineData, type AppState, type AppStore } from '../../state/index.ts';
import { Tweens } from '../shared/tween.ts';
import { NormStepSchema, type Cut, type NormStep } from './definition.ts';
import { buildDrawing, type PieceDrawing } from './drawing.ts';
import { loadKernel } from './kernel.ts';
import type { ViewName } from './views.ts';

export const VIEW_LABELS: Record<ViewName, string> = {
  alzado: 'Alzado',
  planta: 'Planta',
  perfil: 'Perfil izquierdo',
  isometrica: 'Perspectiva isométrica',
};

export class NormController {
  readonly store: AppStore;
  data: NormStep | null = null;
  drawing: PieceDrawing | null = null;
  /** Dibujos de las opciones del ejercicio (vista que falta o corte). */
  options: PieceDrawing[] = [];
  loading = false;
  problem: string | null = null;
  readonly tweens: Tweens<'desplegar' | 'quitar'>;
  readonly listeners = new Set<() => void>();
  private raw: unknown = undefined;
  private wasm: ManifoldToplevel | null = null;
  private readonly cache = new Map<string, PieceDrawing>();
  private request = 0;

  constructor(store: AppStore) {
    this.store = store;
    this.tweens = new Tweens({ desplegar: 0, quitar: 0 }, () => this.notify());
  }

  sync(state: AppState): void {
    const raw = getEngineData(state, 'normalizacion');
    if (raw === this.raw) return;
    const before = this.raw as Record<string, unknown> | undefined;
    this.raw = raw;
    const parsed = raw === undefined ? null : NormStepSchema.safeParse(raw);
    this.data = parsed?.success && parsed.data.pieza ? parsed.data : null;
    if (!this.data) {
      this.drawing = null;
      this.options = [];
      this.notify();
      return;
    }
    // Solo cambia la elección del alumno: no hace falta recalcular nada.
    const now = raw as Record<string, unknown>;
    const onlyChoice =
      before !== undefined &&
      Object.keys(now).every((k) => k === 'eleccion' || now[k] === before[k]);
    if (onlyChoice) {
      this.notify();
      return;
    }
    // Nueva pieza o nuevo corte: los movimientos empiezan de cero.
    const samePiece = before?.pieza === now.pieza;
    const sameCut = JSON.stringify(before?.corte) === JSON.stringify(now.corte);
    if (!samePiece || !sameCut) this.tweens.setTargets({ desplegar: 0, quitar: 0 }, true);
    this.tweens.setTargets({
      desplegar: this.data.caja?.desplegar ?? 0,
      quitar: this.data.corte?.quitar ?? 0,
    });
    void this.compute();
  }

  private async compute(): Promise<void> {
    const data = this.data;
    if (!data) return;
    const ticket = ++this.request;
    const id = data.pieza ?? '';
    const piece = findPiece(id);
    if (!piece) {
      this.problem = `No existe la pieza «${data.pieza}» en la biblioteca.`;
      this.drawing = null;
      this.notify();
      return;
    }
    if (!this.wasm) {
      this.loading = true;
      this.notify();
      this.wasm = await loadKernel(wasmUrl);
      this.loading = false;
      if (ticket !== this.request) return;
    }
    const wasm = this.wasm;
    this.problem = null;
    this.drawing = this.cached(wasm, id, data);
    // Opciones del ejercicio.
    const ex = data.ejercicio;
    if (ex?.tipo === 'vistaQueFalta') {
      this.options = ex.opciones.flatMap((id) => {
        const p = findPiece(id);
        return p
          ? [this.cached(wasm, id, { ...data, corte: undefined, seccionAbatida: undefined })]
          : [];
      });
    } else if (ex?.tipo === 'corte') {
      this.options = ex.opciones.map((corte: Cut) =>
        this.cached(wasm, id, { ...data, corte, seccionAbatida: undefined }),
      );
    } else {
      this.options = [];
    }
    if (ticket === this.request) this.notify();
  }

  private cached(wasm: ManifoldToplevel, id: string, step: NormStep): PieceDrawing {
    const key = JSON.stringify([id, step.corte, step.seccionAbatida, step.ocultas, step.ejes]);
    let d = this.cache.get(key);
    if (!d) {
      const piece = findPiece(id);
      if (!piece) throw new Error(`Falta la pieza ${id}`);
      d = buildDrawing(wasm, piece, step);
      this.cache.set(key, d);
    }
    return d;
  }

  /** El alumno elige o quita una opción. `single`: solo una a la vez. */
  toggle(index: number, single: boolean): void {
    const raw = (this.raw ?? {}) as Record<string, unknown>;
    const current = this.data?.eleccion ?? [];
    const next = single
      ? [index]
      : current.includes(index)
        ? current.filter((i) => i !== index)
        : [...current, index].sort();
    setEngineData(this.store, 'normalizacion', { ...raw, eleccion: next });
  }

  /** Corrige el ejercicio del paso. */
  check(): { correct: boolean; message: string } | null {
    const data = this.data;
    const ex = data?.ejercicio;
    if (!data || !ex) return null;
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

  notify(): void {
    for (const listener of this.listeners) listener();
  }

  dispose(): void {
    this.tweens.stop();
    this.listeners.clear();
  }
}
