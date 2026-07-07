import type { Linter } from 'eslint';
import type { Options } from '#types/index.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

import eslintPluginZod from 'eslint-plugin-zod';
import { mergeConfigs } from 'eslint-flat-config-utils';
import eslintPluginZodMini from 'eslint-plugin-zod-mini';

import { globs } from '#helpers/globs.ts';
import { getZodRules } from '#rules/zod.ts';
import { isTruthy } from '#utils/isTruthy.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';

function getZodConfig(options: DeepNonNullable<Options>): Linter.Config {
  const { zod, vue, astro } = options.configs;
  const { mini, overrides } = isEnabled(zod) ? zod : defaultOptions.configs.zod;

  const zodConfig = {
    name: `shayanthenerd/${mini ? 'zod-mini' : 'zod'}`,
    files: [
      globs.src,
      globs.jsxLike,
      isEnabled(vue) ? globs.vue : '',
      isEnabled(astro) ? globs.astro : '',
    ].filter(isTruthy),
    plugins: mini ? { 'zod-mini': eslintPluginZodMini } : { zod: eslintPluginZod },
    rules: getZodRules(options),
  } satisfies Linter.Config;

  return mergeConfigs(zodConfig, overrides);
}

export { getZodConfig };
