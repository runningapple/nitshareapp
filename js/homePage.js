document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

var myScroll,
	pullDownEl, pullDownOffset,
	pullUpEl, pullUpOffset,
	generatedCount = 0;
	
$(document).ready(function(){
	
	$(".item").click(function(){
		window.parent.location.href = "detailPage.html"//"http://1.runningap.applinzi.com/a.html";
	});
	
	function loaded () {
		pullDownEl = document.getElementById('pullDown');
		pullDownOffset = pullDownEl.offsetHeight;
		pullUpEl = document.getElementById('pullUp');
		pullUpOffset = pullUpEl.offsetHeight;
		
		myScroll = new iScroll('wrapper',{
//			scrollbarClass: 'myScrollbar',
//			hScrollbar:false,
			vScrollbar:false,
			useTransition: true,
			startX: 0,
			startY: 0,
			topOffset: pullDownOffset,
			onScrollMove: function () {
//				console.log(this.y);
				if (this.y > 50 && !pullDownEl.className.match('flip')) {
					pullDownEl.className = 'flip';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
					this.minScrollY = 0;
				} else if (this.y < 50 && pullDownEl.className.match('flip')) {
					pullDownEl.className = '';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
					this.minScrollY = -pullDownOffset;
				} else if (this.y < (this.maxScrollY - 50) && !pullUpEl.className.match('flip')) {
					pullUpEl.className = 'flip';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
					this.maxScrollY = this.maxScrollY;
				} else if (this.y > (this.maxScrollY + 50) && pullUpEl.className.match('flip')) {
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
	}
	
	setTimeout(loaded, 200);
	
	var contentWidth = $("#web-view",window.parent.document).width();
	var contentHeight = $("#web-view",window.parent.document).height()-$("#header",window.parent.document).height()-$("#footer",window.parent.document).height();
//	alert(contentWidth+" "+contentHeight);
	$("#thelist").css("width",contentWidth+"px");
	$("#pullDown").css("width",contentWidth+"px");
	$("#pullUp").css("width",contentWidth+"px");
	setupCss();
	
	function setupCss(){
		$(".item").css("height",contentHeight/2.5+"px");
		$("li").css("padding-left","5px");//除以2可能还不够对称
	}


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
			setupCss();
		}, 200);	// <-- Simulate network congestion, remove setTimeout from production!
	}
	
	/*记录当前页数*/
	var pageIndex = parseInt("0");
	
	function pullUpAction () {
		setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
			$.ajax({
				type:"get",
				url:"http://192.168.0.198:8080/nitshare/serve/commodity.get",
				async:true,//异步刷新
				data:{
					"page": pageIndex,
					"size": "4",
				},
				jsonpCallback:'callback',
				dataType:'jsonp',
				success:function(data){
//					alert(data[0].imgUrl0);
					for (var i = 0; i < data.length; i++){
						var addtext = '\
								<li>\
									<div class="item">\
										<div class="itempic">\
											<img src="'+data[i].imgUrl0+'"/>\
										</div>\
										<div class="itemdes">\
											<div class="itemName">'+data[i].cname+'</div>\
											<div class="itemStatues">软件122</div>\
											<div class="itemTradePP">\
												<span class="itemPlace">'+data[i].tradePlace+'</span>\
												<span class="itemPrice">￥'+data[i].price+'</span>\
											</div>\
										</div>\
									</div>\
								</li>\
								';
						
						$("#thelist").append(addtext);
						myScroll.refresh();		// 数据加载完成后，调用界面更新方法 Remember to refresh when contents are loaded (ie: on ajax completion)
						setupCss();
					}
					pageIndex++;
				},
				error:function(XMLHttpRequest, textStatus, errorThrown, data){
					alert(errorThrown);
				}
			});
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

});
