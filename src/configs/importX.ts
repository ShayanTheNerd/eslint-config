import type { Linter } from 'eslint';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options, ConfigObject } from '#types/index.d.ts';

import { mergeConfigs } from 'eslint-flat-config-utils';
import eslintPluginImportX from 'eslint-plugin-import-x';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';

import { globs } from '#helpers/globs.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { getImportXRules } from '#rules/importX.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';

type ImportXRules = ReturnType<typeof getImportXRules>;
type ImportXConfig = Linter.Config & { rules: ImportXRules };

function getImportXConfig(options: DeepNonNullable<Options>): ImportXConfig {
  const { vue, importX, typescript } = options.configs;
  const { overrides, removeUnusedImports } = isEnabled(importX) ? importX : defaultOptions.configs.importX;

  const importXConfig = {
    name: 'shayanthenerd/imports',
    files: isEnabled(vue) ? [globs.src, globs.vue] : [globs.src],
    plugins: {
      'import-x': eslintPluginImportX,
      ...(removeUnusedImports && { 'unused-imports': eslintPluginUnusedImports }),
    },
    settings: isEnabled(typescript) ? eslintPluginImportX.flatConfigs.typescript.settings : undefined,
    rules: getImportXRules(options),
  } satisfies ConfigObject;

  /* @ts-expect-error — Incompatible types */
  return mergeConfigs(importXConfig, overrides);
}

export { getImportXConfig };
