import { formattingOptionsCtx } from '~/syntax/formating-options';
import { BaseSchemaDecl } from '../schema/base';
import { boolTag, type TagIdentifier } from '~/syntax/tags';
import { Statement } from '~/syntax/common';
import type { VarIdentifier } from '~/syntax/variable';
import type { FuncIdentifier } from '~/syntax/function';

export const schemaArg = 'var' as VarIdentifier;
export const initializerArg = 'value' as VarIdentifier;

export const nullTag = 'Null' as TagIdentifier;
export const nullLiteral = 'null';

export const NullDeclaration = () => (
	<Statement>
		const {nullTag}:{nullLiteral} = {nullTag}:0
	</Statement>
);

export type SchemaIsNullDeclProps = {
	tag: TagIdentifier;
	identifier: FuncIdentifier;
};

export const SchemaIsNullDeclaration: JSXTE.Component<SchemaIsNullDeclProps>
	= ({ identifier, tag }, { ctx }) => {
		const { toFunc } = ctx.getOrFail(formattingOptionsCtx);

		return (
			<BaseSchemaDecl
				tag={boolTag}
				identifier={toFunc(identifier, 'is null')}
				args={[{
					type: 'single',
					const: true,
					tag,
					name: schemaArg,
				}]}
			>
				<Statement>
					return ezjson_is_null(EzJSON:${schemaArg})
				</Statement>
			</BaseSchemaDecl>
		);
	};

export const undefinedTag = 'Undefined' as TagIdentifier;
export const undefinedLiteral = 'undefined';

export const UndefinedDeclaration = () => (
	<Statement>
		const {undefinedTag}:{undefinedLiteral} = {undefinedTag}:0
	</Statement>
);
