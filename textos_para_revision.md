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
   - [ ] *Solución, paso 6 · 5. Comprobación:* Mide con la cuadrícula: la sección tiene 4 lados, de 10,4 mm el menor y de 23,6 mm el mayor. La respuesta pedida es 23,6 mm.
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

1. [ ] *escribir una medida, dificultad 2* (respuesta: 35.2 mm): Mide en la lámina el eje mayor de la elipse de la sección en verdadera magnitud. Usa la cuadrícula de 10 mm.

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

1. [ ] *construcción en la lámina, dificultad 1*: Arrastra Z hasta el centro radical de las tres circunferencias.
2. [ ] *construcción en la lámina, dificultad 2*: Las circunferencias buscadas pasan por A y B y son tangentes a r. Arrastra Z hasta uno de sus puntos de tangencia con r.
3. [ ] *construcción en la lámina, dificultad 3*: Como en la PAU, con otros datos: arrastra Z hasta el centro de una de las circunferencias que pasan por A y B y son tangentes a r.

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

1. [ ] *construcción en la lámina, dificultad 1*: La homología tiene centro O, eje e y transforma A en A′. Arrastra Z hasta B′, el homólogo de B.
2. [ ] *construcción en la lámina, dificultad 2*: Ahora es una afinidad de eje e que transforma A en A′. Arrastra Z hasta B′, el afín de B.
3. [ ] *construcción en la lámina, dificultad 3*: Como en la PAU: con la homología de centro O, eje e y par A, A′, halla el homólogo de D y arrastra Z hasta él.

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
