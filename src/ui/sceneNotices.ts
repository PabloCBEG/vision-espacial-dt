// Panel de avisos pedagógicos: casos especiales, cuadrantes que atraviesa una recta y
// pertenencia de puntos y rectas a un plano. Cada aviso lleva un símbolo además del color.
import { sceneNotices, type NoticeKind } from '../content/notices.ts';
import type { AppStore } from '../state/index.ts';

const SYMBOL: Record<NoticeKind, string> = {
  info: 'ℹ',
  warning: '⚠',
  ok: '✓',
  error: '✗',
};

export function bindSceneNotices(box: HTMLElement, store: AppStore): void {
  let last = '';
  const sync = (): void => {
    const state = store.get();
    // En los ejercicios de colocar un punto no se dan pistas.
    const notices = state.exercise ? [] : sceneNotices(state);
    const key = notices.map((n) => `${n.kind}${n.text}`).join('|');
    if (key === last) return;
    last = key;
    box.hidden = notices.length === 0;
    box.replaceChildren(
      ...notices.map((n) => {
        const p = document.createElement('p');
        p.className = `notice notice-${n.kind}`;
        const symbol = document.createElement('span');
        symbol.className = 'notice-symbol';
        symbol.setAttribute('aria-hidden', 'true');
        symbol.textContent = SYMBOL[n.kind];
        p.append(symbol, ` ${n.text}`);
        return p;
      }),
    );
  };
  store.subscribe(sync);
  sync();
}
