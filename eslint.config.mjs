// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// configurando o Eslint e Prittier para o Nest.js de acordo com os requisitos do teste

export default tseslint.config(
  {
    ignores: [
      '**/node_modules/',
      '**/dist/',
      '**/*.d.ts',
      '.eslintrc.js',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest, 
      },
      parserOptions: {
        project: true, 
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', 
      '@typescript-eslint/no-floating-promises': 'error', 
      '@typescript-eslint/no-unsafe-argument': 'warn', 
      '@typescript-eslint/no-unsafe-assignment': 'off', 
      '@typescript-eslint/no-unsafe-member-access': 'warn', 
      '@typescript-eslint/require-await': 'warn', 
      '@typescript-eslint/restrict-template-expressions': 'off', 
      'prettier/prettier': ['error', { endOfLine: 'auto' }], 
    },
  },
);
