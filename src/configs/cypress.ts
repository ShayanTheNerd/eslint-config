import type { Linter } from 'eslint';
import type { FlatConfig } from 'typescript-eslint';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options, ConfigObject } from '#types/index.d.ts';

import { mergeConfigs } from 'eslint-flat-config-utils';
import eslintPluginCypress from 'eslint-plugin-cypress';

import { globs } from '#utils/globs.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { getCypressRules } from '#rules/cypress.ts';
import { defaultOptions } from '#utils/options/defaultOptions.ts';

type CypressRules = ReturnType<typeof getCypressRules>;
type CypressConfig = Linter.Config & { rules: CypressRules };

function getCypressConfig(options: DeepNonNullable<Options>): CypressConfig {
	const { cypress } = options.configs.test;
	const { overrides } = isEnabled(cypress) ? cypress : defaultOptions.configs.test.cypress;

	const cypressConfig = {
		name: 'shayanthenerd/cypress',
		files: [globs.test],
		plugins: {
			cypress: eslintPluginCypress,
		},
		languageOptions: {
			globals: eslintPluginCypress.configs.recommended.languageOptions?.globals as FlatConfig.GlobalsConfig,
		},
		rules: getCypressRules(),
	} satisfies ConfigObject;

	/* @ts-expect-error — `mergeConfigs` Incorrect type inference */
	return mergeConfigs(cypressConfig, overrides);
}

export { getCypressConfig };
