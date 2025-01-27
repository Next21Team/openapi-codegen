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
	joinDomains: <Identifier extends PossibleIdentifiers>(input: Identifier[]) => Identifier;
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

	return {
		indentSymbol,
		semicolon,
		toTag: (...input) => conventionTransformers[tag](input.join(' ')) as TagIdentifier,
		toVar: (...input) => conventionTransformers[variable](input.join(' ')) as VarIdentifier,
		toFunc: (...input) => conventionTransformers[func](input.join(' ')) as FuncIdentifier,
		joinDomains: <Identifier extends PossibleIdentifiers>(input: Identifier[]) => (
			input.join(domainSeparator) as Identifier
		),
	};
};
