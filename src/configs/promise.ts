import type { ESLint, Linter } from 'eslint';
import type { Options } from '#types/index.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

import { mergeConfigs } from 'eslint-flat-config-utils';
/* @ts-expect-error -- https://github.com/eslint-community/eslint-plugin-promise/issues/488 */
import eslintPluginPromise from 'eslint-plugin-promise';

import { globs } from '#helpers/globs.ts';
import { isTruthy } from '#utils/isTruthy.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { getPromiseRules } from '#rules/promise.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';

function getPromiseConfig(options: DeepNonNullable<Options>): Linter.Config {
  const { vue, astro, promise } = options.configs;
  const { overrides } = isEnabled(promise) ? promise : defaultOptions.configs.promise;

  const promiseConfig = {
    name: 'shayanthenerd/promise',
    files: [
      globs.src,
      globs.jsxLike,
      isEnabled(vue) ? globs.vue : '',
      isEnabled(astro) ? globs.astro : '',
    ].filter(isTruthy),
    plugins: {
      /* eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion */
      promise: eslintPluginPromise as ESLint.Plugin,
    },
    rules: getPromiseRules(),
  } satisfies Linter.Config;

  return mergeConfigs(promiseConfig, overrides);
}

export { getPromiseConfig };
