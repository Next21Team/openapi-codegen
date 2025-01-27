import { defineContext } from 'jsxte';
import type { GenerateObjectLiteralArgs } from './literal';

export const argsCtx = defineContext<GenerateObjectLiteralArgs>();

export const withArgsContext = (
	Component: JSXTE.Component,
	args: GenerateObjectLiteralArgs,
) => (
	<argsCtx.Provider value={args}>
		<Component />
	</argsCtx.Provider>
);
