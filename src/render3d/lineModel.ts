// Recta en 3D: tramos vistos (continuos) y ocultos (discontinuos), sus proyecciones r′ y r″
// y sus trazas H y V. Capas: "recta:r" y "trazas:r".
import { Mesh, MeshLambertMaterial, SphereGeometry } from 'three';
import type { Line2 } from 'three/addons/lines/Line2.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import {
  foldHorizontalProjection,
  labelAnchor,
  lineSegments,
  lineTraces,
  projectV,
  type Line,
  type Point,
} from '../geometry/index.ts';
import { toThree } from './coords.ts';
import { FadeLayer } from './fadeLayer.ts';
import { createLabel, placeLabel } from './labels.ts';
import type { SceneColors } from './sceneColors.ts';
import { SegmentPool } from './segmentPool.ts';

const WIDTH_VISIBLE = 3.5;
const WIDTH_HIDDEN = 2;
const WIDTH_PROJECTION = 2.5;
const WIDTH_PROJECTION_HIDDEN = 1.5;
const TRACE_RADIUS_MM = 1.8;

export class LineModel {
  readonly id: string;
  readonly layers = { recta: new FadeLayer(), trazas: new FadeLayer() };
  onLineCreated: (line: Line2) => void = () => {};

  private readonly visibleMaterial = new LineMaterial();
  private readonly hiddenMaterial = new LineMaterial({ dashed: true, dashSize: 3, gapSize: 2 });
  private readonly projectionMaterial = new LineMaterial();
  private readonly projectionHiddenMaterial = new LineMaterial({
    dashed: true,
    dashSize: 3,
    gapSize: 2,
  });
  private readonly traceMaterial = new MeshLambertMaterial();
  private readonly pools: SegmentPool[];
  private readonly spaceVisible: SegmentPool;
  private readonly spaceHidden: SegmentPool;
  private readonly hVisible: SegmentPool;
  private readonly hHidden: SegmentPool;
  private readonly vVisible: SegmentPool;
  private readonly vHidden: SegmentPool;
  private readonly sphereH: Mesh;
  private readonly sphereV: Mesh;
  private readonly label;
  private readonly labelH;
  private readonly labelV;
  private readonly labelTraceH;
  private readonly labelTraceV;

  constructor(id: string) {
    this.id = id;
    const { recta, trazas } = this.layers;
    const pool = (material: LineMaterial): SegmentPool => {
      const p = new SegmentPool(recta.group, material);
      p.onCreate = (line) => this.onLineCreated(line);
      return p;
    };
    this.spaceVisible = pool(this.visibleMaterial);
    this.spaceHidden = pool(this.hiddenMaterial);
    this.hVisible = pool(this.projectionMaterial);
    this.hHidden = pool(this.projectionHiddenMaterial);
    this.vVisible = pool(this.projectionMaterial);
    this.vHidden = pool(this.projectionHiddenMaterial);
    this.pools = [
      this.spaceVisible,
      this.spaceHidden,
      this.hVisible,
      this.hHidden,
      this.vVisible,
      this.vHidden,
    ];
    recta.addLine(this.visibleMaterial, WIDTH_VISIBLE);
    recta.addLine(this.hiddenMaterial, WIDTH_HIDDEN);
    recta.addLine(this.projectionMaterial, WIDTH_PROJECTION);
    recta.addLine(this.projectionHiddenMaterial, WIDTH_PROJECTION_HIDDEN);

    this.label = createLabel(id, 'ne', 'label-line', id);
    this.labelH = createLabel(`${id}′`, 'se', 'label-line', `${id}′`);
    this.labelV = createLabel(`${id}″`, 'ne', 'label-line', `${id}″`);
    recta.group.add(this.label, this.labelH, this.labelV);
    for (const l of [this.label, this.labelH, this.labelV]) recta.addLabel(l);

    const traceGeometry = new SphereGeometry(TRACE_RADIUS_MM, 16, 12);
    this.sphereH = new Mesh(traceGeometry, this.traceMaterial);
    this.sphereV = new Mesh(traceGeometry, this.traceMaterial);
    this.labelTraceH = createLabel('H', 'sw', 'label-trace', `H-${id}`);
    this.labelTraceV = createLabel('V', 'nw', 'label-trace', `V-${id}`);
    trazas.group.add(this.sphereH, this.sphereV, this.labelTraceH, this.labelTraceV);
    trazas.addMaterial(this.traceMaterial, 1);
    trazas.addLabel(this.labelTraceH);
    trazas.addLabel(this.labelTraceV);
  }

  /** Coloca la recta. Con el PH abatiéndose, r′ y H viajan con él. */
  update(r: Line | null, foldAngle: number): void {
    if (!r) {
      for (const p of this.pools) p.set([]);
      this.sphereH.visible = this.sphereV.visible = false;
      this.labelTraceH.visible = this.labelTraceV.visible = false;
      this.label.visible = this.labelH.visible = this.labelV.visible = false;
      return;
    }
    const segments = lineSegments(r);
    const fold = (p: Point): Point => foldHorizontalProjection(p, foldAngle);
    const pairs = (visible: boolean, map: (p: Point) => Point) =>
      segments.filter((s) => s.visible === visible).map((s) => [map(s.from), map(s.to)] as const);
    this.spaceVisible.set(pairs(true, (p) => p));
    this.spaceHidden.set(pairs(false, (p) => p));
    this.hVisible.set(pairs(true, fold));
    this.hHidden.set(pairs(false, fold));
    this.vVisible.set(pairs(true, projectV));
    this.vHidden.set(pairs(false, projectV));

    const anchor = labelAnchor(r, undefined, 0.3);
    this.label.visible = this.labelH.visible = this.labelV.visible = anchor !== null;
    if (anchor) {
      placeLabel(this.label, anchor);
      placeLabel(this.labelH, fold(anchor));
      placeLabel(this.labelV, projectV(anchor));
    }

    const { h, v } = lineTraces(r);
    const inside = (p: Point | null): p is Point =>
      p !== null && Math.max(Math.abs(p.x), Math.abs(p.a), Math.abs(p.c)) <= 80;
    this.sphereH.visible = this.labelTraceH.visible = inside(h);
    this.sphereV.visible = this.labelTraceV.visible = inside(v);
    if (inside(h)) {
      this.sphereH.position.copy(toThree(fold(h)));
      placeLabel(this.labelTraceH, fold(h));
    }
    if (inside(v)) {
      this.sphereV.position.copy(toThree(v));
      placeLabel(this.labelTraceV, v);
    }
  }

  setColors(colors: SceneColors): void {
    this.visibleMaterial.color.copy(colors.line);
    this.hiddenMaterial.color.copy(colors.line);
    this.projectionMaterial.color.copy(colors.line);
    this.projectionHiddenMaterial.color.copy(colors.line);
    this.traceMaterial.color.copy(colors.trace);
  }

  setLineScale(scale: number): void {
    this.layers.recta.setLineScale(scale);
  }

  stepFades(dtMs: number): boolean {
    const a = this.layers.recta.step(dtMs);
    const b = this.layers.trazas.step(dtMs);
    return a || b;
  }

  get groups() {
    return [this.layers.recta.group, this.layers.trazas.group];
  }
}
