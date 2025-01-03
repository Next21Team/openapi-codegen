## SAMPLE
	schemas:
		SomeArray:
			type: array
			items: 
				type: string
### GENERATED OUTPUT:
	SomeArray:some_array_init(String:...) {
		new EzJSON:root = ezjson_init_array();
		for(new i; i < numargs(); i++)
			ezjson_array_append_value(root, EzJSON:getarg(i));
		return SomeArray:root;
	}

	some_array_push(SomeArray:arr, String:...) {
		for(new i = 1; i < numargs(); i++)
			ezjson_array_append_value(arr, EzJSON:getarg(i));
	}

	String:some_array_get_value(SomeArray:arr, index) { ... }
	some_array_get_size(SomeArray:arr) { ... }
	some_array_replace(SomeArray:arr, index, String:value) { ... }
	some_array_clear(SomeArray:arr) { ... }
	some_array_remove(SomeArray:arr, index) { ... }


## SAMPLE
	schemas:
		SomeArray:
			type: array
			items: 
				oneOf:
					- type: string
					- type: boolean
### GENERATED OUTPUT:
	SomeArray__Item:some_array__item_init({String, Boolean}:val, __END) { ... }
	SomeArray:some_array_init(SomeArray__Item:...) { ... }


## SAMPLE
	components:
		schemas:
			Lel:
				type: object
				properties:
					yes:
						type: boolean
			Kek:
				type: object
				properties:
					kek:
						type: number
			SomeArray:
				type: array
				items: 
					allOf:
						- $ref: '#/components/schemas/Lel'
						- $ref: '#/components/schemas/Kek'
### GENERATED OUTPUT:
	SomeArray__Item:some_array__item_init(
		{Kek, Undefined}:kek = undefined, 
		{Lel, Undefined}:lel = undefined,
		__END
	) {
		new EzJSON:root = ezjson_object_init();

		if(__kek_tagid != tagof(Undefined:))
			ezjson_object_merge(root, EzJSON:kek);

		if(__lel_tagid != tagof(Undefined:))
			ezjson_object_merge(root, EzJSON:lel);

		return SomeArray__Item:root;
	}

	SomeArray:some_array_init(SomeArray__Item:...) { ... }


## SAMPLE
	components:
		schemas:
			Lel:
				type: object
				properties:
					yes:
						type: boolean
			Kek:
				type: object
				properties:
					kek:
						type: number
			SomeArray:
				type: array
				items: 
					anyOf:
						- $ref: '#/components/schemas/Lel'
						- $ref: '#/components/schemas/Kek'
### GENERATED OUTPUT:
	SomeArray__Item:some_array__item_init(
		{Kek, Undefined}:kek = undefined, 
		{Lel, Undefined}:lel = undefined,
		__END
	) {
		new EzJSON:root = ezjson_object_init();
		if(__kek_tagid != tagof(Undefined:))
			ezjson_object_merge(root, EzJSON:Kek);

		if(__lel_tagid != tagof(Undefined:))
			ezjson_object_merge(root, EzJSON:lel);

		return SomeArray__Item:root;
	}

	SomeArray:some_array_init(SomeArray__Item:...) { ... }


## SAMPLE (ALLOF)
	schemas:
		SomeArray:
			type: array
			items: 
				allOf:
					- type: object
						properties:
							kek:
								type: number
					- type: object
						properties:
							yes:
								type: boolean
						  	
### GENERATED OUTPUT:
	SomeArray__Item:some_array__item_init(
		{Number, Undefined}:kek = undefined, 
		{Boolean, Undefined}:yes = undefined,
		__END
	) {
		new EzJSON:root = ezjson_object_init();
		ezjson_object_merge(root, EzJSON:kek);
		ezjson_object_merge(root, EzJSON:lel);
		return SomeArray__Item:root;
	}

	SomeArray:some_array_init(SomeArray__Item:...) { ... }


## SAMPLE (ALLOF WITH NESTED OBJECTS)
	schemas:
		SomeArray:
			type: array
			items: 
				allOf:
					- type: object
						properties:
							kek:
								type: number
					- type: object
						properties:
							yes:
								type: boolean
							nested:
								type: object
								properties:
									nested_val:
										type: number
						  	
### GENERATED OUTPUT:
	SomeArray__Item:some_array__item_init(
		{Number, Undefined}:kek = undefined
		{Boolean, Undefined}:yes = undefined,
		{SomeArray__Item__Nested, Undefined}:nested = undefined
	) { ... }

	SomeArray__Item__Nested:some_array__item__nested_init(
		{Number, Undefined}:nestedVal = undefined
	) { ... }

	SomeArray:some_array_init(SomeArray__Item:...) { ... }
### USAGE EXAMPLE:
	new SomeArray:arr = some_array_init(
		some_array__item_init(
			.kek = number(123),
			.nested = some_array__item__nested_init(
				.nestedVal = 321
			)
		)
	)