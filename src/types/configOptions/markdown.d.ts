import type { ConfigWithOverrides } from '#types/index.d.ts';
import type { PluginRules, RuleOptions } from '#types/eslintRules.d.ts';

type ConfigRules = PluginRules<'markdown'>;

interface MarkdownOptions extends ConfigWithOverrides<ConfigRules> {
  /**
   * List of HTML tags that are allowed in Markdown files.
   *
   * New items extend the defaults instead of overriding them.
   *
   * @default ['u', 'br', 'rp', 'rt', 'kbd', 'sub', 'sup', 'mark', 'ruby', 'small', 'details', 'summary']
   *
   * @see [markdown/no-html: `allowed` option](https://github.com/eslint/markdown/blob/main/docs/rules/no-html.md#options)
   */
  allowedHtmlTags?: RuleOptions<'markdown/no-html'>['allowed'],

  /**
   * Enable support for frontmatter in Markdown files.
   *
   * @default 'yaml'
   *
   * @see [@eslint/markdown: `languageOptions.frontmatter` option](https://github.com/eslint/markdown#enabling-front-matter-in-both-commonmark-and-gfm)
   */
  frontmatter?: false | 'json' | 'toml' | 'yaml',

  /**
   * Specify the Markdown flavor. (GFM: GitHub-Flavored Markdown)
   *
   * The following rules are not supported when using `commonmark`:
   * - [`markdown/no-bare-urls`](https://github.com/eslint/markdown/blob/main/docs/rules/no-bare-urls.md)
   * - [`markdown/no-duplicate-definitions`](https://github.com/eslint/markdown/blob/main/docs/rules/no-duplicate-definitions.md)
   * - [`markdown/no-empty-definitions`](https://github.com/eslint/markdown/blob/main/docs/rules/no-empty-definitions.md)
   * - [`markdown/no-unused-definitions`](https://github.com/eslint/markdown/blob/main/docs/rules/no-unused-definitions.md)
   * - [`markdown/table-column-count`](https://github.com/eslint/markdown/blob/main/docs/rules/table-column-count.md)
   *
   * @default 'gfm'
   *
   * @see [@eslint/markdown: `language` option](https://github.com/eslint/markdown#languages)
   */
  language?: 'gfm' | 'commonmark',
}

export type { MarkdownOptions };
