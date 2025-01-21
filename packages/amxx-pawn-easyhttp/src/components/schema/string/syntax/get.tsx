import type { ContextAccessor } from '~/lib/jsx';
import { BaseSchemaDecl, BaseSchemaProto, type BaseSchemaProtoProps } from '../../base';
import { formattingOptionsCtx } from '~/syntax/formating-options';
import { outputArg, outputArgLen, schemaArg } from '~/components/shared/primitives';
import { stringTag } from '../tag';
import type { GetOperatorComponent, GetOperatorProps } from '../../operators';
import { Statement } from '~/syntax/common';

const getSchemaArgs = (ctx: ContextAccessor, { name }: GetOperatorProps): BaseSchemaProtoProps => {
	const { toFunc } = ctx.getOrFail(formattingOptionsCtx);

	return {
		identifier: toFunc(name, 'get'),
		args: [
			{ type: 'single', const: true, tag: stringTag, name: schemaArg },
			{ type: 'single', array: true, name: outputArg },
			{ type: 'single', const: true, name: outputArgLen },
		],
	};
};

export const GetOperatorProto: GetOperatorComponent = (props, { ctx }) => (
	<BaseSchemaProto {...getSchemaArgs(ctx, props)} />
);

export const GetOperatorImpl: GetOperatorComponent = (props, { ctx }) => (
	<BaseSchemaDecl {...getSchemaArgs(ctx, props)}>
		<Statement>return ezjson_get_string(EzJSON:{schemaArg}, {outputArg}, {outputArgLen})</Statement>
	</BaseSchemaDecl>
);
