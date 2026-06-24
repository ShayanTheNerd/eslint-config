import type { ConfigWithOverrides } from '#types/index.d.ts';
import type { PluginRules, RuleOptions } from '#types/eslintRules.d.ts';

type ConfigRules = PluginRules<'react'>;

interface ReactOptions extends ConfigWithOverrides<ConfigRules> {
  /**
   * Use [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y) and [@html-eslint/eslint-plugin-react](https://html-eslint.org/docs/react/getting-started) to enforce accessibility standards for React components.
   *
   * @default true
   */
  accessibility?: boolean | {
    /**
     * Names of components that render an `<a>` element.
     *
     * New items extend the defaults instead of overriding them.
     *
     * This is used by
     * - [jsx-a11y/anchor-has-content: `components` option](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/anchor-has-content.md#rule-options)
     * - [jsx-a11y/anchor-is-valid: `components` option](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/anchor-is-valid.md#rule-options)
     *
     * @default ['Link', 'NextLink', 'NavLink']
     */
    anchorComponents?: RuleOptions<'jsx-a11y/anchor-has-content'>['components'],

    /**
     * Names of components that render a heading (`<h1>`...`<h6>`) element.
     *
     * New items extend the defaults instead of overriding them.
     *
     * @default ['H1', 'H2', 'H3', 'H4', 'H5', 'H6']
     *
     * @see [jsx-a11y/heading-has-content: `components` option](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/heading-has-content.md#rule-options)
     */
    headingComponents?: RuleOptions<'jsx-a11y/heading-has-content'>['components'],

    /**
     * Names of components that render an `<img>` element.
     *
     * New items extend the defaults instead of overriding them.
     *
     * This is used by
     * - [jsx-a11y/alt-text: `img` option](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/alt-text.md#rule-options)
     * - [jsx-a11y/img-redundant-alt: `components` option](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/img-redundant-alt.md#rule-options)
     *
     * @default ['Img', 'LazyImg', 'Image', 'LazyImage', 'NextImage', 'LazyNextImage']
     */
    imageComponents?: RuleOptions<'jsx-a11y/img-redundant-alt'>['components'],
  },
}

export type { ReactOptions };
