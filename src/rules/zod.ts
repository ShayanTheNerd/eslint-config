import type { PluginRules } from '#types/eslintRules.d.ts';

function getZodRules() {
  const zodRules = {
    'zod/array-style': 'warn',
    'zod/consistent-object-schema-type': ['warn', { allow: ['object', 'strictObject'] }],
    'zod/no-any-schema': 'error',
    'zod/no-empty-custom-schema': 'error',
    'zod/no-number-schema-with-int': 'warn',
    'zod/no-optional-and-default-together': ['warn', { preferredMethod: 'default' }],
    'zod/no-string-schema-with-uuid': 'warn',
    'zod/no-throw-in-refine': 'error',
    'zod/prefer-enum-over-literal-union': 'warn',
    'zod/prefer-meta': 'warn',
    'zod/prefer-meta-last': 'warn',
    'zod/consistent-import': 'error',
    'zod/require-brand-type-parameter': 'error',
    'zod/require-error-message': 'warn',
    'zod/require-schema-suffix': 'warn',
  } satisfies PluginRules<'zod'>;

  return zodRules;
}

export { getZodRules };
