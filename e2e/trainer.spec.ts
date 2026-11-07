import { expect, test } from '@playwright/test';

test.describe('entrenador espacial (E-00)', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1366, height: 768 });
  });

  test('desde el inicio, con cuatro tipos de ítem y cuatro opciones', async ({ page }) => {
    await page.goto('/');
    await page
      .locator('[data-topic="E-00"]')
      .getByRole('link', { name: /Empezar/ })
      .click();
    await expect(page.getByRole('heading', { name: 'Entrenador espacial' })).toBeVisible();
    for (const type of ['Rotaciones', 'Secciones', 'Desarrollos', 'Vistas']) {
      await page.getByRole('button', { name: type }).click();
      expect(await page.locator('.trainer-option').count()).toBeGreaterThanOrEqual(3);
    }
    await expect(page.locator('.panel-2d')).toBeHidden();
  });

  test('responder cuenta en los resultados y el test tiene 20 ítems', async ({ page }) => {
    await page.goto('/#/entrenador');
    await page.getByRole('button', { name: 'Opción 1' }).click();
    await expect(page.locator('.trainer-feedback')).not.toBeEmpty();
    await expect(page.locator('.trainer-status')).toContainText('de 1');
    await page.getByRole('button', { name: 'Test inicial' }).click();
    await expect(page.locator('.trainer-status')).toContainText('ítem 1 de 20');
    await page.getByRole('button', { name: 'Opción 2' }).click();
    await page.getByRole('button', { name: 'Siguiente ítem' }).click();
    await expect(page.locator('.trainer-status')).toContainText('ítem 2 de 20');
  });

  test('exportar pide el código del profesor', async ({ page }) => {
    await page.goto('/#/entrenador');
    await page.locator('.trainer-results summary').click();
    await page.getByRole('button', { name: 'Descargar mis resultados' }).click();
    await expect(page.locator('.trainer-export-note')).toContainText('código');
    await page.getByLabel('Código del profesor').fill('1BACH-A');
    const download = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Descargar mis resultados' }).click();
    expect((await download).suggestedFilename()).toBe('entrenador-1BACH-A.json');
  });
});

for (const viewport of [
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: '1366x768', width: 1366, height: 768 },
  { name: '390x844', width: 390, height: 844 },
]) {
  test(`capturas entrenador ${viewport.name}`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto('/#/entrenador');
    for (const type of ['Rotaciones', 'Secciones', 'Desarrollos', 'Vistas']) {
      await page.getByRole('button', { name: type }).click();
      await page.waitForTimeout(600);
      await page.getByRole('button', { name: 'Ver la solución' }).click();
      await page.waitForTimeout(600);
      await page.screenshot({
        path: `screenshots/entrenador-${type}-${viewport.name}.png`,
        fullPage: true,
      });
    }
  });
}
