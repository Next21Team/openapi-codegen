import type { ContextAccessor } from '~/lib/jsx';
import { BaseSchemaDecl, BaseSchemaProto, type BaseSchemaProtoProps } from '../../base';
import { schemaArg } from '~/components/shared/primitives';
import { numberTag } from '../tag';
import { floatTag } from '~/syntax/tags';
import type { GetOperatorComponent, GetOperatorProps } from '../../operators';
import { Statement } from '~/syntax/common';
import { codegenCtx } from '~/context';

const getSchemaArgs = (ctx: ContextAccessor, { name }: GetOperatorProps): BaseSchemaProtoProps => {
	const { format } = ctx.getOrFail(codegenCtx);

	return {
		identifier: format.toFunc(name, 'get'),
		args: [{ type: 'single', const: true, tag: numberTag, name: schemaArg }],
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

const getRealSchemaArgs = (ctx: ContextAccessor, { name }: GetOperatorProps): BaseSchemaProtoProps => {
	const { format } = ctx.getOrFail(codegenCtx);

	return {
		tag: floatTag,
		identifier: format.toFunc(name, 'get', 'real'),
		args: [{ type: 'single', const: true, tag: numberTag, name: schemaArg }],
	};
};

export const GetRealOperatorProto: GetOperatorComponent = (props, { ctx }) => (
	<BaseSchemaProto {...getRealSchemaArgs(ctx, props)} />
);

export const GetRealOperatorImpl: GetOperatorComponent = (props, { ctx }) => (
	<BaseSchemaDecl {...getRealSchemaArgs(ctx, props)}>
		<Statement>return ezjson_get_real(EzJSON:{schemaArg})</Statement>
	</BaseSchemaDecl>
);
