import { codegenCtx } from '~/context';
import {
	generateGlobalSchemas,
	generateSchema,
	GlobalDeclarations,
	type SchemaDeclaration,
} from './schema/generate';

import { Declaration, Eol } from '~/syntax/common';

export function generateComponents() {
	const generatedSchemas = new Map<object, SchemaDeclaration>();
	const sections: SchemaDeclaration[] = [];

	const { document } = codegenCtx.getOrFail();

	const globalDeclarations = generateGlobalSchemas();
	sections.push(...globalDeclarations);

	Object.entries(document.components?.schemas ?? {})
		.forEach(([name, schema]) => {
			const declarations = generateSchema({
				schema,
				name: `${name} schema`,
				resolveDependency: schema => generatedSchemas.get(schema) ?? null,
				onDependencyResolved: (declaration, schema) => generatedSchemas.set(schema, declaration),
			});

			const pushToSections = (declarations: SchemaDeclaration[]) => {
				declarations.forEach((decl) => {
					sections.push(decl);
					if (decl.dependencies)
						pushToSections(decl.dependencies);
				});
			};

			pushToSections(declarations);
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
