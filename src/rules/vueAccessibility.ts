import type { Options } from '#types/index.d.ts';
import type { PluginRules } from '#types/eslintRules.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

import { isEnabled } from '#utils/isEnabled.ts';
import { defaultOptions } from '#utils/options/defaultOptions.ts';

function getVueAccessibilityRules(options: DeepNonNullable<Options>) {
	const { vue, nuxt } = options.configs;
	const {
		imageComponents: userImageComponents,
		anchorComponents: userAnchorComponents,
		accessibleChildComponents: userAccessibleChildComponents,
	} = isEnabled(vue) && isEnabled(vue.accessibility) ? vue.accessibility : defaultOptions.configs.vue.accessibility;
	const nuxtUI = isEnabled(nuxt) ? nuxt.ui : undefined;
	const nuxtUIPrefix = isEnabled(nuxt) && isEnabled(nuxt.ui) ? nuxt.ui.prefix : defaultOptions.configs.nuxt.ui.prefix;

	const vueA11yRules = {
		'vuejs-accessibility/click-events-have-key-events': 'off',
		'vuejs-accessibility/mouse-events-have-key-events': 'off',
		'vuejs-accessibility/no-aria-hidden-on-focusable': 'error',
		'vuejs-accessibility/no-role-presentation-on-focusable': 'error',
		'vuejs-accessibility/alt-text': ['error', { img: userImageComponents }],
		'vuejs-accessibility/anchor-has-content': ['error', {
			components: userAnchorComponents,
			accessibleChildren: userAccessibleChildComponents,
		}],
		'vuejs-accessibility/form-control-has-label': ['error', {
			labelComponents: nuxtUI ? [`${nuxtUIPrefix}FormField`] : undefined,
		}],
		'vuejs-accessibility/label-has-for': ['error', {
			allowChildren: true,
			required: {
				some: ['nesting', 'id'],
			},
			controlComponents: ['input', 'output', 'meter', 'select', 'textarea', 'progress'],
		}],
	} satisfies PluginRules<'vuejs-accessibility'>;

	return vueA11yRules;
}

// oxlint-disable-next-line no-named-export
export { getVueAccessibilityRules };
