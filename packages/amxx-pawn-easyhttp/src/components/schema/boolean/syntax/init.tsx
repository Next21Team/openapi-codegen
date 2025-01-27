import type { ContextAccessor } from '~/lib/jsx';
import { BaseSchemaDecl, BaseSchemaProto, type BaseSchemaProtoProps } from '../../base';
import { initializerArg } from '~/components/shared/primitives';
import { booleanTag } from '../tag';
import type { GetOperatorProps, InitOperatorComponent } from '../../operators';
import { Declaration, Statement } from '~/syntax/common';
import { JsDoc } from '~/components/shared/jsdoc';
import { boolTag } from '~/syntax/tags';
import { codegenCtx } from '~/context';

const getSchemaArgs = (ctx: ContextAccessor, { name }: GetOperatorProps): BaseSchemaProtoProps => {
	const { format } = ctx.getOrFail(codegenCtx);

	return {
		tag: booleanTag,
		identifier: format.toFunc(name),
		args: [{ type: 'single', const: true, tag: boolTag, name: initializerArg }],
	};
};

export const InitOperatorProto: InitOperatorComponent = (props, { ctx }) => (
	<Declaration>
		<JsDoc
			{...props.jsDoc}
			args={[{ name: initializerArg, description: 'Initializer value' }]}
			returnExpr={`${booleanTag} primitive`}
		/>
		<BaseSchemaProto {...getSchemaArgs(ctx, props)} />
	</Declaration>
);

export const InitOperatorImpl: InitOperatorComponent = (props, { ctx }) => (
	<BaseSchemaDecl {...getSchemaArgs(ctx, props)}>
		<Statement>return {booleanTag}:ezjson_init_bool({initializerArg})</Statement>
	</BaseSchemaDecl>
);
