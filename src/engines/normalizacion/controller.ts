// Estado vivo del motor de normalización: carga el núcleo geométrico (WebAssembly) solo
// cuando hace falta, calcula los dibujos de la pieza (con caché), anima la caja de proyección
// y el corte, y corrige los ejercicios.
import type { ManifoldToplevel } from 'manifold-3d';
import wasmUrl from 'manifold-3d/manifold.wasm?url';
import { findPiece } from '../../content/pieces.ts';
import { getEngineData, setEngineData, type AppState, type AppStore } from '../../state/index.ts';
import { Tweens } from '../shared/tween.ts';
import { NormStepSchema, type Cut, type NormStep } from './definition.ts';
import { evaluateChoice, VIEW_LABELS } from './answers.ts';
import { buildDrawing, type PieceDrawing } from './drawing.ts';
import { loadKernel } from './kernel.ts';

export { VIEW_LABELS };

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
    const key = JSON.stringify([
      id,
      step.corte,
      step.seccionAbatida,
      step.ocultas,
      step.ejes,
      step.vistas,
    ]);
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
    return this.data ? evaluateChoice(this.data, findPiece) : null;
  }

  notify(): void {
    for (const listener of this.listeners) listener();
  }

  dispose(): void {
    this.tweens.stop();
    this.listeners.clear();
  }
}
