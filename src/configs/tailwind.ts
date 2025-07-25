import type { Linter } from 'eslint';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options, ConfigObject } from '#types/index.d.ts';

import eslintPluginVue from 'eslint-plugin-vue';
import { mergeConfigs } from 'eslint-flat-config-utils';
import eslintPluginHTML from '@html-eslint/eslint-plugin';
import eslintPluginTailwind from 'eslint-plugin-better-tailwindcss';
import path from 'node:path';

import { globs } from '#utils/globs.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { getTailwindRules } from '#rules/tailwind.ts';
import { defaultOptions } from '#utils/options/defaultOptions.ts';

const eslintParserHTML = eslintPluginHTML.configs['flat/recommended'].languageOptions.parser;
const eslintParserVue = eslintPluginVue.configs['flat/recommended']
	.find((config) => config.name === 'vue/base/setup-for-vue')?.languageOptions?.parser;

function getTailwindConfig(options: DeepNonNullable<Options>): Linter.Config {
	const {
		tsConfig,
		configs: {
			vue,
			html,
			tailwind,
		},
	} = options;
	const { entryPoint, config, overrides } = isEnabled(tailwind) ? tailwind : defaultOptions.configs.tailwind;

	const tailwindConfig = {
		name: 'shayanthenerd/tailwind',
		files: [globs.src, html ? globs.html : '', vue ? globs.vue : ''],
		plugins: {
			'better-tailwindcss': eslintPluginTailwind,
		},
		languageOptions: {
			parserOptions: {
				parser: html ? eslintParserHTML : eslintParserVue,
			},
		},
		settings: {
			'better-tailwindcss': {
				entryPoint: path.resolve(entryPoint),
				tailwindConfig: path.resolve(config),
				tsconfig: tsConfig ? path.resolve(tsConfig.rootDir, tsConfig.filename) : undefined,
				attributes: [
					['^v-bind:ui$', [
						{ match: 'objectValues' },
					]],
					['^(?:v-bind:)?(class|activeClass|inactiveClass)$', [
						{ match: 'strings' },
						{ match: 'objectKeys' },
						{ match: 'objectValues' },
					]],
				],
			},
		},
		rules: getTailwindRules(options),
	} satisfies ConfigObject;

	/* @ts-expect-error - Incompatible `parser` types */
	return mergeConfigs(tailwindConfig, overrides);
}

export { getTailwindConfig };
