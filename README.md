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
4. La web queda en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPOSITORIO/`.

Los alumnos que ya la tenían abierta verán la versión nueva la próxima vez que la abran
(la copia sin conexión se renueva sola).

### Probarla en tu ordenador antes de publicar (opcional)

Necesitas [Node.js](https://nodejs.org) 22 o posterior.

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

Al final de la lección, en `"exercises"`, hay dos tipos:

- **Colocar un punto** (`"kind": "placePoint"`): la lámina muestra las proyecciones de
  `"target"` y el alumno coloca el punto en el espacio. La aplicación le dice si ha
  confundido la cota con el alejamiento, el signo o la posición.
- **Cumplir una condición** (`"kind": "condition"`): el alumno mueve puntos hasta que se
  cumple, por ejemplo, `"lineParallelToPH"`, `"lineParallelToLT"`, `"lineCrossesLT"`,
  `"lineProfile"`, `"pointOnPlane"`, `"planeParallelToLT"` o `"planeContainsLT"`.

Cada ejercicio puede llevar `"difficulty"`: `1` (fácil), `2` (media) o `3` (tipo PAU).
Copia un ejercicio de una lección existente y cambia sus valores.

Los pasos y ejercicios que usan un motor (métodos, sólidos…) llevan sus datos en
`"engines"`, por ejemplo `"engines": { "metodos": { … } }`.

---

## Para quien mantenga el código

Las decisiones didácticas, de notación y de arquitectura están en [CLAUDE.md](CLAUDE.md).

| Orden                                             | Qué hace                                                                            |
| ------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `npm run dev`                                     | Servidor de desarrollo                                                              |
| `npm run build`                                   | Compila la web en `dist/`                                                           |
| `npm run preview`                                 | Sirve la versión compilada                                                          |
| `npm run test`                                    | Tests de Vitest                                                                     |
| `npm run e2e`                                     | Tests de Playwright con capturas (`npx playwright install chromium` la primera vez) |
| `npm run lint`                                    | Revisión del código con ESLint                                                      |
| `REVIEW=1 npx playwright test e2e/review.spec.ts` | Revisión completa: capturas de cada paso, notación, accesibilidad y rendimiento     |
