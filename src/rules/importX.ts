import type { Options } from '#types/index.d.ts';
import type { PluginRules } from '#types/eslintRules.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

import path from 'node:path';

import { isEnabled } from '#utils/isEnabled.ts';
import { defaultOptions } from '#utils/options/defaultOptions.ts';

function getImportXRules(options: DeepNonNullable<Options>) {
	const {
		packageDir,
		configs: {
			importX,
			typescript,
		},
	} = options;
	const { removeUnusedImports } = isEnabled(importX) ? importX : defaultOptions.configs.importX;

	const importXRules = {
		'unused-imports/no-unused-imports': removeUnusedImports ? 'warn' : 'off',

		'import-x/no-amd': 'error',
		'import-x/no-commonjs': 'error',
		'import-x/exports-last': 'warn',
		'import-x/no-deprecated': 'warn',
		'import-x/group-exports': 'warn',
		'import-x/no-self-import': 'error',
		'import-x/no-absolute-path': 'warn',
		'import-x/no-named-default': 'error',
		'import-x/no-mutable-exports': 'error',
		'import-x/no-empty-named-blocks': 'error',
		'import-x/no-import-module-exports': 'error',
		'import-x/no-useless-path-segments': 'error',
		'import-x/no-named-as-default-member': 'off',
		'import-x/named': typescript ? 'off' : 'error',
		'import-x/export': typescript ? 'off' : 'error',
		'import-x/default': typescript ? 'off' : 'error',
		'import-x/consistent-type-specifier-style': 'warn',
		'import-x/first': ['warn', 'disable-absolute-first'],
		'import-x/no-unresolved': typescript ? 'off' : 'error',
		'import-x/namespace': ['error', { allowComputed: true }],
		'import-x/no-duplicates': ['error', { considerQueryString: true }],
		'import-x/no-cycle': ['error', { maxDepth: 1, ignoreExternal: true }],
		'import-x/no-extraneous-dependencies': ['error', {
			includeTypes: true,
			packageDir: path.resolve(packageDir),
		}],
	} satisfies PluginRules<'import-x'> & PluginRules<'unused-imports'>;

	return importXRules;
}

export { getImportXRules };
