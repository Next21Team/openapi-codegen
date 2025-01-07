import { formattingOptionsCtx } from '~/syntax/formating-options';
import { BaseSchemaDecl, BaseSchemaProto, type BaseSchemaProtoProps } from '../base';
import { initializerArg, schemaArg } from '~/components/shared/primitives';
import { intTag } from '~/syntax/tags';
import { Declaration, Statement } from '~/syntax/common';
import { integerTag } from './tag';
import { JsDoc, type JsdocProps } from '~/components/shared/jsdoc';
import type { SchemaDeclaration } from '../generate';
import type { ContextAccessor } from '~/lib/jsx';

export interface IntegerLiteralDeclarationProps {
	name: string;
	jsDoc?: JsdocProps;
}

export const generateIntegerLiteralDecl = (props: IntegerLiteralDeclarationProps) => {
	return [
		generateInit(props),
		generateGet(props),
	];
};

const generateInit = ({ name, jsDoc }: IntegerLiteralDeclarationProps): SchemaDeclaration => {
	const getSchemaArgs = (ctx: ContextAccessor): BaseSchemaProtoProps => {
		const { toFunc } = ctx.getOrFail(formattingOptionsCtx);

		return {
			tag: integerTag,
			identifier: toFunc(name),
			args: [{ type: 'single', const: true, tag: intTag, name: initializerArg }],
		};
	};

	const Prototype: JSXTE.Component = (props, { ctx }) => (
		<Declaration>
			{jsDoc && (
				<JsDoc
					{...jsDoc}
					args={[{ name: initializerArg, description: 'Initializer value' }]}
					returnExpr={`${integerTag} primitive`}
				/>
			)}
			<BaseSchemaProto {...getSchemaArgs(ctx)} />
		</Declaration>
	);

	const Code: JSXTE.Component = (props, { ctx }) => (
		<BaseSchemaDecl {...getSchemaArgs(ctx)}>
			<Statement>return {integerTag}:ezjson_init_number({initializerArg})</Statement>
		</BaseSchemaDecl>
	);

	return {
		prototype: <Prototype />,
		implementation: <Code />,
	};
};

const generateGet = ({ name }: IntegerLiteralDeclarationProps): SchemaDeclaration => {
	const getSchemaArgs = (ctx: ContextAccessor): BaseSchemaProtoProps => {
		const { toFunc } = ctx.getOrFail(formattingOptionsCtx);

		return {
			identifier: toFunc(name, 'get'),
			args: [{ type: 'single', const: true, tag: integerTag, name: schemaArg }],
		};
	};

	const Prototype: JSXTE.Component = (props, { ctx }) => (
		<BaseSchemaProto {...getSchemaArgs(ctx)} />
	);

	const Code: JSXTE.Component = (props, { ctx }) => (
		<BaseSchemaDecl {...getSchemaArgs(ctx)}>
			<Statement>return ezjson_get_number(EzJSON:{schemaArg})</Statement>
		</BaseSchemaDecl>
	);

	return {
		prototype: <Prototype />,
		implementation: <Code />,
	};
};
