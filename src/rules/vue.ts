import type { Options } from '#types/index.d.ts';
import type { PluginRules } from '#types/eslintRules.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

import { isTruthy } from '#utils/isTruthy.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';
import { getRestrictedVueInputs } from '#helpers/vue/getRestrictedVueInputs.ts';
import { getRestrictedVueElements } from '#helpers/vue/getRestrictedVueElements.ts';

type StylisticRules = PluginRules<'@stylistic'>;
type TypescriptRules = PluginRules<'@typescript-eslint'>;
type VueRules =
  & PluginRules<'vue'>
  & Pick<StylisticRules, '@stylistic/max-len'>
  & Pick<TypescriptRules, '@typescript-eslint/no-useless-default-assignment'>;

function getVueRules(options: DeepNonNullable<Options>) {
  const { typescript, stylistic, vue, nuxt } = options.configs;
  const {
    indent,
    trailingComma,
    maxLineLength,
    maxAttributesPerLine,
    maxConsecutiveEmptyLines,
    selfCloseVoidHtmlElements,
  } = isEnabled(stylistic) ? stylistic : defaultOptions.configs.stylistic;
  const {
    blockLang,
    blocksOrder,
    macrosOrder,
    attributesOrder,
    destructureProps,
    vForDelimiterStyle,
    attributeHyphenation,
    templateMaxLineLength,
    allowedStyleAttributes,
    preferVBindTrueShorthand,
    componentNameCaseInTemplate,
    preferVBindSameNameShorthand,
    restrictedElements: userRestrictedElements,
    ignoredUndefinedComponents: userIgnoredUndefinedComponents,
    restrictedStaticAttributes: userRestrictedStaticAttributes,
  } = isEnabled(vue) ? vue : defaultOptions.configs.vue;
  const {
    imageComponents: userImageComponents,
    anchorComponents: userAnchorComponents,
    accessibleChildComponents: userAccessibleChildComponents,
  } = isEnabled(vue) && isEnabled(vue.accessibility) ? vue.accessibility : defaultOptions.configs.vue.accessibility;
  const isNuxtEnabled = isEnabled(nuxt);
  const isNuxtImageEnabled = isNuxtEnabled ? nuxt.image : undefined;
  const isNuxtUIEnabled = isNuxtEnabled ? nuxt.ui : undefined;
  const nuxtUIPrefix = isNuxtEnabled && isEnabled(nuxt.ui) ? nuxt.ui.prefix : defaultOptions.configs.nuxt.ui.prefix;
  const isNuxtIconEnabled = isNuxtEnabled ? nuxt.icon : undefined;
  const nuxtIconComponent = isNuxtEnabled && isEnabled(nuxt.icon)
    ? nuxt.icon.component
    : defaultOptions.configs.nuxt.icon.component;
  const restrictedVueElements = isNuxtUIEnabled ? getRestrictedVueElements(nuxtUIPrefix) : [];
  const restrictedVueInputs = isNuxtUIEnabled ? getRestrictedVueInputs(nuxtUIPrefix) : [];
  const isScriptLangTS = blockLang.script === 'ts';
  const isStyleLangImplicit = blockLang.style === 'implicit';

  const vueAccessibilityRules = {
    'vuejs-accessibility/alt-text': ['error', { img: userImageComponents }],
    'vuejs-accessibility/anchor-has-content': ['error', {
      components: userAnchorComponents,
      accessibleChildren: userAccessibleChildComponents,
    }],
    'vuejs-accessibility/aria-props': 'error',
    'vuejs-accessibility/aria-role': 'error',
    'vuejs-accessibility/aria-unsupported-elements': 'error',
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

  const vueRules = {
    /* Reports a false positive when `true` is used as the default value for the destructured optional boolean props. */
    '@typescript-eslint/no-useless-default-assignment': 'off',

    /* Base Rules (Enabling Correct ESLint Parsing) */
    'vue/jsx-uses-vars': 'error',
    'vue/comment-directive': ['error', { reportUnusedDisableDirectives: true }],

    /* Priority A: Essential */
    'vue/multi-word-component-names': 'error',
    'vue/no-arrow-functions-in-watch': 'warn',
    'vue/no-async-in-computed-properties': ['error', {
      ignoredObjectNames: ['z', 'zod'],
    }],
    'vue/no-child-content': 'error',
    'vue/no-computed-properties-in-data': 'error',
    'vue/no-deprecated-data-object-declaration': 'error',
    'vue/no-deprecated-delete-set': 'error',
    'vue/no-deprecated-destroyed-lifecycle': 'error',
    'vue/no-deprecated-dollar-listeners-api': 'error',
    'vue/no-deprecated-dollar-scopedslots-api': 'error',
    'vue/no-deprecated-events-api': 'error',
    'vue/no-deprecated-filter': 'error',
    'vue/no-deprecated-functional-template': 'error',
    'vue/no-deprecated-html-element-is': 'error',
    'vue/no-deprecated-inline-template': 'error',
    'vue/no-deprecated-model-definition': ['error', { allowVue3Compat: true }],
    'vue/no-deprecated-props-default-this': 'error',
    'vue/no-deprecated-router-link-tag-prop': 'error',
    'vue/no-deprecated-scope-attribute': 'error',
    'vue/no-deprecated-slot-attribute': 'error',
    'vue/no-deprecated-slot-scope-attribute': 'error',
    'vue/no-deprecated-v-bind-sync': 'error',
    'vue/no-deprecated-v-is': 'error',
    'vue/no-deprecated-v-on-native-modifier': 'error',
    'vue/no-deprecated-v-on-number-modifiers': 'error',
    'vue/no-deprecated-vue-config-keycodes': 'error',
    'vue/no-dupe-keys': 'error',
    'vue/no-dupe-v-else-if': 'error',
    'vue/no-duplicate-attributes': 'error',
    'vue/no-export-in-script-setup': 'error',
    'vue/no-expose-after-await': 'error',
    'vue/no-lifecycle-after-await': 'error',
    'vue/no-mutating-props': 'error',
    'vue/no-parsing-error': 'error',
    'vue/no-ref-as-operand': 'error',
    'vue/no-reserved-component-names': 'error',
    'vue/no-reserved-keys': 'error',
    'vue/no-reserved-props': 'error',
    'vue/no-shared-component-data': 'error',
    'vue/no-side-effects-in-computed-properties': 'error',
    'vue/no-template-key': 'error',
    'vue/no-textarea-mustache': 'error',
    'vue/no-unused-components': 'error',
    'vue/no-unused-vars': 'error',
    'vue/no-use-computed-property-like-method': 'error',
    'vue/no-use-v-if-with-v-for': 'error',
    'vue/no-useless-template-attributes': 'error',
    'vue/no-v-for-template-key-on-child': 'error',
    'vue/no-v-text-v-html-on-component': 'error',
    'vue/no-watch-after-await': 'error',
    'vue/prefer-import-from-vue': 'error',
    'vue/require-component-is': 'error',
    'vue/require-prop-type-constructor': 'error',
    'vue/require-render-return': 'error',
    'vue/require-slots-as-functions': 'error',
    'vue/require-toggle-inside-transition': 'error',
    'vue/require-v-for-key': 'error',
    'vue/require-valid-default-prop': 'error',
    'vue/return-in-computed-property': 'error',
    'vue/return-in-emits-validator': 'error',
    'vue/use-v-on-exact': 'error',
    'vue/valid-attribute-name': 'error',
    'vue/valid-define-emits': 'error',
    'vue/valid-define-options': 'error',
    'vue/valid-define-props': 'error',
    'vue/valid-next-tick': 'error',
    'vue/valid-template-root': 'error',
    'vue/valid-v-bind': 'error',
    'vue/valid-v-cloak': 'error',
    'vue/valid-v-else-if': 'error',
    'vue/valid-v-else': 'error',
    'vue/valid-v-for': ['error', { allowEmptyAlias: true }],
    'vue/valid-v-html': 'error',
    'vue/valid-v-if': 'error',
    'vue/valid-v-is': 'error',
    'vue/valid-v-memo': 'error',
    'vue/valid-v-model': 'error',
    'vue/valid-v-on': 'error',
    'vue/valid-v-once': 'error',
    'vue/valid-v-pre': 'error',
    'vue/valid-v-show': 'error',
    'vue/valid-v-slot': 'error',
    'vue/valid-v-text': 'error',

    /* Priority B: Strongly Recommended (Improving Readability) */
    'vue/attribute-hyphenation': ['warn', attributeHyphenation],
    'vue/component-definition-name-casing': 'warn',
    'vue/first-attribute-linebreak': isEnabled(stylistic) ? 'warn' : 'off',
    'vue/html-closing-bracket-newline': isEnabled(stylistic) ? 'warn' : 'off',
    'vue/html-closing-bracket-spacing': isEnabled(stylistic) ? 'warn' : 'off',
    'vue/html-end-tags': 'warn',
    'vue/html-indent': isEnabled(stylistic) ? ['warn', indent] : 'off',
    'vue/html-quotes': isEnabled(stylistic) ? 'warn' : 'off',
    'vue/html-self-closing': isEnabled(stylistic) ? [
      'error',
      {
        html: {
          normal: 'never',
          void: selfCloseVoidHtmlElements,
        },
      },
    ] : 'off',
    'vue/max-attributes-per-line': isEnabled(stylistic) ? [
      'warn',
      {
        singleline: {
          max: maxAttributesPerLine,
        },
      },
    ] : 'off',
    'vue/multiline-html-element-content-newline': isEnabled(stylistic) ? 'warn' : 'off',
    'vue/mustache-interpolation-spacing': isEnabled(stylistic) ? 'warn' : 'off',
    'vue/no-multi-spaces': isEnabled(stylistic) ? 'warn' : 'off',
    'vue/no-spaces-around-equal-signs-in-attribute': isEnabled(stylistic) ? 'warn' : 'off',
    'vue/no-template-shadow': 'error',
    'vue/one-component-per-file': 'error',
    'vue/prop-name-casing': 'warn',
    'vue/v-bind-style': ['warn', 'shorthand', { sameNameShorthand: preferVBindSameNameShorthand }],
    'vue/v-on-event-hyphenation': ['warn', attributeHyphenation, { autofix: true }],
    'vue/v-on-style': 'warn',
    'vue/v-slot-style': ['warn', { atComponent: 'shorthand' }],

    /* Priority C: Recommended (Potentially Dangerous Patterns) */
    'vue/attributes-order': ['warn', { order: attributesOrder }],
    'vue/block-order': ['warn', { order: blocksOrder }],
    'vue/no-lone-template': 'error',
    'vue/no-multiple-slot-args': 'error',
    'vue/no-required-prop-with-default': ['error', { autofix: true }],
    'vue/no-v-html': ['warn', { ignorePattern: '^html' }],
    'vue/order-in-components': 'warn',
    'vue/this-in-template': 'warn',

    /* Extensions */
    'vue/array-bracket-newline': isEnabled(stylistic) ? ['warn', 'consistent'] : 'off',
    'vue/array-bracket-spacing': isEnabled(stylistic) ? 'warn' : 'off',
    'vue/arrow-spacing': isEnabled(stylistic) ? 'warn' : 'off',
    'vue/block-spacing': isEnabled(stylistic) ? 'warn' : 'off',
    'vue/brace-style': isEnabled(stylistic) ? ['warn', '1tbs', { allowSingleLine: true }] : 'off',
    'vue/camelcase': ['warn', {
      properties: 'never',
      ignoreImports: true,
      ignoreDestructuring: true,
    }],
    'vue/comma-dangle': isEnabled(stylistic) ? ['warn', trailingComma] : 'off',
    'vue/comma-spacing': isEnabled(stylistic) ? 'warn' : 'off',
    'vue/comma-style': isEnabled(stylistic) ? 'warn' : 'off',
    'vue/dot-notation': 'warn',
    'vue/eqeqeq': 'error',
    'vue/func-call-spacing': isEnabled(stylistic) ? 'warn' : 'off',
    'vue/key-spacing': isEnabled(stylistic) ? 'warn' : 'off',
    'vue/keyword-spacing': isEnabled(stylistic) ? 'warn' : 'off',
    'vue/max-len': isEnabled(stylistic) ? [
      'warn',
      {
        tabWidth: indent,
        code: maxLineLength,
        template: templateMaxLineLength,
        comments: templateMaxLineLength,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreComments: true,
        ignoreRegExpLiterals: true,
        ignoreTrailingComments: true,
        ignoreTemplateLiterals: true,
        ignoreHTMLTextContents: true,
        ignoreHTMLAttributeValues: true,
      },
    ] : 'off',
    'vue/multiline-ternary': isEnabled(stylistic) ? ['warn', 'always-multiline'] : 'off',
    'vue/no-console': ['warn', {
      allow: ['info', 'warn', 'error', 'table', 'group', 'groupEnd', 'groupCollapsed'],
    }],
    'vue/no-constant-condition': 'warn',
    'vue/no-empty-pattern': 'warn',
    'vue/no-implicit-coercion': 'warn',
    'vue/no-irregular-whitespace': 'warn',
    'vue/no-loss-of-precision': 'error',
    'vue/no-sparse-arrays': 'error',
    'vue/no-useless-concat': 'error',
    'vue/object-curly-newline': isEnabled(stylistic) ? [
      'warn',
      {
        multiline: true,
        consistent: true,
      },
    ] : 'off',
    'vue/object-curly-spacing': isEnabled(stylistic) ? ['warn', 'always'] : 'off',
    'vue/object-property-newline': isEnabled(stylistic) ? ['warn', { allowAllPropertiesOnSameLine: true }] : 'off',
    'vue/object-shorthand': 'warn',
    'vue/operator-linebreak': isEnabled(stylistic) ? [
      'warn',
      'none',
      {
        overrides: {
          '=': 'after',
          '?': 'before',
          ':': 'before',
          '|': 'before',
          '&': 'before',
        },
      },
    ] : 'off',
    'vue/prefer-template': 'warn',
    'vue/quote-props': isEnabled(stylistic) ? ['warn', 'consistent-as-needed'] : 'off',
    'vue/space-in-parens': isEnabled(stylistic) ? 'warn' : 'off',
    'vue/space-infix-ops': isEnabled(stylistic) ? 'warn' : 'off',
    'vue/space-unary-ops': isEnabled(stylistic) ? 'warn' : 'off',
    'vue/template-curly-spacing': isEnabled(stylistic) ? 'warn' : 'off',

    /* Uncategorized */
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
    'vue/component-api-style': 'error',
    'vue/component-name-in-template-casing': ['warn', componentNameCaseInTemplate, {
      ignores: ['/^\\w+(\\.\\w+)+$/'], // Ignore compound components such as `<motion.div>`.
      registeredComponentsOnly: false,
    }],
    'vue/component-options-name-casing': 'warn',
    'vue/custom-event-name-casing': 'warn',
    'vue/define-emits-declaration': ['warn', isScriptLangTS ? 'type-based' : 'runtime'],
    'vue/define-macros-order': ['warn', { order: macrosOrder }],
    'vue/define-props-declaration': ['error', isScriptLangTS ? 'type-based' : 'runtime'],
    'vue/define-props-destructuring': ['warn', { destructure: destructureProps }],
    'vue/enforce-style-attribute': ['error', { allow: allowedStyleAttributes }],
    'vue/html-button-has-type': 'error',
    'vue/html-comment-content-newline': isEnabled(stylistic) ? 'warn' : 'off',
    'vue/html-comment-content-spacing': isEnabled(stylistic) ? 'warn' : 'off',
    'vue/html-comment-indent': isEnabled(stylistic) ? ['warn', indent] : 'off',
    'vue/match-component-file-name': ['error', {
      shouldMatchCase: true,
      extensions: isEnabled(typescript) ? ['vue', 'js', 'jsx', 'ts', 'tsx'] : ['vue', 'js', 'jsx'],
    }],
    'vue/match-component-import-name': 'warn',
    'vue/next-tick-style': 'warn',
    'vue/no-duplicate-attr-inheritance': 'error',
    'vue/no-duplicate-class-names': 'warn',
    'vue/no-empty-component-block': 'error',
    'vue/no-import-compiler-macros': 'error',
    'vue/no-multiple-objects-in-class': 'warn',
    'vue/no-negated-v-if-condition': 'warn',
    'vue/no-ref-object-reactivity-loss': 'error',
    'vue/no-restricted-html-elements': [
      'error',
      {
        element: isNuxtEnabled ? 'time' : '',
        message: 'Use `<NuxtTime>`.',
      },
      {
        element: isNuxtImageEnabled ? 'img' : '',
        message: 'Use `<NuxtImg>`.',
      },
      // https://github.com/nuxt/image/issues/309
      // {
      //  element: isNuxtImageEnabled ? 'picture' : '',
      //  message: 'Use `<NuxtPicture>`.',
      // },
      {
        element: isNuxtUIEnabled ? ['a', 'RouterLink', 'NuxtLink'] : '',
        message: isNuxtUIEnabled ? `Use \`<${nuxtUIPrefix}Link>\`.` : undefined,
      },
      {
        element: ['a', isNuxtEnabled ? 'RouterLink' : ''],
        message: `Use \`<${isNuxtEnabled ? 'NuxtLink' : 'RouterLink'}>\`.`,
      },
      ...restrictedVueElements,
      ...userRestrictedElements,
    ],
    'vue/no-restricted-static-attribute': [
      'error',
      ...restrictedVueInputs,
      isNuxtUIEnabled
        ? { key: 'href', element: `${nuxtUIPrefix}Link`, message: 'Use `v-bind:to=""`.' }
        : { key: '' },
      isNuxtUIEnabled
        ? { key: 'href', element: `${nuxtUIPrefix}Button`, message: 'Use `v-bind:to=""`.' }
        : { key: ' ' },
      ...userRestrictedStaticAttributes,
    ],
    'vue/no-root-v-if': 'warn',
    'vue/no-setup-props-reactivity-loss': 'error',
    'vue/no-static-inline-styles': ['warn', { allowBinding: true }],
    'vue/no-this-in-before-route-enter': 'error',
    'vue/no-undef-components': ['error', {
      ignorePatterns: [
        isNuxtEnabled && '^Nuxt',
        isNuxtEnabled && '^(Html|Head|Title|Base|Meta|Link|Style|Body|NoScript|ClientOnly|DevOnly)$',
        isNuxtIconEnabled && `^${nuxtIconComponent}$`,
        isNuxtUIEnabled && `^${nuxtUIPrefix}`,
        ...userIgnoredUndefinedComponents,
      ].filter(isTruthy),
    }],
    'vue/no-undef-directives': isNuxtEnabled ? 'off' : 'error', // Can't resolve globally-regsitered directives in Nuxt.
    'vue/no-unused-emit-declarations': 'error',
    'vue/no-unused-properties': ['error', {
      groups: ['setup', 'props', 'data', 'inject', 'asyncData', 'computed', 'methods'],
      deepData: true,
      unreferencedOptions: ['returnAsUnreferenced'],
    }],
    'vue/no-unused-refs': 'error',
    'vue/no-use-v-else-with-v-for': 'error',
    'vue/no-useless-mustaches': 'error',
    'vue/no-useless-v-bind': 'error',
    'vue/no-v-text': 'error',
    'vue/padding-line-between-blocks': 'warn',
    'vue/prefer-define-options': 'warn',
    'vue/prefer-prop-type-boolean-first': 'warn',
    'vue/prefer-separate-static-class': 'warn',
    'vue/prefer-single-event-payload': 'warn',
    'vue/prefer-true-attribute-shorthand': ['warn', preferVBindTrueShorthand],
    'vue/prefer-use-template-ref': 'warn',
    'vue/prefer-v-model': 'warn',
    'vue/require-default-export': 'error',
    'vue/require-emit-validator': 'error',
    'vue/require-expose': 'error',
    'vue/require-macro-variable-name': 'warn',
    'vue/require-typed-object-prop': isScriptLangTS ? 'error' : 'off',
    'vue/require-typed-ref': isScriptLangTS ? 'error' : 'off',
    'vue/slot-name-casing': 'warn',
    'vue/v-for-delimiter-style': ['warn', vForDelimiterStyle],
    // 'vue/v-on-handler-style': ['warn', vOnHandlerStyle], // https://github.com/vuejs/eslint-plugin-vue/issues/2571
  } satisfies VueRules;

  if (isEnabled(stylistic)) {
    (vueRules as VueRules)['@stylistic/max-len'] = 'off';
  }

  const isVueAccessibilityEnabled = isEnabled(vue) && isEnabled(vue.accessibility);

  return {
    ...vueRules,
    ...(isVueAccessibilityEnabled && vueAccessibilityRules),
  };
}

export { getVueRules };
