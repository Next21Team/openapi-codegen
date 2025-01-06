import type { Context } from '~/context';
import { generateGlobalDeclarations, generateSchema } from './schema/generate';
import { Declaration, Eol } from '~/syntax/common';

export function generateComponents(ctx: Context): JSX.Element {
	const generatedComponents = new Set<object>();
	const sections: JSX.Element[] = [];

	const { document } = ctx;

	const globalDeclarations = generateGlobalDeclarations();
	sections.push(globalDeclarations);

	Object.entries(document.components?.schemas ?? {})
		.forEach(([name, schema]) => {
			const { declaration, dependencies } = generateSchema({
				schema,
				name: `${name} schema`,
				shouldResolveDependency: schema => !generatedComponents.has(schema),
				onDependencyResolved: (declaration, schema) => generatedComponents.add(schema),
			});

			dependencies.concat(declaration).forEach(decl => sections.push(decl.code));
		});

	return (
		<Declaration>
			{sections.map(section => (
				<Declaration>
					{section}
					<Eol repeat={2} />
				</Declaration>
			))}
		</Declaration>
	);
}
