## SAMPLE:
	paths:
	/v1/auth/sign-in:
		post:
		operationId: AuthController_signIn
		summary: Sign in
		parameters: []
		requestBody:
			required: true
			content:
			application/json:
				schema:
					allOf:
					- $ref: '#/components/schemas/Lel'
					- oneOf:
						- $ref: '#/components/schemas/Kek'
						- type: object
						properties:
							lek:
								$ref: '#/components/schemas/KeksSet'
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
					type:
					type: number
			KeksSet:
				type: string
				enum:
					- kek
					- lel
					- lol
					- null


### GENERATED OUTPUT:
	Lel:create_lel_schema(bool:yes) { 
		new root = EzJSON:ezjson_init_object();
		ezjson_object_set_bool(root, "yes", yes);
		return Lel:root;
	}

	Kek:create_kek_schema(type) { 
		new root = EzJSON:ezjson_init_object();
		ezjson_object_set_number(root, "type", type);
		return Kek:root;
	}

	const Null:NULL = Null:0;

	const nullTagId = tagof(Null:);
	const keksSetEnumTagId = tagof(KeksSetEnum:);

	enum KeksSetEnum {
		KEKS_SET_KEK,
		KEKS_SET_LEL,
		KEKS_SET_LOL
	}

	KeksSet:create_keks_set_schema({KeksSetEnum, Null}:option, option_tagid = tagof(option)) { 
		switch(option_tagid) {
			case nullTagId: {
				return KeksSet:ezjson_init_null();
			}
			case keksSetEnumTagId: {
				static values[][] = {
					"kek",
					"lel",
					"lol"
				}
				return KeksSet:ezjson_init_string(values[_:option]);
			}
		}
	}

	AuthControllerReq__Obj1:create_auth_controller_req__obj1(KeksSet:lek) { 
		new root = EzJSON:ezjson_init_object();
		ezjson_object_set_value(root, "lek", lek);
		return AuthControllerReq__Obj1:root;
	}

	AuthControllerReq:create_auth_controller_req(Lel:lel, {Kek, AuthControllerReq__Obj1}:param2) { 
		new root = EzJSON:ezjson_init_object();
		ezjson_object_merge(root, EzJSON:lel);
		ezjson_object_merge(root, EzJSON:param2);
	}

### USAGE EXAMPLES:
	new request = create_auth_controller_req(
		.yes = true,
		.param2 = create_kek_schema(0)
	)

	new request = create_auth_controller_req(
		.yes = true,
		.param2 = create_auth_controller_req__obj1(135)
	)

	new request = create_auth_controller_req(
		.yes = true,
		.param2 = create_keks_set_schema(KEKS_SET_KEK)
	)