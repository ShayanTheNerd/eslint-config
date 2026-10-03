import type { PluginRules } from '#types/eslintRules.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options } from '#types/index.d.ts';

import { defaultOptions } from '#helpers/options/defaultOptions.ts';
import { isEnabled } from '#utils/isEnabled.ts';

type UnicornRules = Pick<
  PluginRules<'unicorn'>,
  | 'unicorn/no-javascript-url'
  | 'unicorn/no-empty-link-text'
  | 'unicorn/relative-url-style'
  | 'unicorn/no-missing-local-resource'
>;

function getMarkdownRules(options: DeepNonNullable<Options>) {
  const { unicorn, markdown } = options.configs;
  const {
    language,
    allowedHtmlTags: userAllowedHtmlTags,
  } = isEnabled(markdown) ? markdown : defaultOptions.configs.markdown;
  const isCommonMark = language === 'commonmark';

  const markdownRules = {
    'markdown/fenced-code-language': 'error',
    'markdown/heading-increment': 'warn',
    'markdown/no-bare-urls': isCommonMark ? 'off' : 'warn',
    'markdown/no-duplicate-definitions': isCommonMark ? 'off' : 'error',
    'markdown/no-duplicate-headings': 'error',
    'markdown/no-empty-definitions': isCommonMark ? 'off' : 'error',
    'markdown/no-empty-images': 'error',
    'markdown/no-empty-links': 'error',
    'markdown/no-html': ['warn', {
      allowed: [
        'u',
        'br',
        'rp',
        'rt',
        'kbd',
        'sub',
        'sup',
        'mark',
        'ruby',
        'small',
        'details',
        'summary',
        ...userAllowedHtmlTags,
      ],
    }],
    'markdown/no-invalid-label-refs': 'error',
    'markdown/no-missing-atx-heading-space': ['error', { checkClosedHeadings: true }],
    'markdown/no-missing-label-refs': ['error', {
      /* https://github.com/eslint/markdown/issues/294 */
      allowLabels: isCommonMark ? undefined : ['!TIP', '!NOTE', '!CAUTION', '!WARNING', '!IMPORTANT'],
    }],
    'markdown/no-missing-link-fragments': ['error', { ignoreCase: false }],
    'markdown/no-multiple-h1': 'error',
    'markdown/no-reference-like-urls': 'warn',
    'markdown/no-reversed-media-syntax': 'error',
    'markdown/no-space-in-emphasis': ['warn', { checkStrikethrough: !isCommonMark }],
    'markdown/no-unused-definitions': isCommonMark ? 'off' : 'warn',
    'markdown/require-alt-text': 'warn',
    'markdown/table-column-count': isCommonMark ? 'off' : ['error', { checkMissingCells: true }],
  } satisfies PluginRules<'markdown'>;

  const unicornRules = {
    'unicorn/no-javascript-url': 'error',
    'unicorn/no-empty-link-text': 'error',
    'unicorn/no-missing-local-resource': 'error',
    'unicorn/relative-url-style': 'warn',
  } satisfies UnicornRules;

  if (isEnabled(unicorn)) {
    Object.assign(markdownRules, unicornRules);
  }

  return markdownRules;
}

export { getMarkdownRules };
