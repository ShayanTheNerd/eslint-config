import type { Linter } from 'eslint';
import type { Options } from '#types/index.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

import eslintPluginVue from 'eslint-plugin-vue';
import { mergeConfigs } from 'eslint-flat-config-utils';
import { parser as eslintParserTypeScript } from 'typescript-eslint';
import eslintPluginVueAccessibility from 'eslint-plugin-vuejs-accessibility';

import { globs } from '#helpers/globs.ts';
import { getVueRules } from '#rules/vue.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';
import { getVueAccessibilityRules } from '#rules/vueAccessibility.ts';

const baseVueConfig = eslintPluginVue.configs['flat/base'].find((config) => config.languageOptions?.parser);

function getVueConfig(options: DeepNonNullable<Options>): Linter.Config {
  const { vue } = options.configs;
  const isVueAccessibilityEnabled = isEnabled(vue) && isEnabled(vue.accessibility);
  const { overrides } = isEnabled(vue) ? vue : defaultOptions.configs.vue;

  const vueConfig = {
    name: 'shayanthenerd/vue',
    files: [globs.vue],
    plugins: {
      vue: eslintPluginVue,
      ...(isVueAccessibilityEnabled && { 'vuejs-accessibility': eslintPluginVueAccessibility }),
    },
    processor: 'vue/vue',
    languageOptions: {
      globals: eslintPluginVueAccessibility.configs['flat/recommended'][0].languageOptions.globals,
      parser: baseVueConfig?.languageOptions?.parser,
      parserOptions: {
        parser: eslintParserTypeScript,
        extraFileExtensions: ['.vue'],
        vueFeatures: {
          filter: false,
        },
      },
    },
    rules: {
      ...getVueRules(options),
      ...(isVueAccessibilityEnabled && getVueAccessibilityRules(options)),
    },
  } satisfies Linter.Config;

  return mergeConfigs(vueConfig, overrides);
}

export { getVueConfig };
