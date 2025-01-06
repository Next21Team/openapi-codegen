import { transformRenderProp, type MaybeRenderProp } from '~/lib/jsx';
import { LimitedDefine } from '~/syntax/directives/define';
import { formattingOptionsCtx } from '~/syntax/formating-options';
import { Function, type FuncArgument, type FunctionProps } from '~/syntax/function';
import type { VarIdentifier } from '~/syntax/variable';

const macroName = '__END';

export interface FunctionWithUnionArgsProps extends Omit<FunctionProps, 'children'> {
	children?: MaybeRenderProp<{
		getTagIdVar: (key: FuncArgument) => VarIdentifier | undefined;
	}>;
}

export const FunctionWithUnionArgs: JSXTE.Component<FunctionWithUnionArgsProps>
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
				<Function
					args={args.concat({ type: 'macro', name: macroName })}
					{...props}
				>
					{transformRenderProp(children, { getTagIdVar })}
				</Function>
			</LimitedDefine>
		);
	};
