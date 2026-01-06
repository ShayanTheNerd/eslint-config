import type { Options } from '#types/index.d.ts';
import type { PluginRules } from '#types/eslintRules.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

import { isEnabled } from '#utils/isEnabled.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';

function getVueAccessibilityRules(options: DeepNonNullable<Options>) {
  const { vue, nuxt } = options.configs;
  const {
    imageComponents: userImageComponents,
    anchorComponents: userAnchorComponents,
    accessibleChildComponents: userAccessibleChildComponents,
  } = isEnabled(vue) && isEnabled(vue.accessibility) ? vue.accessibility : defaultOptions.configs.vue.accessibility;
  const isNuxtUIEnabled = isEnabled(nuxt) ? nuxt.ui : undefined;
  const nuxtUIPrefix = (isEnabled(nuxt) && isEnabled(nuxt.ui)) ? nuxt.ui.prefix : defaultOptions.configs.nuxt.ui.prefix;

  const vueA11yRules = {
    'vuejs-accessibility/alt-text': ['error', { img: userImageComponents }],
    'vuejs-accessibility/anchor-has-content': ['error', {
      components: userAnchorComponents,
      accessibleChildren: userAccessibleChildComponents,
    }],
    'vuejs-accessibility/aria-props': 'error',
    'vuejs-accessibility/aria-role': 'error',
    'vuejs-accessibility/aria-unsupported-elements': 'error',
    'vuejs-accessibility/click-events-have-key-events': 'off',
    'vuejs-accessibility/form-control-has-label': ['error', {
      labelComponents: isNuxtUIEnabled ? [`${nuxtUIPrefix}FormField`] : undefined,
    }],
    'vuejs-accessibility/heading-has-content': 'error',
    'vuejs-accessibility/iframe-has-title': 'error',
    'vuejs-accessibility/interactive-supports-focus': 'error',
    'vuejs-accessibility/label-has-for': ['error', {
      allowChildren: true,
      required: {
        some: ['nesting', 'id'],
      },
      controlComponents: ['input', 'output', 'meter', 'select', 'textarea', 'progress'],
    }],
    'vuejs-accessibility/media-has-caption': 'error',
    'vuejs-accessibility/mouse-events-have-key-events': 'off',
    'vuejs-accessibility/no-access-key': 'warn',
    'vuejs-accessibility/no-aria-hidden-on-focusable': 'error',
    'vuejs-accessibility/no-autofocus': 'warn',
    'vuejs-accessibility/no-distracting-elements': 'warn',
    'vuejs-accessibility/no-redundant-roles': 'warn',
    'vuejs-accessibility/no-role-presentation-on-focusable': 'error',
    'vuejs-accessibility/no-static-element-interactions': 'error',
    'vuejs-accessibility/role-has-required-aria-props': 'error',
    'vuejs-accessibility/tabindex-no-positive': 'error',
  } satisfies PluginRules<'vuejs-accessibility'>;

  return vueA11yRules;
}

export { getVueAccessibilityRules };
