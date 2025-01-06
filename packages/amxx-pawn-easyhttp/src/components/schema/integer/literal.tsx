import { formattingOptionsCtx } from '~/syntax/formating-options';
import { IntegerSyntax } from '.';
import { BaseSchema } from '../base';
import { initializerArg, schemaArg } from '~/components/shared/primitives';
import { intTag } from '~/syntax/tags';
import { Declaration, Eol } from '~/syntax/common';
import { integerTag } from './tag';
import { JsDoc, type JsdocProps } from '~/components/shared/jsdoc';

export interface IntegerLiteralDeclarationProps {
	name: string;
	jsDoc?: JsdocProps;
}

export const IntegerLiteralDeclaration: JSXTE.Component<IntegerLiteralDeclarationProps> = ({ name, jsDoc }, { ctx }) => {
	const { toFunc } = ctx.getOrFail(formattingOptionsCtx);

	return (
		<Declaration>
			{jsDoc && (
				<JsDoc
					{...jsDoc}
					args={[{ name: initializerArg, description: 'Initializer value' }]}
					returnExpr={`${integerTag} primitive`}
				/>
			)}

			<BaseSchema
				tag={integerTag}
				identifier={toFunc(name)}
				args={[{ type: 'single', const: true, tag: intTag, name: initializerArg }]}
			>
				<IntegerSyntax.Init
					to='return'
					initializer={initializerArg}
				/>
			</BaseSchema>

			<Eol />

			<BaseSchema
				identifier={toFunc(name, 'get')}
				args={[{ type: 'single', const: true, tag: integerTag, name: schemaArg }]}
			>
				<IntegerSyntax.Get
					to='return'
					from={schemaArg}
				/>
			</BaseSchema>
		</Declaration>
	);
};
