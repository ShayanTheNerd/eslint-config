import type { Linter } from 'eslint';
import type { Options } from '#types/index.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

import eslintPluginMarkdown from '@eslint/markdown';
import { mergeConfigs } from 'eslint-flat-config-utils';

import { globs } from '#helpers/globs.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { getMarkdownRules } from '#rules/markdown.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';

type MarkdownRules = ReturnType<typeof getMarkdownRules>;
type MarkdownConfig = Linter.Config & { rules: MarkdownRules };

function getMarkdownConfig(options: DeepNonNullable<Options>): MarkdownConfig {
  const { markdown } = options.configs;
  const { language, frontmatter, overrides } = isEnabled(markdown) ? markdown : defaultOptions.configs.markdown;

  const markdownConfig = {
    name: 'shayanthenerd/markdown',
    files: [globs.markdown],
    plugins: {
      markdown: eslintPluginMarkdown,
    },
    language: `markdown/${language}`,
    languageOptions: {
      math: true,
      frontmatter,
    },
    rules: getMarkdownRules(options),
  } satisfies Linter.Config;

  /* @ts-expect-error — Incorrect type inference */
  return mergeConfigs(markdownConfig, overrides);
}

export { getMarkdownConfig };
