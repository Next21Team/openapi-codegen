import { baseSchemaDecl } from './base';
import { nativeFloatTag, initializerArg, nativeIntTag, tagOfExpr, schemaArg } from '../shared/primitives';
import { argumentTagsResolverSection } from '../shared/argument-tags-resolver';
import type { Context, FuncIdentifier, TagIdentifier } from '~/context';

export const numberTag = 'Number' as TagIdentifier;

export type NumberDeclProps = {
	schemaName: FuncIdentifier;
};

const initCodeTemplate
= `if({{it.tagIdVar}} == {{it.tagOfExpr}})
	return ${numberTag}:ezjson_init_real(${nativeFloatTag}:${initializerArg});

return ${numberTag}:ezjson_init_number(${initializerArg});
`;

export function numberInitDecl(ctx: Context, { schemaName }: NumberDeclProps) {
	return argumentTagsResolverSection(ctx, {
		args: [{
			type: 'mixed',
			const: true,
			tag: [nativeFloatTag, nativeIntTag],
			name: initializerArg,
		}],
		code: ({ editedArgs, getTagIdVar }) => (
			baseSchemaDecl({
				tag: numberTag,
				funcName: schemaName,
				arguments: argumentsDecl(...editedArgs),
				code: template.render(initCodeTemplate, {
					tagIdVar: getTagIdVar(editedArgs[0]),
					tagOfExpr: tagOfExpr(nativeFloatTag),
				}),
			})
		),
	});
}

export type NumberGetDeclProps = NumberDeclProps;

export function numberGetDecl(ctx: Context, { schemaName }: NumberGetDeclProps) {
	return baseSchemaDecl({
		tag: numberTag,
		funcName: ctx.format.toFunc(schemaName, 'get'),
		arguments: argumentsDecl({
			type: 'single',
			const: true,
			tag: numberTag,
			name: schemaArg,
		}),
		code: `return ${nativeIntTag}:ezjson_get_number(EzJSON:${schemaArg});`,
	});
}

export function numberGetRealDecl(ctx: Context, { schemaName }: NumberGetDeclProps) {
	return baseSchemaDecl({
		tag: nativeFloatTag,
		funcName: ctx.format.toFunc(schemaName, 'get real'),
		arguments: argumentsDecl({
			type: 'single',
			const: true,
			tag: numberTag,
			name: schemaArg,
		}),
		code: `return ${nativeFloatTag}:ezjson_get_real(EzJSON:${schemaArg});`,
	});
}

/*

<BaseSchema.Root
	tag={nativeFloatTag}
	funcName={ctx.format.toFunc(schemaName, 'get real')}
	arguments={<Arguments   />}
>
	<NativeFloatTag /> <FuncName /> <Eol />

</BaseSchema.Root>

*/
