import type { SchemaDeclaration } from '../generate';
import type { GetOperatorProps, InitOperatorProps } from '../operators';
import { Syntax } from './syntax';

export const generateNullLiteralDecl = (
	props: InitOperatorProps & GetOperatorProps,
): SchemaDeclaration[] => {
	return [
		{
			prototype: <Syntax.InitOperatorProto {...props} />,
			implementation: <Syntax.InitOperatorImpl {...props} />,
		},
	];
};
