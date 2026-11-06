// Tercera proyección en 3D: el plano de perfil (PP) y las proyecciones ‴ de lo que la necesita
// (recta de perfil, plano que contiene la LT). Capa: "perfil".
import {
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  PlaneGeometry,
  SphereGeometry,
} from 'three';
import type { Line2 } from 'three/addons/lines/Line2.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import {
  clipToBox,
  createPoint,
  pointAt,
  PROFILE_X,
  profilePoint,
  profileTrace,
  type Line,
  type Plane,
  type Point,
} from '../geometry/index.ts';
import { toThree } from './coords.ts';
import { FadeLayer } from './fadeLayer.ts';
import { createLabel, placeLabel, setLabelText } from './labels.ts';
import { createThickLine, setThickLinePoints } from './lines.ts';
import { PLANE_EXTENT_MM } from './projectionPlanes.ts';
import type { SceneColors } from './sceneColors.ts';

/** Lo que hay que proyectar en el PP. */
export interface ProfileContent {
  points: { name: string; p: Point }[];
  lines: { name: string; r: Line }[];
  planes: { name: string; alpha: Plane }[];
}

const MAX_POINTS = 4;

export class ProfileModel {
  readonly layer = new FadeLayer();
  readonly lines: Line2[] = [];

  private readonly planeMaterial = new MeshBasicMaterial({
    transparent: true,
    opacity: 0.16,
    side: DoubleSide,
    depthWrite: false,
  });
  private readonly pointMaterial = new MeshLambertMaterial();
  private readonly lineMaterial = new LineMaterial();
  private readonly spheres: Mesh[] = [];
  private readonly pointLabels;
  private readonly line: Line2;
  private readonly lineLabel;
  private readonly planeLabel;

  constructor() {
    const E = PLANE_EXTENT_MM;
    // PP: perpendicular a la LT en x = PROFILE_X. PlaneGeometry nace en XY: se gira 90° en Y.
    const pp = new Mesh(new PlaneGeometry(2 * E, 2 * E), this.planeMaterial);
    pp.rotation.y = Math.PI / 2;
    pp.position.x = PROFILE_X;
    this.layer.group.add(pp);
    this.layer.addMaterial(this.planeMaterial, 0.16);
    this.layer.addMaterial(this.pointMaterial, 1);
    this.layer.addLine(this.lineMaterial, 3);

    this.planeLabel = createLabel('PP', 'center', 'label-plane', 'PP');
    placeLabel(this.planeLabel, createPoint(PROFILE_X, -E + 10, E - 8));
    this.layer.group.add(this.planeLabel);
    this.layer.addLabel(this.planeLabel);

    const geometry = new SphereGeometry(1.5, 16, 12);
    this.pointLabels = Array.from({ length: MAX_POINTS }, (_, i) =>
      createLabel('', 'ne', 'label-point', `perfil-${i}`),
    );
    for (let i = 0; i < MAX_POINTS; i++) {
      const sphere = new Mesh(geometry, this.pointMaterial);
      this.spheres.push(sphere);
      const label = this.pointLabels[i];
      if (!label) continue;
      this.layer.group.add(sphere, label);
      this.layer.addLabel(label);
    }
    const origin = createPoint(0, 0, 0);
    this.line = createThickLine([origin, origin], this.lineMaterial);
    this.lines.push(this.line);
    this.lineLabel = createLabel('', 'ne', 'label-line', 'perfil-recta');
    this.layer.group.add(this.line, this.lineLabel);
    this.layer.addLabel(this.lineLabel);
  }

  update(content: ProfileContent): void {
    this.spheres.forEach((sphere, i) => {
      const item = content.points[i];
      const label = this.pointLabels[i];
      sphere.visible = item !== undefined;
      if (label) label.visible = item !== undefined;
      if (!item || !label) return;
      const q = profilePoint(item.p);
      sphere.position.copy(toThree(q));
      placeLabel(label, q);
      setLabelText(label, `${item.name}‴`);
    });

    // Una recta (r‴) o la traza de perfil de un plano (α₃).
    const line = content.lines[0];
    const plane = content.planes[0];
    let trace: Line | null = null;
    let name = '';
    if (line) {
      trace = {
        p1: profilePoint(line.r.p1),
        p2: profilePoint(line.r.p2),
      };
      name = `${line.name}‴`;
    } else if (plane) {
      trace = profileTrace(plane.alpha);
      name = `${plane.name}₃`;
    }
    const range = trace ? clipToBox(trace) : null;
    this.line.visible = this.lineLabel.visible = range !== null;
    if (trace && range) {
      const a = pointAt(trace, range[0]);
      const b = pointAt(trace, range[1]);
      setThickLinePoints(this.line, [a, b]);
      placeLabel(this.lineLabel, a.c > b.c ? a : b);
      setLabelText(this.lineLabel, name);
    }
  }

  setColors(colors: SceneColors): void {
    this.planeMaterial.color.copy(colors.profile);
    this.pointMaterial.color.copy(colors.point);
    this.lineMaterial.color.copy(colors.line);
  }

  setLineScale(scale: number): void {
    this.layer.setLineScale(scale);
  }
}
