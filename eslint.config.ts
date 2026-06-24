import { defineConfig } from './dist/index.mjs';

export default defineConfig(
  {
    env: 'node',
    autoDetectDeps: 'verbose',
  },
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
