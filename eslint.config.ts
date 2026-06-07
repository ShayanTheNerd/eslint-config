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
    {
      name: 'src/disables/rules-configs',
      files: ['./src/rules/*.ts', './src/configs/{restrictedExports,vueComponentNames,vueServerComponents}.ts'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
  ],
);
