import type { Linter } from 'eslint';
import type { Options } from '#types/index.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

import { mergeConfigs } from 'eslint-flat-config-utils';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

import { globs } from '#helpers/globs.ts';
import { isTruthy } from '#utils/isTruthy.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { getUnicornRules } from '#rules/unicorn.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';

function getUnicornConfig(options: DeepNonNullable<Options>): Linter.Config {
  const { vue, astro, unicorn } = options.configs;
  const { overrides } = isEnabled(unicorn) ? unicorn : defaultOptions.configs.unicorn;

  const astroConfig = {
    name: 'shayanthenerd/unicorn',
    files: [globs.src, isEnabled(vue) ? globs.vue : '', isEnabled(astro) ? globs.astro : ''].filter(isTruthy),
    plugins: {
      unicorn: eslintPluginUnicorn,
    },
    rules: getUnicornRules(),
  } satisfies Linter.Config;

  return mergeConfigs(astroConfig, overrides);
}

export { getUnicornConfig };
