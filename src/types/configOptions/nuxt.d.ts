interface NuxtOptions {
  /**
   * Whether [NuxtImage](https://image.nuxt.com) is used in the project.
   *
   * Enforce the use of `<NuxtImg>` instead of `<img>`.
   *
   * @default false // `true` if "@nuxt/image" is detected in the package.json file when `autoDetectDeps` is enabled
   *
   * @see [vue/no-restricted-html-elements](https://eslint.vuejs.org/rules/no-restricted-html-elements)
   */
  image?: boolean,

  /**
   * Whether [@nuxt/icon](https://nuxt.com/modules/icon) is used in the project.
   *
   * Allows ESLint to recognize the icon component.
   *
   * @default false // `true` if "@nuxt/icon" is detected in the package.json file when `autoDetectDeps` is enabled
   *
   * @see [vue/no-undef-components](https://eslint.vuejs.org/rules/no-undef-components)
   */
  icon?: boolean | {
    /**
     * The name of the icon component.
     *
     * This is used by
     * [vue/no-undef-components](https://eslint.vuejs.org/rules/no-undef-components)
     * to detect the icon component.
     *
     * It will fall back to the default value if set to an empty string (`''`).
     *
     * @default 'Icon'
     *
     * @see [@nuxt/icon Options: Vue Component](https://github.com/nuxt/icon#vue-component)
     */
    component?: string,
  },

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
