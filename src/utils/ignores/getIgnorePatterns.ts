import type { Options } from '#types/index.d.ts';

import { defaultIgnorePatterns } from '#utils/ignores/defaultIgnorePatterns.ts';
import { resolveGitignorePatterns } from '#utils/ignores/resolveGitignorePatterns.ts';

interface IgnorePatternsOptions {
	patterns: string[],
	gitignore: Options['gitignore'],
}

function getIgnorePatterns({ patterns, gitignore }: IgnorePatternsOptions): string[] {
	if (gitignore) {
		const gitignorePatterns = resolveGitignorePatterns(gitignore);
		if (gitignorePatterns.length > 0) {
			defaultIgnorePatterns.push(...gitignorePatterns);
		}
	}

	if (patterns.length > 0) {
		defaultIgnorePatterns.push(...patterns);
	}

	const uniqueIgnorePatterns = [...(new Set(defaultIgnorePatterns))];

	return uniqueIgnorePatterns;
}

export { getIgnorePatterns };
