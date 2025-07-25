import type { RuleOptions } from '#types/eslintRules.d.ts';
import type { ConfigWithOverrides } from '#types/index.d.ts';

interface CSSOptions extends ConfigWithOverrides {
	/**
	 * Enforce the use of baseline features.
	 *
	 * Aside from `'widely'` and `'newly'`, it can also be set to a numeric baseline year, such as `2025`, to allow features that became baseline newly available that year or earlier.
	 *
	 * @default false
	 *
	 * @see [css/use-baseline](https://github.com/eslint/css/blob/main/docs/rules/use-baseline.md)
	 */
	useBaseline?: false | RuleOptions<'css/use-baseline'>['available'],

	/**
	 * An array of relative font units that are allowed to be used.
	 *
	 * @default ['rem', 'em']
	 *
	 * @see [css/relative-font-units: `allowUnits` option](https://github.com/eslint/css/blob/main/docs/rules/relative-font-units.md#options)
	 */
	allowedRelativeFontUnits?: RuleOptions<'css/relative-font-units'>['allowUnits'],
}

export type { CSSOptions };
