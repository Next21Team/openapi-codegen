import { z } from 'zod';
import { invariant } from './lib/invariant';
import { type AnyApiDefinitionFormat, type AnyObject, dereference } from '@scalar/openapi-parser';
import { componentTypes, type CodegenApi, type ComponentReference, type LanguageAdapter } from './language-adapter';
import type { OpenAPIV3 } from '@scalar/openapi-types';

export interface ProduceConfig {
	documentName: string;
	input: AnyApiDefinitionFormat;
	languageAdapter: LanguageAdapter;
}

export type ProduceReturn = {
	path: string;
	content: string;
}[];

export async function produce({ documentName, input, languageAdapter }: ProduceConfig): Promise<ProduceReturn> {
	const resolvedSchemas = new Map<AnyObject, ComponentReference>();

	const result = await dereference(input, {
		onDereference({ ref, schema }) {
			if (!ref.startsWith('#/components'))
				return;

			const rawCategory = ref.split('/').at(-2);
			if (!rawCategory)
				return;

			const type = z.enum(componentTypes).parse(rawCategory);
			const name = ref.split('/').at(-1);

			const componentReference = {
				$ref: ref,
				name,
				type,
				value: schema,
			} as ComponentReference;

			resolvedSchemas.set(schema, componentReference);
		},
	});

	invariant(
		!result.errors?.length && result.schema,
		`Failed to parse OpenAPI file: ${result?.errors?.map(e => e.message).join('\n')}`,
	);

	const addedFiles = new Map<string, string>();

	const codegenApi: CodegenApi = {
		documentName,
		document: result.schema as OpenAPIV3.Document,
		addFile: (path: string, content: string) => {
			addedFiles.set(path, content);
		},
		checkReference: (obj) => {
			return resolvedSchemas.get(obj) ?? null;
		},
	};

	await languageAdapter.generateFiles(codegenApi);

	return [...addedFiles.entries()].map(([path, content]) => ({ path, content }));
}
