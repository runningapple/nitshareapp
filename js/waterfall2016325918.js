/*H5触摸事件*/
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

/*			
需要使用iscroll-probe.js才能生效
probeType：1  滚动不繁忙的时候触发
probeType：2  滚动时每隔一定时间触发
probeType：3  每滚动一像素触发一次
*/
$(document).ready(function() {
	var myScroll;
	function loaded () {
		myScroll = new IScroll('#wrapper',{
			probeType:2,
			mouseWheel: true,
			bounce: true,//反弹效果
			startX: 0,
			startY: 0,
		});
		/*滚动时方法绑定*/
		myScroll.on('scroll', boundaryCheck);
		/*滚动结束时方法绑定，用户体验效果更好*/
		myScroll.on('scrollEnd', refreshAction);
	//	setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
	}
	
	/*加载数据*/
	function loadMeinv(){
		for(var i=0;i<9;i++){//每次加载时模拟随机加载图片
			var html = "";
			html = '<li><img src = images/aa.jpg><p>src=aa.jpg</p></li>';
			$minUl = getMinUl();
			$minUl.append(html);
		}
//		var liWidth = ($("#wrapper").width()/2)+"px";
//		var liHeight = ($("#wrapper").height()/2)+"px";
//		$("#scroller ul").css("width",liWidth);
//		$("#scroller li").css({"width":liWidth,"height":liHeight});
//	$("#scroller").css("margin","15px");
		myScroll.refresh();
//		$("#scroller").css("margin","0");
	}
	
	setTimeout(loaded, 200);
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
		var $arrUl = $("#scroller ul");
		var $minUl =$arrUl.eq(0);
		$arrUl.each(function(index,elem){
			if($(elem).height()<$minUl.height()){
				$minUl = $(elem);
			}
		});
		return $minUl;
	}
	
	var pullUpFlag;
	/**
	 * 边界检查
	 */
	function boundaryCheck() {
		$minUl = getMinUl();
		$("#position").html(this.maxScrollY+" "+this.y+" "+$("#scroller").offset().top);
		if (this.y < (this.maxScrollY-20)){
			pullUpFlag = 1;
		}
	}
	
	/**
	 * 用户上拉加载瀑布流
	 */
	function refreshAction() {
		if (pullUpFlag == 1){
			loadMeinv();
//			setTimeout(loadMeinv, 200);
		}
	}

});

