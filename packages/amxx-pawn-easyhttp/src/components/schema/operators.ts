import type { TagIdentifier } from '~/syntax/tags';
import type { JsdocProps } from '../shared/jsdoc';

interface BaseOperator {
	name: string;
}

export interface InitOperatorProps extends BaseOperator {
	jsDoc: JsdocProps;
};
export type InitOperatorComponent = JSXTE.Component<InitOperatorProps>;

export type GetOperatorProps = BaseOperator;
export type GetOperatorComponent = JSXTE.Component<GetOperatorProps>;

export interface IsOperatorProps extends BaseOperator {
	varTag: TagIdentifier;
};
export type IsOperatorComponent = JSXTE.Component<IsOperatorProps>;
