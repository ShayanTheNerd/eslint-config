import type { Linter } from 'eslint';
import type { CoreRules } from '#types/eslintRules.d.ts';

import { globs } from '#helpers/globs.ts';

function getRestrictedExports() {
  const restrictedExportsConfig = {
    name: 'shayanthenerd/restricted-exports',
    files: [globs.restrictedExports],
    rules: {
      'no-restricted-exports': ['error', {
        restrictDefaultExports: {
          named: true,
          direct: true,
          namedFrom: true,
          namespaceFrom: true,
        },
      }],
    } satisfies Pick<CoreRules, 'no-restricted-exports'>,
  } satisfies Linter.Config;

  return restrictedExportsConfig;
}

export { getRestrictedExports };
