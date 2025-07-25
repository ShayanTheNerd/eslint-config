import type { Linter } from 'eslint';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options, ConfigObject } from '#types/index.d.ts';

import globals from 'globals';
import javascriptESLint from '@eslint/js';
import typescriptESLint from 'typescript-eslint';
import { mergeConfigs } from 'eslint-flat-config-utils';

import { globs } from '#utils/globs.ts';
import { getJavaScriptRules } from '#rules/javascript.ts';

function getBaseConfig(options: DeepNonNullable<Options>): Linter.Config {
	const {
		configs: {
			vue,
			base: {
				overrides,
			},
		},
		global: {
			globals: {
				node,
				worker,
				browser,
				commonjs,
				webextension,
				serviceworker,
				custom: userGlobals,
			},
		},
	}	= options;

	const baseConfig = {
		name: 'shayanthenerd/base',
		files: [globs.src, vue ? globs.vue : ''],
		extends: [javascriptESLint.configs.recommended],
		languageOptions: {
			parserOptions: {
				parser: typescriptESLint.parser,
				ecmaVersion: 'latest',
				ecmaFeatures: {
					jsx: true,
					impliedStrict: true,
				},
			},
			globals: {
				...globals.builtin,
				...globals.es2026,
				...(commonjs ? globals.commonjs : {}),
				...(node ? globals.node : {}),
				...(node ? globals.nodeBuiltin : {}),
				...(browser ? globals.browser : {}),
				...(worker ? globals.worker : {}),
				...(serviceworker ? globals.serviceworker : {}),
				...(webextension ? globals.webextensions : {}),
				...userGlobals,
			},
		},
		rules: getJavaScriptRules(options),
	} satisfies ConfigObject;

	/* @ts-expect-error - Incompatible `parser` types */
	return mergeConfigs(baseConfig, overrides);
}

export { getBaseConfig };
