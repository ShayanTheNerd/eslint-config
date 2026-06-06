import { Project } from 'ts-morph';
import path from 'node:path';
import fs from 'node:fs/promises';
import { styleText } from 'node:util';

import { expandType } from './helpers/expandType.ts';
import { getVueAttrCategoryUnion } from './helpers/getVueAttrCategoryUnion.ts';

const project = new Project({ tsConfigFilePath: 'tsconfig.json' });
const projectTypes = project.addSourceFileAtPath('src/types/index.d.ts');
const optionsInterface = projectTypes.getInterfaceOrThrow('Options');
const nonNullableOptionsType = optionsInterface.getType().getNonNullableType();
const options = expandType(projectTypes, nonNullableOptionsType).replaceAll('"', '\'').replaceAll('\n', '\n  ');
const vueAttrCategoryUnion = getVueAttrCategoryUnion(optionsInterface);

const codeBlock = `
  \`\`\`ts
  import type { Linter } from 'eslint';
  import type { FlatConfig } from 'typescript-eslint';

  type VueAttributeCategory =${vueAttrCategoryUnion ? `\n    ${vueAttrCategoryUnion}` : ' undefined'};

  interface Overrides {
    name?: string,
    files?: (string | string[])[],
    ignores?: string[],
    plugins?: FlatConfig.Plugins,
    languageOptions?: {
      parser: FlatConfig.LanguageOptions.parser,
      globals: FlatConfig.LanguageOptions.globals,
    },
    settings?: Record<string, unknown>,
    rules?: Linter.RulesRecord,
  }

  interface Options ${options}
  \`\`\`
`;

const startMarker = '<!-- START_AUTO-GENERATED_API_REFERENCE -->' as const;
const endMarker = '<!-- END_AUTO-GENERATED_API_REFERENCE -->' as const;
const markerContentRegex = new RegExp(`${startMarker}.*?${endMarker}`, 's');
const readmePath = path.resolve('README.md');
const styledReadmeFile = styleText('blue', 'README.md');

let readmeContent = await fs.readFile(readmePath, 'utf8');

const readmeContentHasMarkers = markerContentRegex.test(readmeContent);
if (readmeContentHasMarkers) {
  readmeContent = readmeContent.replace(markerContentRegex, `${startMarker}${codeBlock}  ${endMarker}`);
  console.info(`${styleText('green', '✔')} Updated the API Reference section in "${styledReadmeFile}".`);
} else {
  const errorMessage = styleText('red', 'Markers not found!');
  const markersStructure = styleText('bgBlack', `${startMarker}\n...\n${endMarker}`);
  throw new Error(
    `${errorMessage}\nMake sure the markers are present in the API Reference section of "${styledReadmeFile}":\n${markersStructure}`,
  );
}

await fs.writeFile(readmePath, readmeContent, 'utf8');
