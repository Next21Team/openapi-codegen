import { FunctionDecl, FunctionProto, type FunctionProps } from '~/syntax/function';
import { FunctionDeclWithUnionArgs, type FunctionDeclWithUnionArgsProps } from '../shared/func-with-union-args';

export type BaseSchemaProtoProps = FunctionProps;

export const BaseSchemaProto: JSXTE.Component<BaseSchemaProtoProps> = (props) => {
	return <FunctionProto stock {...props} />;
};

export const BaseSchemaDecl: JSXTE.Component<FunctionProps> = (props) => {
	return <FunctionDecl stock {...props} />;
};

export const BaseSchemaDeclWithUnionArgs: JSXTE.FunctionalComponent<FunctionDeclWithUnionArgsProps> = (props) => {
	return <FunctionDeclWithUnionArgs stock {...props} />;
};
