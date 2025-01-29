import { codegenCtx } from '~/context';

export const buildSchemaName = (name: string) => codegenCtx.getOrFail().format.toFunc(name);
