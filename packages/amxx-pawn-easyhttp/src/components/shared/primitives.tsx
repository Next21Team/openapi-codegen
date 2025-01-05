import { FormattingConfig } from '~/syntax/formating-options';
import { BaseSchema } from '../schema/base';
import { boolTag } from '~/syntax/tags';
import { Statement } from '~/syntax/common';
import type { FuncIdentifier, TagIdentifier, VarIdentifier } from '~/context';

export const schemaArg = 'var' as VarIdentifier;
export const initializerArg = 'value' as VarIdentifier;

export const nullTag = 'Null' as TagIdentifier;
export const nullLiteral = 'null';

export const NullDeclaration = () => `const ${nullTag}:${nullLiteral} = ${nullTag}:0;`;

export type SchemaIsNullDeclProps = {
	tag: TagIdentifier;
	identifier: FuncIdentifier;
};

export const SchemaIsNullDeclaration: JSXTE.Component<SchemaIsNullDeclProps>
	= ({ identifier, tag }, { ctx }) => {
		const { toFunc } = ctx.getOrFail(FormattingConfig);

		return (
			<BaseSchema
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
			</BaseSchema>
		)
	};

export const undefinedTag = 'Undefined' as TagIdentifier;
export const undefinedLieral = 'undefined';

export const UndefinedDeclaration = () => `const ${undefinedTag}:${undefinedLieral} = ${undefinedTag}:0;`;
