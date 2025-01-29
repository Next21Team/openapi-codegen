import {
	generateGlobalSchemas,
	generateSchema,
	GlobalDeclarations,
	type GenerateSchemaArgs,
	type SchemaDeclaration,
} from './schema/generate';

import { codegenCtx } from '~/context';
import { Declaration, Eol } from '~/syntax/common';

export function generateComponents() {
	const { document } = codegenCtx.getOrFail();

	const generatedSchemas = new Map<object, SchemaDeclaration>();
	const sections: SchemaDeclaration[] = [];

	const pushToSections = (...declarations: SchemaDeclaration[]) => {
		declarations.forEach((decl) => {
			sections.push(decl);

			if (decl.dependencies?.length)
				pushToSections(...decl.dependencies);
		});
	};

	const globalDeclarations = generateGlobalSchemas();
	pushToSections(...globalDeclarations);

	Object.entries(document.components?.schemas ?? {})
		.forEach(([name, schema]) => {
			const schemaName = `${name} schema`;

			const resolveDependency: GenerateSchemaArgs['resolveDependency'] = (schema, name) => {
				if (generatedSchemas.has(schema))
					return { declaration: generatedSchemas.get(schema)!, fromCache: true };

				const declaration = generateSchema({
					schema,
					name,
					resolveDependency,
				});

				generatedSchemas.set(schema, declaration);
				return { declaration, fromCache: false };
			};

			const declaration = generateSchema({
				schema,
				name: schemaName,
				resolveDependency,
			});

			generatedSchemas.set(schema, declaration);
			pushToSections(declaration);
		});

	return {
		prototypes: (
			<Declaration>
				{sections.map(section => (
					<Declaration>
						{section.prototype} <Eol />
					</Declaration>
				))}
			</Declaration>
		),
		implementations: (
			<Declaration>
				<GlobalDeclarations />
				<Eol />

				{sections.map(section => (
					<Declaration>
						{section.implementation} <Eol />
					</Declaration>
				))}
			</Declaration>
		),
	};
}
