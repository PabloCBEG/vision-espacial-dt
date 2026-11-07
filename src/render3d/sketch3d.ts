// Dibujo 3D inmediato para los motores: en cada cambio se vuelve a «dibujar» la capa con
// begin() … end(), y por debajo se reutilizan las líneas, esferas, rótulos y superficies.
// Cada línea lleva uno de los cuatro grosores con significado (aux, process, data, result).
import {
  BufferGeometry,
  DoubleSide,
  Float32BufferAttribute,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  SphereGeometry,
} from 'three';
import type { Line2 } from 'three/addons/lines/Line2.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import type { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { createPoint, type Point } from '../geometry/index.ts';
import { toThree, toThreeArray } from './coords.ts';
import { FadeLayer } from './fadeLayer.ts';
import {
  createLabel,
  placeLabel,
  setLabelPlacement,
  setLabelText,
  type LabelPlacement,
} from './labels.ts';
import { createThickLine, setThickLinePoints } from './lines.ts';
import type { SceneColors } from './sceneColors.ts';
import { STROKE_PX, type StrokeRole } from './strokes.ts';

/** Colores disponibles: los de la escena (cambian con el tema). */
export type SketchColor = keyof SceneColors;

export interface LineOptions {
  /** Discontinua (partes ocultas, ISO 128-2). */
  dashed?: boolean;
  /** Color de la escena; por defecto, según el papel de la línea. */
  color?: SketchColor;
}

const ROLE_COLOR: Record<StrokeRole, SketchColor> = {
  aux: 'aux',
  process: 'process',
  data: 'data',
  result: 'result',
};

const sphereGeometry = new SphereGeometry(1, 16, 12);

interface Pool<T> {
  items: T[];
  used: number;
}

export class Sketch3D {
  readonly layer = new FadeLayer();
  private colors: SceneColors | null = null;
  private readonly lineMaterials = new Map<string, LineMaterial>();
  private readonly linePools = new Map<string, Pool<Line2>>();
  private readonly sphereMaterials = new Map<SketchColor, MeshLambertMaterial>();
  private readonly spheres: Pool<Mesh> = { items: [], used: 0 };
  private readonly labels: Pool<CSS2DObject> = { items: [], used: 0 };
  private readonly fillMaterials = new Map<string, MeshBasicMaterial>();
  private readonly fills: Pool<Mesh> = { items: [], used: 0 };

  begin(): void {
    for (const pool of this.linePools.values()) pool.used = 0;
    this.spheres.used = 0;
    this.labels.used = 0;
    this.fills.used = 0;
  }

  /** Polilínea (dos puntos o más). */
  line(points: readonly Point[], role: StrokeRole, options: LineOptions = {}): void {
    if (points.length < 2) return;
    const color = options.color ?? ROLE_COLOR[role];
    const key = `${role}|${color}|${options.dashed ? 'd' : 's'}`;
    let pool = this.linePools.get(key);
    if (!pool) {
      pool = { items: [], used: 0 };
      this.linePools.set(key, pool);
    }
    let line = pool.items[pool.used];
    if (!line) {
      const origin = createPoint(0, 0, 0);
      line = createThickLine([origin, origin], this.lineMaterial(key, role, color, options.dashed));
      this.layer.group.add(line);
      pool.items.push(line);
    }
    pool.used++;
    line.visible = true;
    setThickLinePoints(line, points);
  }

  /** Arco de circunferencia (lista de puntos ya calculada) como polilínea. */
  polyline(points: readonly Point[], role: StrokeRole, options: LineOptions = {}): void {
    this.line(points, role, options);
  }

  /** Punto marcado con una esfera pequeña. */
  dot(p: Point, color: SketchColor, radiusMm = 1.4): void {
    let sphere = this.spheres.items[this.spheres.used];
    if (!sphere) {
      sphere = new Mesh(sphereGeometry, this.sphereMaterial(color));
      this.layer.group.add(sphere);
      this.spheres.items.push(sphere);
    }
    this.spheres.used++;
    sphere.material = this.sphereMaterial(color);
    sphere.visible = true;
    sphere.scale.setScalar(radiusMm);
    sphere.position.copy(toThree(p));
  }

  label(text: string, p: Point, placement: LabelPlacement = 'ne', className = 'label-point'): void {
    let label = this.labels.items[this.labels.used];
    if (!label) {
      label = createLabel(text, placement, className, text);
      this.layer.group.add(label);
      this.layer.addLabel(label);
      this.labels.items.push(label);
    }
    this.labels.used++;
    label.visible = true;
    setLabelText(label, text);
    label.element.dataset.label = text;
    setLabelPlacement(label, placement);
    placeLabel(label, p);
  }

  /** Superficie translúcida de un polígono plano convexo (abanico de triángulos). */
  fill(polygon: readonly Point[], color: SketchColor, opacity = 0.22): void {
    if (polygon.length < 3) return;
    const material = this.fillMaterial(color, opacity);
    let mesh = this.fills.items[this.fills.used];
    if (!mesh) {
      mesh = new Mesh(new BufferGeometry(), material);
      mesh.renderOrder = 1;
      this.layer.group.add(mesh);
      this.fills.items.push(mesh);
    }
    this.fills.used++;
    mesh.material = material;
    mesh.visible = true;
    const first = polygon[0];
    const triangles: Point[] = [];
    for (let i = 1; first && i < polygon.length - 1; i++) {
      const b = polygon[i];
      const c = polygon[i + 1];
      if (b && c) triangles.push(first, b, c);
    }
    mesh.geometry.dispose();
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(toThreeArray(triangles), 3));
    mesh.geometry = geometry;
  }

  /** Superficie de triángulos sueltos (conos, desarrollos…). */
  triangles(points: readonly Point[], color: SketchColor, opacity = 0.22): void {
    if (points.length < 3) return;
    const material = this.fillMaterial(color, opacity);
    let mesh = this.fills.items[this.fills.used];
    if (!mesh) {
      mesh = new Mesh(new BufferGeometry(), material);
      mesh.renderOrder = 1;
      this.layer.group.add(mesh);
      this.fills.items.push(mesh);
    }
    this.fills.used++;
    mesh.material = material;
    mesh.visible = true;
    mesh.geometry.dispose();
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(toThreeArray(points), 3));
    mesh.geometry = geometry;
  }

  /** Oculta lo que no se ha dibujado en esta pasada. */
  end(): void {
    for (const pool of this.linePools.values()) {
      for (let i = pool.used; i < pool.items.length; i++) {
        const item = pool.items[i];
        if (item) item.visible = false;
      }
    }
    for (const pool of [this.spheres, this.fills]) {
      for (let i = pool.used; i < pool.items.length; i++) {
        const item = pool.items[i];
        if (item) item.visible = false;
      }
    }
    for (let i = this.labels.used; i < this.labels.items.length; i++) {
      const label = this.labels.items[i];
      if (label) label.visible = false;
    }
  }

  setColors(colors: SceneColors): void {
    this.colors = colors;
    for (const [key, material] of this.lineMaterials) {
      const color = key.split('|')[1] as SketchColor;
      material.color.copy(colors[color]);
    }
    for (const [color, material] of this.sphereMaterials) material.color.copy(colors[color]);
    for (const [key, material] of this.fillMaterials) {
      material.color.copy(colors[key.split('|')[0] as SketchColor]);
    }
  }

  setLineScale(scale: number): void {
    this.layer.setLineScale(scale);
  }

  private lineMaterial(
    key: string,
    role: StrokeRole,
    color: SketchColor,
    dashed = false,
  ): LineMaterial {
    let material = this.lineMaterials.get(key);
    if (!material) {
      material = new LineMaterial({ dashed, dashSize: 3, gapSize: 2 });
      if (this.colors) material.color.copy(this.colors[color]);
      // Las partes ocultas van siempre con el trazo fino.
      this.layer.addLine(material, dashed ? STROKE_PX.aux : STROKE_PX[role]);
      this.lineMaterials.set(key, material);
    }
    return material;
  }

  private sphereMaterial(color: SketchColor): MeshLambertMaterial {
    let material = this.sphereMaterials.get(color);
    if (!material) {
      material = new MeshLambertMaterial();
      if (this.colors) material.color.copy(this.colors[color]);
      this.layer.addMaterial(material, 1);
      this.sphereMaterials.set(color, material);
    }
    return material;
  }

  private fillMaterial(color: SketchColor, opacity: number): MeshBasicMaterial {
    const key = `${color}|${opacity}`;
    let material = this.fillMaterials.get(key);
    if (!material) {
      material = new MeshBasicMaterial({ side: DoubleSide, depthWrite: false });
      if (this.colors) material.color.copy(this.colors[color]);
      this.layer.addMaterial(material, opacity);
      this.fillMaterials.set(key, material);
    }
    return material;
  }
}

/** Puntos de un arco: gira `from` alrededor de un eje con la función dada, de 0 a 1. */
export function arcPoints(rotate: (t: number) => Point, t: number, segments = 32): Point[] {
  const n = Math.max(2, Math.ceil(segments * Math.abs(t)) + 1);
  return Array.from({ length: n }, (_, i) => rotate((t * i) / (n - 1)));
}
