import type { TagIdentifier } from '~/syntax/tags';
import type { SchemaDeclaration } from '../generate';
import type { GetOperatorProps, InitOperatorProps, IsOperatorComponent } from '../operators';
import { InitOperatorImpl, InitOperatorProto } from './init';
import { codegenCtx } from '~/context';

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
	const { format } = codegenCtx.getOrFail();

	return [
		{
			prototype: <InitOperatorProto {...props} />,
			implementation: <InitOperatorImpl {...props} />,
		},
		...syntaxes.map(syntax => ({
			prototype: (
				<syntax.IsOperatorProto
					name={name}
					varTag={format.toTag(name)}
				/>
			),
			implementation: (
				<syntax.IsOperatorImpl
					name={name}
					varTag={format.toTag(name)}
				/>
			),
		})),
	];
};

export { type SyntaxContract as SyntaxContractForMixed };
