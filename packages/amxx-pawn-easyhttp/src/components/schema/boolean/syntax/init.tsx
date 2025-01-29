import { BaseSchemaDecl, BaseSchemaProto, type BaseSchemaProtoProps } from '../../base';
import { initializerArg } from '~/components/shared/primitives';
import { booleanTag } from '../tag';
import type { GetOperatorProps, InitOperatorComponent } from '../../operators';
import { Declaration, Statement } from '~/syntax/common';
import { JsDoc } from '~/components/shared/jsdoc';
import { boolTag } from '~/syntax/tags';
import { buildSchemaName } from '../../name';

const getSchemaArgs = ({ name }: GetOperatorProps): BaseSchemaProtoProps => {
	return {
		tag: booleanTag,
		identifier: buildSchemaName(name),
		args: [{ type: 'single', const: true, tag: boolTag, name: initializerArg }],
	};
};

export const InitOperatorProto: InitOperatorComponent = props => (
	<Declaration>
		<JsDoc
			{...props.jsDoc}
			args={[{ name: initializerArg, description: 'Initializer value' }]}
			returnExpr={`${booleanTag} primitive`}
		/>
		<BaseSchemaProto {...getSchemaArgs(props)} />
	</Declaration>
);

export const InitOperatorImpl: InitOperatorComponent = props => (
	<BaseSchemaDecl {...getSchemaArgs(props)}>
		<Statement>return {booleanTag}:ezjson_init_bool({initializerArg})</Statement>
	</BaseSchemaDecl>
);
