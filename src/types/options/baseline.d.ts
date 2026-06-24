import type { ConfigWithOverrides } from '#types/index.d.ts';
import type { PluginRules, RuleOptions } from '#types/eslintRules.d.ts';

type ConfigRules = PluginRules<'baseline-js'>;

type CssBaselineOptions = RuleOptions<'css/use-baseline'>;

interface BaselineOptions extends ConfigWithOverrides<ConfigRules> {
  /**
   * Enforce the use of baseline features in HTML, CSS, JavaScript, and React.
   *
   * Aside from `'widely'` and `'newly'`, it can also be set to a numeric baseline year, such as `2025`, to allow features that became baseline newly available that year or earlier. Minimum numeric baseline year is `2000`.
   *
   * @default 'widely'
   *
   * @see [@typescript-eslint/method-signature-style](https://typescript-eslint.io/rules/method-signature-style)
   */
  baseline?: RuleOptions<'baseline-js/use-baseline'>['available'],

  /**
   * Allow certain CSS features to be used even if they are not baseline features.
   *
   * @see [css/use-baseline: options](https://github.com/eslint/css/blob/main/docs/rules/use-baseline.md#options)
   */
  css?: {
    /**
     * At-rules that are allowed to be used regardless of the baseline.
     *
     * @default []
     *
     * @see [css/use-baseline: `allowedAtRules` option](https://github.com/eslint/css/blob/main/docs/rules/use-baseline.md#allowatrules)
    */
    allowedAtRules?: CssBaselineOptions['allowAtRules'],

    /**
     * Functions that are allowed to be used regardless of the baseline.
     *
     * @default []
     *
     * @see [css/use-baseline: `allowedFunctions` option](https://github.com/eslint/css/blob/main/docs/rules/use-baseline.md#allowfunctions)
     */
    allowedFunctions?: CssBaselineOptions['allowFunctions'],

    /**
     * Media conditions inside `@media` that are allowed to be used regardless of the baseline.
     *
     * @default []
     *
     * @see [css/use-baseline: `allowedMediaConditions` option](https://github.com/eslint/css/blob/main/docs/rules/use-baseline.md#allowmediaconditions)
     */
    allowedMediaConditions?: CssBaselineOptions['allowMediaConditions'],

    /**
     * Properties that are allowed to be used regardless of the baseline.
     *
     * @default []
     *
     * @see [css/use-baseline: `allowedProperties` option](https://github.com/eslint/css/blob/main/docs/rules/use-baseline.md#allowproperties)
     */
    allowedProperties?: CssBaselineOptions['allowProperties'],

    /**
     * Properties that are allowed to be used regardless of the baseline, mapped to their allowed identifier values.
     *
     * @default {}
     *
     * @see [css/use-baseline: `allowedPropertyValues` option](https://github.com/eslint/css/blob/main/docs/rules/use-baseline.md#allowpropertyvalues)
     */
    allowedPropertyValues?: Partial<CssBaselineOptions['allowPropertyValues']>,

    /**
     * Selectors that are allowed to be used regardless of the baseline.
     *
     * @default []
     *
     * @see [css/use-baseline: `allowedSelectors` option](https://github.com/eslint/css/blob/main/docs/rules/use-baseline.md#allowselectors)
     */
    allowedSelectors?: CssBaselineOptions['allowSelectors'],

    /**
     * Units that are allowed to be used regardless of the baseline.
     *
     * @default []
     *
     * @see [css/use-baseline: `allowedUnits` option](https://github.com/eslint/css/blob/main/docs/rules/use-baseline.md#allowunits)
     */
    allowedUnits?: CssBaselineOptions['allowUnits'],
  },

  /**
   * Allow certain JavaScript features to be used even if they are not baseline features.
   *
   * @see [baseline-js/use-baseline: options](https://github.com/eslint/baseline-js/blob/main/docs/rules/use-baseline.md#options)
   */
  javascript?: {
    /**
     * Feature IDs or regex patterns for features that are allowed to be used regardless of the baseline.
     *
     * @default []
     *
     * @see [baseline-js/use-baseline: `ignoreFeatures` option](https://github.com/3ru/eslint-plugin-baseline-js#options-rule)
     */
    ignoredFeatures?: RuleOptions<'baseline-js/use-baseline'>['ignoreFeatures'],

    /**
     * ESTree `node.type`s or regex patterns for node types that are allowed to be used regardless of the baseline.
     *
     * @default []
     *
     * @see [baseline-js/use-baseline: `ignoreNodeTypes` option](https://github.com/3ru/eslint-plugin-baseline-js#options-rule)
     */
    ignoredNodeTypes?: RuleOptions<'baseline-js/use-baseline'>['ignoreNodeTypes'],
  },
}

export type { BaselineOptions };
