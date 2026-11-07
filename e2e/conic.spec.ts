import { expect, test, type Page } from '@playwright/test';

async function openLesson(page: Page): Promise<void> {
  await page.goto('/');
  await page.getByRole('button', { name: 'Dibujo Técnico I', exact: true }).click();
  await page.getByRole('link', { name: /paralelas se juntan/ }).click();
  await expect(page.locator('#lesson-progress-text')).toContainText('Paso 1');
}

async function goToPage(page: Page, presses: number): Promise<void> {
  for (let i = 0; i < presses; i++) await page.keyboard.press('ArrowRight');
}

test.describe('motor de perspectiva cónica (I-14)', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1366, height: 768 });
  });

  test('frontal: P ≡ F y puntos de distancia', async ({ page }) => {
    await openLesson(page);
    await goToPage(page, 4);
    await expect(page.locator('[data-layer="fugas"] [data-label="P ≡ F"]')).toBeAttached();
    await expect(page.locator('[data-layer="metricos"] [data-label="D₁"]')).toBeAttached();
  });

  test('oblicua: dos puntos de fuga y aristas ocultas discontinuas', async ({ page }) => {
    await openLesson(page);
    await goToPage(page, 5);
    await expect(page.locator('[data-layer="fugas"] [data-label="F₁"]')).toBeAttached();
    await expect(page.locator('[data-layer="fugas"] [data-label="F₂"]')).toBeAttached();
    expect(
      await page.locator('[data-layer="perspectiva"] .is-hidden-edge').count(),
    ).toBeGreaterThan(0);
  });

  test('la imagen cambia al mover al observador', async ({ page }) => {
    await openLesson(page);
    await goToPage(page, 8);
    const edge = page.locator('[data-layer="perspectiva"] .conic-edge').first();
    const before = await edge.getAttribute('points');
    await page.getByRole('slider', { name: 'Altura del observador' }).fill('80');
    await expect.poll(async () => edge.getAttribute('points')).not.toBe(before);
  });
});

for (const viewport of [
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: '1366x768', width: 1366, height: 768 },
  { name: '390x844', width: 390, height: 844 },
]) {
  test(`capturas cónica ${viewport.name}`, async ({ page }) => {
    test.setTimeout(120_000);
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await openLesson(page);
    const pages = 12;
    for (let i = 1; i <= pages; i++) {
      await page.waitForTimeout(900);
      await page.screenshot({
        path: `screenshots/conica-${String(i).padStart(2, '0')}-${viewport.name}.png`,
        fullPage: true,
      });
      if (i < pages) await page.getByRole('button', { name: 'Siguiente →' }).click();
    }
  });
}
