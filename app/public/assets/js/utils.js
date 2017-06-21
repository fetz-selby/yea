var is_alpha_numeric = function(val){
	if(val){
		for(var i = 0; i < val.length; i++){
			if(Number.isInteger(parseInt(val.charAt(i)))){
				return true;
			}
		}

		return false;
	}

	return false;
}

var capitalize = function(val){
	if(val){
		return val.charAt(0).toUpperCase()+val.substr(1);
	}

	return val;
}

var is_email_valid = function(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

var is_phone_valid = function(phone){
	if(phone.length >= 10){
		for(var i = 0; i < phone.length; i++){
				if(!Number.isInteger(parseInt(phone.charAt(i)))){
					if(i == 0 && phone.charAt(0) == '+'){
						continue;
					}else{
						return false;
					}
				}
		}

		return true;
	}else{
		return false;
	}
}