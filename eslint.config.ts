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
    {
      name: 'src/disables/explicit-module-boundary-types',
      files: ['./src/rules/*.ts', './src/configs/{restrictedDefaultExports,vueComponentNames,vueServerComponents}.ts'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
  ],
);
