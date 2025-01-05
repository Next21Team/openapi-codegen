import type { LanguageAdapter } from '@oas-codegen/core';
import { Document } from './document';
import { createContext } from './context';
import { generateComponents } from './components/generate';
import { renderJsxToString } from './syntax/renderer';
import { FormattingConfig } from './syntax/formating-options';

export const languageAdapter: LanguageAdapter = {
	async generateFiles(api) {
		const codegen = api;
		const ctx = createContext(api);
		const code = generateComponents(ctx);

		codegen.addFile(
			'./openapi.inc',
			renderJsxToString(
				<FormattingConfig.Provider
					value={{ semicolon: ';', indentSymbol: '\t' }}
				>
					<Document name={api.documentName}>
						{code}
					</Document>
				</FormattingConfig.Provider>
			)
		);
	},
};
