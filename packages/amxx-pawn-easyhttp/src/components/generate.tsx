import { codegenCtx } from '~/context';
import {
	generateGlobalSchemas,
	generateSchema,
	GlobalDeclarations,
	type SchemaDeclaration,
} from './schema/generate';

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
			const declaration = generateSchema({
				schema,
				name: `${name} schema`,
				resolveDependency: schema => generatedSchemas.get(schema) ?? null,
				onDependencyResolved: (declaration, schema) => generatedSchemas.set(schema, declaration),
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
