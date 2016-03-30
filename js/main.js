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
//			scrollbarClass: 'myScrollbar',
			hScrollbar:false,
			vScrollbar:false,
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
//		$(".pullDownLabel").css("height",$("#header").height()-3+"px");
//		$("#pullUp").css("height","99px");
//	$("#footer").css("height","90px");
	}
	
	setTimeout(loaded, 200);
	
	$("#thelist").css("width",$("#wrapper").width()+"px");
	$("#pullDown").css("width",$("#wrapper").width()+"px");
	$("#pullUp").css("width",$("#wrapper").width()+"px");
	$(".item").css("height",$("#main").height()/2.5+"px");
	$("li").css("padding-left",($("#thelist").width()-$(".item").width()*2)/2+"px");
//	alert($("#main").height());

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

//	alert($(window).height());
//	alert($(window).height()+" "+$("#header").height()+" "+$("#footer").height());
//	$(".item").height(($("#main").height()/2)-10);
});
