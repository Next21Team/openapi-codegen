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
import { stringTag } from '../tag';
import { codegenCtx } from '~/context';

const getSchemaArgs = ({ name, varTag }: IsOperatorProps) => {
	const { format } = codegenCtx.getOrFail();
	const initializerLenArg = format.toVar(initializerArg, 'len');

	return {
		schemaArgs: {
			tag: boolTag,
			identifier: format.toFunc(name, 'is', stringTag),
			args: [
				{ type: 'single', const: true, name: schemaArg, tag: varTag },
				{ type: 'single', name: initializerArg, array: true },
				{ type: 'single', const: true, name: initializerLenArg },
			],
		} satisfies BaseSchemaProtoProps,
		initializerLenArg,
	};
};

export const IsOperatorProto: IsOperatorComponent = props => (
	<BaseSchemaProto {...getSchemaArgs(props).schemaArgs} />
);

export const IsOperatorImpl: IsOperatorComponent = (props) => {
	const { schemaArgs, initializerLenArg } = getSchemaArgs(props);
	return (
		<BaseSchemaDecl {...schemaArgs}>
			<If expr={`!ezjson_is_string(EzJSON:${schemaArg})`}>
				<Statement>return false</Statement>
			</If>
			<Eol />
			<Statement>ezjson_get_string(EzJSON:{schemaArg}, {initializerArg}, {initializerLenArg})</Statement>
			<Statement>return true</Statement>
		</BaseSchemaDecl>
	);
};
