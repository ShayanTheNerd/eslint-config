const srcExtensions = '?([mc])[jt]s' as const;
const jsxTsxExtensions = '[jt]sx' as const;
const vueExtensions = `{vue,${srcExtensions},${jsxTsxExtensions}}` as const;

const globs = {
  src: `**/*.${srcExtensions}`,
  jsxTsx: `**/*.${jsxTsxExtensions}`,
  packageJson: '**/package.json',
  markdown: '**/*.md',
  html: '**/*.html',
  css: '**/*.css',
  astro: '**/*.astro',
  vue: `**/*.${vueExtensions}`,
  vueMiddlewares: `**/middleware?(s)/**/*.${srcExtensions}`,
  vueServerComponents: `**/*.server.${vueExtensions}`,
  vueAppErrorLayoutsPages: `**/{{app,error},{layouts,pages}/**/*}.${vueExtensions}`,
  storybook: `**/*.(story|stories).{${srcExtensions},${jsxTsxExtensions}}`,
  test: `**/{__tests__/*,*.{test,spec,cy,bench?(mark)}.${srcExtensions}`,
  coverage: '**/coverage/**',
} as const;

export { globs };
