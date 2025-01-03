export interface Meta {
	title?: string;
	description?: string;
	deprecated?: boolean;
}

export const jsDocDecl = `{{@if(it.title || it.description)}}
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
{{@if(it.deprecated)}}
#pragma deprecated This definition is deprecated
{{/if}}`;
