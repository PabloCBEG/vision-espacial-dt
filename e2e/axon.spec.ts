import { expect, test, type Page } from '@playwright/test';

async function openLesson(page: Page): Promise<void> {
  await page.goto('/');
  await page.getByRole('button', { name: 'Dibujo Técnico II' }).click();
  await page.getByRole('link', { name: /Octaedro en isométrica/ }).click();
  await expect(page.locator('#lesson-progress-text')).toContainText('Paso 1');
}

async function goToPage(page: Page, presses: number): Promise<void> {
  for (let i = 0; i < presses; i++) await page.keyboard.press('ArrowRight');
}

test.describe('motor de axonometría (II-10)', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1366, height: 768 });
  });

  test('isométrica con triedro y escala gráfica', async ({ page }) => {
    await openLesson(page);
    await goToPage(page, 3);
    for (const axis of ['X', 'Y', 'Z']) {
      await expect(page.locator(`[data-layer="triedro"] [data-label="${axis}"]`)).toBeAttached();
    }
    await expect(page.locator('[data-layer="escala"] [data-label^="× "]')).toBeAttached();
    expect(await page.locator('[data-layer="axonometria"] .axon-edge').count()).toBeGreaterThan(5);
  });

  test('ocultas solo cuando se piden', async ({ page }) => {
    await openLesson(page);
    await goToPage(page, 5);
    await expect(page.locator('[data-layer="axonometria"] .is-hidden-edge')).toHaveCount(0);
    await goToPage(page, 1);
    expect(
      await page.locator('[data-layer="axonometria"] .is-hidden-edge').count(),
    ).toBeGreaterThan(0);
  });
});

for (const viewport of [
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: '1366x768', width: 1366, height: 768 },
  { name: '390x844', width: 390, height: 844 },
]) {
  test(`capturas axonometría ${viewport.name}`, async ({ page }) => {
    test.setTimeout(120_000);
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await openLesson(page);
    const pages = 12;
    for (let i = 1; i <= pages; i++) {
      await page.waitForTimeout(900);
      await page.screenshot({
        path: `screenshots/axon-${String(i).padStart(2, '0')}-${viewport.name}.png`,
        fullPage: true,
      });
      if (i < pages) await page.getByRole('button', { name: 'Siguiente →' }).click();
    }
  });
}
