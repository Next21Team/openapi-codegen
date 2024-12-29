import type { AnyObject } from '@scalar/openapi-parser';
import type { OpenAPIV3 } from '@scalar/openapi-types';

export const componentTypes = [
	'schemas',
	'responses',
	'parameters',
	'examples',
	'requestBodies',
	'headers',
	'securitySchemes',
	'links',
	'callbacks',
	'pathItems',
] as const;

export type ComponentReference = {
	$ref: string;
	name: string;
} & ({
	type: typeof componentTypes[0];
	value: OpenAPIV3.SchemaObject;
} | {
	type: typeof componentTypes[1];
	value: OpenAPIV3.ResponseObject;
} | {
	type: typeof componentTypes[2];
	value: OpenAPIV3.ParameterObject;
} | {
	type: typeof componentTypes[3];
	value: OpenAPIV3.ExampleObject;
} | {
	type: typeof componentTypes[4];
	value: OpenAPIV3.RequestBodyObject;
} | {
	type: typeof componentTypes[5];
	value: OpenAPIV3.HeaderObject;
} | {
	type: typeof componentTypes[6];
	value: OpenAPIV3.SecuritySchemeObject;
} | {
	type: typeof componentTypes[7];
	value: OpenAPIV3.LinkObject;
} | {
	type: typeof componentTypes[8];
	value: OpenAPIV3.CallbackObject;
} | {
	type: typeof componentTypes[9];
	value: OpenAPIV3.PathItemObject;
});

export interface CodegenApi {
	document: OpenAPIV3.Document;
	addFile: (path: string, content: string) => void;
	checkReference: (obj: AnyObject) => ComponentReference | null;
}

export interface LanguageAdapter {
	generateFiles: (api: CodegenApi) => Promise<void>;
}
