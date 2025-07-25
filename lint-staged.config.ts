import type { Configuration } from 'lint-staged';

import { relative } from 'node:path';

const lintStagedConfig = {
	'!**/*.{js,ts}': (absolutePaths) => {
		return `prettier --write ${getRelativePaths(absolutePaths)} --ignore-unknown --cache`;
	},
	'**/*.{js,ts}': (absolutePaths) => {
		return [
			`oxlint ${getRelativePaths(absolutePaths)} --fix`,
			`eslint ${getRelativePaths(absolutePaths)} --fix --cache --cache-location='node_modules/.cache/.eslintcache'`,
		];
	},
} satisfies Configuration;

function getRelativePaths(absolutePaths: string[]): string {
	const relativePaths = absolutePaths.map((absolutePath) => {
		return relative(import.meta.dirname, absolutePath);
	});

	return relativePaths.join(' ');
}

export default lintStagedConfig;
