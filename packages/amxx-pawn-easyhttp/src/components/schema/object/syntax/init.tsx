import type { ContextAccessor } from '~/lib/jsx';
import { BaseSchemaDecl, BaseSchemaProto, type BaseSchemaProtoProps } from '../../base';
import { argsCtx } from '../context';
import { Declaration, Statement } from '~/syntax/common';
import { JsDoc } from '~/components/shared/jsdoc';
import { initializerArg } from '~/components/shared/primitives';
import { codegenCtx } from '~/context';

const getProtoProps = (ctx: ContextAccessor) => {
	const { name } = ctx.getOrFail(argsCtx);
	const { format } = codegenCtx.getOrFail();

	return {
		tag: format.toTag(name),
		identifier: format.toFunc(name),
		args: [],
	} satisfies BaseSchemaProtoProps;
};

export const InitOperatorProto: JSXTE.Component = (props, { ctx }) => {
	const protoProps = getProtoProps(ctx);
	const { schema } = ctx.getOrFail(argsCtx);

	return (
		<Declaration>
			<JsDoc
				description={schema.description}
				deprecated={schema.deprecated}
				returnExpr={`${protoProps.tag} schema`}
			/>
			<BaseSchemaProto {...protoProps} />
		</Declaration>
	);
};

export const InitOperatorImpl: JSXTE.Component = (props, { ctx }) => {
	const protoProps = getProtoProps(ctx);

	if (!protoProps.args.length) {
		return (
			<BaseSchemaDecl {...protoProps}>
				<Statement>return {protoProps.tag}:ezjson_init_object()</Statement>
			</BaseSchemaDecl>
		);
	}

	return (
		<BaseSchemaDecl {...protoProps}>
			<Statement>return {protoProps.tag}:root({initializerArg})</Statement>
		</BaseSchemaDecl>
	);
};
