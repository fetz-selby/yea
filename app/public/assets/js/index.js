$(document).ready(function(){
	$('#chk_btn').click(function(){
		var yea_id = $('#yea_id').val();

		make_req(yea_id);
	});

	$('.close').click(function(){
		$('#my_modal').attr('style', 'display:none;');
	})

	var make_req = function(id){
		$.ajax({
  			url: '/eghana/yea/api/register/'+id,
  			data: '',
  			success: success,
  			dataType: 'json'
		});
	}
	//Y19917930001

	var success = function(data, status, req){
		if(data){
			$.cookie('user_id', data.id);
			$.cookie('yea_id', data.yea_id);

			window.location= "/home";
		}else{
			//Show popup and redirect to reg. page
			$('#my_modal').attr('style', 'display:block;');
			//$('.close').attr('style', 'display:block;');

		}

	}
})