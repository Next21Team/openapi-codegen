import { BaseSchemaDecl, BaseSchemaProto, type BaseSchemaProtoProps } from '../../base';
import { outputArg, outputArgLen, schemaArg } from '~/components/shared/primitives';
import { stringTag } from '../tag';
import type { GetOperatorComponent, GetOperatorProps } from '../../operators';
import { Statement } from '~/syntax/common';
import { codegenCtx } from '~/context';

const getSchemaArgs = ({ name }: GetOperatorProps): BaseSchemaProtoProps => {
	const { format } = codegenCtx.getOrFail();

	return {
		identifier: format.toFunc(name, 'get'),
		args: [
			{ type: 'single', const: true, tag: stringTag, name: schemaArg },
			{ type: 'single', array: true, name: outputArg },
			{ type: 'single', const: true, name: outputArgLen },
		],
	};
};

export const GetOperatorProto: GetOperatorComponent = props => (
	<BaseSchemaProto {...getSchemaArgs(props)} />
);

export const GetOperatorImpl: GetOperatorComponent = props => (
	<BaseSchemaDecl {...getSchemaArgs(props)}>
		<Statement>return ezjson_get_string(EzJSON:{schemaArg}, {outputArg}, {outputArgLen})</Statement>
	</BaseSchemaDecl>
);
