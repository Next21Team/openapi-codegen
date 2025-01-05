import { Function, type FunctionProps } from '~/syntax/function';

export const BaseSchema: JSXTE.Component<FunctionProps> = ({ children, ...props }) => {
	return (
		<Function 
			stock
			{...props}
		>
			{children}
		</Function>
	);
}