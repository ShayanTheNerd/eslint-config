import type { Linter } from 'eslint';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options, ConfigObject } from '#types/index.d.ts';

import { mergeConfigs } from 'eslint-flat-config-utils';
import eslintPluginImportX from 'eslint-plugin-import-x';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';

import { globs } from '#utils/globs.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { getImportXRules } from '#rules/importX.ts';
import { defaultOptions } from '#utils/options/defaultOptions.ts';

function getImportXConfig(options: DeepNonNullable<Options>): Linter.Config {
	const { vue, importX, typescript } = options.configs;
	const { overrides } = isEnabled(importX) ? importX : defaultOptions.configs.importX;

	const importXConfig = {
		name: 'shayanthenerd/import-x',
		files: [globs.src, vue ? globs.vue : ''],
		extends: [
			eslintPluginImportX.flatConfigs.recommended,
			typescript ? eslintPluginImportX.flatConfigs.typescript : {},
		],
		plugins: {
			'unused-imports': eslintPluginUnusedImports,
		},
		settings: {
			'import-x/extensions': vue ? ['.vue'] : undefined,
		},
		rules: getImportXRules(options),
	} satisfies ConfigObject;

	/* @ts-expect-error - Incompatible `parser` types */
	return mergeConfigs(importXConfig, overrides);
}

export { getImportXConfig };
