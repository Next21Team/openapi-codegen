import { Document } from './document';
import { CodegenContext } from './context';
import { renderJsxToString } from './syntax/renderer';
import { generateComponents } from './components/generate';
import { FormattingConfig } from './syntax/formating-options';
import { Eol, Line } from './syntax/common';
import type { LanguageAdapter } from '@oas-codegen/core';

export const languageAdapter: LanguageAdapter = {
	async generateFiles(api) {
		const { implementations, prototypes } = generateComponents(api);

		const IncludeFile: JSXTE.Component<{ name: string }> = ({ name, children }) => (
			<CodegenContext value={api}>
				<FormattingConfig>
					<Document name={name}>
						{children}
					</Document>
				</FormattingConfig>
			</CodegenContext>
		);

		try {
			api.addFile(
				'./impl.inc',
				renderJsxToString(
					<IncludeFile name={`${api.documentName}_impl`}>
						{implementations}
					</IncludeFile>,
				),
			);

			api.addFile(
				'./main.inc',
				renderJsxToString(
					<IncludeFile name={api.documentName}>
						<Line>#include "impl"</Line>
						<Line>#endinput</Line>
						<Eol />

						{prototypes}
					</IncludeFile>,
				),
			);
		}
		catch (error) {
			console.error(error);
		}
	},
};
