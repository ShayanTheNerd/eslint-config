import type { PluginRules } from '#types/eslintRules.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options } from '#types/index.d.ts';

import { defaultOptions } from '#helpers/options/defaultOptions.ts';
import { isEnabled } from '#utils/isEnabled.ts';

type ImportXRules = PluginRules<'import-x'>;
type StylisticRules = PluginRules<'@stylistic'>;
type AstroRules =
  & PluginRules<'astro'>
  & Pick<ImportXRules, 'import-x/exports-last'>
  & Pick<StylisticRules, '@stylistic/jsx-one-expression-per-line'>;
type AstroJsxA11yRuleNames = Extract<keyof AstroRules, `astro/jsx-a11y/${string}`>;
type AstroJsxA11yRules = Pick<AstroRules, AstroJsxA11yRuleNames>;

function getAstroRules(options: DeepNonNullable<Options>) {
  const { astro, importX, stylistic } = options.configs;
  const { semi } = isEnabled(stylistic) ? stylistic : defaultOptions.configs.stylistic;
  const { accessibility } = isEnabled(astro) ? astro : defaultOptions.configs.astro;

  const astroRules = {
    /* Possible Errors */
    'astro/missing-client-only-directive-value': 'error',
    'astro/no-conflict-set-directives': 'error',
    'astro/no-deprecated-astro-canonicalurl': 'error',
    'astro/no-deprecated-astro-fetchcontent': 'error',
    'astro/no-deprecated-astro-resolve': 'error',
    'astro/no-deprecated-getentrybyslug': 'error',
    'astro/no-exports-from-components': 'error',
    'astro/no-prerender-export-outside-pages': 'error',
    'astro/no-unused-define-vars-in-style': 'warn',

    /* Security Vulnerability */
    'astro/no-set-html-directive': 'warn',
    'astro/no-unsafe-inline-scripts': 'warn',

    /* Best Practices */
    'astro/no-set-text-directive': 'warn',
    'astro/no-unused-css-selector': 'warn',

    /* Stylistic Issues */
    'astro/prefer-class-list-directive': 'warn',
    'astro/prefer-split-class-list': 'warn',

    /* Extensions */
    'astro/semi': ['warn', semi],
  } satisfies AstroRules;

  const astroJsxA11yRules = {
    'astro/jsx-a11y/alt-text': 'error',
    'astro/jsx-a11y/anchor-ambiguous-text': 'warn',
    'astro/jsx-a11y/anchor-has-content': 'warn',
    'astro/jsx-a11y/anchor-is-valid': 'error',
    'astro/jsx-a11y/aria-activedescendant-has-tabindex': 'warn',
    'astro/jsx-a11y/aria-props': 'error',
    'astro/jsx-a11y/aria-proptypes': 'error',
    'astro/jsx-a11y/aria-role': 'warn',
    'astro/jsx-a11y/aria-unsupported-elements': 'error',
    'astro/jsx-a11y/autocomplete-valid': 'error',
    'astro/jsx-a11y/click-events-have-key-events': 'warn',
    'astro/jsx-a11y/control-has-associated-label': 'warn',
    'astro/jsx-a11y/heading-has-content': 'warn',
    'astro/jsx-a11y/html-has-lang': 'error',
    'astro/jsx-a11y/iframe-has-title': 'warn',
    'astro/jsx-a11y/img-redundant-alt': 'warn',
    'astro/jsx-a11y/interactive-supports-focus': 'warn',
    'astro/jsx-a11y/label-has-associated-control': 'warn',
    'astro/jsx-a11y/lang': 'error',
    'astro/jsx-a11y/media-has-caption': 'warn',
    'astro/jsx-a11y/mouse-events-have-key-events': 'warn',
    'astro/jsx-a11y/no-access-key': 'warn',
    'astro/jsx-a11y/no-aria-hidden-on-focusable': 'error',
    'astro/jsx-a11y/no-autofocus': 'warn',
    'astro/jsx-a11y/no-distracting-elements': 'warn',
    'astro/jsx-a11y/no-interactive-element-to-noninteractive-role': 'warn',
    'astro/jsx-a11y/no-noninteractive-element-interactions': 'warn',
    'astro/jsx-a11y/no-noninteractive-element-to-interactive-role': 'warn',
    'astro/jsx-a11y/no-noninteractive-tabindex': 'warn',
    'astro/jsx-a11y/no-redundant-roles': 'warn',
    'astro/jsx-a11y/no-static-element-interactions': 'warn',
    'astro/jsx-a11y/prefer-tag-over-role': 'warn',
    'astro/jsx-a11y/role-has-required-aria-props': 'warn',
    'astro/jsx-a11y/role-supports-aria-props': 'warn',
    'astro/jsx-a11y/scope': 'error',
    'astro/jsx-a11y/tabindex-no-positive': 'warn',
  } satisfies AstroJsxA11yRules;

  if (isEnabled(accessibility)) {
    Object.assign(astroRules, astroJsxA11yRules);
  }

  if (isEnabled(importX)) {
    (astroRules as AstroRules)['import-x/exports-last'] = 'off';
  }

  if (isEnabled(stylistic)) {
    (astroRules as AstroRules)['@stylistic/jsx-one-expression-per-line'] = 'off';
  }

  return astroRules;
}

export { getAstroRules };
