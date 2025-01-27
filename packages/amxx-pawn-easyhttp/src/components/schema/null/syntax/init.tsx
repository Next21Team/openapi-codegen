import type { ContextAccessor } from '~/lib/jsx';
import { BaseSchemaDecl, BaseSchemaProto, type BaseSchemaProtoProps } from '../../base';
import { nullTag } from '../tag';
import type { GetOperatorProps, InitOperatorComponent } from '../../operators';
import { Declaration, Statement } from '~/syntax/common';
import { JsDoc } from '~/components/shared/jsdoc';
import { codegenCtx } from '~/context';

const getSchemaArgs = (ctx: ContextAccessor, { name }: GetOperatorProps): BaseSchemaProtoProps => {
	const { format } = ctx.getOrFail(codegenCtx);

	return {
		tag: nullTag,
		identifier: format.toFunc(name),
	};
};

export const InitOperatorProto: InitOperatorComponent = (props, { ctx }) => (
	<Declaration>
		<JsDoc
			{...props.jsDoc}
			returnExpr={`${nullTag} primitive`}
		/>
		<BaseSchemaProto {...getSchemaArgs(ctx, props)} />
	</Declaration>
);

export const InitOperatorImpl: InitOperatorComponent = (props, { ctx }) => (
	<BaseSchemaDecl {...getSchemaArgs(ctx, props)}>
		<Statement>return {nullTag}:ezjson_init_null()</Statement>
	</BaseSchemaDecl>
);
