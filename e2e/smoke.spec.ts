// Test de humo en varios navegadores (Chromium, Firefox y WebKit): la web arranca, se abre la
// primera lección y se resuelve un ejercicio. El resto de tests solo corre en Chromium.
import { expect, test } from '@playwright/test';

test('humo: inicio, primer paso de una lección y un ejercicio', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 1366, height: 768 });

  // Inicio.
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: 'Temario' })).toBeVisible();

  // Primer paso de una lección: el 3D (canvas) y la lámina (SVG) se dibujan.
  await page.getByRole('button', { name: 'Dibujo Técnico II' }).click();
  await page.getByRole('link', { name: /Tres métodos/ }).click();
  await expect(page.locator('#lesson-progress-text')).toContainText('Paso 1');
  if (testInfo.project.name === 'firefox') {
    // Firefox sin cabeza en el servidor de CI no tiene WebGL: la web debe avisar, no romperse.
    await expect(
      page.locator('#view-3d canvas').or(page.getByText('necesita WebGL')),
    ).toBeVisible();
  } else {
    await expect(page.locator('#view-3d canvas')).toBeVisible();
  }
  await expect(page.locator('#view-2d svg').first()).toBeVisible();
  await page.getByRole('button', { name: 'Siguiente →' }).click();
  await expect(page.locator('#lesson-progress-text')).toContainText('Paso 2');

  // Un ejercicio: una respuesta mala se explica y la buena se acepta.
  for (let i = 0; i < 8; i++) await page.keyboard.press('ArrowRight');
  await expect(page.locator('#lesson-progress-text')).toContainText('Ejercicio 1');
  const answer = page.getByRole('spinbutton', { name: 'Tu respuesta' });
  await answer.fill('50');
  await page.getByRole('button', { name: 'Comprobar' }).click();
  await expect(page.locator('#exercise-feedback')).toHaveClass(/is-wrong/);
  await answer.fill('62');
  await page.getByRole('button', { name: 'Comprobar' }).click();
  await expect(page.locator('#exercise-feedback')).toContainText('Correcto');

  expect(errors).toEqual([]);
});
