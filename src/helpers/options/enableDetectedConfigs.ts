import type { Options } from '#types/index.d.ts';

import { isPackageDetected, logDetectedPackages } from '#helpers/isPackageDetected.ts';

function enableDetectedConfigs(options: Options): Options {
  const autoDetectedDeps = {
    typescript: isPackageDetected('typescript', options),
    zod: isPackageDetected('zod', options),
    astro: isPackageDetected('astro', options),
    vue: isPackageDetected('vue', options),
    nuxt: isPackageDetected('nuxt', options),
    nuxtUI: isPackageDetected('@nuxt/ui', options),
    nuxtIcon: isPackageDetected('@nuxt/icon', options),
    nuxtImage: isPackageDetected('@nuxt/image', options),
    vitest: isPackageDetected('vitest', options),
    cypress: isPackageDetected('cypress', options),
    storybook: isPackageDetected('storybook', options),
    playwright: isPackageDetected('@playwright/test', options),
  };

  options.configs ??= {};
  options.configs.test ??= {};

  options.configs.node ??= true;
  options.configs.packageJson ??= true;
  options.configs.markdown ??= true;
  options.configs.html ??= false;
  options.configs.css ??= false;
  options.configs.tailwind ??= false;
  options.configs.promise ??= true;
  options.configs.importX ??= true;
  options.configs.stylistic ??= true;
  options.configs.perfectionist ??= true;

  options.configs.typescript ??= autoDetectedDeps.typescript;
  options.configs.zod ??= autoDetectedDeps.zod;
  options.configs.vue ??= autoDetectedDeps.vue;
  options.configs.nuxt ??= autoDetectedDeps.nuxt;
  options.configs.astro ??= autoDetectedDeps.astro;
  options.configs.test.vitest ??= autoDetectedDeps.vitest;
  options.configs.test.cypress ??= autoDetectedDeps.cypress;
  options.configs.test.storybook ??= autoDetectedDeps.storybook;
  options.configs.test.playwright ??= autoDetectedDeps.playwright;

  options.tsConfig ??= options.configs.typescript ? { rootDir: '.', filename: 'tsconfig.json' } : undefined;

  if (options.configs.vue && options.configs.typescript) {
    options.configs.vue = options.configs.vue === true ? {} : options.configs.vue;
    options.configs.vue.blockLang = { script: 'ts' };
  }

  if (options.configs.nuxt) {
    if (options.configs.nuxt === true) {
      options.configs.nuxt = {};
    }

    options.configs.nuxt.ui ??= autoDetectedDeps.nuxtUI;
    options.configs.nuxt.icon ??= autoDetectedDeps.nuxtIcon;
    options.configs.nuxt.image ??= autoDetectedDeps.nuxtImage;
  }

  if (options.autoDetectDeps === 'verbose') {
    logDetectedPackages();
  }

  return options;
}

export { enableDetectedConfigs };
