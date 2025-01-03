## SAMPLE (EMPTY OBJECT)
	schemas:
		EmptyObject:
			type: object
### GENERATED OUTPUT:
	EmptyObject:empty_object_init() {
		return EmptyObject:ezjson_object_init();
	};


## SAMPLE (SIMPLE OBJECT WITHOUT REQUIRED FIELDS)
	schemas:
		SimpleObject:
			type: object
			properties:
				cat:
					type: string
				dog:
					type: number
### GENERATED OUTPUT:
	#define __END __1 = tagof(cat), __2 = tagof(dog)

	SimpleObject:simple_object_init(
		{String, Undefined}:cat = undefined, 
		{Number, Undefined}:dog = undefined, 
		__END
	) {
		new EzJSON:root = ezjson_object_init()

		if(__1 != tagof(Undefined:))
			ezjson_object_set_value(root, "cat", EzJSON:cat);

		if(__2 != tagof(Undefined:))
			ezjson_object_set_value(root, "dog", EzJSON:dog);

		return EmptyObject:root;
	};

	#undef __END


## SAMPLE (COMPOUND OBJECT WITH ALLOF)
	schemas:
		CompoundObject:
			allOf:
				- type: object
					properties:
						cat:
							type: string
				- type: object
					properties:
						dog:
							type: number
### GENERATED OUTPUT:
	compound_object_init(
		{String, Undefined}:cat = undefined, 
		{Number, Undefined}:dog = undefined, 
		__END
	) { ... }


## SAMPLE (COMPOUND OBJECT WITH ANYOF)
	schemas:
		CompoundObject:
			anyOf:
				- type: object
					properties:
						cat:
							type: string
				- type: object
					properties:
						dog:
							type: number
					required:
						- dog
### GENERATED OUTPUT:
	CompoundObject__Obj1:compound_object__obj1_init({String, Undefined}:cat = undefined) { ... }
	CompoundObject__Obj2:compound_object__obj2_init(Number:dog) { ... }

	#define __END __1 = tagof(obj1), __2 = tagof(obj2)

	compound_object_init(
		{CompoundObject__Obj1, Undefined}:obj1 = undefined, 
		{CompoundObject__Obj2, Undefined}:obj2 = undefined, 
		__END
	) { 
		new EzJSON:root = ezjson_object_init()

		if(__1 != tagof(Undefined:))
			ezjson_object_merge(root, EzJSON:obj1);

		if(__2 != tagof(Undefined:))
			ezjson_object_merge(root, EzJSON:obj2);

		return EmptyObject:root;
	}

	EzJSON:compound_object_get(
		{CompoundObject__Obj1, Undefined}:obj1, 
		{CompoundObject__Obj2, Undefined}:obj2
	) { ... }


## SAMPLE (COMPOUND OBJECT WITH ONEOF AND REF)
	schemas:
		Creeper:
			type: object
			properties:
				name:
					type: string
				charged: 
					type: boolean
				health:
					type: object
					properties:
						value:
							type: number
						max:
							type: number
					required:
						- value
						- max
			required:
				- name
				- charged
		UnionObject:
			oneOf:
				- type: object
					properties:
						cat:
							type: string
				- type: object
					properties:
						dog:
							type: number
					required:
						- dog
				- $ref: "#/components/schemas/Creeper"
### GENERATED OUTPUT:
	Creeper:creeper_init(
		String:name, 
		Boolean:charged, 
		{Creeper__Health, Undefined}:health = undefined
	) { ... }	

	Creeper__Health:creeper_health_init(Number:value, Number:max) { ... }

	UnionObject__Obj1:union_object__obj1_init({String, Undefined}:cat = undefined) { ... }
	UnionObject__Obj2:union_object__obj2_init(Number:dog) { ... }
	
	UnionObject:union_object_init(
		{UnionObject__Obj1, UnionObject__Obj2, Creeper}:union
	) {
		return UnionObject:ezjson_deep_copy(EzJSON:union);
	}	


## SAMPLE (COMPOUND OBJECT WITH ANYOF AND NESTING)
	schemas:
		CompoundObject:
			anyOf:
				- type: object
					properties:
						cat:
							type: string
				- type: object
					properties:
						dog:
							type: number
					required:
						- dog
				- oneOf:
					- type: object
						properties:
							fly:
								type: object
								properties:
									wings:
										type: boolean
									legs:
										type: boolean
					- type: object
						properties:
							health:
								type: number
							maxHealth:
								type: number
						required:
							- health
							- maxHealth
### GENERATED OUTPUT:
	CompoundObject__Obj1:	compound_object__obj1_init({String, Undefined}:cat = undefined) {  ... }
							compound_object__obj1_get(
								CompoundObject__Obj1:var, 
								{String, Undefined}:cat = undefined
							) { ... }

	CompoundObject__Obj2:	compound_object__obj2_init(String:dog) { ... }
							compound_object__obj2_get(CompoundObject__Obj2:var, String:dog) { ... }

	CompoundObject__Union1__Obj1:	compound_object__union1__obj1_init(CompoundObject__Union1__Obj1__Fly:fly) { ... }
									compound_object__union1__obj1_get(
										CompoundObject__Union1__Obj1:var,
										CompoundObject__Union1__Obj1__Fly:fly
									) { ... }

	CompoundObject__Union1__Obj1__Fly:	compound_object__union1__obj1__fly_init(
											{Boolean, Undefined}:wings = undefined,
											{Boolean, Undefined}:legs = undefined
										) { ... }

										compound_object__union1__obj1__fly_get(
											CompoundObject__Union1__Obj1__Fly:var,
											{Boolean, Undefined}:wings = undefined,
											{Boolean, Undefined}:legs = undefined
										) { ... }

	CompoundObject__Union1__Obj2:		compound_object__union1__obj2_init(
											Number:health, 
											Number:maxHealth
										) { ... }
										compound_object__union1__obj2_get(
											CompoundObject__Union1__Obj2:var,
											Number:health, 
											Number:maxHealth
										) { ... }

	CompoundObject:	compound_object_init(
						{CompoundObject__Obj1, Undefined}:obj1 = undefined,
						{CompoundObject__Obj2, Undefined}:obj2 = undefined,
						{CompoundObject__Union1__Obj1, CompoundObject__Union1__Obj2, Undefined}:union1 = undefined
					) { ... }

	EzJSON:			compound_object_get(CompoundObject:var) { ... }
### USAGE EXAMPLES:
	new CompoundObject:obj = compound_object_init(
		.obj1 = compound_object__obj1_init(
			.cat = string("cat string")
		)
		.union1 = compound_object__union1__obj1_init(
			.fly = compound_object__union1__obj1__fly_init(
				.wings = boolean(false),
				.legs = boolean(true)
			)
		)
	);	