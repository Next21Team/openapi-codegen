import {
	BaseSchemaDecl,
	BaseSchemaProto,
	type BaseSchemaProtoProps,
} from '../../base';

import {
	type IsOperatorComponent,
	type IsOperatorProps,
} from '../../operators';

import { boolTag } from '~/syntax/tags';
import { schemaArg } from '~/components/shared/primitives';
import { Statement } from '~/syntax/common';
import { nullTag } from '../tag';
import { codegenCtx } from '~/context';

const getSchemaArgs = ({ name, varTag }: IsOperatorProps): BaseSchemaProtoProps => {
	const { format } = codegenCtx.getOrFail();

	return {
		tag: boolTag,
		identifier: format.toFunc(name, 'is', nullTag),
		args: [
			{ type: 'single', const: true, name: schemaArg, tag: varTag },
		],
	};
};

export const IsOperatorProto: IsOperatorComponent = props => (
	<BaseSchemaProto {...getSchemaArgs(props)} />
);

export const IsOperatorImpl: IsOperatorComponent = props => (
	<BaseSchemaDecl {...getSchemaArgs(props)}>
		<Statement>
			return ezjson_is_null(EzJSON:{schemaArg})
		</Statement>
	</BaseSchemaDecl>
);
