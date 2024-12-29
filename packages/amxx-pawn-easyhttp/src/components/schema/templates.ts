import { template } from '~/sqrl';

interface Meta {
	title?: string;
	description?: string;
	deprecated?: boolean;
}

interface RenderObjDeclarationArgs extends Meta {
	tag: string;
	name: string;
	arguments: string;
	code: string;
}

const objDecl
= `{{@if(it.title || it.description)}}
/**
{{@if(it.title)}}
 * {{ it.title | uppercase }} 
 *
{{/if}}
{{@if(it.description)}}
 * {{ it.description }} 
 *
{{/if}}
 * @return {{it.tag}} object
 */
{{/if}}
{{@if(it.description)}}
#pragma deprecated This definition is deprecated
{{/if}}
{{it.tag}}:{{it.name}}({{it.arguments}}) {
	new root = EzJSON:ezjson_init_object();
{{it.code | asCode(1)}} 
	return {{it.tag}}:root;
}`;

export function schemaObjDecl(params: RenderObjDeclarationArgs): string {
	return template.render(objDecl, params);
}
