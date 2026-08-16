import type { Linter } from 'eslint';
import type { Options } from '#types/index.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

import { mergeConfigs } from 'eslint-flat-config-utils';
import { plugin as eslintPluginTypecript, parser as eslintParserTypescript } from 'typescript-eslint';
import path from 'node:path';

import { globs } from '#helpers/globs.ts';
import { isTruthy } from '#utils/isTruthy.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { getTypescriptRules } from '#rules/typescript.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';

function getTypescriptConfig(options: DeepNonNullable<Options>): Linter.Config {
  const { tsConfig, configs: { vue, astro, typescript } } = options;
  const { allowedDefaultProjects } = isEnabled(typescript) ? typescript : defaultOptions.configs.typescript;
  const { overrides } = isEnabled(typescript) ? typescript : defaultOptions.configs.typescript;

  const typescriptConfig = {
    name: 'shayanthenerd/typescript',
    files: [
      globs.src,
      globs.jsxTsx,
      isEnabled(vue) ? globs.vue : '',
      isEnabled(astro) ? globs.astro : '',
    ].filter(isTruthy),
    plugins: {
      '@typescript-eslint': eslintPluginTypecript,
    },
    languageOptions: {
      parser: eslintParserTypescript,
      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
        tsconfigRootDir: tsConfig ? path.resolve(tsConfig.rootDir) : undefined,
        projectService: {
          defaultProject: tsConfig ? tsConfig.filename : undefined,
          allowDefaultProject: ['{prettier,eslint}.config.?([mc])ts', ...allowedDefaultProjects],
        },
      },
    },
    rules: getTypescriptRules(options),
  } satisfies Linter.Config;

  return mergeConfigs(typescriptConfig, overrides);
}

export { getTypescriptConfig };
