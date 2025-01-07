import { Statement } from '~/syntax/common';
import { numberTag } from './tag';
import type { VarIdentifier } from '~/syntax/variable';
import type { TagIdentifier } from '~/syntax/tags';

type OutputDest = 'return' | VarIdentifier;

interface OutputDestProp {
	to: OutputDest;
}

interface InitProps extends OutputDestProp {
	initializer: string;
	withTag?: TagIdentifier;
}

export const Init: JSXTE.Component<InitProps> = ({ initializer, to, withTag = numberTag }) => {
	return to === 'return' ? (
		<Statement>return {withTag}:ezjson_init_number({initializer})</Statement>
	) : (
		<Statement>{to} = {withTag}:ezjson_init_number({initializer})</Statement>
	);
};

interface GetProps extends OutputDestProp {
	from: string;
}

export const Get: JSXTE.Component<GetProps> = ({ from, to }) => {
	return to === 'return' ? (
		<Statement>return ezjson_get_number(EzJSON:{from})</Statement>
	) : (
		<Statement>{to} = ezjson_get_number(EzJSON:{from})</Statement>
	);
};
