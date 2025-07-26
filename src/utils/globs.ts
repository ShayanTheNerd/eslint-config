const srcExtensions = '?([mc])[jt]s?(x)' as const;
const vueExtensions = `{vue,${srcExtensions}}` as const;

const commonsFolders = [
	'shared',
	'dto?(s)',
	'model?(s)',
	'helper?(s)',
	'module?(s)',
	'?(@)type?(s)',
	'util?(s|ities)',
	'composable?(s)',
	'repo?(s|sitory|sitories)',
] as const;

const globs = {
	css: '**/*.css',
	html: '**/*.html',
	ts: '**/*.?([mc])ts?(x)',
	src: `**/*.${srcExtensions}`,

	commons: `**/{${commonsFolders.join(',')}}/**/*.${srcExtensions}`,
	commonsIgnore: `**/lint-staged.config.${srcExtensions}`,

	vue: `**/*.${vueExtensions}`,
	vueMultiRootTemplate: `**/pages/**/(_|-)components/**/*.${vueExtensions}`,
	vueComponentNames: `**/{{app,error},{layouts,pages}/**/*}.${vueExtensions}`,
	vueComponentNamesIgnore: `**/{layouts,pages}/**/(_|-)components/**/*.${vueExtensions}`,

	storybook: `**/*.(story|stories).${srcExtensions}`,
	test: `**/{__tests__/*,*.{test,spec,cy,bench?(mark)}.${srcExtensions}`,
} as const;

export { globs };
