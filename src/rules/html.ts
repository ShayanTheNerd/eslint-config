import type { Options } from '#types/index.d.ts';
import type { PluginRules } from '#types/eslintRules.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

import { isEnabled } from '#utils/isEnabled.ts';
import { defaultOptions } from '#utils/options/defaultOptions.ts';

type TailwindRules = PluginRules<'better-tailwindcss'>;
type HTMLRules = PluginRules<'@html-eslint'> & Pick<TailwindRules, 'better-tailwindcss/no-duplicate-classes'>;

function getHTMLRules(options: DeepNonNullable<Options>) {
	const { html, tailwind, stylistic } = options.configs;
	const { useBaseline, idNamingConvention } = isEnabled(html) ? html : defaultOptions.configs.html;
	const {
		indent,
		useTabs,
		maxAttributesPerLine,
		maxConsecutiveEmptyLines,
		selfCloseVoidHTMLElements,
	} = isEnabled(stylistic) ? stylistic : defaultOptions.configs.stylistic;

	const htmlRules = {
		/* Best Practices */
		'@html-eslint/no-duplicate-attrs': 'error',
		'@html-eslint/no-duplicate-class': 'warn',
		'@html-eslint/no-duplicate-id': 'error',
		'@html-eslint/no-duplicate-in-head': 'error',
		'@html-eslint/no-ineffective-attrs': 'warn',
		'@html-eslint/no-invalid-entity': 'error',
		'@html-eslint/no-nested-interactive': 'error',
		'@html-eslint/no-obsolete-tags': 'error',
		'@html-eslint/no-script-style-type': 'warn',
		'@html-eslint/no-target-blank': 'warn',
		'@html-eslint/no-whitespace-only-children': 'error',
		'@html-eslint/prefer-https': 'warn',
		'@html-eslint/require-button-type': 'error',
		'@html-eslint/require-closing-tags': ['warn', {
			selfClosingCustomPatterns: ['-'],
			selfClosing: selfCloseVoidHTMLElements,
		}],
		'@html-eslint/require-doctype': 'error',
		'@html-eslint/require-explicit-size': 'warn',
		'@html-eslint/require-li-container': 'error',
		'@html-eslint/require-meta-charset': 'error',
		'@html-eslint/use-baseline': useBaseline ? ['warn', { available: useBaseline }] : 'off',

		/* SEO */
		'@html-eslint/no-multiple-h1': 'error',
		'@html-eslint/require-lang': 'error',
		'@html-eslint/require-meta-description': 'error',
		'@html-eslint/require-open-graph-protocol': 'error',
		'@html-eslint/require-title': 'error',

		/* Accessibility */
		'@html-eslint/no-abstract-roles': 'error',
		'@html-eslint/no-accesskey-attrs': 'error',
		'@html-eslint/no-aria-hidden-body': 'error',
		'@html-eslint/no-aria-hidden-on-focusable': 'error',
		'@html-eslint/no-empty-headings': 'error',
		'@html-eslint/no-heading-inside-button': 'error',
		'@html-eslint/no-invalid-role': 'error',
		'@html-eslint/no-non-scalable-viewport': 'error',
		'@html-eslint/no-positive-tabindex': 'error',
		'@html-eslint/no-skip-heading-levels': 'error',
		'@html-eslint/require-frame-title': 'error',
		'@html-eslint/require-img-alt': 'error',
		'@html-eslint/require-input-label': 'error',
		'@html-eslint/require-meta-viewport': 'error',

		/* Style */
		'@html-eslint/attrs-newline': ['warn', { ifAttrsMoreThan: maxAttributesPerLine }],
		'@html-eslint/element-newline': ['warn', { inline: ['$inline'] }],
		'@html-eslint/id-naming-convention': ['warn', idNamingConvention],
		'@html-eslint/indent': ['warn', useTabs ? 'tab' : indent],
		'@html-eslint/lowercase': 'warn',
		'@html-eslint/no-extra-spacing-attrs': ['warn', {
			disallowTabs: true,
			disallowMissing: true,
			disallowInAssignment: true,
			enforceBeforeSelfClose: true,
		}],
		'@html-eslint/no-extra-spacing-text': ['warn', { skip: ['pre'] }],
		'@html-eslint/no-multiple-empty-lines': ['warn', { max: maxConsecutiveEmptyLines }],
		'@html-eslint/no-trailing-spaces': 'warn',
		'@html-eslint/quotes': ['warn', 'double', { enforceTemplatedAttrValue: true }],
	} satisfies HTMLRules;

	if (isEnabled(tailwind)) {
		(htmlRules as HTMLRules)['better-tailwindcss/no-duplicate-classes'] = 'off';
	}

	return htmlRules;
}

export { getHTMLRules };
