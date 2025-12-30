import type { Options } from '#types/index.d.ts';

const defaultOptions = {
	autoDetectDeps: true,
	gitignore: '.gitignore',
	env: 'node',
	packageDir: '.',
	tsConfig: false,

	global: {
		basePath: '.',
		ignores: [],
		linterOptions: {
			noInlineConfig: false,
			reportUnusedInlineConfigs: 'warn',
			reportUnusedDisableDirectives: 'warn',
		},
		globals: {
			node: true,
			commonjs: false,
			browser: true,
			worker: true,
			serviceworker: false,
			webextension: false,
			custom: {},
		},
		settings: {},
		rules: {},
	},

	configs: {
		oxlint: './.oxlintrc.json',
		base: {
			maxDepth: 3,
			maxNestedCallbacks: 3,
			preferNamedExports: true,
			functionStyle: 'declaration',
			overrides: {},
		},
		stylistic: {
			semi: 'always',
			trailingComma: 'always-multiline',
			memberDelimiterStyle: 'comma',
			quotes: 'single',
			jsxQuotes: 'prefer-double',
			arrowParens: 'always',
			useTabs: true,
			indent: 2,
			maxConsecutiveEmptyLines: 1,
			maxLineLength: 120,
			maxAttributesPerLine: 3,
			selfCloseVoidHTMLElements: 'always',
			overrides: {},
		},
		html: {
			useBaseline: false,
			idNamingConvention: 'snake_case',
			overrides: {},
		},
		css: {
			useBaseline: false,
			allowedRelativeFontUnits: ['rem', 'em'],
			overrides: {},
		},
		tailwind: {
			multilineSort: true,
			ignoredUnregisteredClasses: [],
			config: '',
			entryPoint: '',
			overrides: {},
		},
		typescript: {
			allowedDefaultProjects: [],
			methodSignatureStyle: 'method',
			typeDefinitionStyle: 'interface',
			overrides: {},
		},
		importX: {
			removeUnusedImports: true,
			overrides: {},
		},
		perfectionist: {
			sortType: 'line-length',
			overrides: {},
		},
		zod: {
			overrides: {},
		},
		vue: {
			accessibility: {
				imageComponents: ['NuxtImg'],
				anchorComponents: ['RouterLink', 'NuxtLink', 'ULink'],
				accessibleChildComponents: ['img', 'picture', 'NuxtImg', 'NuxtPicture', 'UBadge'],
			},
			blocksOrder: [
				'script:not([setup])',
				'script[setup]',
				'template',
				'i18n[locale=en]',
				'i18n:not([locale=en])',
				'style:not([scoped])',
				'style[scoped]',
				'docs',
			],
			macrosOrder: [
				'definePage',
				'defineOptions',
				'defineModel',
				'defineProps',
				'defineEmits',
				'defineSlots',
				'defineCustom',
				'defineExpose',
			],
			attributesOrder: [
				'CONDITIONALS',
				'RENDER_MODIFIERS',
				'LIST_RENDERING',
				'UNIQUE',
				'DEFINITION',
				'GLOBAL',
				'SLOT',
				'TWO_WAY_BINDING',
				'CONTENT',
				'OTHER_DIRECTIVES',
				'EVENTS',
				'ATTR_SHORTHAND_BOOL',
				'ATTR_DYNAMIC',
				'ATTR_STATIC',
			],
			attributeHyphenation: 'never',
			preferVBindSameNameShorthand: 'always',
			preferVBindTrueShorthand: 'always',
			allowedStyleAttributes: ['scoped', 'module'],
			blockLang: {
				script: 'js',
				style: 'implicit',
			},
			destructureProps: 'always',
			componentNameCaseInTemplate: 'PascalCase',
			vForDelimiterStyle: 'in',
			// vOnHandlerStyle: ['method', 'inline-function'], // https://github.com/vuejs/eslint-plugin-vue/issues/2571
			restrictedElements: [],
			restrictedStaticAttributes: [],
			ignoredUndefinedComponents: [],
			overrides: {},
		},
		nuxt: {
			image: false,
			icon: {
				component: 'Icon',
			},
			ui: {
				prefix: 'U',
			},
		},
		test: {
			storybook: {
				overrides: {},
			},
			vitest: {
				overrides: {},
			},
			playwright: {
				overrides: {},
			},
			cypress: {
				overrides: {},
			},
			testFunction: 'test',
			maxNestedDescribe: 1,
		},
	},
} satisfies Options;

export { defaultOptions };
