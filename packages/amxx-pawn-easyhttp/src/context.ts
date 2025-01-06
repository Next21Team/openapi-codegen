import type { CodegenApi } from '@oas-codegen/core';
import { defineContext } from 'jsxte';

export type Context = Pick<CodegenApi, 'document' | 'documentName' | 'checkReference'>;

const context = defineContext<Context>();

export const CodegenContext = context.Provider;
export { context as codegenCtx };
