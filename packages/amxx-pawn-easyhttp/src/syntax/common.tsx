import { Fragment } from 'jsxte/jsx-runtime';
import { formattingOptionsCtx } from './formating-options';
import { Indent, Tab } from './indent';

export const Eol: JSXTE.Component<{ repeat?: number }> = ({ repeat = 1 }) => '\n'.repeat(repeat);

export const Line: JSXTE.Component = ({ children }) => (
	<Declaration>
		{children}<Eol />
	</Declaration>
);

export const Statement: JSXTE.Component = ({ children }, { ctx }) => {
	const { semicolon } = ctx.getOrFail(formattingOptionsCtx);

	return (
		<Line>
			{children}{semicolon}
		</Line>
	);
};

export const Declaration = Fragment;

export const CompoundStatement: JSXTE.Component = ({ children }) => {
	return (
		<Declaration>
			{'{\n'}
			<Indent>
				<Tab indent={1}>{children}</Tab>
				{'}\n'}
			</Indent>
		</Declaration>
	);
};
