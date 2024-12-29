import type { CodegenApi } from '@oas-codegen/core';
import type { OpenAPIV3 } from '@scalar/openapi-types';
import { schemaObjDecl } from './templates';
import { camelCase, pascalCase, snakeCase } from 'change-case';

interface GenerateSchemaArgs {
	name: string;
	schema: OpenAPIV3.SchemaObject;
}

export function generateSchema(codegen: CodegenApi, { name, schema }: GenerateSchemaArgs) {
	const args = schema.properties
		? Object.entries(schema.properties)
				.map(([key, obj]) => resolveArgumentByObjProperty(key, obj))
				.map(arg => `${arg.tag ? `${arg.tag}:` : ''}${arg.name}`)
		: [];

	const argsLineLen = args.reduce((acc, line) => acc + line.length, 0);

	return schemaObjDecl({
		tag: pascalCase(name),
		name: `create_${snakeCase(name)}_schema`,
		arguments: argsLineLen > 80 ? `\n\t${args.join(',\n\t')}\n` : args.join(', '),
		code: 'server_print("hello world!");',
		...schema,
	});
}

interface Argument {
	tag: string;
	name: string;
	description?: string;
}

function resolveArgumentByObjProperty(key: string, property: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject): Argument {
	return {
		tag: resolveArgumentTag(property?.type ?? ''),
		name: camelCase(key),
		description: property?.description,
	};
}

function resolveArgumentTag(type: string) {
	switch (type) {
		case 'integer': return '';
		case 'number': return 'Float';
		case 'string': return 'String';
		case 'boolean': return 'bool';
		case 'array': return 'Arr';
		default: return 'Unknown';
	}
}
