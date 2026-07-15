import type { Options } from '#types/index.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { PluginRules, RuleOptions } from '#types/eslintRules.d.ts';

import { isEnabled } from '#utils/isEnabled.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';

type PhysicalUnits = RuleOptions<'css/prefer-logical-properties'>['allowUnits'];
type PhysicalProperties = RuleOptions<'css/prefer-logical-properties'>['allowProperties'];

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
] satisfies PhysicalUnits;
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
] satisfies PhysicalProperties;

function getCssRules(options: DeepNonNullable<Options>) {
  const { useBaseline } = options.configs;
  const {
    allowedAtRules: userAllowedAtRules,
    allowedFunctions: userAllowedFunctions,
    allowedMediaConditions: userAllowedMediaConditions,
    allowedProperties: userAllowedProperties,
    allowedPropertyValues: userAllowedPropertyValues,
    allowedSelectors: userAllowedSelectors,
    allowedUnits: userAllowedUnits,
  } = isEnabled(useBaseline) ? useBaseline.css : defaultOptions.configs.useBaseline.css;

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
    'css/use-baseline': isEnabled(useBaseline) ? [
      'warn',
      {
        available: useBaseline.baseline,
        allowAtRules: userAllowedAtRules,
        allowFunctions: userAllowedFunctions,
        allowMediaConditions: userAllowedMediaConditions,
        allowProperties: userAllowedProperties,
        allowPropertyValues: userAllowedPropertyValues,
        allowSelectors: userAllowedSelectors,
        allowUnits: userAllowedUnits,
      },
    ] : 'off',
  } satisfies PluginRules<'css'>;

  return cssRules;
}

export { getCssRules };
