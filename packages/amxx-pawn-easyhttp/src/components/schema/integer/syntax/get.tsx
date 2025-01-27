import type { ContextAccessor } from '~/lib/jsx';
import { BaseSchemaDecl, BaseSchemaProto, type BaseSchemaProtoProps } from '../../base';
import { schemaArg } from '~/components/shared/primitives';
import { integerTag } from '../tag';
import type { GetOperatorComponent, GetOperatorProps } from '../../operators';
import { Statement } from '~/syntax/common';
import { codegenCtx } from '~/context';

const getSchemaArgs = (ctx: ContextAccessor, { name }: GetOperatorProps): BaseSchemaProtoProps => {
	const { format } = ctx.getOrFail(codegenCtx);

	return {
		identifier: format.toFunc(name, 'get'),
		args: [{ type: 'single', const: true, tag: integerTag, name: schemaArg }],
	};
};

export const GetOperatorProto: GetOperatorComponent = (props, { ctx }) => (
	<BaseSchemaProto {...getSchemaArgs(ctx, props)} />
);

export const GetOperatorImpl: GetOperatorComponent = (props, { ctx }) => (
	<BaseSchemaDecl {...getSchemaArgs(ctx, props)}>
		<Statement>return ezjson_get_number(EzJSON:{schemaArg})</Statement>
	</BaseSchemaDecl>
);
