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
      worker: true,
      commonjs: false,
      bun: true,
      deno: true,
      node: true,
      nodeBuiltin: true,
      browser: true,
      sharedWorker: true,
      serviceworker: true,
      webextension: true,
      audioWorklet: true,
      vitest: false,
      vue: true,
      astro: true,
      custom: {},
    },
    settings: {},
    rules: {},
  },

  configs: {
    packageJson: {
      overrides: {},
    },
    markdown: {
      language: 'gfm',
      frontmatter: 'yaml',
      allowedHtmlTags: [],
      overrides: {},
    },
    oxlint: '.oxlintrc.json',
    base: {
      functionStyle: 'declaration',
      maxDepth: 3,
      maxNestedCallbacks: 3,
      preferNamedExports: true,
      overrides: {},
    },
    stylistic: {
      arrowParens: 'always',
      indent: 2,
      jsxQuotes: 'prefer-double',
      maxAttributesPerLine: 3,
      maxConsecutiveEmptyLines: 1,
      maxLineLength: 120,
      memberDelimiterStyle: 'comma',
      quotes: 'single',
      semi: 'always',
      selfCloseVoidHTMLElements: 'always',
      trailingComma: 'always-multiline',
      overrides: {},
    },
    html: {
      idNamingConvention: 'snake_case',
      useBaseline: false,
      overrides: {},
    },
    css: {
      allowedRelativeFontUnits: ['rem', 'em'],
      useBaseline: false,
      overrides: {},
    },
    tailwind: {
      config: '',
      entryPoint: '',
      ignoredUnknownClasses: [],
      multilineSort: true,
      overrides: {},
    },
    typescript: {
      allowedDefaultProjects: [],
      methodSignatureStyle: 'method',
      removeUnusedImports: true,
      typeDefinitionStyle: 'interface',
      overrides: {},
    },
    promise: {
      overrides: {},
    },
    importX: {
      overrides: {},
    },
    perfectionist: {
      sortType: 'line-length',
      overrides: {},
    },
    zod: {
      mini: false,
      overrides: {},
    },
    vue: {
      accessibility: {
        accessibleChildComponents: ['img', 'picture', 'NuxtImg', 'NuxtPicture', 'UBadge'],
        anchorComponents: ['RouterLink', 'NuxtLink', 'ULink'],
        imageComponents: ['NuxtImg'],
      },
      allowedStyleAttributes: ['scoped', 'module'],
      attributeHyphenation: 'never',
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
      blockLang: {
        script: 'js',
        style: 'implicit',
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
      componentNameCaseInTemplate: 'PascalCase',
      destructureProps: 'always',
      ignoredUndefinedComponents: [],
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
      preferVBindSameNameShorthand: 'always',
      preferVBindTrueShorthand: 'always',
      restrictedElements: [],
      restrictedStaticAttributes: [],
      vForDelimiterStyle: 'in',
      // vOnHandlerStyle: ['method', 'inline-function'], // https://github.com/vuejs/eslint-plugin-vue/issues/2571
      overrides: {},
    },
    nuxt: {
      icon: {
        component: 'Icon',
      },
      image: false,
      ui: {
        prefix: 'U',
      },
    },
    astro: {
      overrides: {},
    },
    test: {
      maxNestedDescribe: 1,
      testFunction: 'test',
      cypress: {
        overrides: {},
      },
      playwright: {
        overrides: {},
      },
      storybook: {
        overrides: {},
      },
      vitest: {
        overrides: {},
      },
    },
  },
} satisfies Options;

export { defaultOptions };
