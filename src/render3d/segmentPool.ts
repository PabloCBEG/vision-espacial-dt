// Conjunto reutilizable de líneas gruesas: se dibujan tantos tramos como haga falta
// sin crear y destruir objetos en cada cambio.
import type { Group } from 'three';
import type { Line2 } from 'three/addons/lines/Line2.js';
import type { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { createPoint, type Point } from '../geometry/index.ts';
import { createThickLine, setThickLinePoints } from './lines.ts';

export class SegmentPool {
  private readonly parent: Group;
  private readonly material: LineMaterial;
  private readonly lines: Line2[] = [];
  /** Se llama con cada línea nueva (para darle la resolución del lienzo). */
  onCreate: (line: Line2) => void = () => {};

  constructor(parent: Group, material: LineMaterial) {
    this.parent = parent;
    this.material = material;
  }

  set(segments: readonly (readonly [Point, Point])[]): void {
    while (this.lines.length < segments.length) {
      const origin = createPoint(0, 0, 0);
      const line = createThickLine([origin, origin], this.material);
      this.parent.add(line);
      this.lines.push(line);
      this.onCreate(line);
    }
    this.lines.forEach((line, i) => {
      const segment = segments[i];
      line.visible = segment !== undefined;
      if (segment) setThickLinePoints(line, [segment[0], segment[1]]);
    });
  }
}
