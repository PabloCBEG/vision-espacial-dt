// Descarga y organiza exámenes de Dibujo Técnico II de la PAU (Andalucía, Madrid y Valencia)
// en la carpeta examenes/, para transcribirlos después al banco PAU de la aplicación.
//
//   node scripts/descargar-examenes.mjs            descarga lo que falte
//   node scripts/descargar-examenes.mjs --listar   solo muestra lo que descargaría
//
// Reglas de cortesía: se identifica como lo que es, espera entre descargas, no repite lo que
// ya está en disco y no intenta saltarse comprobaciones anti-robots. Lo que una web solo sirve
// a un navegador queda anotado en examenes/LEEME.md como «descarga manual».
//
// Los PDF son de sus autores (universidades y academias): se guardan solo para uso docente y
// no se suben al repositorio (ver .gitignore).
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const ROOT = 'examenes';
const USER_AGENT = 'vision-espacial-dt/1.0 (herramienta docente; descarga de exámenes PAU)';
const PAUSE_MS = 1200;
const ONLY_LIST = process.argv.includes('--listar');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchText(url) {
  const response = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.text();
}

const decode = (s) =>
  s
    .replace(/&eacute;/g, 'é')
    .replace(/&aacute;/g, 'á')
    .replace(/&iacute;/g, 'í')
    .replace(/&oacute;/g, 'ó')
    .replace(/&uacute;/g, 'ú')
    .replace(/&ntilde;/g, 'ñ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();

/** Nombre de fichero seguro, en minúsculas y sin tildes. */
const slug = (s) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** Enlaces <a href="…">texto</a> de una página. */
function anchors(html, base) {
  const out = [];
  for (const m of html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)) {
    out.push({ href: new URL(m[1].replace(/&amp;/g, '&'), base).href, text: decode(m[2]) });
  }
  return out;
}

// ---------- Fuentes ----------
// Cada fuente devuelve { downloads: [{ url, file, label }], manual: [{ url, label }] }.

const SOURCES = [
  {
    id: 'academia-granada',
    region: 'andalucia',
    page: 'https://academia-granada.es/examenes-selectividad-dibujo-tecnico-andalucia/',
    async collect(html) {
      const downloads = anchors(html, this.page)
        .filter((a) => /\.pdf$/i.test(a.href) && /dibujo/i.test(a.href))
        .map((a) => {
          // El año va en el nombre del fichero (la ruta lleva el de la subida a la web).
          const name = a.href.split('/').pop() ?? '';
          const year = /(20\d\d)\.pdf$/i.exec(name)?.[1] ?? slug(name);
          return {
            url: a.href,
            file: `andalucia/academia-granada/dibujo-tecnico-${year}.pdf`,
            label: `Andalucía ${year} (recopilación de Academia Granada)`,
          };
        });
      return { downloads, manual: [] };
    },
  },
  {
    id: 'examenesdepau-andalucia',
    region: 'andalucia',
    page: 'https://www.examenesdepau.com/examenes/andalucia/dibujo-tecnico/',
    collect: examenesDePau,
  },
  {
    id: 'examenesdepau-madrid',
    region: 'madrid',
    page: 'https://www.examenesdepau.com/examenes/madrid/dibujo-tecnico/',
    collect: examenesDePau,
  },
  {
    id: 'uc3m',
    region: 'madrid',
    page: 'https://www.uc3m.es/ss/Satellite/evau/es/TextoMixta/1371318298407/Examenes_de_Dibujo_Tecnico_II',
    async collect(html) {
      // Tabla de tres columnas: modelos, convocatoria ordinaria y extraordinaria.
      const columns = ['modelo', 'ordinaria', 'extraordinaria'];
      const downloads = [];
      const body = /<tbody>([\s\S]*?)<\/tbody>/i.exec(html)?.[1] ?? '';
      const cells = [...body.matchAll(/<td>([\s\S]*?)<\/td>/gi)].map((m) => m[1]);
      cells.forEach((cell, i) => {
        const kind = columns[i % 3];
        for (const a of anchors(cell, this.page)) {
          const id = /\/file\/d\/([^/]+)/.exec(a.href)?.[1];
          if (!id) continue;
          // Curso «2024-2025» (a partir del primer año: algún enlace corta el texto).
          const first = Number(/(20\d\d)-/.exec(a.text)?.[1]);
          const course = first ? `${first}-${first + 1}` : slug(a.text);
          const extra = /coincidencias/i.test(a.text) ? '-coincidencias' : '';
          downloads.push({
            url: `https://drive.usercontent.google.com/download?id=${id}&export=download`,
            page: a.href,
            file: `madrid/uc3m/${kind}-${course}${extra}.pdf`,
            label: `Madrid ${course}, ${kind}${extra ? ' (coincidencias)' : ''}`,
          });
        }
      });
      return { downloads, manual: [] };
    },
  },
  {
    id: 'examenesdepau-valencia',
    region: 'valencia',
    page: 'https://www.examenesdepau.com/examenes/comunidad-valenciana/dibujo-tecnico/',
    collect: examenesDePau,
  },
  {
    id: 'lallibreta',
    region: 'valencia',
    page: 'https://academialallibreta.es/examenes-y-soluciones-selectividad-pau/dibujo-tecnico/',
    async collect(html) {
      const downloads = anchors(html, this.page)
        .filter((a) => /\.pdf$/i.test(a.href) && /dibujo/i.test(decodeURIComponent(a.href)))
        .map((a) => {
          const name = decodeURIComponent(a.href.split('/').pop() ?? '').replace(/\.pdf$/i, '');
          // Carpeta 25637: enunciados; 25682: criterios de corrección (CC) y soluciones (SOL).
          const kind = /\bSOL\b/.test(name)
            ? 'soluciones'
            : /\bCC\b/.test(name)
              ? 'criterios'
              : 'enunciados';
          return {
            url: a.href,
            file: `valencia/lallibreta/${kind}/${slug(name)}.pdf`,
            label: `Valencia: ${name}`,
          };
        });
      return { downloads, manual: [] };
    },
  },
];

/**
 * examenesdepau.com sirve los PDF solo a un navegador (con su sesión y sus comprobaciones), así
 * que de esta web solo se apunta la lista de exámenes para descargarlos a mano.
 */
async function examenesDePau(html) {
  const seen = new Set();
  const manual = [];
  for (const a of anchors(html, this.page)) {
    if (!/\/examen\/[^/]*dibujo-tecnico[^/]*\/[^/]+\/$/.test(a.href) || seen.has(a.href)) continue;
    seen.add(a.href);
    const name = /\/examen\/([^/]+)\//.exec(a.href)?.[1] ?? a.href;
    manual.push({ url: a.href, label: name.replace(/-/g, ' ') });
  }
  return { downloads: [], manual };
}

// ---------- Descarga ----------

async function download(item) {
  const target = join(ROOT, item.file);
  if (existsSync(target)) return { status: 'ya estaba', target };
  const response = await fetch(item.url, {
    headers: { 'User-Agent': USER_AGENT },
    redirect: 'follow',
  });
  if (!response.ok) return { status: `error HTTP ${response.status}` };
  const bytes = Buffer.from(await response.arrayBuffer());
  // Si no es un PDF (una página de aviso o de confirmación), no se guarda: descarga manual.
  if (bytes.subarray(0, 5).toString('latin1') !== '%PDF-') {
    return { status: 'no es un PDF (la web pide un navegador)' };
  }
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, bytes);
  return { status: 'descargado', target, size: bytes.length };
}

const index = existsSync(join(ROOT, 'indice.json'))
  ? JSON.parse(readFileSync(join(ROOT, 'indice.json'), 'utf8'))
  : { ficheros: {} };
const manual = [];
const failures = [];

for (const source of SOURCES) {
  console.log(`\n== ${source.id} (${source.region})`);
  let found;
  try {
    found = await source.collect(await fetchText(source.page));
  } catch (error) {
    console.log(`   No se ha podido leer la página: ${error.message}`);
    manual.push({
      source: source.id,
      region: source.region,
      url: source.page,
      label: 'Página entera',
    });
    continue;
  }
  console.log(`   ${found.downloads.length} PDF, ${found.manual.length} para descarga manual`);
  for (const m of found.manual) manual.push({ source: source.id, region: source.region, ...m });
  for (const item of found.downloads) {
    if (ONLY_LIST) {
      console.log(`   · ${item.file}`);
      continue;
    }
    let result;
    try {
      result = await download(item);
    } catch (error) {
      result = { status: `error: ${error.message}` };
    }
    console.log(`   ${result.status.padEnd(12)} ${item.file}`);
    if (result.target) {
      const sha = createHash('sha256').update(readFileSync(result.target)).digest('hex');
      index.ficheros[item.file] = {
        region: source.region,
        fuente: source.id,
        descripcion: item.label,
        origen: item.page ?? item.url,
        sha256: sha.slice(0, 16),
        transcrito: index.ficheros[item.file]?.transcrito ?? false,
      };
    } else {
      failures.push({
        source: source.id,
        region: source.region,
        url: item.page ?? item.url,
        label: item.label,
        why: result.status,
      });
    }
    if (result.status !== 'ya estaba') await sleep(PAUSE_MS);
  }
}

if (!ONLY_LIST) {
  mkdirSync(ROOT, { recursive: true });
  index.actualizado = new Date().toISOString().slice(0, 10);
  writeFileSync(join(ROOT, 'indice.json'), `${JSON.stringify(index, null, 2)}\n`);

  const total = Object.keys(index.ficheros).length;
  const byRegion = {};
  for (const f of Object.values(index.ficheros)) byRegion[f.region] = (byRegion[f.region] ?? 0) + 1;
  const lines = [
    '# Exámenes PAU de Dibujo Técnico II',
    '',
    'Carpeta generada por `node scripts/descargar-examenes.mjs`. Los PDF son de sus autores y',
    'se guardan solo para uso docente: no se suben al repositorio.',
    '',
    `Descargados: ${total} (${Object.entries(byRegion)
      .map(([r, n]) => `${r}: ${n}`)
      .join(', ')}).`,
    'El detalle de cada fichero (origen, huella y si ya está transcrito al banco) está en `indice.json`.',
    '',
    '## Descarga manual',
    '',
    'Estas webs solo sirven los PDF a un navegador. Ábrelos, descárgalos y guárdalos en la carpeta',
    'de su región (`andalucia/`, `madrid/` o `valencia/`) con un nombre como',
    '`examenesdepau/2025-ordinaria-examen.pdf` o `…-criterios.pdf`.',
    '',
  ];
  for (const item of [...failures, ...manual]) {
    const why = item.why ? ` — ${item.why}` : '';
    lines.push(`- [ ] **${item.region}** · [${item.label}](${item.url})${why}`);
  }
  writeFileSync(join(ROOT, 'LEEME.md'), `${lines.join('\n')}\n`);
  console.log(
    `\nHecho: ${total} PDF en ${ROOT}/; ${failures.length + manual.length} para descarga manual (ver ${ROOT}/LEEME.md).`,
  );
}
