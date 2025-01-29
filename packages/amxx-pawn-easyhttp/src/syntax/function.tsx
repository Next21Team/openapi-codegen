import type { Special } from '~/lib/special-type';
import { CompoundStatement, Declaration, Statement } from './common';
import type { TagIdentifier } from './tags';
import type { VarIdentifier } from './variable';
import { match } from 'ts-pattern';

export type FuncIdentifier = Special<string, 'funcIdentifier'>;

export type FuncArgument = {
	type: 'single';
	name: VarIdentifier;
	tag?: TagIdentifier;
	const?: boolean;
	ref?: boolean;
	array?: boolean;
	equalTo?: string;
} | {
	type: 'mixed';
	tag: TagIdentifier[];
	name: VarIdentifier;
	const?: boolean;
	ref?: boolean;
	equalTo?: string;
} | {
	type: 'macro';
	name: string;
};

export interface FunctionProps {
	identifier: FuncIdentifier;
	args?: FuncArgument[];
	stock?: boolean;
	public?: boolean;
	native?: boolean;
	static?: boolean;
	tag?: string;
}

const Prototype: JSXTE.Component<FunctionProps> = ({ identifier, tag, args = [], ...props }) => {
	const modifiers = [
		(props.stock && 'stock'),
		(props.public && 'public'),
		(props.native && 'native'),
		(props.static && 'static'),
	].filter((t): t is string => !!t);

	const formattedArgs = args
		.map(arg => match(arg)
			.with({ type: 'single' }, arg => (
				[
					arg.ref && '&',
					arg.const && 'const ',
					arg.tag && `${arg.tag}:`,
					arg.name,
					arg.array && '[]',
					arg.equalTo && ` = ${arg.equalTo}`,
				].filter(Boolean).join('')
			))
			.with({ type: 'mixed' }, arg => (
				[
					arg.ref && '&',
					arg.const && 'const ',
					`{${arg.tag.join(', ')}}:${arg.name}`,
					arg.equalTo && ` = ${arg.equalTo}`,
				].filter(Boolean).join('')
			))
			.with({ type: 'macro' }, arg => arg.name)
			.exhaustive(),
		);

	return (
		<Declaration>
			{modifiers.join(' ')}
			{' '}
			{tag && `${tag}:`}{identifier}
			<Declaration>({formattedArgs.join(', ')})</Declaration>
		</Declaration>
	);
};

export const FunctionProto: JSXTE.Component<FunctionProps> = (props) => {
	return (
		<Statement>
			<Prototype {...props} />
		</Statement>
	);
};

export const FunctionDecl: JSXTE.Component<FunctionProps> = ({ children, ...props }) => {
	return (
		<Declaration>
			<Prototype {...props} />
			{' '}
			<CompoundStatement>{children}</CompoundStatement>
		</Declaration>
	);
};
