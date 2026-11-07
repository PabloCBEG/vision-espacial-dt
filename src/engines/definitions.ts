// Lista de motores: añadir uno nuevo es añadir su definición aquí y su ejecución en runtimes.ts.
import { AXON_DEFINITION } from './axonometria/definition.ts';
import { CONIC_DEFINITION } from './conica/definition.ts';
import { LAB_DEFINITION } from './conicas/definition.ts';
import { METHODS_DEFINITION } from './metodos/definition.ts';
import { NORM_DEFINITION } from './normalizacion/definition.ts';
import { PLANE_DEFINITION } from './plana/definition.ts';
import { SOLIDS_DEFINITION } from './solidos/definition.ts';
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
  layerNames: ['planos', 'cuadrantes', 'lt', 'perfil', 'cuadricula'],
};

export const ENGINE_DEFINITIONS: readonly EngineDefinition[] = [
  DIHEDRAL_DEFINITION,
  METHODS_DEFINITION,
  SOLIDS_DEFINITION,
  PLANE_DEFINITION,
  NORM_DEFINITION,
  AXON_DEFINITION,
  CONIC_DEFINITION,
  LAB_DEFINITION,
];
