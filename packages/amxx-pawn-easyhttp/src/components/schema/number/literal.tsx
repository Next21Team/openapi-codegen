import { formattingOptionsCtx } from '~/syntax/formating-options';
import { BaseSchemaDecl, BaseSchemaDeclWithUnionArgs } from '../base';
import { initializerArg, schemaArg } from '~/components/shared/primitives';
import { floatTag, intTag } from '~/syntax/tags';
import { Declaration, Eol, Statement } from '~/syntax/common';
import { numberTag } from './tag';
import { JsDoc, type JsdocProps } from '~/components/shared/jsdoc';
import { If } from '~/syntax/if-else';

export interface NumberLiteralDeclarationProps {
	name: string;
	jsDoc?: JsdocProps;
}

export const NumberLiteralDeclaration: JSXTE.Component<NumberLiteralDeclarationProps> = ({ name, jsDoc }, { ctx }) => {
	const { toFunc } = ctx.getOrFail(formattingOptionsCtx);

	return (
		<Declaration>
			{jsDoc && (
				<JsDoc
					{...jsDoc}
					args={[{ name: initializerArg, description: 'Initializer value' }]}
					returnExpr={`${numberTag} primitive`}
				/>
			)}

			<BaseSchemaDeclWithUnionArgs
				tag={numberTag}
				identifier={toFunc(name)}
				args={[{ type: 'mixed', const: true, tag: [intTag, floatTag], name: initializerArg }]}
				children={({ getTagIdVar, args }) => ([
					<If expr={`${getTagIdVar(args[0])} == tagof(${floatTag}:)`}>
						<Statement>return {numberTag}:ezjson_get_real(EzJSON:{initializerArg})</Statement>
					</If>,
					<Eol />,
					<Statement>return {numberTag}:ezjson_get_number(EzJSON:{initializerArg})</Statement>,
				])}
			/>
			<Eol />

			<BaseSchemaDecl
				identifier={toFunc(name, 'get')}
				args={[{ type: 'single', const: true, tag: numberTag, name: schemaArg }]}
			>
				<Statement>return ezjson_get_number(EzJSON:{schemaArg})</Statement>
			</BaseSchemaDecl>

			<Eol />

			<BaseSchemaDecl
				tag={floatTag}
				identifier={toFunc(name, 'get', 'real')}
				args={[{ type: 'single', const: true, tag: numberTag, name: schemaArg }]}
			>
				<Statement>return ezjson_get_real(EzJSON:{schemaArg})</Statement>
			</BaseSchemaDecl>
		</Declaration>
	);
};
