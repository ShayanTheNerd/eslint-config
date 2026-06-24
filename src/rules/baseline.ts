import type { Options } from '#types/index.d.ts';
import type { PluginRules } from '#types/eslintRules.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

import { isEnabled } from '#utils/isEnabled.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';

function getBaselineRules(options: DeepNonNullable<Options>) {
  const { useBaseline } = options.configs;
  const {
    baseline,
    javascript: {
      ignoredFeatures: userIgnoredFeatures,
      ignoredNodeTypes: userIgnoredNodeTypes,
    },
  } = isEnabled(useBaseline) ? useBaseline : defaultOptions.configs.useBaseline;

  const baselineRules = {
    'baseline-js/no-atomics-pause': 'warn',
    'baseline-js/no-bigint64array': 'warn',
    'baseline-js/no-function-caller-arguments': 'warn',
    'baseline-js/no-math-sum-precise': 'warn',
    'baseline-js/no-temporal': 'warn',
    'baseline-js/use-baseline': ['warn', {
      baseline,
      includeWebApis: {
        preset: 'auto',
      },
      includeJsBuiltins: {
        preset: 'auto',
      },
      ignoreFeatures: userIgnoredFeatures,
      ignoreNodeTypes: userIgnoredNodeTypes,
    }],
  } satisfies PluginRules<'baseline-js'>;

  return baselineRules;
}

export { getBaselineRules };
