// Biblioteca de piezas de normalización: un fichero JSON por pieza en src/content/piezas/.
import { PieceSchema, type Piece } from '../engines/normalizacion/piece.ts';

export interface PieceLoadError {
  file: string;
  problems: string[];
}

export function parsePieces(files: Record<string, unknown>): {
  pieces: Piece[];
  errors: PieceLoadError[];
} {
  const pieces: Piece[] = [];
  const errors: PieceLoadError[] = [];
  for (const [file, data] of Object.entries(files)) {
    const result = PieceSchema.safeParse(data);
    if (result.success) pieces.push(result.data);
    else {
      errors.push({
        file: file.split('/').pop() ?? file,
        problems: result.error.issues.map((i) => `${i.path.join(' › ') || '(raíz)'}: ${i.message}`),
      });
    }
  }
  pieces.sort((a, b) => a.dificultad - b.dificultad || a.id.localeCompare(b.id));
  return { pieces, errors };
}

let cache: Piece[] | null = null;

export function loadPieces(): Piece[] {
  if (cache) return cache;
  const modules = import.meta.glob<{ default: unknown }>('./piezas/*.json', { eager: true });
  const files: Record<string, unknown> = {};
  for (const [path, module] of Object.entries(modules)) files[path] = module.default;
  cache = parsePieces(files).pieces;
  return cache;
}

export function findPiece(id: string): Piece | undefined {
  return loadPieces().find((p) => p.id === id);
}
