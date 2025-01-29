import { BaseSchemaDecl, BaseSchemaProto, type BaseSchemaProtoProps } from '../../base';
import { initializerArg } from '~/components/shared/primitives';
import { integerTag } from '../tag';
import type { GetOperatorProps, InitOperatorComponent } from '../../operators';
import { Declaration, Statement } from '~/syntax/common';
import { JsDoc } from '~/components/shared/jsdoc';
import { buildSchemaName } from '../../name';

const getSchemaArgs = ({ name }: GetOperatorProps): BaseSchemaProtoProps => {
	return {
		tag: integerTag,
		identifier: buildSchemaName(name),
		args: [{ type: 'single', const: true, name: initializerArg }],
	};
};

export const InitOperatorProto: InitOperatorComponent = props => (
	<Declaration>
		<JsDoc
			{...props.jsDoc}
			args={[{ name: initializerArg, description: 'Initializer value' }]}
			returnExpr={`${integerTag} primitive`}
		/>
		<BaseSchemaProto {...getSchemaArgs(props)} />
	</Declaration>
);

export const InitOperatorImpl: InitOperatorComponent = props => (
	<BaseSchemaDecl {...getSchemaArgs(props)}>
		<Statement>return {integerTag}:ezjson_init_number({initializerArg})</Statement>
	</BaseSchemaDecl>
);
