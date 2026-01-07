import type { Linter } from 'eslint';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options, ConfigObject } from '#types/index.d.ts';

import { mergeConfigs } from 'eslint-flat-config-utils';
import eslintPluginTailwind from 'eslint-plugin-better-tailwindcss';
import path from 'node:path';

import { globs } from '#helpers/globs.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { getTailwindRules } from '#rules/tailwind.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';

const vueAttributes = [
  ['^v-bind:ui$', [
    { match: 'objectValues' },
  ]],
  ['^(?:v-bind:)?(class|activeClass|inactiveClass)$', [
    { match: 'strings' },
    { match: 'objectKeys' },
    { match: 'objectValues' },
  ]],
] as const;

type TailwindRules = ReturnType<typeof getTailwindRules>;
type TailwindConfig = Linter.Config & { rules: TailwindRules };

function getTailwindConfig(options: DeepNonNullable<Options>): TailwindConfig {
  const {
    tsConfig,
    configs: {
      vue,
      html,
      tailwind,
    },
  } = options;
  const { config, entryPoint, overrides } = isEnabled(tailwind) ? tailwind : defaultOptions.configs.tailwind;

  const tailwindConfig = {
    name: 'shayanthenerd/tailwind',
    files: [
      globs.src,
      isEnabled(vue) ? globs.vue : '',
      isEnabled(html) ? globs.html : '',
    ].filter(Boolean),
    plugins: {
      'better-tailwindcss': eslintPluginTailwind,
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: entryPoint || undefined,
        tailwindConfig: config || undefined,
        attributes: isEnabled(vue) ? vueAttributes : undefined,
        tsconfig: tsConfig ? path.resolve(tsConfig.rootDir, tsConfig.filename) : undefined,
      },
    },
    rules: getTailwindRules(options),
  } satisfies ConfigObject;

  /* @ts-expect-error — Incompatible types */
  return mergeConfigs(tailwindConfig, overrides);
}

export { getTailwindConfig };
