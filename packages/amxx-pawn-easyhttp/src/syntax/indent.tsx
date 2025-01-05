import { defineContext } from "jsxte";
import { FormattingConfig } from "./formating-options";

const indentContext = defineContext<number>();

export const Indent: JSXTE.Component = ({ children }, { ctx }) => {
	const indent = ctx.get(indentContext) ?? 0;
	const tree = Array.isArray(children) ? children : [children];
	const { indentSymbol } = ctx.getOrFail(FormattingConfig);

	return (
		<>
			{tree.map(node => {
				if (node && typeof node === 'object' && 'tag' in node && node.tag === Tab)
					return node;

				return <>{indentSymbol.repeat(indent)}{node}</>
			})}
		</>
	)
}

export const Tab: JSXTE.Component<{ indent: number }> = ({ indent, children }, { ctx }) => {
	const shift = (ctx.get(indentContext) ?? 0) + indent;

	return (
		<indentContext.Provider value={shift}>
			<Indent>{children}</Indent>
		</indentContext.Provider>
	)
}