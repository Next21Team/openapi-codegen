import type { CodegenApi } from '@oas-codegen/core';
import { defineContext } from 'jsxte';
import { createContext } from 'context';
import type { Formatter } from './formating-options';

export type Context = Pick<CodegenApi, 'document' | 'documentName' | 'checkReference'> & {
	format: Formatter;
};

const {
	run,
	useX: getOrFail,
} = createContext<Context>();

const context = Object.assign(
	defineContext<Context>(),
	{ run, getOrFail },
);

export const CodegenContext = context.Provider;
export { context as codegenCtx };
