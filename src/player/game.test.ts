import { describe, expect, it } from 'vitest';
import { applyXp, emptyGame, level, liveStreak } from './game.ts';

describe('juego: XP, racha e insignias', () => {
  it('suma XP y da la primera insignia', () => {
    const event = applyXp(emptyGame(), 25, 'exercise', '2026-03-10');
    expect(event.state.xp).toBe(25);
    expect(event.state.streak).toBe(1);
    expect(event.newBadges).toEqual(['primer-ejercicio']);
  });

  it('sube de nivel cada 100 XP', () => {
    const state = { ...emptyGame(), xp: 90, lastDay: '2026-03-10', streak: 1 };
    const event = applyXp(state, 25, 'exercise', '2026-03-10');
    expect(level(event.state.xp)).toBe(2);
    expect(event.levelUp).toBe(true);
  });

  it('la racha crece con días seguidos y se reinicia si falta un día', () => {
    const day1 = applyXp(emptyGame(), 25, 'exercise', '2026-03-31').state;
    const day2 = applyXp(day1, 25, 'exercise', '2026-04-01').state;
    expect(day2.streak).toBe(2);
    const day4 = applyXp(day2, 25, 'exercise', '2026-04-03').state;
    expect(day4.streak).toBe(1);
  });

  it('no repite la racha dos veces el mismo día', () => {
    const a = applyXp(emptyGame(), 25, 'exercise', '2026-03-10').state;
    const b = applyXp(a, 25, 'exercise', '2026-03-10').state;
    expect(b.streak).toBe(1);
  });

  it('muestra la racha como rota cuando pasan dos días', () => {
    const state = { ...emptyGame(), streak: 4, lastDay: '2026-03-10' };
    expect(liveStreak(state, '2026-03-11')).toBe(4);
    expect(liveStreak(state, '2026-03-12')).toBe(0);
  });
});
