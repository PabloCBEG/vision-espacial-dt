# Dos versiones en paralelo

| Versión | Rama            | Carpeta                   | Qué contiene                                                               |
| ------- | --------------- | ------------------------- | -------------------------------------------------------------------------- |
| Sobria  | `main`          | `vision-espacial-dt`      | Interfaz actual + todo el contenido nuevo (lecciones, motores, geometría). |
| Viva    | `rediseno/vivo` | `vision-espacial-dt-vivo` | Lo mismo + rediseño visual y de interacción.                               |

Marca de partida: etiqueta `sobrio-base` (commit e51ab56, antes de empezar el rediseño).

## Reglas de sincronización

1. **Contenido y lógica** (`src/content`, `src/engines`, `src/geometry`, `src/state`, tests) se
   hacen **solo en `main`**. Luego, en la carpeta viva: `git merge main`.
2. **Aspecto** (`src/style.css`, `index.html`, `src/ui/home.ts`, marcado de la lección, iconos,
   fuentes) se hace **solo en `rediseno/vivo`**.
3. Si un cambio de contenido necesita HTML/CSS propio, se hace en `main` con el estilo sobrio y se
   reestiliza en la rama viva tras el merge.
4. Los commits de la rama viva llevan el prefijo `[vivo]`.
5. Nunca se hace `merge` de `rediseno/vivo` hacia `main` salvo decisión explícita de adoptar el rediseño.
6. Ver qué falta por traer: `git log rediseno/vivo..main --oneline`.
7. La carpeta viva necesita su propio `npm ci`.

## Dónde se ven online

| Versión | Dirección                                            |
| ------- | ---------------------------------------------------- |
| Sobria  | https://pablocbeg.github.io/vision-espacial-dt/      |
| Viva    | https://pablocbeg.github.io/vision-espacial-dt/vivo/ |

Las dos se publican con el mismo flujo, `publicar.yml` (vive en `main`, porque el entorno
`github-pages` solo admite esa rama). Cada una pasa sus tests por separado: si falla la sobria no
se publica nada; si falla solo la viva, se publica la sobria y la viva se queda como estaba.
Un push a `rediseno/vivo` lanza ese flujo mediante `avisar-publicar.yml`.

Las dos comparten el mismo origen del navegador, así que comparten también el progreso guardado
(`localStorage`); el XP, la racha y las insignias solo los usa la viva.
