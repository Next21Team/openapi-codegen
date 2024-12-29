import { Option, program } from 'commander'
import { version } from '../package.json'
import { adapterOption } from './options/adapter';
import { dirname, resolve } from 'path';
import { z } from 'zod';
import * as codegen from '@oas-codegen/core';
import { mkdir, readFile, writeFile } from 'fs/promises';

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

		for (const { path, content } of output) {
			const fullPath = resolve(outDir, path)
			await mkdir(dirname(fullPath), { recursive: true });

			console.log(`Writing file ${path}...`);
			await writeFile(fullPath, content)
		}

		if(output.length)
			console.log(`Code generation is complete!`);
		else
			console.error(`No files were found for output`);
	})

try {
	await program.parseAsync(process.argv);
}
catch (error) {
	if (error instanceof Error) {
		program.error(error.message);
	}
}