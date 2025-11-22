import type { PluginRules } from '#types/eslintRules.d.ts';

function getCypressRules() {
	const cypressRules = {
		'cypress/no-assigning-return-values': 'error',
		'cypress/no-async-before': 'warn',
		'cypress/no-async-tests': 'error',
		'cypress/no-chained-get': 'error',
		'cypress/no-debug': 'error',
		'cypress/no-force': 'error',
		'cypress/no-pause': 'error',
		'cypress/no-unnecessary-waiting': 'error',
		'cypress/no-xpath': 'error',
		'cypress/unsafe-to-chain-command': 'error',
	} satisfies PluginRules<'cypress'>;

	return cypressRules;
}

export { getCypressRules };
