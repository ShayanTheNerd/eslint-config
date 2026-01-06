import type { RuleOptions } from '#types/eslintRules.d.ts';

type AnchorHasContentRuleOptions = RuleOptions<'vuejs-accessibility/anchor-has-content'>;

interface VueAccessibilityOptions {
  /**
   * Names of components that render an `<a>` element.
   *
   * New items extend the defaults, they don't override it.
   *
   * @default ['RouterLink', 'NuxtLink', 'ULink']
   *
   * @see [vuejs-accessibility/anchor-has-content: `components` option](https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/anchor-has-content#%F0%9F%94%A7-options)
   */
  anchorComponents?: AnchorHasContentRuleOptions['components'],

  /**
   * Names of components that render an `<img>` element.
   *
   * New items extend the defaults, they don't override it.
   *
   * @default ['NuxtImg']
   *
   * @see [vuejs-accessibility/alt-text: `img` option](https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/alt-text#%F0%9F%94%A7-options)
   */
  imageComponents?: RuleOptions<'vuejs-accessibility/alt-text'>['img'],

  /**
   * Names of components that should be considered accessible child elements.
   *
   * New items extend the defaults, they don't override it.
   *
   * @default ['img', 'picture', 'NuxtImg', 'NuxtPicture', 'UBadge']
   *
   * @see [vuejs-accessibility/anchor-has-content: `accessibleChildren` option](https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility/rules/anchor-has-content#%F0%9F%94%A7-options)
   */
  accessibleChildComponents?: AnchorHasContentRuleOptions['accessibleChildren'],
}

export type { VueAccessibilityOptions };
