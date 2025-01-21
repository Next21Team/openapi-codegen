import type { TagIdentifier } from '~/syntax/tags';
import type { SchemaDeclaration } from '../generate';
import type { GetOperatorProps, InitOperatorProps, IsOperatorComponent } from '../operators';
import { InitOperatorImpl, InitOperatorProto } from './init';
import { FormattingOptions } from '~/syntax/formating-options';

interface SyntaxContract {
	tag: TagIdentifier;
	IsOperatorProto: IsOperatorComponent;
	IsOperatorImpl: IsOperatorComponent;
}

export interface GenerateMixedLiteralProps extends InitOperatorProps, GetOperatorProps {
	syntaxes: SyntaxContract[];
}

export const generateMixedLiteralDecl = (props: GenerateMixedLiteralProps): SchemaDeclaration[] => {
	const { syntaxes, name } = props;

	return [
		{
			prototype: <InitOperatorProto {...props} />,
			implementation: <InitOperatorImpl {...props} />,
		},
		...syntaxes.map(syntax => ({
			prototype: (
				<FormattingOptions
					render={({ toTag }) => (
						<syntax.IsOperatorProto
							name={name}
							varTag={toTag(name)}
						/>
					)}
				/>
			),
			implementation: (
				<FormattingOptions
					render={({ toTag }) => (
						<syntax.IsOperatorImpl
							name={name}
							varTag={toTag(name)}
						/>
					)}
				/>
			),
		})),
	];
};

export { type SyntaxContract as SyntaxContractForMixed };
