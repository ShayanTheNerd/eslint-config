import type { Options } from '#types/index.d.ts';
import type { PluginRules } from '#types/eslintRules.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

import { isEnabled } from '#utils/isEnabled.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';

function getZodRules(options: DeepNonNullable<Options>) {
  const { zod } = options.configs;
  const { mini } = isEnabled(zod) ? zod : defaultOptions.configs.zod;

  const rules = {
    'zod/array-style': 'warn',
    'zod/consistent-import': 'error',
    'zod/consistent-object-schema-type': ['warn', { allow: ['object', 'strictObject'] }],
    'zod/consistent-schema-output-type-style': 'warn',
    'zod/consistent-schema-var-name': 'warn',
    'zod/no-any-schema': 'error',
    'zod/no-coerce-boolean': 'warn',
    'zod/no-duplicate-schema-methods': 'error',
    'zod/no-empty-custom-schema': 'error',
    'zod/no-native-enum': 'warn',
    'zod/no-number-schema-with-finite': 'warn',
    'zod/no-number-schema-with-int': 'warn',
    'zod/no-number-schema-with-is-finite': 'warn',
    'zod/no-number-schema-with-is-int': 'warn',
    'zod/no-number-schema-with-safe': 'warn',
    'zod/no-number-schema-with-step': 'warn',
    'zod/no-optional-and-default-together': ['warn', { preferredMethod: 'default' }],
    'zod/no-promise-schema': 'error',
    'zod/no-schema-with-is-nullable': 'warn',
    'zod/no-schema-with-is-optional': 'warn',
    'zod/no-throw-in-refine': 'error',
    'zod/no-transform-in-record-key': 'error',
    'zod/prefer-enum-over-literal-union': 'warn',
    'zod/prefer-loose-object': 'warn',
    'zod/prefer-meta': 'warn',
    'zod/prefer-meta-last': 'warn',
    'zod/prefer-strict-object': 'warn',
    'zod/prefer-top-level-string-formats': 'warn',
    'zod/prefer-trim-before-string-length-checks': 'error',
    'zod/require-brand-type-parameter': 'error',
    'zod/require-error-message': 'warn',
  } satisfies PluginRules<'zod'>;

  const miniRules = {
    'zod-mini/consistent-import': 'error',
    'zod-mini/consistent-import-source': ['error', { sources: ['zod/mini'] }],
    'zod-mini/consistent-object-schema-type': ['warn', { allow: ['object', 'strictObject'] }],
    'zod-mini/consistent-schema-output-type-style': 'warn',
    'zod-mini/consistent-schema-var-name': 'warn',
    'zod-mini/no-any-schema': 'error',
    'zod-mini/no-coerce-boolean': 'warn',
    'zod-mini/no-duplicate-schema-methods': 'error',
    'zod-mini/no-empty-custom-schema': 'error',
    'zod-mini/no-throw-in-refine': 'error',
    'zod-mini/no-transform-in-record-key': 'error',
    'zod-mini/prefer-enum-over-literal-union': 'warn',
    'zod-mini/prefer-meta': 'warn',
    'zod-mini/require-brand-type-parameter': 'error',
    'zod-mini/require-error-message': 'warn',
  } satisfies PluginRules<'zod-mini'>;

  return mini ? miniRules : rules;
}

export { getZodRules };
