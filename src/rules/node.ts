import type { Options } from '#types/index.d.ts';
import type { PluginRules } from '#types/eslintRules.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

import { isEnabled } from '#utils/isEnabled.ts';

function getNodeRules(options: DeepNonNullable<Options>) {
  const { typescript } = options.configs;

  const nodeRules = {
    'n/file-extension-in-import': 'error',
    'n/hashbang': 'error',
    'n/no-deprecated-api': 'error',
    'n/no-exports-assign': 'error',
    'n/no-missing-import': isEnabled(typescript) ? 'off' : 'error',
    'n/no-path-concat': 'error',
    'n/no-process-env': ['error', { allowedVariables: ['NODE_ENV'] }],
    'n/no-process-exit': 'error',
    'n/no-sync': 'warn',
    'n/no-unpublished-import': 'error',
    'n/no-unsupported-features/es-builtins': 'error',
    'n/no-unsupported-features/es-syntax': 'error',
    'n/no-unsupported-features/node-builtins': ['error', { allowExperimental: true }],
    'n/prefer-global/buffer': 'warn',
    'n/prefer-global/console': 'warn',
    'n/prefer-global/crypto': 'warn',
    'n/prefer-global/process': 'warn',
    'n/prefer-global/text-decoder': 'warn',
    'n/prefer-global/text-encoder': 'warn',
    'n/prefer-global/timers': 'warn',
    'n/prefer-global/url': 'warn',
    'n/prefer-global/url-search-params': 'warn',
    'n/prefer-node-protocol': 'warn',
    'n/prefer-promises/dns': 'warn',
    'n/prefer-promises/fs': 'warn',
    'n/process-exit-as-throw': 'error',
  } satisfies PluginRules<'n'>;

  return nodeRules;
}

export { getNodeRules };
