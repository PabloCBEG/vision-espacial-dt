import { createHash } from 'node:crypto';
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
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
      // Los trozos vacíos (los que solo importan una hoja de estilos) no llegan a publicarse.
      const built = Object.entries(bundle)
        .filter(([, file]) => file.type === 'asset' || file.code.trim().length > 0)
        .map(([name]) => name)
        .filter((name) => !name.endsWith('.map') && !/KaTeX_.*\.(woff|ttf)$/.test(name));
      const publicFiles = readdirSync('public', { recursive: true, withFileTypes: true })
        .filter((entry) => entry.isFile())
        .map((entry) =>
          relative('public', join(entry.parentPath, entry.name)).split(sep).join('/'),
        );
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
    // Three.js ocupa unos 700 kB (180 kB comprimido): es esperable.
    chunkSizeWarningLimit: 800,
    rolldownOptions: {
      output: {
        // Las bibliotecas van en ficheros propios: cambian poco, así que al publicar una
        // versión nueva el navegador conserva su copia y solo descarga el código de la web.
        codeSplitting: {
          groups: [
            { name: 'three', test: /node_modules\/three\// },
            { name: 'zod', test: /node_modules\/zod\// },
            // KaTeX solo se descarga al abrir el desplegable analítico por primera vez.
            { name: 'katex', test: /node_modules\/katex\// },
          ],
        },
      },
    },
  },
  plugins: [serviceWorker()],
});
