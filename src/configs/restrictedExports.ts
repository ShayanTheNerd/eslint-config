import type { ConfigObject } from '#types/index.d.ts';
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
  } satisfies ConfigObject;

  return restrictedExportsConfig;
}

export { getRestrictedExports };
