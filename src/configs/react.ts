import type { Linter } from 'eslint';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options } from '#types/index.d.ts';

import { mergeConfigs } from 'eslint-flat-config-utils';
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginReact from '@eslint-react/eslint-plugin';
import eslintPluginHtmlReact from '@html-eslint/eslint-plugin-react';

import { globs } from '#helpers/globs.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';
import { getReactRules } from '#rules/react.ts';
import { isEnabled } from '#utils/isEnabled.ts';

function getReactConfig(options: DeepNonNullable<Options>): Linter.Config {
  const { react, unicorn } = options.configs;
  const { overrides, accessibility } = isEnabled(react) ? react : defaultOptions.configs.react;

  const reactConfig = {
    name: 'shayanthenerd/react',
    files: [globs.src, globs.jsxTsx],
    plugins: {
      '@eslint-react': eslintPluginReact,
      '@html-eslint/react': eslintPluginHtmlReact,
      ...(isEnabled(unicorn) && { unicorn: eslintPluginUnicorn }),
      ...(isEnabled(accessibility) && { 'jsx-a11y': eslintPluginJsxA11y }),
    },
    rules: getReactRules(options),
  } satisfies Linter.Config;

  return mergeConfigs(reactConfig, overrides);
}

export { getReactConfig };
