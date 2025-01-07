import type { OpenAPIV3 } from '@scalar/openapi-types';
import { match } from 'ts-pattern';
import { NullDeclaration, UndefinedDeclaration } from '../shared/primitives';
import { generateIntegerLiteralDecl } from './integer/literal';
import { Declaration, Eol } from '~/syntax/common';

export interface SchemaDeclaration {
	prototype: JSX.Element;
	implementation: JSX.Element;
}

interface GenerateSchemaArgs {
	schema: OpenAPIV3.SchemaObject;
	name: string;
	shouldResolveDependency?: (schema: OpenAPIV3.SchemaObject) => boolean;
	onDependencyResolved?: (declaration: SchemaDeclaration, schema: OpenAPIV3.SchemaObject) => void;
}

interface GenerateSchemaReturn {
	declarations: SchemaDeclaration[];
	dependencies: SchemaDeclaration[];
}

export function generateSchema({
	name,
	schema,
	// shouldResolveDependency = () => true,
	// onDependencyResolved = () => { },
}: GenerateSchemaArgs): GenerateSchemaReturn {
	const noImplementation: GenerateSchemaReturn = {
		declarations: [{ implementation: `// [${name}] no implementation\n`, prototype: null }],
		dependencies: [] as SchemaDeclaration[],
	};

	return match(schema.type)
		.with('integer', () => {
			return {
				declarations: generateIntegerLiteralDecl({ name, jsDoc: schema }),
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

export function generateGlobalSchemas(): SchemaDeclaration[] {
	return [
		...generateIntegerLiteralDecl({ name: 'integer' }),
	];
}

export const GlobalDeclarations: JSXTE.Component = () => {
	return (
		<Declaration>
			<UndefinedDeclaration />
			<Eol />
			<NullDeclaration />
		</Declaration>
	);
};
