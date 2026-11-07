import { expect, test, type Page } from '@playwright/test';

async function openLesson(page: Page): Promise<void> {
  await page.goto('/');
  await page.getByRole('button', { name: 'Dibujo Técnico II' }).click();
  await page.getByRole('link', { name: /Sección de una pirámide/ }).click();
  await expect(page.locator('#lesson-progress-text')).toContainText('Paso 1');
}

async function goToPage(page: Page, presses: number): Promise<void> {
  for (let i = 0; i < presses; i++) await page.keyboard.press('ArrowRight');
}

test.describe('motor de sólidos (II-08)', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1366, height: 768 });
  });

  test('aristas vistas y ocultas en la lámina', async ({ page }) => {
    await openLesson(page);
    await goToPage(page, 1);
    const edges = page.locator('[data-layer="solido"] .solid-edge');
    await expect(edges.first()).toBeAttached();
    expect(
      await page.locator('[data-layer="solido"] .solid-edge.is-hidden-edge').count(),
    ).toBeGreaterThan(0);
    await expect(page.locator('[data-layer="vertices"] [data-label="V″"]')).toBeAttached();
    // Sin puntos en la escena, no hay deslizadores de coordenadas.
    await expect(page.locator('#point-controls')).toBeHidden();
  });

  test('sección: cinco puntos numerados en las dos vistas y su verdadera magnitud', async ({
    page,
  }) => {
    await openLesson(page);
    await goToPage(page, 4);
    for (const label of ['1″', '5″', '1′', '5′']) {
      await expect(page.locator(`[data-layer="seccion"] [data-label="${label}"]`)).toBeAttached();
    }
    await expect(page.locator('[data-layer="corte"] [data-label="α₂"]')).toBeAttached();
    await goToPage(page, 3);
    await expect(page.locator('[data-layer="seccion-vm"] [data-label="(3)"]')).toBeAttached();
  });

  test('desarrollo del tronco y deslizador', async ({ page }) => {
    await openLesson(page);
    await goToPage(page, 8);
    await expect(
      page.locator('[data-layer="desarrollo"] [data-label="Desarrollo"]'),
    ).toBeAttached();
    const slider = page.getByRole('slider', { name: 'Desarrollo' });
    await slider.fill('30');
    await expect(page.locator('[data-layer="desarrollo"] [data-label="Desarrollo"]')).toHaveCount(
      0,
    );
  });

  test('ejercicio de medida de la sección', async ({ page }) => {
    await openLesson(page);
    await goToPage(page, 9);
    const answer = page.getByRole('spinbutton', { name: 'Tu respuesta' });
    await answer.fill('16');
    await answer.press('Enter');
    await expect(page.locator('#exercise-feedback')).toContainText('Correcto');
  });
});

for (const viewport of [
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: '1366x768', width: 1366, height: 768 },
  { name: '390x844', width: 390, height: 844 },
]) {
  test(`capturas sólidos ${viewport.name}`, async ({ page }) => {
    test.setTimeout(120_000);
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await openLesson(page);
    const pages = 12;
    for (let i = 1; i <= pages; i++) {
      await page.waitForTimeout(900);
      await page.screenshot({
        path: `screenshots/solidos-${String(i).padStart(2, '0')}-${viewport.name}.png`,
        fullPage: true,
      });
      if (i < pages) await page.getByRole('button', { name: 'Siguiente →' }).click();
    }
  });
}
