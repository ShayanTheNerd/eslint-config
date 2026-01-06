import { defineConfig } from './src/index.ts';

export default defineConfig(
  {
    autoDetectDeps: 'verbose',
  },
  {
    name: 'src/disables',
    files: ['./src/**/*.ts'],
    rules: {
      'complexity': 'off',
      '@typescript-eslint/no-unsafe-type-assertion': 'off',
    },
  },
  {
    name: 'src/rules/disables',
    files: ['./src/rules/*.ts'],
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
);
