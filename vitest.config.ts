import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
    // Mientras no exista ningún test en src/geometry, "npm run test" no debe fallar.
    passWithNoTests: true,
  },
});
