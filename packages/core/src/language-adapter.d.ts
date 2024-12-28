import type { OpenAPI } from '@scalar/openapi-types';

export interface CodegenApi {
	document: OpenAPI.Document;
	addFile: (path: string, content: string) => void;
}

export interface LanguageAdapter {
	generateFiles: (api: CodegenApi) => Promise<void>;
}
