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
						anyOf:
						- $ref: '#/components/schemas/Lel'
						- $ref: '#/components/schemas/Kek'
						- type: object
						properties:
							lek:
							type: number
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


### GENERATED OUTPUT:
	const Undefined:undefined;
	const undefinedTagId = tagof(Undefined:);

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

	AuthControllerReq__Obj1:create_auth_controller_req__obj1(lek) { 
		new root = EzJSON:ezjson_init_object();
		ezjson_object_set_number(root, "lek", lek);
		return AuthControllerReq__Obj1:root;
	}

	AuthControllerReq:create_auth_controller_req(
		{Lel, Undefined}:lel = UNDEFINED, 
		{Kek, Undefined}:kek = UNDEFINED, 
		{AuthControllerReq__Obj1, Undefined}:obj1 = UNDEFINED,

		__1 = tagof(lel), __2 = tagof(kek), __3 = tagof(obj1)
	) { 
		new root = EzJSON:ezjson_init_object();

		if(__1 != undefinedTagId)
			ezjson_object_merge(root, EzJSON:lel);

		if(__2 != undefinedTagId)
			ezjson_object_merge(root, EzJSON:kek);

		if(__3 != undefinedTagId)
			ezjson_object_merge(root, EzJSON:obj1);
	}

### USAGE EXAMPLES:
	new request = create_auth_controller_req(
		.lel = create_lel_schema(true)
	)

	new request = create_auth_controller_req(
		.kek = create_kek_schema(0)
	)

	new request = create_auth_controller_req(
		.lel = create_lel_schema(true),
		.kek = create_kek_schema(0)
	)