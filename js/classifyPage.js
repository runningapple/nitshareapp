document.body.addEventListener('touchmove', function (event) {
    event.preventDefault();
}, false);

$(document).ready(function(){
	
	var contentWidth = $("#header",window.parent.document).width();
	var contentHeight = $("#web-view",window.parent.document).height()-$("#header",window.parent.document).height()-$("#footer",window.parent.document).height();
	
	$(".contentdiv").css({"height":contentHeight+"px","width":contentWidth+"px"});
	$("#searchdiv").css("height",contentHeight*0.0618+"px");
	$("#menuediv").css({"top":"55px","height":contentHeight*0.88+"px"});
	$("#menuetable").css("height",contentHeight*0.88+"px");
	
	$("a").click(function(){
		var name = null;
		var type = $(this).attr("name");
		/*父页面跳转*/
		window.parent.location.href = "resultPage.html?name="+name+"&type="+type;
	});
	
	$("#goodsname").blur(function(){
		var name = $("#goodsname").val();
		if (!(null == name || "" == name)){
			var type = "-1";
			window.parent.location.href = "resultPage.html?name="+name+"&type="+type;
		}		
	});
});
