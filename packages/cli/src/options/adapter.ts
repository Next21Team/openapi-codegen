import amxxPawnEasyhttp from "@oas-codegen/amxx-pawn-easyhttp";
import type { LanguageAdapter } from "@oas-codegen/core";
import { z } from 'zod';

const definedAdapters = ['amxx-pawn-easyhttp'] as const;
type DefinedAdapters = typeof definedAdapters[number];

const adapters: Record<DefinedAdapters, LanguageAdapter> = {
	"amxx-pawn-easyhttp": amxxPawnEasyhttp,
}

export const adapterOption = {
	choices: definedAdapters,
	parse: z.enum(definedAdapters).parse,
	getAdapter(adapter: DefinedAdapters) {
		return adapters[adapter];
	}
}