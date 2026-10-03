import type { PluginRules, RuleOptions } from '#types/eslintRules.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options } from '#types/index.d.ts';

import { defaultOptions } from '#helpers/options/defaultOptions.ts';
import { isEnabled } from '#utils/isEnabled.ts';

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
  const { css, tailwind, baseline } = options.configs;
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

  const rules = {
    /* CSS */
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

    /* CSSicorn */
    'cssicorn/lowercase': 'error',
    'cssicorn/no-declarations-after-nested-rules': 'warn',
    'cssicorn/no-deprecated-features': 'error',
    'cssicorn/no-descending-specificity': 'warn',
    'cssicorn/no-duplicate-font-family-names': 'error',
    'cssicorn/no-duplicate-properties': 'warn',
    'cssicorn/no-duplicate-selectors': 'warn',
    'cssicorn/no-invalid-media-features': 'error',
    'cssicorn/no-nesting-with-mixed-specificity': 'warn',
    'cssicorn/no-redundant-nested-style-rules': 'warn',
    'cssicorn/no-redundant-shorthand-values': 'warn',
    'cssicorn/no-self-referencing-custom-properties': 'error',
    'cssicorn/no-unknown-animations': 'error',
    'cssicorn/no-unknown-annotations': 'error',
    'cssicorn/no-unknown-pseudo-selectors': ['error', { allow: userAllowedUnknownPseudoSelectors }],
    'cssicorn/no-unscoped-nesting-selector': isEnabled(tailwind) ? 'error' : ['error', { scopingRootAtRules: [] }],
    'cssicorn/no-zero-length-unit': 'warn',
    'cssicorn/prefer-explicit-viewport-units': 'warn',
    'cssicorn/prefer-media-feature-range-syntax': 'warn',
    'cssicorn/prefer-modern-syntax': 'warn',
    'cssicorn/require-property-descriptors': 'error',
  } satisfies PluginRules<'css'> & PluginRules<'cssicorn'>;

  return rules;
}

export { getCssRules };
