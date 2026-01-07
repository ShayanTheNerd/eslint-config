import type { Linter } from 'eslint';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options, ConfigObject } from '#types/index.d.ts';

import eslintPluginAstro from 'eslint-plugin-astro';
import { mergeConfigs } from 'eslint-flat-config-utils';
import * as eslintParserAstro from 'astro-eslint-parser';
import { parser as eslintParserTypeScript } from 'typescript-eslint';

import { globs } from '#helpers/globs.ts';
import { getAstroRules } from '#rules/astro.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';

type AstroRules = ReturnType<typeof getAstroRules>;
type AstroConfig = Linter.Config & { rules: AstroRules };

function getAstroConfig(options: DeepNonNullable<Options>): AstroConfig {
  const { astro } = options.configs;
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
        parser: eslintParserTypeScript,
        extraFileExtensions: ['.astro'],
      },
    },
    rules: getAstroRules(),
  } satisfies ConfigObject;

  /* @ts-expect-error — Incorrect type inference */
  return mergeConfigs(astroConfig, overrides);
}

export { getAstroConfig };
