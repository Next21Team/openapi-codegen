import type { generateSchema, GenerateSchemaArgs, GenerateSchemaReturn } from '../generate';
import { withArgsContext } from './context';
import { Syntax } from './syntax';

export interface GenerateObjectLiteralArgs extends GenerateSchemaArgs {
	generateSchema: typeof generateSchema;
}

export const generateObjectLiteral = (args: GenerateObjectLiteralArgs): GenerateSchemaReturn => {
	return {
		prototype: withArgsContext(Syntax.InitOperatorProto, args),
		implementation: withArgsContext(Syntax.InitOperatorImpl, args),
	};
};
