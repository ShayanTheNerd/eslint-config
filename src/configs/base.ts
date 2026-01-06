import type { Linter } from 'eslint';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options, ConfigObject } from '#types/index.d.ts';

import globals from 'globals';
import { mergeConfigs } from 'eslint-flat-config-utils';
import { parser as eslintParserTypeScript } from 'typescript-eslint';

import { globs } from '#helpers/globs.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { getJavaScriptRules } from '#rules/javascript.ts';

type JavaScriptRules = ReturnType<typeof getJavaScriptRules>;
type BaseConfig = Linter.Config & { rules: JavaScriptRules };

function getBaseConfig(options: DeepNonNullable<Options>): BaseConfig {
  const {
    env,
    configs: {
      vue,
      base: {
        overrides,
      },
    },
    global: {
      globals: {
        bun,
        node,
        deno,
        vitest,
        worker,
        browser,
        commonjs,
        nodeBuiltin,
        audioWorklet,
        webextension,
        sharedWorker,
        serviceworker,
        vue: vueGlobals,
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
        ...(worker && globals.worker),
        ...(commonjs && globals.commonjs),
        ...((bun && env === 'bun') && globals.bunBuiltin),
        ...((deno && env === 'deno') && globals.denoBuiltin),
        ...(node && globals.node),
        ...((nodeBuiltin && env === 'node') && globals.nodeBuiltin),
        ...((browser && env === 'browser') && globals.browser),
        ...((sharedWorker && env === 'browser') && globals.sharedWorker),
        ...((serviceworker && env === 'browser') && globals.serviceworker),
        ...((webextension && env === 'browser') && globals.webextensions),
        ...((audioWorklet && env === 'browser') && globals.audioWorklet),
        ...(vitest && globals.vitest),
        ...((vueGlobals && isEnabled(vue)) && globals.vue),
        ...userGlobals,
      },
    },
    rules: getJavaScriptRules(options),
  } satisfies ConfigObject;

  /* @ts-expect-error — Incompatible `parser` types */
  return mergeConfigs(baseConfig, overrides);
}

export { getBaseConfig };
