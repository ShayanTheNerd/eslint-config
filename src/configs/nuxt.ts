import type { Linter } from 'eslint';
import type { Options } from '#types/index.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { CoreRules, PluginRules } from '#types/eslintRules.d.ts';

import eslintPluginVue from 'eslint-plugin-vue';
import eslintPluginNuxt from '@nuxt/eslint-plugin';
import { mergeConfigs } from 'eslint-flat-config-utils';
import eslintPluginNuxtLinkChecker from 'nuxt-link-checker/eslint';
import { parser as eslintParserTypeScript } from 'typescript-eslint';

import { globs } from '#helpers/globs.ts';
import { getNuxtRules } from '#rules/nuxt.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';

const baseVueConfig = eslintPluginVue.configs['flat/base'].find((config) => config.languageOptions?.parser);

const middlewaresConfig = {
  name: 'shayanthenerd/nuxt/middlewares',
  files: [globs.nuxtMiddlewares],
  rules: {
    'consistent-return': 'off',
    '@typescript-eslint/consistent-return': 'off',
  } satisfies CoreRules | PluginRules<'@typescript-eslint'>,
} satisfies Linter.Config;

const componentNamesConfig = {
  name: 'shayanthenerd/nuxt/component-names',
  files: [globs.nuxtAppErrorLayoutsPages],
  rules: {
    'vue/match-component-file-name': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/component-definition-name-casing': 'off',
  } satisfies PluginRules<'vue'>,
} satisfies Linter.Config;

const serverComponentsConfig = {
  name: 'shayanthenerd/nuxt/server-components',
  files: [globs.nuxtServerComponents],
  plugins: {
    vue: eslintPluginVue,
  },
  rules: {
    'vue/no-multiple-template-root': 'error',
  } satisfies PluginRules<'vue'>,
} satisfies Linter.Config;

function getNuxtConfigs(options: DeepNonNullable<Options>): Linter.Config[] {
  const { nuxt } = options.configs;
  const { overrides } = isEnabled(nuxt) ? nuxt : defaultOptions.configs.nuxt;

  const config = {
    name: 'shayanthenerd/nuxt',
    files: [globs.vue],
    plugins: {
      'vue': eslintPluginVue,
      'nuxt': eslintPluginNuxt,
      'link-checker': eslintPluginNuxtLinkChecker,
    },
    processor: 'vue/vue',
    languageOptions: {
      parser: baseVueConfig?.languageOptions?.parser,
      parserOptions: {
        parser: eslintParserTypeScript,
        extraFileExtensions: ['.vue'],
        vueFeatures: {
          filter: false,
        },
      },
    },
    rules: getNuxtRules(),
  } satisfies Linter.Config;

  const baseConfig = mergeConfigs(config, overrides);

  return [baseConfig, middlewaresConfig, componentNamesConfig, serverComponentsConfig];
}

export { getNuxtConfigs };
