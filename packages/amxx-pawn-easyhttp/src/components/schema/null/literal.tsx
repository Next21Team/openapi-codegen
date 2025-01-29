import type { SchemaDeclaration } from '../generate';
import { buildSchemaName } from '../name';
import type { GetOperatorProps, InitOperatorProps } from '../operators';
import { Syntax } from './syntax';

export const generateNullLiteralDecl = (
	props: InitOperatorProps & GetOperatorProps,
): SchemaDeclaration => {
	return {
		tag: Syntax.tag,
		name: buildSchemaName(props.name),
		prototype: <Syntax.InitOperatorProto {...props} />,
		implementation: <Syntax.InitOperatorImpl {...props} />,
	};
};
