import type { Linter } from 'eslint';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options, ConfigObject } from '#types/index.d.ts';

import eslintPluginVue from 'eslint-plugin-vue';
import typescriptESLint from 'typescript-eslint';
import { mergeConfigs } from 'eslint-flat-config-utils';
import eslintPluginVueAccessibility from 'eslint-plugin-vuejs-accessibility';

import { globs } from '#utils/globs.ts';
import { getVueRules } from '#rules/vue.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { defaultOptions } from '#utils/options/defaultOptions.ts';
import { getVueAccessibilityRules } from '#rules/vueAccessibility.ts';

function getVueConfig(options: DeepNonNullable<Options>): Linter.Config {
	const { vue } = options.configs;
	const accessibility = isEnabled(vue) && isEnabled(vue.accessibility);
	const { overrides } = isEnabled(vue) ? vue : defaultOptions.configs.vue;

	const vueConfig = {
		name: 'shayanthenerd/vue',
		files: [globs.vue],
		extends: [
			eslintPluginVue.configs['flat/recommended'],
			accessibility ? eslintPluginVueAccessibility.configs['flat/recommended'] : {},
		],
		languageOptions: {
			parserOptions: {
				parser: typescriptESLint.parser,
				extraFileExtensions: ['.vue'],
				vueFeatures: {
					filter: false,
				},
			},
		},
		rules: {
			...getVueRules(options),
			...(accessibility ? getVueAccessibilityRules(options) : {}),
		},
	} satisfies ConfigObject;

	/* @ts-expect-error - Incompatible `parser` types */
	return mergeConfigs(vueConfig, overrides);
}

export { getVueConfig };
