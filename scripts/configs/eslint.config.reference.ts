import type { Linter } from 'eslint';

import { defineConfig } from '../../src/index.ts';

const config: Linter.Config[] = defineConfig({
  autoDetectDeps: false,
  configs: {
    astro: true,
    css: true,
    html: true,
    importX: true,
    markdown: true,
    next: true,
    node: true,
    nuxt: {
      image: true,
    },
    packageJson: true,
    perfectionist: true,
    promise: true,
    stylistic: true,
    tailwind: {
      entryPoint: '',
    },
    test: {
      cypress: true,
      playwright: true,
      storybook: true,
      vitest: true,
    },
    typescript: true,
    unicorn: true,
    vue: true,
    zod: true,
  },
});

export default config;
