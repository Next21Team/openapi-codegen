import { Fragment } from "jsxte/jsx-runtime";
import { FormattingConfig } from "./formating-options";
import { Indent, Tab } from "./indent";

export const Statement: JSXTE.Component = ({ children }, { ctx }) => {
	const { semicolon } = ctx.getOrFail(FormattingConfig);
	return <>{children}{semicolon}{'\n'}</>
}

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
	)
}

export const Eol = () => '\n';