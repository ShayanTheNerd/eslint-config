import type { ESLint, Linter } from 'eslint';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options, ConfigObject } from '#types/index.d.ts';

import typescriptESLint from 'typescript-eslint';

import { globs } from '#utils/globs.ts';

function getCommonsConfig(options: DeepNonNullable<Options>): Linter.Config {
	const { typescript, base: { preferNamedExports } } = options.configs;

	const commonsConfig = {
		name: 'shayanthenerd/commons',
		files: [globs.commons],
		ignores: [globs.commonsIgnore],
		plugins: {
			'@typescript-eslint': typescriptESLint.plugin as ESLint.Plugin,
		},
		rules: {
			'@typescript-eslint/explicit-function-return-type': typescript ? 'error' : 'off',
			'no-restricted-exports': [
				preferNamedExports ? 'error' : 'off',
				{
					restrictDefaultExports: {
						named: true,
						direct: true,
						namedFrom: true,
						namespaceFrom: true,
					},
				},
			],
		},
	} satisfies ConfigObject;

	return commonsConfig;
}

export { getCommonsConfig };
