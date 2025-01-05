import type { Context } from '~/context';
import type { OpenAPIV3 } from '@scalar/openapi-types';
import { match } from 'ts-pattern';

interface SchemaDeclaration {
	code: JSX.Element;
}

interface GenerateSchemaArgs {
	schema: OpenAPIV3.SchemaObject;
	name: string;
	shouldResolveDependency?: (schema: OpenAPIV3.SchemaObject) => boolean;
	onDependencyResolved?: (declaration: SchemaDeclaration, schema: OpenAPIV3.SchemaObject) => void;
}

interface GenerateSchemaReturn {
	declaration: SchemaDeclaration;
	dependencies: SchemaDeclaration[];
}

export function generateSchema(ctx: Context, {
	name, schema, shouldResolveDependency = () => true, onDependencyResolved = () => { },
}: GenerateSchemaArgs): GenerateSchemaReturn {
	const tag = ctx.format.toTag(name);
	const initFuncName = ctx.format.toFunc(`${name} init`);

	return match(schema.type)
		.with('integer', () => {

		})
		.with('number', () => {

		})
		.with('boolean', () => {

		})
		.with('string', () => {

		})
		.otherwise(() => ({ code: `// [${initFuncName}] no implementation` }));
}
