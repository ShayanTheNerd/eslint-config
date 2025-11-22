import type { Options } from '#types/index.d.ts';
import type { PluginRules } from '#types/eslintRules.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

function getVitestRules(options: DeepNonNullable<Options>) {
	const { testFunction, maxNestedDescribe } = options.configs.test;

	const vitestRules = {
		'vitest/consistent-test-filename': 'warn',
		'vitest/consistent-test-it': ['warn', {
			fn: testFunction,
			withinDescribe: testFunction,
		}],
		'vitest/consistent-vitest-vi': 'warn',
		'vitest/expect-expect': 'error',
		'vitest/hoisted-apis-on-top': 'warn',
		'vitest/max-nested-describe': ['warn', { max: maxNestedDescribe }],
		'vitest/no-alias-methods': 'error',
		'vitest/no-commented-out-tests': 'warn',
		'vitest/no-conditional-expect': 'error',
		'vitest/no-conditional-in-test': 'error',
		'vitest/no-conditional-tests': 'error',
		'vitest/no-disabled-tests': 'error',
		'vitest/no-duplicate-hooks': 'error',
		'vitest/no-focused-tests': 'error',
		'vitest/no-identical-title': 'warn',
		'vitest/no-import-node-test': 'error',
		'vitest/no-interpolation-in-snapshots': 'warn',
		'vitest/no-mocks-import': 'error',
		'vitest/no-standalone-expect': 'error',
		'vitest/no-test-prefixes': 'error',
		'vitest/no-test-return-statement': 'error',
		'vitest/padding-around-after-all-blocks': 'warn',
		'vitest/padding-around-after-each-blocks': 'warn',
		'vitest/padding-around-before-all-blocks': 'warn',
		'vitest/padding-around-before-each-blocks': 'warn',
		'vitest/padding-around-describe-blocks': 'warn',
		'vitest/prefer-called-exactly-once-with': 'warn',
		'vitest/prefer-called-once': 'warn',
		'vitest/prefer-called-with': 'warn',
		'vitest/prefer-comparison-matcher': 'warn',
		'vitest/prefer-each': 'warn',
		'vitest/prefer-equality-matcher': 'warn',
		'vitest/prefer-expect-resolves': 'warn',
		'vitest/prefer-expect-type-of': 'warn',
		'vitest/prefer-hooks-in-order': 'warn',
		'vitest/prefer-hooks-on-top': 'warn',
		'vitest/prefer-import-in-mock': 'warn',
		'vitest/prefer-importing-vitest-globals': 'warn',
		'vitest/prefer-lowercase-title': 'warn',
		'vitest/prefer-mock-promise-shorthand': 'warn',
		'vitest/prefer-snapshot-hint': ['warn', 'always'],
		'vitest/prefer-spy-on': 'warn',
		'vitest/prefer-strict-boolean-matchers': 'warn',
		'vitest/prefer-strict-equal': 'warn',
		'vitest/prefer-to-be': 'warn',
		'vitest/prefer-to-be-falsy': 'warn',
		'vitest/prefer-to-be-object': 'warn',
		'vitest/prefer-to-be-truthy': 'warn',
		'vitest/prefer-to-contain': 'warn',
		'vitest/prefer-to-have-length': 'warn',
		'vitest/prefer-todo': 'warn',
		'vitest/prefer-vi-mocked': 'warn',
		'vitest/require-awaited-expect-poll': 'error',
		'vitest/require-hook': 'error',
		'vitest/require-local-test-context-for-concurrent-snapshots': 'error',
		'vitest/require-mock-type-parameters': 'warn',
		'vitest/require-to-throw-message': 'warn',
		'vitest/valid-describe-callback': 'error',
		'vitest/valid-expect': 'error',
		'vitest/valid-expect-in-promise': 'error',
		'vitest/warn-todo': 'error',

		/* @ts-expect-error — Incorrect index signature type. */
		'vitest/valid-title': ['error', { allowArguments: true }],
	} satisfies PluginRules<'vitest'>;

	return vitestRules;
}

export { getVitestRules };
