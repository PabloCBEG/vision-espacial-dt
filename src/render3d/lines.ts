// Líneas con grosor en píxeles (las líneas normales de WebGL miden siempre 1 px).
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import type { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import type { Point } from '../geometry/index.ts';
import { toThreeArray } from './coords.ts';

export function createThickLine(points: readonly Point[], material: LineMaterial): Line2 {
  const line = new Line2(new LineGeometry(), material);
  setThickLinePoints(line, points);
  return line;
}

export function setThickLinePoints(line: Line2, points: readonly Point[]): void {
  line.geometry.setPositions(toThreeArray(points));
  line.computeLineDistances(); // necesario para las líneas discontinuas
}
