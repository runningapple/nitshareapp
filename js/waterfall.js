
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

var myScroll,
	pullDownEl, pullDownOffset,
	pullUpEl, pullUpOffset,
	generatedCount = 0;

$(document).ready(function(){
	function loaded () {
		pullDownEl = document.getElementById('pullDown');
		pullDownOffset = pullDownEl.offsetHeight;
		pullUpEl = document.getElementById('pullUp');
		pullUpOffset = pullUpEl.offsetHeight;
		
		myScroll = new iScroll('wrapper',{
			scrollbarClass: 'myScrollbar',
			useTransition: false,
			startX: 0,
			startY: 0,
			topOffset: pullDownOffset,
			onScrollMove: function () {
				if (this.y > 5 && !pullDownEl.className.match('flip')) {
					pullDownEl.className = 'flip';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
					this.minScrollY = 0;
				} else if (this.y < 5 && pullDownEl.className.match('flip')) {
					pullDownEl.className = '';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
					this.minScrollY = -pullDownOffset;
				} else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
					pullUpEl.className = 'flip';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
					this.maxScrollY = this.maxScrollY;
				} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
					pullUpEl.className = '';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
					this.maxScrollY = pullUpOffset;
				}
			},
			onScrollEnd: function () {
				if (pullDownEl.className.match('flip')) {
					pullDownEl.className = 'loading';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';				
					pullDownAction();	// Execute custom function (ajax call?)
				} else if (pullUpEl.className.match('flip')) {
					pullUpEl.className = 'loading';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';				
					pullUpAction();	// Execute custom function (ajax call?)
				}
			}
			
		});
		setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
		$("#pullDown").css("height",$("#header").height()-3+"px");
//		$("#pullUp").css("height","99px");
	}

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
//	loadMeinv();
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
	
	
	function boundaryCheck(){
		if (this.y > 40){
			pullDown.innerHTML = 'aaa';
			pullDownFlag = 1;
		}else if (this.y < (this.maxScrollY-40)){
			pullUp.innerHTML = 'bb';
			pullUpFlag = 1;
		}
	}
	
	/**
	 * 下拉刷新 （自定义实现此方法）
	 * myScroll.refresh();		// 数据加载完成后，调用界面更新方法
	 */
	function pullDownAction () {
		setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
			var el, li, i;
			el = document.getElementById('thelist');
	
			for (i=0; i<3; i++) {
				li = document.createElement('li');
				li.innerText = 'Generated row ' + (++generatedCount);
				el.insertBefore(li, el.childNodes[0]);
			}
			
			myScroll.refresh();		//数据加载完成后，调用界面更新方法   Remember to refresh when contents are loaded (ie: on ajax completion)
		}, 200);	// <-- Simulate network congestion, remove setTimeout from production!
	}
	
	function pullUpAction () {
		setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
			var el, li, i;
			el = document.getElementById('thelist');
			for (i=0; i<5; i++) {
				li = document.createElement('li');
				li.innerText = 'Generated row ' + (++generatedCount);
				el.appendChild(li, el.childNodes[0]);
			}
			
			myScroll.refresh();		// 数据加载完成后，调用界面更新方法 Remember to refresh when contents are loaded (ie: on ajax completion)
		}, 200);	// <-- Simulate network congestion, remove setTimeout from production!
	}

	function refreshAction(){
		if (pullDownFlag == 1){
			pullDownAction();
			pullDown.innerHTML = 'on';
			pullDownFlag = 0;
		}else if (pullUpFlag == 1){
			pullUpAction();
			pullUp.innerHTML = 'on';
			pullUpFlag = 0;
		}
	}
})