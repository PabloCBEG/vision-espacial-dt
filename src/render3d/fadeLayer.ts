// Capa de la escena que aparece y desaparece con un fundido (nunca de golpe) y se puede destacar.
import { Group, type Material } from 'three';
import type { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import type { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

const FADE_MS = 450;
const HIGHLIGHT_WIDTH = 1.8;

interface FadingMaterial {
  material: Material;
  baseOpacity: number;
}

interface ScalableLine {
  material: LineMaterial;
  baseWidth: number;
}

export class FadeLayer {
  readonly group = new Group();
  private readonly materials: FadingMaterial[] = [];
  private readonly lines: ScalableLine[] = [];
  private readonly labels: CSS2DObject[] = [];
  private value = 1;
  private target = 1;
  private highlighted = false;
  private lineScale = 1;

  /** Registra un material para el fundido, con su opacidad normal. */
  addMaterial(material: Material, baseOpacity = material.opacity): void {
    material.transparent = true;
    this.materials.push({ material, baseOpacity });
    material.opacity = baseOpacity * this.value;
  }

  /** Registra una línea gruesa: su grosor cambia con el modo proyector y al destacarla. */
  addLine(material: LineMaterial, baseWidth: number): void {
    this.addMaterial(material, 1);
    this.lines.push({ material, baseWidth });
    this.applyWidths();
  }

  addLabel(label: CSS2DObject): void {
    this.labels.push(label);
  }

  setVisible(visible: boolean, instant = false): void {
    this.target = visible ? 1 : 0;
    if (instant) this.value = this.target;
    this.apply();
  }

  setHighlighted(highlighted: boolean): void {
    if (highlighted === this.highlighted) return;
    this.highlighted = highlighted;
    for (const label of this.labels) label.element.classList.toggle('is-highlighted', highlighted);
    this.applyWidths();
  }

  setLineScale(scale: number): void {
    this.lineScale = scale;
    this.applyWidths();
  }

  /** Avanza el fundido. Devuelve true si aún no ha terminado. */
  step(dtMs: number): boolean {
    if (this.value === this.target) return false;
    const delta = dtMs / FADE_MS;
    this.value =
      this.target > this.value
        ? Math.min(this.target, this.value + delta)
        : Math.max(this.target, this.value - delta);
    this.apply();
    return this.value !== this.target;
  }

  private apply(): void {
    for (const { material, baseOpacity } of this.materials) {
      material.opacity = baseOpacity * this.value;
    }
    for (const label of this.labels) {
      label.element.style.opacity = String(this.value);
      // CSS2DRenderer solo mira la visibilidad del propio rótulo, no la de su grupo.
      label.element.style.visibility = this.value === 0 ? 'hidden' : '';
    }
    this.group.visible = this.value > 0;
  }

  private applyWidths(): void {
    const factor = this.lineScale * (this.highlighted ? HIGHLIGHT_WIDTH : 1);
    for (const { material, baseWidth } of this.lines) material.linewidth = baseWidth * factor;
  }
}
