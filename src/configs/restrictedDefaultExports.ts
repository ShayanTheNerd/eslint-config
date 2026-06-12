import type { Linter } from 'eslint';
import type { CoreRules } from '#types/eslintRules.d.ts';

import { globs } from '#helpers/globs.ts';

function getRestrictedDefaultExports() {
  const restrictedDefaultExportsConfig = {
    name: 'shayanthenerd/restrict-default-exports',
    files: [globs.restrictedDefaultExports],
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

  return restrictedDefaultExportsConfig;
}

export { getRestrictedDefaultExports };
