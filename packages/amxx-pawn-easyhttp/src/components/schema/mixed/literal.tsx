import type { TagIdentifier } from '~/syntax/tags';
import type { SchemaDeclaration } from '../generate';
import type { GetOperatorProps, InitOperatorProps, IsOperatorComponent } from '../operators';
import { InitOperatorImpl, InitOperatorProto } from './init';
import { codegenCtx } from '~/context';
import { buildSchemaName } from '../name';
import { buildSchemaTag } from '../tag';

interface SyntaxContract {
	tag: TagIdentifier;
	IsOperatorProto: IsOperatorComponent;
	IsOperatorImpl: IsOperatorComponent;
}

export interface GenerateMixedLiteralProps extends InitOperatorProps, GetOperatorProps {
	syntaxes: SyntaxContract[];
}

export const generateMixedLiteralDecl = (props: GenerateMixedLiteralProps): SchemaDeclaration => {
	const { syntaxes, name } = props;
	const { format } = codegenCtx.getOrFail();

	return {
		tag: buildSchemaTag(name),
		name: buildSchemaName(props.name),
		prototype: <InitOperatorProto {...props} />,
		implementation: <InitOperatorImpl {...props} />,
		dependencies: syntaxes.map(syntax => ({
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
	};
};

export { type SyntaxContract as SyntaxContractForMixed };
