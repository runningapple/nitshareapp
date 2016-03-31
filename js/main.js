document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

$(document).ready(function(){
	
	$("a").click(function(){
		var name = $(this).attr("name")
		radioSelect("#footer_"+name);
		switch (name){
			case "home":
//				alert("首页");
				break;
			case "category":
//				alert("分类");
				break;
			case "release":
//				alert("发布");
				break;
			case "mine":
//				alert("个人");
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
