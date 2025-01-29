import { z } from 'zod';
import type { TagIdentifier } from './syntax/tags';
import type { FuncIdentifier } from './syntax/function';
import type { VarIdentifier } from './syntax/variable';
import { camelCase, constantCase, pascalCase, pascalSnakeCase, snakeCase } from 'change-case';

type PossibleIdentifiers = TagIdentifier | FuncIdentifier | VarIdentifier;

export type Formatter = {
	indentSymbol: string;
	semicolon: string;

	toTag: (...input: string[]) => TagIdentifier;
	toFunc: (...input: string[]) => FuncIdentifier;
	toVar: (...input: string[]) => VarIdentifier;
	joinDomains: <Identifier extends PossibleIdentifiers>(...input: Identifier[]) => Identifier;
};

const conventionTransformers = {
	camelCase,
	pascalCase,
	pascalSnakeCase,
	constantCase,
	snakeCase,
};

export const namingConventionSchema = z.enum(['camelCase', 'pascalCase', 'pascalSnakeCase', 'constantCase', 'snakeCase']);

export type NamingConvention = z.infer<typeof namingConventionSchema>;

export interface FormattingConfig {
	indentSymbol?: string;
	semicolon?: string;

	conventions?: {
		tag?: NamingConvention;
		func?: NamingConvention;
		variable?: NamingConvention;
		domainSeparator?: string;
	};
}

export const createFormatter = (config: FormattingConfig = {}): Formatter => {
	const {
		indentSymbol = '\t',
		semicolon = ';',
		conventions = {},
	} = config;

	const {
		func = 'snakeCase',
		tag = 'pascalCase',
		variable = 'camelCase',
		domainSeparator = '__',
	} = conventions;

	const withDomainSplitting = <T extends string>(transformer: (input: string) => string) => (...input: string[]) => {
		return input
			.join(' ')
			.split(domainSeparator)
			.map(transformer)
			.join(domainSeparator) as T;
	};

	return {
		indentSymbol,
		semicolon,
		toTag: withDomainSplitting<TagIdentifier>(conventionTransformers[tag]),
		toVar: withDomainSplitting<VarIdentifier>(conventionTransformers[variable]),
		toFunc: withDomainSplitting<FuncIdentifier>(conventionTransformers[func]),
		joinDomains: <Identifier extends PossibleIdentifiers>(...input: Identifier[]) => (
			input.join(domainSeparator) as Identifier
		),
	};
};
