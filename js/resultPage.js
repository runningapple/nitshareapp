document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

var myScroll,
	pullDownEl, pullDownOffset,
	pullUpEl, pullUpOffset,
	generatedCount = 0;
	
$(document).ready(function(){
	
	var type, name;
	
	/*添加输入框失焦事件*/
	$("#search").blur(function(){
		var searchText = $("#search").val();
		if (!(null == searchText || "" == searchText)){
			type = -1;
			name = searchText;
		}
	});
	
	/*读取页面跳转过来携带的参数*/
	var myurl = location.href;
	type = myurl.split("?")[1].split("&")[0].split("=")[1];
	name = myurl.split("?")[1].split("&")[1].split("=")[1];
	
	/*返回到上一页面*/
	$("#backdiv").click(function(){
		window.history.back(-1);
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
					"type": type,
					"cname": name,
				},
				jsonpCallback:'callback',
				dataType:'jsonp',
				success:function(data){
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