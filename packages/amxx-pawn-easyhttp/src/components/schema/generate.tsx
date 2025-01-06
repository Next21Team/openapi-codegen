import type { OpenAPIV3 } from '@scalar/openapi-types';
import { match } from 'ts-pattern';
import { IntegerLiteralDeclaration } from './integer/literal';
import { Declaration, Eol } from '~/syntax/common';
import { NullDeclaration, UndefinedDeclaration } from '../shared/primitives';

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

export function generateSchema({
	name,
	schema,
	shouldResolveDependency = () => true,
	onDependencyResolved = () => { },
}: GenerateSchemaArgs): GenerateSchemaReturn {
	const noImplementation = {
		declaration: { code: `// [${name}] no implementation\n` },
		dependencies: [] as SchemaDeclaration[],
	};

	return match(schema.type)
		.with('integer', () => {
			return {
				declaration: {
					code: (
						<IntegerLiteralDeclaration
							name={`${name}_init`}
							jsDoc={{
								title: 'test title',
								description: 'Replace an entire Item with new fields. Equivalent to a PUT request.',
								deprecated: true,
							}}
						/>
					),
				},
				dependencies: [],
			};
		})
		.with('number', () => {
			return noImplementation;
		})
		.with('boolean', () => {
			return noImplementation;
		})
		.with('string', () => {
			return noImplementation;
		})
		.otherwise(() => {
			return noImplementation;
		});
}

export function generateGlobalDeclarations() {
	return (
		<Declaration>
			<UndefinedDeclaration />
			<Eol />
			<NullDeclaration />
			<Eol />
			<IntegerLiteralDeclaration name='number' />
		</Declaration>
	);
}
