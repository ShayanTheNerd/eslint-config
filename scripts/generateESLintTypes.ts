import generateESLintTypes from 'eslint-typegen';
import path from 'node:path';
import fs from 'node:fs/promises';
import { styleText } from 'node:util';

import referenceConfig from './configs/eslint.config.reference.ts';

const eslintSchemaPath = path.resolve('src/types/eslint-schema.d.ts');

await fs.rm(eslintSchemaPath, { force: true });
await generateESLintTypes(referenceConfig, {
  dtsPath: eslintSchemaPath,
  exportTypeName: 'ESLintSchema',
});

const successIcon = styleText('green', '✔');
const styledESLintSchemaPath = styleText('blue', eslintSchemaPath);
console.info(successIcon, `ESLint types generated at "${styledESLintSchemaPath}"`);
