// Juego ligero y local: puntos de experiencia (XP), racha de días e insignias.
// Se guarda SOLO en el navegador del alumno (localStorage); no identifica a nadie.

export interface GameState {
  xp: number;
  /** Días seguidos con actividad, hasta `lastDay`. */
  streak: number;
  /** Último día con actividad, «AAAA-MM-DD» en hora local. */
  lastDay: string;
  exercises: number;
  lessons: number;
  badges: string[];
}

export type XpReason = 'exercise' | 'lesson';

export const XP_PER_LEVEL = 100;
export const XP_EXERCISE = 25;
export const XP_LESSON = 50;

export const BADGES: Readonly<Record<string, { icon: string; title: string }>> = {
  'primer-ejercicio': { icon: '🎯', title: 'Primer ejercicio resuelto' },
  'cinco-ejercicios': { icon: '🏹', title: 'Cinco ejercicios resueltos' },
  'primera-leccion': { icon: '📘', title: 'Primera lección terminada' },
  'cinco-lecciones': { icon: '🏅', title: 'Cinco lecciones terminadas' },
  'racha-3': { icon: '🔥', title: 'Racha de 3 días' },
  'racha-7': { icon: '🌟', title: 'Racha de una semana' },
};

export interface GameEvent {
  amount: number;
  state: GameState;
  levelUp: boolean;
  newBadges: string[];
}

const KEY = 'juego:estado';

export const emptyGame = (): GameState => ({
  xp: 0,
  streak: 0,
  lastDay: '',
  exercises: 0,
  lessons: 0,
  badges: [],
});

export const level = (xp: number): number => Math.floor(xp / XP_PER_LEVEL) + 1;
export const levelPercent = (xp: number): number => xp % XP_PER_LEVEL;

export function dayKey(date: Date): string {
  const pad = (n: number): string => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

const previousDay = (key: string): string => {
  const [y, m, d] = key.split('-').map(Number);
  return dayKey(new Date(y ?? 1970, (m ?? 1) - 1, (d ?? 1) - 1));
};

/** Racha que se muestra hoy: si ayer fue el último día con actividad, aún está viva. */
export function liveStreak(state: GameState, today: string): number {
  return state.lastDay === today || state.lastDay === previousDay(today) ? state.streak : 0;
}

/** Suma XP y actualiza racha e insignias. Es una función pura: no toca el navegador. */
export function applyXp(
  state: GameState,
  amount: number,
  reason: XpReason,
  today: string,
): GameEvent {
  const next: GameState = { ...state, badges: [...state.badges] };
  if (next.lastDay !== today) {
    next.streak = next.lastDay === previousDay(today) ? next.streak + 1 : 1;
    next.lastDay = today;
  }
  const before = level(state.xp);
  next.xp += amount;
  if (reason === 'exercise') next.exercises += 1;
  else next.lessons += 1;

  const earned: [string, boolean][] = [
    ['primer-ejercicio', next.exercises >= 1],
    ['cinco-ejercicios', next.exercises >= 5],
    ['primera-leccion', next.lessons >= 1],
    ['cinco-lecciones', next.lessons >= 5],
    ['racha-3', next.streak >= 3],
    ['racha-7', next.streak >= 7],
  ];
  const newBadges: string[] = [];
  for (const [id, ok] of earned) {
    if (ok && !next.badges.includes(id)) {
      next.badges.push(id);
      newBadges.push(id);
    }
  }
  return { amount, state: next, levelUp: level(next.xp) > before, newBadges };
}

export function loadGame(): GameState {
  try {
    const raw = localStorage.getItem(KEY);
    const data: unknown = raw ? JSON.parse(raw) : null;
    if (typeof data !== 'object' || data === null) return emptyGame();
    return { ...emptyGame(), ...(data as Partial<GameState>) };
  } catch {
    return emptyGame(); // sin acceso a localStorage o datos dañados
  }
}

type Listener = (event: GameEvent) => void;
const listeners = new Set<Listener>();

/** Avisa de cada premio. Devuelve la función para dejar de escuchar. */
export function onGame(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function addXp(amount: number, reason: XpReason): GameEvent {
  const event = applyXp(loadGame(), amount, reason, dayKey(new Date()));
  try {
    localStorage.setItem(KEY, JSON.stringify(event.state));
  } catch {
    // Sin acceso a localStorage: el premio vale solo para esta visita.
  }
  for (const listener of listeners) listener(event);
  return event;
}
