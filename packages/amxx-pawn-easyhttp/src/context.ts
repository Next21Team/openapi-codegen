import type { CodegenApi } from '@oas-codegen/core';
import { createContext } from 'context';
import type { Formatter } from './formating-options';

export type Context = Pick<CodegenApi, 'document' | 'documentName' | 'checkReference'> & {
	format: Formatter;
};

const {
	run,
	useX: getOrFail,
} = createContext<Context>();

export const codegenCtx = {
	run,
	getOrFail,
};
