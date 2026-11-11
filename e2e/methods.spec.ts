import { expect, test, type Page } from '@playwright/test';

async function openLesson(page: Page): Promise<void> {
  await page.goto('/');
  await page.getByRole('button', { name: 'Dibujo Técnico II' }).click();
  await page.getByRole('link', { name: /Tres métodos/ }).click();
  await expect(page.locator('#lesson-progress-text')).toContainText('Paso 1');
}

async function goToPage(page: Page, presses: number): Promise<void> {
  for (let i = 0; i < presses; i++) await page.keyboard.press('ArrowRight');
}

test.describe('motor de métodos (II-05)', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1366, height: 768 });
  });

  test('el giro deja la verdadera magnitud rotulada en la lámina', async ({ page }) => {
    await openLesson(page);
    await goToPage(page, 3);
    await expect(page.locator('[data-layer="medida"] [data-label]')).toHaveText('VM = 57,7 mm');
    await expect(page.locator('[data-layer="resultado"] [data-label="B″₁"]')).toBeAttached();
    await expect(page.locator('[data-layer="eje"] [data-label="e′"]')).toBeAttached();
  });

  test('cambio de plano y abatimiento dan la misma medida', async ({ page }) => {
    await openLesson(page);
    await goToPage(page, 5);
    await expect(page.locator('[data-layer="nueva-lt"] [data-label="LT₁"]')).toBeAttached();
    await expect(page.locator('[data-layer="medida"] [data-label]')).toHaveText('VM = 57,7 mm');
    await goToPage(page, 2);
    await expect(page.locator('[data-layer="resultado"] [data-label="(A)"]')).toBeAttached();
    await expect(page.locator('[data-layer="medida"] [data-label]')).toHaveText('VM = 57,7 mm');
  });

  test('selector de método y deslizador del movimiento', async ({ page }) => {
    await openLesson(page);
    await goToPage(page, 8);
    const selector = page.getByRole('group', { name: 'Elige el método' });
    await expect(selector).toBeVisible();
    await selector.getByRole('button', { name: 'Abatimiento' }).click();
    await expect(selector.getByRole('button', { name: 'Abatimiento' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await expect(page.locator('[data-layer="resultado"] [data-label="(B)"]')).toBeAttached();
    await page.getByRole('slider', { name: 'Movimiento' }).fill('40');
    await expect(page.locator('#output-method')).toHaveText('40 %');
    await expect(page.locator('[data-layer="resultado"] [data-label="(B)"]')).toHaveCount(0);
  });

  test('ejercicio de medida: corrige y explica el error', async ({ page }) => {
    await openLesson(page);
    await goToPage(page, 9);
    await expect(page.locator('#lesson-progress-text')).toContainText('Ejercicio 1 de 9');
    // Los puntos no se mueven: la respuesta depende de ellos.
    await expect(page.getByRole('slider', { name: 'Cota (c)' })).toBeDisabled();
    const answer = page.getByRole('spinbutton', { name: 'Tu respuesta' });
    await answer.fill('50');
    await page.getByRole('button', { name: 'Comprobar' }).click();
    await expect(page.locator('#exercise-feedback')).toContainText('proyección');
    await answer.fill('62');
    await answer.press('Enter');
    await expect(page.locator('#exercise-feedback')).toContainText('Correcto');
  });
});

for (const viewport of [
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: '1366x768', width: 1366, height: 768 },
  { name: '390x844', width: 390, height: 844 },
]) {
  test(`capturas métodos ${viewport.name}`, async ({ page }) => {
    test.setTimeout(120_000);
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await openLesson(page);
    const pages = 18;
    for (let i = 1; i <= pages; i++) {
      await page.waitForTimeout(900);
      await page.screenshot({
        path: `screenshots/metodos-${String(i).padStart(2, '0')}-${viewport.name}.png`,
        fullPage: true,
      });
      if (i < pages) await page.getByRole('button', { name: 'Siguiente →' }).click();
    }
  });
}
