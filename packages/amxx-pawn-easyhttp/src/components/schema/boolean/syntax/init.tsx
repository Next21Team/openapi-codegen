import type { ContextAccessor } from '~/lib/jsx';
import { BaseSchemaDecl, BaseSchemaProto, type BaseSchemaProtoProps } from '../../base';
import { formattingOptionsCtx } from '~/syntax/formating-options';
import { initializerArg } from '~/components/shared/primitives';
import { booleanTag } from '../tag';
import type { GetOperatorProps, InitOperatorComponent } from '../../operators';
import { Declaration, Statement } from '~/syntax/common';
import { JsDoc } from '~/components/shared/jsdoc';
import { boolTag } from '~/syntax/tags';

const getSchemaArgs = (ctx: ContextAccessor, { name }: GetOperatorProps): BaseSchemaProtoProps => {
	const { toFunc } = ctx.getOrFail(formattingOptionsCtx);

	return {
		tag: booleanTag,
		identifier: toFunc(name),
		args: [{ type: 'single', const: true, tag: boolTag, name: initializerArg }],
	};
};

export const InitOperatorProto: InitOperatorComponent = (props, { ctx }) => (
	<Declaration>
		{props.jsDoc && (
			<JsDoc
				{...props.jsDoc}
				args={[{ name: initializerArg, description: 'Initializer value' }]}
				returnExpr={`${booleanTag} primitive`}
			/>
		)}
		<BaseSchemaProto {...getSchemaArgs(ctx, props)} />
	</Declaration>
);

export const InitOperatorImpl: InitOperatorComponent = (props, { ctx }) => (
	<BaseSchemaDecl {...getSchemaArgs(ctx, props)}>
		<Statement>return {booleanTag}:ezjson_init_bool({initializerArg})</Statement>
	</BaseSchemaDecl>
);
