## SAMPLE (STRING ENUM):
	schemas:
		KeksSet:
			type: string
			enum:
				- kek
				- lel
				- lol
				- null
### GENERATED OUTPUT:
	enum KeksSetEnum {
		KEKS_SET_KEK,
		KEKS_SET_LEL,
		KEKS_SET_LOL
	}

	KeksSet:keks_set_init({KeksSetEnum, Null}:value) { 
		switch(__value_tagid) {
			case (tagof(Null:)): {
				return KeksSet:ezjson_init_null();
			}
			case (tagof(KeksSetEnum:)): {
				static values[][] = {
					"kek", "lel", "lol"
				}
				return KeksSet:ezjson_init_string(values[_:option]);
			}
		}
	}


## SAMPLE (NUMBER ENUM):
	schemas:
		NumbersSet:
			type: number
			enum:
				- 1
				- 2
				- 1337.0
### GENERATED OUTPUT:
	enum NumbersSetEnum {
		NUMBERS_SET_1,
		NUMBERS_SET_2,
		NUMBERS_SET_1337_0
	}

	NumbersSet:keks_set_init({NumbersSetEnum, Null}:value) { 
		switch(__value_tagid) {
			case (tagof(Null:)): {
				return NumbersSet:ezjson_init_null();
			}
			case (tagof(NumbersSetEnum:)): {
				static any:values[] = { 1, 2, 1337.0 }
				if(value == NUMBERS_SET_1337_0)
					return NumbersSet:ezjson_init_real(values[_:option]);

				return NumbersSet:ezjson_init_number(values[_:option]);
			}
		}
	}