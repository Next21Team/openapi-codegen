import { BaseSchemaDecl, BaseSchemaProto, type BaseSchemaProtoProps } from '../../base';
import { schemaArg } from '~/components/shared/primitives';
import { integerTag } from '../tag';
import type { GetOperatorComponent, GetOperatorProps } from '../../operators';
import { Statement } from '~/syntax/common';
import { codegenCtx } from '~/context';

const getSchemaArgs = ({ name }: GetOperatorProps): BaseSchemaProtoProps => {
	const { format } = codegenCtx.getOrFail();

	return {
		identifier: format.toFunc(name, 'get'),
		args: [{ type: 'single', const: true, tag: integerTag, name: schemaArg }],
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
