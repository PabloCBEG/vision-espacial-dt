// El punto P con sus proyecciones P′ y P″, proyectantes, cota y alejamiento.
import {
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  SphereGeometry,
  type Camera,
} from 'three';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import type { Line2 } from 'three/addons/lines/Line2.js';
import { createPoint, projectH, projectV, type Point } from '../geometry/index.ts';
import { formatMm } from '../ui/format.ts';
import { toThree } from './coords.ts';
import { createLabel, placeLabel, setLabelPlacement, setLabelText } from './labels.ts';
import { createThickLine, setThickLinePoints } from './lines.ts';
import type { SceneColors } from './sceneColors.ts';

/** Qué se arrastra: P, su proyección horizontal P′ o la vertical P″. */
export type DragHandle = 'point' | 'horizontal' | 'vertical';

const POINT_RADIUS_MM = 2.4;
const PROJECTION_RADIUS_MM = 1.5;
/** Zona de toque, mayor que las esferas, para poder arrastrar con el dedo. */
const HIT_RADIUS_MM = 6;

export class PointModel {
  readonly group = new Group();
  readonly hitTargets: Mesh[] = [];

  private readonly pointMaterial = new MeshLambertMaterial();
  private readonly projectionMaterial = new MeshLambertMaterial();
  private readonly projectorMaterial = new LineMaterial({
    linewidth: 2,
    dashed: true,
    dashSize: 3,
    gapSize: 2,
  });
  private readonly cotaMaterial = new LineMaterial({ linewidth: 3 });
  private readonly alejamientoMaterial = new LineMaterial({ linewidth: 3 });

  private readonly sphereP: Mesh;
  private readonly sphereH: Mesh;
  private readonly sphereV: Mesh;
  private readonly projectorH: Line2;
  private readonly projectorV: Line2;
  private readonly cotaSegment: Line2;
  private readonly alejamientoSegment: Line2;

  private readonly labelP = createLabel('P', 'ne', 'label-point', 'P');
  private readonly labelH = createLabel('P′', 'ne', 'label-point', 'P′');
  private readonly labelV = createLabel('P″', 'nw', 'label-point', 'P″');
  private readonly labelCota = createLabel('', 'w', 'label-cota', 'cota');
  private readonly labelAlejamiento = createLabel('', 'se', 'label-alejamiento', 'alejamiento');
  private current: Point = createPoint(0, 0, 0);

  constructor() {
    const pointGeometry = new SphereGeometry(POINT_RADIUS_MM, 24, 16);
    const projectionGeometry = new SphereGeometry(PROJECTION_RADIUS_MM, 16, 12);
    this.sphereP = new Mesh(pointGeometry, this.pointMaterial);
    this.sphereH = new Mesh(projectionGeometry, this.projectionMaterial);
    this.sphereV = new Mesh(projectionGeometry, this.projectionMaterial);

    const origin = createPoint(0, 0, 0);
    this.projectorH = createThickLine([origin, origin], this.projectorMaterial);
    this.projectorV = createThickLine([origin, origin], this.projectorMaterial);
    this.cotaSegment = createThickLine([origin, origin], this.cotaMaterial);
    this.alejamientoSegment = createThickLine([origin, origin], this.alejamientoMaterial);

    this.group.add(
      this.projectorH,
      this.projectorV,
      this.cotaSegment,
      this.alejamientoSegment,
      this.sphereP,
      this.sphereH,
      this.sphereV,
      this.labelP,
      this.labelH,
      this.labelV,
      this.labelCota,
      this.labelAlejamiento,
    );

    // Zonas de arrastre invisibles (transparentes, pero el rayo sí las detecta).
    const hitGeometry = new SphereGeometry(HIT_RADIUS_MM, 12, 8);
    const hitMaterial = new MeshBasicMaterial({
      transparent: true,
      opacity: 0,
      depthWrite: false,
      colorWrite: false,
    });
    const handles: [DragHandle, Mesh][] = [
      ['point', this.sphereP],
      ['horizontal', this.sphereH],
      ['vertical', this.sphereV],
    ];
    for (const [handle, sphere] of handles) {
      const hit = new Mesh(hitGeometry, hitMaterial);
      hit.userData.handle = handle;
      sphere.add(hit);
      this.hitTargets.push(hit);
    }
  }

  update(p: Point): void {
    const h = projectH(p);
    const v = projectV(p);
    const foot = createPoint(p.x, 0, 0); // pie en la LT

    this.sphereP.position.copy(toThree(p));
    this.sphereH.position.copy(toThree(h));
    this.sphereV.position.copy(toThree(v));
    placeLabel(this.labelP, p);
    placeLabel(this.labelH, h);
    placeLabel(this.labelV, v);

    // Proyectantes: de P a P′ (mide la cota) y de P a P″ (mide el alejamiento).
    setThickLinePoints(this.projectorH, [p, h]);
    setThickLinePoints(this.projectorV, [p, v]);
    this.projectorH.visible = p.c !== 0;
    this.projectorV.visible = p.a !== 0;

    // Cota: en el PV, de P″ a la LT. Alejamiento: en el PH, de P′ a la LT.
    setThickLinePoints(this.cotaSegment, [v, foot]);
    setThickLinePoints(this.alejamientoSegment, [h, foot]);
    placeLabel(this.labelCota, createPoint(p.x, 0, p.c / 2));
    placeLabel(this.labelAlejamiento, createPoint(p.x, p.a / 2, 0));
    setLabelText(this.labelCota, `c = ${formatMm(p.c)}`);
    setLabelText(this.labelAlejamiento, `a = ${formatMm(p.a)}`);
    this.current = p;
  }

  /**
   * Cota y alejamiento se ocultan si valen 0 o si se ven de punta
   * (la cota desde arriba, el alejamiento de frente): serían un punto con un rótulo encima.
   */
  updateForCamera(camera: Camera): void {
    const direction = camera.position.clone().normalize(); // Three.js: Y = c, Z = a
    const showCota = this.current.c !== 0 && Math.abs(direction.y) < 0.9;
    const showAlejamiento = this.current.a !== 0 && Math.abs(direction.z) < 0.9;
    this.cotaSegment.visible = this.labelCota.visible = showCota;
    this.alejamientoSegment.visible = this.labelAlejamiento.visible = showAlejamiento;
    // Desde arriba P′ queda bajo P: su rótulo va al lado contrario para no chocar con el de P.
    setLabelPlacement(this.labelH, Math.abs(direction.y) > 0.9 ? 'sw' : 'ne');
  }

  setColors(colors: SceneColors): void {
    this.pointMaterial.color.copy(colors.point);
    this.projectionMaterial.color.copy(colors.point);
    this.projectorMaterial.color.copy(colors.point);
    this.cotaMaterial.color.copy(colors.cota);
    this.alejamientoMaterial.color.copy(colors.alejamiento);
  }
}
