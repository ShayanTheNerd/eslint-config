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
	const { overrides, removeUnusedImports } = isEnabled(importX) ? importX : defaultOptions.configs.importX;

	const importXConfig = {
		name: 'shayanthenerd/imports',
		files: isEnabled(vue) ? [globs.src, globs.vue] : [globs.src],
		plugins: {
			'import-x': eslintPluginImportX,
			...(removeUnusedImports && { 'unused-imports': eslintPluginUnusedImports }),
		},
		settings: isEnabled(typescript) ? eslintPluginImportX.flatConfigs.typescript.settings : undefined,
		rules: getImportXRules(options),
	} satisfies ConfigObject;

	/* @ts-expect-error — Incompatible `parser` types */
	return mergeConfigs(importXConfig, overrides);
}

export { getImportXConfig };
