import { codegenCtx } from '~/context';
import { buildSchemaName } from '../name';
import { mapPrimitiveTypeToSyntax } from '../primitives-map';
import { match } from 'ts-pattern';
import type { GenerateObjectLiteralArgs } from './literal';
import { cellTag } from '~/syntax/tags';

export function prepareProperties({ schema, name, resolveDependency }: GenerateObjectLiteralArgs) {
	const { format, checkReference } = codegenCtx.getOrFail();
	const requiredProps = new Set(schema.required ?? []);
	const identifier = buildSchemaName(name);

	return Object.entries(schema.properties ?? {}).map(([key, property]) => {
		const required = requiredProps.has(key);
		const reference = checkReference(property);
		const resolvedProperty = reference?.type === 'schemas' ? reference.getOriginal() : property;
		const primitive = mapPrimitiveTypeToSyntax(property.type);
		const domainName = format.joinDomains(identifier, format.toFunc(key));

		const { tag, fromCache, declaration } = match(primitive)
			.with(null, () => {
				const { declaration, fromCache } = resolveDependency(resolvedProperty, domainName);

				return {
					tag: declaration.tag ?? cellTag,
					declaration,
					fromCache,
				};
			})
			.otherwise(Syntax => ({
				tag: Syntax.tag,
				declaration: null,
				fromCache: true,
			}));

		return {
			key,
			property: resolvedProperty,
			declaration,
			tag,
			required,
			fromCache,
		};
	});
}
