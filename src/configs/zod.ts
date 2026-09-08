import type { Linter } from 'eslint';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options } from '#types/index.d.ts';

import { mergeConfigs } from 'eslint-flat-config-utils';
import eslintPluginZod from 'eslint-plugin-zod';
import eslintPluginZodMini from 'eslint-plugin-zod-mini';

import { globs } from '#helpers/globs.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';
import { getZodRules } from '#rules/zod.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { isTruthy } from '#utils/isTruthy.ts';

function getZodConfig(options: DeepNonNullable<Options>): Linter.Config {
  const { zod, vue, astro } = options.configs;
  const { mini, overrides } = isEnabled(zod) ? zod : defaultOptions.configs.zod;

  const zodConfig = {
    name: `shayanthenerd/${mini ? 'zod-mini' : 'zod'}`,
    files: [
      globs.src,
      globs.jsxTsx,
      isEnabled(vue) ? globs.vue : '',
      isEnabled(astro) ? globs.astro : '',
    ].filter(isTruthy),
    plugins: mini ? { 'zod-mini': eslintPluginZodMini } : { zod: eslintPluginZod },
    rules: getZodRules(options),
  } satisfies Linter.Config;

  return mergeConfigs(zodConfig, overrides);
}

export { getZodConfig };
