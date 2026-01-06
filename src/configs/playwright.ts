import type { Linter } from 'eslint';
import type { FlatConfig } from 'typescript-eslint';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options, ConfigObject } from '#types/index.d.ts';

import { mergeConfigs } from 'eslint-flat-config-utils';
import eslintPluginPlaywright from 'eslint-plugin-playwright';

import { globs } from '#utils/globs.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { getPlaywrightRules } from '#rules/playwright.ts';
import { defaultOptions } from '#utils/options/defaultOptions.ts';

type PlaywrightRules = ReturnType<typeof getPlaywrightRules>;
type PlaywrightConfig = Linter.Config & { rules: PlaywrightRules };

function getPlaywrightConfig(options: DeepNonNullable<Options>): PlaywrightConfig {
  const { playwright } = options.configs.test;
  const { overrides } = isEnabled(playwright) ? playwright : defaultOptions.configs.test.playwright;

  const playwrightConfig = {
    name: 'shayanthenerd/playwright',
    files: [globs.test],
    plugins: {
      playwright: eslintPluginPlaywright,
    },
    languageOptions: {
      globals: eslintPluginPlaywright.configs['flat/recommended'].languageOptions?.globals as FlatConfig.GlobalsConfig,
    },
    rules: getPlaywrightRules(options),
  } satisfies ConfigObject;

  /* @ts-expect-error — `mergeConfigs` Incorrect type inference */
  return mergeConfigs(playwrightConfig, overrides);
}

export { getPlaywrightConfig };
