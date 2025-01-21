import type { ContextAccessor } from '~/lib/jsx';
import { BaseSchemaDecl, BaseSchemaProto, type BaseSchemaProtoProps } from '../../base';
import { formattingOptionsCtx } from '~/syntax/formating-options';
import { initializerArg } from '~/components/shared/primitives';
import { stringTag } from '../tag';
import type { GetOperatorProps, InitOperatorComponent } from '../../operators';
import { Declaration, Statement } from '~/syntax/common';
import { JsDoc } from '~/components/shared/jsdoc';

const getSchemaArgs = (ctx: ContextAccessor, { name }: GetOperatorProps): BaseSchemaProtoProps => {
	const { toFunc } = ctx.getOrFail(formattingOptionsCtx);

	return {
		tag: stringTag,
		identifier: toFunc(name),
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
