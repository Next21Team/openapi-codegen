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
import { schemaArg } from '~/components/shared/primitives';
import { Statement } from '~/syntax/common';
import { nullTag } from '../tag';
import { codegenCtx } from '~/context';

const getSchemaArgs = (ctx: ContextAccessor, { name, varTag }: IsOperatorProps): BaseSchemaProtoProps => {
	const { format } = ctx.getOrFail(codegenCtx);

	return {
		tag: boolTag,
		identifier: format.toFunc(name, 'is', nullTag),
		args: [
			{ type: 'single', const: true, name: schemaArg, tag: varTag },
		],
	};
};

export const IsOperatorProto: IsOperatorComponent = (props, { ctx }) => (
	<BaseSchemaProto {...getSchemaArgs(ctx, props)} />
);

export const IsOperatorImpl: IsOperatorComponent = (props, { ctx }) => (
	<BaseSchemaDecl {...getSchemaArgs(ctx, props)}>
		<Statement>
			return ezjson_is_null(EzJSON:{schemaArg})
		</Statement>
	</BaseSchemaDecl>
);
