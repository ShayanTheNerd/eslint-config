import type { Linter } from 'eslint';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options, ConfigObject } from '#types/index.d.ts';

import { mergeConfigs } from 'eslint-flat-config-utils';
import eslintPluginStorybook from 'eslint-plugin-storybook';

import { globs } from '#helpers/globs.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { getStorybookRules } from '#rules/storybook.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';

type StorybookRules = ReturnType<typeof getStorybookRules>;
type StorybookConfig = Linter.Config & { rules: StorybookRules };

function getStorybookConfig(options: DeepNonNullable<Options>): StorybookConfig {
  const { storybook } = options.configs.test;
  const { overrides } = isEnabled(storybook) ? storybook : defaultOptions.configs.test.storybook;

  const storybookConfig = {
    name: 'shayanthenerd/storybook',
    files: [globs.storybook],
    plugins: {
      storybook: eslintPluginStorybook,
    },
    rules: getStorybookRules(options),
  } satisfies ConfigObject;

  /* @ts-expect-error — Incorrect type inference */
  return mergeConfigs(storybookConfig, overrides);
}

export { getStorybookConfig };
