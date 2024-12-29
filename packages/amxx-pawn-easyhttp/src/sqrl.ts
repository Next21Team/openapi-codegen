import template from 'squirrelly';

export { template };

// TODO: use DI, support space indentation
template.filters.define('asCode', (content: string, indent: number) => {
	return content.split('\n').map(line => '\t'.repeat(indent).concat(line)).join('\n');
});

template.filters.define('uppercase', (content: string) => content.toUpperCase());

template.defaultConfig.autoEscape = false;
