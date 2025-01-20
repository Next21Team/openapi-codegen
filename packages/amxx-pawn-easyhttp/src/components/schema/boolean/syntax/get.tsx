import type { ContextAccessor } from '~/lib/jsx';
import { BaseSchemaDecl, BaseSchemaProto, type BaseSchemaProtoProps } from '../../base';
import { formattingOptionsCtx } from '~/syntax/formating-options';
import { schemaArg } from '~/components/shared/primitives';
import { booleanTag } from '../tag';
import type { GetOperatorComponent, GetOperatorProps } from '../../operators';
import { Statement } from '~/syntax/common';
import { boolTag } from '~/syntax/tags';

const getSchemaArgs = (ctx: ContextAccessor, { name }: GetOperatorProps): BaseSchemaProtoProps => {
	const { toFunc } = ctx.getOrFail(formattingOptionsCtx);

	return {
		tag: boolTag,
		identifier: toFunc(name, 'get'),
		args: [{ type: 'single', const: true, tag: booleanTag, name: schemaArg }],
	};
};

export const GetOperatorProto: GetOperatorComponent = (props, { ctx }) => (
	<BaseSchemaProto {...getSchemaArgs(ctx, props)} />
);

export const GetOperatorImpl: GetOperatorComponent = (props, { ctx }) => (
	<BaseSchemaDecl {...getSchemaArgs(ctx, props)}>
		<Statement>return ezjson_get_bool(EzJSON:{schemaArg})</Statement>
	</BaseSchemaDecl>
);
