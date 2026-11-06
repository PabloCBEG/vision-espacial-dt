import { expect, test, type Page } from '@playwright/test';

/** Posición en pantalla de una etiqueta de la escena (su ancla está justo sobre el punto). */
async function labelAnchor(page: Page, name: string): Promise<{ x: number; y: number }> {
  return page.evaluate((labelName) => {
    const element = document.querySelector(`#view-3d [data-label="${labelName}"]`);
    if (!element) throw new Error(`No existe la etiqueta ${labelName}`);
    const rect = element.getBoundingClientRect();
    return { x: rect.left, y: rect.top };
  }, name);
}

async function waitForScene(page: Page): Promise<void> {
  await expect(page.locator('#view-3d canvas')).toBeVisible();
  await expect(page.locator('#view-3d [data-label="P″"]')).toBeAttached();
}

const sliderX = (page: Page) => page.getByRole('slider', { name: 'x', exact: true });
const sliderA = (page: Page) => page.getByRole('slider', { name: 'Alejamiento (a)' });
const sliderC = (page: Page) => page.getByRole('slider', { name: 'Cota (c)' });

test.describe('modelo 3D', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
  });

  test('los deslizadores mueven el punto y actualizan cota y alejamiento', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto('/');
    await waitForScene(page);

    await expect(page.locator('#view-3d [data-label="cota-P"]')).toHaveText('c = 40 mm');
    await sliderC(page).fill('-25');
    await expect(page.locator('#view-3d [data-label="cota-P"]')).toHaveText('c = −25 mm');
    await sliderA(page).fill('15');
    await expect(page.locator('#view-3d [data-label="alejamiento-P"]')).toHaveText('a = 15 mm');
    await expect(page.locator('output[data-axis="c"]')).toHaveText('−25 mm');
    await expect(page.locator('#point-description')).toHaveText(
      'P(20, 15, −25) mm, en el cuarto cuadrante',
    );
  });

  test('los deslizadores se manejan con el teclado', async ({ page }) => {
    await page.goto('/');
    await waitForScene(page);
    await sliderX(page).focus();
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await expect(sliderX(page)).toHaveValue('22');
  });

  test('los botones de vista se activan con el teclado', async ({ page }) => {
    await page.goto('/');
    await waitForScene(page);
    const top = page.getByRole('button', { name: 'Superior' });
    await top.focus();
    await page.keyboard.press('Enter');
    await expect(top).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByRole('button', { name: 'Perspectiva' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });

  // Los arrastres se hacen en perspectiva: en las vistas frontal y superior
  // P queda delante de P″ o de P′ y se arrastraría P.
  test('arrastrar P″ cambia x y cota, pero no el alejamiento', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto('/');
    await waitForScene(page);

    const anchor = await labelAnchor(page, 'P″');
    await page.mouse.move(anchor.x, anchor.y);
    await page.mouse.down();
    await page.mouse.move(anchor.x + 40, anchor.y - 30, { steps: 8 });
    await page.mouse.up();

    expect(Number(await sliderX(page).inputValue())).toBeGreaterThan(20);
    expect(Number(await sliderC(page).inputValue())).toBeGreaterThan(40);
    await expect(sliderA(page)).toHaveValue('30');
  });

  test('arrastrar P′ cambia x y alejamiento, pero no la cota', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto('/');
    await waitForScene(page);

    const anchor = await labelAnchor(page, 'P′');
    await page.mouse.move(anchor.x, anchor.y);
    await page.mouse.down();
    await page.mouse.move(anchor.x - 40, anchor.y + 20, { steps: 8 });
    await page.mouse.up();

    expect(Number(await sliderX(page).inputValue())).not.toBe(20);
    await expect(sliderC(page)).toHaveValue('40');
  });

  for (const viewport of [
    { name: '1366x768', width: 1366, height: 768 },
    { name: '390x844', width: 390, height: 844 },
  ]) {
    for (const view of ['Perspectiva', 'Frontal', 'Superior', 'Perfil']) {
      test(`captura ${viewport.name} vista ${view}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto('/');
        await waitForScene(page);
        await page.getByRole('button', { name: view }).click();
        await page.waitForTimeout(150);
        await page.screenshot({
          path: `screenshots/3d-${viewport.name}-${view.toLowerCase()}.png`,
          fullPage: true,
        });
      });
    }
  }
});
