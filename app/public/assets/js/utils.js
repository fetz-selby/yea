var is_alpha_numeric = function(val){
	if(val){
		for(var i = 0; i < val.trim().length; i++){
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
	if(phone.trim().length >= 10 && phone.trim().length <= 13){
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

var is_valid_voter = function(voter_num){
	if(voter_num.trim().length == 10){
		voter_num = voter_num.trim();
		for(var i = 0; i < voter_num.trim().length; i++){
			if(!Number.isInteger(parseInt(voter_num.charAt(i)))){
				return false;
			}
		}

		return true;
	}

	return false;
}

var is_valid_nhis = function(nhis_num){
	if(nhis_num.trim().length == 8){
		nhis_num = nhis_num.trim();
		for(var i = 0; i < nhis_num.trim().length; i++){
			if(!Number.isInteger(parseInt(nhis_num.charAt(i)))){
				return false;
			}
		}

		return true;
	}

	return false;
}

var is_valid_ezwich = function(ezwich_num){
	if(ezwich_num.trim().length == 9 || ezwich_num.trim().length == 10){
		ezwich_num = ezwich_num.trim();
		for(var i = 0; i < ezwich_num.trim().length; i++){
			if(!Number.isInteger(parseInt(ezwich_num.charAt(i)))){
				return false;
			}
		}

		return true;
	}

	return false;
}

var is_valid_passport = function(pass_num){

	if(pass_num.trim().length == 8 && is_letter(pass_num.charAt(0))){
		pass_num = pass_num.trim();
		for(var i = 0; i < pass_num.trim().length; i++){
			if(!Number.isInteger(parseInt(pass_num.charAt(i)))){
				if(i == 0) continue;
				return false;
			}
		}

		return true;
	}

	return false;
}

var is_letter = function(char){
	return char.length === 1 && char.match(/[a-z]/i);
}