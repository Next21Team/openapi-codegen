import type { CodegenApi, LanguageAdapter } from '@oas-codegen/core';
import { generateSchema } from './components/schema/generate';
import { template } from './sqrl';
import { fileTemplate } from './file-template';

export const languageAdapter: LanguageAdapter = {
	async generateFiles(api) {
		const { document, ...codegen } = api;

		const sources = [
			...generateDefinedSchemas(api),
		];

		codegen.addFile(
			'./openapi.inc',
			template.render(fileTemplate, {
				body: sources.join('\n\n'),
			}),
		);
	},
};

function generateDefinedSchemas(api: CodegenApi) {
	const { document } = api;
	if (!document?.components?.schemas)
		return [];

	return Object.entries(document.components.schemas).map(
		([name, schema]) => generateSchema(api, { name, schema }),
	);
}
