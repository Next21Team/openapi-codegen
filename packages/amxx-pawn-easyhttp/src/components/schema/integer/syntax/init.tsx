import { BaseSchemaDecl, BaseSchemaProto, type BaseSchemaProtoProps } from '../../base';
import { initializerArg } from '~/components/shared/primitives';
import { integerTag } from '../tag';
import type { GetOperatorProps, InitOperatorComponent } from '../../operators';
import { Declaration, Statement } from '~/syntax/common';
import { JsDoc } from '~/components/shared/jsdoc';
import { codegenCtx } from '~/context';

const getSchemaArgs = ({ name }: GetOperatorProps): BaseSchemaProtoProps => {
	const { format } = codegenCtx.getOrFail();

	return {
		tag: integerTag,
		identifier: format.toFunc(name),
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
