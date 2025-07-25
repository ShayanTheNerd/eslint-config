import type { Linter } from 'eslint';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options, ConfigObject } from '#types/index.d.ts';

import { mergeConfigs } from 'eslint-flat-config-utils';
import eslintPluginStorybook from 'eslint-plugin-storybook';

import { globs } from '#utils/globs.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { getStorybookRules } from '#rules/storybook.ts';
import { defaultOptions } from '#utils/options/defaultOptions.ts';

/* @ts-expect-error - Incorrect type definition for the `configs` property */
const eslintConfigStorybook = eslintPluginStorybook.configs['flat/recommended']; // eslint-disable-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment

function getStorybookConfig(options: DeepNonNullable<Options>): Linter.Config {
	const { storybook } = options.configs.test;
	const { overrides } = isEnabled(storybook) ? storybook : defaultOptions.configs.test.storybook;

	const storybookConfig = {
		name: 'shayanthenerd/storybook',
		files: [globs.storybook],
		extends: [eslintConfigStorybook],
		rules: getStorybookRules(options),
	} satisfies ConfigObject;

	return mergeConfigs(storybookConfig, overrides);
}

export { getStorybookConfig };
