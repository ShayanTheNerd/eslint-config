import type { Linter } from 'eslint';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options, ConfigObject } from '#types/index.d.ts';

import eslintPluginCSS from '@eslint/css';
import { mergeConfigs } from 'eslint-flat-config-utils';
import { tailwind3, tailwind4 } from 'tailwind-csstree';

import { globs } from '#utils/globs.ts';
import { getCSSRules } from '#rules/css.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { defaultOptions } from '#utils/options/defaultOptions.ts';

type CSSRules = ReturnType<typeof getCSSRules>;
type CSSConfig = Linter.Config & { rules: CSSRules };

function getCSSConfig(options: DeepNonNullable<Options>): CSSConfig {
  const { css, tailwind } = options.configs;
  const { overrides } = isEnabled(css) ? css : defaultOptions.configs.css;
  const tailwindSyntax = isEnabled(tailwind) && tailwind.entryPoint ? tailwind4 : tailwind3;

  const cssConfig = {
    name: 'shayanthenerd/css',
    files: [globs.css],
    plugins: {
      css: eslintPluginCSS,
    },
    language: 'css/css',
    languageOptions: {
      tolerant: true,
      customSyntax: isEnabled(tailwind) ? tailwindSyntax : undefined,
    } as Linter.LanguageOptions,
    rules: getCSSRules(options),
  } satisfies ConfigObject;

  /* @ts-expect-error — Incompatible `parser` types */
  return mergeConfigs(cssConfig, overrides);
}

export { getCSSConfig };
