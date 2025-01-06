import { Declaration, Eol } from '../common';

export interface DefineProps {
	pattern: JSX.Element;
	replacement: JSX.Element;
}

export const Define: JSXTE.Component<DefineProps> = ({ pattern, replacement }) => {
	return (
		<Declaration>
			#define {pattern} {replacement}
			<Eol />
		</Declaration>
	);
};

export interface UndefProps {
	name: JSX.Element;
}

export const Undef: JSXTE.Component<UndefProps> = ({ name }) => {
	return (
		<Declaration>
			#undef {name}
			<Eol />
		</Declaration>
	);
};

export const LimitedDefine: JSXTE.Component<DefineProps> = ({ children, ...props }) => {
	return (
		<Declaration>
			<Define {...props} />
			<Eol />
			{children}
			<Eol />
			<Undef name={props.pattern} />
		</Declaration>
	);
};
