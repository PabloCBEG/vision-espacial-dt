// Ejemplo de cómo otra parte de la aplicación usa el desplegable analítico: en el modo libre
// del diédrico se publican las ecuaciones del punto, de la recta o del plano que se exploran.
import { getPoint, lineOf, planeOf, type AppStore } from '../state/index.ts';
import { analytic, type AnalyticBlock } from './analytic.ts';

const n = (v: number): string => String(Math.round(v * 100) / 100).replace('.', '{,}');
const signed = (v: number, name: string): string =>
  v < 0 ? ` - ${n(-v)}${name}` : ` + ${n(v)}${name}`;

export function bindFreeAnalytic(store: AppStore, isActive: () => boolean): () => void {
  const update = (): void => {
    if (!isActive()) {
      analytic.clear('diedrico');
      return;
    }
    const state = store.get();
    const blocks: AnalyticBlock[] = [];
    for (const o of state.objects) {
      if (o.kind === 'point') {
        const p = getPoint(state, o.id);
        blocks.push({
          id: `punto-${o.id}`,
          title: `Punto ${o.id}`,
          rows: [
            {
              label: 'Coordenadas (x, a, c)',
              tex: `${o.id} = (${n(p.x)},\\ ${n(p.a)},\\ ${n(p.c)})`,
            },
          ],
        });
      } else if (o.kind === 'line') {
        const r = lineOf(state, o.through);
        if (!r) continue;
        const d = { x: r.p2.x - r.p1.x, a: r.p2.a - r.p1.a, c: r.p2.c - r.p1.c };
        blocks.push({
          id: `recta-${o.id}`,
          title: `Recta ${o.id}`,
          rows: [
            {
              label: 'Ecuación paramétrica',
              tex: `(x, a, c) = (${n(r.p1.x)}, ${n(r.p1.a)}, ${n(r.p1.c)}) + \\lambda\\,(${n(d.x)}, ${n(d.a)}, ${n(d.c)})`,
            },
          ],
        });
      } else {
        const alpha = planeOf(state, o.through);
        if (!alpha) continue;
        const { normal: v } = alpha;
        const d = v.x * alpha.p1.x + v.a * alpha.p1.a + v.c * alpha.p1.c;
        blocks.push({
          id: `plano-${o.id}`,
          title: `Plano ${o.id}`,
          rows: [
            {
              label: 'Ecuación implícita',
              tex: `${n(v.x)}\\,x${signed(v.a, '\\,a')}${signed(v.c, '\\,c')} = ${n(d)}`,
            },
          ],
        });
      }
    }
    analytic.set('diedrico', blocks);
  };
  const unsubscribe = store.subscribe(update);
  // Al cambiar de pantalla, después de que el enrutador haya cambiado la escena.
  const later = (): void => void window.setTimeout(update, 0);
  window.addEventListener('hashchange', later);
  update();
  return () => {
    unsubscribe();
    window.removeEventListener('hashchange', later);
    analytic.clear('diedrico');
  };
}
