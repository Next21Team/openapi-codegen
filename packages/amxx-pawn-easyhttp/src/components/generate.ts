import type { Context } from '~/context';
import { generateSchema } from './schema/generate';

export function generateComponents(ctx: Context): JSX.Element {
	const generatedComponents = new Set<object>();
	const sections: JSX.Element[] = [];

	const { document } = ctx;

	Object.entries(document.components?.schemas ?? {})
		.forEach(([name, schema]) => {
			const { declaration, dependencies } = generateSchema(ctx, {
				schema,
				name: `${name} schema`,
				shouldResolveDependency: schema => !generatedComponents.has(schema),
				onDependencyResolved: (declaration, schema) => generatedComponents.add(schema),
			});

			dependencies.concat(declaration).forEach(decl => sections.push(decl.code));
		});

	return sections.join('\n\n');
}
