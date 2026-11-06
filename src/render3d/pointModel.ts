// Un punto con nombre (P, A, B...) con sus proyecciones, proyectantes, cota y alejamiento.
// Se divide en capas que las lecciones muestran u ocultan: punto, proyecciones, proyectantes
// y medidas (cota y alejamiento).
import {
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  SphereGeometry,
  Group,
  type Camera,
} from 'three';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import type { Line2 } from 'three/addons/lines/Line2.js';
import {
  createPoint,
  FOLDED_ANGLE_DEG,
  foldHorizontalProjection,
  projectV,
  type Point,
} from '../geometry/index.ts';
import { formatMm } from '../ui/format.ts';
import { toThree } from './coords.ts';
import { FadeLayer } from './fadeLayer.ts';
import { createLabel, placeLabel, setLabelPlacement, setLabelText } from './labels.ts';
import { createThickLine, setThickLinePoints } from './lines.ts';
import type { SceneColors } from './sceneColors.ts';

/** Qué se arrastra: el punto, su proyección horizontal o la vertical. */
export type DragHandle = 'point' | 'horizontal' | 'vertical';

/** Datos que llevan las zonas de arrastre para saber qué se ha tocado. */
export interface DragTarget {
  pointId: string;
  handle: DragHandle;
}

/** Capas de un punto, tal como se nombran en las lecciones ("proyecciones:P"...). */
export const POINT_LAYERS = ['punto', 'proyecciones', 'proyectantes', 'medidas'] as const;
export type PointLayer = (typeof POINT_LAYERS)[number];

const POINT_RADIUS_MM = 2.4;
const PROJECTION_RADIUS_MM = 1.5;
/** Zona de toque, mayor que las esferas, para poder arrastrar con el dedo. */
const HIT_RADIUS_MM = 6;

/** Grosores en píxeles con escala 1. */
const WIDTH_PROJECTOR = 2;
const WIDTH_MEASURE = 3;
const WIDTH_TRAIL = 1.5;
const WIDTH_REFERENCE = 1.5;

const hitGeometry = new SphereGeometry(HIT_RADIUS_MM, 12, 8);
const hitMaterial = new MeshBasicMaterial({
  transparent: true,
  opacity: 0,
  depthWrite: false,
  colorWrite: false,
});

export class PointModel {
  readonly id: string;
  readonly group = new Group();
  readonly hitTargets: Mesh[] = [];
  readonly layers: Record<PointLayer, FadeLayer> = {
    punto: new FadeLayer(),
    proyecciones: new FadeLayer(),
    proyectantes: new FadeLayer(),
    medidas: new FadeLayer(),
  };

  private readonly pointMaterial = new MeshLambertMaterial();
  private readonly projectionMaterial = new MeshLambertMaterial();
  private readonly projectorMaterial = new LineMaterial({ dashed: true, dashSize: 3, gapSize: 2 });
  private readonly cotaMaterial = new LineMaterial();
  private readonly alejamientoMaterial = new LineMaterial();
  private readonly trailMaterial = new LineMaterial({ dashed: true, dashSize: 2, gapSize: 2 });
  private readonly referenceMaterial = new LineMaterial();

  private readonly sphereP: Mesh;
  private readonly sphereH: Mesh;
  private readonly sphereV: Mesh;
  private readonly projectorH: Line2;
  private readonly projectorV: Line2;
  private readonly cotaSegment: Line2;
  private readonly alejamientoSegment: Line2;
  private readonly trail: Line2;
  private readonly referenceLine: Line2;

  private readonly labelP;
  private readonly labelH;
  private readonly labelV;
  private readonly labelCota;
  private readonly labelAlejamiento;
  private current: Point = createPoint(0, 0, 0);
  private foldAngle = 0;

  constructor(id: string) {
    this.id = id;
    this.labelP = createLabel(id, 'ne', 'label-point', id);
    this.labelH = createLabel(`${id}′`, 'ne', 'label-point', `${id}′`);
    this.labelV = createLabel(`${id}″`, 'nw', 'label-point', `${id}″`);
    this.labelCota = createLabel('', 'w', 'label-cota', `cota-${id}`);
    this.labelAlejamiento = createLabel('', 'se', 'label-alejamiento', `alejamiento-${id}`);

    this.sphereP = new Mesh(new SphereGeometry(POINT_RADIUS_MM, 24, 16), this.pointMaterial);
    const projectionGeometry = new SphereGeometry(PROJECTION_RADIUS_MM, 16, 12);
    this.sphereH = new Mesh(projectionGeometry, this.projectionMaterial);
    this.sphereV = new Mesh(projectionGeometry, this.projectionMaterial);

    const origin = createPoint(0, 0, 0);
    const line = (material: LineMaterial): Line2 => createThickLine([origin, origin], material);
    this.projectorH = line(this.projectorMaterial);
    this.projectorV = line(this.projectorMaterial);
    this.cotaSegment = line(this.cotaMaterial);
    this.alejamientoSegment = line(this.alejamientoMaterial);
    this.trail = line(this.trailMaterial);
    this.referenceLine = line(this.referenceMaterial);

    // Capa "punto": la esfera P y su rótulo.
    const { punto, proyecciones, proyectantes, medidas } = this.layers;
    punto.group.add(this.sphereP, this.labelP);
    punto.addMaterial(this.pointMaterial, 1);
    punto.addLabel(this.labelP);

    // Capa "proyecciones": P′ y P″, el arco de rastro y la línea de referencia al abatir.
    proyecciones.group.add(
      this.sphereH,
      this.sphereV,
      this.labelH,
      this.labelV,
      this.trail,
      this.referenceLine,
    );
    proyecciones.addMaterial(this.projectionMaterial, 1);
    proyecciones.addLine(this.trailMaterial, WIDTH_TRAIL);
    proyecciones.addLine(this.referenceMaterial, WIDTH_REFERENCE);
    proyecciones.addLabel(this.labelH);
    proyecciones.addLabel(this.labelV);

    // Capa "proyectantes": de P a P′ y de P a P″, discontinuas.
    proyectantes.group.add(this.projectorH, this.projectorV);
    proyectantes.addLine(this.projectorMaterial, WIDTH_PROJECTOR);

    // Capa "medidas": cota y alejamiento con su valor.
    medidas.group.add(
      this.cotaSegment,
      this.alejamientoSegment,
      this.labelCota,
      this.labelAlejamiento,
    );
    medidas.addLine(this.cotaMaterial, WIDTH_MEASURE);
    medidas.addLine(this.alejamientoMaterial, WIDTH_MEASURE);
    medidas.addLabel(this.labelCota);
    medidas.addLabel(this.labelAlejamiento);

    for (const layer of Object.values(this.layers)) this.group.add(layer.group);

    // Zonas de arrastre invisibles (transparentes, pero el rayo sí las detecta).
    const handles: [DragHandle, Mesh][] = [
      ['point', this.sphereP],
      ['horizontal', this.sphereH],
      ['vertical', this.sphereV],
    ];
    for (const [handle, sphere] of handles) {
      const hit = new Mesh(hitGeometry, hitMaterial);
      const target: DragTarget = { pointId: id, handle };
      hit.userData.dragTarget = target;
      sphere.add(hit);
      this.hitTargets.push(hit);
    }
  }

  /**
   * Coloca el punto. Con foldAngle > 0 el PH está abatiéndose: P′ y el alejamiento viajan
   * con él (rotateAboutLT), P″ no se mueve, y P′ deja un arco de rastro.
   */
  update(p: Point, foldAngle = 0): void {
    const h = foldHorizontalProjection(p, foldAngle);
    const v = projectV(p);
    const foot = createPoint(p.x, 0, 0); // pie en la LT

    this.sphereP.position.copy(toThree(p));
    this.sphereH.position.copy(toThree(h));
    this.sphereV.position.copy(toThree(v));
    placeLabel(this.labelP, p);
    placeLabel(this.labelH, h);
    placeLabel(this.labelV, v);

    // Proyectantes: de P a P′ (mide la cota) y de P a P″ (mide el alejamiento).
    // Al abatir, P′ se separa de P: la proyectante horizontal deja de tener sentido.
    setThickLinePoints(this.projectorH, [p, h]);
    setThickLinePoints(this.projectorV, [p, v]);
    this.projectorH.visible = p.c !== 0 && foldAngle === 0;
    this.projectorV.visible = p.a !== 0;

    // Cota: en el PV, de P″ a la LT. Alejamiento: en el PH (que gira), de P′ a la LT.
    setThickLinePoints(this.cotaSegment, [v, foot]);
    setThickLinePoints(this.alejamientoSegment, [h, foot]);
    placeLabel(this.labelCota, createPoint(p.x, 0, p.c / 2));
    placeLabel(
      this.labelAlejamiento,
      foldHorizontalProjection(createPoint(p.x, p.a / 2, 0), foldAngle),
    );
    setLabelText(this.labelCota, `c = ${formatMm(p.c)}`);
    setLabelText(this.labelAlejamiento, `a = ${formatMm(p.a)}`);

    // Arco de rastro de P′, de su posición en el PH a la actual.
    const trail: Point[] = [];
    for (let angle = 0; angle < foldAngle; angle += 3) {
      trail.push(foldHorizontalProjection(p, angle));
    }
    trail.push(h);
    this.trail.visible = trail.length >= 2 && p.a !== 0;
    if (this.trail.visible) setThickLinePoints(this.trail, trail);

    // Abatido del todo: P′ y P″ quedan en la misma línea de referencia, como en la lámina.
    this.referenceLine.visible = foldAngle === FOLDED_ANGLE_DEG && h.c !== v.c;
    if (this.referenceLine.visible) setThickLinePoints(this.referenceLine, [v, h]);

    this.current = p;
    this.foldAngle = foldAngle;
  }

  /**
   * Cota y alejamiento se ocultan si valen 0 o si se ven de punta
   * (la cota desde arriba, el alejamiento de frente): serían un punto con un rótulo encima.
   */
  updateForCamera(camera: Camera): void {
    const direction = camera.position.clone().normalize(); // Three.js: Y = c, Z = a
    // Dirección del segmento de alejamiento: gira con el PH al abatir.
    const theta = (this.foldAngle * Math.PI) / 180;
    const alongAlejamiento = Math.abs(
      -direction.y * Math.sin(theta) + direction.z * Math.cos(theta),
    );
    const showCota = this.current.c !== 0 && Math.abs(direction.y) < 0.9;
    const showAlejamiento = this.current.a !== 0 && alongAlejamiento < 0.9;
    this.cotaSegment.visible = this.labelCota.visible = showCota;
    this.alejamientoSegment.visible = this.labelAlejamiento.visible = showAlejamiento;
    // Desde arriba P′ queda bajo P, y al abatir se acerca al rótulo del alejamiento:
    // en esos casos su rótulo va abajo a la izquierda.
    const lowerLeft = Math.abs(direction.y) > 0.9 || this.foldAngle > 0;
    setLabelPlacement(this.labelH, lowerLeft ? 'sw' : 'ne');
  }

  setColors(colors: SceneColors): void {
    this.pointMaterial.color.copy(colors.point);
    this.projectionMaterial.color.copy(colors.point);
    this.projectorMaterial.color.copy(colors.point);
    this.cotaMaterial.color.copy(colors.cota);
    this.alejamientoMaterial.color.copy(colors.alejamiento);
    this.trailMaterial.color.copy(colors.point);
    this.referenceMaterial.color.copy(colors.lt);
  }

  /** Multiplica los grosores (modo proyector). */
  setLineScale(scale: number): void {
    for (const layer of Object.values(this.layers)) layer.setLineScale(scale);
  }

  /** Avanza los fundidos de las capas. Devuelve true si alguno sigue en marcha. */
  stepFades(dtMs: number): boolean {
    let animating = false;
    for (const layer of Object.values(this.layers)) animating = layer.step(dtMs) || animating;
    return animating;
  }

  dispose(): void {
    this.group.removeFromParent();
  }
}
