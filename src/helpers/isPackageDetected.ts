import type { Options } from '#types/index.d.ts';

import { isPackageExists as packageExists } from 'local-pkg';
import path from 'node:path';
import { styleText } from 'node:util';

import { defaultOptions } from '#helpers/options/defaultOptions.ts';

const detectedPackages: string[] = [];

function addDetectedPackage(packageName: string): void {
  detectedPackages.push(packageName);
}

function logDetectedPackages(): void {
  if (detectedPackages.length > 0) {
    detectedPackages.sort();
    console.info(
      styleText('green', '✔'),
      'Automatic dependency detection enabled ESLint configurations for',
      `${detectedPackages.map((packageName) => styleText('blue', packageName)).join(', ')}.`,
    );
  }
}

function isPackageDetected(packageName: string, options: Options): boolean {
  const {
    packageDir = defaultOptions.packageDir,
    autoDetectDeps = defaultOptions.autoDetectDeps,
  } = options;

  if (autoDetectDeps === false) {
    return false;
  }

  const isPackageInstalled = packageExists(packageName, { paths: [path.resolve(packageDir)] });

  if (autoDetectDeps === 'verbose' && isPackageInstalled) {
    addDetectedPackage(packageName);
  }

  return isPackageInstalled;
}

export { isPackageDetected, addDetectedPackage, logDetectedPackages };
