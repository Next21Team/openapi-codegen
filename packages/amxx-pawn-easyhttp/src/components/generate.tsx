import {
	generateGlobalSchemas,
	generateSchema,
	GlobalDeclarations,
	type SchemaDeclaration,
} from './schema/generate';

import type { Context } from '~/context';
import { Declaration, Eol } from '~/syntax/common';

export function generateComponents(ctx: Context) {
	const generatedComponents = new Set<object>();
	const sections: SchemaDeclaration[] = [];

	const { document } = ctx;

	const globalDeclarations = generateGlobalSchemas();
	sections.push(...globalDeclarations);

	Object.entries(document.components?.schemas ?? {})
		.forEach(([name, schema]) => {
			const { declarations, dependencies } = generateSchema({
				schema,
				name: `${name} schema`,
				shouldResolveDependency: schema => !generatedComponents.has(schema),
				onDependencyResolved: (declaration, schema) => generatedComponents.add(schema),
			});

			dependencies.concat(declarations).forEach(decl => sections.push(decl));
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
				<Eol repeat={2} />

				{sections.map(section => (
					<Declaration>
						{section.implementation} <Eol repeat={2} />
					</Declaration>
				))}
			</Declaration>
		),
	};
}
