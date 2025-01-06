import { Document } from './document';
import { CodegenContext } from './context';
import { renderJsxToString } from './syntax/renderer';
import { generateComponents } from './components/generate';
import { FormattingConfig } from './syntax/formating-options';
import type { LanguageAdapter } from '@oas-codegen/core';

export const languageAdapter: LanguageAdapter = {
	async generateFiles(api) {
		const code = generateComponents(api);

		try {
			api.addFile(
				'./openapi.inc',
				renderJsxToString(
					<CodegenContext value={api}>
						<FormattingConfig>
							<Document name={api.documentName}>
								{code}
							</Document>
						</FormattingConfig>
					</CodegenContext>,
				),
			);
		}
		catch (error) {
			console.error(error);
		}
	},
};
