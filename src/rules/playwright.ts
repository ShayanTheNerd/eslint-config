import type { Options } from '#types/index.d.ts';
import type { PluginRules } from '#types/eslintRules.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

function getPlaywrightRules(options: DeepNonNullable<Options>) {
	const { maxNestedDescribe } = options.configs.test;

	const playwrightRules = {
		'playwright/max-expects': 'off',
		'playwright/prefer-to-be': 'warn',
		'playwright/no-get-by-title': 'error',
		'playwright/prefer-to-contain': 'warn',
		'playwright/no-wait-for-timeout': 'off',
		'playwright/no-duplicate-hooks': 'error',
		'playwright/prefer-strict-equal': 'warn',
		'playwright/prefer-hooks-on-top': 'warn',
		'playwright/prefer-to-have-count': 'warn',
		'playwright/prefer-hooks-in-order': 'warn',
		'playwright/prefer-to-have-length': 'warn',
		'playwright/no-commented-out-tests': 'error',
		'playwright/prefer-equality-matcher': 'warn',
		'playwright/require-to-throw-message': 'error',
		'playwright/prefer-comparison-matcher': 'warn',
		'playwright/max-nested-describe': ['warn', { max: maxNestedDescribe }],
		'playwright/prefer-lowercase-title': ['warn', { ignoreTopLevelDescribe: true }],
	} satisfies PluginRules<'playwright'>;

	return playwrightRules;
}

export { getPlaywrightRules };
