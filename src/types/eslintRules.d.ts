import type { ESLintSchema } from '#types/eslint-schema.d.ts';
import type { Tail, DeepNonNullable } from '#types/helpers.d.ts';

/*** CoreRules & PluginRules ***/
type RuleNames = keyof ESLintSchema;
type PluginRuleNames = Extract<RuleNames, `${string}/${string}`>;
type PluginNames = PluginRuleNames extends `${infer PluginName}/${string}` ? PluginName : never;
type PluginRuleset<PluginName extends PluginNames> = Extract<PluginRuleNames, `${PluginName}/${string}`>;
type CoreRuleNames = Exclude<RuleNames, PluginRuleNames>;
type CoreRules = Pick<ESLintSchema, CoreRuleNames>;
type PluginRules<PluginName extends PluginNames> = Pick<ESLintSchema, PluginRuleset<PluginName>>;

/*** RuleOptions ***/
type Rule<RuleName extends RuleNames> = DeepNonNullable<ESLintSchema>[RuleName];
type RuleConfigs<RuleName extends RuleNames> = Tail<Rule<RuleName>>;
type RuleOptions<RuleName extends RuleNames, Index extends (0 | 1 | 2) = 0> = NonNullable<
	RuleConfigs<RuleName>[Index]
>;

export type {
	CoreRules,
	PluginRules,
	RuleOptions,
};
