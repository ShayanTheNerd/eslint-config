import type { Options } from '#types/index.d.ts';

import { isPackageDetected, addDetectedPackage, logDetectedPackages } from '#helpers/isPackageDetected.ts';

function enableDetectedConfigs(options: Options): Options {
  options.configs ??= {};
  options.configs.test ??= {};

  options.configs.html ??= false;
  options.configs.css ??= false;
  options.configs.tailwind ??= false;
  options.configs.promise ??= true;
  options.configs.importX ??= true;
  options.configs.stylistic ??= true;
  options.configs.perfectionist ??= true;

  options.configs.packageJson ??= Boolean(options.autoDetectDeps);
  addDetectedPackage('package.json');

  options.configs.markdown ??= true;
  addDetectedPackage('markdown');

  options.configs.vue ??= isPackageDetected('vue', options);
  options.configs.nuxt ??= isPackageDetected('nuxt', options);
  options.configs.astro ??= isPackageDetected('astro', options);
  options.configs.typescript ??= isPackageDetected('typescript', options);
  options.configs.zod ??= isPackageDetected('zod', options);
  options.configs.test.vitest ??= isPackageDetected('vitest', options);
  options.configs.test.cypress ??= isPackageDetected('cypress', options);
  options.configs.test.storybook ??= isPackageDetected('storybook', options);
  options.configs.test.playwright ??= isPackageDetected('@playwright/test', options);

  options.tsConfig ??= options.configs.typescript ? { rootDir: '.', filename: 'tsconfig.json' } : false;

  if (options.configs.typescript && options.configs.vue) {
    options.configs.vue = options.configs.vue === true ? {} : options.configs.vue;
    options.configs.vue.blockLang = { script: 'ts' };
  }

  if (options.configs.nuxt) {
    if (options.configs.nuxt === true) {
      options.configs.nuxt = {};
    }

    options.configs.nuxt.ui ??= isPackageDetected('@nuxt/ui', options);
    options.configs.nuxt.icon ??= isPackageDetected('@nuxt/icon', options);
    options.configs.nuxt.image ??= isPackageDetected('@nuxt/image', options);
  }

  if (options.autoDetectDeps === 'verbose') {
    logDetectedPackages();
  }

  return options;
}

export { enableDetectedConfigs };
