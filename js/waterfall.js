
var myScroll;

function loaded () {
	myScroll = new IScroll('#wrapper',{
		mouseWheel: true
	});
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);


$(function(){
	setTimeout(loaded, 200);
	//url data function dataType
	function loadMeinv(){
		var data = 0;
		for(var i=0;i<9;i++){//每次加载时模拟随机加载图片
			data = parseInt(Math.random()*9);
			var html = "";
			html = '<li><img src = images/aa.jpg><p>src=aa.jpg</p></li>';
			$minUl = getMinUl();
			$minUl.append(html);
		}
	}
	loadMeinv();
	$(window).on("scroll",function(){
		$minUl = getMinUl();
		//alert($minUl.height()+" "+$(window).scrollTop()+" "+$(window).height());
		if($minUl.height() <= $(window).scrollTop()+$(window).height()){
		//当最短的ul的高度比窗口滚出去的高度+浏览器高度大时加载新图片
		
			loadMeinv();
		}
	})

	function getMinUl(){//每次获取最短的ul,将图片放到其后
		var $arrUl = $("#scroller .col");
		var $minUl =$arrUl.eq(0);
		$arrUl.each(function(index,elem){
			if($(elem).height()<$minUl.height()){
				$minUl = $(elem);
			}
		});
		return $minUl;
	}
})