import { BaseSchemaDecl, BaseSchemaProto, type BaseSchemaProtoProps } from '../base';
import type { GenerateMixedLiteralProps } from './literal';
import { initializerArg } from '~/components/shared/primitives';
import { Declaration, Statement } from '~/syntax/common';
import { JsDoc } from '~/components/shared/jsdoc';
import { buildSchemaTag } from '../tag';
import { buildSchemaName } from '../name';

type InitOperatorComponentProps = Pick<GenerateMixedLiteralProps, 'name' | 'syntaxes' | 'jsDoc'>;
type InitOperatorComponent = JSXTE.Component<InitOperatorComponentProps>;

const getSchemaArgs = (
	{ name, syntaxes }: Omit<InitOperatorComponentProps, 'jsDoc'>,
): BaseSchemaProtoProps => {
	return {
		tag: buildSchemaTag(name),
		identifier: buildSchemaName(name),
		args: [{
			type: 'mixed',
			const: true,
			tag: syntaxes.map(s => s.tag),
			name: initializerArg,
		}],
	};
};

export const InitOperatorProto: InitOperatorComponent = (props) => {
	const schemaArgs = getSchemaArgs(props);

	return (
		<Declaration>
			<JsDoc
				{...props.jsDoc}
				args={[{ name: initializerArg, description: 'Initializer value' }]}
				returnExpr={`${schemaArgs.tag} primitive`}
			/>
			<BaseSchemaProto {...schemaArgs} />
		</Declaration>
	);
};

export const InitOperatorImpl: InitOperatorComponent = (props) => {
	const schemaArgs = getSchemaArgs(props);

	return (
		<BaseSchemaDecl {...schemaArgs}>
			<Statement>
				return {schemaArgs.tag}:{initializerArg}
			</Statement>
		</BaseSchemaDecl>
	);
};
