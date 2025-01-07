import { Declaration, Eol, Line } from '~/syntax/common';
import { Tab } from '~/syntax/indent';

export interface JsdocProps {
	title?: string;
	description?: string;
	deprecated?: boolean;
	args?: {
		name: string;
		description: string;
	}[];
	returnExpr?: string;
}

export const JsDoc: JSXTE.Component<JsdocProps> = ({
	title,
	description,
	deprecated,
	args,
	returnExpr,
	children,
}) => {
	return (
		<Declaration>
			<Block>
				{deprecated && [<Line>@deprecated This definition is deprecated</Line>, <Eol />]}
				{title && [<Line>{title.toUpperCase()}</Line>, <Eol />]}
				{description && [<Line>{description}</Line>, <Eol />]}
				{!!args?.length && ([
					args.map(arg => <Line>@param {arg.name} {arg.description}</Line>),
					<Eol />,
				])}
				{returnExpr && <Line>@return {returnExpr}</Line>}
			</Block>

			{deprecated && <Line>#pragma deprecated This definition is deprecated</Line>}

			{children}
		</Declaration>
	);
};

const Block: JSXTE.Component = ({ children }) => (
	<Declaration>
		<Line>/**</Line>
		<Tab symbol=' * '>
			{children}
		</Tab>
		<Line>*/</Line>
	</Declaration>
);
