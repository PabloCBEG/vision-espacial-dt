import { expect, test, type Page } from '@playwright/test';

async function openLesson(page: Page): Promise<void> {
  await page.goto('/');
  await page.getByRole('link', { name: /El punto en el sistema diédrico/ }).click();
  await expect(page.locator('#lesson-title')).toHaveText('El punto en el sistema diédrico');
}

const progress = (page: Page) => page.locator('#lesson-progress-text');

test.describe('lección 1: el punto', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1366, height: 768 });
  });

  test('la pantalla de inicio lista las lecciones y el modo libre', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1, name: 'Temario' })).toBeVisible();
    await expect(page.getByRole('link', { name: /El punto en el sistema diédrico/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Explorar libremente/ })).toBeVisible();
  });

  test('avanza y retrocede con los botones y con las flechas', async ({ page }) => {
    await openLesson(page);
    await expect(progress(page)).toHaveText('Paso 1 de 8');
    await expect(page.getByRole('button', { name: '← Anterior' })).toBeDisabled();
    await page.getByRole('button', { name: 'Siguiente →' }).click();
    await expect(progress(page)).toHaveText('Paso 2 de 8');
    await page.keyboard.press('ArrowRight');
    await expect(progress(page)).toHaveText('Paso 3 de 8');
    await page.keyboard.press('ArrowLeft');
    await expect(progress(page)).toHaveText('Paso 2 de 8');
    await expect(page.locator('#lesson-progress')).toHaveAttribute('aria-valuenow', '2');
  });

  test('cada paso muestra solo sus capas', async ({ page }) => {
    await openLesson(page);
    // Paso 1: planos, sin punto. La lámina está vacía.
    await expect(page.locator('#view-3d [data-label="P"]')).toHaveCSS('visibility', 'hidden');
    await expect(page.locator('[data-layer="lt"]')).toHaveClass(/is-hidden/);
    // Paso 5: abatir. La lámina ya muestra la LT y las proyecciones.
    for (let i = 0; i < 4; i++) await page.keyboard.press('ArrowRight');
    await expect(progress(page)).toHaveText('Paso 5 de 8');
    await expect(page.locator('[data-layer="lt"]')).not.toHaveClass(/is-hidden/);
    await expect(page.getByRole('slider', { name: 'Abatir PH' })).toHaveValue('90');
  });

  test('los niveles de ayuda ocultan el 3D; la pista lo muestra 5 segundos', async ({ page }) => {
    await openLesson(page);
    const panel3d = page.locator('.panel-3d');
    await expect(panel3d).toBeVisible();
    await page.getByLabel('Solo 2D').check();
    await expect(panel3d).toBeHidden();
    await page.getByLabel('Con pista').check();
    await expect(panel3d).toBeHidden();
    await page.getByRole('button', { name: 'Ver el 3D 5 s' }).click();
    await expect(panel3d).toBeVisible();
    await expect(panel3d).toBeHidden({ timeout: 7000 });
    await page.getByLabel('Con 3D').check();
    await expect(panel3d).toBeVisible();
  });

  test('ejercicio: detecta cota y alejamiento intercambiados y el acierto', async ({ page }) => {
    await openLesson(page);
    for (let i = 0; i < 8; i++) await page.keyboard.press('ArrowRight');
    await expect(progress(page)).toContainText('Ejercicio 1 de 9');
    // Objetivo: x 30, alejamiento 20, cota 35. Primero se intercambian.
    await page.getByRole('slider', { name: 'x', exact: true }).fill('30');
    await page.getByRole('slider', { name: 'Alejamiento (a)' }).fill('35');
    await page.getByRole('slider', { name: 'Cota (c)' }).fill('20');
    await page.getByRole('button', { name: 'Comprobar' }).click();
    await expect(page.locator('#exercise-feedback')).toContainText('intercambiado');
    await page.getByRole('slider', { name: 'Alejamiento (a)' }).fill('20');
    await page.getByRole('slider', { name: 'Cota (c)' }).fill('35');
    await page.getByRole('button', { name: 'Comprobar' }).click();
    await expect(page.locator('#exercise-feedback')).toContainText('Correcto');
    await expect(progress(page)).toContainText('resuelto');
    // El resultado se guarda solo en este navegador.
    const saved = await page.evaluate(() => localStorage.getItem('resultados:el-punto'));
    expect(saved).toContain('"solved":true');
  });

  test('en el ejercicio la lámina muestra el punto buscado, no el del alumno', async ({ page }) => {
    await openLesson(page);
    for (let i = 0; i < 8; i++) await page.keyboard.press('ArrowRight');
    await expect(page.locator('[data-layer="cuadricula"]')).toBeAttached();
    await expect(page.locator('[data-layer="proyecciones:objetivo"]')).toBeAttached();
    await expect(page.locator('[data-handle="P′"]')).toHaveCount(0);
  });
});

for (const viewport of [
  { name: '1366x768', width: 1366, height: 768 },
  { name: '390x844', width: 390, height: 844 },
]) {
  test(`capturas de la lección 1 ${viewport.name}`, async ({ page }) => {
    test.setTimeout(60_000);
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto('/');
    await page.screenshot({ path: `screenshots/inicio-${viewport.name}.png`, fullPage: true });
    await page.getByRole('link', { name: /El punto en el sistema diédrico/ }).click();
    for (let i = 1; i <= 9; i++) {
      await page.waitForTimeout(700);
      await page.screenshot({
        path: `screenshots/leccion1-${String(i).padStart(2, '0')}-${viewport.name}.png`,
        fullPage: true,
      });
      await page.getByRole('button', { name: 'Siguiente →' }).click();
    }
  });
}
