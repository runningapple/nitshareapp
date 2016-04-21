document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

$(document).ready(function(){
	
	/*当从二级页面回到一级页面的时候需要判断回到那个一级页面*/
	var myurl = location.href;
	if (myurl.indexOf("?") > 0){
		var href = myurl.split("?")[1].split("&")[0].split("=")[1];
		if ("classifyPage.html" == href){
			$("#footer_category").attr("checked",true);
		}else if("homePage.html" == href){
			$("#footer_home").attr("checked",true);
		}else if("userPage.html" == href){
			$("#footer_mine").attr("checked",true);
		}
		
		$("#iframepage").attr("src",href);
	}
	
	$("body").css("height",$(window).height());
	FastClick.attach(document.body);
	
	$("a").click(function(){
		var name = $(this).attr("name");
		radioSelect("#footer_"+name);
		switch (name){
			case "home":
//				alert("首页");
				$("#iframepage").attr("src","homePage.html");
				break;
			case "category":
//				alert("分类");
				$("#iframepage").attr("src","classifyPage.html");
				break;
			case "release":
//				alert("发布");
				window.location.href = "releasePage.html";
				break;
			case "mine":
//				alert("个人");
				jumpByname();
//				$("#iframepage").attr("src","userPage.html");
				break;
		}
	});
	
	function jumpByname(){
		if (null == localStorage.account){
			/*如果本地没有存储用户登录的数据则跳转到登录界面*/
			window.location.href = "registerPage.html";
		} else{
			if (true == isUserLogin()){
				/*如果本地存储了用户登录记录，则判断服务器上是记录了用户登录的数据，如果没有则跳转到登录界面*/
				localStorage.account = null;
				window.location.href = "register.html";
			}else{
				$("#iframepage").attr("src","userPage.html");
			}
		}
	}
	
	function isUserLogin(){
		$.ajax({
			type:"get",
			url:"http://115.28.73.144:8080/nitshare/serve/user.islogin",
			async:true,//异步刷新
			data:{
				"account": localStorage.account,
			},
			jsonpCallback:'callback',
			dataType:'jsonp',
			success:function(data){
				if (data.length == 1) return true;
				else return false;
			},
			error:function(XMLHttpRequest, textStatus, errorThrown, data){
				alert(errorThrown);
			}
		});
	}
	
	/**
	 * 绑定<a>和<radiobutton>
	 * @param {Object} id
	 */
	function radioSelect(id){
		if (null != $(id) && !$(id).attr("checked")){
			$(id).attr("checked",true);
		}
	}
	
	$("#iframepage").load(function(){
		var ifm= document.getElementById("iframepage");   
		var subWeb = document.frames ? document.frames["iframepage"].document : ifm.contentDocument;   
		if(ifm != null && subWeb != null) {
		   ifm.height = $("#main").height();
		   ifm.width = $("#main").width();
		}   		
	});
	
});
