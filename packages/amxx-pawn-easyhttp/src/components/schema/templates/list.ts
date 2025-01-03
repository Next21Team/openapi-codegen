import { template } from '~/sqrl';
import { jsDocDecl, type Meta } from './common';

interface ListSchemaDeclArgs extends Meta {
	tag: string;
	name: string;
	arguments: string;
	code: string;
}

const listDecl = `${jsDocDecl}
{{it.tag}}:{{it.name}}({{it.arguments}}) {
	new root = EzJSON:ezjson_init_array();
{{it.code | asCode(1)}} 
	return {{it.tag}}:root;
}`;

export function listSchemaDecl(params: ListSchemaDeclArgs): string {
	return template.render(listDecl, params);
}

const listHelperDecl = `${jsDocDecl}
{{it.tag}}:{{it.name}}({{it.arguments}}) {
{{it.code | asCode(1)}} 
}`;

export function listHelperSchemaDecl(params: ListSchemaDeclArgs): string {
	return template.render(listHelperDecl, params);
}
