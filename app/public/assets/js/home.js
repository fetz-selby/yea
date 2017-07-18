$(document).ready(function(){
	
	if(!parseInt($.cookie('user_id')) > 0){
		window.location = '/';
		return;
	}

	var yea_id = '';

	$('#print_btn').click(function(){
		window.print();
	});

	$('#save_btn').click(function(){
		var field_study = $('#study_area').val();

		$.ajax({
  			url: '/eghana/yea/api/register/'+yea_id,
  			method : 'PUT',
  			data: {study_field : field_study},
  			success: updated_response,
  			dataType: 'json'
		});

		$(this).attr('disabled', '');
		$(this).text('Saving ...');

	});


	var districts = [];

	//Grab user details
	var make_req = function(id){

		JsBarcode(bcode, $.cookie('yea_id'));

		$.ajax({
  			url: '/eghana/yea/api/register/'+id,
  			data: '',
  			success: success,
  			dataType: 'json'
		});
	}

	var success = function(data, status, req){
		init_page(data);
	}

	var districts_handler = function(data, status, req){
		districts = data;

		make_req($.cookie('yea_id'));

	}

	var init_page = function(obj){

		var personal_district = _.find(districts, function(item){return obj.personal_district_id == item.id});
		obj.p_district = personal_district.name;

		$('.username').text(obj.fname + ' ' +obj.lname);
		$('#qualification').text(obj.qualification);
		$('#yea_id').text(obj.yea_id);
		$('#reg_date').text(obj.created);
		$('#dob').text(obj.b_date);
		$('#gender').text(obj.gender);
		$('#phone').text(obj.msisdn);
		$('#town').text(obj.town);
		$('#residence_address').text(obj.residence_address);
		$('#pref_district').text(obj.p_district);
		$('#program').text(obj.program.name);
		$('#district').text(obj.district.name);
		$('#region').text(obj.region.name);
		$('#id_type').text(obj.id_type);
		$('#ezwich').text(obj.ezwich);

		$.removeCookie('user_id');
		$.removeCookie('yea_id');

		$('#loader').attr('style', 'display:none');
		$('#main_app').attr('style', '');

		if(!obj.study_field){
			//show popup to take detail
			$('#additional_modal').attr('style', 'display:block;')
		}

		yea_id = obj.yea_id;
	}

	var updated_response = function(data, status, req){
		if(data){
			$('#additional_modal').attr('style', 'display:none;');
		}
	}


	var loadAllDistricts = function(){
		$.ajax({
  			url: '/eghana/yea/api/districts',
  			data: '',
  			success: districts_handler,
  			dataType: 'json'
		});
	}


	loadAllDistricts();

});
