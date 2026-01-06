import type { Linter } from 'eslint';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options, ConfigObject } from '#types/index.d.ts';

import eslintPluginVue from 'eslint-plugin-vue';
import { mergeConfigs } from 'eslint-flat-config-utils';
import eslintPluginHTML from '@html-eslint/eslint-plugin';
import eslintPluginTailwind from 'eslint-plugin-better-tailwindcss';
import path from 'node:path';

import { globs } from '#helpers/globs.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { getTailwindRules } from '#rules/tailwind.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';

/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */
const eslintParserHTML = (eslintPluginHTML.configs?.['flat/recommended'] as ConfigObject)?.languageOptions?.parser;
const eslintParserVue = eslintPluginVue.configs['flat/recommended'].find((config) => {
  return config.name === 'vue/base/setup-for-vue';
})?.languageOptions?.parser;

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
      vue ? globs.vue : '',
      html ? globs.html : '',
    ].filter(Boolean),
    plugins: {
      'better-tailwindcss': eslintPluginTailwind,
    },
    languageOptions: {
      parserOptions: {
        parser: isEnabled(html) ? eslintParserHTML : eslintParserVue,
      },
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
