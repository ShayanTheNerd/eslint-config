import type { Linter } from 'eslint';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options, ConfigObject } from '#types/index.d.ts';

import { mergeConfigs } from 'eslint-flat-config-utils';
import eslintPluginStylistic from '@stylistic/eslint-plugin';

import { globs } from '#helpers/globs.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { getStylisticRules } from '#rules/stylistic.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';

type StylisticRules = ReturnType<typeof getStylisticRules>;
type StylisticConfig = Linter.Config & { rules: StylisticRules };

function getStylisticConfig(options: DeepNonNullable<Options>): StylisticConfig {
  const { vue, astro, stylistic } = options.configs;
  const { overrides } = isEnabled(stylistic) ? stylistic : defaultOptions.configs.stylistic;

  const stylisticConfig = {
    name: 'shayanthenerd/stylistic',
    files: [globs.src, isEnabled(vue) ? globs.vue : '', isEnabled(astro) ? globs.astro : ''].filter(Boolean),
    plugins: {
      '@stylistic': eslintPluginStylistic,
    },
    rules: getStylisticRules(options),
  } satisfies ConfigObject;

  /* @ts-expect-error — Incompatible types */
  return mergeConfigs(stylisticConfig, overrides);
}

export { getStylisticConfig };
