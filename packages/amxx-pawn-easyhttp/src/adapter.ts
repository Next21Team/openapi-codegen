import type { LanguageAdapter } from '@oas-codegen/core';
import { generateSchema } from './components/schema/generate';
import { template } from './sqrl';
import { fileTemplate } from './file-template';
import { createContext, type Context } from './context';

export const languageAdapter: LanguageAdapter = {
	async generateFiles(api) {
		const codegen = api;
		const ctx = createContext(api);

		const sources = [
			...generateDefinedSchemas(ctx),
		];

		codegen.addFile(
			'./openapi.inc',
			template.render(fileTemplate, {
				body: sources.join('\n\n'),
			}),
		);
	},
};

function generateDefinedSchemas(ctx: Context) {
	const { document } = ctx;
	if (!document?.components?.schemas)
		return [];

	return Object.entries(document.components.schemas).map(
		([name, schema]) => generateSchema(ctx, { name, schema }),
	);
}
