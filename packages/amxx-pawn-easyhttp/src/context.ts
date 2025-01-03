import type { CodegenApi } from '@oas-codegen/core';
import { camelCase, pascalCase, snakeCase } from 'change-case';

export interface Context extends CodegenApi {
	toTagStr: (input: string) => string;
	toFuncDeclStr: (input: string) => string;
	toArgStr: (input: string) => string;
}

export function createContext(api: CodegenApi): Context {
	return {
		...api,
		toTagStr: input => pascalCase(input),
		toFuncDeclStr: input => snakeCase(input),
		toArgStr: input => camelCase(input),
	};
}
