// Revisión completa: capturas de cada paso, notación, accesibilidad y rendimiento.
// Es lenta, así que solo se ejecuta a propósito:  REVIEW=1 npx playwright test e2e/review.spec.ts
import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';

test.skip(!process.env.REVIEW, 'Revisión completa: ejecutar con REVIEW=1');

const LESSONS = [
  { id: 'el-punto', pages: 11 },
  { id: 'la-recta', pages: 11 },
  { id: 'el-plano', pages: 10 },
];

const VIEWPORTS = [
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: '1366x768', width: 1366, height: 768 },
  { name: '390x844', width: 390, height: 844 },
];

/** Rótulos permitidos según CLAUDE.md (además de números de cota). */
const NOTATION = [
  /^[A-Z][′″‴]?$/, // P, P′, P″, P‴, A, B…
  /^[a-z][′″‴]?$/, // r, r′, r″, r‴
  /^[HV][′″]?$/, // trazas de recta
  /^α[₁₂₃]$/, // trazas de plano
  /^α₁ ≡ α₂$/,
  /^(PH|PV|PP|LT)$/,
  /^(I|II|III|IV)$/, // cuadrantes
  /^[ca] = −?\d+ mm$/, // cota y alejamiento en 3D
  /^\d+$/, // cifras de cota en la lámina (UNE-EN ISO 129-1)
];

mkdirSync('review', { recursive: true });

async function labels(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const texts: string[] = [];
    const selector = '#view-3d .scene-label, #view-2d text:not(.sheet-empty-note)';
    for (const el of document.querySelectorAll(selector)) {
      const style = getComputedStyle(el);
      const text = el.textContent?.trim() ?? '';
      if (text && style.visibility !== 'hidden' && style.display !== 'none') texts.push(text);
    }
    return texts;
  });
}

test('capturas de todos los pasos y notación', async ({ page }) => {
  test.setTimeout(600_000);
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
  const unknown = new Set<string>();
  for (const viewport of VIEWPORTS) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    for (const lesson of LESSONS) {
      await page.goto(`/#/leccion/${lesson.id}`);
      await expect(page.locator('#lesson-progress-text')).toContainText('Paso 1');
      for (let i = 1; i <= lesson.pages; i++) {
        await page.waitForTimeout(600);
        await page.screenshot({
          path: `review/${lesson.id}-${String(i).padStart(2, '0')}-${viewport.name}.png`,
          fullPage: true,
        });
        for (const text of await labels(page)) {
          if (!NOTATION.some((re) => re.test(text))) unknown.add(text);
        }
        if (i < lesson.pages) await page.getByRole('button', { name: 'Siguiente →' }).click();
      }
    }
  }
  writeFileSync('review/notacion.json', JSON.stringify([...unknown], null, 2));
  expect([...unknown]).toEqual([]);
});

test('accesibilidad (axe) en inicio, modo libre, lecciones y ejercicios', async ({ page }) => {
  test.setTimeout(180_000);
  const report: Record<string, unknown[]> = {};
  const check = async (name: string) => {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    report[name] = results.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      help: v.help,
      nodes: v.nodes.slice(0, 3).map((n) => n.target.join(' ')),
    }));
  };
  for (const scheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
    await page.goto('/');
    await check(`inicio-${scheme}`);
    await page.goto('/#/libre');
    await page.waitForTimeout(300);
    await check(`libre-${scheme}`);
    for (const lesson of LESSONS) {
      await page.goto(`/#/leccion/${lesson.id}`);
      await page.waitForTimeout(300);
      await check(`${lesson.id}-paso1-${scheme}`);
    }
    await page.goto('/#/leccion/el-punto');
    for (let i = 0; i < 8; i++) await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(300);
    await check(`el-punto-ejercicio-${scheme}`);
  }
  writeFileSync('review/accesibilidad.json', JSON.stringify(report, null, 2));
  const total = Object.values(report).reduce((n, v) => n + v.length, 0);
  expect(total, JSON.stringify(report, null, 2)).toBe(0);
});

test('todo se puede usar con teclado y el foco se ve', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto('/#/leccion/el-punto');
  // Paso 6: la lámina ya tiene P′ y P″, que se pueden mover con el teclado.
  for (let i = 0; i < 5; i++) await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(500);
  const stops: string[] = [];
  for (let i = 0; i < 60; i++) {
    await page.keyboard.press('Tab');
    const info = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      if (!el) return null;
      const style = getComputedStyle(el);
      const ring = el.querySelector('.sheet-handle-ring');
      const visible =
        style.outlineStyle !== 'none' ||
        (ring !== null && getComputedStyle(ring).stroke !== 'transparent');
      const name =
        el.getAttribute('aria-label') ?? el.textContent?.trim().slice(0, 30) ?? el.tagName;
      return { name: `${el.tagName}:${name}`, visible };
    });
    if (!info) continue;
    stops.push(info.name);
    expect(info.visible, `Sin foco visible en ${info.name}`).toBe(true);
  }
  writeFileSync('review/teclado.json', JSON.stringify(stops, null, 2));
  // Se llega a los controles principales.
  const all = stops.join('\n');
  for (const name of ['Siguiente', 'Perspectiva', 'Encuadrar', 'P′', 'Abatir', 'Explicar']) {
    expect(all).toContain(name === 'Abatir' ? 'INPUT' : name);
  }
});

test('rendimiento con la CPU ralentizada 4 veces', async ({ page }) => {
  test.setTimeout(120_000);
  await page.setViewportSize({ width: 390, height: 844 });
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });

  const start = Date.now();
  await page.goto('/#/libre');
  await expect(page.locator('#view-3d canvas')).toBeVisible();
  await expect(page.locator('[data-handle="P′"]')).toBeAttached();
  const ready = Date.now() - start;
  const nav = await page.evaluate(() => {
    const entry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    return {
      domContentLoaded: Math.round(entry.domContentLoadedEventEnd),
      load: Math.round(entry.loadEventEnd),
    };
  });

  // Fotogramas durante el abatimiento animado (3 s).
  const fps = await page.evaluate(async () => {
    const button = [...document.querySelectorAll('button')].find(
      (b) => b.textContent?.trim() === 'Reproducir abatimiento',
    );
    button?.click();
    const times: number[] = [];
    const t0 = performance.now();
    await new Promise<void>((resolve) => {
      const tick = (now: number) => {
        times.push(now);
        if (now - t0 < 3000) requestAnimationFrame(tick);
        else resolve();
      };
      requestAnimationFrame(tick);
    });
    const gaps = times.slice(1).map((t, i) => t - (times[i] ?? t));
    const worst = Math.max(...gaps);
    return { fps: Math.round((times.length / 3) * 10) / 10, worstFrameMs: Math.round(worst) };
  });

  // En reposo no se dibuja: no debe haber fotogramas de la escena sin cambios.
  const idleRenders = await page.evaluate(async () => {
    const canvas = document.querySelector('#view-3d canvas') as HTMLCanvasElement;
    const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl');
    if (!gl) return -1;
    // Se espera a que acaben el abatimiento y la transición de la cámara.
    await new Promise((r) => setTimeout(r, 2500));
    let draws = 0;
    const original = gl.drawElements.bind(gl);
    (gl as WebGL2RenderingContext).drawElements = (...args: Parameters<typeof original>) => {
      draws++;
      return original(...args);
    };
    await new Promise((r) => setTimeout(r, 1500));
    return draws;
  });

  const result = { readyMs: ready, ...nav, ...fps, idleDrawCalls: idleRenders };
  writeFileSync('review/rendimiento.json', JSON.stringify(result, null, 2));
  console.log('rendimiento', JSON.stringify(result));
  expect(result.fps).toBeGreaterThan(20);
  expect(idleRenders).toBe(0);
});
