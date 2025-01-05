import type { Special } from "~/lib/special-type";
import { CompoundStatement, Declaration } from "./common"
import type { TagIdentifier } from "./tags";
import type { VarIdentifier } from "./variable";

export type FuncIdentifier = Special<string, 'funcIdentifier'>;

export type FuncArgument = {
	type: 'single';
	tag: TagIdentifier;
	name: VarIdentifier;
	const: boolean;
} | {
	type: 'mixed';
	tag: TagIdentifier[];
	name: VarIdentifier;
	const: boolean;
} | {
	type: 'macro';
	name: string;
};

export interface FunctionProps {
	identifier: FuncIdentifier,
	args?: FuncArgument[],
	stock?: boolean,
	public?: boolean,
	native?: boolean
	static?: boolean,
	tag?: string
}

export const Function: JSXTE.Component<FunctionProps> = ({ children, identifier, tag, args = [], ...props }) => {
	const modifiers = [
		(props.stock && 'stock'),
		(props.public && 'public'),
		(props.native && 'native'),
		(props.static && 'static')
	].filter((t): t is string => !!t)

	const formattedArgs = args
		.map((arg) => {
			if (arg.type === 'single')
				return `${arg.const ? 'const ' : ''}${arg.tag}:${arg.name}`;
			else if (arg.type === 'mixed')
				return `${arg.const ? 'const ' : ''}{${arg.tag.join(',')}}:${arg.name}`;
			else
				return arg.name;
		})
		.join(', ')

	return (
		<Declaration>
			{modifiers.join(' ')}
			{' '}
			{tag && `${tag}:`}{identifier}({formattedArgs})
			{' '}
			<CompoundStatement>{children}</CompoundStatement>
		</Declaration>
	)
}