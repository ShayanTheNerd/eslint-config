import type { PluginRules } from '#types/eslintRules.d.ts';

function getCypressRules() {
	const cypressRules = {
		'cypress/no-force': 'error',
		'cypress/no-pause': 'error',
		'cypress/no-xpath': 'error',
		'cypress/no-async-tests': 'off',
		'cypress/no-chained-get': 'error',
		'cypress/assertion-before-screenshot': 'error',
	} satisfies PluginRules<'cypress'>;

	return cypressRules;
}

export { getCypressRules };
