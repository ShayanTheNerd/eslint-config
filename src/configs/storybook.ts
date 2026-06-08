import type { ESLint, Linter } from 'eslint';
import type { Options } from '#types/index.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

import { mergeConfigs } from 'eslint-flat-config-utils';
import eslintPluginStorybook from 'eslint-plugin-storybook';

import { globs } from '#helpers/globs.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { getStorybookRules } from '#rules/storybook.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';

function getStorybookConfig(options: DeepNonNullable<Options>): Linter.Config {
  const { storybook } = options.configs.test;
  const { overrides } = isEnabled(storybook) ? storybook : defaultOptions.configs.test.storybook;

  const storybookConfig = {
    name: 'shayanthenerd/storybook',
    files: [globs.storybook],
    plugins: {
      /* eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion */
      storybook: eslintPluginStorybook as unknown as ESLint.Plugin,
    },
    rules: getStorybookRules(options),
  } satisfies Linter.Config;

  return mergeConfigs(storybookConfig, overrides);
}

export { getStorybookConfig };
