import { expect, test } from '@playwright/test';

test.describe('banco PAU (M8)', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1366, height: 768 });
  });

  test('desde el inicio de DT II, con filtros por ejercicio, tema y convocatoria', async ({
    page,
  }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Dibujo Técnico II' }).click();
    await page.getByRole('link', { name: /Banco PAU/ }).click();
    await expect(page.getByRole('heading', { name: 'Banco PAU' })).toBeVisible();
    await expect(page.locator('#pau-list > li')).toHaveCount(11);
    await page.locator('#pau-filter-ejercicio').selectOption('2');
    await expect(page.locator('#pau-list > li')).toHaveCount(4);
    await expect(page.locator('#pau-list')).toContainText('pirámide hexagonal');
    await page.locator('#pau-filter-ejercicio').selectOption('');
    await page.locator('#pau-filter-tema').selectOption('II-12');
    await expect(page.locator('#pau-list > li')).toHaveCount(2);
  });

  test('un ejercicio real: enunciado del examen, solución en seis partes y error dibujado', async ({
    page,
  }) => {
    await page.goto('/#/pau/pau-2026-ext-1a-parabola');
    await expect(page.locator('#exam-statement')).toContainText(
      'Dada la directriz D de una parábola',
    );
    // En el examen no se ven los deslizadores del punto (darían datos de la solución).
    await expect(page.locator('.controls-bar')).toBeHidden();
    await page.getByRole('button', { name: 'Terminar y ver la solución' }).click();
    await expect(page.locator('#lesson-progress-text')).toContainText('Paso 1 de 8');
    // La rúbrica avisa de que no es la oficial.
    await page.locator('#rubric-panel summary').click();
    await expect(page.locator('#rubric-panel')).toContainText('no es la oficial');
    // El último paso es el error típico, dibujado punteado y rotulado.
    for (let i = 1; i < 8; i++) await page.getByRole('button', { name: 'Siguiente →' }).click();
    await expect(page.locator('#lesson-narration')).toContainText('Error típico');
    const error = page.locator('#view-2d [data-layer="error"]');
    await expect(error.locator('polyline.stroke-error')).toHaveCount(1);
    await expect(error.getByText('✗ Error: F no es M')).toBeVisible();
  });

  test('modo examen: cronómetro, solo lámina, solución y rúbrica', async ({ page }) => {
    await page.goto('/#/pau/ejemplo-1a-tangencias');
    await expect(page.locator('#exam-timer')).toHaveText(/2[12]:\d\d/);
    await expect(page.locator('.panel-3d')).toBeHidden();
    await expect(page.locator('.lesson-controls')).toBeHidden();
    await expect(page.locator('#exam-statement')).toContainText('tangentes a la circunferencia c');
    await page.getByRole('button', { name: 'Pausa' }).click();
    await expect(page.getByRole('button', { name: 'Seguir' })).toBeVisible();
    await page.getByRole('button', { name: 'Terminar y ver la solución' }).click();
    await expect(page.locator('#lesson-progress-text')).toContainText('Paso 1');
    await expect(page.locator('#rubric-panel')).toBeVisible();
    await page.locator('#rubric-panel summary').click();
    // Precisión y presentación no cuentan hasta llegar al 70 % de la solución.
    await expect(page.getByLabel(/Precisión/)).toBeDisabled();
    for (const name of [/Mediatriz/, /eje radical/, /Centro radical/, /Tangentes/]) {
      await page.getByLabel(name).check();
    }
    await expect(page.getByLabel(/Precisión/)).toBeEnabled();
    await page.getByLabel(/Precisión/).check();
    await expect(page.locator('#rubric-total')).toHaveText('Tu nota: 1,85 de 2,5');
    // La nota queda en el banco.
    await page.goto('/#/pau');
    await expect(page.locator('#pau-list')).toContainText('Tu nota: 1,85 de 2,5');
  });
});

for (const id of [
  'ejemplo-1a-tangencias',
  'ejemplo-2-seccion-piramide',
  'ejemplo-3a-isometrica',
  'ejemplo-4-vistas',
]) {
  for (const viewport of [
    { name: '1366x768', width: 1366, height: 768 },
    { name: '390x844', width: 390, height: 844 },
  ]) {
    test(`capturas PAU ${id} ${viewport.name}`, async ({ page }) => {
      test.setTimeout(90_000);
      await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(`/#/pau/${id}`);
      await page.waitForTimeout(2500);
      await page.screenshot({
        path: `screenshots/pau-${id}-examen-${viewport.name}.png`,
        fullPage: true,
      });
      await page.getByRole('button', { name: 'Terminar y ver la solución' }).click();
      const steps = 4;
      for (let i = 1; i <= steps; i++) {
        await page.waitForTimeout(1200);
        await page.screenshot({
          path: `screenshots/pau-${id}-sol${i}-${viewport.name}.png`,
          fullPage: true,
        });
        const next = page.getByRole('button', { name: 'Siguiente →' });
        if (await next.isDisabled()) break;
        await next.click();
      }
    });
  }
}
