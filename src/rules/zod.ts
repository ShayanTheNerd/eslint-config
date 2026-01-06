import type { PluginRules } from '#types/eslintRules.d.ts';

function getZodRules() {
  const zodRules = {
    'zod-x/array-style': 'warn',
    'zod-x/no-any-schema': 'error',
    'zod-x/no-empty-custom-schema': 'error',
    'zod-x/no-number-schema-with-int': 'warn',
    'zod-x/no-optional-and-default-together': ['warn', { preferredMethod: 'default' }],
    'zod-x/no-throw-in-refine': 'error',
    'zod-x/prefer-meta': 'warn',
    'zod-x/prefer-meta-last': 'warn',
    'zod-x/prefer-namespace-import': 'error',
    'zod-x/require-brand-type-parameter': 'error',
    'zod-x/require-error-message': 'warn',
    'zod-x/require-schema-suffix': 'warn',
  } satisfies PluginRules<'zod-x'>;

  return zodRules;
}

export { getZodRules };
