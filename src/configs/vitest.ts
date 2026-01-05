import type { Linter } from 'eslint';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options, ConfigObject } from '#types/index.d.ts';

import eslintPluginVitest from '@vitest/eslint-plugin';
import { mergeConfigs } from 'eslint-flat-config-utils';

import { globs } from '#utils/globs.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { getVitestRules } from '#rules/vitest.ts';
import { defaultOptions } from '#utils/options/defaultOptions.ts';

type VitestRules = ReturnType<typeof getVitestRules>;
type VitestConfig = Linter.Config & { rules: VitestRules };

function getVitestConfig(options: DeepNonNullable<Options>): VitestConfig {
	const { vitest } = options.configs.test;
	const { overrides } = isEnabled(vitest) ? vitest : defaultOptions.configs.test.vitest;

	const vitestConfig = {
		name: 'shayanthenerd/vitest',
		files: [globs.test],
		plugins: {
			vitest: eslintPluginVitest,
		},
		rules: getVitestRules(options),
	} satisfies ConfigObject;

	/* @ts-expect-error — Incorrect type inference */
	return mergeConfigs(vitestConfig, overrides);
}

export { getVitestConfig };
