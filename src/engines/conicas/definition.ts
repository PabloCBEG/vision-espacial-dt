// Laboratorio de cónicas: datos del motor (sin DOM).
import { z } from 'zod';
import type { EngineDefinition } from '../types.ts';

export const LabStepSchema = z.object({
  /** Semiángulo del cono (grados). */
  alfa: z.number().min(10).max(60).default(30),
  /** Inclinación del plano respecto a la horizontal (grados). */
  theta: z.number().min(0).max(89.5).default(30),
  /** Altura del plano sobre el vértice (mm). */
  h: z.number().min(-45).max(45).default(20),
});
export type LabStep = z.infer<typeof LabStepSchema>;

export const LAB_DEFINITION: EngineDefinition = {
  id: 'conicas',
  title: 'Laboratorio de cónicas',
  layerPrefixes: [],
  /** Capas: el cono doble, el plano secante, la cónica en 3D y su verdadera magnitud. */
  layerNames: ['cono', 'plano-secante', 'conica', 'conica-vm'],
  stepSchema: LabStepSchema,
};
