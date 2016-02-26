
$(document).ready(function(){
	$("#re").tap(function(){
		$.mobile.changePage("register.html","slidedown",true,true);
	});
	
	$("#loginbtn").tap(function(){
		var account = $("#account").val();
		var password = $("#pwd").val();
		$.ajax({
			type:"GET",
			
			/*这里需要进行跨域请求，论文里可以加以展开说明*/
//			url:"http://localhost:8080/nitshare/serve/test",
			url:"http://192.168.0.198:8080/nitshare/serve/user.login",
			//async:false,/*同步*/
			jsonpCallback:'callback',
			data:{
				"account" : account,
				"password" : password
			},
			dataType:'jsonp',
			success : function(data){
				$.mobile.changePage("main.html","slidedown",true,true);
				//alert(data[0].id);
			},
			error : function(XMLHttpRequest, textStatus, errorThrown, data){
//				alert("本宝宝不开心了");
				$.mobile.changePage("register.html","slidedown",true,true);
				//alert(errorThrown);
			}
		});
	});
});