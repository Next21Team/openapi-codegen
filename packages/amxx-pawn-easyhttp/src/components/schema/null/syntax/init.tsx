import { BaseSchemaDecl, BaseSchemaProto, type BaseSchemaProtoProps } from '../../base';
import { nullTag } from '../tag';
import type { GetOperatorProps, InitOperatorComponent } from '../../operators';
import { Declaration, Statement } from '~/syntax/common';
import { JsDoc } from '~/components/shared/jsdoc';
import { buildSchemaName } from '../../name';

const getSchemaArgs = ({ name }: GetOperatorProps): BaseSchemaProtoProps => {
	return {
		tag: nullTag,
		identifier: buildSchemaName(name),
	};
};

export const InitOperatorProto: InitOperatorComponent = props => (
	<Declaration>
		<JsDoc
			{...props.jsDoc}
			returnExpr={`${nullTag} primitive`}
		/>
		<BaseSchemaProto {...getSchemaArgs(props)} />
	</Declaration>
);

export const InitOperatorImpl: InitOperatorComponent = props => (
	<BaseSchemaDecl {...getSchemaArgs(props)}>
		<Statement>return {nullTag}:ezjson_init_null()</Statement>
	</BaseSchemaDecl>
);
