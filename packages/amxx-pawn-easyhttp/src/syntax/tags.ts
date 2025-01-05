import type { Special } from '~/lib/special-type';

export type TagIdentifier = Special<string, 'tagIdentifier'>;

export const boolTag = 'bool' as TagIdentifier;
export const floatTag = 'Float' as TagIdentifier;
export const intTag = '_' as TagIdentifier;

export const TagOf = ({ children }: { children: TagIdentifier }) => {
	return `tagof(${children}:)`;
};
