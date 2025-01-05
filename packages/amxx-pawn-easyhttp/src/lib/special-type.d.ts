export interface Specializing<TypeName> {
	_type: TypeName;
}

export type Special<T, TypeName> = T & Specializing<TypeName>;
