document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

$(document).ready(function(){
	
	/*返回一级页面*/
	$("#back").click(function(){
		window.location.href = "main.html?index=homePage.html";
	});
	
	/*已经有账号，登录*/
	$("#login").click(function(){
		window.location.href = "login.html";
	});
	
	/*用户注册*/
	$("#registerbtn").click(function(){
		var nickname = $("#nickname").val().trim();
		var account = $("#account").val().trim();
		/*这里需要判断账号是否已经存在*/
		var pwd = null;
		if ("" == $("#pwdb").val().trim()){
			alert("密码不能为空");
			return;
		}else if($("#pwda").val().trim() != $("#pwdb").val().trim()){
			alert("两次密码不匹配");
			return;
		}
		pwd = $("#pwda").val().trim();
		
		$.ajax({
			type:"GET",
			url:"http://115.28.73.144:8080/nitshare/serve/user.register",
			async:false,/*同步*/
			jsonpCallback:'callback',
			data:{
				"nickname": nickname,
				"account" : account,
				"pwd" : pwd,
			},
			dataType:'jsonp',
			success : function(data){
				//alert(data[0].id);
				if (data.length == 1){
					localStorage.account = data[0].account;
					window.location.href = "main.html?index=userPage.html";
				}else{
					alert("好像有哪里不对");
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown, data){
				alert("本宝宝不开心了");
				//alert(errorThrown);
			}
		});		
	});
	
});
