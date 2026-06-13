import { defineConfig } from './dist/index.mjs';

export default defineConfig(
  { autoDetectDeps: 'verbose' },
  [
    {
      name: 'src/disables/complexity',
      files: ['./src/**/*.ts'],
      rules: {
        complexity: 'off',
      },
    },
  ],
);
