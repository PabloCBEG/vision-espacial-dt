import { expect, test, type Page } from '@playwright/test';

async function openLesson(page: Page, title: RegExp): Promise<void> {
  await page.goto('/');
  await page.getByRole('link', { name: title }).click();
  await expect(page.locator('#lesson-progress-text')).toContainText('Paso 1');
}

async function goToPage(page: Page, presses: number): Promise<void> {
  for (let i = 0; i < presses; i++) await page.keyboard.press('ArrowRight');
}

test.describe('lecciones 2 y 3', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1366, height: 768 });
  });

  test('la pantalla de inicio lista las tres lecciones del tema I-08 en orden', async ({
    page,
  }) => {
    await page.goto('/');
    const titles = page.locator('[data-topic="I-08"] .lesson-card-title');
    await expect(titles).toHaveText(['El punto en el sistema diédrico', 'La recta', 'El plano']);
  });

  test('inicio: curso, bloque y tema; los temas sin construir salen como próximamente', async ({
    page,
  }) => {
    await page.goto('/');
    await expect(
      page.getByRole('heading', { name: /Bloque B\. Geometría proyectiva/ }),
    ).toBeVisible();
    await page.getByRole('button', { name: 'Dibujo Técnico II' }).click();
    const topic = page.locator('[data-topic="II-13"]');
    await expect(topic).toContainText('Planos de conjunto sencillos y CAD');
    await expect(topic).toContainText('Próximamente');
    await expect(page.locator('[data-topic="I-08"]')).toHaveCount(0);
    // El curso elegido se recuerda al volver.
    await page.reload();
    await expect(page.getByRole('button', { name: 'Dibujo Técnico II' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  test('progreso: una lección vista hasta el final queda marcada', async ({ page }) => {
    await openLesson(page, /El plano/);
    const steps = await page.evaluate(
      () => document.querySelector('#lesson-progress-text')?.textContent,
    );
    const total = Number(/de (\d+)/.exec(steps ?? '')?.[1] ?? 0);
    await goToPage(page, total - 1);
    await page.goto('/');
    await expect(page.locator('[data-topic="I-08"]')).toContainText('Lecciones vistas: 1 de 3');
  });

  test('recta: tramos vistos y ocultos, trazas y aviso de cuadrantes', async ({ page }) => {
    await openLesson(page, /La recta/);
    await goToPage(page, 4); // paso 5: abatir
    await expect(page.locator('[data-layer="recta:r"] .sheet-line-visible')).not.toHaveCount(0);
    await expect(page.locator('[data-layer="recta:r"] .sheet-line-hidden')).not.toHaveCount(0);
    await expect(page.locator('[data-layer="trazas:r"] [data-label="H′"]')).toBeAttached();
    await expect(page.locator('#scene-notices')).toContainText(
      'atraviesa los cuadrantes II, I y IV',
    );
  });

  test('recta de perfil: aviso y tercera proyección', async ({ page }) => {
    await openLesson(page, /La recta/);
    await goToPage(page, 7); // paso 8
    await expect(page.locator('#scene-notices')).toContainText('tercera proyección');
    await expect(page.locator('[data-layer="perfil"] [data-label="r‴"]')).toBeAttached();
    await expect(page.locator('[data-layer="perfil"] [data-label="A‴"]')).toBeAttached();
  });

  test('plano: el aviso de pertenencia cambia al sacar Q del plano', async ({ page }) => {
    await openLesson(page, /El plano/);
    await goToPage(page, 3); // paso 4: Q en el plano
    await expect(page.locator('#scene-notices')).toContainText('Q está en el plano α');
    await page.getByRole('slider', { name: 'Cota (c)' }).fill('40');
    await expect(page.locator('#scene-notices')).toContainText('Q no está en el plano α');
  });

  test('plano que contiene la LT: aviso y α₃', async ({ page }) => {
    await openLesson(page, /El plano/);
    await goToPage(page, 6); // paso 7
    await expect(page.locator('#scene-notices')).toContainText('contiene la LT');
    await expect(page.locator('[data-layer="perfil"] [data-label="α₃"]')).toBeAttached();
    await expect(page.locator('[data-layer="trazas:α"] [data-label="α₁ ≡ α₂"]')).toBeAttached();
  });

  test('ejercicio del plano: llevar Q al plano', async ({ page }) => {
    await openLesson(page, /El plano/);
    await goToPage(page, 7); // ejercicio 1
    await expect(page.locator('#lesson-progress-text')).toContainText('Ejercicio 1 de 3');
    await page.getByRole('button', { name: 'Comprobar' }).click();
    await expect(page.locator('#exercise-feedback')).toContainText('fuera del plano');
    // Plano 21x − 14a + 30c = 210: con x = 10 y a = 30, la cota es 14.
    await page.getByRole('slider', { name: 'Cota (c)' }).fill('14');
    await page.getByRole('button', { name: 'Comprobar' }).click();
    await expect(page.locator('#exercise-feedback')).toContainText('Correcto');
  });

  test('modo libre: botones Punto, Recta y Plano', async ({ page }) => {
    await page.goto('/#/libre');
    await page.getByRole('button', { name: 'Recta' }).click();
    await expect(page.locator('#active-point')).toBeVisible();
    await expect(page.locator('[data-layer="recta:r"]')).toBeAttached();
    await page.getByRole('button', { name: 'Plano' }).click();
    await expect(page.locator('#scene-notices')).toContainText('Q está en el plano α');
  });
});

for (const lesson of [
  { id: 'leccion2', title: /La recta/, pages: 11 },
  { id: 'leccion3', title: /El plano/, pages: 10 },
]) {
  for (const viewport of [
    { name: '1366x768', width: 1366, height: 768 },
    { name: '390x844', width: 390, height: 844 },
  ]) {
    test(`capturas ${lesson.id} ${viewport.name}`, async ({ page }) => {
      test.setTimeout(90_000);
      await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await openLesson(page, lesson.title);
      for (let i = 1; i <= lesson.pages; i++) {
        await page.waitForTimeout(700);
        await page.screenshot({
          path: `screenshots/${lesson.id}-${String(i).padStart(2, '0')}-${viewport.name}.png`,
          fullPage: true,
        });
        if (i < lesson.pages) await page.getByRole('button', { name: 'Siguiente →' }).click();
      }
    });
  }
}
