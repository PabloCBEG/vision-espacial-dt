// Ejecución del motor «error»: solo dibuja en la lámina (no tiene vista 3D ni controles).
import type { SheetDrawContext, SheetModule } from '../../render2d/sheetModule.ts';
import { polyline } from '../../render2d/sketch2d.ts';
import type { ViewBox } from '../../render2d/viewport.ts';
import { getEngineData, type AppState } from '../../state/index.ts';
import type { EngineHost, EngineRuntime } from '../types.ts';
import { ERROR_DEFINITION, ErrorStepSchema, PROJECTION_REF, type ErrorStep } from './definition.ts';

function readData(state: AppState): ErrorStep | null {
  const raw = getEngineData(state, 'error');
  if (raw === undefined) return null;
  const parsed = ErrorStepSchema.safeParse(raw);
  return parsed.success ? parsed.data : null;
}

type Place = ErrorStep['trazos'][number]['puntos'][number];

/** Punto de la lámina (x, y hacia arriba) de una coordenada o de la proyección de un punto. */
function place(state: AppState, p: Place): [number, number] | null {
  if (typeof p !== 'string') return p;
  const m = PROJECTION_REF.exec(p);
  const point = m?.[1] ? state.points[m[1]] : undefined;
  if (!point) return null;
  return m?.[2] === '″' ? [point.x, point.c] : [point.x, -point.a];
}

function placed(
  state: AppState,
  places: readonly Place[],
  [dx, dy]: readonly [number, number] = [0, 0],
): [number, number][] {
  return places
    .map((p) => place(state, p))
    .filter((p): p is [number, number] => p !== null)
    .map(([x, y]) => [x + dx, y + dy]);
}

class ErrorSheet implements SheetModule {
  readonly id = 'error';
  private active = false;

  hasContent(): boolean {
    return this.active;
  }

  fitBox(state: AppState): ViewBox | null {
    const data = readData(state);
    if (!data) return null;
    const pts = data.trazos.flatMap((t) => placed(state, t.puntos, t.desplaza));
    if (pts.length === 0) return null;
    const xs = pts.map(([x]) => x);
    const ys = pts.map(([, y]) => -y);
    const m = 14;
    const x = Math.min(...xs) - m;
    const y = Math.min(...ys) - m;
    return { x, y, width: Math.max(...xs) + m - x, height: Math.max(...ys) + m - y };
  }

  draw(ctx: SheetDrawContext): void {
    const data = readData(ctx.state);
    this.active = data !== null;
    if (!data) return;
    const group = ctx.layer('error');
    for (const trazo of data.trazos) {
      const puntos = placed(ctx.state, trazo.puntos, trazo.desplaza);
      polyline(
        group,
        puntos.map(([x, y]) => ({ x, y })),
        'data',
        { className: 'stroke-error' },
      );
      const [p, q] = puntos;
      // El rótulo, sobre el punto medio del primer segmento (unos 12 px por encima).
      const lift = 12 * ctx.mmPerPx;
      const at =
        trazo.rotuloEn ?? (p && q ? [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2 + lift] : [0, 0]);
      const label = ctx.label(`✗ ${trazo.rotulo}`, at[0] ?? 0, -(at[1] ?? 0), 'middle');
      label.classList.add('label-error');
      group.append(label);
    }
  }
}

export const ERROR_RUNTIME: EngineRuntime = {
  definition: ERROR_DEFINITION,
  mount(host: EngineHost): () => void {
    return host.sheet.use(new ErrorSheet());
  },
};
