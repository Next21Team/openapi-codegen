import type { ContextAccessor } from '~/lib/jsx';
import { BaseSchemaDeclWithUnionArgs, BaseSchemaProto, type BaseSchemaProtoProps } from '../../base';
import { formattingOptionsCtx } from '~/syntax/formating-options';
import { initializerArg } from '~/components/shared/primitives';
import { numberTag } from '../tag';
import { floatTag, intTag } from '~/syntax/tags';
import type { GetOperatorProps, InitOperatorComponent } from '../../operators';
import { Declaration, Eol, Statement } from '~/syntax/common';
import { JsDoc } from '~/components/shared/jsdoc';
import { If } from '~/syntax/if-else';

const getSchemaArgs = (ctx: ContextAccessor, { name }: GetOperatorProps): BaseSchemaProtoProps => {
	const { toFunc } = ctx.getOrFail(formattingOptionsCtx);

	return {
		tag: numberTag,
		identifier: toFunc(name),
		args: [{ type: 'mixed', const: true, tag: [intTag, floatTag], name: initializerArg }],
	};
};

export const InitOperatorProto: InitOperatorComponent = (props, { ctx }) => (
	<Declaration>
		<JsDoc
			{...props.jsDoc}
			args={[{ name: initializerArg, description: 'Initializer value' }]}
			returnExpr={`${numberTag} primitive`}
		/>
		<BaseSchemaProto {...getSchemaArgs(ctx, props)} />
	</Declaration>
);

export const InitOperatorImpl: InitOperatorComponent = (props, { ctx }) => (
	<BaseSchemaDeclWithUnionArgs
		{...getSchemaArgs(ctx, props)}
		render={({ getTagIdVar, args }) => ([
			<If expr={`${getTagIdVar(args[0])} == tagof(${floatTag}:)`}>
				<Statement>return {numberTag}:ezjson_init_real({floatTag}:{initializerArg})</Statement>
			</If>,
			<Eol />,
			<Statement>return {numberTag}:ezjson_init_number({initializerArg})</Statement>,
		])}
	/>
);
