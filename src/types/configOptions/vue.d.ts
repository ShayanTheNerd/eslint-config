import type { RuleOptions } from '#types/eslintRules.d.ts';
import type { ConfigWithOverrides } from '#types/index.d.ts';
import type { VueAccessibilityOptions } from '#types/configOptions/vueAccessibility.d.ts';

interface BlockLang {
	style?: 'css' | 'scss' | 'postcss' | 'implicit',
	script?: 'js' | 'ts' | 'jsx' | 'tsx' | 'implicit',
}

type Macro =
	| 'definePage'
	| 'defineModel'
	| 'defineProps'
	| 'defineEmits'
	| 'defineSlots'
	| 'defineCustom'
	| 'defineExpose'
	| 'defineOptions';

type SFCBlock =
	| 'docs'
	| 'template'
	| 'script[setup]'
	| 'style[scoped]'
	| 'i18n[locale=en]'
	| 'script:not([setup])'
	| 'style:not([scoped])'
	| 'i18n:not([locale=en])';

type VBindStyleSameNameShorthandOptions = RuleOptions<'vue/v-bind-style', 1>['sameNameShorthand'];

interface VueOptions extends ConfigWithOverrides {
	/**
	 * Use [eslint-plugin-vuejs-accessibility](https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility) to enforce accessibility standards in SFCs.
	 *
	 * @default true
	 */
	accessibility?: boolean | VueAccessibilityOptions,

	/**
	 * The order of top-level blocks in SFCs.
	 *
	 * @default
	 * [
	 *   'script:not([setup])',
	 *   'script[setup]',
	 *   'template',
	 *   'i18n[locale=en]',
	 *   'i18n:not([locale=en])',
	 *   'style:not([scoped])',
	 *   'style[scoped]',
	 *   'docs',
	 * ]
	 *
	 * @see [vue/block-order](https://eslint.vuejs.org/rules/block-order)
	 */
	blocksOrder?: SFCBlock[],

	/**
	 * The order of compiler macros in `<script setup>`.
	 *
	 * @default
	 * [
	 *   'definePage',
	 *   'defineOptions',
	 *   'defineModel',
	 *   'defineProps',
	 *   'defineEmits',
	 *   'defineSlots',
	 *   'defineCustom',
	 *   'defineExpose',
	 * ]
	 *
	 * @see [vue/define-macros-order](https://eslint.vuejs.org/rules/define-macros-order)
	 */
	macrosOrder?: Macro[],

	/**
	 * The order of HTML and Vue attributes.
	 *
	 * @default
	 * [
	 *   'DEFINITION',
	 *   'CONDITIONALS',
	 *   'RENDER_MODIFIERS',
	 *   'LIST_RENDERING',
	 *   'UNIQUE',
	 *   'GLOBAL',
	 *   'TWO_WAY_BINDING',
	 *   'SLOT',
	 *   'CONTENT',
	 *   'OTHER_DIRECTIVES',
	 *   'EVENTS',
	 *   'ATTR_SHORTHAND_BOOL',
	 *   'ATTR_DYNAMIC',
	 *   'ATTR_STATIC',
	 * ]
	 *
	 * @see [vue/attributes-order](https://eslint.vuejs.org/rules/attributes-order)
	 */
	attributesOrder?: RuleOptions<'vue/attributes-order'>['order'],

	/**
	 * Whether attributes should be hyphenated.
	 *
	 * @default 'never'
	 *
	 * @see [vue/attribute-hyphenation](https://eslint.vuejs.org/rules/attribute-hyphenation)
	 */
	attributeHyphenation?: RuleOptions<'vue/attribute-hyphenation'>,

	/**
	 * Enforce consistent use of the `v-bind` same-name shorthand style.
	 *
	 * @default 'always'
	 *
	 * @see [vue/v-bind-style: `sameNameShorthand` option](https://eslint.vuejs.org/rules/v-bind-style#options)
	 */
	preferVBindSameNameShorthand?: Exclude<VBindStyleSameNameShorthandOptions, 'ignore'>,

	/**
	 * Require the shorthand form of the attribute when `v-bind`'s value is `true`.
	 *
	 * @default 'always'
	 *
	 * @see [vue/prefer-true-attribute-shorthand](https://eslint.vuejs.org/rules/prefer-true-attribute-shorthand)
	 */
	preferVBindTrueShorthand?: RuleOptions<'vue/prefer-true-attribute-shorthand'>,

	/**
	 * Enforce the use of specific attributes such as `scoped` and `module` on top-level `<style>` blocks.
	 *
	 * @default ['scoped', 'module']
	 *
	 * @see [vue/enforce-style-attribute: `allow` option](https://eslint.vuejs.org/rules/enforce-style-attribute#options)
	 */
	allowedStyleAttributes?: RuleOptions<'vue/enforce-style-attribute'>['allow'],

	/**
	 * The language for top-lever SFC blocks.
	 *
	 * Use `implicit` to omit the `lang` attribute, which defaults to `css` for `<style>`, and `js` for `<script>`.
	 *
	 * @default
	 * {
	 *   script: 'js', // `'ts'` if "typescript" is detected in the package.json file when `autoDetectDeps` is enabled
	 *   style: 'implicit',
	 * }
	 *
	 * @see [vue/block-lang](https://eslint.vuejs.org/rules/block-lang)
	 */
	blockLang?: BlockLang,

	/**
	 * Enforce a consistent style for destructuring props.
	 *
	 * @default 'always'
	 *
	 * @see [vue/define-props-destructuring: `destructure` option](https://eslint.vuejs.org/rules/define-props-destructuring#options)
	 */
	destructureProps?: RuleOptions<'vue/define-props-destructuring'>['destructure'],

	/**
	 * Enforce consistent casing for component names in `<template>` blocks.
	 *
	 * Compound components (e.g., `<motion.div>`) are ignored by default.
	 *
	 * @default 'PascalCase'
	 *
	 * @see [vue/component-name-in-template-casing](https://eslint.vuejs.org/rules/component-name-in-template-casing)
	 */
	componentNameCaseInTemplate?: RuleOptions<'vue/component-name-in-template-casing'>,

	/**
	 * The delimiter used in `v-for` directives.
	 *
	 * @default 'in'
	 *
	 * @see [vue/v-for-delimiter-style](https://eslint.vuejs.org/rules/v-for-delimiter-style)
	 */
	vForDelimiterStyle?: RuleOptions<'vue/v-for-delimiter-style'>,

	/* https://github.com/vuejs/eslint-plugin-vue/issues/2571 */
	// /**
	//  * Enforce a consistent handler style in `v-on` directives.
	//  *
	//  * @default ['method', 'inline-function']
	//  *
	//  * @see [vue/v-on-handler-style](https://eslint.vuejs.org/rules/v-on-handler-style)
	//  */
	// vOnHandlerStyle?: RuleOptions<'vue/v-on-handler-style'>,

	/**
	 * Disallow certain elements and components.
	 *
	 * When NuxtUI or NuxtImage are enabled, certain HTML elements (e.g., `<img>`, `<a>`, `<form>`, `<input>`) are disallowed in favor of their alternative components.
	 *
	 * New items extend the defaults, they don't override it.
	 *
	 * @default []
	 *
	 * @see [vue/no-restricted-html-elements](https://eslint.vuejs.org/rules/no-restricted-html-elements)
	 */
	restrictedElements?: RuleOptions<'vue/no-restricted-html-elements'>[],

	/**
	 * Disallow certain static attributes.
	 *
	 * @default []
	 *
	 * @see [vue/no-restricted-static-attribute](https://eslint.vuejs.org/rules/no-restricted-static-attribute)
	 */
	restrictedStaticAttributes?: RuleOptions<'vue/no-restricted-static-attribute'>[],

	/**
	 * Regex patterns of undefined component names that should be ignored.
	 *
	 * This is useful for ignoring components that are globally registered or defined in a way that ESLint cannot detect.
	 *
	 * New items extend the defaults, they don't override it.
	 *
	 * @default
	 * [
	 *   '^(Nuxt|U)',
	 *   '^(Icon|Html|Head|Title|Base|Meta|Link|Style|Body|NoScript)$',
	 * ]
	 *
	 * @see [vue/no-undef-components](https://eslint.vuejs.org/rules/no-undef-components)
	 */
	ignoredUndefinedComponents?: string[],
}

export type { VueOptions };
