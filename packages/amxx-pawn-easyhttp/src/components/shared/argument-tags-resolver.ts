import type { VarIdentifier, Context } from '~/context';
import type { FuncArgument } from '~/syntax/function';

export type GetTagIdVarFunc = (arg: FuncArgument) => VarIdentifier | undefined;

export interface ArgumentTagsResolverSectionArgs {
	args: FuncArgument[];
	code: (api: {
		editedArgs: FuncArgument[];
		getTagIdVar: GetTagIdVarFunc;
	}) => string;
}

export function argumentTagsResolverSection(ctx: Context, { args, code }: ArgumentTagsResolverSectionArgs) {
	const macroName = '__END';
	const editedArgs: FuncArgument[] = [...args, { type: 'macro', name: macroName }];
	const generatedTagOfs = new Map(
		args.map(arg => ([
			arg,
			arg.type !== 'macro' ? ctx.format.toVar('__', arg.name, 'tag id') : undefined,
		])),
	);
	const getTagIdVar = generatedTagOfs.get;

	const tagofArgsList = [...generatedTagOfs.entries()]
		.map(([arg, tagIdVar]) => `${tagIdVar} = tagof(${arg.name})`)
		.join(', ');

	const header = `#define ${macroName} ${tagofArgsList}`;
	const footer = `#undef ${macroName}`;

	return `${header}\n\n${code({ editedArgs, getTagIdVar })}\n\n${footer}`;
}
