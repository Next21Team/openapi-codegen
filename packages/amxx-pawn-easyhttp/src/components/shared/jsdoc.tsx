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
	children
}) => {
	return (
		<>
			/**
			{deprecated && `* @deprecated This definition is deprecated\n *`}
			{title && `* ${title.toUpperCase()}\n *`}
			{description && `* ${description}\n *`}
			{!!args?.length && (
				<>{args.map(arg => `* @param ${arg.name} ${arg.description}\n`)}{'\n *'}</>
			)}
			{returnExpr && `* @return ${returnExpr}\n *`}
			*/
			{deprecated && `#pragma deprecated This definition is deprecated`}
			{children}
		</>
	);
}