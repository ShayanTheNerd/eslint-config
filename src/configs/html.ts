import type { Linter } from 'eslint';
import type { Options } from '#types/index.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

import { mergeConfigs } from 'eslint-flat-config-utils';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginHtml from '@html-eslint/eslint-plugin';

import { globs } from '#helpers/globs.ts';
import { getHtmlRules } from '#rules/html.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';

function getHtmlConfig(options: DeepNonNullable<Options>): Linter.Config {
  const { html, unicorn } = options.configs;
  const { overrides } = isEnabled(html) ? html : defaultOptions.configs.html;

  const htmlConfig = {
    name: 'shayanthenerd/html',
    files: [globs.src, globs.html],
    plugins: {
      '@html-eslint': eslintPluginHtml,
      ...(isEnabled(unicorn) && { unicorn: eslintPluginUnicorn }),
    },
    languageOptions: {
      parser: eslintPluginHtml.configs['flat/recommended'].languageOptions.parser,
    },
    rules: getHtmlRules(options),
  } satisfies Linter.Config;

  return mergeConfigs(htmlConfig, overrides);
}

export { getHtmlConfig };
