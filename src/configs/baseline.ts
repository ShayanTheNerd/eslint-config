import type { ESLint, Linter } from 'eslint';
import type { Options } from '#types/index.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

import eslintPluginBaselineJs from 'eslint-plugin-baseline-js';

import { globs } from '#helpers/globs.ts';
import { isTruthy } from '#utils/isTruthy.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { getBaselineRules } from '#rules/baseline.ts';

function getBaselineConfig(options: DeepNonNullable<Options>) {
  const { vue, astro } = options.configs;

  const baselineConfig = {
    name: 'shayanthenerd/baseline',
    files: [globs.src, isEnabled(vue) ? globs.vue : '', isEnabled(astro) ? globs.astro : ''].filter(isTruthy),
    ignores: [globs.test, globs.coverage],
    plugins: {
      /* eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion */
      'baseline-js': eslintPluginBaselineJs as ESLint.Plugin,
    },
    rules: getBaselineRules(options),
  } satisfies Linter.Config;

  return baselineConfig;
}

export { getBaselineConfig };
