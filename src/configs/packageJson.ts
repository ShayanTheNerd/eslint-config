import type { Linter } from 'eslint';
import type { Options } from '#types/index.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

import { mergeConfigs } from 'eslint-flat-config-utils';
import eslintPluginPackageJson from 'eslint-plugin-package-json';

import { globs } from '#helpers/globs.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { getPackageJsonRules } from '#rules/packageJson.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';

function getPackageJsonConfig(options: DeepNonNullable<Options>): Linter.Config {
  const { packageJson } = options.configs;
  const { overrides } = isEnabled(packageJson) ? packageJson : defaultOptions.configs.packageJson;

  const packageJsonConfig = {
    name: 'shayanthenerd/package-json',
    files: [globs.packageJson],
    plugins: {
      'package-json': eslintPluginPackageJson,
    },
    languageOptions: {
      parser: eslintPluginPackageJson.configs.recommended.languageOptions.parser,
    },
    rules: getPackageJsonRules(),
  } satisfies Linter.Config;

  return mergeConfigs(packageJsonConfig, overrides);
}

export { getPackageJsonConfig };
