import { BaseSchemaDecl, BaseSchemaProto, type BaseSchemaProtoProps } from '../../base';
import { schemaArg } from '~/components/shared/primitives';
import { booleanTag } from '../tag';
import type { GetOperatorComponent, GetOperatorProps } from '../../operators';
import { Statement } from '~/syntax/common';
import { boolTag } from '~/syntax/tags';
import { codegenCtx } from '~/context';

const getSchemaArgs = ({ name }: GetOperatorProps): BaseSchemaProtoProps => {
	const { format } = codegenCtx.getOrFail();

	return {
		tag: boolTag,
		identifier: format.toFunc(name, 'get'),
		args: [{ type: 'single', const: true, tag: booleanTag, name: schemaArg }],
	};
};

export const GetOperatorProto: GetOperatorComponent = props => (
	<BaseSchemaProto {...getSchemaArgs(props)} />
);

export const GetOperatorImpl: GetOperatorComponent = props => (
	<BaseSchemaDecl {...getSchemaArgs(props)}>
		<Statement>return ezjson_get_bool(EzJSON:{schemaArg})</Statement>
	</BaseSchemaDecl>
);
