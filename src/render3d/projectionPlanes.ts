// PH y PV semitransparentes con rejilla cada 10 mm, LT destacada, rótulos y cuadrantes.
import {
  BufferGeometry,
  DoubleSide,
  Float32BufferAttribute,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  type Camera,
} from 'three';
import type { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { createPoint, type Point } from '../geometry/index.ts';
import { toThreeArray } from './coords.ts';
import { createLabel, placeLabel } from './labels.ts';
import { createThickLine } from './lines.ts';
import type { SceneColors } from './sceneColors.ts';

/** Los planos van de −80 a 80 mm: caben los puntos de ±60 mm con margen. */
export const PLANE_EXTENT_MM = 80;
const GRID_STEP_MM = 10;
const E = PLANE_EXTENT_MM;

export class ProjectionPlanes {
  readonly group = new Group();

  private readonly phMaterial = planeMaterial();
  private readonly pvMaterial = planeMaterial();
  private readonly phGridMaterial = gridMaterial();
  private readonly pvGridMaterial = gridMaterial();
  private readonly ltMaterial = new LineMaterial({ linewidth: 4 });
  private readonly quadrantLabels: CSS2DObject[] = [];
  private readonly phLabel: CSS2DObject;
  private readonly pvLabel: CSS2DObject;
  private readonly phGroup = new Group();
  private folded = false;

  constructor() {
    const size = 2 * E;

    // PH: plano horizontal (cota 0). PlaneGeometry nace vertical, así que se tumba.
    const ph = new Mesh(new PlaneGeometry(size, size), this.phMaterial);
    ph.rotation.x = -Math.PI / 2;
    ph.renderOrder = 0;

    // PV: plano vertical (alejamiento 0).
    const pv = new Mesh(new PlaneGeometry(size, size), this.pvMaterial);
    pv.renderOrder = 0;

    const phGrid = new LineSegments(
      gridGeometry((u, v) => createPoint(u, v, 0)),
      this.phGridMaterial,
    );
    const pvGrid = new LineSegments(
      gridGeometry((u, v) => createPoint(u, 0, v)),
      this.pvGridMaterial,
    );

    const lt = createThickLine(
      [createPoint(-E - 6, 0, 0), createPoint(E + 6, 0, 0)],
      this.ltMaterial,
    );
    lt.renderOrder = 2;

    // El PH va en su propio grupo para poder abatirlo girando alrededor de la LT (eje X).
    this.phGroup.add(ph, phGrid);
    this.group.add(this.phGroup, pv, pvGrid, lt);

    // Rótulos de los planos y de la LT.
    this.phLabel = this.addLabel('PH', 'center', 'label-plane', createPoint(E - 8, E - 8, 0));
    this.phGroup.add(this.phLabel);
    this.pvLabel = this.addLabel('PV', 'center', 'label-plane', createPoint(E - 8, 0, E - 8));
    this.addLabel('LT', 'e', 'label-plane', createPoint(E + 6, 0, 0));

    // Números de los cuadrantes, discretos, en el borde izquierdo de los planos.
    const qx = -E;
    const quadrants: [string, Point][] = [
      ['I', createPoint(qx, 50, 50)],
      ['II', createPoint(qx, -50, 50)],
      ['III', createPoint(qx, -50, -50)],
      ['IV', createPoint(qx, 50, -50)],
    ];
    for (const [text, p] of quadrants) {
      this.quadrantLabels.push(this.addLabel(text, 'center', 'label-quadrant', p));
    }
  }

  /**
   * Abate el PH un ángulo en grados alrededor de la LT. Girar el eje X un ángulo θ lleva
   * (Y, Z) = (0, a) a (−a·sin θ, a·cos θ): es exactamente rotateAboutLT de src/geometry.
   */
  setFoldAngle(angleDeg: number): void {
    this.phGroup.rotation.x = (angleDeg * Math.PI) / 180;
    this.folded = angleDeg !== 0;
  }

  /** Multiplica el grosor de la LT (modo proyector). */
  setLineScale(scale: number): void {
    this.ltMaterial.linewidth = 4 * scale;
  }

  setColors(colors: SceneColors): void {
    this.phMaterial.color.copy(colors.ph);
    this.pvMaterial.color.copy(colors.pv);
    this.phGridMaterial.color.copy(colors.ph);
    this.pvGridMaterial.color.copy(colors.pv);
    this.ltMaterial.color.copy(colors.lt);
  }

  /**
   * Oculta los rótulos que se solaparían según desde dónde se mire
   * (dirección de la cámara en coordenadas de Three.js: X = x, Y = c, Z = a).
   */
  updateForCamera(camera: Camera): void {
    const direction = camera.position.clone().normalize();
    const alongLT = Math.abs(direction.x) > 0.9;
    // Los cuadrantes solo se distinguen si se ve el corte de los dos planos.
    // Con el PH abatido ya no hay cuatro cuadrantes que señalar.
    const showQuadrants = Math.abs(direction.x) > 0.2 && !this.folded;
    for (const label of this.quadrantLabels) label.visible = showQuadrants;
    // Un plano visto de canto se confunde con la LT (salvo en perfil, donde la LT es un punto).
    this.phLabel.visible = this.folded || alongLT || Math.abs(direction.y) > 0.15;
    this.pvLabel.visible = alongLT || Math.abs(direction.z) > 0.15;
  }

  private addLabel(
    text: string,
    placement: 'center' | 'e',
    className: string,
    p: Point,
  ): CSS2DObject {
    const label = createLabel(text, placement, className);
    placeLabel(label, p);
    this.group.add(label);
    return label;
  }
}

function planeMaterial(): MeshBasicMaterial {
  return new MeshBasicMaterial({
    transparent: true,
    opacity: 0.18,
    side: DoubleSide,
    depthWrite: false,
  });
}

function gridMaterial(): LineBasicMaterial {
  return new LineBasicMaterial({ transparent: true, opacity: 0.45, depthWrite: false });
}

/** Rejilla de un plano: líneas cada 10 mm en las dos direcciones. */
function gridGeometry(toPoint: (u: number, v: number) => Point): BufferGeometry {
  const points: Point[] = [];
  for (let k = -E; k <= E; k += GRID_STEP_MM) {
    points.push(toPoint(k, -E), toPoint(k, E));
    points.push(toPoint(-E, k), toPoint(E, k));
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(toThreeArray(points), 3));
  return geometry;
}
