import {
	BaseSchemaDecl,
	BaseSchemaProto,
	type BaseSchemaProtoProps,
} from '../../base';

import {
	type IsOperatorComponent,
	type IsOperatorProps,
} from '../../operators';

import { boolTag, floatTag } from '~/syntax/tags';
import { initializerArg, schemaArg } from '~/components/shared/primitives';
import { If } from '~/syntax/if-else';
import { Eol, Statement } from '~/syntax/common';
import { numberTag } from '../tag';
import { codegenCtx } from '~/context';

const getSchemaArgs = ({ name, varTag }: IsOperatorProps) => {
	const { format } = codegenCtx.getOrFail();
	const floatInitializerArg = format.toVar('float', initializerArg);

	return {
		schemaArgs: {
			tag: boolTag,
			identifier: format.toFunc(name, 'is', numberTag),
			args: [
				{ type: 'single', const: true, name: schemaArg, tag: varTag },
				{ type: 'single', ref: true, name: initializerArg, equalTo: '0' },
				{ type: 'single', ref: true, name: floatInitializerArg, tag: floatTag, equalTo: '0.0' },
			],
		} satisfies BaseSchemaProtoProps,
		floatInitializerArg,
	};
};

export const IsOperatorProto: IsOperatorComponent = props => (
	<BaseSchemaProto {...getSchemaArgs(props).schemaArgs} />
);

export const IsOperatorImpl: IsOperatorComponent = (props) => {
	const { schemaArgs, floatInitializerArg } = getSchemaArgs(props);

	return (
		<BaseSchemaDecl {...schemaArgs}>
			<If expr={`!ezjson_is_number(EzJSON:${schemaArg})`}>
				<Statement>return false</Statement>
			</If>
			<Eol />
			<Statement>{initializerArg} = ezjson_get_number(EzJSON:{schemaArg})</Statement>
			<Statement>{floatInitializerArg} = ezjson_get_real(EzJSON:{schemaArg})</Statement>
			<Statement>return true</Statement>
		</BaseSchemaDecl>
	);
};
