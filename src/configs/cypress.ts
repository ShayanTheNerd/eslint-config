import type { Linter } from 'eslint';
import type { Options } from '#types/index.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

import { mergeConfigs } from 'eslint-flat-config-utils';
import eslintPluginCypress from 'eslint-plugin-cypress';

import { globs } from '#helpers/globs.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { getCypressRules } from '#rules/cypress.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';

function getCypressConfig(options: DeepNonNullable<Options>): Linter.Config {
  const { cypress } = options.configs.test;
  const { overrides } = isEnabled(cypress) ? cypress : defaultOptions.configs.test.cypress;

  const cypressConfig = {
    name: 'shayanthenerd/cypress',
    files: [globs.test],
    plugins: {
      cypress: eslintPluginCypress,
    },
    languageOptions: {
      globals: eslintPluginCypress.configs.recommended.languageOptions?.globals,
    },
    rules: getCypressRules(),
  } satisfies Linter.Config;

  return mergeConfigs(cypressConfig, overrides);
}

export { getCypressConfig };
