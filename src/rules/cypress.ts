import type { PluginRules } from '#types/eslintRules.d.ts';

const cypressRules = {
  'cypress/no-and': 'warn',
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

function getCypressRules() {
  return cypressRules;
}

export { getCypressRules };
