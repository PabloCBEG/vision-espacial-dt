// Lista de motores: añadir uno nuevo es añadir su definición aquí y su ejecución en runtimes.ts.
import type { EngineDefinition } from './types.ts';

/** El diédrico básico (punto, recta, plano y perfil) va integrado en las vistas. */
export const DIHEDRAL_DEFINITION: EngineDefinition = {
  id: 'diedrico',
  title: 'Diédrico',
  layerPrefixes: [
    'punto',
    'proyecciones',
    'proyectantes',
    'medidas',
    'referencia',
    'recta',
    'trazas',
    'plano',
  ],
  layerNames: ['planos', 'cuadrantes', 'lt', 'perfil'],
};

export const ENGINE_DEFINITIONS: readonly EngineDefinition[] = [DIHEDRAL_DEFINITION];
