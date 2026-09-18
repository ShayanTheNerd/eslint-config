import { defineConfig } from './dist/index.mjs';

export default defineConfig(
  {
    env: 'node',
    autoDetectDeps: 'verbose',
    project: {
      ignores: ['./src/types/eslint-schema.d.ts'],
    },
    configs: {
      typescript: {
        allowedDefaultProjects: ['{eslint,prettier}.config.?([mc])ts'],
      },
    },
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
