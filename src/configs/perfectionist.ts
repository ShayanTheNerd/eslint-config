import type { Linter } from 'eslint';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options, ConfigObject } from '#types/index.d.ts';

import { mergeConfigs } from 'eslint-flat-config-utils';
import eslintPluginPerfectionist from 'eslint-plugin-perfectionist';

import { globs } from '#utils/globs.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { getPerfectionistRules } from '#rules/perfectionist.ts';
import { defaultOptions } from '#utils/options/defaultOptions.ts';

function getPerfectionistConfig(options: DeepNonNullable<Options>): Linter.Config {
	const { vue, perfectionist } = options.configs;
	const { sortType, overrides } = isEnabled(perfectionist) ? perfectionist : defaultOptions.configs.perfectionist;

	const perfectionistConfig = {
		name: 'shayanthenerd/perfectionist',
		files: [globs.src, vue ? globs.vue : ''],
		plugins: {
			perfectionist: eslintPluginPerfectionist,
		},
		settings: {
			perfectionist: {
				type: sortType,
			},
		},
		rules: getPerfectionistRules(options),
	} satisfies ConfigObject;

	/* @ts-expect-error - Incompatible `parser` types */
	return mergeConfigs(perfectionistConfig, overrides);
}

export { getPerfectionistConfig };
