import type { Linter } from 'eslint';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options, ConfigObject } from '#types/index.d.ts';

import eslintCSS from '@eslint/css';
import { mergeConfigs } from 'eslint-flat-config-utils';
import { tailwind3, tailwind4 } from 'tailwind-csstree';
import { styleText } from 'node:util';

import { globs } from '#utils/globs.ts';
import { getCSSRules } from '#rules/css.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { defaultOptions } from '#utils/options/defaultOptions.ts';

function getCSSConfig(options: DeepNonNullable<Options>): Linter.Config {
	const { css, tailwind } = options.configs;
	const { overrides } = isEnabled(css) ? css : defaultOptions.configs.css;
	const tailwindSyntax = isEnabled(tailwind) && tailwind.entryPoint ? tailwind4 : tailwind3;

	const cssConfig = {
		name: 'shayanthenerd/css',
		files: [globs.css],
		extends: [eslintCSS.configs.recommended],
		language: 'css/css',
		languageOptions: {
			tolerant: true,
			customSyntax: isEnabled(tailwind) ? tailwindSyntax : undefined,
		} as Linter.LanguageOptions,
		rules: getCSSRules(options),
	} satisfies ConfigObject;

	console.warn(
		styleText('yellow', '⚠︎ Enabling the CSS config with `--cache` or `--print-config` options (CLI flags) may cause ESLint to crash. This is a known issue with the "tailwind-csstree" package used by "@eslint/css". Check out'),
		styleText('blue', 'https://github.com/eslint/css/issues/211'),
		styleText('yellow', 'for more details.'),
	);

	/* @ts-expect-error - Incompatible `parser` types */
	return mergeConfigs(cssConfig, overrides);
}

export { getCSSConfig };
