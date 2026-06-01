import type { Linter } from 'eslint';

import { defineConfig } from '../../src/index.ts';

const config: Linter.Config[] = defineConfig({
  autoDetectDeps: false,
  configs: {
    oxlint: 'src/oxlint.config.jsonc',
    typescript: true,
    promise: true,
    importX: true,
    stylistic: true,
    perfectionist: true,
    packageJson: true,
    markdown: true,
    html: true,
    css: true,
    tailwind: {
      entryPoint: '',
    },
    zod: true,
    astro: true,
    vue: true,
    nuxt: true,
    test: {
      storybook: true,
      vitest: true,
      playwright: true,
      cypress: true,
    },
  },
});

export default config;
