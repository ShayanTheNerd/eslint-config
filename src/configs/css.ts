import type { Linter } from 'eslint';
import type { Options } from '#types/index.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

import eslintPluginCss from '@eslint/css';
import { mergeConfigs } from 'eslint-flat-config-utils';
import { tailwind3, tailwind4 } from 'tailwind-csstree';

import { globs } from '#helpers/globs.ts';
import { getCssRules } from '#rules/css.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';

function getCssConfig(options: DeepNonNullable<Options>): Linter.Config {
  const { css, tailwind } = options.configs;
  const { overrides } = isEnabled(css) ? css : defaultOptions.configs.css;
  const tailwindSyntax = isEnabled(tailwind) && tailwind.entryPoint ? tailwind4 : tailwind3;

  const cssConfig = {
    name: 'shayanthenerd/css',
    files: [globs.css],
    plugins: {
      css: eslintPluginCss,
    },
    language: 'css/css',
    languageOptions: {
      tolerant: true,
      customSyntax: isEnabled(tailwind) ? tailwindSyntax : undefined,
    },
    rules: getCssRules(options),
  } satisfies Linter.Config;

  return mergeConfigs(cssConfig, overrides);
}

export { getCssConfig };
