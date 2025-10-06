import type { Options } from '#types/index.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { CoreRules, PluginRules } from '#types/eslintRules.d.ts';

import { isEnabled } from '#utils/isEnabled.ts';
import { defaultOptions } from '#utils/options/defaultOptions.ts';

function getTypeScriptRules(options: DeepNonNullable<Options>) {
	const { typescript } = options.configs;
	const {
		typeDefinitionStyle,
		methodSignatureStyle,
	} = isEnabled(typescript) ? typescript : defaultOptions.configs.typescript;

	const tsRules = {
		'no-loop-func': 'off',
		'no-unused-vars': 'off',
		'default-param-last': 'off',
		'prefer-destructuring': 'off',

		'@typescript-eslint/no-loop-func': 'error',
		'@typescript-eslint/unbound-method': 'off',
		'@typescript-eslint/default-param-last': 'warn',
		'@typescript-eslint/no-unsafe-assignment': 'warn',
		'@typescript-eslint/prefer-destructuring': 'warn',
		'@typescript-eslint/promise-function-async': 'error',
		'@typescript-eslint/no-unsafe-member-access': 'warn',
		'@typescript-eslint/consistent-type-imports': 'warn',
		'@typescript-eslint/no-useless-empty-export': 'error',
		'@typescript-eslint/no-unsafe-type-assertion': 'warn',
		'@typescript-eslint/prefer-enum-initializers': 'error',
		'@typescript-eslint/no-unnecessary-qualifier': 'error',
		'@typescript-eslint/switch-exhaustiveness-check': 'warn',
		'@typescript-eslint/explicit-module-boundary-types': 'warn',
		'@typescript-eslint/no-unnecessary-parameter-property-assignment': 'warn',
		'@typescript-eslint/method-signature-style': ['error', methodSignatureStyle],
		'@typescript-eslint/consistent-type-definitions': ['warn', typeDefinitionStyle],
		'@typescript-eslint/naming-convention': [
			'warn',
			{
				selector: 'variable',
				format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
			},
			{
				selector: 'memberLike',
				modifiers: ['private'],
				format: ['camelCase'],
				leadingUnderscore: 'require',
			},
			{
				selector: 'enumMember',
				format: ['PascalCase'],
			},
			{
				selector: 'typeLike',
				format: ['PascalCase'],
				custom: {
					regex: '^(I|T(?!S))[A-Z]',
					match: false,
				},
			},
		],
	} satisfies CoreRules & PluginRules<'@typescript-eslint'>;

	return tsRules;
}

export { getTypeScriptRules };
