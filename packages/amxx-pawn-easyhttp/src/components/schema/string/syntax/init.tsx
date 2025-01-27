import type { ContextAccessor } from '~/lib/jsx';
import { BaseSchemaDecl, BaseSchemaProto, type BaseSchemaProtoProps } from '../../base';
import { initializerArg } from '~/components/shared/primitives';
import { stringTag } from '../tag';
import type { GetOperatorProps, InitOperatorComponent } from '../../operators';
import { Declaration, Statement } from '~/syntax/common';
import { JsDoc } from '~/components/shared/jsdoc';
import { codegenCtx } from '~/context';

const getSchemaArgs = (ctx: ContextAccessor, { name }: GetOperatorProps): BaseSchemaProtoProps => {
	const { format } = ctx.getOrFail(codegenCtx);

	return {
		tag: stringTag,
		identifier: format.toFunc(name),
		args: [{ type: 'single', const: true, name: initializerArg, array: true }],
	};
};

export const InitOperatorProto: InitOperatorComponent = (props, { ctx }) => (
	<Declaration>
		<JsDoc
			{...props.jsDoc}
			args={[{ name: initializerArg, description: 'Initializer value' }]}
			returnExpr={`${stringTag} primitive`}
		/>
		<BaseSchemaProto {...getSchemaArgs(ctx, props)} />
	</Declaration>
);

export const InitOperatorImpl: InitOperatorComponent = (props, { ctx }) => (
	<BaseSchemaDecl {...getSchemaArgs(ctx, props)}>
		<Statement>return {stringTag}:ezjson_init_string({initializerArg})</Statement>
	</BaseSchemaDecl>
);
