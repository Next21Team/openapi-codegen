import type { SchemaDeclaration } from '../generate';
import type { GetOperatorProps, InitOperatorProps } from '../operators';
import { Syntax } from './syntax';

export const generateNumberLiteralDecl = (
	props: InitOperatorProps & GetOperatorProps,
): SchemaDeclaration => {
	return {
		prototype: <Syntax.InitOperatorProto {...props} />,
		implementation: <Syntax.InitOperatorImpl {...props} />,
		dependencies: [
			{
				prototype: <Syntax.GetOperatorProto {...props} />,
				implementation: <Syntax.GetOperatorImpl {...props} />,
			},
			{
				prototype: <Syntax.GetRealOperatorProto {...props} />,
				implementation: <Syntax.GetRealOperatorImpl {...props} />,
			},
		],
	};
};
