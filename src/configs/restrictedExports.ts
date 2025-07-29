import type { Linter } from 'eslint';
import type { ConfigObject } from '#types/index.d.ts';

import { globs } from '#utils/globs.ts';

function getRestrictedExports(): Linter.Config {
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
		},
	} satisfies ConfigObject;

	return restrictedExportsConfig;
}

export { getRestrictedExports };
