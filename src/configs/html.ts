import type { Linter } from 'eslint';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options, ConfigObject } from '#types/index.d.ts';

import { mergeConfigs } from 'eslint-flat-config-utils';
import eslintPluginHTML from '@html-eslint/eslint-plugin';

import { globs } from '#utils/globs.ts';
import { getHTMLRules } from '#rules/html.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { defaultOptions } from '#utils/options/defaultOptions.ts';

function getHTMLConfig(options: DeepNonNullable<Options>): Linter.Config {
	const { html } = options.configs;
	const { overrides } = isEnabled(html) ? html : defaultOptions.configs.html;

	const htmlConfig = {
		name: 'shayanthenerd/html',
		files: [globs.html],
		extends: [eslintPluginHTML.configs['flat/recommended']],
		language: 'html/html',
		rules: getHTMLRules(options),
	} satisfies ConfigObject;

	/* @ts-expect-error - Incompatible `parser` types */
	return mergeConfigs(htmlConfig, overrides);
}

export { getHTMLConfig };
