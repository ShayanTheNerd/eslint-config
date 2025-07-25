import type { Linter } from 'eslint';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options, ConfigObject } from '#types/index.d.ts';

import eslintCSS from '@eslint/css';
import { tailwind4 } from 'tailwind-csstree';
import { mergeConfigs } from 'eslint-flat-config-utils';

import { globs } from '#utils/globs.ts';
import { getCSSRules } from '#rules/css.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { defaultOptions } from '#utils/options/defaultOptions.ts';

function getCSSConfig(options: DeepNonNullable<Options>): Linter.Config {
	const { css } = options.configs;
	const { overrides } = isEnabled(css) ? css : defaultOptions.configs.css;

	const cssConfig = {
		name: 'shayanthenerd/css',
		files: [globs.css],
		extends: [eslintCSS.configs.recommended],
		language: 'css/css',
		languageOptions: {
			tolerant: true,
			customSyntax: options.configs.tailwind ? tailwind4 : undefined,
		} as Linter.LanguageOptions,
		rules: getCSSRules(options),
	} satisfies ConfigObject;

	/* @ts-expect-error - Incompatible `parser` types */
	return mergeConfigs(cssConfig, overrides);
}

export { getCSSConfig };
