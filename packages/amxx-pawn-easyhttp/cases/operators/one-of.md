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
						oneOf:
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

	AuthControllerReq:create_auth_controller_req({Lel, Kek, AuthControllerReq__Obj1}:param) { 
		return AuthControllerReq:ezjson_deep_copy(EzJSON:param);
	}

### USAGE EXAMPLES:
	new request = create_auth_controller_req(
		create_lel_schema(true)
	)

	new request = create_auth_controller_req(
		create_kek_schema(0)
	)

	new request = create_auth_controller_req(
		create_auth_controller_req__obj1(135)
	)