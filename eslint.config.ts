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
      packageJson: {
        overrides: {
          rules: {
            /* The React integration uses `eslint-plugin-jsx-a11y-x` directly. It's also a required peer dependency for `eslint-plugin-astro`'s accessibility rules. */
            'package-json/specify-peers-locally': 'off',
            'package-json/unique-dependencies': 'off',
          },
        },
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
