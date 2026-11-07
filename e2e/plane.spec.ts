import { expect, test, type Page } from '@playwright/test';

async function openLesson(page: Page): Promise<void> {
  await page.goto('/');
  await page.getByRole('button', { name: 'Dibujo Técnico I', exact: true }).click();
  await page.getByRole('link', { name: /Mediatriz, bisectriz/ }).click();
  await expect(page.locator('#lesson-progress-text')).toContainText('Paso 1');
}

async function goToPage(page: Page, presses: number): Promise<void> {
  for (let i = 0; i < presses; i++) await page.keyboard.press('ArrowRight');
}

test.describe('motor de geometría plana (I-01)', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1366, height: 768 });
  });

  test('solo lámina: sin modelo 3D ni abatimiento', async ({ page }) => {
    await openLesson(page);
    await expect(page.locator('.panel-3d')).toBeHidden();
    await expect(page.locator('#fold-controls')).toBeHidden();
    await expect(page.locator('.sheet-empty-note')).toHaveCount(0);
    await expect(page.locator('[data-layer="plana:A"] [data-label="A"]')).toBeAttached();
  });

  test('la mediatriz aparece y P equidista de A y B al moverlo con el teclado', async ({
    page,
  }) => {
    await openLesson(page);
    await goToPage(page, 3);
    await expect(page.locator('[data-layer="plana:m"] [data-label="m"]')).toBeAttached();
    const handle = page.locator('.plane-handle[data-point="P"]');
    await handle.focus();
    for (let i = 0; i < 6; i++) await handle.press('ArrowUp');
    // Al acabar de redibujar, las dos distancias coinciden.
    await expect
      .poll(async () => {
        const a = await page.locator('[data-layer="plana:dPA"] text').textContent();
        const b = await page.locator('[data-layer="plana:dPB"] text').textContent();
        return a !== null && a === b;
      })
      .toBe(true);
    // El lugar deja rastro.
    await expect(page.locator('[data-layer="lugar"] .locus-trail')).toBeAttached();
  });

  test('arrastrar con el ratón un punto libre recalcula la construcción', async ({ page }) => {
    await openLesson(page);
    await goToPage(page, 2);
    const before = await page.locator('[data-layer="plana:M1"] circle').getAttribute('cx');
    const handle = page.locator('.plane-handle[data-point="B"]');
    const box = await handle.boundingBox();
    if (!box) throw new Error('sin asa');
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width / 2 + 40, box.y + box.height / 2, { steps: 5 });
    await page.mouse.up();
    const after = await page.locator('[data-layer="plana:M1"] circle').getAttribute('cx');
    expect(after).not.toBe(before);
  });

  test('sin solución: aviso breve y sin fallos', async ({ page }) => {
    await openLesson(page);
    await goToPage(page, 1);
    const handle = page.locator('.plane-handle[data-point="B"]');
    await handle.focus();
    for (let i = 0; i < 6; i++) await handle.press('Shift+ArrowRight');
    await expect(page.locator('.plane-controls .methods-notice')).toContainText('no se cortan');
  });

  test('ejercicio: colocar el circuncentro', async ({ page }) => {
    await openLesson(page);
    await goToPage(page, 9);
    await expect(page.locator('#lesson-progress-text')).toContainText('Ejercicio 2 de 3');
    await page.getByRole('button', { name: 'Comprobar' }).click();
    await expect(page.locator('#exercise-feedback')).toContainText('mediatriz');
  });
});

for (const viewport of [
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: '1366x768', width: 1366, height: 768 },
  { name: '390x844', width: 390, height: 844 },
]) {
  test(`capturas plana ${viewport.name}`, async ({ page }) => {
    test.setTimeout(120_000);
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await openLesson(page);
    const pages = 11;
    for (let i = 1; i <= pages; i++) {
      await page.waitForTimeout(700);
      await page.screenshot({
        path: `screenshots/plana-${String(i).padStart(2, '0')}-${viewport.name}.png`,
        fullPage: true,
      });
      if (i < pages) await page.getByRole('button', { name: 'Siguiente →' }).click();
    }
  });
}

test('trazado animado con compás (sin reducir el movimiento)', async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 768 });
  await openLesson(page);
  await page.getByRole('button', { name: 'Siguiente →' }).click();
  await page.waitForTimeout(500);
  await expect(page.locator('[data-layer="herramienta"] .tool-compass')).toBeAttached();
  await page.screenshot({ path: 'screenshots/plana-compas-1366x768.png' });
});
