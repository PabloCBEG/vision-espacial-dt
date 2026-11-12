// Reúne en un único documento (textos_para_revision.md) todos los textos didácticos de la
// aplicación, para que el profesor los lea y los valide de una vez:
//   node scripts/textos-revision.ts
// Lee los ficheros de datos (lecciones y ejercicios PAU) y, de los ficheros de código con
// textos para el alumno (avisos, pistas, entrenador, motores), las frases entre comillas.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { exerciseMarkers, resolveMarkers } from '../src/content/markers.ts';
import { parseLessons } from '../src/content/lessons.ts';
import { SOLUTION_PART_NAMES, type SolutionPart } from '../src/content/solutionParts.ts';

interface Step {
  narration: string;
}
interface Lesson {
  id: string;
  title: string;
  topic: string;
  stage: string;
  level: string;
  saberBasico: string;
  steps: Step[];
}
interface PauStep extends Step {
  part?: string;
}
interface Pau {
  id: string;
  convocatoria: string;
  ejercicio: number;
  opcion: string | null;
  titulo: string;
  enunciado: string;
  datos?: string[];
  solucion: PauStep[];
  rubrica: { origen?: string; criterios: { texto: string; puntos: number }[] };
}
interface Piece {
  id?: string;
  nombre?: string;
  titulo?: string;
  descripcion?: string;
}

const json = <T>(path: string): T => JSON.parse(readFileSync(path, 'utf8')) as T;
const files = (dir: string): string[] =>
  readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .sort()
    .map((f) => join(dir, f));

/** Ficheros de código con textos para el alumno, con el título de su sección. */
const CODE_TEXTS: [string, string][] = [
  [
    'src/content/notices.ts',
    'Avisos de la escena diédrica (casos especiales, cuadrantes, pertenencia)',
  ],
  ['src/content/foldExplanations.ts', 'Modo «Explicar» del abatimiento'],
  ['src/player/checkCondition.ts', 'Mensajes de acierto y pistas de los ejercicios de condición'],
  ['src/player/index.ts', 'Reproductor de pasos y corrección de ejercicios'],
  ['src/ui/trainer.ts', 'Entrenador espacial: enunciados y mensajes'],
  ['src/engines/trainer/items.ts', 'Entrenador espacial: generación de ítems'],
  ['src/engines/metodos/runtime.ts', 'Motor de métodos (abatimiento, giro y cambio de plano)'],
  ['src/engines/metodos/controller.ts', 'Motor de métodos: controles'],
  ['src/engines/solidos/runtime.ts', 'Motor de sólidos'],
  ['src/engines/solidos/controller.ts', 'Motor de sólidos: controles'],
  ['src/engines/plana/runtime.ts', 'Motor de geometría plana'],
  ['src/engines/plana/runtimeHelpers.ts', 'Motor de geometría plana: ayudas'],
  ['src/engines/plana/controller.ts', 'Motor de geometría plana: controles'],
  ['src/engines/normalizacion/runtime.ts', 'Motor de normalización'],
  ['src/engines/normalizacion/controller.ts', 'Motor de normalización: controles'],
  ['src/engines/axonometria/runtime.ts', 'Motor de axonometría'],
  ['src/engines/conica/runtime.ts', 'Motor de perspectiva cónica'],
  ['src/engines/conicas/runtime.ts', 'Laboratorio de cónicas'],
  ['src/ui/pau.ts', 'Banco PAU: examen y rúbrica'],
  ['src/ui/home.ts', 'Pantalla de inicio'],
];

/** Frases entre comillas (simples, dobles o de plantilla) que parecen texto en castellano. */
function phrases(source: string): string[] {
  const out: string[] = [];
  const re = /'((?:[^'\\\n]|\\.){12,})'|"((?:[^"\\\n]|\\.){12,})"|`((?:[^`\\]|\\.){12,})`/g;
  for (const m of source.matchAll(re)) {
    const raw = (m[1] ?? m[2] ?? m[3] ?? '').replace(/\\'/g, "'").replace(/\s+/g, ' ').trim();
    // Texto, no código: varias palabras, sin aspecto de selector, ruta o clase CSS.
    if (!/[a-záéíóúñ]{2,} [a-záéíóúñ¿¡]{2,}/i.test(raw)) continue;
    if (/^[<.#[]|=>|querySelector|^[a-z-]+ [a-z-]+ \$\{|\bclass=|^\.\/|import\(/.test(raw))
      continue;
    if (/^[a-z-]+( [a-z-]+)+$/.test(raw)) continue; // nombres de clases CSS
    out.push(raw.replace(/\$\{([^}]*)\}/g, '‹$1›'));
  }
  return [...new Set(out)];
}

const md: string[] = [];
const push = (...lines: string[]): void => void md.push(...lines);

push(
  '# Textos para revisión',
  '',
  'Todos los textos que lee el alumnado en *Visión espacial DT*, reunidos para validarlos de una vez.',
  'Se genera con `node scripts/textos-revision.ts`; si cambias un texto en la aplicación, vuelve a generarlo.',
  '',
  '**Cómo revisar.** Marca cada casilla al validarla. Si quieres cambiar algo, escribe la corrección debajo',
  '(por ejemplo, `> CAMBIAR: …`) y yo la llevo al fichero que se indica en cada sección.',
  'Las narraciones tienen como máximo dos frases (lo exige el formato de lección).',
  '',
  '## Índice',
  '',
  '1. [Lecciones](#1-lecciones)',
  '2. [Ejercicios PAU (ejemplos de formato)](#2-ejercicios-pau-ejemplos-de-formato)',
  '3. [Piezas de normalización](#3-piezas-de-normalización)',
  '4. [Avisos, pistas y textos de los motores](#4-avisos-pistas-y-textos-de-los-motores)',
  '',
  '## 1. Lecciones',
  '',
);

const KIND: Record<string, string> = {
  placePoint: 'colocar el punto',
  condition: 'cumplir una condición',
  value: 'escribir una medida',
  engine: 'construcción en la lámina',
};

// Las lecciones se leen con el esquema para tener las pistas y soluciones tal como las ve el
// alumno: con los marcadores ({respuesta}…) resueltos con los datos del propio ejercicio.
const loaded = parseLessons(
  Object.fromEntries(files('src/content/lessons').map((path) => [path, json<unknown>(path)])),
);
for (const error of loaded.errors) {
  console.error(`${error.file}: ${error.problems.join('; ')}`);
  process.exitCode = 1;
}

for (const path of files('src/content/lessons')) {
  const l = json<Lesson>(path);
  const parsed = loaded.lessons.find((x) => x.id === (l as { id: string }).id);
  push(
    `### ${l.topic} · ${l.title}`,
    '',
    `Fichero: \`${path.replace(/\\/g, '/')}\` · ${l.stage} · nivel ${l.level}`,
    '',
    `- [ ] **Saber básico:** ${l.saberBasico}`,
    '',
    '**Pasos**',
    '',
  );
  l.steps.forEach((s, i) => push(`${i + 1}. [ ] ${s.narration}`));
  if (parsed?.exercises.length) {
    push('', '**Ejercicios**', '');
    parsed.exercises.forEach((e, i) => {
      const values = exerciseMarkers(parsed, e);
      const resolve = (text: string): string => resolveMarkers(text, values);
      const answer = e.kind === 'value' ? ` (respuesta: ${e.answer} ${e.unit})` : '';
      push(
        `${i + 1}. [ ] *${KIND[e.kind] ?? e.kind}, dificultad ${e.difficulty ?? 1}*${answer}: ${e.prompt}`,
      );
      (e.hints ?? []).forEach((h, j) => push(`   - [ ] *Pista ${j + 1}:* ${resolve(h)}`));
      (e.solution ?? []).forEach((s, j) => {
        const part = SOLUTION_PART_NAMES[s.part as SolutionPart];
        // El error típico lo redacta Claude: queda marcado hasta que el profesor lo valide.
        const mark = s.part === 'error' ? ' **[REVISAR]**' : '';
        push(`   - [ ] *Solución, paso ${j + 1} · ${part}:*${mark} ${resolve(s.narration)}`);
      });
    });
  }
  push('');
}

push('## 2. Ejercicios PAU (ejemplos de formato)', '');
for (const path of files('src/content/pau')) {
  const p = json<Pau>(path);
  const option = p.opcion ? ` (opción ${p.opcion})` : '';
  push(
    `### Ejercicio ${p.ejercicio}${option} · ${p.titulo}`,
    '',
    `Fichero: \`${path.replace(/\\/g, '/')}\` · ${p.convocatoria}`,
    '',
    `- [ ] **Enunciado:** ${p.enunciado}`,
  );
  for (const d of p.datos ?? []) push(`- [ ] **Dato:** ${d}`);
  push('', '**Solución paso a paso**', '');
  p.solucion.forEach((s, i) => {
    const part = s.part ? SOLUTION_PART_NAMES[s.part as SolutionPart] : undefined;
    // El error típico lo redacta Claude: queda marcado hasta que el profesor lo valide.
    const mark = s.part === 'error' ? ' **[REVISAR]**' : '';
    push(
      `${i + 1}. [ ] ${part ? `*${part}:*` : ''}${mark} ${s.narration}`.replace('[ ]  ', '[ ] '),
    );
  });
  const derived =
    p.rubrica.origen === 'derivada'
      ? ' · **[REVISAR]** rúbrica derivada de la puntuación por apartados del examen, no oficial'
      : '';
  push('', `**Rúbrica (2 puntos de solución y método)**${derived}`, '');
  for (const c of p.rubrica.criterios) {
    push(`- [ ] ${c.texto} — ${String(c.puntos).replace('.', ',')} p`);
  }
  push('');
}

push('## 3. Piezas de normalización', '');
for (const path of files('src/content/piezas')) {
  const p = json<Piece>(path);
  const name = p.nombre ?? p.titulo ?? p.id ?? path;
  push(
    `- [ ] **${name}**${p.descripcion ? `: ${p.descripcion}` : ''} (\`${path.replace(/\\/g, '/')}\`)`,
  );
}
push('');

push(
  '## 4. Avisos, pistas y textos de los motores',
  '',
  'Frases que aparecen en pantalla según lo que hace el alumno. Lo que va entre ‹ › se rellena',
  'al mostrarse (un nombre de punto, una medida…).',
  '',
);
for (const [path, title] of CODE_TEXTS) {
  let source: string;
  try {
    source = readFileSync(path, 'utf8');
  } catch {
    continue;
  }
  const list = phrases(source);
  if (list.length === 0) continue;
  push(`### ${title}`, '', `Fichero: \`${path}\``, '');
  for (const text of list) push(`- [ ] ${text}`);
  push('');
}

writeFileSync('textos_para_revision.md', md.join('\n'));
console.log(`textos_para_revision.md: ${md.length} líneas.`);
