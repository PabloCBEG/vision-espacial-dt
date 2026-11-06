// Configuración de ESLint (formato "flat config").
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'test-results', 'playwright-report'] },
  js.configs.recommended,
  ...tseslint.configs.strict,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  // Siempre al final: desactiva las reglas de estilo que ya gestiona Prettier.
  prettier,
);
