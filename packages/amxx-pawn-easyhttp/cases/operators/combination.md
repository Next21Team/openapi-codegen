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
	const numTagId = 0
	const lelTagId = tagof(Lel:)
	const kekTagId = tagof(Kek:)
	const AuthControllerReq__Obj1TagId = tagof(AuthControllerReq__Obj1:)

	ezjson_object_merge(EzJSON:targetObj, EzJSON:objToMerge) {
		for(new i, EzJSON:value, key[128]; i <= ezjson_object_get_count(objToMerge); i++) {
			value = ezjson_object_get_value_at(objToMerge, i);
			ezjson_object_get_name(objToMerge, i, key, charsmax(key));
			ezjson_object_set_value(targetObj, key, value);
		}
	}

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
		bool:yes, 
		{Kek, AuthControllerReq__Obj1}:param2
	) { 
		new root = EzJSON:ezjson_init_object();
		ezjson_object_set_bool(root, "yes", yes);
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