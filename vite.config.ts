import { createHash } from 'node:crypto';
import { readdirSync, readFileSync } from 'node:fs';
import { defineConfig, type Plugin } from 'vite';

/**
 * Genera dist/sw.js con la lista de todos los ficheros de la web, para que el service worker
 * los guarde al instalarse y la aplicación funcione sin conexión en el aula.
 */
function serviceWorker(): Plugin {
  return {
    name: 'vision-espacial-service-worker',
    apply: 'build',
    generateBundle(_options, bundle) {
      // Las fuentes de KaTeX se guardan solo en woff2 (todos los navegadores actuales lo usan).
      const built = Object.keys(bundle).filter(
        (name) => !name.endsWith('.map') && !/KaTeX_.*\.(woff|ttf)$/.test(name),
      );
      const publicFiles = readdirSync('public');
      const all = [...new Set(['./', 'index.html', ...built, ...publicFiles])];
      const version = createHash('sha256').update(all.join('|')).digest('hex').slice(0, 12);
      const template = readFileSync('src/sw-template.js', 'utf8');
      // Se sustituyen las líneas completas (no la palabra suelta, que también sale en un comentario).
      const source = template
        .replace(
          "const CACHE = 'vision-espacial-__VERSION__';",
          `const CACHE = 'vision-espacial-${version}';`,
        )
        .replace('const FILES = __FILES__;', `const FILES = ${JSON.stringify(all, null, 2)};`);
      this.emitFile({ type: 'asset', fileName: 'sw.js', source });
    },
  };
}

export default defineConfig({
  // Rutas relativas: la web funciona en cualquier carpeta, por ejemplo usuario.github.io/repositorio/.
  base: './',
  build: {
    // Three.js ocupa unos 600 kB (150 kB comprimido): es esperable.
    chunkSizeWarningLimit: 800,
  },
  plugins: [serviceWorker()],
});
