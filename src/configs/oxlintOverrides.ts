import type { Linter } from 'eslint';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options, ConfigObject } from '#types/index.d.ts';

import eslintPluginVue from 'eslint-plugin-vue';
import typescriptESLint from 'typescript-eslint';
import eslintPluginVitest from '@vitest/eslint-plugin';
import eslintPluginPlaywright from 'eslint-plugin-playwright';

import { globs } from '#helpers/globs.ts';
import { getVueConfig } from '#configs/vue.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { getBaseConfig } from '#configs/base.ts';
import { getVitestConfig } from '#configs/vitest.ts';
import { getPlaywrightConfig } from '#configs/playwright.ts';
import { getTypeScriptConfig } from '#configs/typescript.ts';

/**
 * Prevent OXLint from overriding rules that are customizable via the configuration options.
*/
function getOXLintOverridesConfig(options: DeepNonNullable<Options>): Linter.Config {
  const {
    vue,
    typescript,
    test: {
      vitest,
      playwright,
    },
  } = options.configs;

  const vueRules = getVueConfig(options).rules;
  const vitestRules = getVitestConfig(options).rules;
  const javascriptRules = getBaseConfig(options).rules;
  const typescriptRules = getTypeScriptConfig(options).rules;
  const playwrightRules = getPlaywrightConfig(options).rules;

  const oxlintOverridesConfig = {
    name: 'shayanthenerd/oxlint/overrides',
    files: [
      globs.src,
      isEnabled(vue) ? globs.vue : '',
      (isEnabled(vitest) || isEnabled(playwright)) ? globs.test : '',
    ].filter(Boolean),
    plugins: {
      ...(isEnabled(vue) && { vue: eslintPluginVue }),
      ...(isEnabled(vitest) && { vitest: eslintPluginVitest }),
      ...(isEnabled(playwright) && { playwright: eslintPluginPlaywright }),
      ...(isEnabled(typescript) && { '@typescript-eslint': typescriptESLint.plugin }),
    },
    rules: {
      'max-depth': javascriptRules['max-depth'],
      'func-style': javascriptRules['func-style'],
      'max-nested-callbacks': javascriptRules['max-nested-callbacks'],

      '@typescript-eslint/consistent-type-definitions': isEnabled(typescript)
        ? typescriptRules['@typescript-eslint/consistent-type-definitions']
        : 'off',

      'playwright/max-nested-describe': isEnabled(playwright)
        ? playwrightRules['playwright/max-nested-describe']
        : 'off',

      'vitest/consistent-test-it': isEnabled(vitest) ? vitestRules['vitest/consistent-test-it'] : 'off',
      'vitest/max-nested-describe': isEnabled(vitest) ? vitestRules['vitest/max-nested-describe'] : 'off',

      'vue/define-props-destructuring': isEnabled(vue) ? vueRules['vue/define-props-destructuring'] : 'off',
    },
  } satisfies ConfigObject;

  return oxlintOverridesConfig;
}

export { getOXLintOverridesConfig };
