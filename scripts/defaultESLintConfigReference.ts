import type { Linter } from 'eslint';

import { defineConfig } from '../src/index.ts';

const config: Linter.Config[] = defineConfig({
  autoDetectDeps: false,
  configs: {
    oxlint: './src/oxlint.config.jsonc',
    html: true,
    css: true,
    stylistic: true,
    typescript: true,
    importX: true,
    perfectionist: true,
    zod: true,
    tailwind: {
      entryPoint: '',
    },
    vue: true,
    nuxt: true,
    astro: true,
    test: {
      storybook: true,
      vitest: true,
      playwright: true,
      cypress: true,
    },
  },
});

export default config;
