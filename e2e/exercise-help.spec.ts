// Ayudas de los ejercicios en «Tres métodos» (II-05): pistas escalonadas, solución paso a paso
// (tras dos fallos o con «Me rindo») y variantes con semilla.
import { readFileSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';
import { generateVariant } from '../src/content/variants.ts';
import { LessonSchema } from '../src/content/schema.ts';

/** Dato que debe existir: si falta, el test falla con un mensaje claro. */
function must<T>(value: T | undefined): T {
  if (value === undefined) throw new Error('Falta un dato de la lección en el test');
  return value;
}

const lesson = LessonSchema.parse(
  JSON.parse(readFileSync('src/content/lessons/04-tres-metodos.json', 'utf-8')),
);
const exercise = must(lesson.exercises[0]);
const STEPS = lesson.steps.length;

async function openFirstExercise(page: Page): Promise<void> {
  await page.goto('/');
  await page.getByRole('button', { name: 'Dibujo Técnico II' }).click();
  await page.getByRole('link', { name: /Tres métodos/ }).click();
  await expect(page.locator('#lesson-progress-text')).toContainText('Paso 1');
  for (let i = 0; i < STEPS; i++) await page.keyboard.press('ArrowRight');
  await expect(page.locator('#lesson-progress-text')).toContainText('Ejercicio 1 de');
}

async function fail(page: Page): Promise<void> {
  await page.getByRole('spinbutton', { name: 'Tu respuesta' }).fill('50');
  await page.getByRole('button', { name: 'Comprobar' }).click();
  await expect(page.locator('#exercise-feedback')).toHaveClass(/is-wrong/);
}

test.describe('ayudas de los ejercicios (II-05)', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1366, height: 768 });
  });

  test('las tres pistas salen en orden: idea, método y primer trazado', async ({ page }) => {
    const hints = exercise.hints ?? [];
    expect(hints).toHaveLength(3);
    await openFirstExercise(page);
    const hintButton = page.locator('#exercise-hint');
    const list = page.getByRole('list', { name: 'Pistas' });
    await expect(list).toBeHidden();

    for (let shown = 1; shown <= 3; shown++) {
      await expect(hintButton).toHaveText(`Pista ${shown} de 3`);
      await hintButton.click();
      await expect(list.getByRole('listitem')).toHaveCount(shown);
      // Siempre en el mismo orden, sin reordenar las anteriores.
      for (let i = 0; i < shown; i++) {
        await expect(list.getByRole('listitem').nth(i)).toHaveText(must(hints[i]));
      }
    }
    await expect(hintButton).toHaveText('Pistas vistas (3 de 3)');
    await expect(hintButton).toBeDisabled();
  });

  test('la solución se ofrece tras dos fallos y se recorre paso a paso', async ({ page }) => {
    const solution = exercise.solution ?? [];
    await openFirstExercise(page);
    const button = page.locator('#exercise-solution');
    await expect(button).toHaveText('Me rindo: ver la solución');

    await fail(page);
    await expect(button).toHaveText('Me rindo: ver la solución');
    await fail(page);
    await expect(button).toHaveText('Ver la solución paso a paso');

    await button.click();
    const progress = page.locator('#lesson-progress-text');
    const narration = page.locator('#lesson-narration');
    await expect(progress).toHaveText(`Solución del ejercicio 1 · paso 1 de ${solution.length}`);
    await expect(narration).toHaveText(must(solution[0]).narration);
    await expect(page.getByRole('button', { name: '← Paso anterior' })).toBeDisabled();

    await page.getByRole('button', { name: 'Paso siguiente →' }).click();
    await expect(progress).toContainText(`paso 2 de ${solution.length}`);
    await expect(narration).toHaveText(must(solution[1]).narration);
    await page.getByRole('button', { name: '← Paso anterior' }).click();
    await expect(narration).toHaveText(must(solution[0]).narration);

    for (let i = 1; i < solution.length; i++) {
      await page.getByRole('button', { name: 'Paso siguiente →' }).click();
    }
    await expect(narration).toHaveText(must(solution.at(-1)).narration);
    await expect(page.getByRole('button', { name: 'Paso siguiente →' })).toBeDisabled();

    await page.getByRole('button', { name: 'Volver al ejercicio' }).click();
    await expect(progress).toContainText('Ejercicio 1 de');
    await expect(narration).toHaveText(exercise.prompt);
  });

  test('«Me rindo» da la solución sin haber fallado', async ({ page }) => {
    await openFirstExercise(page);
    await page.getByRole('button', { name: 'Me rindo: ver la solución' }).click();
    await expect(page.locator('#lesson-progress-text')).toContainText('Solución del ejercicio 1');
    await expect(page.locator('#solution-controls')).toBeVisible();
  });

  test('una variante con semilla acepta la respuesta calculada por el motor', async ({ page }) => {
    // El botón usa Math.random para la semilla: se fija para conocer la variante.
    await page.addInitScript(() => {
      Math.random = () => 0.5;
    });
    const seed = Math.floor(0.5 * 2 ** 31);
    const variant = generateVariant(lesson, exercise, seed);
    if (variant === null || exercise.kind !== 'value') throw new Error('Sin variante');
    // Los datos cambian: la respuesta del ejercicio original ya no vale.
    expect(variant.answer).not.toBeCloseTo(exercise.answer, 0);

    await openFirstExercise(page);
    await page.getByRole('button', { name: 'Prueba con otros datos' }).click();

    const answer = page.getByRole('spinbutton', { name: 'Tu respuesta' });
    await answer.fill(String(variant.answer + 20));
    await page.getByRole('button', { name: 'Comprobar' }).click();
    await expect(page.locator('#exercise-feedback')).toHaveClass(/is-wrong/);

    await answer.fill(String(variant.answer));
    await page.getByRole('button', { name: 'Comprobar' }).click();
    await expect(page.locator('#exercise-feedback')).toContainText('Correcto');
    await expect(page.locator('#exercise-feedback')).toHaveClass(/is-correct/);
  });
});
