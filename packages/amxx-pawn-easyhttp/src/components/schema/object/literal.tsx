import type { generateSchema, GenerateSchemaArgs, GenerateSchemaReturn } from '../generate';

interface GenerateObjectLiteralArgs extends GenerateSchemaArgs {
	generateSchema: typeof generateSchema;
}

export const generateObjectLiteral = ({
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	generateSchema,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	...args
}: GenerateObjectLiteralArgs): GenerateSchemaReturn => {
	return {
		declarations: [],
		dependencies: [],
	};
};
