import type { Context } from '~/context';
import type { OpenAPIV3 } from '@scalar/openapi-types';
import { match } from 'ts-pattern';
import { objSchemaDecl } from './templates/object';

interface GenerateSchemaArgs {
	name: string;
	schema: OpenAPIV3.SchemaObject;
}

export function generateSchema(ctx: Context, { name, schema }: GenerateSchemaArgs) {
	const { args, serviceArgs, code } = resolveSchema(ctx, schema, name);
	const strArgLines = args
		.map(arg => `${arg.tag !== '_' ? `${arg.tag}:` : ''}${arg.name}`)
		.concat(serviceArgs ?? []);

	const strArgLinesLen = strArgLines.reduce((acc, line) => acc + line.length, 0);

	return objSchemaDecl({
		tag: ctx.toTagStr(name),
		name: ctx.toFuncDeclStr(`create_${name}_schema`),
		arguments: strArgLinesLen > 80 ? `\n\t${strArgLines.join(',\n\t')}\n` : strArgLines.join(', '),
		code,
		...schema,
	});
}

interface Argument {
	tag: string;
	name: string;
	description?: string;
}

interface ResolveSchemaReturn {
	args: Argument[];
	serviceArgs?: string[];
	code: string;
}

function resolveSchema(ctx: Context, schema: OpenAPIV3.SchemaObject, name: string): ResolveSchemaReturn {
	return match(schema.type)
		.with('integer', () => ({
			args: [{ tag: '_', name: 'value', description: schema.description }],
			code: `return ${ctx.toTagStr(name)}:value;`,
		}))
		.with('number', () => ({
			args: [{ tag: 'Float', name: 'value', description: schema.description }],
			code: `return ${ctx.toTagStr(name)}:value;`,
		}))
		.with('boolean', () => ({
			args: [{ tag: 'bool', name: 'value', description: schema.description }],
			code: `return ${ctx.toTagStr(name)}:value;`,
		}))
		.with('string', () => ({
			args: [{ tag: 'Float', name: 'value[]', description: schema.description }],
			code: `return ${ctx.toTagStr(name)}:ezjson_init_string(value);`,
		}))
		.with('array', () => ({
			args: [],
			code: `return ${ctx.toTagStr(name)}:ezjson_init_array();`,
		}))
		.with('object', () => {
			if (!schema.properties) {
				return {
					args: [],
					code: `return ${ctx.toTagStr(name)}:ezjson_init_object();`,
				};
			}

			const args: Argument[] = [];
			const serviceArgs: string[] = [];
			const lines: string[] = [];

			for (const [key, prop] of Object.entries(schema.properties)) {
				const reference = ctx.checkReference(schema);
				if (reference) {
					args.push({
						tag: ctx.toTagStr(reference.name),
						name: ctx.toArgStr(key),
						description: prop.description,
					});
				}
			}

			return {
				args,
				serviceArgs,
				code: `EzJSON:root = ezjson_init_object();\n${lines.join('\n')}\nreturn ${ctx.toTagStr(name)}:root;`,
			};
		})
		.otherwise(() => ({
			args: [],
			code: '// no implementation',
		}));
}
