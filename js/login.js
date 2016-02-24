
$(document).ready(function(){
	$("#loginbtn").tap(function(){
		var account = $("#username").val();
		var password = $("#pwd").val();
		$.ajax({
			type:"GET",
			
			/*这里需要进行跨域请求，论文里可以加以展开说明*/
//			url:"http://localhost:8080/nitshare/serve/test",
			url:"http://localhost:8080/nitshare/serve/user.login",
			//async:false,/*同步*/
			jsonpCallback:'callback',
			data:{
				"account" : account,
				"password" : password
			},
			dataType:'jsonp',
			success : function(data){
				
				alert(data[0].id);
			},
			error : function(XMLHttpRequest, textStatus, errorThrown, data){
//				alert("本宝宝不开心了");
				alert(errorThrown);
			}
		});
	});
});