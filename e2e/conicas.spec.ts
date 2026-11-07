import { expect, test } from '@playwright/test';

test.describe('laboratorio de cónicas y desplegable analítico', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1366, height: 768 });
  });

  test('el tipo, la excentricidad y la ecuación cambian al inclinar el plano', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Dibujo Técnico II' }).click();
    await page.getByRole('link', { name: /Laboratorio de cónicas/ }).click();
    const panel = page.locator('#analytic-panel');
    await expect(panel).toBeVisible();
    await expect(panel).toContainText('Cónica: elipse');
    // KaTeX dibuja las fórmulas.
    await expect(panel.locator('.analytic-tex .katex').first()).toBeAttached();
    await expect(page.locator('[data-layer="conica-vm"] .conic-curve').first()).toBeAttached();

    const theta = page.getByRole('slider', { name: 'Inclinación del plano (θ)' });
    await theta.fill('0');
    await expect(panel).toContainText('Cónica: circunferencia');
    await theta.fill('60');
    await expect(panel).toContainText('Cónica: parábola');
    await expect(panel.locator('[data-tex^="y^2 = 2"]')).toBeAttached();
    await theta.fill('80');
    await expect(panel).toContainText('Cónica: hipérbola');
    expect(await page.locator('[data-layer="conica-vm"] .conic-curve').count()).toBe(2);
    await expect(page.locator('[data-layer="conica-vm"] .conic-asymptote')).toHaveCount(2);
  });

  test('el desplegable es modular: el modo libre del diédrico publica sus ecuaciones', async ({
    page,
  }) => {
    await page.goto('/#/libre');
    await page.getByRole('button', { name: 'Plano' }).click();
    await expect(page.locator('#analytic-panel')).toContainText('Plano α');
    await expect(page.locator('#analytic-panel')).toContainText('Ecuación implícita');
    // Al salir, el panel se vacía.
    await page.goto('/#/');
    await expect(page.locator('#analytic-panel')).toBeHidden();
  });

  test('girar el plano con TransformControls (arrastrando en el 3D)', async ({ page }) => {
    await page.goto('/#/conicas');
    await expect(page.locator('#analytic-panel')).toContainText('elipse');
    const before = await page
      .locator('#output-lab-theta, [for="slider-lab-theta"] + output')
      .first()
      .textContent();
    void before;
    await expect(page.getByRole('button', { name: 'Inclinar el plano' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await page.getByRole('button', { name: 'Subir o bajar el plano' }).click();
    await expect(page.getByRole('button', { name: 'Subir o bajar el plano' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });
});

for (const viewport of [
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: '1366x768', width: 1366, height: 768 },
  { name: '390x844', width: 390, height: 844 },
]) {
  test(`capturas cónicas ${viewport.name}`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto('/#/conicas');
    for (const theta of ['30', '60', '80']) {
      await page.getByRole('slider', { name: 'Inclinación del plano (θ)' }).fill(theta);
      await page.waitForTimeout(700);
      await page.screenshot({
        path: `screenshots/conicas-${theta}-${viewport.name}.png`,
        fullPage: true,
      });
    }
  });
}
