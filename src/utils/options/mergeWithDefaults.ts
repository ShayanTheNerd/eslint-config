import type { Options } from '#types/index.d.ts';
import type { DeepNonNullable } from '#types/helpers.d.ts';

import { createDefu } from 'defu';

import { isEmptyString } from '#utils/isEmptyString.ts';
import { defaultOptions } from '#utils/options/defaultOptions.ts';
import { enableDetectedConfigs } from '#utils/options/enableDetectedConfigs.ts';

const mergeOptions = createDefu((object, key, value): boolean => {
	const isValueTrue = value === true;
	const isDefaultValueFalse = object[key] === false;
	const isValueEmptyString = isEmptyString(value);
	const fallBackToDefault = isValueEmptyString || (isValueTrue && !isDefaultValueFalse);

	return fallBackToDefault;
});

function mergeWithDefaults(options: Options): DeepNonNullable<Options> {
	const optionsWithDetectedConfigs = enableDetectedConfigs(options);
	const mergedOptions = mergeOptions(optionsWithDetectedConfigs, defaultOptions);

	return mergedOptions as DeepNonNullable<Options>;
}

export { mergeWithDefaults };
