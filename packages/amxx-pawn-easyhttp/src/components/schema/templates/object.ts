import { template } from '~/sqrl';
import { jsDocDecl, type Meta } from './common';

interface ObjSchemaDeclArgs extends Meta {
	tag: string;
	name: string;
	arguments: string;
	code: string;
}

const objDecl = `${jsDocDecl}
{{it.tag}}:{{it.name}}({{it.arguments}}) {
	new root = EzJSON:ezjson_init_object();
{{it.code | asCode(1)}} 
	return {{it.tag}}:root;
}`;

export function objSchemaDecl(params: ObjSchemaDeclArgs): string {
	return template.render(objDecl, params);
}
