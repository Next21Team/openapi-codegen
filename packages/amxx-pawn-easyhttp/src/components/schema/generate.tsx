import type { OpenAPIV3 } from '@scalar/openapi-types';
import { match } from 'ts-pattern';
import { UndefinedDeclaration } from '../shared/primitives';
import { generateIntegerLiteralDecl } from './integer/literal';
import { Declaration } from '~/syntax/common';
import { generateNumberLiteralDecl } from './number/literal';
import { generateBooleanLiteralDecl } from './boolean/literal';
import { generateStringLiteralDecl } from './string/literal';
import { generateNullLiteralDecl } from './null/literal';
import { generateMixedLiteralDecl, type SyntaxContractForMixed } from './mixed/literal';
import { NullSyntax } from './null';
import { IntegerSyntax } from './integer';
import { NumberSyntax } from './number';
import { BooleanSyntax } from './boolean';
import { StringSyntax } from './string';

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
}: GenerateSchemaArgs) {
	const noImplementation: GenerateSchemaReturn = {
		declarations: [{ implementation: `// [${name}] no implementation\n`, prototype: null }],
		dependencies: [] as SchemaDeclaration[],
	};

	const generateMixedPrimitive = (...syntaxes: SyntaxContractForMixed[]): GenerateSchemaReturn => ({
		declarations: generateMixedLiteralDecl({ name, jsDoc: schema, syntaxes }),
		dependencies: [],
	});

	const mapPrimitiveTypeToSyntax = (type: NonNullable<typeof schema.type>) =>
		match(type)
			.returnType<SyntaxContractForMixed | null>()
			.with('integer', () => IntegerSyntax)
			.with('number', () => NumberSyntax)
			.with('boolean', () => BooleanSyntax)
			.with('string', () => StringSyntax)
			.otherwise(() => null);

	return match(schema.type)
		.returnType<GenerateSchemaReturn>()
		.with('integer', () => {
			if (schema.nullable)
				return generateMixedPrimitive(IntegerSyntax, NullSyntax);

			return {
				declarations: generateIntegerLiteralDecl({ name, jsDoc: schema }),
				dependencies: [],
			};
		})
		.with('number', () => {
			if (schema.nullable)
				return generateMixedPrimitive(NumberSyntax, NullSyntax);

			return {
				declarations: generateNumberLiteralDecl({ name, jsDoc: schema }),
				dependencies: [],
			};
		})
		.with('boolean', () => {
			if (schema.nullable)
				return generateMixedPrimitive(BooleanSyntax, NullSyntax);

			return {
				declarations: generateBooleanLiteralDecl({ name, jsDoc: schema }),
				dependencies: [],
			};
		})
		.with('string', () => {
			if (schema.nullable)
				return generateMixedPrimitive(StringSyntax, NullSyntax);

			return {
				declarations: generateStringLiteralDecl({ name, jsDoc: schema }),
				dependencies: [],
			};
		})
		.otherwise(() => {
			if (schema.oneOf) {
				const syntaxes = schema.oneOf
					.map(s => mapPrimitiveTypeToSyntax(s.type))
					.filter((s): s is NonNullable<typeof s> => !!s);

				if (schema.nullable)
					syntaxes.push(NullSyntax);

				return generateMixedPrimitive(...syntaxes);
			}

			return noImplementation;
		});
}

export function generateGlobalSchemas(): SchemaDeclaration[] {
	return [
		...generateNullLiteralDecl({
			name: 'null',
			jsDoc: { description: 'Basic null literal' },
		}),
		...generateIntegerLiteralDecl({
			name: 'integer',
			jsDoc: { description: 'Basic integer literal' },
		}),
		...generateNumberLiteralDecl({
			name: 'number',
			jsDoc: { description: 'Basic number literal' },
		}),
		...generateBooleanLiteralDecl({
			name: 'boolean',
			jsDoc: { description: 'Basic boolean literal' },
		}),
		...generateStringLiteralDecl({
			name: 'string',
			jsDoc: { description: 'Basic string literal' },
		}),
	];
}

export const GlobalDeclarations: JSXTE.Component = () => {
	return (
		<Declaration>
			<UndefinedDeclaration />
		</Declaration>
	);
};
