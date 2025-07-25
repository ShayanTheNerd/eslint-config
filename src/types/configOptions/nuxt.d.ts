interface NuxtOptions {
	/**
	 * Whether [NuxtImage](https://image.nuxt.com) is used in the project.
	 *
	 * Enforce the use of `<NuxtImg>` instead of `<img>`, and `<NuxtPicture>` instead of `<picture>`.
	 *
	 * @default false // `true` if "@nuxt/image" is detected in the package.json file when `autoDetectDeps` is enabled
	 *
	 * @see [vue/no-restricted-html-elements](https://eslint.vuejs.org/rules/no-restricted-html-elements)
	 */
	image?: boolean,

	/**
	 * Whether [NuxtUI](https://ui.nuxt.com) is used in the project.
	 *
	 * Enforce the use of NuxtUI components over their standard counterparts. For example, `<ULink>` must be used instead of `<a>`, `<UInput>` instead of `<input>`, etc.
	 *
	 * @default false // `true` if "@nuxt/ui" is detected in the package.json file when `autoDetectDeps` is enabled
	 *
	 * @see [vue/no-restricted-html-elements](https://eslint.vuejs.org/rules/no-restricted-html-elements)
	 */
	ui?: boolean | {
		/**
		 * The prefix of the components.
		 *
		 * This is used by
		 * [vue/no-restricted-html-elements](https://eslint.vuejs.org/rules/no-restricted-html-elements) and
		 * [vue/no-restricted-static-attribute](https://eslint.vuejs.org/rules/no-restricted-static-attribute)
		 * to suggest the alternative components with the correct prefix.
		 *
		 * It will fall back to the default value if set to an empty string (`''`).
		 *
		 * @default 'U'
		 *
		 * @see [NuxtUI Options: Prefix](https://ui.nuxt.com/getting-started/installation/nuxt#prefix)
		 */
		prefix?: string,
	},
}

export type { NuxtOptions };
