import { describe, expect, it } from 'vitest';
import { explanationFor, FOLD_EXPLANATIONS } from './foldExplanations.ts';

describe('frases del modo explicar', () => {
  it('hay tres frases, en 0°, 45° y 90°', () => {
    expect(FOLD_EXPLANATIONS.map((e) => e.fromAngle)).toEqual([0, 45, 90]);
  });

  it('cada frase tiene como máximo dos oraciones', () => {
    for (const e of FOLD_EXPLANATIONS) {
      const sentences = e.text.split(/[.!?](\s|$)/).filter((s) => s.trim().length > 0);
      expect(sentences.length).toBeLessThanOrEqual(2);
    }
  });

  it('elige la frase según el ángulo', () => {
    expect(explanationFor(0)).toBe(FOLD_EXPLANATIONS[0]?.text);
    expect(explanationFor(44)).toBe(FOLD_EXPLANATIONS[0]?.text);
    expect(explanationFor(45)).toBe(FOLD_EXPLANATIONS[1]?.text);
    expect(explanationFor(89)).toBe(FOLD_EXPLANATIONS[1]?.text);
    expect(explanationFor(90)).toBe(FOLD_EXPLANATIONS[2]?.text);
  });
});
