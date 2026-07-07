const srcExtensions = '?([mc])[jt]s?(x)' as const;
const vueExtensions = `{vue,${srcExtensions}}` as const;

const globs = {
  src: `**/*.${srcExtensions}`,
  packageJson: '**/package.json',
  markdown: '**/*.md',
  html: '**/*.html',
  css: '**/*.css',
  astro: '**/*.astro',
  vue: `**/*.${vueExtensions}`,
  vueMiddlewares: `**/middleware?(s)/**/*.${srcExtensions}`,
  vueServerComponents: `**/*.server.${vueExtensions}`,
  vueAppErrorLayoutsPages: `**/{{app,error},{layouts,pages}/**/*}.${vueExtensions}`,
  storybook: `**/*.(story|stories).${srcExtensions}`,
  test: `**/{__tests__/*,*.{test,spec,cy,bench?(mark)}.${srcExtensions}`,
  coverage: '**/coverage/**',
} as const;

export { globs };
