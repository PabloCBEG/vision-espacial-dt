import { expect, test, type Page } from '@playwright/test';

// Mover el punto desde cualquiera de las tres vías (deslizadores, 3D, lámina)
// deja las tres sincronizadas.

interface Snapshot {
  sliders: { x: number; a: number; c: number };
  /** Lo que dicen los rótulos de cota y alejamiento del 3D. */
  labels3d: { cota: string; alejamiento: string };
  /** Posición de P′ y P″ en la lámina, en mm (y hacia abajo en SVG). */
  sheet: { hx: number; hy: number; vx: number; vy: number };
}

async function snapshot(page: Page): Promise<Snapshot> {
  // La lámina se redibuja en el siguiente fotograma: se espera a que lo haga.
  await page.evaluate(
    () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
  );
  return page.evaluate(() => {
    const value = (name: string): number =>
      Number(document.querySelector<HTMLInputElement>(`#slider-${name}`)?.value);
    const text = (selector: string): string =>
      document.querySelector(selector)?.textContent?.trim() ?? '';
    const dot = (key: string): { x: number; y: number } => {
      const c = document.querySelector(`[data-handle="${key}"] .sheet-handle-dot`);
      return { x: Number(c?.getAttribute('cx')), y: Number(c?.getAttribute('cy')) };
    };
    const h = dot('P′');
    const v = dot('P″');
    return {
      sliders: { x: value('x'), a: value('a'), c: value('c') },
      labels3d: {
        cota: text('#view-3d [data-label="cota-P"]'),
        alejamiento: text('#view-3d [data-label="alejamiento-P"]'),
      },
      sheet: { hx: h.x, hy: h.y, vx: v.x, vy: v.y },
    };
  });
}

/** Comprueba que las tres vistas cuentan lo mismo. */
function expectConsistent(s: Snapshot): void {
  const minus = (n: number): string => (n < 0 ? `−${Math.abs(n)}` : String(n));
  expect(s.labels3d.cota).toBe(`c = ${minus(s.sliders.c)} mm`);
  expect(s.labels3d.alejamiento).toBe(`a = ${minus(s.sliders.a)} mm`);
  expect(s.sheet.hx).toBe(s.sliders.x);
  expect(s.sheet.vx).toBe(s.sliders.x);
  expect(s.sheet.hy).toBe(s.sliders.a); // P′ bajo la LT si el alejamiento es positivo
  expect(s.sheet.vy).toBe(-s.sliders.c); // P″ sobre la LT si la cota es positiva
}

async function center(page: Page, selector: string): Promise<{ x: number; y: number }> {
  const box = await page.locator(selector).boundingBox();
  if (!box) throw new Error(`No se ve ${selector}`);
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
}

async function drag(page: Page, from: { x: number; y: number }, dx: number, dy: number) {
  await page.mouse.move(from.x, from.y);
  await page.mouse.down();
  await page.mouse.move(from.x + dx, from.y + dy, { steps: 8 });
  await page.mouse.up();
}

test.describe('sincronización de las tres vías', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto('/#/libre');
    await expect(page.locator('#view-3d [data-label="P″"]')).toBeAttached();
    await expect(page.locator('[data-handle="P′"]')).toBeAttached();
  });

  test('estado inicial coherente', async ({ page }) => {
    const s = await snapshot(page);
    expect(s.sliders).toEqual({ x: 20, a: 30, c: 40 });
    expectConsistent(s);
  });

  test('desde los deslizadores', async ({ page }) => {
    await page.getByRole('slider', { name: 'Cota (c)' }).fill('-35');
    await page.getByRole('slider', { name: 'x', exact: true }).fill('-10');
    await expect(page.locator('#slider-c')).toHaveValue('-35');
    await expect.poll(async () => (await snapshot(page)).sheet.vy).toBe(35);
    expectConsistent(await snapshot(page));
  });

  test('desde el 3D (arrastrando P″)', async ({ page }) => {
    const anchor = await page.evaluate(() => {
      const r = document.querySelector('#view-3d [data-label="P″"]')?.getBoundingClientRect();
      return { x: r?.left ?? 0, y: r?.top ?? 0 };
    });
    await drag(page, anchor, 40, -30);
    const s = await snapshot(page);
    expect(s.sliders.x).toBeGreaterThan(20);
    expect(s.sliders.c).toBeGreaterThan(40);
    expect(s.sliders.a).toBe(30);
    await expect.poll(async () => (await snapshot(page)).sheet.vx).toBe(s.sliders.x);
    expectConsistent(await snapshot(page));
  });

  test('desde la lámina (arrastrando P′)', async ({ page }) => {
    const from = await center(page, '[data-handle="P′"] .sheet-handle-dot');
    await drag(page, from, -50, 40); // a la izquierda y hacia abajo: menos x, más alejamiento
    const s = await snapshot(page);
    expect(s.sliders.x).toBeLessThan(20);
    expect(s.sliders.a).toBeGreaterThan(30);
    expect(s.sliders.c).toBe(40);
    await expect
      .poll(async () => (await snapshot(page)).labels3d.alejamiento)
      .toBe(`a = ${s.sliders.a} mm`);
    expectConsistent(await snapshot(page));
  });

  test('desde la lámina (arrastrando P″) solo cambian x y cota', async ({ page }) => {
    const from = await center(page, '[data-handle="P″"] .sheet-handle-dot');
    await drag(page, from, 30, -30);
    const s = await snapshot(page);
    expect(s.sliders.x).toBeGreaterThan(20);
    expect(s.sliders.c).toBeGreaterThan(40);
    expect(s.sliders.a).toBe(30);
    expectConsistent(await snapshot(page));
  });

  test('desde la lámina con el teclado', async ({ page }) => {
    await page.locator('[data-handle="P″"]').focus();
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('Shift+ArrowLeft');
    const s = await snapshot(page);
    expect(s.sliders).toEqual({ x: 10, a: 30, c: 41 });
    expectConsistent(s);
  });

  test('modo proyector en los dos paneles', async ({ page }) => {
    const width = () =>
      page.evaluate(() =>
        getComputedStyle(document.documentElement).getPropertyValue('--sheet-thick'),
      );
    expect((await width()).trim()).toBe('2.5px');
    await page.getByRole('button', { name: 'Modo proyector' }).click();
    await expect(page.getByRole('button', { name: 'Modo proyector' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect((await width()).trim()).toBe('5px');
  });
});

for (const viewport of [
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: '1366x768', width: 1366, height: 768 },
  { name: '390x844', width: 390, height: 844 },
]) {
  for (const projector of [false, true]) {
    test(`captura lámina ${viewport.name}${projector ? ' proyector' : ''}`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/#/libre');
      await expect(page.locator('[data-handle="P′"]')).toBeAttached();
      if (projector) await page.getByRole('button', { name: 'Modo proyector' }).click();
      await page.waitForTimeout(150);
      await page.screenshot({
        path: `screenshots/lamina-${viewport.name}${projector ? '-proyector' : ''}.png`,
        fullPage: true,
      });
    });
  }
}
