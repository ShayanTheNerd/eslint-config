import type { Linter } from 'eslint';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options, ConfigObject } from '#types/index.d.ts';

import { mergeConfigs } from 'eslint-flat-config-utils';
import eslintPluginStylistic from '@stylistic/eslint-plugin';

import { globs } from '#utils/globs.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { getStylisticRules } from '#rules/stylistic.ts';
import { defaultOptions } from '#utils/options/defaultOptions.ts';

type StylisticRules = ReturnType<typeof getStylisticRules>;
type StylisticConfig = Linter.Config & { rules: StylisticRules };

function getStylisticConfig(options: DeepNonNullable<Options>): StylisticConfig {
	const { vue, stylistic } = options.configs;
	const { overrides } = isEnabled(stylistic) ? stylistic : defaultOptions.configs.stylistic;

	const stylisticConfig = {
		name: 'shayanthenerd/stylistic',
		files: isEnabled(vue) ? [globs.src, globs.vue] : [globs.src],
		plugins: {
			'@stylistic': eslintPluginStylistic,
		},
		rules: getStylisticRules(options),
	} satisfies ConfigObject;

	/* @ts-expect-error — Incompatible `parser` types */
	return mergeConfigs(stylisticConfig, overrides);
}

export { getStylisticConfig };
