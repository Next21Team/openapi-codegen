import { formattingOptionsCtx } from '~/syntax/formating-options';
import { BaseSchemaDecl, BaseSchemaProto, type BaseSchemaProtoProps } from '../base';
import { initializerArg, schemaArg } from '~/components/shared/primitives';
import { boolTag } from '~/syntax/tags';
import { Declaration, Statement } from '~/syntax/common';
import { booleanTag } from './tag';
import { JsDoc, type JsdocProps } from '~/components/shared/jsdoc';
import type { SchemaDeclaration } from '../generate';
import type { ContextAccessor } from '~/lib/jsx';

export interface BooleanLiteralDeclarationProps {
	name: string;
	jsDoc?: JsdocProps;
}

export const generateBooleanLiteralDecl = (props: BooleanLiteralDeclarationProps) => {
	return [
		generateInit(props),
		generateGet(props),
	];
};

const generateInit = ({ name, jsDoc }: BooleanLiteralDeclarationProps): SchemaDeclaration => {
	const getSchemaArgs = (ctx: ContextAccessor): BaseSchemaProtoProps => {
		const { toFunc } = ctx.getOrFail(formattingOptionsCtx);

		return {
			tag: booleanTag,
			identifier: toFunc(name),
			args: [{ type: 'single', const: true, tag: boolTag, name: initializerArg }],
		};
	};

	const Prototype: JSXTE.Component = (props, { ctx }) => (
		<Declaration>
			{jsDoc && (
				<JsDoc
					{...jsDoc}
					args={[{ name: initializerArg, description: 'Initializer value' }]}
					returnExpr={`${booleanTag} primitive`}
				/>
			)}
			<BaseSchemaProto {...getSchemaArgs(ctx)} />
		</Declaration>
	);

	const Code: JSXTE.Component = (props, { ctx }) => (
		<BaseSchemaDecl {...getSchemaArgs(ctx)}>
			<Statement>return {booleanTag}:ezjson_init_bool({initializerArg})</Statement>
		</BaseSchemaDecl>
	);

	return {
		prototype: <Prototype />,
		implementation: <Code />,
	};
};

const generateGet = ({ name }: BooleanLiteralDeclarationProps): SchemaDeclaration => {
	const getSchemaArgs = (ctx: ContextAccessor): BaseSchemaProtoProps => {
		const { toFunc } = ctx.getOrFail(formattingOptionsCtx);

		return {
			tag: boolTag,
			identifier: toFunc(name, 'get'),
			args: [{ type: 'single', const: true, tag: booleanTag, name: schemaArg }],
		};
	};

	const Prototype: JSXTE.Component = (props, { ctx }) => (
		<BaseSchemaProto {...getSchemaArgs(ctx)} />
	);

	const Code: JSXTE.Component = (props, { ctx }) => (
		<BaseSchemaDecl {...getSchemaArgs(ctx)}>
			<Statement>return ezjson_get_bool(EzJSON:{schemaArg})</Statement>
		</BaseSchemaDecl>
	);

	return {
		prototype: <Prototype />,
		implementation: <Code />,
	};
};
