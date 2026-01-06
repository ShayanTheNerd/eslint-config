import type { Options } from '#types/index.d.ts';
import type { PluginRules } from '#types/eslintRules.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

import path from 'node:path';

import { isEnabled } from '#utils/isEnabled.ts';
import { defaultOptions } from '#utils/options/defaultOptions.ts';

function getImportXRules(options: DeepNonNullable<Options>) {
  const {
    packageDir,
    configs: {
      importX,
      typescript,
    },
  } = options;
  const isTypeScriptEnabled = isEnabled(typescript);
  const { removeUnusedImports } = isEnabled(importX) ? importX : defaultOptions.configs.importX;

  const importXRules = {
    'unused-imports/no-unused-imports': removeUnusedImports ? 'warn' : 'off',

    /* Helpful Warnings */
    'import-x/export': isTypeScriptEnabled ? 'off' : 'error',
    'import-x/no-deprecated': 'warn',
    'import-x/no-empty-named-blocks': 'error',
    'import-x/no-extraneous-dependencies': ['error', {
      includeTypes: true,
      packageDir: path.resolve(packageDir),
    }],
    'import-x/no-mutable-exports': 'error',
    'import-x/no-named-as-default': 'error',
    'import-x/no-named-as-default-member': 'off',

    /* Module Systems */
    'import-x/no-amd': 'error',
    'import-x/no-commonjs': 'error',
    'import-x/no-import-module-exports': 'error',

    /* Static Analysis */
    'import-x/named': isTypeScriptEnabled ? 'off' : 'error',
    'import-x/default': isTypeScriptEnabled ? 'off' : 'error',
    'import-x/namespace': ['error', { allowComputed: true }],
    'import-x/no-absolute-path': 'warn',
    'import-x/no-cycle': ['error', { maxDepth: 1, ignoreExternal: true }],
    'import-x/no-self-import': 'error',
    'import-x/no-unresolved': isTypeScriptEnabled ? 'off' : 'error',
    'import-x/no-useless-path-segments': 'error',

    /* Style Guide */
    'import-x/consistent-type-specifier-style': 'warn',
    'import-x/exports-last': 'warn',
    'import-x/first': ['warn', 'disable-absolute-first'],
    'import-x/group-exports': 'warn',
    'import-x/no-duplicates': ['error', { considerQueryString: true }],
    'import-x/no-named-default': 'error',
  } satisfies PluginRules<'import-x'> & PluginRules<'unused-imports'>;

  return importXRules;
}

export { getImportXRules };
