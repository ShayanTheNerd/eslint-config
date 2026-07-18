import type { Options } from '#types/index.d.ts';

import { isEnabled } from '#utils/isEnabled.ts';
import { defaultOptions } from '#helpers/options/defaultOptions.ts';
import { isPackageDetected, logDetectedPackages } from '#helpers/isPackageDetected.ts';

function enableDetectedConfigs(options: Options): Options {
  const explicitlyDisabledConfigs = {
    'typescript': options.configs?.typescript === false,
    'zod': options.configs?.zod === false,
    'astro': options.configs?.astro === false,
    'react': options.configs?.react === false,
    'next': options.configs?.next === false,
    'vue': options.configs?.vue === false,
    'nuxt': options.configs?.nuxt === false,
    '@nuxt/ui': isEnabled(options.configs?.nuxt) && options.configs?.nuxt?.ui === false,
    '@nuxt/icon': isEnabled(options.configs?.nuxt) && options.configs?.nuxt?.icon === false,
    '@nuxt/image': isEnabled(options.configs?.nuxt) && options.configs?.nuxt?.image === false,
    'vitest': options.configs?.test?.vitest === false,
    'cypress': options.configs?.test?.cypress === false,
    'storybook': options.configs?.test?.storybook === false,
    '@playwright/test': options.configs?.test?.playwright === false,
  };

  const autoDetectedPackages = {
    typescript: isPackageDetected('typescript', options),
    zod: isPackageDetected('zod', options),
    astro: isPackageDetected('astro', options),
    react: isPackageDetected('react', options),
    next: isPackageDetected('next', options),
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
  options.configs.useBaseline ??= options.env === 'browser';

  options.configs.typescript ??= autoDetectedPackages.typescript;
  options.configs.zod ??= autoDetectedPackages.zod;
  options.configs.astro ??= autoDetectedPackages.astro;
  options.configs.vue ??= autoDetectedPackages.vue;
  options.configs.nuxt ??= autoDetectedPackages.nuxt;
  options.configs.react ??= autoDetectedPackages.react;
  options.configs.next ??= autoDetectedPackages.next;
  options.configs.test.vitest ??= autoDetectedPackages.vitest;
  options.configs.test.cypress ??= autoDetectedPackages.cypress;
  options.configs.test.storybook ??= autoDetectedPackages.storybook;
  options.configs.test.playwright ??= autoDetectedPackages.playwright;

  const isTypeScriptEnabled = isEnabled(options.configs.typescript);

  if (isTypeScriptEnabled) {
    const defaultTsConfigRootDir = options.packageDir ?? defaultOptions.packageDir;
    const defaultTsConfigFilename = 'tsconfig.json' as const;

    if (options.tsConfig === undefined) {
      options.tsConfig = {
        rootDir: defaultTsConfigRootDir,
        filename: defaultTsConfigFilename,
      };
    } else if (options.tsConfig !== false) {
      options.tsConfig.rootDir ??= defaultTsConfigRootDir;
      options.tsConfig.filename ??= defaultTsConfigFilename;
    }
  }

  if (isTypeScriptEnabled && options.configs.vue) {
    options.configs.vue = options.configs.vue === true ? {} : options.configs.vue;
    options.configs.vue.blockLang = { script: 'ts' };
  }

  if (options.configs.nuxt) {
    if (options.configs.nuxt === true) {
      options.configs.nuxt = {};
    }

    options.configs.nuxt.ui ??= autoDetectedPackages.nuxtUI;
    options.configs.nuxt.icon ??= autoDetectedPackages.nuxtIcon;
    options.configs.nuxt.image ??= autoDetectedPackages.nuxtImage;
  }

  if (options.autoDetectDeps === 'verbose') {
    logDetectedPackages(explicitlyDisabledConfigs);
  }

  return options;
}

export { enableDetectedConfigs };
