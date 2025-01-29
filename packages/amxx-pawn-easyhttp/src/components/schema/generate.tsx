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
import { generateObjectLiteral } from './object/literal';
import { mapPrimitiveTypeToSyntax } from './primitives-map';
import type { TagIdentifier } from '~/syntax/tags';
import type { FuncIdentifier } from '~/syntax/function';

export interface SchemaDeclaration {
	tag?: TagIdentifier;
	name?: FuncIdentifier;
	prototype: JSX.Element;
	implementation: JSX.Element;
	dependencies?: SchemaDeclaration[];
}

export interface GenerateSchemaArgs {
	name: string;
	schema: OpenAPIV3.SchemaObject;
	resolveDependency: (schema: OpenAPIV3.SchemaObject, name: string) => {
		declaration: SchemaDeclaration;
		fromCache: boolean;
	};
}

export type GenerateSchemaReturn = SchemaDeclaration;

export function generateSchema({
	name,
	schema,
	resolveDependency,
}: GenerateSchemaArgs) {
	const noImplementation: GenerateSchemaReturn = {
		implementation: `// [${name}] no implementation\n`,
		prototype: null,
	};

	const generateMixedPrimitive = (...syntaxes: SyntaxContractForMixed[]) =>
		generateMixedLiteralDecl({ name, jsDoc: schema, syntaxes });

	return match(schema)
		.returnType<GenerateSchemaReturn>()
		.with({ type: 'integer' }, () => {
			if (schema.nullable)
				return generateMixedPrimitive(IntegerSyntax, NullSyntax);

			return generateIntegerLiteralDecl({ name, jsDoc: schema });
		})
		.with({ type: 'number' }, () => {
			if (schema.nullable)
				return generateMixedPrimitive(NumberSyntax, NullSyntax);

			return generateNumberLiteralDecl({ name, jsDoc: schema });
		})
		.with({ type: 'boolean' }, () => {
			if (schema.nullable)
				return generateMixedPrimitive(BooleanSyntax, NullSyntax);

			return generateBooleanLiteralDecl({ name, jsDoc: schema });
		})
		.with({ type: 'string' }, () => {
			if (schema.nullable)
				return generateMixedPrimitive(StringSyntax, NullSyntax);

			return generateStringLiteralDecl({ name, jsDoc: schema });
		})
		.with({ type: 'object' }, () => {
			return generateObjectLiteral({
				name,
				schema,
				resolveDependency,
			});
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
		generateNullLiteralDecl({
			name: 'null',
			jsDoc: { description: 'Basic null literal' },
		}),
		generateIntegerLiteralDecl({
			name: 'integer',
			jsDoc: { description: 'Basic integer literal' },
		}),
		generateNumberLiteralDecl({
			name: 'number',
			jsDoc: { description: 'Basic number literal' },
		}),
		generateBooleanLiteralDecl({
			name: 'boolean',
			jsDoc: { description: 'Basic boolean literal' },
		}),
		generateStringLiteralDecl({
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
