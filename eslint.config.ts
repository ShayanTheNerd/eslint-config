import { defineConfig } from './dist/index.mjs';

export default defineConfig(
  { autoDetectDeps: 'verbose' },
  [
    {
      name: 'src/disables',
      files: ['./src/**/*.ts'],
      rules: {
        'complexity': 'off',
        '@typescript-eslint/no-unsafe-type-assertion': 'off',
      },
    },
  ],
);
