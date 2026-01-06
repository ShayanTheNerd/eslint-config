import type { Options } from '#types/index.d.ts';

import { isPackageExists as packageExists } from 'local-pkg';
import path from 'node:path';
import { styleText } from 'node:util';

import { defaultOptions } from '#utils/options/defaultOptions.ts';

const detectedPackages: string[] = [];

function logDetectedPackages(): void {
  if (detectedPackages.length > 0) {
    detectedPackages.sort();
    console.info(
      styleText('green', '✔'),
      'Automatic dependency detection enabled ESLint configurations for',
      detectedPackages.map((packageName) => styleText('blue', packageName)).join(', '),
    );
  }
}

function isPackageDetected(packageName: string, options: Options = defaultOptions): boolean {
  const {
    packageDir = defaultOptions.packageDir,
    autoDetectDeps = defaultOptions.autoDetectDeps,
  } = options;

  if (!autoDetectDeps) {
    return false;
  }

  const isPackageInstalled = packageExists(packageName, { paths: [path.resolve(packageDir)] });

  if (isPackageInstalled) {
    detectedPackages.push(packageName);
  }

  return isPackageInstalled;
}

export { isPackageDetected, logDetectedPackages };
