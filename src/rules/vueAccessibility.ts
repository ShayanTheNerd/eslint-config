import type { Options } from '#types/index.d.ts';
import type { PluginRules } from '#types/eslintRules.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

import { isEnabled } from '#utils/isEnabled.ts';
import { defaultOptions } from '#utils/options/defaultOptions.ts';

function getVueAccessibilityRules(options: DeepNonNullable<Options>) {
	const { vue } = options.configs;
	const {
		imageComponents: userImageComponents,
		anchorComponents: userAnchorComponents,
		accessibleChildComponents: userAccessibleChildComponents,
	} = isEnabled(vue) && isEnabled(vue.accessibility) ? vue.accessibility : defaultOptions.configs.vue.accessibility;

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
	} satisfies PluginRules<'vuejs-accessibility'>;

	return vueA11yRules;
}

export { getVueAccessibilityRules };
