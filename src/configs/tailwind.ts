import type { Linter } from 'eslint';
import type { Selector } from 'eslint-plugin-better-tailwindcss/types';
import type { Options } from '#types/index.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

import { mergeConfigs } from 'eslint-flat-config-utils';
import eslintPluginTailwind from 'eslint-plugin-better-tailwindcss';
import { getDefaultSelectors } from 'eslint-plugin-better-tailwindcss/defaults';
import { MatcherType, SelectorKind } from 'eslint-plugin-better-tailwindcss/types';
import path from 'node:path';

import { globs } from '#helpers/globs.ts';
import { isTruthy } from '#utils/isTruthy.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { getTailwindRules } from '#rules/tailwind.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';

const astroAttribute = {
  kind: SelectorKind.Attribute,
  name: '^class:list$',
  match: [
    { type: MatcherType.String },
    { type: MatcherType.ObjectKey },
  ],
} satisfies Selector;

const vueAttributes = [
  {
    kind: SelectorKind.Attribute,
    name: '^v-bind:ui$',
    match: [
      { type: MatcherType.ObjectValue },
    ],
  },
  {
    kind: SelectorKind.Attribute,
    name: '^(?:v-bind:)?(activeClass|inactiveClass|active-class|inactive-class)$',
    match: [
      { type: MatcherType.String },
      { type: MatcherType.ObjectKey },
    ],
  },
] satisfies Selector[];

function getTailwindConfig(options: DeepNonNullable<Options>): Linter.Config {
  const {
    tsConfig,
    configs: {
      vue,
      html,
      astro,
      tailwind,
    },
  } = options;
  const {
    cwd,
    config,
    entryPoint,
    overrides,
  } = isEnabled(tailwind) ? tailwind : defaultOptions.configs.tailwind;

  const tsconfig = tsConfig ? path.resolve(tsConfig.rootDir, tsConfig.filename) : undefined;
  const selectors = [
    ...getDefaultSelectors(),
    ...(isEnabled(vue) ? vueAttributes : []),
    isEnabled(astro) ? astroAttribute : undefined,
  ].filter(isTruthy);

  const tailwindConfig = {
    name: 'shayanthenerd/tailwind',
    files: [
      globs.src,
      isEnabled(vue) ? globs.vue : '',
      isEnabled(html) ? globs.html : '',
      isEnabled(astro) ? globs.astro : '',
    ].filter(isTruthy),
    plugins: {
      'better-tailwindcss': eslintPluginTailwind,
    },
    settings: {
      'better-tailwindcss': {
        cwd,
        tsconfig,
        selectors,
        entryPoint,
        tailwindConfig: config,
        detectComponentClasses: true,
      },
    },
    rules: getTailwindRules(options),
  } satisfies Linter.Config;

  return mergeConfigs(tailwindConfig, overrides);
}

export { getTailwindConfig };
