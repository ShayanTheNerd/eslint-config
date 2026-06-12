const srcExtensions = '?([mc])[jt]s?(x)' as const;
const vueExtensions = `{vue,${srcExtensions}}` as const;

const restrictedDefaultExportsFolderNames = [
  'shared',
  'dto?(s)',
  'model?(s)',
  'helper?(s)',
  'module?(s)',
  'util?(s|ities)',
  'composable?(s)',
  'repo?(s|sitory|sitories)',
] as const;

const globs = {
  src: `**/*.${srcExtensions}`,
  restrictedDefaultExports: `**/{${restrictedDefaultExportsFolderNames.join(',')}}/**/*.${srcExtensions}`,

  packageJson: '**/package.json',
  markdown: '**/*.md',
  html: '**/*.html',
  css: '**/*.css',
  astro: '**/*.astro',
  vue: `**/*.${vueExtensions}`,
  vueServerComponents: `**/*.server.${vueExtensions}`,
  vueAppErrorLayoutsPages: `**/{{app,error},{layouts,pages}/**/*}.${vueExtensions}`,

  storybook: `**/*.(story|stories).${srcExtensions}`,
  test: `**/{__tests__/*,*.{test,spec,cy,bench?(mark)}.${srcExtensions}`,
} as const;

export { globs };
