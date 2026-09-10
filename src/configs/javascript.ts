import type { Linter } from 'eslint';
import type { DeepNonNullable } from '#types/helpers.d.ts';
import type { Options } from '#types/index.d.ts';

import { mergeConfigs } from 'eslint-flat-config-utils';
import globals from 'globals';
import { parser as eslintParserTypescript } from 'typescript-eslint';

import { globs } from '#helpers/globs.ts';
import { getJavaScriptRules } from '#rules/javascript.ts';
import { isEnabled } from '#utils/isEnabled.ts';
import { isTruthy } from '#utils/isTruthy.ts';

function getJavascriptConfig(options: DeepNonNullable<Options>): Linter.Config {
  const {
    env,
    configs: {
      vue,
      astro,
      javascript: {
        overrides,
      },
    },
    project: {
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
        astro: astroGlobals,
        custom: userGlobals,
      },
    },
  } = options;

  const baseConfig = {
    name: 'shayanthenerd/javascript',
    files: [
      globs.src,
      globs.jsxTsx,
      isEnabled(vue) ? globs.vue : '',
      isEnabled(astro) ? globs.astro : '',
    ].filter(isTruthy),
    languageOptions: {
      parser: eslintParserTypescript,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true,
          impliedStrict: true,
        },
      },
      globals: {
        ...globals.builtin,
        ...globals.es2027,
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
        ...((astroGlobals && isEnabled(astro)) && globals.astro),
        ...userGlobals,
      },
    },
    rules: getJavaScriptRules(options),
  } satisfies Linter.Config;

  return mergeConfigs(baseConfig as Linter.Config, overrides);
}

export { getJavascriptConfig };
