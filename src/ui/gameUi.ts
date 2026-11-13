// Interfaz del juego: marcador de racha y XP en la cabecera, avisos de logros, entrada suave
// de la narración y selector «3D · Ambos · Lámina» para pantallas pequeñas.
// Las animaciones son de CSS y se apagan con prefers-reduced-motion; aquí no hay bucles.
import {
  BADGES,
  dayKey,
  level,
  levelPercent,
  liveStreak,
  loadGame,
  onGame,
  type GameEvent,
  type GameState,
} from '../player/game.ts';

const TOAST_MS = 3200;

function renderHud(hud: HTMLElement, state: GameState): void {
  const streak = liveStreak(state, dayKey(new Date()));
  const lv = level(state.xp);
  const streakLabel =
    streak > 0 ? `Racha: ${streak} ${streak === 1 ? 'día' : 'días'} seguidos` : 'Sin racha todavía';
  hud.innerHTML = `
    <span class="hud-chip hud-streak" data-active="${streak > 0}" role="img"
      aria-label="${streakLabel}"><span aria-hidden="true">🔥 ${streak}</span></span>
    <span class="hud-chip hud-xp" role="img" style="--level-pct:${levelPercent(state.xp)}"
      aria-label="Nivel ${lv}, ${state.xp} puntos de experiencia">
      <span aria-hidden="true">⭐ <span class="hud-long">Nv ${lv} · </span>${state.xp} XP</span></span>`;
}

function showToast(box: HTMLElement, icon: string, text: string): void {
  const item = document.createElement('p');
  item.className = 'toast-item';
  const iconBox = document.createElement('span');
  iconBox.className = 'toast-icon';
  iconBox.setAttribute('aria-hidden', 'true');
  iconBox.textContent = icon;
  const label = document.createElement('span');
  label.textContent = text;
  item.append(iconBox, label);
  box.append(item);
  window.setTimeout(() => {
    item.classList.add('is-leaving');
    window.setTimeout(() => item.remove(), 260);
  }, TOAST_MS);
}

function floatXp(hud: HTMLElement, amount: number): void {
  const anchor = hud.querySelector('.hud-xp')?.getBoundingClientRect();
  const pop = document.createElement('span');
  pop.className = 'xp-pop';
  pop.setAttribute('aria-hidden', 'true');
  pop.textContent = `+${amount} XP`;
  pop.style.left = `${(anchor?.left ?? 16) + 8}px`;
  pop.style.top = `${(anchor?.bottom ?? 48) + 4}px`;
  document.body.append(pop);
  window.setTimeout(() => pop.remove(), 1200);
}

/** Pinta el marcador y avisa de cada XP, subida de nivel e insignia. */
export function bindGame(hud: HTMLElement, toast: HTMLElement): void {
  renderHud(hud, loadGame());
  onGame((event: GameEvent) => {
    renderHud(hud, event.state);
    hud.querySelector('.hud-xp')?.classList.add('is-bump');
    floatXp(hud, event.amount);
    if (event.levelUp) showToast(toast, '🚀', `¡Subes al nivel ${level(event.state.xp)}!`);
    for (const id of event.newBadges) {
      const badge = BADGES[id];
      if (badge) showToast(toast, badge.icon, `Insignia: ${badge.title}`);
    }
  });
}

/** Cada vez que cambia la narración, entra con un pequeño desplazamiento. */
export function animateNarration(narration: HTMLElement): void {
  new MutationObserver(() => {
    narration.classList.remove('narr-in');
    void narration.offsetWidth; // reinicia la animación
    narration.classList.add('narr-in');
  }).observe(narration, { childList: true, characterData: true, subtree: true });
}

/** Reparte el espacio entre el 3D y la lámina en pantallas estrechas. */
export function bindSplitSwitch(group: HTMLElement): void {
  const buttons = [...group.querySelectorAll<HTMLButtonElement>('button[data-split]')];
  const apply = (value: string): void => {
    document.body.dataset.split = value;
    for (const b of buttons) b.setAttribute('aria-pressed', String(b.dataset.split === value));
  };
  for (const b of buttons) b.addEventListener('click', () => apply(b.dataset.split ?? 'both'));
  apply('both');
}
