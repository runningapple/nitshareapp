document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

$(document).ready(function(){
	
	/*当从二级页面回到一级页面的时候需要判断回到那个一级页面*/
	var myurl = location.href;
	if (myurl.indexOf("?") > 0){
		var href = myurl.split("?")[1].split("&")[0].split("=")[1];
		$("#iframepage").attr("src",href);
	}
	
	$("body").css("height",$(window).height());
	FastClick.attach(document.body);
	
	$("a").click(function(){
		var name = $(this).attr("name")
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
				break;
			case "mine":
//				alert("个人");
				$("#iframepage").attr("src","userPage.html");
				break;
		}
	});
	
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
