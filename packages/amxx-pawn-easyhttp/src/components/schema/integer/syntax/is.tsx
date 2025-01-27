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
import { initializerArg, schemaArg } from '~/components/shared/primitives';
import { If } from '~/syntax/if-else';
import { Eol, Statement } from '~/syntax/common';
import { integerTag } from '../tag';
import { codegenCtx } from '~/context';

const getSchemaArgs = ({ name, varTag }: IsOperatorProps): BaseSchemaProtoProps => {
	const { format } = codegenCtx.getOrFail();

	return {
		tag: boolTag,
		identifier: format.toFunc(name, 'is', integerTag),
		args: [
			{ type: 'single', const: true, name: schemaArg, tag: varTag },
			{ type: 'single', ref: true, name: initializerArg },
		],
	};
};

export const IsOperatorProto: IsOperatorComponent = props => (
	<BaseSchemaProto {...getSchemaArgs(props)} />
);

export const IsOperatorImpl: IsOperatorComponent = props => (
	<BaseSchemaDecl {...getSchemaArgs(props)}>
		<If expr={`!ezjson_is_number(EzJSON:${schemaArg})`}>
			<Statement>return false</Statement>
		</If>
		<Eol />
		<Statement>{initializerArg} = ezjson_get_number(EzJSON:{schemaArg})</Statement>
		<Statement>return true</Statement>
	</BaseSchemaDecl>
);
