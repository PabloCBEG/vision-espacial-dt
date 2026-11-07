import { expect, test } from '@playwright/test';

test('la web funciona sin conexión una vez cargada', async ({ page, context }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Temario' })).toBeVisible();
  // Espera a que el service worker haya guardado la web.
  await page.evaluate(async () => {
    const registration = await navigator.serviceWorker.ready;
    if (!registration.active) throw new Error('Sin service worker activo');
  });
  await page.reload(); // la página queda controlada por el service worker
  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Temario' })).toBeVisible();
  await page.getByRole('link', { name: /El punto en el sistema diédrico/ }).click();
  await expect(page.locator('#lesson-progress-text')).toContainText('Paso 1');
  await context.setOffline(false);
});

test('el manifiesto permite añadirla a la pantalla de inicio', async ({ page }) => {
  const response = await page.request.get('/manifest.webmanifest');
  expect(response.ok()).toBe(true);
  const manifest = await response.json();
  expect(manifest.display).toBe('standalone');
  expect(manifest.icons.map((i: { sizes: string }) => i.sizes)).toEqual(
    expect.arrayContaining(['192x192', '512x512']),
  );
});
