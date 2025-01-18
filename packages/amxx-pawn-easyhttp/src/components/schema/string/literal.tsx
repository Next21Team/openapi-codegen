import { formattingOptionsCtx } from '~/syntax/formating-options';
import { BaseSchemaDecl, BaseSchemaProto, type BaseSchemaProtoProps } from '../base';
import { initializerArg, outputArg, outputArgLen, schemaArg } from '~/components/shared/primitives';

import { Declaration, Statement } from '~/syntax/common';
import { stringTag } from './tag';
import { JsDoc, type JsdocProps } from '~/components/shared/jsdoc';
import type { SchemaDeclaration } from '../generate';
import type { ContextAccessor } from '~/lib/jsx';

export interface StringLiteralDeclarationProps {
	name: string;
	jsDoc?: JsdocProps;
}

export const generateStringLiteralDecl = (props: StringLiteralDeclarationProps) => {
	return [
		generateInit(props),
		generateGet(props),
	];
};

const generateInit = ({ name, jsDoc }: StringLiteralDeclarationProps): SchemaDeclaration => {
	const getSchemaArgs = (ctx: ContextAccessor): BaseSchemaProtoProps => {
		const { toFunc } = ctx.getOrFail(formattingOptionsCtx);

		return {
			tag: stringTag,
			identifier: toFunc(name),
			args: [{ type: 'single', const: true, name: initializerArg, array: true }],
		};
	};

	const Prototype: JSXTE.Component = (props, { ctx }) => (
		<Declaration>
			{jsDoc && (
				<JsDoc
					{...jsDoc}
					args={[{ name: initializerArg, description: 'Initializer value' }]}
					returnExpr={`${stringTag} primitive`}
				/>
			)}
			<BaseSchemaProto {...getSchemaArgs(ctx)} />
		</Declaration>
	);

	const Code: JSXTE.Component = (props, { ctx }) => (
		<BaseSchemaDecl {...getSchemaArgs(ctx)}>
			<Statement>return {stringTag}:ezjson_init_string({initializerArg})</Statement>
		</BaseSchemaDecl>
	);

	return {
		prototype: <Prototype />,
		implementation: <Code />,
	};
};

const generateGet = ({ name }: StringLiteralDeclarationProps): SchemaDeclaration => {
	const getSchemaArgs = (ctx: ContextAccessor): BaseSchemaProtoProps => {
		const { toFunc } = ctx.getOrFail(formattingOptionsCtx);

		return {
			identifier: toFunc(name, 'get'),
			args: [
				{ type: 'single', const: true, tag: stringTag, name: schemaArg },
				{ type: 'single', array: true, name: outputArg },
				{ type: 'single', const: true, name: outputArgLen },
			],
		};
	};

	const Prototype: JSXTE.Component = (props, { ctx }) => (
		<BaseSchemaProto {...getSchemaArgs(ctx)} />
	);

	const Code: JSXTE.Component = (props, { ctx }) => (
		<BaseSchemaDecl {...getSchemaArgs(ctx)}>
			<Statement>return ezjson_get_string(EzJSON:{schemaArg}, {outputArg}, {outputArgLen})</Statement>
		</BaseSchemaDecl>
	);

	return {
		prototype: <Prototype />,
		implementation: <Code />,
	};
};
