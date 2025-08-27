import type { Options } from '#types/index.d.ts';
import type { PluginRules } from '#types/eslintRules.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

import { isEnabled } from '#utils/isEnabled.ts';
import { defaultOptions } from '#utils/options/defaultOptions.ts';

type TailwindRules = PluginRules<'better-tailwindcss'>;
type HTMLRules =
	& PluginRules<'@html-eslint'>
	& Pick<TailwindRules, 'better-tailwindcss/no-duplicate-classes'>;

function getHTMLRules(options: DeepNonNullable<Options>) {
	const { html, stylistic } = options.configs;
	const { useBaseline, idNamingConvention } = isEnabled(html) ? html : defaultOptions.configs.html;
	const {
		indent,
		useTabs,
		maxAttributesPerLine,
		maxConsecutiveEmptyLines,
		selfCloseVoidHTMLElements,
	} = isEnabled(stylistic) ? stylistic : defaultOptions.configs.stylistic;

	const htmlRules = {
		'better-tailwindcss/no-duplicate-classes': 'off',

		/* Best Practices */
		'@html-eslint/no-target-blank': 'error',
		'@html-eslint/no-duplicate-class': 'warn',
		'@html-eslint/require-button-type': 'error',
		'@html-eslint/no-ineffective-attrs': 'error',
		'@html-eslint/no-script-style-type': 'error',
		'@html-eslint/require-meta-charset': 'error',
		'@html-eslint/quotes': ['warn', 'double', { enforceTemplatedAttrValue: true }],
		'@html-eslint/use-baseline': useBaseline ? ['warn', { available: useBaseline }] : 'off',
		'@html-eslint/require-closing-tags': ['error', {
			selfClosingCustomPatterns: ['-'],
			selfClosing: selfCloseVoidHTMLElements,
		}],

		/* SEO */
		'@html-eslint/require-meta-description': 'error',
		'@html-eslint/require-open-graph-protocol': 'error',

		/* Accessibility */
		'@html-eslint/no-abstract-roles': 'error',
		'@html-eslint/no-accesskey-attrs': 'error',
		'@html-eslint/require-frame-title': 'error',
		'@html-eslint/no-aria-hidden-body': 'error',
		'@html-eslint/no-positive-tabindex': 'error',
		'@html-eslint/require-meta-viewport': 'error',
		'@html-eslint/no-skip-heading-levels': 'error',

		/* Style */
		'@html-eslint/lowercase': 'warn',
		'@html-eslint/no-trailing-spaces': 'warn',
		'@html-eslint/indent': ['warn', useTabs ? 'tab' : indent],
		'@html-eslint/id-naming-convention': ['warn', idNamingConvention],
		'@html-eslint/element-newline': ['warn', { inline: ['$inline'] }],
		'@html-eslint/attrs-newline': ['warn', { ifAttrsMoreThan: maxAttributesPerLine }],
		'@html-eslint/no-multiple-empty-lines': ['warn', { max: maxConsecutiveEmptyLines }],
		'@html-eslint/no-extra-spacing-attrs': ['warn', {
			disallowTabs: true,
			disallowMissing: true,
			disallowInAssignment: true,
			enforceBeforeSelfClose: true,
		}],
	} satisfies HTMLRules;

	return htmlRules;
}

export { getHTMLRules };
