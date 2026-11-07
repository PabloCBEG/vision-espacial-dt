// Capturas de cada paso y de cada ejercicio de una lección, en los tres tamaños de pantalla
// de referencia (1920x1080, 1366x768 y 390x844). Sirven para revisar una lección nueva y como
// material de clase. Necesita la web servida (npm run build && npm run preview):
//   node scripts/capturas-leccion.mjs angulos-distancias [http://localhost:4173]
// Las imágenes quedan en screenshots/<lección>/.
import { chromium } from '@playwright/test';
import { mkdirSync, readdirSync, readFileSync } from 'node:fs';

const id = process.argv[2];
const base = process.argv[3] ?? 'http://localhost:4173';
const file = readdirSync('src/content/lessons').find((f) => {
  const l = JSON.parse(readFileSync(`src/content/lessons/${f}`, 'utf8'));
  return l.id === id;
});
if (!id || !file) {
  console.error('Uso: node scripts/capturas-leccion.mjs <id-de-la-lección> [url]');
  process.exit(1);
}
const lesson = JSON.parse(readFileSync(`src/content/lessons/${file}`, 'utf8'));
const pages = lesson.steps.length + (lesson.exercises?.length ?? 0);
const sizes = (process.env.SIZES ?? '1920x1080,1366x768,390x844').split(',');
const out = `screenshots/${id}`;
mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage();
await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
for (const size of sizes) {
  const [width, height] = size.split('x').map(Number);
  await page.setViewportSize({ width, height });
  // La web recuerda el paso en que se quedó cada lección: se empieza siempre desde el primero.
  await page.goto(base);
  await page.evaluate(() => localStorage.clear());
  await page.goto(`${base}/#/leccion/${id}`);
  await page.waitForSelector('#lesson-progress-text');
  for (let i = 1; i <= pages; i++) {
    await page.waitForTimeout(900);
    const name = i <= lesson.steps.length ? `paso-${i}` : `ejercicio-${i - lesson.steps.length}`;
    await page.screenshot({
      path: `${out}/${String(i).padStart(2, '0')}-${name}-${size}.png`,
      fullPage: true,
    });
    if (i === pages) break;
    const next = page.getByRole('button', { name: 'Siguiente →' });
    if (await next.isDisabled()) {
      const where = await page.locator('#lesson-progress-text').textContent();
      errors.push(
        `${size}: «Siguiente» desactivado en «${where?.trim()}» (página ${i} de ${pages})`,
      );
      break;
    }
    await next.click();
  }
}
await browser.close();
console.log(`${pages * sizes.length} capturas en ${out}/`);
if (errors.length) console.log('Errores en la consola:', [...new Set(errors)].join('\n'));
