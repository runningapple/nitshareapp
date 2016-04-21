document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

$(document).ready(function(){
	
	/*返回一级页面*/
	$("#back").click(function(){
		window.location.href = "registerPage.html";//main.html?index=homePage.html
	});
	
	$("#loginbtn").click(function(){
		var account = $("#account").val();
		var pwd = $("#pwd").val();
		$.ajax({
			type:"GET",
			
			/*这里需要进行跨域请求，论文里可以加以展开说明*/
//			url:"http://localhost:8080/nitshare/serve/test",
			url:"http://115.28.73.144:8080/nitshare/serve/user.login",
			async:false,/*同步*/
			jsonpCallback:'callback',
			data:{
				"account" : account,
				"pwd" : pwd
			},
			dataType:'jsonp',
			success : function(data){
				//alert(data[0].id);
				if (data.length == 1){
					localStorage.account = data[0].account;
					window.location.href = "main.html?index=userPage.html";
				}else{
					alert("账号不存在");
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown, data){
				alert("本宝宝不开心了");
//				$.mobile.changePage("register.html","slidedown",true,true);
				//alert(errorThrown);
			}
		});
	});
});