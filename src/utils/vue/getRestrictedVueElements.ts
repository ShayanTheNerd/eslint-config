import type { RuleOptions } from '#types/eslintRules.d.ts';

const alternativeComponents = {
	kbd: 'Kbd',
	form: 'Form',
	input: 'Input',
	table: 'Table',
	dialog: 'Modal',
	hr: 'Separator',
	button: 'Button',
	select: 'Select',
	progress: 'Progress',
	textarea: 'Textarea',
	details: 'Accordion',
	datalist: 'InputMenu',
} as const;
const alternativeComponentPairs = Object.entries(alternativeComponents);

type RestrictedElement = Exclude<RuleOptions<'vue/no-restricted-html-elements'>, string>;

function getRestrictedVueElements(prefix: string): RestrictedElement[] {
	const restrictedElements: RestrictedElement[] = [];
	for (const [element, component] of alternativeComponentPairs) {
		restrictedElements.push({
			element,
			message: `Use \`<${prefix}${component}>\`.`,
		});
	}

	return restrictedElements;
}

export { getRestrictedVueElements };
