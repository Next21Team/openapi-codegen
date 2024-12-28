import type { LanguageAdapter } from '@oas-codegen/core';

export const languageAdapter: LanguageAdapter = {
	async generateFiles(codegen) {
		codegen.addFile('/domain/test_file.inl', '#include <amxmodx>');
	},
};
