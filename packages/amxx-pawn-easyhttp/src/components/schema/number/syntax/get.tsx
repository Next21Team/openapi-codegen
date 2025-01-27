import { BaseSchemaDecl, BaseSchemaProto, type BaseSchemaProtoProps } from '../../base';
import { schemaArg } from '~/components/shared/primitives';
import { numberTag } from '../tag';
import { floatTag } from '~/syntax/tags';
import type { GetOperatorComponent, GetOperatorProps } from '../../operators';
import { Statement } from '~/syntax/common';
import { codegenCtx } from '~/context';

const getSchemaArgs = ({ name }: GetOperatorProps): BaseSchemaProtoProps => {
	const { format } = codegenCtx.getOrFail();

	return {
		identifier: format.toFunc(name, 'get'),
		args: [{ type: 'single', const: true, tag: numberTag, name: schemaArg }],
	};
};

export const GetOperatorProto: GetOperatorComponent = props => (
	<BaseSchemaProto {...getSchemaArgs(props)} />
);

export const GetOperatorImpl: GetOperatorComponent = props => (
	<BaseSchemaDecl {...getSchemaArgs(props)}>
		<Statement>return ezjson_get_number(EzJSON:{schemaArg})</Statement>
	</BaseSchemaDecl>
);

const getRealSchemaArgs = ({ name }: GetOperatorProps): BaseSchemaProtoProps => {
	const { format } = codegenCtx.getOrFail();

	return {
		tag: floatTag,
		identifier: format.toFunc(name, 'get', 'real'),
		args: [{ type: 'single', const: true, tag: numberTag, name: schemaArg }],
	};
};

export const GetRealOperatorProto: GetOperatorComponent = props => (
	<BaseSchemaProto {...getRealSchemaArgs(props)} />
);

export const GetRealOperatorImpl: GetOperatorComponent = props => (
	<BaseSchemaDecl {...getRealSchemaArgs(props)}>
		<Statement>return ezjson_get_real(EzJSON:{schemaArg})</Statement>
	</BaseSchemaDecl>
);
