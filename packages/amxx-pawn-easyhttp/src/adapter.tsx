import { Document } from './document';
import { CodegenContext, codegenCtx } from './context';
import { renderJsxToString } from './syntax/renderer';
import { generateComponents } from './components/generate';
import { createFormatter } from './formating-options';
import { Eol, Line } from './syntax/common';
import type { LanguageAdapter } from '@oas-codegen/core';

export const languageAdapter: LanguageAdapter = {
	async generateFiles(api) {
		const ctx = Object.assign(api, {
			format: createFormatter(),
		});

		const { implementations, prototypes } = codegenCtx.run(ctx, generateComponents);

		const IncludeFile: JSXTE.Component<{ name: string }> = ({ name, children }) => (
			<CodegenContext value={ctx}>
				<Document name={name}>
					{children}
				</Document>
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
