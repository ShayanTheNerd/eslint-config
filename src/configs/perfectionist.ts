import type { Linter } from 'eslint';
import type { Options } from '#types/index.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

import { mergeConfigs } from 'eslint-flat-config-utils';
import eslintPluginPerfectionist from 'eslint-plugin-perfectionist';

import { globs } from '#helpers/globs.ts';
import { isTruthy } from '#utils/isTruthy.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { getPerfectionistRules } from '#rules/perfectionist.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';

function getPerfectionistConfig(options: DeepNonNullable<Options>): Linter.Config {
  const { vue, astro, perfectionist } = options.configs;
  const { sortType, overrides } = isEnabled(perfectionist) ? perfectionist : defaultOptions.configs.perfectionist;

  const perfectionistConfig = {
    name: 'shayanthenerd/perfectionist',
    files: [
      globs.src,
      globs.jsxLike,
      isEnabled(vue) ? globs.vue : '',
      isEnabled(astro) ? globs.astro : '',
    ].filter(isTruthy),
    plugins: {
      perfectionist: eslintPluginPerfectionist,
    },
    settings: {
      perfectionist: {
        type: sortType,
        specialCharacters: 'trim',
        fallbackSort: {
          order: 'asc',
          type: 'natural',
        },
      },
    },
    rules: getPerfectionistRules(options),
  } satisfies Linter.Config;

  return mergeConfigs(perfectionistConfig, overrides);
}

export { getPerfectionistConfig };
