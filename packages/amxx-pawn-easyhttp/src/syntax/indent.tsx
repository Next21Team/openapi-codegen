import { defineContext } from 'jsxte';
import { isTagElement } from '~/lib/jsx';
import { codegenCtx } from '~/context';

const indentContext = defineContext<number>();

interface SymbolProp {
	symbol?: string;
}

export const Indent: JSXTE.Component<SymbolProp> = ({ children, symbol }, { ctx }) => {
	const indent = ctx.get(indentContext) ?? 0;
	const tree = Array.isArray(children) ? children : [children];
	const { format } = ctx.getOrFail(codegenCtx);
	const indentSymbol = symbol ?? format.indentSymbol;

	return (
		<>
			{tree.map((node) => {
				if (isTagElement(node) && node.tag === Tab)
					return node;

				return <>{indentSymbol.repeat(indent)}{node}</>;
			})}
		</>
	);
};

interface TabProps extends SymbolProp {
	indent?: number;
}

export const Tab: JSXTE.Component<TabProps> = ({ indent = 1, symbol, children }, { ctx }) => {
	const shift = (ctx.get(indentContext) ?? 0) + indent;

	return (
		<indentContext.Provider value={shift}>
			<Indent symbol={symbol}>{children}</Indent>
		</indentContext.Provider>
	);
};
