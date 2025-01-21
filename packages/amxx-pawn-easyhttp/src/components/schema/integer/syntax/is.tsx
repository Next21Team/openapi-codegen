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
import { integerTag } from '../tag';

const getSchemaArgs = (ctx: ContextAccessor, { name, varTag }: IsOperatorProps): BaseSchemaProtoProps => {
	const { toFunc } = ctx.getOrFail(formattingOptionsCtx);

	return {
		tag: boolTag,
		identifier: toFunc(name, 'is', integerTag),
		args: [
			{ type: 'single', const: true, name: schemaArg, tag: varTag },
			{ type: 'single', ref: true, name: initializerArg },
		],
	};
};

export const IsOperatorProto: IsOperatorComponent = (props, { ctx }) => (
	<BaseSchemaProto {...getSchemaArgs(ctx, props)} />
);

export const IsOperatorImpl: IsOperatorComponent = (props, { ctx }) => (
	<BaseSchemaDecl {...getSchemaArgs(ctx, props)}>
		<If expr={`!ezjson_is_number(EzJSON:${schemaArg})`}>
			<Statement>return false</Statement>
		</If>
		<Eol />
		<Statement>{initializerArg} = ezjson_get_number(EzJSON:{schemaArg})</Statement>
		<Statement>return true</Statement>
	</BaseSchemaDecl>
);
