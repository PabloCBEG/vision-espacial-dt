import { expect, test, type Page } from '@playwright/test';

const foldSlider = (page: Page) => page.getByRole('slider', { name: 'Abatir PH' });

async function ready(page: Page): Promise<void> {
  await page.goto('/#/libre');
  await expect(page.locator('#view-3d [data-label="P″"]')).toBeAttached();
  await expect(page.locator('[data-handle="P′"]')).toBeAttached();
}

test.describe('abatimiento del PH', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'no-preference' });
    await page.setViewportSize({ width: 1366, height: 768 });
  });

  test("antes de 90° P' aparece pendiente en la lámina; a 90° ya no", async ({ page }) => {
    await ready(page);
    await expect(page.locator('[data-handle="P′"]')).toHaveClass(/is-pending/);
    await foldSlider(page).fill('45');
    await expect(page.locator('#output-fold')).toHaveText('45°');
    await expect(page.locator('[data-handle="P′"]')).toHaveClass(/is-pending/);
    await expect(page.locator('[data-handle="P″"]')).not.toHaveClass(/is-pending/);
    await foldSlider(page).fill('90');
    await expect(page.locator('[data-handle="P′"]')).not.toHaveClass(/is-pending/);
  });

  test('al llegar a 90° la cámara pasa a vista frontal', async ({ page }) => {
    await ready(page);
    await foldSlider(page).fill('90');
    await expect(page.getByRole('button', { name: 'Frontal' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  test('reproducir abate en unos 3 segundos y se puede deshacer', async ({ page }) => {
    await ready(page);
    const start = Date.now();
    await page.getByRole('button', { name: 'Reproducir abatimiento' }).click();
    await expect(page.locator('#output-fold')).toHaveText('90°', { timeout: 6000 });
    const elapsed = Date.now() - start;
    expect(elapsed).toBeGreaterThan(2000);
    expect(elapsed).toBeLessThan(5000);
    await page.getByRole('button', { name: 'Deshacer abatimiento' }).click();
    await expect(page.locator('#output-fold')).toHaveText('0°', { timeout: 6000 });
  });

  test('en 3D P″ no se mueve al abatir', async ({ page }) => {
    await ready(page);
    const position = () =>
      page.evaluate(() => {
        const r = document.querySelector('#view-3d [data-label="P″"]')?.getBoundingClientRect();
        return { x: Math.round(r?.left ?? 0), y: Math.round(r?.top ?? 0) };
      });
    const before = await position();
    await foldSlider(page).fill('60');
    await page.waitForTimeout(100);
    expect(await position()).toEqual(before);
  });

  test('modo explicar: una frase en 0°, 45° y 90°', async ({ page }) => {
    await ready(page);
    const caption = page.locator('#explain-caption');
    await expect(caption).toBeHidden();
    await page.getByRole('button', { name: 'Explicar' }).click();
    await expect(caption).toContainText('perpendiculares');
    await foldSlider(page).fill('45');
    await expect(caption).toContainText('como una puerta');
    await foldSlider(page).fill('90');
    await expect(caption).toContainText('esto es la lámina');
  });
});

for (const viewport of [
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: '1366x768', width: 1366, height: 768 },
  { name: '390x844', width: 390, height: 844 },
]) {
  for (const angle of [0, 45, 90]) {
    test(`captura abatimiento ${angle}° ${viewport.name}`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await ready(page);
      await page.getByRole('button', { name: 'Explicar' }).click();
      await foldSlider(page).fill(String(angle));
      await page.waitForTimeout(200);
      await page.screenshot({
        path: `screenshots/abatimiento-${angle}-${viewport.name}.png`,
        fullPage: true,
      });
    });
  }
}
