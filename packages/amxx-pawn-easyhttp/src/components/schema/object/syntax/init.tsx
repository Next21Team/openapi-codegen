import type { ContextAccessor } from '~/lib/jsx';
import { BaseSchemaDecl, BaseSchemaProto, type BaseSchemaProtoProps } from '../../base';
import { argsCtx } from '../context';
import { Declaration, Statement } from '~/syntax/common';
import { JsDoc } from '~/components/shared/jsdoc';
import { undefinedLiteral, undefinedTag } from '~/components/shared/primitives';
import { codegenCtx } from '~/context';
import { buildSchemaName } from '../../name';
import { buildSchemaTag } from '../../tag';
import { prepareProperties } from '../properties';

const getProtoProps = (ctx: ContextAccessor) => {
	const { format } = codegenCtx.getOrFail();
	const args = ctx.getOrFail(argsCtx);
	const identifier = buildSchemaName(args.name);

	return {
		tag: buildSchemaTag(args.name),
		identifier,
		args: prepareProperties(args).map(({ key, tag, required }) => ({
			name: format.toVar(key),
			const: true,
			...(required ? {
				type: 'single',
				tag: tag,
			} : {
				type: 'mixed',
				tag: [undefinedTag, tag],
				equalTo: undefinedLiteral,
			}),
		})),
	} satisfies BaseSchemaProtoProps;
};

export const InitOperatorProto: JSXTE.Component = (props, { ctx }) => {
	const protoProps = getProtoProps(ctx);
	const args = ctx.getOrFail(argsCtx);
	const properties = prepareProperties(args);

	return (
		<Declaration>
			<JsDoc
				description={args.schema.description}
				deprecated={args.schema.deprecated}
				args={properties.map(({ key, declaration }) => ({
					name: key,
					description: `Value of [${declaration?.name}]. ${args.schema.description}`,
				}))}
				returnExpr={`${protoProps.tag} schema`}
			/>
			<BaseSchemaProto {...protoProps} />
		</Declaration>
	);
};

export const InitOperatorImpl: JSXTE.Component = (props, { ctx }) => {
	const protoProps = getProtoProps(ctx);

	if (!protoProps.args.length) {
		return (
			<BaseSchemaDecl {...protoProps}>
				<Statement>return {protoProps.tag}:ezjson_init_object()</Statement>
			</BaseSchemaDecl>
		);
	}

	return (
		<BaseSchemaDecl {...protoProps}>
			<Statement>new EzJSON:root = ezjson_init_object()</Statement>
			<Statement>return {protoProps.tag}:root</Statement>
		</BaseSchemaDecl>
	);
};
