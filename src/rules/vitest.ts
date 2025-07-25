import type { Options } from '#types/index.d.ts';
import type { PluginRules } from '#types/eslintRules.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

function getVitestRules(options: DeepNonNullable<Options>) {
	const { testFunction, maxNestedDescribe } = options.configs.test;

	const vitestRules = {
		'vitest/prefer-todo': 'warn',
		'vitest/prefer-to-be': 'warn',
		'vitest/require-hook': 'error',
		'vitest/prefer-spy-on': 'warn',
		'vitest/no-mocks-import': 'error',
		'vitest/no-test-prefixes': 'error',
		'vitest/no-alias-methods': 'error',
		'vitest/no-focused-tests': 'error',
		'vitest/prefer-to-contain': 'warn',
		'vitest/no-disabled-tests': 'error',
		'vitest/prefer-called-with': 'warn',
		'vitest/prefer-to-be-falsy': 'warn',
		'vitest/no-duplicate-hooks': 'error',
		'vitest/prefer-strict-equal': 'warn',
		'vitest/prefer-to-be-truthy': 'warn',
		'vitest/prefer-to-be-object': 'warn',
		'vitest/no-conditional-tests': 'error',
		'vitest/no-standalone-expect': 'error',
		'vitest/prefer-to-have-length': 'warn',
		'vitest/prefer-hooks-in-order': 'warn',
		'vitest/no-conditional-expect': 'error',
		'vitest/prefer-lowercase-title': 'warn',
		'vitest/no-conditional-in-test': 'error',
		'vitest/prefer-equality-matcher': 'warn',
		'vitest/consistent-test-filename': 'warn',
		'vitest/no-test-return-statement': 'error',
		'vitest/require-to-throw-message': 'error',
		'vitest/prefer-comparison-matcher': 'warn',
		'vitest/prefer-mock-promise-shorthand': 'warn',
		'vitest/no-interpolation-in-snapshots': 'error',
		'vitest/prefer-snapshot-hint': ['warn', 'always'],
		'vitest/max-nested-describe': ['warn', { max: maxNestedDescribe }],
		'vitest/consistent-test-it': ['warn', {
			fn: testFunction,
			withinDescribe: testFunction,
		}],
	} satisfies PluginRules<'vitest'>;

	return vitestRules;
}

export { getVitestRules };
