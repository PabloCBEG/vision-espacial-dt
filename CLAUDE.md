# Visión espacial DT

Herramienta web para enseñar Dibujo Técnico I y II de Bachillerato (España, LOMLOE) desarrollando la visión espacial. La usan alumnos de 16 a 18 años en el móvil y un profesor en el aula con proyector.

## Principios didácticos (obligatorios en cada escena)

1. **Doble vista sincronizada**: el modelo 3D y la lámina 2D se muestran a la vez; mover algo en una vista lo mueve en la otra.
2. **El abatimiento como puente**: el abatimiento del plano horizontal sobre el vertical, alrededor de la LT, es siempre el puente entre el espacio y la lámina.
3. **Primero el movimiento, después el trazado**: cada método (giro, cambio de plano, abatimiento) se muestra como un movimiento físico visible antes que como trazado.
4. **Soluciones por pasos**: cada paso lleva una narración breve (máximo 2 frases) y se puede avanzar y retroceder.
5. **Retirada progresiva del 3D**: niveles «con 3D», «con pista» y «solo 2D», como en la PAU.

## Convenciones geométricas

- Sistema europeo (primer diedro), UNE-EN ISO 5456-2.
- Coordenadas del dominio: `P(x, a, c)`, en mm.
  - `x`: a lo largo de la LT, positiva hacia la derecha.
  - `a`: alejamiento (distancia al PV), positivo delante.
  - `c`: cota (distancia al PH), positiva arriba.
- En Three.js: `X = x`, `Y = c`, `Z = a`. Esta conversión solo existe en `src/render3d`.
- Notación:
  - `P'` proyección horizontal, `P''` vertical, `P'''` de perfil.
  - `(P)` punto abatido; `P1` tras giro o cambio de plano.
  - Trazas de recta: `H` (horizontal) y `V` (vertical).
  - Trazas de plano: `α1` (horizontal) y `α2` (vertical).
  - LT dibujada con los dos trazos cortos bajo sus extremos.
  - En pantalla, las primas se escriben con los signos tipográficos: P′, P″, P‴.
  - Cuadrantes numerados en romanos: I, II, III y IV.
  - Cota y alejamiento se rotulan «c = 30 mm» y «a = 20 mm».
  - Trazas de plano con subíndice tipográfico: α₁, α₂ y, en perfil, α₃. Si coinciden: «α₁ ≡ α₂».
  - Tercera proyección: plano de perfil en x = 70 mm; se abate sobre el PV hacia la derecha
    (vista lateral izquierda), así que P‴ queda en (70 + a, c).
- Partes vistas (primer cuadrante) con línea continua gruesa; ocultas, discontinua fina.
- En la lámina la LT es horizontal; tras abatir, el alejamiento positivo queda bajo la LT y la cota positiva sobre ella.
- Vistas, líneas y acotación según ISO 128-2:2020, ISO 128-3:2022 y UNE-EN ISO 129-1:2019.

## Arquitectura

- Vite + TypeScript estricto + Three.js. Sin framework de interfaz: TypeScript sencillo y legible para que un profesor pueda mantenerlo.
- Módulos:
  - `src/geometry`: matemática pura, sin Three.js, cubierta por tests de Vitest.
  - `src/render3d`: escena Three.js.
  - `src/render2d`: lámina en SVG.
  - `src/state`: estado único compartido.
  - `src/player`: reproductor de pasos.
  - `src/content`: lecciones como datos, validadas con zod.
  - `src/ui`: controles de la interfaz (deslizadores, botones de vista, tema), enlazados al estado.
  - `src/engines`: motores enchufables (métodos, sólidos, plana…). Cada motor añade sus capas 3D y de lámina, su estado y sus datos de paso sin tocar los demás.
  - `src/ui/analytic.ts`: desplegable analítico global. Cada parte publica sus ecuaciones (LaTeX, con KaTeX empaquetado para que funcione sin conexión) con `analytic.set(fuente, bloques)` y las retira con `analytic.clear(fuente)`.
- Una lección nueva es un fichero de datos, nunca código nuevo.

## Vista 3D

- PH en azul claro y PV en ámbar; los nombres van siempre rotulados, el color no es la única pista.
- Vistas rápidas: perspectiva, frontal (alzado), superior (planta, alejamiento positivo hacia abajo) y perfil, mirando desde la izquierda como la vista lateral izquierda del sistema europeo.
- Se arrastran P′ (sobre el PH: cambia x y a), P″ (sobre el PV: cambia x y c) y P (en el plano paralelo al PV: cambia x y c).
- Solo se dibuja cuando algo cambia; nada de bucles de animación continuos.

## Andalucía y PAU

- Currículo: Orden de 30 de mayo de 2023 (BOJA 104), que desarrolla el RD 243/2022. PAU: directrices 2025-26 de Dibujo Técnico II.
- Bloques: A (fundamentos geométricos), B (geometría proyectiva), C (normalización y documentación gráfica) y D (CAD).
- PAU: 4 ejercicios de 2,5 puntos en 90 minutos.
  - Ej. 1, geometría: tangencias por eje y centro radical, cónicas, homología y afinidad (opción A o B).
  - Ej. 2, diédrico (obligatorio).
  - Ej. 3, isométrica, caballera o cónica (opción A o B).
  - Ej. 4, normalización (obligatorio).
  - Corrección: 2 puntos solución y método, 0,25 precisión y 0,25 presentación (esta última solo si la solución está al menos al 70 %).
- Tetraedro y cubo siempre apoyados en una cara; octaedro con una diagonal perpendicular a un plano de proyección (en axonometría, paralela a OZ). Prismas y pirámides regulares; conos y cilindros de revolución.
- Isométrica con coeficiente 0,816 (se aceptan 0,82 o 0,8); caballera con 1, 0,5 y 1, y circunferencias solo en planos frontales. Circunferencias isométricas como elipses (mejor por puntos), nunca óvalos.
- Aristas ocultas en diédrico, vistas y cónica; nunca en secciones.
- Construcciones auxiliares siempre visibles. Cuatro grosores de línea con significado, de más fino a más grueso: construcción auxiliar, proceso, datos y resultado (tokens `--stroke-aux`, `--stroke-process`, `--stroke-data` y `--stroke-result`).
- Normas: UNE-EN ISO 5456-2 y 5456-3, UNE-EN ISO 128-2 y 128-3, UNE-EN ISO 129-1.
- Fuera de la PAU (se pueden enseñar, pero no se exigen en ejercicios tipo PAU): rectas límite en homología, mínima distancia entre rectas que se cruzan, recta o plano definidos por sus ángulos con ambos planos de proyección, esferas y homología de circunferencias.
- El catálogo de temas está en `src/content/catalog.ts`: cada lección indica su código de tema.

## Contenido de ejercicios

- Cada lección tiene 9 ejercicios, 3 por nivel (`difficulty` 1, 2 y 3), con datos distintos de los de la teoría y distintos entre sí.
- Niveles:
  - Nivel 1: posición particular y números redondos.
  - Nivel 2: posición general.
  - Nivel 3: datos como en la PAU de Andalucía y varios conceptos encadenados. No usa contenidos marcados como «fuera de la PAU».
- Cada ejercicio lleva 3 `hints` y una `solution`:
  - `hints`: 1 es la idea clave; 2, el método; 3, el primer trazado.
  - `solution`: las seis partes del apartado 4 de `plan_contenidos.md`, en ese orden.
- Las narraciones tienen 2 frases como máximo, con verbos de acción visual y la notación de este fichero.
- La parte 6 (error típico) la redacta Claude y queda marcada como «[REVISAR]» en `textos_para_revision.md` hasta que el profesor la valide.
- Una lección está terminada cuando:
  - pasan `npm run test`, `npm run lint`, `npm run build` y `npm run e2e`;
  - las capturas de `node scripts/capturas-leccion.mjs <id>` están revisadas en los tres tamaños;
  - `textos_para_revision.md` está regenerado.
- Un commit por lección.

## Calidad

- Interfaz y textos en castellano; código e identificadores en inglés.
- Debe funcionar en Chrome, Safari y Firefox recientes, en un móvil de gama media y en proyector (modo de alto contraste con trazos gruesos).
- Accesible: todo usable con teclado, con etiquetas aria; el color nunca es la única pista.
- Ningún dato personal del alumnado: sin registro y sin analítica de terceros. Los resultados de los ejercicios se guardan solo en el navegador del alumno.
- Antes de dar una tarea por terminada: `npm run test`, `npm run build` y capturas con Playwright en 1920x1080, 1366x768 y 390x844, revisadas por ti.
- Commits pequeños, con mensaje en castellano.
- Si una decisión didáctica o de notación no está clara, pregunta al profesor antes de inventarla.
