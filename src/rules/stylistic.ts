import type { Options } from '#types/index.d.ts';
import type { PluginRules } from '#types/eslintRules.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

import { isEnabled } from '#utils/isEnabled.ts';
import { defaultOptions } from '#utils/options/defaultOptions.ts';

function getStylisticRules(options: DeepNonNullable<Options>) {
	const { stylistic } = options.configs;
	const {
		semi,
		quotes,
		indent,
		useTabs,
		jsxQuotes,
		arrowParens,
		trailingComma,
		maxLineLength,
		memberDelimiterStyle,
		maxConsecutiveEmptyLines,
	} = isEnabled(stylistic) ? stylistic : defaultOptions.configs.stylistic;

	const stylisticRules = {
		'@stylistic/wrap-regex': 'warn',
		'@stylistic/semi-style': 'warn',
		'@stylistic/semi': ['warn', semi],
		'@stylistic/spaced-comment': 'off',
		'@stylistic/no-extra-semi': 'warn',
		'@stylistic/linebreak-style': 'warn',
		'@stylistic/quotes': ['warn', quotes],
		'@stylistic/no-confusing-arrow': 'warn',
		'@stylistic/switch-colon-spacing': 'warn',
		'@stylistic/jsx-quotes': ['warn', jsxQuotes],
		'@stylistic/type-annotation-spacing': 'warn',
		'@stylistic/no-tabs': useTabs ? 'off' : 'warn',
		'@stylistic/lines-between-class-members': 'off',
		'@stylistic/arrow-parens': ['warn', arrowParens],
		'@stylistic/comma-dangle': ['warn', trailingComma],
		'@stylistic/nonblock-statement-body-position': 'error',
		'@stylistic/generator-star-spacing': ['warn', 'after'],
		'@stylistic/implicit-arrow-linebreak': ['error', 'beside'],
		'@stylistic/array-bracket-newline': ['warn', 'consistent'],
		'@stylistic/no-mixed-spaces-and-tabs': ['warn', 'smart-tabs'],
		'@stylistic/indent-binary-ops': ['warn', useTabs ? 'tab' : indent],
		'@stylistic/function-call-argument-newline': ['warn', 'consistent'],
		'@stylistic/brace-style': ['warn', '1tbs', { allowSingleLine: true }],
		'@stylistic/padded-blocks': ['error', 'never', { allowSingleLineBlocks: true }],
		'@stylistic/object-curly-spacing': ['warn', 'always', { emptyObjects: 'never' }],
		'@stylistic/object-property-newline': ['warn', { allowAllPropertiesOnSameLine: true }],
		'@stylistic/indent': [
			'warn',
			useTabs ? 'tab' : indent,
			{ tabLength: indent },
		],
		'@stylistic/max-len': ['warn', {
			tabWidth: indent,
			code: maxLineLength,
			ignoreUrls: true,
			ignoreStrings: true,
			ignoreComments: true,
			ignoreRegExpLiterals: true,
			ignoreTrailingComments: true,
			ignoreTemplateLiterals: true,
		}],
		'@stylistic/object-curly-newline': ['warn', {
			multiline: true,
			consistent: true,
		}],
		'@stylistic/lines-around-comment': ['warn', {
			allowTypeStart: true,
			allowEnumStart: true,
			allowClassStart: true,
			allowBlockStart: true,
			allowArrayStart: true,
			allowModuleStart: true,
			allowObjectStart: true,
			allowInterfaceStart: true,
		}],
		'@stylistic/no-multiple-empty-lines': ['warn', {
			maxBOF: 0,
			maxEOF: 0,
			max: maxConsecutiveEmptyLines,
		}],
		'@stylistic/member-delimiter-style': ['error', {
			singleline: {
				delimiter: memberDelimiterStyle,
			},
			multiline: {
				delimiter: memberDelimiterStyle,
				requireLast: trailingComma !== 'never',
			},
		}],
		'@stylistic/operator-linebreak': ['error', 'none', {
			overrides: {
				'=': 'after',
				'?': 'before',
				':': 'before',
				'|': 'before',
				'&': 'before',
			},
		}],
		'@stylistic/padding-line-between-statements': [
			'warn',
			{
				prev: '*',
				next: [
					'do',
					'try',
					'for',
					'iife',
					'with',
					'class',
					'block',
					'while',
					'throw',
					'return',
					'switch',
					'export',
					'function',
					'directive',
					'block-like',
					'cjs-export',
					'multiline-block-like',
				],
				blankLine: 'always',
			},
			{
				prev: 'import',
				next: '*',
				blankLine: 'always',
			},
			{
				prev: 'import',
				next: 'import',
				blankLine: 'any',
			},
			{
				prev: 'export',
				next: 'export',
				blankLine: 'any',
			},
			{
				prev: 'function-overload',
				next: 'function',
				blankLine: 'never',
			},
			{
				prev: ['const', 'let', 'var'],
				next: 'block-like',
				blankLine: 'any',
			},
			{
				prev: 'block-like',
				next: '*',
				blankLine: 'always',
			},
		],
	} satisfies PluginRules<'@stylistic'>;

	return stylisticRules;
}

export { getStylisticRules };
