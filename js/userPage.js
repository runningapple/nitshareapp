/*防止页面滚动*/
document.body.addEventListener('touchmove', function (event) {
    event.preventDefault();
}, false);

$(document).ready(function(){
	$(window).scroll(function(){
		$(window).scrollTo(0);
	});
	var contentWidth = $("#header",window.parent.document).width();
	var contentHeight = $("#web-view",window.parent.document).height()-$("#header",window.parent.document).height()-$("#footer",window.parent.document).height();
//	alert(contentHeight+" "+contentWidth+" "+$("#header").height()+" "+$("#content").height());//60 90
	$(".contentdiv").css({"height":contentHeight+"px","width":contentWidth+"px"});
	$("#header").css("height",contentHeight*0.4+"px");
	$("#content").css({"top":contentHeight*0.4+"px","height":contentHeight*0.63+"px"});
	$("#contentTable").css("height",contentHeight*0.63+"px");
});
