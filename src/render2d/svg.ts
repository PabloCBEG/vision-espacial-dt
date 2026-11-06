// Ayudas mínimas para crear elementos SVG.

const SVG_NS = 'http://www.w3.org/2000/svg';

type Attributes = Record<string, string | number | undefined>;

export function svgElement<K extends keyof SVGElementTagNameMap>(
  tag: K,
  attributes: Attributes = {},
  className = '',
): SVGElementTagNameMap[K] {
  const element = document.createElementNS(SVG_NS, tag);
  setAttributes(element, attributes);
  if (className) element.setAttribute('class', className);
  return element;
}

export function setAttributes(element: Element, attributes: Attributes): void {
  for (const [name, value] of Object.entries(attributes)) {
    if (value === undefined) element.removeAttribute(name);
    else element.setAttribute(name, typeof value === 'number' ? round(value) : value);
  }
}

/** Redondea a centésimas de mm para que el SVG no se llene de decimales. */
function round(value: number): string {
  return String(Math.round(value * 100) / 100);
}
