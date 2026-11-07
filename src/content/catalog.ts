// Catálogo del temario de Dibujo Técnico I y II (Andalucía), más el entrenador espacial.
// Cada lección indica su código de tema ("topic"). Para marcar un tema como disponible
// cuando ya tiene lecciones, cambia su "status" a 'disponible'.

export type Stage = 'ESO' | 'DT I' | 'DT II';

/** Bloques del currículo andaluz (Orden de 30 de mayo de 2023). */
export type Block = 'A' | 'B' | 'C' | 'D';

export const BLOCK_TITLES: Readonly<Record<Block, string>> = {
  A: 'Fundamentos geométricos',
  B: 'Geometría proyectiva',
  C: 'Normalización y documentación gráfica',
  D: 'Diseño asistido por ordenador',
};

/** Motor que necesita cada tema (ver src/engines). */
export type EngineName =
  | 'entrenador'
  | 'plana'
  | 'diedrico'
  | 'metodos'
  | 'solidos'
  | 'axonometria'
  | 'conica'
  | 'normalizacion'
  | 'externo';

export const ENGINE_TITLES: Readonly<Record<EngineName, string>> = {
  entrenador: 'Entrenador espacial',
  plana: 'Geometría plana',
  diedrico: 'Diédrico',
  metodos: 'Métodos diédricos',
  solidos: 'Sólidos',
  axonometria: 'Axonometría',
  conica: 'Perspectiva cónica',
  normalizacion: 'Normalización',
  externo: 'Fuera de la herramienta',
};

export type TopicStatus = 'disponible' | 'proximamente';

export interface Topic {
  /** E-00, I-01…I-16, II-01…II-13. */
  readonly code: string;
  readonly title: string;
  /** Etapas en las que se usa (el entrenador sirve para todas). */
  readonly stages: readonly Stage[];
  readonly block: Block;
  /** Motores que necesita, el principal primero. */
  readonly engines: readonly EngineName[];
  /** Ejercicio de la PAU relacionado (1 a 4), o null si no entra. */
  readonly pauExercise: number | null;
  /** Nota sobre la PAU, tal como aparece en la planificación. */
  readonly pauNote: string;
  /** Escena 3D que hace «ver» el problema. */
  readonly scene: string;
  readonly status: TopicStatus;
  /** Pantalla propia (en vez de lecciones), por ejemplo el entrenador. */
  readonly route?: string;
}

const topic = (t: Topic): Topic => t;

export const CATALOG: readonly Topic[] = [
  topic({
    code: 'E-00',
    title: 'Entrenador espacial y test diagnóstico',
    stages: ['ESO', 'DT I', 'DT II'],
    block: 'B',
    engines: ['entrenador'],
    pauExercise: null,
    pauNote: 'Transversal',
    scene: 'Rotaciones, secciones y desarrollos',
    status: 'disponible',
    route: '#/entrenador',
  }),
  // ---------- Dibujo Técnico I ----------
  topic({
    code: 'I-01',
    title: 'Trazados fundamentales y lugares geométricos',
    stages: ['DT I'],
    block: 'A',
    engines: ['plana'],
    pauExercise: 1,
    pauNote: 'Base del ejercicio 1',
    scene: 'El lugar geométrico como rastro de un punto que cumple la condición',
    status: 'disponible',
  }),
  topic({
    code: 'I-02',
    title: 'Triángulos y cuadriláteros',
    stages: ['DT I'],
    block: 'A',
    engines: ['plana'],
    pauExercise: null,
    pauNote: 'Base',
    scene: 'Construcción con datos arrastrables',
    status: 'proximamente',
  }),
  topic({
    code: 'I-03',
    title: 'Polígonos regulares',
    stages: ['DT I'],
    block: 'A',
    engines: ['plana'],
    pauExercise: null,
    pauNote: 'Base',
    scene: 'Polígono inscrito que gira y escala',
    status: 'proximamente',
  }),
  topic({
    code: 'I-04',
    title: 'Proporcionalidad, semejanza y escalas',
    stages: ['DT I'],
    block: 'A',
    engines: ['plana'],
    pauExercise: 4,
    pauNote: 'Ejercicio 4 (escalas)',
    scene: 'Escala gráfica viva',
    status: 'proximamente',
  }),
  topic({
    code: 'I-05',
    title: 'Transformaciones: traslación, giro, simetría y homotecia',
    stages: ['DT I'],
    block: 'A',
    engines: ['plana'],
    pauExercise: null,
    pauNote: 'Base',
    scene: 'Homotecia como proyección desde un foco de luz',
    status: 'proximamente',
  }),
  topic({
    code: 'I-06',
    title: 'Tangencias básicas y enlaces',
    stages: ['DT I'],
    block: 'A',
    engines: ['plana'],
    pauExercise: 1,
    pauNote: 'Base del ejercicio 1',
    scene: 'Centros de tangencia como lugares geométricos',
    status: 'proximamente',
  }),
  topic({
    code: 'I-07',
    title: 'Curvas técnicas: óvalo, ovoide y espiral',
    stages: ['DT I'],
    block: 'A',
    engines: ['plana'],
    pauExercise: null,
    pauNote: 'No entra',
    scene: 'Enlace de arcos con sus centros visibles',
    status: 'proximamente',
  }),
  topic({
    code: 'I-08',
    title: 'Diédrico: punto, recta y plano',
    stages: ['DT I'],
    block: 'B',
    engines: ['diedrico'],
    pauExercise: 2,
    pauNote: 'Ejercicio 2',
    scene: 'Abatimiento del PH sobre el PV',
    status: 'disponible',
  }),
  topic({
    code: 'I-09',
    title: 'Diédrico: intersecciones',
    stages: ['DT I'],
    block: 'B',
    engines: ['diedrico'],
    pauExercise: 2,
    pauNote: 'Ejercicio 2',
    scene: 'Dos planos que se cortan y la recta común que aparece',
    status: 'proximamente',
  }),
  topic({
    code: 'I-10',
    title: 'Diédrico: paralelismo y perpendicularidad',
    stages: ['DT I'],
    block: 'B',
    engines: ['diedrico'],
    pauExercise: 2,
    pauNote: 'Ejercicio 2',
    scene: 'Escuadra 3D apoyada en el plano',
    status: 'proximamente',
  }),
  topic({
    code: 'I-11',
    title: 'Diédrico: distancias y verdaderas magnitudes sencillas',
    stages: ['DT I'],
    block: 'B',
    engines: ['metodos'],
    pauExercise: 2,
    pauNote: 'Ejercicio 2',
    scene: 'Abatimiento del plano que contiene el segmento',
    status: 'proximamente',
  }),
  topic({
    code: 'I-12',
    title: 'Sistema de planos acotados',
    stages: ['DT I'],
    block: 'B',
    engines: ['diedrico'],
    pauExercise: null,
    pauNote: 'No entra',
    scene: 'Terreno con curvas de nivel y pendiente',
    status: 'proximamente',
  }),
  topic({
    code: 'I-13',
    title: 'Axonometría: isométrica y caballera de figuras y sólidos sencillos',
    stages: ['DT I'],
    block: 'B',
    engines: ['axonometria', 'solidos'],
    pauExercise: 3,
    pauNote: 'Ejercicio 3',
    scene: 'El mismo sólido visto desde la dirección isométrica',
    status: 'proximamente',
  }),
  topic({
    code: 'I-14',
    title: 'Perspectiva cónica: fundamentos, frontal y oblicua',
    stages: ['DT I'],
    block: 'B',
    engines: ['conica', 'solidos'],
    pauExercise: 3,
    pauNote: 'Ejercicio 3',
    scene: 'Observador, cuadro y rayos visuales visibles',
    status: 'disponible',
  }),
  topic({
    code: 'I-15',
    title: 'Normalización: líneas, vistas, escalas, acotación y croquis',
    stages: ['DT I'],
    block: 'C',
    engines: ['normalizacion'],
    pauExercise: 4,
    pauNote: 'Ejercicio 4',
    scene: 'Pieza que se despliega en sus vistas',
    status: 'proximamente',
  }),
  topic({
    code: 'I-16',
    title: 'CAD 2D y 3D',
    stages: ['DT I'],
    block: 'D',
    engines: ['externo'],
    pauExercise: null,
    pauNote: 'No entra',
    scene: 'Práctica con un programa CAD',
    status: 'proximamente',
  }),
  // ---------- Dibujo Técnico II ----------
  topic({
    code: 'II-01',
    title: 'Potencia, eje y centro radical; tangencias',
    stages: ['DT II'],
    block: 'A',
    engines: ['plana'],
    pauExercise: 1,
    pauNote: 'Ejercicio 1',
    scene: 'Circunferencias que crecen hasta tocarse',
    status: 'proximamente',
  }),
  topic({
    code: 'II-02',
    title: 'Inversión y tangencias por inversión',
    stages: ['DT II'],
    block: 'A',
    engines: ['plana'],
    pauExercise: null,
    pauNote: 'No figura en la PAU',
    scene: 'Figura y su inversa a la vez',
    status: 'proximamente',
  }),
  topic({
    code: 'II-03',
    title: 'Homología y afinidad',
    stages: ['DT II'],
    block: 'A',
    engines: ['plana'],
    pauExercise: 1,
    pauNote: 'Ejercicio 1',
    scene: 'Sombra de una figura plana sobre otro plano',
    status: 'proximamente',
  }),
  topic({
    code: 'II-04',
    title: 'Cónicas: elementos, trazado y tangentes',
    stages: ['DT II'],
    block: 'A',
    engines: ['plana'],
    pauExercise: 1,
    pauNote: 'Ejercicio 1',
    scene: 'Cono cortado por un plano, con las esferas de Dandelin',
    status: 'proximamente',
  }),
  topic({
    code: 'II-05',
    title: 'Métodos: abatimiento, giro y cambio de plano',
    stages: ['DT II'],
    block: 'B',
    engines: ['metodos'],
    pauExercise: 2,
    pauNote: 'Ejercicio 2',
    scene: 'Cada método como movimiento físico',
    status: 'disponible',
  }),
  topic({
    code: 'II-06',
    title: 'Ángulos y verdaderas magnitudes; recta y plano con ángulo dado',
    stages: ['DT II'],
    block: 'B',
    engines: ['metodos'],
    pauExercise: 2,
    pauNote: 'Ejercicio 2',
    scene: 'Cono de rectas con el mismo ángulo',
    status: 'disponible',
  }),
  topic({
    code: 'II-07',
    title: 'Poliedros regulares: tetraedro, cubo y octaedro',
    stages: ['DT II'],
    block: 'B',
    engines: ['solidos'],
    pauExercise: 2,
    pauNote: 'Ejercicios 2 y 3',
    scene: 'Sólido que se coloca en su posición PAU',
    status: 'disponible',
  }),
  topic({
    code: 'II-08',
    title: 'Prismas y pirámides: secciones, verdadera magnitud, desarrollos y troncos',
    stages: ['DT II'],
    block: 'B',
    engines: ['solidos', 'metodos'],
    pauExercise: 2,
    pauNote: 'Ejercicio 2',
    scene: 'Plano que corta y desarrollo que se pliega',
    status: 'disponible',
  }),
  topic({
    code: 'II-09',
    title: 'Cono y cilindro: puntos, secciones e intersección con recta',
    stages: ['DT II'],
    block: 'B',
    engines: ['solidos'],
    pauExercise: 2,
    pauNote: 'Ejercicio 2',
    scene: 'Generatriz que barre la superficie',
    status: 'disponible',
  }),
  topic({
    code: 'II-10',
    title: 'Axonometría de sólidos, con curvas y octaedro',
    stages: ['DT II'],
    block: 'B',
    engines: ['axonometria', 'solidos'],
    pauExercise: 3,
    pauNote: 'Ejercicio 3',
    scene: 'Paso de las vistas a la perspectiva',
    status: 'disponible',
  }),
  topic({
    code: 'II-11',
    title: 'Perspectiva cónica de sólidos desde vistas',
    stages: ['DT II'],
    block: 'B',
    engines: ['conica', 'solidos'],
    pauExercise: 3,
    pauNote: 'Ejercicio 3',
    scene: 'Construcción por abatimiento del plano geometral',
    status: 'proximamente',
  }),
  topic({
    code: 'II-12',
    title: 'Normalización: vistas desde axonometría, cortes, secciones y acotación',
    stages: ['DT II'],
    block: 'C',
    engines: ['normalizacion'],
    pauExercise: 4,
    pauNote: 'Ejercicio 4',
    scene: 'Plano de corte que atraviesa la pieza',
    status: 'disponible',
  }),
  topic({
    code: 'II-13',
    title: 'Planos de conjunto sencillos y CAD',
    stages: ['DT II'],
    block: 'D',
    engines: ['externo'],
    pauExercise: null,
    pauNote: 'No entra',
    scene: 'Práctica con un programa CAD',
    status: 'proximamente',
  }),
];

export const TOPIC_CODES = CATALOG.map((t) => t.code);

export function findTopic(code: string): Topic | undefined {
  return CATALOG.find((t) => t.code === code);
}

/** Temas de una etapa agrupados por bloque, en el orden del catálogo. */
export function topicsByBlock(stage: Stage): Map<Block, Topic[]> {
  const groups = new Map<Block, Topic[]>();
  for (const t of CATALOG) {
    if (!t.stages.includes(stage) || t.code === 'E-00') continue;
    const list = groups.get(t.block) ?? [];
    list.push(t);
    groups.set(t.block, list);
  }
  return groups;
}
