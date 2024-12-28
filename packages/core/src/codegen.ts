import { invariant } from './lib/invariant';
import { type AnyApiDefinitionFormat, dereference } from '@scalar/openapi-parser';
import type { CodegenApi, LanguageAdapter } from './language-adapter';

export interface ProduceConfig {
	input: AnyApiDefinitionFormat;
	languageAdapter: LanguageAdapter;
}

export type ProduceReturn = {
	path: string;
	content: string;
}[];

export async function produce({ input, languageAdapter }: ProduceConfig): Promise<ProduceReturn> {
	const result = await dereference(input);
	invariant(
		!result.errors?.length && result.schema,
		`Failed to parse OpenAPI file: ${result?.errors?.map(e => e.message).join('\n')}`,
	);

	const addedFiles = new Map<string, string>();

	const codegenApi: CodegenApi = {
		document: result.schema,
		addFile: (path: string, content: string) => {
			addedFiles.set(path, content);
		},
	};

	await languageAdapter.generateFiles(codegenApi);

	return [...addedFiles.entries()].map(([path, content]) => ({ path, content }));
}
