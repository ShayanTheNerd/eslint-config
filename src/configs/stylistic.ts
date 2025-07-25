import type { Linter } from 'eslint';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options, ConfigObject } from '#types/index.d.ts';

import { mergeConfigs } from 'eslint-flat-config-utils';
import eslintPluginStylistic from '@stylistic/eslint-plugin';

import { globs } from '#utils/globs.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { getStylisticRules } from '#rules/stylistic.ts';
import { defaultOptions } from '#utils/options/defaultOptions.ts';

function getStylisticConfig(options: DeepNonNullable<Options>): Linter.Config {
	const { stylistic } = options.configs;
	const { overrides } = isEnabled(stylistic) ? stylistic : defaultOptions.configs.stylistic;
	const stylisticConfig = {
		name: 'shayanthenerd/stylistic',
		files: [globs.src, options.configs.vue ? globs.vue : ''],
		extends: [eslintPluginStylistic.configs.recommended],
		rules: getStylisticRules(options),
	} satisfies ConfigObject;

	/* @ts-expect-error - Incompatible `parser` types */
	return mergeConfigs(stylisticConfig, overrides);
}

export { getStylisticConfig };
