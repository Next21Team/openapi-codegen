import {
	BaseSchemaDecl,
	BaseSchemaProto,
	type BaseSchemaProtoProps,
} from '../../base';

import {
	type IsOperatorComponent,
	type IsOperatorProps,
} from '../../operators';

import type { ContextAccessor } from '~/lib/jsx';
import { boolTag } from '~/syntax/tags';
import { formattingOptionsCtx } from '~/syntax/formating-options';
import { initializerArg, schemaArg } from '~/components/shared/primitives';
import { If } from '~/syntax/if-else';
import { Eol, Statement } from '~/syntax/common';
import { stringTag } from '../tag';

const getSchemaArgs = (ctx: ContextAccessor, { name, varTag }: IsOperatorProps) => {
	const { toFunc, toVar } = ctx.getOrFail(formattingOptionsCtx);
	const initializerLenArg = toVar(initializerArg, 'len');

	return {
		schemaArgs: {
			tag: boolTag,
			identifier: toFunc(name, 'is', stringTag),
			args: [
				{ type: 'single', const: true, name: schemaArg, tag: varTag },
				{ type: 'single', name: initializerArg, array: true },
				{ type: 'single', const: true, name: initializerLenArg },
			],
		} satisfies BaseSchemaProtoProps,
		initializerLenArg,
	};
};

export const IsOperatorProto: IsOperatorComponent = (props, { ctx }) => (
	<BaseSchemaProto {...getSchemaArgs(ctx, props).schemaArgs} />
);

export const IsOperatorImpl: IsOperatorComponent = (props, { ctx }) => {
	const { schemaArgs, initializerLenArg } = getSchemaArgs(ctx, props);
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
