import { BaseSchemaDecl, BaseSchemaProto, type BaseSchemaProtoProps } from '../base';
import type { GenerateMixedLiteralProps } from './literal';
import type { ContextAccessor } from '~/lib/jsx';
import { initializerArg } from '~/components/shared/primitives';
import { Declaration, Statement } from '~/syntax/common';
import { JsDoc } from '~/components/shared/jsdoc';
import { codegenCtx } from '~/context';

type InitOperatorComponentProps = Pick<GenerateMixedLiteralProps, 'name' | 'syntaxes' | 'jsDoc'>;
type InitOperatorComponent = JSXTE.Component<InitOperatorComponentProps>;

const getSchemaArgs = (
	ctx: ContextAccessor,
	{ name, syntaxes }: Omit<InitOperatorComponentProps, 'jsDoc'>,
): BaseSchemaProtoProps => {
	const { format } = ctx.getOrFail(codegenCtx);

	return {
		tag: format.toTag(name),
		identifier: format.toFunc(name),
		args: [{
			type: 'mixed',
			const: true,
			tag: syntaxes.map(s => s.tag),
			name: initializerArg,
		}],
	};
};

export const InitOperatorProto: InitOperatorComponent = (props, { ctx }) => {
	const schemaArgs = getSchemaArgs(ctx, props);

	return (
		<Declaration>
			<JsDoc
				{...props.jsDoc}
				args={[{ name: initializerArg, description: 'Initializer value' }]}
				returnExpr={`${schemaArgs.tag} primitive`}
			/>
			<BaseSchemaProto {...schemaArgs} />
		</Declaration>
	);
};

export const InitOperatorImpl: InitOperatorComponent = (props, { ctx }) => {
	const schemaArgs = getSchemaArgs(ctx, props);

	return (
		<BaseSchemaDecl {...schemaArgs}>
			<Statement>
				return {schemaArgs.tag}:{initializerArg}
			</Statement>
		</BaseSchemaDecl>
	);
};
