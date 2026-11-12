# Visión espacial · Dibujo Técnico

Herramienta web para aprender el sistema diédrico en Dibujo Técnico I y II de Bachillerato.
Cada lección muestra a la vez el modelo 3D y la lámina, paso a paso, y termina con ejercicios.
Funciona en el móvil, en el ordenador y en el proyector del aula, también sin conexión.

No pide registro ni guarda datos personales: los resultados de los ejercicios se quedan solo en
el navegador de cada alumno.

---

## Cómo publicar una versión nueva

La web se publica sola en GitHub Pages cada vez que se sube un cambio a la rama `main`.

1. Haz los cambios (por ejemplo, edita o añade una lección).
2. Súbelos a GitHub:
   - **Desde la web de GitHub:** abre el fichero, pulsa el lápiz ✏️, edita y pulsa
     **Commit changes**. Asegúrate de que queda en la rama `main`.
   - **Desde tu ordenador:** `git add .`, `git commit -m "Describe el cambio"` y `git push`.
3. Abre la pestaña **Actions** del repositorio. Verás «Comprobar y publicar» en marcha:
   - Un círculo amarillo significa que está trabajando (tarda uno o dos minutos).
   - Una marca verde ✓ significa que ya está publicada.
   - Una cruz roja ✗ significa que algo falla. **No se publica nada** y la versión anterior
     sigue funcionando. Pulsa en la ejecución para ver qué paso ha fallado.
4. La web queda en `https://pablocbeg.github.io/vision-espacial-dt/`.

Los alumnos que ya la tenían abierta verán la versión nueva la próxima vez que la abran
(la copia sin conexión se renueva sola).

### Probarla en tu ordenador antes de publicar (opcional)

Necesitas [Node.js](https://nodejs.org) 24 (la misma versión que usa la publicación automática).

```bash
npm install
npm run dev
```

Abre la dirección que aparece (normalmente `http://localhost:5173`). Para comprobar que todo
está bien antes de subirlo: `npm run test` y `npm run build`.

---

## Cómo añadir una lección sin programar

Cada lección es un fichero de texto en la carpeta
[`src/content/lessons/`](src/content/lessons/). Para crear una nueva:

1. **Copia** una lección parecida. Por ejemplo, copia `01-el-punto.json` y llámala
   `04-mi-leccion.json`. El número del principio solo sirve para ordenar los ficheros.
2. **Cambia la cabecera**:
   - `"id"`: nombre corto, en minúsculas y sin espacios, distinto de los demás
     (`"mi-leccion"`). Es lo que aparece en la dirección de la web.
   - `"order"`: posición dentro de su tema (`4`).
   - `"topic"`: código del tema en el catálogo ([`src/content/catalog.ts`](src/content/catalog.ts)),
     por ejemplo `"I-08"`. Si el tema estaba como `'proximamente'`, cámbialo a `'disponible'`.
   - `"title"`, `"stage"` (`"ESO"`, `"DT I"` o `"DT II"`), `"saberBasico"` y `"level"`
     (`"Inicial"`, `"Intermedio"` o `"Avanzado"`).
3. **Edita los textos** de cada paso en `"narration"`. Como máximo **dos frases** por paso.
4. **Ajusta los puntos** si quieres: las coordenadas van como `[x, alejamiento, cota]`, en mm,
   entre −60 y 60. Por ejemplo, `"P": [20, 30, 40]`.
5. Súbela a GitHub como en el apartado anterior. Aparecerá sola en la pantalla de inicio.

Si algo está mal escrito, la lección **no se rompe en silencio**: la pantalla de inicio muestra
un recuadro que dice qué fichero y qué línea revisar. Además, el paso de comprobación de
GitHub (pestaña Actions) falla y no se publica hasta que se corrija.

### Qué se puede poner en cada paso

```json
{
  "narration": "Texto del paso (máximo 2 frases).",
  "show3d": ["planos", "punto:P", "proyecciones:P"],
  "sheet": ["lt", "proyecciones:P", "referencia:P"],
  "highlight": ["proyecciones:P"],
  "camera": "perspective",
  "foldAngle": 0,
  "points": { "P": [20, -25, 35] }
}
```

- `show3d`: lo que se ve en el modelo 3D.
- `sheet`: lo que se ve en la lámina. Si lo dejas vacío (`[]`), la lámina avisa de que
  aparecerá al abatir el PH.
- `highlight`: lo que se destaca en este paso.
- `camera`: `"perspective"`, `"front"` (alzado), `"top"` (planta) o `"profile"` (perfil).
- `foldAngle`: abatimiento del PH, de `0` (en el espacio) a `90` (lámina).
- `points` (opcional): mueve puntos en este paso; el cambio se anima.

Nombres que se pueden usar en `show3d`, `sheet` y `highlight` (cambia `P`, `r` o `α` por el
nombre de tu objeto):

| Nombre           | Qué es                                       | 3D  | Lámina |
| ---------------- | -------------------------------------------- | --- | ------ |
| `planos`         | PH, PV y LT                                  | ✓   |        |
| `cuadrantes`     | Números I a IV                               | ✓   |        |
| `lt`             | Línea de tierra con sus trazos               |     | ✓      |
| `punto:P`        | El punto en el espacio                       | ✓   |        |
| `proyecciones:P` | P′ y P″                                      | ✓   | ✓      |
| `proyectantes:P` | Líneas de P a P′ y a P″                      | ✓   |        |
| `medidas:P`      | Cota y alejamiento                           | ✓   | ✓      |
| `referencia:P`   | Línea de referencia P′–P″                    |     | ✓      |
| `recta:r`        | La recta y sus proyecciones                  | ✓   | ✓      |
| `trazas:r`       | Trazas H y V de la recta                     | ✓   | ✓      |
| `plano:α`        | Superficie del plano                         | ✓   |        |
| `trazas:α`       | Trazas α₁ y α₂                               | ✓   | ✓      |
| `perfil`         | Tercera proyección (sale sola si hace falta) | ✓   | ✓      |

### Ejercicios

Al final de la lección, en `"exercises"`, hay cuatro tipos (`"kind"`): los dos primeros se explican aquí;
`"value"` (escribir una medida, con su `"answer"` y `"unit"`) y `"engine"` (lo corrige el motor
del ejercicio) se copian de una lección que los use.

- **Colocar un punto** (`"kind": "placePoint"`): la lámina muestra las proyecciones de
  `"target"` y el alumno coloca el punto en el espacio. La aplicación le dice si ha
  confundido la cota con el alejamiento, el signo o la posición.
- **Cumplir una condición** (`"kind": "condition"`): el alumno mueve puntos hasta que se
  cumple, por ejemplo, `"lineParallelToPH"`, `"lineParallelToLT"`, `"lineCrossesLT"`,
  `"lineProfile"`, `"pointOnPlane"`, `"planeParallelToLT"` o `"planeContainsLT"`.

Cada ejercicio puede llevar `"difficulty"`: `1` (fácil), `2` (media) o `3` (tipo PAU).
Copia un ejercicio de una lección existente y cambia sus valores.

#### Pistas y solución desarrollada

- `"hints"`: exactamente **tres** pistas. La 1 es la idea clave; la 2, el método; la 3, el primer
  trazado. No pueden repetirse entre sí ni repetir la narración de la idea clave de la solución.
- `"solution"`: la solución paso a paso. Cada paso es como uno de la teoría más un campo `"part"`
  con la parte a la que pertenece. Las seis partes van **en este orden** y con este número de pasos:

  | `"part"`       | Nombre             | Pasos |
  | -------------- | ------------------ | ----- |
  | `mira`         | 1. Mira el espacio | 1–2   |
  | `idea`         | 2. La idea clave   | 1     |
  | `movimiento`   | 3. El movimiento   | 1–3   |
  | `trazado`      | 4. El trazado      | 2–6   |
  | `comprobacion` | 5. Comprobación    | 1     |
  | `error`        | 6. Error típico    | 1     |

  Si el orden o el número no cuadran, la lección no carga y el mensaje dice qué parte falla.
  Un ejemplo completo está en [`04-tres-metodos.json`](src/content/lessons/04-tres-metodos.json).

- **Marcadores en vez de cifras.** Las pistas y la solución no llevan medidas escritas a mano:
  escriben `{respuesta}` y el motor del ejercicio pone el valor, con el formato de la aplicación
  («61,8 mm», «33°»). Así sirven también para las variantes con semilla. Marcadores disponibles:
  - todos: `{cotaA}`, `{alejA}` y `{xA}` (de cada punto, por ejemplo «15 mm»);
  - en `"value"`: `{respuesta}`;
  - motor de métodos: `{proyH}` y `{proyV}` (longitud de las proyecciones del segmento),
    `{difCota}` y `{difAlej}`;
  - motor de sólidos: `{ladoMayor}`, `{ladoMenor}`, `{perimetro}` y `{numLados}` de la sección
    (en el cono y el cilindro solo `{ladoMayor}`, el eje mayor), `{alejPunto}` y `{cotaPunto}` del
    punto de la superficie, `{cuerda}` (el tramo de la recta dentro del sólido), y `{radio}`,
    `{altura}` y `{lados}` del sólido.

  Un test falla si queda un marcador sin resolver, o si una narración lleva una medida escrita a
  mano que no es un dato del enunciado (se aceptan los ángulos de concepto: 30°, 45°, 60°, 90°…).

- **Error típico dibujado.** El paso `error` puede dibujar en la lámina el trazado equivocado,
  punteado y rotulado «✗ Error» (con el token `--stroke-error`, para que el color no sea la única
  pista). Se añade la capa `"error"` a `"sheet"` y los datos en `"engines"`:

  ```json
  "engines": { "error": { "trazos": [ { "puntos": ["A″", "B″"], "rotulo": "Error: proyección" } ] } }
  ```

  Cada punto es `[x, y]` en mm de la lámina (y hacia arriba) o la proyección de un punto de la
  escena (`"A′"` horizontal, `"A″"` vertical). Con referencias, el error sigue a los puntos y vale
  para las variantes. `"desplaza": [dx, dy]` mueve el trazo (en mm de la lámina) para que no quede
  tapado por el dato que mide mal, como una cota paralela. Es opcional: sin dibujo, el paso solo lleva la narración.

- **Variantes** (`"variant"` en un ejercicio `"value"`): en el motor de sólidos, `"ask"` lista las
  magnitudes entre las que elige la semilla (`ladoMayor`, `ladoMenor`, `perimetro`) y el ejercicio
  declara cuál es la suya con `"magnitud"`. La variante conserva pistas y solución, con los
  marcadores resueltos con sus datos; por eso los pasos de una solución con variantes no pueden
  fijar `"points"`.
- **`"magnitud"` en el motor de sólidos**: dice qué mide la respuesta, y el motor la calcula.
  Además de las de la sección, `alejamientoPunto` y `cotaPunto` (del punto `"punto"` de la
  superficie) y `cuerda` (el tramo de la `"recta"` dentro del sólido). Una sección curva (cono y
  cilindro) solo admite `ladoMayor`, que es su eje mayor.

Los tests recorren todos los ejercicios (`src/content/exercises.test.ts`) y comprueban que la
respuesta coincide con la que calcula el motor, que el estado final de la solución cumple la
comprobación y que cada paso solo cita capas, objetos y cámaras que existen. La lista
`COMPLETE_LESSONS` de ese fichero recoge las lecciones terminadas (9 ejercicios, 3 por nivel, con
pistas, solución y datos distintos); a las que están en la lista se les exige todo eso.

Los pasos y ejercicios que usan un motor (métodos, sólidos…) llevan sus datos en
`"engines"`, por ejemplo `"engines": { "metodos": { … } }`.

---

## Otras herramientas

- **Banco PAU** (`#/pau`): ejercicios tipo PAU en modo examen (22 minutos, solo la lámina y sin
  pistas), con la solución animada y la autoevaluación con la rúbrica oficial. Cada ejercicio es
  un fichero JSON en [`src/content/pau/`](src/content/pau/); copia uno de ejemplo para añadir más.
  Además de los ejemplos de formato, el banco tiene ejercicios reales de Andalucía (2025 y 2026),
  con el enunciado del examen, sus datos medidos en la lámina y la solución en las seis partes
  (cada paso lleva `"part"`; el error típico puede dibujarse con la capa `"error"`). Como los
  exámenes no traen criterios de corrección, su rúbrica lleva `"origen": "derivada"`: reparte los
  2 puntos según la puntuación por apartados del enunciado, y la pantalla avisa de que no es la
  oficial. Las escenas PAU admiten coordenadas hasta ±120 mm porque ocupan toda la hoja. Los PDF
  de `examenes/` no se suben al repositorio; `examenes/indice.json` apunta cuáles están transcritos.
- **Entrenador espacial** (`#/entrenador`): rotaciones, secciones, desarrollos y vistas con
  dificultad adaptativa, y un test diagnóstico inicial y final. Los resultados son anónimos y el
  alumno los descarga con el código que le dé el profesor.
- **Laboratorio de cónicas** (`#/conicas`): un cono doble cortado por un plano que se inclina y se
  sube; la cónica se ve en 3D y en verdadera magnitud, y el desplegable analítico muestra su tipo,
  su excentricidad y su ecuación.
- **Piezas de normalización**: un fichero JSON por pieza en [`src/content/piezas/`](src/content/piezas/).

## Para quien mantenga el código

Las decisiones didácticas, de notación y de arquitectura están en [CLAUDE.md](CLAUDE.md).

| Orden                                             | Qué hace                                                                        |
| ------------------------------------------------- | ------------------------------------------------------------------------------- |
| `npm run dev`                                     | Servidor de desarrollo                                                          |
| `npm run build`                                   | Compila la web en `dist/`                                                       |
| `npm run preview`                                 | Sirve la versión compilada                                                      |
| `npm run test`                                    | Tests de Vitest                                                                 |
| `npm run e2e`                                     | Tests de Playwright con capturas (`npx playwright install` la primera vez)      |
| `npm run lint`                                    | Revisión del código con ESLint                                                  |
| `REVIEW=1 npx playwright test e2e/review.spec.ts` | Revisión completa: capturas de cada paso, notación, accesibilidad y rendimiento |
