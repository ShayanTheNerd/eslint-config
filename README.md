# @shayanthenerd/eslint-config &nbsp; [![license-badge]][license] [![npm-version-badge]][npmx]

ESLint configuration for enforcing best practices and maintaining a consistent coding style. [Inspect configurations][online-preview]!

- **Flexible**: [Highly-customizable options](#customization) and configurations with sensible defaults.
- **Smart**: Context-aware linting with [automatic dependency detection](#automatic-dependency-detection) and _.gitignore_ recognition.
- **Comprehensive**: [Supports popular plugins](#plugin-support) for TypeScript, Astro, Vue & Nuxt, Tailwind, Zod, Vitest, Markdown, and more.
- **Type-safe**: [Fully-typed and well-documented API](#api-reference) with `overrides` support for every built-in configuration object.
- **Modern**: Requires ESLint ^10.4.0 and Node.js ^20.19.0 (ESM-only)

## Table of Contents
- [Plugin Support](#plugin-support)
- [Installation and Configuration](#installation-and-configuration)
- [Customization](#customization)
- [Automatic Dependency Detection](#automatic-dependency-detection)
- [Framework and Tool Integrations](#framework-and-tool-integrations)
- [IDE Support](#ide-support)
- [Formatting](#formatting)
- [API Reference](#api-reference)
- [Versioning Policy](#versioning-policy)
- [Roadmap to v1.0.0](#roadmap-to-v100)
- [Contribution Guide](#contribution-guide)
- [Credits](#credits)
- [License](#license)

## Plugin Support
Legend:
- ✅ Supported
- ⌛️ In progress
- ◻️ Enabled by default
- ⬛ Disabled by default
- 🔎 [Automatically detected](#automatic-dependency-detection) (`autoDetectDeps: true`)

| Category                                                     | Support | Activation |
| :----------------------------------------------------------- | :-----: | :----: |
| **Languages**                                                |         |        |
| [JavaScript][eslint]                                         |    ✅    |   ◻️    |
| [TypeScript][plugin-ts]                                      |    ✅    |   🔎    |
| [Markdown][plugin-md]                                        |    ✅    |   ◻️    |
| [HTML][plugin-html]                                          |    ✅    |   ⬛    |
| [CSS][plugin-css]                                            |    ✅    |   ⬛    |
| **Formatting**                                               |         |        |
| [Stylistic][plugin-stylistic]                                |    ✅    |   ◻️    |
| [Perfectionist][plugin-perfectionist]                        |    ✅    |   ◻️    |
| **Frameworks**                                               |         |        |
| [Astro][plugin-astro] ([JSX accessibility][plugin-jsx-a11y]) |    ✅    |   🔎    |
| [React][plugin-react] ([hooks][plugin-react-hooks])          |    ⌛️    |   N/A  |
| [Next][plugin-next]                                          |    ⌛️    |   N/A  |
| [Vue & Nuxt][plugin-vue] ([accessibility][plugin-vue-a11y])  |    ✅    |   🔎    |
| [Tailwind][plugin-tailwind]                                  |    ✅    |   ⬛    |
| **Testing Tools**                                            |         |        |
| [Storybook][plugin-storybook]                                |    ✅    |   🔎    |
| [Vitest][plugin-vitest]                                      |    ✅    |   🔎    |
| [Cypress][plugin-cypress]                                    |    ✅    |   🔎    |
| [Playwright][plugin-playwright]                              |    ✅    |   🔎    |
| **Miscellaneous**                                            |         |        |
| [_package.json_][plugin-package-json]                        |    ✅    |   ◻️    |
| [promises][plugin-promise]                                   |    ✅    |   ◻️    |
| [Imports][plugin-import-x]                                   |    ✅    |   ◻️    |
| [Zod][plugin-zod]                                            |    ✅    |   🔎    |
| [Node][plugin-n]                                          |    ✅    |   ◻️    |
| [Unicorn][plugin-unicorn]                                    |    ⌛️    |   N/A  |

## Installation and Configuration
1. Install the package and ESLint as dev dependencies:
   ```shell
   npm i -D @shayanthenerd/eslint-config eslint
   ```

2. Create an ESLint configuration file (_eslint.config.js_) at the root of your project:
   ```js title="eslint.config.js"
   import { defineConfig } from '@shayanthenerd/eslint-config';

   export default defineConfig();
   ```

   Note: TypeScript configuration files (_eslint.config.ts_) are also supported. Node.js versions below v22.18.0 may require [additional setup][eslint-config-ts-setup].

3. Add the following scripts to your _package.json_:
   ```json title="package.json"
   {
     "scripts": {
       "lint:inspect": "npx @eslint/config-inspector",
       "lint": "eslint --fix --cache --cache-location='node_modules/.cache/.eslintcache'"
     }
   }
   ```

---

After installation:
- Use `npm run lint` to lint and fix files.
- Use `npm run lint:inspect` to see a visual breakdown of your configuration.
- See [IDE Support](#ide-support) for editor integration.
- See [Customization](#customization) for advanced configuration.
- See [Formatting](#formatting) for formatting options and Prettier integration.

## Customization
`defineConfig()` supports both simple and advanced use cases:
```js title="eslint.config.js"
import eslintPluginYaml from 'eslint-plugin-yaml';
import * as eslintPluginRegexp from 'eslint-plugin-regexp';

import { defineConfig } from '@shayanthenerd/eslint-config';

// Use the default configuration:
export default defineConfig();

// Customize the built-in configurations:
export default defineConfig({
  autoDetectDeps: false,
  configs: {
    stylistic: false,
    markdown: {
      language: 'commonmark',
    },
  },
});

// Use custom configuration objects:
export default defineConfig([
  {
    files: ['**/*.yaml', '**/*.yml'],
    ignores: ['**/*.schema.yaml', '**/*.schema.yml'],
    extends: [eslintPluginYaml.configs.recommended],
  },
  eslintPluginRegexp.configs['flat/recommended'],
]);

// Customize the built-in configurations and use custom configuration objects:
export default defineConfig(
  {
    autoDetectDeps: 'verbose',
    configs: {
      typescript: {
        typeDefinitionStyle: 'type',
        overrides: {
          rules: {
            '@typescript-eslint/explicit-module-boundary-types': 'off',
          },
        },
      },
    },
  },
  [
    {
      files: ['**/*.yaml', '**/*.yml'],
      ignores: ['**/*.schema.yaml', '**/*.schema.yml'],
      extends: [eslintPluginYaml.configs.recommended],
    },
    eslintPluginRegexp.configs['flat/recommended'],
  ],
);
```

Every built-in configuration accepts an `overrides` option. These values are merged into the generated configuration and take precedence over the defaults.
```ts
import type { ESLint, Linter } from 'eslint';

interface Overrides {
  name?: string,
  files?: (string | string[])[],
  ignores?: string[],
  plugins?: Record<string, ESLint.Plugin>,
  languageOptions?: Linter.Config['languageOptions'],
  settings?: Record<string, unknown>,
  rules?: ConfigRules, // The available rules in the current configuration object
}
```

## Automatic Dependency Detection
[local-pkg][local-pkg] is used to detect installed dependencies and automatically enable the relevant integrations. Package managers that hoist transitive dependencies (such as NPM and Bun) may sometimes cause an integration to get enabled unexpectedly. This is because **_local-pkg_ scans _node_modules_ instead of _package.json_.**

PNPM's strict dependency resolution avoids this issue.

> [!NOTE]
> For example, `eslint-plugin-storybook` depends on `storybook`, which is hoisted by NPM and Bun. As a result, the integration for `storybook` will be enabled automatically, even if you haven't explicitly installed it.

To opt out of this behavior, either [globally disable automatic dependency detection](#customization) or manually disable the unwanted integrations that were enabled automatically.

## Framework and Tool Integrations
### Tailwind
To enable the Tailwind integration, provide the location of your Tailwind configuration or CSS entry point.
```js title="eslint.config.js"
import { defineConfig } from '@shayanthenerd/eslint-config';

export default defineConfig({
  configs: {
    tailwind: {
      /* Either option is sufficient, but both can be provided. */
      config: './tailwind.config.js',
      entryPoint: './app/assets/styles/app.css',
    },
  },
});
```

For editor integration, to avoid inconsistent diagnostics from the [Tailwind CSS IntelliSense VS Code extension][extension-tailwind], add the following settings to _.vscode/settings.json_:
```json title=".vscode/settings.json"
{
  "tailwindCSS.lint.cssConflict": "ignore",
  "tailwindCSS.lint.recommendedVariantOrder": "ignore",
  "tailwindCSS.lint.suggestCanonicalClasses": "ignore",

  "eslint.rules.customizations": [
    { "rule": "better-tailwindcss/*", "severity": "off", "fixable": true },
    { "rule": "better-tailwindcss/no-restricted-classes", "severity": "warn", "fixable": true },
    { "rule": "better-tailwindcss/no-conflicting-classes", "severity": "error", "fixable": false },
    { "rule": "better-tailwindcss/no-unknown-classes", "severity": "warn", "fixable": false }
  ]
}
```

### Nuxt
Nuxt support is already included through the Vue integration, so you don’t need to install or configure [@nuxt/eslint][eslint-nuxt] manually. If you need additional rules tailored to Nuxt, refer to the plugin’s documentation for setup instructions.

> [!TIP]
> `configs.nuxt` only includes options for Nuxt Image, Nuxt UI, and the `<Icon>` component. Vue's rules and `overrides` can be configured via `configs.vue`.

### Markdown
Markdown linting is powered by [@eslint/markdown][plugin-md].

By default, the plugin uses GitHub Flavored Markdown (GFM). You can [switch to CommonMark](#customization) if you prefer, but rules related to tables, label references, and other GFM syntax will be disabled because CommonMark doesn't support them.

> [!NOTE]
> Fenced code blocks inside Markdown files are not linted by @eslint/markdown.

### Node.js
Some rules depend on the specified Node.js version. Visit the documentation for [version-resolution options and project-specific configurations](https://github.com/eslint-community/eslint-plugin-n#configured-nodejs-version-range).

## IDE Support
Install the VS Code extensions for [ESLint][extension-eslint] and [Prettier][extension-prettier]. Then add the following in _.vscode/settings.json_:
```jsonc title=".vscode/settings.json"
{
  /* Enforce Unix-like line endings (LF). */
  "files.eol": "\n",

  /* Enforce 2 spaces for indentation. */
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.detectIndentation": false,

  "editor.codeActionsOnSave": {
    /* Imports are sorted and organized with eslint-plugin-perfectionist. */
    "source.sortImports": "never",
    "source.organizeImports": "never",
    "source.removeUnusedImports": "never",

    /* Apply ESLint fixes when saving files. */
    "source.fixAll.eslint": "explicit"
  },

  "eslint.run": "onSave",
  "eslint.format.enable": true,
  "eslint.validate": [
    "javascript",
    "typescript",
    "javascriptreact",
    "typescriptreact",
    "json",
    "markdown",
    "html",
    "css",
    "tailwindcss",
    "astro",
    "vue"
  ],

  /* Adjust these based on the features you're using to silently auto-fix the stylistic rules. */
  "eslint.rules.customizations": [
    { "rule": "*styl*", "severity": "off", "fixable": true },
    { "rule": "*sort*", "severity": "off", "fixable": true },
    { "rule": "*indent", "severity": "off", "fixable": true },
    { "rule": "*quotes", "severity": "off", "fixable": true },
    { "rule": "import*", "severity": "off", "fixable": true },
    { "rule": "*-spac*", "severity": "off", "fixable": true },
    { "rule": "*order-*", "severity": "off", "fixable": true },
    { "rule": "*newline*", "severity": "off", "fixable": true },
    { "rule": "*attribute*", "severity": "off", "fixable": true },
    { "rule": "package-json/order-properties", "severity": "off", "fixable": true },
    { "rule": "vue/max-len", "severity": "off", "fixable": true },
    { "rule": "vue/comma-dangle", "severity": "off", "fixable": true },
    { "rule": "vue/space-in-parens", "severity": "off", "fixable": true }
  ]
}
```

> [!TIP]
> These settings match the default behavior of this configuration. If you've customized any formatting or stylistic rules, update the corresponding editor settings to keep them consistent.

## Formatting
This configuration uses [ESLint Stylistic][plugin-stylistic] to format:
- JavaScript and TypeScript (_js_, _cjs_, _mjs_, _jsx_, _ts_, _cts_, _mts_, _tsx_),
- Astro (similar to _jsx_/_tsx_), and
- Vue's `<script>` blocks.

HTML and Vue's `<template>` blocks are formatted with [@html-eslint/eslint-plugin][plugin-html] and [eslint-plugin-vue][plugin-vue], respectively.

For file types not handled by ESLint Stylistic—such as CSS, JSON, Yaml, and Markdown—you can use Prettier. To simplify the setup, this package also provides a customizable [shared Prettier configuration][prettier-shared-config].

1. Install Prettier as a dev dependency:
   ```shell
   npm i -D prettier
   ```

2. Create a Prettier config file in the root of your project (_prettier.config.js_):
   ```js title="prettier.config.js"
   import prettierConfig from '@shayanthenerd/eslint-config/prettier';

   /** @type {import('prettier').Config} */
   export default {
     ...prettierConfig,
     semi: false, // Override `semi` from the shared config
   };
   ```

   Or if you prefer using TypeScript (_prettier.config.ts_):
   ```ts title="prettier.config.ts"
   import type { Config } from 'prettier';

   import prettierConfig from '@shayanthenerd/eslint-config/prettier';

   export default {
     ...prettierConfig,
     semi: true, // Override `semi` from the shared config
   } satisfies Config;
   ```

### Using ESLint Stylistic with Prettier
In this setup, Prettier formats everything that ESLint Stylistic doesn't. To prevent overlaps and potential race conditions, Prettier should only target files that ESLint Stylistic doesn't format.

_package.json_:
```json title="package.json"
{
  "scripts": {
    "format": "prettier --write . '!**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,html,vue,astro}' --cache"
  }
}
```
_.vscode/settings.json_:
```json title=".vscode/settings.json"
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript][typescript][javascriptreact][typescriptreact][html][vue][astro][{**/package.json}]": {
  "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
}
```

### Using Prettier Alone
If you prefer to use Prettier as the only formatter, [disable the stylistic configuration](#customization) and let Prettier handle all formatting. Just make sure to avoid running `lint` and `format` scripts on the same files simultaneously.

_package.json_:
```json title="package.json"
{
  "scripts": {
    "format": "prettier --write . --cache",
    "lint": "eslint --fix --cache --cache-location='node_modules/.cache/.eslintcache'"
  }
}
```
_.vscode/settings.json_:
```json title=".vscode/settings.json"
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",

  /* On file save, code actions are run before format, so the following doesn't cause conflicts. */
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

## API Reference
<details>
  <summary>
    <!-- eslint-disable-next-line markdown/no-html -->
    The API reference of the <code>options</code> object passed to <code>defineConfig</code>
  </summary><br />

  <small>Some types are omitted or aliased for brevity.</small>

  <!-- START_AUTO-GENERATED_API_REFERENCE -->
  ```ts
  import type { ESLint, Linter } from 'eslint';

  type VueAttributeCategory =
    | 'SLOT'
    | 'EVENTS'
    | 'GLOBAL'
    | 'UNIQUE'
    | 'CONTENT'
    | 'DEFINITION'
    | 'OTHER_ATTR'
    | 'ATTR_STATIC'
    | 'ATTR_DYNAMIC'
    | 'CONDITIONALS'
    | 'LIST_RENDERING'
    | 'TWO_WAY_BINDING'
    | 'OTHER_DIRECTIVES'
    | 'RENDER_MODIFIERS'
    | 'ATTR_SHORTHAND_BOOL';

  interface Overrides {
    name?: string,
    files?: (string | string[])[],
    ignores?: string[],
    plugins?: Record<string, ESLint.Plugin>,
    languageOptions?: Linter.Config['languageOptions'],
    settings?: Record<string, unknown>,
    rules?: ConfigRules, // The available rules in the current configuration object
  }

  interface Options {
    autoDetectDeps?: boolean | 'verbose',
    env?: 'browser' | 'bun' | 'deno' | 'node',
    gitignore?: false | string,
    packageDir?: string,
    tsConfig?: false | {
      filename?: string,
      rootDir: string,
    },

    project?: {
      basePath?: string,
      globals?: {
        astro?: boolean,
        audioWorklet?: boolean,
        browser?: boolean,
        bun?: boolean,
        commonjs?: boolean,
        deno?: boolean,
        node?: boolean,
        nodeBuiltin?: boolean,
        serviceworker?: boolean,
        sharedWorker?: boolean,
        vitest?: boolean,
        vue?: boolean,
        webextension?: boolean,
        worker?: boolean,
        custom?: Record<string, 'off' | boolean | 'readable' | 'readonly' | 'writable' | 'writeable'>,
      },
      ignores?: string[],
      linterOptions?: {
        noInlineConfig?: boolean,
        reportUnusedDisableDirectives?: 'off' | 'warn' | 'error',
        reportUnusedInlineConfigs?: 'off' | 'warn' | 'error',
      },
      name?: string,
      rules?: Linter.RulesRecord,
      settings?: Record<string, unknown>,
    },

    configs?: {
      astro?: boolean | {
        overrides?: Overrides,
      },
      base?: {
        functionStyle?: 'expression' | 'declaration',
        maxDepth?: number,
        maxNestedCallbacks?: number,
        preferNamedExports?: boolean,
        overrides?: Overrides,
      },
      css?: boolean | {
        allowedRelativeFontUnits?: (
          | '%'
          | 'ch'
          | 'em'
          | 'ex'
          | 'ic'
          | 'lh'
          | 'cap'
          | 'rch'
          | 'rem'
          | 'rex'
          | 'ric'
          | 'rlh'
          | 'rcap'
        )[],
        useBaseline?: false | number | 'newly' | 'widely',
        overrides?: Overrides,
      },
      html?: boolean | {
        idNamingConvention?: 'camelCase' | 'kebab-case' | 'PascalCase' | 'snake_case',
        useBaseline?: false | number | 'newly' | 'widely',
        overrides?: Overrides,
      },
      importX?: boolean | {
        overrides?: Overrides,
      },
      markdown?: boolean | {
        allowedHtmlTags?: string[],
        frontmatter?: false | 'json' | 'toml' | 'yaml',
        language?: 'gfm' | 'commonmark',
        overrides?: Overrides,
      },
      node?: boolean | {
        overrides?: Overrides,
      },
      nuxt?: boolean | {
        icon?: boolean | {
          component?: string,
        },
        image?: boolean,
        ui?: boolean | {
          prefix?: string,
        },
      },
      packageJson?: boolean | {
        overrides?: Overrides,
      },
      perfectionist?: boolean | {
        sortType?: 'custom' | 'natural' | 'unsorted' | 'line-length' | 'alphabetical' | 'subgroup-order',
        overrides?: Overrides,
      },
      promise?: boolean | {
        overrides?: Overrides,
      },
      stylistic?: boolean | {
        arrowParens?: 'always' | 'as-needed',
        indent?: number,
        jsxQuotes?: 'prefer-double' | 'prefer-single',
        maxAttributesPerLine?: number,
        maxConsecutiveEmptyLines?: number,
        maxLineLength?: number,
        memberDelimiterStyle?: 'semi' | 'comma',
        quotes?: 'double' | 'single' | 'backtick',
        selfCloseVoidHTMLElements?: 'never' | 'always',
        semi?: 'never' | 'always',
        trailingComma?: 'never' | 'always' | 'only-multiline' | 'always-multiline',
        overrides?: Overrides,
      },
      tailwind?: false | {
        config: string,
        cwd?: string,
        entryPoint?: string,
        ignoredUnknownClasses?: string[],
        multilineSort?: boolean,
        overrides?: Overrides,
      } | {
        config?: string,
        cwd?: string,
        entryPoint: string,
        ignoredUnknownClasses?: string[],
        multilineSort?: boolean,
        overrides?: Overrides,
      },
      test?: {
        maxNestedDescribe?: number,
        testFunction?: 'it' | 'test',
        cypress?: boolean | {
          overrides?: Overrides,
        },
        playwright?: boolean | {
          overrides?: Overrides,
        },
        storybook?: boolean | {
          overrides?: Overrides,
        },
        vitest?: boolean | {
          overrides?: Overrides,
        },
      },
      typescript?: boolean | {
        allowedDefaultProjects?: string[],
        methodSignatureStyle?: 'method' | 'property',
        removeUnusedImports?: boolean,
        typeDefinitionStyle?: 'type' | 'interface',
        overrides?: Overrides,
      },
      vue?: boolean | {
        accessibility?: boolean | {
          accessibleChildComponents?: string[],
          anchorComponents?: string[],
          imageComponents?: string[],
        },
        allowedStyleAttributes?: ['plain' | 'module' | 'scoped', 'plain' | 'module' | 'scoped'],
        attributeHyphenation?: 'never' | 'always',
        attributesOrder?: (VueAttributeCategory | VueAttributeCategory[])[],
        blockLang?: {
          script?: 'js' | 'ts' | 'jsx' | 'tsx' | 'implicit',
          style?: 'css' | 'scss' | 'postcss' | 'implicit',
        },
        blocksOrder?: (
          | 'docs'
          | 'template'
          | 'script[setup]'
          | 'style[scoped]'
          | 'i18n[locale=en]'
          | 'script:not([setup])'
          | 'style:not([scoped])'
          | 'i18n:not([locale=en])'
        )[],
        componentNameCaseInTemplate?: 'kebab-case' | 'PascalCase',
        destructureProps?: 'never' | 'always' | 'only-when-assigned',
        ignoredUndefinedComponents?: string[],
        macrosOrder?: (
          | 'definePage'
          | 'defineEmits'
          | 'defineModel'
          | 'defineProps'
          | 'defineSlots'
          | 'defineCustom'
          | 'defineExpose'
          | 'defineOptions'
        )[],
        preferVBindSameNameShorthand?: 'never' | 'always',
        preferVBindTrueShorthand?: 'never' | 'always',
        restrictedElements?: (string | {
          element: string | string[],
          message: string,
        })[],
        restrictedStaticAttributes?: (string | {
          element: string,
          key: string,
          message: string,
          value: true | string,
        })[],
        vForDelimiterStyle?: 'in' | 'of',
        overrides?: Overrides,
      },
      zod?: boolean | {
        mini?: boolean,
        overrides?: Overrides,
      },
    },
  }
  ```
  <!-- END_AUTO-GENERATED_API_REFERENCE -->
</details>

## Versioning Policy
This project adheres to [The Semantic Versioning Standard][semver]. However, to facilitate rapid development and fast iteration, **the following changes are considered non-breaking**:
- Updates to dependency versions
- Modifications to rule options
- Enabling or disabling rules and plugins

Under this policy, minor updates may introduce new linting errors, which could break your project's build pipeline. To prevent this, it's recommended to use an exact version. Alternatively, you can use a tilde (`~`) version range in your _package.json_ file (e.g., `"@shayanthenerd/eslint-config": "~1.2.3"`), which will restrict updates to patches only, ensuring your project's build pipeline remains stable.

You can find a list of all available versions and their changelogs on the [releases page][releases].

## Roadmap to v1.0.0
- [ ] Add integration for ESLint plugins such as [eslint-plugin-n][plugin-n], [eslint-plugin-unicorn][plugin-unicorn], and more.
- [ ] Add support for other React, Next, Astro, and Markdown.
- [ ] Develop an interactive starter wizard to quickly scaffold the configurations for ESLint, Prettier, etc.

## Contribution Guide
Contributions of all kinds are welcome. Please check out the [CONTRIBUTING.md][contributing] file.

## Credits
This project was inspired by the work of [Anthony Fu][antfu], whose generous contributions to the JavaScript and the ESLint ecosystem were instrumental in making it possible.

## License
[MIT][license] License © 2025-PRESENT — [Shayan Zamani][ShayanTheNerd]

<!-- Badges -->
[license]: ./LICENSE
[license-badge]: https://img.shields.io/badge/License-MIT-blue.svg?logoColor=FEFEFE&labelColor=3B82F6&color=3B82F6
[npm-version-badge]: https://img.shields.io/npm/v/@shayanthenerd/eslint-config?label=&logo=npm&logoColor=FEFEFE&labelColor=3B82F6&color=3B82F6
[npmx]: https://www.npmjs.com/package/@shayanthenerd/eslint-config

<!-- Editor Extensions -->
[extension-eslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
[extension-prettier]: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
[extension-tailwind]: https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss

<!-- ESLint Plugins -->
[plugin-astro]: https://ota-meshi.github.io/eslint-plugin-astro
[plugin-css]: https://github.com/eslint/css
[plugin-cypress]: https://github.com/cypress-io/eslint-plugin-cypress
[plugin-html]: https://html-eslint.org
[plugin-import-x]: https://github.com/un-ts/eslint-plugin-import-x
[plugin-jsx-a11y]: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
[plugin-md]: https://github.com/eslint/markdown
[plugin-n]: https://github.com/eslint-community/eslint-plugin-n
[plugin-next]: https://nextjs.org/docs/app/api-reference/config/eslint#eslint-plugin
[plugin-package-json]: https://github.com/JoshuaKGoldberg/eslint-plugin-package-json
[plugin-perfectionist]: https://perfectionist.dev
[plugin-playwright]: https://github.com/mskelton/eslint-plugin-playwright
[plugin-promise]: https://github.com/eslint-community/eslint-plugin-promise
[plugin-react]: https://eslint-react.xyz
[plugin-react-hooks]: https://react.dev/reference/eslint-plugin-react-hooks
[plugin-storybook]: https://storybook.js.org/docs/configure/integration/eslint-plugin
[plugin-stylistic]: https://eslint.style
[plugin-tailwind]: https://github.com/schoero/eslint-plugin-better-tailwindcss
[plugin-ts]: https://typescript-eslint.io
[plugin-unicorn]: https://github.com/sindresorhus/eslint-plugin-unicorn
[plugin-vitest]: https://github.com/vitest-dev/eslint-plugin-vitest
[plugin-vue]: https://eslint.vuejs.org
[plugin-vue-a11y]: https://vue-a11y.github.io/eslint-plugin-vuejs-accessibility
[plugin-zod]: https://github.com/marcalexiei/eslint-zod

<!-- References -->
[antfu]: https://github.com/antfu
[contributing]: ./.github/CONTRIBUTING.md
[eslint]: https://eslint.org
[online-preview]: https://eslintconfig.netlify.app
[eslint-config-ts-setup]: https://eslint.org/docs/latest/use/configure/configuration-files#typescript-configuration-files
[eslint-nuxt]: https://eslint.nuxt.com
[local-pkg]: https://github.com/antfu-collective/local-pkg
[prettier-shared-config]: https://prettier.io/docs/sharing-configurations
[releases]: https://github.com/ShayanTheNerd/eslint-config/releases
[semver]: https://semver.org
[ShayanTheNerd]: https://github.com/ShayanTheNerd
