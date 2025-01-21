import { type TagIdentifier } from '~/syntax/tags';
import { Statement } from '~/syntax/common';
import type { VarIdentifier } from '~/syntax/variable';

export const schemaArg = 'var' as VarIdentifier;
export const initializerArg = 'value' as VarIdentifier;

export const outputArg = 'dest' as VarIdentifier;
export const outputArgLen = 'destLen' as VarIdentifier;

export const undefinedTag = 'Undefined' as TagIdentifier;
export const undefinedLiteral = 'undefined';

export const UndefinedDeclaration = () => (
	<Statement>
		const {undefinedTag}:{undefinedLiteral} = {undefinedTag}:0
	</Statement>
);
