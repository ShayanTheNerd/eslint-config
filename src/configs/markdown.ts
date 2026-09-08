import type { Linter } from 'eslint';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options } from '#types/index.d.ts';

import { mergeConfigs } from 'eslint-flat-config-utils';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginMarkdown from '@eslint/markdown';

import { globs } from '#helpers/globs.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';
import { getMarkdownRules } from '#rules/markdown.ts';
import { isEnabled } from '#utils/isEnabled.ts';

function getMarkdownConfig(options: DeepNonNullable<Options>): Linter.Config {
  const { unicorn, markdown } = options.configs;
  const { language, frontmatter, overrides } = isEnabled(markdown) ? markdown : defaultOptions.configs.markdown;

  const markdownConfig = {
    name: 'shayanthenerd/markdown',
    files: [globs.markdown],
    plugins: {
      markdown: eslintPluginMarkdown,
      ...(isEnabled(unicorn) && { unicorn: eslintPluginUnicorn }),
    },
    language: `markdown/${language}`,
    languageOptions: {
      math: true,
      frontmatter,
    },
    rules: getMarkdownRules(options),
  } satisfies Linter.Config;

  return mergeConfigs(markdownConfig, overrides);
}

export { getMarkdownConfig };
