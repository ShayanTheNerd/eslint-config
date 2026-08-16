const sourceExtensions = '?([mc])[jt]s' as const;
const jsxTsxExtensions = '[jt]sx' as const;
const vueSourceExtensions = `{vue,${sourceExtensions},${jsxTsxExtensions}}` as const;

const globs = {
  src: `**/*.${sourceExtensions}`,
  jsxTsx: `**/*.${jsxTsxExtensions}`,
  packageJson: '**/package.json',
  markdown: '**/*.md',
  html: '**/*.html',
  css: '**/*.css',
  astro: '**/*.astro',
  vue: '**/*.vue',
  nuxtAppErrorLayoutsPages: `**/{{app,error},{layouts,pages}/**/*}.${vueSourceExtensions}`,
  nuxtServerComponents: `**/*.server.${vueSourceExtensions}`,
  nuxtMiddlewares: `**/middleware?(s)/**/*.${sourceExtensions}`,
  storybook: `**/*.(story|stories).{${sourceExtensions},${jsxTsxExtensions}}`,
  test: `**/{__tests__/*,*.{test,spec,cy,bench?(mark)}.${sourceExtensions}`,
  coverage: '**/coverage/**',
} as const;

export { globs };
