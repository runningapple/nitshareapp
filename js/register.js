
$(document).ready(function(){
	$("#rgbtn").tap(function(){
		var nickname = $("#nickname").val();
		var account = $("#account").val();
		var pwd_one = $("#pwd_one").val();
		var pwd_two = $("#pwd_two").val();
		if (pwd_one != pwd_two) {
			//输入的两次密码不一致
			alert("两次输入的密码不一致");
			return;
		} 
		$.ajax({
			type:"get",
			url:"http://192.168.0.198:8080/nitshare/serve/user.register",
			async:false,
			data:{
				"nickname":nickname,
				"account":account,
				"password":pwd_one
			},
			jsonpCallback:'callback',
			dataType:'jsonp',
			success:function(data){
				alert(data);
			},
			error:function(XMLHttpRequest, textStatus, errorThrown, data){
				alert(errorThrown);
			}
		});
	});
});