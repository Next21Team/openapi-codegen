## SAMPLE
	schemas:
		SomeInteger:
			type: integer
		SomeNumber:
			type: number
		SomeBoolean:
			type: boolean
		SomeString:
			type: string
### GENERATED OUTPUT:
	// inlined Integer:integer() function
	Integer:some_integer_schema_init(const value) {
		return Integer:ezjson_init_number(value);
	}

	some_integer_schema_get(const Integer:value) {
		return ezjson_get_number(EzJSON:value);
	}

	#define __END __1 = tagof(value)

	// inlined Number:number() function
	Number:some_number_schema_init(const {_, Float}:value, __END) {
		if(__1 == tagof(Float:))
			return Number:ezjson_init_real(Float:value);
		
		return Number:ezjson_init_number(value);
	}

	#undef __END

	some_number_schema_get(const Number:var) {
		return ezjson_get_number(EzJSON:var);
	}

	Float:some_number_schema_get_real(const Number:var) {
		return ezjson_get_real(EzJSON:var);
	}

	// inlined Boolean:boolean() function
	Boolean:some_boolean_schema_init(const bool:value) {
		return Boolean:ezjson_init_bool(EzJSON:value);
	}

	bool:some_boolean_schema_get(const Boolean:var) {
		return ezjson_get_bool(EzJSON:var);
	}

	// inlined String:string() function
	String:some_string_schema_init(const value[]) {
		return String:ezjson_init_string(EzJSON:value);
	}	

	some_string_schema_get(const String:var, const value[], valueLen) {
		ezjson_get_string(EzJSON:var, value, valueLen);
	}


## SAMPLE (UNION TYPE)
	schemas:
		SomeMixed:
			nullable: true
			oneOf:
				- type: boolean
				- type: string
### GENERATED OUTPUT:
	#define __END __1 = tagof(value)

	SomeMixed:some_mixed_init({Null, Boolean, String}:value, __END) { 
		if(__1 == tagof(Null:))
			return SomeMixed:ezjson_init_null();

		if(__1 == tagof(Boolean:))
			return SomeMixed:ezjson_init_bool();

		if(__1 == tagof(String:))
			return SomeMixed:ezjson_init_string();
	}

	#undef __END

	bool:some_mixed_is_null(SomeMixed:var) {
		return ezjson_is_null(EzJSON:var)
	}

	bool:some_mixed_is_boolean(SomeMixed:var, &bool:value) {
		if(!ezjson_is_bool(EzJSON:var))
			return false;

		value = ezjson_get_bool(EzJSON:var)
		return true;
	}

	bool:some_mixed_is_string(SomeMixed:var, const value[], valueLen) {
		if(!ezjson_is_string(EzJSON:var))
			return false;

		ezjson_get_string(EzJSON:var, value, valueLen);
		return true;
	}	


## SAMPLE (IMPOSSIBLE ANYOF TYPE)
	schemas:
		SomeInteger:
			nullable: true
			anyOf:
				- type: boolean
				- type: string
### GENERATED OUTPUT:
	#define __END __1 = tagof(value)

	SomeInteger:some_integer_init({Null, Boolean, String}:value, __END) { ... }

	#undef __END

	some_integer_is_null(SomeInteger:var) { ... }
	bool:some_mixed_is_boolean(SomeMixed:var, &bool:value) { ... }
	bool:some_mixed_is_string(SomeMixed:var, const value[], valueLen) { ... }


## SAMPLE (IMPOSSIBLE ALLOF TYPE)
	schemas:
		SomeInteger:
			nullable: true
			allOf:
				- type: boolean
				- type: string
### GENERATED OUTPUT:
	#define __END __1 = tagof(value)

	SomeInteger:some_integer_init(any:value, __END) { ... }

	#undef __END