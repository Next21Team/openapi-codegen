import type { CodegenApi } from '@oas-codegen/core';
import { camelCase, pascalCase, snakeCase } from 'change-case';
import type { Special } from './lib/special-type';

export type TagIdentifier = Special<string, 'tagIdentifier'>;
export type FuncIdentifier = Special<string, 'funcIdentifier'>;
export type VarIdentifier = Special<string, 'varIdentifier'>;

export interface Context extends CodegenApi {
	format: {
		toTag: (...input: string[]) => TagIdentifier;
		toFunc: (...input: string[]) => FuncIdentifier;
		toVar: (...input: string[]) => VarIdentifier;
		joinDomains: (input: string[]) => string;
	};
}

export function createContext(api: CodegenApi): Context {
	return {
		...api,
		format: {
			toTag: (...input) => pascalCase(input.join(' ')) as TagIdentifier,
			toFunc: (...input) => snakeCase(input.join(' ')) as FuncIdentifier,
			toVar: (...input) => camelCase(input.join(' ')) as VarIdentifier,
			joinDomains: input => input.join('__'),
		},
	};
}
