const defaultIgnorePatterns = [
  /* Dependencies */
  '**/jspm_packages',
  '**/pnpm-lock.yaml',
  '**/package-lock.json',

  /* Auto-generated files */
  '**/typegen.d.ts',
  '**/next-env.d.ts',
  '**/components.d.ts',
  '**/routeTree.gen.ts',
  '**/eslint-typegen.d.ts',
  '**/auto-import?(s).d.ts',

  /* Build outputs */
  '**/out',
  '**/dist',
  '**/build',
  '**/.data',
  '**/public',
  '**/output',
  '**/.output',
  '**/*.min.*',
  '**/.serverless',
  '**/.eslint-config-inspector',

  /* Cache */
  '**/tmp',
  '**/.tmp',
  '**/.npm',
  '**/temp',
  '**/.temp',
  '**/cache',
  '**/.cache',
  '**/deno_dir',
  '**/.parcel-cache',
  '**/.postcss-cache',
  '**/.vitepress/cache',
  '**/vite.config.*.timestamp-*',

  /* Frameworks and tools */
  '**/.nx',
  '**/.vite',
  '**/.nuxt',
  '**/.next',
  '**/.astro',
  '**/.vitest',
  '**/.vercel',
  '**/.vite-inspect',

  /* Tests */
  '**/coverage',
  '**/.nyc_output',
  '**/__snapshots__',

  /* Development environment */
  '**/.idea',
  '**/.fleet',
  '**/.history',
  '**/.DS_Store',

  /* Documentation */
  '**/LICENSE*',
  '**/CHANGELOG*.md',
  '**/CODEOWNERS.md',
  '**/CODE_OF_CONDUCT.md',
];

export { defaultIgnorePatterns };
