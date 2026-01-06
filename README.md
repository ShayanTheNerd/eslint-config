# @shayanthenerd/eslint-config &nbsp;&nbsp; [![NPM Version](https://img.shields.io/npm/v/@shayanthenerd/eslint-config?label=&logo=npm&logoColor=EEEEEE&labelColor=545A61&color=545A61&registry_uri=https://registry.npmjs.com/@shayanthenerd/eslint-config&link=https://github.com/ShayanTheNerd/eslint-config)](https://www.npmjs.com/package/@shayanthenerd/eslint-config) [![License MIT](https://img.shields.io/badge/License-MIT-blue.svg?labelColor=545A61&color=545A61)](https://github.com/ShayanTheNerd/eslint-config/blob/main/LICENSE) [![Netlify Status](https://api.netlify.com/api/v1/badges/8ed76fdd-5aa7-446a-89fa-c916f8cce0de/deploy-status)](https://eslint-config.shayan-zamani.me)

A modern, flexible ESLint configuration for enforcing best practices and maintaining a consistent coding style.

- **Performant**: Powered by [OXLint (OXC Linter)](https://oxc.rs/docs/guide/usage/linter) for rapid linting
- **Flat Config**: Type-safe [ESLint Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files) with `extends` and `overrides` support
- **Comprehensive**: Dependency detection with support for TypeScript, Vue & Nuxt, Tailwind, Storybook, Vitest & Playwright, and more
- **Automatic Formatting**: Fine-grained control over formatting with [ESLint Stylistic](https://eslint.style), eliminating the need for Prettier
- **Smart Defaults**: Respects your _.gitignore_ file and provides reasonable, opinionated, yet [highly customizable](#customization) defaults
- **Developer-friendly**: Easy to use and well-documented with JSDoc
- **Modern**: Requires Node.js v20.12.0+ and ESLint v9.28.0+ (ESM-only)

> [!NOTE]
> This configuration is designed with a flexible API for easy customization. However, it remains a **personal config**. While its primary goal is to enforce best practices and maintain code consistency, some rules—particularly stylistic ones—are rather opinionated. <br /> If the available customization and override options still don't meet your requirements, feel free to fork the project and tailor it to your needs.

## Table of Contents
- [Installation and Configuration](#installation-and-configuration)
- [Automatic Dependency Detection](#automatic-dependency-detection)
- [Formatting](#formatting)
- [VS Code Integration](#vs-code-integration)
- [Customization](#customization)
  - [OXLint](#oxlint)
  - [ESLint](#eslint)
- [API Reference](#api-reference)
- [Versioning Policy](#versioning-policy)
- [Roadmap to v1.0.0](#roadmap-to-v100)
- [Contribution Guide](#contribution-guide)
- [Credits](#credits)
- [License](#license)

## Installation and Configuration
1. Install the package:
```shell
npm i -D @shayanthenerd/eslint-config
```

OXLint and all necessary ESLint plugins and parsers will be installed automatically.

2. Create an ESLint config file (_eslint.config.js_) at the root of your project:
```js
import { defineConfig } from '@shayanthenerd/eslint-config';

export default defineConfig();
```

You can also use a TypeScript file (_eslint.config.ts_). Depending on your Node.js version, [additional setup](https://eslint.org/docs/latest/use/configure/configuration-files#typescript-configuration-files) may be required.

If you're using Nuxt, install [@nuxt/eslint](https://eslint.nuxt.com) as a dev dependency:
```shell
npm i -D @nuxt/eslint
```

Then, update your ESLint config file:
```js
import { defineConfig } from '@shayanthenerd/eslint-config';

import eslintConfigNuxt from './.nuxt/eslint.config.mjs';

const eslintConfig = defineConfig();

export default eslintConfigNuxt(eslintConfig);
```

> [!NOTE]
> The Nuxt config relies on the Vue config, so make sure it's enabled (either automatically or manually).

3. Create an OXLint config file (_.oxlintrc.json_) in the root of your project:
```jsonc
{
  "$schema": "./node_modules/oxlint/configuration_schema.json", // Optional

  "extends": ["./node_modules/@shayanthenerd/eslint-config/dist/oxlint.config.jsonc"],

  /* Customize based on your development environment. */
  "env": {
    "builtin": true,
    "es2026": true,
    "commonjs": false,
    "node": true,
    "browser": true,
    "worker": true,
    "serviceworker": false,
    "webextensions": false
  },

  "categories": {
    "correctness": "error",
    "suspicious": "error",
    "restriction": "error",
    "pedantic": "error",
    "perf": "warn",
    "style": "warn",
    "nursery": "error"
  }
}
```

Due to [the limitation of OXLint](https://oxc.rs/docs/guide/usage/linter/nested-config#extending-configuration-files), only `rules`, `plugins`, and `overrides` can be extended. Check out [OXLint config reference](https://oxc.rs/docs/guide/usage/linter/config-file-reference) for more details.

4. Add the following scripts to your _package.json_ file:
```json
{
  "scripts": {
    "lint:inspect": "npx @eslint/config-inspector",
    "lint:oxlint": "oxlint --fix",
    "lint:eslint": "eslint --fix --cache --cache-location='node_modules/.cache/.eslintcache'",
    "lint": "npm run lint:oxlint && npm run lint:eslint"
  }
}
```

---

That's it! You can now run OXLint and ESLint in your project:
```shell
npm run lint
```

To get a visual breakdown of your configuration, run:
```shell
npm run lint:inspect
```

## Automatic Dependency Detection
This package automatically detects dependencies in your project and enables the corresponding ESLint configurations for them. This is powered by [local-pkg](https://github.com/antfu-collective/local-pkg), which scans your _node_modules_ directory instead of _package.json_. <br />
> [!IMPORTANT]
> This behavior is particularly noticeable with package managers that use a flat _node_modules_ structure, such as **NPM** or **Bun**. <br />
A concrete example is `eslint-plugin-storybook`, which is a dependency of this package. Since the plugin transitively depends on `storybook`, NPM and Bun hoist `storybook` to the root of your _node_modules_. As a result, the ESLint configuration for `storybook` will be automatically enabled, even if you haven't explicitly installed it. <br />
Using a package manager with strict dependency resolution, such as **PNPM**, prevents this issue by hiding transitive dependencies from the root of your _node_modules_.

To opt out of this behavior, you can either set `autoDetectDeps: false` in the options object or explicitly disable any unwanted configurations that were automatically enabled.

Unlike other plugins, the configuration for Tailwind isn't automatically enabled upon dependency detection, because you must explicitly provide the path to your Tailwind entry point (config file), or the ESLint configuration won't work as expected.

Stylistic, Perfectionist, ImportX, and core (JavaScript) rules are enabled by default.

## Formatting
This config uses [ESLint Stylistic](https://eslint.style) to format JavaScript and TypeScript files (`?([mc])[jt]s?(x)`) as well as the `<script>` blocks in Vue components. HTML and the `<template>` blocks in Vue components are formatted with [html-eslint](https://html-eslint.org) and [eslint-plugin-vue](https://eslint.vuejs.org), respectively. For other files such as CSS, JSON, and Markdown, you'll need Prettier. To make this easier, a customizable [shared Prettier configuration](https://prettier.io/docs/sharing-configurations) is provided. Here's how to set it up:

1. Install Prettier:
```shell
npm i -D prettier
```

2. Create a Prettier config file in the root of your project (_prettier.config.js_):
```js
import prettierConfig from '@shayanthenerd/eslint-config/prettier';

/** @type {import('prettier').Config} */
export default {
  ...prettierConfig,
  semi: false, // Override `semi` from the shared config
};
```

Or if you prefer using TypeScript (_prettier.config.ts_):
```ts
import type { Config } from 'prettier';

import prettierConfig from '@shayanthenerd/eslint-config/prettier';

export default {
  ...prettierConfig,
  semi: true, // Override `semi` from the shared config
} satisfies Config;
```

3. To prevent conflicts with ESLint, Prettier should be configured to only format files other than JavaScript, TypeScript, HTML, and Vue. Hence, add the following script to your _package.json_ file:
```json
{
  "scripts": {
    "format": "prettier --write . '!**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,html,vue}' --cache"
  }
}
```

For IDE setup guidance, see [VS Code Integration](#vs-code-integration).

## VS Code Integration
Install VS Code extensions for [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), [OXLint](https://marketplace.visualstudio.com/items?itemName=oxc.oxc-vscode), and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode). Then, add the following in the _.vscode/settings.json_ file of your project:
```jsonc
{
  /* Enforce Unix-like line endings (LF). */
  "files.eol": "\n",

  /* Enforce either tabs or spaces for indentation. */
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.detectIndentation": false,

  "editor.codeActionsOnSave": {
    /* Imports are sorted and organized with eslint-plugin-perfectionist. */
    "source.sortImports": "never",
    "source.organizeImports": "never",
    "source.removeUnusedImports": "never",

    /* Apply OXLint and ESLint automatic fixes on file save. */
    "source.fixAll.oxc": "explicit",
    "source.fixAll.eslint": "explicit"
  },
	"oxc.lint.run": "onSave",
	"eslint.run": "onSave",
  "editor.formatOnSave": true,
	"eslint.format.enable": true,

  /* Format and lint JavaScript, TypeScript, HTML, and Vue files with ESLint, while everything else is formatted with Prettier. */
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript][typescript][javascriptreact][typescriptreact][html][vue]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
  "eslint.validate": [
    "javascript",
    "typescript",
    "javascriptreact",
    "typescriptreact",
    "html",
    "css",
    "tailwindcss",
    "vue"
  ],

  /* Adjust these based on the features you're using to silently auto-fix the stylistic rules in your IDE. */
  "tailwindCSS.lint.cssConflict": "ignore", // Only if you're using the Tailwind config
	"tailwindCSS.lint.recommendedVariantOrder": "ignore", // Only if you're using the Tailwind config
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
    { "rule": "vue/max-len", "severity": "off", "fixable": true },
    { "rule": "vue/comma-dangle", "severity": "off", "fixable": true },
    { "rule": "vue/space-in-parens", "severity": "off", "fixable": true },
    { "rule": "better-tailwindcss/*", "severity": "off", "fixable": true },
    { "rule": "better-tailwindcss/no-restricted-classes", "severity": "error", "fixable": true },
    { "rule": "better-tailwindcss/no-conflicting-classes", "severity": "error", "fixable": false },
    { "rule": "better-tailwindcss/no-unregistered-classes", "severity": "error", "fixable": false }
  ]
}
```

## Customization
### OXLint
Since OXLint and ESLint use separate config files, customizations made in your ESLint config will not apply to OXLint. However, you can still customize OXLint rules in your _.oxlintrc.json_ file. Here's an example:
```jsonc
{
  /* Base configuration */

  "rules": {
    /* Globally override rules. */
    "oxlint/no-named-as-default-member": "warn"
  },

  "overrides": [
    /* Override rules for specific files. */
    {
      "files": ["app/**/*.tsx"],
      "ignores": ["app/app.tsx"],
      "rules": {
        "oxlint/max-depth": ["error", { "max": 5 }],
        "oxlint/explicit-function-return-type": "off"
      }
    }
  ],

  /* OXLint respects the ignore patterns defined in `.gitignore` and `.eslintignore` files by default. */
  "ignorePatterns": ["**/*.min.*"]
}
```

### ESLint
`defineConfig` takes the `options` object as the first argument. `options` is thoroughly documented with JSDoc and provides many options for rule customizations. In addition, each config object in `options.configs` accepts an `overrides` option:
```ts
interface Overrides {
  name: '',
  files: [],
  ignores: [],
  plugins: {},
  settings: {},
  languageOptions: {
    parser: {},
    globals: {},
  },
  rules: {},
}
```

`overrides` is merged with the default config, taking precedence over its properties. However, there is no guarantee that the resulting configuration works correctly — it depends on the options you provide.

`defineConfig` also accepts any number of custom ESLint Flat Configs (_eslint.config.js_):
```js
import eslintPluginYaml from 'eslint-plugin-yaml';
import * as eslintPluginRegexp from 'eslint-plugin-regexp';
import { defineConfig } from '@shayanthenerd/eslint-config';

export default defineConfig(
  /* The options object: */
  {
    env: 'bun',
    configs: {
      typescript: {
        typeDefinitionStyle: 'type',
        overrides: {
          rules: {
            '@typescript-eslint/no-unsafe-type-assertion': 'off',
          },
        },
      },
    },
  },

  /* ESLint Flat Configs: */
  {
    files: ['**/*.yaml', '**/*.yml'],
    ignores: ['**/*.schema.yaml', '**/*.schema.yml'],
    extends: [pluginYaml.configs.recommended],
  },
  regexpPlugin.configs['flat/recommended'],
);
```

## API Reference
<details>
  <summary>The API reference</summary>
  Some types are omitted or aliased for brevity.

  ```ts
  interface Options {
    autoDetectDeps?: boolean | 'verbose',
    gitignore?: false | string,
    packageDir?: string,
    env?: 'bun' | 'node',
    tsConfig?: {
      rootDir: string,
      filename?: string,
    },

    global?: {
      name?: string,
      basePath?: string,
      ignores?: string[],
      globals?: {
        node?: boolean,
        commonjs?: boolean,
        browser?: boolean,
        worker?: boolean,
        serviceworker?: boolean,
        webextension?: boolean,
        custom?: {
          [key: string]: boolean | 'off' | 'readonly' | 'readable' | 'writable' | 'writeable',
        },
      }
      linterOptions?: {
        noInlineConfig?: boolean,
        reportUnusedInlineConfigs?: 'error' | 'off' | 'warn',
        reportUnusedDisableDirectives?: 'error' | 'off' | 'warn',
      },
      settings?: {
        [name: string]: unknown,
      }
      rules?: Linter.RulesRecord,
    },

    configs?: {
      oxlint?: false | string,
      base?: {
        maxDepth?: number,
        maxNestedCallbacks?: number,
        preferNamedExports?: boolean,
        functionStyle?: 'declaration' | 'expression',
        overrides?: {},
      },
      stylistic?: boolean | {
        semi?: 'always' | 'never',
        trailingComma?: 'always' | 'never' | 'always-multiline' | 'only-multiline',
        memberDelimiterStyle?: 'semi' | 'comma',
        quotes?: 'single' | 'double' | 'backtick',
        jsxQuotes?: 'prefer-single' | 'prefer-double',
        arrowParens?: 'always' | 'as-needed',
        indent?: number,
        maxConsecutiveEmptyLines?: number,
        maxLineLength?: number,
        maxAttributesPerLine?: number,
        selfCloseVoidHTMLElements?: 'never' | 'always',
        overrides?: {},
      },
      html?: boolean | {
        useBaseline?: number | false | 'widely' | 'newly',
        idNamingConvention?: 'camelCase' | 'snake_case' | 'PascalCase' | 'kebab-case',
        overrides?: {},
      },
      css?: boolean | {
        useBaseline?: number | false | 'widely' | 'newly',
        allowedRelativeFontUnits?: ('%' | 'cap' | 'ch' | 'em' | 'ex' | 'ic' | 'lh' | 'rcap' | 'rch' | 'rem' | 'rex' | 'ric' | 'rlh')[],
        overrides?: {},
      },
      tailwind?: false | {
        config: string,
        entryPoint?: string,
        multilineSort?: boolean,
        ignoredUnregisteredClasses?: string[],
        overrides?: {},
      } | {
        config?: string,
        entryPoint: string,
        multilineSort?: boolean,
        ignoredUnregisteredClasses?: string[],
        overrides?: {},
      },
      typescript?: boolean | {
        allowedDefaultProjects?: string[],
        methodSignatureStyle?: 'property' | 'method',
        typeDefinitionStyle?: 'interface' | 'type',
        overrides?: {},
      },
      importX?: boolean | {
        removeUnusedImports?: boolean,
        overrides?: {},
      },
      perfectionist?: boolean | {
        sortType?: 'custom' | 'natural' | 'alphabetical' | 'line-length' | 'unsorted',
        overrides?: {},
      },
      vue?: boolean | {
        accessibility?: boolean | {
          anchorComponents?: string[],
          imageComponents?: string[],
          accessibleChildComponents?: string[],
        },
        blockOrder?: (
          | 'docs'
          | 'template'
          | 'script[setup]'
          | 'style[scoped]'
          | 'i18n[locale=en]'
          | 'script:not([setup])'
          | 'style:not([scoped])'
          | 'i18n:not([locale=en])'
        )[],
        macrosOrder?: (
          | 'definePage'
          | 'defineModel'
          | 'defineProps'
          | 'defineEmits'
          | 'defineSlots'
          | 'defineCustom'
          | 'defineExpose'
          | 'defineOptions'
        )[],
        attributesOrder?: RuleOptions<'vue/attributes-order'>['order'],
        attributeHyphenation?: 'never' | 'always',
        preferVBindSameNameShorthand?: 'never' | 'always',
        preferVBindTrueShorthand?: 'never' | 'always',
        allowedStyleAttributes?: ['module' | 'plain' | 'scoped', 'module' | 'plain' | 'scoped'],
        blockLang?: {
          style?: 'css' | 'implicit' | 'scss' | 'postcss',
          script?: 'js' | 'ts' | 'jsx' | 'tsx' | 'implicit',
        },
        destructureProps?: 'never' | 'always',
        componentNameCaseInTemplate?: 'PascalCase' | 'kebab-case',
        vForDelimiterStyle?: 'in' | 'of',
        vOnHandlerStyle?: 'inline' | 'inline-function' | ['method', 'inline' | 'inline-function'],
        restrictedElements?: (string | {
          element: string | string[],
          message: string,
        })[],
        restrictedStaticAttributes?: (string | {
          key: string,
          value?: string | true,
          element: string,
          message: string,
        })[],
        ignoredUndefinedComponents?: string[],
        overrides?: {},
      },
      nuxt?: boolean | {
        image?: boolean,
        icon?: boolean | {
          component?: string,
        }
        ui?: boolean | {
          prefix?: string,
        }
      },
      test?: {
        storybook?: boolean | {
          overrides?: {},
        },
        vitest?: boolean | {
          overrides?: {},
        },
        playwright?: boolean | {
          overrides?: {},
        },
        cypress?: boolean | {
          overrides?: {},
        },
        testFunction?: 'test' | 'it',
        maxNestedDescribe?: number,
      },
    },
  }
  ```
</details>

## Versioning Policy
This project adheres to [The Semantic Versioning Standard](https://semver.org). However, to facilitate rapid development and fast iteration, the following changes are considered non-breaking:
- Upgrades to dependency versions
- Modifications to rule options
- Enabling or disabling rules and plugins

Under this policy, minor updates may introduce new linting errors, which could break your project's build pipeline. To prevent this, it's recommended to use an exact version. Alternatively, you can use a tilde (`~`) version range in your _package.json_ file (e.g., `"@shayanthenerd/eslint-config": "~1.2.3"`), which will restrict updates to patches only, ensuring your project's build pipeline remains stable.

You can find a list of all available versions and their changelogs on the [releases page](https://github.com/ShayanTheNerd/eslint-config/releases).

## Roadmap to v1.0.0
- [ ] Integrate additional ESLint plugins such as [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn), [eslint-plugin-n](https://github.com/eslint-community/eslint-plugin-n), [eslint-plugin-jsdoc](https://github.com/gajus/eslint-plugin-jsdoc), etc.
- [ ] Add support for other frameworks and file types, including Astro, React, Next.js, MDX, Markdown, JSON, etc.
- [ ] Develop a starter wizard to automate the setup of OXLint, ESLint, Prettier, and other configurations.

## Contribution Guide
Any form of contribution is always appreciated! Please chekc out the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## Credits
This project was inspired by the work of [Anthony Fu](https://github.com/antfu), whose generous contributions to the JavaScript and the ESLint ecosystem were instrumental in making it possible.

## License
[MIT](LICENSE) License © 2025-PRESENT — [Shayan Zamani](https://github.com/ShayanTheNerd)
