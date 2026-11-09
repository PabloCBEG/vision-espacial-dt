# Roadmap de contenidos: ejercicios, niveles y desarrollos

Plan para ampliar *Visión espacial DT* con muchos más ejercicios, niveles de dificultad
escalonados y explicaciones paso a paso. Está pensado para pasárselo a Claude Code por fases:
cada fase termina con un **prompt listo para copiar** (sección 6).

---

## 0. Punto de partida (9 de noviembre de 2026)

| Contenido | Hoy | Problema |
|---|---|---|
| Lecciones | 15 (132 pasos) en 13 de los 30 temas | Buena teoría, pero solo ~3 ejercicios por lección |
| Ejercicios de lección | 43: 19 de medida, 15 de construcción en lámina, 6 de condición y 3 de colocar un punto | Pocos y casi todos con los mismos datos que la teoría |
| Banco PAU | 4 ejemplos de formato | Faltan exámenes reales (los PDF ya están en `examenes/`) |
| Piezas de normalización | 10 | Pocas para practicar vistas y cortes a diario |
| Entrenador espacial | Ítems generados al azar (rotación, sección, desarrollo y vistas) | Es el único sitio con práctica ilimitada |
| Pistas | Una por ejercicio, y no en todos los tipos | Sin ayuda escalonada |

**Conclusión.** La base (motores, doble vista y pasos) es sólida. Lo que falta es *volumen de
práctica con dificultad graduada* y *soluciones que enseñen a ver*, no solo el resultado.

---

## 1. Bloques temáticos

Ocho bloques. Entre paréntesis, los códigos del catálogo (`src/content/catalog.ts`) y el motor.

1. **Visión espacial pura** (E-00, entrenador)
   - Rotación mental, secciones de sólidos, desarrollos y plegado, conteo de caras, aristas y vértices.
2. **Geometría plana y lugares geométricos** (I-01 a I-07, plana)
   - Trazados fundamentales, triángulos, polígonos, proporcionalidad y escalas, transformaciones, tangencias básicas, curvas técnicas.
3. **Geometría proyectiva plana** (II-01 a II-04, plana con puente 3D)
   - Potencia y tangencias, inversión, homología y afinidad, cónicas.
4. **Sistema diédrico: fundamentos** (I-08 a I-11, diédrico y métodos)
   - Punto, recta y plano; intersecciones; paralelismo y perpendicularidad; distancias.
5. **Sistema diédrico: métodos y sólidos** (II-05 a II-09, métodos y sólidos)
   - Abatimiento, giro y cambio de plano; ángulos; poliedros; prismas y pirámides; cono y cilindro.
6. **Vistas ortogonales, cortes y secciones** (I-15, II-12, normalización)
   - Vistas necesarias y suficientes, aristas ocultas, cortes (total, medio, quebrado), secciones abatidas y acotación.
7. **Perspectivas** (I-13, I-14, II-10, II-11, axonometría y cónica)
   - Isométrica, caballera y cónica frontal y oblicua, de sólidos y de piezas desde sus vistas.
8. **Preparación PAU** (banco PAU)
   - Ejercicios reales de Andalucía por bloques y simulacros cronometrados.

*Fuera de alcance:* CAD (I-16, II-13). *Opcionales, fuera de la PAU:* planos acotados (I-12) e inversión (II-02).

---

## 2. Tipología de ejercicios

Leyenda del coste de cada formato:
- 🟢 **Solo datos:** el formato ya existe, basta un fichero JSON.
- 🟡 **Código pequeño:** se amplía un tipo o motor que ya existe.
- 🔴 **Código nuevo:** hace falta un tipo de ejercicio o un motor nuevo.

### A. Leer el espacio (de 2D a 3D)

| # | Formato | Qué entrena | Coste |
|---|---|---|---|
| A1 | **Colocar el punto en el espacio** a partir de su lámina | Pasar de las proyecciones a la posición | 🟢 `placePoint` |
| A2 | **Mover hasta cumplir una condición** (recta horizontal, punto en un plano…) | Relacionar la lámina con la posición | 🟢 `condition`, con nuevas condiciones 🟡 |
| A3 | **Correspondencia 2D-3D**: rotular en la lámina el vértice que se señala en el 3D, o al revés | Saber qué es cada punto proyectado | 🔴 tipo `match` |
| A4 | **¿Cuál es la pieza?** Dadas las vistas, elegir la perspectiva correcta entre 4 | Reconstruir mentalmente | 🟡 (el entrenador ya lo hace al revés) |

### B. Escribir el espacio (de 3D a 2D)

| # | Formato | Qué entrena | Coste |
|---|---|---|---|
| B1 | **Elegir la vista correcta** entre 4 opciones | Proyectar | 🟢 (normalización) |
| B2 | **Deducir la tercera vista**: dadas dos, elegir o completar la tercera | El ejercicio clásico de visión espacial | 🟡 elegir · 🔴 completar trazos |
| B3 | **Aristas ocultas**: tocar en la lámina las aristas que deberían ir discontinuas | Visibilidad | 🔴 tipo `selectEdges` |
| B4 | **Completar la vista**: faltan 1 a 3 líneas; tocar dónde van | Atención a intersecciones y contornos | 🔴 (reutiliza `selectEdges`) |
| B5 | **Encuentra el error**: una lámina con un fallo (línea mal, cota mal, sombra mal) | Revisión crítica, como el corrector de la PAU | 🔴 tipo `findError` |

### C. Construir y medir

| # | Formato | Qué entrena | Coste |
|---|---|---|---|
| C1 | **Medir una verdadera magnitud** (longitud, ángulo, distancia, lado de una sección) | Aplicar un método | 🟢 `value` |
| C2 | **Colocar el resultado en la lámina** (centro, punto de tangencia, homólogo…) | Construcción con regla y compás | 🟢 `engine` (plana) |
| C3 | **Elegir el método** (abatimiento, giro o cambio) y justificarlo | Estrategia | 🟡 selector con pregunta |
| C4 | **Variantes generadas**: el mismo ejercicio con datos al azar (semilla) y respuesta calculada por el motor | Práctica ilimitada | 🟡 generador por tipo |

### D. Razonar el proceso

| # | Formato | Qué entrena | Coste |
|---|---|---|---|
| D1 | **¿Cuál es el siguiente paso?** La solución se detiene y el alumno elige entre 3 operaciones | Saber *por qué* se hace cada trazado | 🔴 tipo `nextStep` |
| D2 | **Ordenar los pasos** de una construcción | Secuencia del método | 🔴 tipo `order` |
| D3 | **Ejercicio PAU completo** con rúbrica (2 + 0,25 + 0,25) y cronómetro | Examen real | 🟢 banco PAU |

### Dificultad escalonada (para todos los formatos)

| Nivel | Datos | Ayuda | Ejemplo en diédrico |
|---|---|---|---|
| 1 · Básico | Posición particular, números redondos | Con 3D y pista visible | VM de un segmento frontal |
| 2 · Intermedio | Posición general | Con pista a petición | VM de un segmento cualquiera por giro |
| 3 · Tipo PAU | Datos como en el examen, varios conceptos encadenados | Solo 2D, sin pista hasta fallar | Sección de pirámide y su VM |

La retirada del 3D («con 3D», «con pista», «solo 2D») ya existe: cada ejercicio debe poder
hacerse en los tres modos.

---

## 3. Fases de ejecución

### Cronograma

| Fase | Plazo | Nivel | Bloques | Código | Contenido nuevo |
|---|---|---|---|---|---|
| **1 · Llenar lo que ya funciona** | Corto: nov.–dic. 2026 (4–5 semanas) | Básico e intermedio | 2, 4, 5, 6 y 7: temas con motor listo | 🟢 y 🟡: pistas escalonadas, desarrollo de soluciones y variantes generadas | 6 lecciones nuevas · ~120 ejercicios · ~45 desarrollos · 8 piezas · 12 ejercicios PAU reales |
| **2 · Nuevos formatos de visión espacial** | Medio: ene.–mar. 2027 (10 semanas) | Intermedio y tipo PAU | 1, 3, 4 y 6, más los huecos de motor | 🔴 A3, B2, B3, B4, B5, D1 y D2; motores: polígonos, intersección de planos, tangentes a cónicas, Dandelin | 5 lecciones · ~150 ejercicios · ~60 desarrollos · 15 piezas · 24 ejercicios PAU |
| **3 · Dominio y examen** | Largo: abr.–jun. 2027 (12 semanas) | Avanzado y PAU | 8, más los opcionales; inicio de la ESO | Simulacros, repaso adaptativo y planos acotados | 4 lecciones · ~120 ejercicios · ~40 desarrollos · 8 exámenes completos · adaptación ESO |

**Total al final:** unas 30 lecciones (todos los temas con motor), más de 430 ejercicios fijos
más los generados, unos 145 desarrollos paso a paso, más de 33 piezas y 8 exámenes PAU
completos de Andalucía.

### Fase 1 · Corto plazo: llenar lo que ya funciona

Objetivo: que **cada lección tenga al menos 9 ejercicios (3 por nivel)** y que cada ejercicio
tenga solución desarrollada. Casi todo es contenido, con poco código.

1. **Infraestructura mínima** 🟡
   - Pistas escalonadas: `pistas: [nivel1, nivel2, nivel3]` en todos los tipos de ejercicio. La tercera pista es casi la solución.
   - Campo `solucion` en cada ejercicio, con pasos como los de la teoría. Se muestra con «Ver la solución paso a paso» tras fallar dos veces o rendirse.
   - Generador de variantes (C4) para `value` en métodos y sólidos: datos al azar dentro de unos rangos, respuesta calculada por el motor y comprobada en los tests.
2. **Más ejercicios en las 15 lecciones existentes**, de 3 a 9 cada una: +90.
3. **Lecciones nuevas con motor listo**: I-06 tangencias básicas, I-07 curvas técnicas, I-11 distancias, I-13 isométrica y caballera, I-15 normalización básica y II-11 cónica desde vistas.
4. **Normalización**: 8 piezas nuevas (de la 11 a la 18), graduadas por dificultad.
5. **Banco PAU**: transcribir 12 ejercicios reales de Andalucía (2017–2024, de `examenes/andalucia/`), 3 por cada ejercicio del examen.
6. **Revisión del profesor** (puerta de calidad): todo lo nuevo entra en `textos_para_revision.md`.

### Fase 2 · Medio plazo: nuevos formatos de visión espacial

Objetivo: entrenar **leer y escribir el espacio** con los formatos que hoy no existen, y cerrar
los huecos de los motores.

1. **Tipos de ejercicio nuevos** 🔴, en este orden porque es lo que más aporta a la visión espacial:
   - B3 aristas ocultas y B4 completar la vista (comparten la selección de aristas en la lámina);
   - B2 tercera vista (elegir y, después, completar);
   - A3 correspondencia 2D-3D;
   - D1 siguiente paso y D2 ordenar pasos (sobre las soluciones de la fase 1);
   - B5 encuentra el error.
2. **Huecos de motor:**
   - polígonos regulares y triángulos con datos (I-02, I-03);
   - intersección de planos y de recta con plano en el diédrico (I-09, I-10);
   - tangentes a cónicas desde un punto exterior y paralelas a una dirección;
   - esferas de Dandelin en el laboratorio (II-04).
3. **Lecciones**: I-02, I-03, I-09, I-10 e I-05 (transformaciones).
4. **Entrenador**: ítems nuevos (contar caras, aristas y vértices; vista que falta; pieza desde vistas, A4) y el ítem inverso de desarrollos.
5. **Normalización**: 15 piezas más, con cortes medio y quebrado, y ejercicios de acotación.
6. **Banco PAU**: 24 ejercicios reales más (2017–2024 completos, y 2025–2026 cuando estén descargados a mano).

### Fase 3 · Largo plazo: dominio y examen

1. **Simulacros completos** de 90 minutos (8 exámenes reales de Andalucía) con rúbrica y nota guardada solo en el navegador.
2. **Repaso adaptativo local**: el alumno ve primero los tipos y temas en los que más falla. Los datos se guardan en el navegador, sin analítica externa.
3. **Ejercicios encadenados tipo PAU**: un mismo ejercicio con 2 o 3 apartados (sección, VM y desarrollo), corregidos por apartado.
4. **Opcionales**: I-12 planos acotados (motor nuevo), II-02 inversión e I-04 escalas.
5. **Salto a la ESO**: con el currículo revisado con el profesor, reutilizar el entrenador y las fases 1 y 2 con narraciones más sencillas y más 3D.

### Volumen por fase y bloque (ejercicios nuevos)

| Bloque | Fase 1 | Fase 2 | Fase 3 |
|---|---|---|---|
| 1 Visión espacial pura | (generados) | 30 + ítems nuevos | repaso adaptativo |
| 2 Plana y lugares | 20 | 30 | 10 |
| 3 Proyectiva plana | 20 | 20 | 15 |
| 4 Diédrico: fundamentos | 25 | 25 | 10 |
| 5 Diédrico: métodos y sólidos | 25 | 15 | 25 |
| 6 Vistas, cortes y secciones | 15 | 40 | 15 |
| 7 Perspectivas | 15 | 15 | 15 |
| 8 PAU | 12 reales | 24 reales | 8 exámenes (32) |
| **Total** | **~130** | **~200** | **~120** |

---

## 4. Estructura estándar de las soluciones (desarrollos)

Cada solución sigue **siempre las mismas seis partes**. Respeta los principios de `CLAUDE.md`:
primero el movimiento y después el trazado, 2 frases por paso como máximo, doble vista
sincronizada y abatimiento como puente.

| Parte | Pasos | Cámara y lámina | Para qué |
|---|---|---|---|
| **1. Mira el espacio** | 1–2 | Perspectiva 3D; lámina vacía o con los datos | Qué hay y dónde está, antes de trazar nada |
| **2. La idea clave** | 1 | 3D, con el elemento clave destacado | La propiedad espacial que resuelve el problema, en una frase |
| **3. El movimiento** | 1–3 | 3D animado (giro, abatimiento o cambio de plano) | Ver cómo se mueve físicamente la figura |
| **4. El trazado** | 2–6 | Lámina (abatimiento a 90°), con el 3D sincronizado | Una operación por paso; datos, proceso, auxiliares y resultado con su grosor |
| **5. Comprobación** | 1 | Las dos vistas | Cómo saber si está bien: línea de referencia, medida, simetría… |
| **6. Error típico** | 1 | Lámina con el error dibujado en otro color, y después corregido | El fallo que más se ve en clase y por qué es un fallo |

Reglas de redacción:
- **Verbos de acción visual**: «gira», «abate», «baja por la línea de referencia», «corta». Nada de «se obtiene» sin decir cómo.
- **Cada paso dice qué se ve y por qué se hace**, no solo qué se dibuja.
- **Notación de `CLAUDE.md`**: P′, P″, (P), P₁, α₁, α₂, «c = 30 mm».
- **Pistas escalonadas**: nivel 1 es la idea clave (parte 2), nivel 2 el método (parte 3) y nivel 3 el primer trazado (parte 4).
- **Al final, una variante**: «Prueba ahora con…», que enlaza con un ejercicio generado (C4).

### Ejemplo: verdadera magnitud de un segmento AB por giro (nivel 2)

1. *Mira el espacio.* «A y B están a distinta cota y distinto alejamiento: AB no es paralelo a ningún plano de proyección. Por eso ninguna proyección mide lo que mide AB.»
2. *La idea clave.* «Un segmento se ve en verdadera magnitud cuando es paralelo a un plano de proyección. Hay que llevarlo a esa posición.»
3. *El movimiento.* «Giramos AB alrededor de un eje vertical que pasa por A. B describe una circunferencia horizontal y su cota no cambia.»
4. *El trazado.*
   - «En la planta, B′ gira con centro en A′ hasta que A′B₁′ es paralela a la LT.»
   - «B₁″ sube por su línea de referencia hasta la cota de B″. A″B₁″ es la verdadera magnitud.»
5. *Comprobación.* «B₁″ está a la misma altura que B″: el giro alrededor de un eje vertical no cambia las cotas.»
6. *Error típico.* «Girar B″ en el alzado en vez de B′ en la planta. El giro se hace en la proyección perpendicular al eje.»

---

## 5. Criterios de calidad para todo el contenido

- **Cada ejercicio de medida** tiene su respuesta comprobada por el motor en los tests, como ya se hace.
- **Cada lección nueva**: `npm run test`, `npm run build`, capturas con `node scripts/capturas-leccion.mjs <id>` en los tres tamaños, revisadas, y axe sin incidencias.
- **Todo texto nuevo** entra en `textos_para_revision.md` y no se da por validado hasta que lo revise el profesor.
- **Dudas didácticas o de notación**: se pregunta al profesor antes de inventar (regla de `CLAUDE.md`).
- **Commits pequeños en castellano**: uno por lección o por tipo de ejercicio.
- **Sin datos del alumnado** fuera de su navegador.

---

## 6. Prompts para Claude Code

Cópialos de uno en uno; cada uno es una tanda de trabajo con su criterio de terminado.

### Prompt 1 · Fase 1, infraestructura

> Lee `plan_contenidos.md` (secciones 2 y 4). Añade a los cuatro tipos de ejercicio
> (`placePoint`, `condition`, `value` y `engine`):
> - `pistas` con tres niveles;
> - un campo `solucion` con pasos con el mismo formato que los de la teoría, que se muestra con «Ver la solución paso a paso» tras dos fallos o al rendirse.
>
> Mantén la compatibilidad con la `pista` actual. Añade también un generador de variantes con
> semilla para los ejercicios `value` de métodos y sólidos, con la respuesta calculada por el motor.
> Tests de esquema y de generador, capturas en los tres tamaños, commit.

### Prompt 2 · Fase 1, ejercicios de las lecciones existentes

> Siguiendo `plan_contenidos.md`, lleva cada una de las 15 lecciones a 9 ejercicios, 3 por
> nivel de dificultad, con datos distintos de los de la teoría. Cada ejercicio lleva:
> - tres pistas;
> - una solución con las seis partes de la sección 4.
>
> Empieza por II-05, II-08, II-06, II-07, II-09 y II-12 (ejercicios 2 y 4 de la PAU). Respuestas
> comprobadas en los tests, capturas revisadas, `textos_para_revision.md` regenerado y un commit
> por lección.

### Prompt 3 · Fase 1, lecciones con motor listo

> Crea las lecciones de I-06, I-07, I-11, I-13, I-15 y II-11 con la plantilla de tema. Cada una:
> - 8–10 pasos de teoría;
> - 9 ejercicios (3 por nivel), cada uno con pistas y solución en el formato de la sección 4.
>
> Marca los temas como disponibles en el catálogo. Antes de cada una, pregúntame la idea
> espacial clave y los errores típicos si no están claros.

### Prompt 4 · Fase 1, normalización y PAU

> Añade 8 piezas de normalización (de la 11 a la 18), de menos a más difícil, con ejercicios de
> elegir vista, elegir corte y elegir la pieza desde sus vistas.
>
> Transcribe 12 ejercicios PAU reales de Andalucía desde `examenes/andalucia/` (3 de cada
> ejercicio del examen), con solución en el formato de la sección 4 y la rúbrica oficial.
> Marca cada uno como transcrito en `examenes/indice.json`.

### Prompt 5 · Fase 2, aristas ocultas y completar vistas

> Implementa el tipo de ejercicio `selectEdges`: el alumno toca segmentos en la lámina. Úsalo
> para B3 (marcar las aristas que deben ir ocultas) y B4 (tocar dónde faltan líneas), con
> corrección por arista y accesible con teclado. Crea 20 ejercicios con las piezas de
> normalización y los sólidos.

### Prompt 6 · Fase 2, tercera vista, correspondencia y razonamiento

> Implementa B2 (tercera vista: primero elegir entre 4, después completar), A3 (correspondencia
> 2D-3D), D1 (siguiente paso, sobre las soluciones existentes) y D2 (ordenar pasos). Crea 15
> ejercicios de cada tipo, repartidos por nivel.

### Prompt 7 · Fase 2, huecos de motor y lecciones

> Cierra los huecos de motor de `secuencia_didactica.md`:
> - polígonos regulares y triángulos con datos;
> - intersección de planos y de recta con plano en el diédrico;
> - tangentes a cónicas desde un punto exterior y paralelas a una dirección;
> - esferas de Dandelin.
>
> Después crea las lecciones I-02, I-03, I-05, I-09 e I-10, con 9 ejercicios cada una.

### Prompt 8 · Fase 3, simulacros y repaso adaptativo

> Monta 8 simulacros completos de 90 minutos con exámenes reales de Andalucía y un repaso
> adaptativo que priorice los tipos y temas con más fallos, guardado solo en el navegador. Añade
> ejercicios encadenados con apartados corregidos por separado.

---

## 7. Decisiones que necesitan al profesor

1. **Volumen**: ¿9 ejercicios por lección es razonable, o mejor menos y más variantes generadas?
2. **Solución**: ¿se muestra tras 2 fallos, o solo si el alumno se rinde?
3. **Errores típicos**: lista de los 3 o 4 que más ves por tema; son la parte 6 de cada desarrollo.
4. **PAU 2025 y 2026**: descargar a mano los PDF de `examenes/LEEME.md`; son los del formato actual.
5. **Prioridad entre B2 y B3**: ¿qué tipo nuevo aporta más a tu grupo, la tercera vista o las aristas ocultas?
