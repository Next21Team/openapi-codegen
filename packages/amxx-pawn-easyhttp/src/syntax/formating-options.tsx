import { z } from 'zod';
import { defineContext } from 'jsxte';
import type { TagIdentifier } from './tags';
import type { FuncIdentifier } from './function';
import type { VarIdentifier } from './variable';
import { camelCase, constantCase, pascalCase, pascalSnakeCase, snakeCase } from 'change-case';

type PossibleIdentifiers = TagIdentifier | FuncIdentifier | VarIdentifier;

const context = defineContext<{
	indentSymbol: string;
	semicolon: string;

	toTag: (...input: string[]) => TagIdentifier;
	toFunc: (...input: string[]) => FuncIdentifier;
	toVar: (...input: string[]) => VarIdentifier;
	joinDomains: <Identifier extends PossibleIdentifiers>(input: Identifier[]) => Identifier;
}>();

const conventionTransformers = {
	camelCase,
	pascalCase,
	pascalSnakeCase,
	constantCase,
	snakeCase,
};

export const namingConventionSchema = z.enum(['camelCase', 'pascalCase', 'pascalSnakeCase', 'constantCase', 'snakeCase']);

export type NamingConvention = z.infer<typeof namingConventionSchema>;

export interface FormattingConfigProps {
	indentSymbol?: string;
	semicolon?: string;

	conventions?: {
		tag?: NamingConvention;
		func?: NamingConvention;
		variable?: NamingConvention;
		domainSeparator?: string;
	};
}

export const FormattingConfig: JSXTE.Component<FormattingConfigProps> = ({
	children,
	indentSymbol = '\t',
	semicolon = ';',
	conventions = {},
}) => {
	const {
		func = 'snakeCase',
		tag = 'pascalCase',
		variable = 'camelCase',
		domainSeparator = '__',
	} = conventions;

	return (
		<context.Provider
			value={{
				indentSymbol,
				semicolon,
				toTag: (...input) => conventionTransformers[tag](input.join(' ')) as TagIdentifier,
				toVar: (...input) => conventionTransformers[variable](input.join(' ')) as VarIdentifier,
				toFunc: (...input) => conventionTransformers[func](input.join(' ')) as FuncIdentifier,
				joinDomains: <Identifier extends PossibleIdentifiers>(input: Identifier[]) => (
					input.join(domainSeparator) as Identifier
				),
			}}
		>
			{children}
		</context.Provider>
	);
};

export { context as formattingOptionsCtx };
