# Textos para revisión

Todos los textos que lee el alumnado en *Visión espacial DT*, reunidos para validarlos de una vez.
Se genera con `node scripts/textos-revision.ts`; si cambias un texto en la aplicación, vuelve a generarlo.

**Cómo revisar.** Marca cada casilla al validarla. Si quieres cambiar algo, escribe la corrección debajo
(por ejemplo, `> CAMBIAR: …`) y yo la llevo al fichero que se indica en cada sección.
Las narraciones tienen como máximo dos frases (lo exige el formato de lección).

## Índice

1. [Lecciones](#1-lecciones)
2. [Ejercicios PAU (ejemplos de formato)](#2-ejercicios-pau-ejemplos-de-formato)
3. [Piezas de normalización](#3-piezas-de-normalización)
4. [Avisos, pistas y textos de los motores](#4-avisos-pistas-y-textos-de-los-motores)

## 1. Lecciones

### I-08 · El punto en el sistema diédrico

Fichero: `src/content/lessons/01-el-punto.json` · DT I · nivel Inicial

- [ ] **Saber básico:** Sistemas de representación: fundamentos del sistema diédrico. Representación del punto.

**Pasos**

1. [ ] El sistema diédrico usa dos planos perpendiculares: el horizontal (PH) y el vertical (PV). Se cortan en la línea de tierra (LT) y dividen el espacio en cuatro cuadrantes.
2. [ ] Este es el punto P. Está en el primer cuadrante: delante del PV y por encima del PH.
3. [ ] Desde P trazamos perpendiculares a los dos planos. Donde cortan al PH está P′ y donde cortan al PV, P″.
4. [ ] La cota es la distancia de P al PH y el alejamiento, la distancia de P al PV. Las dos se miden también desde la LT, en P″ y en P′.
5. [ ] Giramos el PH alrededor de la LT hasta que coincide con el PV. P′ viaja con el PH y P″ no se mueve.
6. [ ] Esto es la lámina: P″ y P′ quedan en una misma línea de referencia, perpendicular a la LT. La cota se mide sobre la LT y el alejamiento, por debajo.
7. [ ] Si P está detrás del PV, está en el segundo cuadrante y su alejamiento es negativo.
8. [ ] Al abatir, P′ queda por encima de la LT: en el segundo cuadrante las dos proyecciones están sobre la LT.

**Ejercicios**

1. [ ] *colocar el punto, dificultad 1*: Coloca P en el espacio para que sus proyecciones sean las de la lámina. Cada cuadro de la lámina mide 10 mm.
   - [ ] *Pista 1:* P′ y P″ están en una misma línea de referencia, perpendicular a la LT.
   - [ ] *Pista 2:* La cota se lee en P″ y el alejamiento, en P′; el lado de la LT en que están da el signo.
   - [ ] *Pista 3:* Empieza por la cota: lleva P a la altura que marca P″ y después ajusta el alejamiento.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* En la lámina, P″ está por encima de la LT y P′ está por debajo de la LT, los dos sobre la misma línea de referencia.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La cota es la distancia de P″ a la LT y el alejamiento, la de P′ a la LT. El lado de la LT en que cae cada una dice en qué cuadrante está P.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Deshaz el abatimiento: el PH gira hacia abajo con P′ y P queda donde se cortan las perpendiculares a los planos por P′ y por P″.
   - [ ] *Solución, paso 4 · 4. El trazado:* La cota, 35 mm, se lee en P″ sobre la LT: P está por encima del PH.
   - [ ] *Solución, paso 5 · 4. El trazado:* El alejamiento, 20 mm, se lee en P′ bajo la LT: P está delante del PV.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: con x = 30 mm, P está en el primer cuadrante y sus proyecciones caen en la misma línea de referencia.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: leer la cota en P′ y el alejamiento en P″. Así se intercambian y P quedaría con cota 20 mm y alejamiento 35 mm.
2. [ ] *colocar el punto, dificultad 1*: Coloca P a partir de la lámina. Fíjate en qué proyección está sobre la LT y cuál debajo.
   - [ ] *Pista 1:* P′ y P″ están en una misma línea de referencia, perpendicular a la LT.
   - [ ] *Pista 2:* La cota se lee en P″ y el alejamiento, en P′; el lado de la LT en que están da el signo.
   - [ ] *Pista 3:* Empieza por la cota: lleva P a la altura que marca P″ y después ajusta el alejamiento.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* En la lámina, P″ está por encima de la LT y P′ está por debajo de la LT, los dos sobre la misma línea de referencia.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La cota es la distancia de P″ a la LT y el alejamiento, la de P′ a la LT. El lado de la LT en que cae cada una dice en qué cuadrante está P.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Deshaz el abatimiento: el PH gira hacia abajo con P′ y P queda donde se cortan las perpendiculares a los planos por P′ y por P″.
   - [ ] *Solución, paso 4 · 4. El trazado:* La cota, 15 mm, se lee en P″ sobre la LT: P está por encima del PH.
   - [ ] *Solución, paso 5 · 4. El trazado:* El alejamiento, 40 mm, se lee en P′ bajo la LT: P está delante del PV.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: con x = −20 mm, P está en el primer cuadrante y sus proyecciones caen en la misma línea de referencia.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: leer el alejamiento al revés. El positivo queda bajo la LT; con el signo cambiado, P pasaría al otro lado del PV.
3. [ ] *colocar el punto, dificultad 1*: En la lámina, P″ está sobre la LT. Coloca P en el espacio y di en qué plano de proyección está.
   - [ ] *Pista 1:* Si P″ está sobre la LT, la cota de P es nula.
   - [ ] *Pista 2:* Un punto de cota nula está en el PH: P coincide con su proyección horizontal P′.
   - [ ] *Pista 3:* Pon la cota a cero y ajusta el alejamiento con lo que marca P′.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* En la lámina, P″ está sobre la LT y P′ está por debajo de la LT, los dos sobre la misma línea de referencia.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La cota es la distancia de P″ a la LT y el alejamiento, la de P′ a la LT. El lado de la LT en que cae cada una dice en qué cuadrante está P.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Deshaz el abatimiento: el PH gira hacia abajo con P′ y P queda donde se cortan las perpendiculares a los planos por P′ y por P″.
   - [ ] *Solución, paso 4 · 4. El trazado:* P″ está sobre la LT: la cota es nula y P está en el PH.
   - [ ] *Solución, paso 5 · 4. El trazado:* El alejamiento, 25 mm, se lee en P′ bajo la LT: P está delante del PV.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: con x = −30 mm, P está en el PH y sus proyecciones caen en la misma línea de referencia.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: leer la cota en P′ y el alejamiento en P″. Así se intercambian y P quedaría con cota 25 mm y alejamiento 0 mm.
4. [ ] *colocar el punto, dificultad 2*: Ahora P está en otro cuadrante. Colócalo en el espacio a partir de su lámina.
   - [ ] *Pista 1:* Si P′ está sobre la LT, el alejamiento es negativo y P está detrás del PV.
   - [ ] *Pista 2:* Mira de qué lado de la LT cae cada proyección: eso da el signo de la cota y del alejamiento.
   - [ ] *Pista 3:* Lleva primero P a la cota de P″ y después sitúalo detrás del PV según P′.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* En la lámina, P″ está por encima de la LT y P′ está por encima de la LT, los dos sobre la misma línea de referencia.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La cota es la distancia de P″ a la LT y el alejamiento, la de P′ a la LT. El lado de la LT en que cae cada una dice en qué cuadrante está P.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Deshaz el abatimiento: el PH gira hacia abajo con P′ y P queda donde se cortan las perpendiculares a los planos por P′ y por P″.
   - [ ] *Solución, paso 4 · 4. El trazado:* La cota, 35 mm, se lee en P″ sobre la LT: P está por encima del PH.
   - [ ] *Solución, paso 5 · 4. El trazado:* El alejamiento, 15 mm, se lee en P′ sobre la LT: P está detrás del PV.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: con x = 10 mm, P está en el segundo cuadrante y sus proyecciones caen en la misma línea de referencia.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: leer el alejamiento al revés. El positivo queda bajo la LT; con el signo cambiado, P pasaría al otro lado del PV.
5. [ ] *colocar el punto, dificultad 2*: Coloca P en el espacio a partir de su lámina. Decide si está por encima o por debajo del PH y delante o detrás del PV.
   - [ ] *Pista 1:* Con P″ bajo la LT y P′ también bajo la LT, P está delante del PV y por debajo del PH.
   - [ ] *Pista 2:* La cota negativa se lee bajo la LT en P″; el alejamiento positivo, bajo la LT en P′.
   - [ ] *Pista 3:* Baja P bajo el PH hasta la cota de P″ y deja su alejamiento como marca P′.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* En la lámina, P″ está por debajo de la LT y P′ está por debajo de la LT, los dos sobre la misma línea de referencia.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La cota es la distancia de P″ a la LT y el alejamiento, la de P′ a la LT. El lado de la LT en que cae cada una dice en qué cuadrante está P.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Deshaz el abatimiento: el PH gira hacia abajo con P′ y P queda donde se cortan las perpendiculares a los planos por P′ y por P″.
   - [ ] *Solución, paso 4 · 4. El trazado:* La cota, 25 mm, se lee en P″ bajo la LT: P está por debajo del PH.
   - [ ] *Solución, paso 5 · 4. El trazado:* El alejamiento, 30 mm, se lee en P′ bajo la LT: P está delante del PV.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: con x = 25 mm, P está en el cuarto cuadrante y sus proyecciones caen en la misma línea de referencia.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: cambiar el signo de la cota. P pasaría al otro lado del PH y a otro cuadrante.
6. [ ] *colocar el punto, dificultad 2*: Coloca P en el espacio a partir de su lámina, que no está en el primer cuadrante.
   - [ ] *Pista 1:* Con P′ sobre la LT y P″ bajo la LT, P está detrás del PV y por debajo del PH.
   - [ ] *Pista 2:* Es el tercer cuadrante: la cota y el alejamiento son negativos.
   - [ ] *Pista 3:* Lleva P detrás del PV y bajo el PH, con la cota de P″ y el alejamiento de P′.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* En la lámina, P″ está por debajo de la LT y P′ está por encima de la LT, los dos sobre la misma línea de referencia.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La cota es la distancia de P″ a la LT y el alejamiento, la de P′ a la LT. El lado de la LT en que cae cada una dice en qué cuadrante está P.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Deshaz el abatimiento: el PH gira hacia abajo con P′ y P queda donde se cortan las perpendiculares a los planos por P′ y por P″.
   - [ ] *Solución, paso 4 · 4. El trazado:* La cota, 30 mm, se lee en P″ bajo la LT: P está por debajo del PH.
   - [ ] *Solución, paso 5 · 4. El trazado:* El alejamiento, 15 mm, se lee en P′ sobre la LT: P está detrás del PV.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: con x = −45 mm, P está en el tercer cuadrante y sus proyecciones caen en la misma línea de referencia.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: leer el alejamiento al revés. El positivo queda bajo la LT; con el signo cambiado, P pasaría al otro lado del PV.
7. [ ] *colocar el punto, dificultad 3*: Como en la PAU: P está en el primer bisector, a la misma distancia del PH que del PV. Colócalo en el espacio a partir de su lámina.
   - [ ] *Pista 1:* En el primer bisector, la cota y el alejamiento de P valen lo mismo.
   - [ ] *Pista 2:* P′ y P″ quedan a la misma distancia de la LT, una por debajo y otra por encima.
   - [ ] *Pista 3:* Lleva P a la cota de P″ y comprueba que su alejamiento es igual.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* En la lámina, P″ está por encima de la LT y P′ está por debajo de la LT, los dos sobre la misma línea de referencia.
   - [ ] *Solución, paso 2 · 2. La idea clave:* El primer bisector es el plano que pasa por la LT y reparte los cuadrantes primero y tercero: sus puntos tienen la misma cota que alejamiento.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Deshaz el abatimiento: el PH gira hacia abajo con P′ y P queda donde se cortan las perpendiculares a los planos por P′ y por P″.
   - [ ] *Solución, paso 4 · 4. El trazado:* La cota, 40 mm, se lee en P″ sobre la LT: P está por encima del PH.
   - [ ] *Solución, paso 5 · 4. El trazado:* El alejamiento, 40 mm, se lee en P′ bajo la LT: P está delante del PV.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: con x = −25 mm, P está en el primer cuadrante y sus proyecciones caen en la misma línea de referencia.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: cambiar el signo de la cota. P pasaría al otro lado del PH y a otro cuadrante.
8. [ ] *colocar el punto, dificultad 3*: Como en la PAU: P está en el segundo bisector, que pasa por los cuadrantes segundo y cuarto. Colócalo en el espacio.
   - [ ] *Pista 1:* En el segundo bisector, la cota y el alejamiento valen lo mismo, con signo cambiado.
   - [ ] *Pista 2:* P′ y P″ caen del mismo lado de la LT, a igual distancia de ella.
   - [ ] *Pista 3:* Pon P detrás del PH, bajo él, con la cota y el alejamiento iguales en valor.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* En la lámina, P″ está por debajo de la LT y P′ está por debajo de la LT, los dos sobre la misma línea de referencia.
   - [ ] *Solución, paso 2 · 2. La idea clave:* El segundo bisector pasa por los cuadrantes segundo y cuarto: sus puntos tienen cota y alejamiento iguales en valor y de signo contrario.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Deshaz el abatimiento: el PH gira hacia abajo con P′ y P queda donde se cortan las perpendiculares a los planos por P′ y por P″.
   - [ ] *Solución, paso 4 · 4. El trazado:* La cota, 30 mm, se lee en P″ bajo la LT: P está por debajo del PH.
   - [ ] *Solución, paso 5 · 4. El trazado:* El alejamiento, 30 mm, se lee en P′ bajo la LT: P está delante del PV.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: con x = 35 mm, P está en el cuarto cuadrante y sus proyecciones caen en la misma línea de referencia.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: leer la cota en P′ y el alejamiento en P″. Así se intercambian y P quedaría con cota 30 mm y alejamiento 30 mm.
9. [ ] *colocar el punto, dificultad 3*: Como en la PAU: P está en el primer bisector, pero no en el primer cuadrante. Colócalo en el espacio a partir de su lámina.
   - [ ] *Pista 1:* El primer bisector también pasa por el tercer cuadrante, donde la cota y el alejamiento son negativos.
   - [ ] *Pista 2:* P′ queda sobre la LT y P″ bajo ella, a la misma distancia.
   - [ ] *Pista 3:* Lleva P detrás del PV y bajo el PH, con cota y alejamiento iguales en valor.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* En la lámina, P″ está por debajo de la LT y P′ está por encima de la LT, los dos sobre la misma línea de referencia.
   - [ ] *Solución, paso 2 · 2. La idea clave:* El primer bisector atraviesa también el tercer cuadrante: allí la cota y el alejamiento son negativos, pero iguales.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Deshaz el abatimiento: el PH gira hacia abajo con P′ y P queda donde se cortan las perpendiculares a los planos por P′ y por P″.
   - [ ] *Solución, paso 4 · 4. El trazado:* La cota, 35 mm, se lee en P″ bajo la LT: P está por debajo del PH.
   - [ ] *Solución, paso 5 · 4. El trazado:* El alejamiento, 35 mm, se lee en P′ sobre la LT: P está detrás del PV.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: con x = −40 mm, P está en el tercer cuadrante y sus proyecciones caen en la misma línea de referencia.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: cambiar el signo de la cota. P pasaría al otro lado del PH y a otro cuadrante.

### I-08 · La recta

Fichero: `src/content/lessons/02-la-recta.json` · DT I · nivel Inicial

- [ ] **Saber básico:** Sistema diédrico: representación de la recta, trazas, partes vistas y ocultas y posiciones particulares.

**Pasos**

1. [ ] Una recta queda definida por dos de sus puntos. Aquí, la recta r pasa por A y por B.
2. [ ] Las proyecciones de r pasan por las de sus puntos: r′ por A′ y B′, y r″ por A″ y B″.
3. [ ] La traza horizontal H es el punto donde r corta al PH; la vertical V, donde corta al PV.
4. [ ] Solo se ve la parte de r que está en el primer cuadrante y se dibuja continua. El resto queda oculto y se dibuja discontinuo.
5. [ ] Al abatir el PH, r′ y r″ pasan a la lámina con sus trazas. H″ y V′ caen siempre sobre la LT.
6. [ ] En la lámina, las partes vistas de r′ y r″ son continuas y las ocultas, discontinuas. Cambian de una a otra en las trazas.
7. [ ] Si A y B tienen la misma cota y el mismo alejamiento, r es paralela a la LT y no tiene trazas.
8. [ ] Si A y B están en la misma línea de referencia, r es de perfil y sus dos proyecciones no bastan. Hace falta la tercera proyección, sobre el plano de perfil.

**Ejercicios**

1. [ ] *cumplir una condición, dificultad 1*: Mueve B hasta que r sea paralela al PH. Fíjate en cómo queda r″ respecto de la LT.
   - [ ] *Pista 1:* Una recta paralela al PH tiene todos sus puntos a la misma cota.
   - [ ] *Pista 2:* Basta con igualar la cota de A y de B; su alejamiento y su x pueden ser distintos.
   - [ ] *Pista 3:* Mueve B con el deslizador de la cota hasta que B″ quede a la altura de A″.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* La recta r pasa por A y por B, que están a distinta cota. Queremos que r sea paralela al PH, es decir, horizontal.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Una recta es paralela al PH si todos sus puntos tienen la misma cota. Entonces r″ es paralela a la LT.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Sube o baja B, sin cambiar su x ni su alejamiento, hasta que su cota sea la de A, 25 mm.
   - [ ] *Solución, paso 4 · 4. El trazado:* En la lámina, B″ queda a la misma altura que A″ sobre la LT: r″ es paralela a la LT.
   - [ ] *Solución, paso 5 · 4. El trazado:* La recta r no tiene traza horizontal: es paralela al PH y no lo corta. Solo conserva la traza vertical V.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: A″ y B″ están a 25 mm de la LT y r″ es paralela a ella; r no tiene traza horizontal.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: igualar el alejamiento en lugar de la cota. Entonces r′ sería paralela a la LT, pero r″ seguiría inclinada.
2. [ ] *cumplir una condición, dificultad 1*: Mueve B hasta que r sea paralela al PV. Fíjate en cómo queda r′ respecto de la LT.
   - [ ] *Pista 1:* Una recta paralela al PV tiene todos sus puntos al mismo alejamiento.
   - [ ] *Pista 2:* Basta con igualar el alejamiento de A y de B; su cota y su x pueden ser distintas.
   - [ ] *Pista 3:* Mueve B con el deslizador del alejamiento hasta que B′ quede a la distancia de A′.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* La recta r pasa por A y por B, que están a distinto alejamiento. Queremos que r sea paralela al PV, es decir, frontal.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Una recta es paralela al PV si todos sus puntos tienen el mismo alejamiento. Entonces r′ es paralela a la LT.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Acerca o aleja B, sin cambiar su x ni su cota, hasta que su alejamiento sea el de A, 15 mm.
   - [ ] *Solución, paso 4 · 4. El trazado:* En la lámina, B′ queda a la misma distancia de la LT que A′: r′ es paralela a la LT.
   - [ ] *Solución, paso 5 · 4. El trazado:* La recta r no tiene traza vertical: es paralela al PV y no lo corta. Solo conserva la traza horizontal H.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: A′ y B′ están a 15 mm de la LT y r′ es paralela a ella; r no tiene traza vertical.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: igualar la cota en lugar del alejamiento. Entonces r″ sería paralela a la LT, pero r′ seguiría inclinada.
3. [ ] *cumplir una condición, dificultad 1*: Mueve B hasta que r sea paralela a la LT. Tendrá que ser paralela a los dos planos.
   - [ ] *Pista 1:* Una recta paralela a la LT es paralela a los dos planos de proyección a la vez.
   - [ ] *Pista 2:* Hay que igualar la cota y el alejamiento de A y B; solo su x puede ser distinta.
   - [ ] *Pista 3:* Mueve B con los dos deslizadores hasta que r′ y r″ queden paralelas a la LT.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* La recta r pasa por A y por B. Queremos que sea paralela a la LT, o sea, a la vez al PH y al PV.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Una recta paralela a la LT cumple las dos condiciones: la misma cota y el mismo alejamiento en todos sus puntos. Sus dos proyecciones son paralelas a la LT.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Mueve B hasta que tenga la cota de A, 30 mm, y su alejamiento, 20 mm; solo cambia su x respecto de A.
   - [ ] *Solución, paso 4 · 4. El trazado:* En la lámina, A″B″ y A′B′ son paralelas a la LT: las dos proyecciones quedan horizontales.
   - [ ] *Solución, paso 5 · 4. El trazado:* La recta r no corta ni al PH ni al PV, así que no tiene trazas. No se puede dibujar H ni V.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: A y B tienen cota 30 mm y alejamiento 20 mm; r no tiene trazas y es paralela a la LT.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: igualar solo la cota. Entonces r″ es paralela a la LT, pero r′ sigue inclinada y r sí corta al PV.
4. [ ] *cumplir una condición, dificultad 2*: Mueve B hasta que r sea una recta de perfil. Sus dos proyecciones quedan en una misma línea de referencia.
   - [ ] *Pista 1:* Una recta de perfil está en un plano perpendicular a la LT.
   - [ ] *Pista 2:* Sus dos puntos tienen la misma x: A′, A″, B′ y B″ quedan en una misma línea de referencia.
   - [ ] *Pista 3:* Mueve B con el deslizador de la x hasta que su proyección coincida con la línea de A.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* La recta r pasa por A y por B, con distinta x. Queremos que r sea de perfil, es decir, perpendicular a la LT.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Una recta de perfil está en un plano perpendicular a la LT: sus dos puntos tienen la misma x. Entonces r′ y r″ son perpendiculares a la LT.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Mueve B a lo largo de la LT hasta que su x sea la de A, −15 mm; su cota y su alejamiento no cambian.
   - [ ] *Solución, paso 4 · 4. El trazado:* En la lámina, A′, A″, B′ y B″ quedan en una misma línea de referencia: r′ y r″ son perpendiculares a la LT.
   - [ ] *Solución, paso 5 · 4. El trazado:* Con las dos proyecciones en la misma línea no se puede medir nada de r: hace falta la tercera proyección, r‴.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: A y B están en la misma x, −15 mm; r está contenida en un plano de perfil, perpendicular a la LT.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: dejar B en otra x. Con distinta x, r′ y r″ siguen inclinadas respecto a la LT y r no es de perfil.
5. [ ] *cumplir una condición, dificultad 2*: Mueve B hasta que r corte a la LT. Sus trazas H y V tienen que coincidir.
   - [ ] *Pista 1:* Una recta corta a la LT cuando sus trazas H y V son el mismo punto.
   - [ ] *Pista 2:* Mira la recta de perfil: A, B y la LT, vista como un punto, deben estar alineados.
   - [ ] *Pista 3:* Mueve B hasta que r′ y r″ lleguen a un mismo punto de la LT.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* La recta r pasa por A y por B. Queremos que corte a la LT, así que pase de un cuadrante a otro justo por ella.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Una recta corta a la LT cuando sus trazas H y V coinciden. Visto de perfil, A, B y la LT, que se ve como un punto, quedan alineados.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Mueve B hasta que, visto de perfil, A, B y la LT estén alineados: así r pasa por un punto de la LT.
   - [ ] *Solución, paso 4 · 4. El trazado:* En la lámina, r′ y r″ cortan a la LT en el mismo punto, que es la traza H y también la V.
   - [ ] *Solución, paso 5 · 4. El trazado:* Ese punto es H ≡ V. A cada lado de él, r cambia de cuadrante.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: las trazas H y V coinciden en la LT, y r′ y r″ se cortan sobre ella.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: igualar la cota y el alejamiento de A y B. Eso hace r paralela a la LT, que no la corta nunca.
6. [ ] *cumplir una condición, dificultad 2*: A está en el tercer cuadrante y B en el cuarto. Mueve B hasta que r sea paralela al PH.
   - [ ] *Pista 1:* Una recta paralela al PH tiene todos sus puntos a la misma cota.
   - [ ] *Pista 2:* Basta con igualar la cota de A y de B; su alejamiento y su x pueden ser distintos.
   - [ ] *Pista 3:* Mueve B con el deslizador de la cota hasta que B″ quede a la altura de A″.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* La recta r pasa por A y por B, que están a distinta cota. Queremos que r sea paralela al PH, es decir, horizontal.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Una recta es paralela al PH si todos sus puntos tienen la misma cota. Entonces r″ es paralela a la LT.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Sube o baja B, sin cambiar su x ni su alejamiento, hasta que su cota sea la de A, 30 mm.
   - [ ] *Solución, paso 4 · 4. El trazado:* En la lámina, B″ queda a la misma altura que A″ sobre la LT: r″ es paralela a la LT.
   - [ ] *Solución, paso 5 · 4. El trazado:* La recta r no tiene traza horizontal: es paralela al PH y no lo corta. Solo conserva la traza vertical V.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: A″ y B″ están a 30 mm de la LT y r″ es paralela a ella; r no tiene traza horizontal.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: igualar el alejamiento en lugar de la cota. Entonces r′ sería paralela a la LT, pero r″ seguiría inclinada.
7. [ ] *cumplir una condición, dificultad 3*: Como en la PAU: A está en el segundo cuadrante y B en el cuarto. Mueve B hasta que r sea paralela al PV.
   - [ ] *Pista 1:* Una recta paralela al PV tiene todos sus puntos al mismo alejamiento.
   - [ ] *Pista 2:* Basta con igualar el alejamiento de A y de B; su cota y su x pueden ser distintas.
   - [ ] *Pista 3:* Mueve B con el deslizador del alejamiento hasta que B′ quede a la distancia de A′.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* La recta r pasa por A y por B, que están a distinto alejamiento. Queremos que r sea paralela al PV, es decir, frontal.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Una recta es paralela al PV si todos sus puntos tienen el mismo alejamiento. Entonces r′ es paralela a la LT.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Acerca o aleja B, sin cambiar su x ni su cota, hasta que su alejamiento sea el de A, −20 mm.
   - [ ] *Solución, paso 4 · 4. El trazado:* En la lámina, B′ queda a la misma distancia de la LT que A′: r′ es paralela a la LT.
   - [ ] *Solución, paso 5 · 4. El trazado:* La recta r no tiene traza vertical: es paralela al PV y no lo corta. Solo conserva la traza horizontal H.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: A′ y B′ están a −20 mm de la LT y r′ es paralela a ella; r no tiene traza vertical.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: igualar la cota en lugar del alejamiento. Entonces r″ sería paralela a la LT, pero r′ seguiría inclinada.
8. [ ] *cumplir una condición, dificultad 3*: Como en la PAU: A está en el segundo cuadrante. Mueve B hasta que r corte a la LT en un solo punto.
   - [ ] *Pista 1:* Una recta corta a la LT cuando sus trazas H y V son el mismo punto.
   - [ ] *Pista 2:* Mira la recta de perfil: A, B y la LT, vista como un punto, deben estar alineados.
   - [ ] *Pista 3:* Mueve B hasta que r′ y r″ lleguen a un mismo punto de la LT.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* La recta r pasa por A y por B. Queremos que corte a la LT, así que pase de un cuadrante a otro justo por ella.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Una recta corta a la LT cuando sus trazas H y V coinciden. Visto de perfil, A, B y la LT, que se ve como un punto, quedan alineados.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Mueve B hasta que, visto de perfil, A, B y la LT estén alineados: así r pasa por un punto de la LT.
   - [ ] *Solución, paso 4 · 4. El trazado:* En la lámina, r′ y r″ cortan a la LT en el mismo punto, que es la traza H y también la V.
   - [ ] *Solución, paso 5 · 4. El trazado:* Ese punto es H ≡ V. A cada lado de él, r cambia de cuadrante.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: las trazas H y V coinciden en la LT, y r′ y r″ se cortan sobre ella.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: igualar la cota y el alejamiento de A y B. Eso hace r paralela a la LT, que no la corta nunca.
9. [ ] *cumplir una condición, dificultad 3*: Como en la PAU: A está en el cuarto cuadrante. Mueve B hasta que r sea paralela a la LT y sin trazas.
   - [ ] *Pista 1:* Una recta paralela a la LT es paralela a los dos planos de proyección a la vez.
   - [ ] *Pista 2:* Hay que igualar la cota y el alejamiento de A y B; solo su x puede ser distinta.
   - [ ] *Pista 3:* Mueve B con los dos deslizadores hasta que r′ y r″ queden paralelas a la LT.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* La recta r pasa por A y por B. Queremos que sea paralela a la LT, o sea, a la vez al PH y al PV.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Una recta paralela a la LT cumple las dos condiciones: la misma cota y el mismo alejamiento en todos sus puntos. Sus dos proyecciones son paralelas a la LT.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Mueve B hasta que tenga la cota de A, −10 mm, y su alejamiento, 35 mm; solo cambia su x respecto de A.
   - [ ] *Solución, paso 4 · 4. El trazado:* En la lámina, A″B″ y A′B′ son paralelas a la LT: las dos proyecciones quedan horizontales.
   - [ ] *Solución, paso 5 · 4. El trazado:* La recta r no corta ni al PH ni al PV, así que no tiene trazas. No se puede dibujar H ni V.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: A y B tienen cota −10 mm y alejamiento 35 mm; r no tiene trazas y es paralela a la LT.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: igualar solo la cota. Entonces r″ es paralela a la LT, pero r′ sigue inclinada y r sí corta al PV.

### I-08 · El plano

Fichero: `src/content/lessons/03-el-plano.json` · DT I · nivel Intermedio

- [ ] **Saber básico:** Sistema diédrico: representación del plano por sus trazas, pertenencia de punto y recta, y posiciones particulares.

**Pasos**

1. [ ] Un plano queda definido por tres puntos no alineados. Aquí, el plano α pasa por A, B y C.
2. [ ] Las trazas de α son sus rectas de corte con el PH (α₁) y con el PV (α₂). Se cortan en un punto de la LT.
3. [ ] La recta r pasa por A y B, así que está en α. Sus trazas H y V caen sobre α₁ y α₂.
4. [ ] Un punto está en un plano si está en una recta del plano. Mueve Q: la aplicación te avisa si sale de α.
5. [ ] Al abatir el PH, α₁ pasa a la lámina con él y α₂ no se mueve. Así se representa un plano en diédrico.
6. [ ] Si α₁ y α₂ son paralelas a la LT, el plano es paralelo a la LT.
7. [ ] Si el plano contiene la LT, sus dos trazas coinciden con ella y no bastan para definirlo. La tercera proyección, α₃, sí lo define.

**Ejercicios**

1. [ ] *cumplir una condición, dificultad 1*: Q está fuera del plano α. Llévalo hasta α: el aviso te dice cuánto te falta.
   - [ ] *Pista 1:* Un punto está en un plano si está en una recta del plano.
   - [ ] *Pista 2:* La recta r, por A y B, está en α: lleva Q sobre r.
   - [ ] *Pista 3:* Mueve Q hasta que Q′ esté en r′ y Q″ esté en r″.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* El plano α pasa por A, B y C, y Q está fuera de él. Queremos llevar Q hasta α.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Un punto está en un plano si está en una recta del plano. La recta r, que pasa por A y por B, está contenida en α.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Lleva Q sobre r: sus proyecciones Q′ y Q″ tienen que estar en r′ y r″, en la misma línea de referencia.
   - [ ] *Solución, paso 4 · 4. El trazado:* En la lámina, Q′ queda sobre r′ y Q″ sobre r″, y los dos en una misma perpendicular a la LT.
   - [ ] *Solución, paso 5 · 4. El trazado:* Como r está en α, cualquier punto de r está en α: Q pertenece al plano.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: Q′ está en r′, Q″ está en r″ y el aviso de distancia de Q a α da cero.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: poner Q′ en r′ y olvidar Q″. Con una sola proyección sobre r no basta: las dos tienen que estar sobre r.
2. [ ] *cumplir una condición, dificultad 1*: Mueve B hasta que el plano α sea paralelo a la LT. Mira cómo quedan α₁ y α₂.
   - [ ] *Pista 1:* Un plano paralelo a la LT contiene una recta paralela a la LT.
   - [ ] *Pista 2:* Hay que igualar la cota y el alejamiento de dos de sus puntos.
   - [ ] *Pista 3:* Mueve uno de ellos hasta que sus dos proyecciones queden paralelas a la LT.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* El plano α pasa por A, B y C. Queremos que sea paralelo a la LT.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Un plano es paralelo a la LT si contiene una recta paralela a la LT. Entonces sus trazas α₁ y α₂ son paralelas a la LT.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Mueve B hasta que la recta AB sea paralela a la LT: toma la cota de A, 30 mm, y su alejamiento, 10 mm.
   - [ ] *Solución, paso 4 · 4. El trazado:* En la lámina, A′B′ y A″B″ son paralelas a la LT: α contiene una recta paralela a la LT.
   - [ ] *Solución, paso 5 · 4. El trazado:* Las trazas α₁ y α₂ salen paralelas a la LT: el plano es paralelo a ella y no la corta.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: A y B tienen la misma cota, 30 mm, y el mismo alejamiento, 10 mm; α₁ y α₂ son paralelas a la LT.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: igualar solo la cota de AB. Así la recta es horizontal, pero α₁ no sale paralela a la LT.
3. [ ] *cumplir una condición, dificultad 1*: Mueve C hasta que el plano α contenga a la LT. Entonces α₁ y α₂ coinciden con ella.
   - [ ] *Pista 1:* Un plano que contiene a la LT tiene las dos trazas sobre ella.
   - [ ] *Pista 2:* En la vista de perfil, sus puntos están alineados con el origen.
   - [ ] *Pista 3:* Mueve un punto hasta que su cota y su alejamiento mantengan la razón de los otros dos.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* El plano α pasa por A, B y C. Queremos que contenga a la LT.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Un plano contiene a la LT si, visto de perfil, sus puntos están alineados con el origen, donde la LT se ve como un punto.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Mueve C hasta que, visto de perfil, A, B y C estén alineados con el origen, donde está la LT.
   - [ ] *Solución, paso 4 · 4. El trazado:* En la vista de perfil, A, B y C están sobre una recta que pasa por el origen: el plano contiene a la LT.
   - [ ] *Solución, paso 5 · 4. El trazado:* En la lámina, α₁ y α₂ coinciden con la LT, así que las trazas no bastan: α se define con su tercera proyección.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: las trazas de α coinciden con la LT y la tercera proyección α₃ es una recta que pasa por el origen.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: alinear los puntos de perfil sin pasar por el origen. Así α es paralelo a la LT, pero no la contiene.
4. [ ] *cumplir una condición, dificultad 2*: Q no está en α, que pasa por tres puntos de distintos cuadrantes. Llévalo hasta α.
   - [ ] *Pista 1:* Un punto está en un plano si está en una recta del plano.
   - [ ] *Pista 2:* La recta r, por A y B, está en α: lleva Q sobre r.
   - [ ] *Pista 3:* Mueve Q hasta que Q′ esté en r′ y Q″ esté en r″.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* El plano α pasa por A, B y C, y Q está fuera de él. Queremos llevar Q hasta α.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Un punto está en un plano si está en una recta del plano. La recta r, que pasa por A y por B, está contenida en α.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Lleva Q sobre r: sus proyecciones Q′ y Q″ tienen que estar en r′ y r″, en la misma línea de referencia.
   - [ ] *Solución, paso 4 · 4. El trazado:* En la lámina, Q′ queda sobre r′ y Q″ sobre r″, y los dos en una misma perpendicular a la LT.
   - [ ] *Solución, paso 5 · 4. El trazado:* Como r está en α, cualquier punto de r está en α: Q pertenece al plano.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: Q′ está en r′, Q″ está en r″ y el aviso de distancia de Q a α da cero.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: poner Q′ en r′ y olvidar Q″. Con una sola proyección sobre r no basta: las dos tienen que estar sobre r.
5. [ ] *cumplir una condición, dificultad 2*: Los puntos A, B y C están en distintos cuadrantes. Mueve B hasta que α sea paralelo a la LT.
   - [ ] *Pista 1:* Un plano paralelo a la LT contiene una recta paralela a la LT.
   - [ ] *Pista 2:* Hay que igualar la cota y el alejamiento de dos de sus puntos.
   - [ ] *Pista 3:* Mueve uno de ellos hasta que sus dos proyecciones queden paralelas a la LT.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* El plano α pasa por A, B y C. Queremos que sea paralelo a la LT.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Un plano es paralelo a la LT si contiene una recta paralela a la LT. Entonces sus trazas α₁ y α₂ son paralelas a la LT.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Mueve B hasta que la recta AB sea paralela a la LT: toma la cota de A, 20 mm, y su alejamiento, 25 mm.
   - [ ] *Solución, paso 4 · 4. El trazado:* En la lámina, A′B′ y A″B″ son paralelas a la LT: α contiene una recta paralela a la LT.
   - [ ] *Solución, paso 5 · 4. El trazado:* Las trazas α₁ y α₂ salen paralelas a la LT: el plano es paralelo a ella y no la corta.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: A y B tienen la misma cota, 20 mm, y el mismo alejamiento, 25 mm; α₁ y α₂ son paralelas a la LT.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: igualar solo la cota de AB. Así la recta es horizontal, pero α₁ no sale paralela a la LT.
6. [ ] *cumplir una condición, dificultad 2*: Mueve C hasta que el plano α contenga a la LT. Los tres puntos están en distintos cuadrantes.
   - [ ] *Pista 1:* Un plano que contiene a la LT tiene las dos trazas sobre ella.
   - [ ] *Pista 2:* En la vista de perfil, sus puntos están alineados con el origen.
   - [ ] *Pista 3:* Mueve un punto hasta que su cota y su alejamiento mantengan la razón de los otros dos.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* El plano α pasa por A, B y C. Queremos que contenga a la LT.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Un plano contiene a la LT si, visto de perfil, sus puntos están alineados con el origen, donde la LT se ve como un punto.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Mueve C hasta que, visto de perfil, A, B y C estén alineados con el origen, donde está la LT.
   - [ ] *Solución, paso 4 · 4. El trazado:* En la vista de perfil, A, B y C están sobre una recta que pasa por el origen: el plano contiene a la LT.
   - [ ] *Solución, paso 5 · 4. El trazado:* En la lámina, α₁ y α₂ coinciden con la LT, así que las trazas no bastan: α se define con su tercera proyección.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: las trazas de α coinciden con la LT y la tercera proyección α₃ es una recta que pasa por el origen.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: alinear los puntos de perfil sin pasar por el origen. Así α es paralelo a la LT, pero no la contiene.
7. [ ] *cumplir una condición, dificultad 3*: Como en la PAU: lleva Q hasta α, en la prolongación de la recta r y fuera del segmento AB.
   - [ ] *Pista 1:* Un punto está en un plano si está en una recta del plano.
   - [ ] *Pista 2:* La recta r, por A y B, está en α: lleva Q sobre r.
   - [ ] *Pista 3:* Mueve Q hasta que Q′ esté en r′ y Q″ esté en r″.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* El plano α pasa por A, B y C, y Q está fuera de él. Queremos llevar Q hasta α.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Un punto está en un plano si está en una recta del plano. La recta r, que pasa por A y por B, está contenida en α.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Lleva Q sobre r: sus proyecciones Q′ y Q″ tienen que estar en r′ y r″, en la misma línea de referencia.
   - [ ] *Solución, paso 4 · 4. El trazado:* En la lámina, Q′ queda sobre r′ y Q″ sobre r″, y los dos en una misma perpendicular a la LT.
   - [ ] *Solución, paso 5 · 4. El trazado:* Como r está en α, cualquier punto de r está en α: Q pertenece al plano.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: Q′ está en r′, Q″ está en r″ y el aviso de distancia de Q a α da cero.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: poner Q′ en r′ y olvidar Q″. Con una sola proyección sobre r no basta: las dos tienen que estar sobre r.
8. [ ] *cumplir una condición, dificultad 3*: Como en la PAU: mueve C hasta que α sea paralelo a la LT. Después comprueba sus trazas.
   - [ ] *Pista 1:* Un plano paralelo a la LT contiene una recta paralela a la LT.
   - [ ] *Pista 2:* Hay que igualar la cota y el alejamiento de dos de sus puntos.
   - [ ] *Pista 3:* Mueve uno de ellos hasta que sus dos proyecciones queden paralelas a la LT.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* El plano α pasa por A, B y C. Queremos que sea paralelo a la LT.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Un plano es paralelo a la LT si contiene una recta paralela a la LT. Entonces sus trazas α₁ y α₂ son paralelas a la LT.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Mueve C hasta que la recta AC sea paralela a la LT: toma la cota de A, −25 mm, y su alejamiento, −20 mm.
   - [ ] *Solución, paso 4 · 4. El trazado:* En la lámina, A′C′ y A″C″ son paralelas a la LT: α contiene una recta paralela a la LT.
   - [ ] *Solución, paso 5 · 4. El trazado:* Las trazas α₁ y α₂ salen paralelas a la LT: el plano es paralelo a ella y no la corta.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: A y C tienen la misma cota, −25 mm, y el mismo alejamiento, −20 mm; α₁ y α₂ son paralelas a la LT.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: igualar solo la cota de AC. Así la recta es horizontal, pero α₁ no sale paralela a la LT.
9. [ ] *cumplir una condición, dificultad 3*: Como en la PAU: mueve A y B hasta que α contenga a la LT, con C ya en su sitio.
   - [ ] *Pista 1:* Un plano que contiene a la LT tiene las dos trazas sobre ella.
   - [ ] *Pista 2:* En la vista de perfil, sus puntos están alineados con el origen.
   - [ ] *Pista 3:* Mueve un punto hasta que su cota y su alejamiento mantengan la razón de los otros dos.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* El plano α pasa por A, B y C. Queremos que contenga a la LT.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Un plano contiene a la LT si, visto de perfil, sus puntos están alineados con el origen, donde la LT se ve como un punto.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Mueve A hasta que su cota sea igual a su alejamiento, como la de C: así A queda alineado con el origen en la vista de perfil.
   - [ ] *Solución, paso 4 · 3. El movimiento:* Mueve B igual: su cota pasa a ser su alejamiento. Ahora A, B y C tienen cota y alejamiento iguales.
   - [ ] *Solución, paso 5 · 4. El trazado:* En la vista de perfil, A, B y C están sobre una recta que pasa por el origen: el plano contiene a la LT.
   - [ ] *Solución, paso 6 · 4. El trazado:* En la lámina, α₁ y α₂ coinciden con la LT, así que las trazas no bastan: α se define con su tercera proyección.
   - [ ] *Solución, paso 7 · 5. Comprobación:* Comprobación: las trazas de α coinciden con la LT y la tercera proyección α₃ es una recta que pasa por el origen.
   - [ ] *Solución, paso 8 · 6. Error típico:* **[REVISAR]** Error típico: alinear los puntos de perfil sin pasar por el origen. Así α es paralelo a la LT, pero no la contiene.

### II-05 · Tres métodos, un mismo problema

Fichero: `src/content/lessons/04-tres-metodos.json` · DT II · nivel Intermedio

- [ ] **Saber básico:** Sistema diédrico: métodos. Giro, cambio de plano y abatimiento para hallar verdaderas magnitudes.

**Pasos**

1. [ ] Queremos la verdadera magnitud del segmento AB. Está inclinado respecto a los dos planos de proyección.
2. [ ] En la lámina, A′B′ y A″B″ son más cortas que AB. Ninguna proyección sirve para medirlo.
3. [ ] Primer método, el giro: AB gira alrededor de un eje vertical que pasa por A. B describe un arco horizontal y su cota no cambia.
4. [ ] En la lámina, B′ recorre un arco con centro en e′ hasta que el segmento queda paralelo a la LT. Entonces A″B″₁ es la verdadera magnitud.
5. [ ] Segundo método, el cambio de plano: AB no se mueve y ponemos un plano vertical nuevo paralelo a él. Las proyectantes llegan al plano nuevo y cada punto conserva su cota.
6. [ ] En la lámina, la LT₁ es paralela a A′B′ y desde ella se lleva la cota de cada punto. A″₁B″₁ es la verdadera magnitud.
7. [ ] Tercer método, el abatimiento: el plano vertical que contiene AB gira como una bisagra alrededor de A′B′. Cae sobre el PH llevándose el segmento.
8. [ ] En la lámina, cada punto abatido está en la perpendicular a la charnela por su proyección, a la distancia que da un triángulo con su cota. (A)(B) es la verdadera magnitud.
9. [ ] Los tres métodos dan la misma medida. Elige un método con los botones y compara su movimiento con su trazado.

**Ejercicios**

1. [ ] *escribir una medida, dificultad 1* (respuesta: 61.8 mm): Con el giro ya hecho, mide en la lámina la verdadera magnitud de AB. Ayúdate de la cuadrícula de 10 mm.
   - [ ] *Pista 1:* Un segmento se ve en verdadera magnitud cuando es paralelo a un plano de proyección.
   - [ ] *Pista 2:* Gira AB alrededor de un eje vertical que pasa por A hasta que sea paralelo al PV.
   - [ ] *Pista 3:* En la planta, gira B′ con centro en A′ hasta que A′B₁′ quede paralela a la LT.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* A y B están a distinta cota y distinto alejamiento: AB no es paralelo a ningún plano de proyección. Por eso ninguna proyección mide lo que mide AB.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La verdadera magnitud de AB aparece cuando lo ponemos paralelo a un plano de proyección: entonces ese plano lo ve sin deformarlo.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Giramos AB alrededor de un eje vertical que pasa por A. B describe una circunferencia horizontal y su cota no cambia.
   - [ ] *Solución, paso 4 · 4. El trazado:* En la planta, B′ gira con centro en A′ hasta que A′B₁′ es paralela a la LT.
   - [ ] *Solución, paso 5 · 4. El trazado:* B₁″ sube por su línea de referencia hasta la cota de B″. A″B₁″ es la verdadera magnitud.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: B₁″ está a la misma altura que B″, porque el giro alrededor de un eje vertical no cambia las cotas. Además, A″B₁″ mide 61,8 mm, más que A′B′ (58,5 mm) y que A″B″ (58,5 mm).
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: medir A″B″ y contestar 58,5 mm. AB no es paralelo al PV, así que A″B″ queda más corta que la verdadera magnitud, 61,8 mm.
2. [ ] *escribir una medida, dificultad 1* (respuesta: 50 mm): AB tiene sus dos extremos al mismo alejamiento. Abátela sobre el PH y mide su verdadera magnitud; ayúdate de la cuadrícula de 10 mm.
   - [ ] *Pista 1:* Si abatimos el plano que contiene a AB, el segmento llega a la lámina sin deformarse, esté como esté.
   - [ ] *Pista 2:* La charnela es la traza horizontal de ese plano vertical, y cada punto cae a una distancia de ella igual a su cota.
   - [ ] *Pista 3:* Traza por A′ y B′ las perpendiculares a la charnela y lleva sobre ellas las cotas de A y B.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* A y B están al mismo alejamiento: AB es paralela al PV y su alzado A″B″ parece conservar el tamaño real. Veamos qué da el abatimiento.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Al abatir el plano que contiene a AB, el segmento llega a la lámina sin deformarse: lo que importa es la bisagra y la distancia de cada punto a ella.
   - [ ] *Solución, paso 3 · 3. El movimiento:* El plano vertical que contiene a AB gira como una bisagra alrededor de su traza horizontal, hasta quedar sobre el PH. AB gira con él sin deformarse.
   - [ ] *Solución, paso 4 · 4. El trazado:* La charnela es la traza horizontal del plano proyectante de AB: pasa por A′B′. Traza por A′ y B′ las perpendiculares a ella.
   - [ ] *Solución, paso 5 · 4. El trazado:* Lleva sobre cada perpendicular la cota del punto, medida desde la charnela. El segmento (A)(B) es la verdadera magnitud.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: (A)(B) es la hipotenusa del triángulo de catetos A′B′ (40 mm) y la diferencia de cotas (30 mm). Mide 50 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: medir A′B′, que da 40 mm, y contestar eso. AB es paralela al PV y no al PH, así que su planta sale más corta que la verdadera magnitud, 50 mm.
3. [ ] *escribir una medida, dificultad 1* (respuesta: 60 mm): AB tiene sus dos extremos a la misma cota. Usa un cambio de plano vertical y mide su verdadera magnitud; ayúdate de la cuadrícula de 10 mm.
   - [ ] *Pista 1:* Un segmento se ve sin deformar sobre un plano que sea paralelo a él, con las proyectantes perpendiculares a ese plano.
   - [ ] *Pista 2:* Coloca un plano vertical nuevo paralelo a AB: su traza, la LT₁, es paralela a A′B′.
   - [ ] *Pista 3:* Traza la LT₁ paralela a A′B′ y lleva sobre las perpendiculares las cotas de A y B.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* A y B tienen la misma cota: AB es paralela al PH y su planta A′B′ parece conservar el tamaño real. Veamos qué da el cambio de plano.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Si proyectamos sobre un plano nuevo paralelo a AB, el segmento se ve sin deformar y las cotas se conservan.
   - [ ] *Solución, paso 3 · 3. El movimiento:* AB no se mueve: colocamos un plano vertical nuevo, paralelo a AB, y proyectamos sobre él. En ese plano AB se ve sin deformar.
   - [ ] *Solución, paso 4 · 4. El trazado:* Traza la LT₁ paralela a A′B′. Por A′ y B′ traza las perpendiculares a la LT₁.
   - [ ] *Solución, paso 5 · 4. El trazado:* Lleva sobre ellas la cota de cada punto, medida desde la LT. A″₁B″₁ es la verdadera magnitud.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: al cambiar de plano vertical las cotas no cambian, así que A″₁ y B″₁ quedan sobre la LT₁ a la misma altura que A″ y B″ sobre la LT. Mide 60 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: medir A″B″, que da 48 mm, y contestar eso. AB es paralela al PH y no al PV, así que su alzado sale más corto que la verdadera magnitud, 60 mm.
4. [ ] *escribir una medida, dificultad 2* (respuesta: 55.2 mm): Elige el método que prefieras y mide la verdadera magnitud de AB en milímetros.
   - [ ] *Pista 1:* Los tres métodos llevan AB a una posición en la que se ve sin deformar: elige el que te resulte más claro.
   - [ ] *Pista 2:* Con el abatimiento, el plano vertical que contiene a AB gira sobre su traza horizontal hasta caer en el PH.
   - [ ] *Pista 3:* Traza por A′ y B′ las perpendiculares a la charnela y lleva sobre ellas las cotas de A y B.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* A y B están a distinto alejamiento y distinta cota: AB no es paralela a ningún plano de proyección. Por eso ninguna proyección mide AB.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Los tres métodos llevan AB a una posición en la que es paralela a un plano de proyección. Aquí elegimos el abatimiento.
   - [ ] *Solución, paso 3 · 3. El movimiento:* El plano vertical que contiene a AB gira como una bisagra alrededor de su traza horizontal, hasta quedar sobre el PH. AB gira con él sin deformarse.
   - [ ] *Solución, paso 4 · 4. El trazado:* La charnela es la traza horizontal del plano proyectante de AB: pasa por A′B′. Traza por A′ y B′ las perpendiculares a ella.
   - [ ] *Solución, paso 5 · 4. El trazado:* Lleva sobre cada perpendicular la cota del punto, medida desde la charnela. El segmento (A)(B) es la verdadera magnitud.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: (A)(B) es la hipotenusa del triángulo de catetos A′B′ (49,2 mm) y la diferencia de cotas (25 mm). Mide 55,2 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: llevar sobre las perpendiculares a la charnela los alejamientos en vez de las cotas. En el abatimiento sobre el PH, la distancia de cada punto a la charnela es su cota.
5. [ ] *escribir una medida, dificultad 2* (respuesta: 28.2 °): Halla el ángulo que forma la recta AB con el PV. Gira AB alrededor de un eje de punta y escribe el ángulo en grados.
   - [ ] *Pista 1:* El ángulo de una recta con el PV se ve cuando la recta se pone paralela al PH.
   - [ ] *Pista 2:* Un giro de eje de punta mantiene los alejamientos y lleva AB a una posición paralela al PH.
   - [ ] *Pista 3:* En el alzado, gira B″ con centro en A″ hasta que A″B₁″ quede paralela a la LT.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* A y B están a distinto alejamiento y distinta cota: AB no es paralela a ningún plano de proyección. Sus proyecciones no muestran su ángulo con el PV.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Una recta paralela al PH muestra en planta su verdadera magnitud y su ángulo con el PV. Basta con girar AB hasta dejarla en esa posición.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Giramos AB alrededor de un eje de punta que pasa por A, perpendicular al PV. B describe una circunferencia frontal y su alejamiento no cambia.
   - [ ] *Solución, paso 4 · 4. El trazado:* En el alzado, gira B″ con centro en A″ hasta que A″B₁″ quede paralela a la LT.
   - [ ] *Solución, paso 5 · 4. El trazado:* Baja B₁″ por su línea de referencia hasta la paralela a la LT que pasa por B′: ese punto es B₁′. El ángulo de A′B₁′ con la LT es el que AB forma con el PV.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: B₁′ conserva el alejamiento de B′, porque el giro de eje de punta no cambia los alejamientos. El ángulo mide 28,2°.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: medir con el transportador el ángulo que A′B′ forma con la LT. Es el de la proyección, no el de AB, que solo se lee cuando AB está paralela al PH.
6. [ ] *escribir una medida, dificultad 2* (respuesta: 57.3 mm): Abate sobre el PV el plano proyectante de AB y mide la verdadera magnitud del segmento en milímetros.
   - [ ] *Pista 1:* Abatir sobre el PV es girar el plano que contiene a AB y es perpendicular al PV, hasta que quede sobre él.
   - [ ] *Pista 2:* La charnela es la traza vertical de ese plano, y cada punto cae a una distancia de ella igual a su alejamiento.
   - [ ] *Pista 3:* Traza por A″ y B″ las perpendiculares a la charnela y lleva sobre ellas los alejamientos de A y B.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* A y B están a distinto alejamiento y distinta cota: AB no es paralela a ningún plano de proyección. Por eso ninguna proyección mide AB.
   - [ ] *Solución, paso 2 · 2. La idea clave:* El plano que contiene a AB y es perpendicular al PV se puede abatir sobre el PV sin deformar nada de lo que hay en él, segmento incluido.
   - [ ] *Solución, paso 3 · 3. El movimiento:* El plano proyectante de AB sobre el PV gira como una bisagra alrededor de su traza vertical, hasta quedar sobre el PV. AB gira con él sin deformarse.
   - [ ] *Solución, paso 4 · 4. El trazado:* La charnela es la traza vertical del plano proyectante de AB: pasa por A″B″. Traza por A″ y B″ las perpendiculares a ella.
   - [ ] *Solución, paso 5 · 4. El trazado:* Lleva sobre cada perpendicular el alejamiento del punto, medido desde la charnela. El segmento (A)(B) es la verdadera magnitud.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: (A)(B) es la hipotenusa del triángulo de catetos A″B″ (52,5 mm) y la diferencia de alejamientos (23 mm). Mide 57,3 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: abatir sobre el PV llevando las cotas en vez de los alejamientos. La distancia de cada punto a la charnela es su alejamiento, y la cota ya está en el alzado.
7. [ ] *escribir una medida, dificultad 3* (respuesta: 33 °): Como en la PAU: halla el ángulo que forma la recta AB con el PH. Usa el cambio de plano y escribe el ángulo en grados.
   - [ ] *Pista 1:* El ángulo de una recta con el PH se lee cuando un plano vertical nuevo es paralelo a la recta.
   - [ ] *Pista 2:* Con un cambio de plano vertical, la LT₁ es paralela a A′B′ y las cotas no cambian.
   - [ ] *Pista 3:* Traza la LT₁ paralela a A′B′ y lleva sobre las perpendiculares las cotas de A y B.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* A y B están a distinto alejamiento y distinta cota, y AB asciende hacia atrás: no es paralela a ningún plano de proyección. Sus proyecciones no muestran su ángulo con el PH.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Un plano vertical nuevo, paralelo a AB, ve la recta en verdadera magnitud y con su ángulo con el PH. Como el PH no cambia, ese ángulo es el que buscamos.
   - [ ] *Solución, paso 3 · 3. El movimiento:* AB no se mueve: colocamos un plano vertical nuevo, paralelo a AB, y proyectamos sobre él. En ese plano AB se ve sin deformar y con su inclinación sobre el PH.
   - [ ] *Solución, paso 4 · 4. El trazado:* Traza la LT₁ paralela a A′B′. Por A′ y B′ traza las perpendiculares a la LT₁.
   - [ ] *Solución, paso 5 · 4. El trazado:* Lleva sobre ellas la cota de cada punto, medida desde la LT. El ángulo de A″₁B″₁ con la LT₁ es el que AB forma con el PH.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: al cambiar de plano vertical las cotas no cambian, así que A″₁ y B″₁ quedan sobre la LT₁ a la misma altura que A″ y B″ sobre la LT. El ángulo mide 33°.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: medir con el transportador el ángulo que A″B″ forma con la LT. Es el de la proyección vertical, no el de AB con el PH.
8. [ ] *escribir una medida, dificultad 3* (respuesta: 29.5 °): Como en la PAU: halla el ángulo que forma la recta AB con el PV. Usa el cambio de plano y escribe el ángulo en grados.
   - [ ] *Pista 1:* El ángulo de una recta con el PV se lee cuando un plano horizontal nuevo es paralelo a la recta.
   - [ ] *Pista 2:* Con un cambio de plano horizontal, la LT₁ es paralela a A″B″ y los alejamientos no cambian.
   - [ ] *Pista 3:* Traza la LT₁ paralela a A″B″ y lleva sobre las perpendiculares los alejamientos de A y B.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* A y B están a distinto alejamiento y distinta cota, y AB desciende hacia delante: no es paralela a ningún plano de proyección. Sus proyecciones no muestran su ángulo con el PV.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Un plano horizontal nuevo, paralelo a AB, ve la recta en verdadera magnitud y con su ángulo con el PV. Como el PV no cambia, ese ángulo es el que buscamos.
   - [ ] *Solución, paso 3 · 3. El movimiento:* AB no se mueve: colocamos un plano horizontal nuevo, paralelo a AB, y proyectamos sobre él. En ese plano AB se ve sin deformar y con su inclinación sobre el PV.
   - [ ] *Solución, paso 4 · 4. El trazado:* Traza la LT₁ paralela a A″B″. Por A″ y B″ traza las perpendiculares a la LT₁.
   - [ ] *Solución, paso 5 · 4. El trazado:* Lleva sobre ellas el alejamiento de cada punto, medido desde la LT. El ángulo de A′₁B′₁ con la LT₁ es el que AB forma con el PV.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: al cambiar de plano horizontal los alejamientos no cambian, así que A′₁ y B′₁ quedan sobre la LT₁ a la misma distancia que A′ y B′ de la LT. El ángulo mide 29,5°.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: cambiar de plano vertical para medir el ángulo con el PV. Con un plano vertical nuevo se lee el ángulo con el PH, y el de A′B′ con la LT es el de la proyección.
9. [ ] *escribir una medida, dificultad 3* (respuesta: 21 °): Como en la PAU: halla el ángulo que forma la recta AB con el PV. Abate sobre el PV el plano proyectante de AB y escribe el ángulo en grados.
   - [ ] *Pista 1:* El ángulo de una recta con el PV se lee en el plano que la contiene y es perpendicular al PV, una vez abatido.
   - [ ] *Pista 2:* Abate ese plano sobre el PV: la charnela es la traza vertical, y cada punto cae a una distancia de ella igual a su alejamiento.
   - [ ] *Pista 3:* Traza por A″ y B″ las perpendiculares a la charnela, lleva los alejamientos y mide el ángulo de (A)(B) con la charnela.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* A y B están a distinto alejamiento y distinta cota, y AB sube hacia atrás: no es paralela a ningún plano de proyección. Sus proyecciones no muestran su ángulo con el PV.
   - [ ] *Solución, paso 2 · 2. La idea clave:* En el plano proyectante de AB sobre el PV, la recta y su proyección A″B″ forman el ángulo con el PV. Al abatir ese plano, el ángulo se ve sin deformar.
   - [ ] *Solución, paso 3 · 3. El movimiento:* El plano proyectante de AB sobre el PV gira como una bisagra alrededor de su traza vertical, hasta quedar sobre el PV. AB gira con él sin deformarse.
   - [ ] *Solución, paso 4 · 4. El trazado:* La charnela es la traza vertical del plano proyectante de AB: pasa por A″B″. Traza por A″ y B″ las perpendiculares a ella.
   - [ ] *Solución, paso 5 · 4. El trazado:* Lleva sobre cada perpendicular el alejamiento del punto, medido desde la charnela. El ángulo de (A)(B) con la charnela es el que AB forma con el PV.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: (A)(B) es la hipotenusa del triángulo de catetos A″B″ (65,2 mm) y la diferencia de alejamientos (25 mm). El ángulo mide 21°.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: medir el ángulo entre A″B″ y la LT. Es la inclinación del alzado, no la de AB con el PV: el ángulo se mide entre (A)(B) y la charnela.

### II-08 · Sección de una pirámide por un plano proyectante

Fichero: `src/content/lessons/05-seccion-piramide.json` · DT II · nivel Intermedio

- [ ] **Saber básico:** Sistema diédrico: pirámides. Sección por un plano proyectante, verdadera magnitud y desarrollo del tronco.

**Pasos**

1. [ ] Esta es una pirámide pentagonal regular apoyada en el PH. Su base está en un plano horizontal, así que en la planta se ve en verdadera magnitud.
2. [ ] En la lámina, las aristas vistas van con línea continua gruesa y las ocultas, discontinua fina. Una arista es oculta cuando las dos caras que la forman miran hacia el otro lado.
3. [ ] El plano α es proyectante vertical: es perpendicular al PV. Por eso en el alzado se ve de canto, como una recta: su traza α₂.
4. [ ] Al cortar, el plano deja en la pirámide un polígono: la sección. Sus vértices son los puntos donde el plano corta a las aristas laterales.
5. [ ] En el alzado, los puntos 1″ a 5″ están donde α₂ corta a las aristas. Con líneas de referencia se llevan a la planta, cada uno sobre su misma arista.
6. [ ] Retiramos la parte de arriba: queda un tronco de pirámide con la sección como cara nueva. En la planta la sección no está en verdadera magnitud, porque α no es horizontal.
7. [ ] Para ver la sección en verdadera magnitud, abatimos α sobre el PV. Gira como una bisagra alrededor de su traza α₂, que es la charnela.
8. [ ] Como α es perpendicular al PV, cada punto abatido está en la perpendicular a α₂ por su proyección vertical, a una distancia igual a su alejamiento. El polígono (1)…(5) es la sección en verdadera magnitud.
9. [ ] Por último, el desarrollo del tronco: sus caras se despliegan sobre el PH y la sección queda como una línea quebrada. Es la plantilla para construir la pieza en papel.

**Ejercicios**

1. [ ] *escribir una medida, dificultad 1* (respuesta: 21.9 mm): Mide en la lámina la verdadera magnitud del lado (1)(2) de la sección. Usa la cuadrícula de 10 mm.
   - [ ] *Pista 1:* La sección se ve en verdadera magnitud cuando se abate el plano de corte.
   - [ ] *Pista 2:* El plano de corte es proyectante vertical y su traza α₂ forma 45° con la LT: pasa por los puntos de corte de las aristas.
   - [ ] *Pista 3:* Abate los vértices de la sección sobre el PV, alrededor de α₂, y mide el lado entre los vértices (1) y (2).
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Una pirámide apoyada en el PH y un plano de corte α perpendicular al PV. En el alzado, α se ve de canto: es la recta α₂.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La sección es el polígono donde α corta a las caras de la pirámide. Para verla sin deformar hay que ponerla paralela a un plano de proyección.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Retiramos la parte de arriba y abatimos α sobre el PV, girando alrededor de su traza α₂. Cada vértice de la sección describe un arco.
   - [ ] *Solución, paso 4 · 4. El trazado:* En el alzado, α₂ corta a las aristas en los vértices de la sección. Bájalos a la planta por sus líneas de referencia.
   - [ ] *Solución, paso 5 · 4. El trazado:* Abate cada vértice sobre el PV, alrededor de α₂, a una distancia igual a su alejamiento. Los vértices abatidos forman la sección en verdadera magnitud.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Mide con la cuadrícula: la sección tiene 4 lados, de 10,4 mm el menor y de 23,6 mm el mayor. La respuesta pedida es 21,9 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: medir los lados de la sección en la planta o en el alzado. Allí la sección está inclinada o de canto y sale más corta que en verdadera magnitud.
2. [ ] *escribir una medida, dificultad 1* (respuesta: 28.3 mm): El plano de corte α es paralelo al PV. Abátelo sobre el PH y mide el lado más largo de la sección; ayúdate de la cuadrícula de 10 mm.
   - [ ] *Pista 1:* Un plano paralelo al PV es perpendicular al PH, así que se puede abatir sobre el PH.
   - [ ] *Pista 2:* La traza α₁ del plano es paralela a la LT y pasa por los puntos de corte de las aristas.
   - [ ] *Pista 3:* Abate los vértices de la sección sobre el PH, alrededor de α₁, y mide el lado más largo.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Una pirámide apoyada en el PH y un plano de corte α paralelo al PV. En la planta, α se ve de canto: es una recta α₁ paralela a la LT.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Un plano paralelo al PV muestra en el alzado la sección sin deformar. Aquí lo comprobamos abatiéndolo sobre el PH.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Retiramos la parte de arriba y abatimos α sobre el PH, girando alrededor de su traza α₁. Cada vértice de la sección describe un cuarto de circunferencia.
   - [ ] *Solución, paso 4 · 4. El trazado:* En la planta, los vértices de la sección están donde α₁ corta a las aristas. Llévalos al alzado por sus líneas de referencia para conocer sus cotas.
   - [ ] *Solución, paso 5 · 4. El trazado:* Abate cada vértice sobre el PH, alrededor de α₁, a una distancia igual a su cota. Los vértices abatidos forman la sección en verdadera magnitud.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Mide con la cuadrícula: la sección tiene 4 lados, de 12,4 mm el menor y de 28,3 mm el mayor. La respuesta pedida es 28,3 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: tomar como lados de la sección los trozos de α₁ que se ven en la planta. Allí α está de canto y la sección es una línea, no un polígono.
3. [ ] *escribir una medida, dificultad 1* (respuesta: 20.8 mm): El plano de corte α es paralelo al PV y corta a una pirámide triangular. ¿Cuánto mide el lado más corto de la sección en verdadera magnitud?
   - [ ] *Pista 1:* Un plano paralelo al PV es perpendicular al PH, así que se puede abatir sobre el PH.
   - [ ] *Pista 2:* La traza α₁ del plano es paralela a la LT y pasa por los puntos de corte de las aristas.
   - [ ] *Pista 3:* Abate los vértices de la sección sobre el PH, alrededor de α₁, y mide el lado más corto.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Una pirámide triangular apoyada en el PH y un plano de corte α paralelo al PV. En la planta, α se ve de canto: es una recta α₁ paralela a la LT.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Un plano paralelo al PV muestra en el alzado la sección sin deformar. Aquí lo comprobamos abatiéndolo sobre el PH.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Retiramos la parte de arriba y abatimos α sobre el PH, girando alrededor de su traza α₁. Cada vértice de la sección describe un cuarto de circunferencia.
   - [ ] *Solución, paso 4 · 4. El trazado:* En la planta, los vértices de la sección están donde α₁ corta a las aristas. Llévalos al alzado por sus líneas de referencia para conocer sus cotas.
   - [ ] *Solución, paso 5 · 4. El trazado:* Abate cada vértice sobre el PH, alrededor de α₁, a una distancia igual a su cota. Los vértices abatidos forman la sección en verdadera magnitud.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Mide con la cuadrícula: la sección tiene 4 lados, de 20,8 mm el menor y de 34,6 mm el mayor. La respuesta pedida es 20,8 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: tomar como lados de la sección los trozos de α₁ que se ven en la planta. Allí α está de canto y la sección es una línea, no un polígono.
4. [ ] *escribir una medida, dificultad 2* (respuesta: 18.2 mm): Otra pirámide, otro corte. ¿Cuánto mide el lado más largo de la sección en verdadera magnitud?
   - [ ] *Pista 1:* La sección se ve en verdadera magnitud cuando se abate el plano de corte.
   - [ ] *Pista 2:* El plano de corte es proyectante vertical: su traza α₂ pasa por los puntos de corte de las aristas.
   - [ ] *Pista 3:* Abate los vértices de la sección sobre el PV, alrededor de α₂, y mide lo que pide el enunciado.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Una pirámide apoyada en el PH y un plano de corte α perpendicular al PV. En el alzado, α se ve de canto: es la recta α₂.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La sección es el polígono donde α corta a las caras de la pirámide. Para verla sin deformar hay que ponerla paralela a un plano de proyección.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Retiramos la parte de arriba y abatimos α sobre el PV, girando alrededor de su traza α₂. Cada vértice de la sección describe un arco.
   - [ ] *Solución, paso 4 · 4. El trazado:* En el alzado, α₂ corta a las aristas en los vértices de la sección. Bájalos a la planta por sus líneas de referencia.
   - [ ] *Solución, paso 5 · 4. El trazado:* Abate cada vértice sobre el PV, alrededor de α₂, a una distancia igual a su alejamiento. Los vértices abatidos forman la sección en verdadera magnitud.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Mide con la cuadrícula: la sección tiene 4 lados, de 13,8 mm el menor y de 18,2 mm el mayor. La respuesta pedida es 18,2 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: medir los lados de la sección en la planta o en el alzado. Allí la sección está inclinada o de canto y sale más corta que en verdadera magnitud.
5. [ ] *escribir una medida, dificultad 2* (respuesta: 22.1 mm): Pirámide triangular cortada por un plano proyectante vertical. ¿Cuánto mide el lado más largo de la sección en verdadera magnitud?
   - [ ] *Pista 1:* La sección se ve en verdadera magnitud cuando se abate el plano de corte.
   - [ ] *Pista 2:* El plano de corte es proyectante vertical: su traza α₂ pasa por los puntos de corte de las aristas.
   - [ ] *Pista 3:* Abate los vértices de la sección sobre el PV, alrededor de α₂, y mide lo que pide el enunciado.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Una pirámide apoyada en el PH y un plano de corte α perpendicular al PV. En el alzado, α se ve de canto: es la recta α₂.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La sección es el polígono donde α corta a las caras de la pirámide. Para verla sin deformar hay que ponerla paralela a un plano de proyección.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Retiramos la parte de arriba y abatimos α sobre el PV, girando alrededor de su traza α₂. Cada vértice de la sección describe un arco.
   - [ ] *Solución, paso 4 · 4. El trazado:* En el alzado, α₂ corta a las aristas en los vértices de la sección. Bájalos a la planta por sus líneas de referencia.
   - [ ] *Solución, paso 5 · 4. El trazado:* Abate cada vértice sobre el PV, alrededor de α₂, a una distancia igual a su alejamiento. Los vértices abatidos forman la sección en verdadera magnitud.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Mide con la cuadrícula: la sección tiene 3 lados, de 17,2 mm el menor y de 22,1 mm el mayor. La respuesta pedida es 22,1 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: medir los lados de la sección en la planta o en el alzado. Allí la sección está inclinada o de canto y sale más corta que en verdadera magnitud.
6. [ ] *escribir una medida, dificultad 2* (respuesta: 35.8 mm): Pirámide cuadrangular cortada por un plano perpendicular al PH. Abate la sección sobre el PH y mide su lado más corto.
   - [ ] *Pista 1:* La sección se ve en verdadera magnitud cuando se abate el plano de corte.
   - [ ] *Pista 2:* El plano de corte es perpendicular al PH: su traza α₁ pasa por los puntos de corte de las aristas.
   - [ ] *Pista 3:* Abate los vértices de la sección sobre el PH, alrededor de α₁, y mide lo que pide el enunciado.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Una pirámide apoyada en el PH y un plano de corte α perpendicular al PH. En la planta, α se ve de canto: es la recta α₁.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La sección se ve sin deformar cuando su plano es paralelo a uno de proyección. Como α es perpendicular al PH, basta con abatirlo sobre el PH.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Retiramos la parte de arriba y abatimos α sobre el PH, girando alrededor de su traza α₁. Cada vértice de la sección describe un cuarto de circunferencia.
   - [ ] *Solución, paso 4 · 4. El trazado:* En la planta, los vértices de la sección están donde α₁ corta a las aristas. Llévalos al alzado por sus líneas de referencia para conocer sus cotas.
   - [ ] *Solución, paso 5 · 4. El trazado:* Abate cada vértice sobre el PH, alrededor de α₁, a una distancia igual a su cota. Los vértices abatidos forman la sección en verdadera magnitud.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Mide con la cuadrícula: la sección tiene 3 lados, de 35,8 mm el menor y de 51,2 mm el mayor. La respuesta pedida es 35,8 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: tomar como lados de la sección los trozos de α₁ que se ven en la planta. Allí α está de canto y la sección es una línea, no un polígono.
7. [ ] *escribir una medida, dificultad 3* (respuesta: 15.7 mm): Como en la PAU: pirámide hexagonal regular cortada por un plano proyectante vertical. Halla la verdadera magnitud de la sección y mide su lado más largo.
   - [ ] *Pista 1:* La sección se ve en verdadera magnitud cuando se abate el plano de corte.
   - [ ] *Pista 2:* El plano de corte es proyectante vertical: su traza α₂ pasa por los puntos de corte de las aristas.
   - [ ] *Pista 3:* Abate los vértices de la sección sobre el PV, alrededor de α₂, y mide lo que pide el enunciado.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Una pirámide apoyada en el PH y un plano de corte α perpendicular al PV. En el alzado, α se ve de canto: es la recta α₂.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La sección es el polígono donde α corta a las caras de la pirámide. Para verla sin deformar hay que ponerla paralela a un plano de proyección.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Retiramos la parte de arriba y abatimos α sobre el PV, girando alrededor de su traza α₂. Cada vértice de la sección describe un arco.
   - [ ] *Solución, paso 4 · 4. El trazado:* En el alzado, α₂ corta a las aristas en los vértices de la sección. Bájalos a la planta por sus líneas de referencia.
   - [ ] *Solución, paso 5 · 4. El trazado:* Abate cada vértice sobre el PV, alrededor de α₂, a una distancia igual a su alejamiento. Los vértices abatidos forman la sección en verdadera magnitud.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Mide con la cuadrícula: la sección tiene 6 lados, de 11,8 mm el menor y de 15,7 mm el mayor. La respuesta pedida es 15,7 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: medir los lados de la sección en la planta o en el alzado. Allí la sección está inclinada o de canto y sale más corta que en verdadera magnitud.
8. [ ] *escribir una medida, dificultad 3* (respuesta: 71.1 mm): Como en la PAU: pirámide triangular cortada por un plano proyectante vertical. Halla la verdadera magnitud de la sección y calcula su perímetro.
   - [ ] *Pista 1:* La sección se ve en verdadera magnitud cuando se abate el plano de corte.
   - [ ] *Pista 2:* El plano de corte es proyectante vertical: su traza α₂ pasa por los puntos de corte de las aristas.
   - [ ] *Pista 3:* Abate los vértices de la sección sobre el PV, alrededor de α₂, y mide lo que pide el enunciado.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Una pirámide apoyada en el PH y un plano de corte α perpendicular al PV. En el alzado, α se ve de canto: es la recta α₂.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La sección es el polígono donde α corta a las caras de la pirámide. Para verla sin deformar hay que ponerla paralela a un plano de proyección.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Retiramos la parte de arriba y abatimos α sobre el PV, girando alrededor de su traza α₂. Cada vértice de la sección describe un arco.
   - [ ] *Solución, paso 4 · 4. El trazado:* En el alzado, α₂ corta a las aristas en los vértices de la sección. Bájalos a la planta por sus líneas de referencia.
   - [ ] *Solución, paso 5 · 4. El trazado:* Abate cada vértice sobre el PV, alrededor de α₂, a una distancia igual a su alejamiento. Los vértices abatidos forman la sección en verdadera magnitud.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Mide con la cuadrícula: la sección tiene 3 lados, de 22,3 mm el menor y de 25,1 mm el mayor. La respuesta pedida es 71,1 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: medir los lados de la sección en la planta o en el alzado. Allí la sección está inclinada o de canto y sale más corta que en verdadera magnitud.
9. [ ] *escribir una medida, dificultad 3* (respuesta: 43.8 mm): Como en la PAU: pirámide pentagonal cortada por un plano proyectante horizontal. Halla la verdadera magnitud de la sección y mide su lado más largo.
   - [ ] *Pista 1:* La sección se ve en verdadera magnitud cuando se abate el plano de corte.
   - [ ] *Pista 2:* El plano de corte es perpendicular al PH: su traza α₁ pasa por los puntos de corte de las aristas.
   - [ ] *Pista 3:* Abate los vértices de la sección sobre el PH, alrededor de α₁, y mide lo que pide el enunciado.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Una pirámide apoyada en el PH y un plano de corte α perpendicular al PH. En la planta, α se ve de canto: es la recta α₁.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La sección se ve sin deformar cuando su plano es paralelo a uno de proyección. Como α es perpendicular al PH, basta con abatirlo sobre el PH.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Retiramos la parte de arriba y abatimos α sobre el PH, girando alrededor de su traza α₁. Cada vértice de la sección describe un cuarto de circunferencia.
   - [ ] *Solución, paso 4 · 4. El trazado:* En la planta, los vértices de la sección están donde α₁ corta a las aristas. Llévalos al alzado por sus líneas de referencia para conocer sus cotas.
   - [ ] *Solución, paso 5 · 4. El trazado:* Abate cada vértice sobre el PH, alrededor de α₁, a una distancia igual a su cota. Los vértices abatidos forman la sección en verdadera magnitud.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Mide con la cuadrícula: la sección tiene 5 lados, de 6 mm el menor y de 43,8 mm el mayor. La respuesta pedida es 43,8 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: tomar como lados de la sección los trozos de α₁ que se ven en la planta. Allí α está de canto y la sección es una línea, no un polígono.

### I-01 · Mediatriz, bisectriz y arco capaz

Fichero: `src/content/lessons/06-lugares-geometricos.json` · DT I · nivel Inicial

- [ ] **Saber básico:** Trazados fundamentales en el plano. Lugares geométricos: mediatriz, bisectriz y arco capaz.

**Pasos**

1. [ ] Un lugar geométrico es el conjunto de puntos que cumplen una condición. Vamos a ver tres: la mediatriz, la bisectriz y el arco capaz.
2. [ ] Mediatriz de AB: con centro en A y luego en B, y la misma abertura del compás, trazamos dos arcos. Se cortan en M₁ y M₂.
3. [ ] La recta que pasa por M₁ y M₂ es la mediatriz. Es perpendicular a AB por su punto medio.
4. [ ] Arrastra P por la mediatriz: siempre está a la misma distancia de A que de B. La mediatriz es el lugar de los puntos que equidistan de A y de B.
5. [ ] Bisectriz del ángulo de vértice V: un arco con centro en V corta los lados en X₁ y X₂. Desde ellos, dos arcos iguales se cortan en Z.
6. [ ] La semirrecta VZ es la bisectriz. Arrastra Q por ella: está a la misma distancia de los dos lados del ángulo.
7. [ ] Arco capaz: el lugar de los puntos desde los que el segmento AB se ve con el mismo ángulo. Aquí, con 60°.
8. [ ] Arrastra P por el arco: el ángulo APB sigue midiendo 60°. Si P sale del arco, el ángulo ya no es 60°.

**Ejercicios**

1. [ ] *construcción en la lámina, dificultad 1*: Con A y B en una horizontal, arrastra X hasta el punto de la recta r que está a la misma distancia de A que de B.
   - [ ] *Pista 1:* El lugar geométrico de los puntos que equidistan de dos puntos es su mediatriz.
   - [ ] *Pista 2:* El punto buscado debe estar, además, en la recta r.
   - [ ] *Pista 3:* Traza la mediatriz de AB y busca dónde corta a r.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Hay dos puntos, A y B, y una recta r. Buscamos el punto de r que está a la misma distancia de A que de B.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Los puntos que equidistan de A y de B forman la mediatriz de AB. El punto buscado está en la mediatriz y en r, así que es su corte.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina un punto que se desliza por la recta r: sus distancias a A y a B van cambiando, y solo en una posición se igualan.
   - [ ] *Solución, paso 4 · 4. El trazado:* Con el compás en A y en B, con la misma abertura, traza arcos que se corten en dos puntos: la recta que los une es la mediatriz de AB.
   - [ ] *Solución, paso 5 · 4. El trazado:* La mediatriz corta a r en el punto T. Arrastra X hasta él.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: T equidista de A y de B, y está en r. Si r fuese paralela a la mediatriz, no habría solución.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: tomar el punto medio de AB. Está en la mediatriz, pero solo sirve si también está en r.
2. [ ] *construcción en la lámina, dificultad 1*: El triángulo ABC tiene un ángulo recto. Coloca X en el centro de la circunferencia que pasa por sus tres vértices.
   - [ ] *Pista 1:* El centro de la circunferencia que pasa por tres puntos equidista de los tres.
   - [ ] *Pista 2:* Los puntos que equidistan de dos vértices están en la mediatriz del lado que los une.
   - [ ] *Pista 3:* Traza las mediatrices de dos lados: su corte es el centro.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Tenemos un triángulo ABC y buscamos el centro de la circunferencia que pasa por sus tres vértices.
   - [ ] *Solución, paso 2 · 2. La idea clave:* El centro equidista de A, B y C, así que está en la mediatriz de cada lado. Dos mediatrices bastan para fijarlo: se cortan en el circuncentro.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina un punto que se desliza por la mediatriz de AB: siempre equidista de A y de B. Solo en una posición también equidista de C.
   - [ ] *Solución, paso 4 · 4. El trazado:* Traza la mediatriz del lado AB.
   - [ ] *Solución, paso 5 · 4. El trazado:* Traza la mediatriz del lado BC: se cortan en el circuncentro O. Arrastra X hasta él.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: la mediatriz del tercer lado también pasa por O, y O equidista de los tres vértices.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: tomar el baricentro, donde se cortan las medianas. El circuncentro está en las mediatrices, que son perpendiculares a los lados.
3. [ ] *construcción en la lámina, dificultad 1*: Con A y B en una horizontal, busca un punto de la recta r desde el que AB se vea con un ángulo de 45° y arrastra X hasta él.
   - [ ] *Pista 1:* El lugar geométrico de los puntos desde los que un segmento se ve con un ángulo dado es el arco capaz.
   - [ ] *Pista 2:* El punto buscado debe estar, además, en la recta r.
   - [ ] *Pista 3:* Traza el arco capaz de 45° de AB y busca dónde corta a r.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Hay un segmento AB y una recta r. Buscamos un punto de r desde el que AB se vea con un ángulo de 45°.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Los puntos desde los que un segmento se ve con un ángulo dado forman el arco capaz. El punto buscado está en el arco capaz y en r.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina un punto que recorre el arco: el ángulo bajo el que ve AB no cambia. Al salirse del arco, ese ángulo aumenta o disminuye.
   - [ ] *Solución, paso 4 · 4. El trazado:* Traza el arco capaz de 45° sobre AB: pasa por A y B, y su centro está en la mediatriz de AB.
   - [ ] *Solución, paso 5 · 4. El trazado:* El arco corta a r en dos puntos, T₁ y T₂. Arrastra X hasta uno de ellos.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: desde cada uno de los dos puntos, el segmento AB se ve con un ángulo de 45°, así que cualquiera de ellos sirve.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: usar el ángulo central en vez del inscrito. El ángulo central sobre AB sería el doble, y el arco no coincide con el arco capaz.
4. [ ] *construcción en la lámina, dificultad 2*: Arrastra X hasta el punto de la recta r, que está inclinada, que equidista de A y de B.
   - [ ] *Pista 1:* El lugar geométrico de los puntos que equidistan de dos puntos es su mediatriz.
   - [ ] *Pista 2:* El punto buscado debe estar, además, en la recta r.
   - [ ] *Pista 3:* Traza la mediatriz de AB y busca dónde corta a r.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Hay dos puntos, A y B, y una recta r. Buscamos el punto de r que está a la misma distancia de A que de B.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Los puntos que equidistan de A y de B forman la mediatriz de AB. El punto buscado está en la mediatriz y en r, así que es su corte.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina un punto que se desliza por la recta r: sus distancias a A y a B van cambiando, y solo en una posición se igualan.
   - [ ] *Solución, paso 4 · 4. El trazado:* Con el compás en A y en B, con la misma abertura, traza arcos que se corten en dos puntos: la recta que los une es la mediatriz de AB.
   - [ ] *Solución, paso 5 · 4. El trazado:* La mediatriz corta a r en el punto T. Arrastra X hasta él.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: T equidista de A y de B, y está en r. Si r fuese paralela a la mediatriz, no habría solución.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: tomar el punto medio de AB. Está en la mediatriz, pero solo sirve si también está en r.
5. [ ] *construcción en la lámina, dificultad 2*: Coloca X en el centro de la circunferencia que pasa por los tres vértices del triángulo ABC.
   - [ ] *Pista 1:* El centro de la circunferencia que pasa por tres puntos equidista de los tres.
   - [ ] *Pista 2:* Los puntos que equidistan de dos vértices están en la mediatriz del lado que los une.
   - [ ] *Pista 3:* Traza las mediatrices de dos lados: su corte es el centro.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Tenemos un triángulo ABC y buscamos el centro de la circunferencia que pasa por sus tres vértices.
   - [ ] *Solución, paso 2 · 2. La idea clave:* El centro equidista de A, B y C, así que está en la mediatriz de cada lado. Dos mediatrices bastan para fijarlo: se cortan en el circuncentro.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina un punto que se desliza por la mediatriz de AB: siempre equidista de A y de B. Solo en una posición también equidista de C.
   - [ ] *Solución, paso 4 · 4. El trazado:* Traza la mediatriz del lado AB.
   - [ ] *Solución, paso 5 · 4. El trazado:* Traza la mediatriz del lado BC: se cortan en el circuncentro O. Arrastra X hasta él.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: la mediatriz del tercer lado también pasa por O, y O equidista de los tres vértices.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: tomar el baricentro, donde se cortan las medianas. El circuncentro está en las mediatrices, que son perpendiculares a los lados.
6. [ ] *construcción en la lámina, dificultad 2*: Busca un punto de la recta r desde el que AB se vea con un ángulo de 45° y arrastra X hasta él.
   - [ ] *Pista 1:* El lugar geométrico de los puntos desde los que un segmento se ve con un ángulo dado es el arco capaz.
   - [ ] *Pista 2:* El punto buscado debe estar, además, en la recta r.
   - [ ] *Pista 3:* Traza el arco capaz de 45° de AB y busca dónde corta a r.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Hay un segmento AB y una recta r. Buscamos un punto de r desde el que AB se vea con un ángulo de 45°.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Los puntos desde los que un segmento se ve con un ángulo dado forman el arco capaz. El punto buscado está en el arco capaz y en r.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina un punto que recorre el arco: el ángulo bajo el que ve AB no cambia. Al salirse del arco, ese ángulo aumenta o disminuye.
   - [ ] *Solución, paso 4 · 4. El trazado:* Traza el arco capaz de 45° sobre AB: pasa por A y B, y su centro está en la mediatriz de AB.
   - [ ] *Solución, paso 5 · 4. El trazado:* El arco corta a r en dos puntos, T₁ y T₂. Arrastra X hasta uno de ellos.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: desde cada uno de los dos puntos, el segmento AB se ve con un ángulo de 45°, así que cualquiera de ellos sirve.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: usar el ángulo central en vez del inscrito. El ángulo central sobre AB sería el doble, y el arco no coincide con el arco capaz.
7. [ ] *construcción en la lámina, dificultad 3*: Como en la PAU: halla el punto de la recta r que equidista de A y de B y arrastra X hasta él.
   - [ ] *Pista 1:* El lugar geométrico de los puntos que equidistan de dos puntos es su mediatriz.
   - [ ] *Pista 2:* El punto buscado debe estar, además, en la recta r.
   - [ ] *Pista 3:* Traza la mediatriz de AB y busca dónde corta a r.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Hay dos puntos, A y B, y una recta r. Buscamos el punto de r que está a la misma distancia de A que de B.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Los puntos que equidistan de A y de B forman la mediatriz de AB. El punto buscado está en la mediatriz y en r, así que es su corte.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina un punto que se desliza por la recta r: sus distancias a A y a B van cambiando, y solo en una posición se igualan.
   - [ ] *Solución, paso 4 · 4. El trazado:* Con el compás en A y en B, con la misma abertura, traza arcos que se corten en dos puntos: la recta que los une es la mediatriz de AB.
   - [ ] *Solución, paso 5 · 4. El trazado:* La mediatriz corta a r en el punto T. Arrastra X hasta él.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: T equidista de A y de B, y está en r. Si r fuese paralela a la mediatriz, no habría solución.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: tomar el punto medio de AB. Está en la mediatriz, pero solo sirve si también está en r.
8. [ ] *construcción en la lámina, dificultad 3*: Como en la PAU: arrastra X hasta el centro de la circunferencia circunscrita al triángulo ABC.
   - [ ] *Pista 1:* El centro de la circunferencia que pasa por tres puntos equidista de los tres.
   - [ ] *Pista 2:* Los puntos que equidistan de dos vértices están en la mediatriz del lado que los une.
   - [ ] *Pista 3:* Traza las mediatrices de dos lados: su corte es el centro.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Tenemos un triángulo ABC y buscamos el centro de la circunferencia que pasa por sus tres vértices.
   - [ ] *Solución, paso 2 · 2. La idea clave:* El centro equidista de A, B y C, así que está en la mediatriz de cada lado. Dos mediatrices bastan para fijarlo: se cortan en el circuncentro.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina un punto que se desliza por la mediatriz de AB: siempre equidista de A y de B. Solo en una posición también equidista de C.
   - [ ] *Solución, paso 4 · 4. El trazado:* Traza la mediatriz del lado AB.
   - [ ] *Solución, paso 5 · 4. El trazado:* Traza la mediatriz del lado BC: se cortan en el circuncentro O. Arrastra X hasta él.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: la mediatriz del tercer lado también pasa por O, y O equidista de los tres vértices.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: tomar el baricentro, donde se cortan las medianas. El circuncentro está en las mediatrices, que son perpendiculares a los lados.
9. [ ] *construcción en la lámina, dificultad 3*: Como en la PAU: busca un punto de la recta r desde el que AB se vea con un ángulo de 45° y arrastra X hasta él.
   - [ ] *Pista 1:* El lugar geométrico de los puntos desde los que un segmento se ve con un ángulo dado es el arco capaz.
   - [ ] *Pista 2:* El punto buscado debe estar, además, en la recta r.
   - [ ] *Pista 3:* Traza el arco capaz de 45° de AB y busca dónde corta a r.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Hay un segmento AB y una recta r. Buscamos un punto de r desde el que AB se vea con un ángulo de 45°.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Los puntos desde los que un segmento se ve con un ángulo dado forman el arco capaz. El punto buscado está en el arco capaz y en r.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina un punto que recorre el arco: el ángulo bajo el que ve AB no cambia. Al salirse del arco, ese ángulo aumenta o disminuye.
   - [ ] *Solución, paso 4 · 4. El trazado:* Traza el arco capaz de 45° sobre AB: pasa por A y B, y su centro está en la mediatriz de AB.
   - [ ] *Solución, paso 5 · 4. El trazado:* El arco corta a r en dos puntos, T₁ y T₂. Arrastra X hasta uno de ellos.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: desde cada uno de los dos puntos, el segmento AB se ve con un ángulo de 45°, así que cualquiera de ellos sirve.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: usar el ángulo central en vez del inscrito. El ángulo central sobre AB sería el doble, y el arco no coincide con el arco capaz.

### II-12 · Vistas desde una isométrica

Fichero: `src/content/lessons/07-vistas-isometrica.json` · DT II · nivel Intermedio

- [ ] **Saber básico:** Normalización: representación de piezas por sus vistas en el sistema europeo (UNE-EN ISO 5456-2), aristas ocultas, ejes y acotación.

**Pasos**

1. [ ] Esta pieza está dibujada en perspectiva isométrica. Vamos a obtener sus vistas: lo que se ve desde delante, desde arriba y desde la izquierda.
2. [ ] Metemos la pieza en una caja. En el sistema europeo, la pieza queda entre el observador y la cara en la que se dibuja cada vista.
3. [ ] Mirando desde delante, el alzado se proyecta en la cara de detrás. Cada arista de la pieza deja su línea en esa cara.
4. [ ] Desde arriba, la planta se proyecta en la cara de abajo. Desde la izquierda, el perfil izquierdo se proyecta en la cara de la derecha.
5. [ ] Al desplegar la caja, las tres vistas quedan en un mismo plano. La planta va debajo del alzado y el perfil izquierdo, a su derecha.
6. [ ] Las aristas que no se ven se dibujan con línea discontinua fina. El taladro, que en el alzado y en el perfil queda tapado, aparece así.
7. [ ] Los ejes de simetría del taladro van con trazo y punto fino y sobresalen un poco de la pieza. En la planta, el taladro se ve de punta: dos ejes cruzados.
8. [ ] Para fabricar la pieza hacen falta sus medidas. Cada cota se pone una sola vez, en la vista que mejor muestra esa forma.

**Ejercicios**

1. [ ] *construcción en la lámina, dificultad 1*: Se ven el alzado y la planta de una pieza. ¿Cuál es su perfil izquierdo?
   - [ ] *Pista 1:* Cada medida de la pieza aparece en dos vistas, alineada con las líneas de referencia.
   - [ ] *Pista 2:* La vista que falta comparte una medida con cada una de las dos vistas que se ven.
   - [ ] *Pista 3:* Traza líneas de referencia desde las dos vistas y compara las siluetas con las opciones.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Se ven dos vistas de una pieza y hay que elegir, entre varias piezas, la vista que falta. Cada opción es el dibujo de una pieza distinta.
   - [ ] *Solución, paso 2 · 2. La idea clave:* El perfil comparte la altura con el alzado y la profundidad con la planta. Con esas dos medidas se puede reconstruir.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina la pieza dentro de la caja de proyección: al desplegar la caja, las tres vistas quedan en un mismo plano y las medidas comunes quedan alineadas.
   - [ ] *Solución, paso 4 · 4. El trazado:* Desde cada arista horizontal del alzado, traza una línea de referencia hacia la derecha: marca las alturas del perfil.
   - [ ] *Solución, paso 5 · 4. El trazado:* Pasa cada profundidad de la planta al perfil, a la derecha del alzado, y elige la opción que coincide con ese dibujo.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: cada altura, anchura y profundidad de la opción elegida coincide con las de las vistas dadas, y sus aristas ocultas también.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: elegir el perfil con la misma silueta pero invertida. El perfil izquierdo se mira desde la izquierda, y la parte de delante queda a su derecha.
2. [ ] *construcción en la lámina, dificultad 1*: Se ven el alzado y el perfil izquierdo de una pieza. ¿Cuál es su planta?
   - [ ] *Pista 1:* Cada medida de la pieza aparece en dos vistas, alineada con las líneas de referencia.
   - [ ] *Pista 2:* La vista que falta comparte una medida con cada una de las dos vistas que se ven.
   - [ ] *Pista 3:* Traza líneas de referencia desde las dos vistas y compara las siluetas con las opciones.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Se ven dos vistas de una pieza y hay que elegir, entre varias piezas, la vista que falta. Cada opción es el dibujo de una pieza distinta.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La planta comparte la anchura con el alzado y la profundidad con el perfil. Con esas dos medidas se puede reconstruir.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina la pieza dentro de la caja de proyección: al desplegar la caja, las tres vistas quedan en un mismo plano y las medidas comunes quedan alineadas.
   - [ ] *Solución, paso 4 · 4. El trazado:* Desde cada arista vertical del alzado, baja una línea de referencia: marca las anchuras de la planta.
   - [ ] *Solución, paso 5 · 4. El trazado:* Pasa cada profundidad del perfil a la planta con una recta a 45° o con el compás, y elige la opción que coincide.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: cada altura, anchura y profundidad de la opción elegida coincide con las de las vistas dadas, y sus aristas ocultas también.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: colocar la planta encima del alzado. En el sistema europeo la planta va debajo del alzado.
3. [ ] *construcción en la lámina, dificultad 1*: Se ven la planta y el perfil izquierdo de una pieza. ¿Cuál es su alzado?
   - [ ] *Pista 1:* Cada medida de la pieza aparece en dos vistas, alineada con las líneas de referencia.
   - [ ] *Pista 2:* La vista que falta comparte una medida con cada una de las dos vistas que se ven.
   - [ ] *Pista 3:* Traza líneas de referencia desde las dos vistas y compara las siluetas con las opciones.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Se ven dos vistas de una pieza y hay que elegir, entre varias piezas, la vista que falta. Cada opción es el dibujo de una pieza distinta.
   - [ ] *Solución, paso 2 · 2. La idea clave:* El alzado comparte la anchura con la planta y la altura con el perfil. Con esas dos medidas se puede reconstruir.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina la pieza dentro de la caja de proyección: al desplegar la caja, las tres vistas quedan en un mismo plano y las medidas comunes quedan alineadas.
   - [ ] *Solución, paso 4 · 4. El trazado:* Desde cada arista de la planta, sube una línea de referencia: marca las anchuras del alzado.
   - [ ] *Solución, paso 5 · 4. El trazado:* Lleva las alturas del perfil con líneas horizontales hasta el alzado y elige la opción que coincide.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: cada altura, anchura y profundidad de la opción elegida coincide con las de las vistas dadas, y sus aristas ocultas también.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: dibujar el alzado con las alturas del perfil al revés. La altura de una arista se mide desde la base y es la misma en el alzado y en el perfil.
4. [ ] *construcción en la lámina, dificultad 2*: Marca solo las vistas imprescindibles para definir esta brida: ni una más ni una menos.
   - [ ] *Pista 1:* Una vista es imprescindible cuando muestra algo que las demás no enseñan.
   - [ ] *Pista 2:* Mira qué forma aparece en cada cara: taladros, ranuras o planos inclinados.
   - [ ] *Pista 3:* Empieza por el alzado y añade solo las vistas que aportan una forma nueva.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Una brida con buje se puede dibujar con tres vistas, pero no siempre hacen falta todas. Hay que marcar las imprescindibles.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Una vista es imprescindible si aporta una forma que no se ve en las demás. Si una vista no añade nada nuevo, sobra.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina la pieza girando delante del observador: cada vez que cambia la cara que miras aparece una forma nueva, o no aparece ninguna.
   - [ ] *Solución, paso 4 · 4. El trazado:* Mira el alzado: muestra el buje, los espesores y la altura del taladro central. Es la primera vista que se elige.
   - [ ] *Solución, paso 5 · 4. El trazado:* La planta añade los taladros de fijación y la forma circular del buje, y el perfil repite el alzado: sobra.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: con las vistas marcadas no queda ninguna arista sin definir, y ninguna vista repite lo que ya muestran las otras.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: marcar las tres vistas por seguridad. El perfil de una pieza de revolución como esta repite el alzado y se omite.
5. [ ] *construcción en la lámina, dificultad 2*: Marca solo las vistas imprescindibles para definir este soporte en U: ni una más ni una menos.
   - [ ] *Pista 1:* Una vista es imprescindible cuando muestra algo que las demás no enseñan.
   - [ ] *Pista 2:* Mira qué forma aparece en cada cara: taladros, ranuras o planos inclinados.
   - [ ] *Pista 3:* Empieza por el alzado y añade solo las vistas que aportan una forma nueva.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* El soporte en U tiene una ranura pasante y un taladro lateral. Hay que marcar las vistas imprescindibles para definirlo.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Una vista es imprescindible si aporta una forma que no se ve en las demás. Si una vista no añade nada nuevo, sobra.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina la pieza girando delante del observador: cada vez que cambia la cara que miras aparece una forma nueva, o no aparece ninguna.
   - [ ] *Solución, paso 4 · 4. El trazado:* Mira el alzado: muestra la U con su ancho y su fondo. Es la primera vista que se elige.
   - [ ] *Solución, paso 5 · 4. El trazado:* La planta muestra la ranura pasante y la posición del taladro lateral; el perfil no añade ninguna forma que no esté ya definida.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: con las vistas marcadas no queda ninguna arista sin definir, y ninguna vista repite lo que ya muestran las otras.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: añadir el perfil porque el taladro es lateral. Su diámetro y su posición ya quedan definidos con el alzado y la planta.
6. [ ] *construcción en la lámina, dificultad 2*: Marca solo las vistas imprescindibles para definir esta cuña con rebaje: ni una más ni una menos.
   - [ ] *Pista 1:* Una vista es imprescindible cuando muestra algo que las demás no enseñan.
   - [ ] *Pista 2:* Mira qué forma aparece en cada cara: taladros, ranuras o planos inclinados.
   - [ ] *Pista 3:* Empieza por el alzado y añade solo las vistas que aportan una forma nueva.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* La cuña con rebaje tiene un plano inclinado y una ranura. Hay que marcar las vistas imprescindibles para definirla.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Una vista es imprescindible si aporta una forma que no se ve en las demás. Si una vista no añade nada nuevo, sobra.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina la pieza girando delante del observador: cada vez que cambia la cara que miras aparece una forma nueva, o no aparece ninguna.
   - [ ] *Solución, paso 4 · 4. El trazado:* Mira el alzado: muestra la ranura y la altura de la cuña, pero el plano inclinado se ve solo como una línea.
   - [ ] *Solución, paso 5 · 4. El trazado:* La planta muestra la ranura y el perfil enseña el plano inclinado: sin una de ellas, quedan formas sin definir. Hacen falta las tres.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: con las vistas marcadas no queda ninguna arista sin definir, y ninguna vista repite lo que ya muestran las otras.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: omitir el perfil porque se parece al alzado. Es la única vista que muestra la inclinación de la cuña.
7. [ ] *construcción en la lámina, dificultad 3*: Como en la PAU: dibuja el alzado de la brida en corte total por su plano de simetría frontal, A-A. ¿Cuál de estos dibujos es el correcto?
   - [ ] *Pista 1:* El plano de simetría pasa por el centro de la pieza, a mitad de su profundidad.
   - [ ] *Pista 2:* En el corte total se quita toda la parte de delante del plano y se rayan las caras cortadas.
   - [ ] *Pista 3:* Elige el dibujo con rayado a 45° y sin aristas ocultas, cortado justo por el centro.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Se pide el alzado de la brida en corte total por su plano de simetría frontal, A-A. Hay que elegir entre varios dibujos.
   - [ ] *Solución, paso 2 · 2. La idea clave:* En un corte total, el plano atraviesa la pieza y se quita la parte de delante. Las caras cortadas se rayan y no se dibujan aristas ocultas.
   - [ ] *Solución, paso 3 · 3. El movimiento:* El plano A-A pasa por el centro de la pieza y la parte de delante se retira: queda a la vista el interior, con los huecos cortados por la mitad.
   - [ ] *Solución, paso 4 · 4. El trazado:* Dibuja el contorno de lo que queda: las aristas visibles detrás del plano y el contorno de la sección en el propio plano A-A.
   - [ ] *Solución, paso 5 · 4. El trazado:* Raya las caras cortadas con líneas finas a 45° y elige el dibujo que coincide: cortado por el centro y sin aristas ocultas.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: el plano pasa por el centro, así que los huecos aparecen cortados por la mitad, y el rayado está solo en el material cortado.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: dibujar aristas ocultas en un dibujo en corte. En los cortes no se dibujan: lo que no se ve se ha quitado o se ve en otra vista.
8. [ ] *construcción en la lámina, dificultad 3*: Como en la PAU: dibuja el alzado del soporte en U en corte total por su plano de simetría frontal, A-A. ¿Cuál de estos dibujos es el correcto?
   - [ ] *Pista 1:* El plano de simetría pasa por el centro de la pieza, a mitad de su profundidad.
   - [ ] *Pista 2:* En el corte total se quita toda la parte de delante del plano y se rayan las caras cortadas.
   - [ ] *Pista 3:* Elige el dibujo con rayado a 45° y sin aristas ocultas, cortado justo por el centro.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Se pide el alzado del soporte en U en corte total por su plano de simetría frontal, A-A. Hay que elegir entre varios dibujos.
   - [ ] *Solución, paso 2 · 2. La idea clave:* En un corte total, el plano atraviesa la pieza y se quita la parte de delante. Las caras cortadas se rayan y no se dibujan aristas ocultas.
   - [ ] *Solución, paso 3 · 3. El movimiento:* El plano A-A pasa por el centro de la pieza y la parte de delante se retira: queda a la vista el interior, con los huecos cortados por la mitad.
   - [ ] *Solución, paso 4 · 4. El trazado:* Dibuja el contorno de lo que queda: las aristas visibles detrás del plano y el contorno de la sección en el propio plano A-A.
   - [ ] *Solución, paso 5 · 4. El trazado:* Raya la U cortada con líneas finas a 45°: el taladro lateral queda cortado por la mitad. Elige el dibujo que coincide.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: el plano pasa por el centro, así que los huecos aparecen cortados por la mitad, y el rayado está solo en el material cortado.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: dibujar aristas ocultas en un dibujo en corte. En los cortes no se dibujan: lo que no se ve se ha quitado o se ve en otra vista.
9. [ ] *construcción en la lámina, dificultad 3*: Como en la PAU: dibuja el alzado de la pieza en T con chaflanes en corte total por su plano de simetría frontal, A-A. ¿Cuál de estos dibujos es el correcto?
   - [ ] *Pista 1:* El plano de simetría pasa por el centro de la pieza, a mitad de su profundidad.
   - [ ] *Pista 2:* En el corte total se quita toda la parte de delante del plano y se rayan las caras cortadas.
   - [ ] *Pista 3:* Elige el dibujo con rayado a 45° y sin aristas ocultas, cortado justo por el centro.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Se pide el alzado de la pieza en T en corte total por su plano de simetría frontal, A-A. Hay que elegir entre varios dibujos.
   - [ ] *Solución, paso 2 · 2. La idea clave:* En un corte total, el plano atraviesa la pieza y se quita la parte de delante. Las caras cortadas se rayan y no se dibujan aristas ocultas.
   - [ ] *Solución, paso 3 · 3. El movimiento:* El plano A-A pasa por el centro de la pieza y la parte de delante se retira: queda a la vista el interior, con los huecos cortados por la mitad.
   - [ ] *Solución, paso 4 · 4. El trazado:* Dibuja el contorno de lo que queda: las aristas visibles detrás del plano y el contorno de la sección en el propio plano A-A.
   - [ ] *Solución, paso 5 · 4. El trazado:* Raya la T cortada con líneas finas a 45°: el taladro del vástago aparece cortado por la mitad. Elige el dibujo que coincide.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: el plano pasa por el centro, así que los huecos aparecen cortados por la mitad, y el rayado está solo en el material cortado.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: dibujar aristas ocultas en un dibujo en corte. En los cortes no se dibujan: lo que no se ve se ha quitado o se ve en otra vista.

### II-10 · Octaedro en isométrica con diagonal paralela a OZ

Fichero: `src/content/lessons/08-octaedro-isometrica.json` · DT II · nivel Intermedio

- [ ] **Saber básico:** Sistema axonométrico: perspectiva isométrica y caballera de sólidos. Coeficientes de reducción.

**Pasos**

1. [ ] Este octaedro regular tiene 30 mm de arista y una diagonal perpendicular al PH. En diédrico, su planta es un cuadrado y su alzado, un rombo.
2. [ ] La axonometría es una proyección del mismo sólido desde otra dirección. Empezamos mirando de frente, como en el alzado, con el triedro de ejes X, Y y Z.
3. [ ] Giramos hasta la dirección isométrica, que forma el mismo ángulo con los tres ejes. En el dibujo, los ejes quedan a 120° y Z vertical.
4. [ ] Cada medida paralela a un eje se reduce con el coeficiente 0,816. La escala gráfica lo construye: medidas reales a 45° y su proyección vertical sobre una recta a 30°.
5. [ ] Del diédrico a la perspectiva: la planta y el alzado se llevan a las caras del triedro y, desde ellos, se levanta la caja que envuelve al octaedro.
6. [ ] La diagonal vertical va paralela a OZ por el centro de la caja, y el cuadrado central, a media altura. Uniendo cada vértice del cuadrado con los dos de la diagonal salen las ocho caras.
7. [ ] Las aristas ocultas solo se dibujan si el enunciado lo pide. Aquí aparecen, con discontinua fina, las de detrás.
8. [ ] El dibujo isométrico es la misma figura sin reducir: sale más grande, con las mismas proporciones. En la PAU se usa el coeficiente 0,816 (se aceptan 0,82 o 0,8).
9. [ ] En caballera, el plano frontal XZ queda en verdadera magnitud y el eje Y se dibuja a 45° y reducido a la mitad. Los rayos de proyección son oblicuos al cuadro.

**Ejercicios**

1. [ ] *escribir una medida, dificultad 1* (respuesta: 32.7 mm): En perspectiva isométrica, ¿cuánto mide en el dibujo una arista de 40 mm paralela al eje OX?
   - [ ] *Pista 1:* En perspectiva isométrica los tres ejes se acortan por igual.
   - [ ] *Pista 2:* El coeficiente de reducción es 0,816: la medida dibujada es la real por ese coeficiente (la arista).
   - [ ] *Pista 3:* Multiplica la medida real por el coeficiente, o llévala a la escala gráfica de reducción.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Dibujamos un sólido en perspectiva isométrica y queremos saber cuánto mide en el dibujo una medida real de 40 mm, paralela a un eje.
   - [ ] *Solución, paso 2 · 2. La idea clave:* En la perspectiva isométrica los tres ejes forman 120° y se reducen con el mismo coeficiente, 0,816. Toda medida paralela a un eje se dibuja con su valor real por ese coeficiente.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina el sólido girando hasta que una de sus diagonales mira al observador: los tres ejes quedan igual de inclinados y las medidas, igual de acortadas.
   - [ ] *Solución, paso 4 · 4. El trazado:* Construye la escala gráfica de reducción: lleva medidas reales sobre una recta a 45° y proyéctalas sobre otra a 30°. Cada medida real tiene su medida reducida.
   - [ ] *Solución, paso 5 · 4. El trazado:* Lleva 40 mm a la escala gráfica y lee la medida reducida: 32,7 mm. Dibuja esa medida sobre el eje.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: 40 mm por 0,816 da 32,7 mm. En el dibujo isométrico, sin reducir, esa misma medida saldría de 40 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: dibujar la medida real, 40 mm, en una perspectiva isométrica. Esa es la medida del dibujo isométrico, sin reducir; en la perspectiva se reduce con el coeficiente.
2. [ ] *escribir una medida, dificultad 1* (respuesta: 25 mm): En dibujo isométrico, sin reducir, ¿cuánto mide en el dibujo una arista de 25 mm paralela al eje OY?
   - [ ] *Pista 1:* El dibujo isométrico es la misma figura que la perspectiva isométrica, pero sin reducir.
   - [ ] *Pista 2:* Las medidas paralelas a los ejes se dibujan con su valor real.
   - [ ] *Pista 3:* La arista dibujada mide lo mismo que la real.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Dibujamos un cubo en dibujo isométrico y queremos saber cuánto mide en el dibujo una arista de 25 mm paralela a OY.
   - [ ] *Solución, paso 2 · 2. La idea clave:* El dibujo isométrico es la perspectiva isométrica sin reducir: sale más grande, con las medidas reales sobre los ejes y la misma forma.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina la perspectiva isométrica ampliándose hasta que las aristas de los ejes valen su medida real: es el dibujo isométrico.
   - [ ] *Solución, paso 4 · 4. El trazado:* Marca sobre cada eje las medidas reales, sin aplicar ningún coeficiente de reducción.
   - [ ] *Solución, paso 5 · 4. El trazado:* Dibuja la arista sobre el eje OY con su medida real: 25 mm.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: el coeficiente es 1, así que la medida dibujada y la real coinciden: 25 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: aplicar el coeficiente de reducción en un dibujo isométrico. Ese coeficiente es solo de la perspectiva isométrica; el dibujo no se reduce.
3. [ ] *escribir una medida, dificultad 1* (respuesta: 20 mm): En caballera con coeficiente 0,5, ¿cuánto mide en el dibujo una arista de 40 mm paralela al eje Y?
   - [ ] *Pista 1:* En caballera el eje Y se dibuja inclinado y reducido.
   - [ ] *Pista 2:* La reducción del eje Y es el coeficiente de caballera: 0,5.
   - [ ] *Pista 3:* Multiplica la medida real por ese coeficiente.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Dibujamos un cubo en caballera y queremos saber cuánto mide en el dibujo una arista de 40 mm paralela al eje Y.
   - [ ] *Solución, paso 2 · 2. La idea clave:* En caballera el plano frontal XZ se ve en verdadera magnitud, y las aristas del eje Y se dibujan inclinadas y reducidas con el coeficiente, 0,5 en la PAU.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina el sólido proyectado con rayos oblicuos sobre el plano frontal: las caras paralelas al cuadro no se deforman y la profundidad se acorta.
   - [ ] *Solución, paso 4 · 4. El trazado:* Dibuja el eje Y a 45° del eje X, hacia arriba y a la derecha, y los ejes X y Z a escala real.
   - [ ] *Solución, paso 5 · 4. El trazado:* Lleva sobre el eje Y la medida real, 40 mm, multiplicada por 0,5: 20 mm.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: 40 mm por 0,5 da 20 mm. Las aristas paralelas a X y a Z no se reducen.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: dibujar la arista del eje Y con su medida real, 40 mm. En caballera la profundidad se reduce con el coeficiente.
4. [ ] *escribir una medida, dificultad 2* (respuesta: 36.7 mm): En perspectiva isométrica, ¿cuánto mide en el dibujo una arista de 45 mm paralela al eje OZ?
   - [ ] *Pista 1:* En perspectiva isométrica los tres ejes se acortan por igual.
   - [ ] *Pista 2:* El coeficiente de reducción es 0,816: la medida dibujada es la real por ese coeficiente (la arista).
   - [ ] *Pista 3:* Multiplica la medida real por el coeficiente, o llévala a la escala gráfica de reducción.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Dibujamos un sólido en perspectiva isométrica y queremos saber cuánto mide en el dibujo una medida real de 45 mm, paralela a un eje.
   - [ ] *Solución, paso 2 · 2. La idea clave:* En la perspectiva isométrica los tres ejes forman 120° y se reducen con el mismo coeficiente, 0,816. Toda medida paralela a un eje se dibuja con su valor real por ese coeficiente.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina el sólido girando hasta que una de sus diagonales mira al observador: los tres ejes quedan igual de inclinados y las medidas, igual de acortadas.
   - [ ] *Solución, paso 4 · 4. El trazado:* Construye la escala gráfica de reducción: lleva medidas reales sobre una recta a 45° y proyéctalas sobre otra a 30°. Cada medida real tiene su medida reducida.
   - [ ] *Solución, paso 5 · 4. El trazado:* Lleva 45 mm a la escala gráfica y lee la medida reducida: 36,7 mm. Dibuja esa medida sobre el eje.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: 45 mm por 0,816 da 36,7 mm. En el dibujo isométrico, sin reducir, esa misma medida saldría de 45 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: dibujar la medida real, 45 mm, en una perspectiva isométrica. Esa es la medida del dibujo isométrico, sin reducir; en la perspectiva se reduce con el coeficiente.
5. [ ] *escribir una medida, dificultad 2* (respuesta: 36 mm): En caballera, ¿cuánto mide en el dibujo una arista de 36 mm paralela al eje X?
   - [ ] *Pista 1:* En caballera, el plano frontal XZ se ve en verdadera magnitud.
   - [ ] *Pista 2:* Las aristas paralelas a OX y a OZ no se reducen.
   - [ ] *Pista 3:* La arista dibujada mide lo mismo que la real.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Dibujamos un cubo en caballera y queremos saber cuánto mide en el dibujo una arista de 36 mm paralela al eje X.
   - [ ] *Solución, paso 2 · 2. La idea clave:* En caballera el plano frontal XZ está en verdadera magnitud: las aristas paralelas a OX y a OZ se dibujan sin reducir. Solo se reducen las del eje Y.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina el sólido proyectado con rayos oblicuos sobre el plano frontal: la cara de delante se ve igual que es, y solo la profundidad se acorta.
   - [ ] *Solución, paso 4 · 4. El trazado:* Dibuja el cuadrado frontal en verdadera magnitud y, desde sus vértices, los ejes Y reducidos hacia atrás.
   - [ ] *Solución, paso 5 · 4. El trazado:* Lleva sobre el eje X la medida real sin reducirla: 36 mm.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: la medida dibujada coincide con la real, 36 mm, porque el eje X no se reduce.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: reducir la arista del eje X con el coeficiente de la profundidad. Solo se reducen las medidas del eje Y.
6. [ ] *escribir una medida, dificultad 2* (respuesta: 46.2 mm): Un octaedro de 40 mm de arista tiene una diagonal paralela a OZ. ¿Cuánto mide esa diagonal en la perspectiva isométrica?
   - [ ] *Pista 1:* La diagonal vertical del octaedro es paralela a OZ, así que se reduce como ese eje.
   - [ ] *Pista 2:* Su medida real es la arista por raíz de dos.
   - [ ] *Pista 3:* Calcula la diagonal real y multiplícala por el coeficiente isométrico.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Un octaedro con la diagonal paralela a OZ se dibuja en perspectiva isométrica. Queremos saber cuánto mide esa diagonal en el dibujo.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La diagonal vertical del octaedro va paralela a OZ, así que se reduce con el coeficiente de ese eje, 0,816. Su medida real es la arista por raíz de dos.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina el sólido girando hasta que una de sus diagonales mira al observador: los tres ejes quedan igual de inclinados y las medidas, igual de acortadas.
   - [ ] *Solución, paso 4 · 4. El trazado:* Construye la escala gráfica de reducción: lleva medidas reales sobre una recta a 45° y proyéctalas sobre otra a 30°. Cada medida real tiene su medida reducida.
   - [ ] *Solución, paso 5 · 4. El trazado:* La diagonal real mide 56,6 mm. Llévala a la escala gráfica y lee la reducida: 46,2 mm.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: 56,6 mm por 0,816 da 46,2 mm, y la diagonal queda centrada en el octaedro y paralela a OZ.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: dibujar la diagonal con la medida de la arista. La diagonal vertical mide la arista por raíz de dos, y después se reduce con el coeficiente.
7. [ ] *escribir una medida, dificultad 3* (respuesta: 41.6 mm): Como en la PAU: octaedro de 36 mm de arista con su diagonal paralela a OZ. ¿Cuánto mide esa diagonal en la perspectiva isométrica?
   - [ ] *Pista 1:* La diagonal vertical del octaedro es paralela a OZ, así que se reduce como ese eje.
   - [ ] *Pista 2:* Su medida real es la arista por raíz de dos.
   - [ ] *Pista 3:* Calcula la diagonal real y multiplícala por el coeficiente isométrico.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Un octaedro con la diagonal paralela a OZ se dibuja en perspectiva isométrica. Queremos saber cuánto mide esa diagonal en el dibujo.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La diagonal vertical del octaedro va paralela a OZ, así que se reduce con el coeficiente de ese eje, 0,816. Su medida real es la arista por raíz de dos.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina el sólido girando hasta que una de sus diagonales mira al observador: los tres ejes quedan igual de inclinados y las medidas, igual de acortadas.
   - [ ] *Solución, paso 4 · 4. El trazado:* Construye la escala gráfica de reducción: lleva medidas reales sobre una recta a 45° y proyéctalas sobre otra a 30°. Cada medida real tiene su medida reducida.
   - [ ] *Solución, paso 5 · 4. El trazado:* La diagonal real mide 50,9 mm. Llévala a la escala gráfica y lee la reducida: 41,6 mm.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: 50,9 mm por 0,816 da 41,6 mm, y la diagonal queda centrada en el octaedro y paralela a OZ.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: dibujar la diagonal con la medida de la arista. La diagonal vertical mide la arista por raíz de dos, y después se reduce con el coeficiente.
8. [ ] *escribir una medida, dificultad 3* (respuesta: 39.6 mm): Como en la PAU: octaedro de 28 mm de arista con su diagonal paralela a OZ. ¿Cuánto mide esa diagonal en caballera?
   - [ ] *Pista 1:* En caballera, la diagonal vertical es paralela a OZ, un eje que no se reduce.
   - [ ] *Pista 2:* Su medida real es la arista por raíz de dos.
   - [ ] *Pista 3:* La diagonal dibujada mide lo mismo que la real.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Un octaedro con la diagonal paralela a OZ se dibuja en caballera. Queremos saber cuánto mide esa diagonal en el dibujo.
   - [ ] *Solución, paso 2 · 2. La idea clave:* En caballera, la diagonal vertical va paralela a OZ, que no se reduce. Su medida real es la arista por raíz de dos.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina el octaedro proyectado con rayos oblicuos sobre el plano frontal: la diagonal vertical queda en el plano frontal y se ve en verdadera magnitud.
   - [ ] *Solución, paso 4 · 4. El trazado:* Dibuja el cuadrado central del octaedro en el plano horizontal, con el eje Y reducido, y la diagonal vertical por su centro.
   - [ ] *Solución, paso 5 · 4. El trazado:* La diagonal real mide 39,6 mm: se dibuja sobre el eje Z sin reducir, 39,6 mm.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: la diagonal dibujada coincide con la real, 39,6 mm, porque el eje Z no se reduce.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: reducir la diagonal con el coeficiente de caballera. Ese coeficiente es solo del eje Y; la diagonal vertical se dibuja sin reducir.
9. [ ] *escribir una medida, dificultad 3* (respuesta: 27.7 mm): Como en la PAU: octaedro de 24 mm de arista con su diagonal paralela a OZ. ¿Cuánto mide esa diagonal en la perspectiva isométrica?
   - [ ] *Pista 1:* La diagonal vertical del octaedro es paralela a OZ, así que se reduce como ese eje.
   - [ ] *Pista 2:* Su medida real es la arista por raíz de dos.
   - [ ] *Pista 3:* Calcula la diagonal real y multiplícala por el coeficiente isométrico.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Un octaedro con la diagonal paralela a OZ se dibuja en perspectiva isométrica. Queremos saber cuánto mide esa diagonal en el dibujo.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La diagonal vertical del octaedro va paralela a OZ, así que se reduce con el coeficiente de ese eje, 0,816. Su medida real es la arista por raíz de dos.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina el sólido girando hasta que una de sus diagonales mira al observador: los tres ejes quedan igual de inclinados y las medidas, igual de acortadas.
   - [ ] *Solución, paso 4 · 4. El trazado:* Construye la escala gráfica de reducción: lleva medidas reales sobre una recta a 45° y proyéctalas sobre otra a 30°. Cada medida real tiene su medida reducida.
   - [ ] *Solución, paso 5 · 4. El trazado:* La diagonal real mide 33,9 mm. Llévala a la escala gráfica y lee la reducida: 27,7 mm.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: 33,9 mm por 0,816 da 27,7 mm, y la diagonal queda centrada en el octaedro y paralela a OZ.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: dibujar la diagonal con la medida de la arista. La diagonal vertical mide la arista por raíz de dos, y después se reduce con el coeficiente.

### I-14 · ¿Por qué las paralelas se juntan?

Fichero: `src/content/lessons/09-paralelas-se-juntan.json` · DT I · nivel Inicial

- [ ] **Saber básico:** Sistema cónico: fundamentos, elementos y perspectiva frontal y oblicua de sólidos sencillos.

**Pasos**

1. [ ] Unas vías de tren son paralelas, pero en una foto se juntan a lo lejos. La perspectiva cónica explica por qué.
2. [ ] El observador V mira a través de un plano vertical, el cuadro. Cada punto se dibuja donde el rayo visual que va del ojo al punto atraviesa el cuadro.
3. [ ] Cuanto más lejos está un punto, más cerca del horizonte cae su imagen. Por eso lo lejano se ve más pequeño y las vías se acercan entre sí.
4. [ ] Perspectiva frontal: las caras del cubo paralelas al cuadro se ven sin deformar. Sus aristas perpendiculares al cuadro fugan al punto principal P, en la línea del horizonte.
5. [ ] Los puntos de distancia D₁ y D₂ son la fuga de las horizontales a 45°. Están en el horizonte, a la misma distancia de P que el ojo del cuadro.
6. [ ] Perspectiva oblicua: si giramos el cubo, ninguna cara es paralela al cuadro. Sus aristas horizontales fugan a dos puntos del horizonte, F₁ y F₂.
7. [ ] Los puntos métricos M₁ y M₂ sirven para llevar medidas reales desde la LT. Cada uno está en el horizonte, a la distancia del ojo a su punto de fuga.
8. [ ] Para construirla se abate el geometral. La visual en planta da la posición a lo ancho, y la directriz, que fuga a P, da la profundidad.
9. [ ] Mueve al observador y gira el cubo: la imagen del cuadro cambia al momento. Las aristas ocultas se dibujan siempre, con discontinua fina.

**Ejercicios**

1. [ ] *escribir una medida, dificultad 1* (respuesta: 35 mm): El ojo del observador está a 35 mm del geometral. ¿A qué altura sobre la LT se dibuja la línea del horizonte?
   - [ ] *Pista 1:* El horizonte es la imagen de todos los puntos que están a la altura del ojo.
   - [ ] *Pista 2:* Pasa por el punto principal y es paralelo a la línea de tierra.
   - [ ] *Pista 3:* Mide sobre la vertical de P la altura del ojo.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Una perspectiva cónica se dibuja sobre el cuadro, con su línea de tierra y su horizonte. Queremos saber a qué altura sobre la LT queda el horizonte cuando el ojo está a 35 mm del geometral.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La línea del horizonte es la imagen de todos los puntos que están a la altura del ojo. Está a esa altura sobre la línea de tierra y pasa por el punto principal.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina que subes el ojo: el horizonte sube con él, siempre a su altura, y los objetos parecen más bajos.
   - [ ] *Solución, paso 4 · 4. El trazado:* Dibuja la LT, el cuadro y el punto principal P, que es la proyección del ojo sobre el cuadro.
   - [ ] *Solución, paso 5 · 4. El trazado:* Mide sobre la vertical de P la altura del ojo, 35 mm, y traza el horizonte paralelo a la LT: queda a 35 mm.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: el horizonte pasa por P y está a la misma altura que el ojo, 35 mm, por encima de la LT.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: confundir la altura del ojo con su distancia al cuadro. La altura da el horizonte sobre la LT; la distancia da, por ejemplo, los puntos de distancia.
2. [ ] *escribir una medida, dificultad 1* (respuesta: 60 mm): Perspectiva frontal con el observador a 60 mm del cuadro. ¿A qué distancia del punto principal está cada punto de distancia?
   - [ ] *Pista 1:* Los puntos de distancia son los puntos de fuga de las horizontales a 45°.
   - [ ] *Pista 2:* Están en el horizonte, a la derecha y a la izquierda de P.
   - [ ] *Pista 3:* Abate el ojo y traza la recta a 45° hasta el horizonte.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* En una perspectiva frontal con el observador a 60 mm del cuadro, buscamos a qué distancia del punto principal está cada punto de distancia.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Los puntos de distancia son los puntos de fuga de las horizontales a 45° y están en el horizonte. Cada uno queda a una distancia de P igual a la distancia del ojo al cuadro.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina una recta horizontal a 45° con el cuadro que se aleja: se ve acercarse al horizonte hasta un punto, a la misma distancia de P que el ojo del cuadro.
   - [ ] *Solución, paso 4 · 4. El trazado:* Abate el observador sobre el cuadro: el ojo queda sobre la perpendicular al horizonte por P, a su distancia al cuadro.
   - [ ] *Solución, paso 5 · 4. El trazado:* Traza por el ojo, abatido, la recta a 45° hasta el horizonte: lo corta a 60 mm de P, a derecha e izquierda. Son D₁ y D₂.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: el triángulo formado por el ojo, P y D₁ es isósceles y rectángulo, así que PD₁ vale lo que la distancia del ojo al cuadro, 60 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: tomar la altura del ojo como distancia de los puntos de distancia. La medida que cuenta es la distancia del ojo al cuadro, 60 mm, no su altura.
3. [ ] *escribir una medida, dificultad 1* (respuesta: 60 mm): El cubo está girado 45° respecto al cuadro y el observador está a 60 mm de él. ¿A qué distancia de P está cada punto de fuga de las aristas horizontales?
   - [ ] *Pista 1:* Las aristas paralelas del cubo comparten un punto de fuga en el horizonte.
   - [ ] *Pista 2:* Para hallarlo, desde el ojo abatido se traza la paralela a esas aristas.
   - [ ] *Pista 3:* Mide desde P hasta el corte de esa paralela con el horizonte.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Un cubo está girado respecto al cuadro y el observador está a 60 mm de él. Buscamos a qué distancia de P está el punto de fuga más cercano.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Cada arista horizontal del cubo tiene un punto de fuga en el horizonte. Está a una distancia de P igual a la del ojo por la tangente del ángulo que forma la arista con la perpendicular al cuadro.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina las aristas del cubo alejándose hasta el infinito: las de una dirección convergen en un punto del horizonte, y las de la otra, en otro.
   - [ ] *Solución, paso 4 · 4. El trazado:* Abate el observador y traza, desde el ojo, las paralelas a las dos direcciones de las aristas horizontales del cubo, que se ven en la planta.
   - [ ] *Solución, paso 5 · 4. El trazado:* Cada paralela corta al horizonte en un punto de fuga. El más cercano queda a 60 mm de P.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: los dos puntos de fuga están en el horizonte, a uno y otro lado de P, y sus distancias a P salen de la del ojo por la tangente de cada ángulo.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: medir el ángulo de la arista desde el cuadro y no desde la perpendicular al cuadro. Con el ángulo equivocado se confunden el punto de fuga cercano y el lejano.
4. [ ] *escribir una medida, dificultad 2* (respuesta: 85 mm): Perspectiva frontal con el observador a 85 mm del cuadro. ¿A qué distancia del punto principal está cada punto de distancia?
   - [ ] *Pista 1:* Los puntos de distancia son los puntos de fuga de las horizontales a 45°.
   - [ ] *Pista 2:* Están en el horizonte, a la derecha y a la izquierda de P.
   - [ ] *Pista 3:* Abate el ojo y traza la recta a 45° hasta el horizonte.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* En una perspectiva frontal con el observador a 85 mm del cuadro, buscamos a qué distancia del punto principal está cada punto de distancia.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Los puntos de distancia son los puntos de fuga de las horizontales a 45° y están en el horizonte. Cada uno queda a una distancia de P igual a la distancia del ojo al cuadro.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina una recta horizontal a 45° con el cuadro que se aleja: se ve acercarse al horizonte hasta un punto, a la misma distancia de P que el ojo del cuadro.
   - [ ] *Solución, paso 4 · 4. El trazado:* Abate el observador sobre el cuadro: el ojo queda sobre la perpendicular al horizonte por P, a su distancia al cuadro.
   - [ ] *Solución, paso 5 · 4. El trazado:* Traza por el ojo, abatido, la recta a 45° hasta el horizonte: lo corta a 85 mm de P, a derecha e izquierda. Son D₁ y D₂.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: el triángulo formado por el ojo, P y D₁ es isósceles y rectángulo, así que PD₁ vale lo que la distancia del ojo al cuadro, 85 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: tomar la altura del ojo como distancia de los puntos de distancia. La medida que cuenta es la distancia del ojo al cuadro, 85 mm, no su altura.
5. [ ] *escribir una medida, dificultad 2* (respuesta: 29.1 mm): El cubo está girado 20° respecto al cuadro y el observador está a 80 mm. ¿A qué distancia de P está el punto de fuga más cercano?
   - [ ] *Pista 1:* Las aristas paralelas del cubo comparten un punto de fuga en el horizonte.
   - [ ] *Pista 2:* Para hallarlo, desde el ojo abatido se traza la paralela a esas aristas.
   - [ ] *Pista 3:* Mide desde P hasta el corte de esa paralela con el horizonte.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Un cubo está girado respecto al cuadro y el observador está a 80 mm de él. Buscamos a qué distancia de P está el punto de fuga más cercano.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Cada arista horizontal del cubo tiene un punto de fuga en el horizonte. Está a una distancia de P igual a la del ojo por la tangente del ángulo que forma la arista con la perpendicular al cuadro.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina las aristas del cubo alejándose hasta el infinito: las de una dirección convergen en un punto del horizonte, y las de la otra, en otro.
   - [ ] *Solución, paso 4 · 4. El trazado:* Abate el observador y traza, desde el ojo, las paralelas a las dos direcciones de las aristas horizontales del cubo, que se ven en la planta.
   - [ ] *Solución, paso 5 · 4. El trazado:* Cada paralela corta al horizonte en un punto de fuga. El más cercano queda a 29,1 mm de P.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: los dos puntos de fuga están en el horizonte, a uno y otro lado de P, y sus distancias a P salen de la del ojo por la tangente de cada ángulo.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: medir el ángulo de la arista desde el cuadro y no desde la perpendicular al cuadro. Con el ángulo equivocado se confunden el punto de fuga cercano y el lejano.
6. [ ] *escribir una medida, dificultad 2* (respuesta: 85.7 mm): El cubo está girado 35° respecto al cuadro y el observador está a 60 mm. ¿A qué distancia de P está el punto de fuga más lejano?
   - [ ] *Pista 1:* Las aristas paralelas del cubo comparten un punto de fuga en el horizonte.
   - [ ] *Pista 2:* Para hallarlo, desde el ojo abatido se traza la paralela a esas aristas.
   - [ ] *Pista 3:* Mide desde P hasta el corte de esa paralela con el horizonte.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Un cubo está girado respecto al cuadro y el observador está a 60 mm de él. Buscamos a qué distancia de P está el punto de fuga más lejano.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Cada arista horizontal del cubo tiene un punto de fuga en el horizonte. Está a una distancia de P igual a la del ojo por la tangente del ángulo que forma la arista con la perpendicular al cuadro.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina las aristas del cubo alejándose hasta el infinito: las de una dirección convergen en un punto del horizonte, y las de la otra, en otro.
   - [ ] *Solución, paso 4 · 4. El trazado:* Abate el observador y traza, desde el ojo, las paralelas a las dos direcciones de las aristas horizontales del cubo, que se ven en la planta.
   - [ ] *Solución, paso 5 · 4. El trazado:* Cada paralela corta al horizonte en un punto de fuga. El más lejano queda a 85,7 mm de P.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: los dos puntos de fuga están en el horizonte, a uno y otro lado de P, y sus distancias a P salen de la del ojo por la tangente de cada ángulo.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: medir el ángulo de la arista desde el cuadro y no desde la perpendicular al cuadro. Con el ángulo equivocado se confunden el punto de fuga cercano y el lejano.
7. [ ] *escribir una medida, dificultad 3* (respuesta: 42 mm): Como en la PAU: cubo girado 25° respecto al cuadro y observador a 90 mm. ¿A qué distancia de P está el punto de fuga más cercano?
   - [ ] *Pista 1:* Las aristas paralelas del cubo comparten un punto de fuga en el horizonte.
   - [ ] *Pista 2:* Para hallarlo, desde el ojo abatido se traza la paralela a esas aristas.
   - [ ] *Pista 3:* Mide desde P hasta el corte de esa paralela con el horizonte.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Un cubo está girado respecto al cuadro y el observador está a 90 mm de él. Buscamos a qué distancia de P está el punto de fuga más cercano.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Cada arista horizontal del cubo tiene un punto de fuga en el horizonte. Está a una distancia de P igual a la del ojo por la tangente del ángulo que forma la arista con la perpendicular al cuadro.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina las aristas del cubo alejándose hasta el infinito: las de una dirección convergen en un punto del horizonte, y las de la otra, en otro.
   - [ ] *Solución, paso 4 · 4. El trazado:* Abate el observador y traza, desde el ojo, las paralelas a las dos direcciones de las aristas horizontales del cubo, que se ven en la planta.
   - [ ] *Solución, paso 5 · 4. El trazado:* Cada paralela corta al horizonte en un punto de fuga. El más cercano queda a 42 mm de P.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: los dos puntos de fuga están en el horizonte, a uno y otro lado de P, y sus distancias a P salen de la del ojo por la tangente de cada ángulo.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: medir el ángulo de la arista desde el cuadro y no desde la perpendicular al cuadro. Con el ángulo equivocado se confunden el punto de fuga cercano y el lejano.
8. [ ] *escribir una medida, dificultad 3* (respuesta: 59.6 mm): Como en la PAU: cubo girado 40° respecto al cuadro y observador a 50 mm. ¿A qué distancia de P está el punto de fuga más lejano?
   - [ ] *Pista 1:* Las aristas paralelas del cubo comparten un punto de fuga en el horizonte.
   - [ ] *Pista 2:* Para hallarlo, desde el ojo abatido se traza la paralela a esas aristas.
   - [ ] *Pista 3:* Mide desde P hasta el corte de esa paralela con el horizonte.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Un cubo está girado respecto al cuadro y el observador está a 50 mm de él. Buscamos a qué distancia de P está el punto de fuga más lejano.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Cada arista horizontal del cubo tiene un punto de fuga en el horizonte. Está a una distancia de P igual a la del ojo por la tangente del ángulo que forma la arista con la perpendicular al cuadro.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina las aristas del cubo alejándose hasta el infinito: las de una dirección convergen en un punto del horizonte, y las de la otra, en otro.
   - [ ] *Solución, paso 4 · 4. El trazado:* Abate el observador y traza, desde el ojo, las paralelas a las dos direcciones de las aristas horizontales del cubo, que se ven en la planta.
   - [ ] *Solución, paso 5 · 4. El trazado:* Cada paralela corta al horizonte en un punto de fuga. El más lejano queda a 59,6 mm de P.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: los dos puntos de fuga están en el horizonte, a uno y otro lado de P, y sus distancias a P salen de la del ojo por la tangente de cada ángulo.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: medir el ángulo de la arista desde el cuadro y no desde la perpendicular al cuadro. Con el ángulo equivocado se confunden el punto de fuga cercano y el lejano.
9. [ ] *escribir una medida, dificultad 3* (respuesta: 26.8 mm): Como en la PAU: cubo girado 15° respecto al cuadro y observador a 100 mm. ¿A qué distancia de P está el punto de fuga más cercano?
   - [ ] *Pista 1:* Las aristas paralelas del cubo comparten un punto de fuga en el horizonte.
   - [ ] *Pista 2:* Para hallarlo, desde el ojo abatido se traza la paralela a esas aristas.
   - [ ] *Pista 3:* Mide desde P hasta el corte de esa paralela con el horizonte.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Un cubo está girado respecto al cuadro y el observador está a 100 mm de él. Buscamos a qué distancia de P está el punto de fuga más cercano.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Cada arista horizontal del cubo tiene un punto de fuga en el horizonte. Está a una distancia de P igual a la del ojo por la tangente del ángulo que forma la arista con la perpendicular al cuadro.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina las aristas del cubo alejándose hasta el infinito: las de una dirección convergen en un punto del horizonte, y las de la otra, en otro.
   - [ ] *Solución, paso 4 · 4. El trazado:* Abate el observador y traza, desde el ojo, las paralelas a las dos direcciones de las aristas horizontales del cubo, que se ven en la planta.
   - [ ] *Solución, paso 5 · 4. El trazado:* Cada paralela corta al horizonte en un punto de fuga. El más cercano queda a 26,8 mm de P.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: los dos puntos de fuga están en el horizonte, a uno y otro lado de P, y sus distancias a P salen de la del ojo por la tangente de cada ángulo.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: medir el ángulo de la arista desde el cuadro y no desde la perpendicular al cuadro. Con el ángulo equivocado se confunden el punto de fuga cercano y el lejano.

### II-06 · Ángulos, distancias y rectas con ángulo dado

Fichero: `src/content/lessons/10-angulos-distancias.json` · DT II · nivel Avanzado

- [ ] **Saber básico:** Sistema diédrico: verdaderas magnitudes, ángulos de recta con los planos de proyección y con un plano, distancias, y recta o plano con un ángulo dado.

**Pasos**

1. [ ] El ángulo de una recta con el PH es el que forma con su proyección horizontal. En el espacio se ve: es el ángulo entre r y r′.
2. [ ] En la lámina no aparece en verdadera magnitud, porque r no es paralela al PV. Hay que mover la recta o el plano de proyección.
3. [ ] Colocamos un plano vertical nuevo, paralelo a r′: desde él la recta se ve de frente. Las cotas no cambian, porque el PH sigue siendo el mismo.
4. [ ] En la lámina, la LT nueva es paralela a r′ y cada punto lleva su cota sobre ella. El ángulo de la proyección nueva con esa LT es el ángulo de r con el PH.
5. [ ] Para el ángulo con el PV giramos r alrededor de un eje de punta hasta que sea horizontal. El giro no cambia su ángulo con el PV.
6. [ ] Ya horizontal, su proyección horizontal forma con la LT el ángulo con el PV. Es el mismo razonamiento de antes, cambiando el papel de los dos planos.
7. [ ] La distancia de P al plano α se mide sobre la perpendicular desde P a α. Su pie F es el punto del plano más cercano a P.
8. [ ] En la lámina, la perpendicular tiene sus proyecciones perpendiculares a las trazas α₁ y α₂. Un giro del segmento PF da la distancia en verdadera magnitud.
9. [ ] Todas las rectas que pasan por V y forman 40° con el PH son las generatrices de un cono de eje vertical. Elegir una de esas rectas es elegir una generatriz.
10. [ ] En el alzado, el contorno del cono forma 40° con la LT. El plano tangente al cono por esa generatriz forma también 40° con el PH.

**Ejercicios**

1. [ ] *escribir una medida, dificultad 1* (respuesta: 29.5 °): Con el cambio de plano ya hecho, mide en la lámina el ángulo de la recta AB con el PH, en grados.
   - [ ] *Pista 1:* El ángulo de una recta con el PH se lee cuando un plano vertical nuevo es paralelo a la recta.
   - [ ] *Pista 2:* Con un cambio de plano vertical, la LT₁ es paralela a A′B′ y las cotas no cambian.
   - [ ] *Pista 3:* Traza la LT₁ paralela a A′B′ y lleva sobre las perpendiculares las cotas de A y B.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* A y B están a distinto alejamiento y distinta cota, y AB asciende hacia atrás: no es paralela a ningún plano de proyección. Sus proyecciones no muestran su ángulo con el PH.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Un plano vertical nuevo, paralelo a AB, ve la recta en verdadera magnitud y con su ángulo con el PH. Como el PH no cambia, ese ángulo es el que buscamos.
   - [ ] *Solución, paso 3 · 3. El movimiento:* AB no se mueve: colocamos un plano vertical nuevo, paralelo a AB, y proyectamos sobre él. En ese plano AB se ve sin deformar y con su inclinación sobre el PH.
   - [ ] *Solución, paso 4 · 4. El trazado:* Traza la LT₁ paralela a A′B′. Por A′ y B′ traza las perpendiculares a la LT₁.
   - [ ] *Solución, paso 5 · 4. El trazado:* Lleva sobre ellas la cota de cada punto, medida desde la LT. El ángulo de A″₁B″₁ con la LT₁ es el que AB forma con el PH.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: al cambiar de plano vertical las cotas no cambian, así que A″₁ y B″₁ quedan sobre la LT₁ a la misma altura que A″ y B″ sobre la LT. El ángulo mide 29,5°.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: medir con el transportador el ángulo que A″B″ forma con la LT. Es el de la proyección vertical, no el de AB con el PH.
2. [ ] *escribir una medida, dificultad 1* (respuesta: 45 °): AB tiene sus dos extremos a la misma cota. Gira AB alrededor de un eje de punta y escribe el ángulo que forma con el PV, en grados.
   - [ ] *Pista 1:* El ángulo de una recta con el PV se ve cuando la recta está paralela al PH.
   - [ ] *Pista 2:* Un giro de eje de punta mantiene los alejamientos y lleva AB a una posición paralela al PH.
   - [ ] *Pista 3:* En el alzado, gira B″ con centro en A″ hasta que A″B₁″ quede paralela a la LT.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* A y B tienen la misma cota: AB ya es paralela al PH y su planta A′B′ muestra el ángulo con el PV sin deformar. Veamos qué da el giro.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Una recta paralela al PH muestra en planta su verdadera magnitud y su ángulo con el PV. Si ya lo está, el giro solo lo confirma.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Giramos AB alrededor de un eje de punta que pasa por A, perpendicular al PV. B describe una circunferencia frontal y su alejamiento no cambia.
   - [ ] *Solución, paso 4 · 4. El trazado:* En el alzado, gira B″ con centro en A″ hasta que A″B₁″ quede paralela a la LT.
   - [ ] *Solución, paso 5 · 4. El trazado:* Baja B₁″ por su línea de referencia hasta la paralela a la LT que pasa por B′: ese punto es B₁′. El ángulo de A′B₁′ con la LT es el que AB forma con el PV.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: B₁′ conserva el alejamiento de B′, porque el giro de eje de punta no cambia los alejamientos. El ángulo mide 45°.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: medir con el transportador el ángulo que A″B″ forma con la LT. Es el del alzado, que aquí es nulo, y no el que AB forma con el PV.
3. [ ] *escribir una medida, dificultad 1* (respuesta: 32 mm): El plano α es paralelo a la LT. Halla la distancia del punto P al plano α en milímetros; ayúdate de la cuadrícula de 10 mm.
   - [ ] *Pista 1:* La distancia de un punto a un plano se mide sobre la perpendicular al plano que pasa por el punto.
   - [ ] *Pista 2:* Esa perpendicular corta a α en el pie F; hay que ver el segmento PF en verdadera magnitud, con un giro de eje vertical.
   - [ ] *Pista 3:* Traza por P′ la perpendicular a α₁ y por P″ la perpendicular a α₂, y halla F donde cortan a α.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* El plano α es paralelo a la LT: sus dos trazas lo son. El punto P está delante y arriba, y ninguna proyección muestra cuánto dista de α.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La distancia de P a α se mide sobre la perpendicular desde P. Esa perpendicular corta a α en el pie F, y PF es el segmento que hay que ver sin deformar.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Giramos PF alrededor de un eje vertical que pasa por P, hasta dejarlo paralelo al PV. F describe una circunferencia horizontal y su cota no cambia.
   - [ ] *Solución, paso 4 · 4. El trazado:* Traza por P′ la perpendicular a α₁ y por P″ la perpendicular a α₂, y halla F donde cortan a α. Gira F′ con centro en P′ hasta que P′F₁′ quede paralela a la LT.
   - [ ] *Solución, paso 5 · 4. El trazado:* Sube F₁″ por su línea de referencia hasta la cota de F″. P″F₁″ es la distancia de P a α en verdadera magnitud.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: PF es perpendicular a α, así que ningún otro punto del plano está más cerca de P que F. La distancia mide 32 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: medir P′F′ o P″F″ en la lámina y dar ese valor. PF no es paralelo al PH ni al PV, así que sus proyecciones son más cortas que la distancia, 32 mm.
4. [ ] *escribir una medida, dificultad 2* (respuesta: 42.7 mm): Halla la distancia del punto P al plano α en milímetros. Elige el método con el que mover el segmento PF.
   - [ ] *Pista 1:* La distancia de un punto a un plano se mide sobre la perpendicular al plano que pasa por el punto.
   - [ ] *Pista 2:* Esa perpendicular corta a α en el pie F, y hay que ver PF en verdadera magnitud con el método que elijas.
   - [ ] *Pista 3:* Traza por P′ la perpendicular a α₁ y por P″ la perpendicular a α₂, y halla F donde cortan a α.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* El punto P está delante del plano α y a cierta altura. Ninguna proyección muestra cuánto dista de α.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La distancia de P a α se mide sobre la perpendicular desde P. Esa perpendicular corta a α en el pie F, y PF es el segmento que hay que ver sin deformar.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Giramos PF alrededor de un eje vertical que pasa por P, hasta dejarlo paralelo al PV. F describe una circunferencia horizontal y su cota no cambia.
   - [ ] *Solución, paso 4 · 4. El trazado:* Traza por P′ la perpendicular a α₁ y por P″ la perpendicular a α₂, y halla F donde cortan a α. Gira F′ con centro en P′ hasta que P′F₁′ quede paralela a la LT.
   - [ ] *Solución, paso 5 · 4. El trazado:* Sube F₁″ por su línea de referencia hasta la cota de F″. P″F₁″ es la distancia de P a α en verdadera magnitud.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: PF es perpendicular a α, así que ningún otro punto del plano está más cerca de P que F. La distancia mide 42,7 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: medir P′F′ o P″F″ en la lámina y dar ese valor. PF no es paralelo al PH ni al PV, así que sus proyecciones son más cortas que la distancia, 42,7 mm.
5. [ ] *escribir una medida, dificultad 2* (respuesta: 29.2 °): Halla el ángulo que forma la recta AB con el PV. Gira AB alrededor de un eje de punta y escribe el ángulo en grados.
   - [ ] *Pista 1:* El ángulo de una recta con el PV se lee cuando la recta es paralela al PH.
   - [ ] *Pista 2:* Un giro de eje de punta mantiene los alejamientos y lleva AB a una posición paralela al PH.
   - [ ] *Pista 3:* En el alzado, gira B″ con centro en A″ hasta que A″B₁″ quede paralela a la LT.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* A y B están a distinto alejamiento y distinta cota: AB no es paralela a ningún plano de proyección. Sus proyecciones no muestran su ángulo con el PV.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Una recta paralela al PH muestra en planta su ángulo con el PV sin deformar. Basta con girar AB hasta dejarla en esa posición.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Giramos AB alrededor de un eje de punta que pasa por A, perpendicular al PV. B describe una circunferencia frontal y su alejamiento no cambia.
   - [ ] *Solución, paso 4 · 4. El trazado:* En el alzado, gira B″ con centro en A″ hasta que A″B₁″ quede paralela a la LT.
   - [ ] *Solución, paso 5 · 4. El trazado:* Baja B₁″ por su línea de referencia hasta la paralela a la LT que pasa por B′: ese punto es B₁′. El ángulo de A′B₁′ con la LT es el que AB forma con el PV.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: B₁′ conserva el alejamiento de B′, porque el giro de eje de punta no cambia los alejamientos. El ángulo mide 29,2°.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: medir con el transportador el ángulo que A′B′ forma con la LT. Es el de la proyección, no el de AB, que solo se lee cuando AB está paralela al PH.
6. [ ] *escribir una medida, dificultad 2* (respuesta: 52.5 mm): Halla la distancia del punto P al plano α en milímetros. Abate el plano proyectante del segmento PF sobre el PH.
   - [ ] *Pista 1:* La distancia de un punto a un plano se mide sobre la perpendicular al plano desde el punto.
   - [ ] *Pista 2:* Hay que ver el segmento PF en verdadera magnitud: abate el plano vertical que lo contiene sobre el PH.
   - [ ] *Pista 3:* Traza por P′ la perpendicular a α₁ y por P″ la perpendicular a α₂, halla F, y lleva las cotas de P y F sobre las perpendiculares a la charnela.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* El punto P está lejos del plano α, delante y arriba. Ninguna de las proyecciones del segmento PF, perpendicular a α, muestra su longitud real.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La distancia de P a α es la longitud de PF, y se ve sin deformar cuando el plano vertical que contiene a PF se abate sobre el PH.
   - [ ] *Solución, paso 3 · 3. El movimiento:* El plano proyectante de PF gira como una bisagra alrededor de su traza horizontal, hasta quedar sobre el PH. PF gira con él sin deformarse.
   - [ ] *Solución, paso 4 · 4. El trazado:* Traza por P′ la perpendicular a α₁ y por P″ la perpendicular a α₂, y halla F donde cortan a α. La charnela es la traza horizontal del plano proyectante de PF: pasa por P′F′.
   - [ ] *Solución, paso 5 · 4. El trazado:* Lleva sobre cada perpendicular a la charnela la cota del punto. El segmento (P)(F) es la distancia de P a α.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: PF es perpendicular a α, así que ningún otro punto del plano está más cerca de P que F. La distancia mide 52,5 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: llevar sobre las perpendiculares a la charnela los alejamientos en vez de las cotas. En el abatimiento sobre el PH, la distancia de cada punto a la charnela es su cota.
7. [ ] *escribir una medida, dificultad 3* (respuesta: 32.9 °): Como en la PAU: halla el ángulo que forma la recta AB con el plano α. Abate el triángulo A, I, F y escribe el ángulo en grados.
   - [ ] *Pista 1:* El ángulo de una recta con un plano es el que forma con su proyección ortogonal sobre el plano.
   - [ ] *Pista 2:* Esa proyección es la recta IF, con I el corte de AB con α y F el pie de la perpendicular desde A; el triángulo A, I, F se abate.
   - [ ] *Pista 3:* Halla I y F, une A, I y F, y abate el triángulo alrededor de la traza horizontal de su plano.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* La recta AB atraviesa el plano α en un punto I. Su proyección sobre α es la recta IF, con F el pie de la perpendicular desde A.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Para medir el ángulo con un plano, la recta se compara con su proyección sobre él. Ese ángulo está en el triángulo A, I, F, que hay que llevar a la lámina sin deformarlo.
   - [ ] *Solución, paso 3 · 3. El movimiento:* El plano del triángulo A, I, F gira como una bisagra alrededor de su traza horizontal, hasta quedar sobre el PH. El triángulo gira sin deformarse.
   - [ ] *Solución, paso 4 · 4. El trazado:* Halla I, donde AB corta a α, y F, el pie de la perpendicular desde A a α. Une A, I y F.
   - [ ] *Solución, paso 5 · 4. El trazado:* Abate el triángulo sobre el PH, alrededor de la traza de su plano. El ángulo en (I) entre (A)(I) y (I)(F) es el que AB forma con α.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: el triángulo A, I, F es rectángulo en F, porque AF es perpendicular a α. El ángulo en (I) mide 32,9°.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: medir el ángulo entre AB y una traza del plano. El ángulo con un plano se mide con la proyección de la recta sobre el plano, y no con sus trazas.
8. [ ] *escribir una medida, dificultad 3* (respuesta: 23.6 °): Como en la PAU: halla el ángulo que forma la recta AB con el plano α. Abate el triángulo A, I, F y escribe el ángulo en grados.
   - [ ] *Pista 1:* El ángulo de una recta con un plano es el que forma con su proyección ortogonal sobre el plano.
   - [ ] *Pista 2:* Esa proyección es la recta IF, con I el corte de AB con α y F el pie de la perpendicular desde A; el triángulo A, I, F se abate sobre el PH.
   - [ ] *Pista 3:* Halla I y F, une A, I y F, y abate el triángulo alrededor de la traza horizontal de su plano.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* La recta AB atraviesa el plano α en un punto I. Su proyección sobre α es la recta IF, con F el pie de la perpendicular desde A.
   - [ ] *Solución, paso 2 · 2. La idea clave:* El ángulo que forma una recta con un plano es el ángulo en I del triángulo A, I, F. Hay que llevar ese triángulo a la lámina sin deformarlo.
   - [ ] *Solución, paso 3 · 3. El movimiento:* El plano del triángulo A, I, F gira como una bisagra alrededor de su traza horizontal, hasta quedar sobre el PH. El triángulo gira sin deformarse.
   - [ ] *Solución, paso 4 · 4. El trazado:* Halla I, donde AB corta a α, y F, el pie de la perpendicular desde A a α. Une A, I y F.
   - [ ] *Solución, paso 5 · 4. El trazado:* Abate el triángulo sobre el PH, alrededor de la traza de su plano. El ángulo en (I) entre (A)(I) y (I)(F) es el que AB forma con α.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: el triángulo A, I, F es rectángulo en F, porque AF es perpendicular a α. El ángulo en (I) mide 23,6°.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: medir el ángulo entre AB y una traza del plano. El ángulo con un plano se mide con la proyección de la recta sobre el plano, y no con sus trazas.
9. [ ] *escribir una medida, dificultad 3* (respuesta: 38.2 mm): Como en la PAU: halla la distancia del punto P al plano α en milímetros. Usa un cambio de plano vertical para ver PF en verdadera magnitud.
   - [ ] *Pista 1:* La distancia de un punto a un plano es la longitud del segmento PF, con F el pie de la perpendicular desde P.
   - [ ] *Pista 2:* Con un plano vertical nuevo, paralelo a PF, el segmento se ve sin deformar y las cotas no cambian.
   - [ ] *Pista 3:* Halla F con las perpendiculares a las trazas, traza la LT₁ paralela a P′F′ y lleva las cotas de P y F.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* El punto P está en el fondo y arriba, y el plano α pasa por delante de él. Ninguna proyección de PF muestra su longitud real.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Medir la distancia de P a α es ver el segmento PF sin deformar. Un plano de proyección nuevo, paralelo a PF, lo consigue sin mover nada.
   - [ ] *Solución, paso 3 · 3. El movimiento:* PF no se mueve: colocamos un plano vertical nuevo, paralelo a PF, y proyectamos sobre él. En ese plano PF se ve sin deformar.
   - [ ] *Solución, paso 4 · 4. El trazado:* Traza por P′ la perpendicular a α₁ y por P″ la perpendicular a α₂, y halla F donde cortan a α. Traza la LT₁ paralela a P′F′.
   - [ ] *Solución, paso 5 · 4. El trazado:* Por P′ y F′ traza las perpendiculares a la LT₁ y lleva sobre ellas las cotas de P y F. P″₁F″₁ es la distancia de P a α.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: PF es perpendicular a α, así que ningún otro punto del plano está más cerca de P que F. La distancia mide 38,2 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: llevar sobre las perpendiculares a la LT₁ los alejamientos en vez de las cotas. Con un plano vertical nuevo, lo que se conserva y se lleva a la LT₁ son las cotas.

### II-07 · Poliedros regulares en su posición PAU

Fichero: `src/content/lessons/11-poliedros-regulares.json` · DT II · nivel Avanzado

- [ ] **Saber básico:** Sistema diédrico: poliedros regulares (tetraedro, cubo y octaedro) apoyados en una cara o con una diagonal perpendicular a un plano de proyección; secciones y desarrollos.

**Pasos**

1. [ ] El tetraedro regular tiene cuatro caras que son triángulos equiláteros iguales. En la PAU se apoya siempre en una cara, aquí sobre el PH.
2. [ ] En la planta, la base es un triángulo equilátero en verdadera magnitud y el vértice cae en su centro. La altura es unos 0,816 de la arista.
3. [ ] En el alzado, V″ está a la altura del tetraedro, que no es ninguna arista. Sale de un triángulo rectángulo: la hipotenusa es una arista y un cateto, el radio de la base.
4. [ ] El cubo apoyado en una cara se ve en planta como un cuadrado en verdadera magnitud. Si está girado, el alzado muestra dos caras y la arista de detrás va oculta.
5. [ ] En la lámina, la altura del alzado es la arista. Las aristas verticales se proyectan en verdadera magnitud porque son perpendiculares al PH.
6. [ ] El octaedro se coloca con una diagonal perpendicular a un plano de proyección. Los otros cuatro vértices forman un cuadrado paralelo a ese plano, a media altura.
7. [ ] En la planta se ve un cuadrado con sus diagonales, en verdadera magnitud. En el alzado, la altura total es la diagonal del cuadrado: la arista por √2.
8. [ ] Cortamos el cubo con un plano proyectante vertical. En el alzado la sección es un segmento sobre α₂ y en la planta sus puntos están en las aristas que corta.
9. [ ] Al abatir α sobre el PV alrededor de α₂, la sección aparece en verdadera magnitud. Cada punto cae a una distancia de α₂ igual a su alejamiento.
10. [ ] El desarrollo del tetraedro son cuatro triángulos equiláteros unidos. Al plegarse, las caras laterales giran alrededor de las aristas de la base hasta juntarse en el vértice.

**Ejercicios**

1. [ ] *escribir una medida, dificultad 1* (respuesta: 35.4 mm): Mide en la lámina el lado más largo de la sección del cubo en verdadera magnitud. Usa la cuadrícula de 10 mm.
   - [ ] *Pista 1:* La sección se ve en verdadera magnitud cuando se abate el plano de corte.
   - [ ] *Pista 2:* El plano de corte es proyectante vertical y su traza α₂ forma 45° con la LT: pasa por los puntos de corte de las aristas.
   - [ ] *Pista 3:* Abate los vértices de la sección sobre el PV, alrededor de α₂, y mide el lado más largo.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Un cubo apoyado en una cara sobre el PH y un plano de corte α perpendicular al PV. En el alzado, α se ve de canto: es la recta α₂.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La sección es el polígono donde α corta a las caras del poliedro. Para verla sin deformar hay que ponerla paralela a un plano de proyección.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Retiramos la parte de arriba y abatimos α sobre el PV, girando alrededor de su traza α₂. Cada vértice de la sección describe un arco.
   - [ ] *Solución, paso 4 · 4. El trazado:* En el alzado, α₂ corta a las aristas en los vértices de la sección. Bájalos a la planta por sus líneas de referencia.
   - [ ] *Solución, paso 5 · 4. El trazado:* Abate cada vértice sobre el PV, alrededor de α₂, a una distancia igual a su alejamiento. Los vértices abatidos forman la sección en verdadera magnitud.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Mide con la cuadrícula: la sección es un rectángulo de 4 lados, con dos lados de 30 mm (la arista) y dos de 35,4 mm. La respuesta pedida es 35,4 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: medir los lados de la sección en la planta o en el alzado. Allí la sección está inclinada o de canto y sale más corta que en verdadera magnitud.
2. [ ] *escribir una medida, dificultad 1* (respuesta: 30 mm): El plano de corte α es paralelo al PV y corta a un cubo con una cara paralela al PV. ¿Cuánto mide el lado de la sección en verdadera magnitud?
   - [ ] *Pista 1:* Un plano paralelo al PV es perpendicular al PH, así que se puede abatir sobre el PH.
   - [ ] *Pista 2:* La traza α₁ del plano es paralela a la LT y pasa por los puntos de corte de las aristas.
   - [ ] *Pista 3:* Abate los vértices de la sección sobre el PH, alrededor de α₁, y mide su lado.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Un cubo apoyado en una cara sobre el PH, con una cara paralela al PV, y un plano de corte α paralelo al PV. En la planta, α se ve de canto: es una recta α₁ paralela a la LT.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Un plano paralelo a una cara del cubo lo corta en una sección igual a esa cara. Abatimos la sección para comprobarlo.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Retiramos la parte de arriba y abatimos α sobre el PH, girando alrededor de su traza α₁. Cada vértice de la sección describe un cuarto de circunferencia.
   - [ ] *Solución, paso 4 · 4. El trazado:* En la planta, los vértices de la sección están donde α₁ corta a las aristas. Llévalos al alzado por sus líneas de referencia para conocer sus cotas.
   - [ ] *Solución, paso 5 · 4. El trazado:* Abate cada vértice sobre el PH, alrededor de α₁, a una distancia igual a su cota. Los vértices abatidos forman la sección en verdadera magnitud.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: la sección tiene 4 lados iguales, de 30 mm: es un cuadrado igual a una cara del cubo.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: tomar como lados de la sección los trozos de α₁ que se ven en la planta. Allí α está de canto y la sección es una línea, no un polígono.
3. [ ] *escribir una medida, dificultad 1* (respuesta: 26.7 mm): El plano de corte α es paralelo al PV y corta a un tetraedro apoyado en una cara. ¿Cuánto mide el lado más corto de la sección en verdadera magnitud?
   - [ ] *Pista 1:* Un plano paralelo al PV es perpendicular al PH, así que se puede abatir sobre el PH.
   - [ ] *Pista 2:* La traza α₁ del plano es paralela a la LT y pasa por los puntos de corte de las aristas.
   - [ ] *Pista 3:* Abate los vértices de la sección sobre el PH, alrededor de α₁, y mide el lado más corto.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Un tetraedro apoyado en una cara sobre el PH y un plano de corte α paralelo al PV. En la planta, α se ve de canto: es una recta α₁ paralela a la LT.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Un plano paralelo al PV muestra en el alzado la sección sin deformar. Aquí lo comprobamos abatiéndola sobre el PH.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Retiramos la parte de arriba y abatimos α sobre el PH, girando alrededor de su traza α₁. Cada vértice de la sección describe un cuarto de circunferencia.
   - [ ] *Solución, paso 4 · 4. El trazado:* En la planta, los vértices de la sección están donde α₁ corta a las aristas. Llévalos al alzado por sus líneas de referencia para conocer sus cotas.
   - [ ] *Solución, paso 5 · 4. El trazado:* Abate cada vértice sobre el PH, alrededor de α₁, a una distancia igual a su cota. Los vértices abatidos forman la sección en verdadera magnitud.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Mide con la cuadrícula: la sección tiene 3 lados, de 26,7 mm el menor y de 35,3 mm el mayor. La respuesta pedida es 26,7 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: tomar como lados de la sección los trozos de α₁ que se ven en la planta. Allí α está de canto y la sección es una línea, no un polígono.
4. [ ] *escribir una medida, dificultad 2* (respuesta: 28.1 mm): Ahora el tetraedro. Halla la sección por el plano α en verdadera magnitud y mide su lado más largo.
   - [ ] *Pista 1:* La sección se ve en verdadera magnitud cuando se abate el plano de corte.
   - [ ] *Pista 2:* El plano de corte es proyectante vertical: su traza α₂ pasa por los puntos de corte de las aristas.
   - [ ] *Pista 3:* Abate los vértices de la sección sobre el PV, alrededor de α₂, y mide lo que pide el enunciado.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Un tetraedro apoyado en una cara sobre el PH y un plano de corte α perpendicular al PV. En el alzado, α se ve de canto: es la recta α₂.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La sección es el polígono donde α corta a las caras del poliedro. Para verla sin deformar hay que ponerla paralela a un plano de proyección.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Retiramos la parte de arriba y abatimos α sobre el PV, girando alrededor de su traza α₂. Cada vértice de la sección describe un arco.
   - [ ] *Solución, paso 4 · 4. El trazado:* En el alzado, α₂ corta a las aristas en los vértices de la sección. Bájalos a la planta por sus líneas de referencia.
   - [ ] *Solución, paso 5 · 4. El trazado:* Abate cada vértice sobre el PV, alrededor de α₂, a una distancia igual a su alejamiento. Los vértices abatidos forman la sección en verdadera magnitud.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Mide con la cuadrícula: la sección tiene 3 lados, de 23,7 mm el menor y de 28,1 mm el mayor. La respuesta pedida es 28,1 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: medir los lados de la sección en la planta o en el alzado. Allí la sección está inclinada o de canto y sale más corta que en verdadera magnitud.
5. [ ] *escribir una medida, dificultad 2* (respuesta: 31.2 mm): Un octaedro con una diagonal perpendicular al PH se corta por un plano proyectante vertical. ¿Cuánto mide el lado más largo de la sección en verdadera magnitud?
   - [ ] *Pista 1:* La sección se ve en verdadera magnitud cuando se abate el plano de corte.
   - [ ] *Pista 2:* El plano de corte es proyectante vertical: su traza α₂ pasa por los puntos de corte de las aristas.
   - [ ] *Pista 3:* Abate los vértices de la sección sobre el PV, alrededor de α₂, y mide lo que pide el enunciado.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Un octaedro con una diagonal perpendicular al PH y un plano de corte α perpendicular al PV. En el alzado, α se ve de canto: es la recta α₂.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La sección es el polígono donde α corta a las caras del poliedro. Para verla sin deformar hay que ponerla paralela a un plano de proyección.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Retiramos la parte de arriba y abatimos α sobre el PV, girando alrededor de su traza α₂. Cada vértice de la sección describe un arco.
   - [ ] *Solución, paso 4 · 4. El trazado:* En el alzado, α₂ corta a las aristas en los vértices de la sección. Bájalos a la planta por sus líneas de referencia.
   - [ ] *Solución, paso 5 · 4. El trazado:* Abate cada vértice sobre el PV, alrededor de α₂, a una distancia igual a su alejamiento. Los vértices abatidos forman la sección en verdadera magnitud.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Mide con la cuadrícula: la sección tiene 6 lados, de 8 mm el menor y de 31,2 mm el mayor. La respuesta pedida es 31,2 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: medir los lados de la sección en la planta o en el alzado. Allí la sección está inclinada o de canto y sale más corta que en verdadera magnitud.
6. [ ] *escribir una medida, dificultad 2* (respuesta: 35 mm): Un cubo apoyado en una cara y girado respecto al PV se corta por un plano proyectante vertical. ¿Cuánto mide el lado más largo de la sección en verdadera magnitud?
   - [ ] *Pista 1:* La sección se ve en verdadera magnitud cuando se abate el plano de corte.
   - [ ] *Pista 2:* El plano de corte es proyectante vertical: su traza α₂ pasa por los puntos de corte de las aristas.
   - [ ] *Pista 3:* Abate los vértices de la sección sobre el PV, alrededor de α₂, y mide lo que pide el enunciado.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Un cubo apoyado en una cara sobre el PH y un plano de corte α perpendicular al PV. En el alzado, α se ve de canto: es la recta α₂.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La sección es el polígono donde α corta a las caras del poliedro. Para verla sin deformar hay que ponerla paralela a un plano de proyección.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Retiramos la parte de arriba y abatimos α sobre el PV, girando alrededor de su traza α₂. Cada vértice de la sección describe un arco.
   - [ ] *Solución, paso 4 · 4. El trazado:* En el alzado, α₂ corta a las aristas en los vértices de la sección. Bájalos a la planta por sus líneas de referencia.
   - [ ] *Solución, paso 5 · 4. El trazado:* Abate cada vértice sobre el PV, alrededor de α₂, a una distancia igual a su alejamiento. Los vértices abatidos forman la sección en verdadera magnitud.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Mide con la cuadrícula: la sección tiene 5 lados, de 7,1 mm el menor y de 35 mm el mayor. La respuesta pedida es 35 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: medir los lados de la sección en la planta o en el alzado. Allí la sección está inclinada o de canto y sale más corta que en verdadera magnitud.
7. [ ] *escribir una medida, dificultad 3* (respuesta: 29.6 mm): Como en la PAU: el octaedro se corta por un plano proyectante vertical. Halla la sección en verdadera magnitud y mide su lado más largo.
   - [ ] *Pista 1:* La sección se ve en verdadera magnitud cuando se abate el plano de corte.
   - [ ] *Pista 2:* El plano de corte es proyectante vertical: su traza α₂ pasa por los puntos de corte de las aristas.
   - [ ] *Pista 3:* Abate los vértices de la sección sobre el PV, alrededor de α₂, y mide lo que pide el enunciado.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Un octaedro con una diagonal perpendicular al PH y un plano de corte α perpendicular al PV. En el alzado, α se ve de canto: es la recta α₂.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La sección es el polígono donde α corta a las caras del poliedro. Para verla sin deformar hay que ponerla paralela a un plano de proyección.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Retiramos la parte de arriba y abatimos α sobre el PV, girando alrededor de su traza α₂. Cada vértice de la sección describe un arco.
   - [ ] *Solución, paso 4 · 4. El trazado:* En el alzado, α₂ corta a las aristas en los vértices de la sección. Bájalos a la planta por sus líneas de referencia.
   - [ ] *Solución, paso 5 · 4. El trazado:* Abate cada vértice sobre el PV, alrededor de α₂, a una distancia igual a su alejamiento. Los vértices abatidos forman la sección en verdadera magnitud.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Mide con la cuadrícula: la sección tiene 6 lados, de 5,8 mm el menor y de 29,6 mm el mayor. La respuesta pedida es 29,6 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: medir los lados de la sección en la planta o en el alzado. Allí la sección está inclinada o de canto y sale más corta que en verdadera magnitud.
8. [ ] *escribir una medida, dificultad 3* (respuesta: 109.8 mm): Como en la PAU: tetraedro apoyado en una cara y cortado por un plano proyectante horizontal. Halla la verdadera magnitud de la sección y calcula su perímetro.
   - [ ] *Pista 1:* La sección se ve en verdadera magnitud cuando se abate el plano de corte.
   - [ ] *Pista 2:* El plano de corte es perpendicular al PH: su traza α₁ pasa por los puntos de corte de las aristas.
   - [ ] *Pista 3:* Abate los vértices de la sección sobre el PH, alrededor de α₁, y mide lo que pide el enunciado.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Un tetraedro apoyado en una cara sobre el PH y un plano de corte α perpendicular al PH. En la planta, α se ve de canto: es la recta α₁.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La sección se ve sin deformar cuando su plano es paralelo a uno de proyección. Como α es perpendicular al PH, basta con abatirlo sobre el PH.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Retiramos la parte de arriba y abatimos α sobre el PH, girando alrededor de su traza α₁. Cada vértice de la sección describe un cuarto de circunferencia.
   - [ ] *Solución, paso 4 · 4. El trazado:* En la planta, los vértices de la sección están donde α₁ corta a las aristas. Llévalos al alzado por sus líneas de referencia para conocer sus cotas.
   - [ ] *Solución, paso 5 · 4. El trazado:* Abate cada vértice sobre el PH, alrededor de α₁, a una distancia igual a su cota. Los vértices abatidos forman la sección en verdadera magnitud.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Mide con la cuadrícula: la sección tiene 4 lados, de 12,9 mm el menor y de 34,6 mm el mayor. La respuesta pedida es 109,8 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: tomar como lados de la sección los trozos de α₁ que se ven en la planta. Allí α está de canto y la sección es una línea, no un polígono.
9. [ ] *escribir una medida, dificultad 3* (respuesta: 32.3 mm): Como en la PAU: octaedro cortado por un plano proyectante horizontal. Halla la verdadera magnitud de la sección y mide su lado más largo.
   - [ ] *Pista 1:* La sección se ve en verdadera magnitud cuando se abate el plano de corte.
   - [ ] *Pista 2:* El plano de corte es perpendicular al PH: su traza α₁ pasa por los puntos de corte de las aristas.
   - [ ] *Pista 3:* Abate los vértices de la sección sobre el PH, alrededor de α₁, y mide lo que pide el enunciado.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Un octaedro con una diagonal perpendicular al PH y un plano de corte α perpendicular al PH. En la planta, α se ve de canto: es la recta α₁.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La sección se ve sin deformar cuando su plano es paralelo a uno de proyección. Como α es perpendicular al PH, basta con abatirlo sobre el PH.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Retiramos la parte de arriba y abatimos α sobre el PH, girando alrededor de su traza α₁. Cada vértice de la sección describe un cuarto de circunferencia.
   - [ ] *Solución, paso 4 · 4. El trazado:* En la planta, los vértices de la sección están donde α₁ corta a las aristas. Llévalos al alzado por sus líneas de referencia para conocer sus cotas.
   - [ ] *Solución, paso 5 · 4. El trazado:* Abate cada vértice sobre el PH, alrededor de α₁, a una distancia igual a su cota. Los vértices abatidos forman la sección en verdadera magnitud.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Mide con la cuadrícula: la sección tiene 6 lados, de 6,7 mm el menor y de 32,3 mm el mayor. La respuesta pedida es 32,3 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: tomar como lados de la sección los trozos de α₁ que se ven en la planta. Allí α está de canto y la sección es una línea, no un polígono.

### II-09 · Cono y cilindro: puntos, secciones y recta que los atraviesa

Fichero: `src/content/lessons/12-cono-cilindro.json` · DT II · nivel Avanzado

- [ ] **Saber básico:** Sistema diédrico: superficies de revolución (cono y cilindro rectos). Puntos de la superficie, secciones planas y puntos de intersección con una recta.

**Pasos**

1. [ ] Un cono de revolución es la superficie que barre una recta, la generatriz, al girar alrededor del eje pasando siempre por el vértice. Todos sus puntos están en alguna generatriz.
2. [ ] En la lámina, la planta es la circunferencia de la base y el alzado, un triángulo. Sus lados son las generatrices de contorno, las que separan la parte vista de la oculta.
3. [ ] Nos dan M″ y buscamos M′. Trazamos la generatriz que pasa por M: su alzado va de V″ a la base y su planta, de V′ al punto de la circunferencia.
4. [ ] M′ está en la planta de esa generatriz, sobre la línea de referencia de M″. Como M está en la mitad de delante, se ve en el alzado.
5. [ ] El otro camino es el paralelo: la circunferencia horizontal que pasa por M. En la planta es una circunferencia y M′ está en ella.
6. [ ] Un plano que corta al cono deja una cónica. Si corta a todas las generatrices sin ser perpendicular al eje, es una elipse.
7. [ ] Al abatir el plano α, la elipse aparece en verdadera magnitud. El laboratorio de cónicas muestra cómo cambia la curva al inclinar el plano.
8. [ ] El cilindro es la superficie que barre una generatriz paralela al eje. Su planta es una circunferencia: todos sus puntos se proyectan sobre ella.
9. [ ] La recta r entra en el cilindro por E y sale por S. Como las generatrices son verticales, todos los puntos de la superficie se proyectan en planta sobre la circunferencia.
10. [ ] Por eso E′ y S′ están donde r′ corta a la circunferencia, y E″ y S″ se llevan al alzado por sus líneas de referencia. El tramo de r dentro del cilindro no se dibuja.

**Ejercicios**

1. [ ] *escribir una medida, dificultad 1* (respuesta: 40 mm): Se conoce M″, la proyección vertical de un punto M de la mitad delantera de un cono. Halla M′ y escribe el alejamiento de M en milímetros.
   - [ ] *Pista 1:* Un punto de la superficie de un cono está siempre sobre una generatriz.
   - [ ] *Pista 2:* Traza la generatriz que pasa por M″ y llévala a la planta.
   - [ ] *Pista 3:* Une V″ con M″ y prolonga hasta la base; baja ese punto a la planta y únelo con V′.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Un cono apoyado en el PH y un punto M de su superficie del que solo conocemos M″, su proyección vertical. Nos falta M′.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Un punto de la superficie de un cono está siempre sobre una generatriz. Si hallamos esa generatriz, M′ cae sobre su planta.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Trazamos por M la generatriz del cono, que va del vértice V a la circunferencia de la base. Al girar alrededor del eje, esa generatriz recorre toda la superficie.
   - [ ] *Solución, paso 4 · 4. El trazado:* En el alzado, une V″ con M″ y prolonga hasta la base. Baja ese punto a la planta, a la circunferencia de la base, por su línea de referencia.
   - [ ] *Solución, paso 5 · 4. El trazado:* En la planta, une V′ con ese punto de la base. M′ está sobre esa recta, en la línea de referencia de M″.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: M′ queda dentro de la circunferencia de la base y sobre la generatriz, y su alejamiento es 40 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: poner M′ sobre la línea de referencia pero fuera de la generatriz, por ejemplo en la circunferencia de la base. Solo la generatriz da el punto, y M no está en la base.
2. [ ] *escribir una medida, dificultad 1* (respuesta: 46 mm): Se conoce M″, la proyección vertical de un punto M de la mitad delantera de un cilindro. Halla M′ y escribe el alejamiento de M en milímetros.
   - [ ] *Pista 1:* Las generatrices del cilindro son verticales, así que los puntos de su superficie se proyectan sobre la circunferencia de la base.
   - [ ] *Pista 2:* M′ está en la circunferencia de la planta, sobre la línea de referencia de M″.
   - [ ] *Pista 3:* Baja la línea de referencia desde M″ hasta cortar la circunferencia de la planta: M′ es el punto delantero.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Un cilindro apoyado en el PH y un punto M de su superficie del que solo conocemos M″, su proyección vertical. Nos falta M′.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Las generatrices del cilindro son verticales: todos los puntos de su superficie se proyectan en la planta sobre la circunferencia de la base.
   - [ ] *Solución, paso 3 · 3. El movimiento:* La generatriz por M es una recta vertical que une la base con la tapa. M se mueve por ella sin cambiar su planta.
   - [ ] *Solución, paso 4 · 4. El trazado:* Traza por M″ la línea de referencia hasta la planta. Corta a la circunferencia de la base en dos puntos.
   - [ ] *Solución, paso 5 · 4. El trazado:* M′ es el punto de la circunferencia que está delante del eje, porque M está en la mitad delantera.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: M′ está sobre la circunferencia de la base y su alejamiento es 46 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: tomar el punto de la circunferencia que queda detrás del eje. Si M se ve en el alzado, está en la mitad delantera y su alejamiento es mayor que el del eje.
3. [ ] *escribir una medida, dificultad 1* (respuesta: 56.6 mm): Un plano proyectante vertical corta a un cilindro formando 45° con el PH. Halla la sección en verdadera magnitud y mide su eje mayor; ayúdate de la cuadrícula de 10 mm.
   - [ ] *Pista 1:* La sección de un cilindro por un plano oblicuo al eje es una elipse.
   - [ ] *Pista 2:* El plano de corte es proyectante vertical y su traza α₂ forma 45° con la LT: corta a las generatrices de contorno en los extremos del eje mayor.
   - [ ] *Pista 3:* Lleva los extremos de α₂ sobre las generatrices de contorno y abate la elipse para medir su eje mayor.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Un cilindro apoyado en el PH y un plano de corte α perpendicular al PV. En el alzado, α se ve de canto: es la recta α₂.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Un cilindro cortado por un plano a 45° con el PH da una elipse. Para ver su forma hay que ponerla paralela a un plano de proyección.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Retiramos la parte de arriba y abatimos α sobre el PV, girando alrededor de su traza α₂. Cada punto de la elipse describe un arco.
   - [ ] *Solución, paso 4 · 4. El trazado:* En el alzado, α₂ corta a las generatrices de contorno en los extremos del eje mayor. Bájalos a la planta por sus líneas de referencia.
   - [ ] *Solución, paso 5 · 4. El trazado:* Abate esos puntos y otros intermedios sobre el PV, alrededor de α₂, a una distancia igual a su alejamiento. Los puntos abatidos dibujan la elipse en verdadera magnitud.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: el eje mayor está en un plano frontal, así que mide lo mismo en el alzado, entre los extremos de α₂ sobre las generatrices de contorno, que en la elipse abatida: 56,6 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: medir el eje mayor en la planta. Allí se acorta con la inclinación de α y sale menos que 56,6 mm.
4. [ ] *escribir una medida, dificultad 2* (respuesta: 31.4 mm): Mide en la lámina el eje mayor de la elipse de la sección en verdadera magnitud. Usa la cuadrícula de 10 mm.
   - [ ] *Pista 1:* La sección de un cono o un cilindro por un plano oblicuo al eje es una elipse.
   - [ ] *Pista 2:* El plano de corte es proyectante vertical: su traza α₂ corta a las generatrices de contorno en los extremos del eje mayor.
   - [ ] *Pista 3:* Lleva los extremos de α₂ sobre las generatrices de contorno y abate la elipse para medir su eje mayor.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Un cono apoyado en el PH y un plano de corte α perpendicular al PV. En el alzado, α se ve de canto: es la recta α₂.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La sección de un cono por un plano que corta a todas sus generatrices es una elipse. Para ver su forma hay que ponerla paralela a un plano de proyección.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Retiramos la parte de arriba y abatimos α sobre el PV, girando alrededor de su traza α₂. Cada punto de la elipse describe un arco.
   - [ ] *Solución, paso 4 · 4. El trazado:* En el alzado, α₂ corta a las generatrices de contorno en los extremos del eje mayor. Bájalos a la planta por sus líneas de referencia.
   - [ ] *Solución, paso 5 · 4. El trazado:* Abate esos puntos y otros intermedios sobre el PV, alrededor de α₂, a una distancia igual a su alejamiento. Los puntos abatidos dibujan la elipse en verdadera magnitud.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: el eje mayor está en un plano frontal, así que mide lo mismo en el alzado, entre los extremos de α₂ sobre las generatrices de contorno, que en la elipse abatida: 31,4 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: medir el eje mayor en la planta. Allí se acorta con la inclinación de α y sale menos que 31,4 mm.
5. [ ] *escribir una medida, dificultad 2* (respuesta: 20 mm): Se conoce M′, la proyección horizontal de un punto M de la superficie de un cono. Halla M″ y escribe la cota de M en milímetros.
   - [ ] *Pista 1:* Un punto de la superficie de un cono está siempre sobre una generatriz.
   - [ ] *Pista 2:* Traza en la planta la generatriz que pasa por M′ y llévala al alzado.
   - [ ] *Pista 3:* Une V′ con M′ y prolonga hasta la circunferencia; sube ese punto al alzado, únelo con V″ y busca M″ en la línea de referencia.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Un cono apoyado en el PH y un punto M de su superficie del que solo conocemos M′, su proyección horizontal. Nos falta M″.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Un punto de la superficie de un cono está siempre sobre una generatriz. Si hallamos esa generatriz, M″ cae sobre su alzado.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Trazamos por M la generatriz del cono, que va del vértice V a la circunferencia de la base. Al girar alrededor del eje, esa generatriz recorre toda la superficie.
   - [ ] *Solución, paso 4 · 4. El trazado:* En la planta, une V′ con M′ y prolonga hasta la circunferencia de la base. Sube ese punto al alzado por su línea de referencia.
   - [ ] *Solución, paso 5 · 4. El trazado:* En el alzado, une V″ con ese punto de la base. M″ está sobre esa recta, en la línea de referencia de M′.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: M″ queda dentro del triángulo del alzado, sobre la generatriz que sale de V″, y su cota es 20 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: tomar como cota de M su distancia a V′ en la planta. La cota se lee en el alzado, sobre la generatriz.
6. [ ] *escribir una medida, dificultad 2* (respuesta: 42.7 mm): La recta r es paralela al PV y atraviesa un cilindro por E y S. ¿Cuánto mide la cuerda ES, el tramo de r dentro del cilindro?
   - [ ] *Pista 1:* La parte de la recta que queda dentro del cilindro es la cuerda ES, que entra por E y sale por S.
   - [ ] *Pista 2:* E′ y S′ están donde r′ corta a la circunferencia de la base, y como r es paralela al PV, su alzado ya muestra ES sin deformar.
   - [ ] *Pista 3:* Halla E′ y S′, llévalos al alzado por sus líneas de referencia y mide la distancia entre E″ y S″.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Una recta r cruza un cilindro apoyado en el PH, entrando por E y saliendo por S. Entre E y S la recta está dentro del cilindro.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Como las generatrices son verticales, E′ y S′ están donde r′ corta a la circunferencia de la base. La cuerda ES es el tramo de r dentro del cilindro.
   - [ ] *Solución, paso 3 · 3. El movimiento:* La recta r es paralela al PV, así que ya está en la posición en la que se ve sin deformar. No hace falta moverla.
   - [ ] *Solución, paso 4 · 4. El trazado:* En la planta, r′ es paralela a la LT y corta a la circunferencia en E′ y S′. Llévalos al alzado por sus líneas de referencia.
   - [ ] *Solución, paso 5 · 4. El trazado:* En el alzado, E″ y S″ están sobre r″. La distancia entre ellos es la longitud de la cuerda.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: ES es un tramo de una recta frontal, así que su alzado mide lo mismo que ella: 42,7 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: medir E′S′ en la planta. Es la proyección horizontal de ES y sale más corta que la verdadera magnitud, 42,7 mm.
7. [ ] *escribir una medida, dificultad 3* (respuesta: 29.7 mm): Como en la PAU: cono cortado por un plano proyectante vertical. Halla la sección en verdadera magnitud y mide su eje mayor.
   - [ ] *Pista 1:* La sección de un cono o un cilindro por un plano oblicuo al eje es una elipse.
   - [ ] *Pista 2:* El plano de corte es proyectante vertical: su traza α₂ corta a las generatrices de contorno en los extremos del eje mayor.
   - [ ] *Pista 3:* Lleva los extremos de α₂ sobre las generatrices de contorno y abate la elipse para medir su eje mayor.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Un cono apoyado en el PH y un plano de corte α perpendicular al PV. En el alzado, α se ve de canto: es la recta α₂.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La sección de un cono por un plano que corta a todas sus generatrices es una elipse. Para ver su forma hay que ponerla paralela a un plano de proyección.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Retiramos la parte de arriba y abatimos α sobre el PV, girando alrededor de su traza α₂. Cada punto de la elipse describe un arco.
   - [ ] *Solución, paso 4 · 4. El trazado:* En el alzado, α₂ corta a las generatrices de contorno en los extremos del eje mayor. Bájalos a la planta por sus líneas de referencia.
   - [ ] *Solución, paso 5 · 4. El trazado:* Abate esos puntos y otros intermedios sobre el PV, alrededor de α₂, a una distancia igual a su alejamiento. Los puntos abatidos dibujan la elipse en verdadera magnitud.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: el eje mayor está en un plano frontal, así que mide lo mismo en el alzado, entre los extremos de α₂ sobre las generatrices de contorno, que en la elipse abatida: 29,7 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: medir el eje mayor en la planta. Allí se acorta con la inclinación de α y sale menos que 29,7 mm.
8. [ ] *escribir una medida, dificultad 3* (respuesta: 48.4 mm): Como en la PAU: cilindro cortado por un plano proyectante vertical. Halla la sección en verdadera magnitud y mide su eje mayor.
   - [ ] *Pista 1:* La sección de un cono o un cilindro por un plano oblicuo al eje es una elipse.
   - [ ] *Pista 2:* El plano de corte es proyectante vertical: su traza α₂ corta a las generatrices de contorno en los extremos del eje mayor.
   - [ ] *Pista 3:* Lleva los extremos de α₂ sobre las generatrices de contorno y abate la elipse para medir su eje mayor.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Un cilindro apoyado en el PH y un plano de corte α perpendicular al PV. En el alzado, α se ve de canto: es la recta α₂.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La sección de un cilindro por un plano oblicuo al eje es una elipse. Para ver su forma hay que ponerla paralela a un plano de proyección.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Retiramos la parte de arriba y abatimos α sobre el PV, girando alrededor de su traza α₂. Cada punto de la elipse describe un arco.
   - [ ] *Solución, paso 4 · 4. El trazado:* En el alzado, α₂ corta a las generatrices de contorno en los extremos del eje mayor. Bájalos a la planta por sus líneas de referencia.
   - [ ] *Solución, paso 5 · 4. El trazado:* Abate esos puntos y otros intermedios sobre el PV, alrededor de α₂, a una distancia igual a su alejamiento. Los puntos abatidos dibujan la elipse en verdadera magnitud.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: el eje mayor está en un plano frontal, así que mide lo mismo en el alzado, entre los extremos de α₂ sobre las generatrices de contorno, que en la elipse abatida: 48,4 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: medir el eje mayor en la planta. Allí se acorta con la inclinación de α y sale menos que 48,4 mm.
9. [ ] *escribir una medida, dificultad 3* (respuesta: 46.4 mm): Como en la PAU: la recta r atraviesa un cilindro por E y S. Halla la verdadera magnitud de la cuerda ES y escribe su longitud.
   - [ ] *Pista 1:* La parte de la recta que queda dentro del cilindro es la cuerda ES; hay que verla en verdadera magnitud.
   - [ ] *Pista 2:* E′ y S′ están donde r′ corta a la circunferencia de la base; después, un giro de eje vertical por E deja ES paralela al PV.
   - [ ] *Pista 3:* Halla E′ y S′, llévalos al alzado, gira S′ con centro en E′ hasta que E′S₁′ sea paralela a la LT y sube S₁″ hasta su cota.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Una recta r cruza un cilindro apoyado en el PH, entrando por E y saliendo por S. Ninguna de sus proyecciones muestra cuánto mide el tramo dentro del cilindro.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Como las generatrices son verticales, E′ y S′ están donde r′ corta a la circunferencia de la base. La cuerda ES es el tramo de r dentro del cilindro, y hay que verla sin deformar.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Giramos la cuerda ES alrededor de un eje vertical que pasa por E, hasta dejarla paralela al PV. S describe una circunferencia horizontal y su cota no cambia.
   - [ ] *Solución, paso 4 · 4. El trazado:* En la planta, r′ corta a la circunferencia en E′ y S′. Llévalos al alzado por sus líneas de referencia para obtener E″ y S″.
   - [ ] *Solución, paso 5 · 4. El trazado:* Gira S′ con centro en E′ hasta que E′S₁′ quede paralela a la LT. Sube S₁″ por su línea de referencia hasta la cota de S″: E″S₁″ es la cuerda.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: la cuerda mide 46,4 mm y ninguna de sus proyecciones puede superarla, porque se acortan al inclinarse.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: medir E′S′ o E″S″ como longitud de la cuerda. Son proyecciones de ES y salen más cortas que la verdadera magnitud, 46,4 mm.

### II-01 · Potencia, eje radical y tangencias

Fichero: `src/content/lessons/13-potencia-tangencias.json` · DT II · nivel Avanzado

- [ ] **Saber básico:** Geometría plana: potencia de un punto respecto a una circunferencia, eje radical y centro radical. Aplicación a las tangencias.

**Pasos**

1. [ ] La potencia de un punto P respecto a una circunferencia es el cuadrado del segmento de tangente PT. Cuanto más lejos está P, mayor es su potencia.
2. [ ] Mueve X por la recta e: las tangentes a las dos circunferencias miden siempre lo mismo. La recta de los puntos con igual potencia respecto a dos circunferencias es su eje radical.
3. [ ] Para trazarlo, una circunferencia auxiliar corta a las dos. Sus cuerdas comunes son ejes radicales y se cortan en Q, que tiene la misma potencia respecto a las tres.
4. [ ] El eje radical es la perpendicular por Q a la recta de los centros. Si las circunferencias se cortan, es la recta de sus dos puntos comunes.
5. [ ] Con una tercera circunferencia, los tres ejes radicales se cortan en un punto: el centro radical. Desde él, las tangentes a las tres circunferencias miden lo mismo.
6. [ ] Ahora una tangencia de la PAU: circunferencias que pasan por A y B y son tangentes a r. Todas las que pasan por A y B tienen la recta AB como eje radical común.
7. [ ] El punto CR, donde AB corta a r, tiene la misma potencia respecto a todas ellas. La tangente CR-T a la circunferencia auxiliar da esa potencia.
8. [ ] La solución toca a r en un punto a la misma distancia de CR que T. La circunferencia de centro CR y radio CR-T corta a r en los dos puntos de tangencia T₁ y T₂.
9. [ ] Cada centro está en la mediatriz de AB y en la perpendicular a r por su punto de tangencia. Hay dos soluciones.

**Ejercicios**

1. [ ] *construcción en la lámina, dificultad 1*: Las tres circunferencias tienen sus centros en los ejes. Arrastra Z hasta su centro radical.
   - [ ] *Pista 1:* El centro radical es el único punto con la misma potencia respecto a las tres circunferencias: sus tres tangentes miden lo mismo.
   - [ ] *Pista 2:* El eje radical de dos circunferencias es perpendicular a la recta que une sus centros.
   - [ ] *Pista 3:* Traza el eje radical de k₁ y k₄ y el de k₂ y k₄: se cortan en el centro radical.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Hay tres circunferencias, k₁, k₂ y k₄, y un punto Z que se puede arrastrar. Buscamos el punto desde el que las tres tangentes miden lo mismo.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Cada pareja de circunferencias tiene un eje radical, la recta de los puntos con la misma potencia respecto a las dos. Los tres ejes se cortan en un punto: el centro radical.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina un punto que se desliza por el eje radical de k₁ y k₂: las tangentes a las dos miden siempre lo mismo. Solo en un punto de esa recta también coincide la de k₄.
   - [ ] *Solución, paso 4 · 4. El trazado:* Traza el eje radical e′ de k₁ y k₄: es perpendicular a la recta de sus centros.
   - [ ] *Solución, paso 5 · 4. El trazado:* Traza de la misma manera el eje radical e″ de k₂ y k₄.
   - [ ] *Solución, paso 6 · 4. El trazado:* Los dos ejes se cortan en el centro radical CR. Arrastra Z hasta ese punto.
   - [ ] *Solución, paso 7 · 5. Comprobación:* Comprobación: el eje radical de k₁ y k₂ también pasa por CR, y las tres tangentes desde CR miden lo mismo.
   - [ ] *Solución, paso 8 · 6. Error típico:* **[REVISAR]** Error típico: trazar el eje radical paralelo a la recta de los centros. Siempre es perpendicular a ella.
2. [ ] *construcción en la lámina, dificultad 1*: Los puntos A y B están en una vertical. Las circunferencias que pasan por ellos y son tangentes a r tocan a r en dos puntos: arrastra Z hasta uno.
   - [ ] *Pista 1:* Todas las circunferencias que pasan por A y B tienen la misma potencia respecto al punto donde AB corta a r.
   - [ ] *Pista 2:* Esa potencia es el cuadrado de la distancia de ese punto a los puntos de tangencia con r.
   - [ ] *Pista 3:* Traza la tangente desde O a una circunferencia auxiliar por A y B y llévala sobre r con el compás.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Hay dos puntos A y B y una recta r. Buscamos las circunferencias que pasan por A y B y son tangentes a r, y sus puntos de tangencia con r.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La recta AB corta a r en O, que tiene la misma potencia respecto a todas las circunferencias por A y B. Esa potencia, OA por OB, da la distancia de O a los puntos de tangencia.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina una circunferencia por A y B cuyo centro se desliza por la mediatriz: va cambiando de tamaño hasta tocar a r. Solo en dos posiciones es tangente.
   - [ ] *Solución, paso 4 · 4. El trazado:* Traza la recta AB y su corte O con r.
   - [ ] *Solución, paso 5 · 4. El trazado:* Traza una circunferencia auxiliar por A y B, con centro en la mediatriz, y la tangente desde O: su longitud OT es la que da la potencia.
   - [ ] *Solución, paso 6 · 4. El trazado:* Con centro en O y radio OT, corta a r en los puntos de tangencia T₁ y T₂. Arrastra Z hasta uno de ellos.
   - [ ] *Solución, paso 7 · 5. Comprobación:* Comprobación: T₁ y T₂ están en r a la misma distancia de O, la raíz de OA por OB, y quedan a los dos lados de O.
   - [ ] *Solución, paso 8 · 6. Error típico:* **[REVISAR]** Error típico: tomar O como punto de tangencia. O solo da la potencia: el punto de tangencia está a una distancia OT de O.
3. [ ] *construcción en la lámina, dificultad 1*: Los puntos A y B están en una vertical y r es horizontal. Arrastra Z hasta el centro de una de las circunferencias que pasan por A y B y son tangentes a r.
   - [ ] *Pista 1:* Cada centro equidista de A y de B y está sobre la perpendicular a r por el punto de tangencia.
   - [ ] *Pista 2:* Los puntos de tangencia se hallan con la potencia del punto O, donde AB corta a r.
   - [ ] *Pista 3:* Halla T₁ con la tangente desde O a una circunferencia auxiliar por A y B; el centro está donde la perpendicular a r por T₁ corta a la mediatriz.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Hay dos puntos A y B y una recta r. Buscamos las circunferencias que pasan por A y B y son tangentes a r, y de ellas sus centros.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La recta AB corta a r en O, que tiene la misma potencia respecto a todas las circunferencias por A y B. Esa potencia, OA por OB, da la distancia de O a los puntos de tangencia.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina una circunferencia por A y B cuyo centro se desliza por la mediatriz: va cambiando de tamaño hasta tocar a r. Solo en dos posiciones es tangente.
   - [ ] *Solución, paso 4 · 4. El trazado:* Traza la recta AB y su corte O con r.
   - [ ] *Solución, paso 5 · 4. El trazado:* Traza una circunferencia auxiliar por A y B, con centro en la mediatriz, y la tangente desde O: su longitud OT es la que da la potencia.
   - [ ] *Solución, paso 6 · 4. El trazado:* Con centro en O y radio OT, corta a r en los puntos de tangencia T₁ y T₂.
   - [ ] *Solución, paso 7 · 4. El trazado:* Cada centro está en la perpendicular a r por su punto de tangencia y en la mediatriz de AB. Arrastra Z hasta uno de ellos.
   - [ ] *Solución, paso 8 · 5. Comprobación:* Comprobación: cada centro equidista de A, de B y de su punto de tangencia, y la circunferencia toca a r solo en ese punto.
   - [ ] *Solución, paso 9 · 6. Error típico:* **[REVISAR]** Error típico: poner el centro sobre la recta AB. El centro equidista de A y B: está en su mediatriz, no en AB.
4. [ ] *construcción en la lámina, dificultad 2*: Arrastra Z hasta el centro radical de las tres circunferencias, que ahora están en posición general.
   - [ ] *Pista 1:* El centro radical es el único punto con la misma potencia respecto a las tres circunferencias: sus tres tangentes miden lo mismo.
   - [ ] *Pista 2:* El eje radical de dos circunferencias es perpendicular a la recta que une sus centros.
   - [ ] *Pista 3:* Traza el eje radical de k₁ y k₄ y el de k₂ y k₄: se cortan en el centro radical.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Hay tres circunferencias, k₁, k₂ y k₄, y un punto Z que se puede arrastrar. Buscamos el punto desde el que las tres tangentes miden lo mismo.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Cada pareja de circunferencias tiene un eje radical, la recta de los puntos con la misma potencia respecto a las dos. Los tres ejes se cortan en un punto: el centro radical.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina un punto que se desliza por el eje radical de k₁ y k₂: las tangentes a las dos miden siempre lo mismo. Solo en un punto de esa recta también coincide la de k₄.
   - [ ] *Solución, paso 4 · 4. El trazado:* Traza el eje radical e′ de k₁ y k₄: es perpendicular a la recta de sus centros.
   - [ ] *Solución, paso 5 · 4. El trazado:* Traza de la misma manera el eje radical e″ de k₂ y k₄.
   - [ ] *Solución, paso 6 · 4. El trazado:* Los dos ejes se cortan en el centro radical CR. Arrastra Z hasta ese punto.
   - [ ] *Solución, paso 7 · 5. Comprobación:* Comprobación: el eje radical de k₁ y k₂ también pasa por CR, y las tres tangentes desde CR miden lo mismo.
   - [ ] *Solución, paso 8 · 6. Error típico:* **[REVISAR]** Error típico: trazar el eje radical paralelo a la recta de los centros. Siempre es perpendicular a ella.
5. [ ] *construcción en la lámina, dificultad 2*: Las circunferencias buscadas pasan por A y B y son tangentes a r, que está inclinada. Arrastra Z hasta uno de sus puntos de tangencia con r.
   - [ ] *Pista 1:* Todas las circunferencias que pasan por A y B tienen la misma potencia respecto al punto donde AB corta a r.
   - [ ] *Pista 2:* Esa potencia es el cuadrado de la distancia de ese punto a los puntos de tangencia con r.
   - [ ] *Pista 3:* Traza la tangente desde O a una circunferencia auxiliar por A y B y llévala sobre r con el compás.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Hay dos puntos A y B y una recta r. Buscamos las circunferencias que pasan por A y B y son tangentes a r, y sus puntos de tangencia con r.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La recta AB corta a r en O, que tiene la misma potencia respecto a todas las circunferencias por A y B. Esa potencia, OA por OB, da la distancia de O a los puntos de tangencia.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina una circunferencia por A y B cuyo centro se desliza por la mediatriz: va cambiando de tamaño hasta tocar a r. Solo en dos posiciones es tangente.
   - [ ] *Solución, paso 4 · 4. El trazado:* Traza la recta AB y su corte O con r.
   - [ ] *Solución, paso 5 · 4. El trazado:* Traza una circunferencia auxiliar por A y B, con centro en la mediatriz, y la tangente desde O: su longitud OT es la que da la potencia.
   - [ ] *Solución, paso 6 · 4. El trazado:* Con centro en O y radio OT, corta a r en los puntos de tangencia T₁ y T₂. Arrastra Z hasta uno de ellos.
   - [ ] *Solución, paso 7 · 5. Comprobación:* Comprobación: T₁ y T₂ están en r a la misma distancia de O, la raíz de OA por OB, y quedan a los dos lados de O.
   - [ ] *Solución, paso 8 · 6. Error típico:* **[REVISAR]** Error típico: tomar O como punto de tangencia. O solo da la potencia: el punto de tangencia está a una distancia OT de O.
6. [ ] *construcción en la lámina, dificultad 2*: Arrastra Z hasta el centro de una de las circunferencias que pasan por A y B y son tangentes a la recta inclinada r.
   - [ ] *Pista 1:* Cada centro equidista de A y de B y está sobre la perpendicular a r por el punto de tangencia.
   - [ ] *Pista 2:* Los puntos de tangencia se hallan con la potencia del punto O, donde AB corta a r.
   - [ ] *Pista 3:* Halla T₁ con la tangente desde O a una circunferencia auxiliar por A y B; el centro está donde la perpendicular a r por T₁ corta a la mediatriz.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Hay dos puntos A y B y una recta r. Buscamos las circunferencias que pasan por A y B y son tangentes a r, y de ellas sus centros.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La recta AB corta a r en O, que tiene la misma potencia respecto a todas las circunferencias por A y B. Esa potencia, OA por OB, da la distancia de O a los puntos de tangencia.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina una circunferencia por A y B cuyo centro se desliza por la mediatriz: va cambiando de tamaño hasta tocar a r. Solo en dos posiciones es tangente.
   - [ ] *Solución, paso 4 · 4. El trazado:* Traza la recta AB y su corte O con r.
   - [ ] *Solución, paso 5 · 4. El trazado:* Traza una circunferencia auxiliar por A y B, con centro en la mediatriz, y la tangente desde O: su longitud OT es la que da la potencia.
   - [ ] *Solución, paso 6 · 4. El trazado:* Con centro en O y radio OT, corta a r en los puntos de tangencia T₁ y T₂.
   - [ ] *Solución, paso 7 · 4. El trazado:* Cada centro está en la perpendicular a r por su punto de tangencia y en la mediatriz de AB. Arrastra Z hasta uno de ellos.
   - [ ] *Solución, paso 8 · 5. Comprobación:* Comprobación: cada centro equidista de A, de B y de su punto de tangencia, y la circunferencia toca a r solo en ese punto.
   - [ ] *Solución, paso 9 · 6. Error típico:* **[REVISAR]** Error típico: poner el centro sobre la recta AB. El centro equidista de A y B: está en su mediatriz, no en AB.
7. [ ] *construcción en la lámina, dificultad 3*: Como en la PAU, con otros datos: arrastra Z hasta el centro radical de las tres circunferencias.
   - [ ] *Pista 1:* El centro radical es el único punto con la misma potencia respecto a las tres circunferencias: sus tres tangentes miden lo mismo.
   - [ ] *Pista 2:* El eje radical de dos circunferencias es perpendicular a la recta que une sus centros.
   - [ ] *Pista 3:* Traza el eje radical de k₁ y k₄ y el de k₂ y k₄: se cortan en el centro radical.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Hay tres circunferencias, k₁, k₂ y k₄, y un punto Z que se puede arrastrar. Buscamos el punto desde el que las tres tangentes miden lo mismo.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Cada pareja de circunferencias tiene un eje radical, la recta de los puntos con la misma potencia respecto a las dos. Los tres ejes se cortan en un punto: el centro radical.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina un punto que se desliza por el eje radical de k₁ y k₂: las tangentes a las dos miden siempre lo mismo. Solo en un punto de esa recta también coincide la de k₄.
   - [ ] *Solución, paso 4 · 4. El trazado:* Traza el eje radical e′ de k₁ y k₄: es perpendicular a la recta de sus centros.
   - [ ] *Solución, paso 5 · 4. El trazado:* Traza de la misma manera el eje radical e″ de k₂ y k₄.
   - [ ] *Solución, paso 6 · 4. El trazado:* Los dos ejes se cortan en el centro radical CR. Arrastra Z hasta ese punto.
   - [ ] *Solución, paso 7 · 5. Comprobación:* Comprobación: el eje radical de k₁ y k₂ también pasa por CR, y las tres tangentes desde CR miden lo mismo.
   - [ ] *Solución, paso 8 · 6. Error típico:* **[REVISAR]** Error típico: trazar el eje radical paralelo a la recta de los centros. Siempre es perpendicular a ella.
8. [ ] *construcción en la lámina, dificultad 3*: Como en la PAU, con otros datos: arrastra Z hasta uno de los puntos de tangencia con r de las circunferencias que pasan por A y B.
   - [ ] *Pista 1:* Todas las circunferencias que pasan por A y B tienen la misma potencia respecto al punto donde AB corta a r.
   - [ ] *Pista 2:* Esa potencia es el cuadrado de la distancia de ese punto a los puntos de tangencia con r.
   - [ ] *Pista 3:* Traza la tangente desde O a una circunferencia auxiliar por A y B y llévala sobre r con el compás.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Hay dos puntos A y B y una recta r. Buscamos las circunferencias que pasan por A y B y son tangentes a r, y sus puntos de tangencia con r.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La recta AB corta a r en O, que tiene la misma potencia respecto a todas las circunferencias por A y B. Esa potencia, OA por OB, da la distancia de O a los puntos de tangencia.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina una circunferencia por A y B cuyo centro se desliza por la mediatriz: va cambiando de tamaño hasta tocar a r. Solo en dos posiciones es tangente.
   - [ ] *Solución, paso 4 · 4. El trazado:* Traza la recta AB y su corte O con r.
   - [ ] *Solución, paso 5 · 4. El trazado:* Traza una circunferencia auxiliar por A y B, con centro en la mediatriz, y la tangente desde O: su longitud OT es la que da la potencia.
   - [ ] *Solución, paso 6 · 4. El trazado:* Con centro en O y radio OT, corta a r en los puntos de tangencia T₁ y T₂. Arrastra Z hasta uno de ellos.
   - [ ] *Solución, paso 7 · 5. Comprobación:* Comprobación: T₁ y T₂ están en r a la misma distancia de O, la raíz de OA por OB, y quedan a los dos lados de O.
   - [ ] *Solución, paso 8 · 6. Error típico:* **[REVISAR]** Error típico: tomar O como punto de tangencia. O solo da la potencia: el punto de tangencia está a una distancia OT de O.
9. [ ] *construcción en la lámina, dificultad 3*: Como en la PAU, con otros datos: arrastra Z hasta el centro de una de las circunferencias que pasan por A y B y son tangentes a r.
   - [ ] *Pista 1:* Cada centro equidista de A y de B y está sobre la perpendicular a r por el punto de tangencia.
   - [ ] *Pista 2:* Los puntos de tangencia se hallan con la potencia del punto O, donde AB corta a r.
   - [ ] *Pista 3:* Halla T₁ con la tangente desde O a una circunferencia auxiliar por A y B; el centro está donde la perpendicular a r por T₁ corta a la mediatriz.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Hay dos puntos A y B y una recta r. Buscamos las circunferencias que pasan por A y B y son tangentes a r, y de ellas sus centros.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La recta AB corta a r en O, que tiene la misma potencia respecto a todas las circunferencias por A y B. Esa potencia, OA por OB, da la distancia de O a los puntos de tangencia.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina una circunferencia por A y B cuyo centro se desliza por la mediatriz: va cambiando de tamaño hasta tocar a r. Solo en dos posiciones es tangente.
   - [ ] *Solución, paso 4 · 4. El trazado:* Traza la recta AB y su corte O con r.
   - [ ] *Solución, paso 5 · 4. El trazado:* Traza una circunferencia auxiliar por A y B, con centro en la mediatriz, y la tangente desde O: su longitud OT es la que da la potencia.
   - [ ] *Solución, paso 6 · 4. El trazado:* Con centro en O y radio OT, corta a r en los puntos de tangencia T₁ y T₂.
   - [ ] *Solución, paso 7 · 4. El trazado:* Cada centro está en la perpendicular a r por su punto de tangencia y en la mediatriz de AB. Arrastra Z hasta uno de ellos.
   - [ ] *Solución, paso 8 · 5. Comprobación:* Comprobación: cada centro equidista de A, de B y de su punto de tangencia, y la circunferencia toca a r solo en ese punto.
   - [ ] *Solución, paso 9 · 6. Error típico:* **[REVISAR]** Error típico: poner el centro sobre la recta AB. El centro equidista de A y B: está en su mediatriz, no en AB.

### II-03 · Homología y afinidad: la sombra de una figura

Fichero: `src/content/lessons/14-homologia-afinidad.json` · DT II · nivel Avanzado

- [ ] **Saber básico:** Transformaciones geométricas: homología y afinidad. Elementos (centro, eje, dirección y pares de puntos homólogos) y figura homóloga.

**Pasos**

1. [ ] Un foco de luz proyecta la sombra del triángulo ABC sobre otro plano. Los dos planos se cortan en el eje e, y cada punto del eje es su propia sombra.
2. [ ] Abatimos el plano de la sombra sobre el del triángulo, girándolo alrededor del eje. La sombra queda en la lámina: es la figura homóloga A′B′C′.
3. [ ] En la lámina, las rectas que unen cada punto con su homólogo pasan todas por el centro de homología O. Mueve el deslizador para ver de dónde sale cada punto.
4. [ ] Sin el 3D, una homología queda definida por su centro O, su eje e y un par de puntos homólogos, A y A′. A′ está siempre en la recta OA.
5. [ ] La recta AB corta al eje en M, que es su propio homólogo. La homóloga de AB pasa por M y por A′, y B′ está donde corta a la recta OB.
6. [ ] Con C se hace lo mismo, usando la recta AC y su punto doble N. Al unir A′, B′ y C′ queda la figura homóloga.
7. [ ] Si la luz es el sol, sus rayos son paralelos y la sombra es una afinidad. No hay centro: los puntos homólogos se unen con rectas paralelas a una dirección.
8. [ ] El trazado es el de la homología, cambiando la recta OB por la paralela a AA′ por B. La homóloga de AB sigue pasando por su punto doble M.

**Ejercicios**

1. [ ] *construcción en la lámina, dificultad 1*: Con el eje horizontal, la homología tiene centro O y transforma A en A′. Arrastra Z hasta B′, el homólogo de B.
   - [ ] *Pista 1:* Una recta y su homóloga se cortan siempre en el eje: los puntos del eje son dobles.
   - [ ] *Pista 2:* El homólogo de B está en la recta OB y en la recta que une A′ con el punto doble de AB.
   - [ ] *Pista 3:* Prolonga AB hasta el eje, únelo con A′ y corta con la recta OB.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Una homología queda definida por su centro O, su eje e y un par de puntos homólogos, A y A′. Hay que hallar el homólogo de B.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Cada punto está alineado con su homólogo y el centro O, y cada recta corta a su homóloga en el eje. Con esas dos propiedades se obtiene cualquier homólogo.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina la figura proyectada desde O sobre otro plano y abatida: cada punto se desliza por la recta que lo une con O, y los puntos del eje no se mueven.
   - [ ] *Solución, paso 4 · 4. El trazado:* Prolonga la recta AB hasta cortar al eje: ese punto es su propio homólogo, y la homóloga de AB pasa por él y por A′.
   - [ ] *Solución, paso 5 · 4. El trazado:* Traza la recta del punto doble a A′ y la recta OB: se cortan en B′, el homólogo de B. Arrastra Z hasta él.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: O, B y B′ están alineados, y las rectas AB y A′B′ se cortan en el eje.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: trazar por A′ una paralela a AB. En una homología la recta y su homóloga se cortan en el eje, no son paralelas.
2. [ ] *construcción en la lámina, dificultad 1*: Con el eje horizontal y AA′ vertical, arrastra Z hasta B′, el afín de B.
   - [ ] *Pista 1:* En una afinidad, las rectas que unen puntos afines son todas paralelas entre sí.
   - [ ] *Pista 2:* El afín de B está en la paralela a AA′ por B y en la recta que une A′ con el punto doble de AB.
   - [ ] *Pista 3:* Prolonga AB hasta el eje, únelo con A′ y corta con la paralela a AA′ por B.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Una afinidad queda definida por su eje e y un par de puntos afines, A y A′. Hay que hallar el afín de B.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Cada recta corta a su afín en el eje, y las rectas que unen puntos afines son paralelas, con la dirección de AA′. Con eso se obtiene cualquier afín.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina la figura deslizándose en la dirección de AA′: cada punto se mueve por una recta paralela a AA′, y los puntos del eje no se mueven.
   - [ ] *Solución, paso 4 · 4. El trazado:* Prolonga la recta AB hasta cortar al eje: ese punto es doble. Traza por B la paralela a AA′.
   - [ ] *Solución, paso 5 · 4. El trazado:* La recta del punto doble a A′ corta a esa paralela en B′, el afín de B. Arrastra Z hasta él.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: BB′ es paralela a AA′, y las rectas AB y A′B′ se cortan en el eje.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: trazar por B la paralela al eje en vez de a AA′. La dirección de la afinidad la da el par A y A′.
3. [ ] *construcción en la lámina, dificultad 1*: Con el eje horizontal y AA′ vertical, arrastra Z hasta C′, el afín de C.
   - [ ] *Pista 1:* En una afinidad, las rectas que unen puntos afines son todas paralelas entre sí.
   - [ ] *Pista 2:* El afín de C está en la paralela a AA′ por C y en la recta que une A′ con el punto doble de AC.
   - [ ] *Pista 3:* Prolonga AC hasta el eje, únelo con A′ y corta con la paralela a AA′ por C.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Una afinidad queda definida por su eje e y un par de puntos afines, A y A′. Hay que hallar el afín de C.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Cada recta corta a su afín en el eje, y las rectas que unen puntos afines son paralelas, con la dirección de AA′. Con eso se obtiene cualquier afín.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina la figura deslizándose en la dirección de AA′: cada punto se mueve por una recta paralela a AA′, y los puntos del eje no se mueven.
   - [ ] *Solución, paso 4 · 4. El trazado:* Prolonga la recta AC hasta cortar al eje: ese punto es doble. Traza por C la paralela a AA′.
   - [ ] *Solución, paso 5 · 4. El trazado:* La recta del punto doble a A′ corta a esa paralela en C′, el afín de C. Arrastra Z hasta él.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: CC′ es paralela a AA′, y las rectas AC y A′C′ se cortan en el eje.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: trazar por C la paralela al eje en vez de a AA′. La dirección de la afinidad la da el par A y A′.
4. [ ] *construcción en la lámina, dificultad 2*: La homología tiene su eje inclinado. Arrastra Z hasta B′, el homólogo de B.
   - [ ] *Pista 1:* Una recta y su homóloga se cortan siempre en el eje: los puntos del eje son dobles.
   - [ ] *Pista 2:* El homólogo de B está en la recta OB y en la recta que une A′ con el punto doble de AB.
   - [ ] *Pista 3:* Prolonga AB hasta el eje, únelo con A′ y corta con la recta OB.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Una homología queda definida por su centro O, su eje e y un par de puntos homólogos, A y A′. Hay que hallar el homólogo de B.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Cada punto está alineado con su homólogo y el centro O, y cada recta corta a su homóloga en el eje. Con esas dos propiedades se obtiene cualquier homólogo.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina la figura proyectada desde O sobre otro plano y abatida: cada punto se desliza por la recta que lo une con O, y los puntos del eje no se mueven.
   - [ ] *Solución, paso 4 · 4. El trazado:* Prolonga la recta AB hasta cortar al eje: ese punto es su propio homólogo, y la homóloga de AB pasa por él y por A′.
   - [ ] *Solución, paso 5 · 4. El trazado:* Traza la recta del punto doble a A′ y la recta OB: se cortan en B′, el homólogo de B. Arrastra Z hasta él.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: O, B y B′ están alineados, y las rectas AB y A′B′ se cortan en el eje.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: trazar por A′ una paralela a AB. En una homología la recta y su homóloga se cortan en el eje, no son paralelas.
5. [ ] *construcción en la lámina, dificultad 2*: Con el eje inclinado, arrastra Z hasta C′, el homólogo de C en la homología de centro O.
   - [ ] *Pista 1:* Una recta y su homóloga se cortan siempre en el eje: los puntos del eje son dobles.
   - [ ] *Pista 2:* El homólogo de C está en la recta OC y en la recta que une A′ con el punto doble de AC.
   - [ ] *Pista 3:* Prolonga AC hasta el eje, únelo con A′ y corta con la recta OC.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Una homología queda definida por su centro O, su eje e y un par de puntos homólogos, A y A′. Hay que hallar el homólogo de C.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Cada punto está alineado con su homólogo y el centro O, y cada recta corta a su homóloga en el eje. Con esas dos propiedades se obtiene cualquier homólogo.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina la figura proyectada desde O sobre otro plano y abatida: cada punto se desliza por la recta que lo une con O, y los puntos del eje no se mueven.
   - [ ] *Solución, paso 4 · 4. El trazado:* Prolonga la recta AC hasta cortar al eje: ese punto es su propio homólogo, y la homóloga de AC pasa por él y por A′.
   - [ ] *Solución, paso 5 · 4. El trazado:* Traza la recta del punto doble a A′ y la recta OC: se cortan en C′, el homólogo de C. Arrastra Z hasta él.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: O, C y C′ están alineados, y las rectas AC y A′C′ se cortan en el eje.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: trazar por A′ una paralela a AC. En una homología la recta y su homóloga se cortan en el eje, no son paralelas.
6. [ ] *construcción en la lámina, dificultad 2*: La afinidad tiene el eje inclinado y AA′ oblicua. Arrastra Z hasta B′, el afín de B.
   - [ ] *Pista 1:* En una afinidad, las rectas que unen puntos afines son todas paralelas entre sí.
   - [ ] *Pista 2:* El afín de B está en la paralela a AA′ por B y en la recta que une A′ con el punto doble de AB.
   - [ ] *Pista 3:* Prolonga AB hasta el eje, únelo con A′ y corta con la paralela a AA′ por B.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Una afinidad queda definida por su eje e y un par de puntos afines, A y A′. Hay que hallar el afín de B.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Cada recta corta a su afín en el eje, y las rectas que unen puntos afines son paralelas, con la dirección de AA′. Con eso se obtiene cualquier afín.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina la figura deslizándose en la dirección de AA′: cada punto se mueve por una recta paralela a AA′, y los puntos del eje no se mueven.
   - [ ] *Solución, paso 4 · 4. El trazado:* Prolonga la recta AB hasta cortar al eje: ese punto es doble. Traza por B la paralela a AA′.
   - [ ] *Solución, paso 5 · 4. El trazado:* La recta del punto doble a A′ corta a esa paralela en B′, el afín de B. Arrastra Z hasta él.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: BB′ es paralela a AA′, y las rectas AB y A′B′ se cortan en el eje.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: trazar por B la paralela al eje en vez de a AA′. La dirección de la afinidad la da el par A y A′.
7. [ ] *construcción en la lámina, dificultad 3*: Como en la PAU: con la homología de centro O, eje e y par A, A′, halla el homólogo de D y arrastra Z hasta él.
   - [ ] *Pista 1:* Una recta y su homóloga se cortan siempre en el eje: los puntos del eje son dobles.
   - [ ] *Pista 2:* El homólogo de D está en la recta OD y en la recta que une A′ con el punto doble de AD.
   - [ ] *Pista 3:* Prolonga AD hasta el eje, únelo con A′ y corta con la recta OD.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Una homología queda definida por su centro O, su eje e y un par de puntos homólogos, A y A′. Hay que hallar el homólogo de D.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Cada punto está alineado con su homólogo y el centro O, y cada recta corta a su homóloga en el eje. Con esas dos propiedades se obtiene cualquier homólogo.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina la figura proyectada desde O sobre otro plano y abatida: cada punto se desliza por la recta que lo une con O, y los puntos del eje no se mueven.
   - [ ] *Solución, paso 4 · 4. El trazado:* Prolonga la recta AD hasta cortar al eje: ese punto es su propio homólogo, y la homóloga de AD pasa por él y por A′.
   - [ ] *Solución, paso 5 · 4. El trazado:* Traza la recta del punto doble a A′ y la recta OD: se cortan en D′, el homólogo de D. Arrastra Z hasta él.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: O, D y D′ están alineados, y las rectas AD y A′D′ se cortan en el eje.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: trazar por A′ una paralela a AD. En una homología la recta y su homóloga se cortan en el eje, no son paralelas.
8. [ ] *construcción en la lámina, dificultad 3*: Como en la PAU: arrastra Z hasta C′, el homólogo de C en la homología de centro O, eje e y par A, A′.
   - [ ] *Pista 1:* Una recta y su homóloga se cortan siempre en el eje: los puntos del eje son dobles.
   - [ ] *Pista 2:* El homólogo de C está en la recta OC y en la recta que une A′ con el punto doble de AC.
   - [ ] *Pista 3:* Prolonga AC hasta el eje, únelo con A′ y corta con la recta OC.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Una homología queda definida por su centro O, su eje e y un par de puntos homólogos, A y A′. Hay que hallar el homólogo de C.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Cada punto está alineado con su homólogo y el centro O, y cada recta corta a su homóloga en el eje. Con esas dos propiedades se obtiene cualquier homólogo.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina la figura proyectada desde O sobre otro plano y abatida: cada punto se desliza por la recta que lo une con O, y los puntos del eje no se mueven.
   - [ ] *Solución, paso 4 · 4. El trazado:* Prolonga la recta AC hasta cortar al eje: ese punto es su propio homólogo, y la homóloga de AC pasa por él y por A′.
   - [ ] *Solución, paso 5 · 4. El trazado:* Traza la recta del punto doble a A′ y la recta OC: se cortan en C′, el homólogo de C. Arrastra Z hasta él.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: O, C y C′ están alineados, y las rectas AC y A′C′ se cortan en el eje.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: trazar por A′ una paralela a AC. En una homología la recta y su homóloga se cortan en el eje, no son paralelas.
9. [ ] *construcción en la lámina, dificultad 3*: Como en la PAU: con la afinidad de eje e y par A, A′, arrastra Z hasta C′, el afín de C.
   - [ ] *Pista 1:* En una afinidad, las rectas que unen puntos afines son todas paralelas entre sí.
   - [ ] *Pista 2:* El afín de C está en la paralela a AA′ por C y en la recta que une A′ con el punto doble de AC.
   - [ ] *Pista 3:* Prolonga AC hasta el eje, únelo con A′ y corta con la paralela a AA′ por C.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Una afinidad queda definida por su eje e y un par de puntos afines, A y A′. Hay que hallar el afín de C.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Cada recta corta a su afín en el eje, y las rectas que unen puntos afines son paralelas, con la dirección de AA′. Con eso se obtiene cualquier afín.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina la figura deslizándose en la dirección de AA′: cada punto se mueve por una recta paralela a AA′, y los puntos del eje no se mueven.
   - [ ] *Solución, paso 4 · 4. El trazado:* Prolonga la recta AC hasta cortar al eje: ese punto es doble. Traza por C la paralela a AA′.
   - [ ] *Solución, paso 5 · 4. El trazado:* La recta del punto doble a A′ corta a esa paralela en C′, el afín de C. Arrastra Z hasta él.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: CC′ es paralela a AA′, y las rectas AC y A′C′ se cortan en el eje.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: trazar por C la paralela al eje en vez de a AA′. La dirección de la afinidad la da el par A y A′.

### II-04 · Cónicas: definición, trazado por puntos y tangentes

Fichero: `src/content/lessons/15-conicas-trazado.json` · DT II · nivel Avanzado

- [ ] **Saber básico:** Curvas cónicas: elipse, hipérbola y parábola como lugares geométricos. Elementos, trazado por puntos y rectas tangentes.

**Pasos**

1. [ ] Mueve P por la curva: sus distancias a los focos F₁ y F₂ cambian, pero su suma es siempre 70 mm. La elipse es el lugar de los puntos cuya suma de distancias a dos focos es constante.
2. [ ] Esa suma es el eje mayor A₁A₂, que mide 2a. El eje menor B₁B₂ es perpendicular en el centro O y mide 2b.
3. [ ] Si te dan los ejes, los focos salen con el compás: centro en B₁ y radio a. Corta al eje mayor en F₁ y F₂.
4. [ ] Trazado por puntos: toma X entre los focos. Con radios A₁X y XA₂ desde cada foco, los arcos se cortan en cuatro puntos de la elipse.
5. [ ] Mueve X entre los focos: el punto 1 va dibujando la elipse. Con suficientes puntos, se unen a mano alzada o con plantilla.
6. [ ] La tangente en un punto T es la bisectriz exterior del ángulo que forman los radios vectores TF₁ y TF₂. Mueve T y mira cómo la acompaña.
7. [ ] En la hipérbola es la diferencia de distancias a los focos la que es constante: el eje real, 2a. Tiene dos ramas, una alrededor de cada foco.
8. [ ] Su tangente en Q es la bisectriz interior del ángulo de los radios vectores. Es el mismo trazado que en la elipse, con la otra bisectriz.
9. [ ] La parábola es el lugar de los puntos que están a la misma distancia del foco F que de la directriz d. Su vértice V está en el punto medio entre los dos.
10. [ ] La tangente en R es la bisectriz del ángulo entre RF y la perpendicular a la directriz. Las tres cónicas salen de cortar un cono: compruébalo en el laboratorio de cónicas.

**Ejercicios**

1. [ ] *construcción en la lámina, dificultad 1*: Te dan los ejes de una elipse, con a = 30 y b = 18 mm. Arrastra Z hasta uno de sus focos.
   - [ ] *Pista 1:* Un extremo del eje menor equidista de los dos focos, y esa distancia es la mitad del eje mayor.
   - [ ] *Pista 2:* Con el compás en B₁ y esa distancia se corta el eje mayor en los focos.
   - [ ] *Pista 3:* Pincha en B₁, abre el compás hasta A₁O y corta el eje mayor.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Conocemos los dos ejes de una elipse, A₁A₂ y B₁B₂, y buscamos sus focos. El punto Z se puede arrastrar.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La suma de las distancias de un punto de la elipse a los focos es el eje mayor, 2a. En un extremo del eje menor las dos distancias son iguales, así que cada una mide a.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina un punto que recorre la elipse con sus dos radios vectores a los focos: su suma no cambia. Al llegar a B₁ los dos radios son iguales.
   - [ ] *Solución, paso 4 · 4. El trazado:* Traza el eje mayor A₁A₂ y el eje menor B₁B₂, que se cruzan en el centro O.
   - [ ] *Solución, paso 5 · 4. El trazado:* Con centro en B₁ y radio la mitad del eje mayor, traza un arco que corte al eje mayor en los dos focos. Arrastra Z hasta uno.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: los focos están a la misma distancia del centro, y esa distancia c cumple que c² es a² menos b². Cada foco está a la distancia a de B₁ y de B₂.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: tomar como radio del arco la mitad del eje menor. El radio es la mitad del eje mayor, que es la distancia de B a cada foco.
2. [ ] *construcción en la lámina, dificultad 1*: Arrastra Z hasta el vértice de la parábola de foco F y directriz d, que es horizontal.
   - [ ] *Pista 1:* El vértice de la parábola equidista del foco y de la directriz.
   - [ ] *Pista 2:* Está sobre el eje, que es la perpendicular a la directriz por el foco.
   - [ ] *Pista 3:* Baja desde F la perpendicular a d y toma el punto medio entre F y su pie.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Una parábola está definida por su foco F y su directriz d. Buscamos su vértice V, y el punto Z se puede arrastrar.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Todos los puntos de una parábola equidistan del foco y de la directriz. El vértice, que está en el eje, queda a mitad de camino entre ambos.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina un punto que recorre la parábola: su distancia a F y su distancia a d son siempre iguales. El más cercano a la directriz, sobre el eje, es el vértice.
   - [ ] *Solución, paso 4 · 4. El trazado:* Traza desde F la perpendicular a la directriz: es el eje de la parábola, y corta a d en H₀.
   - [ ] *Solución, paso 5 · 4. El trazado:* El vértice V es el punto medio de F y H₀. Arrastra Z hasta él.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: V está sobre el eje y a la misma distancia de F que de d. La parábola pasa por V y se abre hacia el lado del foco.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: poner el vértice en el foco. El foco queda a la mitad de la distancia a la directriz que el vértice: V equidista de F y de d.
3. [ ] *construcción en la lámina, dificultad 1*: Los semiejes de la elipse miden 25 y 15 mm. Arrastra Z hasta uno de los focos.
   - [ ] *Pista 1:* Un extremo del eje menor equidista de los dos focos, y esa distancia es la mitad del eje mayor.
   - [ ] *Pista 2:* Con el compás en B₁ y esa distancia se corta el eje mayor en los focos.
   - [ ] *Pista 3:* Pincha en B₁, abre el compás hasta A₁O y corta el eje mayor.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Conocemos los dos ejes de una elipse, A₁A₂ y B₁B₂, y buscamos sus focos. El punto Z se puede arrastrar.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La suma de las distancias de un punto de la elipse a los focos es el eje mayor, 2a. En un extremo del eje menor las dos distancias son iguales, así que cada una mide a.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina un punto que recorre la elipse con sus dos radios vectores a los focos: su suma no cambia. Al llegar a B₁ los dos radios son iguales.
   - [ ] *Solución, paso 4 · 4. El trazado:* Traza el eje mayor A₁A₂ y el eje menor B₁B₂, que se cruzan en el centro O.
   - [ ] *Solución, paso 5 · 4. El trazado:* Con centro en B₁ y radio la mitad del eje mayor, traza un arco que corte al eje mayor en los dos focos. Arrastra Z hasta uno.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: los focos están a la misma distancia del centro, y esa distancia c cumple que c² es a² menos b². Cada foco está a la distancia a de B₁ y de B₂.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: tomar como radio del arco la mitad del eje menor. El radio es la mitad del eje mayor, que es la distancia de B a cada foco.
4. [ ] *construcción en la lámina, dificultad 2*: Los ejes de la elipse están inclinados. Arrastra Z hasta uno de sus focos.
   - [ ] *Pista 1:* Un extremo del eje menor equidista de los dos focos, y esa distancia es la mitad del eje mayor.
   - [ ] *Pista 2:* Con el compás en B₁ y esa distancia se corta el eje mayor en los focos.
   - [ ] *Pista 3:* Pincha en B₁, abre el compás hasta A₁O y corta el eje mayor.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Conocemos los dos ejes de una elipse, A₁A₂ y B₁B₂, y buscamos sus focos. El punto Z se puede arrastrar.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La suma de las distancias de un punto de la elipse a los focos es el eje mayor, 2a. En un extremo del eje menor las dos distancias son iguales, así que cada una mide a.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina un punto que recorre la elipse con sus dos radios vectores a los focos: su suma no cambia. Al llegar a B₁ los dos radios son iguales.
   - [ ] *Solución, paso 4 · 4. El trazado:* Traza el eje mayor A₁A₂ y el eje menor B₁B₂, que se cruzan en el centro O.
   - [ ] *Solución, paso 5 · 4. El trazado:* Con centro en B₁ y radio la mitad del eje mayor, traza un arco que corte al eje mayor en los dos focos. Arrastra Z hasta uno.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: los focos están a la misma distancia del centro, y esa distancia c cumple que c² es a² menos b². Cada foco está a la distancia a de B₁ y de B₂.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: tomar como radio del arco la mitad del eje menor. El radio es la mitad del eje mayor, que es la distancia de B a cada foco.
5. [ ] *construcción en la lámina, dificultad 2*: La directriz de la parábola está inclinada. Arrastra Z hasta su vértice.
   - [ ] *Pista 1:* El vértice de la parábola equidista del foco y de la directriz.
   - [ ] *Pista 2:* Está sobre el eje, que es la perpendicular a la directriz por el foco.
   - [ ] *Pista 3:* Baja desde F la perpendicular a d y toma el punto medio entre F y su pie.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Una parábola está definida por su foco F y su directriz d. Buscamos su vértice V, y el punto Z se puede arrastrar.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Todos los puntos de una parábola equidistan del foco y de la directriz. El vértice, que está en el eje, queda a mitad de camino entre ambos.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina un punto que recorre la parábola: su distancia a F y su distancia a d son siempre iguales. El más cercano a la directriz, sobre el eje, es el vértice.
   - [ ] *Solución, paso 4 · 4. El trazado:* Traza desde F la perpendicular a la directriz: es el eje de la parábola, y corta a d en H₀.
   - [ ] *Solución, paso 5 · 4. El trazado:* El vértice V es el punto medio de F y H₀. Arrastra Z hasta él.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: V está sobre el eje y a la misma distancia de F que de d. La parábola pasa por V y se abre hacia el lado del foco.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: poner el vértice en el foco. El foco queda a la mitad de la distancia a la directriz que el vértice: V equidista de F y de d.
6. [ ] *construcción en la lámina, dificultad 2*: Con los focos y los vértices dados, construye puntos de la elipse con el punto X. Arrastra Z hasta uno de ellos.
   - [ ] *Pista 1:* Cada punto de la elipse cumple que la suma de sus distancias a los focos es el eje mayor.
   - [ ] *Pista 2:* Un punto X del eje mayor lo reparte en dos trozos, A₁X y XA₂, que serán los radios.
   - [ ] *Pista 3:* Traza desde F₁ un arco de radio A₁X y desde F₂ uno de radio XA₂: se cortan en dos puntos de la curva.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Conocemos los focos y los vértices del eje mayor de una elipse, y queremos construir puntos de la curva. Arrastra Z hasta uno de los que salen con el punto X.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Un punto de la elipse tiene las distancias a los focos sumando 2a. Si X está en el eje mayor, A₁X y XA₂ suman justo 2a.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina el punto X deslizándose entre los focos: cada posición reparte 2a en dos radios, y los arcos con esos radios se cruzan sobre la elipse.
   - [ ] *Solución, paso 4 · 4. El trazado:* Marca X entre los focos y toma las medidas A₁X y XA₂ con el compás.
   - [ ] *Solución, paso 5 · 4. El trazado:* Con centro en F₁ y radio A₁X, y con centro en F₂ y radio XA₂, traza dos arcos: se cortan en dos puntos de la elipse.
   - [ ] *Solución, paso 6 · 4. El trazado:* Intercambia los radios para obtener otros dos puntos simétricos. Arrastra Z hasta uno de los cuatro.
   - [ ] *Solución, paso 7 · 5. Comprobación:* Comprobación: en cada uno de los cuatro puntos, las distancias a F₁ y a F₂ suman el eje mayor, 2a.
   - [ ] *Solución, paso 8 · 6. Error típico:* **[REVISAR]** Error típico: usar el mismo radio desde los dos focos. Los radios son A₁X y XA₂, que suman 2a pero no son iguales.
7. [ ] *construcción en la lámina, dificultad 3*: Como en la PAU: traza la tangente a la hipérbola en Q y arrastra Z hasta el punto donde corta a la recta de los focos.
   - [ ] *Pista 1:* La tangente a la hipérbola en Q es la bisectriz interior del ángulo que forman los radios vectores.
   - [ ] *Pista 2:* Los radios vectores son los segmentos que unen Q con los focos.
   - [ ] *Pista 3:* Une Q con F₁ y F₂, traza la bisectriz del ángulo y corta con la recta de los focos.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Tenemos una hipérbola con focos F₁ y F₂ y un punto Q de ella. Buscamos dónde su tangente en Q corta a la recta de los focos.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La tangente a la hipérbola en un punto es la bisectriz interior del ángulo que forman sus radios vectores a los focos.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina Q recorriendo la hipérbola: la diferencia de sus distancias a los focos es constante, y la tangente gira dejando iguales los ángulos con los dos radios.
   - [ ] *Solución, paso 4 · 4. El trazado:* Une Q con los focos F₁ y F₂: son los radios vectores.
   - [ ] *Solución, paso 5 · 4. El trazado:* Traza la bisectriz interior del ángulo F₁QF₂: es la tangente. Su corte con la recta de los focos es I; arrastra Z hasta él.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: I divide el segmento F₁F₂ en la misma razón que los radios vectores, y la tangente deja los dos focos a distinto lado.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: trazar la bisectriz exterior. Esa es la tangente a la elipse; en la hipérbola la tangente es la bisectriz interior.
8. [ ] *construcción en la lámina, dificultad 3*: Como en la PAU, con los focos en posición general: arrastra Z hasta el corte de la tangente en Q con la recta de los focos.
   - [ ] *Pista 1:* La tangente a la hipérbola en Q es la bisectriz interior del ángulo que forman los radios vectores.
   - [ ] *Pista 2:* Los radios vectores son los segmentos que unen Q con los focos.
   - [ ] *Pista 3:* Une Q con F₁ y F₂, traza la bisectriz del ángulo y corta con la recta de los focos.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Tenemos una hipérbola con focos F₁ y F₂ y un punto Q de ella. Buscamos dónde su tangente en Q corta a la recta de los focos.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La tangente a la hipérbola en un punto es la bisectriz interior del ángulo que forman sus radios vectores a los focos.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina Q recorriendo la hipérbola: la diferencia de sus distancias a los focos es constante, y la tangente gira dejando iguales los ángulos con los dos radios.
   - [ ] *Solución, paso 4 · 4. El trazado:* Une Q con los focos F₁ y F₂: son los radios vectores.
   - [ ] *Solución, paso 5 · 4. El trazado:* Traza la bisectriz interior del ángulo F₁QF₂: es la tangente. Su corte con la recta de los focos es I; arrastra Z hasta él.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: I divide el segmento F₁F₂ en la misma razón que los radios vectores, y la tangente deja los dos focos a distinto lado.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: trazar la bisectriz exterior. Esa es la tangente a la elipse; en la hipérbola la tangente es la bisectriz interior.
9. [ ] *construcción en la lámina, dificultad 3*: Como en la PAU: arrastra Z hasta el vértice de la parábola de foco F y directriz d.
   - [ ] *Pista 1:* El vértice de la parábola equidista del foco y de la directriz.
   - [ ] *Pista 2:* Está sobre el eje, que es la perpendicular a la directriz por el foco.
   - [ ] *Pista 3:* Baja desde F la perpendicular a d y toma el punto medio entre F y su pie.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Una parábola está definida por su foco F y su directriz d. Buscamos su vértice V, y el punto Z se puede arrastrar.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Todos los puntos de una parábola equidistan del foco y de la directriz. El vértice, que está en el eje, queda a mitad de camino entre ambos.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina un punto que recorre la parábola: su distancia a F y su distancia a d son siempre iguales. El más cercano a la directriz, sobre el eje, es el vértice.
   - [ ] *Solución, paso 4 · 4. El trazado:* Traza desde F la perpendicular a la directriz: es el eje de la parábola, y corta a d en H₀.
   - [ ] *Solución, paso 5 · 4. El trazado:* El vértice V es el punto medio de F y H₀. Arrastra Z hasta él.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: V está sobre el eje y a la misma distancia de F que de d. La parábola pasa por V y se abre hacia el lado del foco.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: poner el vértice en el foco. El foco queda a la mitad de la distancia a la directriz que el vértice: V equidista de F y de d.

### I-06 · Tangencias y enlaces: el centro como lugar geométrico

Fichero: `src/content/lessons/16-tangencias-basicas.json` · DT I · nivel Inicial

- [ ] **Saber básico:** Geometría plana: tangencias entre rectas y circunferencias, y enlaces. El centro de la circunferencia tangente como corte de lugares geométricos.

**Pasos**

1. [ ] Una recta es tangente a una circunferencia si la toca en un solo punto, T. El radio OT es perpendicular a la tangente en ese punto.
2. [ ] Desde un punto exterior P se pueden trazar dos tangentes. Como OT es perpendicular a PT, el punto T está en la circunferencia de diámetro OP.
3. [ ] Dos circunferencias tangentes por fuera se tocan en un punto de la recta de los centros. La distancia entre los centros es la suma de los radios.
4. [ ] Si una circunferencia es interior a la otra, también se tocan en la recta de los centros. Ahora la distancia entre los centros es la diferencia de los radios.
5. [ ] Una circunferencia de radio r tangente a la recta s tiene su centro a distancia r de s. Por eso el centro está en una paralela a s.
6. [ ] Si la circunferencia de radio r es tangente por fuera a k, la distancia entre los centros es R más r. Su centro está en la circunferencia concéntrica con k de radio R más r.
7. [ ] El centro buscado está en la paralela y en la concéntrica: es su corte. Hay dos soluciones, y cada punto de tangencia está en la perpendicular a s por el centro o en la recta de centros.
8. [ ] Para enlazar dos rectas con un arco de radio r, el centro está a distancia r de las dos. Es el corte de dos paralelas, una a cada recta, por el lado del interior del ángulo.
9. [ ] Los puntos de enlace son los pies de las perpendiculares desde el centro a las rectas. El arco va de un punto de enlace al otro y las dos rectas quedan tangentes a él.
10. [ ] Para enlazar dos circunferencias con un arco exterior de radio r, el centro está a R₁ más r de un centro y a R₂ más r del otro. Es el corte de dos concéntricas, y los puntos de enlace están en las rectas de centros.

**Ejercicios**

1. [ ] *construcción en la lámina, dificultad 1*: El punto P está a 25 mm del centro O de una circunferencia de 20 mm de radio. Arrastra Z hasta uno de los dos puntos de tangencia.
   - [ ] *Pista 1:* La tangente es perpendicular al radio en el punto de tangencia.
   - [ ] *Pista 2:* Por eso el ángulo O-T-P es recto, y T está en la circunferencia de diámetro OP.
   - [ ] *Pista 3:* Traza la circunferencia de diámetro OP y corta con la dada: salen los dos puntos de tangencia.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Tenemos un punto P exterior y una circunferencia k de centro O. Buscamos los puntos de tangencia de las dos tangentes desde P.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La tangente es perpendicular al radio en T, así que el ángulo OTP es recto. Por eso T está en la circunferencia de diámetro OP.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina una recta que gira alrededor de P: toca a la circunferencia en dos posiciones, y en cada una el radio es perpendicular a ella.
   - [ ] *Solución, paso 4 · 4. El trazado:* Traza el punto medio M de OP y la circunferencia de centro M que pasa por O y por P.
   - [ ] *Solución, paso 5 · 4. El trazado:* Esa circunferencia corta a k en T₁ y T₂, los puntos de tangencia. Arrastra Z hasta uno y traza las tangentes.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: los radios OT₁ y OT₂ son perpendiculares a las tangentes, y las dos tangentes desde P miden lo mismo.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: tomar como punto de tangencia el punto de k más próximo a P. Ese punto está en la recta OP, y la tangente en él no pasa por P.
2. [ ] *construcción en la lámina, dificultad 1*: Busca una circunferencia de 10 mm de radio tangente a la recta s y tangente por fuera a k. Arrastra Z hasta su centro.
   - [ ] *Pista 1:* El centro de una circunferencia tangente a la recta s está a distancia r de s, en una paralela.
   - [ ] *Pista 2:* Tangente por fuera a k significa que la distancia entre centros es R más r: el centro está en una concéntrica con k.
   - [ ] *Pista 3:* Traza la paralela a s a distancia r y la concéntrica con k de radio R más r: se cortan en los centros.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Tenemos una recta s, una circunferencia k y un radio r. Buscamos las circunferencias de radio r tangentes a s y tangentes por fuera a k.
   - [ ] *Solución, paso 2 · 2. La idea clave:* El centro está a distancia r de s y a distancia R más r del centro de k. Cada condición es un lugar geométrico: una paralela y una circunferencia concéntrica.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina una circunferencia de radio r que rueda pegada a s: su centro recorre una paralela. Solo en dos posiciones también toca por fuera a k.
   - [ ] *Solución, paso 4 · 4. El trazado:* Traza la paralela a s a distancia r, por el lado donde está k: la perpendicular desde K y el radio r la determinan.
   - [ ] *Solución, paso 5 · 4. El trazado:* Traza la circunferencia de centro K y radio R más r: corta a la paralela en los centros C₁ y C₂. Arrastra Z hasta uno.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: la distancia de cada centro a s es r, su distancia a K es R más r, y los puntos de tangencia están en la perpendicular a s y en la recta KC.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: trazar la paralela por el lado contrario a k. Entonces el centro queda al otro lado de s y la circunferencia no toca a k por fuera.
3. [ ] *construcción en la lámina, dificultad 1*: Las dos rectas son perpendiculares. Arrastra Z hasta el centro del arco de 15 mm de radio que las enlaza.
   - [ ] *Pista 1:* El centro del arco de enlace está a distancia r de las dos rectas.
   - [ ] *Pista 2:* Está, por tanto, en una paralela a cada recta, por el lado interior del ángulo.
   - [ ] *Pista 3:* Traza las dos paralelas a distancia r: su corte es el centro.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Tenemos dos rectas que se cortan en V y un radio r. Buscamos el arco de radio r que las enlaza, tangente a las dos dentro de su ángulo.
   - [ ] *Solución, paso 2 · 2. La idea clave:* El centro del arco está a distancia r de cada recta, así que está en una paralela a cada una. Es el corte de las dos paralelas, por el lado interior del ángulo.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina una circunferencia que crece dentro del ángulo tocando siempre a las dos rectas: su centro sigue la bisectriz hasta que el radio vale r.
   - [ ] *Solución, paso 4 · 4. El trazado:* Traza la paralela a la recta a a distancia r, por el lado donde está la recta b.
   - [ ] *Solución, paso 5 · 4. El trazado:* Traza la paralela a b a distancia r, por el lado de a: se cortan en el centro C del arco.
   - [ ] *Solución, paso 6 · 4. El trazado:* Baja desde C las perpendiculares a las dos rectas: sus pies T₁ y T₂ son los puntos de enlace. Arrastra Z hasta C y traza el arco.
   - [ ] *Solución, paso 7 · 5. Comprobación:* Comprobación: C está a distancia r de las dos rectas, los radios CT₁ y CT₂ son perpendiculares a ellas y el arco queda dentro del ángulo.
   - [ ] *Solución, paso 8 · 6. Error típico:* **[REVISAR]** Error típico: trazar una de las paralelas por el lado exterior del ángulo. El centro sale fuera del ángulo y el arco no enlaza las dos rectas.
4. [ ] *construcción en la lámina, dificultad 2*: Desde el punto P se trazan dos tangentes a la circunferencia. Arrastra Z hasta uno de los puntos de tangencia.
   - [ ] *Pista 1:* La tangente es perpendicular al radio en el punto de tangencia.
   - [ ] *Pista 2:* Por eso el ángulo O-T-P es recto, y T está en la circunferencia de diámetro OP.
   - [ ] *Pista 3:* Traza la circunferencia de diámetro OP y corta con la dada: salen los dos puntos de tangencia.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Tenemos un punto P exterior y una circunferencia k de centro O. Buscamos los puntos de tangencia de las dos tangentes desde P.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La tangente es perpendicular al radio en T, así que el ángulo OTP es recto. Por eso T está en la circunferencia de diámetro OP.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina una recta que gira alrededor de P: toca a la circunferencia en dos posiciones, y en cada una el radio es perpendicular a ella.
   - [ ] *Solución, paso 4 · 4. El trazado:* Traza el punto medio M de OP y la circunferencia de centro M que pasa por O y por P.
   - [ ] *Solución, paso 5 · 4. El trazado:* Esa circunferencia corta a k en T₁ y T₂, los puntos de tangencia. Arrastra Z hasta uno y traza las tangentes.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: los radios OT₁ y OT₂ son perpendiculares a las tangentes, y las dos tangentes desde P miden lo mismo.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: tomar como punto de tangencia el punto de k más próximo a P. Ese punto está en la recta OP, y la tangente en él no pasa por P.
5. [ ] *construcción en la lámina, dificultad 2*: La recta s está inclinada. Arrastra Z hasta el centro de una circunferencia de 10 mm de radio tangente a s y tangente por fuera a k.
   - [ ] *Pista 1:* El centro de una circunferencia tangente a la recta s está a distancia r de s, en una paralela.
   - [ ] *Pista 2:* Tangente por fuera a k significa que la distancia entre centros es R más r: el centro está en una concéntrica con k.
   - [ ] *Pista 3:* Traza la paralela a s a distancia r y la concéntrica con k de radio R más r: se cortan en los centros.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Tenemos una recta s, una circunferencia k y un radio r. Buscamos las circunferencias de radio r tangentes a s y tangentes por fuera a k.
   - [ ] *Solución, paso 2 · 2. La idea clave:* El centro está a distancia r de s y a distancia R más r del centro de k. Cada condición es un lugar geométrico: una paralela y una circunferencia concéntrica.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina una circunferencia de radio r que rueda pegada a s: su centro recorre una paralela. Solo en dos posiciones también toca por fuera a k.
   - [ ] *Solución, paso 4 · 4. El trazado:* Traza la paralela a s a distancia r, por el lado donde está k: la perpendicular desde K y el radio r la determinan.
   - [ ] *Solución, paso 5 · 4. El trazado:* Traza la circunferencia de centro K y radio R más r: corta a la paralela en los centros C₁ y C₂. Arrastra Z hasta uno.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: la distancia de cada centro a s es r, su distancia a K es R más r, y los puntos de tangencia están en la perpendicular a s y en la recta KC.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: usar R menos r en vez de R más r. Esa circunferencia concéntrica da una tangencia interior, no la tangencia por fuera que se pide.
6. [ ] *construcción en la lámina, dificultad 2*: Arrastra Z hasta el centro del arco de 15 mm de radio que enlaza las dos rectas dentro de su ángulo.
   - [ ] *Pista 1:* El centro del arco de enlace está a distancia r de las dos rectas.
   - [ ] *Pista 2:* Está, por tanto, en una paralela a cada recta, por el lado interior del ángulo.
   - [ ] *Pista 3:* Traza las dos paralelas a distancia r: su corte es el centro.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Tenemos dos rectas que se cortan en V y un radio r. Buscamos el arco de radio r que las enlaza, tangente a las dos dentro de su ángulo.
   - [ ] *Solución, paso 2 · 2. La idea clave:* El centro del arco está a distancia r de cada recta, así que está en una paralela a cada una. Es el corte de las dos paralelas, por el lado interior del ángulo.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina una circunferencia que crece dentro del ángulo tocando siempre a las dos rectas: su centro sigue la bisectriz hasta que el radio vale r.
   - [ ] *Solución, paso 4 · 4. El trazado:* Traza la paralela a la recta a a distancia r, por el lado donde está la recta b.
   - [ ] *Solución, paso 5 · 4. El trazado:* Traza la paralela a b a distancia r, por el lado de a: se cortan en el centro C del arco.
   - [ ] *Solución, paso 6 · 4. El trazado:* Baja desde C las perpendiculares a las dos rectas: sus pies T₁ y T₂ son los puntos de enlace. Arrastra Z hasta C y traza el arco.
   - [ ] *Solución, paso 7 · 5. Comprobación:* Comprobación: C está a distancia r de las dos rectas, los radios CT₁ y CT₂ son perpendiculares a ellas y el arco queda dentro del ángulo.
   - [ ] *Solución, paso 8 · 6. Error típico:* **[REVISAR]** Error típico: trazar una de las paralelas por el lado exterior del ángulo. El centro sale fuera del ángulo y el arco no enlaza las dos rectas.
7. [ ] *construcción en la lámina, dificultad 3*: Como en la PAU: enlaza las dos rectas con un arco de 15 mm de radio y arrastra Z hasta su punto de enlace T₁ con la recta a.
   - [ ] *Pista 1:* El punto de enlace es el pie de la perpendicular desde el centro del arco a la recta.
   - [ ] *Pista 2:* El centro del arco está a distancia r de las dos rectas: es el corte de dos paralelas.
   - [ ] *Pista 3:* Halla el centro con las dos paralelas y baja desde él la perpendicular a la recta a.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Tenemos dos rectas que se cortan en V y un radio r. Buscamos el arco de radio r que las enlaza, tangente a las dos dentro de su ángulo.
   - [ ] *Solución, paso 2 · 2. La idea clave:* El centro del arco está a distancia r de cada recta, así que está en una paralela a cada una. Es el corte de las dos paralelas, por el lado interior del ángulo.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina una circunferencia que crece dentro del ángulo tocando siempre a las dos rectas: su centro sigue la bisectriz hasta que el radio vale r.
   - [ ] *Solución, paso 4 · 4. El trazado:* Traza la paralela a la recta a a distancia r, por el lado donde está la recta b.
   - [ ] *Solución, paso 5 · 4. El trazado:* Traza la paralela a b a distancia r, por el lado de a: se cortan en el centro C del arco.
   - [ ] *Solución, paso 6 · 4. El trazado:* Baja desde C las perpendiculares a las dos rectas: sus pies T₁ y T₂ son los puntos de enlace. Arrastra Z hasta T₁ y traza el arco.
   - [ ] *Solución, paso 7 · 5. Comprobación:* Comprobación: C está a distancia r de las dos rectas, los radios CT₁ y CT₂ son perpendiculares a ellas y el arco queda dentro del ángulo.
   - [ ] *Solución, paso 8 · 6. Error típico:* **[REVISAR]** Error típico: trazar una de las paralelas por el lado exterior del ángulo. El centro sale fuera del ángulo y el arco no enlaza las dos rectas.
8. [ ] *construcción en la lámina, dificultad 3*: Como en la PAU: busca el arco de 25 mm de radio tangente por fuera a las dos circunferencias y arrastra Z hasta el centro de una de las soluciones.
   - [ ] *Pista 1:* Un arco tangente por fuera a una circunferencia tiene su centro a R más r del centro de esta.
   - [ ] *Pista 2:* El centro del arco está, por tanto, en una circunferencia concéntrica con cada una de las dadas.
   - [ ] *Pista 3:* Traza las dos concéntricas, de radios R₁ más r y R₂ más r, y busca su corte.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Tenemos dos circunferencias k₁ y k₂ y un radio r. Buscamos el arco de radio r tangente por fuera a las dos.
   - [ ] *Solución, paso 2 · 2. La idea clave:* El centro del arco está a R₁ más r de A y a R₂ más r de B. Es el corte de dos circunferencias concéntricas con las dadas.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina un círculo de radio r que rueda por fuera de k₁: su centro recorre una circunferencia de radio R₁ más r. Solo en dos puntos también toca a k₂.
   - [ ] *Solución, paso 4 · 4. El trazado:* Traza la circunferencia de centro A y radio R₁ más r: allí está el centro del arco si toca a k₁.
   - [ ] *Solución, paso 5 · 4. El trazado:* Traza la de centro B y radio R₂ más r: se cortan en los centros C₁ y C₂ de las dos soluciones.
   - [ ] *Solución, paso 6 · 4. El trazado:* Une C₁ con A y con B: los puntos de tangencia están sobre esas rectas. Arrastra Z hasta un centro y traza el arco.
   - [ ] *Solución, paso 7 · 5. Comprobación:* Comprobación: la distancia de C₁ a A es R₁ más r, la distancia a B es R₂ más r, y los puntos de enlace están en las rectas de centros.
   - [ ] *Solución, paso 8 · 6. Error típico:* **[REVISAR]** Error típico: restar los radios en vez de sumarlos. Con R menos r el arco sería tangente por dentro, no por fuera como se pide.
9. [ ] *construcción en la lámina, dificultad 3*: Como en la PAU, con otros datos: arrastra Z hasta un punto de enlace del arco de 25 mm de radio tangente por fuera a las dos circunferencias.
   - [ ] *Pista 1:* El punto de tangencia entre dos circunferencias está en la recta que une sus centros.
   - [ ] *Pista 2:* Primero se halla el centro del arco, como corte de dos concéntricas.
   - [ ] *Pista 3:* Une el centro del arco con el centro de la circunferencia dada: el punto de enlace es el corte con ella.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Tenemos dos circunferencias k₁ y k₂ y un radio r. Buscamos el arco de radio r tangente por fuera a las dos.
   - [ ] *Solución, paso 2 · 2. La idea clave:* El centro del arco está a R₁ más r de A y a R₂ más r de B. Es el corte de dos circunferencias concéntricas con las dadas.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina un círculo de radio r que rueda por fuera de k₁: su centro recorre una circunferencia de radio R₁ más r. Solo en dos puntos también toca a k₂.
   - [ ] *Solución, paso 4 · 4. El trazado:* Traza la circunferencia de centro A y radio R₁ más r: allí está el centro del arco si toca a k₁.
   - [ ] *Solución, paso 5 · 4. El trazado:* Traza la de centro B y radio R₂ más r: se cortan en los centros C₁ y C₂ de las dos soluciones.
   - [ ] *Solución, paso 6 · 4. El trazado:* Une C₁ con A y con B: los puntos de tangencia están sobre esas rectas. Arrastra Z hasta un punto de enlace y traza el arco.
   - [ ] *Solución, paso 7 · 5. Comprobación:* Comprobación: la distancia de C₁ a A es R₁ más r, la distancia a B es R₂ más r, y los puntos de enlace están en las rectas de centros.
   - [ ] *Solución, paso 8 · 6. Error típico:* **[REVISAR]** Error típico: restar los radios en vez de sumarlos. Con R menos r el arco sería tangente por dentro, no por fuera como se pide.

### I-15 · Lo que se ve desde cada lado

Fichero: `src/content/lessons/17-lo-que-se-ve.json` · DT I · nivel Inicial

- [ ] **Saber básico:** Normalización: vistas de una pieza en el sistema europeo (UNE-EN ISO 5456-2), aristas ocultas, ejes y vistas necesarias.

**Pasos**

1. [ ] Esta pieza se dibuja con sus vistas. Cada vista enseña solo lo que se ve mirando la pieza desde un lado.
2. [ ] Metemos la pieza en una caja. Cada cara de la caja recoge lo que se ve desde el lado contrario.
3. [ ] Mirando desde delante, el alzado se proyecta en la cara de detrás. Dejan línea las caras que miran al observador; las demás quedan tapadas.
4. [ ] Desde arriba, la planta se proyecta en la cara de abajo. Desde la izquierda, el perfil izquierdo se proyecta en la cara de la derecha.
5. [ ] Al desplegar la caja, la planta queda debajo del alzado y el perfil izquierdo, a su derecha. Es el sistema europeo: el perfil izquierdo nunca va a la izquierda.
6. [ ] Lo que está tapado se dibuja con línea discontinua fina. El agujero ciego no se ve desde fuera, pero aparece así en las vistas.
7. [ ] El eje del agujero va con trazo y punto fino y sobresale un poco. En la vista de frente se ve como dos ejes cruzados.
8. [ ] No siempre hacen falta tres vistas. Una vista sobra si no enseña nada que las otras no muestren.

**Ejercicios**

1. [ ] *construcción en la lámina, dificultad 1*: Se ven el alzado y la planta de una pieza. ¿Cuál es su perfil izquierdo?
   - [ ] *Pista 1:* Cada vista muestra lo que se ve desde su lado, y comparte medidas con sus vecinas.
   - [ ] *Pista 2:* Las alturas del perfil son las del alzado y sus profundidades, las de la planta.
   - [ ] *Pista 3:* Prolonga con líneas de referencia las aristas del alzado y la planta hasta el perfil.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Se ven el alzado y el planta de una pieza y hay que elegir su perfil izquierdo entre varios dibujos. Cada opción es una pieza distinta.
   - [ ] *Solución, paso 2 · 2. La idea clave:* El perfil izquierdo comparte la altura con el alzado y la profundidad con la planta. Con esas dos medidas se reconstruye.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina la pieza dentro de la caja de proyección. Al desplegarla, las medidas comunes de las vistas quedan alineadas.
   - [ ] *Solución, paso 4 · 4. El trazado:* El alzado y la planta tienen una línea paralela al borde: es una arista biselada. En el perfil se ve como una oblicua en la esquina de arriba, del lado de delante.
   - [ ] *Solución, paso 5 · 4. El trazado:* Descarta las opciones cuya silueta o cuyas líneas discontinuas no coinciden, y elige la que respeta todas las medidas.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: la opción elegida tiene las mismas medidas que las vistas dadas, y sus aristas ocultas también coinciden.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: elegir el perfil con el bisel arriba a la izquierda. El perfil izquierdo se mira desde la izquierda y la parte de delante queda a su derecha.
2. [ ] *construcción en la lámina, dificultad 1*: Se ven el alzado y el perfil izquierdo de una pieza. ¿Cuál es su planta?
   - [ ] *Pista 1:* Cada vista muestra lo que se ve desde su lado, y comparte medidas con sus vecinas.
   - [ ] *Pista 2:* Las anchuras de la planta son las del alzado y sus profundidades, las del perfil.
   - [ ] *Pista 3:* Baja desde el alzado las líneas de referencia y pasa las profundidades del perfil.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Se ven el alzado y el perfil izquierdo de una pieza y hay que elegir su planta entre varios dibujos. Cada opción es una pieza distinta.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La planta comparte la anchura con el alzado y la profundidad con el perfil. Con esas dos medidas se reconstruye.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina la pieza dentro de la caja de proyección. Al desplegarla, las medidas comunes de las vistas quedan alineadas.
   - [ ] *Solución, paso 4 · 4. El trazado:* En el alzado y en el perfil hay dos pares de líneas discontinuas verticales: son taladros que no se ven. En la planta, mirados de punta, aparecen como dos circunferencias.
   - [ ] *Solución, paso 5 · 4. El trazado:* Descarta las opciones cuya silueta o cuyas líneas discontinuas no coinciden, y elige la que respeta todas las medidas.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: la opción elegida tiene las mismas medidas que las vistas dadas, y sus aristas ocultas también coinciden.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: elegir una planta lisa porque en las otras vistas solo hay discontinuas. Esas líneas son los taladros, y desde arriba se ven como circunferencias continuas.
3. [ ] *construcción en la lámina, dificultad 1*: Se ven la planta y el perfil izquierdo de una pieza. ¿Cuál es su alzado?
   - [ ] *Pista 1:* Cada vista muestra lo que se ve desde su lado, y comparte medidas con sus vecinas.
   - [ ] *Pista 2:* Las anchuras del alzado son las de la planta y sus alturas, las del perfil.
   - [ ] *Pista 3:* Sube desde la planta las líneas de referencia y pasa las alturas del perfil.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Se ven el planta y el perfil izquierdo de una pieza y hay que elegir su alzado entre varios dibujos. Cada opción es una pieza distinta.
   - [ ] *Solución, paso 2 · 2. La idea clave:* El alzado comparte la anchura con la planta y la altura con el perfil. Con esas dos medidas se reconstruye.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina la pieza dentro de la caja de proyección. Al desplegarla, las medidas comunes de las vistas quedan alineadas.
   - [ ] *Solución, paso 4 · 4. El trazado:* La planta tiene un escalón en forma de L. Esa arista sube hasta el alzado y se ve de frente como una línea vertical dentro del rectángulo.
   - [ ] *Solución, paso 5 · 4. El trazado:* Descarta las opciones cuya silueta o cuyas líneas discontinuas no coinciden, y elige la que respeta todas las medidas.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: la opción elegida tiene las mismas medidas que las vistas dadas, y sus aristas ocultas también coinciden.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: elegir un alzado liso. La planta tiene un escalón, y desde delante se ve su arista como una línea vertical continua.
4. [ ] *construcción en la lámina, dificultad 2*: Marca solo las vistas imprescindibles para definir esta placa con dos taladros: ni una más ni una menos.
   - [ ] *Pista 1:* Una vista es imprescindible cuando enseña algo que las otras no enseñan.
   - [ ] *Pista 2:* Mira qué aparece en cada cara: espesores, taladros o planos inclinados.
   - [ ] *Pista 3:* Empieza por el alzado y añade solo la vista que aporta una forma nueva.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Una placa con dos taladros se puede dibujar con tres vistas, pero no hacen falta todas. Hay que marcar las imprescindibles.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Una vista es imprescindible si aporta una forma que no se ve en las demás. Si no añade nada nuevo, sobra.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina la pieza girando delante del observador. Cada vez que cambia la cara que miras aparece una forma nueva, o no aparece ninguna.
   - [ ] *Solución, paso 4 · 4. El trazado:* El alzado da la anchura y el espesor de la placa, y muestra los taladros con discontinua.
   - [ ] *Solución, paso 5 · 4. El trazado:* La planta da la profundidad y enseña los dos taladros como circunferencias. El perfil repite el espesor del alzado y sobra.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: con las vistas marcadas no queda ninguna forma sin definir, y ninguna vista repite lo que ya muestran las otras.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: marcar las tres vistas por seguridad. El perfil solo repite el espesor que ya se ve en el alzado y se omite.
5. [ ] *construcción en la lámina, dificultad 2*: Marca solo las vistas imprescindibles para definir este taco con una arista biselada.
   - [ ] *Pista 1:* Una vista es imprescindible cuando enseña algo que las otras no enseñan.
   - [ ] *Pista 2:* Busca la vista donde la arista inclinada se vea de perfil, como una oblicua.
   - [ ] *Pista 3:* Marca el alzado y la vista en la que el bisel aparece como un corte inclinado.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Un taco con una arista biselada parece un simple prisma. Hay que decidir qué vistas lo definen sin repetir nada.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Una vista es imprescindible si aporta una forma que no se ve en las demás. Si no añade nada nuevo, sobra.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina la pieza girando delante del observador. Cada vez que cambia la cara que miras aparece una forma nueva, o no aparece ninguna.
   - [ ] *Solución, paso 4 · 4. El trazado:* El alzado da la anchura y la altura del taco. El perfil izquierdo es el único que enseña el bisel de verdad, como una oblicua.
   - [ ] *Solución, paso 5 · 4. El trazado:* La planta solo muestra un rectángulo con una línea: no enseña la forma del bisel y sobra.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: con las vistas marcadas no queda ninguna forma sin definir, y ninguna vista repite lo que ya muestran las otras.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: elegir alzado y planta. Ninguna de las dos enseña la forma del bisel; hace falta el perfil.
6. [ ] *construcción en la lámina, dificultad 2*: Marca solo las vistas imprescindibles para definir esta escalera con un taladro.
   - [ ] *Pista 1:* Una vista es imprescindible cuando enseña algo que las otras no enseñan.
   - [ ] *Pista 2:* Busca la vista donde se ve el perfil de los escalones y la vista donde se ve el taladro.
   - [ ] *Pista 3:* Marca esas dos y comprueba que el alzado no añade ninguna forma nueva.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Esta pieza tiene tres escalones y un taladro en el más bajo. Hay que marcar las vistas que la definen sin repetir nada.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Una vista es imprescindible si aporta una forma que no se ve en las demás. Si no añade nada nuevo, sobra.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina la pieza girando delante del observador. Cada vez que cambia la cara que miras aparece una forma nueva, o no aparece ninguna.
   - [ ] *Solución, paso 4 · 4. El trazado:* El perfil izquierdo enseña los tres escalones con su altura y su profundidad. La planta enseña la anchura y el taladro como circunferencia.
   - [ ] *Solución, paso 5 · 4. El trazado:* El alzado es un rectángulo con las líneas de los escalones: no añade nada que no estén diciendo ya la planta y el perfil.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: con las vistas marcadas no queda ninguna forma sin definir, y ninguna vista repite lo que ya muestran las otras.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: marcar siempre el alzado. Aquí repite las medidas que ya dan la planta y el perfil, y el taladro se ve mejor en la planta.
7. [ ] *construcción en la lámina, dificultad 3*: Como en la PAU: se ven el alzado y el perfil izquierdo de una pieza. ¿Cuál es su planta?
   - [ ] *Pista 1:* Cada vista muestra lo que se ve desde su lado, y comparte medidas con sus vecinas.
   - [ ] *Pista 2:* Las anchuras de la planta son las del alzado y sus profundidades, las del perfil.
   - [ ] *Pista 3:* Baja desde el alzado las líneas de referencia y pasa las profundidades del perfil.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Se ven el alzado y el perfil izquierdo de una pieza y hay que elegir su planta entre varios dibujos. Cada opción es una pieza distinta.
   - [ ] *Solución, paso 2 · 2. La idea clave:* La planta comparte la anchura con el alzado y la profundidad con el perfil. Con esas dos medidas se reconstruye.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina la pieza dentro de la caja de proyección. Al desplegarla, las medidas comunes de las vistas quedan alineadas.
   - [ ] *Solución, paso 4 · 4. El trazado:* El perfil muestra la cabeza redondeada de las orejas con un taladro circular que las atraviesa. En la planta, las orejas son dos cuadrados en los extremos y el taladro queda tapado.
   - [ ] *Solución, paso 5 · 4. El trazado:* Descarta las opciones cuya silueta o cuyas líneas discontinuas no coinciden, y elige la que respeta todas las medidas.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: la opción elegida tiene las mismas medidas que las vistas dadas, y sus aristas ocultas también coinciden.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: dibujar con línea continua el taladro de las orejas en la planta, donde no se ve. Desde arriba queda tapado y va con discontinua fina.
8. [ ] *construcción en la lámina, dificultad 3*: Como en la PAU: se ven la planta y el perfil izquierdo de una pieza. ¿Cuál es su alzado?
   - [ ] *Pista 1:* Cada vista muestra lo que se ve desde su lado, y comparte medidas con sus vecinas.
   - [ ] *Pista 2:* Las anchuras del alzado son las de la planta y sus alturas, las del perfil.
   - [ ] *Pista 3:* Sube desde la planta las líneas de referencia y pasa las alturas del perfil.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Se ven el planta y el perfil izquierdo de una pieza y hay que elegir su alzado entre varios dibujos. Cada opción es una pieza distinta.
   - [ ] *Solución, paso 2 · 2. La idea clave:* El alzado comparte la anchura con la planta y la altura con el perfil. Con esas dos medidas se reconstruye.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina la pieza dentro de la caja de proyección. Al desplegarla, las medidas comunes de las vistas quedan alineadas.
   - [ ] *Solución, paso 4 · 4. El trazado:* En el perfil hay un taladro circular y la planta enseña una banda central más estrecha que la base. En el alzado, esa banda sube con la cabeza redondeada y el taladro va con discontinua.
   - [ ] *Solución, paso 5 · 4. El trazado:* Descarta las opciones cuya silueta o cuyas líneas discontinuas no coinciden, y elige la que respeta todas las medidas.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: la opción elegida tiene las mismas medidas que las vistas dadas, y sus aristas ocultas también coinciden.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: dibujar el taladro del alzado con línea continua. Está tapado por la pared de la pieza y va con discontinua fina, con su eje de trazo y punto.
9. [ ] *construcción en la lámina, dificultad 3*: Como en la PAU: marca solo las vistas imprescindibles para definir este canal en V con una ranura y un taladro.
   - [ ] *Pista 1:* Una vista es imprescindible cuando enseña algo que las otras no enseñan.
   - [ ] *Pista 2:* Pregúntate qué forma solo se ve en una vista: el canal, la ranura y el taladro.
   - [ ] *Pista 3:* Si cada forma aparece en una vista distinta, hacen falta las tres.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Esta pieza tiene un canal en V, una ranura que lo atraviesa y un taladro pequeño. Hay que ver cuántas vistas hacen falta.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Una vista es imprescindible si aporta una forma que no se ve en las demás. Si no añade nada nuevo, sobra.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina la pieza girando delante del observador. Cada vez que cambia la cara que miras aparece una forma nueva, o no aparece ninguna.
   - [ ] *Solución, paso 4 · 4. El trazado:* El perfil enseña el canal en V. El alzado enseña la ranura, con su profundidad, que atraviesa las dos paredes.
   - [ ] *Solución, paso 5 · 4. El trazado:* La planta enseña dónde está el taladro y que la ranura cruza de lado a lado. Cada vista aporta algo que las otras no dicen.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: con las vistas marcadas no queda ninguna forma sin definir, y ninguna vista repite lo que ya muestran las otras.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: quitar la planta pensando que repite el alzado. Solo la planta sitúa el taladro, y sin ella la pieza no queda definida.

### I-11 · La distancia entre dos puntos

Fichero: `src/content/lessons/18-distancia-por-abatimiento.json` · DT I · nivel Inicial

- [ ] **Saber básico:** Sistema diédrico: verdadera magnitud de un segmento por abatimiento del plano proyectante sobre el PH y sobre el PV.

**Pasos**

1. [ ] ¿Cuánto mide el segmento AB? Está inclinado respecto a los dos planos, así que ninguna de sus proyecciones lo muestra en verdadera magnitud.
2. [ ] Mira el triángulo que forman AB, su proyección horizontal A′B′ y la diferencia de cotas. Es rectángulo, con AB como hipotenusa.
3. [ ] Ese triángulo está en el plano vertical que contiene a A′B′. Si lo abatimos sobre el PH, lo veremos sin deformar.
4. [ ] El plano vertical gira como una bisagra alrededor de A′B′, que es su traza horizontal, hasta quedar sobre el PH. AB gira con él sin deformarse.
5. [ ] En la lámina, trazamos por A′ y B′ las perpendiculares a A′B′. Sobre ellas llevamos la cota de cada punto, medida desde la charnela.
6. [ ] El segmento (A)(B) es la verdadera magnitud de AB. Es la hipotenusa del triángulo de catetos A′B′ y la diferencia de cotas.
7. [ ] Si A y B están a distinto lado del PH, sus cotas se llevan a lados opuestos de la charnela. Entonces el cateto es la suma de las cotas.
8. [ ] Sobre el PV es igual: la charnela es A″B″ y se llevan los alejamientos. Siempre se abate el plano que contiene al segmento y es perpendicular al plano elegido.

**Ejercicios**

1. [ ] *escribir una medida, dificultad 1* (respuesta: 50 mm): AB tiene sus dos extremos al mismo alejamiento. Abátela sobre el PH y mide su verdadera magnitud; ayúdate de la cuadrícula de 10 mm.
   - [ ] *Pista 1:* Si abatimos el plano que contiene a AB, el segmento llega a la lámina sin deformarse, esté como esté.
   - [ ] *Pista 2:* La charnela es la traza horizontal de ese plano vertical, y cada punto cae a una distancia de ella igual a su cota.
   - [ ] *Pista 3:* Traza por A′ y B′ las perpendiculares a la charnela y lleva sobre ellas las cotas de A y B.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* A y B están al mismo alejamiento: AB es paralela al PV y A″B″ parece conservar el tamaño real. Veamos qué da el abatimiento.
   - [ ] *Solución, paso 2 · 2. La idea clave:* AB, su proyección A′B′ y la diferencia de cotas forman un triángulo rectángulo con AB como hipotenusa. Abatirlo sobre el PH lo muestra sin deformar.
   - [ ] *Solución, paso 3 · 3. El movimiento:* El plano proyectante de AB gira como una bisagra alrededor de su traza horizontal, hasta quedar sobre el PH. AB gira con él sin deformarse.
   - [ ] *Solución, paso 4 · 4. El trazado:* La charnela es la traza horizontal del plano proyectante de AB: pasa por A′B′. Traza por A′ y B′ las perpendiculares a ella.
   - [ ] *Solución, paso 5 · 4. El trazado:* Lleva sobre cada perpendicular la cota del punto, medida desde la charnela. El segmento (A)(B) es la verdadera magnitud.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: (A)(B) es la hipotenusa del triángulo de catetos A′B′ (40 mm) y la diferencia de cotas (30 mm). Mide 50 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: medir A′B′, que da 40 mm, y contestar eso. AB no es paralela al PH, así que su planta sale más corta que la verdadera magnitud, 50 mm.
2. [ ] *escribir una medida, dificultad 1* (respuesta: 50 mm): AB tiene sus dos extremos a la misma cota. Abátela sobre el PH y mide su verdadera magnitud en milímetros.
   - [ ] *Pista 1:* Si abatimos el plano que contiene a AB, el segmento llega a la lámina sin deformarse, esté como esté.
   - [ ] *Pista 2:* La charnela es la traza horizontal de ese plano vertical, y cada punto cae a una distancia de ella igual a su cota.
   - [ ] *Pista 3:* Traza por A′ y B′ las perpendiculares a la charnela y lleva sobre ellas las cotas de A y B.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* A y B están a la misma cota: AB es paralela al PH. Al abatir, la diferencia de cotas será cero y habrá que ver qué queda.
   - [ ] *Solución, paso 2 · 2. La idea clave:* AB, su proyección A′B′ y la diferencia de cotas forman un triángulo rectángulo con AB como hipotenusa. Abatirlo sobre el PH lo muestra sin deformar.
   - [ ] *Solución, paso 3 · 3. El movimiento:* El plano proyectante de AB gira como una bisagra alrededor de su traza horizontal, hasta quedar sobre el PH. AB gira con él sin deformarse.
   - [ ] *Solución, paso 4 · 4. El trazado:* La charnela es la traza horizontal del plano proyectante de AB: pasa por A′B′. Traza por A′ y B′ las perpendiculares a ella.
   - [ ] *Solución, paso 5 · 4. El trazado:* Lleva sobre cada perpendicular la cota del punto, medida desde la charnela. El segmento (A)(B) es la verdadera magnitud.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: (A)(B) es la hipotenusa del triángulo de catetos A′B′ (50 mm) y la diferencia de cotas (0 mm). Mide 50 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: medir A′B′, que da 50 mm, y contestar eso. AB no es paralela al PH, así que su planta sale más corta que la verdadera magnitud, 50 mm.
3. [ ] *escribir una medida, dificultad 1* (respuesta: 50 mm): AB es una recta de perfil: A y B están en la misma línea de referencia. Abátela sobre el PH y mide su verdadera magnitud.
   - [ ] *Pista 1:* Si abatimos el plano que contiene a AB, el segmento llega a la lámina sin deformarse, esté como esté.
   - [ ] *Pista 2:* La charnela es la traza horizontal de ese plano vertical, y cada punto cae a una distancia de ella igual a su cota.
   - [ ] *Pista 3:* Traza por A′ y B′ las perpendiculares a la charnela y lleva sobre ellas las cotas de A y B.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* A y B tienen la misma x: AB es de perfil y sus proyecciones están sobre una misma perpendicular a la LT. Ninguna de las dos la mide.
   - [ ] *Solución, paso 2 · 2. La idea clave:* AB, su proyección A′B′ y la diferencia de cotas forman un triángulo rectángulo con AB como hipotenusa. Abatirlo sobre el PH lo muestra sin deformar.
   - [ ] *Solución, paso 3 · 3. El movimiento:* El plano proyectante de AB gira como una bisagra alrededor de su traza horizontal, hasta quedar sobre el PH. AB gira con él sin deformarse.
   - [ ] *Solución, paso 4 · 4. El trazado:* La charnela es la traza horizontal del plano proyectante de AB: pasa por A′B′. Traza por A′ y B′ las perpendiculares a ella.
   - [ ] *Solución, paso 5 · 4. El trazado:* Lleva sobre cada perpendicular la cota del punto, medida desde la charnela. El segmento (A)(B) es la verdadera magnitud.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: (A)(B) es la hipotenusa del triángulo de catetos A′B′ (30 mm) y la diferencia de cotas (40 mm). Mide 50 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: medir A′B′, que da 30 mm, y contestar eso. AB no es paralela al PH, así que su planta sale más corta que la verdadera magnitud, 50 mm.
4. [ ] *escribir una medida, dificultad 2* (respuesta: 65.6 mm): AB está inclinada respecto a los dos planos. Abate sobre el PH el plano proyectante de AB y mide su verdadera magnitud.
   - [ ] *Pista 1:* Si abatimos el plano que contiene a AB, el segmento llega a la lámina sin deformarse, esté como esté.
   - [ ] *Pista 2:* La charnela es la traza horizontal de ese plano vertical, y cada punto cae a una distancia de ella igual a su cota.
   - [ ] *Pista 3:* Traza por A′ y B′ las perpendiculares a la charnela y lleva sobre ellas las cotas de A y B.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* A y B tienen distinta cota y distinto alejamiento: AB no es paralela a ningún plano de proyección. Ninguna proyección la mide.
   - [ ] *Solución, paso 2 · 2. La idea clave:* AB, su proyección A′B′ y la diferencia de cotas forman un triángulo rectángulo con AB como hipotenusa. Abatirlo sobre el PH lo muestra sin deformar.
   - [ ] *Solución, paso 3 · 3. El movimiento:* El plano proyectante de AB gira como una bisagra alrededor de su traza horizontal, hasta quedar sobre el PH. AB gira con él sin deformarse.
   - [ ] *Solución, paso 4 · 4. El trazado:* La charnela es la traza horizontal del plano proyectante de AB: pasa por A′B′. Traza por A′ y B′ las perpendiculares a ella.
   - [ ] *Solución, paso 5 · 4. El trazado:* Lleva sobre cada perpendicular la cota del punto, medida desde la charnela. El segmento (A)(B) es la verdadera magnitud.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: (A)(B) es la hipotenusa del triángulo de catetos A′B′ (58,3 mm) y la diferencia de cotas (30 mm). Mide 65,6 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: llevar la cota de un punto al lado equivocado de la charnela. Cada punto se abate sobre la perpendicular a la charnela, hacia el lado donde está respecto al plano elegido.
5. [ ] *escribir una medida, dificultad 2* (respuesta: 63.4 mm): Abate sobre el PV el plano proyectante de AB y mide la verdadera magnitud del segmento en milímetros.
   - [ ] *Pista 1:* Abatir sobre el PV es girar el plano que contiene a AB y es perpendicular al PV, hasta que quede sobre él.
   - [ ] *Pista 2:* La charnela es la traza vertical de ese plano, y cada punto cae a una distancia de ella igual a su alejamiento.
   - [ ] *Pista 3:* Traza por A″ y B″ las perpendiculares a la charnela y lleva sobre ellas los alejamientos de A y B.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* AB es oblicua. Esta vez la abatiremos sobre el PV, así que importa su alzado A″B″ y los alejamientos de A y B.
   - [ ] *Solución, paso 2 · 2. La idea clave:* AB, su proyección A″B″ y la diferencia de alejamientos forman un triángulo rectángulo con AB como hipotenusa. Abatirlo sobre el PV lo muestra sin deformar.
   - [ ] *Solución, paso 3 · 3. El movimiento:* El plano proyectante de AB gira como una bisagra alrededor de su traza vertical, hasta quedar sobre el PV. AB gira con él sin deformarse.
   - [ ] *Solución, paso 4 · 4. El trazado:* La charnela es la traza vertical del plano proyectante de AB: pasa por A″B″. Traza por A″ y B″ las perpendiculares a ella.
   - [ ] *Solución, paso 5 · 4. El trazado:* Lleva sobre cada perpendicular el alejamiento del punto, medida desde la charnela. El segmento (A)(B) es la verdadera magnitud.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: (A)(B) es la hipotenusa del triángulo de catetos A″B″ (58,3 mm) y la diferencia de alejamientos (25 mm). Mide 63,4 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: abatir sobre el PV llevando las cotas en vez de los alejamientos. La distancia de cada punto a la charnela es su alejamiento, y la cota ya está en el alzado.
6. [ ] *escribir una medida, dificultad 2* (respuesta: 67.8 mm): Abate sobre el PH el plano proyectante de AB y mide su verdadera magnitud. B está más cerca de la LT que A en planta.
   - [ ] *Pista 1:* Si abatimos el plano que contiene a AB, el segmento llega a la lámina sin deformarse, esté como esté.
   - [ ] *Pista 2:* La charnela es la traza horizontal de ese plano vertical, y cada punto cae a una distancia de ella igual a su cota.
   - [ ] *Pista 3:* Traza por A′ y B′ las perpendiculares a la charnela y lleva sobre ellas las cotas de A y B.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* A y B están en el primer cuadrante, con B más cerca del PV que A y a más cota. AB es oblicua a los dos planos.
   - [ ] *Solución, paso 2 · 2. La idea clave:* AB, su proyección A′B′ y la diferencia de cotas forman un triángulo rectángulo con AB como hipotenusa. Abatirlo sobre el PH lo muestra sin deformar.
   - [ ] *Solución, paso 3 · 3. El movimiento:* El plano proyectante de AB gira como una bisagra alrededor de su traza horizontal, hasta quedar sobre el PH. AB gira con él sin deformarse.
   - [ ] *Solución, paso 4 · 4. El trazado:* La charnela es la traza horizontal del plano proyectante de AB: pasa por A′B′. Traza por A′ y B′ las perpendiculares a ella.
   - [ ] *Solución, paso 5 · 4. El trazado:* Lleva sobre cada perpendicular la cota del punto, medida desde la charnela. El segmento (A)(B) es la verdadera magnitud.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: (A)(B) es la hipotenusa del triángulo de catetos A′B′ (62,6 mm) y la diferencia de cotas (26 mm). Mide 67,8 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: medir A′B′, que da 62,6 mm, y contestar eso. AB no es paralela al PH, así que su planta sale más corta que la verdadera magnitud, 67,8 mm.
7. [ ] *escribir una medida, dificultad 3* (respuesta: 71.8 mm): Como en la PAU: A está en el primer cuadrante y B en el cuarto. Abate sobre el PH el plano proyectante de AB y mide su verdadera magnitud.
   - [ ] *Pista 1:* Si abatimos el plano que contiene a AB, el segmento llega a la lámina sin deformarse, esté como esté.
   - [ ] *Pista 2:* La charnela es la traza horizontal de ese plano vertical, y cada punto cae a una distancia de ella igual a su cota.
   - [ ] *Pista 3:* Traza por A′ y B′ las perpendiculares a la charnela y lleva sobre ellas las cotas de A y B.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* A está por encima del PH y B por debajo: AB atraviesa el plano horizontal. Sus cotas tienen signos distintos.
   - [ ] *Solución, paso 2 · 2. La idea clave:* AB, su proyección A′B′ y la suma de cotas forman un triángulo rectángulo con AB como hipotenusa. Abatirlo sobre el PH lo muestra sin deformar.
   - [ ] *Solución, paso 3 · 3. El movimiento:* El plano proyectante de AB gira como una bisagra alrededor de su traza horizontal, hasta quedar sobre el PH. AB gira con él sin deformarse.
   - [ ] *Solución, paso 4 · 4. El trazado:* La charnela es la traza horizontal del plano proyectante de AB: pasa por A′B′. Traza por A′ y B′ las perpendiculares a ella.
   - [ ] *Solución, paso 5 · 4. El trazado:* Lleva la cota de A a un lado de la charnela y la cota de B al otro, porque están en lados opuestos. El segmento (A)(B) es la verdadera magnitud.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: (A)(B) es la hipotenusa del triángulo de catetos A′B′ (55,9 mm) y la suma de cotas (45 mm). Mide 71,8 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: restar las cotas como si A y B estuvieran del mismo lado. Al estar en lados opuestos, el cateto es su suma, 45 mm.
8. [ ] *escribir una medida, dificultad 3* (respuesta: 79.1 mm): Como en la PAU: A está en el primer cuadrante y B en el segundo. Abate sobre el PV el plano proyectante de AB y mide su verdadera magnitud.
   - [ ] *Pista 1:* Abatir sobre el PV es girar el plano que contiene a AB y es perpendicular al PV, hasta que quede sobre él.
   - [ ] *Pista 2:* La charnela es la traza vertical de ese plano, y cada punto cae a una distancia de ella igual a su alejamiento.
   - [ ] *Pista 3:* Traza por A″ y B″ las perpendiculares a la charnela y lleva sobre ellas los alejamientos de A y B.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* A está delante del PV y B detrás: AB atraviesa el plano vertical. Sus alejamientos tienen signos distintos.
   - [ ] *Solución, paso 2 · 2. La idea clave:* AB, su proyección A″B″ y la suma de alejamientos forman un triángulo rectángulo con AB como hipotenusa. Abatirlo sobre el PV lo muestra sin deformar.
   - [ ] *Solución, paso 3 · 3. El movimiento:* El plano proyectante de AB gira como una bisagra alrededor de su traza vertical, hasta quedar sobre el PV. AB gira con él sin deformarse.
   - [ ] *Solución, paso 4 · 4. El trazado:* La charnela es la traza vertical del plano proyectante de AB: pasa por A″B″. Traza por A″ y B″ las perpendiculares a ella.
   - [ ] *Solución, paso 5 · 4. El trazado:* Lleva el alejamiento de A a un lado de la charnela y el alejamiento de B al otro, porque están en lados opuestos. El segmento (A)(B) es la verdadera magnitud.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: (A)(B) es la hipotenusa del triángulo de catetos A″B″ (65 mm) y la suma de alejamientos (45 mm). Mide 79,1 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: restar los alejamientos como si A y B estuvieran del mismo lado. Al estar en lados opuestos, el cateto es su suma, 45 mm.
9. [ ] *escribir una medida, dificultad 3* (respuesta: 84.1 mm): Como en la PAU: A está en el segundo cuadrante y B en el cuarto. Abate sobre el PH el plano proyectante de AB y mide su verdadera magnitud.
   - [ ] *Pista 1:* Si abatimos el plano que contiene a AB, el segmento llega a la lámina sin deformarse, esté como esté.
   - [ ] *Pista 2:* La charnela es la traza horizontal de ese plano vertical, y cada punto cae a una distancia de ella igual a su cota.
   - [ ] *Pista 3:* Traza por A′ y B′ las perpendiculares a la charnela y lleva sobre ellas las cotas de A y B.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* A está detrás del PV y por encima del PH; B, delante y por debajo. Las cotas y los alejamientos cambian de signo a la vez.
   - [ ] *Solución, paso 2 · 2. La idea clave:* AB, su proyección A′B′ y la suma de cotas forman un triángulo rectángulo con AB como hipotenusa. Abatirlo sobre el PH lo muestra sin deformar.
   - [ ] *Solución, paso 3 · 3. El movimiento:* El plano proyectante de AB gira como una bisagra alrededor de su traza horizontal, hasta quedar sobre el PH. AB gira con él sin deformarse.
   - [ ] *Solución, paso 4 · 4. El trazado:* La charnela es la traza horizontal del plano proyectante de AB: pasa por A′B′. Traza por A′ y B′ las perpendiculares a ella.
   - [ ] *Solución, paso 5 · 4. El trazado:* Lleva la cota de A a un lado de la charnela y la cota de B al otro, porque están en lados opuestos. El segmento (A)(B) es la verdadera magnitud.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: (A)(B) es la hipotenusa del triángulo de catetos A′B′ (71,1 mm) y la suma de cotas (45 mm). Mide 84,1 mm.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: llevar la cota de un punto al lado equivocado de la charnela. Cada punto se abate sobre la perpendicular a la charnela, hacia el lado donde está respecto al plano elegido.

### I-13 · Cada eje se reduce

Fichero: `src/content/lessons/19-cada-eje-se-reduce.json` · DT I · nivel Inicial

- [ ] **Saber básico:** Sistemas de representación: perspectiva isométrica, dibujo isométrico y perspectiva caballera de cubos y prismas, con sus coeficientes de reducción.

**Pasos**

1. [ ] Este cubo tiene 32 mm de arista. En diédrico, su planta y su alzado son dos cuadrados iguales y no se ve a la vez su forma completa.
2. [ ] La axonometría es una proyección del mismo cubo desde otra dirección. Empezamos mirando de frente y solo se ve una cara.
3. [ ] Giramos hasta la dirección isométrica, que forma el mismo ángulo con los tres ejes. En el dibujo, los ejes quedan a 120° y se ven tres caras.
4. [ ] Cada medida paralela a un eje se reduce con el coeficiente 0,816. La escala gráfica lo construye: medidas reales a 45° y proyectadas a 30°.
5. [ ] Las medidas se llevan solo sobre los ejes, o paralelas a ellos. Lo demás, como una diagonal, se obtiene uniendo vértices ya dibujados.
6. [ ] El dibujo isométrico es el mismo cubo sin reducir: sale más grande, con las mismas proporciones. En él las aristas miden lo real.
7. [ ] En caballera, el plano frontal XZ queda en verdadera magnitud y el eje Y se dibuja a 45° y reducido a la mitad. Los rayos son oblicuos.
8. [ ] En isométrica se reducen los tres ejes por igual; en caballera, solo el Y. No se mezclan los coeficientes de un sistema con los del otro.

**Ejercicios**

1. [ ] *escribir una medida, dificultad 1* (respuesta: 24.5 mm): En perspectiva isométrica, ¿cuánto mide en el dibujo una arista de 30 mm de un cubo, paralela al eje Y?
   - [ ] *Pista 1:* En la perspectiva isométrica las tres direcciones se acortan por igual.
   - [ ] *Pista 2:* El coeficiente de reducción vale 0,816 en los tres ejes.
   - [ ] *Pista 3:* Multiplica la medida real por 0,816.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Dibujamos un sólido en perspectiva isométrica y queremos saber cuánto mide en el dibujo una arista de 30 mm paralela al eje Y.
   - [ ] *Solución, paso 2 · 2. La idea clave:* En la perspectiva isométrica los tres ejes forman 120° y se reducen con el mismo coeficiente, 0,816. Toda medida paralela a un eje se multiplica por él.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina el sólido girando hasta que una de sus diagonales mira al observador: los tres ejes se ven igual de inclinados y a 120° entre sí.
   - [ ] *Solución, paso 4 · 4. El trazado:* Construye la escala gráfica de reducción: lleva medidas reales sobre una recta a 45° y proyéctalas sobre otra a 30°.
   - [ ] *Solución, paso 5 · 4. El trazado:* Lleva 30 mm a la escala gráfica y lee la medida reducida: 24,5 mm. Dibuja esa medida sobre el eje.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: 30 mm por 0,816 da 24,5 mm. La misma reducción vale para las aristas paralelas a X y a Z.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: dibujar la medida real, 30 mm, en una perspectiva isométrica. Esa es la medida del dibujo isométrico; aquí hay que reducirla con el coeficiente.
2. [ ] *escribir una medida, dificultad 1* (respuesta: 50 mm): En dibujo isométrico, sin reducir, ¿cuánto mide en el dibujo la altura de 50 mm de un prisma, paralela al eje Z?
   - [ ] *Pista 1:* El dibujo isométrico no aplica coeficiente de reducción.
   - [ ] *Pista 2:* Las medidas paralelas a los ejes se dibujan con su valor real.
   - [ ] *Pista 3:* La altura dibujada mide lo mismo que la real.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Dibujamos un sólido en dibujo isométrico y queremos saber cuánto mide en el dibujo la altura de 50 mm paralela al eje Z.
   - [ ] *Solución, paso 2 · 2. La idea clave:* En el dibujo isométrico los ejes también forman 120°, pero no se reduce nada: las medidas paralelas a los ejes se dibujan con su valor real.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina el sólido girando hasta que una de sus diagonales mira al observador: los tres ejes se ven igual de inclinados y a 120° entre sí.
   - [ ] *Solución, paso 4 · 4. El trazado:* Dibuja los tres ejes a 120° entre sí; en el dibujo isométrico no hace falta escala de reducción.
   - [ ] *Solución, paso 5 · 4. El trazado:* Lleva sobre el eje la medida real, 50 mm, sin reducirla: 50 mm.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: la medida dibujada coincide con la real, 50 mm, porque ese eje no se reduce en este sistema.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: aplicar el coeficiente de la perspectiva isométrica en un dibujo isométrico. Aquí no se reduce nada, y la medida dibujada es la real.
3. [ ] *escribir una medida, dificultad 1* (respuesta: 15 mm): En caballera con coeficiente 0,5, ¿cuánto mide en el dibujo una arista de 30 mm de un cubo, paralela al eje Y?
   - [ ] *Pista 1:* En caballera solo el eje Y se dibuja reducido.
   - [ ] *Pista 2:* La reducción del eje Y es el coeficiente de caballera.
   - [ ] *Pista 3:* Multiplica la medida real por ese coeficiente.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Dibujamos un sólido en caballera y queremos saber cuánto mide en el dibujo una arista de 30 mm paralela al eje Y.
   - [ ] *Solución, paso 2 · 2. La idea clave:* En caballera el plano frontal XZ se ve en verdadera magnitud, y el eje Y se dibuja inclinado y reducido con el coeficiente, 0,5.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina el sólido proyectado con rayos oblicuos sobre el plano frontal: las caras paralelas al cuadro no se deforman y solo la profundidad se acorta.
   - [ ] *Solución, paso 4 · 4. El trazado:* Dibuja el eje Y a 45° del eje X, hacia arriba y a la derecha, y los ejes X y Z a escala real.
   - [ ] *Solución, paso 5 · 4. El trazado:* Lleva sobre el eje Y la medida real, 30 mm, multiplicada por 0,5: 15 mm.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: 30 mm por 0,5 da 15 mm. Las aristas paralelas a X y a Z no se reducen.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: dibujar la arista del eje Y con su medida real, 30 mm. En caballera la profundidad se reduce con el coeficiente.
4. [ ] *escribir una medida, dificultad 2* (respuesta: 36.7 mm): En perspectiva isométrica, ¿cuánto mide en el dibujo la altura de 45 mm de un prisma, paralela al eje Z?
   - [ ] *Pista 1:* La altura del prisma va paralela al eje Z.
   - [ ] *Pista 2:* Los tres ejes se reducen con el mismo coeficiente isométrico.
   - [ ] *Pista 3:* Multiplica la altura real por el coeficiente.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Dibujamos un sólido en perspectiva isométrica y queremos saber cuánto mide en el dibujo la altura de 45 mm paralela al eje Z.
   - [ ] *Solución, paso 2 · 2. La idea clave:* En la perspectiva isométrica los tres ejes forman 120° y se reducen con el mismo coeficiente, 0,816. Toda medida paralela a un eje se multiplica por él.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina el sólido girando hasta que una de sus diagonales mira al observador: los tres ejes se ven igual de inclinados y a 120° entre sí.
   - [ ] *Solución, paso 4 · 4. El trazado:* Construye la escala gráfica de reducción: lleva medidas reales sobre una recta a 45° y proyéctalas sobre otra a 30°.
   - [ ] *Solución, paso 5 · 4. El trazado:* Lleva 45 mm a la escala gráfica y lee la medida reducida: 36,7 mm. Dibuja esa medida sobre el eje.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: 45 mm por 0,816 da 36,7 mm. La misma reducción vale para las aristas paralelas a X y a Z.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: dibujar la medida real, 45 mm, en una perspectiva isométrica. Esa es la medida del dibujo isométrico; aquí hay que reducirla con el coeficiente.
5. [ ] *escribir una medida, dificultad 2* (respuesta: 40 mm): En caballera con coeficiente 0,5, ¿cuánto mide en el dibujo la altura de 40 mm de un prisma, paralela al eje Z?
   - [ ] *Pista 1:* En caballera, el plano frontal XZ está en verdadera magnitud.
   - [ ] *Pista 2:* Los ejes X y Z no se reducen; solo se reduce el Y.
   - [ ] *Pista 3:* La altura dibujada mide lo mismo que la real.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Dibujamos un sólido en caballera y queremos saber cuánto mide en el dibujo la altura de 40 mm paralela al eje Z.
   - [ ] *Solución, paso 2 · 2. La idea clave:* En caballera el plano frontal XZ está en verdadera magnitud: las aristas paralelas a X y a Z se dibujan sin reducir. Solo se reduce el eje Y.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina el sólido proyectado con rayos oblicuos sobre el plano frontal: las caras paralelas al cuadro no se deforman y solo la profundidad se acorta.
   - [ ] *Solución, paso 4 · 4. El trazado:* Dibuja el cuadrado frontal en verdadera magnitud y, desde sus vértices, los ejes Y reducidos hacia atrás.
   - [ ] *Solución, paso 5 · 4. El trazado:* Lleva sobre el eje la medida real, 40 mm, sin reducirla: 40 mm.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: la medida dibujada coincide con la real, 40 mm, porque ese eje no se reduce en este sistema.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: reducir con el coeficiente de caballera una medida del eje Z. Solo se reducen las medidas del eje Y.
6. [ ] *escribir una medida, dificultad 2* (respuesta: 44 mm): En caballera, ¿cuánto mide en el dibujo una arista de 44 mm de un cubo, paralela al eje X?
   - [ ] *Pista 1:* En caballera hay que olvidar los coeficientes de la isométrica.
   - [ ] *Pista 2:* El eje X está en el plano frontal, que se ve en verdadera magnitud.
   - [ ] *Pista 3:* La arista dibujada mide lo mismo que la real.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Dibujamos un sólido en caballera y queremos saber cuánto mide en el dibujo una arista de 44 mm paralela al eje X.
   - [ ] *Solución, paso 2 · 2. La idea clave:* En caballera el plano frontal XZ está en verdadera magnitud: las aristas paralelas a X y a Z se dibujan sin reducir. Solo se reduce el eje Y.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina el sólido proyectado con rayos oblicuos sobre el plano frontal: las caras paralelas al cuadro no se deforman y solo la profundidad se acorta.
   - [ ] *Solución, paso 4 · 4. El trazado:* Dibuja el cuadrado frontal en verdadera magnitud y, desde sus vértices, los ejes Y reducidos hacia atrás.
   - [ ] *Solución, paso 5 · 4. El trazado:* Lleva sobre el eje la medida real, 44 mm, sin reducirla: 44 mm.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: la medida dibujada coincide con la real, 44 mm, porque ese eje no se reduce en este sistema.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: aplicar un coeficiente de la isométrica en caballera. Allí los ejes X y Z no se reducen y solo cambia el Y.
7. [ ] *escribir una medida, dificultad 3* (respuesta: 56.6 mm): Como en la PAU: en caballera, ¿cuánto mide en el dibujo la diagonal de la cara frontal de un cubo de 40 mm de arista?
   - [ ] *Pista 1:* La diagonal no es paralela a ningún eje: no se mide con un coeficiente.
   - [ ] *Pista 2:* La cara frontal está en el plano XZ, que en caballera se ve en verdadera magnitud.
   - [ ] *Pista 3:* Dibuja la cara y mide la diagonal: es la hipotenusa de dos aristas.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Dibujamos un cubo en caballera y queremos saber cuánto mide en el dibujo la diagonal de su cara frontal, de 56,6 mm de verdad.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Una diagonal no es paralela a ningún eje, así que no se mide con un coeficiente. Se dibujan las aristas de la cara, con su reducción, y se mide la recta que las une.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina el sólido proyectado con rayos oblicuos sobre el plano frontal: las caras paralelas al cuadro no se deforman y solo la profundidad se acorta.
   - [ ] *Solución, paso 4 · 4. El trazado:* Dibuja el cuadrado frontal en verdadera magnitud, con las aristas de los ejes X y Z sin reducir.
   - [ ] *Solución, paso 5 · 4. El trazado:* Une los extremos de las dos aristas: la diagonal mide 56,6 mm, igual que en la realidad, porque la cara frontal no se deforma en caballera.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: la diagonal del cuadrado frontal mide 56,6 mm, su valor real, porque el plano XZ está en verdadera magnitud.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: multiplicar la diagonal real, 56,6 mm, por el coeficiente de caballera. Esa cara no está en el eje Y y no se reduce.
8. [ ] *escribir una medida, dificultad 3* (respuesta: 32.7 mm): Como en la PAU: en perspectiva isométrica, ¿cuánto mide en el dibujo la diagonal de la cara frontal de un cubo de 40 mm de arista?
   - [ ] *Pista 1:* La diagonal no es paralela a ningún eje: no se reduce con el coeficiente.
   - [ ] *Pista 2:* Dibuja primero las dos aristas de la cara, reducidas, y une sus extremos.
   - [ ] *Pista 3:* Mide en el dibujo la recta que une el origen con el vértice opuesto de la cara.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Dibujamos un cubo en perspectiva isométrica y queremos saber cuánto mide en el dibujo la diagonal de su cara frontal, de 56,6 mm de verdad.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Una diagonal no es paralela a ningún eje, así que no se mide con un coeficiente. Se dibujan las aristas de la cara, con su reducción, y se mide la recta que las une.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina el sólido girando hasta que una de sus diagonales mira al observador: los tres ejes se ven igual de inclinados y a 120° entre sí.
   - [ ] *Solución, paso 4 · 4. El trazado:* Construye la escala gráfica y dibuja las dos aristas de la cara, sobre los ejes X y Z, reducidas con ella.
   - [ ] *Solución, paso 5 · 4. El trazado:* Une los extremos de las dos aristas: esa diagonal mide 32,7 mm en el dibujo. No es la medida real, 56,6 mm, ni esa por el coeficiente.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: la diagonal dibujada, 32,7 mm, se mide sobre el dibujo y no sale de multiplicar 56,6 mm por un coeficiente.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: multiplicar la diagonal real, 56,6 mm, por el coeficiente del eje. La diagonal no es paralela a un eje y se mide en el dibujo.
9. [ ] *escribir una medida, dificultad 3* (respuesta: 36 mm): Como en la PAU: en dibujo isométrico, ¿cuánto mide en el dibujo la diagonal de la cara frontal de un cubo de 36 mm de arista?
   - [ ] *Pista 1:* La diagonal no es paralela a ningún eje: su longitud real no se traslada al dibujo.
   - [ ] *Pista 2:* Dibuja las dos aristas de la cara a su medida real y une sus extremos.
   - [ ] *Pista 3:* Mide en el dibujo la recta que une el origen con el vértice opuesto de la cara.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Dibujamos un cubo en dibujo isométrico y queremos saber cuánto mide en el dibujo la diagonal de su cara frontal, de 50,9 mm de verdad.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Una diagonal no es paralela a ningún eje, así que no se mide con un coeficiente. Se dibujan las aristas de la cara, con su reducción, y se mide la recta que las une.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina el sólido girando hasta que una de sus diagonales mira al observador: los tres ejes se ven igual de inclinados y a 120° entre sí.
   - [ ] *Solución, paso 4 · 4. El trazado:* Dibuja las dos aristas de la cara, sobre los ejes X y Z, con su medida real.
   - [ ] *Solución, paso 5 · 4. El trazado:* Une los extremos de las dos aristas: esa diagonal mide 36 mm en el dibujo. No es la medida real, 50,9 mm, ni esa por el coeficiente.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: la diagonal dibujada, 36 mm, se mide sobre el dibujo y no sale de multiplicar 50,9 mm por un coeficiente.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: multiplicar la diagonal real, 50,9 mm, por el coeficiente del eje. La diagonal no es paralela a un eje y se mide en el dibujo.

### I-07 · Curvas con arcos enlazados

Fichero: `src/content/lessons/20-curvas-de-arcos.json` · DT I · nivel Inicial

- [ ] **Saber básico:** Geometría: curvas técnicas, óvalo de cuatro centros y espiral de dos centros, con enlaces tangentes sobre la recta de los centros.

**Pasos**

1. [ ] Las curvas técnicas se dibujan con arcos de circunferencia enlazados, sin picos. Cada arco tiene su centro y su radio.
2. [ ] Dos arcos son tangentes cuando su punto de enlace está en la recta que une sus centros. Así la curva no cambia de dirección en el enlace.
3. [ ] Óvalo de ejes AB y CD: llevamos el semieje mayor sobre el menor con un arco de centro O. Con centro C y radio CF marcamos G sobre CA.
4. [ ] La mediatriz de AG corta a los ejes en O₁ y O₂. Son los centros del arco que pasa por A y del arco que pasa por C.
5. [ ] Los otros dos centros, O₃ y O₄, son los simétricos de O₁ y O₂ respecto de O. Los cuatro centros forman un rombo.
6. [ ] Los puntos de enlace están en las rectas que unen los centros, a la distancia del radio de cada arco. Salen al cortar esas rectas con las circunferencias.
7. [ ] Cada arco va de un punto de enlace al siguiente, con su centro. El óvalo queda cerrado, sin picos.
8. [ ] La espiral de dos centros usa semicircunferencias de centros A y B alternados. Los enlaces están sobre AB y el radio crece AB en cada arco.

**Ejercicios**

1. [ ] *construcción en la lámina, dificultad 1*: Espiral de dos centros A y B, con AB de 10 mm. Arrastra Z hasta el punto S₁ donde acaba la primera semicircunferencia.
   - [ ] *Pista 1:* Una espiral de dos centros es una cadena de semicircunferencias con centros alternados.
   - [ ] *Pista 2:* Los puntos de enlace están siempre en la recta AB, y el radio crece AB en cada arco.
   - [ ] *Pista 3:* Con centro A y radio AB corta la recta AB por el otro lado: ese es el primer enlace.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Queremos trazar una espiral de dos centros A y B. Buscamos el punto S₁, donde acaba la primera semicircunferencia.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Una espiral de dos centros es una cadena de semicircunferencias con centros alternados A y B. Sus enlaces están siempre en la recta AB, la recta de los centros.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina un compás que gira media vuelta alrededor de A, luego media vuelta alrededor de B, y así sucesivamente: el radio crece AB cada vez.
   - [ ] *Solución, paso 4 · 4. El trazado:* Con centro A y radio AB traza la circunferencia: corta a la recta AB, al otro lado de A, en S₁. Arrastra Z hasta ese punto.
   - [ ] *Solución, paso 5 · 4. El trazado:* Traza la semicircunferencia de centro A desde B hasta S₁, por un lado de la recta AB.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: S₁ está en la recta AB y a una distancia de A igual al radio de ese arco, que crece AB en cada semicircunferencia.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: seguir el arco más allá del punto de enlace. El arco termina justo en la recta de los centros; si se pasa, la espiral se tuerce.
2. [ ] *construcción en la lámina, dificultad 1*: Óvalo de eje mayor AB de 80 mm y eje menor CD de 40 mm. Arrastra Z hasta el centro del arco que pasa por A, en el eje mayor.
   - [ ] *Pista 1:* Un óvalo son cuatro arcos tangentes, y sus centros están sobre los ejes.
   - [ ] *Pista 2:* Un centro se obtiene con la mediatriz del extremo del eje mayor y un punto de la diagonal.
   - [ ] *Pista 3:* Lleva el semieje mayor sobre el menor, marca G sobre CA y traza la mediatriz de AG.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Queremos construir un óvalo de ejes AB y CD, hecho con cuatro arcos. Buscamos el centro del arco que pasa por A, en el eje mayor.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Dos arcos son tangentes si su punto de enlace está en la recta que une sus centros. Por eso los cuatro centros y los enlaces se obtienen a partir de los ejes.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina el arco que sale de A cerrándose hacia C: sigue siendo una circunferencia hasta que toca al arco de C justo sobre la recta de sus centros.
   - [ ] *Solución, paso 4 · 4. El trazado:* Lleva el semieje mayor sobre el eje menor con un arco de centro O: corta a CD en F. Con centro C y radio CF marca G sobre CA.
   - [ ] *Solución, paso 5 · 4. El trazado:* La mediatriz de AG corta a los ejes en O₁ y O₂: O₁ es el centro del arco que pasa por A. Arrastra Z hasta él.
   - [ ] *Solución, paso 6 · 4. El trazado:* Los otros dos centros son los simétricos de O₁ y O₂ respecto de O. Con los cuatro centros ya se pueden hallar los enlaces.
   - [ ] *Solución, paso 7 · 5. Comprobación:* Comprobación: el centro está sobre su eje, y su distancia al extremo del eje y al punto G es la misma, porque está en la mediatriz de AG.
   - [ ] *Solución, paso 8 · 6. Error típico:* **[REVISAR]** Error típico: poner el centro del arco a ojo, o a una distancia de A que no sale de la mediatriz. Con otro radio el arco no llega a tocar al siguiente.
3. [ ] *construcción en la lámina, dificultad 1*: Espiral de dos centros A y B, con AB de 12 mm. Arrastra Z hasta el punto S₂ donde acaba la segunda semicircunferencia.
   - [ ] *Pista 1:* Una espiral de dos centros es una cadena de semicircunferencias con centros alternados.
   - [ ] *Pista 2:* Los puntos de enlace están siempre en la recta AB, y el radio crece AB en cada arco.
   - [ ] *Pista 3:* Traza cada semicircunferencia con el centro que toca, empezando donde acabó la anterior.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Queremos trazar una espiral de dos centros A y B. Buscamos el punto S₂, donde acaba la segunda semicircunferencia.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Una espiral de dos centros es una cadena de semicircunferencias con centros alternados A y B. Sus enlaces están siempre en la recta AB, la recta de los centros.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina un compás que gira media vuelta alrededor de A, luego media vuelta alrededor de B, y así sucesivamente: el radio crece AB cada vez.
   - [ ] *Solución, paso 4 · 4. El trazado:* Traza las primera semicircunferencia, alternando los centros A y B: cada una empieza donde acaba la anterior.
   - [ ] *Solución, paso 5 · 4. El trazado:* Ahora el centro es B y el radio llega hasta el punto anterior: corta la recta AB en S₂. Arrastra Z hasta él.
   - [ ] *Solución, paso 6 · 4. El trazado:* Traza la semicircunferencia de centro B hasta S₂: es la segunda del dibujo.
   - [ ] *Solución, paso 7 · 5. Comprobación:* Comprobación: S₂ está en la recta AB y a una distancia de B igual al radio de ese arco, que crece AB en cada semicircunferencia.
   - [ ] *Solución, paso 8 · 6. Error típico:* **[REVISAR]** Error típico: usar el centro A en lugar del B para este arco. Los centros se alternan: si no, el enlace no queda sobre AB.
4. [ ] *construcción en la lámina, dificultad 2*: Óvalo de eje mayor AB de 90 mm y eje menor CD de 50 mm. Arrastra Z hasta el centro del arco que pasa por C, en el eje menor.
   - [ ] *Pista 1:* Un óvalo son cuatro arcos tangentes, y sus centros están sobre los ejes.
   - [ ] *Pista 2:* Un centro se obtiene con la mediatriz del extremo del eje mayor y un punto de la diagonal.
   - [ ] *Pista 3:* Lleva el semieje mayor sobre el menor, marca G sobre CA y traza la mediatriz de AG.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Queremos construir un óvalo de ejes AB y CD, hecho con cuatro arcos. Buscamos el centro del arco que pasa por C, en el eje menor.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Dos arcos son tangentes si su punto de enlace está en la recta que une sus centros. Por eso los cuatro centros y los enlaces se obtienen a partir de los ejes.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina el arco que sale de A cerrándose hacia C: sigue siendo una circunferencia hasta que toca al arco de C justo sobre la recta de sus centros.
   - [ ] *Solución, paso 4 · 4. El trazado:* Lleva el semieje mayor sobre el eje menor con un arco de centro O: corta a CD en F. Con centro C y radio CF marca G sobre CA.
   - [ ] *Solución, paso 5 · 4. El trazado:* La mediatriz de AG corta a los ejes en O₁ y O₂: O₂ es el centro del arco que pasa por C. Arrastra Z hasta él.
   - [ ] *Solución, paso 6 · 4. El trazado:* Los otros dos centros son los simétricos de O₁ y O₂ respecto de O. Con los cuatro centros ya se pueden hallar los enlaces.
   - [ ] *Solución, paso 7 · 5. Comprobación:* Comprobación: el centro está sobre su eje, y su distancia al extremo del eje y al punto G es la misma, porque está en la mediatriz de AG.
   - [ ] *Solución, paso 8 · 6. Error típico:* **[REVISAR]** Error típico: trazar el arco que pasa por C con el centro de otro arco. Cada arco tiene su centro: el de C está en el eje menor, del lado opuesto.
5. [ ] *construcción en la lámina, dificultad 2*: Óvalo de eje mayor AB de 88 mm y eje menor CD de 56 mm. Arrastra Z hasta un punto de enlace de dos arcos.
   - [ ] *Pista 1:* Los puntos de enlace están siempre en la recta que une los centros de dos arcos.
   - [ ] *Pista 2:* Primero hay que tener los cuatro centros, que son un rombo con vértices en los ejes.
   - [ ] *Pista 3:* Traza las rectas que unen los centros y córtalas con la circunferencia del arco pequeño.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Queremos construir un óvalo de ejes AB y CD, hecho con cuatro arcos. Buscamos uno de los puntos donde dos arcos se enlazan.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Dos arcos son tangentes si su punto de enlace está en la recta que une sus centros. Por eso los cuatro centros y los enlaces se obtienen a partir de los ejes.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina el arco que sale de A cerrándose hacia C: sigue siendo una circunferencia hasta que toca al arco de C justo sobre la recta de sus centros.
   - [ ] *Solución, paso 4 · 4. El trazado:* Lleva el semieje mayor sobre el eje menor con un arco de centro O: corta a CD en F. Con centro C y radio CF marca G sobre CA.
   - [ ] *Solución, paso 5 · 4. El trazado:* La mediatriz de AG corta a los ejes en O₁ y O₂. Sus simétricos respecto de O, O₃ y O₄, completan los cuatro centros.
   - [ ] *Solución, paso 6 · 4. El trazado:* Prolonga las rectas que unen los centros: cada una corta a la circunferencia del arco pequeño en un punto de enlace. Arrastra Z hasta uno.
   - [ ] *Solución, paso 7 · 5. Comprobación:* Comprobación: el punto de enlace está en la recta de los dos centros, y a la misma distancia de cada uno que su radio.
   - [ ] *Solución, paso 8 · 6. Error típico:* **[REVISAR]** Error típico: poner el punto de enlace sobre el arco, pero fuera de la recta de centros. Entonces las tangentes de los dos arcos no coinciden y aparece un pico.
6. [ ] *construcción en la lámina, dificultad 2*: Espiral de dos centros A y B, con AB de 8 mm. Arrastra Z hasta el punto S₃ donde acaba la tercera semicircunferencia.
   - [ ] *Pista 1:* Una espiral de dos centros es una cadena de semicircunferencias con centros alternados.
   - [ ] *Pista 2:* Los puntos de enlace están siempre en la recta AB, y el radio crece AB en cada arco.
   - [ ] *Pista 3:* Traza cada semicircunferencia con el centro que toca, empezando donde acabó la anterior.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Queremos trazar una espiral de dos centros A y B. Buscamos el punto S₃, donde acaba la tercera semicircunferencia.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Una espiral de dos centros es una cadena de semicircunferencias con centros alternados A y B. Sus enlaces están siempre en la recta AB, la recta de los centros.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina un compás que gira media vuelta alrededor de A, luego media vuelta alrededor de B, y así sucesivamente: el radio crece AB cada vez.
   - [ ] *Solución, paso 4 · 4. El trazado:* Traza las 2 primeras semicircunferencias, alternando los centros A y B: cada una empieza donde acaba la anterior.
   - [ ] *Solución, paso 5 · 4. El trazado:* Ahora el centro es A y el radio llega hasta el punto anterior: corta la recta AB en S₃. Arrastra Z hasta él.
   - [ ] *Solución, paso 6 · 4. El trazado:* Traza la semicircunferencia de centro A hasta S₃: es la tercera del dibujo.
   - [ ] *Solución, paso 7 · 5. Comprobación:* Comprobación: S₃ está en la recta AB y a una distancia de A igual al radio de ese arco, que crece AB en cada semicircunferencia.
   - [ ] *Solución, paso 8 · 6. Error típico:* **[REVISAR]** Error típico: usar el centro B en lugar del A para este arco. Los centros se alternan: si no, el enlace no queda sobre AB.
7. [ ] *construcción en la lámina, dificultad 3*: Óvalo de eje mayor AB de 110 mm y eje menor CD de 50 mm. Arrastra Z hasta el centro del arco que pasa por A, en el eje mayor.
   - [ ] *Pista 1:* Un óvalo son cuatro arcos tangentes, y sus centros están sobre los ejes.
   - [ ] *Pista 2:* Un centro se obtiene con la mediatriz del extremo del eje mayor y un punto de la diagonal.
   - [ ] *Pista 3:* Lleva el semieje mayor sobre el menor, marca G sobre CA y traza la mediatriz de AG.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Queremos construir un óvalo de ejes AB y CD, hecho con cuatro arcos. Buscamos el centro del arco que pasa por A, en el eje mayor.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Dos arcos son tangentes si su punto de enlace está en la recta que une sus centros. Por eso los cuatro centros y los enlaces se obtienen a partir de los ejes.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina el arco que sale de A cerrándose hacia C: sigue siendo una circunferencia hasta que toca al arco de C justo sobre la recta de sus centros.
   - [ ] *Solución, paso 4 · 4. El trazado:* Lleva el semieje mayor sobre el eje menor con un arco de centro O: corta a CD en F. Con centro C y radio CF marca G sobre CA.
   - [ ] *Solución, paso 5 · 4. El trazado:* La mediatriz de AG corta a los ejes en O₁ y O₂: O₁ es el centro del arco que pasa por A. Arrastra Z hasta él.
   - [ ] *Solución, paso 6 · 4. El trazado:* Los otros dos centros son los simétricos de O₁ y O₂ respecto de O. Con los cuatro centros ya se pueden hallar los enlaces.
   - [ ] *Solución, paso 7 · 5. Comprobación:* Comprobación: el centro está sobre su eje, y su distancia al extremo del eje y al punto G es la misma, porque está en la mediatriz de AG.
   - [ ] *Solución, paso 8 · 6. Error típico:* **[REVISAR]** Error típico: poner el centro del arco a ojo, o a una distancia de A que no sale de la mediatriz. Con otro radio el arco no llega a tocar al siguiente.
8. [ ] *construcción en la lámina, dificultad 3*: Óvalo de eje mayor AB de 96 mm y eje menor CD de 44 mm. Arrastra Z hasta un punto de enlace de dos arcos.
   - [ ] *Pista 1:* Los puntos de enlace están siempre en la recta que une los centros de dos arcos.
   - [ ] *Pista 2:* Primero hay que tener los cuatro centros, que son un rombo con vértices en los ejes.
   - [ ] *Pista 3:* Traza las rectas que unen los centros y córtalas con la circunferencia del arco pequeño.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Queremos construir un óvalo de ejes AB y CD, hecho con cuatro arcos. Buscamos uno de los puntos donde dos arcos se enlazan.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Dos arcos son tangentes si su punto de enlace está en la recta que une sus centros. Por eso los cuatro centros y los enlaces se obtienen a partir de los ejes.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina el arco que sale de A cerrándose hacia C: sigue siendo una circunferencia hasta que toca al arco de C justo sobre la recta de sus centros.
   - [ ] *Solución, paso 4 · 4. El trazado:* Lleva el semieje mayor sobre el eje menor con un arco de centro O: corta a CD en F. Con centro C y radio CF marca G sobre CA.
   - [ ] *Solución, paso 5 · 4. El trazado:* La mediatriz de AG corta a los ejes en O₁ y O₂. Sus simétricos respecto de O, O₃ y O₄, completan los cuatro centros.
   - [ ] *Solución, paso 6 · 4. El trazado:* Prolonga las rectas que unen los centros: cada una corta a la circunferencia del arco pequeño en un punto de enlace. Arrastra Z hasta uno.
   - [ ] *Solución, paso 7 · 5. Comprobación:* Comprobación: el punto de enlace está en la recta de los dos centros, y a la misma distancia de cada uno que su radio.
   - [ ] *Solución, paso 8 · 6. Error típico:* **[REVISAR]** Error típico: poner el punto de enlace sobre el arco, pero fuera de la recta de centros. Entonces las tangentes de los dos arcos no coinciden y aparece un pico.
9. [ ] *construcción en la lámina, dificultad 3*: Espiral de dos centros A y B, con AB de 9 mm. Arrastra Z hasta el punto S₄ donde acaba la cuarta semicircunferencia.
   - [ ] *Pista 1:* Una espiral de dos centros es una cadena de semicircunferencias con centros alternados.
   - [ ] *Pista 2:* Los puntos de enlace están siempre en la recta AB, y el radio crece AB en cada arco.
   - [ ] *Pista 3:* Traza cada semicircunferencia con el centro que toca, empezando donde acabó la anterior.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Queremos trazar una espiral de dos centros A y B. Buscamos el punto S₄, donde acaba la cuarta semicircunferencia.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Una espiral de dos centros es una cadena de semicircunferencias con centros alternados A y B. Sus enlaces están siempre en la recta AB, la recta de los centros.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina un compás que gira media vuelta alrededor de A, luego media vuelta alrededor de B, y así sucesivamente: el radio crece AB cada vez.
   - [ ] *Solución, paso 4 · 4. El trazado:* Traza las 3 primeras semicircunferencias, alternando los centros A y B: cada una empieza donde acaba la anterior.
   - [ ] *Solución, paso 5 · 4. El trazado:* Ahora el centro es B y el radio llega hasta el punto anterior: corta la recta AB en S₄. Arrastra Z hasta él.
   - [ ] *Solución, paso 6 · 4. El trazado:* Traza la semicircunferencia de centro B hasta S₄: es la cuarta del dibujo.
   - [ ] *Solución, paso 7 · 5. Comprobación:* Comprobación: S₄ está en la recta AB y a una distancia de B igual al radio de ese arco, que crece AB en cada semicircunferencia.
   - [ ] *Solución, paso 8 · 6. Error típico:* **[REVISAR]** Error típico: seguir el arco más allá del punto de enlace. El arco termina justo en la recta de los centros; si se pasa, la espiral se tuerce.

### II-11 · Cada dirección tiene su fuga

Fichero: `src/content/lessons/21-cada-direccion-su-fuga.json` · DT II · nivel Avanzado

- [ ] **Saber básico:** Sistemas de representación: perspectiva cónica de sólidos dados por sus vistas, con puntos de fuga, puntos métricos y alturas reducidas.

**Pasos**

1. [ ] Un sólido dado por sus vistas se apoya en el geometral, detrás del cuadro. Para dibujarlo en cónica hacen falta su planta, su alzado y la posición del observador.
2. [ ] Primero la planta, abatida sobre el cuadro. Da la posición a lo ancho y la profundidad de cada vértice.
3. [ ] Cada dirección de aristas horizontales tiene su punto de fuga en el horizonte. Todas las aristas paralelas del sólido comparten el mismo.
4. [ ] El punto de fuga sale de trazar, desde el ojo abatido, la paralela a esas aristas. Su corte con el horizonte es la fuga.
5. [ ] Los puntos métricos llevan a la perspectiva las medidas reales de la LT. Cada uno está en el horizonte, a la distancia del ojo abatido a su fuga.
6. [ ] Las verticales se dibujan reducidas: cuanto más lejos del cuadro, más cortas. Solo en el cuadro se ven en verdadera magnitud.
7. [ ] Se unen los vértices. Las aristas ocultas son obligatorias en cónica y se dibujan con línea discontinua fina.
8. [ ] Mueve al observador y gira el sólido: las fugas y los puntos métricos cambian al momento, pero siempre están en el horizonte.

**Ejercicios**

1. [ ] *escribir una medida, dificultad 1* (respuesta: 24 mm): Un cubo de 30 mm de arista, dado por sus vistas, se apoya en el geometral. ¿Cuánto mide en el dibujo su arista vertical más cercana al cuadro, con el observador a 60 mm?
   - [ ] *Pista 1:* Las aristas verticales se reducen a medida que se alejan del cuadro.
   - [ ] *Pista 2:* La escala es la distancia del ojo al cuadro entre esa distancia más la profundidad del pie de la arista.
   - [ ] *Pista 3:* Halla la profundidad del pie con la construcción del geometral y multiplica la altura real por la escala.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Un sólido dado por sus vistas se apoya en el geometral. Buscamos cuánto mide en el dibujo su arista vertical más cercana al cuadro, que de verdad mide 30 mm.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Las verticales se reducen con la distancia: se multiplican por la escala del cuadro, que es la distancia del ojo entre esa distancia más la profundidad. En el cuadro valen lo real.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina el sólido alejándose del cuadro: sus verticales se acortan cada vez más, hasta confundirse con el horizonte.
   - [ ] *Solución, paso 4 · 4. El trazado:* Abate el geometral y halla la imagen del pie de la arista con la visual en planta y la directriz, que fuga a P. El pie queda a 15 mm detrás del cuadro.
   - [ ] *Solución, paso 5 · 4. El trazado:* Lleva la altura real, 30 mm, sobre la vertical del pie con la escala del cuadro, 0,8: la arista mide 24 mm en el dibujo.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: 30 mm por 0,8 da 24 mm, menos que la altura real porque la arista está detrás del cuadro.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: llevar la altura real, 30 mm, al dibujo sin reducirla. Solo en el cuadro las verticales se ven en verdadera magnitud.
2. [ ] *escribir una medida, dificultad 1* (respuesta: 24.9 mm): El cubo está girado 45° respecto al cuadro y el observador está a 60 mm. ¿A qué distancia de P está el punto métrico de una de sus fugas?
   - [ ] *Pista 1:* El punto métrico de una fuga está en el horizonte, a la misma distancia de la fuga que el ojo abatido.
   - [ ] *Pista 2:* Primero hay que hallar la fuga, trazando desde el ojo abatido la paralela a las aristas.
   - [ ] *Pista 3:* Con centro en la fuga y radio hasta el ojo abatido, corta el horizonte hacia P y mide desde P.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Un cubo, dado por sus vistas, está girado respecto al cuadro y el observador está a 60 mm de él. Buscamos a qué distancia de P está el punto métrico de la fuga más cercana.
   - [ ] *Solución, paso 2 · 2. La idea clave:* El punto métrico M de una fuga F está en el horizonte, a la misma distancia de F que el ojo abatido, 84,9 mm, del lado de P. Con él se llevan a la perspectiva las medidas reales.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina el ojo abatido sobre el cuadro y haz girar la recta que lo une con la fuga hasta el horizonte: su extremo marca el punto métrico.
   - [ ] *Solución, paso 4 · 4. El trazado:* Halla la fuga trazando, desde el ojo abatido, la paralela a las aristas del cubo. La fuga más cercana queda a 60 mm de P.
   - [ ] *Solución, paso 5 · 4. El trazado:* Con centro en la fuga y radio hasta el ojo abatido, 84,9 mm, corta el horizonte hacia P: ese punto es M y queda a 24,9 mm de P.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: M y el ojo abatido están a la misma distancia de la fuga, 84,9 mm, y M está en el horizonte, hacia P.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: poner el punto métrico al otro lado de la fuga. Se toma del lado del punto principal; al otro lado, las medidas reales se llevarían al revés.
3. [ ] *escribir una medida, dificultad 1* (respuesta: 29.7 mm): Un prisma de base cuadrada y 40 mm de altura se apoya en el geometral. ¿Cuánto mide en el dibujo su arista vertical más cercana, con el observador a 70 mm?
   - [ ] *Pista 1:* Las aristas verticales se reducen a medida que se alejan del cuadro.
   - [ ] *Pista 2:* La escala es la distancia del ojo al cuadro entre esa distancia más la profundidad del pie de la arista.
   - [ ] *Pista 3:* Halla la profundidad del pie con la construcción del geometral y multiplica la altura real por la escala.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Un sólido dado por sus vistas se apoya en el geometral. Buscamos cuánto mide en el dibujo su arista vertical más cercana al cuadro, que de verdad mide 40 mm.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Las verticales se reducen con la distancia: se multiplican por la escala del cuadro, que es la distancia del ojo entre esa distancia más la profundidad. En el cuadro valen lo real.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina el sólido alejándose del cuadro: sus verticales se acortan cada vez más, hasta confundirse con el horizonte.
   - [ ] *Solución, paso 4 · 4. El trazado:* Abate el geometral y halla la imagen del pie de la arista con la visual en planta y la directriz, que fuga a P. El pie queda a 24,4 mm detrás del cuadro.
   - [ ] *Solución, paso 5 · 4. El trazado:* Lleva la altura real, 40 mm, sobre la vertical del pie con la escala del cuadro, 0,74: la arista mide 29,7 mm en el dibujo.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: 40 mm por 0,74 da 29,7 mm, menos que la altura real porque la arista está detrás del cuadro.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: llevar la altura real, 40 mm, al dibujo sin reducirla. Solo en el cuadro las verticales se ven en verdadera magnitud.
4. [ ] *escribir una medida, dificultad 2* (respuesta: 40.4 mm): El cubo está girado 30° respecto al cuadro y el observador está a 70 mm. ¿A qué distancia de P está el punto métrico de la fuga más cercana?
   - [ ] *Pista 1:* El punto métrico de una fuga está en el horizonte, a la misma distancia de la fuga que el ojo abatido.
   - [ ] *Pista 2:* Primero hay que hallar la fuga, trazando desde el ojo abatido la paralela a las aristas.
   - [ ] *Pista 3:* Con centro en la fuga y radio hasta el ojo abatido, corta el horizonte hacia P y mide desde P.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Un cubo, dado por sus vistas, está girado respecto al cuadro y el observador está a 70 mm de él. Buscamos a qué distancia de P está el punto métrico de la fuga más cercana.
   - [ ] *Solución, paso 2 · 2. La idea clave:* El punto métrico M de una fuga F está en el horizonte, a la misma distancia de F que el ojo abatido, 80,8 mm, del lado de P. Con él se llevan a la perspectiva las medidas reales.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina el ojo abatido sobre el cuadro y haz girar la recta que lo une con la fuga hasta el horizonte: su extremo marca el punto métrico.
   - [ ] *Solución, paso 4 · 4. El trazado:* Halla la fuga trazando, desde el ojo abatido, la paralela a las aristas del cubo. La fuga más cercana queda a 40,4 mm de P.
   - [ ] *Solución, paso 5 · 4. El trazado:* Con centro en la fuga y radio hasta el ojo abatido, 80,8 mm, corta el horizonte hacia P: ese punto es M y queda a 40,4 mm de P.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: M y el ojo abatido están a la misma distancia de la fuga, 80,8 mm, y M está en el horizonte, hacia P.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: medir el ángulo de las aristas con el cuadro y no con la perpendicular al cuadro. Entonces la fuga cercana y la lejana se confunden y el punto métrico sale en otro sitio.
5. [ ] *escribir una medida, dificultad 2* (respuesta: 24.1 mm): Un cubo de 30 mm de arista, girado 30° respecto al cuadro, se apoya en el geometral. ¿Cuánto mide en el dibujo su arista vertical más cercana, con el observador a 80 mm?
   - [ ] *Pista 1:* Las aristas verticales se reducen a medida que se alejan del cuadro.
   - [ ] *Pista 2:* La escala es la distancia del ojo al cuadro entre esa distancia más la profundidad del pie de la arista.
   - [ ] *Pista 3:* Halla la profundidad del pie con la construcción del geometral y multiplica la altura real por la escala.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Un sólido dado por sus vistas se apoya en el geometral. Buscamos cuánto mide en el dibujo su arista vertical más cercana al cuadro, que de verdad mide 30 mm.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Las verticales se reducen con la distancia: se multiplican por la escala del cuadro, que es la distancia del ojo entre esa distancia más la profundidad. En el cuadro valen lo real.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina el sólido alejándose del cuadro: sus verticales se acortan cada vez más, hasta confundirse con el horizonte.
   - [ ] *Solución, paso 4 · 4. El trazado:* Abate el geometral y halla la imagen del pie de la arista con la visual en planta y la directriz, que fuga a P. El pie queda a 19,5 mm detrás del cuadro.
   - [ ] *Solución, paso 5 · 4. El trazado:* Lleva la altura real, 30 mm, sobre la vertical del pie con la escala del cuadro, 0,8: la arista mide 24,1 mm en el dibujo.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: 30 mm por 0,8 da 24,1 mm, menos que la altura real porque la arista está detrás del cuadro.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: llevar la altura real, 30 mm, al dibujo sin reducirla. Solo en el cuadro las verticales se ven en verdadera magnitud.
6. [ ] *escribir una medida, dificultad 2* (respuesta: 14.4 mm): El cubo está girado 25° respecto al cuadro y el observador está a 65 mm. ¿A qué distancia de P está el punto métrico de la fuga más lejana?
   - [ ] *Pista 1:* El punto métrico de una fuga está en el horizonte, a la misma distancia de la fuga que el ojo abatido.
   - [ ] *Pista 2:* Primero hay que hallar la fuga más lejana, con la paralela a las aristas desde el ojo abatido.
   - [ ] *Pista 3:* Con centro en esa fuga y radio hasta el ojo abatido, corta el horizonte hacia P y mide desde P.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Un cubo, dado por sus vistas, está girado respecto al cuadro y el observador está a 65 mm de él. Buscamos a qué distancia de P está el punto métrico de la fuga más lejana.
   - [ ] *Solución, paso 2 · 2. La idea clave:* El punto métrico M de una fuga F está en el horizonte, a la misma distancia de F que el ojo abatido, 153,8 mm, del lado de P. Con él se llevan a la perspectiva las medidas reales.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina el ojo abatido sobre el cuadro y haz girar la recta que lo une con la fuga hasta el horizonte: su extremo marca el punto métrico.
   - [ ] *Solución, paso 4 · 4. El trazado:* Halla la fuga trazando, desde el ojo abatido, la paralela a las aristas del cubo. La fuga más lejana queda a 139,4 mm de P.
   - [ ] *Solución, paso 5 · 4. El trazado:* Con centro en la fuga y radio hasta el ojo abatido, 153,8 mm, corta el horizonte hacia P: ese punto es M y queda a 14,4 mm de P.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: M y el ojo abatido están a la misma distancia de la fuga, 153,8 mm, y M está en el horizonte, hacia P.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: medir el ángulo de las aristas con el cuadro y no con la perpendicular al cuadro. Entonces la fuga cercana y la lejana se confunden y el punto métrico sale en otro sitio.
7. [ ] *escribir una medida, dificultad 3* (respuesta: 46.9 mm): Como en la PAU: cubo girado 35° respecto al cuadro y observador a 90 mm. ¿A qué distancia de P está el punto métrico de la fuga más cercana?
   - [ ] *Pista 1:* El punto métrico de una fuga está en el horizonte, a la misma distancia de la fuga que el ojo abatido.
   - [ ] *Pista 2:* Primero hay que hallar la fuga, trazando desde el ojo abatido la paralela a las aristas.
   - [ ] *Pista 3:* Con centro en la fuga y radio hasta el ojo abatido, corta el horizonte hacia P y mide desde P.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Un cubo, dado por sus vistas, está girado respecto al cuadro y el observador está a 90 mm de él. Buscamos a qué distancia de P está el punto métrico de la fuga más cercana.
   - [ ] *Solución, paso 2 · 2. La idea clave:* El punto métrico M de una fuga F está en el horizonte, a la misma distancia de F que el ojo abatido, 109,9 mm, del lado de P. Con él se llevan a la perspectiva las medidas reales.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina el ojo abatido sobre el cuadro y haz girar la recta que lo une con la fuga hasta el horizonte: su extremo marca el punto métrico.
   - [ ] *Solución, paso 4 · 4. El trazado:* Halla la fuga trazando, desde el ojo abatido, la paralela a las aristas del cubo. La fuga más cercana queda a 63 mm de P.
   - [ ] *Solución, paso 5 · 4. El trazado:* Con centro en la fuga y radio hasta el ojo abatido, 109,9 mm, corta el horizonte hacia P: ese punto es M y queda a 46,9 mm de P.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: M y el ojo abatido están a la misma distancia de la fuga, 109,9 mm, y M está en el horizonte, hacia P.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: poner el punto métrico al otro lado de la fuga. Se toma del lado del punto principal; al otro lado, las medidas reales se llevarían al revés.
8. [ ] *escribir una medida, dificultad 3* (respuesta: 36.5 mm): Como en la PAU: prisma de base cuadrada y 50 mm de altura, girado 20° respecto al cuadro, con el observador a 85 mm. ¿Cuánto mide en el dibujo su arista vertical más cercana?
   - [ ] *Pista 1:* Las aristas verticales se reducen a medida que se alejan del cuadro.
   - [ ] *Pista 2:* La escala es la distancia del ojo al cuadro entre esa distancia más la profundidad del pie de la arista.
   - [ ] *Pista 3:* Halla la profundidad del pie con la construcción del geometral y multiplica la altura real por la escala.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Un sólido dado por sus vistas se apoya en el geometral. Buscamos cuánto mide en el dibujo su arista vertical más cercana al cuadro, que de verdad mide 50 mm.
   - [ ] *Solución, paso 2 · 2. La idea clave:* Las verticales se reducen con la distancia: se multiplican por la escala del cuadro, que es la distancia del ojo entre esa distancia más la profundidad. En el cuadro valen lo real.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina el sólido alejándose del cuadro: sus verticales se acortan cada vez más, hasta confundirse con el horizonte.
   - [ ] *Solución, paso 4 · 4. El trazado:* Abate el geometral y halla la imagen del pie de la arista con la visual en planta y la directriz, que fuga a P. El pie queda a 31,4 mm detrás del cuadro.
   - [ ] *Solución, paso 5 · 4. El trazado:* Lleva la altura real, 50 mm, sobre la vertical del pie con la escala del cuadro, 0,73: la arista mide 36,5 mm en el dibujo.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: 50 mm por 0,73 da 36,5 mm, menos que la altura real porque la arista está detrás del cuadro.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: dibujar solo las aristas vistas del sólido. En cónica las aristas ocultas son obligatorias y se dibujan con línea discontinua fina.
9. [ ] *escribir una medida, dificultad 3* (respuesta: 20 mm): Como en la PAU: cubo girado 40° respecto al cuadro y observador a 55 mm. ¿A qué distancia de P está el punto métrico de la fuga más lejana?
   - [ ] *Pista 1:* El punto métrico de una fuga está en el horizonte, a la misma distancia de la fuga que el ojo abatido.
   - [ ] *Pista 2:* Primero hay que hallar la fuga más lejana, con la paralela a las aristas desde el ojo abatido.
   - [ ] *Pista 3:* Con centro en esa fuga y radio hasta el ojo abatido, corta el horizonte hacia P y mide desde P.
   - [ ] *Solución, paso 1 · 1. Mira el espacio:* Un cubo, dado por sus vistas, está girado respecto al cuadro y el observador está a 55 mm de él. Buscamos a qué distancia de P está el punto métrico de la fuga más lejana.
   - [ ] *Solución, paso 2 · 2. La idea clave:* El punto métrico M de una fuga F está en el horizonte, a la misma distancia de F que el ojo abatido, 85,6 mm, del lado de P. Con él se llevan a la perspectiva las medidas reales.
   - [ ] *Solución, paso 3 · 3. El movimiento:* Imagina el ojo abatido sobre el cuadro y haz girar la recta que lo une con la fuga hasta el horizonte: su extremo marca el punto métrico.
   - [ ] *Solución, paso 4 · 4. El trazado:* Halla la fuga trazando, desde el ojo abatido, la paralela a las aristas del cubo. La fuga más lejana queda a 65,5 mm de P.
   - [ ] *Solución, paso 5 · 4. El trazado:* Con centro en la fuga y radio hasta el ojo abatido, 85,6 mm, corta el horizonte hacia P: ese punto es M y queda a 20 mm de P.
   - [ ] *Solución, paso 6 · 5. Comprobación:* Comprobación: M y el ojo abatido están a la misma distancia de la fuga, 85,6 mm, y M está en el horizonte, hacia P.
   - [ ] *Solución, paso 7 · 6. Error típico:* **[REVISAR]** Error típico: dibujar solo las aristas vistas del sólido. En cónica las aristas ocultas son obligatorias y se dibujan con línea discontinua fina.

## 2. Ejercicios PAU (ejemplos de formato)

### Ejercicio 1 · Afinidad ortogonal de dos triángulos

Fichero: `src/content/pau/2025-ord-1-afinidad.json` · 2025 ordinaria

- [ ] **Enunciado:** Dada la figura representada y la homología afín ortogonal definida por los pares de puntos homólogos A-A′ y C≡C′, se pide: 1. Determinar el eje de afinidad. 2. Representar la figura homóloga a la dada.
- [ ] **Dato:** Medidos en la lámina del examen (mm, con el origen en el centro de la hoja): A(−2,2; 73,5), A′(−2,2; −76,3) y C≡C′(−52,1; 23,6). La figura son dos triángulos, uno dentro del otro.

**Solución paso a paso**

1. [ ] *1. Mira el espacio:* Tenemos dos triángulos, uno dentro del otro, y dos pares de puntos homólogos: A con A′, y C que coincide con C′. Hay que hallar el eje y dibujar la figura afín.
2. [ ] *2. La idea clave:* En una afinidad ortogonal, las rectas que unen puntos homólogos son perpendiculares al eje. Además, C≡C′ es un punto doble: está sobre el eje.
3. [ ] *3. El movimiento:* Imagina la figura estirándose en la dirección de AA′, perpendicular al eje: cada punto se desplaza en línea recta y los puntos del eje no se mueven. Aquí A′ queda al otro lado del eje.
4. [ ] *4. El trazado:* Une A con A′ y traza por C la perpendicular a AA′: es el eje de afinidad e.
5. [ ] *4. El trazado:* Para cada vértice, une A con él hasta cortar al eje. Esa recta, unida a A′, da la dirección del homólogo; este queda en la perpendicular al eje por el vértice.
6. [ ] *4. El trazado:* Repite con los tres vértices del triángulo interior y une los homólogos en el mismo orden. Resultan el triángulo exterior y el interior transformados.
7. [ ] *5. Comprobación:* Comprobación: todos los segmentos que unen puntos homólogos son perpendiculares al eje, y cada recta corta a su homóloga en un punto del eje.
8. [ ] *6. Error típico:* **[REVISAR]** Error típico: tomar como eje la mediatriz de AA′. Solo sería el eje si la razón de afinidad fuese 1 o −1; aquí el eje debe pasar por el punto doble C≡C′.

**Rúbrica (2 puntos de solución y método)** · **[REVISAR]** rúbrica derivada de la puntuación por apartados del examen, no oficial

- [ ] Eje de afinidad, perpendicular a AA′ por C — 0,2 p
- [ ] Homólogos de los vértices del triángulo exterior — 0,6 p
- [ ] Homólogos de los vértices del triángulo interior — 0,6 p
- [ ] Figura homóloga completa, con sus construcciones auxiliares — 0,6 p

### Ejercicio 2 · Octaedro con una diagonal vertical y recta a 30° con el PH

Fichero: `src/content/pau/2025-ord-2-octaedro.json` · 2025 ordinaria

- [ ] **Enunciado:** Dadas las proyecciones horizontales del cuadrado ABCD, de la recta R y de su traza horizontal H, se pide: 1. Dibujar las proyecciones del octaedro regular ABCDEF situado en el primer diedro de proyección, sabiendo que su diagonal EF es perpendicular al plano horizontal de proyección y el punto E tiene cota cero. 2. Determinar la proyección vertical de R sabiendo que forma 30º con el plano horizontal de proyección. 3. Representar la recta S paralela a R y que pasa por el punto medio de la diagonal EF.
- [ ] **Dato:** Medidos en la lámina del examen (mm, x desde el centro de la hoja, alejamiento desde la LT): a(−7,3; 10,5), b(4,2; 64,2), c(−49,5; 75,8), d(−61,0; 22,1); H(18,8; 44,3); r′ llega a la LT en x = 67,9. El lado del cuadrado mide 54,9 mm.

**Solución paso a paso**

1. [ ] *1. Mira el espacio:* Conocemos la planta del cuadrado ABCD, que es la cara central de un octaedro con la diagonal EF vertical, y la planta de la recta R con su traza horizontal H.
2. [ ] *2. La idea clave:* Si EF es vertical, ABCD es horizontal y está a media altura de EF. Su cota es el lado dividido por √2, y la diagonal EF mide el lado por √2.
3. [ ] *3. El movimiento:* Apoya el octaedro por el vértice E sobre el PH: F queda justo encima de E, y los cuatro vértices del cuadrado ABCD rodean la diagonal vertical a media altura.
4. [ ] *4. El trazado:* En la planta, E′ y F′ coinciden en el centro de ABCD. En el alzado, a″b″c″d″ están sobre una paralela a la LT a 38,8 mm de cota, y E″ está en la LT.
5. [ ] *4. El trazado:* F″ está sobre la vertical de E″, a una cota de 77,6 mm. Une E y F con A, B, C y D en las dos proyecciones, con las aristas ocultas discontinuas.
6. [ ] *4. El trazado:* R pasa por H y forma 30° con el PH: por cada milímetro de recorrido horizontal sobre r′, su cota crece tan 30°. Con eso se halla un segundo punto y se traza r″ desde H″.
7. [ ] *4. El trazado:* El punto medio M de EF está a media altura, sobre el centro de ABCD. S pasa por M y es paralela a R: s′ es paralela a r′ y s″ es paralela a r″.
8. [ ] *5. Comprobación:* Comprobación: ABCD está a la misma cota que M, las aristas desde E y F llegan a los cuatro vértices, y s es paralela a r en planta y en alzado.
9. [ ] *6. Error típico:* **[REVISAR]** Error típico: dar a F la cota del lado, 54,9 mm. EF es la diagonal del octaedro, que mide el lado por √2, y su punto medio está a media diagonal.

**Rúbrica (2 puntos de solución y método)** · **[REVISAR]** rúbrica derivada de la puntuación por apartados del examen, no oficial

- [ ] Cota de ABCD y vértices E y F del octaedro — 0,4 p
- [ ] Proyección horizontal del octaedro, con vistas y ocultas — 0,4 p
- [ ] Proyección vertical del octaedro, con vistas y ocultas — 0,4 p
- [ ] Proyección vertical de R, a 30° con el PH — 0,6 p
- [ ] Recta S paralela a R por el punto medio de EF — 0,2 p

### Ejercicio 4 · Corte A-A y acotación de un soporte con orejeta redonda

Fichero: `src/content/pau/2025-ord-4-soporte-corte.json` · 2025 ordinaria

- [ ] **Enunciado:** Dados planta y perfil de una pieza a escala 1:2, según el método de representación del primer diedro de proyección, se pide: 1. Dibujar el corte A-A a escala 1:2. 2. Acotar según normas.
- [ ] **Dato:** Medidos en la lámina del examen (a escala 1:2, aquí a tamaño real): dos bloques de 75 mm de largo, de 45 y 30 mm de alto, unidos por una orejeta de 30 mm de grosor, 100 mm de ancho y 150 mm de alto, con la parte de arriba redonda de R50 y un taladro de ⌀50; taladro vertical de ⌀30 en el bloque más alto.
- [ ] **Dato:** La lámina original dibuja el perfil visto desde el lado contrario al perfil izquierdo; aquí se muestra el perfil izquierdo, con las mismas medidas.

**Solución paso a paso**

1. [ ] *1. Mira el espacio:* La pieza tiene dos bloques de distinta altura unidos por una orejeta redonda con un taladro horizontal, y un taladro vertical en el bloque alto. El plano A-A pasa por los ejes de los dos taladros.
2. [ ] *2. La idea clave:* El plano A-A es paralelo al alzado y pasa por los ejes de los dos taladros. Se quita la parte de delante y se dibuja lo que queda, mirando hacia atrás.
3. [ ] *3. El movimiento:* Imagina que cortas la pieza por A-A y retiras la mitad de delante. Lo que ves por el corte es el alzado en corte.
4. [ ] *4. El trazado:* Dibuja el contorno del alzado en corte: los dos bloques, la orejeta y los dos taladros, que ahora se ven como huecos, sin aristas ocultas.
5. [ ] *4. El trazado:* Raya a 45° solo donde el plano ha cortado el material y deja vacíos los taladros. El rayado de la orejeta queda partido en dos por el hueco del taladro horizontal.
6. [ ] *4. El trazado:* Acota cada medida una sola vez, fuera de la pieza: longitudes debajo, con la total más lejos, y alturas y diámetros a los lados.
7. [ ] *5. Comprobación:* Comprobación: el rayado ocupa todo el material cortado y nada más, los dos taladros quedan vacíos y las medidas de las cadenas suman la total.
8. [ ] *6. Error típico:* **[REVISAR]** Error típico: cortar por un plano que no pasa por los ejes de los taladros. Entonces los taladros no se ven como huecos y el corte no enseña lo que hay dentro.

**Rúbrica (2 puntos de solución y método)** · **[REVISAR]** rúbrica derivada de la puntuación por apartados del examen, no oficial

- [ ] Contorno del corte A-A con los bloques, la orejeta y los dos taladros — 0,5 p
- [ ] Rayado a 45° solo en el material cortado, con los taladros vacíos — 0,3 p
- [ ] Sin aristas ocultas y con los ejes de simetría — 0,2 p
- [ ] Cotas de longitud y altura de los bloques y de la orejeta — 0,5 p
- [ ] Cotas de los diámetros y de la posición de los taladros, sin repetir — 0,5 p

### Ejercicio 1 (opción A) · Parábola por su directriz, un punto y la tangente en él

Fichero: `src/content/pau/2026-ext-1a-parabola.json` · 2026 extraordinaria

- [ ] **Enunciado:** Dada la directriz D de una parábola, un punto P de la misma y la recta T tangente a la cónica en dicho punto, se pide: 1. Determinar el vértice V, el eje E y el foco F de la parábola. 2. Dibujar la cónica.
- [ ] **Dato:** Medidos en la lámina del examen (mm, con el origen en el centro de la hoja): D horizontal a −56,2 de la referencia; P(−44,3; 8,7); T pasa por P y por (−71,7; 73,1).

**Solución paso a paso**

1. [ ] *1. Mira el espacio:* Conocemos la directriz D de una parábola, un punto P de la curva y la tangente T en P. Faltan el foco F, el eje E y el vértice V.
2. [ ] *2. La idea clave:* La tangente en P es la mediatriz del segmento que une el foco con el pie Q de la perpendicular desde P a la directriz. Por eso el foco es el simétrico de Q respecto de T.
3. [ ] *3. El movimiento:* Imagina un punto que recorre la parábola: su distancia al foco es siempre igual a su distancia a la directriz. Con P, esa igualdad es PF = PQ.
4. [ ] *4. El trazado:* Baja desde P la perpendicular a D: su pie es Q. Traza por Q la perpendicular a T, que la corta en M.
5. [ ] *4. El trazado:* Con centro en M y radio MQ, la circunferencia corta de nuevo a QM en el simétrico de Q respecto de T: es el foco F.
6. [ ] *4. El trazado:* El eje E es la perpendicular a D por F. El vértice V es el punto medio entre F y el pie de E sobre D, y la parábola de foco F y directriz D pasa por V y por P.
7. [ ] *5. Comprobación:* Comprobación: P está a la misma distancia de F que de D, y T toca a la parábola en P sin cortarla. El vértice queda a mitad de camino entre F y D.
8. [ ] *6. Error típico:* **[REVISAR]** Error típico: tomar como foco el punto M, que está sobre la tangente. El foco es el simétrico de Q respecto de T, es decir, el punto de la recta QM que está al otro lado de T.

**Rúbrica (2 puntos de solución y método)** · **[REVISAR]** rúbrica derivada de la puntuación por apartados del examen, no oficial

- [ ] Pie Q de la perpendicular desde P a la directriz — 0,3 p
- [ ] Foco F, simétrico de Q respecto de la tangente — 0,4 p
- [ ] Eje E y vértice V — 0,3 p
- [ ] Puntos de la parábola obtenidos con el foco y la directriz — 0,5 p
- [ ] Trazado de la curva, tangente a T en P — 0,5 p

### Ejercicio 2 · Hexaedro y su sección por un plano perpendicular al primer bisector

Fichero: `src/content/pau/2026-ext-2-hexaedro-seccion.json` · 2026 extraordinaria

- [ ] **Enunciado:** Dada la traza horizontal del plano P y la proyección horizontal del cuadrado ABCD contenido en el plano horizontal de proyección, se pide: 1. Determinar la traza vertical de P sabiendo que dicho plano es perpendicular al primer bisector. 2. Representar las proyecciones del hexaedro de base ABCD situado en el primer diedro diferenciando aristas vistas y ocultas. 3. Dibujar las proyecciones de la sección que origina el plano P en el poliedro diferenciando aristas vistas y ocultas.
- [ ] **Dato:** Medidos en la lámina del examen (mm, x desde el centro de la hoja, alejamiento desde la LT): a(−20,7; 71,6), b(24,9; 55,3), c(8,5; 9,6), d(−37,1; 26,0); α₁ pasa por la LT en x = 40,8 y baja hacia la izquierda con 60°. El lado del cuadrado mide 48,4 mm.

**Solución paso a paso**

1. [ ] *1. Mira el espacio:* El cuadrado ABCD está en el PH y la traza horizontal α₁ de P pasa por la LT y corta al cuadrado. Falta la traza vertical, y el hexaedro, un cubo, se levanta sobre ABCD.
2. [ ] *2. La idea clave:* Un plano perpendicular al primer bisector tiene sus trazas simétricas respecto de la LT: α₂ es la imagen de α₁ al doblar la lámina por la LT, y ambas se cortan en la LT.
3. [ ] *3. El movimiento:* Imagina el plano P cortando el cubo: la parte de arriba se separa y la sección queda como una cara nueva sobre la parte que se queda.
4. [ ] *4. El trazado:* Dibuja α₂ simétrica de α₁ respecto de la LT, por el mismo punto de la LT. Ahora el plano P está definido por sus dos trazas.
5. [ ] *4. El trazado:* Levanta el hexaedro: sus aristas verticales miden el lado de ABCD, 48,4 mm. Dibuja las dos proyecciones con las aristas vistas continuas y las ocultas discontinuas.
6. [ ] *4. El trazado:* Halla en cada arista el punto donde la corta el plano P, con un plano proyectante que la contenga. Esos puntos son los vértices de la sección.
7. [ ] *4. El trazado:* Une los vértices de la sección en orden, en planta y en alzado, y deja vistas u ocultas las aristas del cubo según queden delante o detrás.
8. [ ] *5. Comprobación:* Comprobación: cada vértice de la sección está sobre una arista del cubo y en el plano P, y la proyección horizontal de la sección queda dentro de ABCD.
9. [ ] *6. Error típico:* **[REVISAR]** Error típico: trazar α₂ paralela a α₁. En un plano perpendicular al primer bisector las trazas son simétricas respecto de la LT, no paralelas.

**Rúbrica (2 puntos de solución y método)** · **[REVISAR]** rúbrica derivada de la puntuación por apartados del examen, no oficial

- [ ] Traza vertical de P, simétrica de la horizontal — 0,4 p
- [ ] Proyecciones del hexaedro — 0,5 p
- [ ] Aristas vistas y ocultas del hexaedro — 0,3 p
- [ ] Vértices de la sección sobre las aristas — 0,4 p
- [ ] Proyecciones de la sección — 0,2 p
- [ ] Partes vistas y ocultas tras el corte — 0,2 p

### Ejercicio 4 · Alzado, planta y acotación de una pieza con pared inclinada y cuña

Fichero: `src/content/pau/2026-ext-4-vistas-cuna.json` · 2026 extraordinaria

- [ ] **Enunciado:** Dada la perspectiva isométrica de una pieza a escala 1:1, se pide: 1. Representar alzado y planta a escala 1:1, según el método de representación del primer diedro de proyección. 2. Acotar las vistas según normas.
- [ ] **Dato:** Perspectiva isométrica con coeficiente de reducción 0,816: las medidas del dibujo se dividen entre 0,816 para obtener las reales.
- [ ] **Dato:** Medidas obtenidas de la lámina del examen (múltiplos de 15 mm): pieza de 60 mm de largo; pared trasera de 15 mm de grosor y 45 mm de alto en el extremo izquierdo, que sube en pendiente hasta 60 mm en 30 mm de largo; bloque delantero de 30 mm de alto y 30 mm de fondo con un entrante triangular de 15 mm de profundidad; y una cuña de pirámide triangular en la esquina delantera derecha.

**Solución paso a paso**

1. [ ] *1. Mira el espacio:* La pieza tiene una pared trasera con la parte de arriba en pendiente, un bloque delantero más bajo con un entrante triangular y una cuña en la esquina de la derecha. El alzado se mira desde el lado de la cuña.
2. [ ] *2. La idea clave:* Cada vista enseña solo lo que se ve desde su lado y las medidas comunes quedan alineadas. En la perspectiva isométrica las medidas se dividen entre el coeficiente para obtener las reales.
3. [ ] *3. El movimiento:* Imagina la pieza dentro de la caja de proyección: el alzado se proyecta en la cara de atrás y la planta en la de abajo. Al desplegar la caja, la planta queda debajo del alzado.
4. [ ] *4. El trazado:* Dibuja el alzado: el contorno con la pendiente de la pared, el bloque bajo y las aristas de la cuña. Después baja las medidas con líneas de referencia y dibuja la planta, con el entrante triangular y la cuña.
5. [ ] *4. El trazado:* Revisa las aristas ocultas: en el alzado y en la planta ninguna queda tapada, así que todas van con línea continua gruesa. En la isométrica sí se dibujan las de detrás, con discontinua.
6. [ ] *4. El trazado:* Acota cada medida una sola vez, en la vista donde mejor se ve: alturas y longitud en el alzado, fondos y entrante en la planta.
7. [ ] *5. Comprobación:* Comprobación: las anchuras del alzado y de la planta coinciden, el fondo de la planta suma lo que dice la perspectiva, y no hay ninguna cota repetida.
8. [ ] *6. Error típico:* **[REVISAR]** Error típico: leer en la isométrica las medidas del dibujo como si fueran las reales. Hay que dividirlas entre el coeficiente de reducción, 0,816.

**Rúbrica (2 puntos de solución y método)** · **[REVISAR]** rúbrica derivada de la puntuación por apartados del examen, no oficial

- [ ] Aplicación del coeficiente a las medidas de la perspectiva — 0,25 p
- [ ] Alzado correcto, con la pendiente de la pared y el bloque bajo — 0,6 p
- [ ] Planta correcta, con el entrante y la cuña, y vistas alineadas — 0,6 p
- [ ] Aristas vistas y ocultas bien distinguidas — 0,15 p
- [ ] Cotas en las vistas, sin repetir y fuera de la pieza — 0,4 p

### Ejercicio 1 (opción A) · Circunferencias tangentes a dos dadas, una de ellas en un punto

Fichero: `src/content/pau/2026-ord-1a-tangencias.json` · 2026 ordinaria

- [ ] **Enunciado:** Dadas las circunferencias C₁ y C₂ de centros O₁ y O₂, respectivamente, así como el punto T perteneciente a C₂, se pide: 1. Determinar el eje radical de C₁ y C₂. 2. Trazar las circunferencias tangentes a C₁ y a C₂ en T, determinando geométricamente sus centros y puntos de tangencia.
- [ ] **Dato:** Medidos en la lámina del examen (mm, con el origen en el centro de la hoja): O₁(30,1; 10,8) con radio 32,5; O₂(−31,8; −7,0) con radio 20,0; T(−27,9; 12,6) sobre C₂.

**Solución paso a paso**

1. [ ] *1. Mira el espacio:* Tenemos dos circunferencias, C₁ y C₂, y un punto T de C₂. Buscamos las circunferencias que tocan a C₂ justo en T y que también son tangentes a C₁.
2. [ ] *2. La idea clave:* Si una circunferencia es tangente a C₂ en T, su centro está en la recta O₂T. Y la tangente común en T es el eje radical de esa circunferencia y C₂.
3. [ ] *3. El movimiento:* Imagina que el centro se desliza por la recta O₂T: la circunferencia va cambiando de tamaño y siempre toca a C₂ en T. Solo en dos posiciones toca también a C₁.
4. [ ] *4. El trazado:* Traza el eje radical e de C₁ y C₂. Su corte con la tangente t en T es el centro radical R.
5. [ ] *4. El trazado:* Desde R las tangentes a C₂ miden RT, y las tangentes a C₁ miden lo mismo. La circunferencia de centro R y radio RT corta a C₁ en los puntos de tangencia U₁ y U₂.
6. [ ] *4. El trazado:* Los centros Ω₁ y Ω₂ están donde las rectas O₁U₁ y O₁U₂ cortan a la recta O₂T. Cada circunferencia solución pasa por T y por su punto U.
7. [ ] *5. Comprobación:* Comprobación: cada circunferencia pasa por T y por su punto U, y la distancia de su centro a O₁ es la suma o la diferencia de los radios. Las dos tocan a C₂ en T.
8. [ ] *6. Error típico:* **[REVISAR]** Error típico: buscar los centros sobre la recta O₁T. La tangencia con C₂ en T obliga a que el centro esté en O₂T, y la de C₁ se resuelve después con el centro radical.

**Rúbrica (2 puntos de solución y método)** · **[REVISAR]** rúbrica derivada de la puntuación por apartados del examen, no oficial

- [ ] Eje radical de C₁ y C₂ — 0,4 p
- [ ] Tangente común en T y centro radical — 0,4 p
- [ ] Puntos de tangencia con C₁ — 0,4 p
- [ ] Centros de las circunferencias solución — 0,4 p
- [ ] Trazado de las dos circunferencias, con las construcciones auxiliares — 0,4 p

### Ejercicio 2 · Cuadrado contenido en un plano dado por sus trazas

Fichero: `src/content/pau/2026-ord-2-cuadrado-en-plano.json` · 2026 ordinaria

- [ ] **Enunciado:** Dada la proyección horizontal del segmento AB, la traza horizontal del plano P y el abatimiento de su traza vertical (P′), se pide: 1. Dibujar la traza vertical del plano P. 2. Obtener las proyecciones del cuadrado ABCD que tiene por lado el segmento AB, está contenido en P y se encuentra en el primer diedro. 3. Representar la verdadera magnitud de la diagonal del cuadrado e indicar su valor en milímetros.
- [ ] **Dato:** Medidos en la lámina del examen (mm, x desde el centro de la hoja, alejamiento desde la LT): a(−23,2; 0) sobre la LT, b(−4,2; 27,7) sobre la traza horizontal de P. Las trazas se cortan en la LT en x = 11,8; α₁ baja hacia la izquierda con 60° y (P′) baja hacia la derecha con 52,9°.

**Solución paso a paso**

1. [ ] *1. Mira el espacio:* El plano α corta al PH en la traza α₁ y al PV en la traza α₂. B está sobre α₁, así que tiene cota cero, y A está sobre la LT en planta, así que tiene alejamiento cero.
2. [ ] *2. La idea clave:* La traza (P′) es la traza vertical abatida: al desabatirla, vuelve al PV pasando por el mismo punto de la LT. Con las dos trazas, el plano queda definido.
3. [ ] *3. El movimiento:* Giramos el PV de vuelta a su sitio: (P′) sube desde la LT hasta quedar vertical, y α₂ aparece sobre la LT. A queda en α₂, a la altura que le da el plano.
4. [ ] *4. El trazado:* Prolonga (P′) al otro lado de la LT: ese tramo, por encima de la LT, es la traza vertical α₂. A″ es el punto de α₂ que está sobre la vertical de a′.
5. [ ] *4. El trazado:* Abate el plano α sobre el PH alrededor de α₁. AB queda en verdadera magnitud, y sobre ella se levanta el cuadrado ABCD hacia el lado del primer diedro.
6. [ ] *4. El trazado:* Desabate C y D: cada uno vuelve por una perpendicular a α₁, y su cota se obtiene con una horizontal del plano. Así salen C′, C″, D′ y D″, con ABCD de lados iguales.
7. [ ] *4. El trazado:* En el cuadrado abatido, la diagonal AC está en verdadera magnitud. Su longitud es 80,9 mm, el lado por √2.
8. [ ] *5. Comprobación:* Comprobación: los cuatro lados de ABCD miden lo mismo en el abatimiento, y la diagonal vale el lado, 57,2 mm, por √2. Los cuatro puntos están en el plano α.
9. [ ] *6. Error típico:* **[REVISAR]** Error típico: medir la diagonal A′C′ en la planta o A″C″ en el alzado. Son proyecciones de AC y salen más cortas que su verdadera magnitud, 80,9 mm.

**Rúbrica (2 puntos de solución y método)** · **[REVISAR]** rúbrica derivada de la puntuación por apartados del examen, no oficial

- [ ] Traza vertical del plano P, prolongando (P′) al otro lado de la LT — 0,4 p
- [ ] Cota de A y proyecciones del segmento AB — 0,3 p
- [ ] Abatimiento del plano y cuadrado en verdadera magnitud — 0,5 p
- [ ] Proyecciones de C y D, con ABCD contenido en P — 0,4 p
- [ ] Verdadera magnitud de la diagonal — 0,3 p
- [ ] Valor de la diagonal en milímetros — 0,1 p

### Ejercicio 3 (opción A) · Perspectiva isométrica de un cubo con un vaciado inclinado

Fichero: `src/content/pau/2026-ord-3a-isometrica-vaciado.json` · 2026 ordinaria

- [ ] **Enunciado:** Dados alzado, planta y perfil de una pieza a escala 2:3, según el método de representación del primer diedro de proyección, se pide: representar su perspectiva isométrica a escala 1:1, según los ejes dados.
- [ ] **Dato:** Medidas leídas del vector de la lámina y pasadas a escala real: la pieza cabe en un cubo de 60 mm de lado y todas las cotas son múltiplos de 30 mm.
- [ ] **Dato:** Perspectiva isométrica con coeficiente de reducción 0,816. Los ejes de la lámina son X hacia abajo-izquierda, Y hacia abajo-derecha y Z hacia arriba.
- [ ] **Dato:** La lámina dibuja la planta con el eje Y hacia arriba y el perfil visto con el alejamiento hacia la derecha; aquí se muestran igual.

**Solución paso a paso**

1. [ ] *1. Mira el espacio:* Las tres vistas son cuadrados de 60 mm con diagonales: es un cubo al que le falta un vaciado inclinado en una esquina. Hay que dibujarlo en isométrica a escala 1:1, con el coeficiente 0,816.
2. [ ] *2. La idea clave:* El cubo envolvente se dibuja primero sobre los tres ejes, con cada arista reducida por el coeficiente. Los vértices del vaciado están en los puntos medios de las aristas y en el centro del cubo.
3. [ ] *3. El movimiento:* Imagina el cubo girando hasta que su diagonal mira al observador: los tres ejes se ven a 120° y la esquina del vaciado queda justo en el centro del dibujo.
4. [ ] *4. El trazado:* Aplica la escala y el coeficiente: las medidas de la lámina, a 2:3, se pasan a 1:1 multiplicando por 3/2, y las reales se multiplican por 0,816. Las aristas de 60 mm miden 49 mm y las de 30 mm, 24,5 mm.
5. [ ] *4. El trazado:* Dibuja el hexágono de contorno del cubo, que son las seis aristas que no tocan las esquinas de la diagonal. Marca después los puntos medios de las aristas del vaciado y el vértice del centro.
6. [ ] *4. El trazado:* Une los vértices: el triángulo de arriba, la V que baja al centro, el triángulo pequeño de abajo y las caras inclinadas. Las aristas ocultas no se dibujan en isométrica.
7. [ ] *5. Comprobación:* Comprobación: el dibujo tiene el contorno hexagonal del cubo, el vértice central a la mitad del cubo y las mismas caras que muestran el alzado, la planta y el perfil.
8. [ ] *6. Error típico:* **[REVISAR]** Error típico: dibujar las medidas reales sin el coeficiente 0,816. El cubo saldría más grande, y la figura sería un dibujo isométrico, no una perspectiva isométrica.

**Rúbrica (2 puntos de solución y método)** · **[REVISAR]** rúbrica derivada de la puntuación por apartados del examen, no oficial

- [ ] Aplicación de la escala 2:3 a 1:1 — 0,25 p
- [ ] Aplicación del coeficiente de reducción 0,816 — 0,25 p
- [ ] Ejes isométricos y cubo envolvente con sus aristas reducidas — 0,5 p
- [ ] Vértices del vaciado: puntos medios y vértice central — 0,6 p
- [ ] Caras y aristas vistas correctas, sin ocultas — 0,4 p

### Ejercicio 4 · Corte longitudinal y acotación de un eje escalonado con placa

Fichero: `src/content/pau/2026-ord-4-eje-corte.json` · 2026 ordinaria

- [ ] **Enunciado:** Dados planta y perfil de una pieza a escala 1:2, según el método de representación del primer diedro de proyección, se pide: 1. Dibujar el corte A-A a escala 1:2. 2. Acotar según normas.
- [ ] **Dato:** Medidos en la lámina del examen (a escala 1:2, aquí a tamaño real): tramos de 60, 60, 40 y 40 mm de largo, con diámetros de 60, 100, 60 y una placa de 80 × 140 mm; taladro pasante de ⌀40.

**Solución paso a paso**

1. [ ] *1. Mira el espacio:* La pieza es un eje escalonado con un taladro pasante y una placa en el extremo derecho. La planta muestra el eje tumbado y el perfil, sus circunferencias.
2. [ ] *2. La idea clave:* El plano A-A pasa por el eje de la pieza y es paralelo al alzado. Se quita la parte de delante y se dibuja lo que queda, mirando hacia atrás.
3. [ ] *3. El movimiento:* Imagina que cortas el eje por la mitad con el plano A-A y retiras la mitad de delante. Lo que ves por el corte es el alzado en corte.
4. [ ] *4. El trazado:* Dibuja el contorno del alzado en corte: los escalones de diámetros 60, 100 y 60, la placa y el taladro, que ahora se ven, sin aristas ocultas.
5. [ ] *4. El trazado:* Raya a 45° solo donde el plano ha cortado el material, es decir, sobre las dos bandas que rodean al taladro, y deja el taladro vacío.
6. [ ] *4. El trazado:* Acota los diámetros a la izquierda, del menor al mayor, y las longitudes de los tramos debajo, con la total más lejos.
7. [ ] *5. Comprobación:* Comprobación: el rayado ocupa todo el material cortado y nada más, el taladro queda vacío y cada medida está acotada una sola vez.
8. [ ] *6. Error típico:* **[REVISAR]** Error típico: rayar también el taladro o dibujar sus aristas con trazo discontinuo. En un corte no se dibujan aristas ocultas y el hueco no lleva rayado.

**Rúbrica (2 puntos de solución y método)** · **[REVISAR]** rúbrica derivada de la puntuación por apartados del examen, no oficial

- [ ] Contorno del corte A-A con los escalones, la placa y el taladro — 0,5 p
- [ ] Rayado a 45° solo en el material cortado, con el taladro vacío — 0,3 p
- [ ] Sin aristas ocultas y con el eje de simetría — 0,2 p
- [ ] Cotas de los diámetros de los escalones y del taladro — 0,5 p
- [ ] Cotas de longitud de cada tramo y total, sin repetir — 0,5 p

### Ejercicio 1 (opción A) · Circunferencias por dos puntos tangentes a otra

Fichero: `src/content/pau/ejemplo-1a-tangencias.json` · Ejemplo de formato

- [ ] **Enunciado:** Dibuja las circunferencias que pasan por los puntos A y B y son tangentes a la circunferencia c. Resuélvelo por el eje y el centro radical y deja visibles las construcciones auxiliares.
- [ ] **Dato:** A(−30, 20) y B(−10, 30), en mm.
- [ ] **Dato:** c: centro C(15, −10) y radio 12 mm.

**Solución paso a paso**

1. [ ] Los centros buscados equidistan de A y B: están en la mediatriz m. Trazamos una circunferencia auxiliar k cualquiera que pase por A y B y corte a c.
2. [ ] El eje radical de k y c corta a la recta AB en el centro radical CR. Desde él, las tangentes a c tienen la misma longitud que las potencias.
3. [ ] Las tangentes desde CR a c dan los puntos de tangencia T₁ y T₂. Cada centro está en la recta que une C con un punto de tangencia y en la mediatriz.
4. [ ] Las dos soluciones son las circunferencias de centros O₁ y O₂ que pasan por A. Las dos tocan a c en T₁ y T₂.

**Rúbrica (2 puntos de solución y método)**

- [ ] Mediatriz de AB como lugar de los centros — 0,4 p
- [ ] Circunferencia auxiliar y eje radical — 0,4 p
- [ ] Centro radical sobre la recta AB — 0,4 p
- [ ] Tangentes desde el centro radical y puntos de tangencia — 0,4 p
- [ ] Centros y las dos circunferencias solución — 0,4 p

### Ejercicio 2 · Sección de una pirámide hexagonal y su verdadera magnitud

Fichero: `src/content/pau/ejemplo-2-seccion-piramide.json` · Ejemplo de formato

- [ ] **Enunciado:** Una pirámide hexagonal regular apoyada en el PH se corta por el plano proyectante vertical α. Dibuja las proyecciones de la sección, su verdadera magnitud y las partes vistas y ocultas.
- [ ] **Dato:** Base inscrita en una circunferencia de 22 mm de radio, centro (0, 32); altura 52 mm.
- [ ] **Dato:** La traza α₂ pasa por (−35, 6) y (35, 36).

**Solución paso a paso**

1. [ ] El plano α es perpendicular al PV: en el alzado se ve de canto. Los puntos de la sección están donde α₂ corta a las aristas laterales.
2. [ ] Cada punto se lleva a la planta con su línea de referencia, sobre su misma arista. Los lados de la sección en caras ocultas van discontinuos.
3. [ ] Para la verdadera magnitud se abate α sobre el PV alrededor de α₂. Cada punto queda en la perpendicular a α₂, a una distancia igual a su alejamiento.

**Rúbrica (2 puntos de solución y método)**

- [ ] Proyecciones correctas de la pirámide, con vistas y ocultas — 0,4 p
- [ ] Puntos de la sección en el alzado sobre α₂ — 0,4 p
- [ ] Proyección horizontal de la sección — 0,5 p
- [ ] Verdadera magnitud por abatimiento — 0,7 p

### Ejercicio 3 (opción A) · Tetraedro apoyado en una cara en perspectiva isométrica

Fichero: `src/content/pau/ejemplo-3a-isometrica.json` · Ejemplo de formato

- [ ] **Enunciado:** Dibuja la perspectiva isométrica del tetraedro regular dado por sus vistas, apoyado en una cara sobre el plano XY. Aplica el coeficiente de reducción. No hace falta dibujar las aristas ocultas.
- [ ] **Dato:** Tetraedro regular de 40 mm de arista, con la base en el PH.
- [ ] **Dato:** Coeficiente isométrico 0,816.

**Solución paso a paso**

1. [ ] Primero, la escala gráfica de reducción: cada medida paralela a los ejes se multiplica por 0,816.
2. [ ] La planta se lleva al plano XY y el alzado al XZ. Desde ellos se levanta la caja que envuelve al tetraedro.
3. [ ] El vértice de arriba está sobre el centro de la base, a la altura de la caja. Uniendo sus vértices sale el tetraedro, sin aristas ocultas.

**Rúbrica (2 puntos de solución y método)**

- [ ] Ejes isométricos y coeficiente de reducción — 0,5 p
- [ ] Base en el plano XY con sus medidas reducidas — 0,6 p
- [ ] Vértice superior a su altura y sobre el centro de la base — 0,5 p
- [ ] Aristas vistas correctas — 0,4 p

### Ejercicio 4 · Vistas de un soporte en U desde su isométrica

Fichero: `src/content/pau/ejemplo-4-vistas.json` · Ejemplo de formato

- [ ] **Enunciado:** A partir de la perspectiva isométrica del soporte, dibuja su alzado, su planta y su perfil izquierdo en el sistema europeo, con las aristas ocultas y los ejes. Acota la pieza según la norma.
- [ ] **Dato:** Medidas generales: 50 × 30 × 30 mm.
- [ ] **Dato:** Ranura de 24 mm de ancho y 20 mm de profundidad; taladro pasante de ⌀8.

**Solución paso a paso**

1. [ ] La pieza dentro de la caja de proyección: cada vista se proyecta en la cara opuesta al observador. Al desplegarla, la planta queda debajo del alzado y el perfil a su derecha.
2. [ ] Las aristas que no se ven van con discontinua fina: el taladro en el alzado y la planta. Los ejes del taladro, con trazo y punto.
3. [ ] Acotación: cada medida una sola vez y en la vista que mejor muestra la forma. El taladro se acota con su diámetro.

**Rúbrica (2 puntos de solución y método)**

- [ ] Disposición de las vistas en el sistema europeo — 0,4 p
- [ ] Alzado correcto — 0,4 p
- [ ] Planta y perfil izquierdo correctos — 0,5 p
- [ ] Aristas ocultas y ejes — 0,3 p
- [ ] Acotación según la norma, sin repetir cotas — 0,4 p

## 3. Piezas de normalización

- [ ] **Escalón** (`src/content/piezas/01-escalon.json`)
- [ ] **Escuadra taladrada** (`src/content/piezas/02-escuadra-taladrada.json`)
- [ ] **Bloque ranurado** (`src/content/piezas/03-bloque-ranurado.json`)
- [ ] **Cuña con rebaje** (`src/content/piezas/04-cuna.json`)
- [ ] **Soporte en U** (`src/content/piezas/05-soporte-u.json`)
- [ ] **Brida con buje** (`src/content/piezas/06-brida.json`)
- [ ] **Horquilla** (`src/content/piezas/07-horquilla.json`)
- [ ] **Pieza en T con chaflanes** (`src/content/piezas/08-pieza-chaflanes.json`)
- [ ] **Soporte con nervio inclinado** (`src/content/piezas/09-soporte-inclinado.json`)
- [ ] **Bloque escalonado con ranura** (`src/content/piezas/10-bloque-escalonado.json`)
- [ ] **Taco con arista biselada** (`src/content/piezas/11-taco-biselado.json`)
- [ ] **Placa con dos taladros** (`src/content/piezas/12-placa-taladrada.json`)
- [ ] **Placa en L** (`src/content/piezas/13-placa-en-ele.json`)
- [ ] **Taco con agujero ciego** (`src/content/piezas/14-taco-agujero-ciego.json`)
- [ ] **Bloque con esquina cajeada** (`src/content/piezas/15-esquina-cajeada.json`)
- [ ] **Soporte con cabeza redondeada** (`src/content/piezas/16-soporte-redondeado.json`)
- [ ] **Escalera con taladro** (`src/content/piezas/17-escalera-taladrada.json`)
- [ ] **Canal en V con ranura y taladro** (`src/content/piezas/18-canal-en-v.json`)
- [ ] **Eje escalonado con placa y taladro pasante** (`src/content/piezas/19-eje-escalonado-con-placa.json`)
- [ ] **Soporte con orejeta redonda y taladro vertical** (`src/content/piezas/20-soporte-con-orejeta.json`)
- [ ] **Pared con pendiente, bloque con entrante y cuña** (`src/content/piezas/21-pared-escalon-y-cuna.json`)
- [ ] **Cubo con vaciado inclinado en una esquina** (`src/content/piezas/22-cubo-con-vaciado.json`)

## 4. Avisos, pistas y textos de los motores

Frases que aparecen en pantalla según lo que hace el alumno. Lo que va entre ‹ › se rellena
al mostrarse (un nombre de punto, una medida…).

### Avisos de la escena diédrica (casos especiales, cuadrantes, pertenencia)

Fichero: `src/content/notices.ts`

- [ ] ‹o.id›: sus dos puntos coinciden; no hay recta.
- [ ] ‹o.id› es paralela a la LT: no tiene trazas y sus dos proyecciones son paralelas a la LT.
- [ ] ‹o.id› es de perfil: sus proyecciones no bastan para definirla. Hace falta la tercera proyección.
- [ ] ‹o.id› corta a la LT: sus trazas H y V coinciden en un punto de la LT.
- [ ] ‹o.id› es horizontal (paralela al PH): no tiene traza H.
- [ ] ‹o.id› es frontal (paralela al PV): no tiene traza V.
- [ ] ‹o.id›: sus tres puntos están alineados; no hay plano.
- [ ] ‹o.id› contiene la LT: sus trazas coinciden con ella y no bastan para definirlo. Hace falta la tercera proyección.
- [ ] ‹o.id› es paralelo a la LT: sus trazas α₁ y α₂ son paralelas a la LT.
- [ ] ‹o.id› está en el plano ‹id›.
- [ ] ‹o.id› no está en el plano ‹id›: está a ‹Math.round(distance)› mm.
- [ ] La recta ‹o.id› está en el plano ‹id›.
- [ ] La recta ‹o.id› no está en el plano ‹id›.

### Modo «Explicar» del abatimiento

Fichero: `src/content/foldExplanations.ts`

- [ ] El PH y el PV son perpendiculares. P′ está en el PH y P″ en el PV.
- [ ] El PH gira alrededor de la LT como una puerta. P′ viaja con él; P″ no se mueve.
- [ ] El PH ya está sobre el PV: esto es la lámina. P′ y P″ quedan en la misma línea de referencia.

### Mensajes de acierto y pistas de los ejercicios de condición

Fichero: `src/player/checkCondition.ts`

- [ ] mover los puntos hasta que se cumpla una condición
- [ ] ¡Correcto! La recta es horizontal: su proyección vertical es paralela a la LT.
- [ ] Aún no es paralela al PH: sus dos puntos tienen que tener la misma cota.
- [ ] ¡Correcto! La recta es frontal: su proyección horizontal es paralela a la LT.
- [ ] Aún no es paralela al PV: sus dos puntos tienen que tener el mismo alejamiento.
- [ ] ¡Correcto! La recta es paralela a la LT: no tiene trazas.
- [ ] Para ser paralela a la LT, sus dos puntos deben tener la misma cota y el mismo alejamiento.
- [ ] ¡Correcto! Es una recta de perfil: sus dos proyecciones son perpendiculares a la LT.
- [ ] Una recta de perfil tiene sus dos puntos en la misma x, sobre una misma línea de referencia.
- [ ] ¡Correcto! La recta corta a la LT: sus trazas H y V coinciden en un punto de la LT.
- [ ] La recta todavía no corta a la LT: sus trazas H y V deben coincidir sobre la LT.
- [ ] ¡Correcto! El punto está en el plano.
- [ ] El punto aún está fuera del plano. Un punto está en un plano si está en una recta del plano.
- [ ] ¡Correcto! El plano contiene a la LT: sus dos trazas coinciden con ella.
- [ ] El plano todavía no pasa por la LT: sus trazas α₁ y α₂ deben coincidir con la LT.
- [ ] ¡Correcto! El plano es paralelo a la LT: sus trazas α₁ y α₂ son paralelas a la LT.
- [ ] Las trazas del plano todavía no son paralelas a la LT.

### Entrenador espacial: enunciados y mensajes

Fichero: `src/ui/trainer.ts`

- [ ] La figura A gira como se ve. Aplica el mismo giro a la figura B: ¿cuál es el resultado?
- [ ] El plano corta al sólido. ¿Qué forma tiene la sección en verdadera magnitud?
- [ ] ¿Cuál de estos desarrollos forma un cubo al plegarlo?
- [ ] ¿Cuáles son el alzado, la planta y el perfil izquierdo de esta figura?
- [ ] No es esa. Mira la solución en el modelo 3D.
- [ ] Test terminado: ‹mode.correct› de ‹DIAGNOSTIC_LENGTH›.
- [ ] Escribe primero el código que te ha dado tu profesor.

### Motor de métodos (abatimiento, giro y cambio de plano)

Fichero: `src/engines/metodos/runtime.ts`

- [ ] Cambio de plano
- [ ] Elige el método
- [ ] Repetir el movimiento

### Motor de sólidos

Fichero: `src/engines/solidos/runtime.ts`

- [ ] Retirar la parte cortada
- [ ] Abatir la sección

### Motor de geometría plana

Fichero: `src/engines/plana/runtime.ts`

- [ ] Repetir el trazado
- [ ] Ocultar auxiliares
- [ ] Mostrar auxiliares
- [ ] Dibujar el lugar

### Motor de geometría plana: controles

Fichero: `src/engines/plana/controller.ts`

- [ ] Aún no se puede comprobar: falta algún dato.
- [ ] ¡Correcto! El punto está en su sitio.
- [ ] Todavía no. Piensa qué condición tiene que cumplir el punto.

### Motor de normalización

Fichero: `src/engines/normalizacion/runtime.ts`

- [ ] Desplegar la caja
- [ ] Retirar la parte cortada
- [ ] Opciones del ejercicio
- [ ] Preparando la pieza…

### Motor de normalización: controles

Fichero: `src/engines/normalizacion/controller.ts`

- [ ] No existe la pieza «‹data.pieza›» en la biblioteca.
- [ ] Falta la pieza ‹id›

### Motor de perspectiva cónica

Fichero: `src/engines/conica/runtime.ts`

- [ ] Altura del observador
- [ ] Distancia al cuadro
- [ ] Giro del sólido

### Laboratorio de cónicas

Fichero: `src/engines/conicas/runtime.ts`

- [ ] Cónica degenerada
- [ ] ‹TYPE_TITLE[k.type]› en verdadera magnitud
- [ ] Ecuación canónica
- [ ] Cono y plano secante
- [ ] Ángulo con el eje
- [ ] Plano secante
- [ ] Qué hace el ratón en el 3D
- [ ] Inclinar el plano
- [ ] Subir o bajar el plano
- [ ] Inclinación del plano (θ)
- [ ] Altura del plano (h)
- [ ] Semiángulo del cono (α)

### Pantalla de inicio

Fichero: `src/ui/home.ts`

- [ ] Dibujo Técnico I
- [ ] Dibujo Técnico II
- [ ] Tema ‹l.topic› sin catálogo
- [ ] PAU ej. ‹topic.pauExercise›
