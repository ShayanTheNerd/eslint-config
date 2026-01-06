import type { Linter } from 'eslint';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options, ConfigObject } from '#types/index.d.ts';

import eslintPluginVue from 'eslint-plugin-vue';
import { mergeConfigs } from 'eslint-flat-config-utils';
import { parser as eslintParserTypeScript } from 'typescript-eslint';
import eslintPluginVueAccessibility from 'eslint-plugin-vuejs-accessibility';

import { globs } from '#helpers/globs.ts';
import { getVueRules } from '#rules/vue.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';
import { getVueAccessibilityRules } from '#rules/vueAccessibility.ts';

const vueSetupConfig = eslintPluginVue.configs['flat/recommended'].find((config) => {
  return config.name === 'vue/base/setup-for-vue';
}) as ConfigObject;
vueSetupConfig.name = 'setup';

type VueRules = ReturnType<typeof getVueRules>;
type VueAccessibilityRules = ReturnType<typeof getVueAccessibilityRules>;
type VueConfig = Linter.Config & { rules: VueRules & VueAccessibilityRules };

function getVueConfig(options: DeepNonNullable<Options>): VueConfig {
  const { vue } = options.configs;
  const accessibility = isEnabled(vue) && isEnabled(vue.accessibility);
  const { overrides } = isEnabled(vue) ? vue : defaultOptions.configs.vue;

  const vueConfig = {
    name: 'shayanthenerd/vue',
    files: [globs.vue],
    extends: [vueSetupConfig], // Required for `vue/comment-directive` rule to work correctly.
    plugins: {
      vue: eslintPluginVue,
      ...(accessibility && { 'vuejs-accessibility': eslintPluginVueAccessibility }),
    },
    languageOptions: {
      globals: eslintPluginVueAccessibility.configs['flat/recommended'][0]?.languageOptions.globals,
      parser: vueSetupConfig.languageOptions?.parser,
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
      ...(accessibility && getVueAccessibilityRules(options)),
    },
  } satisfies ConfigObject;

  /* @ts-expect-error — Incompatible `parser` types */
  return mergeConfigs(vueConfig, overrides);
}

export { getVueConfig };
