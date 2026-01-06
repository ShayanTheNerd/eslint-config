import { includeIgnoreFile } from '@eslint/compat';
import fs from 'node:fs';
import path from 'node:path';
import { styleText } from 'node:util';

const warningMessage = styleText('yellow', '⚠ Warning:');
const gitignoreDisableFlag = styleText('bgBlack', ' gitignore: false ');
const fallbackMessage = `Falling back to default ignore patterns. You can suppress this warning by setting ${gitignoreDisableFlag} in the config.`;

function resolveGitignorePatterns(gitignorePath: string): string[] {
  const gitignoreAbsolutePath = path.resolve(process.cwd(), gitignorePath);
  const styledGitignorePath = styleText('blue', gitignoreAbsolutePath);
  const gitignoreExists = fs.existsSync(gitignoreAbsolutePath);
  const gitignorePatterns: string[] = [];

  if (!gitignoreExists) {
    console.warn(
      warningMessage,
      `No .gitignore file found at "${styledGitignorePath}".`,
      fallbackMessage,
    );

    return gitignorePatterns;
  }

  const ignorePatterns = includeIgnoreFile(gitignoreAbsolutePath).ignores ?? [];

  if (ignorePatterns.length > 0) {
    gitignorePatterns.push(...ignorePatterns);
  } else {
    console.warn(
      warningMessage,
      `No patterns found in .gitignore file at "${styledGitignorePath}".`,
      fallbackMessage,
    );
  }

  return gitignorePatterns;
}

export { resolveGitignorePatterns };
