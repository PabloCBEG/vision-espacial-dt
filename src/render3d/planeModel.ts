// Plano en 3D: superficie translúcida recortada a la caja de dibujo y trazas α₁ y α₂.
// Capas: "plano:α" y "trazas:α".
import { BufferGeometry, DoubleSide, Float32BufferAttribute, Mesh, MeshBasicMaterial } from 'three';
import type { Line2 } from 'three/addons/lines/Line2.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import {
  clipToBox,
  createPoint,
  foldHorizontalProjection,
  planePolygon,
  planeTraces,
  pointAt,
  type Line,
  type Plane,
  type Point,
} from '../geometry/index.ts';
import { toThreeArray } from './coords.ts';
import { FadeLayer } from './fadeLayer.ts';
import { createLabel, placeLabel, setLabelText } from './labels.ts';
import { createThickLine, setThickLinePoints } from './lines.ts';
import type { SceneColors } from './sceneColors.ts';

const WIDTH_TRACE = 3.5;
const SURFACE_OPACITY = 0.22;

/** Tramo de una traza dentro de la caja de dibujo, o null si no la atraviesa. */
function clippedTrace(trace: Line | null): [Point, Point] | null {
  if (!trace) return null;
  const range = clipToBox(trace);
  if (!range) return null;
  return [pointAt(trace, range[0]), pointAt(trace, range[1])];
}

/** Punto para rotular una traza: cerca de su extremo derecho, algo hacia dentro. */
function inward([p, q]: [Point, Point], leftEnd = false): Point {
  const [near, far] = p.x > q.x !== leftEnd ? [p, q] : [q, p];
  return createPoint(
    near.x + (far.x - near.x) * 0.12,
    near.a + (far.a - near.a) * 0.12,
    near.c + (far.c - near.c) * 0.12,
  );
}

export class PlaneModel {
  readonly id: string;
  readonly layers = { plano: new FadeLayer(), trazas: new FadeLayer() };
  readonly lines: Line2[] = [];

  private readonly surfaceMaterial = new MeshBasicMaterial({
    transparent: true,
    opacity: SURFACE_OPACITY,
    side: DoubleSide,
    depthWrite: false,
  });
  private readonly surface = new Mesh(new BufferGeometry(), this.surfaceMaterial);
  private readonly traceMaterial = new LineMaterial();
  private readonly trace1: Line2;
  private readonly trace2: Line2;
  private readonly label1;
  private readonly label2;

  constructor(id: string) {
    this.id = id;
    const { plano, trazas } = this.layers;
    plano.group.add(this.surface);
    plano.addMaterial(this.surfaceMaterial, SURFACE_OPACITY);

    const origin = createPoint(0, 0, 0);
    this.trace1 = createThickLine([origin, origin], this.traceMaterial);
    this.trace2 = createThickLine([origin, origin], this.traceMaterial);
    this.lines.push(this.trace1, this.trace2);
    this.label1 = createLabel(`${id}₁`, 'se', 'label-plane-trace', `${id}1`);
    this.label2 = createLabel(`${id}₂`, 'ne', 'label-plane-trace', `${id}2`);
    trazas.group.add(this.trace1, this.trace2, this.label1, this.label2);
    trazas.addLine(this.traceMaterial, WIDTH_TRACE);
    trazas.addLabel(this.label1);
    trazas.addLabel(this.label2);
  }

  update(alpha: Plane | null, foldAngle: number): void {
    if (!alpha) {
      this.surface.visible = false;
      this.trace1.visible = this.trace2.visible = false;
      this.label1.visible = this.label2.visible = false;
      return;
    }

    // Superficie: abanico de triángulos sobre el polígono recortado.
    const polygon = planePolygon(alpha);
    this.surface.visible = polygon.length >= 3;
    const triangles: Point[] = [];
    const first = polygon[0];
    for (let i = 1; first && i < polygon.length - 1; i++) {
      const b = polygon[i];
      const c = polygon[i + 1];
      if (b && c) triangles.push(first, b, c);
    }
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(toThreeArray(triangles), 3));
    this.surface.geometry.dispose();
    this.surface.geometry = geometry;

    // Trazas: α₁ en el PH (gira con él al abatir) y α₂ en el PV.
    const { alpha1, alpha2, containsLT } = planeTraces(alpha);
    const t1 = clippedTrace(alpha1);
    const t2 = clippedTrace(alpha2);
    const fold = (p: Point): Point => foldHorizontalProjection(p, foldAngle);
    this.trace1.visible = this.label1.visible = t1 !== null;
    this.trace2.visible = this.label2.visible = t2 !== null;
    if (t1) {
      setThickLinePoints(this.trace1, [fold(t1[0]), fold(t1[1])]);
      // Si coincide con la LT, el rótulo va al extremo izquierdo, lejos del rótulo «LT».
      placeLabel(this.label1, fold(inward(containsLT ? [t1[1], t1[0]] : t1, containsLT)));
    }
    if (t2) {
      setThickLinePoints(this.trace2, [t2[0], t2[1]]);
      placeLabel(this.label2, inward(t2));
    }
    // Si contiene la LT, las dos trazas coinciden con ella: un solo rótulo.
    setLabelText(this.label1, containsLT ? `${this.id}₁ ≡ ${this.id}₂` : `${this.id}₁`);
    if (containsLT) this.label2.visible = false;
  }

  setColors(colors: SceneColors): void {
    this.surfaceMaterial.color.copy(colors.plane);
    this.traceMaterial.color.copy(colors.plane);
  }

  setLineScale(scale: number): void {
    this.layers.trazas.setLineScale(scale);
  }

  stepFades(dtMs: number): boolean {
    const a = this.layers.plano.step(dtMs);
    const b = this.layers.trazas.step(dtMs);
    return a || b;
  }

  get groups() {
    return [this.layers.plano.group, this.layers.trazas.group];
  }
}
