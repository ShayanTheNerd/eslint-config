import type { PluginRules, RuleOptions } from '#types/eslintRules.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options } from '#types/index.d.ts';

import { defaultOptions } from '#helpers/options/defaultOptions.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { isTruthy } from '#utils/isTruthy.ts';

type UnicornRules = Pick<
  PluginRules<'unicorn'>,
  | 'unicorn/no-invalid-media-features'
  | 'unicorn/no-deprecated-css-features'
  | 'unicorn/no-duplicate-css-selectors'
  | 'unicorn/no-unknown-css-annotations'
  | 'unicorn/no-unknown-pseudo-selectors'
  | 'unicorn/no-duplicate-font-family-names'
  | 'unicorn/prefer-explicit-viewport-units'
  | 'unicorn/no-redundant-nested-style-rules'
  | 'unicorn/no-shorthand-property-overrides'
  | 'unicorn/no-unscoped-css-nesting-selector'
  | 'unicorn/no-nesting-with-mixed-specificity'
  | 'unicorn/prefer-media-feature-range-syntax'
>;
type CssRules = UnicornRules & PluginRules<'css'>;

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
] satisfies RuleOptions<'css/prefer-logical-properties'>['allowUnits'];
const allowedPhysicalProperties = [
  'top',
  'bottom',
  'padding-top',
  'padding-bottom',
  'margin-top',
  'margin-bottom',
  'border-top',
  'border-top-color',
  'border-top-style',
  'border-top-width',
  'border-bottom',
  'border-bottom-color',
  'border-bottom-style',
  'border-bottom-width',
  'width',
  'min-width',
  'max-width',
  'height',
  'min-height',
  'max-height',
  'overflow-x',
  'overflow-y',
  'overscroll-behavior-x',
  'overscroll-behavior-y',
  'scroll-padding-top',
  'scroll-padding-bottom',
  'scroll-margin-top',
  'scroll-margin-bottom',
  'contain-intrinsic-width',
  'contain-intrinsic-height',
] satisfies RuleOptions<'css/prefer-logical-properties'>['allowProperties'];

function getCssRules(options: DeepNonNullable<Options>) {
  const { css, vue, unicorn, tailwind, baseline } = options.configs;
  const {
    allowedUnknownPseudoSelectors: userAllowedUnknownPseudoSelectors,
  } = isEnabled(css) ? css : defaultOptions.configs.css;
  const {
    allowedAtRules: userAllowedAtRules,
    allowedFunctions: userAllowedFunctions,
    allowedMediaConditions: userAllowedMediaConditions,
    allowedProperties: userAllowedProperties,
    allowedPropertyValues: userAllowedPropertyValues,
    allowedSelectors: userAllowedSelectors,
    allowedUnits: userAllowedUnits,
  } = isEnabled(baseline) ? baseline.css : defaultOptions.configs.baseline.css;

  const cssRules = {
    'css/font-family-fallbacks': 'warn',
    'css/no-duplicate-imports': 'error',
    'css/no-duplicate-keyframe-selectors': 'error',
    'css/no-empty-blocks': 'error',
    'css/no-important': 'warn',
    'css/no-invalid-at-rule-placement': 'error',
    'css/no-invalid-at-rules': isEnabled(tailwind) ? 'off' : 'error', // Reports many Tailwind-related false positives.
    'css/no-invalid-named-grid-areas': 'error',
    'css/no-invalid-properties': ['error', { allowUnknownVariables: true }],
    'css/no-unmatchable-selectors': 'error',
    'css/prefer-logical-properties': ['error', {
      allowUnits: allowedPhysicalUnits,
      allowProperties: allowedPhysicalProperties,
    }],
    'css/relative-font-units': ['warn', {
      allowUnits: ['cap', 'ch', 'em', 'ex', 'ic', 'lh', 'rcap', 'rch', 'rem', 'ric', 'rlh'],
    }],
    'css/use-baseline': isEnabled(baseline) ? [
      'warn',
      {
        available: baseline.baseline,
        allowAtRules: userAllowedAtRules,
        allowFunctions: userAllowedFunctions,
        allowMediaConditions: userAllowedMediaConditions,
        allowProperties: userAllowedProperties,
        allowPropertyValues: {
          'background-clip': ['text'],
          ...userAllowedPropertyValues,
        },
        allowSelectors: ['selection', ...userAllowedSelectors],
        allowUnits: userAllowedUnits,
      },
    ] : 'off',
  } satisfies CssRules;

  const unicornRules = {
    'unicorn/no-deprecated-css-features': 'error',
    'unicorn/no-duplicate-css-selectors': 'warn',
    'unicorn/no-duplicate-font-family-names': 'error',
    'unicorn/no-invalid-media-features': 'error',
    'unicorn/no-nesting-with-mixed-specificity': 'warn',
    'unicorn/no-redundant-nested-style-rules': 'warn',
    'unicorn/no-shorthand-property-overrides': 'warn',
    'unicorn/no-unknown-css-annotations': 'error',
    'unicorn/no-unknown-pseudo-selectors': ['error', {
      allow: [
        '::-ms-reveal',
        ':-webkit-autofill',
        '::-webkit-inner-spin-button',
        '::-webkit-search-cancel-button',
        '::-webkit-search-results-button',
        ...(isEnabled(vue) ? [':deep', ':global', ':slotted'] : []),
        ...userAllowedUnknownPseudoSelectors,
      ].filter(isTruthy),
    }],
    'unicorn/no-unscoped-css-nesting-selector': (
      isEnabled(tailwind) ? ['error', { scopingRootAtRules: ['utility', 'custom-variant'] }] : 'error'
    ),
    'unicorn/prefer-explicit-viewport-units': 'warn',
    'unicorn/prefer-media-feature-range-syntax': 'warn',
  } satisfies UnicornRules;

  if (isEnabled(unicorn)) {
    Object.assign(cssRules, unicornRules);
  }

  return cssRules;
}

export { getCssRules };
