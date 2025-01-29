import { codegenCtx } from '~/context';

export const buildSchemaTag = (name: string) => codegenCtx.getOrFail().format.toTag(name);
