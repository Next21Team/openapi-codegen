import type { OpenAPIV3 } from '@scalar/openapi-types';
import { match } from 'ts-pattern';
import { BooleanSyntax } from './boolean';
import { IntegerSyntax } from './integer';
import type { SyntaxContractForMixed } from './mixed/literal';
import { NumberSyntax } from './number';
import { StringSyntax } from './string';

export const mapPrimitiveTypeToSyntax = (type: OpenAPIV3.SchemaObject['type']) =>
	match(type)
		.returnType<SyntaxContractForMixed | null>()
		.with('integer', () => IntegerSyntax)
		.with('number', () => NumberSyntax)
		.with('boolean', () => BooleanSyntax)
		.with('string', () => StringSyntax)
		.otherwise(() => null);
