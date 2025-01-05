import { defineContext } from 'jsxte';
import type { TagIdentifier } from './tags';
import type { FuncIdentifier } from './function';
import type { VarIdentifier } from './variable';

export const FormattingConfig = defineContext<{
	indentSymbol: string;
	semicolon: string;

	toTag: (...input: string[]) => TagIdentifier;
	toFunc: (...input: string[]) => FuncIdentifier;
	toVar: (...input: string[]) => VarIdentifier;
	joinDomains: (input: string[]) => string;
}>();
