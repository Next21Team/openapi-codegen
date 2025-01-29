import type { GenerateSchemaArgs, GenerateSchemaReturn, SchemaDeclaration } from '../generate';
import { buildSchemaName } from '../name';
import { buildSchemaTag } from '../tag';
import { withArgsContext } from './context';
import { prepareProperties } from './properties';
import { Syntax } from './syntax';

export type GenerateObjectLiteralArgs = GenerateSchemaArgs;

export const generateObjectLiteral = (args: GenerateObjectLiteralArgs): GenerateSchemaReturn => {
	const dependencies: SchemaDeclaration[] = [];

	for (const { declaration, fromCache } of prepareProperties(args)) {
		if (!fromCache && declaration)
			dependencies.push(declaration);
	}

	return {
		tag: buildSchemaTag(args.name),
		name: buildSchemaName(args.name),
		prototype: withArgsContext(Syntax.InitOperatorProto, args),
		implementation: withArgsContext(Syntax.InitOperatorImpl, args),
		dependencies,
	};
};
