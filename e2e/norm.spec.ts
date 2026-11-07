import { expect, test, type Page } from '@playwright/test';

async function openLesson(page: Page): Promise<void> {
  await page.goto('/');
  await page.getByRole('button', { name: 'Dibujo Técnico II' }).click();
  await page.getByRole('link', { name: /Vistas desde una isométrica/ }).click();
  await expect(page.locator('#lesson-progress-text')).toContainText('Paso 1');
}

async function goToPage(page: Page, presses: number): Promise<void> {
  for (let i = 0; i < presses; i++) await page.keyboard.press('ArrowRight');
}

test.describe('motor de normalización (II-12)', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1366, height: 768 });
  });

  test('las tres vistas con ocultas y ejes, en el sistema europeo', async ({ page }) => {
    await openLesson(page);
    await goToPage(page, 6);
    await expect(page.locator('[data-layer="vistas"] .norm-visible').first()).toBeAttached({
      timeout: 15_000,
    });
    expect(await page.locator('[data-layer="ocultas"] .norm-hidden').count()).toBeGreaterThan(0);
    expect(await page.locator('[data-layer="ejes"] .norm-axis').count()).toBeGreaterThan(0);
    for (const name of ['Alzado', 'Planta', 'Perfil izquierdo']) {
      await expect(page.locator(`[data-layer="vistas"] [data-label="${name}"]`)).toBeAttached();
    }
    // Planta debajo del alzado y perfil a su derecha.
    const box = async (name: string) =>
      page.locator(`[data-layer="vistas"] [data-label="${name}"]`).boundingBox();
    const alzado = await box('Alzado');
    const planta = await box('Planta');
    const perfil = await box('Perfil izquierdo');
    expect(planta?.y ?? 0).toBeGreaterThan(alzado?.y ?? 0);
    expect(perfil?.x ?? 0).toBeGreaterThan(alzado?.x ?? 0);
  });

  test('cotas con símbolo de diámetro', async ({ page }) => {
    await openLesson(page);
    await goToPage(page, 7);
    await expect(page.locator('[data-layer="cotas"] text', { hasText: '⌀12' })).toBeAttached({
      timeout: 15_000,
    });
    await expect(page.locator('[data-layer="cotas"] text', { hasText: '50' })).toBeAttached();
  });

  test('ejercicios: vista que falta, vistas necesarias y corte', async ({ page }) => {
    await openLesson(page);
    await goToPage(page, 8);
    await page.getByRole('button', { name: 'Opción 2' }).click();
    await page.getByRole('button', { name: 'Comprobar' }).click();
    await expect(page.locator('#exercise-feedback')).toContainText('Correcto');

    await page.getByRole('button', { name: 'Siguiente →' }).click();
    await page.getByRole('button', { name: 'Alzado', exact: true }).click();
    await page.getByRole('button', { name: 'Comprobar' }).click();
    await expect(page.locator('#exercise-feedback')).toContainText('falta: planta');
    await page.getByRole('button', { name: 'Planta', exact: true }).click();
    await page.getByRole('button', { name: 'Comprobar' }).click();
    await expect(page.locator('#exercise-feedback')).toContainText('Correcto');

    await page.getByRole('button', { name: 'Siguiente →' }).click();
    await page.getByRole('button', { name: 'Opción 1' }).click();
    await page.getByRole('button', { name: 'Comprobar' }).click();
    await expect(page.locator('#exercise-feedback')).toContainText('No es ese');
    await page.getByRole('button', { name: 'Opción 2' }).click();
    await page.getByRole('button', { name: 'Comprobar' }).click();
    await expect(page.locator('#exercise-feedback')).toContainText('rayadas a 45°');
  });
});

for (const viewport of [
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: '1366x768', width: 1366, height: 768 },
  { name: '390x844', width: 390, height: 844 },
]) {
  test(`capturas normalización ${viewport.name}`, async ({ page }) => {
    test.setTimeout(120_000);
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await openLesson(page);
    const pages = 11;
    for (let i = 1; i <= pages; i++) {
      await page.waitForTimeout(i === 1 ? 2500 : 1200);
      await page.screenshot({
        path: `screenshots/norm-${String(i).padStart(2, '0')}-${viewport.name}.png`,
        fullPage: true,
      });
      if (i < pages) await page.getByRole('button', { name: 'Siguiente →' }).click();
    }
  });
}
