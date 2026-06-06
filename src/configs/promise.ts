import type { ESLint, Linter } from 'eslint';
import type { Options } from '#types/index.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

import { mergeConfigs } from 'eslint-flat-config-utils';
/* @ts-expect-error — https://github.com/eslint-community/eslint-plugin-promise/issues/488 */
import eslintPluginPromise from 'eslint-plugin-promise';

import { globs } from '#helpers/globs.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { getPromiseRules } from '#rules/promise.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';

type PromiseRules = ReturnType<typeof getPromiseRules>;
type PromiseConfig = Linter.Config & { rules: PromiseRules };

function getPromiseConfig(options: DeepNonNullable<Options>): PromiseConfig {
  const { vue, astro, promise } = options.configs;
  const { overrides } = isEnabled(promise) ? promise : defaultOptions.configs.promise;

  const promiseConfig = {
    name: 'shayanthenerd/promise',
    files: [globs.src, isEnabled(vue) ? globs.vue : '', isEnabled(astro) ? globs.astro : ''].filter(Boolean),
    plugins: {
      promise: eslintPluginPromise as ESLint.Plugin,
    },
    rules: getPromiseRules(),
  } satisfies Linter.Config;

  /* @ts-expect-error — Incompatible types */
  return mergeConfigs(promiseConfig, overrides);
}

export { getPromiseConfig };
