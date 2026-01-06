import type { Linter } from 'eslint';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options, ConfigObject } from '#types/index.d.ts';

import globals from 'globals';
import { mergeConfigs } from 'eslint-flat-config-utils';
import { parser as eslintParserTypeScript } from 'typescript-eslint';

import { globs } from '#utils/globs.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { getJavaScriptRules } from '#rules/javascript.ts';

type JavaScriptRules = ReturnType<typeof getJavaScriptRules>;
type BaseConfig = Linter.Config & { rules: JavaScriptRules };

function getBaseConfig(options: DeepNonNullable<Options>): BaseConfig {
  const {
    configs: {
      vue,
      test: {
        vitest,
      },
      base: {
        overrides,
      },
    },
    global: {
      globals: {
        node,
        worker,
        browser,
        commonjs,
        webextension,
        serviceworker,
        custom: userGlobals,
      },
    },
  } = options;

  const baseConfig = {
    name: 'shayanthenerd/base',
    files: isEnabled(vue) ? [globs.src, globs.vue] : [globs.src],
    languageOptions: {
      parser: eslintParserTypeScript,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true,
          impliedStrict: true,
        },
      },
      globals: {
        ...globals.builtin,
        ...globals.es2026,
        ...(commonjs && globals.commonjs),
        ...(node && globals.node),
        ...(node && globals.nodeBuiltin),
        ...(browser && globals.browser),
        ...(worker && globals.worker),
        ...(serviceworker && globals.serviceworker),
        ...(webextension && globals.webextensions),
        ...(isEnabled(vue) && globals.vue),
        ...(isEnabled(vitest) && globals.vitest),
        ...userGlobals,
      },
    },
    rules: getJavaScriptRules(options),
  } satisfies ConfigObject;

  /* @ts-expect-error — Incompatible `parser` types */
  return mergeConfigs(baseConfig, overrides);
}

export { getBaseConfig };
