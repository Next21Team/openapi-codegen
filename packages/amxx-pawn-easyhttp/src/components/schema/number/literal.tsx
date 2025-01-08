import { formattingOptionsCtx } from '~/syntax/formating-options';
import { BaseSchemaDecl, BaseSchemaDeclWithUnionArgs, BaseSchemaProto, type BaseSchemaProtoProps } from '../base';
import { initializerArg, schemaArg } from '~/components/shared/primitives';
import { floatTag, intTag } from '~/syntax/tags';
import { Declaration, Eol, Statement } from '~/syntax/common';
import { numberTag } from './tag';
import { JsDoc, type JsdocProps } from '~/components/shared/jsdoc';
import { If } from '~/syntax/if-else';
import type { ContextAccessor } from '~/lib/jsx';
import type { SchemaDeclaration } from '../generate';

export interface NumberLiteralDeclarationProps {
	name: string;
	jsDoc?: JsdocProps;
}

export const generateNumberLiteralDecl = (props: NumberLiteralDeclarationProps) => {
	return [
		generateInit(props),
		generateGet(props),
		generateGetReal(props),
	];
};

const generateInit = ({ name, jsDoc }: NumberLiteralDeclarationProps): SchemaDeclaration => {
	const getSchemaArgs = (ctx: ContextAccessor): BaseSchemaProtoProps => {
		const { toFunc } = ctx.getOrFail(formattingOptionsCtx);

		return {
			tag: numberTag,
			identifier: toFunc(name),
			args: [{ type: 'mixed', const: true, tag: [intTag, floatTag], name: initializerArg }],
		};
	};

	const Prototype: JSXTE.Component = (props, { ctx }) => (
		<Declaration>
			{jsDoc && (
				<JsDoc
					{...jsDoc}
					args={[{ name: initializerArg, description: 'Initializer value' }]}
					returnExpr={`${numberTag} primitive`}
				/>
			)}
			<BaseSchemaProto {...getSchemaArgs(ctx)} />
		</Declaration>
	);

	const Code: JSXTE.Component = (props, { ctx }) => (
		<BaseSchemaDeclWithUnionArgs
			{...getSchemaArgs(ctx)}
			render={({ getTagIdVar, args }) => ([
				<If expr={`${getTagIdVar(args[0])} == tagof(${floatTag}:)`}>
					<Statement>return {numberTag}:ezjson_init_real({floatTag}:{initializerArg})</Statement>
				</If>,
				<Eol />,
				<Statement>return {numberTag}:ezjson_init_number({initializerArg})</Statement>,
			])}
		/>
	);

	return {
		prototype: <Prototype />,
		implementation: <Code />,
	};
};

const generateGet = (props: NumberLiteralDeclarationProps): SchemaDeclaration => {
	const getSchemaArgs = (ctx: ContextAccessor, { name }: NumberLiteralDeclarationProps): BaseSchemaProtoProps => {
		const { toFunc } = ctx.getOrFail(formattingOptionsCtx);

		return {
			identifier: toFunc(name, 'get'),
			args: [{ type: 'single', const: true, tag: numberTag, name: schemaArg }],
		};
	};

	const Prototype: JSXTE.Component = (_, { ctx }) => (
		<BaseSchemaProto {...getSchemaArgs(ctx, props)} />
	);

	const Code: JSXTE.Component = (_, { ctx }) => (
		<BaseSchemaDecl {...getSchemaArgs(ctx, props)}>
			<Statement>return ezjson_get_number(EzJSON:{schemaArg})</Statement>
		</BaseSchemaDecl>
	);

	return {
		prototype: <Prototype />,
		implementation: <Code />,
	};
};

const generateGetReal = (props: NumberLiteralDeclarationProps): SchemaDeclaration => {
	const getSchemaArgs = (ctx: ContextAccessor, { name }: NumberLiteralDeclarationProps): BaseSchemaProtoProps => {
		const { toFunc } = ctx.getOrFail(formattingOptionsCtx);

		return {
			tag: floatTag,
			identifier: toFunc(name, 'get', 'real'),
			args: [{ type: 'single', const: true, tag: numberTag, name: schemaArg }],
		};
	};

	const Prototype: JSXTE.Component = (_, { ctx }) => (
		<BaseSchemaProto {...getSchemaArgs(ctx, props)} />
	);

	const Code: JSXTE.Component = (_, { ctx }) => (
		<BaseSchemaDecl {...getSchemaArgs(ctx, props)}>
			<Statement>return ezjson_get_real(EzJSON:{schemaArg})</Statement>
		</BaseSchemaDecl>
	);

	return {
		prototype: <Prototype />,
		implementation: <Code />,
	};
};
