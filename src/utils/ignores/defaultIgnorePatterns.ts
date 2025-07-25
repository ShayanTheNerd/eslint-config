const defaultIgnorePatterns = [
	/* Dependencies */
	'**/*.min.*',
	'**/jspm_packages',
	'**/pnpm-lock.yaml',
	'**/bower_components',
	'**/package-lock.json',

	/* Auto-generated type definitions */
	'**/typegen.d.ts',
	'**/components.d.ts',
	'**/auto-import?(s).d.ts',

	/* Build outputs */
	'**/out',
	'**/dist',
	'**/build',
	'**/.data',
	'**/output',
	'**/.output',
	'**/.serverless',
	'**/public/build',
	'**/public/static',
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
	'**/*.lerna_backup',
	'**/.postcss-cache',
	'**/.vitepress/cache',
	'**/vite.config.*.timestamp-*',

	/* Frameworks and tools */
	'**/.nx',
	'**/.vite',
	'**/.yarn',
	'**/.nuxt',
	'**/.next',
	'**/.vitest',
	'**/.vercel',
	'**/.svelte-kit',
	'**/.vite-inspect',

	/* Tests */
	'**/coverage',
	'**/_fixtures',
	'**/.nyc_output',
	'**/__snapshots__',

	/* Development environment */
	'**/.idea',
	'**/.fleet',
	'**/.history',

	// Documentation
	'**/LICENSE*',
	'**/CHANGELOG*.md',
	'**/CODEOWNERS.md',
	'**/CODE_OF_CONDUCT.md',
];

export { defaultIgnorePatterns };
