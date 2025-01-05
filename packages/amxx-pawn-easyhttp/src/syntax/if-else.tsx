import { CompoundStatement, Declaration } from "./common"

export const If: JSXTE.Component<{ expr: JSX.Element }> = ({ expr, children }) => {
	return (
		<Declaration>
			if({expr}) <CompoundStatement>{children}</CompoundStatement>
		</Declaration>
	)
}

export const Else: JSXTE.Component = ({ children }) => {
	return (
		<Declaration>
			else <CompoundStatement>{children}</CompoundStatement>
		</Declaration>
	)
}

export const ElseIf: JSXTE.Component<{ expr: JSX.Element }> = ({ expr, children }) => {
	return (
		<Declaration>
			else if({expr}) <CompoundStatement>{children}</CompoundStatement>
		</Declaration>
	)
}