import type { Linter } from 'eslint';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options, ConfigObject } from '#types/index.d.ts';

import eslintPluginZod from 'eslint-plugin-zod';
import { mergeConfigs } from 'eslint-flat-config-utils';
import eslintPluginZodMini from 'eslint-plugin-zod-mini';

import { globs } from '#helpers/globs.ts';
import { getZodRules } from '#rules/zod.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';

type ZodRules = ReturnType<typeof getZodRules>;
type ZodConfig = Linter.Config & { rules: ZodRules };

function getZodConfig(options: DeepNonNullable<Options>): ZodConfig {
  const { zod, vue, astro } = options.configs;
  const { mini, overrides } = isEnabled(zod) ? zod : defaultOptions.configs.zod;

  const zodConfig = {
    name: `shayanthenerd/${mini ? 'zod-mini' : 'zod'}`,
    files: [globs.src, isEnabled(vue) ? globs.vue : '', isEnabled(astro) ? globs.astro : ''].filter(Boolean),
    plugins: mini ? { 'zod-mini': eslintPluginZodMini } : { zod: eslintPluginZod },
    rules: getZodRules(options),
  } satisfies ConfigObject;

  /* @ts-expect-error — Incorrect type inference */
  return mergeConfigs(zodConfig, overrides);
}

export { getZodConfig };
