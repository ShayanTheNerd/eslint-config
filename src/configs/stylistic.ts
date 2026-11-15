import type { Linter } from 'eslint';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options } from '#types/index.d.ts';

import { mergeConfigs } from 'eslint-flat-config-utils';
/* @ts-expect-error -- https://github.com/eslint-stylistic/eslint-stylistic/issues/1331 */
import eslintPluginStylistic from '@stylistic/eslint-plugin';

import { globs } from '#helpers/globs.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';
import { getStylisticRules } from '#rules/stylistic.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { isTruthy } from '#utils/isTruthy.ts';

function getStylisticConfig(options: DeepNonNullable<Options>): Linter.Config {
  const { vue, astro, stylistic } = options.configs;
  const { overrides } = isEnabled(stylistic) ? stylistic : defaultOptions.configs.stylistic;

  const stylisticConfig = {
    name: 'shayanthenerd/stylistic',
    files: [
      globs.src,
      globs.jsxTsx,
      isEnabled(vue) ? globs.vue : '',
      isEnabled(astro) ? globs.astro : '',
    ].filter(isTruthy),
    plugins: {
      /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
      '@stylistic': eslintPluginStylistic,
    },
    rules: getStylisticRules(options),
  } satisfies Linter.Config;

  return mergeConfigs(stylisticConfig, overrides);
}

export { getStylisticConfig };
