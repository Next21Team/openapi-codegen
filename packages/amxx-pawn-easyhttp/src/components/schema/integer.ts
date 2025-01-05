import { baseSchemaDecl } from './base';
import { initializerArg, nativeIntTag } from '../shared/primitives';
import type { Context, FuncIdentifier, TagIdentifier } from '~/context';
import { argumentsDecl } from '../arguments';

export const integerTag = 'Integer' as TagIdentifier;

export type IntegerDeclProps = {
	schemaName: FuncIdentifier;
};

export function integerInitDecl({ schemaName }: IntegerDeclProps) {
	return baseSchemaDecl({
		tag: integerTag,
		funcName: schemaName,
		arguments: argumentsDecl({
			type: 'single',
			tag: nativeIntTag,
			const: true,
			name: initializerArg,
		}),
		code: `return ${integerTag}:ezjson_init_number(${initializerArg});`,
	});
}

export type IntegerGetDeclProps = IntegerDeclProps;

export function integerGetDecl(ctx: Context, { schemaName }: IntegerGetDeclProps) {
	return baseSchemaDecl({
		tag: integerTag,
		funcName: ctx.format.toFunc(schemaName, 'get'),
		arguments: argumentsDecl({
			type: 'single',
			tag: integerTag,
			const: true,
			name: initializerArg,
		}),
		code: `return ${nativeIntTag}:ezjson_get_number(EzJSON:${initializerArg});`,
	});
}
