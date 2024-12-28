import { Option, program } from 'commander'
import { version } from '../package.json'
import { adapterOption } from './options/adapter';
import { resolve } from 'path';
import { z } from 'zod';
import * as codegen from '@oas-codegen/core';
import { readFile } from 'fs/promises';

program
	.name('oas-codegen')
	.version(version)
	.command('generate <source>')
	.description('Generating codegen artifacts')
	.option('--cwd <cwd>', 'Current working directory', process.cwd())
	.addOption(
		new Option(
			'-a, --adapter <adapter>',
			'The language of the generated code'
		)
			.choices(adapterOption.choices)
			.default('amxx-pawn-easyhttp')
	)
	.requiredOption('--outdir <dir>', 'The output directory for the generated files')
	.action(async (rawSource, options) => {
		const parseString = z.string().parse;

		const cwd = parseString(options.cwd);
		const outDir = resolve(cwd, parseString(options.outdir))
		const sourceFile = resolve(cwd, parseString(rawSource))
		const languageAdapter = adapterOption.getAdapter(adapterOption.parse(options.adapter));

		const input = (await readFile(sourceFile)).toString();
		const output = await codegen.produce({ input, languageAdapter });
		
		console.log(output);
	})

try {
	await program.parseAsync(process.argv);
}
catch (error) {
	if(error instanceof Error) {
		program.error(error.message);
	}
}