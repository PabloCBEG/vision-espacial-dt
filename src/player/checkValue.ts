// Corrige los ejercicios de «escribir una medida» (verdadera magnitud, distancia o ángulo).
// Si la respuesta no vale, dice si se ha quedado corta o larga y por qué puede ser.

export interface ValueResult {
  correct: boolean;
  message: string;
}

const UNIT_TEXT = { mm: 'mm', '°': '°' } as const;

export function checkValue(
  answer: number,
  expected: number,
  unit: 'mm' | '°',
  tolerance: number,
): ValueResult {
  const shown = formatValue(expected, unit);
  if (!Number.isFinite(answer)) {
    return { correct: false, message: 'Escribe un número.' };
  }
  if (Math.abs(answer - expected) <= tolerance) {
    return { correct: true, message: `¡Correcto! Mide ${shown}.` };
  }
  if (unit === 'mm' && answer < expected) {
    return {
      correct: false,
      message:
        'Te sale más corto: ¿has medido una proyección? Solo la figura girada, abatida o en el plano nuevo está en verdadera magnitud.',
    };
  }
  if (unit === 'mm') {
    return {
      correct: false,
      message: 'Te sale más largo de lo que es. Mide de punto a punto sobre la verdadera magnitud.',
    };
  }
  return {
    correct: false,
    message:
      'No es ese ángulo. Mídelo entre la verdadera magnitud y la LT (o la LT₁), no sobre una proyección inclinada.',
  };
}

function formatValue(value: number, unit: 'mm' | '°'): string {
  const rounded = Math.round(value * 10) / 10;
  const text = String(rounded).replace('.', ',');
  return unit === 'mm' ? `${text} ${UNIT_TEXT[unit]}` : `${text}${UNIT_TEXT[unit]}`;
}
