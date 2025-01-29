import { BaseSchemaDeclWithUnionArgs, BaseSchemaProto, type BaseSchemaProtoProps } from '../../base';
import { initializerArg } from '~/components/shared/primitives';
import { numberTag } from '../tag';
import { floatTag, intTag } from '~/syntax/tags';
import type { GetOperatorProps, InitOperatorComponent } from '../../operators';
import { Declaration, Eol, Statement } from '~/syntax/common';
import { JsDoc } from '~/components/shared/jsdoc';
import { If } from '~/syntax/if-else';
import { buildSchemaName } from '../../name';

const getSchemaArgs = ({ name }: GetOperatorProps): BaseSchemaProtoProps => {
	return {
		tag: numberTag,
		identifier: buildSchemaName(name),
		args: [{ type: 'mixed', const: true, tag: [intTag, floatTag], name: initializerArg }],
	};
};

export const InitOperatorProto: InitOperatorComponent = props => (
	<Declaration>
		<JsDoc
			{...props.jsDoc}
			args={[{ name: initializerArg, description: 'Initializer value' }]}
			returnExpr={`${numberTag} primitive`}
		/>
		<BaseSchemaProto {...getSchemaArgs(props)} />
	</Declaration>
);

export const InitOperatorImpl: InitOperatorComponent = props => (
	<BaseSchemaDeclWithUnionArgs
		{...getSchemaArgs(props)}
		render={({ getTagIdVar, args }) => ([
			<If expr={`${getTagIdVar(args[0])} == tagof(${floatTag}:)`}>
				<Statement>return {numberTag}:ezjson_init_real({floatTag}:{initializerArg})</Statement>
			</If>,
			<Eol />,
			<Statement>return {numberTag}:ezjson_init_number({initializerArg})</Statement>,
		])}
	/>
);
