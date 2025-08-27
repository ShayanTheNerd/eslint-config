import type { RuleOptions } from '#types/eslintRules.d.ts';

const alternativeComponents = {
	range: 'Slider',
	date: 'Calendar',
	radio: 'RadioGroup',
	checkbox: 'Checkbox',
	color: 'ColorPicker',
	number: 'InputNumber',
} as const;
const alternativeComponentPairs = Object.entries(alternativeComponents);

type RestrictedInput = Exclude<RuleOptions<'vue/no-restricted-static-attribute'>, string>;

function getRestrictedVueInputs(prefix: string): RestrictedInput[] {
	const restrictedInputs: RestrictedInput[] = [];
	for (const [input, component] of alternativeComponentPairs) {
		restrictedInputs.push({
			element: 'input',
			key: 'type',
			value: input,
			message: `Use \`<${prefix}${component}>\`.`,
		});
	}

	return restrictedInputs;
}

export { getRestrictedVueInputs };
