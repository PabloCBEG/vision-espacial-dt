import { expect, test } from '@playwright/test';

// Tamaños de pantalla que se revisan antes de cerrar cada tarea (ver CLAUDE.md).
const viewports = [
  { name: 'proyector-1920x1080', width: 1920, height: 1080, stacked: false },
  { name: 'portatil-1366x768', width: 1366, height: 768, stacked: false },
  { name: 'movil-390x844', width: 390, height: 844, stacked: true },
];

for (const viewport of viewports) {
  for (const theme of ['light', 'dark'] as const) {
    test(`página inicial ${viewport.name} ${theme}`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: theme });
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/#/libre');

      await expect(
        page.getByRole('link', { name: /Visión espacial · Dibujo Técnico/ }),
      ).toBeVisible();
      await expect(
        page.getByRole('heading', { level: 1, name: 'Explorar libremente' }),
      ).toBeAttached();

      const panel3d = page.getByRole('region', { name: 'Modelo 3D' });
      const panel2d = page.getByRole('region', { name: 'Lámina' });
      const box3d = await panel3d.boundingBox();
      const box2d = await panel2d.boundingBox();
      if (!box3d || !box2d) {
        throw new Error('Los dos paneles deben estar visibles');
      }

      if (viewport.stacked) {
        // En pantallas estrechas, el 3D queda encima de la lámina.
        expect(box3d.y + box3d.height).toBeLessThanOrEqual(box2d.y);
      } else {
        // En pantallas anchas, el 3D queda a la izquierda de la lámina.
        expect(box3d.x + box3d.width).toBeLessThanOrEqual(box2d.x);
      }

      // Sin desplazamiento horizontal de la página.
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(scrollWidth).toBeLessThanOrEqual(viewport.width);

      await page.screenshot({
        path: `screenshots/${viewport.name}-${theme}.png`,
        fullPage: true,
      });
    });
  }
}

test('el botón de tema cambia entre claro y oscuro con el teclado', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/#/libre');

  const toggle = page.getByRole('button', { name: 'Tema oscuro' });
  await toggle.focus();
  await page.keyboard.press('Enter');

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.getByRole('button', { name: 'Tema claro' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
});
