import { transformRenderProp, type MaybeRenderProp } from '~/lib/jsx';
import { LimitedDefine } from '~/syntax/directives/define';
import { formattingOptionsCtx } from '~/syntax/formating-options';
import { FunctionDecl, type FuncArgument, type FunctionProps } from '~/syntax/function';
import type { VarIdentifier } from '~/syntax/variable';

const macroName = '__END';

export interface FunctionDeclWithUnionArgsProps extends Omit<FunctionProps, 'children'> {
	children?: MaybeRenderProp<{
		args: FuncArgument[];
		getTagIdVar: (key: FuncArgument) => VarIdentifier | undefined;
	}>;
}

export const FunctionDeclWithUnionArgs: JSXTE.FunctionalComponent<FunctionDeclWithUnionArgsProps>
	= ({ args = [], children, ...props }, { ctx }) => {
		const { toVar } = ctx.getOrFail(formattingOptionsCtx);

		const generatedTagOfs = new Map(
			args.map(arg => ([
				arg,
				arg.type !== 'macro' ? toVar('__', arg.name, 'tag id') : undefined,
			])),
		);

		const tagofArgsList = [...generatedTagOfs.entries()]
			.map(([arg, tagIdVar]) => `${tagIdVar} = tagof(${arg.name})`)
			.join(', ');

		const getTagIdVar = generatedTagOfs.get;

		return (
			<LimitedDefine
				pattern={macroName}
				replacement={tagofArgsList}
			>
				<FunctionDecl
					args={args.concat({ type: 'macro', name: macroName })}
					{...props}
				>
					{transformRenderProp(children, { getTagIdVar, args })}
				</FunctionDecl>
			</LimitedDefine>
		);
	};
