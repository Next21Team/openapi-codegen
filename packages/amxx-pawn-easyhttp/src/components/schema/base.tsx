import { Function, type FunctionProps } from '~/syntax/function';

export const BaseSchema: JSXTE.Component<FunctionProps> = (props) => {
	return (
		<Function stock {...props} />
	);
};
