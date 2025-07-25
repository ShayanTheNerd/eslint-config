import type { RuleOptions } from '#types/eslintRules.d.ts';
import type { ConfigWithOverrides } from '#types/index.d.ts';

interface StylisticOptions extends ConfigWithOverrides {
	/**
	 * Add semicolons at the end of statements.
	 *
	 * @default 'always'
	 *
	 * @see [@stylistic/semi](https://eslint.style/rules/semi)
	 */
	semi?: RuleOptions<'@stylistic/semi'>,

	/**
	 * Add trailing commas to object and array literals.
	 *
	 * This is also used by
	 * [@stylistic/member-delimiter-style: `delimiter` option](https://eslint.style/rules/member-delimiter-style#delimiter)
	 * to add a trailing delimiter to the last item in multi-line interfaces and type aliases.
	 *
	 * @default 'always-multiline'
	 *
	 * @see [@stylistic/comma-dangle](https://eslint.style/rules/comma-dangle)
	 */
	trailingComma?: Exclude<RuleOptions<'@stylistic/comma-dangle'>, object>,

	/**
	 * Enforce a consistent delimiter style in interfaces and type aliases.
	 *
	 * @default 'comma'
	 *
	 * @see [@stylistic/member-delimiter-style: `delimiter` option](https://eslint.style/rules/member-delimiter-style#delimiter)
	 */
	memberDelimiterStyle?: RuleOptions<'@stylistic/member-delimiter-style'>['singleline']['delimiter'],

	/**
	 * The style of quotes to use for strings.
	 *
	 * @default 'single'
	 *
	 * @see [@stylistic/quotes](https://eslint.style/rules/quotes)
	 */
	quotes?: RuleOptions<'@stylistic/quotes'>,

	/**
	 * The style of quotes to use for JSX attributes.
	 *
	 * @default 'prefer-double'
	 *
	 * @see [@stylistic/jsx-quotes](https://eslint.style/rules/jsx-quotes)
	 */
	jsxQuotes?: RuleOptions<'@stylistic/jsx-quotes'>,

	/**
	 * Add parentheses around arrow function parameters.
	 *
	 * @default 'always'
	 *
	 * @see [@stylistic/arrow-parens](https://eslint.style/rules/arrow-parens)
	 */
	arrowParens?: RuleOptions<'@stylistic/arrow-parens'>,

	/**
	 * Use tabs for indentation.
	 *
	 * This is used by
	 * - [vue/html-indent](https://eslint.vuejs.org/rules/html-indent)
	 * - [@html-eslint/indent](https://html-eslint.org/docs/rules/indent)
	 * - [@stylistic/indent](https://eslint.style/rules/indent)
	 * - [@stylistic/no-tabs](https://eslint.style/rules/no-tabs)
	 * - [@stylistic/indent-binary-ops](https://eslint.style/rules/indent-binary-ops)
	 * - [better-tailwindcss/enforce-consistent-line-wrapping](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-consistent-line-wrapping.md)
	 *
	 * @default true
	 */
	useTabs?: boolean,

	/**
	 * The number of space characters used for indentation.
	 *
	 * If `stylistic.useTabs` is `true`, this determines the number of space characters that each tab indentation consists of.
	 *
	 * This is used by
	 * - [vue/max-len](https://eslint.vuejs.org/rules/max-len)
	 * - [vue/html-indent](https://eslint.vuejs.org/rules/html-indent)
	 * - [vue/html-comment-indent](https://eslint.vuejs.org/rules/html-comment-indent.html)
	 * - [@stylistic/indent](https://eslint.style/rules/indent)
	 * - [@stylistic/max-len](https://eslint.style/rules/max-len)
	 * - [@stylistic/indent-binary-ops](https://eslint.style/rules/indent-binary-ops)
	 * - [perfectionist/sort-imports: `maxLineLength` option](https://perfectionist.dev/rules/sort-imports#maxlinelength)
	 * - [better-tailwindcss/enforce-consistent-line-wrapping: `indent` option](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-consistent-line-wrapping.md)
	 *
	 * @default 2
	*/
	indent?: number,

	/**
	 * Maximum number of consecutive empty lines.
	 *
	 * This is used by
	 * - [vue/block-tag-newline: `maxEmptyLines` option](https://eslint.vuejs.org/rules/block-tag-newline#options)
	 * - [@html-eslint/no-multiple-empty-lines: `max` option](https://html-eslint.org/docs/rules/no-multiple-empty-lines)
	 *
	 * @default 1
	 */
	maxConsecutiveEmptyLines?: RuleOptions<'@stylistic/no-multiple-empty-lines'>['max'],

	/**
	 * Maximum line length for the code. Strings, texts, and comments are ignored.
	 *
	 * This is used by
	 * - [vue/max-len](https://eslint.vuejs.org/rules/max-len)
	 * - [@stylistic/max-len](https://eslint.style/rules/max-len)
	 * - [perfectionist/sort-imports: `maxLineLength` option](https://perfectionist.dev/rules/sort-imports#maxlinelength)
	 * - [better-tailwindcss/enforce-consistent-line-wrapping: `printWidth` option](https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/rules/enforce-consistent-line-wrapping.md)
	 *
	 * @default 120
	*/
	maxLineLength?: number,

	/**
	 * Maximum number of HTML attributes per line.
	 *
	 * This is used by
	 * - [vue/max-attributes-per-line: `singleline.max` option](https://eslint.vuejs.org/rules/max-attributes-per-line)
	 * - [@html-eslint/attrs-newline: `ifAttrsMoreThan` option](https://html-eslint.dev/rules/attrs-newline)
	 *
	 * @default 3
	 */
	maxAttributesPerLine?: number,

	/**
	 * Require void HTML elements to be self-closing.
	 *
	 * This is used by
	 * - [vue/html-self-closing: `html.void` option](https://eslint.vuejs.org/rules/html-self-closing.html#options)
	 * - [@html-eslint/require-closing-tags: `selfClosing` option](https://html-eslint.org/docs/rules/require-closing-tags#options)
	 *
	 * @default 'always'
	 */
	selfCloseVoidHTMLElements?: 'never' | 'always',
}

export type { StylisticOptions };
