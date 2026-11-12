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
2. [ ] *colocar el punto, dificultad 1*: Coloca P a partir de la lámina. Fíjate bien en qué proyección está sobre la LT y cuál debajo.
3. [ ] *colocar el punto, dificultad 1*: Ahora P está en otro cuadrante. Colócalo en el espacio a partir de su lámina.

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

1. [ ] *cumplir una condición, dificultad 1*: Mueve A o B hasta que r sea paralela al PH. Fíjate en cómo queda r″.
2. [ ] *cumplir una condición, dificultad 1*: Mueve A o B hasta que r sea paralela a la LT.
3. [ ] *cumplir una condición, dificultad 1*: Mueve A o B hasta que r corte a la LT. Sus trazas H y V tienen que coincidir.

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

1. [ ] *cumplir una condición, dificultad 1*: Q está fuera del plano α. Muévelo hasta que esté en α: el aviso te dice a qué distancia está.
2. [ ] *cumplir una condición, dificultad 1*: Mueve A, B o C hasta que el plano α sea paralelo a la LT.
3. [ ] *cumplir una condición, dificultad 1*: Mueve A, B o C hasta que el plano α contenga a la LT.

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

1. [ ] *construcción en la lámina, dificultad 1*: Arrastra X hasta el punto de la recta r que está a la misma distancia de A que de B.
2. [ ] *construcción en la lámina, dificultad 2*: Coloca X en el centro de la circunferencia que pasa por los tres vértices del triángulo ABC.
3. [ ] *construcción en la lámina, dificultad 3*: Como en la PAU: busca un punto de la recta r desde el que el segmento AB se vea con un ángulo de 45° y arrastra X hasta él.

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
2. [ ] *construcción en la lámina, dificultad 2*: Marca solo las vistas imprescindibles para definir esta brida: ni una más ni una menos.
3. [ ] *construcción en la lámina, dificultad 3*: Como en la PAU: dibuja el alzado de la brida en corte total por su plano de simetría frontal, A-A. ¿Cuál de estos dibujos es el correcto?

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

1. [ ] *escribir una medida, dificultad 1* (respuesta: 24.5 mm): En perspectiva isométrica, ¿cuánto mide una arista de 30 mm paralela a uno de los ejes?
2. [ ] *escribir una medida, dificultad 2* (respuesta: 15 mm): En caballera con coeficiente 0,5, ¿cuánto mide en el dibujo una arista de 30 mm paralela al eje Y?
3. [ ] *escribir una medida, dificultad 3* (respuesta: 34.6 mm): Como en la PAU: octaedro de 30 mm de arista con su diagonal paralela a OZ. ¿Cuánto mide esa diagonal en la perspectiva isométrica?

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

1. [ ] *escribir una medida, dificultad 1* (respuesta: 45 mm): El ojo del observador está a 45 mm del geometral. ¿A qué altura sobre la LT se dibuja la línea del horizonte?
2. [ ] *escribir una medida, dificultad 2* (respuesta: 70 mm): Perspectiva frontal con el observador a 70 mm del cuadro. ¿A qué distancia del punto principal está cada punto de distancia?
3. [ ] *escribir una medida, dificultad 3* (respuesta: 40.4 mm): Como en la PAU: cubo girado 30° respecto al cuadro y observador a 70 mm. ¿A qué distancia de P está el punto de fuga más cercano?

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

1. [ ] *construcción en la lámina, dificultad 1*: Te dan los ejes de una elipse. Arrastra Z hasta uno de sus focos.
2. [ ] *construcción en la lámina, dificultad 2*: Arrastra Z hasta el vértice de la parábola de foco F y directriz d.
3. [ ] *construcción en la lámina, dificultad 3*: Como en la PAU: traza la tangente a la hipérbola en Q y arrastra Z hasta el punto donde corta al eje real.

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

- [ ] Perfil izquierdo
- [ ] Perspectiva isométrica
- [ ] No existe la pieza «‹data.pieza›» en la biblioteca.
- [ ] Falta la pieza ‹id›
- [ ] Elige uno de los dibujos.
- [ ] ¡Correcto! Las caras cortadas van rayadas a 45° y no hay aristas ocultas.
- [ ] No es ese. Fíjate en dónde pasa el plano de corte y qué parte se quita.

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
