import type { Options } from '#types/index.d.ts';
import type { PluginRules } from '#types/eslintRules.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

import { isEnabled } from '#utils/isEnabled.ts';
import { defaultOptions } from '#utils/options/defaultOptions.ts';

const allowedPhysicalUnits = [
	'cqh',
	'cqw',
	'dvh',
	'dvw',
	'lvh',
	'lvw',
	'svh',
	'svw',
	'vh',
	'vw',
];
const allowedPhysicalProperties = [
	'bottom',
	'border-bottom',
	'border-bottom-color',
	'border-bottom-style',
	'border-bottom-width',
	'border-top',
	'border-top-color',
	'border-top-style',
	'border-top-width',
	'contain-intrinsic-height',
	'contain-intrinsic-width',
	'height',
	'margin-bottom',
	'margin-top',
	'max-height',
	'max-width',
	'min-height',
	'min-width',
	'overflow-x',
	'overflow-y',
	'overscroll-behavior-x',
	'overscroll-behavior-y',
	'padding-bottom',
	'padding-top',
	'scroll-margin-bottom',
	'scroll-margin-top',
	'scroll-padding-bottom',
	'scroll-padding-top',
	'top',
	'width',
];

function getCSSRules(options: DeepNonNullable<Options>) {
	const { css } = options.configs;
	const { useBaseline, allowedRelativeFontUnits } = isEnabled(css) ? css : defaultOptions.configs.css;

	const cssRules = {
		'css/no-invalid-properties': ['error', { allowUnknownVariables: true }],
		'css/relative-font-units': ['warn', { allowUnits: allowedRelativeFontUnits }],
		'css/use-baseline': useBaseline ? ['warn', { available: useBaseline }] : 'off',
		'css/prefer-logical-properties': ['error', {
			allowUnits: allowedPhysicalUnits,
			allowProperties: allowedPhysicalProperties,
		}],
	} satisfies PluginRules<'css'>;

	return cssRules;
}

export { getCSSRules };
