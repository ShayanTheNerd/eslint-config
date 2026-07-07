import type { Linter } from 'eslint';
import type { Options } from '#types/index.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

import { mergeConfigs } from 'eslint-flat-config-utils';
import eslintPluginImportX from 'eslint-plugin-import-x';

import { globs } from '#helpers/globs.ts';
import { isTruthy } from '#utils/isTruthy.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { getImportXRules } from '#rules/importX.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';

function getImportXConfig(options: DeepNonNullable<Options>): Linter.Config {
  const { vue, astro, importX, typescript } = options.configs;
  const { overrides } = isEnabled(importX) ? importX : defaultOptions.configs.importX;

  const importXConfig = {
    name: 'shayanthenerd/import-x',
    files: [
      globs.src,
      globs.jsxLike,
      isEnabled(vue) ? globs.vue : '',
      isEnabled(astro) ? globs.astro : '',
    ].filter(isTruthy),
    plugins: {
      'import-x': eslintPluginImportX,
    },
    settings: isEnabled(typescript) ? eslintPluginImportX.flatConfigs.typescript.settings : undefined,
    rules: getImportXRules(options),
  } satisfies Linter.Config;

  return mergeConfigs(importXConfig, overrides);
}

export { getImportXConfig };
