import { describe, expect, it } from 'vitest';
import { FIT_VIEWBOX, mmPerPixel, unionViewBox, viewBoxCenter, zoomViewBox } from './viewport.ts';

describe('zoom de la lámina', () => {
  it('acercar al doble reduce el encuadre a la mitad y mantiene el centro', () => {
    const c = viewBoxCenter(FIT_VIEWBOX);
    const vb = zoomViewBox(FIT_VIEWBOX, 2, c.x, c.y);
    expect(vb.width).toBeCloseTo(FIT_VIEWBOX.width / 2);
    expect(viewBoxCenter(vb).x).toBeCloseTo(c.x);
    expect(viewBoxCenter(vb).y).toBeCloseTo(c.y);
  });

  it('el punto bajo el cursor no se mueve al hacer zoom', () => {
    const vb = zoomViewBox(FIT_VIEWBOX, 1.5, 40, 20);
    // Posición relativa de (40, 20) dentro del encuadre, antes y después.
    const before = (40 - FIT_VIEWBOX.x) / FIT_VIEWBOX.width;
    const after = (40 - vb.x) / vb.width;
    expect(after).toBeCloseTo(before);
  });

  it('limita el zoom', () => {
    const vb = zoomViewBox(FIT_VIEWBOX, 1000, 0, 0);
    expect(vb.width).toBe(30);
  });
});

describe('mmPerPixel', () => {
  it('con meet manda el lado más ajustado', () => {
    expect(mmPerPixel({ x: 0, y: 0, width: 200, height: 100 }, 400, 400)).toBe(0.5);
    expect(mmPerPixel({ x: 0, y: 0, width: 200, height: 100 }, 1000, 100)).toBe(1);
  });
});

describe('unionViewBox', () => {
  it('contiene a los dos encuadres', () => {
    expect(
      unionViewBox({ x: 0, y: 0, width: 10, height: 10 }, { x: -5, y: 5, width: 10, height: 20 }),
    ).toEqual({ x: -5, y: 0, width: 15, height: 25 });
  });
});
