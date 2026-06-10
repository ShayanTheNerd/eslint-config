import type { Options } from '#types/index.d.ts';

const defaultOptions = {
  autoDetectDeps: true,
  env: 'node',
  gitignore: '.gitignore',
  packageDir: '.',
  tsConfig: false,

  project: {
    basePath: '.',
    globals: {
      astro: true,
      audioWorklet: true,
      browser: true,
      bun: true,
      commonjs: false,
      deno: true,
      node: true,
      nodeBuiltin: true,
      serviceworker: true,
      sharedWorker: true,
      vitest: false,
      vue: true,
      webextension: true,
      worker: true,
      custom: {},
    },
    ignores: [],
    linterOptions: {
      noInlineConfig: false,
      reportUnusedInlineConfigs: 'warn',
      reportUnusedDisableDirectives: 'warn',
    },
    rules: {},
    settings: {},
  },

  configs: {
    astro: {
      overrides: {},
    },
    base: {
      functionStyle: 'declaration',
      maxDepth: 3,
      maxNestedCallbacks: 3,
      preferNamedExports: true,
      overrides: {},
    },
    css: {
      allowedRelativeFontUnits: ['rem', 'em'],
      useBaseline: false,
      overrides: {},
    },
    html: {
      idNamingConvention: 'snake_case',
      useBaseline: false,
      overrides: {},
    },
    importX: {
      overrides: {},
    },
    markdown: {
      allowedHtmlTags: [],
      frontmatter: 'yaml',
      language: 'gfm',
      overrides: {},
    },
    node: {
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
    packageJson: {
      overrides: {},
    },
    perfectionist: {
      sortType: 'line-length',
      overrides: {},
    },
    promise: {
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
    tailwind: {
      config: '',
      cwd: undefined,
      entryPoint: '',
      ignoredUnknownClasses: [],
      multilineSort: true,
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
    typescript: {
      allowedDefaultProjects: [],
      methodSignatureStyle: 'method',
      removeUnusedImports: true,
      typeDefinitionStyle: 'interface',
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
    zod: {
      mini: false,
      overrides: {},
    },
  },
} satisfies Options;

export { defaultOptions };
