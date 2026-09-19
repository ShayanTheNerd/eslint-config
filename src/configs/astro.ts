import type { Linter } from 'eslint';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options } from '#types/index.d.ts';

import * as eslintParserAstro from 'astro-eslint-parser';
import { mergeConfigs } from 'eslint-flat-config-utils';
import eslintPluginAstro from 'eslint-plugin-astro';
import { parser as eslintParserTypescript } from 'typescript-eslint';
import path from 'node:path';

import { globs } from '#helpers/globs.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';
import { getAstroRules } from '#rules/astro.ts';
import { isEnabled } from '#utils/isEnabled.ts';

function getAstroConfig(options: DeepNonNullable<Options>): Linter.Config {
  const { tsConfig, configs: { astro } } = options;
  const { overrides } = isEnabled(astro) ? astro : defaultOptions.configs.astro;

  const astroConfig = {
    name: 'shayanthenerd/astro',
    files: [globs.astro],
    plugins: {
      astro: eslintPluginAstro,
    },
    languageOptions: {
      globals: {
        Astro: 'readonly',
        Fragment: 'readonly',
      },
      parser: eslintParserAstro,
      parserOptions: {
        parser: eslintParserTypescript,
        projectService: false,
        project: tsConfig ? path.resolve(tsConfig.rootDir, tsConfig.filename) : undefined,
        tsconfigRootDir: tsConfig ? path.resolve(tsConfig.rootDir) : undefined,
        extraFileExtensions: ['.astro'],
      },
    },
    rules: getAstroRules(options),
  } satisfies Linter.Config;

  return mergeConfigs(astroConfig, overrides);
}

export { getAstroConfig };
