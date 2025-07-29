import type { Options } from '#types/index.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { CoreRules, PluginRules } from '#types/eslintRules.d.ts';

import { isEnabled } from '#utils/isEnabled.ts';
import { defaultOptions } from '#utils/options/defaultOptions.ts';
import { getRestrictedVueInputs } from '#utils/vue/getRestrictedVueInputs.ts';
import { getRestrictedVueElements } from '#utils/vue/getRestrictedVueElements.ts';

type ImportXRules = PluginRules<'import-x'>;
type VueRules =
	& PluginRules<'vue'>
	& Pick<ImportXRules, 'import-x/default'>
	& Pick<CoreRules, 'no-undef' | 'no-useless-assignment'>;

function getVueRules(options: DeepNonNullable<Options>) {
	const { typescript, stylistic, vue, nuxt } = options.configs;
	const {
		indent,
		useTabs,
		trailingComma,
		maxLineLength,
		maxAttributesPerLine,
		maxConsecutiveEmptyLines,
		selfCloseVoidHTMLElements,
	} = isEnabled(stylistic) ? stylistic : defaultOptions.configs.stylistic;
	const {
		blockLang,
		blocksOrder,
		macrosOrder,
		attributesOrder,
		vOnHandlerStyle,
		destructureProps,
		vForDelimiterStyle,
		attributeHyphenation,
		allowedStyleAttributes,
		preferVBindTrueShorthand,
		componentNameCaseInTemplate,
		preferVBindSameNameShorthand,
		restrictedElements: userRestrictedElements,
		ignoredUndefinedComponents: userIgnoredUndefinedComponents,
		restrictedStaticAttributes: userRestrictedStaticAttributes,
	} = isEnabled(vue) ? vue : defaultOptions.configs.vue;
	const nuxtImage = isEnabled(nuxt) ? nuxt.image : undefined;
	const nuxtUI = isEnabled(nuxt) ? nuxt.ui : undefined;
	const nuxtUIPrefix = isEnabled(nuxt) && isEnabled(nuxt.ui) ? nuxt.ui.prefix : undefined;
	const isScriptLangTS = blockLang.script === 'ts';
	const isStyleLangImplicit = blockLang.style === 'implicit';

	const vueRules = {
		'no-undef': 'off',
		'no-useless-assignment': 'off',
		'import-x/default': 'off',

		/* Base Rules (Enabling Correct ESLint Parsing) */
		'vue/comment-directive': ['error', { reportUnusedDisableDirectives: true }],

		/* Priority B: Strongly Recommended (Improving Readability) */
		'vue/html-closing-bracket-newline': 'warn',
		'vue/singleline-html-element-content-newline': 'off',
		'vue/html-indent': ['warn', useTabs ? 'tab' : indent],
		'vue/v-slot-style': ['warn', { atComponent: 'shorthand' }],
		'vue/attribute-hyphenation': ['warn', attributeHyphenation],
		'vue/first-attribute-linebreak': ['warn', { singleline: 'beside' }],
		'vue/v-on-event-hyphenation': ['warn', attributeHyphenation, { autofix: true }],
		'vue/v-bind-style': ['warn', 'shorthand', { sameNameShorthand: preferVBindSameNameShorthand }],
		'vue/html-self-closing': ['error', {
			html: {
				normal: 'never',
				void: selfCloseVoidHTMLElements,
			},
		}],
		'vue/max-attributes-per-line': ['warn', {
			singleline: {
				max: maxAttributesPerLine,
			},
		}],

		/* Priority C: Recommended (Potentially Dangerous Patterns) */
		'vue/attributes-order': ['warn', { order: attributesOrder }],

		/* Miscellaneous */
		'vue/camelcase': 'warn',
		'vue/no-root-v-if': 'warn',
		'vue/require-expose': 'error',
		'vue/no-unused-refs': 'error',
		'vue/prop-name-casing': 'warn',
		'vue/slot-name-casing': 'warn',
		'vue/no-useless-v-bind': 'error',
		'vue/component-api-style': 'error',
		'vue/html-button-has-type': 'error',
		'vue/valid-define-options': 'error',
		'vue/prefer-define-options': 'warn',
		'vue/require-emit-validator': 'error',
		'vue/require-default-export': 'error',
		'vue/custom-event-name-casing': 'warn',
		'vue/no-use-v-else-with-v-for': 'error',
		'vue/no-empty-component-block': 'error',
		'vue/no-import-compiler-macros': 'error',
		'vue/require-typed-object-prop': 'error',
		'vue/require-macro-variable-name': 'warn',
		'vue/padding-line-between-blocks': 'warn',
		'vue/match-component-import-name': 'error',
		'vue/html-comment-content-newline': 'warn',
		'vue/no-multiple-objects-in-class': 'warn',
		'vue/prefer-separate-static-class': 'warn',
		'vue/html-comment-content-spacing': 'warn',
		'vue/comma-dangle': ['warn', trailingComma],
		'vue/component-options-name-casing': 'warn',
		'vue/no-ref-object-reactivity-loss': 'error',
		'vue/no-duplicate-attr-inheritance': 'error',
		'vue/no-this-in-before-route-enter': 'error',
		'vue/prefer-prop-type-boolean-first': 'warn',
		'vue/no-setup-props-reactivity-loss': 'error',
		'vue/block-order': ['warn', { order: blocksOrder }],
		'vue/v-on-handler-style': ['error', vOnHandlerStyle],
		'vue/v-for-delimiter-style': ['warn', vForDelimiterStyle],
		'vue/require-typed-ref': isScriptLangTS ? 'error' : 'off',
		'vue/define-macros-order': ['warn', { order: macrosOrder }],
		'vue/html-comment-indent': ['warn', useTabs ? 'tab' : indent],
		'vue/no-static-inline-styles': ['warn', { allowBinding: true }],
		'vue/no-required-prop-with-default': ['error', { autofix: true }],
		'vue/prefer-true-attribute-shorthand': ['warn', preferVBindTrueShorthand],
		'vue/no-deprecated-model-definition': ['error', { allowVue3Compat: true }],
		'vue/enforce-style-attribute': ['error', { allow: allowedStyleAttributes }],
		'vue/define-props-destructuring': ['warn', { destructure: destructureProps }],
		'vue/define-emits-declaration': ['warn', isScriptLangTS ? 'type-based' : 'runtime'],
		'vue/define-props-declaration': ['error', isScriptLangTS ? 'type-based' : 'runtime'],
		'vue/max-len': ['warn', {
			tabWidth: indent,
			code: maxLineLength,
			template: Infinity,
			ignoreUrls: true,
			ignoreStrings: true,
			ignoreComments: true,
			ignoreRegExpLiterals: true,
			ignoreTrailingComments: true,
			ignoreTemplateLiterals: true,
			ignoreHTMLTextContents: true,
			ignoreHTMLAttributeValues: true,
		}],
		'vue/block-lang': ['error', {
			script: {
				lang: blockLang.script,
			},
			style: {
				lang: isStyleLangImplicit ? undefined : blockLang.style,
				allowNoLang: isStyleLangImplicit,
			},
		}],
		'vue/block-tag-newline': ['warn', {
			singleline: 'always',
			maxEmptyLines: maxConsecutiveEmptyLines ? maxConsecutiveEmptyLines - 1 : 0,
		}],
		'vue/no-restricted-html-elements': [
			'error',
			{
				element: nuxt ? 'time' : '',
				message: 'Use `<NuxtTime>`.',
			},
			{
				element: nuxtImage ? 'img' : '',
				message: 'Use `<NuxtImg>`.',
			},
			{
				element: nuxtImage ? 'picture' : '',
				message: 'Use `<NuxtPicture>`.',
			},
			{
				element: nuxtUI ? ['a', 'RouterLink', 'NuxtLink'] : '',
				message: nuxtUI && nuxtUIPrefix ? `Use <${nuxtUIPrefix}Link>.` : undefined,
			},
			{
				element: ['a', nuxt ? 'RouterLink' : ''],
				message: `Use <${nuxt ? 'NuxtLink' : 'RouterLink'}>.`,
			},
			...(nuxtUI && nuxtUIPrefix ? getRestrictedVueElements(nuxtUIPrefix) : []),
			...userRestrictedElements,
		],
		'vue/no-restricted-static-attribute': [
			'error',
			...(nuxtUI && nuxtUIPrefix ? getRestrictedVueInputs(nuxtUIPrefix) : []),
			...userRestrictedStaticAttributes,
		],
		'vue/no-undef-components': ['error', {
			ignorePatterns: [
				'^(Nuxt|U)',
				'^(Icon|Html|Head|Title|Base|Meta|Link|Style|Body|NoScript)$',
				...userIgnoredUndefinedComponents,
			],
		}],
		'vue/match-component-file-name': ['error', {
			shouldMatchCase: true,
			extensions: ['vue', 'js', 'jsx', ...(typescript ? ['ts', 'tsx'] : [])],
		}],
		'vue/component-name-in-template-casing': ['warn', componentNameCaseInTemplate, {
			ignores: ['*.*'],
			registeredComponentsOnly: false,
		}],
	} satisfies VueRules;

	return vueRules;
}

export { getVueRules };
