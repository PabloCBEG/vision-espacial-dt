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
- Una lección nueva es un fichero de datos, nunca código nuevo.

## Vista 3D

- PH en azul claro y PV en ámbar; los nombres van siempre rotulados, el color no es la única pista.
- Vistas rápidas: perspectiva, frontal (alzado), superior (planta, alejamiento positivo hacia abajo) y perfil, mirando desde la izquierda como la vista lateral izquierda del sistema europeo.
- Se arrastran P′ (sobre el PH: cambia x y a), P″ (sobre el PV: cambia x y c) y P (en el plano paralelo al PV: cambia x y c).
- Solo se dibuja cuando algo cambia; nada de bucles de animación continuos.

## Calidad

- Interfaz y textos en castellano; código e identificadores en inglés.
- Debe funcionar en Chrome, Safari y Firefox recientes, en un móvil de gama media y en proyector (modo de alto contraste con trazos gruesos).
- Accesible: todo usable con teclado, con etiquetas aria; el color nunca es la única pista.
- Ningún dato personal del alumnado: sin registro y sin analítica de terceros. Los resultados de los ejercicios se guardan solo en el navegador del alumno.
- Antes de dar una tarea por terminada: `npm run test`, `npm run build` y capturas con Playwright en 1920x1080, 1366x768 y 390x844, revisadas por ti.
- Commits pequeños, con mensaje en castellano.
- Si una decisión didáctica o de notación no está clara, pregunta al profesor antes de inventarla.
