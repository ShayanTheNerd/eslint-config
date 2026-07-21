import type { Options } from '#types/index.d.ts';
import type { PluginRules } from '#types/eslintRules.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

import { isEnabled } from '#utils/isEnabled.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';

type HtmlAndReactRuleNames = keyof PluginRules<'@html-eslint'>;
type HtmlReactRuleNames = Extract<HtmlAndReactRuleNames, `@html-eslint/react/${string}`>;
type HtmlReactRules = Pick<PluginRules<'@html-eslint'>, HtmlReactRuleNames>;

type ReactRuleNames = keyof PluginRules<'@eslint-react'>;
type ReactRuleNamesNotPrefixedWithX = Exclude<ReactRuleNames, `@eslint-react/x-${string}`>;
type ReactRulesNotPrefixedWithX = Pick<PluginRules<'@eslint-react'>, ReactRuleNamesNotPrefixedWithX>;

type UnicornRules = PluginRules<'unicorn'>;
type TailwindRules = PluginRules<'better-tailwindcss'>;

type ReactAndHtmlReactRules =
  & HtmlReactRules
  & ReactRulesNotPrefixedWithX
  & Pick<UnicornRules, 'unicorn/no-invalid-file-input-accept'>
  & Pick<TailwindRules, 'better-tailwindcss/no-duplicate-classes'>;

const commonCallees = ['classnames', 'classNames', 'clsx', 'cx', 'cva', 'cn', 'twMerge', 'twJoin', 'classcat', 'ctl'];

function getReactRules(options: DeepNonNullable<Options>) {
  const { react, unicorn, tailwind, useBaseline } = options.configs;
  const {
    imageComponents: userImageComponents,
    anchorComponents: userAnchorComponents,
    headingComponents: userHeadingComponents,
  } = isEnabled(react) && isEnabled(react.accessibility)
    ? react.accessibility
    : defaultOptions.configs.react.accessibility;

  const jsxA11yRules = {
    'jsx-a11y/alt-text': ['error', { img: userImageComponents }],
    'jsx-a11y/anchor-ambiguous-text': 'warn',
    'jsx-a11y/anchor-has-content': ['error', { components: userAnchorComponents }],
    'jsx-a11y/anchor-is-valid': ['error', {
      specialLink: ['to'],
      components: userAnchorComponents,
    }],
    'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-role': 'error',
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/autocomplete-valid': 'error',
    'jsx-a11y/click-events-have-key-events': 'error',
    'jsx-a11y/control-has-associated-label': 'error',
    'jsx-a11y/heading-has-content': ['error', { components: userHeadingComponents }],
    'jsx-a11y/html-has-lang': 'error',
    'jsx-a11y/iframe-has-title': 'error',
    'jsx-a11y/img-redundant-alt': ['error', { components: userImageComponents }],
    'jsx-a11y/interactive-supports-focus': 'error',
    'jsx-a11y/label-has-associated-control': 'error',
    'jsx-a11y/lang': 'error',
    'jsx-a11y/media-has-caption': 'error',
    'jsx-a11y/mouse-events-have-key-events': 'error',
    'jsx-a11y/no-access-key': 'warn',
    'jsx-a11y/no-aria-hidden-on-focusable': 'error',
    'jsx-a11y/no-autofocus': 'warn',
    'jsx-a11y/no-distracting-elements': 'warn',
    'jsx-a11y/no-interactive-element-to-noninteractive-role': 'error',
    'jsx-a11y/no-noninteractive-element-interactions': 'error',
    'jsx-a11y/no-noninteractive-element-to-interactive-role': 'error',
    'jsx-a11y/no-noninteractive-tabindex': 'error',
    'jsx-a11y/no-redundant-roles': 'warn',
    'jsx-a11y/no-static-element-interactions': 'warn',
    'jsx-a11y/prefer-tag-over-role': 'warn',
    'jsx-a11y/role-has-required-aria-props': 'warn',
    'jsx-a11y/role-supports-aria-props': 'warn',
    'jsx-a11y/scope': 'error',
    'jsx-a11y/tabindex-no-positive': 'error',
  } satisfies PluginRules<'jsx-a11y'>;

  const reactAndHtmlReactRules = {
    /*** @eslint/react ***/
    /* X Rules */
    '@eslint-react/error-boundaries': 'error',
    '@eslint-react/exhaustive-deps': 'error',
    '@eslint-react/globals': 'error',
    '@eslint-react/immutability': 'error',
    '@eslint-react/no-access-state-in-setstate': 'error',
    '@eslint-react/no-array-index-key': 'warn',
    '@eslint-react/no-children-count': 'error',
    '@eslint-react/no-children-for-each': 'error',
    '@eslint-react/no-children-map': 'error',
    '@eslint-react/no-children-only': 'error',
    '@eslint-react/no-children-to-array': 'error',
    '@eslint-react/no-class-component': 'warn',
    '@eslint-react/no-clone-element': 'error',
    '@eslint-react/no-component-will-mount': 'error',
    '@eslint-react/no-component-will-receive-props': 'error',
    '@eslint-react/no-component-will-update': 'error',
    '@eslint-react/no-context-provider': 'error',
    '@eslint-react/no-create-ref': 'error',
    '@eslint-react/no-direct-mutation-state': 'error',
    '@eslint-react/no-duplicate-key': 'error',
    '@eslint-react/no-forward-ref': 'warn',
    '@eslint-react/no-implicit-children': 'warn',
    '@eslint-react/no-implicit-key': 'warn',
    '@eslint-react/no-implicit-ref': 'warn',
    '@eslint-react/no-leaked-conditional-rendering': 'error',
    '@eslint-react/no-missing-component-display-name': 'warn',
    '@eslint-react/no-missing-context-display-name': 'warn',
    '@eslint-react/no-missing-key': 'error',
    '@eslint-react/no-misused-capture-owner-stack': 'error',
    '@eslint-react/no-nested-component-definitions': 'error',
    '@eslint-react/no-nested-lazy-component-declarations': 'error',
    '@eslint-react/no-set-state-in-component-did-mount': 'error',
    '@eslint-react/no-set-state-in-component-did-update': 'error',
    '@eslint-react/no-set-state-in-component-will-update': 'error',
    '@eslint-react/no-unnecessary-use-prefix': 'warn',
    '@eslint-react/no-unsafe-component-will-mount': 'error',
    '@eslint-react/no-unsafe-component-will-receive-props': 'error',
    '@eslint-react/no-unsafe-component-will-update': 'error',
    '@eslint-react/no-unstable-context-value': 'error',
    '@eslint-react/no-unstable-default-props': 'error',
    '@eslint-react/no-unused-class-component-members': 'error',
    '@eslint-react/no-unused-props': 'error',
    '@eslint-react/no-unused-state': 'error',
    '@eslint-react/no-use-context': 'warn',
    '@eslint-react/purity': 'error',
    '@eslint-react/refs': 'error',
    '@eslint-react/rules-of-hooks': 'error',
    '@eslint-react/set-state-in-effect': 'warn',
    '@eslint-react/set-state-in-render': 'error',
    '@eslint-react/static-components': 'warn',
    '@eslint-react/unsupported-syntax': 'error',
    '@eslint-react/use-memo': 'error',
    '@eslint-react/use-state': 'warn',

    /* JSX Rules */
    '@eslint-react/jsx-no-children-prop': 'warn',
    '@eslint-react/jsx-no-children-prop-with-children': 'error',
    '@eslint-react/jsx-no-comment-textnodes': 'error',
    '@eslint-react/jsx-no-key-after-spread': 'warn',
    '@eslint-react/jsx-no-namespace': 'error',
    '@eslint-react/jsx-no-useless-fragment': 'warn',

    /* RSC Rules */
    '@eslint-react/rsc-function-definition': 'error',

    /* DOM Rules */
    '@eslint-react/dom-no-dangerously-set-innerhtml': 'warn',
    '@eslint-react/dom-no-dangerously-set-innerhtml-with-children': 'error',
    '@eslint-react/dom-no-find-dom-node': 'error',
    '@eslint-react/dom-no-flush-sync': 'warn',
    '@eslint-react/dom-no-hydrate': 'error',
    '@eslint-react/dom-no-missing-button-type': 'error',
    '@eslint-react/dom-no-missing-iframe-sandbox': 'error',
    '@eslint-react/dom-no-render': 'error',
    '@eslint-react/dom-no-render-return-value': 'error',
    '@eslint-react/dom-no-script-url': 'error',
    '@eslint-react/dom-no-string-style-prop': 'error',
    '@eslint-react/dom-no-unknown-property': ['error', { requireDataLowercase: true }],
    '@eslint-react/dom-no-unsafe-iframe-sandbox': 'error',
    '@eslint-react/dom-no-unsafe-target-blank': 'warn',
    '@eslint-react/dom-no-use-form-state': 'warn',
    '@eslint-react/dom-no-void-elements-with-children': 'error',

    /* Web API Rules */
    '@eslint-react/web-api-no-leaked-event-listener': 'error',
    '@eslint-react/web-api-no-leaked-fetch': 'error',
    '@eslint-react/web-api-no-leaked-intersection-observer': 'error',
    '@eslint-react/web-api-no-leaked-interval': 'error',
    '@eslint-react/web-api-no-leaked-resize-observer': 'error',
    '@eslint-react/web-api-no-leaked-timeout': 'error',

    /* Naming Convention Rules */
    '@eslint-react/naming-convention-context-name': 'warn',
    '@eslint-react/naming-convention-id-name': 'warn',
    '@eslint-react/naming-convention-ref-name': 'warn',

    /*** @html-eslint/react ***/
    '@html-eslint/react/no-invalid-attr-value': 'error',
    '@html-eslint/react/use-baseline': isEnabled(useBaseline) ? ['warn', { available: useBaseline.baseline }] : 'off',
    '@html-eslint/react/no-ineffective-attrs': 'warn',
    '@html-eslint/react/no-obsolete-attrs': 'error',
    '@html-eslint/react/no-obsolete-tags': 'error',
    '@html-eslint/react/classname-spacing': ['warn', { callees: commonCallees }],
    '@html-eslint/react/no-duplicate-classname': ['warn', { callees: commonCallees }],
  } satisfies ReactAndHtmlReactRules;

  if (isEnabled(tailwind)) {
    (reactAndHtmlReactRules as ReactAndHtmlReactRules)['better-tailwindcss/no-duplicate-classes'] = 'off';
  }

  if (isEnabled(unicorn)) {
    (reactAndHtmlReactRules as ReactAndHtmlReactRules)['unicorn/no-invalid-file-input-accept'] = 'error';
  }

  const isReactAccessibilityEnabled = isEnabled(react) && isEnabled(react.accessibility);
  const reactRules = {
    ...reactAndHtmlReactRules,
    ...(isReactAccessibilityEnabled && jsxA11yRules),
  };

  return reactRules;
}

export { getReactRules };
