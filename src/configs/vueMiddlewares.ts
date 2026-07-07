import type { Linter } from 'eslint';
import type { CoreRules, PluginRules } from '#types/eslintRules.d.ts';

import { globs } from '#helpers/globs.ts';

function getVueMiddlewaresConfig() {
  const vueMiddlewaresConfig = {
    name: 'shayanthenerd/vue/middlewares',
    files: [globs.vueMiddlewares],
    rules: {
      'consistent-return': 'off',
      '@typescript-eslint/consistent-return': 'off',
    } satisfies CoreRules | PluginRules<'@typescript-eslint'>,
  } satisfies Linter.Config;

  return vueMiddlewaresConfig;
}

export { getVueMiddlewaresConfig };
